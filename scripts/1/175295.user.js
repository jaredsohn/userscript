// ==UserScript==
// @name Find Selected
// @author Synetech, Alec Soroudi
// @namespace http://synetech.dyndns.org/
// @version 1.0
// @description Searches the page for the selected text. While selecting or double-clicking text, hold Ctrl/Command⌘ to jump to the next occurrence of the selected text, or ⇧Shift+Ctrl/Command⌘ to jump to the previous occurrence.

// @run-at document-end
// @match http://*/*
// @match https://*/*

// In case Chrome supports @requires in the future:
// @require http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==



/*
This script is an answer to the following question:
	http://superuser.com/questions/628223/is-there-a-way-to-yank-the-selected-text-into-the-search-field-in-chrome/

Getting the current selection is simple enough:
	http://developer.mozilla.org/en-US/docs/Web/API/window.getSelection
	http://stackoverflow.com/questions/5643635/how-to-get-selected-html-text-with-javascript

Unfortunately, implementing an extension to do this was a lot more tricky than expected due to numerous obstacles and limitations.
Here’s a smattering of problems encountered and references that it took to make this script:

	1: Chrome does not provide programmatic access to the search-control, therefore the search must be performed in-document with the DOM:
		http://developer.mozilla.org/en-US/docs/Web/API/window.find
		http://developer.mozilla.org/en-US/docs/Web/API/window.find?redirectlocale=en-US&redirectslug=DOM%2Fwindow.find
		http://help.dottoro.com/ljstxqnd.php
		http://stackoverflow.com/questions/10455626/keydown-simulation-in-chrome-fires-normally-but-not-the-correct-key/12522769
		http://stackoverflow.com/questions/16827817/searching-and-highlighting-text-on-current-page-for-a-chrome-extension
		http://stackoverflow.com/questions/5825498/is-there-a-method-to-use-javascript-or-jquery-to-launch-chrome-find-same-as-ct
		http://stackoverflow.com/questions/596481/simulate-javascript-key-events
		http://www.javascripter.net/faq/find_dia.htm

	2: There is no general-purpose onselect event (it only works for a few form elements), so it must be implemented using the mouseup event:
		http://help.dottoro.com/ljsjcrav.php
		http://mark.koli.ch/2009/09/use-javascript-and-jquery-to-get-user-selected-text.html
		http://reference.sitepoint.com/html/event-attributes/onselect
		http://stackoverflow.com/questions/3545018/selected-text-event-trigger-in-javascript
		http://stackoverflow.com/questions/3731328/on-text-highlight-event
		http://stackoverflow.com/questions/4367353/jquery-select-text-event
		http://www.w3schools.com/jsref/event_onselect.asp
		http://www.w3schools.com/tags/ev_onselect.asp

	3: The onmouseup event triggers when trying to double-click, so jQuery is used to avoid blocking double-clicking:
		http://jquery.10927.n7.nabble.com/click-dblclick-Problem-td122120.html
		http://stackoverflow.com/questions/1067464/need-to-cancel-click-mouseup-events-when-double-click-event-detected
		http://stackoverflow.com/questions/15566597/mouseup-and-doubleclick-both-attached-to-seperate-event-handling-functions-using
		http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
		http://www.w3schools.com/jsref/event_onmouseup.asp

	4: Chrome does not support @requires for userscripts, so jQuery cannot be included and must be either embedded or dynamically loaded:
		http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script
		http://joanpiedra.com/jquery/greasemonkey/
		http://stackoverflow.com/questions/10928218/how-to-use-jquery-in-chrome-extensions-contentscript-without-conflict
		http://stackoverflow.com/questions/2246901/how-can-i-use-jquery-in-greasemonkey-scripts-in-google-chrome
		http://stackoverflow.com/questions/2588513/why-doesnt-jquery-work-in-chrome-user-scripts-greasemonkey

	5: Loading the latest jQuery from their site would block it from working in secure (HTTPS) pages
		 Loading it from Google lets it run in on HTTPS pages, but is slightly more complex because the version must be specified

	6: Having the script active all the time would be frustrating, so a hotkey needs to be used to limit activity:
		http://stackoverflow.com/questions/3781142/jquery-or-javascript-how-determine-if-shift-key-being-pressed-while-clicking-an
		http://stackoverflow.com/questions/9276843/jquery-check-for-clicking-left-ctrl-left-shift-and-left-ctrl-right-shift

	7: A single-click would trigger it if a selection already exists, even if no (new) selection was made, so must prevent that:
		http://stackoverflow.com/questions/11128130/select-text-in-javascript
		http://stackoverflow.com/questions/1426634/make-programmatic-range-selection-visible-to-the-user
		http://stackoverflow.com/questions/2075304/how-to-modify-the-document-selection-in-javascript
		http://stackoverflow.com/questions/3169786/clear-text-selection-with-javascript
		http://stackoverflow.com/questions/6139107/programatically-select-text-in-a-contenteditable-html-element
		http://stackoverflow.com/questions/985272/jquery-selecting-text-in-an-element-akin-to-highlighting-with-your-mouse

	8: The manually-implemented onselect handler must apply to the whole page:
		http://www.bennadel.com/blog/1838-Wrapping-The-Window-Object-In-A-jQuery-Wrapper.htm
*/





