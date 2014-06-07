// ==UserScript==
// @name           Insta-click
// @namespace      http://userscripts.org/users/64431
// @description    Open links in new tabs with right-mouse clicks
// @version        1.1.1
// @include        *
// @copyright      2009, 2010, James Campos
// @license        wtfpl; http://sam.zoy.org/wtfpl
// ==/UserScript==

/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details. */ 

var shouldPrevent;
document.addEventListener('mousedown', mousedown, true);
document.addEventListener('contextmenu', contextmenu, true);

function mousedown (e) {
  var target = e.target;
  if (target.nodeName == 'A' && e.button == 2 && !e.ctrlKey) {
    GM_openInTab(target.href);
    shouldPrevent = true;
  }
}

function contextmenu (e) {
  if (shouldPrevent) {
    e.preventDefault();
    shouldPrevent = false;
  }
}
