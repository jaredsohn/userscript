// ==UserScript==
// @name           LibraryThing Tabs for Picture Galleries
// @namespace      http://userscripts.org/users/brightcopy
// @description    Adds tabs for picture gallery and junk drawer
// @include        http://*.librarything.tld/*
// @license        Public Domain
// ==/UserScript==

var LABEL_PICTURES = GM_getValue('ltpgPicturesLabel', 'Pictures'); 
var LABEL_JUNK = GM_getValue('ltpgJunkLabel', 'Junk');

GM_setValue('ltpgPicturesLabel', LABEL_PICTURES); 
GM_setValue('ltpgJunkLabel', LABEL_JUNK);

var userId = document.evaluate("//div[@class='userpad']/a[contains (@href, '/home')]",
        document, null, XPathResult.ANY_UNORDERED_NODE_TYPE,
        null).singleNodeValue;

var ul = document.getElementById('maintabs');

if (ul && userId != null) {
  var li = ul.appendChild(makeLink(LABEL_PICTURES, '/gallery/member/' + userId.textContent));
  li.previousSibling.className = 'spacer';
  if (location.pathname.match(/^\/pic\/\d+$/))
    makeActiveTab(li);
   
  ul.appendChild(makeLink(LABEL_JUNK, '/gallery/member/' + userId.textContent + '/junkdrawer'));
}

function makeLink(text, href) {
  var li = document.createElement('li');
  var a = document.createElement('a');
  li.appendChild(a);
  
  a.appendChild(document.createTextNode(text));
  a.setAttribute('href', href);
  
  if (location.pathname == href)
    makeActiveTab(li);
  
  return li;
}

function makeActiveTab(li) {
  var tab = document.getElementById('thisone');
  if (tab)
    tab.id = '';
    
  li.id = 'thisone';
}