// ==UserScript==
// @name           Walla Enhancer
// @namespace      liorzur
// @description    Lets you read all articles in the same page at www.walla.co.il
// @include        http://*.walla.co.il/
// ==/UserScript==
//########################################################################
// Walla Enhancer
// Version 0.11
//
//
// By: Lior Zur, 2007
// Released under the GPL license (http://www.gnu.org/copyleft/gpl.html)
// If you reuse parts of the code, please give credit. Thanks.
// Improvements & suggestions are welcome.
//
// See userscripts.org page for full description and changelog.
//
//########################################################################

var currentURL = location.href;
var allElements, thisElement, newElement;
var f;
var someHTML;

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
function createEl(elObj, parent) { //By Arvid
  var el;
  if (typeof elObj == 'string') {
	  el = document.createTextNode(elObj);
  } else {
	  el = document.createElement(elObj.n);
	  if (elObj.a) {
		  attributes = elObj.a;
		  for (var key in attributes) {
			  if (key.charAt(0) == '@')  el.setAttribute(key.substring(1), attributes[key]);
			  else  el[key] = attributes[key];
		  }
	  }
	  if (elObj.evl) { el.addEventListener(elObj.evl.type, elObj.evl.f, elObj.evl.bubble);  }
	  if (elObj.c) { elObj.c.forEach(function (v, i, a) { createEl(v, el); });  }
  }
  if (parent) parent.appendChild(el);
  return el;
}
function insertAfter(newNode, node) {
  return node.parentNode.insertBefore(newNode, node.nextSibling);
}
function removeNode (element){
	if (element)
		element.parentNode.removeChild(element);
}
function removeElements (xPath) {
	var thisElement, allElements = document.evaluate(xPath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (f = 0; f < allElements.snapshotLength; f++) {
    thisElement = allElements.snapshotItem(f);
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
//Two custom string functions by me
String.prototype.trimUpTo = function (trimTexts){
   if (typeof trimTexts == 'string') trimTexts = [trimTexts];
	var trimPoint, s = this.toString();
	for (var i=0; i < trimTexts.length; i++){
		trimPoint = s.indexOf(trimTexts[i]);
		if (trimPoint != -1 ) return s.substring(trimPoint + trimTexts[i].length ,s.length);
	}
	return "";
}
String.prototype.trimFrom = function (trimTexts){
   if (typeof trimTexts == 'string') trimTexts = [trimTexts];
	var trimPoint, s = this.toString();
	for (var i=0; i < trimTexts.length; i++){
		trimPoint = s.lastIndexOf(trimTexts[i]);
		if (trimPoint != -1 ) return s.substring(0, trimPoint);
	}
	return "";
}
// ==== End Functions ====

//feature is active only inside main page + printed list articles.
if ( 1==1 ){

//## Create the bottom bar (with checkbox).
GM_addStyle('div.gmbottombar {  background-color: #fef8c7;' +
' border: 1px solid #eab742; width: 630px; margin-left: auto; margin-right: auto;'+
' font-size: 11px; color: #cc5401; padding: 2px 15px;}' +
' div.gmbottombar form {display: inline;}'+
' div.gmbottombar a {color: blue; text-decoration: underline;}');
newElement = document.createElement('div');
newElement.innerHTML = '<div class="gmbottombar"><form name="gmbottomform" action=""><input type="checkbox" name="gmarticlesenable" id="gmbottomcheckbox" value="no" align="middle" /> Open articles inside this page <b>(Walla Enhancer)</b></form></div>';
document.body.appendChild(newElement);

//Checkbox code.
var locateCheckBox = $("gmbottomcheckbox");
locateCheckBox.addEventListener('click', function(event) {
			GM_setValue ("bIsItEnabled", this.checked);
			event.preventDefault();
			window.location.reload();
}, true); 

//## See whether "Is It Enabled"; change checkbox accordingly.
var bIsItEnabled =  GM_getValue("bIsItEnabled", true); //default - enabled.
locateCheckBox.checked = bIsItEnabled;
locateCheckBox = null;

//---------------- If feature is enabled ----------------
if (bIsItEnabled) {

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
var imgLoadingAnimation   = "data:image/gif;base64,R0lGODlhCgAKAIABADo7VP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgABACwAAAAACgAKAAACEgSCaZuxj56c1DiqZLt2Xw8GBQAh+QQJCgABACwAAAAACgAKAAACEYyPmQDKj540strLAj52QVMAACH5BAkKAAEALAAAAAAKAAoAAAIQjI+pywignnRyhoqzfleHAgAh+QQJCgABACwAAAAACgAKAAACDoyPqcvtCYCKFNFrrtYFACH5BAUKAAEALAAAAAAKAAoAAAIMjI+py+0PDQBqWmQLADs=";
var imgBackgroundGradient = "data:image/gif;base64,R0lGODlhCgAPALMAAO7a/eLC/fjw/vXp/t+6/OrS/fv2//37/9Oh+9Wm++bK/dGd+/Hi/tuz/Nis/AAAACH5BAAAAAAALAAAAAAKAA8AAAQvcMlJkb046c2d/2AjjiRhnmigrqzivnAhzzRg3zij7/zg/0CBcEg0GI/Ig3LJjAAAOw==";
GM_addStyle("a.gmclosed {  background-color: #fdfcec ! important; " + //
		"border-bottom: #8f14d1 solid 1px ! important; "+
		"text-decoration: none ! important;}"+
		"a.gmopen {  background-color: #d19dfb ! important; " + //
		"border-bottom: 0 ! important; "+
		"text-decoration: none ! important;}"+
		"div.gmopenarticle {  background: white repeat-x top left url(" + imgBackgroundGradient + ");" + //
		" border-bottom: #d19dfb solid 2px }"+
		"div.gmloadingarticle {  background: no-repeat top left url("+ imgLoadingAnimation + ");" + //
		" padding: 0 0 0 20px; text-align: left; display: block; width: 17em; margin-left: auto; margin-right: auto;"+
		" font-size: 12px; color: #370f6e; }"+
		//.gmclosebutton (The 'Close' button)
		"a.gmclosebutton { background-color: #cdb1e1; display: block; padding: 2px; width: 5em; text-align: center;"+
		"font-size: 12px; font-weight: bold; color: white; margin: 5px 0;} "+
		"a.gmclosebutton:hover {background-color: #D88AFF;}"+
		"");
var contentErrorMessage = '<div style="padding: 5px; background-color: #f7c8c5; text-align: center; direction: ltr; font-size: 12px;">Sorry, there was a problem loading the article.<br />Please try again, or try another link. If you conclude the script has broken, report to me.<br /><br /><b>Note:</b> You can always middle-click the link to open it in a new tab!</div>';
var contentLoadingMessage = '<div class = "gmabsolutediv" style="padding: 10px; background-color: #e8e0fa; text-align: center; direction: ltr;"><div class="gmloadingarticle">Loading the article, please wait...</div></div>';




// ==== Start Site Customization Block ====

var siteMimeType = 'text/html; charset=windows-1255';

function processResponse (responseHTML) {
	// Highly modifiable function for different sites.
	// Return processed string, or <null> for error
	var s = responseHTML.trimUpTo('<div class="w5b"').trimFrom("function openEmail() {");
	if (s == "") return null;
	return '<div style="display:block; height:15px; width:15px;">.</div><div class="w5b"' + s + "</script>";
}

function generateLinkID(url){
// Produce unique ID based on URL
// (Essentially could be a random number generator! (take url as seed?))
	if (url) {
		var reMatches = /(\d{6,})/.exec(url);
		if (!reMatches) return null; //if no ID  -- open link as usual.
		return "GM" + reMatches[1];
	}
}
function processLink(element){
// PROCESS each link, and TEST if it's good (return false if not).
	if (!(/(\d{6,})/.exec(element.href))) return false;  //TEST: Is this a link to an article? (Xpath can't do this...)
	element.parentNode.style.fontWeight = "normal"; //Fix bold table cells in Walla
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

var myXPath = "//a[contains(@class,'w3b')]" //contains(@href,'/?w=/') and 
+"|//a[contains(@class,'w2b')]";

//make sure article images stay on top (aesthetics)
$x("//td[@width='82']|//img[@width=80]/parent::a/parent::td").forEach ( function (thisElement, i, c){ thisElement.vAlign = "top"; });

// ==== End Site Customization Block ====

allElements = $x(myXPath);
allElements.forEach ( function (thisElement, i, c){
	var _originalLink = thisElement; // (Remember this <A> node)
	var _originalDiv = null;
	var _isLinkOpen = false;

	function closeLink (){
		if (!_isLinkOpen) return false;
		_isLinkOpen = false;
		removeClass (_originalLink,"gmopen");
		addClass    (_originalLink,"gmclosed");
		removeNode  (_originalDiv);
		_originalDiv = null;
	}
	function event_clickClose (event) {
		event.preventDefault ();
		var divHeight = _originalDiv.clientHeight;
		var windowHeight = window.innerHeight;
		if (divHeight >= windowHeight) { 
			var linkID = generateLinkID(_originalLink.href);
			_originalLink.setAttribute("id", linkID);
			location.href = "#" + linkID;
		}
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

			// Create the content div, and display "Loading" message.
			_originalDiv = document.createElement('div'); //remember it!
			displayLoading (_originalDiv);
			addClass       (_originalDiv, "gmcontaineropenarticle");
			insertAfter    (_originalDiv, _originalLink);

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
		displayError (_originalDiv);
		return false;
	}
	function event_onload (responseDetails){
		if (!_isLinkOpen) return false;
		// If HTTP error, exit.
		if (responseDetails.status > 207) {
			displayError (_originalDiv);
			return false;
		}
		var responseHTML = responseDetails.responseText;
		var processedHTML = processResponse(responseHTML);
		if (processedHTML) {
			displayArticle (_originalDiv, processedHTML);
			// Create Close button.
			hebrewClose = String.fromCharCode(1505,1490,1497,1512,1492); //'Sgira'
			createEl( {n: 'a', a: {'@class': 'gmclosebutton', textContent: hebrewClose, href: '#' },
			             evl: {type: 'click', f: event_clickClose, bubble: true}} , _originalDiv);
		} else {
			displayError (_originalDiv);
		}
	}
	if (!processLink(_originalLink)) return true;
	addClass (_originalLink, "gmclosed");
	_originalLink.addEventListener('click', event_clickLink ,true);
});// End forEach <a>

}//End if (is it enabled)
} //end if (only main page + article pages)

