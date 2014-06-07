// ==UserScript==
// @name           Facebook Clean Profile
// @namespace      fb
// @description    Changes Facebook profile links into cleanprofile links
// @include       http://*.facebook.com/*
// ==/UserScript==

(function() {
  var xpath = "//a[starts-with(@href,'http://www.facebook.com/profile.php')]";
  var res = document.evaluate(xpath, document, null,
                              XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var i, link;
  for (i = 0; link = res.snapshotItem(i); i++) {
    if (link.text.indexOf("Regular Profile") == -1)
      link.href = link.href.replace("www.facebook.com","apps.facebook.com/cleanprofile");
  }
})();
