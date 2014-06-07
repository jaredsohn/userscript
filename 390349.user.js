// ==UserScript==
// @name        LibraryThing WorldCat direct link
// @namespace   http://userscripts.org/users/maxstarkenburg
// @description Similar to how the Amazon.com direct links works
// @include     http*://*librarything.tld/work/*
// @include     http*://*librarything.com/work/*
// @version     1
// @grant       none
// ==/UserScript==

var metas = document.getElementsByTagName("meta");
var isbn = "9781111111111"; // 9781111111111 is apparently what LT puts on ISBN-less works
for (var i=0; i<metas.length; i++) {
  if (metas[i].getAttribute("property") == "books:isbn") {
    isbn = metas[i].content;
    break;
  }
}
if (isbn != "9781111111111") { 
  var wcLink = "";
  var qls = document.getElementsByClassName("ql_printdisplay_line");
  for (var i=0; i<qls.length; i++) {
    if (qls[i].getAttribute("bsm_code") == "700:1") {
      wcLink = qls[i].getElementsByTagName("a")[1]; // the first link is the icon
      break;
    }
  }
  if (wcLink != "") {
    var direct = document.createElement('span');
    direct.innerHTML = ' (<a href="http://worldcat.org/isbn/' + isbn + '">direct</a>)';
    wcLink.parentNode.insertBefore(direct, wcLink.nextSibling);
  }
}