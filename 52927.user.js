// ==UserScript==

// @name           Mobile01 image shower by wenjie

// @description    直接顯示 mobil01 的圖片

// @include        https://www.mobile01.com/*

// @include        http://www.mobile01.com/*

// ==/UserScript==



function LoadImg1(name) {

	document.getElementById(name).innerHTML = '<img src="http://attach.mobile01.com/waypoint/' + name + '" border="0">';		

	return false;

}



imgs = document.getElementsByName("waypointimg");

for (i=0; i<imgs.length; i++)

{

  LoadImg1(imgs[i].id);

}

function LoadImg2(name) {
	document.getElementById(name).innerHTML = '<img src="http://attach1.mobile01.com/attach/' + name + '" border="0">';		
	return false;
}

imgs = document.getElementsByName("attachimg");
for (i=0; i<imgs.length; i++)
{
  LoadImg2(imgs[i].id);
}