// Add GD Button user script
// version 0.2 BETA!
// 06-24-2007
// Copyright (c) 2007, BlooInBloo
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
//
//Changelog:
//.1	-	Initial GD button functionality
//.2	-	06242007	-	Added Advanced Search button replacement link, Lounge button

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
// select "Add GD Button", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name Add GD Button
// @namespace http://diveintogreasemonkey.org/download/
// @description Adds DU toolbar buttons for General Discussion and Lounge. Also changes the Search button to go directly to Advanced search.
// @include http://www.democraticunderground.com/*
// @include http://*.democraticunderground.com/*
// @include http://journals.democraticunderground.com/
// @include http://journals.democraticunderground.com/*
// ==/UserScript==

// get a reference to the <tr> element
var tables = document.getElementsByTagName("table");
var toolbarTable = tables[0];
var toolbarRow =  toolbarTable.rows[0];
var searchButton = toolbarRow.cells[8];//The stupidest possible way to screenscrape.

// create the strings
var gdUrl = 'http://www.democraticunderground.com/discuss/duboard.php?az=show_topics&forum=389 ';
var gdButtonImage = 'http://img232.imageshack.us/img232/3232/gdep9.png';
var loungeButtonImage = 'http://img66.imageshack.us/img66/3508/teatimeaj4.png';
var loungeUrl = 'http://www.democraticunderground.com/discuss/duboard.php?az=show_topics&forum=105';
var avdSearchUrl = 'http://www.democraticunderground.com/discuss/duboard.php?az=search_advanced&select_forum=0&search_archives=yes';

//Change Search button to go to Advanced Search
var searchAnchors = searchButton.getElementsByTagName("a");
searchAnchors[0].setAttribute('href', avdSearchUrl);
searchAnchors[1].setAttribute('href', avdSearchUrl);

// create the elements
var td=document.createElement("td");
var br=document.createElement("br");
var a=document.createElement("a");
var img=document.createElement("img");

// modify the cell
td.setAttribute('width','44');
td.setAttribute('align','center');
td.setAttribute('class','smalltext');

// modify the image
img.setAttribute('src',gdButtonImage);
img.setAttribute('border','0');
img.setAttribute('title','General Discussion');
img.setAttribute('width','32');
img.setAttribute('height','32');
img.setAttribute('alt','GD');

// modify the anchor
a.setAttribute('href',gdUrl);
a.setAttribute('class','smallblack-noline');

// build the <a> element
a.appendChild(img);
a.appendChild(br);
a.appendChild(document.createTextNode('GD'));

// build the <td> element
td.appendChild(a);

//---------

// create the elements
var td2=document.createElement("td");
var br2=document.createElement("br");
var a2=document.createElement("a");
var img2=document.createElement("img");

// modify the cell
td2.setAttribute('width','44');
td2.setAttribute('align','center');
td2.setAttribute('class','smalltext');

// modify the image
img2.setAttribute('src',loungeButtonImage);
img2.setAttribute('border','0');
img2.setAttribute('title','Lounge');
img2.setAttribute('width','32');
img2.setAttribute('height','32');
img2.setAttribute('alt','GD');

// modify the anchor
a2.setAttribute('href',loungeUrl);
a2.setAttribute('class','smallblack-noline');

// build the <a> element
a2.appendChild(img2);
a2.appendChild(br2);
a2.appendChild(document.createTextNode('Lounge'));

// build the <td> element
td2.appendChild(a2);

//---------
// add the cell to the <tr>
toolbarRow.appendChild(td);
toolbarRow.appendChild(td2);