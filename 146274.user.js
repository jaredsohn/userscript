// ==UserScript==
// @name        onet.pl redirect fix
// @description Fix broken article links from RSS
// @namespace   http://userscripts.org/users/443558
// @include     http://wiadomosci.platforma.onet/*
// @version     1
// @run-at      document-start
// @grant       none
// ==/UserScript==

window.location.href = window.location.href.replace(/platforma\.onet\//,'onet.pl/')
