// ==UserScript==
// @name       無覓自動調整原文
// @namespace  http://llqoli.com/
// @version    0.1
// @description  wimii auto ref，wumii 自動調整原文
// @include    *://*wumii.com/item/*
// @copyright  qoli wong,2013
// ==/UserScript==
(function () {
	document.location.href = document.getElementsByClassName("info")[0].getElementsByTagName('a')[0].href
})();