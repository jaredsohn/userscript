// ==UserScript==
// @name         Wikia Cleanup and Minimization
// @description  Remove all the cruft from Wikia's layout.
// @version      1.0.2
// @license      Public Domain
// @include      http://*.wikia.com/*
// @grant        none
// ==/UserScript==

/* First move search to a safe location. */
$('#WikiaPageHeader').append($('#WikiaSearch').detach());

/* Purge social media garbage Wikia puts all over the place. Must
 * hide() rather than remove() because the latter messes up the page.
 */
var garbage = ['.WikiaHeader', '.WikiaBarWrapper', '.tally',
               '.WikiaRail', '.WikiaFooter'];
window.setTimeout(function() {
    $(garbage.join(', ')).hide();
}, 0);
window.setTimeout(function() {
    $('.socialmedia-share, .share-button').remove();
}, 500);

/* Clean up page layout. */
$('#WikiaSearch')
    .css('margin-bottom', '0')
    .css('display', 'inline-block')
    .css('position', 'absolute')
    .css('right', '0');
$('#WikiaMainContentContainer').css('margin-right', '0');
$('#WikiaPage').css('margin', 'auto').css('width', '1024px');
