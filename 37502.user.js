// ==UserScript==
// @name           Autosubmit Password Form 2.1
// @description	Will log you in automatically when the password is completed automatically by a password manager
// @description	Some ideas taken from AutoLogin 2 by http://www.squarefree.com/userscripts
// @namespace	http://userscripts.org/users/filius
// @include        *
// ==/UserScript==

window.addEventListener("load",
function() {
	
	var ExcludeTheseDomains = ['lexisnexis|google|gmail']; //These domains will not be acted on by this script
	
	if (document.location.href.search(RegExp(ExcludeTheseDomains)) == -1) {

		// Find the password inputs
		var inputs = document.getElementsByTagName('input');

		// Set up an array for passwords
		var arrPwdFields = [];
        var intervalID;
		for each(var input in inputs) {
			if (input.type == 'password') {
				if (input.form) {
					arrPwdFields.push(input);
					input.addEventListener("focus", function () {window.clearInterval(intervalID);}, false); // If the user goes to enter text in a password field, it is a manual entry and not one we want to process
				}
			}
		}

		if (0 < arrPwdFields.length <= 2) { // Needs to have less than three - if more than 2 it is most likely a change password page
	    
			// Keep doing checking password fields until one gets filled
			intervalID = window.setInterval(function() {
				for each (pwdField in arrPwdFields) {
					if ((pwdField.value !== '') && !(pwdField.value.toLowerCase() == 'password')) { 

						window.clearInterval(intervalID); // Stop checking
					
						// Submit the form. Using form.submit() doesn't always work, so we'll find the button and click it.
						var pwdForm = pwdField.form;
						var submitButton = null;

						// Least favourite option, will hopefully be overridden by something else
						for each (var formButton in pwdForm.getElementsByTagName("input")) {
							if (formButton.type == "button") {
								submitButton = formButton;
								break;
							}
						}
						
						// Look for a submit button
						for each (var formElement in pwdForm.elements) {
							if (formElement.type == "submit") {
								submitButton = formElement;
								break;
							}
						}

						// Also look for <input type=image>
						for each (var formImage in pwdForm.getElementsByTagName("input")) {
							if (formImage.type == "image") {
								submitButton = formImage;
								break;
							}
						}

						if (submitButton) {
							// Give a visual indication that we're submitting the login form automatically.
							submitButton.focus();
							submitButton.style.border = "3px outset #555555";

							// Submit the form by calling click() on the submit button.
							submitButton.click();
						} else {
							// Submit the form using this method if no other way
							// alert('Just a plain submit');
							pwdForm.submit();
						}
						return;

					}
				}
			}, 5);
		}
	}
}, false);