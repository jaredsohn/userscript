// ==UserScript==
// @name        GoogleTranslatorAutofocus
// @namespace   Google
// @description Use 2 keys to switch between the input and the output field of the Google Translator Fields.
// @include     https://translate.google.*
// @include     http://translate.google.*
// @version     1
// ==/UserScript==

// Google Translator script
  
document.onkeypress=function(e) {
   var key = (window.event) ? event.keyCode : e.keyCode;
//F2-Key
	if(key == 113) {
		document.getElementById("source").focus();
	}
//F4-Key
	if(key == 115) {

		function selectText(element) {
			var result = document.getElementById(element);

			if (window.getSelection) {
				var select = window.getSelection();            
				var range = document.createRange();
				range.selectNodeContents(result);
				select.removeAllRanges();
				select.addRange(range);
			}
		}
		selectText('result_box');
		document.getElementById("source").blur();
	}
}