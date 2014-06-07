// ==UserScript==
// @name          Craigslist Shortcuts
// @namespace     https://github.com/yonran/craigslist-shortcuts
// @description   Gmail-style (vim-inspired) keyboard shortcuts.
// @include       http://*.craigslist.org/*
// @version       0.0.11
// ==/UserScript==

var isFromChromeWebStore = false;

// Based on the bisect module in Python:
// Copyright © 2001-2013 Python Software Foundation; All Rights Reserved
// Find index to insert x in a after any entries that are equivalent to x.
function bisect_right(a, x, lo, hi, cmp) {
  if (lo < 0 || lo > a.length || ! (lo < hi))
    throw Error("Invalid arguments to bisect_left: " + lo + "," + hi + "," + a.length);
  while (lo < hi) {
    var mid = (lo+hi)>>1, midEl = a[mid];
    var c = cmp(midEl, x);
    if (c <= 0)
      lo = mid + 1;
    else
      hi = mid;
  }
  return lo;
}
// Find index to insert x in a before any entries that are equivalent to x.
function bisect_left(a, x, lo, hi, cmp) {
  if (lo < 0 || lo > a.length || ! (lo < hi))
    throw Error("Invalid arguments to bisect_left: " + lo + "," + hi + "," + a.length);
  while (lo < hi) {
    var mid = (lo+hi)>>1, midEl = a[mid];
    var c = cmp(midEl, x);
    if (c < 0)
      lo = mid + 1;
    else
      hi = mid;
  }
  return lo;
}
// Given a list of rows and an element in one row,
// returns the next row or previous row.
function findNextElementToFocus(a, x, backwards) {
  if (0 === x.length)
    return null;
  function cmp(x, y) {
    var mask = x.compareDocumentPosition(y);
    if (mask & Node.DOCUMENT_POSITION_CONTAINED_BY || mask & Node.DOCUMENT_POSITION_CONTAINS)
      return 0;
    if (mask & Node.DOCUMENT_POSITION_FOLLOWING)  // x < y
      return -1;
    if (mask & Node.DOCUMENT_POSITION_PRECEDING)  // x > y
      return 1;
    if (mask & Node.DOCUMENT_POSITION_DISCONNECTED)
      throw Error("Can't compare disconnected nodes");
    throw Error("Can't unerstand compareDocumentPosition result " + mask);
  }
  var i;
  if (backwards) {
    i = bisect_left(a, x, 0, a.length, cmp) - 1;
    if (i == -1)
      i = 0;
  } else {
    i = bisect_right(a, x, 0, a.length, cmp);
    if (i === a.length)
      i = a.length - 1;
  }
  return a[i];
}

