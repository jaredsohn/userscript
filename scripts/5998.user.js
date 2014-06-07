//########################################################################
//   Ynet Enhancer  v0.46
//
// *** Technical details: ***
// See userscripts.org page for full description and changelog.
//
// By: Lior Zur, 2007
// Released under the GPL license (http://www.gnu.org/copyleft/gpl.html)
// If you reuse parts of the code, please give proper credit. Thanks.
// Improvements & suggestions are welcome.
//
// Change Log:
//  0.4 (26.3.07): Major changes to underlying code. Runs faster.
//  0.3 (17.10.06): Renamed to "Enhancer", removing advertisement spaces.
//  0.21 (3.10.06): Improved "Close" button functionality.
//  0.2 (28.1.06): Added "Close" button, fixed broken pages, better stability.
//  0.1 (26.1.06): First experimental version.
//
//########################################################################
// ==UserScript==
// @name           Ynet Enhancer
// @namespace      http://mywebsite.com/myscripts
// @description    Improves Ynet (subtly), and lets you read articles without leaving the front page.
// @include        http://*.ynet.co.il/*
// @include        http://ynet.co.il/*
// ==/UserScript==
var allElements, thisElement, anotherElement, newElement;
var f, g;
var someHTML;
var bIsItEnabled;
var reMainSections = /http:\/\/www\.ynet\.co\.il\/home/;
var reArticles = /http:\/\/www\.ynet\.co\.il\/articles/;
var currentURL = location.href;

// ==== Functions ====

function removeNode (element){
	if (element)
		element.parentNode.removeChild(element);
}

