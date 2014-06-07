// ==UserScript==
// @name           LibraryThing Add WorldCat on Add Books Page
// @namespace      http://userscripts.org/users/brightcopy
// @description    Adds a link to search for a book at WorldCat to the top of the search results on the Add Books page.
// @include        http://*.librarything.tld/addbooks*
// @license        Public Domain
// ==/UserScript==

var box = document.getElementById('form_find');

var div = document.evaluate('//div[@class="search"]',
    document.body, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

if (div && box) {
  var a = document.createElement('a');
  a.appendChild(document.createTextNode('search worldcat'));
  a.href = '#';
  a.style.fontWeight = 'bold';
  a.addEventListener('click', openWorldcat, false);
  div.appendChild(a);
}

function openWorldcat(event) {
  event.preventDefault()

  window.open('http://www.worldcat.org/search?' +
      'qt=worldcat_org_bks&q=' + escape(document.getElementById('form_find').value) + 
      '&fq=dt%3Abks', 'worldcat');
}