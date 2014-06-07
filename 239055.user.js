// ==UserScript==
// @name       Show Youtube Channel Names
// @version    1.0
// @description  Shows the Channel names of videos on the youtube subscription page.
// @include     https://www.youtube.com/feed/subscriptions
// @include     http://www.youtube.com/feed/subscriptions
// @copyright  2014, Krafty
// ==/UserScript==

var divs = document.querySelectorAll(".yt-lockup.clearfix");

for (var i = 0; i < divs.length; i += 1) {
  var name = divs[i].getAttribute("data-context-item-user");
  var newHTML         = document.createElement ('li');
  newHTML.innerHTML   = name;
  divs[i].querySelector(".yt-lockup-meta-info").appendChild(newHTML);
}