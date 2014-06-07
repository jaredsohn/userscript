// ==UserScript==
// @author         Morion
// @name           BattleMod from NMA
// @description    Mod for erepublik battle module
// @version        0.0.1.0
// @include        http://*.erepublik.com/*/military/battlefield/*
// ==/UserScript==

 var blue_domination=document.getElementById('blue_domination');
  if (blue_domination)
  {
blue_domination.setAttribute('style', 'opacity: 1; -moz-opacity: 1;');
var  red_domination=document.getElementById('red_domination');
red_domination.setAttribute('style', 'opacity: 1; -moz-opacity: 1;');

function fixwidth() {
var getblue=document.getElementById('domination_bar').style.getPropertyValue("width");
blue_domination.innerHTML = getblue;
getred=(100-getblue.replace('%',''))+'';
red_domination.innerHTML = getred.substring(0,7) +'%';
	                }
setInterval(fixwidth, 4000);
}
  