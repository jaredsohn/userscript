// ==UserScript==
// @name           FreeMobile plus simple
// @namespace      http://userscript.org/Simplix
// @description    simplifie légèrement le login sur le site FreeMobile
// @include        https://mobile.free.fr/moncompte/*
// ==/UserScript==

// Login
var identPos = document.getElementById('ident_pos');
var newInput = document.createElement('input');
newInput.setAttribute('type', 'text');
newInput.setAttribute('id', 'ident_clear');
newInput.setAttribute('value', '');
newInput.setAttribute('name', 'login_clear');
identPos.parentNode.appendChild(document.createElement('br'));
identPos.parentNode.appendChild(newInput);
