// ==UserScript==
// @name           lordrt
// @description    Filter out certain forums in the Unread topics page, on the SMF Forum
// @author         lordrt@6v6dota.com
// @require        http://code.jquery.com/jquery-1.4.2.min.js
// @include        http://forum.ghostgraz.com/unread/
// @version        1.0
// ==/UserScript==


// hide rows that contain the name of the subforums you dont like
// cause they spam
// and make it impossible to follow the forum

$("table.table_grid").find("tr").filter(function(index) { 
		return $(this).html().indexOf("Unfair games, unfair players") != -1;
}).css('display', 'none');