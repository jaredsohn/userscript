// ==UserScript==
// @name       Larger Text area - HF
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful

// @include http://www.hackforums.net/newreply.php?tid=*
// @include http://www.hackforums.net/newthread.php?fid=*
// @include http://www.hackforums.net/private.php?action=send*

// @include http://hackforums.net/newreply.php?tid=*
// @include http://hackforums.net/newthread.php?fid=*
// @include http://hackforums.net/private.php?action=send*

// @require https://ajax.googleapis.com/ajax/libs/jquery/1.10.0/jquery.min.js

// @copyright  2012+, You
// ==/UserScript==

jQuery(function(){
    
	$(".messageEditor").css("width", "1200px").css("height", "500px");
    $("#message_new").css("width", "1195px").css("height", "430px");
    $("#editor_toolbar_insertables").css("float", "left");
});