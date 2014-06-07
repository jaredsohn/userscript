// ==UserScript==
// @author         Jan-Hendrik Willms <tleilax+studip@gmail.com>
// @name           Reenable autocomplete for CAS-Login@Uni-Ol
// @namespace      uniol
// @description    Removes the "no autocomplete"-limitation on the login page
// @include        https://cas.elearning.uni-oldenburg.de/cas/login*
// @version        1.0
// ==/UserScript==

var elements = document.querySelectorAll('[autocomplete]'),
    length = elements.length;

for (var i = 0; i < length; i++) {
    var element = elements.item(i),
        state   = element.getAttribute('autocomplete');
    if (state === 'false' || state === 'off') {
        element.setAttribute('autocomplete', true);
    }
}