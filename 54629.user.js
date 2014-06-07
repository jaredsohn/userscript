// ==UserScript==
// @name           Redline Print
// @namespace      pbwiki
// @description    Remove boxes
// @include        https://yourwikinamehere.pbworks.com/*
// ==/UserScript==

document.getElementById('footer-pbwiki').style.visibility = 'hidden';
document.getElementById('footer-about').style.visibility = 'hidden';
document.getElementById('top-content').style.visibility = 'hidden';
document.getElementById('sidebar').style.visibility = 'hidden';
