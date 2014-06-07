// ==UserScript==
// @name           4chan sauce
// @namespace      http://userscripts.org/users/64431
// @description    zomg sauce lol
// @include        http://boards.4chan.org/*
// @include        http://suptg.thisisnotatrueending.com/archive/*
// @include        http://4chanarchive.org/brchive/*
// @version        0.1.0
// @copyright      2009, 2010, James Campos
// @license        WTFPL; http://sam.zoy.org/wtfpl/
// ==/UserScript==

/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details. */ 
/*
	http://www.revimg.net/
	http://www.gazopa.com/
	http://labs.ideeinc.com/upload/
	http://labs.systemone.at/retrievr/
	http://www.picsearch.com/index.cgi?text=1
	http://alipr.com/
	http://www.pixolu.de/
*/
var prefix = [
  'http://regex.info/exif.cgi?url=',
  'http://iqdb.org/?url=',
  'http://saucenao.com/search.php?db=999&url=',
  'http://tineye.com/search?url='
];
var names = [];
for (var i in prefix) {
  names.push(prefix[i].match(/(\w+)\./)[1]);
}
function addLinksTo(root) {
  var filespans = root.getElementsByClassName('filesize');
  for (var i = 0, l = filespans.length; i < l; i++) {
    var item = filespans[i];
    var suffix = item.getElementsByTagName('a')[0].href;
    for (var j in prefix) {
      var link = document.createElement('a');
      link.href = prefix[j] + suffix;
      link.textContent = names[j];
      link.style.color = 'green';
      item.appendChild(document.createTextNode(' '));
      item.appendChild(link);
    }
  }
}
addLinksTo(document.body);
function nodeInserted(e) {
  var target = e.target;
  if (target.nodeName == 'TABLE') {
    addLinksTo(target);
  }
}
document.body.addEventListener('DOMNodeInserted', nodeInserted, true);
