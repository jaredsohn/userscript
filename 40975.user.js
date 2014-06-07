// ==UserScript==
// @name          W3Schools
// @namespace     http://localhost
// @description   Removes the ads at the bottom of the page.
// @include       http://*w3schools.com/*
// @version       1.1
// ==/UserScript==

  src = document.body.innerHTML;
  src = src.replace(/.* SPOTLIGHTS[\S\s]*/gi,"");
  src = src.replace(/<div.*\n*<div class=\"toprect_(txt|img)\">([\S\s]*?)<iframe id="leaderframe"([\S\s]*?)<\/iframe>\n.*/gi,"");
  src = src.replace(/<h2 class=\"tutheader\">.*(Get your Diploma| Exam<)([\S\s]*?)<\/table>/gi,"");
  src = src.replace(/.*<a href=\"\/cert\/.*/g,"");
  src = src.replace(/<img src.*(MissionKit|XMLSPY).*([\S\s]*?)(<table class=\"chapter\")/gi,"$3");

  document.body.innerHTML = src;