// ==UserScript==
// @id             www.imdb.com-cc035f35-1bd2-4dd1-8ea2-7ccc67db20a1@meh
// @name           Change imdb season episode number colour
// @version        1.0
// @namespace      meh
// @author         Yansky
// @description    Change imdb season episode number colour so it's easier to read
// @noframes
// @updateURL		http://userscripts.org/scripts/source/178034.user.js
// @include        http://www.imdb.com/title/*/episodes?season*
// @include        https://www.imdb.com/title/*/episodes?season*
// @run-at         document-end
// ==/UserScript==

GM_addStyle('.zero-z-index div{opacity:1 !important;}');