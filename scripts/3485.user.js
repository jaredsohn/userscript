// ==UserScript==
// @name           Google Linux link
// @description    Adds a Linux link to the google front page along with Images, Groups, News etc.
// @include        http://google.*
// @include        http://*.google.*
// ==/UserScript==
var groupsLink, linuxLink, spacer;

groupsLink = document.getElementById('2a');

if (groupsLink) {
  linuxLink = document.createElement('A');
  linuxLink.href = 'http://www.google.com/linux';
  linuxLink.innerHTML = 'Linux';
  linuxLink.class = 'q';
  spacer = document.createTextNode("\u00a0\u00a0\u00a0\u00a0");
  groupsLink.parentNode.insertBefore(linuxLink,groupsLink);
  groupsLink.parentNode.insertBefore(spacer,groupsLink);
}
