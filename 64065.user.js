// ==UserScript==
// @name           GLB Remove Reported Posts Tab
// @namespace      GLB
// @include        http://goallineblitz.com/game/forum_thread_list.pl*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://jquery-ui.googlecode.com/svn/tags/latest/ui/ui.core.js
// ==/UserScript==

$(document).ready(function(){

	$('a[href="/game/forum_reported_posts.pl"]').parent().hide();
})
