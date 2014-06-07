// ==UserScript==
// @name           heise-keintopnews
// @namespace      heise
// @description    Blendet die Top-News auf der Startseite aus
// @include        http://www.heise.de/
// ==/UserScript==
(function(){
 mitte=document.getElementById("mitte_news");
 topnews=document.getElementsByClassName("news_topteaser")[0];
mitte.removeChild(topnews);
 linie=document.getElementsByClassName("trennlinie_6px")[0];
 mitte.removeChild(linie);
 })();