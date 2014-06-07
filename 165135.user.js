// ==UserScript==
// @name           IndyStar.com Pagination
// @namespace      http://www.searchbarpro.com
// 2@icon           http://www.indystar.com/favicon.ico
// @include        http://*.indystar.com/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

var sHost = window.location.host;

if (sHost.indexOf("indystar") >= 0) {
	addGlobalStyle('.article-pagination, #article-pagination, .article-pagination { display: none !important;}\n.gpagediv, #GPage1, #GPage2, #GPage3, #GPage4, #GPage5, #GPage6, #GPage7, #GPage8, #GPage9, #GPage10, #GPage11, #Gpage12, #GPage13, #GPage14, #GPage15, #GPage16, #GPage17, #GPage18, #GPage19, #GPage20 { visibility: visible !important; display: block !important; float: none !important;}');
}