// ==UserScript==
// @name           DW/LJ Email/SMS Character Count
// @namespace      http://axisofevil.net/~xtina/
// @description    As it says.
// @include        http://www.dreamwidth.org/inbox/compose*
// @include        http://www.livejournal.com/inbox/compose.bml*
// @include        http://www.livejournal.com/tools/textmessage*
// @include        http://www.dreamwidth.org/tools/textmessage*
// ==/UserScript==

// Email compositions.
if (window.location.href.indexOf("compose") > -1) {
	// Get the email body.
	var emailBody = document.getElementsByTagName("textarea");
	if (emailBody) {
		emailNote = emailBody[0].nextSibling.nextSibling.innerHTML;
		// Get the max # of characters.
		if (emailNote.indexOf("5,000") > -1) {
			maxChar = 5000;
		} else {
			maxChar = 10000;
		}
		emailBody[0].nextSibling.nextSibling.innerHTML = maxChar - emailBody[0].value.length + ' characters left.';
		document.getElementsByTagName("textarea")[0].setAttribute("onKeyDown", "document.getElementsByTagName(\"textarea\")[0].nextSibling.nextSibling.innerHTML = (" + maxChar + " - document.getElementsByTagName(\"textarea\")[0].value.length) + ' characters left.';");
		document.getElementsByTagName("textarea")[0].setAttribute("onKeyUp", "document.getElementsByTagName(\"textarea\")[0].nextSibling.nextSibling.innerHTML = (" + maxChar + " - document.getElementsByTagName(\"textarea\")[0].value.length) + ' characters left.';");
	}

// Text messages.
} else {
	// Get the message field.
	var textField = document.forms[0].elements[3];
	// Get the max # of characters.
	var maxChar = textField.parentNode.childNodes[2].innerHTML;

	// Remove and change the message text.
	// Also set the initial value, if any.
	textField.parentNode.removeChild(textField.parentNode.childNodes[1]);
	textField.parentNode.childNodes[1].innerHTML = ' ' + maxChar - textField.value.length + " characters left";
	textField.parentNode.removeChild(textField.parentNode.childNodes[2]);
	textField.parentNode.childNodes[0].innerHTML += ' ';

	// Set the functions.
	textField.setAttribute("onKeyDown", "document.forms[0].elements[3].parentNode.childNodes[1].innerHTML = " + maxChar + " - document.forms[0].elements[3].value.length + ' characters left';");
	textField.setAttribute("onKeyUp", "document.forms[0].elements[3].parentNode.childNodes[1].innerHTML = " + maxChar + " - document.forms[0].elements[3].value.length + ' characters left';");
}
