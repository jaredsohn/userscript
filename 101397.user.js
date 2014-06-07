// ==UserScript==
// @name		Yah's Cavern Skin Navy
// @include		http://*.thecavernforum.com/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
//
// version		0.002 17 Apr 2011
// ==/UserScript==

// Purpose: Tweak the cavernforum look and feel.

// Code
var main = function(browser){
	this.start = function(){
		
		var skin = "";
		var skin = $("#newSkin option[selected='selected']").html();
		
		alert(skin);
		
		GM_log("start()");
		//GM_log("jQuery version: " + $().jquery);

		// Outer margins and borders
		$("#corner").css("margin","0");
		$("#corner").css("width","99.8%");

		// Top user info
		$("#user_navigation").css("width","235px");
		$("#user_navigation .photo").remove();	//Remove user avatar
		//$("#user_navigation p").remove();

		// Author info (Left Column)
		$(".author_info").css("width","150px");
		$(".author_info").css("margin","15px, 0px, 10px, 0");
		$(".author_info").css("border-right","1px solid #A3AEB5");
		$(".post_body").css("margin-left","160px");
		$(".post_wrap").css("background","url('null')");
	
		$(".author_info ul.user_fields li span.ft").css("padding","0");		//Fix 
		$(".author_info ul.user_fields li img").css("height","32px");
		
		// Signature
		$(".signature img").css("max-height","75px");
		//.author_info ul.user_fields li
		
		
		//$("marquee").remove();
	/*
		$("* .advertisement").remove();							//del advertisements
		
		$("#firehose-message-tray").remove();					//del message-tray at top
		
		$("#content").css("padding","0");
		$("#slashboxes, #slashboxes-mq").css("padding","0");
		$(".col_1").css("margin","0");
		$("*").css("margin-bottom","0");
	
		$("#slashboxes,section").css("padding","0");
		
		$("h2").css("padding","4px");
		$("li").css("padding","1px");
		
		$("div[class='synd']").remove();						//del social bookmark links
	*/
	
	
	}
}
var ysf = new main("GM");
var start = ysf.start();