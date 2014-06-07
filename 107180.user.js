// ==UserScript==
// @name          Online user facebook
// @namespace     http://www.facebook.com/FACEB00X
// @description   tampilkan hanya yang online di sidebar chatingan.
// @include       http://*.facebook.com/*
// @exclude       https://*.facebook.com/*
// ==/UserScript==

// www.udhy.net

// Monggo di support untuk cssnya!

function createCSS(selector,declaration){var ua=navigator.userAgent.toLowerCase();var isIE=(/msie/.test(ua))&&!(/opera/.test(ua))&&(/win/.test(ua));var style_node=document.createElement("style");style_node.setAttribute("type","text/css");style_node.setAttribute("media","screen");if(!isIE)style_node.appendChild(document.createTextNode(selector+" {"+declaration+"}"));document.getElementsByTagName("head")[0].appendChild(style_node);if(isIE&&document.styleSheets&&document.styleSheets.length>0){var last_style_node=document.styleSheets[document.styleSheets.length-1];if(typeof(last_style_node.addRule)=="object")last_style_node.addRule(selector,declaration);}};createCSS('.fbChatOrderedList .item','display:none;');createCSS('.fbChatOrderedList .active, .fbChatOrderedList .idle','display:block;');