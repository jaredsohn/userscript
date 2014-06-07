// ==UserScript==
// @name        doodle.multator.ru Show only your updated threads.
// @namespace   doodle.multator.ru
// @description When you actively submit your doodles the main problem is that you get messy threads list.
// 				This script adds fancy "Mark all viewed" button in the bottom of the page.
// 				Thus you can concentrate on drawing and you will see only updated threads.
// @include     http://doodle.multator.ru/*
// @version     1.0.1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require     https://raw.github.com/andris9/jStorage/master/jstorage.js
// ==/UserScript==



$().ready(function (){
	var roomName = $("div#roomtop a").attr("href");
	roomName = roomName.replace(/\/thread\//, "");

	var hashCode = function(s) {
		var hash = 0,
			i, char;
		if (s.length == 0) return hash;
		for (i = 0, l = s.length; i < l; i++) {
			char = s.charCodeAt(i);
			hash = ((hash << 5) - hash) + char;
			hash |= 0; // Convert to 32bit integer
		}
		return hash;
	};

	var loadedHashes = JSON.parse($.jStorage.get(roomName, "[]"));
	var allHashes = [];

	$("div.thread div.thread_body").each(function() {
		var $this = $(this);
		var hash = hashCode(this.innerHTML);
		if ($.inArray(hash, loadedHashes) != -1) {
			$this.parent().hide();
		}
		allHashes.push(hash);
	});

	var $content = $("div#content");

	$("<button type='button'>Mark all viewed</button>").appendTo($content).click(function(){
		$.jStorage.set(roomName, JSON.stringify(allHashes));
		console.log("Marked all as viewed");
		$("div.thread").hide();
		console.log("size", JSON.stringify(allHashes).length);
		return false;
	});

	$("<button type='button'>Temporarily show all</button>").appendTo($content).click(function(){
		$("div.thread").show();
		return false;
	});

	$content.append("<br/>")
});