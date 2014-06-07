// Written by Lior Zur, January 2007
// Released under the GPL license.
// version v0.21

// ==UserScript==
// @name           Haaretz Books Viewer
// @namespace      http://mywebsite.com/myscripts
// @description    Improves the Books and Galleria online sections at Haaretz's site. (Complements Haaretz Enhancer.)
// @include        http://www.haaretz.co.il/hasite/pages/books.jhtml*
// @include        http://www.haaretz.co.il/hasite/pages/booksInnerPage.jhtml*
// @include        http://www.haaretz.co.il/hasite/pages/lifeStyle.jhtml*
// @include        http://www.haaretz.co.il/hasite/pages/lifeStyleInnerPage.jhtml*
// ==/UserScript==

/*
http://www.haaretz.co.il/hasite/pages/lifeStyle.jhtml
http://www.haaretz.co.il/hasite/pages/lifeStyleInnerPage.jhtml
*/
//list of excluded links (appear like usual ones but are actually lists):
/*
//Books:
http://www.haaretz.co.il/hasite/spages/652024.html
http://www.haaretz.co.il/hasite/spages/782648.html
http://www.haaretz.co.il/hasite/spages/787360.html
//Lifestyle:
http://www.haaretz.co.il/hasite/spages/801641.html
http://www.haaretz.co.il/hasite/spages/796645.html
http://www.haaretz.co.il/hasite/spages/764356.html
http://www.haaretz.co.il/hasite/spages/753109.html
http://www.haaretz.co.il/hasite/spages/774957.html
*/

//var reIsHaaretz = /^http:\/\/www\.haaretz\.co\.il/;
//var reNotMainPage = /^http:\/\/www\.haaretz\.co\.il\/[^?#]/;
//var reListPrintEdition = /^http:\/\/www\.haaretz\.co\.il\/hasite\/pages\/LiArtPE/;
currentURL = location.href;

// ==== Functions ====
function $(id) {
  return document.getElementById(id);
}
function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}
function insertAfter(newNode, node) {
  return node.parentNode.insertBefore(newNode, node.nextSibling);
}
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

function addClass (element, className ) {
	var currentClass = element.getAttribute ("class") || '';
	if (!currentClass) currentClass = "";
	if (currentClass.indexOf(className) == -1)
		element.setAttribute ("class", currentClass + " " + className);
}
function removeClass (element, className ) {
	var currentClass = element.getAttribute ("class") || '';
	if (currentClass.indexOf(className) != -1)
		element.setAttribute ("class", currentClass.replace(className, "").replace(/^\s+/, '').replace(/\s+$/, ''));
}
// ==== End Functions ====

//Exclude Blogs etc.:
var excludedLinks = ["652024","782648","787360","801641","796645","764356","753109", "774957"];
var windowWidth = 550; //BOOKS: Width of Article-Window
var barHeight = 25; //BOOKS: Height of bottom bar
var currentURL;
var allElements, thisElement, newElement;
var f, g;

//## Stop auto-refresh of the page.
//	Taken and modified from Pirateshark's http://userscripts.org/scripts/show/3587
//	who in turn took it from http://dunck.us/collab/DisableAutoRefresh
allElements = $x("//meta[@http-equiv='Refresh']|//meta[@http-equiv='refresh']|//meta[@http-equiv='REFRESH']");
allElements.forEach (function(e){
	var content = e.getAttribute("content");
	var stopTimer = window.setTimeout("window.stop();",(content-1)*1000); // in case load hasn't finished when the refresh fires
	window.addEventListener("load", function(){ try { window.clearTimeout(stopTimer); } catch(ex) {} window.stop(); }, true);
});

