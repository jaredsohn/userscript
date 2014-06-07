// Search the WordPress.com Blog
//
// This script will put a search engine on WordPress.com that searches the
// WordPress.com blog. Useful when you want to link to older stories.
//
// This is a modification of Lou Cypher's WordPress.com forums search.
// http://zoolcar9.lhukie.net/mozilla/userscripts/

// ==UserScript==
// @name           Search the WordPress.com Blog
// @namespace      http://internetducttape.com
// @description    The WordPress.com news blog does not have a search field. Now it does.
// @version        2007.07.31
// @include        http://wordpress.com/*
// @exclude        http://wordpress.com/forums*
// @exclude        http://wordpress.com/*.php*
// ==/UserScript==

(function() {

  // Want: http://wordpress.com/search/your+search+terms+here
  var searchForm = document.createElement('form');
  searchForm.setAttribute('action', 'http://wordpress.com');
  searchForm.setAttribute('method', 'get');
  searchForm.setAttribute('autocomplete', 'on');
  searchForm.setAttribute('style', 'position: absolute; top: 90px; left: 1px; ');
  searchForm.innerHTML = (
    '<input id="s" type="text" name="s" value="" />\n' +
    '<input id="searchsubmit" type="submit" value="Search" />'
  );

  var docBody = document.body;
  docBody.insertBefore(searchForm, docBody.firstChild);
})();
