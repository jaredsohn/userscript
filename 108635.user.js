// ==UserScript==
// @name           Torrentz - Enable AutoComplete
// @namespace      http://mattstow.com/torrentz
// @description    Enables browser's autocomplete for the Torrentz search box
// @include        http://*torrentz.eu/*
// @include        http://*torrentz.com/*
// ==/UserScript==
// Version 1.0.0

var s = document.getElementById('thesearchbox');
s.setAttribute('autocomplete', 'on'); 