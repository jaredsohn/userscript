// ==UserScript==
// @id             usoscriptmanagementheader@phob.net
// @name           userscripts.org Script Management Header
// @version        0.15
// @namespace      phob.net
// @author         wn
// @description    Adds a link to your "script management" section in the userscripts.org top bar
// @include        http://userscripts.org/*
// @include        https://userscripts.org/*
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/161513.meta.js
// ==/UserScript==

var as = document.getElementById("top").getElementsByTagName("a");

for (var i = 0, e = as.length; i < e; ++i) {
  if ("/logout" === as[i].getAttribute("href")) {
    var sm = document.createElement("li");
    sm.innerHTML = "<a href='/home/scripts'>Script Management</a>";
    as[i].parentNode.parentNode.insertBefore(sm, as[i].parentNode);
    break;
  }
}
