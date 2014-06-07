// ==UserScript==
// @name			Disable Google Autocomplete
// @namespace		shiin
// @description		Disables Google's irritating autocomplete & preview w/o messing up other functionality (original version: Tertheros)
// @include			http://*.google.*
// @include			https://*.google.*
// ==/UserScript==


(function() {

var checkInterval;
var goodChecksCount = 0;
var usingAutoComplete = false;

checkInterval = window.setInterval(exterminateGoogleAnnoyances, 10);
function exterminateGoogleAnnoyances() {
	var inputs = document.getElementsByTagName('input');
	
	for (var i in inputs) {
		if (inputs[i].name == "q") {
			// Check if our change stuck
			if (inputs[i].getAttribute("autocomplete") == "on") {
				// Finally, Google is neutered
				goodChecksCount++;
				
				if (goodChecksCount == 10) {
					clearInterval(checkInterval);
				}
			} else {
				// Replace search textbox with one that doesn't have any event listeners
				var newNode = inputs[i].cloneNode(false);
				
				newNode.setAttribute("autocomplete", "on");
				newNode.onkeyup = onKeyUpHandler;
				newNode.oninput = onInputHandler;
				
				inputs[i].parentNode.appendChild(newNode);
				inputs[i].parentNode.removeChild(inputs[i]);
			}
			
			break;
		}
	}
}

function onInputHandler(e) {
//	console.log(e, e.cancelBubble);
	usingAutoComplete = !(e.cancelBubble == false);
}

function onKeyUpHandler(e) {
//	console.log(e, usingAutoComplete);
	if( usingAutoComplete == false && e.keyCode == 13)
		document.forms[0].submit();
	usingAutoComplete = false;
}

})();