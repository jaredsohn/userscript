// ==UserScript==
// @name           Citibank simple login
// @namespace      http://userscripts.org/users/26596
// @description    Citibank simple login
// @include        https://www.citibank.ru/signin/*
// ==/UserScript==

var n = document.createElement('input');
n.type = 'password';
n.className = 'soInput';
n.name = 'password';
n.size = '18';

var p = document.getElementById('password');
p.parentNode.appendChild(n);
p.parentNode.removeChild(p);


