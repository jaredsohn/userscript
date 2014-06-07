// ==UserScript==
// @name           Feedly - Open entry in background
// @description    Adds 'h' as a hotkey to open selected entry in background tab 
// @namespace      userscripts.org/users/Lyk
// @author         Lyk
// @include        http://feedly.com/*
// @include        https://feedly.com/*
// @include        http://*.feedly.com/*
// @include        https://*.feedly.com/*
// @grant          GM_openInTab
// @version        1.0.1
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
// ==/UserScript==


jQuery.noConflict();

(function() {
	var background_key = 72;
		/* 72 is for the 'h'-key
		** you can change this to any key you want (until I include a script command for that :)
		** pick the corresponding number from here: http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
		*/
	/*  
	 May add this infuture version

	var orig_button = jQuery('#floatingPageActionCustomize'); //#pageActionLayouts

	var new_button = orig_button.clone();

	// init new button
	new_button.attr('id', 'open-in-background')
	.find('.pageAction')
	.text('Open in background');

	// insert new button
	orig_button.after(new_button);
	*/


	var open_entry = function() {
		var cur = jQuery('.selectedEntry');
		if (cur.length) {
    		console.log("FeedlyOpenEntryInBackgroundTab: GM_openInTab now");
			GM_openInTab(cur.find('a.title').attr('href'), true);		
			return true;
		} else {
			return false;
		}
	};


	//  new_button.click(open_entry);

	// bind key-handler
	jQuery(document).keydown(function(e) {
		if ( e.which == background_key && !(e.altKey || e.ctrlKey || e.metaKey) ) {
			var el = document.activeElement;

			// if in textfield, do nothing
			if (el && (el.tagName.toLowerCase() == 'input' && el.type == 'text' ||
					el.tagName.toLowerCase() == 'textarea')) {
				return true;  
			}
			return !open_entry(); // To supress default behavior of the event
			// Added for those who have "search as I type" features enabled, etc
		}
	});
})();

