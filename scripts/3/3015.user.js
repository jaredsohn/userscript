//########################################################################
//   Ynet Article Viewer  v0.2
//
// *** Description: ***
//  This script lets you read articles without leaving the front page.
//  When clicking on a link to an article, the article will be shown
//  inside the current page, just below the link you clicked.
//
//  Note: This script is experimental. But it shouldn't break anything,
//  and you can easily turn it off by unchecking the check box 
//  that appears at the bottom of the page.
//
// *** Technical details: ***
//
// By: Lior Zur, 2006
// Released under the GPL license (http://www.gnu.org/copyleft/gpl.html)
// If you reuse parts of the code, please give proper credit. Thanks.
// Improvements & suggestions are welcome.
//
// Change Log:
//  0.21 (3.10.06): Improved "Close" button functionality.
//  0.2 (28.1.06): Added "Close" button, fixed broken pages, better stability.
//  0.1 (26.1.06): First experimental version.
//
//########################################################################
// ==UserScript==
// @name           Ynet Article Viewer
// @namespace      http://mywebsite.com/myscripts
// @description    Lets you read articles without leaving the front page. (v0.2)
// @include        http://*.ynet.co.il/*
// @include        http://ynet.co.il/*
// ==/UserScript==
var currentURL;
var allElements, thisElement, anotherElement, newElement;
var f, g;
var someHTML;
var bIsItEnabled;

function addGlobalStyle(css) { var head, style; head = document.getElementsByTagName('head')[0];
    if (!head) { return; } style = document.createElement('style');
    style.type = 'text/css'; style.innerHTML = css; head.appendChild(style);}

var reMainSections = /http:\/\/www\.ynet\.co\.il\/home/;
currentURL = location.href;


