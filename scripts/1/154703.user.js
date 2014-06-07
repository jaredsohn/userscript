// ==UserScript==
// @name        TurboImageHost click pic to enlarge
// @namespace   Silico
// @description Clicking images on TurboImageHost enlarges them rather than going to the home page
// @include     http://www.turboimagehost.com/p/*
// @grant       none
// @version     1
// ==/UserScript==
document.getElementById('imageid').parentNode.href = 'javascript:OC();void(0);';

