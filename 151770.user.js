// ==UserScript==

// @name          Rate Your Music - Delete Distractions
// @description   A script that removes the unimportant stuff on Rate Your Music.
// @include       http://www.rateyourmusic.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

/*
$("ul.tabmenu").append('<li><a id="hideSidebar" href="javascript:void(0);">show sidebar</a></li>');
$(".side").css("display", "none");
$(".side .spacer").css("display", "none");

$("#hideSidebar").click(function() {
	if ($(".side").css("display") == "none") {
		$(".side").css("display", "block");
		$(".side .spacer").css("display", "block");
		$("#hideSidebar").text("hide sidebar");
	}
	else if ($(".side").css("display") == "block") {
		$(".side").css("display", "none");
		$(".side .spacer").css("display", "none");
		$("#hideSidebar").text("show sidebar");
	}
});
*/
$("div.profile:contains(' issues')").css("display", "none");
$("table.mbgen:contains('Add an issue')").parent().css("display", "none");
