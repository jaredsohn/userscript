// ==UserScript==
// @name       Mirko
// @version    0.1
// @description  Zmiana nazwy "Mikroblog" na "mirko"
// @include        http://wykop.pl/*
// @include        http://*.wykop.pl/*
// @author      sebuspl
// ==/UserScript==

document.getElementById('header-con').getElementsByClassName('tab')[3].innerHTML = 'Mirko';