// ==UserScript==
// @name           Greasemungo Paparazzi Link
// @namespace      kenmooda@gmail.com
// @description    Popmundo: Add the paparazzi list link to the top menu (2008-08-12)
// @include        http://www*.popmundo.com/Common/*
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////////
//
//    Greasemungo Paparazzi Link
//    Copyright (C) 2008  Tommi Rautava
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
////////////////////////////////////////////////////////////////////////////////

var MAIN_MENU_PART2_XPATH = "//tr[@class='MainMenu']/td[2]";

var LINK_IMAGE_SRC = 'data:image/png;base64,' +
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29m' +
	'dHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIrSURBVDjLxVPLjhJBFD3V3dCYSZjwDipDRjCOCcTg' +
	'LGalJmxYufAD0E/QHV9g3LjSsGDhik/QjTEaTdgaEsQQINEFJjwEecmr6Yf3lkJmPwsruXWrq+85dc+9' +
	'VcJxHFxkKLjg0HgqlUpP1+t1drvdXrIsS2w2G9dqtXKzt21b6Lpu+P3+N4VC4QnH5/P5U3Lfy+XyL1Es' +
	'Fg9VVZ1kMhmwHAJIa1Tf4eH96zC+vcKLDyfwRm6i1Wo/Go/HLwnsJWPtZ2oikainUil/JBJBp9NBr9fD' +
	'cDjE5aMTfPz8E835bdw6vQMhBLrd7gNFUXSPxwNN08RsNrur0alJr9eLer2OcDiMdDoNkgKSglAohEaj' +
	'gUqlgkAggGw2i36/j8lkImOazeYNjQMHgwGCwSC2B0d4/n6FhSlgU366cOHe1Wvwz+eUfgucJQPb7Tai' +
	'0aiUqvC0WCwQi8Xw+ouBjaPA4yJzK7AUFz79OJDA0WgkwYZhgAq8z1JjAqq2tN+Wm4AqNGouXw9Bk+G4' +
	'QR2SxmCO4zV7mQGz7Fh5OI79F0wkCpmqCCyXSxlzPoM9wS4DqijcjgHTJv22Q+k5ksiNFabTqQSapilJ' +
	'OJ79noAZa7UaMoc9qOYSG9oziUSxlriy+YpqtbrXvSPZEWjMxidwewLjMc6Oj2VxOGBO1WdivhvJZFLu' +
	'sf54PC5lMYHI5XKPqa/P6EP3+XyCry4T8E/2BHDoEIdv6fmH92/9Vvz31/gHd9iUVZFEDKoAAAAASUVO' +
	'RK5CYII=';
	
var LINK_IMAGE_TITLE = 'Paparazzi List';

var LINK_URL = 'Charts.asp?action=PaparazziList';

function xpathNode(xpath) {
	return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

var targetNode = xpathNode(MAIN_MENU_PART2_XPATH);

if (targetNode) {
	var img1 = document.createElement('img');
	img1.src = LINK_IMAGE_SRC;
	img1.title = LINK_IMAGE_TITLE;
	img1.style.border = '0 none black';
	img1.style.padding = '0';

	var a1 = document.createElement('a');
	a1.appendChild(img1);
	a1.href = LINK_URL;
	
	targetNode.insertBefore(a1, targetNode.firstChild);	
}

// EOF