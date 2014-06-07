// ==UserScript==
// @name           add reverse talkbacks button in nrg
// @namespace      http://shmulik.zekar.co.cc/nrg
// @include        http://www.nrg.co.il/*
// @author         shmulik - sking.me@gmail.com
// @license        Creative Commons Attribution-NonCommercial-NoDerivs
// @description    add a button to reverse the talkbacks to normal order
// ==/UserScript==


var va = (typeof unsafeWindow=="undefined")?document.getElementById("viewAll"):unsafeWindow.document.getElementById("viewAll");
if (va!=null)
{
  va.innerHTML+= "<a style=\"float:left\" href=\"javascript:(function(){var z = $('talkbacks').childNodes;for(var i=0;i<z.length;i++){$('talkbacks').insertBefore(z[z.length-1],z[i])}})();\"><span>הפוך סדר תגובות</span></a>";
}