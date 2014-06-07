// ==UserScript==
// @name           Softexia - Remove Title Prefix
// @namespace	   http://userscripts.org/users/69620
// @description    Removes the "Softexia.com - daily software news! - News: " prefix from tab titles
// @include        http://www.softexia.com/news.php?readmore=*
// ==/UserScript==

document.title = document.title.replace('Softexia.com - daily software news! - News: ', '')