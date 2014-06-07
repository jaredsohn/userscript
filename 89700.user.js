// ==UserScript==
// @name           UD Speech Combiner
// @namespace      http://wiki.urbandead.com/index.php/User:Thvortex
// @description    Enlarges the speech input box and combines it with graffiti and broadcast boxes
// @include        http://*urbandead.com/map.cgi*
// ==/UserScript==

// CC0: Public Domain. http://creativecommons.org/publicdomain/zero/1.0/
// To the extent possible under law,  Thvortex  has waived all copyright and related or neighboring
// rights to UD Speech Combiner. This work is published from:  United States.


// CHANGE "SIZE" CONSTANT TO CUSTOMIZE THE WIDTH OF THE TEXT BOX
const SIZE = 50;

const NAMES = ["speech", "graffiti", "broadcast", "graffitib"];

// Returns a closure that acts as an "onclick" event listener for the submit buttons. The bound
// "name" argument will be different for each listener, and is assigned to the "name" attribute
// of the single text field before submitting the form. Also checks for the 50 character limit
// when spray painting graffiti or performing a broadcast.
function clickListener(name) {
	return function(event) {
		var textField = event.target.form.firstChild;
		textField.name = name;

		if(name != "speech" && textField.value.length > 50) {
			alert("Text is too long (" + textField.value.length + " characters).\n" +
				"Maximum length for graffiti or broadcast is 50.");
			event.preventDefault();
		}				
	}
}

// Find all speech/graffiti/broadcast text fields on the page
var textBox = [];
for(var i = 0; i < NAMES.length; i++) {
	var elements = document.getElementsByName(NAMES[i]);
	
	if(elements[0] && elements[0].tagName == "INPUT") {
		textBox.push(elements[0]);
	}
}

if(textBox.length) {
	// Only increase size of first text box; other boxes are removed
	textBox[0].size = SIZE;

	// If more than one text box, move their submit buttons to first (master) text box's
	// form, and remove the extra forms from the document. If there is any additional
	// text after a submit button (i.e. the "10 AP" cost of spraying a billboard) then
	// append this text to the master form after the submit button.
	var masterForm = textBox[0].form;
	for(var i = 1; i < textBox.length; i++) {
		var thisForm = textBox[i].form;
		var oldButton = thisForm.querySelector("input[type='submit']");
		var newButton = oldButton.cloneNode(true);
		
		masterForm.appendChild(document.createTextNode(" "));
		masterForm.appendChild(newButton);
		thisForm.parentNode.removeChild(thisForm);
		
		var sibling = oldButton.nextSibling;
		while(sibling) {
			masterForm.appendChild(sibling);
			sibling = sibling.nextSibling;
		}
	}

	// Add event handlers to all submit buttons to change the "name" attribute
	// on the text field to the appropriate one for that button. Note that GreaseMonkey
	// requires using addEventListener because of its sandbox security model.
	var submitButton = masterForm.querySelectorAll("input[type='submit']");
	for(var i = 0; i < submitButton.length; i++) {
		submitButton[i].addEventListener("click", clickListener(textBox[i].name), false);
	}
}
