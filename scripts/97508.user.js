// ==UserScript==
// @name           Facebook Feed to Most Recent
// @namespace      http://twitter.com/sverrirp
// @description    Change your Facebook newsfeed to Most Recent by default.
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @match          http://*.facebook.com/*
// @match          https://*.facebook.com/*
// @exclude        http://*.facebook.com/ajax/*
// @exclude        https://*.facebook.com/ajax/*
// @exclude        http://*.facebook.com/connect/*
// @exclude        https://*.facebook.com/connect/*
// @version        1.9 - 28th Oct 2009
// ==/UserScript==

(function() {


if(window.location.href == 'http://www.facebook.com/home.php'){ 
window.location.href = 'http://www.facebook.com/home.php?sk=lf'; 
} 

})();