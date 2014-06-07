// ==UserScript==
// @name           add visitor photo link
// @namespace      http://d.hatena.ne.jp/hatecha/
// @description    add visitor photo link
// @include        http://mixi.jp/*
// ==/UserScript==

(function() {


var allLinks, thisLink;

allLinks = document.evaluate('//ul[@class="logList01"]/li//a',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
     thisLink = allLinks.snapshotItem(i);
     if(!thisLink.href.match('show_friend.pl')) continue;

     var a1 = document.createElement("a");
     a1.setAttribute("href", "http://mixi.jp/show_photo.pl?id="+thisLink.href.substring(33));
     a1.appendChild(document.createTextNode("photo "));
     thisLink.parentNode.insertBefore(a1, thisLink);

     var a2 = document.createElement("a");
     a2.setAttribute("href", "http://mixi.jp/list_diary.pl?id="+thisLink.href.substring(33));
     a2.appendChild(document.createTextNode("diary "));
     thisLink.parentNode.insertBefore(a2, thisLink);

     var a3 = document.createElement("a");
     a3.setAttribute("href", "http://mixi.jp/list_comment.pl?id="+thisLink.href.substring(33));
     a3.appendChild(document.createTextNode("com. "));
     thisLink.parentNode.insertBefore(a3, thisLink);

     var a4 = document.createElement("a");
     a4.setAttribute("href", "http://mixi.jp/list_friend.pl?id="+thisLink.href.substring(33));
     a4.appendChild(document.createTextNode("friend "));
     thisLink.parentNode.insertBefore(a4, thisLink);
}

})();

// 2007/02/20 class "h130">"log"
// 2009/02/12 class >"//ul[@class="logList01"]/li//a"