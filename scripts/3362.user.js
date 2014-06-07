// ==UserScript==
// @name           blogas.lt Valdymas is meniu
// @namespace      
// @description    Pakeicia "sukurk savo bloga" i "blogo valdymas"
// @include        http://www.blogas.lt/*
// ==/UserScript==

(function() {
  var img = document.evaluate("//td/a/img[@src='http://www.blogas.lt/images/eilute_register.gif']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
  if (!img) return;
  img.setAttribute("src", "http://www.blogas.lt/uploads/menesis_eilute_manager.gif");
  img.setAttribute("alt", "BLOGo valdymas");
  var link = img.parentNode;
  link.setAttribute("href", "http://www.blogas.lt/manager/index.php");
})();
//.user.js