// ==UserScript==
// @name           Gazeta.pl Najczesciej Czytane na gorze
// @namespace      qbk
// @include        http://www.gazeta.pl/0,0.html
// ==/UserScript==

(function()
{
   var who = document.getElementsByClassName("box_mostread")[0];
   who.style.paddingBottom = "10px";
   var parentNode = document.getElementById("k3");

   parentNode.insertBefore(who,parentNode.firstChild);
}());