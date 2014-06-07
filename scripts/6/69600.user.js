// ==UserScript==
// @name         Google Disable Auto Focus
// @namespace    googleDisableAutoFocus
// @include      /^http:\/\/(www\.)?google\.c(a|om)\/?$/i
// @include      http://www.google.tld/
// @match        http://www.google.com/
// @match        http://www.google.ca/
// @run-at       document-start
// @datecreated  2010-02-21
// @lastupdated  2010-02-21
// @version      0.1
// @author       Erik Vergobbi Vold
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description  This userscript will disable Google's auto focus
// ==/UserScript==

document.body.setAttribute("onload","");
