// ==UserScript==
// @name        Mark New Topics As Read
// @namespace   DutchSaint
// @description Marks the new topics in specific boards as read without marking all topics as read.
// @include     http://nolinks.net/boards/search.php?action=show_new*
// @include     http://www.nolinks.net/boards/search.php?action=show_new*
// @version     0.1
// @grant       none
// ==/UserScript==

// VERSION HISTORY
// ---------------
// 0.1 - (20 Feb 2014) Initial version

// Extract the forum id from the URL
var forum_id = document.URL.split("=").reverse()[0];

// Replace misc.php?action=markread with http://nolinks.net/boards/misc.php?action=markforumread&fid=<forum_id>
document.getElementsByClassName("subscribelink")[0].getElementsByTagName("a")[1].href = "misc.php?action=markforumread&fid=" + forum_id;
document.getElementsByClassName("subscribelink")[0].getElementsByTagName("a")[1].text = "Mark this forum as read";