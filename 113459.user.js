// ==UserScript==
// @name           Quita anuncios v2.0
// @namespace      Mcat
// @include        http://seguimeteo.forumcommunity.net/
// ==/UserScript==
var body = document.body;
var div = body.childNodes.item(0);
var div2 = div.childNodes.item(4);
var table = div2.childNodes.item(15);
table.innerHTML = "";