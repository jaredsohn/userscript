// ==UserScript==
// @name           Itemz
// ==/UserScript==

javascript:(function(){
var a=document.createElement("script");
a.type="text/javascript";
a.src="http://www.blofeldsdirtymartini.com/mafia/item_analyzer.php?"+Math.random();
document.getElementsByTagName("head")[0].appendChild(a)})();