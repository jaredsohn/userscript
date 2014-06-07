// ==UserScript==
// @name        Twitter Lens
// @namespace   twitter.com
// @description RightClick on lens to clear twitter search words
// @include     https://twitter.com/* 
// @include     http://twitter.com/*
// @updateURL       http://userscripts.org/scripts/source/157996.user.js
// @author          BY SAILOR
// @version                3
// ==/UserScript==

var lens = document.getElementsByClassName('search-icon')[0];

var lensico = document.getElementsByClassName('icon nav-search')[0];

lens.setAttribute("oncontextmenu","document.getElementById('search-query').value=''; event.preventDefault();");


var sheet = document.createElement('style');

sheet.innerHTML = ".search-icon:hover { background-image: -moz-radial-gradient(center center , circle closest-side, rgba(101, 203, 255, 0.3), rgba(101, 203, 255, 0)); } .nav-search{ cursor: pointer; }";

document.body.appendChild(sheet);
