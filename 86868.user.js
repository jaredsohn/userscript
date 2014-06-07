// ==UserScript==
// @name           Google Dictionary Enhancer
// @namespace      gminuses
// @description    Improves Google Dictionary user experience
// @include        http://www.google.*/dictionary* 
// ==/UserScript==

var textInput = document.getElementsByName('q')[0];
var form = document.getElementsByName('f')[0];

// On google chrome (current version: 6.0.472.53 beta), if the
// text in the text input is selected and focused, and then the
// speaker icon (pronounciation) is clicked, the text input loses
// focus, but somehow the text is still selected, making the next
// focus event unable to select text (again strangely). The
// following deselects the text manually.
textInput.addEventListener('blur', function() {
	if(textInput.selectionStart !== textInput.selectionEnd) {
		window.getSelection().collapse(document.body, 0);
	}
}, false);

textInput.addEventListener('focus', function() {
	setTimeout(function() {
		textInput.select();	
	}, 0);
}, false);

function serialize(string) {
	return string.trim().replace(/[\u00B7\/,.;()"'\[\]]/g, '');
}

document.addEventListener('dblclick', function() {
	if(document.activeElement === textInput) {
		return;
	}

	var newText = serialize(window.getSelection().toString());
	
	if(!newText.length) {
		return;
	}
	
	var oldText = serialize(textInput.value);

	if(newText === oldText) {
		return;
	}

	textInput.value = newText;
		
	form.submit();
	
}, false);