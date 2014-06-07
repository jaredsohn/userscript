// ==UserScript==
// @name           Cleaner Hemnet
// @namespace      Daniel Leinerud
// @description    Clean up the layout of Hemnet.se
// @date           2009-08-05
// @version        0.3
// @include       http://hemnet.*/*
// @include       http://www.hemnet.*/*
// ==/UserScript==

GM_addStyle(
'.autoresize  { display: none;}' +
'#banner-topp  { display: none;}' +
'#sida, #kartsida, #enkel-sida  { padding:0px 10px 10px 10px;}' +
'#banner-sida { display: none;}' + 
'body { background:#3E754E none repeat scroll 0 0; text-align:left}' + 
'#sajt { margin:0 auto; text-align:left;}' + 
'.ui-slider .ui-slider-range { background:#52693F none repeat scroll 0 0;}'
);

