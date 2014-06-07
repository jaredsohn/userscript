// ==UserScript==
// @name       MyAds
// @namespace  http://gm.bungie.co/
// @version    0.3
// @description  MyAds replaces the standalone Bungie.net banner with advertisements throughout the community.
// @require    http://code.jquery.com/jquery-latest.js
// @match      *://*.bungie.net/Forums/createpost.aspx?forumID=*
// @match      *://*.bungie.net/fanclub/*/Forums/createpost.aspx?forumID=*
// @match      *://*.bungie.net/Forums/posts.aspx?postID=*
// @match      *://*.bungie.net/fanclub/*/Forums/posts.aspx?postID=*
// @copyright  (c) 2012 Bungie.co : acnboy34 (Special thanks: ctjl96)
// ==/UserScript==

document.getElementsByClassName('forum_sidebar_banner_ad')[0].innerHTML = '<iframe src="http://gm.bungie.co/scripts/ads/adrotate.php" style="height:650px; width:250px; border-style: none;" scrolling="no" \>';