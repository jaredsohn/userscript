// ==UserScript==
// @name          My Reddit changes
// @namespace url(http://www.w3.org/1999/xhtml);
// @description	  Hides the top bar. Creates a new bar with the subreddit dropdown, All, Random, Friends links. Zebra style on mainpage. Comment Karma.
// @author        josh_bubs
// @include       http://reddit.com/*
// @include       https://reddit.com/*
// @include       http://*.reddit.com/*
// @include       https://*.reddit.com/*
// @run-at document-start
// ==/UserScript==
(function(){
var $ = unsafeWindow.$;
var jQuery = unsafeWindow.jQuery;

$("#header").append("<div id='header-top-right' style='position:absolute;right:0;top:0;padding:4px;background-color:#EFF7FF;-moz-border-radius-bottomleft:7px;text-transform:uppercase;'></div>");
$("#header-top-right").append($(".dropdown.srdrop").clone());
$("#header-top-right").append($(".drop-choices.srdrop").clone());
$("#header-top-right").append("<a id='topbar-extra-all' href='http://www.reddit.com/r/all/'>all</a><span class='separator'>-</span><a href='http://www.reddit.com/r/random/'>random</a><span class='separator'>-</span><a id='topbar-extra-friends' href='http://www.reddit.com/r/friends/'>friends</a>");
if(location.href.indexOf("http://www.reddit.com/r/all/") != -1){ $("#topbar-extra-all").addClass("selected").css("color","orangered"); }
if(location.href.indexOf("http://www.reddit.com/r/friends/") != -1){ $("#topbar-extra-friends").addClass("selected").css("color","orangered"); }
$("#sr-header-area").hide();

$(".odd").css("background-color", "#f0f0f0");
$.getJSON("http://www.reddit.com/user/" + unsafeWindow.reddit["logged"] + "/about.json",
	function(json){
		var karma = $("#header-bottom-right > .user b");
		karma.html(karma.html() + " \u00b7 " + json.data.comment_karma);
	}
);
})()