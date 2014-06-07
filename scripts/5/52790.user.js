// ==UserScript==
// @name          DS Unpale Milliseconds
// @include       http://*.die-staemme.de/*
// @exclude       http://forum.die-staemme.de/*
// @include       http://*.tribalwars.net/*
// @exclude       http://forum.tribalwars.net/*
// ==/UserScript==

// ds.GM_unpaleMS.user.js

// {$ dsScript $}
// version = 1.0
// author = (c) 
// clients = firefox , opera
// areas = .de , .net
// worlds = all
// premium = works
// description[de] = �ndert die Gr��e und Schriftfarbe der Millisekunden bei Angriffen oder anderen Truppenbewegungen in die Normalgr��e und -farbe
// description[en] = Changes the size and colour of the millisecond indicator in attacks or other commands to the normal colour and size
// screenshot[0] = http://c1b1se.c1.funpic.de/newhp_userscripts_screens/ds.GM_unpaleMS_0.png
// {$ /dsScript $}

// (c) by C1B1SE

var color = 'blue';
var size = '100%';

var elist = document.getElementsByClassName('small hidden')
for(var i = 0; i < elist.length; i++)
  {
  elist[i].style.color = color;
  elist[i].style.fontSize = size;
  }