// ==UserScript==

// @name           OTVR Directlinker

// @namespace      www.yugius.de

// @description    Linkt direkt auf die DL-Seite

// @include        http://www.otvr.de/?file=*.otrkey

// ==/UserScript==


location.href = location.href.replace("?file=", "?content=ftp&file=");
