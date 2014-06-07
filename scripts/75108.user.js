// ==UserScript==
// @name           /r/soccer unspoiler
// @version        1.1
// @description    Black out soccer results from the soccer subreddit
// @namespace      http://userscripts.org/users/9jack9
// @include        http://www.reddit.com/
// @include        http://www.reddit.com/new
// @include        http://www.reddit.com/new/
// @include        http://www.reddit.com/controversial
// @include        http://www.reddit.com/controversial/
// @include        http://www.reddit.com/new/
// @include        http://*.reddit.com/r/all
// @include        http://*.reddit.com/r/all/
// @include        http://*.reddit.com/r/soccer
// @include        http://*.reddit.com/r/soccer/
// @include        http://*.reddit.com/r/soccer/*
// ==/UserScript==

GM_addStyle(".unspoiler del { background-color: black; color: black; text-decoration: none; }");
GM_addStyle(".unspoiler del:hover { color: white; }");

var SPOILER1 = /(\s\d\s*[:\-\s]\s*\d(\s|$))/;
var SPOILER2 = /([a-z\d]\s+)(\d)(\s*[:\-]\s*[a-z\d\s]+\s+)(\d)/i;

var redditname = getText(document, "#header .redditname");

var entries = document.querySelectorAll(".entry"), entry;

for (var i = 0; entry = entries[i]; i++) {
  if (redditname === "soccer") {
    var title = entry.querySelector("a.title");
    var titleText = title.textContent;
    if (SPOILER1.test(titleText)) {
      entry.className += " unspoiler";
      title.innerHTML = titleText.replace(SPOILER1, "<del>$1</del>");
    } else if (SPOILER2.test(titleText)) {
      entry.className += " unspoiler";
      title.innerHTML = titleText.replace(SPOILER2, "$1<del>$2</del>$3<del>$4</del>");
    }
  } else {
    var subreddit = getText(entry, ".subreddit");
    if (subreddit === "soccer") {
      var title = entry.querySelector("a.title");
      entry.className += " unspoiler";
      title.innerHTML = "<del>" + title.textContent + "</del>";
    }
  }
}

function getText(context, selector) {
  var element = context.querySelector(selector)
  return element ? element.textContent.replace(/^\s+|\s+$/g, "") : "";
};