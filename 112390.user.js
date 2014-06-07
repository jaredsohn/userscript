// ==UserScript==
// @name          UDC Compact Home Page
// @namespace     http://youngpup.net/userscripts
// @description   Reduce the size of images on Unitedcats and Uniteddogs home page
// @include       http://www.unitedcats.com/en/home
// @include       http://unitedcats.com/en/home
// @include       http://www.uniteddogs.com/en/home
// @include       http://uniteddogs.com/en/home
// ==/UserScript==

imgArray = document.getElementsByTagName('img');
var imgCount = imgArray.length;
for(i=0;(i<imgCount);i++) {
		imgArray[i].style.width = '100px';
		imgArray[i].style.height = '100px';

}
