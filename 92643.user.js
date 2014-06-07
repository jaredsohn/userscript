// ==UserScript==
// @name Download.kanet.ru
// @namespace 
// @version 0.01
// @source 
// @description 
// @include http://download.kanet.ru/*
// ==/UserScript==

//wait for jQuery to be loaded
function waitForJquery(){
	if (typeof unsafeWindow.jQuery == 'undefined') {  
		window.setTimeout(waitForJquery, 100);
	} else {
		$ = unsafeWindow.jQuery;
	    		var $details=$('.post_user_details');
			$details.css("display","none");
			
			
    			var $post=$('div.post');
			$('div.post_msg_text').next().css("display","none");
			$post.find('table:eq(0)').css("width","auto");
  			
   
	}
}
waitForJquery();

