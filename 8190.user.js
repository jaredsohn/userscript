//########################################################################
//   NRG Enhancer  v0.11
//
// *** Technical details: ***
// See userscripts.org page for full description and changelog.
//
// By: Lior Zur, 2007
// Released under the GPL license (http://www.gnu.org/copyleft/gpl.html)
// If you reuse parts of the code, please give proper credit. Thanks.
// Improvements & suggestions are welcome.
//
//########################################################################
// ==UserScript==
// @name           NRG Enhancer
// @namespace      liorzur_nrgenhancer
// @description    Improves NRG, allows you to read articles without leaving the front page.
// @include        http://www.nrg.co.il/*
// ==/UserScript==
var allElements, thisElement, newElement;
var f, g;
var bIsItEnabled;
var reMainSections = /\/HP_\d/;
//var reArticles = /http:\/\/www\.ynet\.co\.il\/articles/;
var currentURL = location.href;


// ==== Functions ====
function addGlobalStyle(css) { var head, style; head = document.getElementsByTagName('head')[0];
    if (!head) { return; } style = document.createElement('style');
    style.type = 'text/css'; style.innerHTML = css; head.appendChild(style);}

function loadManipulatedCSS (cssURL, myClass) {
// Reads a remote CSS file, prefixes myClass to each entry, and loads it.
	GM_xmlhttpRequest({	method: 'GET', url: cssURL,
		headers: {'User-agent': 'Mozilla/4.0 (compatible)', 'Accept': 'text/css',},
		onload: function(result) {
			var css = result.responseText.replace(/\}\s*([\.\w#])/g,"} " + myClass + " $1");
			addGlobalStyle(css);
		}});
}

function loadCSS(cssURL) { 
  var head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	var link = document.createElement('link')
	link.rel = 'stylesheet'; link.type = 'text/css'; link.href = cssURL;
	head.appendChild(link);	
}

function removeNode (element){
	if (element) element.parentNode.removeChild(element);
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
// ==== End Functions ====




//#### "Open articles inside this page" feature
if (reMainSections.test(currentURL)) {

//## Create the bottom bar (with checkbox).
addGlobalStyle('div.gmbottombar {  background-color: #fef8c7;' + 
' border: 1px solid #eab742; width: 54em; height: 20px; clear: both;'+
' margin-left: auto; margin-right: auto;'+
' font-size: 11px; color: #cc5401;'+
' padding: 2px 15px;}' +
' div.gmbottombar form {display: inline;}'+
' div.gmbottombar a {color: blue; text-decoration: underline;}'+
' span#gmbottomhelpspan {padding: 0 0 0 15em;}');
newElement = document.createElement('div');
newElement.innerHTML = '<form name="gmbottomform" action=""><input type="checkbox" name="gmarticlesenable" value="no" align="middle" id="gmbottomcheckbox" /> Open articles inside this page <b>(NRG Enhancer)</b></form><span id="gmbottomhelpspan"><a href="#" id="gmbottomhelp">Click here for help.</a></span>';
newElement.className = "gmbottombar";
document.body.appendChild(newElement);

var locateCheckBox = document.getElementById("gmbottomcheckbox");
locateCheckBox.addEventListener('click', function(event) {
	var bIsItEnabled1 = this.checked
	GM_setValue ("bIsItEnabledNRG", bIsItEnabled1);
	//event.preventDefault();
	window.location.reload();
}, true); 
//## See whether "Is It Enabled"; change checkbox accordingly.
bIsItEnabled = GM_getValue("bIsItEnabledNRG", true); //default - enabled.
locateCheckBox.checked = bIsItEnabled; //setAttribute ("checked" , bIsItEnabled);
locateCheckBox = null;

thisElement = document.getElementById("gmbottomhelp");
thisElement.addEventListener('click', function(event) {
	alert ("This script is experimental, so no help is available yet. Sorry.\n");
	event.preventDefault();
}, true); 
thisElement = null;


if (bIsItEnabled) {

//## Stop auto refresh
//<META HTTP-EQUIV="REFRESH" CONTENT="600">
// Taken and modified from Pirateshark's http://userscripts.org/scripts/show/3587
// who  in turn took it from http://dunck.us/collab/DisableAutoRefresh
allElements = $x("//meta[@http-equiv='Refresh']|//meta[@http-equiv='refresh']|//meta[@http-equiv='REFRESH']");
var content, stopTimer;
for (f = 0; f < allElements.length; f++) {
	thisElement = allElements[f];
	content = thisElement.getAttribute("content");
	stopTimer = window.setTimeout("window.stop();",(content-1)*1000); // in case load hasn't finished when the refresh fires
	window.addEventListener("load", function(){
	   try { window.clearTimeout(stopTimer); } catch(ex) {}
	   window.stop();
	   }, true);
}


//## Create the necessary styles.
addGlobalStyle("a.gmclosed {  background-color: none ! important; " +
		"border-bottom: #bebdb5 dashed 1px ! important; "+
		"text-decoration: none ! important;}"+
		"a.gmclosed:hover{  background-color: #d19dfb ! important; } " +
		"a.gmopen {  background-color: #d19dfb ! important; " +
		"border-bottom: 0 ! important; "+
		"text-decoration: none ! important;}"+
		//.gmopenarticle (the opened div.)
		".gmopenarticle {   z-index: 502;  background: white repeat-x top left url("+
		"data:image/gif,GIF89a%0A%00%0F%00%B3%00%00%EE%DA%FD%E2%C2%FD%F8%F0%FE%F5%E9%FE%DF%BA%FC%EA%D2%FD%FB%F6%FF%FD%FB%FF%D3%A1%FB%D5%A6%FB%E6%CA%FD%D1%9D%FB%F1%E2%FE%DB%B3%FC%D8%AC%FC%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%0A%00%0F%00%00%04%2Fp%C9I%91%BD8%E9%CD%9D%FF%60%23%8E%24a%9Eh%A0%AE%AC%E2%BEp!%CF4%60%DF8%A3%EF%FC%E0%FF%40%81pH4%18%8F%C8%83r%C9%8C%00%00%3B);"+
		" border: #d19dfb solid 1px;  padding: 15px;  font-weight: normal; text-align: right;  margin: 0;} "+
		".gmopenarticle p { margin: 0;  z-index: 501;}"+
		//.gmabsolutediv (adition class for the preceding 2 divs, to make them absolutely positioned!)
		".gmabsolutediv {position: absolute;  right: -120px;  width: 412px;   z-index: 503;}"+
		//.gmcontaineropenarticle (container of the opened div) (if the div is absolutely positioned!)
		".gmcontaineropenarticle {position: relative;   z-index: 504;}"+
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
var contentErrorMessage = '<div style="padding: 5px; background-color: #f7c8c5; text-align: center; direction: ltr; font-size: 12px;">Sorry, there was a problem loading the article.<br />Please try again, or try another link. If you conclude the script has broken, report to me.<br /><br /><b>Note:</b> You can always middle-click the link to open it in a new tab!</div>';
var contentLoadingMessage = '<div class = "gmabsolutediv" style="padding: 10px; background-color: #e8e0fa; text-align: center; direction: ltr;"><div class="gmloadingarticle">Loading the article, please wait...</div></div>';


//CUSTOMIZED
//addGlobalStyle(".artcontent_13182, .artcontent_13176, .off_padding_art_h { overflow: visible ! important;}");
allElements  = $x("//div[contains(@class,'artcontent')]|//div[contains(@class,'off_padding')]");
for (f = 0; f < allElements.length; f++) {
    thisElement = allElements[f];
		thisElement.style.overflow = "visible"; // "overflow: visible ! important;";
}

function processResponse (responseHTML, linkID) {
	// ---- CUSTOMIZED Highly modifiable function for different sites. ----
	// Return processed string, or <null> for error

	// Find trimming points
	var startPoint = responseHTML.indexOf("<!--Start Table Body Article-->");
	var endPoint = responseHTML.lastIndexOf("<!--End Table Body Article-->");
	if ((endPoint == -1)||(startPoint == -1)||(endPoint <= startPoint)) 
		return null;

	// Trim HTML
	responseHTML = responseHTML.substring(startPoint,endPoint);
	endPoint = responseHTML.lastIndexOf('<iframe');
	if (endPoint != -1) responseHTML = responseHTML.substring(0,endPoint) + '</tr></td></table>';
	responseHTML = '<Table border="0" cellPadding="0" cellSpacing="0" width="408" dir="ltr">' + responseHTML;
	
	// Wrap HTML in tags and Close button
	var hebrewCloseText = String.fromCharCode(1505,1490,1497,1512,1492); //'Sgira'
	responseHTML = "<div class='gmopenarticle gmabsolutediv gm_css'>"
			+ responseHTML
			+ "<a href='#' class='gmcloselink' id='closebutton"+ linkID +"'>"+hebrewCloseText+"</a></div>"
	return responseHTML;
}

//CUSTOMIZED
loadManipulatedCSS("http://www.nrg.co.il/online/artcss/article.css", ".gm_css");

//## Run the loop on all appropriate links.
var MyXPath = "//a[contains(@href,'/ART')]";
allElements = $x(MyXPath); //document.evaluate(MyXPath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (f = 0; f < allElements.length; f++) {
	thisElement = allElements[f];

	// Fix javascript links.
	var theHref = thisElement.getAttribute("href");
	if (theHref.indexOf("javascript:") != -1){
		var reFixMatch = /"(http[^"]+)"/gi.exec(theHref);
		var reFixMatch = /'(\/[^']+)'/gi.exec(theHref);
		if (reFixMatch) theHref = reFixMatch[1];
		thisElement.setAttribute("href", theHref);
	}

	// Set the style
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
		var linkStatus;
		var myOriginalLink = this; // (Remember this <A> node)
		event.preventDefault();
		event.stopPropagation();
		
		// Get an ID for the link.
		var reMatches = /\/online\/(\d{1,3})\/ART(\d)\/(\d{3,4})\/(\d{3,4})/.exec(this.href) //CUSTOMIZED
		if (reMatches == null) {return true;} //if no ID  -- open link as usual.
		var linkID = "GM" + reMatches[1] + reMatches[2] + reMatches[3] + reMatches[4];

		// Check if link is "open" or "closed" (using custom attribute "gm"):
		var linkStatus = this.getAttribute ("gm");
		if (!linkStatus) linkStatus = "";

		if (linkStatus == ""){ // if link is closed.\
			this.setAttribute("gm", linkID);
			removeClass (this, "gmclosed");
			addClass    (this, "gmopen");

			// Create the content div
			var newElement = document.createElement('div');
			newElement.innerHTML =  contentLoadingMessage;
			addClass (newElement, "gmcontaineropenarticle");
			this.parentNode.insertBefore(newElement, this.nextSibling); //(insert after this one).

			GM_xmlhttpRequest({
				method: 'GET',
				url: this.href,
				headers: {'User-agent': 'Mozilla/4.0 (compatible)',
				'Accept': 'text/xml,application/xml,application/xhtml+xml,text/html',}, //Accept=text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5
				overrideMimeType: 'text/html; charset=windows-1255', //ISO-8859-1,utf-8;q=0.7,*;q=0.7
				onerror: function(responseDetails) {
					var linkStatus = myOriginalLink.getAttribute ("gm");
					if (linkStatus == "") return false;
					myOriginalLink.nextSibling.innerHTML = contentErrorMessage;
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
						myOriginalLink.nextSibling.innerHTML = contentErrorMessage;
						return false;
					}
					
					processedHTML = processResponse(responseHTML, linkID);

					if (processedHTML) {
						myOriginalLink.nextSibling.innerHTML = processedHTML;
						if (responseHTML.length > 2500) addClass (myOriginalLink.nextSibling, "gmcontaineropenarticle");  //Container is "relative". (so inside, the absolute positioning referes to it)

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
						myOriginalLink.nextSibling.innerHTML = contentErrorMessage;
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

/*
Sections:
http://www.nrg.co.il/online/HP_16.html
http://www.nrg.co.il/online/1/HP_480.html
http://www.nrg.co.il/online/1/HP_780.html
http://www.nrg.co.il/online/16/HP_1903.html
http://www.nrg.co.il/online/16/HP_1901.html
/HP_\d{1,5}\.html/
Articles:
http://www.nrg.co.il/online/7/ART1/561/558.html
http://www.nrg.co.il/online/35/ART1/561/568.html
http://www.nrg.co.il/online/1/ART1/562/010.html
http://www.nrg.co.il/online/1/ART1/561/980.html
http://www.nrg.co.il/online/46/ART1/561/108.html
http://nrg.co.il/online/46/ART1/561/108.html
Problematic Articles:
http://www.nrg.co.il/online/7/ART1/538/478.html
//		var reMatches = /(\d),(\d{4}),L-(\d{7}),(\d{2})/.exec(this.href);
//"http://nrg.co.il/online/46/ART1/561/108.html"
//reMatches = /\/online\/(\d{1,3})\/ART(\d)\/(\d{3,4})\/(\d{3,4})/.exec("http://nrg.co.il/online/46/ART1/561/108.html")

Articles need this CSS:
<link href="/online/artcss/article.css" rel="stylesheet" type="text/css">
addLinkToCSS("/online/artcss/article.css");
*/