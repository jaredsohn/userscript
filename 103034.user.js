// ==UserScript==
// @name           Valley Autosmacker
// @namespace      Ryuzaki
// @description    Makes sure you get the most out of the Valley event
// @include        http://tiwar.mobi/barbars*
// ==/UserScript==
//Search
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