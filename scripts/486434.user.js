// ==UserScript==
// @name       Mark as read - Wykop Mikroblog
// @namespace  http://www.wykop.pl
// @include http://*.wykop.pl/*
// @version    1.2
// @description  Marking entries as read
// @run-at document-start
// @copyright  2014+, Grizwold
// @require http://code.jquery.com/jquery-1.11.1.min.js
// ==/UserScript==

$(function(){
	var read = function() {
		var _ids = localStorage.getItem('ids');
		if(_ids) {
			return JSON.parse(_ids);
		} else {
			return [];
		}
	};
	
	var write = function(ids) {
		var stringified = JSON.stringify(ids);
		localStorage.setItem('ids', stringified);
	};
	
	var $entries = $('li[data-type=entry]');
	var ids = read();
	
	$.each($entries, function(i, entry) {
		var $entry = $(entry);
		var entryID = $entry.data('id');
		if (ids.indexOf(entryID) > -1) {
			$entry.css({ opacity: 0.3 });
		}
	});
	
	$('li[data-type=entry]')
		.mouseenter(function(event){
			$(event.currentTarget).fadeTo('fast', 1.0);
		})
		.mouseleave(function(event){
			$(event.currentTarget).fadeTo('fast', 0.3);
		})
		.hover(function(event){
			var $el = $(event.currentTarget);
			var dataId = $el.data('id');
			if($.inArray(dataId, ids) === -1){
				ids.push(dataId);
				write(ids);
			}
	});
});