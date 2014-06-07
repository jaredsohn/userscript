// ==UserScript==
// @name			Y!RTLTR
// @namespace		http://technoblogia.net/
// @description		Change the text direction of a message content from left-to-right to right-to-left and vise versa.
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @run-at			document-end
// @include			http://*.mail.yahoo.com/*/launch*
// @include			https://*.mail.yahoo.com/*/launch*
// ==/UserScript==

// Changes log:
// Dec 28th 2012 - Support new Yahoo! mail interface.
// Oct 14th 2011 - Add RTL button when user either reply or forward messages as well.

// Find the "Compose Message" Button:
var btnCompose = $('a:contains("Compose"),a:contains("Reply"),a:contains("Forward")');

$(btnCompose).live('click', function() {
	window.setTimeout(waitForEditor, 1000);
});

// Wait for the editor form to appear:
window.waitForEditor = function() {
	if ($('span#links').length == 0) {
		// Wait till the format toolbar appears:
		window.setTimeout(waitForEditor, 1000);
	}
	else {
		// Loop through each new message form:
		$('div[role="toolbar"]').each(function () {
			if($(this).find('span#links').length > 0 && $(this).find('span#tdir > a').length == 0) {
				// Add the button:
				$(this).find('span#links').after('<span id="tdir" class="btn left right"><a draggable="false" title="Convert text direction" href="#" tabindex="-1" role="button"><i>RTL</i></a></span>');
				// Add the click handler:
				$('span#tdir > a').click(function(event) {
					// Change the display & the HTML tags text direction and then change the button caption:
					$(this).parents("table").find('#rtetext > iframe').contents().find('html.yui-js-enabled').attr("dir", $(this).text().toLowerCase());
					$(this).parents("table").find('#rtetext > iframe').contents().find('p').attr("dir", $(this).text().toLowerCase());
					$(this).text($(this).text().split("").reverse().join(""));
event.stopPropagation();
				});
			}
		});
	}	
}