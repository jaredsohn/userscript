// ==UserScript==
// @name           Nico Nico Thumbnail in Hatena Bookmark
// @namespace      http://d.hatena.ne.jp/Yuichirou/
// @include        http://b.hatena.ne.jp/*
// @version        0.2
// ==/UserScript==

function $x(path) {
  return document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

if (location.href.indexOf("http://b.hatena.ne.jp/entry/") == 0) {
  var h1 = document.getElementsByTagName("h1")[0];
  var url = h1.getElementsByTagName("a")[0].href;

  if (url.match(/^http:\/\/www\.nicovideo\.jp\/watch\//)) {
    var iframe = document.createElement("iframe");
    iframe.src = url.replace("/watch/", "/thumb/");
    iframe.width = "300"; iframe.height="200";
    iframe.scrolling = "no"; iframe.frameBorder = "0";

    var entryinfosub = document.getElementById("entry-infosub");
    var screenshot = entryinfosub.getElementsByTagName("div")[0];
    screenshot.replaceChild(iframe, screenshot.firstChild);
    entryinfosub.getElementsByTagName("dl")[0].style.marginLeft = "325";
    entryinfosub.getElementsByTagName("ul")[0].style.marginLeft = "325";
  }

} else {
  var entries = $x('//div[@class="entry"]');

  for (var i = 0, entry; entry = entries.snapshotItem(i); ++i) {
    var bookmark = entry.getElementsByTagName("a")[0];
    var re = bookmark.href.match(/^http:\/\/www\.nicovideo\.jp\/watch\/(?!am|fz)\w{2}(\d+)$/);
    if (re) {
      var div = entry.appendChild(document.createElement("div"));
      div.className = "entry-image-end";
      var div = document.createElement("div");
      div.className = "entry-image";
      var link = div.appendChild(document.createElement("a"));
      link.href = bookmark.href;
      var img = link.appendChild(document.createElement("img"));
      img.alt = img.title = bookmark.innerHTML;
      img.src = "http://tn-skr.smilevideo.jp/smile?i=" + re[1];
      entry.insertBefore(div, entry.firstChild);
    }
  }

  var entries = $x('//dl[@class="bookmarklist"]');

  for (var i = 0, entry; entry = entries.snapshotItem(i); ++i) {
    var bookmark = entry.getElementsByTagName("a")[0];
    var re = bookmark.href.match(/^http:\/\/www\.nicovideo\.jp\/watch\/(?:sm|ca)(\d+)$/);
    if (re) {
      var dt = document.createElement("dt");
      dt.className = "bookmark-image";
      var link = dt.appendChild(document.createElement("a"));
      link.href = bookmark.href;
      var img = link.appendChild(document.createElement("img"));
      img.className = "video-thumbnail";
      img.alt = img.title = bookmark.innerHTML;
      img.src = "http://tn-skr.smilevideo.jp/smile?i=" + re[1];
      entry.insertBefore(dt, entry.firstChild);
    }
  }
}
