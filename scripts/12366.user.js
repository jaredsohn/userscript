// ==UserScript==
// @name           Woot Forum view product link
// @namespace      woot
// @description    adds a view product link in the woot shirt forum.
// @include        http://shirt.woot.com/Forums/ViewPost.aspx?PostID=*
// ==/UserScript==

function getFirst(xpath){
  var xpathResult = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null );
  return xpathResult.iterateNext();
}

var script = getFirst("/html/body/form[2]/div[3]/div[3]/div[5]/div[2]/div/div[2]/script");
var id = script.src.match(/saleid=(\d+)/)[1];
var title = getFirst("/html/body/form[2]/div[3]/div[3]/div[5]/div[2]/div/div[2]/h3");
var a = document.createElement("a");
a.href="http://shirt.woot.com/friends.aspx?k="+id;
a.appendChild(document.createTextNode("view product"));
title.appendChild(document.createTextNode("  "));
title.appendChild(a);

