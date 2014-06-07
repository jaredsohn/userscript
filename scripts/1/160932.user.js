// ==UserScript==
// @name HN comment highlighter
// @namespace jcdav.is
// @include http://news.ycombinator.com/item?id=*
// @include https://news.ycombinator.com/item?id=*
// @version 0.1
// @grant GM_getValue
// @grant GM_setValue
// ==/UserScript==

var uoname = "favusers";

var users =  JSON.parse(GM_getValue(uoname,"{}"));

function addUser(su, elem) {
  return function () {
    var uo = JSON.parse(GM_getValue(uoname,"{}"));
    uo[su] = true;
    GM_setValue(uoname, JSON.stringify(uo));
    elem.style.display = "none";
  };
}

function removeUser(su, elem) {
  return function() {
    var uo = JSON.parse(GM_getValue(uoname,"{}"));
    delete uo[su];
    GM_setValue(uoname, JSON.stringify(uo));
    elem.style.display = "none";
  };
}

var comments = document.evaluate("//a[contains(@href, 'user?id=')]", document, null,
                                 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < comments.snapshotLength; i++) {
  var comment = comments.snapshotItem(i);
  var rmatch = comment.href.match(/.+user\?id=(.+)/);
  if (rmatch) {
    var user = rmatch[1];
    if (user in users) {
      var td = comment.parentNode.parentNode.parentNode.parentNode;
      if (td) {
        td.setAttribute("style", "background-color: white");
      }
      var button = document.createElement('a');
      button.href = "javascript:void(0)";
      button.onclick = removeUser(user, button);
      button.appendChild(document.createTextNode('(-)'));
      comment.parentNode.insertBefore(button, comment.nextSibling);
    } else {
      var button = document.createElement('a');
      button.href = "javascript:void(0)";
      button.onclick = addUser(user, button);
      button.appendChild(document.createTextNode('(+)'));
      comment.parentNode.insertBefore(button, comment.nextSibling);
    }
  }
}
