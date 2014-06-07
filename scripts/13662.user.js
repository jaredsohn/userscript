// ==UserScript==
// @name           Pardus Navigation Grid
// @namespace      pardus.at
// @description    Adds a grid view to the Pardus Navigation Screen
// @include        http://*.pardus.at/main.php
// @author         Rhindon
// @version        1.5

// ==/UserScript==


// ////////////////////////////////////////////////////////////////////////
// User Defined Variables:
// ////////////////////////////////////////////////////////////////////////

//Set to false if you don't want the center square highlighted
var highlightCenterSquare = true;

//Set to false if you don't want to show the coordinates on mouseover
var showCoordinates = true;


//You can change the color of the gridlines and the center highlight here.
var color 			= "#282828";	//Dark Gray
var highlightColor 	= "darkred";	//Dark Red

// ////////////////////////////////////////////////////////////////////////
// Beginning of Code:
// ////////////////////////////////////////////////////////////////////////


function getLocation() {

	sector = document.getElementById('sector').innerHTML;

	var tmp = document.getElementById('coords').innerHTML;
	tmp = tmp.substring(tmp.indexOf('[') + 1, tmp.indexOf(']'));
	locx = tmp.substring(0, tmp.indexOf(','));
	locy = tmp.substring(tmp.indexOf(',') + 1);
}


var locx = 0;
var locy = 0;

var img = document.getElementsByTagName('img');


var count = 0;
for(i = 0; i < img.length; i++) {

	if(img[i].getAttribute('class') == 'nf' || img[i].getAttribute('class') == 'nf96' || img[i].getAttribute('class') == 'nf128') {
		
		count++;
	}
}
	
var gridSize = Math.sqrt(count);

var mapWidth = gridSize;
var mapHeight = gridSize;

getLocation();

var localX = locx - ((mapWidth - 1) / 2);
var localY = locy - ((mapHeight - 1) / 2);
var xLimit = Math.round(locx) + (mapWidth - 1) / 2;

var highlightSquare = (gridSize * gridSize / 2) + 0.5;

count=0;
var oldstyle;

for(i = 0; i < img.length; i++) {

	if(img[i].getAttribute('class') == 'nf' || img[i].getAttribute('class') == 'nf96' || img[i].getAttribute('class') == 'nf128') {
		
		count++;
		oldstyle = (img[i].getAttribute('style') == undefined) ? '' : img[i].getAttribute('style');
		if (oldstyle != '' && oldstyle[oldstyle.length - 1] != ';') oldstyle += ';';

		if(highlightCenterSquare && count == highlightSquare) {

			img[i].setAttribute('style', oldstyle
				+ " border-top:   solid  1px " + highlightColor + ";"
				+ " border-right: solid  1px " + highlightColor + ";");

		} else if(highlightCenterSquare && count == highlightSquare - 1) {

			img[i].setAttribute('style', oldstyle
				+ " border-top:   dashed 1px " + color + ";"
				+ " border-right: solid  1px " + highlightColor + ";");

		} else if(highlightCenterSquare && count == highlightSquare + gridSize) {

			img[i].setAttribute('style', oldstyle
				+ " border-top:   solid  1px " + highlightColor + ";"
				+ " border-right: dashed 1px " + color + ";");

		} else {

			img[i].setAttribute('style', oldstyle
				+ " border-top:   dashed 1px " + color + ";"
				+ " border-right: dashed 1px " + color + ";");

		}	
		
		
		//Add Coordinates to Nav Grid

		if(showCoordinates) {
		
			img[i].title += ' [' + localX + ', ' + localY + '] ';

			localX++;

			if(localX > xLimit) {
				localX = locx - ((mapWidth - 1) / 2);
				localY++;
			}
		}
	}
}