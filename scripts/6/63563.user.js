// ==UserScript==
// @name           D3 Redirect
// @namespace      http://userscripts.org/users/OmniSliver
// @description    Redirects "Diii.Net Daily Diablo" links.
// @include        http://diablo.incgamers.com/blog/comments/*/?utm_source=feedburner&utm_medium=email*
// ==/UserScript==

window.location = window.location.href.substring(0, window.location.href.indexOf("?"));