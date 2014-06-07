// ==UserScript==
// @name           trac.article.ajax_update
// @namespace      jquery
// @description    Requires jquery and jquery.hotkeys
// @include        http://trac.*
// ==/UserScript==

// Check if jQuery's loaded
(function ($) {
	var resource = $('form#edit').attr('action');
	var ajax_submission = $('<input type="button" value="Ajax Submission" name="ajax_save"/>');

	var handler = function() {
		var text = $('textarea#text').val();

		var form_token = $('[name=__FORM_TOKEN]').attr('value');
		var version = $('input[name=version]').attr('value');
		$.post(
			resource,
			{__FORM_TOKEN: form_token, action: 'edit', version: version, text: text},
			function() {
				$('#help').css('background-color', 'red');
				setTimeout(function() {$('#help').css('background-color', '');}, 250);
			}
		)
		$('input[name=version]').attr('value', parseInt(version) + 1);
	};
	ajax_submission.click(handler);
	$('.buttons').append(ajax_submission);
	$.hotkeys.add('Alt+s', handler);
})(unsafeWindow.jQuery);

