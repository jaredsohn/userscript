// DarkGmailComplete
// by Lance Vick

// ==UserScript==
// @name          DarkGmailComplete
// @namespace     tag:lance@lrvick.net,2011-11-15:DarkGmailComplete
// @description   Overwrites Inbox CSS values
// @include       http://mail.google.com*
// @include       https://mail.google.com*
// @version       0.1
// ==/UserScript==

function injectCSS(cssdata){
	head = document.getElementsByTagName("head")[0];
	style = document.createElement("style");
	style.setAttribute("type", 'text/css');
	style.innerHTML = cssdata;
	head.appendChild(style);
} 

injectCSS('.hx, .hP, .gE.iv.gt * {color:#FFF !important}')
injectCSS('.hk.kv.Bk, .g6, .gD {color:#999 !important}')
injectCSS('.UG {background:#000 !important}')