// ==UserScript==
// @name       YouTube Hide "Recommended for you" from related videos
// @namespace  http://mathemaniac.org/
// @version    1.0
// @description  Hides videos marked as "Recommended for you" from the related videos on YouTube video pages.
// @match      http://*youtube.com/watch*
// @copyright  2013, Sebastian Paaske Tørholm
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// ==/UserScript==

function hideRecommended() {
    $('#watch-related li').each( function () {
        if ($("span:contains('Recommended for you')", this).length > 0) {
            $(this).remove();
        }
    });
	$('#watch-related').one('DOMSubtreeModified', hideRecommended);
}

hideRecommended();