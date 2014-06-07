// ==UserScript==
// @name        Bypass Popsci Geo-IP Redirect
// @namespace   popsci
// @include		http://*popsci.com.*/*
// @version     1
// ==/UserScript==

window.location = "http://www.uswebproxy.com/?q=http://www.popsci.com" + window.location.pathname;