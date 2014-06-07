// ==UserScript==
// @name            Expand Tinychat
// @author          Daniel Royston
// @namespace       https://danielnr.com/release-expand-tinychat
// @description     Expands Tinychat windows to take the whole screen
// @version	        1.0
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