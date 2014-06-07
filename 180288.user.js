// ==UserScript==
// @name        Grooveshark Resizeable Queue
// @namespace   torvin
// @include     http://grooveshark.com/*
// @version     1
// @grant       unsafeWindow
// @description Brings back the good old button for manual queue resizing
// ==/UserScript==
	
const queueIcon = 'data:image/png;base64,' +
'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACx' +
'jwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABp0RVh0' +
'U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAAAfklEQVQ4T7WT0QnAMAhE2/2XygDZyfZC' +
'0g99koC0cBREX85objO7Sp8AUu/dq70xS9RW3ShOALKGEvQIAK6Wy38A1LNidD/oIPQ7L/AcAKdp' +
'CmWA2vDiFhIHuA80RtkNJ81YWKgMQJuH0yEAJmbbGAC7xFXg/99byBJ28TLgAWfJnAPegGRzAAAA' +
'AElFTkSuQmCC';

var interval = setInterval(function() {
	if (!unsafeWindow.jQuery) return;
	
	var $ = unsafeWindow.jQuery;
	if (!$('#queue-menu-btn').length)
		return;
	clearInterval(interval);
	
	$('#queue-menu-btn').after(
		$('<a>').attr('id', 'queue-size').addClass('btn btn-large btn-l-gray btn-icon-only').css({
			'width': '32px',
			'height': '32px',
			'padding': 0,
		}).append(
			$('<i>').css({
				'background-image': 'url("' + queueIcon + '")',
				'left': '8px',
				'top': '8px',
				'margin': 0,
			}).addClass('icon')
		).click(function() {
			var size = $('#main.queue-small').length ? 'm' : 's';
			unsafeWindow.GS.trigger("queue:setSize", size, true, true)
		})
	);
}, 500);
