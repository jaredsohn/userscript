// ==UserScript==

// @name           Google Linux link Redesigned
// @description    Adds a Linux link to the google front page along with Images, Groups, News etc.
// @namespace      http://projects.izzysoft.de/
// @include        http://google.*
// @include        http://*.google.*
// ==/UserScript==

// Remark: This is a rewrite of http://userscripts.org/scripts/show/3485
//         which wasn't updated since 2006 and stopped working due to a
//         Google site re-design

var groupsLink, linuxLink;

groupsLink = document.getElementById('gbi');

if (groupsLink) {
  linuxLink = document.createElement('A');
  linuxLink.href = 'http://www.google.com/linux';
  linuxLink.innerHTML = 'Linux';
  linuxLink.setAttribute('class', 'gb1');
  groupsLink.parentNode.insertBefore(linuxLink,groupsLink.previousSibling);
}