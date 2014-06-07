// ==UserScript==
// @name         ComicVine Search Bar Fixes
// @namespace    comicvineSearchBarFixes
// @include      http*://comicvine.com/*
// @include      http*://www.comicvine.com/*
// @datecreated  2010-06-12
// @lastupdated  2010-06-12
// @version      0.1
// @author       Erik Vergobbi Vold
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description  This userscript will update the search bar input element to use the @placeholder.
// ==/UserScript==

(function(d){
  var searchQ = d.getElementById('searchQ');
  if (!searchQ) return;

  searchQ.setAttribute("value", "");
  searchQ.setAttribute("placeholder", "search for something");
})(document);
