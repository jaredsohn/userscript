// ==UserScript==
// @name            Hack Forums Add Post Activity to managegroup.php
// @namespace       Snorlax
// @description		Adds a post activity link to every user on managegroup.php
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include			*hackforums.net/managegroup.php?gid=*
// @version         1.0
// ==/UserScript==

$("td[class*='trow'] > a[href*='profile']").each(function(){
	str = $(this).attr("href").replace(/[^0-9]/g, '');
	$(this).after(" - <a href='http://www.hackforums.net/postactivity.php?uid="+str+"' target='_blank'>Post Activity</a>");
});