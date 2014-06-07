// ==UserScript==
// @name          Gmail tab expanded snippets
// @namespace     http://henrik.nyh.se
// @description   Enables tab expanded snippets in Gmail mail bodies. Type e.g. "reg" and press the tab key to input "Regards, Firstname Lastname". Configure expansions in the script source. Will retrieve your name automagically from Gmail. Predefined English expansions: "reg" -> "Regards, Firstname Lastname"; "breg" -> "Best regards, Firstname Lastname". Predefined Swedish expansions: "h" -> "Hälsningar, Firstname Lastname"; "vh" -> "Vänliga hälsningar, Firstname Lastname"; "mvh" -> "Med vänliga hälsningar, Firstname Lastname". Predefined other expansions: "/" -> "/ Firstname". Predefined silly expansion: "*" -> "star!;)".
// @include       https://mail.google.tld/mail/*
// @include       http://mail.google.tld/mail/*
// @include       https://mail.google.tld/a/*
// @include       http://mail.google.tld/a/*
// ==/UserScript==

/* TODO:
   + More variables than just your name? Variable interpolation system?
   + Placeholders/tab stops? With prompts? Or just with the tab key, like in TextMate?
   + Interface to add snippets (selection, prompt, GM_get/setValue).
   + Make general? Or at least make it cover e.g. Hotmail, SquirrelMail, …?
*/


/* Customize */

// Wrapping the hash in a function to make it pick up on _name_ changes dynamically.
var expansions = function() {
	var name = GM_getValue("alteredName") || GM_getValue("accountName") || "Unknown";
	return {
		"/": "/ "+name.split(" ")[0],
		"reg": "Regards,\n"+name,
		"breg": "Best regards,\n"+name,
		"h": "Hälsningar,\n"+name,
		"vh": "Vänliga hälsningar,\n"+name,
		"mvh": "Med vänliga hälsningar,\n"+name,
		"*": "star!;)",
	};
}


/* Sniff name */
// See http://wiki.greasespot.net/Gmail#The_P.28.29_function

var oldP = unsafeWindow.P;
unsafeWindow.P = function(iframe, data) {

	if (data[0] == "gn")  // Default Google Accounts name flies by
		GM_setValue("accountName", data[1]);
	else if (data[0] == "p")
		for (var i = 1, j = data.length; i < j; i++)  // Look for "sx_dn" key
			if (data[i][0] == "sx_dn")  // Custom Gmail name flies by or was altered
				GM_setValue("alteredName", data[i][1].replace(/[\r\n]+/, ''));

	return oldP.apply(iframe, arguments);
}


/* Code */

const TAB_KC = 9, DELETE_KC = 46;

document.addEventListener('keypress', keyHandler, true);


function keyHandler(e) {

	// Bail unless tab was pressed in a "tb" class (Gmail mail body) textarea.
	if (e.keyCode != TAB_KC || e.target.tagName != "TEXTAREA" || e.target.className != "tb")
		return;
	
	for (var trigger in expansions())
		if (expand(e, trigger))
			break;
}


function expand(e, trigger) {

	var textarea = e.target, body = textarea.value, caret = textarea.selectionEnd, pretext = body.substring(0, caret);
	var expansion = expansions()[trigger];

	if (!pretext.match(trigger2regexp(trigger)))
		return false;
	
	textarea.value = pretext.substring(0, caret-trigger.length) + expansion + " " + body.substring(caret);
	// The reason for the extra space will soon become apparent…

	// Move caret to after the expansion.
	var caretPosition = pretext.length - trigger.length + expansion.length;
	textarea.setSelectionRange(caretPosition, caretPosition);

 	// Scroll caret into focus by deleting the extra space we inserted. Not very pretty.
	sendKeyCode(textarea, DELETE_KC);
	
	e.preventDefault();  // Don't let the tab keypress do anything else.
	return true;  // So the keyHandler loop breaks.
}


function escapeRegexp(s) { return s.replace(/([.*+?^${}()|[\]\/\\])/g, '\\$1'); }

function trigger2regexp(trigger) { return new RegExp('(^|\\s)' + escapeRegexp(trigger) + '$'); }

function sendKeyCode(to, code) {
	var ev = document.createEvent('KeyEvents');
	ev.initKeyEvent('keypress', true, true, window, false, false, false, false, code, 0);
	to.dispatchEvent(ev);
}
