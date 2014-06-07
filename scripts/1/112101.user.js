// ==UserScript==
// @name           Hide Facebook Ticker
// @namespace      http://userscripts.org/users/ming925
// @include        http*://apps.facebook.com/*
// @version        20110904
// ==/UserScript==

var rightCol = document.getElementById('rightCol');
var contentCol = document.getElementById('contentCol');

rightCol.parentNode.removeChild(rightCol);
contentCol.className=contentCol.className.replace('clearfix hasRightCol','clearfix');
