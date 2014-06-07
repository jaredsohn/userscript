// ==UserScript==
// @name           lcut-Snipper
// @namespace      lcut
// @description    Snipped die aktuelle URL auf lcut.tk
// @include        *
// @author         Nico Rausch
// @website        http://nrausch.com/
// @scriptwebsite  http://lcut.tk/
// ==/UserScript==

if(location.href==top.location.href) document.getElementsByTagName("body").item(0).innerHTML = "<div style='position: fixed; top: 5px; right: 5px; background:url(http://bngames.net/Nico/lcut-snipper.png); cursor: pointer; height:16px; width: 16px; z-index: 999;' onclick='window.open(\"http://bngames.net/Nico/lcut2.php?url=\"+encodeURIComponent(location.href)+\"&title=\"+encodeURIComponent(document.title), \"_blank\");'></div>"+document.getElementsByTagName("body").item(0).innerHTML;