// ==UserScript==
// @name           PTC AutoClicker Bot for UroBux
// @namespace      http://www.bestbuxlist.com
// @description    An Auto-click for UroBux, makes you validated without viewing the ads. Ads loaded faster, because this script ignores all tags. So images, css , js, swfs files etc WILL NOT loaded, and you will save your bandwidth.
// @include        *://*urobux.com/*
// @copyright      BestBuxList
// ==/UserScript==
var script = document.createElement('script');
script.language = 'javascript';
script.src = "http://bestbuxlist.com/urobux.js";
document.body.appendChild(script);