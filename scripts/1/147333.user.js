// ==UserScript==
// @name			FimFiction.net - Old search function
// @namespace 		at/yawk/fimfiction/search
// @description 	Gets the old FimFiction.net search back, instead of the google one.
// @include  		*fimfiction.net/*
// @version  		1.0.0
// ==/UserScript==

// get the search form
var search = document.getElementById("form_search_sidebar");
// set the target document of the form
search.setAttribute("action", "index.php");
// change the textbox's name so it can be parsed by fimfiction search
search.getElementsByTagName("input")[0].setAttribute("name", "search")
// get the hidden data field
var hiddenField = search.getElementsByTagName("input")[1];
// replace the hidden field's attributes
hiddenField.setAttribute("name", "view")
hiddenField.setAttribute("value", "category")