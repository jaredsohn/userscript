// ==UserScript==
// @name           SmallTalkArea
// @namespace      userscripts
// @include        http://*videosift.com/talk
// @include        http://*videosift.com/talk?pg*
// @include        http://blog.videosift.com/
// @include        http://blog.videosift.com/?pg*
// @require       http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

//	Style adjustments

$("hr").removeClass("margb").css("margin","0");
$("#content_left").css("padding","0");
bgcol = $("#content_right").css("background-color");
$(".postcontainer:odd").css({"background-color":bgcol});
$(".postcontainer").css("padding","8px");

$(".post").children(".talk-body").hide();
$(".sidebar_text").children("#cont_flags, .content").hide();
$(".post").children(".title").prepend('<a href="#" class="expandPost">&#9656;</a>');
$(".post").children(".title").children(".expandPost").click(function() {

	if ($(this).parents(".post").children(".talk-body").is(":visible")) {
		
		$(this).parents(".post").children(".talk-body").hide();
		$(this).parents(".postcontainer").find(".sidebar_text").children("#cont_flags, .content").hide();
		$(this).html("&#9656;");
			
	} else {
	
		$(this).parents(".post").children(".talk-body").show();
		$(this).parents(".postcontainer").find(".sidebar_text").children("#cont_flags, .content").show();
		$(this).html("&#9662;");
		
	}
	return false;

});