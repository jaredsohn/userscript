// ==UserScript==
// @name          DiG Search
// @namespace     http://mozilla.wikicities.com/
// @include       http://diveintogreasemonkey.org/*
// @include       http://www.diveintogreasemonkey.org/*
// @description	  Adds Google search form to search in DiG
// ==/UserScript==

(function() {
  var intro = document.getElementById('intro');
  var links = intro.getElementsByTagName('ul')[0];

  var gSearch = document.createElement('form');
      gSearch.setAttribute('action', 'http://www.google.com/search');
      gSearch.setAttribute('method', 'get');
      gSearch.setAttribute('style', 'float: right');
      gSearch.innerHTML =
        '<input type="hidden" name="domains" value="diveintogreasemonkey.org">' +
        '<input type="hidden" name="sitesearch" value="diveintogreasemonkey.org">' +
        '<input type="text" name="q" value="">' +
        '<input type="submit" name="btnG" value="DiG it!">';

  links.parentNode.insertBefore(gSearch, links);

})();

