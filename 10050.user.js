// ==UserScript==

// @name           SafariMax

// @namespace      http://www.steelsphere.com/Safari

// @description    Press "H" for Help when loaded. Helps make Safari Books Online a more usable site for extended reading, by changing the UI and adding in keyboard navigation.

// @include        http://safari.informit.com/*

// ==/UserScript==


/// Parts of this script came from the original Safari Keys and Safari Beautifier - props to the original authors.
// TODO: do a better job pulling the content out when everything else is hidden.  There is an ajax function in the safari pages
// so we should be able to tap into that and get rid of the flicker of the header and left menu.
// Better fonts would be nice as well.


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


function linkPage(linkText) {
	for (i=0; i<document.links.length; i++) {
		if (document.links[i].title == linkText) {
			window.location = document.links[i];
		}
	}
	return false;
}


function hide()
{
	// Hide the left nav
	document.getElementById('ShowedLeftMenu').style.display = "none";
	document.getElementById('HideBtn').style.display = "none";

	// Hide the top	
	document.getElementById('header').style.display = "none";

	// hide the purchase now image for rough cuts
	addGlobalStyle(".bookContentTitle {display:none;}");

	//footer
	addGlobalStyle(".footertable {display:none;}");

	GM_setValue("hidden", true);
}


function show()
{
	// Show the left nav
	document.getElementById('ShowedLeftMenu').style.display = "table";
	document.getElementById('HideBtn').style.display = "block";

	// Show the top
	document.getElementById('header').style.display = "";

	// show the purchase now image for rough cuts
	addGlobalStyle(".bookContentTitle {display:inline;}");

	//footer
	addGlobalStyle(".footertable {display:inline;}");
	GM_setValue("hidden", false);
}


function toggleTable(className, show)
{

	var top = getElementsByClassName(document, "table", className);
	for (i=0; i<top.length; i++)
	{
		if (show)
		{
			top[i].style.display = "";
		}
		else
		{
			top[i].style.display = "none";
		}
	}
}


function getElementsByClassName(oElm, strTagName, strClassName){
var arrElements = (strTagName == "*" && document.all)? document.all : oElm.getElementsByTagName(strTagName);
	    var arrReturnElements = new Array();
	    strClassName = strClassName.replace(/\-/g, "\\-");
	    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
	    var oElement;
	    for(var i=0; i<arrElements.length; i++){
	        oElement = arrElements[i];
	        if(oRegExp.test(oElement.className)){
	            arrReturnElements.push(oElement);
	        }
	    }
	    return (arrReturnElements)
	}

window.addEventListener("keydown", function(e) {
	var keyCode, keyChar
	if (!e) var e = window.event;
	if (e.keyCode) { keyCode = e.keyCode; }
	else if (e.which) { keyCode = e.which; }
	
	keyChar = String.fromCharCode(keyCode);

	// These keycodes are similar to Google Reader - change them to whatever you like.
	// NOTE: If you change the keymappings, it would be good of you to change the showHelp function to match.
	
	if ((keyChar == "J") || (keyCode == 39)) { if (linkPage("Next") == false) {linkPage("Start Reading");} }
	if ((keyChar == "K") || (keyCode == 37)) { linkPage("Previous");}
	if (keyChar == "U") { if (!GM_getValue("hidden", false)) {hide();} else {show();} }
	if ((keyChar == "P")) { linkPage("Print"); }
	if ((keyChar == "D")) { linkPage("Download"); }
	if ((keyChar == "V")) { linkPage("View Notes"); }
	if ((keyChar == "N")) { linkPage("Add Note"); }
	if ((keyChar == "B")) { if (linkPage("Add Bookmark") == false) {linkPage("Remove Bookmark");} }
	if ((keyChar == "C")) { linkPage("Table of Contents"); }
	if ((keyChar == "I")) { linkPage("Index"); }
	if ((keyChar == "L")) { loadLast();}
	if ((keyChar == "S")) { saveLast();}
	if ((keyChar == "H")) { showHelp();}
}, false);

function loadLast()
{
	window.location = GM_getValue("lastSafariLocation", null);
}

function saveLast()
{
	GM_setValue("lastSafariLocation", window.location.href);
	alert("Location Saved");
}

function showHelp()
{
	alert("SafariMax, a GreaseMonkey Script for Safari Books Online\n\nCreated by Dave Sanders, 2007-06-19\nFree for all modification and use.\n\nJ - Next Page\nK - Previous Page\nU - Show/hide header, sidebar and footer\nS - Remember this page between visits\nL - Load last remembered page\nC-Table of Contents\nI - Index\nB - Add / Remove Bookmark\n\P - Print\nD - Download\nV - View Notes\nN - Add Note\nH - This help\n\n\nTip: When you are done reading, press S to save your current page.\nThe next time you return to Safari in that browser, press L to load\n the page you saved.  Nice for picking back up where you left off.");	
}


if (window.addEventListener)
{
	window.addEventListener('load', function() {if (GM_getValue("hidden", false)) {hide();}}, true);
}


