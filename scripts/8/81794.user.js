// ==UserScript==
// @name         Googze
// @namespace    http://code.google.com/p/googze
// @description  Show aerial photos from Google Maps in Waze cartouche editor
// @include      *waze.com/cartouche*
// @copyright    Rytis Slatkevičius
// ==/UserScript==

// Load jQuery plugin for saving Googze settings
var jQCookie = document.createElement('script');
jQCookie.src='http://googze.betterfly.lt/jquery.cookie.js';
document.getElementsByTagName('head')[0].appendChild(jQCookie);

// Load external script which has all the functionality embedded
var script = document.createElement('script');
script.src='http://googze.betterfly.lt/googze.js';
document.getElementsByTagName('head')[0].appendChild(script);

var scriptDiv = document.createElement('div');
scriptDiv.id = 'googze';
var searchDiv = document.getElementById('find_panel');
searchDiv.appendChild(scriptDiv);