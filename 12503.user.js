// ==UserScript==
// @name          SWECHECK
// @namespace     http://mablung.net
// @description   Ändrar lite smått och gott.
// @include       http://swecheck.net/*
// @include       http://www.swecheck.net/*
// @include       http://swecheck.info/*
// @include       http://www.swecheck.info/*
// ==/UserScript==

function remove(element) {
  element.parentNode.removeChild(element);
}

if (document.title.match('SWECHECK 1.5')) {
 document.title = '[SWECHECK 1.5]';
}

GM_addStyle('#newsbox {height:auto;}');

var body = document.getElementsByTagName('body')[0];

body.firstChild.nextSibling.firstChild.nextSibling.style.display = 'none';

var menuxxx = document.getElementById('menyXXX').parentNode;
menuxxx.style.display = 'none';
menuxxx.nextSibling.nextSibling.style.display = 'none';

var menudivx = document.getElementById('menyDiVX');
menudivx.style.background = 'url(/images/divx.gif)'; // XviD...

var links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
 link = links[i];
 if (link.innerHTML == 'XXX') {
  link.parentNode.parentNode.style.display = 'none';
 }
 if (link.innerHTML == 'DivX') {
  link.innerHTML = 'XviD';
 }
}

document.getElementById('sok').removeAttribute('onkeydown');