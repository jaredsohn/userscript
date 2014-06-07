// ==UserScript==
// @id             qlrankskeepplayer@phob.net
// @name           QLRanks.com Keep Player
// @version        0.1
// @namespace      phob.net
// @author         wn
// @description    Keeps the current player name when browsing QLRanks.com
// @include        http://qlranks.com/*/player/*
// @include        http://www.qlranks.com/*/player/*
// @run-at         document-end
// ==/UserScript==

var RE_player = /^http:\/\/(?:www\.)?qlranks\.com\/(?:ca|duel|tdm)\/player\/(\w+)\/?/
  , p = RE_player.exec(location.href);

if (p && p[1]) {
  var links = document.evaluate("//div[contains(@class, 'nav')]//a[@href='/' or @href='/ca/' or @href='/duel/' or @href='/tdm/']",
                            document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

  for (var i = 0, e = links.snapshotLength; i < e; ++i) {
    var a = links.snapshotItem(i), h = a.getAttribute("href");
    a.href = (h == "/" ? "/duel/" : h) + "player/" + p[1];
  }
}
