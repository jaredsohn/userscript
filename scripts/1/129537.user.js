// ==UserScript==
// @name           LiveJorunal - Add "don't auto-format" checkbox to the new comment editor
// @namespace      http://userscripts.org/scripts/show/129537
// @description    Shows "don't auto-format" checkbox in Livejournal's new comment editor.
// @include        http://*.livejournal.com/*
// @version        0.1
// ==/UserScript==

(function() {
  if (document.getElementById("tmpl-watering-photo")) {
    var userDivs = document.evaluate("//div[@class='b-watering-user']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = userDivs.snapshotLength - 1; i >= 0; i--) {
        var preformatted = document.createElement("div");
        preformatted.innerHTML = 'Don\'t auto-format: <input type="checkbox" tabindex="22" value="1" id="prop_opt_preformatted" name="prop_opt_preformatted">';
        preformatted.style.display = "inline" ;
        preformatted.style.marginLeft = "13px" ;
        var userDiv = userDivs.snapshotItem(i);
        userDiv.parentNode.insertBefore(preformatted, userDiv);
    }
  }
}());
