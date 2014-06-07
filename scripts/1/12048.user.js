// ==UserScript==
// @name           TinyURL Popup Preview
// @namespace      http://d.hatena.ne.jp/Yuichirou/
// @description    This script enables you to check *safely* where the TinyURL links redirect to (as a TITLE attribute popup).
// @include        http://*
// @include        https://*
// ==/UserScript==

var links = document.evaluate("//a[contains(@href,'tinyurl.com')]",
                              document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < links.snapshotLength; i++) {
  getFullURL(links.snapshotItem(i));
}

function getFullURL(link) {
  var re = decodeURIComponent(link.href).match(/\/tinyurl\.com\/([0-9a-z]+)/);
  if (!re || re[1] == "preview") return;
  var title = link.getAttribute("title");
  if (title == "") link.setAttribute("title", "loading...");

  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://tinyurl.com/preview.php?num=' + re[1],
    onload: function(res) {
      var re = res.responseText.match("<blockquote><b>(.+)</b></blockquote>");
      if (re) {
        var url = re[1].replace(/\<br \/\>/g, "").replace(/&amp;/g, "&");
        if (title != "") {
          link.setAttribute("title", link.getAttribute("title") + " (link to " + url + ")");
        } else {
          link.setAttribute("title", "(link to " + url + ")");
        }
      } else if (title == "") {
        link.setAttribute("title", "failed...");
      }
    },
    onerror: function() {
      if (title == "") {
        link.setAttribute("title", "failed...");
      }
    }
  });
}
