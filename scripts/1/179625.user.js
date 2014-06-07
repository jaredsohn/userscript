// ==UserScript==
// @name       wumii item style clean
// @namespace  http://userscripts.org/users/179625
// @version    0.2
// @downloadURL http://userscripts.org/scripts/source/179625.user.js
// @updateURL http://userscripts.org/scripts/source/179625.meta.js
// @description  Removes the sidebar, ads, and other clutter from Wumii item page.
// @match      http://www.wumii.com/item/*
// @copyright  2013+, Chen Tianfei
// @run-at document_end
// ==/UserScript==

(function () {
	var s = document.createElement('style');
    s.innerHTML = '#toTop{left: auto!important;right: 0 !important;}#header{display: none !important;} .item-page #rightSide {display: none !important;}#container {margin: 0 auto !important;width: 90% !important;padding-top: 0 !important;}#item {width: 100% !important;}#toolBar {display: none !important;}.article .detail .content,.article .detail .content p {font-size:18px !important;}';

	var body = document.querySelector('body');
	body.appendChild(s);

})();