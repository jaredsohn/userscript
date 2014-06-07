// ==UserScript==
// @name           KOL War Hero Alerter
// @namespace      hunsley@gmail.com
// @description    Provides a pop-up when war heros appear to regain your wandering attention
// @include        *.kingdomofloathing.com/fight.php*
// ==/UserScript==

monnamespan = document.evaluate("//SPAN[@id='monname']//text()",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
monname=monnamespan.singleNodeValue.data;

if(monname.match('C.A.R.N.I.V.O.R.E.') || monname.match('Glass of Orange Juice') || monname.match('Neil$') || monname.match('Slow Talkin') || monname.match('Zim Merman') || monname.match('Brutus') || monname.match('Danglin') || monname.match('Monty') || monname.match('Next-generation Frat Boy') || monname.match('War Frat Streaker')) {
	alert('ATTENTION!  THIS ENEMY IS A WAR HERO');
}
