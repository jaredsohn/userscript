// ==UserScript==
// @name           Userscripts.org "new script" shortcut
// @namespace      http://code.google.com/p/ecmanaut/
// @description    Adds a "new script" link in the menu for logged-in users.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/node.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @include        http://userscripts.org/*
// ==/UserScript==

var here = $X('id("homeMenu")/li[1]');
if (here)
  node({ tag: <li><a href="/scripts/new">new script</a></li>, before: here });