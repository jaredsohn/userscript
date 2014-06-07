// ==UserScript==
// @name          Gmail bottom posting in replies
// @namespace     http://henrik.nyh.se
// @description   Inserts the caret _after_ the quoted text when replying to mails using Gmail. Does not work with HTML (rich text) mails.
// @include       https://mail.google.tld/mail/*
// @include       http://mail.google.tld/mail/*
// @include       https://mail.google.tld/a/*
// @include       http://mail.google.tld/a/*
// ==/UserScript==

document.addEventListener('focus',function(event) {

	// Bail if the focused element is not a reply form
	if (!event.target.id || !event.target.id.match(/^ta_\d+$/)) return;

	var textarea = event.target, body = textarea.value;
	
	// Bail if contents don't match the default top-posting (e.g. if we modified it already)
	if (!body.match(/^\n\n\w.*?:\n>/)) return;  // Matches e.g. "\n\nOn 1/2/3, Foo wrote:\n>"
	
	textarea.value = body.replace(/^\n\n/, '');  // Strip initial line breaks
	
	var signatureBegins = body.lastIndexOf("\n-- \n");
	var endOfContent = caretPosition = (signatureBegins == -1 ? body.length : signatureBegins);
	
	if (signatureBegins != -1) {  // There is a signature
		endOfContent -= 2;
		textarea.value = body.substring(0, endOfContent) + "\n" + body.substring(endOfContent);  // Add line break before signature
	} else {  // There is no signature
		textarea.value += "\n";  // Add line break to end
	}

	textarea.scrollTop = textarea.scrollHeight;  // Scroll to bottom
	setTimeout(function() {  // A tiny timeout is necessary, or the caret won't move
		textarea.setSelectionRange(caretPosition, caretPosition);  // Place caret at end
	}, 1);
	
}, true);