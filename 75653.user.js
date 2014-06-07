// ==UserScript==
// @name          GMail Popup Disabler
// @description      Disable the annoying GMail Talk popup. By Garett Rogers: http://blogs.zdnet.com/Google/?p=102
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==

document.addEventListener(’mouseover’, function(event){ event.stopPropagation(); event.preventDefault();}, true);