// ==UserScript==
// @name           Konami Code
// @namespace      mykonaminamespace
// @description    Enters the Konami Code on every URL visited
// @include        *
// @exclude        http://www.geekandhype.com/all-your-base-are-belong-to-us/
// @exclude        http://whomwah.com/yay-you-geeked-me-with-your-key-combo/
// @exclude        http://www.gamespot.com/nes/action/contra/hints.html
// @exclude        http://www.giantbomb.com/contra/61-4350/
// @exclude        http://singlefunction.com/konami-code/
// @exclude        http://53cr.com/secret/
// @exclude        http://add.info.tm/nes.php?game=Contra.nes
// @exclude        http://www.nikdaum.com/konami.htm
// @exclude        *.stumbleupon.com/*
// ==/UserScript==

window.simulateCode = function() {
	var evt = document.createEvent("KeyboardEvent");
	evt.initKeyEvent("keydown", true, true, null, false, false, false, false, 38, 0); //UP
	document.dispatchEvent(evt);
	evt.initKeyEvent("keydown", true, true, null, false, false, false, false, 38, 0); //UP
	document.dispatchEvent(evt);
	evt.initKeyEvent("keydown", true, true, null, false, false, false, false, 40, 0); //DOWN
	document.dispatchEvent(evt);
	evt.initKeyEvent("keydown", true, true, null, false, false, false, false, 40, 0); //DOWN
	document.dispatchEvent(evt);
	evt.initKeyEvent("keydown", true, true, null, false, false, false, false, 37, 0); //LEFT
	document.dispatchEvent(evt);
	evt.initKeyEvent("keydown", true, true, null, false, false, false, false, 39, 0); //RIGHT
	document.dispatchEvent(evt);
	evt.initKeyEvent("keydown", true, true, null, false, false, false, false, 37, 0); //LEFT
	document.dispatchEvent(evt);
	evt.initKeyEvent("keydown", true, true, null, false, false, false, false, 39, 0); //RIGHT
	document.dispatchEvent(evt);
	evt.initKeyEvent("keydown", true, true, null, false, false, false, false, 66, 0); //B
	document.dispatchEvent(evt);
	evt.initKeyEvent("keydown", true, true, null, false, false, false, false, 65, 0); //A
	document.dispatchEvent(evt);
	evt.initKeyEvent("keydown", true, true, null, false, false, false, false, 13, 0); //ENTER
	document.dispatchEvent(evt);

	evt.initKeyEvent("keypress", true, true, null, false, false, false, false, 38, 0); //UP
	document.dispatchEvent(evt);
	evt.initKeyEvent("keypress", true, true, null, false, false, false, false, 38, 0); //UP
	document.dispatchEvent(evt);
	evt.initKeyEvent("keypress", true, true, null, false, false, false, false, 40, 0); //DOWN
	document.dispatchEvent(evt);
	evt.initKeyEvent("keypress", true, true, null, false, false, false, false, 40, 0); //DOWN
	document.dispatchEvent(evt);
	evt.initKeyEvent("keypress", true, true, null, false, false, false, false, 37, 0); //LEFT
	document.dispatchEvent(evt);
	evt.initKeyEvent("keypress", true, true, null, false, false, false, false, 39, 0); //RIGHT
	document.dispatchEvent(evt);
	evt.initKeyEvent("keypress", true, true, null, false, false, false, false, 37, 0); //LEFT
	document.dispatchEvent(evt);
	evt.initKeyEvent("keypress", true, true, null, false, false, false, false, 39, 0); //RIGHT
	document.dispatchEvent(evt);
	evt.initKeyEvent("keypress", true, true, null, false, false, false, false, 66, 0); //B
	document.dispatchEvent(evt);
	evt.initKeyEvent("keypress", true, true, null, false, false, false, false, 65, 0); //A
	document.dispatchEvent(evt);
	evt.initKeyEvent("keypress", true, true, null, false, false, false, false, 13, 0); //ENTER
	document.dispatchEvent(evt);

	evt.initKeyEvent("keyup", true, true, null, false, false, false, false, 38, 0); //UP
	document.dispatchEvent(evt);
	evt.initKeyEvent("keyup", true, true, null, false, false, false, false, 38, 0); //UP
	document.dispatchEvent(evt);
	evt.initKeyEvent("keyup", true, true, null, false, false, false, false, 40, 0); //DOWN
	document.dispatchEvent(evt);
	evt.initKeyEvent("keyup", true, true, null, false, false, false, false, 40, 0); //DOWN
	document.dispatchEvent(evt);
	evt.initKeyEvent("keyup", true, true, null, false, false, false, false, 37, 0); //LEFT
	document.dispatchEvent(evt);
	evt.initKeyEvent("keyup", true, true, null, false, false, false, false, 39, 0); //RIGHT
	document.dispatchEvent(evt);
	evt.initKeyEvent("keyup", true, true, null, false, false, false, false, 37, 0); //LEFT
	document.dispatchEvent(evt);
	evt.initKeyEvent("keyup", true, true, null, false, false, false, false, 39, 0); //RIGHT
	document.dispatchEvent(evt);
	evt.initKeyEvent("keyup", true, true, null, false, false, false, false, 66, 0); //B
	document.dispatchEvent(evt);
	evt.initKeyEvent("keyup", true, true, null, false, false, false, false, 65, 0); //A
	document.dispatchEvent(evt);
	evt.initKeyEvent("keyup", true, true, null, false, false, false, false, 13, 0); //ENTER
	document.dispatchEvent(evt);
}

window.onload = window.setTimeout(function() { window.simulateCode(); },600);