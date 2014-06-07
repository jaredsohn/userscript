// ==UserScript==
// @name           /r/bestof subreddit identifier
// @version        1.0
// @description    Replace "reddit.com" with the subreddit name
// @namespace      http://userscripts.org/users/9jack9
// @include        http://*.reddit.com/r/bestof
// @include        http://*.reddit.com/r/bestof/
// @include        http://*.reddit.com/r/bestof/*
// ==/UserScript==

GM_addStyle(".title .domain .bestof-subreddit { background-color: #eff7ff; color: #369; }");
GM_addStyle(".title .domain .bestof-user-page { background-color: #ffc; color: #000; }");
GM_addStyle(".title .domain .bestof-external { background-color: #ccc; color: #333; font-style: italic; }");

var HOST = "http://www.reddit.com";
var USER = HOST + "/user/";
var R    = HOST + "/r/";

var entries = document.querySelectorAll(".entry"), entry;

for (var i = 0; entry = entries[i]; i++) {
  var title = entry.querySelector("p.title");
  var titleHref = title.querySelector("a.title").href;
  var domain = title.querySelector(".domain");
  var domainLink = document.createElement("a");
  domainLink.href = titleHref;
  if (titleHref.indexOf(R) === 0) {
    var subreddit = titleHref.replace(R, "").replace(/\/.*$/, "");
    domainLink.textContent = subreddit;
    domainLink.className = "bestof-subreddit";
    domainLink.href = R + subreddit;
  } else if (titleHref.indexOf(USER) === 0) {
    domainLink.textContent = "user page";
    domainLink.className = "bestof-user-page";
  } else {
    domainLink.textContent = "external";
    domainLink.className = "bestof-external";
  }
  domain.innerHTML = "";
  domain.appendChild(domainLink);
}
