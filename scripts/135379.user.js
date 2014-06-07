// ==UserScript==
// @name        fanfiction widescreen
// @namespace   http://userscripts.org/users/470854
// @author        jesterguy
// @description widens fanfiction.net back to fullscreen
// @include     http://www.fanfiction.net/*
// @version     1.1
// ==/UserScript==
 
var elmModify = document.getElementById("content_wrapper");
    elmModify.style.width = 'auto';
    elmModify.style.maxWidth = '100%';