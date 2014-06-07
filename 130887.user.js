// ==UserScript==
// @name         GMail Labelled Buttons
// @namespace    http://arundor/gmail.labelled.buttons
// @description  Makes the buttons on the new GMail interface labelled in plain text.
// @include      https://mail.google.com/mail/*
// ==/UserScript==

//I am an amateur script writer.  What you see here is not necessarily the best way to achieve what has been done.

// CHANGES:
// May 2, 2012
//  - updated so that the "Labels" menu will not list the name of each label twice.
// April 21, 2012
//  - initial version

document.addEventListener('DOMNodeInserted', showLabels, false);

function showLabels() {
	//The script needs to eventually find the elements for each of the buttons, it starts from here since this is the closest element to the buttons that has its own id.
	var buttons = document.getElementById(':ro');
	if (buttons) {
		var divs = buttons.getElementsByTagName('div');
		
		//Searching through this div section of code to find anything that might be a button.
		for (var x=0; x<divs.length; x++) {
			if (divs[x].getAttribute('title')) {
				//Exclude anything with the menuitem attribute, since these are already labelled.
				if (divs[x].getAttribute('role') != 'menuitem') {
					//Due to the way the action listener is set up, this function will fire multiple times.
					//Therefore code added by the script has the 'greasemonkey' class, so the script can check for it to determine if a previous iteration of the function has already done the work.
					if (divs[x].getElementsByClassName('greasemonkey').length == 0) {
						divs[x].innerHTML += '<span class="greasemonkey">&nbsp;' + divs[x].getAttribute('title') + '&nbsp;</span>';
					}
				}
			}
		}
	}
}
