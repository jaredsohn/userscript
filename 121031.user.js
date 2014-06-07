// ==UserScript==
// @name           Github Plus One
// @namespace      ru.whitered
// @include        http://github.com/*
// @include        https://github.com/*
// @exclude        http://github.com/
// @exclude        https://github.com/
// @exclude        http://github.com/*/*/*
// @exclude        https://github.com/*/*/*
// @version        0.3
// ==/UserScript==

function getElementByXPath(expr, node)
{
  return document.evaluate(expr, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function hasClass(ele, cls)
{
  if(!ele) return false;
  return ele.className ? ele.className.split(" ").indexOf(cls) >= 0 : false;
}

function insertPlusOne(node)
{
  var button = document.createElement("g:plusone"); 
  button.setAttribute("size", "small");
  node.appendChild(button);

  var po = document.createElement("script"); 
  po.type = "text/javascript"; 
  po.async = true;
  po.src = "https://apis.google.com/js/plusone.js";

  document.head.appendChild(po);
}

var pagehead = getElementByXPath("//div[contains(@class, 'pagehead')]", document);

if(hasClass(pagehead, "repohead") || hasClass(pagehead, "userpage"))
{
  insertPlusOne(pagehead.getElementsByTagName("h1")[0]);
}
