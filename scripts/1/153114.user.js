// ==UserScript==
// @name        Wikipedia Appeal Remover 2012-12
// @namespace   userscripts
// @description So you decided (not) to donate. We don't need to see the banner any more.
// @include     http://*.wikipedia.org/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @grant       none
// @version     0.1.1
// ==/UserScript==

// Remove!
$('div#B12_FpcwNondEur_Biggold').remove();
$('#centralNotice').remove();
