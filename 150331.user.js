// ==UserScript==
// @name        Grepolis Forum Tools by BLeg
// @namespace   bleg.grepolis.forum
// @description Tweaks the Grepolis forum to allow post sorting by most recent, and original post dates.
// @include     http://us*.grepolis.com/*
// @include     http://*.grepolis.*
// @version     1.0
// ==/UserScript==


String.prototype.splice = function( idx, rem, s ) {
		return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};
	
	String.prototype.reduceWhiteSpace = function() {
		return this.replace(/\s+/g, ' ');
};


$('body').bind('DOMNodeInserted', function(event) {
	//This means the forum has been popped up.
	
	if ($(event.target).attr('id') == 'content' && $(event.target).attr('class') == 'forum_content') {
		var sortByRecent = '<a style="float: right;" class="button mostRecent" href="#">\
						<span class="left">\
							<span class="right">\
								<span class="middle">Sort by last post</span>\
							</span>\
						</span>\
					   </a>';
					   
		
		var sortByOriginal = '<a style="float: right;" class="button originalDate" href="#">\
						<span class="left">\
							<span class="right">\
								<span class="middle">Sort by creation date</span>\
							</span>\
						</span>\
					   </a>';
					   
		$('#forum_buttons').append(sortByRecent);
		$('#forum_buttons').append(sortByOriginal);
		
		$('a.mostRecent').click(function(){
			doSort('.lastpost');
			$(this).css({
				'border-bottom': '2px solid red',
				'padding-bottom': '2px'
			});
			$('a.originalDate').css({
				'border': 'none',
				'padding-bottom': '0'
			});
		});
		
		$('a.originalDate').click(function(){
			doSort('.title_author_wrapper');
			$(this).css({
				'border-bottom': '2px solid red',
				'padding-bottom': '2px'
			});
			$('a.mostRecent').css({
				'border': 'none',
				'padding-bottom': '0'
			});
		});
		
		$('a.mostRecent').trigger('click');
		
	} //If statement
	
    
});

function doSort(selector) {
		var sorted = [];
		$('.threadlist_container ul#threadlist li ' + selector + ' .date.small').each(function() {
			
			var thread = new Object();
			var dateStamp = $(this).text().reduceWhiteSpace().splice(11,1,'T');
			
			dateStamp = dateStamp.substring(1, dateStamp.length - 1);
			
			thread['date'] = new Date(dateStamp);
			thread['listItem'] = $(this).parents('li');
						
			sorted.push(thread);
		});
		sorted.sort(createComparator('date'));
		$('ul#threadlist').html('');
		for (var i=0;i<sorted.length;i++) {
			$('ul#threadlist').append(sorted[i].listItem);
		}
}


function createComparator(property) {
    return function(a, b) {
        return b[property] - a[property];
    };
}