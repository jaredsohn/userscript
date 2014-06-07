// ==UserScript==
// @id             yospos-date
// @name           yospos date
// @namespace      haarg
// @include        http://forums.somethingawful.com/showthread.php*
// @include        http://forums.somethingawful.com/forumdisplay.php?forumid=219
// @include        http://forums.somethingawful.com/newreply.php*
// ==/UserScript==

var bc = document.getElementsByClassName('breadcrumbs')[0];
if (bc && bc.innerHTML.match(/forumid=219/)) {

function pad(n) {
    return (n < 10 ? '0' + n : n);
}
function d(date) {
    return [date.getFullYear(), pad(date.getMonth()+1), pad(date.getDate())].join('');
}
function dt(date) {
    return d(date) + 'T' + [pad(date.getHours()), pad(date.getMinutes())].join('');
}

var s, i;

var els = document.getElementsByClassName('postdate');
for (i = 0; i < els.length; i++) {
    s = document.createElement('span');
    s.style.cssFloat = 'right';
    s.style.marginRight = '3px';
    s.appendChild(document.createTextNode(dt(new Date(Date.parse(els[i].lastChild.nodeValue)))));
    els[i].replaceChild(s, els[i].lastChild);
}

els = document.getElementsByClassName('registered');
for (i = 0; i < els.length; i++) {
    els[i].replaceChild(document.createTextNode(d(new Date(Date.parse(els[i].lastChild.nodeValue)))), els[i].lastChild);
}

els = document.getElementsByClassName('date');
for (i = 0; i < els.length; i++) {
    var date = els[i].lastChild.nodeValue.split(' ');
    date.push(date.shift());
    date = new Date(Date.parse(date.join(' ')));
    els[i].replaceChild(document.createTextNode(dt(date)), els[i].lastChild);
}

}
