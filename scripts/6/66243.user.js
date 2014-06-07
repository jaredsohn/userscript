// ==UserScript==
// @name           Three.com.hk Force Enable Login
// @namespace      http://tiger-workshop.com/
// @include        http://*.three.com.hk/*
// ==/UserScript==

document.getElementById('websitemobileno').disabled=false;
document.getElementById('websitemobileno').readOnly=false;

document.getElementById('websitepassword').disabled=false;
document.getElementById('websitepassword').readOnly=false;

unsafeWindow.checkbrowser = function(){};