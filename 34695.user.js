// ==UserScript==
// @name           Sort searches by seeds on mininova.org
// @namespace      http://pas-bien.net/
// @description    Sort by seeds on search
// @include        http://www.mininova.org/*
// ==/UserScript==

document.getElementById('searchform').action = 'javascript:document.location.href="http://www.mininova.org/search/"+encodeURI(document.getElementById("search").value)+"/seeds";';
