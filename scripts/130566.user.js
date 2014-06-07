// ==UserScript==
// @name           show caoegg content
// @namespace      
// @include        http://www.caoegg.cn/view/*
// @require        http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$("#wrap_info").next().remove();
$("#moreggs").remove();
$("#post_comment").remove();
$("#wrap_right").remove();
$("#header_wrap").remove();
$("#footer_wrap").remove();

$("#menu").html("<input type=text id=menu_code>");
var code = $("#menu > input");

code.keydown(function(event){
	if(event.keyCode==13) {
		window.location.href="http://www.caoegg.cn/view/"+ this.value;
	}
});

document.getElementById("menu_code").focus();