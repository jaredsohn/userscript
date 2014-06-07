// ==UserScript==
// @name        DobrochanThreadPostCount
// @namespace   daf
// @include     http://dobrochan.*/*/res/*
// ==/UserScript==



$(function() {
	var regexp = /\/(\w+)\/res\/(\d+).?/;
	var result = regexp.exec(location.pathname);
	var board = result[1];
	var threadId = result[2];

	$.getJSON('/api/thread/' + board + '/' + threadId + '.json?new_format', function(data) {
		if(data.result) {
			var postCount = data.result.posts_count;
				$('div.oppost  .message').append('<br>' + postCount + ' posts are omitted');
		}
	});



});