// ==UserScript==
// @name           隱藏 Facebook 廣告
// @namespace      http://userscripts.org/users/home
// @include        http*://apps.facebook.com/*
// @version        2012
// ==/UserScript==

var rightCol = document.getElementById('rightCol');
var contentCol = document.getElementById('contentCol');

rightCol.parentNode.removeChild(rightCol);
contentCol.className=contentCol.className.replace('clearfix hasRightCol','clearfix');