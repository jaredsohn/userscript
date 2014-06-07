// ==UserScript==
// @name           Messaggi Labber
// @namespace      http://userscripts.org/scripts/
// @include        http://lab.vodafone.it/wiki/*
// ==/UserScript==

var messages=document.getElementsByClassName("lobber");

for(c=0;c<messages.length;c++)
  messages[c].style.visibility='visible';