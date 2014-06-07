// ==UserScript==
// @name           Subjot Twitter character counter
// @namespace      hmc_
// @description    colors the character count on SJ when it exceeds a tweet's length
// @include        http://subjot.com/*
// @version        0.3
// ==/UserScript==

var char_count;
var textEntry;
function getElements() {
	char_count = document.getElementById('new_count');
	textEntry = document.getElementById('new_jot_text');
}

function updateTextStyle() {
	if(parseInt(char_count.textContent) <= 109) {
		char_count.style.color="red";
	} else {
		char_count.style.color="#707070";
	}
}

function addListeners() {
	textEntry.addEventListener('keypress',updateTextStyle, false);
}

getElements();
addListeners();