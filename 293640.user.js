// ==UserScript==
// @name         Show webp images in Firefox
// @description  The WebPJS library is included into every webpage automatically i.e. unseen code from another domain is executed. Therefore this script is generally unsafe.  
// @version      1
// @namespace    c1b1.de
// @include      *
// @run-at       document-start
// @grant        GM_getResourceText
// @resource     webpjs http://webpjs.appspot.com/js/webpjs-0.0.2.min.js
// ==/UserScript==
'use strict';
var script = document.createElement('script');
script.setAttribute('type','text/javascript');
script.textContent = GM_getResourceText('webpjs');
while(!document.getElementsByTagName('head')) {};
document.getElementsByTagName('head')[0].appendChild(script);
document.getElementsByTagName('head')[0].removeChild(script);
/*
 * WebPJS homepage: http://webpjs.appspot.com/
 * Test page: http://webpjs.appspot.com/without-webpjs-support.html
 *
 */