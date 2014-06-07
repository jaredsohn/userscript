// ==UserScript==
// @name           pixiv original image link mod
// @namespace      pixiv
// @include        http://www.pixiv.net/member_illust.php*mode*
// @match          http://www.pixiv.net/member_illust.php*mode*
// ==/UserScript==

var image = document.evaluate('//*[@id="wrapper"]/div[2]/div/div[1]/div/div[5]/a/img', document, null, 9, null).singleNodeValue;

if (!image.parentNode.href.match('mode=manga')) 
{
	var isrc = image.src.replace('_m', '');
	image.parentNode.href = isrc;
}
	image.parentNode.target = "_self";