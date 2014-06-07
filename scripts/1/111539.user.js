// ==UserScript==
// @name           reverse 6park news response list
// @namespace      caoglish
// @include        http://www.6park.com/news/newscom/*
// ==/UserScript==
var $;
// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
			GM_JQUI = document.createElement('script');
            GM_JQUI.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js';
            GM_JQUI.type = 'text/javascript';
            GM_JQUI.async = true;
			GM_Head.insertBefore(GM_JQUI, GM_Head.firstChild);
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
	
//-----------core code for JQ better 6park---------------------
// All your GM code must be inside this function
function letsJQuery() {
	//locate the root post list
	var post_list=$('form table[cellpadding="5"]').not('.dc_bar');
	reversePostList(post_list);
}
//reverse only one level post list	
function reversePostList(post_list){
		//the last table object is not a response, so reverse to last second element.
		for(var i=0;i<post_list.length-1;i++)
			{
				post_list.siblings().first().after(post_list.eq(i));
			}
}