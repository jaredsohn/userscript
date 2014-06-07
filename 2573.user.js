// ==UserScript==
// @name          WordPress.com Forums Search
// @namespace     http://zoolcar9.lhukie.net/mozilla/userscripts/
// @include       http://wordpress.com/forums/*
// @description	  Adds forums search form
// ==/UserScript==

(function() {
  var searchForm = document.createElement('form');
  searchForm.setAttribute('action', 'search.php');
  searchForm.setAttribute('method', 'get');
  searchForm.setAttribute('autocomplete', 'on');
  searchForm.setAttribute('style', 'position: absolute; top: 5%; left: 50%; margin-left: 100px;');
  searchForm.innerHTML = (
    '<input type="text" name="q" value="" />\n' +
    '<input type="submit" value="search" />'
  );

  var docBody = document.body;
  docBody.insertBefore(searchForm, docBody.firstChild);
})();

