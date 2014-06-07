// ==UserScript==
// @name           Minimal Google Sign-In Pages
// @description    Remove/hide all unnecessary elements on Google Sign-In pages
// @version        1.3
// @namespace      oyvey
// @include        http*://*.google.com/*
// @match          http://*.google.com/*
// @match          https://*.google.com/*
// ==/UserScript==

GM_addStyle(".google-header-bar { height: 52px !important; } .header .logo { display: none; } .header .signin-button, .header .signup-button { margin: 13px 0 0 !important; } .product-info { display: none; } .sign-in { float: none !important; margin: 0px auto !important; }");