// ==UserScript==
// @name           Go to Community Forums
// @namespace      http://www.bungie.net/
// @include        http://*.bungie.net/Forums/topics.aspx?forumID=*
// @exclude        http://*.bungie.net/Forums/topics.aspx?forumID=3
// @description    ALLOWS YOU TO ONLY GO TO THE BUNGIE.NET COMMUNITY FORUM, NO OTHER FORUMS ALLOWED (JOKE SCRIPT)
// ==/UserScript==

// ALLOWS YOU TO ONLY GO TO THE BUNGIE.NET COMMUNITY FORUM, NO OTHER FORUMS ALLOWED
alert('YOU MAY ONLY ACCESS THE BUNGIE COMMUNITY FORUM')
window.parent.location.href = 'http://www.bungie.net/Forums/topics.aspx?forumID=3';
