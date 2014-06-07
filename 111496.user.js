// ==UserScript==
// @name           Reversed 6park Reponse List 
// @namespace      caoglish
// @include        http://*.6park.com/*.html
// @include        http://*.6park.com/*.html#postfp
// @include        http://*.6park.com/*.pl
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
			//displayJQVersion();//Jquery version display. remove after development
			//debug_area();//debug displaying area, remove after development.
            letsJQuery();
			
        }
    }
	//--------------debug purpose code----------------------
	function displayJQVersion(){
		$('body').append('<div id="jq">Jquery:'+$().jquery+'</div>');
		$('#jq').css('position','fixed')
			.css('top','0px')
			.css('color','white')
			.css('background','black')
			.css('opacity','0.5')
			.css('left','10px');
	}
	
	function debug_area(){
		$('body').append('<div id="debug">debug:</div>');
		$('#debug').css('position','fixed')
			.css('bottom','0px')
			.css('color','white')
			.css('font-size','2')
			
			.css('background','black')
			.css('opacity','0.5')
			.css('left','10px');
	}
	
//display information in debug area, remove after development.
function debug(value){
	$('#debug').append('<div>'+value+'</div>');
}
//--------------debug purpose code---------------------
//-----------------------------------------------------	
	
//-----------core code for JQ better 6park---------------------
// All your GM code must be inside this function
function letsJQuery() {
	//locate the root post list
	var post_list_root=$('a[name=followups] ~ ul > li');
	//reverse whole post list
	reverseWholePostList(post_list_root);
}
	
//reverse only whole post list,this is recursive function
function reverseWholePostList(post_list_root){
	var post_list=post_list_root;
	
	for(var i=post_list.length-1;i>=0;i--)
	{
		if(post_list.eq(i).children('ul').children().length>0)
		{
			post_list_next_level=post_list.eq(i).children('ul').children();
			reverseWholePostList(post_list_next_level);
		}	
	}
	reversePostList(post_list);
}

//reverse only one level post list	
function reversePostList(post_list){
		for(var i=post_list.length-1;i>=0;i--)
			{
				post_list.parent().append(post_list.eq(i));
			}
}