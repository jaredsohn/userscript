// ==UserScript==
// @name           Wall Expand
// @description    Expand wall as in v3
// @include http://wallbase.cc/wallpaper/*
// ==/UserScript==

var hei= $(".bar-right").height();
$("body").css({"overflow":"visible"});
$(".content").css({"height": "auto", "overflow":"visible"});
$(".wrap").css({"padding-top" : hei});

$(".content").click(function() {
	if($(this).hasClass("kinetic-active")){
		$(this).css({"cursor":"default"});
	}
});
