// ==UserScript==
// @name          TW Unpale Milliseconds
// @include       http://*.die-staemme.de/*
// @exclude       http://forum.die-staemme.de/*
// @include       http://*.tribalwars.net/*
// @exclude       http://forum.tribalwars.net/*
// @include       http://*.tribalwars.nl/*
// @exclude       http://forum.tribalwars.nl/*
// @description   Millisekunden sichtbar ; Unpale milliseconds ; Zichtbaarheid miliseconden
// ==/UserScript==

// ds.GM_unpaleMS.user.js

// version = 1.0
// screenshot: http://c1b1se.c1.funpic.de/newhp_userscripts_screens/

// (c) by C1B1SE

var color = 'black';
var size = '100%';

var elist = document.getElementsByClassName('small hidden')
for(var i = 0; i < elist.length; i++)
  {
  elist[i].style.color = color;
  elist[i].style.fontSize = size;
  }