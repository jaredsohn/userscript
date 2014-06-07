// ==UserScript==
// @name           Rakuten Item Reviewing in Hatena::Diary
// @namespace      http://d.hatena.ne.jp/Yuichirou/
// @include        http://www.rakuten.co.jp/*
// @description    Make "Review in Hatena::Diary" links to each items in Rakuten
// ==/UserScript==

(function() {
  var form = document.getElementsByTagName("form");

  for (var i = 0; i < form.length; i++) {
    if (!form[i].elements) continue;
    var shopurl = form[i].elements.namedItem("shopurl");
    var item_id = form[i].elements.namedItem("item_id");
    if (!shopurl || !item_id) continue;

    var notation = "[rakuten:" + shopurl.value + ":" + item_id.value + "]";

    var tr = document.createElement("tr");
    var link = tr.appendChild(document.createElement("td")).appendChild(document.createElement("a"));
    link.href = "http://d.hatena.ne.jp/edit?appendbody=" + encodeURIComponent(notation);
    link.appendChild(document.createTextNode("\u306F\u3066\u306A\u30C0\u30A4\u30A2\u30EA\u30FC\u3067\u7D39\u4ECB\u3059\u308B"));

    form[i].parentNode.appendChild(tr);
  }
})();