//## Create the necessary styles.
GM_addStyle( 
		"a.gmclosed { " +
		"border-bottom: #b22e00 solid 1px ! important; "+
		"text-decoration: none ! important;"+ 
		"}"+

		"a.gmclosed:visited { " + 
		"border-bottom: #888888 dotted 1px ! important; "+
		"color: #666666; ! important; "+
		"}"+

		"a.gmclosed:hover { " + 
		"color: white; ! important; "+
		"background-color: b22e00 ! important;" +
		"}"+

		"a.gmopen {  background-color: #ffde6d ! important; " + //
		"border-bottom: 0 ! important; "+
		"text-decoration: none ! important;}"+

		//#gm_darkscreen (Dark screen)   What about z-index?
		"#gm_darkscreen {"+
		"background-color:#000000; opacity: 0.65;"+
		"width:100%; position:absolute; top:0px; left:0px;"+
		"display:none;"+
		"}"+

		"#gm_window {"+
		"background-color:#FFFFFF;" + 
		"width:" + windowWidth + "px; position:fixed; top:0px; left:0px;"+
		"display:none;"+
		"}"+

		"#gm_win_content{"+
		//"border: 2px #b22e00 solid;"+
		"border-top: 2px #b22e00 solid;"+
		"border-left: 2px #b22e00 solid;"+
		"border-right: 2px #b22e00 solid;"+
		"}"+

		"#gm_win_bar{"+
		"width: 100%; background: #b22e00;"+
		"height: "+ barHeight + "px;"+
		"}"+

		"a#gm_win_close{"+
		"background: #b22e00;"+
		"height: "+ (barHeight - 10) + "px;"+
		"display: block;"+
		"text-align: center; dir: rtl;"+
		"font-weight: bold;"+
		"font-size: 14px;"+
		"padding: 5px;"+
		"color: white;"+
		"}"+
		
		"a#gm_win_close:hover{"+
		"background: #ffde6d;"+
		"color: black;"+
		"}"+

		".gm_content_loading {"+
		"width: 100%; height: 500px;"+
		"background: #444444 " +
		"no-repeat center center url("+
		"data:image/gif;base64,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"+
		");"+
		"}"+

		"#gm_content_scrollwrap {"+
		"width: 100%; background: white;"+
		"overflow: auto;"+
		"}"+


		"#gm_content_articlewrap {"+
		"padding: 0.5em 1.5em;"+
		"text-align: right;"+
		"dir: rtl;"+
		""+
		"}"+

		""+
		"");

//## Add Darken-Page div to HTML:
newElement = document.createElement('div');
newElement.innerHTML = '<div id="gm_darkscreen">&nbsp;</div>';
document.body.appendChild(newElement);

//## Add Window for viewing articles to HTML:
newElement = document.createElement('div');
newElement.innerHTML = '<div id="gm_window"><div id="gm_win_content"></div><div id="gm_win_bar"><a id="gm_win_close" href="#"></a></div></div>';
document.body.appendChild(newElement);
newElement = null;

//## Configure CLOSE button (put hebrew text):
var _mainCloseBtn = document.getElementById('gm_win_close');
var hebCloseText = String.fromCharCode(1505,1490,1497,1512,1492); //'Sgira'
_mainCloseBtn.innerHTML = hebCloseText;

// ==== Start Site Customization Block ====
var contentErrorMessage = '<div id="gm_content_scrollwrap"><div id="gm_content_articlewrap"><div style="padding: 5px; background-color: #f7c8c5; text-align: center; direction: ltr; font-size: 12px;">Sorry, there was a problem loading the article.<br />Please try again, or try another link. If you conclude the script has broken, report to me.<br /><br /><b>Note:</b> You can always middle-click the link to open it in a new tab!</div></div></div>';
var contentLoadingMessage = '<div class = "gmabsolutediv" style="padding: 10px; background-color: #e8e0fa; text-align: center; direction: ltr;"><div class="gmloadingarticle">Loading the article, please wait...</div></div>';

