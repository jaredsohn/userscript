// ==UserScript==
// @name           /r/MMA unspoiler
// @namespace      http://userscripts.org/users/sammouse
// @description    blacks out mma results from the subreddit
// @include        http://www.reddit.com/
// @include        http://www.reddit.com/new
// @include        http://www.reddit.com/new/
// @include        http://www.reddit.com/controversial
// @include        http://www.reddit.com/controversial/
// @include        http://www.reddit.com/new/
// @include        http://*.reddit.com/r/all
// @include        http://*.reddit.com/r/all/
// @include        http://*.reddit.com/r/MMA
// @include        http://*.reddit.com/r/MMA/
// @include        http://*.reddit.com/r/MMA/*
// ==/UserScript==
// THANKS GO TO 9JACK9, I DID NOT WRITE THIS AWESOME CODE!! I merely edited it for use with the starcraft and mma subreddit.
GM_addStyle(".unspoiler del { background-color: black; color: black; text-decoration: none; }");
GM_addStyle(".unspoiler del:hover { color: white; }");

var SPOILER1 = /(\s\d\s*[:\-\s]\s*\d(\s|$))/;
var SPOILER2 = /([a-z\d]\s+)(\d)(\s*[:\-]\s*[a-z\d\s]+\s+)(\d)/i;

var redditname = getText(document, "#header .redditname");

var entries = document.querySelectorAll(".entry"), entry;

for (var i = 0; entry = entries[i]; i++) {
  if (redditname === "MMA") {
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
    if (subreddit === "MMA") {
      var title = entry.querySelector("a.title");
      entry.className += " unspoiler";
      title.innerHTML = "<del>" + title.textContent + "</del>";
    }
  }
}
GM_addStyle(".unspoiler del { background-color: black; color: black; text-decoration: none; }");
GM_addStyle(".unspoiler del:hover { color: white; }");
var SPOILER1 = /(\s\d\s*[:\-\s]\s*\d(\s|$))/;
var SPOILER2 = /([a-z\d]\s+)(\d)(\s*[:\-]\s*[a-z\d\s]+\s+)(\d)/i;

var redditname = getText(document, "#header .redditname");

var entries = document.querySelectorAll(".entry"), entry;

for (var i = 0; entry = entries[i]; i++) {
  if (redditname === "MMA") {
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
    if (subreddit === "MMA") {
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