// ==UserScript==
// @name           eatliverImageNextPreviousLink
// @namespace      eatliverImageNextPreviousLink
// @description    switches to next/previous picture when you click on a current one
// @include        http://*eatliver.com/i.php*
// ==/UserScript==

var path = "img/";
var wrongPath = "img/face/";
var images = document.getElementsByTagName("img");

var map = document.createElement("map");
var areaNext = document.createElement("area");
var areaPrev = document.createElement("area");

map.id = "tmp";
map.name = "tmp";
areaNext.shape = "rect";
areaNext.title = "Next picture";
areaPrev.shape = "rect";
areaPrev.title = "Previous picture";

for (var i = 0; i < images.length; i++) {
	if (images[i].src.indexOf(path) > -1 && images[i].src.indexOf(wrongPath) < 0) {
		images[i].style.cursor = "pointer";
		images[i].useMap = "#tmp";
		
		var x = images[i].offsetWidth;
		var y = images[i].offsetHeight;
		
		var arr = images[i].src.split(".");
		var arr2 = arr[arr.length - 2].split("/");
		var idNext = (arr2[arr2.length - 1] * 1) + 1;
		var hrefNext = "i.php?n=" + idNext;
		var idPrev = (arr2[arr2.length - 1] * 1) - 1;
		var hrefPrev = "i.php?n=" + idPrev;
		
		areaNext.href = hrefNext;
		areaNext.coords = x/2 + ",0," + x + "," + y;
		areaPrev.href = hrefPrev;
		areaPrev.coords = "0,0," + x/2 + "," + y;
	}
}

map.appendChild(areaNext);
map.appendChild(areaPrev);
document.body.appendChild(map);