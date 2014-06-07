// Created by: Xbain, idea by Smokey
// ==UserScript==
// @name          DPBall Forums SpellCheck Remover
// @namespace     http://dpball.com/
// @description   Removes dpball.com forums auto spellcheck
// @include       http://*dpball.com/forums/*
// ==/UserScript==

var allPostButtons, thisPostButton;

allPostButtons = document.getElementsByName("post");

for (var i = 0; i < allPostButtons.length; i++) {
    thisPostButton = allPostButtons[i];
    thisPostButton.setAttribute('onclick','return submitThisOnce(this);');
}

// end user script