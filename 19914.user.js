// ==UserScript==
// @name           addSearch
// @namespace      http://userscripts.org/users/33515/scripts
// @description    Fuegt einen "Suche"-Link zur Infobar hinzu.
// @include        http://my.mods.de/*
// @include        http://forum.mods.de/*
// ==/UserScript==

if (document.getElementById("infobar1")) {
  var node  = document.getElementById("infobar1").getElementsByTagName("a")[2];
  var suche = document.createElement("a");
      suche.innerHTML = "Suche";
      suche.href ="search.php";
  node.parentNode.insertBefore(suche, node);
  node.parentNode.insertBefore(document.createTextNode(" | "), node);
  var bsuche = document.createElement("a");
      bsuche.innerHTML = "Benutzersuche";
      bsuche.href ="searchuser.php";
  node.parentNode.insertBefore(bsuche, node);
  node.parentNode.insertBefore(document.createTextNode(" | "), node);
}