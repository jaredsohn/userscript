// ==UserScript==
// @name           Mensa Speiseplan der Uni Bremen Bilder Korrektur
// @include        http://www.studentenwerk.bremen.de/files/main_info/essen/plaene/uniessen.php
// ==/UserScript==

var allImg, thisimg;
allImg = document.getElementsByTagName('img');
for (var i = 0; i < allImg.length; i++) {
	thisImg = allImg[i];
	thisImg.src = thisImg.src.replace(/%5C/g,"/");
}