function processResponse (responseHTML) {
	// Highly modifiable function for different sites.
	// Return processed string, or <null> for error
	var reMatches = /(<span class="t18B">[\w\W]+)<!--end switch about number of pictures in article-->/.exec(responseHTML);
	if (!reMatches) return null;
	// Wrap the found text in the proper tags... 
	var responseHTML = "<table dir='rtl'><tr><td><br />" + reMatches[1] + "<br /></table>";
	// Wrap article in our own divs (for scrolling and styling):
	var heightScroll = $('gm_window').scrollHeight - barHeight;
	responseHTML = '<div id="gm_content_scrollwrap" style="height:'+ heightScroll + 'px ;">' + 
	'<div id="gm_content_articlewrap">' + 
	responseHTML +
	'</div></div>';
	return responseHTML;
}
function generateLinkID(url){
// Produce unique ID based on URL
// (Essentially could be a random number generator! (take url as seed?))
	if (url) {
		var reMatches = (/itemNo=/.test(url))  ?  /itemNo=(\d+)/.exec(url)  :  /(\d{6})/.exec(url);
		if (!reMatches) return null; //if no ID  -- open link as usual.
		return "GM" + reMatches[1];
	}
}
function processLink(element){
// PROCESS each link, and TEST if it's good (return false if not).
	for (var i = 0; i < excludedLinks.length; i++)
		if (element.href.indexOf(excludedLinks[i]) != -1) return false;
	// Remove the site's original mouseover / mouseout functions
	element.setAttribute("onmouseout",""); //for some reason only these work.
	element.setAttribute("onmouseover","");
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
	addClass (element, "gmopenarticle")	
}

var myXPath = "//a[contains(@href,'hasite/spages/')]";
var siteMimeType = 'text/html; charset=windows-1255';

// ==== End Site Customization Block ====

var _mainWindow = $('gm_window');
var _mainContent = $('gm_win_content'); 
var _mainDarkScreen = $('gm_darkscreen');

allElements = $x(myXPath);
allElements.forEach ( function (thisElement, i, c){
	var _originalLink = thisElement; // (Remember this <A> node)
	var _isLinkOpen = false;

	function closeLink (){
		if (!_isLinkOpen) return false;
		_isLinkOpen = false;
		removeClass (_originalLink,"gmopen");
		addClass    (_originalLink,"gmclosed");
		_mainContent.innerHTML = "";
		_mainWindow.style.display     = 'none';
		_mainDarkScreen.style.display = 'none';
		_mainCloseBtn.removeEventListener('click', event_clickClose ,true);
		GM_log("ma");
	}
	function event_clickClose (event) {
		event.preventDefault ();
		closeLink ();
	}
	function event_clickLink (event) {
		// --- On Click function for each link. ---
		event.preventDefault();
		event.stopPropagation();
		if (!_isLinkOpen){
			_isLinkOpen = true;
			removeClass (_originalLink, "gmclosed");
			addClass    (_originalLink, "gmopen");

			_mainDarkScreen.style.height = document.body.parentNode.scrollHeight + 'px';
			_mainDarkScreen.style.display = 'block';
			var windowHeight = Math.round(document.body.clientHeight * 0.97);
			_mainWindow.style.height  = windowHeight + 'px';
			_mainContent.style.height = (windowHeight - barHeight) + 'px';

			var xTop = Math.round((document.body.clientWidth/2)-(windowWidth/2))
			var yTop = Math.round((document.body.clientHeight/2)-(windowHeight/2))
			_mainWindow.style.left = xTop + "px";
			_mainWindow.style.top  = yTop + "px";
			_mainWindow.style.display = 'block';

			//## Put "Loading..." inside Window:
			_mainContent.innerHTML = '<div class="gm_content_loading" style="height:' + (windowHeight - barHeight) + 'px;"></div>';
			// Register Close button.
			_mainCloseBtn.addEventListener('click', event_clickClose ,true);

			GM_xmlhttpRequest({
				method: 'GET',
				url: _originalLink.href,
				headers: {'User-agent': 'Mozilla/4.0 (compatible)', 'Accept': 'text/xml,application/xml,application/xhtml+xml,text/html',},
				overrideMimeType: siteMimeType,
				onerror: event_onerror,
				onload: event_onload
			});
		} else { 
			closeLink ();
		}
		return false;
	}
	function event_onerror (responseDetails) {
		if (!_isLinkOpen) return false;
		displayError (_mainContent);
		return false;
	}
	function event_onload (responseDetails){
		if (!_isLinkOpen) return false;
		// If HTTP error, exit.
		if (responseDetails.status > 207) {
			displayError (_mainContent);
			return false;
		}
		var processedHTML = processResponse(responseDetails.responseText);
		if (processedHTML) {
			displayArticle (_mainContent, processedHTML);
		} else {
			displayError (_mainContent);
		}
	}
	if (!processLink(_originalLink)) return true;
	addClass (_originalLink, "gmclosed");
	_originalLink.addEventListener('click', event_clickLink ,true);
});// End forEach <a>
