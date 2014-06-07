// ==UserScript==
// @name          Xandy Colored Orkut
// @namespace     http://xandynet.tk
// @description   Color your orkut
// @include       http://*.orkut.com/*
// @include       http://orkut.com/*  
// ==/UserScript==

var hex = new Array(6)
document.bgColor = readCookie("orkutcolor")
// assign non-dithered descriptors
hex[0] = "FF"
hex[1] = "CC"
hex[2] = "99"
hex[3] = "66"
hex[4] = "33"
hex[5] = "00"

// accept triplet string and display as background color
function display(triplet) {
	// set color as background color
	document.bgColor = '#' + triplet
	writeCookie("orkutcolor",document.bgColor,999999999999999999999999999999999999999999999999999)
	}
function writeCookie(name, value, hours)
{
  var expire = "";
  if(hours != null)
  {
    expire = new Date((new Date()).getTime() + hours * 3600000);
    expire = "; expires=" + expire.toGMTString();
  }
  document.cookie = name + "=" + escape(value) + expire;
}
// Example:
// alert( readCookie("myCookie") );
function readCookie(name)
{
  var cookieValue = "";
  var search = name + "=";
  if(document.cookie.length > 0)
  { 
    offset = document.cookie.indexOf(search);
    if (offset != -1)
    { 
      offset += search.length;
      end = document.cookie.indexOf(";", offset);
      if (end == -1) end = document.cookie.length;
      cookieValue = unescape(document.cookie.substring(offset, end))
    }
  }
  return cookieValue;
}



// draw a single table cell based on all descriptors
function drawCell(red, green, blue) {
	// open cell with specified hexadecimal triplet background color
	document.write('<TD BGCOLOR="#' + red + green + blue + '">')

	// open a hypertext link with javascript: scheme to call display function
	document.write('<A HREF="javascript:display(\'' + (red + green + blue) + '\')">')

	// print transparent image (use any height and width)
	document.write('<IMG SRC="place.gif" BORDER=0 HEIGHT=12 WIDTH=12>')

	// close link tag
	document.write('</A>')

	// close table cell
	document.write('</TD>')
}

// draw table row based on red and blue descriptors
function drawRow(red, blue) {
	// open table row
	document.write('<TR>')

	// loop through all non-dithered color descripters as green hex
	for (var i = 0; i < 6; ++i) {
		drawCell(red, hex[i], blue)
	}

	// close current table row
	document.write('</TR>')
}

// draw table for one of six color cube panels
function drawTable(blue) {
	// open table (one of six cube panels)
	document.write('<TABLE CELLPADDING=0 CELLSPACING=0 BORDER=0>')

	// loop through all non-dithered color descripters as red hex
	for (var i = 0; i < 6; ++i) {
		drawRow(hex[i], blue)
	}

	// close current table
	document.write('</TABLE>')	
}

// draw all cube panels inside table cells
function drawCube() {
	// open table
	document.write('<TABLE CELLPADDING=5 CELLSPACING=0 BORDER=1><TR>')

	// loop through all non-dithered color descripters as blue hex
	for (var i = 0; i < 6; ++i) {
		// open table cell with white background color
		document.write('<TD BGCOLOR="#FFFFFF">')

		// call function to create cube panel with hex[i] blue hex
		drawTable(hex[i])

		// close current table cell
		document.write('</TD>')
	}

	// close table row and table
	document.write('</TR></TABLE>')
}

// call function to begin execution
drawCube()

// -->
