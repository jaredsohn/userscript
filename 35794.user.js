// ==UserScript==
// @name           + TumPop
// @namespace      http://zoolcar9.lhukie.net/greasemonkey
// @description    Saves a post as favorite to TumPop.com from Tumblr dashboard
// @include        http://www.tumblr.com/*
// ==/UserScript==

({
  getNodes: function(aXPath, aRoot) {
    return document.evaluate(aXPath, aRoot ? aRoot : document, null, 6, null);
  },

  getNode: function(aXPath, aRoot) {
    return document.evaluate(aXPath, aRoot ? aRoot : document, null, 9, null)
                   .singleNodeValue
  },

  getPosts: function() {
    return document.getElementById("posts");
  },

  getItems: function() {
    return this.getNodes("./li[starts-with(@id, 'post')]", this.getPosts());
  },

  tumpop: function() {
    if (!this.getPosts() || !this.getItems().snapshotLength) return;
    var post, control, permalink = null;
    for (var i = 0; i < this.getItems().snapshotLength; i++) {
      post = this.getItems().snapshotItem(i);
      control = this.getNode("./div[@class='post_controls']", post);
      permalink = this.getNode(".//a[@title='Permalink']", post);
      if (permalink) {
        var fave = control.appendChild(document.createElement("a"));
        fave.textContent = "\u2665";
        fave.title = "+ TumPop";
        fave.href = "http://tumpop.com/fave?u=" +
                    encodeURIComponent(permalink);
        fave.addEventListener("click", function(e) {
          e.preventDefault();
          if (typeof GM_openInTab == "function") {
            GM_openInTab(this.href);
          } else {
            window.open(this.href, "tumpop",
                        "toolbar=0, resizable=0, status=1, " +
                        "width=450, height=430");
          }
        }, false);
      }
    }
  }
}).tumpop()
