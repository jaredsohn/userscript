// ==UserScript==
// @name           Autominer,caver and valley
// @namespace      Ryuzaki
// @description    Autominer,caver and valley
// @include        http://tiwar.mobi/barbars*
// @include        http://tiwar.mobi/cave*
// @include        http://tiwar.mobi/farm*
// ==/UserScript==

//Determine our location:
	var atMine=document.evaluate("//img[contains(@src,'town/mine.png')]", document, null, 9, null).singleNodeValue;
	var atCave=document.evaluate("//img[contains(@src,'town/cave.png')]", document, null, 9, null).singleNodeValue;
	var atMarch=document.evaluate("//img[contains(@src,'town/farm.png')]", document, null, 9, null).singleNodeValue;
	
if (atMine) {
	window.setTimeout(function(){
	alert("Yes, you are there!");}, 100);
	return;
}
	var refresh=document.evaluate("//a[contains(@href,'barbars')]", document, null, 9, null).singleNodeValue;
	var mana=document.evaluate("//a[contains(@href,'mana')]", document, null, 9, null).singleNodeValue;
	var attack=document.evaluate("//a[contains(@href,'hit')]", document, null, 9, null).singleNodeValue;
	
// Execute
        if (attack) {
			window.setTimeout(function(){
			location.href=attack.href;}, 10500);
			return;
	}
	if (mana) {
			window.setTimeout(function(){
			location.href=mana.href;}, 1);
			return;
	}
	if (refresh) {
			window.setTimeout(function(){
			location.href=refresh.href;}, 1000);
			return;
	}