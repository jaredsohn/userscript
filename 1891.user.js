// ==UserScript==
// @name          Protect Textarea
// @namespace     http://arantius.com/misc/greasemonkey/
// @description   Protect from closing or navigating away from a web page with changed textareas.
// @include       http*
// @version       1.3
// ==/UserScript==

// Version History:
//
// 1.3   (2011-06-06): Use pagehide/pageshow events for cache friendliness.
//                     http://goo.gl/jyIx9
// 1.2.1 (2010-02-16): Reduce false-positive warning rate.
// 1.2   (2009-09-15): Complete rewrite, less false positives for hidden
//                     fields controlled by scripts, better handling of
//                     dynamic/ajax sites.
// 1.1   (2006-09-18): Add the "noprotect" class detection
//

var CHANGED_MARK=String(Math.random()).substr(2);

window.addEventListener('keypress', handleKeypress, true);
window.addEventListener('submit', handleSubmit, true);
window.addEventListener('beforeunload', handleUnload, true);

window.addEventListener('pageshow', function() {
  window.addEventListener('beforeunload', handleUnload, true);
}, true);

function handleKeypress(event) {
	if (
		// Ignore events not in a textarea.
		!event.target
		|| !event.target.tagName
		|| 'TEXTAREA'!=event.target.tagName
		// Ignore non-character keypresses.
		|| 0==event.charCode
		// Ignore "noprotect" textareas.
		|| event.target.className.match(/\bnoprotect\b/)
	) {
		return;
	}

	if (0 /* debug? */) {
		console.log('saw keypress in', event.target);
		console.dir(event);
	}

	// At this point we have noticed a keypress to a textarea.  Record it.
	var textarea = event.target;
	textarea.setAttribute('changed_mark', CHANGED_MARK);
	if (!textarea.hasAttribute('orig_value')) {
		textarea.setAttribute('orig_value', textarea.value);
	}
}

function handleSubmit(event) {
	var textareas = event.target.getElementsByTagName('textarea');
	for (var i=0, textarea=null; textarea=textareas[i]; i++) {
		textarea.removeAttribute('changed_mark');
	}
}

function handleUnload(event) {
  // Re-add later via pageshow.  See http://goo.gl/jyIx9
  window.removeEventListener('beforeunload', handleUnload, true);
	
	var textareas = event.target.getElementsByTagName('textarea');
	
	textarealoop:
	for (var i=0, textarea=null; textarea=textareas[i]; i++) {
		// Check for presence in the document.
		var parent=textarea.parentNode;
		while (true) {
			if ('BODY'==parent.tagName) break;
			// Skip if we climbed the parent tree and fell out before getting to the
			// <body>; this textarea was removed from the document, probably by the
			// script that submitted it via AJAX (or some such).
			if (!parent || !parent.tagName) continue textarealoop;
			parent=parent.parentNode;
		}

		// Skip if we haven't marked this as changed.
		if (!textarea.hasAttribute('changed_mark')) continue;
		if (textarea.getAttribute('changed_mark') != CHANGED_MARK) continue;
		
		// Skip if the value is the same as the first we observed.  (I.E. only
		// arrow or Ctrl-C keypresses.)
		if (textarea.value == textarea.getAttribute('orig_value')) continue;
		
		// Skip if the value is empty. (Nothing to lose!)
		if ('' == textarea.value) continue;
		
		// Didn't skip, so do interrupt leaving the page.
		return event.returnValue='You have modified a textarea, and ' +
			'have not submitted the form.';
	}
}
