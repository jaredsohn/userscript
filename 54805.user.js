// ==UserScript==
// @name           Display Feed Favicons
// @namespace      red.october
// @include        htt*://www.google.*/reader/view*
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// @grant          GM_log

// @author red.october
// @description Displays site favicons for each feed inside Reader (incompatible with OS X skin)
// @homepage  http://userscripts.org/scripts/show/24371
// @enabledbydefault true
// ==/UserScript==

/*
 * This script attempts to find the favicon for each feed in your Google Reader list.  If it can find it,
 * the favicon will appear beside the feed in the feed list (replacing the default image).
 *
 * It looks for a feed's favicon URL using a 2-step process:
 * 1) try "favicon.ico" in the feed's root directory
 * 2) if it isn't there, then use YQL to search the webpage
 *
 * Of course, doing this every time is overkill, because the location of a site's favicon isn't likely to change.
 * Therefore, once I find a feed's favicon, I store its URL.  Because of this optimization, the 2-step process becomes:
 *
 * 1) If there is a stored favicon URL, use it.  Otherwise try "favicon.ico" in the feed's root directory.
 * 2) if it isn't there, then use YQL to search the webpage.
 */

const EXPORT_URL = '/reader/subscriptions/export';

const ICON_XPATH = "/html/body/div[6]/div/div[3]/div/div[4]/div[4]//div[starts-with(@class,'icon sub-icon')]";
const ICON_XPATH_PREFIX = '/opml/body//outline[@text="';
const ICON_OPML_XPATH_PREFIX = '/opml/body//outline';
const YQL_BASE_URL = 'http://query.yahooapis.com/v1/public/yql?q=';
const YQL_GET_HTML = 'select%20*%20from%20html%20where';	// URI-encoded
const YQL_HTML_QUERY = YQL_BASE_URL+YQL_GET_HTML;
const FAVICON_XPATH = "/html/head/link[@rel='icon'] | /html/head/link[@rel='ICON'] | /html/head/link[@rel='shortcut icon'] | /html/head/link[@rel='SHORTCUT ICON']";
const URL_PATTERN = "^http://"; // "http://" at the start of the string
const CHANGE_MSG_XPATH = "/html/body/div[2]/div/div[@id='message-area']";
const NAV_BAR_XPATH = "/html/body/div[6]/div";
const FEED_ADD_MSG_XPATH = "//div[@id='quick-add-success']";

// The OPML file is the file you get when you try to export your Google Reader subscriptions.
// It contains (amongst other things) the mapping between each site's URL and feed URL.
function fetchOPML(url, callback)
{
	var xhr = new XMLHttpRequest();
	xhr.open('get', url);
	xhr.onload = function(){callback(xhr.responseXML)};
	xhr.send(null);
}

function drawFavicon(iconNode, imgNode)
{
	var parent = iconNode.parentNode;
	if (parent == null)
		{
			console.log("null")
			console.log(iconNode);
		}
	parent.replaceChild(imgNode, iconNode);
}

