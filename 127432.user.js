// ==UserScript==
// @name           Quita banner - VT
// @namespace      Mcat
// @description    Quita los anuncios de seguimeteo. Version con tablas
// @include        http://seguimeteo.forumcommunity.net/
// ==/UserScript==
var tablas = document.getElementsByTagName("table");
tablas.item(19).innerHTML = "";