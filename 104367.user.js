// ==UserScript==
// @name           Pardus Nav Helper
// @namespace      pardus.at
// @description    Adds a grid and coordinate tooltip to the Pardus nav screen.
// @include        http://*.pardus.at/main.php
// @author         Jack Sparrow
// @version        2
// ==/UserScript==

// Constants //
var showCoordinates = true;  // Show coordinates on mouseover (true/false)
var style = '\n#navarea { border-spacing: 1px; background-color: #222 }\n';
// ********* //

// Add gridlines to the page:
var css = document.createElement('style');
css.type = 'text/css';
css.appendChild(document.createTextNode(style));
document.getElementsByTagName('head')[0].appendChild(css);

// Find grid size for coordinate calculation:
var tiles = document.getElementById('navarea').getElementsByTagName('td');
var gridSize = Math.sqrt(tiles.length);

// Find player coordinates:
var coords = document.getElementById('coords').innerHTML;
x = parseInt( coords.substring(coords.indexOf('[') + 1, coords.indexOf(',')) );
y = parseInt( coords.substring(coords.indexOf(',') + 1, coords.indexOf(']')) );

// Add coordinate tooltips to tiles on nav screen:
for(i = 0; i < tiles.length; i++) {
	if(showCoordinates) {
		iX = x +           (i % gridSize) - Math.floor(gridSize / 2);
		iY = y + Math.floor(i / gridSize) - Math.floor(gridSize / 2);
		tiles[i].title += ' [' + iX + ', ' + iY + ']';
	}
}
