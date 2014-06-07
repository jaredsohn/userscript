// ==UserScript==
// @name Egg Finder
// @namespace http://userscripts.org/users/321417
// @description Torn in the automatic discovery of eggs, base on original script at http://pastebin.com/7EUMhveM
// @include http://*.torn.com/*
// @exclude http://*.torn.com/competitioneaster.php?step=eggfind*
// ==/UserScript==

var arrAll=document.getElementsByTagName("a");
for(i=0; i<arrAll.length; i++)
{
var target=arrAll[i].href;
if(target.indexOf('eggfind')>=0)
{
//window.location=target;
alert('Egg!!!');
}
}