// ==UserScript==
// @id             dibaAutologin
// @name           Ing-Diba.de Autologin
// @version        1.0
// @namespace      http://frz.cc/userscripts/
// @author         Frz
// @description    
// @include        https://banking.ing-diba.de/app/login*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @run-at         document-end
// ==/UserScript==

var kontoNummer = "123456789";
var onlinePin = "";
var onlineSecurity = "123456";

	var numberField = $("input[name='view:kontonummer:border:border_body:kontonummer']");
	var pinField = $("input[name='view:pin:border:border_body:pin']");
	numberField.val(kontoNummer);
	
	if (onlinePin && onlinePin.length > 0) {
		pinField.val(onlinePin);
        $("button[value=Anmelden]").click();
	} else {
		var didFocus = false;
		numberField.focus(function() {
			if (!didFocus) {
				pinField.focus() 
				didFocus = true;
			}
		});
	}
	
	$('input[autocomplete=off]').removeAttr("autocomplete");

	function waitForStuff() {
		if ($('input.dbkpInputDisabled').length < 2) {
			setTimeout(waitForStuff, 200);
		} else {
			var requestedNumber1 = $('input.dbkpInputDisabled:eq(0)').parent().find('span').text()
			var requestedNumber2 = $('input.dbkpInputDisabled:eq(1)').parent().find('span').text()
			enterCode(requestedNumber1, requestedNumber2);
			$("button[value=Anmelden]").click();
		}
		
	}
	function enterCode(a,b) {
		var code = onlineSecurity;
		var ta = code.charAt(a-1);
		var tb = code.charAt(b-1);
		console.log("Entering code " + ta + " and " + tb + " for position " + a + " and " + b);
		
        $('input.dbkpInputDisabled:eq(0)').val(ta);
        $('input.dbkpInputDisabled:eq(1)').val(tb);
	}
	waitForStuff();