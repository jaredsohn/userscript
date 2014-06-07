// ==UserScript==
// @name           Preload next page
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/22701.user.js
// @description    Preloads the next page in a hidden iframe.
// @include        http://*
// @exclude        http://www.okcupid.com/*
// @exclude        http://www.helgon.net/*
// ==/UserScript==

if (frameElement && frameElement.style.display != "none") return; // recursing?
var title = "Keyboard shortcut: k, or Arrow right";
var next = $X('//a[@title="'+ title +'" or img[@title="'+ title +'"]]');
if (next) {
  var iframe = document.createElement("iframe");
  iframe.src = next.href;
  iframe.style.display = "none";
  document.body.appendChild(iframe);
}

function $X( xpath, root ) {
  var type = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
  var doc = root ? root.evaluate ? root : root.ownerDocument : document;
  return doc.evaluate(xpath, root||doc, null, type, null).snapshotItem(0);
}
