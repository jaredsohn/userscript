// ==UserScript==
// @name Unsticky
// @description removes first thread from 4chan
// @include http://boards.4chan.org/b/
// ==/UserScript==

f = document.forms['delform'];

e = document.forms['delform'].firstChild
n = e.nextSibling;
f.removeChild(e);

e = n;
while (!e.getAttribute || e.getAttribute('class') != 'filesize') {
n = e.nextSibling;
f.removeChild(e);
e = n;
}