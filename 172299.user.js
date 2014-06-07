// ==UserScript==
// @name            Disabled Javascript Indicator
// @author          TNT
// @description     Indicate if JavaScript is disabled via icon.
// @icon            http://tnt-soft.net/images/no-javascript.jpg
// @include         http://*
// @include         https://*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @resource        icon http://tnt-soft.net/images/no-javascript.jpg
// @version         1.0
// @grant           GM_addStyle
// @grant           GM_getResourceURL
// @run-at          document-end
// ==/UserScript==

GM_addStyle('#nojs_icon { position: fixed; top: 0px; right: 0px; border: 1px solid #d8d7d5; z-index: 1000; }');

noscript = $('<noscript />');
img = $('<img />');
img.attr('id', 'nojs_icon');
img.attr('src', GM_getResourceURL('icon'));
$(noscript).append(img);
$(document.body).append(noscript);