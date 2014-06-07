// ==UserScript==
// @name LXR Filename Reference Search
// @description Creates a link in LXR to search for the filename in other files.
// @include http://lxr.mozilla.org/*
// ==/UserScript==
(function() {
  if (location.href.indexOf("/source/") == -1)
    return;
  var crumbs = document.getElementsByTagName("b")[1];
  var path = "http://lxr.mozilla.org/" + crumbs.firstChild.firstChild.nodeValue;
  var lastText = crumbs.lastChild.nodeValue;
  if (lastText == "/ ")
    return;
  var filename = crumbs.lastChild.previousSibling.firstChild.nodeValue;
  path += "/search?string=" + encodeURIComponent(filename);
  var hlink = document.createElement("a");
  hlink.setAttribute("href", path);
  hlink.appendChild(document.createTextNode("References"));
  var add_on = document.createElement("em");
  add_on.appendChild(document.createTextNode("("));
  add_on.appendChild(hlink);
  add_on.appendChild(document.createTextNode(")"));
  crumbs.appendChild(add_on);
})();
