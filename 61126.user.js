// ==UserScript==
// @name           Assembla Comments
// @namespace      http://werul.com/
// @description    Makes Comments more visible on tickets
// @include        https://*.assembla.com/spaces/*/tickets/*
// ==/UserScript==

	if (document.getElementById('werul_jquery') == null) {
		var script = document.createElement('script');
		script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
		script.type = 'text/javascript';
		script.id = 'werul_jquery';
		document.getElementsByTagName('head')[0].appendChild(script);
	}
	
	function GM_wait() {
        if(unsafeWindow.jQuery == null) { window.setTimeout(GM_wait,100); }
    else { 
			jQuery = unsafeWindow['jQuery'];
			jQuery.noConflict();
			(function($) { 
			  $(function() {
				jqAssemblaComments($);
			  });
			})(jQuery);					
		}
    }
    GM_wait();
	
	var scrollToComment = document.createElement('script');
    scrollToComment.type = 'text/javascript';
	scrollToComment.innerHTML = 'function scrollToComment(){ var theElement = document.getElementById("ticket_user_comment");  theElement.focus(); var selectedPosX = 0; var selectedPosY = 0; while(theElement != null){	selectedPosX += theElement.offsetLeft; selectedPosY += theElement.offsetTop; theElement = theElement.offsetParent;}	window.scrollTo(selectedPosX,selectedPosY);}';
    
	document.getElementsByTagName('head')[0].appendChild(scrollToComment);

	
// All your GM code must be inside this function
    function jqAssemblaComments($) {
		var comments =  $('div.comment:not(div.description)').filter(function() {
			if ($(this).children().length <=  0) { return false; }
			if ($(this).children('p').filter(function() { return $(this).children('a').length == 0; }).length == 0) {
				return false;
			}
			
			return true;
		});
		
		if (comments.length > 0) {
		
			$('div#ticket-edit').after($('<div id="GSComments" style="margin-bottom:20px;"></div>'));
			
			$('div#GSComments').append($('<div><div><h1>Comments</h1></div></div>'));
			
			$('div#GSComments').append($('<div class="content" style="border: 1px solid #D4DCE8; padding: 20px;"></div>'));
			
			$('div#GSComments').children('.content').append($('<ul></ul>'));
												 
			
			comments.each(function() {
				$('div#GSComments').children('.content').children('ul').append($(this).parent().clone());
			});
			$('div#GSComments').children('.content').append('<br /><a onclick="scrollToComment(); return false;" href="#">Add Comment</a>');
			$('div#GSComments').find('li').css('padding', '10px 0px 10px 0px');
		
		}
    }