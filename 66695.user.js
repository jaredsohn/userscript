// ==UserScript==
// @name           LibraryThing Search Group Subject Lines
// @namespace      http://userscripts.org/users/126691
// @description    Adds a button to the group search that allows you to search subject lines by using Google
// @include        http://*.librarything.tld/groups/*
// @exclude        http://*.librarything.tld/groups/yourgroups
// @exclude        http://*.librarything.tld/groups/active
// @exclude        http://*.librarything.tld/groups/standing
// @exclude        http://*.librarything.tld/groups/largest
// @exclude        http://*.librarything.tld/groups/community
// @exclude        http://*.librarything.tld/groups/local
// @exclude        http://*.librarything.tld/groups/new
// @exclude        http://*.librarything.tld/groups/tags
// @exclude        http://*.librarything.tld/groups/languages
// @exclude        http://*.librarything.tld/groups/all
// @exclude        http://*.librarything.tld/groups/tag
// @license        Public Domain
// ==/UserScript==

var groupTitle = document.evaluate("//div[@id='descbox']/H1",
    document.body, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

var elem = document.evaluate("//div[@id='topictable']//form[@name='search']",
    document.body, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

if (groupTitle && elem && elem.firstChild && elem.firstChild.nextSibling) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Subject Search'));

  btn.addEventListener('click', function (evt) { searchSubject(evt, elem.firstChild.nextSibling) }, false);

  elem.appendChild(btn);
}

function searchSubject(evt, formElem) {
  evt.preventDefault();  
  window.open('http://www.google.com/#&q=site%3A' + location.host + '%2Ftopic%2F' +
      '+intitle%3A%22' + groupTitle.textContent + '%22' +
      '+intitle%3A%22' + escape(formElem.value) + '%22'
      ,null);
}
