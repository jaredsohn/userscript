// ==UserScript==
// @name        Github: Toggle file diffs
// @namespace   exhost.nl/test
// @description Toggle file diffs of PRs for a better overview
// @include     https://github.com/*/*/pull/*/files
// @version     1.0.0
// @grant       none
// ==/UserScript==

$('.meta .button-group').each(function() {
    $(this).prepend('<a class="minibutton toggle" href="#">Toggle</a>');
});

$('.meta .button-group .toggle').each(function() {
    $(this).click(function(event) {
        event.preventDefault();
        $(this).parents('.meta').next().slideToggle();
    });
});