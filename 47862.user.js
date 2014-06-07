// ==UserScript==
// @name           Otto-Shop mit Tabs
// @namespace      otto.de
// @description    Ermöglicht es, im Otto-Shop Tabs zu öffnen
// @include http://*otto.de/*
// @include https://*otto.de/*
// ==/UserScript==

var AllLinks = new Array();
AllLinks = document.getElementsByTagName("a");

for(var i = 0; i < AllLinks.length; i++){
  AllLinks[i].href = AllLinks[i].href.replace("javascript:gotoSearchArticle('", "");
  AllLinks[i].setAttribute("onmouseover", "");
}