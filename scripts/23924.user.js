// ==UserScript==
// @name           TinyURL - fix URLs to not be bold on clipboard
// @namespace      http://khopis.com/scripts
// @description    Removes <b> tags so you don't get bold text copying the link
// @include        http://tinyurl.com/create.php?url=*
// @author         Adam Katz <scriptsATkhopiscom>
// @copyright      2008 by Adam Katz
// @license        LGPL v3+
// @version        1.0
// @lastupdated    2008-03-14
// ==/UserScript==

var uris = document.getElementsByTagName("blockquote");
for (var i=0; i<uris.length; i++) {
  uris[i].innerHTML = uris[i].innerHTML.replace(/<.?b( [^>]*)?>/,' ');
}
GM_addStyle('td[valign="top"] blockquote { font-weight:bold; }'); // still bold!
