// ==UserScript==
// @name           Hatena Bookmark entrylist from/to bookmarklist
// @namespace      http://d.hatena.ne.jp/Yuichirou/
// @description    Add a link to bookmark list page from entry list and vice versa.
// @include        http://b.hatena.ne.jp/entrylist*
// @include        http://b.hatena.ne.jp/bookmarklist*
// ==/UserScript==

main: {
  var inputtext = document.getElementsByClassName("inputtext")[0];
  if (!inputtext) break main;
  var url = inputtext.value;

  if (location.href.indexOf("http://b.hatena.ne.jp/entrylist") == 0) {
    var li = document.createElement("li");
    var link = li.appendChild(document.createElement("a"));
    link.href = "/bookmarklist?url=" + encodeURIComponent(url);
    link.textContent = "\u30D6\u30AF\u30DE";

    var selector = document.getElementsByClassName("selector")[0];
    selector.insertBefore(li, selector.getElementsByClassName("url")[0] || null);

  } else {
    var selector = document.createElement("ul");
    selector.className = "selector";

    [ { name: "\u65B0\u7740",       prefix: "/entrylist?sort=eid&url="   },
      { name: "\u6CE8\u76EE",       prefix: "/entrylist?sort=hot&url="   },
      { name: "\u4EBA\u6C17",       prefix: "/entrylist?sort=count&url=" },
      { name: "\u30D6\u30AF\u30DE", prefix: "/bookmarklist?url="         },
    ].forEach(function (type) {
      var link = document.createElement("a");
      link.href = type.prefix + encodeURIComponent(url);
      link.textContent = type.name;
      selector.appendChild(document.createElement("li")).appendChild(link);
    });
    selector.lastChild.className = "selected";

    var url_ul = document.createElement("ul");
    var url_li = url_ul.appendChild(document.createElement("li"));
    url_li.appendChild(document.createTextNode("URL\uFF1A"));
    var link = url_li.appendChild(document.createElement("a"));
    link.href = link.textContent = url;

    var submenu = document.getElementsByClassName("submenu-inner")[0];
    submenu.appendChild(selector);
    submenu.appendChild(url_ul);
  }
}
