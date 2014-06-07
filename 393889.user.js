// ==UserScript==
// @name            Senmanga Fix
// @namespace        kill@the.jew
// @description        Fix senmanga anti-greasemonkey bullshit
// @run-at            document-start
// @include            http*://senmanga.com/*
// @include            http*://*.senmanga.com/*
// ==/UserScript==
var re = /greasemonkey/i;
window.addEventListener('beforescriptexecute', function(e) {
    if(re.test(e.target.text)){
        e.stopPropagation();
        e.preventDefault();
    }
}, true);
