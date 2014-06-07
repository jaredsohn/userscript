// Warrior Forum Page Navigator
// version 0.1 BETA!
// 2007-05-16
// Copyright (c) 2007, Andrew Peacock
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
// To uninstall, go to Tools/Manage User Scripts,
// select "Warrior Forum Page Navigator", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Warrior Forum Page Navigator
// @namespace     http://www.automateyourbusiness.com/wfpagenavigator/
// @description   adds links at the bottom of each page for easier page navigation
// @include       http://www.warriorforum.com/forum/forum.asp*
// @include       http://warriorforum.com/forum/forum.asp*
// ==/UserScript==


var objURL = new Object();
  
  
// Use the String::replace method to iterate over each
// name-value pair in the query string. Location.search
// gives us the query string (if it exists).
window.location.search.replace(
new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
 
	// For each matched query string pair, add that
	// pair to the URL struct using the pre-equals
	// value as the key.
	function( $0, $1, $2, $3 ){
		objURL[ $1 ] = $3;
	}
);

function buildURL(pagenum, text) {
	newqs = "?";
	keyfound = 0;
	for (var key in objURL){
		val = objURL[key];
		if (key == "whichpage") {
			val = pagenum;
			keyfound = 1;
		}
		newqs += key + "=" + val + "&";
	}
	
	if (keyfound == 0) {
		newqs += "whichpage=" + pagenum;
	}
	
	// Remove the last &
	if (Right(newqs, 1) == "&") {         
	             newqs = Left(newqs, newqs.length-1)        
        }
	
	newqs = '<a href="forum.asp' + newqs + '">' + text + '</a>';
	
	
	return newqs;
}

function Right(str, n){
    if (n <= 0)
       return "";
    else if (n > String(str).length)
       return str;
    else {
       var iLen = String(str).length;
       return String(str).substring(iLen, iLen - n);
    }
}

function Left(str, n){
	if (n <= 0)
	    return "";
	else if (n > String(str).length)
	    return str;
	else
	    return String(str).substring(0,n);
}
// Define the elements
var whichpage, newElement;
whichpage = document.getElementById('pagelist');
var navbar = document.createElement("div");


// Work out current page number
pagenum = parseInt(objURL['whichpage']);
if (isNaN(pagenum)) {
	pagenum = 1;
}

// Define variables for the output string
output = "";
maxpage = pagenum+10;
minpage = pagenum-10;
if (minpage <1) minpage=1;

prevpage = pagenum - 1;
if (prevpage < 1) prevpage = 1;
nextpage = pagenum + 1;

// work out last possible page
lastpage=1;
e=document.getElementsByTagName('select');
for(var i=0;i<e.length;i++){
	if (e[i].name == "whichpage") {
		lastpage = e[i].length;
		break;
	}
}


// Earlier pages
for (i=minpage; i<pagenum; i++) {
	output += buildURL(i, i) + "&nbsp;&nbsp;";
}

// Current page
output += i + "&nbsp;&nbsp;";

// Later pages
for (i=pagenum+1; i < (maxpage); i++) {
	output += buildURL(i, i) + "&nbsp;&nbsp;";
}




// Insert the HTML
navbar.innerHTML = '<font face="Verdana, Arial, Helvetica" size="2">' + buildURL(1, 'First') + '&nbsp;&nbsp;&nbsp;' + buildURL(prevpage, 'Prev') + '&nbsp;&nbsp;' + output + '&nbsp;&nbsp;' + buildURL(nextpage, 'Next') + '&nbsp;&nbsp;' + buildURL(lastpage, 'Last') + '</font><br />&nbsp;<br />';
if (whichpage) {
	newElement = document.createTextNode(output);
    	whichpage.parentNode.insertBefore(navbar, whichpage);
}