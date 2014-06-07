// ==UserScript==
// @name        Google Search Killer
// @version     0.2
// @description Eliminates all the occurrences of Google search in form actions.
// @include     *
// ==/UserScript==

var googleSearchRegExp = new RegExp('google.[^.]+/search');

[].forEach.call(document.getElementsByTagName('form'), function(form) {
    if (googleSearchRegExp.test(form.action)) {
        form.action = 'http://donttrack.us';
    }
});
