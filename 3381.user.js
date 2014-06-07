// ==UserScript==
// @name           blogas.lt Remove topbar
// @namespace      
// @description    Removes bar at the top of pages
// @include        http://www.blogas.lt/*
// @author         menesis http://www.blogas.lt/menesis
// ==/UserScript==

(function() {
  var div = document.evaluate("/html/body/div/table[@background='http://www.blogas.lt/images/pepsi/free_eilute_bkg.gif']/..", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
  if (!div) return;
  var body = div.parentNode;
  body.removeChild(div);
  div = body.firstChild.nextSibling;
  if (div.nodeName != "DIV") return;
  body.removeChild(div);
})();//.user.js
