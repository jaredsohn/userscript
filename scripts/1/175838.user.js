// ==UserScript==
// @name                MTurk Confirm Return HIT
// @author              Chet Manley
// @version             0.1
// @description         A prompt to confirm returning a HIT to prevent accidental returns.
// @include             https://www.mturk.com/mturk/accept*
// @include             https://www.mturk.com/mturk/continue*
// @include             https://www.mturk.com/mturk/preview*
// @include             https://www.mturk.com/mturk/return*
// @require             http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

// v0.1, 2013-08-15     Confirm returning a HIT. Prevent accidental returns.
//                      ---------------------------------------------------------------------------

$('img[src="/images/return_hit.gif"]').parent().click(function() {
    return confirm('Are you sure you want to return this HIT?\r\nPress OK to return the HIT or press Cancel to continue working on the HIT.');
});