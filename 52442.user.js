// Toggle Passwords
// version 1.0 BETA!
// 2005-04-25
// Copyright (c) 2009, jaron barends
// Released under the Creative Commons GPL license
// http://creativecommons.org/licenses/GPL/2.0/
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Toggle Passwords", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Toggle Passwords
// @namespace     http://jaron.nl/
// @description   Places a link "• T" at the right side of every password field. Clicking this link toggles the display of all passwords between •••• and text.(submitting a form will allways revert the fields to type=password, to make sure no auto-competion information is stored for these fields by your browser.)
// @include       *
// @exclude       
// ==/UserScript==

window.pwToggler = {
	//create separate object to avoid conflicts
	
	pwFields: Array(),
	test: "aap",
	
	toggle: function() {
		var i;
		var pwFields = window.pwToggler.pwFields;
		var newType = (pwFields[0].type.toLowerCase() == "password") ? "text":"password";
		for (i=0; i<pwFields.length; i++) {
			pwFields[i].type = newType;
		}
	},

	addToggleLink: function(afterEl) {
		var a = document.createElement("a");
		a.href = "#";
		a.title = "toggle all password masking";
		a.addEventListener("click", window.pwToggler.toggle, true);
		a.setAttribute("style", "margin-left:-20px;width:20px;font-size:10px; font-family:Georgia,'times new roman',serif;");
		a.innerHTML = "&#x25CF; T";
		window.pwToggler.insertAfter(a,afterEl);
	},
	
	insertAfter: function(newElement,targetElement) {
		var parent = targetElement.parentNode;
		if(parent.lastchild == targetElement) {
			parent.appendChild(newElement);
		} else {
			parent.insertBefore(newElement, targetElement.nextSibling);
		}
	},
	
	init: function() {
		var i;
		var pwFields = window.pwToggler.pwFields;
		//search all inputs and push into array
		var inputs = document.getElementsByTagName("input");
		for (i=0; i<inputs.length; i++) {
			var curr = inputs[i];
			if (curr.type.toLowerCase()=="password") {
				pwFields.push(curr);
				window.pwToggler.addToggleLink(curr);
				curr.form.addEventListener("submit",function(e) {
					if (window.pwToggler.pwFields[0].type == "text") {
						//change fields back to password to prevent browser storing value
						window.pwToggler.toggle();
					}
				},false);
			}
		}
	}
}
window.pwToggler.init();