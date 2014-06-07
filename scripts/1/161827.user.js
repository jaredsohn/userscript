// ==UserScript==
// @name           Wgxpath loader
// @namespace      
// @description    test script for inserting Wgxpath
// ==/UserScript==
var scriptTag = document.createElement("script");
scriptTag.type = "text/javascript";
scriptTag.src = 'https://wicked-good-xpath.googlecode.com/files/wgxpath.install.js';
document.body.appendChild(scriptTag);