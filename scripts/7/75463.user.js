// ==UserScript==
// @name           autohome bbs Ads Remover
// @namespace      http://userscripts.org/users/157577
// @version        1.0
// @author         numenzq
// @include        http://club.autohome.com.cn/bbs/*
// ==/UserScript==

(function () {
	var ad1 = document.getElementById('ad_960_1');
	var ad2 = document.getElementById('ad_960_1_margintop');
	var ad3 = document.getElementById('ad_headerbanner');
	var ad4 = document.getElementById('sq_960_1Box');
	var ad5 = document.getElementById('ad_headerbanner');

	ad1.parentNode.removeChild(ad1);
	ad2.parentNode.removeChild(ad2);
	ad3.parentNode.removeChild(ad3);
	ad4.parentNode.removeChild(ad4);
	ad5.parentNode.removeChild(ad5);
}());