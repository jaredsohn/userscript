// ==UserScript==
// @name       YouTube Dashboard Tab
// @namespace  http://use.i.E.your.homepage/
// @version    1.0
// @description  Adds a dashboard tab to the YouTube account menu. Idea by TechTubeCentral and Created by Jefferson Scher
// @match      http://*/*
// @copyright  2012 Jefferson Scher & TechTubeCentral
// ==/UserScript==

var tgt = document.querySelector("#masthead-subnav .yt-nav-aside");
if(tgt && tgt.children[0].textContent.indexOf("Inbox") > -1){
  var d = document.createElement("li");
  d.className = "subnav-secondary";
  d.innerHTML = '<a href="http://www.youtube.com/dashboard" class="yt-nav-item">Dashboard</a>';
  tgt.appendChild(d);
}