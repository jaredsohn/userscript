// ==UserScript==
// @name        userscripts.org: secure install by default
// @namespace   http://arantius.com/misc/greasemonkey/
// @description Make the userscripts.org site's links for script installation point at a secure URL by default.  Improves compatibility with Greasemonkey auto update checks.
// @include     http://userscripts.org/*
// @version     2
// ==/UserScript==

for (var i = 0, el = null; el = document.links[i]; i++) {
  if (0 == el.href.indexOf('http://userscripts.org')
    && -1 != el.href.indexOf('.user.js')
  ) {
    el.href = 'https:' + el.href.substr(5);
  }
}
