// ==UserScript==
// @name          Pantip Image Attachment Disabler
// @namespace  pantipImageAttachmentDisabler
// @description  	Disable image attachment in www.pantip.com/cafe
// @include        http://*.pantip.com/cafe/*
// @author			Rabin Panichnok
// @facebook		www.facebook.com/rabin.panichnok
// @website		www.tkb-colo.com
// @version			1.0
// @date				28 November 2011
// ==/UserScript==

var $;
var strUserID = ['000000','000001'];

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
        var replyID = $('html body div ul ul a div p table tbody tr td table tbody tr td table tbody tr td table tbody tr td font');
        var userID = $('html body div ul ul a div p table tbody tr td table tbody tr td table tbody tr td p table tbody tr td font a');
        var imgLoc = $('html body div ul ul a div p table tbody tr td table tbody tr td table tbody tr td center');
        
        
        $.each(userID, function(key, value){
        	$.each(strUserID, function(key1, value1){
        		if ($(value).attr('href') == "javascript:openProfileWindow('" + value1 + "')")
        		{
        			$(value).parent().parent().parent().parent().parent().parent().parent().find('center').hide();
        		}	
        	});
        });
        
//        $.each(replyID, function(key, value){
//			if ($(value).attr('color') == '#C0C080')
//			{
//				var strText = $(value).text();
//				var arrText = strText.split(" ");
//				//$(value).hide();
//				//alert(arrText[2]);
//			} 
//		 });
    }