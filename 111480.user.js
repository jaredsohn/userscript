// ==UserScript==
// @name           Torrentz - Put Focus In Search Box On Load
// @namespace      http://mattstow.com/torrentz
// @description    Puts the focus in the search box on page load
// @include        http://*torrentz.eu/*
// @include        http://*torrentz.com/*
// ==/UserScript==

var s = document.getElementById('thesearchbox');
s.focus();