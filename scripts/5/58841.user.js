// ==UserScript==
// @name           Newgrounds: Wide Screen
// @namespace      jcgurango
// @description    Makes Newgrounds use the wide screen css instead.
// @include        *newgrounds.com*
// ==/UserScript==

document.body.innerHTML = document.body.innerHTML + '<link rel="stylesheet" href="http://css.ngfiles.com/ng_wide.css" type="text/css" media="screen" />';