// ==UserScript==
// @name    MediaFire
// @namespace   mafiawars
// @description   Mediafire click to download
// @include   http://www.mediafire.com/*
// @include   http://www.mediafire.com/?*
// @version 0.0.01
// @contributor ntas
// ==/UserScript==

  var downlink = xpath("//div[@id='your_download_link']");
  
  if(downlink.snapshotLength>0) {
    event('click', downlink.snapshotItem(0));
	alert('AAAAAAAAAAAAAAAAAAAAA');
  } 
  alert(downlink);
  window.close(); 

function xpath(query, element) {
  var element = (element == null) ? document : element;
  return document.evaluate(query, element, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function $x(p,c) {
  var i, r = [], x=document.evaluate(p, c || document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
  while (i=x.iterateNext()) r.push(i);
  return r;
}

function event(evntname, obj) {
  var evt = document.createEvent("MouseEvents");
  evt.initMouseEvent(evntname, true, true, window,
    0, 0, 0, 0, 0, false, false, false, false, 0, null);
  obj.dispatchEvent(evt);
}