// ==UserScript==
// @name         bit.ly's warning no more
// @namespace    http://yamitzky.site50.net/
// @description  Skip bit.ly's "Warning! there might be a problem with the requested link" page
// @match        http://bit.ly/a/warning?url=*
// @include      http://bit.ly/a/warning?url=*
// @run-at       document-start
// ==/UserScript==

uri=decodeURIComponent(location.href);
location.href=uri.slice(uri.indexOf("?url=")+5,uri.indexOf("&hash="))
