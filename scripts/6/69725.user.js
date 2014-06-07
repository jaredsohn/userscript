(function () {

// ==UserScript==
// @name          uso - Anchor Bookmarks
// @namespace     http://userscripts.org/users/37004
// @description   Converts anchor tags with no attributes into bookmarks via the next available text node line
// @copyright     2010+, Marti Martz (http://userscripts.org/users/37004)
// @contributor   sizzlemctwizzle (http://userscripts.org/users/27715)
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @license       Creative Commons; http://creativecommons.org/licenses/by-nc-nd/3.0/
// @version       0.5.7.3esr1
// @icon          https://www.gravatar.com/avatar/e615596ec6d7191ab628a1f0cec0006d?r=PG&s=48&default=identicon

// @include /^https?://userscripts\.org(?::\d{1,5})?//

// @exclude /^https?://userscripts\.org/login/
// @exclude /^https?://userscripts\.org/scripts/diff//
// @exclude /^https?://userscripts\.org/scripts/version//

// @include http://userscripts.org/*
// @include https://userscripts.org/*

// @exclude http://userscripts.org/login*
// @exclude https://userscripts.org/login*
// @exclude http://userscripts.org/scripts/diff/*
// @exclude https://userscripts.org/scripts/diff/*
// @exclude http://userscripts.org/scripts/version/*
// @exclude https://userscripts.org/scripts/version/*

// ==/UserScript==

  var img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAl2cEFnAAAAEAAAABAAXMatwwAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAN1wAADdcBQiibeAAAAlNJREFUOE+Nk+tLU3EYx+3+v6RRb3tXEAhBBDWjzK03Um+VirI0IWr3c+ZYURJJsTHnSJshdH3TtNoNZLY1zV3Y3TkvZ3rm1G1++/1+mey0ih74nHHg+X7OzvP8TgOABo1OeVLPa1Jq7X38Ca1etaXj1OsGo95J7o/TzC/YhYSz8/kc/lWRaBhfA34YTbzIGbScRECfQms6HMT0bODnL2GmhuGRISws5SEIyyD/ZI1kmusEs9EQYZoRjlFmdhgZtSOVTkAoLMPrc0Fv0LjrBNH47DZhxBK1RPDFM8Ek9mEbPF4XnctmnSCejCKeisE7FURrlxlNMg5NLRwUty2Y/BbCVGASLs9nlNZLIENFnSCVicMXCOHIOR06jQ/w/LUSL5zjuDtgwOHzPPyh78jMpVjv9oZ2SQTZXBoXuizo7b8C24dOqGx+2MZteOs7DeWzq1B0W5HLZ1kvWf0Wye2WCOYX5nDwDIfHL6+j4+FHdDxyY8x7GcMTcpjfyNEo47FINlEj2CMR0DVRQZ99FPygHO36MZgcN/Dq01H0O0xMIBSWWC89XHWCZWERrTctkJHXeOI4hjtPu3FJ/R7WdydwsXcAip5BrIorrJcMsUpyeyWCwoqAYDiJxrN6dPDXoDY7oba40X5PhUMtPCLJHNZKxVrBPomA2sXiKkLRDNpuWYmIZ8h7hhBL57G5ucGgRY5/heT2SwQ0XFwT2VPorjc21lmgXC6jUqmgWq0yaJHvgQoOMAG5yQgFAf9bYlGkgvzOOSATbeb7dIm/fc6/Q3rTZAanaPYH/jkU5snfMgQAAAAASUVORK5CYII=";

  var headNode = document.evaluate(
      "//head",
      document.documentElement,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
  );
  if (headNode && headNode.singleNodeValue) {
    var styleNode = document.createElement("style");
    styleNode.setAttribute("type", "text/css");
    styleNode.setAttribute("media", "screen, projection");
    styleNode.textContent = ".bookmark { width: 16px; height: 16px; margin: 0.1em 0.2em 0; float: left; background: transparent url(" + img + ") no-repeat top left; opacity: 0.4; } .bookmark:hover { opacity: 1.0; }";
    headNode.singleNodeValue.appendChild(styleNode);
  }

  var xpr = document.evaluate(
      "//a[starts-with(@name,'comment-')]",
      document.body,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
  );

  if (xpr)
    for (var i = 0, thisNode; thisNode = xpr.snapshotItem(i++);) {
      var imgNode = document.createElement("img");
      imgNode.setAttribute("class", "bookmark");
      imgNode.setAttribute("src", "data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==");
      imgNode.setAttribute("title", "link");
      thisNode.appendChild(imgNode);

      if (window.location.pathname.match(/^\/comments(.*)/i)) {
        var userid, useridNode = document.evaluate(
            ".//a[@user_id]",
            thisNode.parentNode,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        );
        if (useridNode && useridNode.singleNodeValue) {
          var thatNode = useridNode.singleNodeValue;

          userid = thatNode.getAttribute("user_id");
          if (userid)
            thisNode.setAttribute("href", "/users/" + userid + "/comments#" + thisNode.name); // NOTE: Comments are not fully linked to source page so use public profile comments
        }
        if (!userid)
          thisNode.setAttribute("href", window.location.pathname + window.location.search + "#" + thisNode.name); // NOTE: Fallback to actual fragment in case of USO gen err
      }
      else
        thisNode.setAttribute("href", window.location.pathname + "#" + thisNode.name); // NOTE: Fallback for no pagination
    }

  // Fix missing recent /posts linkage if still missing
  if (window.location.pathname.match(/(.*)\/posts\/?$/i)) {
    var xpr = document.evaluate(
        "//tr[starts-with(@id,'posts-')]",
        document.body,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
    );
    if (xpr)
      for (var i = 0, thisNode; thisNode = xpr.snapshotItem(i++);) {
        var targetNode = document.evaluate(
            ".//abbr[@class='updated']",
            thisNode,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        );
        if (targetNode && targetNode.singleNodeValue) {
          var abbrNode = targetNode.singleNodeValue;

          if (abbrNode.parentNode.getAttribute("rel") != "bookmark") {
            var aNode = document.createElement("a");
            aNode.setAttribute("rel", "bookmark");
            aNode.setAttribute("href", "/" + thisNode.getAttribute("id").replace("-", "/"));

            abbrNode.parentNode.appendChild(aNode);
            aNode.appendChild(abbrNode);
          }
        }
      }
  }

  // Add custom bookmarks if present
  var pathname, portion;
  switch ((pathname = window.location.pathname)) {
    case undefined:
    default:
      break;

    case (portion = pathname.match(/^\/scripts(.*)/i)) ? portion[0] : undefined:
      var tabid = (portion = portion[1].match(/^\/(show|reviews|issues)\/(.*)/i)) ? portion[1] : undefined;
      switch (tabid) {
        case "show":
          var contextNode = document.evaluate(
              "//div[@id='full_description']",
              document.body,
              null,
              XPathResult.FIRST_ORDERED_NODE_TYPE,
              null
          );
          if (contextNode && contextNode.singleNodeValue) {
            contextNode = contextNode.singleNodeValue;
            addBookmarks(contextNode, "bookmark-");
          }
          break;
        case "reviews":
          var contextNode = document.evaluate(
              "//div[@class='review']/div[@class='body']",
              document.body,
              null,
              XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
              null
          );
          for (var i = 0; i < contextNode.snapshotLength; ++i) {
            var thisNode = contextNode.snapshotItem(i);

            var reviewid = thisNode.previousSibling.previousSibling.previousSibling.previousSibling.getAttribute("id").match(/reviews-(\d+)-status/i)[1];
            addBookmarks(thisNode, "bookmark-" + reviewid + "-");
          }
          break;
        case "issues":
          var contextNode = document.evaluate(
              "//p[contains(@id, 'issuecomments-')]",
              document.body,
              null,
              XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
              null
          );
          for (var i = 0; i < contextNode.snapshotLength; ++i) {
            var thisNode = contextNode.snapshotItem(i);

            var commentid = thisNode.getAttribute("id").match(/issuecomments-(\d+)/i)[1];
            addBookmarks(thisNode.nextSibling, "bookmark-" + commentid + "-");
          }
          break;
      }
      break;

    case (portion = pathname.match(/^\/jetpacks(.*)/i)) ? portion[0] : undefined:
      var jetpackid = (portion = portion[1].match(/^\/(.*)/i)) ? portion[1] : undefined;
      if (jetpackid) {
        var contextNode = document.evaluate(
            "//p/b/text()['Summary:']",
            document.body,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        );
        if (contextNode && contextNode.singleNodeValue) {
          contextNode = contextNode.singleNodeValue.parentNode.parentNode;
          addBookmarks(contextNode, "bookmark-");
        }
      }
      break;

    case (portion = pathname.match(/^\/articles(.*)/i)) ? portion[0] : undefined:
      var articleid = (portion = portion[1].match(/^\/(\d+).*/i)) ? portion[1] : undefined;
      if (articleid) {
        var contextNode = document.evaluate(
            "//div[contains(@id, 'comment-body')]",
            document.body,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null
        );
        for (var i = 0; i < contextNode.snapshotLength; ++i) {
          var thisNode = contextNode.snapshotItem(i);

          var commentid = thisNode.getAttribute("id").match(/comment-body-(\d+)/i)[1];
          addBookmarks(thisNode, "bookmark-" + commentid + "-");
        }

        contextNode = document.evaluate(
            "//p[@class='summary']",
            document.body,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        );
        if (contextNode && contextNode.singleNodeValue) {
          contextNode = contextNode.singleNodeValue;
          addBookmarks(contextNode, "bookmark-");
        }
      }
      break;

    case (portion = pathname.match(/(.*)\/comments\/?$/i)) ? portion[0] : undefined:
      var contextNode = document.evaluate(
          "//div[contains(@id, 'comment-body')]",
          document.body,
          null,
          XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
          null
      );
      for (var i = 0; i < contextNode.snapshotLength; ++i) {
        var thisNode = contextNode.snapshotItem(i);

        var commentid = thisNode.getAttribute("id").match(/comment-body-(\d+)/i)[1];
        addBookmarks(thisNode, "bookmark-" + commentid + "-");
      }

      contextNode = document.evaluate(
          "//p[@class='summary']",
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
      );
      if (contextNode && contextNode.singleNodeValue) {
        contextNode = contextNode.singleNodeValue;
        addBookmarks(contextNode, "bookmark-");
      }
      break;

    case (portion = pathname.match(/^\/groups(.*)/i)) ? portion[0] : undefined:
      var groupid = (portion = portion[1].match(/^\/(\d+)\/?$/i)) ? portion[1] : undefined;
      if (groupid) {
        var contextNode = document.evaluate(
            "//div[@class='description']",
            document.body,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        );
        if (contextNode && contextNode.singleNodeValue) {
          contextNode = contextNode.singleNodeValue;
          addBookmarks(contextNode, "bookmark-");
        }
      }
      break;

    case (portion = pathname.match(/^\/guides(.*)/i)) ? portion[0] : undefined:
      var guideid = (portion = portion[1].match(/^\/(\d+)\/?$/i)) ? portion[1] : undefined;
      if (guideid) {
        var contextNode = document.evaluate(
            "//div[@id='content']",
            document.body,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        );
        if (contextNode && contextNode.singleNodeValue) {
          contextNode = contextNode.singleNodeValue;
          addBookmarks(contextNode, "bookmark-");
        }
      }
      break;

    case (portion = pathname.match(/^\/topics(.*)/i)) ? portion[0] : undefined:
      var topicid = (portion = portion[1].match(/^\/(\d+)\/?$/i)) ? portion[1] : undefined;
      if (topicid) {
        var contextNode = document.evaluate(
            "//td[contains(@id, 'post-body')]",
            document.body,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null
        );
        for (var i = 0; i < contextNode.snapshotLength; ++i) {
          var thisNode = contextNode.snapshotItem(i);

          var postid = thisNode.getAttribute("id").match(/post-body-(\d+)/i)[1];
          addBookmarks(thisNode, "bookmark-" + postid + "-");
        }
      }
      break;

    case (portion = pathname.match(/^\/reviews(.*)/i)) ? portion[0] : undefined:
      var reviewid = (portion = portion[1].match(/^\/(\d+)\/?$/i)) ? portion[1] : undefined;
      if (reviewid) {
        var contextNode = document.evaluate(
            "//div[@class='body']",
            document.body,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        );
        if (contextNode && contextNode.singleNodeValue) {
          contextNode = contextNode.singleNodeValue;
          addBookmarks(contextNode, "bookmark-");
        }

        contextNode = document.evaluate(
            "//div[contains(@id, 'comment-body')]",
            document.body,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null
        );
        for (var i = 0; i < contextNode.snapshotLength; ++i) {
          var thisNode = contextNode.snapshotItem(i);

          var commentid = thisNode.getAttribute("id").match(/comment-body-(\d+)/i)[1];
          addBookmarks(thisNode, "bookmark-" + commentid + "-");
        }
      }
      break;
  }


function addBookmarks(contextNode, prefixAttribute) {
  var xpr = document.evaluate(
      "../descendant::a[not(@href)][not(@name)][not(@id)]",
      contextNode,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
  );

  var thisNode, thatNode;
  if (xpr) {
    var bookmarks = {};

    function checkBookmark(bookmarks, newbookmark, suffix) {
      for (var bookmark in bookmarks) {
        if (newbookmark + ((suffix) ? "-" + suffix : "") == bookmarks[bookmark]) {
          suffix = (suffix) ? suffix + 1 : 1;
          checkBookmark(bookmarks, newbookmark, suffix);
        }
      }
      return suffix;
    }

    for (var i = 0; i < xpr.snapshotLength; ++i) {
      var thatNode = thisNode = xpr.snapshotItem(i);

      while (thatNode) {
        if (thatNode.textContent != "") {
          var newbookmark = thatNode.textContent;

          if (!newbookmark.match(/^about:.*/i)) {
            newbookmark = newbookmark.replace(/^\s*/, "");
            if (newbookmark.match(/(.{1,64})/i)) {
              newbookmark = newbookmark.match(/(.{1,64})/i)[1];
              newbookmark = newbookmark.replace(/\s*$/, "");
              newbookmark = newbookmark.replace(/\s{2,}/g, " ");

              newbookmark = newbookmark.replace(/\.*/g, "");

              newbookmark = encodeURIComponent(newbookmark.toLowerCase());
              newbookmark = newbookmark.replace(/\%20/g, "-");
              newbookmark = newbookmark.replace(/\%/g, ".");
              newbookmark = prefixAttribute + newbookmark;

              var suffix;
              if ((suffix = checkBookmark(bookmarks, newbookmark)))
                newbookmark += "-" + suffix;

              bookmarks[newbookmark] = newbookmark;
            }
            thisNode.setAttribute("name", newbookmark);
            thisNode.setAttribute("id", newbookmark);

            var imgNode = document.createElement("img");
            imgNode.setAttribute("class", "bookmark");
            imgNode.setAttribute("title", "link");
            imgNode.setAttribute("alt", "link");
            imgNode.setAttribute("src", "data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==");

            var anchorNode = document.createElement("a");
            anchorNode.setAttribute("href", "#" + newbookmark);

            anchorNode.appendChild(imgNode);
            thisNode.parentNode.insertBefore(anchorNode, thisNode);
          }
          break;
        }
        thatNode = thatNode.nextSibling;
      }
    }
  }
}
  var hash = window.location.hash.match(/^#(bookmark-.*)/);
  if (hash) {
    var anchorNode = document.evaluate(
        "//a[@id='" + hash[1] + "']",
        document.body,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    );
    if (anchorNode && anchorNode.singleNodeValue)
      setTimeout(function () { anchorNode.singleNodeValue.scrollIntoView(); }, 1000);
  }

})();
