// ==UserScript==
// @name        reddit downboater
// @namespace   blah
// @require
// @include     http*://www.reddit.com/r/*/comments/*
// @version     1.0
// ==/UserScript==
elements = document.querySelectorAll('[aria-label="downvote"]');

for (var i=0; i < elements.length; i++) {
    elements[i].click();
}
