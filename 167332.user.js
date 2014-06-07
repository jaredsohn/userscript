// ==UserScript==
// @name            spyc0 - Expand Tinychat
// @author          spyc0
// @namespace       https://twitter.com/spyic0
// @description     Expands Tinychat windows to fit 100%
// @version	        .1
// @run-at          document-end
// @include         https://tinychat.com/*
// @include         http://tinychat.com/*
// ==/UserScript==

tcTitle = "tinychat" + document.head.innerHTML.split('"og:title" content="')[1].split('"')[0];

setTimeout(function(){
tcObj = document.getElementById(tcTitle);
tcObj.style.position = 'fixed';
tcObj.style.top=0;
tcObj.style.left=0;},

5000);