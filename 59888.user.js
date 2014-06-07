// ==UserScript==
// @name           Newschoolers Extended Karma
// @include       http://www.newschoolers.com/web/forums/readthread/*
// ==/UserScript==

function myScript() {
  window.karmaMaximum=255;
  /* some code */
}

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = myScript;

document.body.appendChild(script);

document.body.addEventListener("load",myScript,false);