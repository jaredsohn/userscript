// ==UserScript==
// @name           Wikipedia Old Search v0.1 
// @namespace      http://twitter.com/kerryemerson
// @description    Places the search box back on the left column where it used to be
// @include        http://en.wikipedia.org/*
// ==/UserScript==

var search_form_handle = document.getElementById('searchform');
var search_form = search_form_handle;

search_form_handle.parentNode.removeChild(search_form_handle);

var new_location = document.getElementById('p-navigation');
new_location.appendChild(search_form);

var search_box_handle = document.getElementById('searchInput');
search_box_handle.style.width = "8em";

var search_area_handle = document.getElementById('simpleSearch');
search_area_handle.style.margin = "0em";
