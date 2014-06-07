// Keyboard navigation for OkCupid! Improve Matches
// Copyright (c) 2006, Sam Hathaway
// 
// ==UserScript==
// @name           OkCupid keyboard shortcuts: Improve Matches
// @namespace      http://www.uofr.net/~sam/gm_scripts/
// @description    Adds keyboard shortcuts to OkCupid's Improve Matches screen
// @include        http://okcupid.com/questions/ask
// @include        http://www.okcupid.com/questions/ask
// @require        http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==
// 
// This program is free software; you can redistribute it and/or modify it
// under the terms of version 2 the GNU General Public License as published
// by the Free Software Foundation.

// The characters in these strings correspond to the choices for parts 1, 2, and
// 3 of an "Improve Matches" question. Please note that some non-alphanumeric
// characters do not work, because I do not know JavaScript and I am lazy.
var answer_keys = "asdf";
var matchanswer_keys = "jkl;";
var importance_keys = "zxcvb";
var answer_privately_key = "p";

// These keys will trigger the corresponding submit button.
var submit_key = "g";
var skip_key = "h";

function keydown_handler(e) {
	var key = String.fromCharCode(e.keyCode).toLowerCase();
	var i;
	if ((i=answer_keys.indexOf(key)) >= 0) {
		document.getElementsByName("answers")[i].checked=true;
		document.getElementsByName("answers")[i].focus();
	} else if ((i=matchanswer_keys.indexOf(key)) >= 0) {
		document.getElementsByName("matchanswers")[i].checked
			=!document.getElementsByName("matchanswers")[i].checked;
		document.getElementsByName("matchanswers")[i].focus();
	} else if ((i=importance_keys.indexOf(key)) >= 0) {
		document.getElementsByName("importance")[i].checked=true;
		document.getElementsByName("importance")[i].focus();
	} else if (key == answer_privately_key) {
		document.getElementById("is_private_1").checked=!document.getElementById("is_private_1").checked;
		document.getElementById("is_private_1").focus();
	} else if (key == submit_key) {
		unsafeWindow.submit_question(true);
	} else if (key == skip_key) {
		unsafeWindow.submit_question(false);
	}
}
function label_radiogroup(name, keys) {
	var buttons = document.getElementsByName(name);
	for (var i=0; i<buttons.length; i++) {
		var accel = document.createTextNode("["+keys.charAt(i)+"]");
		buttons[i].parentNode.insertBefore(accel, buttons[i].nextSibling);
	}
}
function label_submit(elem, key) {
	$(elem).text("["+key+"] "+$(elem).text());
}
document.addEventListener("keydown", keydown_handler, true);
label_radiogroup("answers", answer_keys);
label_radiogroup("matchanswers", matchanswer_keys);
label_radiogroup("importance", importance_keys);
label_submit($('#submit-button a'), submit_key);
label_submit($('#skip-button a'), skip_key);
