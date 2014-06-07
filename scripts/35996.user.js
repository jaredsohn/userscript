// ==UserScript==
// @name           Direct Image Hosting Picture Links
// @namespace      http://userscripts.org/users/23652
// @description    Re-writes thumbnail links to direct links on image hosting sites
// @include        http://*
// @include        https://*
// @include        file:///*
// @exclude        http://*.google.*/*
// @exclude        https://*.google.*/*
// @copyright      JoeSimmons
// ==/UserScript==

// with help from avg

// XPath multiple, but the array returned is a normal array[x]
// Always uses unordered node snapshot
// Syntax: $xM("//a", "//img", "//form");
function $xM() {
  var i, x, arr = [], xpr;
  for(x=0; x<arguments.length; x++) {
  xpr = document.evaluate(arguments[x],document,null,7,null);
  for (i=0; i<xpr.snapshotLength; i++) arr.push(xpr.snapshotItem(i));
  }
  return arr;
}

function get(url, cb, linkNode) {
  GM_xmlhttpRequest({
    method: "GET",
     url: url,
     onload: function(xhr) { if(xhr.status==200) {cb(xhr.responseText, linkNode);} }
  });
}

function setHref(rt, linkNode) {
linkNode.href = rt.match(/\(\)' src='([^']+)/)[1];
}

var links = $xM("//a[contains(@href, '.jpg')]", "//a[contains(@href, '.jpeg')]", "//a[contains(@href, '.gif')]", "//a[contains(@href, '.png')]", "//a[contains(@href, '.bmp')]"),l,i,
re = /^http:\/\/(.+\.)?\w+\.\w+(.+\/)*.+\.(jpe?g|gif|png|bmp)$/i;


for(i=0; i<links.length; i++) {
l=links[i];
if(re.test(l.href) && !!~l.href.indexOf("imageshack.us")) {
get(l.href, setHref, l);
}
}