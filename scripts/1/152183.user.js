// ==UserScript==
// @name         Reddit Tidy
// @description  Remove some cruft from reddit's interface
// @lastupdated  2013-08-13
// @version      1.0.4
// @license      Public Domain
// @include      http://*.reddit.com/*
// @grant        none
// ==/UserScript==

/* I don't use these buttons. */
$('a.give-gold').parent().remove();
$('li.share').remove();

/* Keep the space as to not break custom subreddit CSS. */
$('#sr-header-area').html('');

/* Side junk. */
$('#ad-frame').remove();
$('.sidebox').remove();

/* Footer junk. */
$('.footer-parent').remove();
$('.help-toggle').remove();

/* Link karma. */
$('span.user').contents().slice(1, 4).remove();

/* Remove the multireddit sidebar. */
$('body').addClass('listing-chooser-collapsed');
store.set('ui.collapse.listingchooser', true);

/* Default to searching within subreddits. */
(function($input) {
    if ($input.length > 0) { $input.get(0).checked = true; }
}($('input[name="restrict_sr"]')));
