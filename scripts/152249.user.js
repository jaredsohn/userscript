// ==UserScript==
// @name        New York Times single page links
// @namespace   http://www.renderfast.com
// @description Add pagewanted=all to New York Times links
// @include     http://www.nytimes.com/*
// @include	    https://www.nytimes.com/*
// @match       http://www.nytimes.com/*
// @match	    https://www.nytimes.com/*
// @version     1
// @grant       none
// ==/UserScript==

function main() {
    var links = document.getElementsByTagName('a');
    for (var i=0; i < links.length; i++) {
        var mya = links[i];
        if (mya.href.search(/nytimes.com\/\d{4}\/\d{2}\/\d{2}\//) != -1) {
            if (mya.href.search(/\?/) != -1) {
                mya.href = mya.href + '&pagewanted=all';
            } else {
                mya.href = mya.href + '?pagewanted=all';
            }
        }
    }
}

main();