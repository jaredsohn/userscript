// ==UserScript==
// @name                Trolls for Contrepoints
// @description         Hide comments from well-known trolls on Contrepoints website
// @version				1.1
// @include     http://www.contrepoints.org/*
// ==/UserScript==  

var l = document.getElementsByTagName('cite');
for (var i = 0; i < l.length; i++) {
    var e = l[i];
    var n = e.innerHTML.toLowerCase();
    if (n == 'ravachol' || n == 'antilib' || n == 'makhnov' || n == 'makhno' || n == 'adwaoc') {
        e = e.parentNode.parentNode.nextSibling;
        while (e && ('' + e.tagName).toLowerCase() != 'div')
            e = e.nextSibling;
        e.innerHTML = '<p>...</p>';
    }
}