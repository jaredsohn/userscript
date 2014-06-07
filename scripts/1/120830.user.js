// ==UserScript==
// @name           FB_messages_security
// @namespace      www.amitpatil.me
// @description    This script will stop un authorised access to ur facebook messages
// @include        http://www.facebook.com/* 
// @include        https://www.facebook.com/* 
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

$(document).ready(function(){
	var url = document.location.href;
	//alert(url);
	if(url == "http://www.facebook.com/messages" || url == "https://www.facebook.com/messages"){
		$("<div class='overlay' style='background:black;width:100%;height:100%;position:absolute;top:10px;left:10px;'></div>").appendTo("body");
		auth();
	}
   
	$(".sideNavItem").find(".item").click(function(){
		if($(this).find(".linkWrap").html() == "Messages")
			auth();
	});
	$("#fbMessagesJewel").click(function(e){
		auth();
		e.preventDefault();
	});
});

function auth(){
	if(prompt("If you are *REAL* enter password :") != "aas"){
		$(document).find("#fbMessagesFlyout").css("display","none");
		window.parent.location = "http://www.google.com";
	}
	else{
		$(".overlay").css("width","0px").css("height","0px");
	}
}