// Callback function that is added to the page and called when jQuery is loaded and ready
function jQueryLoaded ($) {
	// Attach to mousedown to clear the selection whenever the hotkey is held down and the mouse button is pressed
	// This prevents the action from triggering when doing a single-click while a selection already exists
	$(window).mousedown	(function(e) {if (e.ctrlKey) window.getSelection().empty();});
	// Attach to mouseup to emulate a genearl-purpose onselect event (but only when hotkey is held)
	$(window).mouseup		(function(e) {if (e.ctrlKey) {
			// Get the current selection; this is a Chrome script, so window.getSelection is sufficient
			var text=window.getSelection();
			// If a selection exists at all, then use the find() function to jump to an occurrence of the selected text
			// Jump direction depends on whether or not the ⇧Shift key is held at time of selection
			if (text!='') window.find(text,false,e.shiftKey,true,false,true,true);
	}});
}

// Load jQuery from Google’s secure CDN API servers so that the script works on all pages, including HTTPS
function LoadjQuery (callbackFn, jqVersion) {
		// Must specify the version to load since Google does not (yet) support a “-latest” copy
    jqVersion       = jqVersion || "1.10.1";
		// Create a new script element to host jQuery
    var scriptNode  = document.createElement ('script');
		// We will add it to the head if possible
    var targ        = document.getElementsByTagName ('head')[0] || document.body || document.documentElement;
		// Point the script source to the online copy of jQuery at Google’s HTTPS servers
		// (If jQuery’s servers start supporting HTTPS, then use that instead because it supports “jquery-latest.min.js”.)
    scriptNode.src  = 'https://ajax.googleapis.com/ajax/libs/jquery/' + jqVersion + '/jquery.min.js'; //http://code.jquery.com/jquery-latest.min.js
		// Set an event-listener to add the callback function once the jQuery element is added and loaded and jQuery is ready
    scriptNode.addEventListener ("load", function () {
				// Create another new script element to host the callback function
        var scriptNode					= document.createElement ("script");
        // Set the jQuery callback to the function to be embedded into the page and called when jQuery is ready
        scriptNode.textContent	= 'var gm_jQuery  = jQuery.noConflict (true);\n' + '(' + callbackFn.toString () + ')(gm_jQuery);';
        // Add the callback function script element to the head (this happens *after* jQuery is added and loaded)
        targ.appendChild (scriptNode);
    });
    // Add the jQuery script element to the head (this happens *before* the callback function is added)
    targ.appendChild (scriptNode);
}

// Check if jQuery is already present and if not, then load it
if (typeof jQuery=="undefined") LoadjQuery (jQueryLoaded);
