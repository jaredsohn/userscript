// ==UserScript==
// @name Hide Facebook Questions
// @match http://*.facebook.com/*
// @match https://*.facebook.com/*
// @include http://*.facebook.com/*
// @include https://*.facebook.com/*
// ==/UserScript==

var style=document.createElement("style");
style.innerHTML=".pvm[data-ft*=\"\\\"qa_poll\\\":\"]{display:none}";
document.head.appendChild(style);
