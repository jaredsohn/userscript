// ==UserScript==
// @name        Junk EZA
// @namespace   http://fra.xtil.net/
// @description Gets rid of EZA's Junkyard topics.
// @include     http://r21freak.com/*
// ==/UserScript==

rows = document.getElementsByClassName('row');

/* Eliminate EZA posts from the Junkyard */
if (document.getElementsByTagName('h2').length) {
    if (document.getElementsByTagName('h2')[0].children.length &&
        document.getElementsByTagName('h2')[0].children[0].innerHTML.search('The Junkyard') == 0) {
        offset = 1;
    }
    else if (document.getElementsByTagName('h2')[0].innerHTML.search('View') == 0) {
        offset = 2;
    }
    else {
        return;
    }
    for (i = 0; i < rows.length; i++) {
        tmp = rows[i].children[0].children[0].children;
        if (tmp[tmp.length - offset].innerHTML == 'EZA' || tmp[tmp.length - offset].innerHTML == 'Cat-Bomb') {
            rows[i].style.display = 'none';
        }
    }
}