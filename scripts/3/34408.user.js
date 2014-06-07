// ==UserScript==
// @name           DU_Hide_Ratings
// @namespace      DU
// @description    Hides the new thread rating icons from Democratic Underground discussion forums
// @include        http://www.democraticunderground.com/discuss/*
// ==/UserScript==

window.addEventListener("load", function() { do_script() }, false);
var gplatypusBundle = Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService);

function do_script() {
  for (i=1;i<=80;i++) {
    smart_remove(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[4]/TBODY[1]/TR[' + i + ']/TD[6]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
  }
};

function smart_remove(doc, node) {
    if (node.parentNode.childNodes.length == 1) {
	smart_remove(doc, node.parentNode);
    } else {
remove_it(doc, node);
    };
};

function remove_it(doc, node) {
  if (doc == null || node == null) return;
  if (!node.parentNode) return;
  node.style.display = "none";
  doc.last_removed_node = node;
};
