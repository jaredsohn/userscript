// ==UserScript==
// @name        Steamgifts - Mark Giveaways
// @namespace   SG
// @description Mark giveaways, that cannot be entered
// @include     http://www.steamgifts.com/*
// @require  	http://code.jquery.com/jquery-1.8.2.min.js
// @version     1
// ==/UserScript==

function write_message(e, m, t){
	var color = '';
	switch(t){
		case 1: color = "color:#8BBA65;";break;
		case 2: color = "color:#E86969;";break;
	}
	var message  = '<span style="' + color + '">' + m + '</span>';
	var title = e.find('.left .title');
		title.children('.new').remove();
		title.prepend(message);	
	e.addClass('fade');
}

$(document).ready(function(){
	var userpoints = $('#navigation ol li:nth-child(3) a.arrow').html();
		userpoints = userpoints.substr(9, userpoints.length-11);
	$('.ajax_gifts').find('.post').each(function(){
		if($(this).hasClass('fade')){
			write_message($(this), 'Already entered: ', 1);
		} else {
			var postpoints = $(this).find('div.title span:last-child').html();
				postpoints = postpoints.substr(1, postpoints.length-3);
			if(parseInt(postpoints) > parseInt(userpoints)){
				write_message($(this), 'Not enough points: ', 2);
			} else {
				var contributor = $(this).find('.contributor_only');
				if(contributor.length > 0){
					if(!contributor.hasClass('green')) write_message($(this), 'Not enough contributed: ', 2);
				}
			}
		}
	});
	$('.fade').on({mouseenter: function(){
			$(this).addClass("over");
		}, mouseleave: function(){
			$(this).removeClass("over");
		}
	});	
});