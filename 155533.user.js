// ==UserScript==
// @name           URL Redirects
// @namespace      www.mister-wong.com
// @description    Auto-redirect 
// @include        http://www.mister-wong.com/*
// ==/UserScript==

// Code found here:
// http://www.mozdev.org/pipermail/greasemonkey/2005-April/001570.html

var rules = new Array(
     [/^(http\:\/\/www\.mister-wong\.com)(\/.*)$/, 'http\:\/\/www\.mister-wong\.de$2'],
     [/^(http\:\/\/www\.tumblr\.com)(\/share_confirmation)$/, 'http\:\/\/www\.tumblr\.com']
);

var href = window.location.href;

for (i = 0; i < rules.length; i++){
     var replaced = href.replace(rules[i][0], rules[i][1]);
     if (replaced != href){
         window.location.href = replaced;
         return;
     }
}