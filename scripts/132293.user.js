// ==UserScript==
// @name           Google link lengthen prevention
// @namespace      file:///
// @description    When you click (or right-click) a Google link, a JavaScript will replace it with a stupidly long one, making it unsuited for copying and sharing it.  This prevents that from happening.
// @include        *.google.*/search*
// ==/UserScript==

let links = document.querySelectorAll('a.l');
for (let i = 0; i < links.length; i++) links[i].removeAttribute('onmousedown');

