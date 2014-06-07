// ==UserScript==
// @name                QuadDrag
// @description	        script to open links and selected text in a new tab
// @include		*
// ==/UserScript==


/**  The script is called quad drop because when text on a webpage is selected a search with that
	text is performed.  The engine or website used to perform the search is determined by what quadrant of 
	screen the text is dropped in.  The script assumes that an x-y plane exists on the screen with its origin
	at the point where you first clicked the mouse drag the text.  The quadrant numbers correspond to 
	the numbering system used in algebra (so from top right and counter-clockwise we have quadrant 1, 
	quadrant two, quadrant 3, and finally, ending at the lower right quadrant we have quadrant 4. By default the 
	1st two quadrants are set to qoogle and the bottom two are set to wikipedia.  You can change this by 
	editing the variables immediately below.  Just add your search engine of preference between the 
	quotation marks.   **/

var quad1 = "http://www.google.com/search?hl=en&q=";
var quad2 = "http://www.google.com/search?hl=en&q=";
var quad3 = "http://en.wikipedia.org/w/index.php?search=";
var quad4 = "http://en.wikipedia.org/w/index.php?search=";

//add event listners here
window.addEventListener("dragstart", initialDrag, true);
window.addEventListener("dragend", QuadrantDrag, true);

//variables to hold initial mouse cursor coordinates 
var initx; var inity; 

//get info about initial coordiantes of drag event.  Listens to "dragstart".
function initialDrag(event) {initx = event.screenX; inity = event.screenY;}

//perform action upon completion of drag event, reacts to event "dragend" (the final dragging event)
function QuadrantDrag(event)
{
var url = event.dataTransfer.getData('text/uri-list');
var finalx = event.screenX; var finaly = event.screenY;
var dtext = event.dataTransfer.getData('text/plain');
//get quadrant where drag was released for purpose of text search
	 var quad = quadFind(finalx,finaly);
	
//determine if searchtext is empty, if not search with it, if so, a link is assumed and an attempt is made to open it
	if (url == dtext) {GM_openInTab(url);}
	else { textSearch(dtext,quad) };
//	imageDownload() to be included in future;
}

//determine quadrant of drag drop
function quadFind(finalx,finaly)
{
var xchange = finalx - initx; var ychange = finaly - inity;
//calculate cursor position to determine quadrant where target is dropped relative to
//starting position of the mouse

	if (xchange >0) {
		if (ychange <0) {quad =1}
		else {quad =4};
		}
	else {
		if (ychange <0) {quad =2}
		else {quad =3};
	};
	return quad;
}

	//perform search for selected text
function textSearch(searchstring,quad)
{
var engine;  //determine engine to search with
	if (quad==1) {engine = quad1}
	else if (quad==2) {engine = quad2}
	else if (quad==3) {engine = quad3}
	else {engine = quad4}
var url = engine + searchstring;
GM_openInTab(url);
}

/*function imageDownload()
{
	to be added in future version of the script 
}*/

/*  Copyright 2012.  My email: bigeprogramming@gmail.com
	This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
