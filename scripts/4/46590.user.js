// ==UserScript==
// @name           YouTube Kill Default Language Box
// @namespace      http://endflow.net/
// @description    Remove annoying default language box.
// @include        http://*.youtube.com/*
// ==/UserScript==
(function(){
var box = $('default-language-box');
if(box){box.parentNode.removeChild(box)}
function $(id){return document.getElementById(id)}
})();
