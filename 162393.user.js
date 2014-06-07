// ==UserScript==
// @name        Identica Ads Remove
// @namespace   Ramin Najjarbashi
// @include     http://identi.ca/*
// @include     https://identi.ca/*
// @version     1
// ==/UserScript==

var elem=document.getElementById('idl_alert');
elem.parentNode.removeChild(elem);