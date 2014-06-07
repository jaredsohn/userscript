// ==UserScript==
// @name           RTC - check autosave button ... automatically
// @namespace      namuol
// @description    ensures the auto-save checkbox is checked
// @include        https://cqprapw1.paychex.com:9443/*
// ==/UserScript==
function checkTheBox() {
	var checkboxdiv = document.getElementsByClassName('auto-save')[0],
		checkbox;
	if (checkboxdiv) {
		checkbox = checkboxdiv.children[0];
	}
	
	if (!checkbox) {
		checkbox = document.getElementById('com_ibm_team_rtc_foundation_web_ui_widgets_CheckBox_0__input_label');
	}
	
	if(checkbox && !checkbox.checked) {
		checkbox.click();
	}
}

setInterval(checkTheBox, 1000);