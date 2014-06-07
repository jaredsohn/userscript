// ==UserScript==
// @name          Web Favicon
// @namespace     BrendenAC
// @description   Changes whatever Favicon you want to change
// @include       http://*
// ==/UserScript==

var logo = document.createElement("LINK");
logo.innerHTML = '<LINK HREF="http://sites.google.com/site/b0b4f377/Home/geeky.ico" REL="icon" TYPE="image/x-icon" />';
document.body.insertBefore(logo, document.body.firstChild);