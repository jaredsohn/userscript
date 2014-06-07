// ==UserScript==
// @name       CodebaseHQ Ticket permalinks
// @namespace  http://
// @version    0.1
// @description  Adds a permalink to each ticket update for easy linking
// @match      http*://*.codebasehq.com/*/tickets/*
// @copyright  2012+, You
// ==/UserScript==
var elems = document.getElementsByTagName('*'), i;
for (i in elems) {
    if((' ' + elems[i].className + ' ').indexOf(' ' + 'update' + ' ')
       > -1 && elems[i].nodeName == 'LI') {
        var a = document.createElement('a');
        a.href = document.URL + '#' + elems[i].id;
        a.innerHTML = 'Permalink';
        elems[i].insertBefore(a, elems[i].firstChild);
    }
}