//GM_log("script started...");
if (reMainSections.test(currentURL)) {
//GM_log("script enters main section...");


// "Open articles inside this page" feature
//###################################################################################

//## Create the bottom bar (with checkbox).
addGlobalStyle('div.gmbottombar {  background-color: #fef8c7;' + 
' border: 1px solid #eab742; width: 54em;'+
' margin-left: auto; margin-right: auto;'+
' font-size: 11px; color: #cc5401;'+
' padding: 2px 15px;}' +
' div.gmbottombar form {display: inline;}'+
' div.gmbottombar a {color: blue; text-decoration: underline;}'+
' span#gmbottomhelpspan {padding: 0 0 0 15em;}');
newElement = document.createElement('div');
newElement.innerHTML = '<form name="gmbottomform" action=""><input type="checkbox" name="gmarticlesenable" value="no" align="middle" id="gmbottomcheckbox" /> Open articles inside this page <b>(Ynet article viewer)</b></form><span id="gmbottomhelpspan"><a href="#" id="gmbottomhelp">Click here for help.</a></span>';
newElement.className = "gmbottombar";
document.body.appendChild(newElement);

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

thisElement = document.getElementById("gmbottomhelp");
thisElement.addEventListener('click', function(event) {
	alert ("This script is highly experimental, so no help is available yet. Sorry. -Lior \n");
	event.preventDefault();
}, true); 
thisElement = null;


if (bIsItEnabled) {

//## Create the necessary styles.
addGlobalStyle("a.gmclosed {  background-color: none ! important; " +
		"border-bottom: #bebdb5 dashed 1px ! important; "+
		"text-decoration: none ! important;}"+
		"a.gmopen {  background-color: #d19dfb ! important; " +
		"border-bottom: 0 ! important; "+
		"text-decoration: none ! important;}"+
		//.gmopenarticle (the opened div.)
		".gmopenarticle {  background: white repeat-x top left url("+
		"data:image/gif,GIF89a%0A%00%0F%00%B3%00%00%EE%DA%FD%E2%C2%FD%F8%F0%FE%F5%E9%FE%DF%BA"+
		"%FC%EA%D2%FD%FB%F6%FF%FD%FB%FF%D3%A1%FB%D5%A6%FB%E6%CA%FD%D1%9D%FB%F1%E2%FE%DB%B3%FC%D8"+
		"%AC%FC%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%0A%00%0F%00%00%04%2Fp%C9I%91%BD8%E9"+
		"%CD%9D%FF%60%23%8E%24a%9Eh%A0%AE%AC%E2%BEp!%CF4%60%DF8%A3%EF%FC%E0%FF%40%81pH4%18%8F%C8%83r%C9%8C%00%00%3B);"+
		" border: #d19dfb solid 2px;  padding: 15px;  font-weight: normal; text-align: right;  margin: 0;} "+
		".gmopenarticle p { margin: 0;}"+
		//.gmabsolutediv (adition class for the preceding 2 divs, to make them absolutely positioned!)
		".gmabsolutediv {position: absolute;  right: -120px;  width: 400px; }"+
		//.gmcontaineropenarticle (container of the opened div) (if the div is absolutely positioned!)
		".gmcontaineropenarticle {position: relative;}"+
		//.gmloadingarticle  (Loading article animation)
		"div.gmloadingarticle {  background: no-repeat top left url("+
		"data:image/gif,GIF89a%0A%00%0A%00%80%01%00%3A%3BT%FF%FF%FF!%FF%0BNETSCAPE2.0%03%01%00%00%00" +
		"!%F9%04%09%0A%00%01%00%2C%00%00%00%00%0A%00%0A%00%00%02%12%04%82i%9B%B1%8F%9E%9C%D48%AAd%BBv_%0F%06" + 
		"%05%00!%F9%04%09%0A%00%01%00%2C%00%00%00%00%0A%00%0A%00%00%02%11%8C%8F%99%00%CA%8F%9E4%B2%DA%CB%02%3" + 
		"EvAS%00%00!%F9%04%09%0A%00%01%00%2C%00%00%00%00%0A%00%0A%00%00%02%10%8C%8F%A9%CB%08%A0%9Etr%86%8A%B3~" +
		"W%87%02%00!%F9%04%09%0A%00%01%00%2C%00%00%00%00%0A%00%0A%00%00%02%0E%8C%8F%A9%CB%ED%09%80%8A%14%D1k%AE" +
		"%D6%05%00!%F9%04%05%0A%00%01%00%2C%00%00%00%00%0A%00%0A%00%00%02%0C%8C%8F%A9%CB%ED%0F%0D%00jZd%0B%00%3B);"+
		" padding: 0 0 0 20px; text-align: left; display: block; width: 17em; margin-left: auto; margin-right: auto;"+
		" font-size: 12px; color: #370f6e; }"+
		//.gmcloselink (The Close button)
		"a.gmcloselink { background-color: #cdb1e1; display: block; padding: 2px; width: 5em; text-align: center;"+
		"font-size: 12px; font-weight: bold; color: white; } "+
		"a.gmcloselink:hover {background-color: #D88AFF;}"+
		"");

var MyXPath = "//a[contains(@href,'/articles/')]";
//## Run the loop on all appropriate links.
allElements = document.evaluate(
    MyXPath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	//GM_log ("links being processed: " + allElements.snapshotLength);

for (f = 0; f < allElements.snapshotLength; f++) {
	thisElement = allElements.snapshotItem(f);
	
	//## Fix javascript links.
	var theHref = thisElement.getAttribute("href");
	if (theHref.indexOf("javascript:openInnewWindow") != -1){
		//thisElement.setAttribute("class","gmopen");
		var reFixMatch = /"(http[^"]+)"/gi.exec(theHref);
		if (reFixMatch) theHref = reFixMatch[1]; //theHref.substring(theHref.indexOf('"')+1,theHref.lastIndexOf('"'));
		thisElement.setAttribute("href", theHref);
		reFixMatch = null;
	}

	//## Set the style (classes)
	thisClass = thisElement.getAttribute("class");
	if ((!thisClass) || (thisClass=="")){ thisClass = "gmclosed";}
	else {thisClass = thisClass + " gmclosed"}
	thisElement.setAttribute ("class",thisClass);
	//## Remove the site's original mouseover / mouseout functions
	thisElement.addEventListener('mouseover', function(event) {	event.preventDefault(); event.stopPropagation();}, true); 
	thisElement.addEventListener('mouseout', function(event) {event.preventDefault(); event.stopPropagation();}, true); 
	thisElement.setAttribute("onmouseout",""); //for some reason only these work. hmm...
	thisElement.setAttribute("onmouseover","");

	thisElement.addEventListener('click', function(event) {
	///////////////////////////////////////////
	//    The function inside each link.
	///////////////////////////////////////////
		var myOriginalNode = this; //## Remember this node (closure)
		var theIFrame, myIFrame, ourID;
		var reMatches, oldCSSClass;
		reMatches = /(\d),(\d{4}),L-(\d{7}),(\d{2})/.exec(this.href);
		
		//## First we must have a special ID for all operations. (from the href, of course)
		if (reMatches == null) {return true;} //if no ID found -- open link as usual.

		ourID = "GM" + reMatches[1] + reMatches[2] + reMatches[3] + reMatches[4]; //Get the ID.
		//GM_log ("A link was clicked. Generated ID: " + ourID);
		//Check if the link is "open" or "closed" (we store that in the ID):
		var CurrId = this.getAttribute ("id");
		if (!CurrId) CurrId = "";
		//================== If the link wasn't not clicked yet...
		if (CurrId == ""){
			//GM_log ("Load the article.");
			//## Create a new iframe. (add an ID (+ IF)).
			myIFrame = document.createElement('iframe');
			myIFrame.setAttribute("id",ourID + "IF");
			//GM_log ("iFrame is assigned ID: "+ ourID + "IF");
			myIFrame.style.border = myIFrame.style.width = myIFrame.style.height = '0px';
			document.body.appendChild(myIFrame);
			//## Create a new div, for loading operation:
			this.setAttribute("id", ourID);
			var newElement2, strHTML2;
			newElement2 = document.createElement('div');
			newElement2.setAttribute("class","gmcontaineropenarticle");
			newElement2.innerHTML =  '<div class = "gmabsolutediv" style="padding: 10px; background-color: #e8e0fa; text-align: center; direction: ltr;"><div class="gmloadingarticle">Loading the article, please wait...</div></div>';
			this.parentNode.insertBefore(newElement2, this.nextSibling); //insert after this one.

			//## Get the article, and define function to display it afterwards.
			myIFrame.addEventListener('load', function(event) {
				//////////////////////////////////////////////////
				// The function called by the iFrame when loaded.
				///////////////////////////////////////////////////
				// USES CLOSURE: myIFrame, myOriginalNode, ourID
				// ## Locate everything (iframe, div, etc.):
				var insideHTML;
				var insideHTML2;
				//var findIFrame = myIFrame;
				var theDiv = myOriginalNode.nextSibling;
				//GM_log ("Article loaded into iFrame. Find iFrame using ID: "+ ourID + "IF");
				var findIFrame = document.getElementById(ourID + "IF");

				if (!findIFrame){return true;}
				insideHTML = findIFrame.contentDocument.body.innerHTML;

				//Strange hack needed here: although the source code shows no quotation marks, they're still needed.  That's [\"\s]*
				var stringFirstPoint;
				var stringLastPoint;
				var stringTempPoint; //(for various other operations)
				stringFirstPoint = insideHTML.indexOf("text20b");
				//Determine last point of article (several alternative fall-back options):
				stringLastPoint = insideHTML.lastIndexOf("CdaTalkBack");
				if (stringLastPoint == -1) stringLastPoint = insideHTML.lastIndexOf("CdaArticlePrintPreview");
				if (stringLastPoint == -1) stringLastPoint = insideHTML.lastIndexOf("CdaArticleSendtoForm");

				if ((stringLastPoint != -1)&&(stringFirstPoint != -1)&&(stringLastPoint > stringFirstPoint)) {
					//## Trunctuate and format the article text:
					insideHTML = insideHTML.substring(stringFirstPoint,stringLastPoint); //cut from First to Last.
					stringTempPoint = insideHTML.lastIndexOf("<table"); //Now remove last table.
					if (stringTempPoint != -1) insideHTML = insideHTML.substring(0,stringTempPoint);

					//## Load the article into the DIV we created before (which said "loading").
					//## Check article length. If extremely short, don't position absolutely. (act smartly.)
					stringTempPoint = insideHTML.length;
					var HebrewCloseText = String.fromCharCode(1505,1490,1497,1512,1492); //'Sgira'
					if (stringTempPoint > 2500){
						insideHTML2 = "<div class='gmopenarticle gmabsolutediv'><p><font class=\"" + insideHTML + "<a href='#' class='gmcloselink' id='gmclose"+ ourID +"'>"+HebrewCloseText+"</a></div>"
						theDiv.innerHTML = insideHTML2;
						theDiv.setAttribute("class","gmcontaineropenarticle"); //Container is "relative". (so inside, the absolute positioning referes to it)
					} else {
						insideHTML2 = "<div class='gmopenarticle' style='padding: 10px 0 0 0 ! important; border-width: 0 0 2px 0 ! important;'><p><font class=\"" + insideHTML + "<a href='#' class='gmcloselink' id='gmclose"+ ourID +"'>"+HebrewCloseText+"</a></div>"
						theDiv.innerHTML = insideHTML2;
					}
					//## Set the close article function
					var findCloseArticle = document.getElementById("gmclose" + ourID);
					if (findCloseArticle) {
						findCloseArticle.addEventListener('click', function(event) {
							///////////////////////////////////////////
							// Close Article button function.
							///////////////////////////////////////////
							// USES CLOSURE: myOriginalNode, ourID (from 2 deep!)
							//Note: there is no iframe for sure now. 
							//## NEW: if article was excessively long, jump to its start.
							var myHeight = myOriginalNode.nextSibling.firstChild.clientHeight; //height of DIV.
							var windowHeight = window.innerHeight; //height of window.
							if (myHeight >= windowHeight) { location.href = "#" + ourID; }
							//Just delete the div,
							myOriginalNode.parentNode.removeChild(myOriginalNode.nextSibling);
							//## Change to default style
							oldCSSClass = myOriginalNode.getAttribute ("class");
							oldCSSClass = oldCSSClass.replace("gmopen","");
							myOriginalNode.setAttribute ("class", oldCSSClass + " gmclosed");
							//## Reset its id
							myOriginalNode.setAttribute("id", "");
							event.preventDefault();
							///////////////////////////////////////////
						}, true); 

						
					}
				} else {
					theDiv.innerHTML = '<div style="padding: 5px; background-color: #f7c8c5; text-align: center; direction: ltr; font-size: 12px;">Sorry, there was a problem loading the article.<br />Please try again, or try another link. If you conclude the script has broken, report to me.<br /><br /><b>NOTE:</b> You can always middle-click the link to open it in a new tab!</div>';
				}
				
				//## In any case, remove temporary iframe.
				//Bugfix: set timeout to remove iframe. (workaround for Mozilla bug 305471)
				setTimeout( function() {
				 //GM_log("IFRAME REMOVED (after load article)");
				 findIFrame.parentNode.removeChild(findIFrame); }, 1500);
				innerHTML = null;
				reMatches2 = null;
				
				///////////////////////////////////////////
			}, true);

			//## Change to "open" style
			oldCSSClass = this.getAttribute ("class");
			oldCSSClass = oldCSSClass.replace("gmclosed","");
			this.setAttribute ("class", oldCSSClass + " gmopen");		
			//## Load the iFrame.
			myIFrame.setAttribute("src", this.href);
		//================== If there the link was clicked...
		} else {
			//GM_log ("Close the article.");
			//## Check if the iframe still exists; if so, cancel and delete.
			//GM_log ("Article was closed. Trying to close iFrame. Find iFrame using ID: "+ ourID + "IF");
			theIFrame = document.getElementById(ourID + "IF");
			if (theIFrame){
				//Bugfix: set timeout to remove iframe.
				//setTimeout( function() {
				//GM_log("IFRAME REMOVED (after close article)");
				theIFrame.parentNode.removeChild(theIFrame); //}, 1500);
			}
			this.parentNode.removeChild(this.nextSibling);
			//## Change to default style
			oldCSSClass = this.getAttribute ("class");
			oldCSSClass = oldCSSClass.replace("gmopen","");
			this.setAttribute ("class", oldCSSClass + " gmclosed");
			this.setAttribute("id", "");
		}
		event.preventDefault();
		event.stopPropagation();
	///////////////////////////////////////////
	}, true); 

}//End for (loop every <A>)
}//End if (is it enabled)
} //End if (is it Main Section)
//GM_log("script stops.");
