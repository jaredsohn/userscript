// ==UserScript==
// @name           PGDP Detail
// @namespace      Martin Stone
// @description    Reloads PGDP project detail pages to show full details (Detail level 4)
// @include        http://www.pgdp.net/c/project.php?id=projectID*
// ==/UserScript==

if (document.baseURI.indexOf("detail_level") == -1) window.location = document.baseURI + "&detail_level=4";