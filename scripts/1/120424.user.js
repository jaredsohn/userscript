// ==UserScript==
// @name           Twitter style! v1.1
// @namespace      @antirockstars
// @include        http://www.twitter.com/*
// @include        http://twitter.com/*
// @include        https://www.twitter.com/*
// @include        https://twitter.com/*
// @require        
// ==/UserScript==
injectCSS("*, body{font-family: Arial !important;}")
function injectCSS(cssdata) 
{ 
head = document.getElementsByTagName("head")[0]; 
style = document.createElement("style"); 
style.setAttribute("type", 'text/css'); 
style.innerHTML = cssdata; 
head.appendChild(style); 
}