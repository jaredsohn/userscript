// ==UserScript==
// @name           PNAS PDF full screener
// @namespace      pnas.org
// @description    Removes HTML clutter from PNAS screen when viewing PDFs of articles
// @include        http://www.pnas.org*.pdf+html
// ==/UserScript==

window.location.href=window.location.href.substr(0, window.location.href.length-5);