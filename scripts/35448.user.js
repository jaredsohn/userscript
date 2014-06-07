// Clean Intranet
// version 0.4
// 2008-10-13
// Copyright (c) 2008, Stuart Crouch
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// IF YOU ARE UPGRADING FROM A PREVIOUS VERSION OF Clean Intranet, go to
// Tools/Manage User Scripts and manually uninstall the previous
// version before installing this one.  Sorry, this is a limitation
// of Greasemonkey.
// 
// To uninstall, go to Tools/Manage User Scripts,
// select "Clean Intranet", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
//
// Turns the OU intranet into a more clincal environment. Less greys + 
// colours and more whites. Also reduces the amount of wasted space on 
// the site, leaving more room for the data you actually want to look at
//
// --------------------------------------------------------------------
// ==UserScript==
// @name           OU Intranet - clean
// @namespace      open.ac.uk
// @description    creates navigation hiders, makes it a white layout, and removes most dead space.
// @include http://*.open.ac.uk/oulife-home/*
// @include http://*.open.ac.uk/ouintra/*
// @include htt*://*.open.ac.uk/staffdirectory/*
// @include htt*://*.open.ac.uk/aldirectory/*
// ==/UserScript==

////////////////////////////
// Create some new css
////////////////////////////
(function ()
{
// Remove that dull grey background
addGlobalStyle('body { background-color: #fff ! important; background-image: none ! important; }');
addGlobalStyle('div.col2bg { background-image: none ! important; }');

// Allow us to use the full screen
addGlobalStyle('#site { max-width: none ! important; }');
addGlobalStyle('div#oulifehdr { max-width: none ! important; }');
addGlobalStyle('div#oulifeftr { max-width: none ! important; }');
addGlobalStyle('div#oulifeftr1 { background-color: #fff ! important; background-image: none ! important; }');
addGlobalStyle('div#oulifeftr p { font-weight: normal ! important; }');
addGlobalStyle('div#site2 { margin: 0 4px 0 4px ! important; }');


// Turn us into a nice white site
addGlobalStyle('.navIA .navIAHead { background-image: none ! important; height: 0px; }');
addGlobalStyle('.navIA .navIABody li { border-left: none ! important; border-right: none ! important;  border-top: none ! important; }');
addGlobalStyle('.navIA .navIABody { border: 1px solid #9AAEC2 ! important; }');
addGlobalStyle('.navIA .navIAFoot { height: 0 ! important; }');
addGlobalStyle('.navIA .navIABody li a  { background-image: none ! important; ' +
	       ' background-color: #fff ! important; font-weight: normal ! important; ' +
	       ' border-bottom: none ! important;  padding: 4px 0 4px 16px ! important; }');
addGlobalStyle('.navIA .navIABody li a:hover  { color: #000 ! important;  border-bottom: none ! important;  }');
addGlobalStyle('.navIA .navIABody li a.sel   { color: #039 ! important;  border-bottom: none ! important; }');
addGlobalStyle('.navBody  { background-color: #fff ! important; border-left: none ! important; border-right: none ! important; border:thin solid #9AAEC2 ! important; }');
addGlobalStyle('.navHead    { height: 0 ! important; }');
addGlobalStyle('.navFooter  { height: 0 ! important; }');
addGlobalStyle('.navSearch  { padding: 15px 10px 10px ! important; }');

// Steves stuff that is in colour
addGlobalStyle('.hd1a, .hd1b, .top3, .top4 { height: 0 ! important; }');
addGlobalStyle('.bot1, .bot2, .bot3, .bot6, .bot4 { height: 0 ! important; }');
addGlobalStyle('.box5, .box6, .box7, .box8, .box9 { background-color: #fff ! important; border: 1px solid #D4D4D4; }');


// Add the code to give us left and right hiders
addGlobalStyle('div#nav1  { float: left; margin: 0; padding: 6px 0 0 0; width: 198px; }');
addGlobalStyle('div#nav23 { margin: 0 0 0 216px; }');
addGlobalStyle('div#nav3  { float: right; margin: 0; padding: 6px 0 0 0; width: 198px; }');
addGlobalStyle('div.clear  { clear:both; }');
addGlobalStyle( 'a.aRight  { background-image: url(/oulife-home/img/arrow1.gif); '+
		'background-position: right center; '+
		'background-repeat: no-repeat; '+
		'color: #003399; '+
		'margin: 0; '+
		'padding: 0 9px 0 0; '+
		'text-decoration: none; '+
		'font-size: 90%; '+
		'}');

addGlobalStyle( 'a.aLeft  { background-image: url(/oulife-home/img/arrow4.gif); '+
		'background-position: left center; '+
		'background-repeat: no-repeat; '+
		'color: #003399; '+
		'margin: 0; '+
		'padding: 0 0 0 6px; '+
		'text-decoration: none; '+
		'font-size: 90%; '+
		'}');


//////////////////////////////////////
// Clean up some stuff
//////////////////////////////////////
targetElement = document.getElementById('oulifeftrl');
if (targetElement) {
targetElement.parentNode.removeChild(targetElement); }

targetElement = document.getElementById('oulifeftrr');
if (targetElement) {
targetElement.parentNode.removeChild(targetElement); }


//////////////////////////////////////
// Add our nav hiders to the screen
//////////////////////////////////////


// Column 1 hider
targetElement = document.getElementById('backpos1');

if (targetElement) {

	targetElement.innerHTML = '<div id="nav1"><a id="nav1state" href="javascript:toggleLeftNav();">show column</a></div>' + 
			  '<div id="nav23"><div id="nav3">' +
			  '<a id="nav2state" href="javascript:toggleRightNav();" style="float: right;">show column</a>'+
			  '</div>' +
			  '<div class="backlink">' +
			  '<a href="javascript:history.back();">back</a>' +
			  '</div>' +
			  '</div>' +
			  '<div class="clear" />';

}



/////////////////////////////////
// Page specific javascript
/////////////////////////////////

addGlobalScript('function setCookie() ' +
'{  ' +
'	navcol1 = document.getElementById("nav1state");  ' +
'	navcol2 = document.getElementById("nav2state");  ' +
'   var e2 = (new Date(2019, 1, 1)).toGMTString(); ' +
'	document.cookie = "columnData=" + navcol1.innerHTML + "|" + navcol2.innerHTML + ";path=/;expires=" + e2;' +
'}'
);

addGlobalScript('function readCookie() ' +
'{ ' +
'	var cookieName = "columnData"; ' +
'	var theCookie = document.cookie; ' +
'	var ind = theCookie.indexOf(cookieName); ' +
'	if (ind==-1 || cookieName=="")  ' +
'		return "";  ' +
'	 ' +
'	var ind1 = theCookie.indexOf(";",ind); ' +
'	if (ind1==-1)  ' +
'		ind1=theCookie.length;  ' +
'		 ' +
'	return theCookie.substring(ind+cookieName.length+1,ind1); ' +
'}'
);

addGlobalScript('function readColumns(colNo) ' +
'{ ' +
'	var currCols = readCookie(); ' +
'	var colArray = currCols.split("|"); ' +
'	 ' +
'	if (currCols != "") ' +
'	{ ' +
'		return colArray[colNo]; ' +
'	} ' +
'	return ""; ' +
'}' 
);


addGlobalScript('function toggleLeftNav(firstCall) ' +
'{ ' +
'	disp = document.getElementById("nav1state"); ' +
'	if (disp == null) return; ' +
' ' +
'   var colStatus = "none"; ' +
'   colStatus = readColumns(0); ' +
'       if (firstCall == null) ' +
'	{ ' +
'		if (colStatus == "hide column") ' +
'		{ ' +
'			disp.setAttribute("class","aRight"); '+
'			disp.innerHTML = "show column"; ' +
'			disp = document.getElementById("col1"); ' +
'			disp.style.width = "1px"; ' +
'			disp.style.height = "1px"; ' +
'			disp.style.visibility = "hidden"; ' +
'			disp = document.getElementById("col23"); ' +
'			disp.style.margin = "0"; ' +
'		} ' +
'		if (colStatus == "show column") ' +
'		{ ' +
'			disp.setAttribute("class","aLeft"); ' +
'			disp.innerHTML = "hide column"; ' +
'			disp = document.getElementById("col1"); ' +
'			disp.style.width = "198px"; ' +
'			disp.style.height = ""; ' +
'			disp.style.visibility = "visible"; ' +
'			disp = document.getElementById("col23"); ' +
'			disp.style.margin = "0 0 0 202px"; ' +
'		} ' +
'	} ' +
'	else ' +
'	{ ' +
'		if (colStatus == "show column") ' +
'		{ ' +
'			disp.setAttribute("class","aRight"); '+
'			disp.innerHTML = "show column"; ' +
'			disp = document.getElementById("col1"); ' +
'			disp.style.width = "1px"; ' +
'			disp.style.height = "1px"; ' +
'			disp.style.visibility = "hidden"; ' +
'			disp = document.getElementById("col23"); ' +
'			disp.style.margin = "0"; ' +
'		} ' +
'		if (colStatus == "hide column" || colStatus == "") ' +
'		{ ' +
'			disp.setAttribute("class","aLeft"); ' +
'			disp.innerHTML = "hide column"; ' +
'			disp = document.getElementById("col1"); ' +
'			disp.style.width = "198px"; ' +
'			disp.style.height = ""; ' +
'			disp.style.visibility = "visible"; ' +
'			disp = document.getElementById("col23"); ' +
'			disp.style.margin = "0 0 0 202px"; ' +
'		} ' +
'	} ' +
'	if (firstCall == null) ' +
'	setCookie(); ' +
'}'
);

addGlobalScript('function toggleRightNav(firstCall) ' +
'{ ' +
'	disp = document.getElementById("nav2state"); ' +
'	if (disp == null) return; ' +
' ' +
'   var colStatus = "none"; ' +
'   colStatus = readColumns(1); ' +
'   	if (firstCall == null) ' +
'	{ ' +
'		if (colStatus == "hide column") ' +
'		{ ' +
'			disp.setAttribute("class","aLeft"); ' +
'			disp.innerHTML = "show column"; ' +
'			disp = document.getElementById("col3"); ' +
'			disp.style.width = "1px"; ' +
'			disp.style.height = "1px"; ' +
'			disp.style.visibility = "hidden"; ' +
'			disp.style.position = "absolute"; ' +
'			disp = document.getElementById("col2"); ' +
'			disp.style.margin = "0"; ' +
'		} ' +
'		if (colStatus == "show column") ' +
'		{ ' +
'			disp.setAttribute("class","aRight"); ' +
'			disp.innerHTML = "hide column"; ' +
'			disp = document.getElementById("col3"); ' +
'			disp.style.width = "198px"; ' +
'			disp.style.height = ""; ' +
'			disp.style.visibility = "visible"; ' +
'			disp.style.position = "relative"; ' +
'			disp = document.getElementById("col2"); ' +
'			disp.style.margin = "0 202px 0 0"; ' +
'		} ' +
'	} ' +
'	else ' +
'	{ ' +
'		if (colStatus == "show column") ' +
'		{ ' +
'			disp.setAttribute("class","aLeft"); ' +
'			disp.innerHTML = "show column"; ' +
'			disp = document.getElementById("col3"); ' +
'			disp.style.width = "1px"; ' +
'			disp.style.height = "1px"; ' +
'			disp.style.visibility = "hidden"; ' +
'			disp.style.position = "absolute"; ' +
'			disp = document.getElementById("col2"); ' +
'			disp.style.margin = "0"; ' +
'		} ' +
'		if (colStatus == "hide column" || colStatus == "") ' +
'		{ ' +
'			disp.setAttribute("class","aRight"); ' +
'			disp.innerHTML = "hide column"; ' +
'			disp = document.getElementById("col3"); ' +
'			disp.style.width = "198px"; ' +
'			disp.style.height = ""; ' +
'			disp.style.visibility = "visible"; ' +
'			disp.style.position = "relative"; ' +
'			disp = document.getElementById("col2"); ' +
'			disp.style.margin = "0 202px 0 0"; ' +
'		} ' +
'	} ' +
'	if (firstCall == null) ' +
'	setCookie(); ' +
'}'
);

addGlobalScript('toggleLeftNav("isFirstCall"); toggleRightNav("isFirstCall");');

////////////////////////////////
// Generic helper functions
////////////////////////////////

// Insert the insertable node at the end of the destination node
function insertAfter(destNode, insertableNode) 
{
  destNode.parentNode.insertBefore(insertableNode, destNode.nextSibling);
}

// Insert the insertable node before the destination node
function insertAbove(destNode, insertableNode) 
{
  destNode.parentNode.insertBefore(insertableNode, destNode);
}

// Function to insert CSS
function addGlobalStyle(css) {

	if ( typeof PRO_addStyle != 'undefined' ) 
  		PRO_addStyle(css, document);
	else 	{ 
		var head, style;
	    head = document.getElementsByTagName('head')[0];
	    if (!head) { return; }
	    style = document.createElement('style');
	    style.type = 'text/css';
	    style.innerHTML = css;
	    head.appendChild(style);
  	}

}

// Function to insert javascript
function addGlobalScript(javascript) {
	var head, script;
	head = document.getElementsByTagName('head');
	if (!(head && head[0])) { return; }
	script = document.createElement('script');
	script.type = 'text/Javascript';
	script.text = javascript;
	head[0].appendChild(script);
}

})();