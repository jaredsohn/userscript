//原版 NMA BattleMod @ userscripts.org/scripts/show/89146
//修改 YaHoo.CN

// ==UserScript==
// @name           eR战场加强
// @description    战场百分比小数点后两位显示
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
blue_domination.innerHTML = getblue.substring(0,6) +'%';

getred=(100-getblue.replace('%',''))+'';
red_domination.innerHTML = getred.substring(0,6) +'%';


	                }
setInterval(fixwidth,2000);
}
