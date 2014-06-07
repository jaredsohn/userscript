//
// Metafilter de-hack-ifier script
// http://metatalk.metafilter.com/16402/Kenya-hack-it#554499
//

// ChangeLog:
//   1.0  28jun08  Written as a lame joke.

// Greasemonkey magic comments:
//
// ==UserScript==
// @name          sunshinesky
// @namespace     http://www.hhhh.org/wiml/
// @version       1.0
// @description   Replaces the word "hack" with the string of your choice
// @include       http://*.metafilter.com/*
// @include       http://metafilter.com/*
// ==/UserScript==

stringOfYourChoice = GM_getValue("replacement", "curate");

upper = stringOfYourChoice.toUpperCase();
title = upper.slice(0, 1) + stringOfYourChoice.slice(1)

function r(str) {
    return str.replace(/HACK/g, upper).replace(/Hack/g, title).replace(/h[Aa][Cc][Kk]/g, stringOfYourChoice);
}

v = document.evaluate("//body/descendant::text()", document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
a = new Array();
while((n = v.iterateNext())) {
    if(( /hack/i ).test(n.nodeValue)) {
        a.push(n);
    }
}
a.forEach(function(n) {
    n.nodeValue = r(n.nodeValue);
});

document.title = r(document.title);



