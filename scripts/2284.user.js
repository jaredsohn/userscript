//########################################################################
// Haaretz Enhancer
//
// Version 0.8
// See userscripts.org page for full description and changelog.
//
// Written by: Lior Zur, 2008
// Released under the GPL license (http://www.gnu.org/copyleft/gpl.html)
// If you reuse parts of the code, please give credit. Thanks.
// Improvements & suggestions are welcome.
//
//########################################################################
// ==UserScript==// @name           Haaretz Enhancer// @namespace      liorzur// @description    Improves Haaretz's site: streamlines front page, removes textual ads, loads articles in same page, and more.// @include        http://www.haaretz.co.il/*// @include        http://www.captain.co.il/*
// @include        http://themarker.captain.co.il/*
// ==/UserScript==
//http://www.haaretz.co.il/hasite/objects/pages/PrintArticle.jhtml?itemNo=xxxxxx  <--- URL for printing (add feature sometime.)

var currentURL = location.href;
var allElements, thisElement, newElement;
var f;
var someHTML;

// ==== Identify site areas ====

var reIsHaaretz = /^http:\/\/www\.haaretz\.co\.il/;
var reNotMainPage = /^http:\/\/www\.haaretz\.co\.il\/[^?#]/;
var reListPrintEdition = /^http:\/\/www\.haaretz\.co\.il\/hasite\/pages\/LiArtPE/;
var reSectionPage = /^http:\/\/www\.haaretz\.co\.il\/hasite\/pages\/HaSec/;
var isMainPage = (!reNotMainPage.test(currentURL) && reIsHaaretz.test(currentURL));
var isPrintArticleList = (reListPrintEdition.test(currentURL));
var isSectionPage = (reSectionPage.test(currentURL));

var reCaptainMain = /^http:\/\/themarker\.captain\.co\.il\/?$/;
var reCaptainMain2 = /^http:\/\/themarker\.captain\.co\.il\/#/;
var reCaptainMain3 = /^http:\/\/themarker\.captain\.co\.il\/captain\/pages\/indexCaptain\.jhtml/;
var reCaptainSection = /\/captain\/pages\/LiArtCaptain/;
var reCaptainSection2 = /\/captain\/pages\/CaptainPrefer/;

var isCaptainMain = (reCaptainMain.test(currentURL) || reCaptainMain2.test(currentURL) || reCaptainMain3.test(currentURL));
var isCaptainSection = (reCaptainSection.test(currentURL) || reCaptainSection2.test(currentURL));

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
//Custom string functions & methods by me (LZ)
String.prototype.trimUpTo = function (trimTexts){
	//find the first occurance of a string, and cut up to it. (array allows fallbacks)
   if (typeof trimTexts == 'string') trimTexts = [trimTexts];
	var trimPoint, s = this.toString();
	for (i in trimTexts){
		trimPoint = s.indexOf(trimTexts[i]);
		if (trimPoint != -1 ) return s.substring(trimPoint + trimTexts[i].length);
	}
	return "";
}
String.prototype.trimFrom = function (trimTexts){
	//find the last occurance of a string, and cut from it. (array allows fallbacks)
	if (typeof trimTexts == 'string') trimTexts = [trimTexts];
	var trimPoint, s = this.toString();
	for (i in trimTexts){
		trimPoint = s.lastIndexOf(trimTexts[i]);
		if (trimPoint != -1 ) return s.substring(0, trimPoint);
	}
	return "";
}
String.prototype.contains = function (substring){
	var s = this.toString();
	return (s.indexOf(substring)!=-1);
}

// ==== End Functions ====



//###### 1. Changes to layout across the site
if (isMainPage) {
//#### Improve main page
	// Remove floating ad table.
	removeNode($("newsAdd"));
	// Remove iframe near main headline
	removeElements("//iframe[@width='120']/parent::tr");

	// Remove righthand ads column. If any such column was found, expand the other column.
	if (removeElements("//td[@width='120']")) {
			allElements = $x("//td[@width='473']|//td[@width='473']/descendant::*[@width='473']");
			allElements.forEach (function(e){  e.setAttribute("width","593");  });
	}

	// Add newsflash expansion.
	allElements = $x('//marquee');
	if (allElements.length > 0){
		// Format the HTML of the current marquee.
		thisElement = allElements[0];
		someHTML = thisElement.innerHTML.replace(/<a[^>]*>/gi,'<span class="t12">').replace(/<\/a>/gi,"</span>");
		thisElement.innerHTML = someHTML;

		// Create a new DIV, with all the news flashes from the original marquee.
		newElement = document.createElement('div');
		newElement.innerHTML = someHTML;
		newElement.style.display = "none";
		addClass (newElement, "gm_newsflash");
		GM_addStyle (".gm_newsflash { background-color: #f1e3de; padding: 0 5px 5px 5px; border-top: 1px #cdaba0 solid; margin: -8px 0 0 0; }");
		insertAfter (newElement, thisElement);

		// Closure variables & functions:
		var _oldFlash = thisElement;
		var _newFlash = newElement;
		var _hover = false;
		var _newsflash = {
			_updatehover: function() {
				_oldFlash.style.display = (_hover) ? "none" : "block";
				_newFlash.style.display = (_hover) ? "block" : "none";
			},
			_mouseEnterOld: function(e) {
				e.preventDefault();
				e.stopPropagation();				
				_hover = true;
				_newsflash._updatehover ();
			},
			_mouseExitNew: function (e) {
				e.preventDefault();
				e.stopPropagation();
				_hover = false;
				setTimeout( _newsflash._updatehover , 300); //see explanation
			},
			_mouseEnterNew: function (e) {
				e.preventDefault();
				e.stopPropagation();
				_hover = true;
			}			
		}
		_oldFlash.addEventListener('mouseover',_newsflash._mouseEnterOld , true); 
		_newFlash.addEventListener('mouseout', _newsflash._mouseExitNew , true);
		_newFlash.addEventListener('mouseover', _newsflash._mouseEnterNew , true);
		
		// EXPLANATION: When mouse is out of the new div, we set
		//	a timeout of 0.3 sec with a NEW function to switch divs.
		//	In the meantime, if the mouse is (again) over the div, this
		//	switching is canceled. (This prevents strange flickering that occurs.)
	}

}
if (!isMainPage) {
	//##  On all other pages apart from the main:
	// Remove Chart.co.il textual ads.
	removeElements ("//a[contains(@href,'http://www.chart.co.il/AdParser/')]/ancestor::*[4]");
	// Remove ads that block view of talkbacks (was it a bug? or really a feature?)
	removeElements ("//iframe[@id='ads_frame']");
}
/*
if (isPrintArticleList) {
	//## On Article List of Print Edition
	// Remove righthand ads column. If a column was found, expand the other column.
		if (removeElements ("//td[@width='120']")) {
			allElements = $x("//td[@width='468']|//td[@width='468']/descendant::*[@width='468']");
			allElements.forEach (function(e){  e.setAttribute("width","588");  });
		}
}*/

if (isSectionPage){
		if (removeElements ("//td[@width='120']")) {
			allElements = $x("//td[@width='473']|//td[@width='473']/descendant::*[@width='473']");
			allElements.forEach (function(e){  e.setAttribute("width","593");  });
		}
}

if (isCaptainMain){
		if (removeElements ("//td[@width='185']")) {
			allElements = $x("//td[@width='362']|//td[@width='362']/descendant::*[@width='362']");
			allElements.forEach (function(e){  e.setAttribute("width","547");  });
		}
}
if (isCaptainSection){
		if (removeElements ("//td[@width='280']") && removeElements ("//td[@width='8']")) {
			allElements = $x("//td[@width='468']|//td[@width='468']/descendant::*[@width='468']");
			allElements.forEach (function(e){  e.setAttribute("width","756");  });
		}
}

//###### 3. Show proper name on tabs.   ===> On Print-Edition article lists.
//        (td) --> text() [END]
//          |    
//    tr  (td)    
//          |
//         td  <-- a <-- span(titleLiArtStart) [START]
// The first child of the TR is the TD which contains the section name (or, it's "two siblings before".)
if (isPrintArticleList) {
	allElements = $x("//span[@class='titleLiArtStart']/parent::a/parent::td/preceding-sibling::td[2]");
	if (allElements.length > 0){
		thisElement = allElements[0];
		var hebrewHaarez = String.fromCharCode(32,45,32,1492,1488,1512,1509);
		document.title = thisElement.textContent + hebrewHaarez;
	}
}


//###### 4. Show page icon.   ===> On ALL pages.
// This graphic is NOT taken from Haaretz's logo or graphics, it's only roughly based on them.
var imgFavIcon = "data:image/gif,GIF89a%10%00%10%00%B3%00%00TTTvvv%CF%CF%CF%F1%F1%F1%1E%1E%1E%85%85%85ggg%99%99%99%E4%E4%E4999%C2%C2%C2jjj%B2%B2%B2%00%00%00%DA%DA%DA%FF%FF%FF!%F9%04%00%00%00%00%00%2C%00%00%00%00%10%00%10%00%00%04W%D0%C9I%2Bs%2F%EB%AD%DD%7D%0C%B1%8C%E4b0%8F%87-M%EB%BA%40%FA%19o%1D%ABi%A1%EF%05%1B%C8%18%8E%06%01%40%E1%06%0B%01g%40%C0%E0%10%89%03G%40(%00%1F%8A%C6o%93%FD%E1%BA%1C%F0W%1BNXq%8E%E8ra%FC%80%84o%60e%3Ea%D8%EF%F8%BC%3D%02%00%3B";
var link = document.createElement('link');
link.setAttribute('rel', 'shortcut icon');
link.setAttribute('href', imgFavIcon);
var head = document.getElementsByTagName('head')[0];
head.appendChild(link);


//###### 5. "Open articles inside this page" feature      ===> On ALL pages + Main page.

//feature is active only inside main page + printed list articles.
if ( (isSectionPage || isMainPage) || (isCaptainMain || isCaptainSection) ){

//## Create the bottom bar (with checkbox).
GM_addStyle('div.gmbottombar {  background-color: #fef8c7;' +
' border: 1px solid #eab742; width: 630px; margin-left: auto; margin-right: auto;'+
' font-size: 11px; color: #cc5401; padding: 2px 15px;}' +
' div.gmbottombar form {display: inline;}'+
' div.gmbottombar a {color: blue; text-decoration: underline;}');
newElement = document.createElement('div');
newElement.innerHTML = '<div class="gmbottombar"><form name="gmbottomform" action=""><input type="checkbox" name="gmarticlesenable" id="gmbottomcheckbox" value="no" align="middle" /> Open articles inside this page <b>(Haaretz Enhancer feature)</b></form></div>';
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
var contentErrorMessage = '<div style="padding: 5px; background-color: #f7c8c5; text-align: center; direction: ltr; font-size: 12px; font-weight:normal;">Sorry, there was a problem loading the article.<br /><br />Tip: <b>Middle-click the link</b> to open it in a new tab.</div>';
var contentLoadingMessage = '<div class = "gmabsolutediv" style="padding: 10px; background-color: #e8e0fa; text-align: center; direction: ltr;"><div class="gmloadingarticle">Loading the article, please wait...</div></div>';


// ==== Start Site Customization Block ====

var pageParsers = [
	{//URL: Regular Ha'aretz Articles
		matchUrl: function(url){ return (url.contains('hasite/pages/') || url.contains('hasite/spages/')); },
		processPage: function(responseHTML){
			// Return processed string, or <null> for error
			var reMatches = /(<span class="t18B">[\S\s]+)<!--end switch about number of pictures in article-->/.exec(responseHTML);
			if (!reMatches) return null;
			responseHTML = "<table><tr><td><br />" + reMatches[1] + "<br /></table>";
			return responseHTML;			
		},
		generateID: function(url){
			if (url) {
				var reMatches = (/itemNo=/.test(url))  ?  /itemNo=(\d+)/.exec(url)  :  /(\d{6})/.exec(url);
				if (!reMatches) return null; //if no ID  -- open link as usual.
				return "GM" + reMatches[1];
			}
		}
	}//ENDURL
	
	,
	{//URL: City Mouse Articles
		matchUrl: function(url){ return url.contains('articles_item'); },
		processPage: function(responseHTML){
			// Return processed string, or <null> for error
			return '<div class = "katava-box"><br />' + responseHTML.trimUpTo('<div class="katava-box box">').trimFrom('<!--katava-box-->') + '</div>';
		},
		generateID: function(url){
			if (url) {
				var reMatches =  /item,(\d+),(\d+),(\d+)/.exec(url);
				if (!reMatches) return null; //if no ID  -- open link as usual.
				reMatches.shift();
				return "GM" + reMatches.join("");
			}
		}
	}//END URL
	
	,
	{//URL: Captain Internet Articles
		matchUrl: function(url){ return (url.contains('captain/spages') || url.contains('captain/pages')); },
		processPage: function(responseHTML){
			// Return processed string, or <null> for error
			var strTemp = responseHTML.trimUpTo('<span class="t18B">').trimFrom('<div id="tguvot">').trimFrom('</table>');
			if (!strTemp) return null;
			strTemp = '<table><tr><td><br /><span class="t18B">'+strTemp+'</table>';
			return strTemp;
		},
		generateID: function(url){
			if (!url) return null;
			var reMatches =  /\d{6,}/.exec(url);
			return (reMatches) ? "GM" + reMatches[0] : null;
		}
	}//ENDURL
	
	,
	{//URL: The Marker Articles
		matchUrl: function(url){ return url.contains('article.jhtml?ElementId='); },
		processPage: function(responseHTML){
			// Return processed string, or <null> for error
			var strArticleText = responseHTML.trimUpTo('class="article1">').trimFrom('<!--  -->');
			strArticleText = '<table><tbody><tr><td align="right" valign="top" dir="rtl" class="article1">' + strArticleText + '</td></tr></tbody></table>';
			//var strTemp = responseHTML.trimUpTo('class="bg"').trimFrom('<!--  -->');
			//GM_log(strArticleText);
			//strTemp = '<table><tbody><tr><td><table cellpadding="0" cellspacing="0" border="0" dir="rtl" width="100%"><tbody><tr><td align="right" valign="top" dir="rtl" class="bg"' + 
			//				+ strTemp + '</td></tr></tbody></table>';
			return strArticleText;
		},
		generateID: function(url){
			if (!url) return null;
			var reMatches =  /\d{7,}/.exec(url);
			return (reMatches) ? "GM" + reMatches[0] : null;
		}
	}//ENDURL
];

var siteMimeType = 'text/html; charset=windows-1255';

function processLink(element){
// Process each link, and test if it's good (return false if not).
	// Remove the site's original mouseover / mouseout functions
	element.setAttribute("onmouseout",""); //for some reason only these work.
	element.setAttribute("onmouseover","");
	return true; 	//No testing condition
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

//Add City Mouse CSS
GM_addStyle(".katava-box p {font-size:14px;} .katava-box p, .katava-box span { margin-top:14px; text-align:justify; } .katava-box h1 { color:#002B5F; font-size:24px; text-indent:0 !important; } .katava-box em { color:#33638D; font-size:14px; font-weight:bold; } .katava-box .inline-box {clear:left;float:left;margin:0 10px 10px 0;width:220px;}");

var myXPath;
if(isMainPage) { myXPath = "//table[@width = '593']/descendant::a[contains(@href,'/hasite/pages/ShArt') or contains(@href,'hasite/spages/') or contains(@href,'articles_item') or contains(@href,'captain/spages')]";}
if (isSectionPage){ myXPath = "//table[@width = '593']/descendant::a[contains(@href,'/hasite/pages/ShArt') or contains(@href,'hasite/spages/')or contains(@href,'articles_item') or contains(@href,'captain/spages')]"; }
if (isCaptainMain){ myXPath = "//td[@width = '547']/descendant::a[contains(@href,'captain/pages') or contains(@href,'captain/spages')]"; }
if (isCaptainSection){ myXPath = "//td[@width = '756']/descendant::a[contains(@href,'captain/pages') or contains(@href,'captain/spages')]"; }

// ==== End Site Customization Block ====

allElements = $x(myXPath);
allElements.forEach ( function (thisElement, i, c){
	//Closure Variables
	var _originalLink = thisElement; // (Remember this <A> node)
	var _originalDiv = null;
	var _isLinkOpen = false;
	var _funcProcessPage = null; // BIND CORRECT FUNCTION
	var _funcGenerateID = null; // BIND CORRECT FUNCTION

	//Closure Functions
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
		var divHeight = _originalDiv.firstChild.clientHeight;
		var windowHeight = window.innerHeight;
		if (divHeight >= windowHeight) { 
			var linkID = _funcGenerateID(_originalLink.href);
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
		var processedHTML = _funcProcessPage(responseHTML); // SHOULD BE URL-RELEVANT
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
	//Do stuff
	if (!processLink(_originalLink)) return true;
	addClass (_originalLink, "gmclosed");
	_originalLink.addEventListener('click', event_clickLink ,true);
	//Bind correct page parser for that type of URL:
	for (i in pageParsers){
		p = pageParsers[i];
		if (p.matchUrl(_originalLink.href)){
			_funcProcessPage = p.processPage;
			_funcGenerateID = p.generateID;
			break;
		}
	}
});// End forEach <a>

}//End if (is it enabled)
} //end if (only main page + article pages)

