// ==UserScript==
// @name         Better "Diamond Weekly"
// @namespace    http://yasu.asuka.net/
// @description  this is a sample script
// @include      https://www.d-vision.ne.jp/elm/index.shtml
// ==/UserScript==

var form = document.evaluate("//form[@name='f1']",
			      document,
			      null,
			      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			      null).snapshotItem(0);
form.removeAttribute("target");

var input = document.evaluate("//input[@name='word']",
			      document,
			      null,
			      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			      null).snapshotItem(0);
input.removeAttribute("onkeypress");

var submit = document.evaluate("//input[@type='button']",
			       document,
			       null,
			       XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			       null).snapshotItem(0);
submit.setAttribute("type", "submit");
submit.removeAttribute("onclick");