function removeElements (xPath) {
	var allElements = document.evaluate(xPath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var thisElement;
	for (f = 0; f < allElements.snapshotLength; f++) {
    thisElement = allElements.snapshotItem(f);
    //thisElement.style.backgroundColor = 'red';
    thisElement.parentNode.removeChild(thisElement);
	}
	if (allElements.snapshotLength > 0) return true; 
		else return false;
}

function removeById (elementIds) {
	var x, thisElement;
	for (x in elementIds) {
		if (elementIds[x] !== ""){
			thisElement = document.getElementById(elementIds[x]);
			if (thisElement) { thisElement.parentNode.removeChild(thisElement); }
		}
	}
}

function $x(path, root) { /* from Henrik Nyh */
	if (!root) root = document;
	var i, arr = [], xpr = document.evaluate(path, root, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item); return arr;
}

function addClass (element, className) {
	var currentClass = element.getAttribute ("class");
	if (!currentClass) currentClass = "";
	if (currentClass.indexOf(className) == -1)
		element.setAttribute ("class", currentClass + " " + className);
}

function removeClass (element, className) {
	var currentClass = element.getAttribute ("class");
	if (currentClass.indexOf(className) != -1)
		element.setAttribute ("class", currentClass.replace(className, "").replace(/^\s+/, '').replace(/\s+$/, ''));
}

//Two custom string functions by me (Lior Zur)
String.prototype.trimUpTo = function (trimTexts){
   if (typeof trimTexts == 'string') trimTexts = [trimTexts];
	var trimPoint, s = this.toString();
	for (var i=0; i < trimTexts.length; i++){
		trimPoint = s.indexOf(trimTexts[i]);
		if (trimPoint != -1 ) return s.substring(trimPoint + trimTexts[i].length ,s.length);
	}
	return null;
}
String.prototype.trimFrom = function (trimTexts){
   if (typeof trimTexts == 'string') trimTexts = [trimTexts];
	var trimPoint, s = this.toString();
	for (var i=0; i < trimTexts.length; i++){
		trimPoint = s.lastIndexOf(trimTexts[i]);
		if (trimPoint != -1 ) return s.substring(0, trimPoint);
	}
	return null;
}
// ==== End Functions ====


//#### Remove annoying spaces for ads in Ynet:
//## Ads in main ("home") pages:
if (reMainSections.test(currentURL)){
	removeById(["MarketSchedDiv", "ExternalWebpageIframe", "dcPix", "dcMiscFrame"]);
	removeElements ("//td[contains(@id,'AlmondCamp')]");
	removeElements ("//*[contains(@id,'Ad_')]|//*[contains(@id,'ad_') or contains(@id,'ads')]"); // Heuristic based on consistent ad naming in Ynet:
	/*
	allElements = document.evaluate("//table|//div",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (f = 0; f < allElements.snapshotLength; f++) {
		thisElement = allElements.snapshotItem(f);
		if ((thisElement.id).indexOf("ad") !== -1) removeNode(thisElement);
	}*/
}

//## Ads in article pages:
if (reArticles.test(currentURL)) {
	removeById(["td_mb", "ExternalWebpageIframe", "dcPix", "dcMiscFrame", "Merlin_tdInsert", "Merlin_tdInsert2", "Merlin_tdInsert3" ]);
	removeElements ("//*[contains(@id,'Ad_')]|//*[contains(@id,'ad_') or contains(@id,'ads')]"); // Heuristic based on consistent ad naming in Ynet:
}// end if (section)

//## Ads in misc. pages (nested frames, etc....):
removeById(["ExternalWebpageIframe"]);


//#### Stop auto refresh
//<META HTTP-EQUIV="REFRESH" CONTENT="600">
// Taken and modified from Pirateshark's http://userscripts.org/scripts/show/3587
// who  in turn took it from http://dunck.us/collab/DisableAutoRefresh
// Adapted for Ynet. (see: http://userscripts.org/scripts/show/6547)
// THE PROBLEM: on URLS http://ynet.co.il/ and http://www.ynet.co.il/
// the Refresh MUST work -- otherwise you're stuck on a forwarding page.
//	MY FIX is simply to test if we're either inside MainSections or Articles (neither is problematic).
if (reMainSections.test(currentURL) || reArticles.test(currentURL)){
	allElements = document.evaluate("//meta[@http-equiv='Refresh']|//meta[@http-equiv='refresh']|//meta[@http-equiv='REFRESH']",
					document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var content, stopTimer;
	for (f = 0; f < allElements.snapshotLength; f++) {
		thisElement = allElements.snapshotItem(f);
		content = thisElement.getAttribute("content");
		stopTimer = window.setTimeout("window.stop();",(content-1)*1000); // in case load hasn't finished when the refresh fires
		window.addEventListener("load", function(){
		   try { window.clearTimeout(stopTimer); } catch(ex) {}
		   window.stop();
		   }, true);
	}
}



//#### "Open articles inside this page" feature
if (reMainSections.test(currentURL)) {

//## Create the bottom bar (with checkbox).
GM_addStyle('div.gmbottombar {  background-color: #fef8c7;' + 
' border: 1px solid #eab742; width: 54em;'+
' margin-left: auto; margin-right: auto;'+
' font-size: 11px; color: #cc5401;'+
' padding: 2px 15px;}' +
' div.gmbottombar form {display: inline;}'+
' div.gmbottombar a {color: blue; text-decoration: underline;}'+
'');
newElement = document.createElement('div');
newElement.innerHTML = '<form name="gmbottomform" action=""><input type="checkbox" name="gmarticlesenable" value="no" align="middle" id="gmbottomcheckbox" /> Open articles inside this page <b>(Ynet Enhancer)</b></form>';
newElement.className = "gmbottombar";

thisElement = document.getElementById("mainCont");
if (thisElement) {
	thisElement.appendChild(newElement);
}

var locateCheckBox = document.getElementById("gmbottomcheckbox");
locateCheckBox.addEventListener('click', function(event) {
	var bIsItEnabled1 = this.checked
	GM_setValue ("bIsItEnabledYnet", bIsItEnabled1);
	//event.preventDefault();
	window.location.reload();
}, true); 
//## See whether "Is It Enabled"; change checkbox accordingly.
bIsItEnabled = GM_getValue("bIsItEnabledYnet", true); //default - enabled.
locateCheckBox.checked = bIsItEnabled; //setAttribute ("checked" , bIsItEnabled);
locateCheckBox = null;


if (bIsItEnabled) {

//## Create the necessary styles.
GM_addStyle("a.gmclosed {  background-color: none ! important; " +
		"border-bottom: #bebdb5 dashed 1px ! important; "+
		"text-decoration: none ! important;}"+
		"a.gmopen {  background-color: #d19dfb ! important; " +
		"border-bottom: 0 ! important; "+
		"text-decoration: none ! important;}"+
		//.gmopenarticle (the opened div.)
		".gmopenarticle {  background: white repeat-x top left url("+
		"data:image/gif,GIF89a%0A%00%0F%00%B3%00%00%EE%DA%FD%E2%C2%FD%F8%F0%FE%F5%E9%FE%DF%BA%FC%EA%D2%FD%FB%F6%FF%FD%FB%FF%D3%A1%FB%D5%A6%FB%E6%CA%FD%D1%9D%FB%F1%E2%FE%DB%B3%FC%D8%AC%FC%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%0A%00%0F%00%00%04%2Fp%C9I%91%BD8%E9%CD%9D%FF%60%23%8E%24a%9Eh%A0%AE%AC%E2%BEp!%CF4%60%DF8%A3%EF%FC%E0%FF%40%81pH4%18%8F%C8%83r%C9%8C%00%00%3B);"+
		" border: #d19dfb solid 2px;  padding: 15px;  font-weight: normal; text-align: right;  margin: 0;} "+
		".gmopenarticle p { margin: 0;}"+
		//.gmabsolutediv (adition class for the preceding 2 divs, to make them absolutely positioned!)
		".gmabsolutediv {position: absolute;  right: -120px;  width: 400px; }"+
		//.gmcontaineropenarticle (container of the opened div) (if the div is absolutely positioned!)
		".gmcontaineropenarticle {position: relative;}"+
		//.gmloadingarticle  (Loading article animation)
		"div.gmloadingarticle {  background: no-repeat top left url("+
		"data:image/gif,GIF89a%0A%00%0A%00%80%01%00%3A%3BT%FF%FF%FF!%FF%0BNETSCAPE2.0%03%01%00%00%00!%F9%04%09%0A%00%01%00%2C%00%00%00%00%0A%00%0A%00%00%02%12%04%82i%9B%B1%8F%9E%9C%D48%AAd%BBv_%0F%06%05%00!%F9%04%09%0A%00%01%00%2C%00%00%00%00%0A%00%0A%00%00%02%11%8C%8F%99%00%CA%8F%9E4%B2%DA%CB%02%3EvAS%00%00!%F9%04%09%0A%00%01%00%2C%00%00%00%00%0A%00%0A%00%00%02%10%8C%8F%A9%CB%08%A0%9Etr%86%8A%B3~W%87%02%00!%F9%04%09%0A%00%01%00%2C%00%00%00%00%0A%00%0A%00%00%02%0E%8C%8F%A9%CB%ED%09%80%8A%14%D1k%AE%D6%05%00!%F9%04%05%0A%00%01%00%2C%00%00%00%00%0A%00%0A%00%00%02%0C%8C%8F%A9%CB%ED%0F%0D%00jZd%0B%00%3B);"+
		" padding: 0 0 0 20px; text-align: left; display: block; width: 17em; margin-left: auto; margin-right: auto;"+
		" font-size: 12px; color: #370f6e; }"+
		//.gmcloselink (The Close button)
		"a.gmcloselink { background-color: #cdb1e1; display: block; padding: 2px; width: 5em; text-align: center;"+
		"font-size: 12px; font-weight: bold; color: white; } "+
		"a.gmcloselink:hover {background-color: #D88AFF;}"+

	//custom styles INSIDE each article:
	"P{margin:0;}"+
	"UL{margin-bottom:0;margin-top:0;margin-right: 16; padding-right:0;}"+
	"OL{margin-bottom:0;margin-top:0;margin-right: 32; padding-right:0;}"+
	"P.pHeader {margin-bottom:3px;COLOR: #192862;font-size: 16px;font-weight: bold;}"+
	
	"");

// === LinkifyJS Links on Ynet ===
// Courtesy of Jillian, from "Ynet Links and Vids". http://userscripts.org/scripts/show/2014
//	Modified slightly. Hopefully my using it here is fine -- otherwise contact me.
function linkifyJSLinks(parentNode) {
	$x(".//a",parentNode).forEach (function(e){
		if (/CdaDisplayGallery|CdaArticleSendtoForm|CdaTalkBack|CdaViewBlogTalkBack|CdaNewsFlash/.test(e.href)) return;
		var attrs = "onclick oncontextmenu ondeactivate onblur onmouseover onmouseout".split(" ");
		// From my experience this is the safest method to get the URL
		var cmFunc = e.getAttribute("oncontextmenu");
		if (cmFunc) {
		   var href = cmFunc.slice("this.href=\"".length, -1); // Until the matching apos.
		   if (href[0] == ' ') {
		       // Sometimes ynet mistakenly puts a space before the URL
		       href = href.substr(1);
		   }
		   e.href = href;
		   for (a in attrs) {
		       e.removeAttribute(attrs[a]);
		   }
		}
		// Handle simple JS links, such as in talkbacks
		else if (/(openInnewWindow|openWin|open)\b/.test(e.href)) {
			e.href = unescape(/\(['"](.+?)["']/.exec(e.href)[1]); // Assumes the url is the first thing between quotes
		}
	});
}

// ==== Start Site Customization Block ====
var contentErrorMessage = '<div style="padding: 5px; background-color: #f7c8c5; text-align: center; direction: ltr; font-size: 12px;">Sorry, there was a problem loading the article.<br />Please try again, or try another link. If you conclude the script has broken, report to me.<br /><br /><b>Note:</b> You can always middle-click the link to open it in a new tab!</div>';
var contentLoadingMessage = '<div class = "gmabsolutediv" style="padding: 10px; background-color: #e8e0fa; text-align: center; direction: ltr;"><div class="gmloadingarticle">Loading the article, please wait...</div></div>';

siteMimeType = 'text/html; charset=utf-8';

function processResponse (responseHTML, linkID) {
	// Highly modifiable function for different sites.
	// Return processed string, or <null> for error

	// Trim HTML
	responseHTML = "<p><font class=text20b" + 
		responseHTML.trimUpTo("text20b").trimFrom(["CdaTalkBack","CdaArticlePrintPreview","CdaArticleSendtoForm"]).trimFrom("<table");

	// Wrap HTML in tags and Close button
	// Check article length. If extremely short, don't position absolutely. (act smartly.)
	var hebrewCloseText = String.fromCharCode(1505,1490,1497,1512,1492); //'Sgira'
	if (responseHTML.length > 2500){
		responseHTML = "<div class='gmopenarticle gmabsolutediv'>"
			+ responseHTML
			+ "<a href='#' class='gmcloselink' id='closebutton"+ linkID +"'>"+hebrewCloseText+"</a></div>"
	} else {
		responseHTML = "<div class='gmopenarticle' style='padding: 10px 0 0 0 ! important; border-width: 0 0 2px 0 ! important;'><p><font class="
			+ responseHTML
			+ "<a href='#' class='gmcloselink' id='closebutton"+ linkID +"'>"+hebrewCloseText+"</a></div>"
	}
	return responseHTML;
}
function generateLinkID(url){
// Produce a unique ID based on URL
// (Essentially could be a random number generator!)
	if (url) {
		var reMatches = /(\d),(\d{4}),L-(\d{7}),(\d{2})/.exec(url);
		if (reMatches == null) return null; //if no ID  -- open link as usual.
		var linkID = "GM" + reMatches[1] + reMatches[2] + reMatches[3] + reMatches[4];
		return linkID;
	}
}
function processLink(element){
// PROCESS each link, and TEST if it's good (return false if not).
	// Fix javascript links:
	var theHref = element.getAttribute("href");
	if (theHref.indexOf("javascript:openInnewWindow") != -1){
		var reFixMatch = /"(http[^"]+)"/gi.exec(theHref);
		if (reFixMatch) theHref = reFixMatch[1];
		element.setAttribute("href", theHref);
	}
	// No testing condition:
	return true; 
}

function displayLoading (element){
	element.innerHTML =  contentLoadingMessage;
}
function displayError (element){
	element.innerHTML =  contentErrorMessage;
}
function displayArticle (element, processedHTML){
	element.innerHTML = processedHTML;
	linkifyJSLinks(element);
	if (processedHTML.length > 2000) addClass (element, "gmcontaineropenarticle");  //Container is "relative". (so inside, the absolute positioning referes to it)
}
var myXPath = "//a[contains(@href,'/articles/')]";

// ==== End Site Customization Block ====




//## Run the loop on all appropriate links.
allElements = $x(myXPath);
for (f = 0; f < allElements.length; f++) {
	thisElement = allElements[f];

	//Process link, and test if it's good.
	if (!processLink(thisElement)) continue;

	// Set link style
	addClass (thisElement, "gmclosed");

	// Remove the site's original mouseover / mouseout functions
	thisElement.addEventListener('mouseover', function(event) {	event.preventDefault(); event.stopPropagation();}, true); 
	thisElement.addEventListener('mouseout', function(event) {event.preventDefault(); event.stopPropagation();}, true); 
	thisElement.setAttribute("onmouseout",""); //for some reason only these work.
	thisElement.setAttribute("onmouseover","");

	thisElement.addEventListener('click', function(event) {
		///////////////////////////////////////////
		//    On Click function inside each link.
		///////////////////////////////////////////
		event.preventDefault();
		event.stopPropagation();
		var myOriginalLink = this; // (Remember this <A> node)
		var linkID = generateLinkID(this.href);
		
		// Check if link is "open" or "closed" (using custom attribute "gm"):
		var linkStatus = this.getAttribute ("gm");
		if (!linkStatus) linkStatus = "";

		if (linkStatus == ""){ // if link is closed.
			this.setAttribute("gm", linkID);
			removeClass (this, "gmclosed");
			addClass    (this, "gmopen");

			// Create the content div
			var newElement = document.createElement('div');
			displayLoading(newElement);
			addClass (newElement, "gmcontaineropenarticle");
			this.parentNode.insertBefore(newElement, this.nextSibling); //(insert after this one).

			GM_xmlhttpRequest({
				method: 'GET',
				url: this.href,
				headers: {'User-agent': 'Mozilla/4.0 (compatible)',
				'Accept': 'text/xml,application/xml,application/xhtml+xml,text/html',},
				overrideMimeType: siteMimeType,
				onerror: function(responseDetails) {
					var linkStatus = myOriginalLink.getAttribute ("gm");
					if (linkStatus == "") return false;
					displayError (myOriginalLink.nextSibling);
					return false;
				},
				onload: function(responseDetails) {
					///////////////////////////////////////////
					// On Load function
					///////////////////////////////////////////
					var responseHTML = responseDetails.responseText;

					// If link was closed, exit.
					var linkStatus = myOriginalLink.getAttribute ("gm");
					if (linkStatus == "") return false;
					// If HTTP error, exit.
					if (responseDetails.status > 207) {
						displayError (myOriginalLink.nextSibling);
						return false;
					}

					processedHTML = processResponse(responseHTML, linkID);

					if (processedHTML) {
						displayArticle (myOriginalLink.nextSibling, processedHTML);
						// Set the close button function
						var findCloseArticle = document.getElementById("closebutton" + linkID);
						if (findCloseArticle) {
							findCloseArticle.addEventListener('click', function(event) {
								///////////////////////////////////////////
								// Close Button function.
								///////////////////////////////////////////
								//CLOSURE: myOriginalLink, linkID
								// If article is too long, scroll back
								// Note: Potentially better solution is using the topScroll property on container. If the article is excessively long, we should jump to its starting position. http://www.howtocreate.co.uk/tutorials/javascript/browserwindow	http://developer.mozilla.org/en/docs/DOM:element.clientHeight
								var divHeight = myOriginalLink.nextSibling.firstChild.clientHeight;
								var windowHeight = window.innerHeight;
								if (divHeight >= windowHeight) { 
									myOriginalLink.setAttribute("id", linkID);
									location.href = "#" + linkID;
								}
								// Change the link back
								myOriginalLink.setAttribute  ("gm", "");
								removeClass (myOriginalLink,"gmopen");
								addClass    (myOriginalLink,"gmclosed");
								// Delete the content div
								removeNode(myOriginalLink.nextSibling);
								event.preventDefault();
								///////////////////////////////////////////
							}, true); 
						} //End set the close button
					} else {
						displayError (myOriginalLink.nextSibling);
					}
				}///////////////////////////////////////////
			}); //End GM_xmlhttpRequest "On Load" Function
	
		} else { // link is open
			this.setAttribute  ("gm", ""); // mark as closed.
			removeClass (this,"gmopen");
			addClass    (this,"gmclosed");
			removeNode(this.nextSibling);
		}
		return false;
		event.preventDefault();
	///////////////////////////////////////////
	}, true); 

}//End for (loop every <A>)
}//End if (is it enabled)
} //End if (is it Main Section)


