// ==UserScript==
// @name           just the search results
// @version        0.1.4
// @namespace      marktplaats
// @description    Removes commercial ads from marktplaats, pressing 'cursor right' key goes to next results page
// @description    * Removes commercial ads and a few bits and pieces from marktplaats to unclutter the search results 
// @description    * pressing 'cursor right' key goes to next results page
// @description    this script needs jQuery. It's 'required' in the header, but apparently Firefox just ignores it. Tough. I
// @description    build it to speed up Marktplaats browsing with Chrome. Too lazy to implement it in pure javascript
// @include        http://www.marktplaats.nl/z.html?*
// @include        http://www.marktplaats.nl/z/*.html?*
// @copyright      2013, Peter Slootweg (pxslootgmailcom)
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
//
// ==/UserScript==

/*
 * Changelog
 *
 * v0.1.4:
 * - added filter for 'vakmensen' and 'diensten', as suggested by Sebastiaan Giebels
 */

$('tr.search-result').filter(":contains(Bezorgt in)").hide();
$('tr.search-result').filter(":contains(Topadvertentie)").hide();
$('tr.search-result').filter(":contains(Dagtopper)").hide();

$('.search-result .icon-thumb-up').closest('.search-result').hide();
$('.search-result .icon-thumb-down').closest('.search-result').hide();

$("#footer").hide();
$(".bottom-listing").hide();
$("#adsenceContainer").hide();
$("#adsenceContainerTop").hide();
$("#bottom-listings-divider").hide();

$("body").keyup(function(event) {
    // leave the keys alone while typing text
    if ($(event.target).is('input, textarea'))
        return;

    // next page with results
    if (event.which == '39') {
        var href = $('a.pagination-next').attr('href');
        if (href!=null) window.location.href = href;
    // previous page
    } else if (event.which == '37') {
        var href = $('a.pagination-previous').attr('href');
        if (href != null) window.location.href = href;
	// type '/' to go to the search field
    } else if (event.which == '191' ) {
		$(".query").focus();
    } else {
//		alert(event.which);
    }
});