if (document.querySelector('body.toc')) {
  var ROWS_QUERY = ".row";
  var LINK_IN_ROW_QUERY = ".pl a:link";
  // A results page
  var rows = document.querySelectorAll(ROWS_QUERY);
  var resultsLinks = [];
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var resultLink = row.querySelector(LINK_IN_ROW_QUERY);
    resultsLinks.push(resultLink);
  }
  var resultsData = resultsLinks.map(function(a) {
    return {url: a.href, title: a.textContent};
  });
  sessionStorage.mostRecentIndexUrl = location.href;
  sessionStorage.mostRecentResults = JSON.stringify(resultsData);
  if (sessionStorage.mostRecentResultUrl) {
    var lastFocusedLink = resultsLinks.filter(function(a) {return a.href === sessionStorage.mostRecentResultUrl;})[0];
    if (lastFocusedLink)
      lastFocusedLink.focus();
  }
  resultsLinks = resultsData = null;

  document.addEventListener("keypress", function(e) {
    var element = e.target;
    var tagName = e.target.tagName.toLowerCase();
    if (tagName === "input" && -1 !== ["checkbox", "radio", "button"].indexOf(e.target.type) ||
        tagName === "textarea") {
      return;  // Don't eat keys e.g. on the search box.
    }
    var key = String.fromCharCode(e.charCode);
    if ("j" === key || "k" === key) {
      var focused = document.activeElement;
      var rows = document.querySelectorAll(ROWS_QUERY);
      var backwards = "k" === key;
      if (0 === rows.length)
        return;
      var row;
      if (document.body === focused) {
        row = rows[0];
      } else {
        row = findNextElementToFocus(rows, focused, backwards);
      }
      var link = row.querySelector(LINK_IN_ROW_QUERY);
      link.focus();
      sessionStorage.mostRecentResultUrl = link.href;
    } else if ("?" == key) {
      if (help == null) help = new Help(true);
      help.toggle();
    } else {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
  }, null);
} else if (document.querySelector('body.posting')) {
  // A detail page
  sessionStorage.mostRecentResultUrl = location.href;
  document.addEventListener("keypress", function(e) {
    var element = e.target;
    var tagName = e.target.tagName.toLowerCase();
    if (tagName === "input" && -1 !== ["checkbox", "radio", "button"].indexOf(e.target.type) ||
        tagName === "textarea") {
      return;  // Don't eat keys e.g. on the search box.
    }
    var key = String.fromCharCode(e.charCode);
    if ("j" === key || "k" === key) {
      var incr = "j" === key ? 1 : -1;  // 1 means older, -1 means newer
      var results;
      if (sessionStorage.mostRecentResults &&
          (results = JSON.parse(sessionStorage.mostRecentResults)) &&
          0 < results.length) {
        var currentIndex = null;
        for (var i = 0; i < results.length; i++) {
          var result = results[i];
          if (result && result.url === location.href) {
            currentIndex = i;
            break;
          }
        }
        if (null != currentIndex) {
          var newResult = results[currentIndex + incr];
          var url = newResult && newResult.url || sessionStorage.mostRecentIndexUrl;
          if (url)
            location.href = url;
        }
      }
    } else if ("u" === key) {
      if (sessionStorage.mostRecentIndexUrl) {
        location.href = sessionStorage.mostRecentIndexUrl;
      }
    } else if ("!" === key) {
      var spamIterator = document.evaluate(
          "//*[@class='flags']//a[normalize-space(.)='spam']", document, null, XPathResult.ANY_TYPE, null);
      var spamLink = spamIterator.iterateNext();
      if (! spamLink) {
        console.error("Craigslist shortcuts: Could not find spam link.");
        return;
      }
      var syntheticClick = document.createEvent("MouseEvent");
      syntheticClick.initMouseEvent(
          "click", true, true, null, null, 0, 0, 0, 0, false, false, false, false, 0, null);
      spamLink.dispatchEvent(syntheticClick);
    } else if ("?" == key) {
      if (help == null) help = new Help(false);
      help.toggle();
    } else {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
  }, false);
}

var help = null;
// constructor
function Help(isIndexPage) {
  var div = this.div = document.createElement("div");
  div.className = "keyboardHelp";
  div.setAttribute("style",
    "background: black; color: white; opacity: .7; z-index: 1002; " +
    "position: fixed; top: 5%; width: 92%; left: 4%; overflow: auto; " +
    "padding: 1em; " +
    "font-family: sans-serif; font-weight: bold;"
  );
  var tableContents = isIndexPage ?
    "<tr><td>j<td>focus on older item\n" +
    "<tr><td>k<td>focus on newer item\n" +
    "<tr><td>?<td>show this help\n"
    :
    "<tr><td>j<td>navigate to older item\n" +
    "<tr><td>k<td>navigate to newer item\n" +
    "<tr><td>!<td>mark as spam\n" +
    "<tr><td>u<td>go back to index\n" +
    "<tr><td>?<td>show this help\n";
  var sourceLink = isFromChromeWebStore ?
    "<a href=\"https://chrome.google.com/webstore/detail/fpkpfjpnegjenkallpheifeejplgfego\">Chrome Web Store</a>\n" :
    "<a href=\"http://userscripts.org/scripts/show/136751\">UserScript</a>\n";
  div.innerHTML =
    "<h1>Keyboard shortcuts</h1>\n" +
    "<a href data-action=close style=\"color:yellow\">Close</a> |\n" +
    sourceLink +
    "<table style=\"color:white; font-weight: bold\">\n" +
    tableContents +
    "</table>";
  Array.prototype.slice.call(div.querySelectorAll("a[data-action='close']")).forEach(function(a) {
    a.addEventListener("click", onClickCloseLink, false);
  });
  div.addEventListener("click", onClickDiv, false);
  var self = this;
  function onClickDocument(e) {
    if (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey  || e.button > 0)
      return;
    self.close();
    e.preventDefault();
    e.stopPropagation();
  }
  function onClickCloseLink(e) {
    if (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey  || e.button > 0)
      return;
    self.close();
    e.preventDefault();
    e.stopPropagation();
  }
  function onClickDiv(e) {
    if (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey  || e.button > 0)
      return;
    // Prevent handling by the document click handler.
    // But don't prevent default on links.
    e.stopPropagation();
  }
  function onKeyDown(e) {
    if (27 === e.keyCode) {
      self.close();
      e.preventDefault();
      e.stopPropagation();
    }
  }
  this.onClickDocument = onClickDocument;
  this.onKeyDown = onKeyDown;
}
Help.prototype.open = function() {
  document.addEventListener("click", this.onClickDocument, false);
  document.addEventListener("keydown", this.onKeyDown, false);
  document.body.appendChild(this.div);
  this.isOpen = true;

  var a = this.div.querySelector("a[data-action='close']");
  if (a != null) a.focus();
};
Help.prototype.close = function() {
  document.removeEventListener("click", this.onClickDocument, false);
  document.removeEventListener("keydown", this.onKeyDown, false);
  document.body.removeChild(this.div);
  this.isOpen = false;
};
Help.prototype.toggle = function() {
  if (this.isOpen) this.close();
  else this.open();
};
