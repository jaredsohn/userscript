// ==UserScript==
// @name           Invite Facebook Friends
// @namespace      http://www.justhow2.com	
// @description    Allows you to invite everybody on Facebook with one click
// @version        1.0
// @date           2010-09-11
// @include        http://www.facebook.com/*
// @include        http://facebook.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js

// ==/UserScript==


$(function() {
	if (!$('#fb_multi_friend_selector').length) {
		return false;
	}
	
	var invertScript = 'var friends=fs.get_matching_friends();if(friends.length<=fs.max){for(var i=0;i<friends.length;i++){var uid=friends[i];if(!fs.disabled_ids[uid]){if(!fs.selected_ids[uid]){fs.select(uid);}else{fs.unselect(uid);}}}}fs.update_boxes();';
	
	$('<div> <input class="inputbutton" onclick="fs.select_all()" type="button" value="Select All" /> <input class="inputbutton" onclick="fs.unselect_all()" type="button" value="Select None" /> <input onclick="'+ invertScript +'" class="inputbutton" type="button" value="Invert Selection" /></div>')
		.css('padding-bottom','5px')
		.insertBefore('div.#filters');
});

