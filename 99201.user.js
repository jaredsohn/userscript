// ==UserScript==
// @name           Remove set facebook as homepage banner
// @version        0.1
// @namespace      http://www.erepublik.com/en?OdjebiFEjs
// @description    brise banner
// @include        http://www.facebook.com/*
// ==/UserScript==

var fbhome = document.getElementById('ConfirmBannerOuterContainer');
var genlogin = document.location.href;
var patt = /setashome/i;

if (fbhome) { fbhome.parentNode.removeChild(fbhome); }
if (genlogin.search(patt) > 0) { window.location = "http://www.facebook.com/?ref=home"; } 