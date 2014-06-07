// ==UserScript==
// @name           Facebook BlueBar always on TOP
// @namespace      http://userscripts.org/users/ming925
// @include        http*://www.facebook.com/*
// @include        http*://apps.facebook.com/*
// @version        20110918
// ==/UserScript==

var BlueBar = document.getElementById('blueBar');
BlueBar.setAttribute('style','top:0px; position:fixed; width:100%; z-index:3;');
