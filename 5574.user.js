// ==UserScript==
// @name          Anekdot.ru cleanup
// @description   Removes banners and junk, keeps only the calendar
// @include       http://anekdot.ru/*
// @include       http://www.anekdot.ru/*
// ==/UserScript==

if (document.location.href.match(/\/$/)) {
  var ts=document.evaluate("//body/center/*",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
  for(var i=0;i<ts.snapshotLength;i++) {
    var t=ts.snapshotItem(i);
    var as=document.evaluate(".//a[contains(@href,'/a/')]",t,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    if (as.snapshotLength<=1) {t.parentNode.removeChild(t);}
  }

} else if (document.location.href.match(/\/a\//)) {
  var ts=document.evaluate("//*",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
  for(var i=0;i<ts.snapshotLength;i++) {
    var t=ts.snapshotItem(i);
    var as=document.evaluate(".//pre",t,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    if (as.snapshotLength==0 && t.nodeName !='HR' && t.nodeName !='PRE' && t.nodeName !='INDEX') {
      t.parentNode.removeChild(t);}
    }
}
