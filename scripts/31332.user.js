// ==UserScript==
// @name           Freshbooks paid in full
// @namespace      http://userscripts.org/users/muntzen
// @description    Adds a paid in full checkbox for freshbooks
// @include        https://*.billingarm.com/*
// @include        https://*.freshbooks.com/*
// ==/UserScript==


window.addEventListener("load", function(e) {

	// check to see if we are on a payment page.
	if (document.getElementById("Payment1")) {
		// now find all the fieldsets
		var fieldsets = document.getElementsByTagName("fieldset");
		for (var i = fieldsets.length - 1; i >= 0; i--) {

			// use inline anonymous function to get i in scope for as long as we need it		
			(function() {

				// create the checkbox
				var checkbox = document.createElement("input");
				checkbox.setAttribute("type", "checkbox");
				var payField = document.getElementById("Payment" + (i+1));
				var fieldsetvar =  i == 0 ? "fieldset" : "fieldset["+(i+1)+"]";
				var amountCell = document.evaluate("/html/body/div[3]/form/" + fieldsetvar + "/table/tbody/tr/td[6]", document, null, XPathResult.ANY_TYPE, null);
				amountCell = amountCell.iterateNext();
				if (amountCell) {
					var amountVal = amountCell.textContent ? amountCell.textContent.substring(1) : "";
					checkbox.addEventListener("click", function(e) {
						if (this.checked) {
							payField.value = amountVal;
						} else {
							payField.value = "";
						}
					}, false); 


					// create the new div and add the checkbox
					var newDiv = document.createElement("div");
					newDiv.appendChild(checkbox);

					// create the span with the text in it and add it to new div
					var textSpan = document.createElement("span");
					textSpan.innerHTML = "<strong>Paid in Full</strong>";
					newDiv.appendChild(textSpan);

					// add the new div after the pay field
					payField.parentNode.insertBefore(newDiv, payField.nextSibling);

				}

			})();
		}
	}

}, false);
