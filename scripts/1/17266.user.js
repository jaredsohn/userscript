// ==UserScript==
// @name           KoL Attack Key
// @namespace      http://freecog.net/2007/
// @description    Lets you attack or attack again by pressing "a".  Hit non-combat buttons by typing the index at which the appear on the page.
// @include        http://*kingdomofloathing.com/*
// @exclude        http://forums.kingdomofloathing.com/*
// ==/UserScript==

if (!/^http:\/\/(www\d*\.)?kingdomofloathing\.com\/./i.test(document.location.href))
	return;

function attack() {
	var button = document.getElementById("tack");
	if (button) {
		button.click();
		return true;
	}
	
	var links = Array.filter(document.getElementsByTagName("a"), function(a) {
		return /Adventure [Aa]gain/.test(a.textContent);
	});
	if (links.length) {
		window.location.href = links[0].href;
		return true;
	}
}

function choose(num) {
	var index = num - 1; // Convert to zero-based
	var forms = document.getElementsByTagName('form');
	if (forms[index]) {
		forms[index].submit();
		return true;
	} else {
		alert("No such form found: " + num);
	}
}

const char0 = "0".charCodeAt(0);
const char9 = "9".charCodeAt(0);

window.addEventListener("keypress", function(evt) {
	// Don't fire when typing in text inputs
	if (evt.target.tagName in {'INPUT':1,'TEXTAREA':1,'SELECT':1})
		return;
	
	if (String.fromCharCode(evt.charCode).toLowerCase() === 'a') {
		attack();
	} else if (evt.charCode > char0 && evt.charCode <= char9) {
		choose(evt.charCode - char0);
	}
}, false);