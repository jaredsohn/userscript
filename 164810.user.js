// ==UserScript==
// @name        VelouostasSpring
// @namespace   VelouostasSpring
// @include     http://www.velouostas.lt/forumas/*
// @version     1
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==


$(document).ready(function() {

	$("body").css("background-image","none");
	$("body").css("background-color","#71a7e5");
	$("body").css("background-image","url('http://i.imgur.com/HOnk1WX.png')");
	$("body").css("background-position","bottom left");
	$("body").css("background-repeat","repeat-x");
	$("body").css("background-attachment","fixed");

	//#menubar - viršutinis meniu

	$("#menubar").css("background-image","none");
	$("#menubar").css("background-color","#B8AB9C");
	//.cat
	$(".cat").css("background-image","none");
	$(".cat").css("background-color","#B8AB9C");
	$(".forumlink, h2 a").css("font-family","Myriad Pro");


	//th
	$("th").css("background-image","none");
	$("th").css("background-color","#71a7e5");

	

	//#wrapcentre
	$("#wrapcentre, #wrapheader, #wrapfooter").css("border-left","3px solid #71a7e5");
	$("#wrapcentre, #wrapheader, #wrapfooter").css("border-right","3px solid #71a7e5");

	//header
	$("#logodesc").css("border-bottom","0");
	$("#logodesc a img").attr('src',"http://i.imgur.com/CvYwdFz.jpg");
		$("#logodesc a img").attr('height',"100");


	//a
	$("a").css("color","#0c2f57");
	$("a").hover(function () {
		$(this).css("color","#85AD9D");
	},function() {
		$("a").css("color","#0c2f57");
	});

	//Redaguojam forumo aktyvumo logo
	$(".row1 img").each(function () {
		if($(this).attr('src')=="./styles/xandgrey/imageset/forum_read.gif" ) {
			$(this).attr('height',"40");
			$(this).attr('width',"40");
			$(this).attr('src',"http://i.imgur.com/NJEY3g2.gif");
		}
		if($(this).attr('src')=="./styles/xandgrey/imageset/forum_unread.gif") {
			$(this).attr('height',"40");
			$(this).attr('width',"40");
			$(this).attr('src',"http://i.imgur.com/gXMkQIm.gif");
		}
		if($(this).attr('src')=="./styles/xandgrey/imageset/topic_read_hot_mine.gif") {
			$(this).attr('height',"40");
			$(this).attr('width',"40");
			$(this).css('margin-left',"4px");
			$(this).attr('src',"http://i.imgur.com/I9ntqC5.gif");
		}
		if($(this).attr('src')=="./styles/xandgrey/imageset/topic_read.gif") {
			$(this).attr('height',"40");
			$(this).attr('width',"40");
			$(this).css('margin-left',"4px");
			$(this).attr('src',"http://i.imgur.com/NJEY3g2.gif");
		}
		if($(this).attr('src')=="./styles/xandgrey/imageset/topic_read_hot.gif") {
			$(this).attr('height',"40");
			$(this).attr('width',"40");
			$(this).css('margin-left',"4px");
			$(this).attr('src',"http://i.imgur.com/lojOIix.gif");
		}
		if($(this).attr('src')=="./styles/xandgrey/imageset/topic_read_mine.gif") {
			$(this).attr('height',"40");
			$(this).attr('width',"40");
			$(this).css('margin-left',"4px");
			$(this).attr('src',"http://i.imgur.com/zfiCTlT.gif");
		}
		if($(this).attr('src')=="./styles/xandgrey/imageset/topic_unread_mine.gif") {
			$(this).attr('height',"40");
			$(this).attr('width',"40");
			$(this).css('margin-left',"4px");
			$(this).attr('src',"http://i.imgur.com/RCgY0Sv.gif");
		}
		if($(this).attr('src')=="./styles/xandgrey/imageset/topic_unread_hot_mine.gif") {
			$(this).attr('height',"40");
			$(this).attr('width',"40");
			$(this).css('margin-left',"4px");
			$(this).attr('src',"http://i.imgur.com/geYZmDs.gif");
		}

		
	});

});