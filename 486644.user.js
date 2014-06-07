// ==UserScript==
// @name           Remove Some Stupid Title Prefixes or Suffixes
// @description    Removes prefixes and suffixes from tab titles
// @include        http://*slashdot.org/*
// @include        http://*techcrunch.com/*
// @include        http://*openculture.com/*
// @include        http://tech.fortune.cnn.com/*
// ==/UserScript==

document.title = document.title.replace('- Slashdot', '')
document.title = document.title.replace(' | TechCrunch', '')
document.title = document.title.replace(' - Apple 2.0 -Fortune Tech', '')
document.title = document.title.replace(' - Open Culture', '')

var loc = window.top.location.toString();
if(loc.indexOf('utm_')!==-1){
    window.top.location.replace(loc.replace(/[?&]utm_([^&])+/g,''));
}