// ==UserScript==
// @name           Kol wiki search fix
// @namespace      http://userscripts.org/users/192956
// @description    Makes the kol wiki search via google instead of the built in search
// @include        http://kol.coldfront.net/thekolwiki/*
// ==/UserScript==

var searchform = document.getElementById("searchform");
searchform.action = "http://www.google.com/search"
var elements = searchform.elements;
elements[0].name="q";
elements[1].name="sitesearch";
elements[1].value="kol.coldfront.net";
elements[1].type="hidden";
elements[2].name="";
elements[2].value="Search";