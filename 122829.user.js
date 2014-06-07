// ==UserScript==
// @name           TL Timezone
// @namespace      TL:Timezone
// @description    Change the timezone for the TL website.
// @include        http://torrentleech.org/*
// @include        http://www.torrentleech.org/*
// @exclude        http://forums.torrentleech.org/*
// @exclude        http://www.forums.torrentleech.org/*
// ==/UserScript==

var targets, i, txt, dt, d;
targets = document.querySelectorAll('td.name');
for (i=0; i<targets.length; i++){
  txt = targets[i].lastChild;
  dt = txt.textContent.substr(txt.textContent.indexOf("on ")+3, 19);
  d = new Date(Date.UTC(dt.substr(0,4),dt.substr(5,2)-1,dt.substr(8,2),dt.substr(11,2),dt.substr(14,2),dt.substr(17,2)));
  txt.textContent = " on " + d.toLocaleString();
}