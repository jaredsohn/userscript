// ==UserScript==
// @name Grooveshark DARK
// @namespace
// @version  0.3
// @description    DARK THEME FOR GROOVESHARK
// @include        http://grooveshark.com/*
// @include        http://*.grooveshark.com/*
// @author         Evren Esat Ozkan 
// @license        Public Domain
// ==/UserScript==

var css = "																						\
#bc-now-playing-module{opacity:0.3;} 															\
form#header-search{background: rgb(34, 34, 34) !important}										\
div.broadcast div.img{opacity:0.5 !important}													\
#page-inner * {color: #CACACA !important; border:none !important;}									\
#page-inner div {background: rgb(32, 32, 32) !important;}										\
a.logo-link{opacity: 0.5}																		\
#page-wrapper, #stage{background:#000 !important}												\
input, textarea, select{opacity: 0.5, color:#fff !important}								   \
input:focus, textarea:focus, input.focused, textarea.focused{color:#fff !important}            \
* { text-shadow: none !important}  																		\
#broadcast-title, #bc-image{opacity: 0.5}														\
",
    head = document.getElementsByTagName('head')[0],
    style = document.createElement('style');

style.type = 'text/css';
if (style.styleSheet){
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}

head.appendChild(style);


