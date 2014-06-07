// ==UserScript==
// @name           Sembunyikan Smilies Facebook
// @namespace      underyx
// @description    Cara untuk menyembunyikan smilies facebook membantu mempercepat loading.
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @match          http://*.facebook.com/*
// @match          https://*.facebook.com/*
// @version        12.10
// ==/UserScript==

GM_addStyle(".emote_img{display:none;}");
GM_addStyle(".emote_text{display:inline !important; font-size: inherit !important;}");