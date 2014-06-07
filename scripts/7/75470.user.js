// ==UserScript==
// @name           tianya Ads Remover
// @namespace      http://userscripts.org/users/157577
// @version        1.0
// @author         numenzq
// @include        http://www.tianya.cn/publicforum/content/*
// ==/UserScript==

(function () {
	var ad1 = document.getElementById('adsp_content_top_banner');
	var ad2 = document.getElementById('adsp_content_left_banner');
	var ad3 = document.getElementById('adsp_content_right_banner');
	var ad4 = document.getElementById('adsp_content_banner_1');
	var ad5 = document.getElementById('adsp_content_banner_2');
	var ad6 = document.getElementById('adsp_content_bottom_1');

	ad1.parentNode.removeChild(ad1);
	ad2.parentNode.removeChild(ad2);
	ad3.parentNode.removeChild(ad3);
	ad4.parentNode.removeChild(ad4);
	ad5.parentNode.removeChild(ad5);
	ad6.parentNode.removeChild(ad6);
}());