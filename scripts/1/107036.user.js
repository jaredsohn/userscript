// ==UserScript==
// @name          Facebook Online Only Chat
// @namespace     http://fallensoulstudios.com/
// @description   Shows only online users in current Facebook Sidebar.
// @include       http://*.facebook.com/*
// @exclude       https://*.facebook.com/*
// ==/UserScript==

// Written by Joel Larson (joellarsonweb@gmail.com) at Fallen Soul Studios (joel@fallensoulstudios.com)
// Takes away the annoyance of active but offline users.

// Credit to blech75 on snippets.dzone.com for the createCSS function!

function createCSS(selector,declaration){var ua=navigator.userAgent.toLowerCase();var isIE=(/msie/.test(ua))&&!(/opera/.test(ua))&&(/win/.test(ua));var style_node=document.createElement("style");style_node.setAttribute("type","text/css");style_node.setAttribute("media","screen");if(!isIE)style_node.appendChild(document.createTextNode(selector+" {"+declaration+"}"));document.getElementsByTagName("head")[0].appendChild(style_node);if(isIE&&document.styleSheets&&document.styleSheets.length>0){var last_style_node=document.styleSheets[document.styleSheets.length-1];if(typeof(last_style_node.addRule)=="object")last_style_node.addRule(selector,declaration);}};createCSS('.fbChatOrderedList .item','display:none;');createCSS('.fbChatOrderedList .item.active, .fbChatOrderList .item.mobile, .fbChatOrderList .item.invis, .fbChatOrderList .item.idle','display:block;');