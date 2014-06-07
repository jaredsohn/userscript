// ==UserScript==
// @name        Junk the Junkyard
// @namespace   http://fra.xtil.net/
// @description Gets rid of r21freak's Junkyard.
// @include     http://r21freak.com/*
// ==/UserScript==

rows = document.getElementsByClassName('row');

/* Eliminate JY posts from the "View active topics" page */
if (document.getElementsByTagName('h2').length && document.getElementsByTagName('h2')[0].innerHTML.search('View') == 0) {
    for (i = 0; i < rows.length; i++) {
        tmp = rows[i].children[0].children[0].children;
        if (tmp[tmp.length - 1].innerHTML == 'The Junkyard') {
            rows[i].style.display = 'none';
        }
    }
}
/* Eliminate the JY from the forum list */
else {
    for (i = 0; i < rows.length; i++) {
        if (rows[i].children[0].children[0].children[0].innerHTML == 'The Junkyard') {
            rows[i].style.display = 'none';
        }
    }
}