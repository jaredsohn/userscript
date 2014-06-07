// ==UserScript==
// @name           about.com Remove checked forums from Recently Visited
// @namespace      http://www.nyboria.de
// @description    This script adds the option to remove checked forums from the list of recently visited forums.
// @include        http://forums.about.com/n/pfx/*
// ==/UserScript==

var addTr = document.evaluate("//tr[@class='ptcHead']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var addForum = addTr.snapshotItem(9);

var newTr = document.createElement('tr');
newTr.setAttribute('class', 'ptcHead');
newTr.appendChild(document.createElement('td'));
newTr.firstChild.setAttribute('class', 'ptcName');
newTr.firstChild.setAttribute('colspan', '4');
newTr.firstChild.appendChild(document.createElement('a'));
newTr.firstChild.firstChild.setAttribute('class', 'ptbAction');
newTr.firstChild.firstChild.setAttribute('href', 'javascript:void(0)');
newTr.firstChild.firstChild.setAttribute('onclick', 'return PTButtonCmd(\'cmdmyforumsreset(mf2)\', true, \'\');');
newTr.firstChild.firstChild.setAttribute('onMouseOut', 'this.blur();return true;');
newTr.firstChild.firstChild.appendChild(document.createTextNode('Remove'));
newTr.firstChild.appendChild(document.createTextNode('Remove checked forums from Recently Visited'));
addForum.parentNode.insertBefore(newTr, addForum.nextSibling);




