// ==UserScript==
// @name         Youtube iTunes Subscribe
// @description  Subscribe to a Youtube user or playlist as a podcast in iTunes with RSS Handler (https://code.google.com/p/rsshandler/).
// @version      0.1
// @author       asciithoughts
// @match        *://www.youtube.com/user/*
// @match        *://www.youtube.com/playlist/*
// ==/UserScript==

(function() {

  // Variables
  var id, title, pattern, rsslink;
  var url = document.location.toString();
  var host = "itpc://localhost:8083";
  var options = "?format=22&host=localhost&port=8083&size=25&orderby=published&removeDescription=true";

  // Patterns
  var patterns = [
    { name: "channel",
      regex: /youtube.com\/user\/(\w+)/i,
      rsslink: host + "/user.rss" + options },
    { name: "playlist",
      regex: /youtube.com\/playlist\?list=(\w+)/i,
      rsslink: host + "/playlist" + options }
  ];

  // Create the link
  var link = document.createElement('a');
  link.innerText = "iTunes";
  link.style.position = "fixed";
  link.style.bottom = "10px";
  link.style.right = "10px";
  link.style.padding = "6px 8px";
  link.style.background = "white";
  link.style.border = "2px solid #1b7fcc";
  link.style.borderRadius = "3px";
  link.style.zIndex = "1000";

  // Allow you to customize the link
  link.onclick = function() {
    if (link.href) {
      return true;
    } else {
      title = prompt("Please choose a title", "Youtube : " + title);
      link.href = pattern.rsslink + "&id=" + id + "&title=" + encodeURIComponent(title);
    }
  };

  // Test each pattern for a match
  for (var i = 0; i < patterns.length; i++) {
    pattern = patterns[i];
    if (pattern.regex.test(url)) {
      id = pattern.regex.exec(url)[1];
      document.body.appendChild(link);
      title = document.title.replace(/ - YouTube/i, "");
      return;
    }
  }


})();

// vim: set ft=javascript:
