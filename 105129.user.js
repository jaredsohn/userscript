// ==UserScript==
// @name		What.cd sticky hider
// @description	Hides sticky topics in forums
// @include		http*://*what.cd/forums.php?action=viewforum&forumid=*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

$('[class$="sticky"]').parent().hide();
$('.linkbox').eq(0).append('[<a href="#" id="sticky_toggler">Stickies</a>]');
$('#sticky_toggler').click(function(){$('[class$="sticky"]').parent().toggle();});
