// ==UserScript==
// @name           Open Links in New Window
// @namespace      com.gingerbeardman.linksinnewwindow
// @description    Any links open in a new window
// @match          http://*/*
// @run-at         document-end
// @author         Matt Sephton
// @version        1.0.0
// ==/UserScript==

var as = document.getElementsByTagName("a");

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
  as[i].setAttribute("target", "_blank");
}