// ==UserScript==
// @name        Random Story
// @namespace   Selbi
// @include     http*://*fimfiction.net/*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==


//GM_deleteValue("storycount");
var numberofstories = GM_getValue("storycount");
var randomstory = 0;
if (numberofstories == undefined) numberofstories = "Click!";
randomstory = Math.floor(numberofstories * Math.random());

$(".inner:first a:last").after('<div class="user_drop_down_menu"><a href="/story/' + randomstory + '" id="randomstoryButton" class="button"><i class="fa fa-book"></i><span>Random Story</span></a><div class="menu_list"><a href="#" id="refreshstorycountButton" onclick="updateStoryCount();return false;" class="button"><i class="fa fa-refresh"></i><span>Refresh (' + numberofstories + ')</span></a></div></div>');

unsafeWindow.updateStoryCount = function() {
	$.get("//www.fimfiction.net/stories/latest", function(source) {
		numberofstories = $(".views:first", source).attr("data-story");
		GM_setValue("storycount", numberofstories);
		$("#refreshstorycountButton").html('<i class="fa fa-refresh"></i><span>Refresh (' + numberofstories + ')</span>');
		randomstory = Math.floor(numberofstories * Math.random());
		$("#randomstoryButton").attr("href", '/story/' + randomstory);
	});
}