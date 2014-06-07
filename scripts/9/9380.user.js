// ==UserScript==
// @name           Duckroll warning system
// @namespace      lolwut
// @description    Adds "[duckroll]" next to links that are duckrolls
// @include        http://*.4chan.org/*
// ==/UserScript==


var links = get("//td[@class='reply']/blockquote/font[@class='unkfunc']/a[@class='quotelink']");
var ops = get("/html/body/form/span[contains(@id, 'nothread')]/a[@class='quotejs' and position()=1]");
var forum = get("/html/body/form[@name='delform']").snapshotItem(0);
var threads = 0;

for(var i = 0; i < forum.childNodes.length; i++) {
  if(/nothread/.test(forum.childNodes[i].id)) {
    threads++;
  }

  if(forum.childNodes[i].nodeName.toLowerCase() == "table") {
    forum.childNodes[i].setAttribute("threadnumber", threads - 1);
  }

  if(forum.childNodes[i].nodeName.toLowerCase() == "center") {
    break;
  }
}


for(var i = 0; i < links.snapshotLength; i++) {
  var link = links.snapshotItem(i);
  var anchor = link.href.split("#")[1];
  var thread = link.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("threadnumber");

  if(link.href.split("#")[0] != ops.snapshotItem(thread).href.split("#")[0]) {
    link.parentNode.insertBefore(document.createTextNode(" [duckroll]"), link.nextSibling);
  }
}



function get(query) {
  return document.evaluate(
    query,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
}