function replaceAllFeedIcons(opml)
{
	function replaceIcons(iconNodes)
	{
		for (var i=0; i<iconNodes.snapshotLength; i++)
		{
			/* I need to match the icon node with its XML element in the OPML file.
			 * I'm going to match based on the title.
			 */
			var currIcon = iconNodes.snapshotItem(i);
			var feedTitle = currIcon.nextSibling.firstChild.textContent;

			var srcURLNode, srcURL;
			if (feedTitle.indexOf("\"") == -1)	//	common case - title doesn't contain double quotes
			{
				srcURLNode = opml.evaluate(ICON_XPATH_PREFIX+feedTitle+'"]/@htmlUrl', opml, null,
					XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				
				if (srcURLNode == null)	//	shouldn't ever (or at least rarely) happen
				{
					GM_log("Unable to get the srcURLNode for feed "+feedTitle);
					continue;
				}

				srcURL = srcURLNode.textContent;
			}
			else	//	going to be expensive
			{
				var iconOPMLNodes = opml.evaluate(ICON_OPML_XPATH_PREFIX, opml, null,
					XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				
				/* Unfortunately, XPath 1.0 doesn't allow for escaping single quotes (') and double quotes (").
				 * Therefore, I'm treating the "text" attribute as a string, and doing the comparison this way.
				 * XPath 2.0, whenever that gets widely supported, should render this method obsolete.
				 */
				for (var j=0; j<iconOPMLNodes.snapshotLength; j++)
				{
					currNode = iconOPMLNodes.snapshotItem(j);
					if (currNode.getAttribute("text") == feedTitle)
					{
						srcURL = currNode.getAttribute("htmlUrl");
						break;
					}
				}

				if (j == iconOPMLNodes.snapshotLength)
				{
					GM_log("Unable to get the srcURLNode for feed "+feedTitle);
					continue;
				}
			}
			
			srcURL = "http://"+srcURL.split("/", 3)[2];	// get the root URL
			
			/* create the img node used to display our icon */
			var imgNode = document.createElement("img");
			imgNode.style.borderWidth = "0px";
			imgNode.style.height = "16px";
			imgNode.style.width = "16px";
			imgNode.style.opacity = "1.0";
			imgNode.style.marginTop = "2px";

			/* By setting the class attribute to be the same, we can ensure that the same CSS styles get applied.
			 * You can remove the line to see what it looks like without those styles */
			imgNode.className = currIcon.className;
			// remove the default feed icon
			imgNode.style.backgroundImage = "none";
			imgNode.style.visibility = "hidden";
			imgNode.setAttribute("alreadysearchedpage", "false");
		
			var defaultFaviconURL;	// contains our first guess at the correct URL
			var faviconURL = GM_getValue(srcURL);
		
			if (faviconURL == undefined || faviconURL == "")	//	no user-specified value
				defaultFaviconURL = srcURL + "/favicon.ico";
			else
				defaultFaviconURL = faviconURL;
			
			imgNode.src = defaultFaviconURL;
			// if the image loads correctly, then the favicon is in the default location
			imgNode.addEventListener("load",
				(function(srcURL)
				{
					return function() 
						{
							this.style.visibility = "visible";
							GM_setValue(srcURL, this.src);
						};
				})(srcURL),
				true);
			// otherwise, its in a non-default location and we have to hunt for it
			imgNode.addEventListener("error",
				(function(srcURL, currIcon)
				{
					return function()
						{
							if (this.getAttribute("alreadysearchedpage") == "true")
								return;
							
							/* make use of the YQL service from Yahoo! which will:
							 * 1) convert HTML into well-formed XML
							 * 2) lets us retrieve selective parts of a webpage, based on an XPath query -
							 *    the benefit is that we have to do less client-side processing
							 *    
							 * Here we are only requesting the part of the webpage which specifies the favicon location   
							 */
							var queryURL = YQL_HTML_QUERY+encodeURIComponent(' url="'+srcURL+'"'+' and xpath="'+FAVICON_XPATH+'"');
							GM_xmlhttpRequest({
								method: "GET",
								url: queryURL,
								onload:
									function(response)
									{
										if (response.status == '200')	//	response is OK
										{
											var parser = new DOMParser();
											var urlDoc = parser.parseFromString(response.responseText, 'text/xml');
											var links = urlDoc.getElementsByTagName("link");
											var url, faviconURL;
											
											if (links.length == 0)	//	no favicons :(
											{
												/* use the generic icon provided by Google Reader so it isn't just blank */
												drawFavicon(currIcon, this);
												/* create the entry, so the user can fill it in (if desired) via about:config */
												GM_setValue(srcURL, "");
												return;
											}
											else
												/* I'm just going to get the first one.  There are websites with more than one 
												 * (I've seen a website specify 2 link tags: one with rel="shortcut icon" and 
												 * one with rel="icon"), but it should still be fine in those cases.
												 */
												url = links[0].getAttribute("href");
											
											if (url.search(new RegExp(URL_PATTERN)) != -1) // absolute path
												faviconURL = url;
											else // relative path
											{
												/* originally I thought the following was sufficient to distinguish between relative and
												 * absolute, but then at sites like www.hdnumerique.com, I saw they specified their
												 * favicon url as "imgs/favicon.ico" :)
												 */
												if (url.charAt(0) == '/') 
													faviconURL = srcURL+url;
												else
													faviconURL = srcURL+'/'+url;
											}

											this.setAttribute("alreadysearchedpage", "true");
											this.src = faviconURL;
											drawFavicon(currIcon, this);
											this.style.visibility = "visible";
											GM_setValue(srcURL, faviconURL.toString());
										}
										else
											GM_log("YQL query for "+srcURL+" returned with error " + response.status);
									}
							});
						}
				})(srcURL, currIcon),
				true);
				
			/*  Try to draw the icon with the default URL.  If it succeeds, then make the icon visible in the "load" event handler.
			 *  If it fails, then search for the correct URL in the "error" event handler.
			 */
			drawFavicon(currIcon, imgNode);
		}
	}

	var regIconNodes = document.evaluate(ICON_XPATH, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	replaceIcons(regIconNodes);
}

//	here we draw the favicons when our script first loads
fetchOPML(EXPORT_URL, replaceAllFeedIcons);

/*	But there are 3 times when we will have to redraw the favicons:
 *  
 *  1) When the user edits feeds (e.g., re-order, rename)
 *  2) When the user navigates to the Settings and back
 *  3) When the user adds a feed using the "Add a subscription" button
 *  
 *  This is because these operations don't reload the page (I think Google is using AJAX for them).
 *  Detection of these events is fairly crude, but Google doesn't provide notifications for them.
 */	

//	Editing ends when the "Saved changes to [feed-name]" message appears
var changeMsg = document.evaluate(CHANGE_MSG_XPATH, document, null,
				XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	
changeMsg.addEventListener("DOMNodeInserted",
	function (event)
	{
		if (this.textContent.search("Saved changes") == 0 || this.textContent.search("You have") == 0)
			/*
			 * I don't actually need to fetch the opml file here, but the replaceAllFeedIcons() function
			 * makes calls to GM_getValue()/GM_setValue(), which cannot be made in the context of the
			 * webpage (a security error occurs when this happens).  Thus, I have to call the function
			 * in the context of a GreaseMonkey XmlHttpRequest.
			 */
			fetchOPML(EXPORT_URL, replaceAllFeedIcons);
	},
	true);
	
//	The user navigated back from the Settings page when the class attribute of the
//	left-hand side navigation bar is modified in a certain way
var navBar = document.evaluate(NAV_BAR_XPATH, document, null,
	XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

var unhide = false;

navBar.addEventListener("DOMAttrModified", 
	function(event) 
	{
//		if (event.attrName == "class")
//			console.log("attrName = "+event.attrName+"\nprevValue = "+event.prevValue+"\nnewValue = "+event.newValue);
		//	we're coming back from the Settings page 
		if (event.attrName == "class" && event.prevValue == "hidden" && event.newValue == "")
			unhide = true;

//		console.log("unhide = "+unhide+" attrName = "+event.attrName + " newValue = "+event.newValue);
		
		/*	I only re-draw the first time the class attribute is changed after coming back from the
		 *	Settings page.  I used the flag because this type of change to the class
		 *	attribute occurs often.  For example, it occurs every time you click on a feed/subscription
		 *	in the left panel.
		 */
		if (unhide && event.attrName == "class" && event.newValue == "link tree-link-selected")
		{
			fetchOPML(EXPORT_URL, replaceAllFeedIcons);
			unhide = false;
		}
	}, 
	true);


//	A new feed is added using the "Add a subscription" button when the class attribute
//	of the "success" message becomes visible
var feedAddMsg = document.evaluate(FEED_ADD_MSG_XPATH, document, null,
	XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

feedAddMsg.addEventListener("DOMAttrModified",
	function(event)
	{
		if (event.attrName == "class" && event.prevValue == "hidden" && event.newValue == "")
		{
			/*
			 * I don't actually need to fetch the opml file here, but the replaceAllFeedIcons() function
			 * makes calls to GM_getValue()/GM_setValue(), which cannot be made in the context of the
			 * webpage (a security error occurs when this happens).  Thus, I have to call the function
			 * in the context of a GreaseMonkey XmlHttpRequest.
			 */
			fetchOPML(EXPORT_URL, replaceAllFeedIcons);
		}
	},
	true);