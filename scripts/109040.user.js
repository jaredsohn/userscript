// ==UserScript==
// @name  SMJS
// @namespace     http://metaphox.name/smjs/
// @description   stop making jinxray sad
// @include       http://*.artinfo.com/*
// @version       0.0.1
// ==/UserScript==

var smjs = document.querySelectorAll('.slideshow_button.pause')[0];
if(typeof smjs.onclick == 'function'){smjs.onclick.apply(smjs);}