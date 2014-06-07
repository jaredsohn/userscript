// Keyboard navigation for OkCupid! QuickMatch
// Copyright (c) 2006, Sam Hathaway
// 
// ==UserScript==
// @name           OkCupid keyboard shortcuts: QuickMatch
// @namespace      http://www.uofr.net/~sam/gm_scripts/
// @description    Adds keyboard shortcuts to OkCupid's QuickMatch screen
// @include        http://okcupid.com/quickmatch
// @include        http://www.okcupid.com/quickmatch
// ==/UserScript==
// 
// This program is free software; you can redistribute it and/or modify it
// under the terms of version 2 the GNU General Public License as published
// by the Free Software Foundation.

// These keys will trigger the corresponding submit button.
var yes_key = "y";
var no_key = "n";
var cant_tell_key = "c";

function keydown_handler(e) {
	var key = String.fromCharCode(e.keyCode).toLowerCase();
	if (key == yes_key) {
		document.getElementsByName("vote")[0].click();
	} else if (key == no_key) {
		document.getElementsByName("vote")[1].click();
	} else if (key == cant_tell_key) {
		document.getElementsByName("vote")[2].click();
	}
}
function label_submit(elem, key) {
	elem.value = "["+key+"] "+elem.value;
}
document.addEventListener("keydown", keydown_handler, true);
label_submit(document.getElementsByName("vote")[0], yes_key);
label_submit(document.getElementsByName("vote")[1], no_key);
label_submit(document.getElementsByName("vote")[2], cant_tell_key);
label_submit(document.getElementsByName("vote")[3], yes_key);
label_submit(document.getElementsByName("vote")[4], no_key);
label_submit(document.getElementsByName("vote")[5], cant_tell_key);
