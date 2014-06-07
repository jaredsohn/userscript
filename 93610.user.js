// ==UserScript==
// @name           filmweb skip splash
// @description    ze strony z reklamą automatycznie przechodzi dalej
// @include        http://www.filmweb.pl/
// ==/UserScript==

var link = document.getElementById('goToLink');
if (link) {
    document.location.href = link.href;
}
