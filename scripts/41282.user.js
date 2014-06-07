// ==UserScript==
// @name           Hatena Bookmark replace Hotentry in top page
// @namespace      http://d.hatena.ne.jp/Yuichirou/
// @include        http://b.hatena.ne.jp/
// ==/UserScript==

var req = new XMLHttpRequest;
req.open('GET', '/entrylist', true);

req.onreadystatechange = function () {
  if (req.readyState == 4 && req.status == 200) {
    var innerhtml = "<li>" + req.responseText.match(/(<div class="entry-body">[\s\S]+?){6}/)[0].match(/[\s\S]+<\/li>/)[0]

    var entrylist = document.getElementById("entrylist");
    Array.forEach(entrylist.childNodes, function (node) {
      if (node.nodeName == "H3" || node.nodeName == "UL" || node.nodeName == "P" || node.nodeName == "DIV") {
        entrylist.removeChild(node);
      }
    });
    var ul = document.createElement("ul");
    ul.className = "hotentry";
    ul.innerHTML = innerhtml;
    entrylist.insertBefore(ul, entrylist.lastChild);
  }
};

req.send(null);
