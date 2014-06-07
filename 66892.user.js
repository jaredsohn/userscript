// ==UserScript==
// @name           comment killer
// @namespace      auclovk
// @include        http://www.siol.net/*
// ==/UserScript==

var comm = document.getElementById("disqus_thread");
comm.parentNode.removeChild(comm);