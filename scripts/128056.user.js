// ==UserScript==
// @id             esrexternallinksnewwin@phob.net
// @name           ESR External Links to New Window
// @version        0.17
// @namespace      phob.net
// @author         wn
// @description    Makes non-ESReality links open in a new window
// @include        http://esreality.com/*
// @include        http://*.esreality.com/*
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/128056.meta.js
// ==/UserScript==

var as = document.getElementsByTagName("a")
  , RE_isESR = /^https?:\/\/(?:[a-zA-Z]+\.)?esreality\.com(?:\/|$)/i;

for (var i = 0, e = as.length, m = document.createElement("a"); i < e; ++i) {
  var t = as[i].getAttribute("target")
    , h = as[i].getAttribute("href");

  // Ignore if the target attribute is already set or we have no href (for some reason).
  if (t || !h) {
    continue;
  }

  // See http://stackoverflow.com/questions/470832/getting-an-absolute-url-from-a-relative-one-ie6-issue
  m.href = h;
  h = m.href;
  m.href = null;

  // Set the target if this isn't for an ESR URL.
  if (!RE_isESR.test(h)) {
    as[i].setAttribute("target", "_blank");
  }
}
