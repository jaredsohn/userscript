// ==UserScript==
// @name        Readable Paragraphs
// @namespace   http://my.user.script.com/blahblahblah123
// @description This script makes regular paragraph text readable on poorly designed pages.
// @include     *
// @require     http://code.jquery.com/jquery-latest.min.js
// @version     0.1
// @grant       none
// ==/UserScript==

const MAX_FONT_SIZE = 16;
const MAX_WIDTH = 600;

var paragraphFontSize = 0;

$('p').each(function() {
    paragraphFontSize = $(this).css('fontSize');
    paragraphFontSize = paragraphFontSize.replace('px', '');

    if (paragraphFontSize > MAX_FONT_SIZE) {
        $(this).css('fontSize', MAX_FONT_SIZE);
    }

    $(this).css('maxWidth', MAX_WIDTH + 'px');
});
