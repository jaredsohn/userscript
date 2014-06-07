// ==UserScript==
// @name		MTurk Zing Receipt Compare Script
// @author		Austin3600 (WoLF)
// @version		1.0
// @description	Allows you to press one button on Zing's "Are these two receipts the same"
//				HITs and it'll automatically pick that option and submit for you. There will
//				be a confirm pop-up (to avoid errors), you can quickly press Enter on your
//				keyboard to confirm & submit.
// @match		https://backend.ibotta.com/duplicate_receipt_moderation*
// @grant		none
// ==/UserScript==

var radios = document.getElementsByTagName("input");
var button = document.getElementsByTagName("button");
var submitBut;
document.onkeydown = showkeycode;

for (i = 0; i < button.length; i++) {
	if (button[i].type == "submit") {
		submitBut = button[i];
	}
}

function showkeycode(evt){
	var keycode = evt.keyCode;
	switch (keycode) {
		case 78: //n
		for (i = 0; i < radios.length; i++) {
			if (radios[i].type == "radio"){
				if (radios[i].value == "false") {
					radios[i].checked = true;
					if (confirm("Are you sure these two receipts are NOT the same?")) submitBut.click();
				}
			}
		}
		break;
		case 89: //y
		for (i = 0; i < radios.length; i++) {
			if (radios[i].type == "radio"){
				if (radios[i].value == "true") {
					radios[i].checked = true;
					if (confirm("Are you sure these two receipts ARE the same?")) submitBut.click();
				}
			}
		}
		break;
		default: break;
	}
}