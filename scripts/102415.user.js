// ==UserScript==
// @name		Dribbble Preview
// @namespace		http://milealabs.com/
// @description		Preview dribbbles without leaving the home or search page
// @homepage		http://milealabs.com/
// @version		0.3.4
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @include		http://dribbble.com/*

// ==/UserScript==

jQuery("body").append('<a title="click to close"><div id="js_preview_container" style="display:none;position:fixed;right:10px;top:169px;z-index:3;"><div id="js_preview" style="padding:10px;background:white;border:1px solid #d5d5d5;"></div><div id="js_preview_shadow" style="background:url(http://dribbble.com/images/dribbble-shadow-lg.png) no-repeat right;width:100%;height:15px;"></div></div></a>');

jQuery(".dribbble, .multi-thumb, .dribbble-img").hover(function(){
	jQuery("#js_preview").load($("a:first", this).attr("href")+" .single-img img", function(){
            jQuery("#js_preview_container").fadeIn();
	});
}, function(){});
	
jQuery("#js_preview_container").live("click", function(){
	jQuery(this).fadeOut("fast", function(){
		jQuery("#js_preview").html('');		
	});
});
	
jQuery("#js_preview img").live("mouseover mouseout", function(event){
	if(event.type=="mouseover")
		jQuery(this).stop().animate({opacity:.6});
	else
		jQuery(this).stop().animate({opacity:1});
});