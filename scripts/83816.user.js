// ==UserScript==
// @name		UD A-GPS Coordinates
// @namespace		http://aichon.com
// @description		Puts the GPS coordinates next to the suburb name in Urban Dead
// @include		http://urbandead.com/map.cgi*
// @include		http://www.urbandead.com/map.cgi*
// @exclude		http://urbandead.com/map.cgi?logout
// @exclude		http://www.urbandead.com/map.cgi?logout
// ==/UserScript==

/* Urban Dead A-GPS Coordinates
 * v1.0.1
 *
 * Copyright (C) 2009 Bradley Sattem
 * Author: Bradley Sattem (a.k.a. Aichon)
 * Last Modified: 2009-09-01
 * 
 * Tested under: Safari 4.0 on Mac
 *   
 * Contact: [my first name [DOT] my last name]@gmail.com (check the Copyright info for my name)
 *
 * Changes:
 *   v1.0.1 - Minor bug fix
 *   v1.0 - Initial public release
 *
 * Thanks:
 *   Revenant - For creating the original GPS userscript. Before I decided to write my own, I used his.
 *   Swiers - For creating the bookmarklet on which Revenant based his original work.
 */

// Some nice global variables for dealing with any changes that might happen to the game. If the
//  game changes at some point, feel free to fool around with these numbers on your own.
var X_BLOCKS_VISIBLE = 3;			// The number of blocks that are horizontally visible
var Y_BLOCKS_VISIBLE = 3;			// The number of blocks that are vertically visible
var CITY_WIDTH = 100;				// The width of the city as measured in blocks
var CITY_HEIGHT = 100;				// The height of the city as measured in blocks
var XY_TOKEN = "-";				// The character(s) between the x-y coords in the HTML
var SURROUNDING_BLOCK_NAME = "v";		// The surrounding blocks' name attribute in the HTML


///////////////////////////////////////////////////////////////////////////////////
// I wouldn't change anything from here on if you're uncomfortable with programming
///////////////////////////////////////////////////////////////////////////////////
showCoords();


// Grabs the necessary data and then simply puts it on the screen in the right place
function showCoords() {
	var coordStr = getCoordinateString();
	var elem = getSuburbTD();

	if(coordStr != null) elem.innerHTML += coordStr;
}


// Parses the coordinates of the surrounding eight blocks, figures out which coords show
// up the least (i.e. because they are missing our block), and puts our coords in a string
function getCoordinateString() {
	var xCoord;				// Temp x coordinate value
	var yCoord;				// Temp y coordinate value
	var xCounts = new Array();		// How often the x coordinates have occurred
	var yCounts = new Array();		// How often the y coordinates have occurred
	var xOffset = CITY_WIDTH + 1;		// How far from 0 the lowest index in xCounts is
	var yOffset = CITY_HEIGHT + 1;		// How far from 0 the lowest index in yCounts is
	var hyphenPos;				// The position of the hyphen in the value attribute
	var blocks = document.getElementsByName(SURROUNDING_BLOCK_NAME);	// The block elements

	for(var i = 0; i < blocks.length; i++) {
		hyphenPos = blocks[i].value.indexOf(XY_TOKEN);
		xCoord = parseInt(blocks[i].value.substr(0,hyphenPos));
		yCoord = parseInt(blocks[i].value.substr(hyphenPos+1));
		if(xCounts[xCoord] > 0) xCounts[xCoord]++;
		else xCounts[xCoord] = 1;
		if(yCounts[yCoord] > 0) yCounts[yCoord]++;
		else yCounts[yCoord] = 1;
		if(xCoord < xOffset) xOffset = xCoord;
		if(yCoord < yOffset) yOffset = yCoord;
	}

	if(xOffset > CITY_WIDTH || yOffset > CITY_HEIGHT) return null;

	// Finds the x that occurs the least and sets xCoord to it
	var xMinCount = X_BLOCKS_VISIBLE + 1;
	for(var i = 0; i < xCounts.length; i++) {
		if(xCounts[xOffset + i] < xMinCount) {
			xMinCount = xCounts[xOffset + i];
			xCoord = xOffset + i;
		}
	}

	// Finds the y that occurs the least and sets xCoord to it
	var yMinCount = Y_BLOCKS_VISIBLE + 1;
	for(var i = 0; i < yCounts.length; i++) {
		if(yCounts[yOffset + i] < yMinCount) {
			yMinCount = yCounts[yOffset + i];
			yCoord = yOffset + i;
		}
	}

	return (" [" + xCoord + "," + yCoord + "]");
}


// Locates the part of the page containing the name of the suburb
function getSuburbTD()
{
	var tds = document.getElementsByTagName('td');
	
	for (var i = 0; i < tds.length; ++i)
		if (tds[i].getAttribute("class") == "sb")
			return tds[i];
	return NULL;
}