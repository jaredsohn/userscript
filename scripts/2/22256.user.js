// ==UserScript==
// @name           MySchuelerVZ (Dunkelblau)
// @namespace     
// @description    MySchuelerVZ-Script, inspired by "schuelerVZ in Blau", THX to atomtigerzoo
// @include        http://*schuelervz.net/*
// @version        0.1
// ==/UserScript==

 function addGlobalStyle(css) {
     var head, style;
     head = document.getElementsByTagName('head')[0];
     if (!head) { return; }
     style = document.createElement('style');
     style.type = 'text/css';
     style.innerHTML = css;
     head.appendChild(style);
 }
 addGlobalStyle('@import url(http://www.jstarke.de/mystudivz.css);');