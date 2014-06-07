// ==UserScript==
// @name          BioWare Forum
// @namespace     quail
// @version       1.2.0
// @updateURL     http://userscripts.org/scripts/source/399583.user.js
// @grant         none
// @description   Usability improvements for the BioWare forum.
// @include       http://forum.bioware.com/*
// ==/UserScript==
(function () {
  linkToFriendUpdates();

  linkToForumsFollowed();

  if (location.pathname.startsWith("/statuses/")) {
    setTimeout(linkify, 200);
    linkifyHidden();
  }

  /**
   * Insert a link to friends' status updates in the global navigation bar.
   */
  function linkToFriendUpdates() {
    var li = document.createElement("li");
    li.id = "nav_app_friendstatus";
    li.className = "left";
    if (location.pathname.startsWith("/statuses/friends")) {
      li.className += " active";
    }
    var a = document.createElement("a");
    a.href = "//" + location.host + "/statuses/friends/";
    a.title = "Go to friends' status updates";
    a.textContent = "Friends";
    li.appendChild(a);
    var ul = document.getElementById("community_app_menu");
    ul.insertBefore(li, ul.children[ul.children.length - 1]);
  }

  /**
   * Inserts a direct link to subscribed forums in the profile drop-down under
   * the original "Content I Follow" link. The original link is not useful if
   * the user wishes to subscribe to forums instead of individual topics.
   */
  function linkToForumsFollowed() {
    var followed = document.getElementById("user_likes")
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.href = followed.firstChild.href + "&contentType=forums";
    a.textContent = a.title = "Forums I Follow"
    li.appendChild(a);
    followed.parentNode.insertBefore(li, followed.next().next());
  }

  // Setup an event listener that linkifies new comments after clicking the
  // Show all ... link.
  function linkifyHidden() {
    var broker = document.getElementById("status_wrapper");
    var fn = function(e) {
      if (e.target.classList[0] === "__showAll") {
        // The delay needs to be considerably longer here because of the AJAX
        // round-trip.
        setTimeout(function() {
          linkify(e.target.parentNode.parentNode);
        }, 1500);
      }
    };
    broker.addEventListener("click", fn.bind(this), false);
  }

  /**
   * Naively turn non-clickable links in feed comments clickable.
   *
   * @param {DOMElement} node The root of the tree to process.
   */
  function linkify(node) {
    node = node || document;
    var l = node.getElementsByClassName("status_mini_content");
    // Match a URL that isn't wrapped in an anchor or a final period.
    var url = /(^|[^">])(https?:\/\/\S+)(\s|$)/g;
    for (var i = 0, m = l.length; i < m; ++i) {
      // Naively get the actual text content.
      var html = l[i].innerHTML.trim().split("\n");
      var s = html[1];
      if (s && s.match(url)) {
        html[1] = s.replace(url, '$1<a href="$2">$2</a>$3');
        l[i].innerHTML = html.join("\n");
      }
    }
  }
}());