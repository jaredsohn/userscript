// ==UserScript==
// @name           Reveal CampusCruiser Essay Responses
// @namespace      http://ed.yukoncollege.yk.ca/greasemonkey/reveal-campuscruiser-essay-responses
// @description    Show a student's full essay response on the Printable format page of an Assessment response.
// @include        https://prod.campuscruiser.com/q?pg=review_assessment_answers*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

jQuery('.ccH2').append(' <a href="#" id="reveal-essay-responses" style="color:#f00">Reveal Essay Responses</a>');

jQuery('#reveal-essay-responses').click(function() {
		// Pull out the full essay responses, and stuff 'em onscreen.
		
		jQuery('table.ccTable>tbody>tr').each(function() {
				var response = $(this).find('td>div.ccHidden').html();
				if (response) {
						jQuery('<tr><td colspan="6">' + response + '</td></tr>').insertAfter($(this));
				}
		});
});