// ==UserScript==
// @namespace     http://kailasa.net/prakash/greasemonkey
// @name          fix-pcl-book-footnotes
// @description   Make footnotes clickable in Practical Common Lisp online book
// @include       http://www.gigamonkeys.com/book/*
// ==/UserScript==

// footnotes are created using <sup> elements

var sups = document.getElementsByTagName('sup');
//alert(sups[0].textContent);
for (var i = 0; i < sups.length; i++) {
    var fn = sups[i].textContent;
    var fnname = 'fn' + fn;

    var link = document.createElement('a');
    link.setAttribute('href', '#' + (i < sups.length/2 ? fnname : fnname + '_b'));
    link.textContent = fn;
    sups[i].replaceChild(link, sups[i].firstChild);

    // create a named reference to backlink
    var link_back = document.createElement('a');
    link_back.setAttribute('name', (i < sups.length/2 ? fnname + '_b' : fnname));
    sups[i].appendChild(link_back);
}
