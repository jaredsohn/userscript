// ==UserScript==
// @name           Facebook Minichat
// @namespace      ParusaDev
// @description    Only show online contacts in the facebook sidebar
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// ==/UserScript==

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

// All your GM code must be inside this function
    function letsJQuery() {
		setInterval(mainLoop,2000);
    }
	
// Main loop function
	function mainLoop() {
		hideOffline();
		var newHeight = calculateChatHeight() + 10;
		resizeChatBody(newHeight.toString() + 'px');
		resizeSideBar((newHeight + 25).toString() + 'px');
		relocateChatBar();
		restyleChatBar();
	}
	
// Hide offline friends
	function hideOffline() {
		$('.fbChatOrderedList').children().each(function(){
			if($(this).hasClass('item')	)
			{
				if($(this).hasClass('active') || $(this).hasClass('idle')	)
				{
					$(this).show();
				}
				else
				{
					$(this).hide();
				}
			}
		})	
	}
	
// Calculate the new size of the chat list
	function calculateChatHeight() {
		var countFriends = 0;
		$.each($('.fbChatOrderedList').children('li.active,li.idle'),function(){countFriends += $(this).height();});
		if($('.inputsearch').is(':focus')) { return 500; }
		else {	return countFriends; }
	}
	
// Resize chat body
	function resizeChatBody(newHeight) {
		$('.fbChatSidebarBody').css({'min-height' : newHeight, 'max-height' : '300px'});
	}
	
// Resize sidebar
	function resizeSideBar(newHeight) {
		$('.fbChatSidebar').css({'min-height' : newHeight, 'max-height' : '325px'});
	}
	
// Relocate chatbar
	function relocateChatBar() {
		var windowHeight = $(window).height();
		var chatHeight = $('.fbChatSidebar').height();
		$('.fbChatSidebar').css('top',windowHeight - chatHeight);
	}
	
// Restyle chatbar
	function restyleChatBar() {
		$('.fbChatSidebarBody').css({'border-top-style' : 'solid','border-top-width' : '1px','border-top-color' : '#999999'});
	}