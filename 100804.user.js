// ==UserScript==
// @name           Biblia 2 Column Reading View
// @namespace      http://userscripts.org/users/vanoudt
// @description    Makes the fullscreen view of biblia run in 2 columns
// @include        http://*biblia.com/*
// ==/UserScript==
var ColumniseStyle = document.createElement('style');
ColumniseStyle.type='text/css';
var s = '.fullscreen div.content-chunk { background-color: #ccc; -moz-column-count: 2; -webkit-column-count: 2; column-count: 2;  -moz-column-gap: 2em; -webkit-column-gap: 2em; column-gap: 2em; -moz-column-rule: 1px solid #ddd; -webkit-column-rule: 1px solid #ddd; column-rule: 1px solid #ddd;} ';
s = document.createTextNode(s);
ColumniseStyle.appendChild(s);
var headID = document.getElementsByTagName("head")[0];
headID.appendChild(ColumniseStyle);