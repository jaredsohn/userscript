// ==UserScript==
// @name          Google Code: Home Page
// @namespace     http://almaer.com/firefox/userscripts/
// @description   Add a link to my projects
// @include       http://code.google.com/
// ==/UserScript==

// Capture the keystroke
window.addEventListener("load", function(e) {
  var title = document.getElementById("title");
  var myprojects = document.createElement("div");
  myprojects.innerHTML = '<div style="padding: 2px 6px; float: right; font-size: large; font-weight: bold;"><a href="http://code.google.com/u/dalmaer/" style="text-decoration: none; color: rgb(187, 73, 0);" title="Go to your open source projects on Google Code">My Projects</a></div>';

  title.parentNode.insertBefore(myprojects, title);
}, true);
