// ==UserScript==
// @name           Wer kennt wen? Flip
// @namespace      http://userscripts.org/scripts/show/53884
// @description    Lädt abwechselnd unterschiedliche www.wer-kennt-wen.de Seiten
// @description    Author: me36835(at)gmail.com
// @description    http://www.wer-kennt-wen.de/club_2nfy8kmj_Greasemonkey_Scripte_in_WKW.html
// @include        http://www.wer-kennt-wen.de/start*
// @include        http://www.wer-kennt-wen.de/news*
// @include        http://www.wer-kennt-wen.de/people*
// ==/UserScript==
// D:\temp\wkw-flip.user.js

var interval = 1000*60*3; // 3 Minuten

var myURL="location.href='http://www.wer-kennt-wen.de/start';";

switch (location.href + "")  {
  case "http://www.wer-kennt-wen.de/news/activity":  myURL="location.href='http://www.wer-kennt-wen.de/start/#1';"; break;
  case "http://www.wer-kennt-wen.de/start/#1":       myURL="location.href='http://www.wer-kennt-wen.de/start/#2';"; break;
  case "http://www.wer-kennt-wen.de/start/#2":       myURL="location.href='http://www.wer-kennt-wen.de/people/friends';"; break;
  case "http://www.wer-kennt-wen.de/people/friends": myURL="location.href='http://www.wer-kennt-wen.de/start';"; break;
  case "http://www.wer-kennt-wen.de/start":          myURL="location.href='http://www.wer-kennt-wen.de/start/#3';"; break;
  case "http://www.wer-kennt-wen.de/start/#3":       myURL="location.href='http://www.wer-kennt-wen.de/news/activity';"; break;
}

//alert("next "+myURL);

window.gm_auto_reload = window.setTimeout(myURL, interval);