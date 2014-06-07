// ==UserScript==
// @name          FBfixer
// @description	  FB's new interface uses AJAX, but in Firefox those little dots outline link after you've clicked it. This fixes that. 
// @include       http://www.facebook.com/*
// @include       http://apps.facebook.com/*
// @include       http://lite.facebook.com/*
// ==/UserScript== 






GM_addStyle("a:focus{outline:none;} a:active{outline:none;}");