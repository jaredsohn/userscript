// ==UserScript==
// @name           Captcha Reloader
// @namespace      Vali202(fab_74)
// @description    Allows users to reload a captcha by pressing down arrow.
// @include        *
// ==/UserScript==

function KeyCheck(i) {
	if(i.keyCode == 40) {
		window.location = "javascript:Recaptcha.reload();";
	}
}
window.addEventListener('keydown', KeyCheck, true); 