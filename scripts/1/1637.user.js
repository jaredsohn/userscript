// ==UserScript==
// @name	SG BigForms
// @namespace	http://www.suicidegirls.com/members/ThePants/
// @description	Makes SG Form Inputs Bigger
// @include	http://www.suicidegirls.com/*
// @include http://suicidegirls.com/*
// @exclude
// ==/UserScript==

(function() {
  var xpath = "//div[@class='formField']";
  var res = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var t;
  for (i = 0; t = res.snapshotItem(i); ++i) {
    t.style.cssFloat = "left";

    if (t.childNodes[0].tagName == "INPUT"){
      t.childNodes[0].size = 40
    }else if (t.childNodes[0].tagName == "TEXTAREA"){
      t.style.width = "100%";
    }

  }

  var xpath = "//input";
  var res = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var t;
  for (i = 0; t = res.snapshotItem(i); ++i) {
    t.size = 40
  }

  var xpath = "//textarea";
  var res = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var t;
  for (i = 0; t = res.snapshotItem(i); ++i) {
    t.style.width = "100%";
    t.style.minheight = "200px";
  }
})();