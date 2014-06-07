// ==UserScript==

// @name           Reddit Formula1 unspoiler

// @version        1.0

// @description    Black out spoilers from the formula1 subreddit (ALL credit to http://userscripts.org/users/9jack9 and the /r/soccer unspoiler)

// @namespace      http://userscripts.org/users/CmdrSammo

// @include        http://www.reddit.com/

// @include        http://www.reddit.com/new

// @include        http://www.reddit.com/new/

// @include        http://www.reddit.com/controversial

// @include        http://www.reddit.com/controversial/

// @include        http://www.reddit.com/new/

// @include        http://*.reddit.com/r/all

// @include        http://*.reddit.com/r/all/

// @include        http://*.reddit.com/r/formula1

// @include        http://*.reddit.com/r/formula1/

// @include        http://*.reddit.com/r/formula1/*

// ==/UserScript==



GM_addStyle(".unspoiler del { background-color: black; color: black; text-decoration: none; }");

GM_addStyle(".unspoiler del:hover { color: white; }");



//var SPOILER1 = /(\[\s*[Ss][Pp][Oo][Ii][Ll][Ee][Rr]\s*\]\s*)/;

var SPOILER1 = /(.*[.*[Ss][Pp][Oo][Ii][Ll][Ee][Rr].*].*)/;



var redditname = getText(document, "#header .redditname");



var entries = document.querySelectorAll(".entry"), entry;



for (var i = 0; entry = entries[i]; i++) {

  if (redditname === "formula1") {

    var title = entry.querySelector("a.title");

    var titleText = title.textContent;

    if (SPOILER1.test(titleText)) {

      entry.className += " unspoiler";

      title.innerHTML = titleText.replace(SPOILER1, "<del>$1</del>");

    } 

  } else {

    var subreddit = getText(entry, ".subreddit");

    if (subreddit === "formula1") {

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