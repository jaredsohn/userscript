// ==UserScript==
// @name           TriTrans.net auto-select Norwegian
// @namespace      Aspi
// @description    Auto-selects Norwegian search option at TriTrans.net
// @include        http://*.tritrans.net/
// @include        https://*.tritrans.net/
// @include        http://*.tritrans.net/*index*.html
// @include        https://*.tritrans.net/*index*.html
// @require        http://usocheckup.redirectme.net/86049.js?method=update
// @version        1.03
// ==/UserScript==

// ==ChangeLog==
// @history        1.03 Removed the "onload" handler
// @history        1.02 Changed updater to usoCheckup
// @history        1.01 Added this awesome script updater and privatized the data
// @history        1.00 Initial release
// ==/ChangeLog==

(function () {
	// Obtains the language choices.
	var choices = document.getElementsByName('spraak');
	
	// Change 
	
	//Sets the Norwegian option.
	var norchoice = choices.length === 3 ? choices[2] : false;
	
	// Backup-function that runs if necessary.
	if (!norchoice) {
		for (var i = 0; i < choices.length; i += 1) {
			if (choices[i].value === "Norsk") {
				norchoice = choices[i];
			}
		}
	}
	
	// Checks the Norwegian option.
	if (norchoice) {
		norchoice.checked = true;
	}
}());