// ==UserScript==

// @name           Mobile01 image shower by kclonline

// @description    自動點擊 » 載入圖片 by 2010/05/03

// @include        http://www.mobile01.com/*

// @include        https://www.mobile01.com/*

// ==/UserScript==

function LoadImg(name) {
	document.getElementById(name).innerHTML = '<img src="http://attach.mobile01.com/attach/' + name + '" border="0">';		
	return false;
}

img = document.getElementsByName('attachimg');

imgLength = img.length;

for (i=0; i<imgLength; i++) {
	img[i].innerHTML = '<img src="http://attach.mobile01.com/attach/' + img[i].id + '" border="0">';
}


function LoadWaypointImg(name) {
	document.getElementById(name).innerHTML = '<img src="http://attach.mobile01.com/waypoint/' + name + '" border="0">';		
	return false;
}

img = document.getElementsByName('waypointimg');

imgLength = img.length;
	
for (i=0; i<imgLength; i++) {
		img[i].innerHTML = '<img src="http://attach.mobile01.com/waypoint/' + img[i].id + '" border="0">';
}