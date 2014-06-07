// ==UserScript==
// @name Barrons Paywall
// @namespace 
// @include http://*.barrons.com/*
// @include http://online.barrons.com/*
// @include http://www.google.co.uk/url?*
// @description Redirects Barrons via Google
// ==/UserScript==

temp = document.evaluate(
    "//div[@class='article story']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
var s = location.href;
if (temp.snapshotItem(0)!=null){
var x = temp.snapshotItem(0).innerHTML;
var y = x.substring(x.length-7,x.length);
if (y=='...</p>'){  
  var z = "http://www.google.co.uk/url?sa=t&source=web&url=http://online.barrons.com/article/";
  var z2 = s.substring(s.indexOf('article/')+8,s.indexOf('.html'));
  var z3 = '.html';
  window.location.href = z+z2+z3;
}
}
var u = window.location.href;
if(u.indexOf('http://www.google.co.uk/url?')!=-1 && u.indexOf('barrons')!=-1 ){
    //window.location.replace(document.links[0]);
}
