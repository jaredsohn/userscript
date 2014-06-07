// ==UserScript==
// @name AppTrackr cleaner
// @description AppTrackr.org cleaner
// @include	http://apptrackr.org/
// @include	http://www.apptrackr.org/
// @require	http://static.apptrackr.org/web_en/js/jquery.js
// ==/UserScript==

var set = GM_getValue("hide");

var stuff = $(".footer").add(".postit_info").add(".nav2").add(".nav3");

$(".nav1 .right").prepend('<span><a href="#" id="ShowStuff">Show stuff</a><a href="#" id="HideStuff">Hide stuff</a></span>');
$(".nav1 .right span a").css({"color":"#4B9EE3","position":"relative","top":"-8px","right":"14px","text-shadow":"1px 1px 3px rgba(255, 255, 255, 0.5)","display":"none"});

if ( set == 1 ) {
	stuff.hide();
	$(".nav1").css({"height":"58px"});
	$("#ShowStuff").show();
} else {
	$("#HideStuff").show();
};

$("#ShowStuff").click(function () {
		stuff.show();
		$('#ShowStuff').hide();
		$('#HideStuff').show();
		$(".nav1").css({"height":"60px"});
		GM_deleteValue("hide");
		return false;
	});
	
$("#HideStuff").click(function () {
		stuff.hide();
		$('#HideStuff').hide();
		$('#ShowStuff').show();
		$(".nav1").css({"height":"58px"});
		GM_setValue("hide", "1");
		return false;
	});