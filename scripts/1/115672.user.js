// ==UserScript==
// @name           narf-archive.com only images
// @namespace      http://gstaedtner.net
// @description    Only show the image on narf-archive.com URIs
// @include        http://narf-archive.com/*#*
// ==/UserScript==

var origin = window.location.href;
window.location.href = origin.replace(/\.com\/.*#/, ".com\/pix\/");
