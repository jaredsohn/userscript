// ==UserScript==
// @name           QuickView (Fazed)
// @namespace      Fazed
// @include      http://fazed.net/forum/*
// @include	 http://fazed.org/forum/*
// @include 	 http://skill.org/forum/*
// @icon         http://fazed.org/common/images/logo.gif

// @description  A personalized adaptation for Fazed forums of Quickview script tutorial by http://www.hieu.co.uk/blog/index.php/2009/03/29/linkimages-preview-with-greasemonkey-and-jquery/ . The original carried the jquery library in the code, and was quite bland IMHO. This version will check if jquery is alredy loaded , if not, fetch it from google. USAGE: hold ctrl key + alt key and click a link. Image, website, whatever, will be displayed in jquery window. Especially useful for redlinks. Click "close" to close window or press escape key. 

//Lets start by getting rid of all that jquery code...

// @require 
http://ajax.googleapis.com/ajax/libs/jqueryui/1.5.2/jquery-ui.min.js 
// ==/UserScript==

var $;

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

    function letsJQuery() {
        //alert($); // check if the dollar (jquery) function works
        //alert($().jquery); // check jQuery version
	
        
				function GMLinkClick(event)
{
	var link = event.target.href;
	if(!link)
	{
		link = $(event.target).parent().get(0).href;
	}
	$("body").append("<div id='QuickView'>");
	$("#QuickView").hide();
	$("#QuickView").css("top", 	event.pageY + "px");
	$("#QuickView").css("left",	event.pageX + "px" );
	$("#QuickView").css("width",	"600px" );					
	$("#QuickView").css("height",	"600px" );					
	$("#QuickView").css("position",	"absolute" );					
	$("#QuickView").css("background",	"#7d93b5" );					
	$("#QuickView").css("border",	"1px #335577" );					
	$("#QuickView").css("padding",	"2px" );					
	$("#QuickView").css("z-index",	"9999" );
	$("#QuickView").append("<div><a id='closequickview' href='#'>Close</a></div>");
	$("#QuickView").append("<iframe frameborder='0' width='598px' height='580px' src='"+link+"' ></iframe>");
	$("#QuickView").show(100);
	$("#closequickview").click(function(event){
			event.preventDefault();
			$("#QuickView").hide(100, function(){$("#QuickView").remove();});				
	});					
}
$(window).load(function()
{
	$("a").click(function(event){
		if(event.ctrlKey && event.altKey && event.button ==0)
		{
			event.preventDefault();
			GMLinkClick(event);
		}
	});
	$(document).keyup(function(event){
		if(event.keyCode==27)
		{
			event.preventDefault();
			$("#QuickView").hide(200, function(){$("#QuickView").remove();});				
		};				
	});
});

 }

