// ==UserScript==
// @name        DisplayFeeds
// @namespace   http://www.userscripts.org
// @description display all feeds in the head section
// @version     1.0
// @date        2011-05-24
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var feeds = new Array();

$.each($("link[type='application/rss+xml']"), function(index, value) {
  feeds[index] = value.href;
})

if (feeds.length > 0) {
  $("body").prepend('<textarea rows="10" cols="100">' + feeds.join("\r\n") + '</textarea>');
}
