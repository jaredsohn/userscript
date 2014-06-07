// ==UserScript==
// @name           huffduff it
// @namespace      http://philwilson.org/
// @description    Huffduff It from user page
// @include        http://huffduffer.com/*
// ==/UserScript==

(function(){

// <a href="/Indyplanets/193" 
var huffIds = document.evaluate("//h3[@class='entry-title']/a/@href", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var huffs = document.evaluate("//div[@class='entry-content']/p", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for (var x=0;x<huffs.snapshotLength;x++) {
  huffId = huffIds.snapshotItem(x)
  id = huffId.value.substring(huffId.value.lastIndexOf("/")+1, huffId.value.length)
  huff = huffs.snapshotItem(x);

  button = "<a href=\"/add/"+id+"\" class=\"button\">Huffduff it</a>"
  huff.innerHTML=button+huff.innerHTML;
}


})(); 