// ==UserScript==
// @author              DemianGod - demiangod@gmail.com
// @name                Google Reader New Style Minimalistic by DemianGod v4.4
// @namespace           http://userscripts.org/scripts/show/30242
// @description         Removes all the junk from New Google+ Reader and just gives you the search and collapsable subscriptions + favicons. 
// @include             http*://*.google.com*/reader/*
// @icon           	http://www.google.com.ar/reader/ui/favicon.ico
// ==/UserScript==
// Google Reader New Style Minimalistic By DemianGod v4.4
// DemianGod http://userscripts.org/scripts/show/30242

const EXPORT_URL = '/reader/subscriptions/export';

const ICON_XPATH = "/html/body/div[6]/div/div[2]/div/div[5]/div[4]//div[starts-with(@class,'icon sub-icon')]";
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
				(function(srcURL, defaultFaviconURL)
				{
					return function() 
						{
							this.style.visibility = "visible";
							GM_setValue(srcURL, defaultFaviconURL);
						};
				})(srcURL, defaultFaviconURL),
				true);
			// otherwise, its in a non-default location and we have to hunt for it
			imgNode.addEventListener("error",
				(function(imgNode, srcURL, currIcon)
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
											// remove XML opening declaration before passing to constructor (apparently required)
											var urlResultDoc = new XML(response.responseText.replace(/^<\?xml [^>]*>\s*/,''));
											var urlResult = urlResultDoc.results;
											var url, faviconURL;
											
											if (urlResult.link.length() == 0)	//	no favicons :(
											{
												/* therefore, go back to using the generic icon provided by Google Reader,
												 * so that the icon isn't just blank/broken
												 */
												drawFavicon(imgNode, currIcon);
												/* create the entry, so the user can manually fill it in (if desired) via about:config
												 * (e.g., with the URL of some other site's favicon)
												 */
												GM_setValue(srcURL, "");
												return;
											}
											else if (urlResult.link.length() == 1)
												url = urlResult.link.@href;
											else if (urlResult.link.length() == 2)
												/* this should rarely happen, but some websites will specify 2 link tags:
												 * one with rel="shortcut icon" and one with rel="icon".  I've arbitrarily
												 * chosen to select the former.
												 */
												url = urlResult.link.(@rel.toLowerCase() == "shortcut icon").@href;
											
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

											imgNode.setAttribute("alreadysearchedpage", "true");
											imgNode.src = faviconURL;
											drawFavicon(currIcon, imgNode);
											imgNode.style.visibility = "visible";
											GM_setValue(srcURL, faviconURL.toString());
										}
										else
											GM_log("YQL query for "+srcURL+" returned with error " + response.status);
											
									}
							});
						}
				})(imgNode, srcURL, currIcon),
				true);
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

//---------------------------------------------------------------

(function() { var ids = ["logo-container","gbg","gbx3","gbx4","gbzc","gbz","gbu","gbq1","gbzw","gbbw","logo-section","sections-header","reading-list-selector","lhn-recommendations","sub-tree-header","lhn-add-subscription-section","lhn-selectors","home-section","viewer-refresh","viewer-view-options","mark-all-as-read-split-button","stream-prefs-menu","chrome-view-links","settings-button-container"];

 function toggle_gr ()
 {
   var length = ids.length;
   var is_visible = document.getElementById(ids[0]).style.display != "none";

   for (var i=0; i<length; i++){
     if(document.getElementById(ids[i]) != null)
		document.getElementById(ids[i]).style.display = is_visible?"none":"block";
   }
   GM_addStyle(".gbh { display:none !important; }");  //Hide dividing line
   if(is_visible){

document.getElementById('main').style.fontSize = '8pt';
document.getElementById('sub-tree').style.fontSize = '8pt';

var overrideCSS = " \
#search { padding:2px !important ; position:fixed; z-index:2 !important; } \
#gbq2 { left:50px !important; top:-18px !important; width:0px !important; position:fixed; z-index:3 !important; } \
//#gbqfbw { left:500px !important; display:block !important; } \
#gbqff { width:500px !important; } \
#settings-button { top:-3px !important; } \
#viewer-header-container { height:35px !important; } \
#viewer-top-controls-container { top:15px !important; } \
#sections-header { height:35px !important; } \
#overview-section-header { width:0px !important; height:0px !important; position:fixed; } \
#gb { height:0px !important; } \
#gbx1 { display:none !important; } \
#gbq { height:0px !important; } \
#gbqfw { left:200px !important; top:-50px !important; } \
#gbqf { left:200px !important; top:-50px !important; } \
#lhn-subscriptions-minimize { left:0px !important; top:0px !important; } \
#sub-tree-container { top:10px !important; } \
#entries { padding:0ex !important; } \
#entries.list .collapsed { height: 4.0ex !important; } \
#entries.list .collapsed .entry-source-title, #entries.list .collapsed .entry-title, #entries.list .collapsed .entry-date   { line-height: 4.0ex !important;} \
#entries.list .entry .entry-secondary .snippet { color: #333 } \
#entries.list .entry.read .entry-secondary .snippet { color: inherit } \
#entries.list .entry .entry-main .entry-source-title \
{color:#333 !important} \
#entries.list .entry.read .entry-main .entry-source-title \
{color: #666 !important} \
#title-and-status-holder { padding:0 0 0 0.5em !important; } \
#sub-tree-header \
{ padding-left: 15px !important; } \
.folder .folder .folder-toggle { margin-left:13px !important } \
.folder .sub-icon, .folder .folder>a>.icon { margin-left:27px !important } \
.folder .folder>ul .icon { margin-left:34px !important } \
.folder .folder .name-text { max-width:160px; !important } \
#recommendations-tree .sub-icon {background-position: -65px 0 !important;} \
.scroll-tree .icon, .scroll-tree .favicon {height: 15px !important; width: 15px !important;} \
.scroll-tree .folder-icon {background-position: -48px 0 !important;} \
.scroll-tree li a .name {color: #000000 !important;} \
.scroll-tree .tag-icon {background-position: -33px -32px !important;} \
";
GM_addStyle(overrideCSS);
	
   }
   else {
//---
   }
 }


 function GRT_key(event) {
   element = event.target;
   elementName = element.nodeName.toLowerCase();
   if (elementName == "input") {
     typing = (element.type == "text" || element.type == "password");
   } else {
     typing = (elementName == "textarea");
   }
   if (typing) return true;
   if (String.fromCharCode(event.which)=="W" && !event.ctrlKey && !event.metaKey) {
     toggle_gr();
     try {
       event.preventDefault();
     } catch (e) {
     }
     return false;
   }
   return true;
 }

 document.addEventListener("keydown", GRT_key, false);
 toggle_gr();

try
  {
var accountname = document.getElementById('gbmpn');
document.title = document.title + " | " + accountname.innerHTML + " |";
  }
catch(err)
  {
  }

})();