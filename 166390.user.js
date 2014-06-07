// ==UserScript==
// @name        Twitter : hide mentions on website
// @namespace   http://lahaut.info
// @description Twitter : hide mentions on website
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @include     https://twitter.com/*
// @grant     none
// @version     1
// ==/UserScript==
var timeoutMentions;

if (unsafeWindow.jQuery === undefined) {
  // jQuery is NOT loaded
} else {
	$(document).ready(function() {
	
		//Hide mentions button insertion
		mentionButton = $('<button type="button" class="btn" id="mentions_button"><i class="dm-envelope"><span class="dm-new"></span></i></button>');
		mentionButton.css({
			'margin' : '10px 2px',
			'position' : 'relative',
			'top' : '-3px',
			'width' : '30px'
		});
		mentionButton.find('i').css({
			'background-position' : '-28px -529px',
			'height' : '16px',
			'position' : 'relative',
			'top' : '-1px',
			'float' : 'left',
			'margin' : 0
			
		});
		$('#global-actions li.profile').after(mentionButton);
		
		$(document).on('click','#mentions_button',function() {
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
				$('#stream-items-id>li>div[data-is-reply-to="true"]').show();
				clearInterval(timeoutMentions);
			} else {		
				$(this).addClass('active');
				
				timeoutMentions = setInterval(function() {
					$('#stream-items-id>li>div[data-is-reply-to="true"]').hide();
				}, 1000);
			}
		});
		
	});
}