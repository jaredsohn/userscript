//
// This script gives scienceoftheweb.org a nifty favicon
//
// ==UserScript==
// @name          Web Favicon
// @namespace     http://www.septosoft.com/userscript/webfavicon
// @description   this adds a nifty favicon to scienceoftheweb.org
// @include       http://scienceoftheweb.org/*
// ==/UserScript==

var logo = document.createElement("LINK");
logo.innerHTML = '<LINK HREF="http://www.andrew.cmu.edu/user/dbunker/newfavicon.ico" REL="icon" TYPE="image/x-icon" />';
document.body.insertBefore(logo, document.body.firstChild);