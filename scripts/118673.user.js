// ==UserScript==
// @name           /r/starcraft unspoiler
// @namespace      http://userscripts.org/users/corruptio
// @description    blacks out starcraft results from the subreddit

// @include        http://*.reddit.com
// @include        http://*.reddit.com/*

// ==/UserScript==
// THANKS GO TO 9JACK9, I DID NOT WRITE THIS AWESOME CODE!! I merely edited it for use with the starcraft subreddit.

GM_addStyle(".unspoiler del { background-color: black; color: black; text-decoration: none; text-shadow: none}");
GM_addStyle(".unspoiler del:hover { color: white; }");

//var SPOILER = /\d+\s*[-:\s]\s*\d+/;
var SPOILER = /(^.*(wins|takes\s+out|loses|won|beats|\d+\s*[-:\s]\s*\d+).*$)/i;


var vvv = document.querySelector("#header .user a").innerHTML;
if ( (/^(DwarfPig|brettaburger|gosuprobe|DickSals|iCCupDiamond)$/i).test(vvv) ){
  alert('FUCK YOU');
  return;
}

var redditname = getText(document, "#header .redditname");

var entries = document.querySelectorAll(".entry");

for (var i = 0; entry = entries[i]; i++) {

  if (redditname != "starcraft") {
    var subreddit = getText(entry, ".subreddit");
    if (subreddit != "starcraft") {
      continue;
    }
  }
  var title = entry.querySelector("p.title");
    
  if (!title){
    continue;
  }

  title = title.querySelector("a.title");
    
  var titleText = title.textContent;
  if (SPOILER.test(titleText)) {
    entry.className += " unspoiler ";
    title.innerHTML = "<del> " + title.innerHTML + "</del>";
  }
}

function getText(context, selector) {
  var element = context.querySelector(selector);
  return element ? element.textContent.replace(/^\s+|\s+$/g, "") : "";
};