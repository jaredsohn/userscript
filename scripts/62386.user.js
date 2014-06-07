// ==UserScript==
// @name           View PDF/PPT/TIFF with Google Document Viewer
// @namespace      http://hail2u.net/
// @description    Insert a Google Docs icon for viewing PDF/PPT/TIFF with Google Document Viewer.
// @include        http://*
// @include        https://*
// @exclude        http://docs.google.com/*
// ==/UserScript==

function addLink (d) {
  var anchors = d.getElementsByTagName("a");
  for (var i = 0, l = anchors.length; i < l; i++) {
    var a = anchors[i];

    if (a.href.match(/\.(pdf|ppt|tiff?)$/i) && !a.href.match(/docs\.google\.com/) && !a.href.match(/q=related:/i)) {
      var gdico = document.createElement("img");
      gdico.setAttribute("src", "http://docs.google.com/favicon.ico");
      gdico.setAttribute("style", "border:none;");
      var gdv = document.createElement("a");
      gdv.setAttribute("href", "http://docs.google.com/gview?url=" + encodeURIComponent(a.href) + "&hl=ja");
      gdv.appendChild(gdico);
      a.parentNode.insertBefore(gdv, a.nextSibling);
    }
  }
}

addLink(document);

document.body.addEventListener('AutoPagerize_DOMNodeInserted', function (e) {
  addLink(e.target);
}, false);

if (typeof LDR !== "undefined") {
  var w = unsafeWindow;

  var watcher = {
    callAddLink: function (d) {
      this.cancel();
      addLink(d);
    },

    setup: function (feed) {
      this.cancel();
      var item_count = feed.items.length;
      var d = document.getElementById("right_container");
      var self = this;
      this.timeoutID = setInterval(function () {
        if (d.getElementsByClassName("item").length === item_count) {
          self.callAddLink(d);
        }
      }, 1000);
    },

    cancel: function () {
      if (typeof this.timeoutID === "number") {
        clearInterval(this.timeoutID);
        delete this.timeoutID;
      }
    }
  };

  w.register_hook('after_printfeed', function (feed) {
    watcher.setup(feed);
  });
}
