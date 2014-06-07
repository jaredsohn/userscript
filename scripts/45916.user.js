// ==UserScript==
// @name           AutoCaptcha
// @namespace      ch.cimnine.autocaptcha
// @description    Fills in the Word "Zeitzone" to the CAPTCHA of ddl-warez.org.
// @include        http://ddl-warez.org/detail.php*
// ==/UserScript==

/* CONFIGURATION */

// The text to input into the captcha text field
var _CAPTCHA = "alternative"

// Where to autosubmit ("true") or not ("false"; default) the CAPTCHA
var _AUTOSUBMIT = true; // true / false

/* END OF CONFIGURATION */

var nameElements = document.getElementsByName("simple");
for (i=0; i<nameElements.length; i++) {
	if (nameElements[i].type = "text") {
		nameElements[i].value=_CAPTCHA;
		if (_AUTOSUBMIT) {
			nameElements[i].parentNode.parentNode.submit();
		}
	}
}