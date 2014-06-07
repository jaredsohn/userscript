// ==UserScript==
// @name           IEEExplore direct PDF
// @namespace      userscripts
// @include        http://ieeexplore.ieee.org/xpls/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

var a = $('a[href^="/stamp/stamp"]');
a.attr("href",a.attr("href").replace("stamp/stamp","stampPDF/getPDF"));
