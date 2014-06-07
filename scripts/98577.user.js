// ==UserScript==
// @name		Disable Google Autocomplete & Preview
// @namespace		Tertheros
// @description		Disables Google's irritating autocomplete & preview w/o messing up other functionality (hopefully)
// @include		http://*.google.*
// @include		https://*.google.*
// ==/UserScript==


var checkInterval;
var goodChecksCount = 0;

checkInterval = window.setInterval(exterminateGoogleAnnoyances, 200);

// Disable preview and remove magnifiying glasses
document.getElementById("vspb").innerHTML = "";

var inputs = document.getElementsByTagName('button');

for (var i in inputs) {
	if (inputs[i].className == "vspib") {
		inputs[i].parentNode.removeChild(inputs[i]);
	}
}


function exterminateGoogleAnnoyances() {
	var inputs = document.getElementsByTagName('input');
	
	for (var i in inputs) {
		if (inputs[i].name == "q") {
			// Check if our change stuck
			if (inputs[i].getAttribute("autocomplete") == "on") {
				// Finally, Google is neutered
				goodChecksCount++;
				
				if (goodChecksCount == 10) {
					clearInterval(inputInterval);
				}
			} else {
				// Replace search textbox with one that doesn't have any event listeners
				var newNode = inputs[i].cloneNode(false);
				
				newNode.setAttribute("autocomplete", "on");
				
				inputs[i].parentNode.appendChild(newNode);
				inputs[i].parentNode.removeChild(inputs[i]);
			}
			
			break;
		}
	}
}

