// ==UserScript==
// @name           Wikipedia: Cursor to search field
// @namespace      Wikipedia
// @description    Will attempt to put the cursor in the search field so you can just start typing your search value
// @include        http://*.wikipedia.org/wiki/*
// @version        0.2
// @modified       08/11/2010
// @history        0.2 updated to work with new wiki layout. a bit goofy because when
//                     the field is empty, it puts the word "Search" in it, and doesn't
//                     really get the focus, even though the field was found and the
//                     focus() method executed. work-around was to just put a space in
//                     the field. doesn't seem to affect the search results as the leading
//                     space seems to get stripped by wikipedia.
// ==/UserScript==

var searchField;
searchField = document.getElementById("searchInput");
searchField.focus();
searchField.value = " ";
