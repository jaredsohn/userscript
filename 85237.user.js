// ==UserScript==
// @name           klavologo
// @namespace      klavogonki
// @include        http://klavogonki.ru/*
// @author         Fenex
// @version        1.1.1
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=d9c74d6be48e0163e9e45b54da0b561c&r=PG&s=48&default=identicon
// for Wяnd
// ==/UserScript==
document.getElementById('logo').getElementsByTagName('a')[0].href="/gamelist/";
document.getElementById('logo').parentNode.getElementsByTagName('div')[0].getElementsByTagName('a')[4].href="http://klavogonki.ru/";