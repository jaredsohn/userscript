// ==UserScript==
// @name        No-Ads
// @namespace   /cotd/
// @description No wiki ads
// @include     http://*.wikia.com/*
// @version     1.1
// ==/UserScript==
var obj=document.getElementById('meebo-canvas-6');
obj.setAttribute('style','display:none;visibility:hidden');