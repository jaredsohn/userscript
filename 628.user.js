// ==UserScript==
// @name          IMDb Image Deblocker
// @namespace     http://cobblepot.com
// @description   removes transparent gif that blocks saving some IMDb images
// @include       http://*.imdb.com/*
// @include       http://imdb.com/*
// ==/UserScript==


var tables, thisTable;
tables = document.getElementsByTagName("table");

for (var i = 0; i < tables.length; i++) { 
	thisTable = tables[i];
	if (thisTable.getAttribute("class") == "photosrc") {
		var src = thisTable.getAttribute("background")
		var newImg = document.createElement("img");
		newImg.setAttribute("src", src);
		thisTable.parentNode.replaceChild(newImg, thisTable);
	}
}
