// ==UserScript==
// @name         Wikimedia: Go secure
// @description  Add a link to go to the secure equivalent of the insecure URL
// @include      *.wikipedia.org*
// @include      *.wikisource.org*
// @include      *.wikimedia.org*
// @include      *.wikibooks.org*
// @include      *.wiktionary.org*
// @include      *.wikiversity.org*
// @include      *.wikinews.org*
// @include      *mediawiki.org*
// @exclude      *secure.wikimedia.org*
// ==/UserScript==

var loginElement = document.getElementById('pt-login');
if (loginElement) {
  var secureElement = document.createElement('li');
  var hostname = window.location.hostname.split('.');
  var path = ((hostname[1] != 'wikimedia') ? hostname[1] : 'wikipedia')
             + '/' + hostname[0];
  if (hostname[1] == 'mediawiki') path = 'wikipedia/mediawiki';

  var url = 'https://secure.wikimedia.org/' + path
            + window.location.pathname
	    + window.location.search
            + window.location.hash;
  secureElement.innerHTML = '<a href="' + url + '">Go secure</a>';
  loginElement.parentNode.appendChild(secureElement);
}
