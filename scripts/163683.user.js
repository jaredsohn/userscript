// ==UserScript==
// @name        Remove EpiAdd
// @namespace   http://userscripts.org/users/heaven
// @include     https://intra.epitech.eu/
// @version     1
// ==/UserScript==

window.onload = function() {
    document.getElementsByClassName('banniere-content')[0].innerHTML = '';
};