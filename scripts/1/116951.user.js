// ==UserScript==
// @name           Reddit /r/battlefield3 Battlelog links
// @namespace      http://reddit.com
// @description    Enable Battlelog links for username flair
// @include        http://*.reddit.com/r/battlefield3*
// ==/UserScript==

var flair = document.querySelectorAll(".flair");
 
for(var i=0; i < flair.length; i++){ 
  var link = document.createElement("a");
  link.style.color = "inherit";
  link.textContent = flair[i].textContent;
  link.href = "http://battlelog.battlefield.com/bf3/user/" + flair[i].textContent;
  link.target = "_blank";
  flair[i].textContent = "";
  flair[i].appendChild(link);
};