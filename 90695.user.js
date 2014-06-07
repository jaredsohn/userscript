// ==UserScript==
// @name           LibraryThing Group Links on Talk Page
// @namespace      http://userscripts.org/users/brightcopy
// @include        http://*.librarything.tld/talk*
// @include        http://*.librarything.tld/topic*
// ==/UserScript==

var ul = document.getElementById('li_more').parentNode;
 
var li = document.createElement('li');
li.className = 'h1';
li.appendChild(document.createTextNode('Groups'));

ul.appendChild(li);

addGroup('API', 'librarythingapidevel');
addGroup('BETA', 'boardforextremething');
addGroup('Bugs', 'bugcollectors');
addGroup('CK, WT, HT', 'commonknowledge');
addGroup('Combiners!', 'combiners');
addGroup('Date Fields', 'morepowertothedatefi');
addGroup('Hacking LT', 'hackinglibrarything');
addGroup('New Features', 'newfeatures');
addGroup('Programmers', 'purelyprogrammers');
addGroup('RSI', 'recommendsiteimprov');
addGroup('Sci-fi', 'sciencefictionfans');
addGroup('Series', 'inallseriesness');
addGroup('Site Talk', 'sitetalk');

function addGroup(name, link) {
  var li = document.createElement('li');
  var a = document.createElement('a');
  a.setAttribute('href', '/groups/' + link);
  a.appendChild(document.createTextNode(name));
  li.appendChild(a);
  ul.appendChild(li);  
}

