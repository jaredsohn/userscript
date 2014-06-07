// ==UserScript==
// @name            Reddit Image Hover Zoom
// @namespace       https://userscripts.org/users/48436
// @description     Enlarge Hovered Images script
// @include         http://www.reddit.com/*
// @require 		https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_registerMenuCommand
// @grant           GM_log
// ==/UserScript==
try {
    var loading_gif =       "http://i.imgur.com/vSBeLww.gif";
    var css_overrides =     false;
    var img =               $('<img>').attr('src', loading_gif).attr('id', 'hover-popup');
    var static_parent =     $('#siteTable');
    var thumb_selector =    'a.thumbnail';
    
    //toggle displaying NSFW popups
    function toggleSFW() {
		if (GM_getValue('nsfw')) {
			GM_setValue('nsfw', false);
			alert("NSFW popups disabled");
		} else {
			GM_setValue('nsfw', true);	
			alert("NSFW popups enabled");
		}
	}
	
	//get the image source for known providers
	function getSrc(src) {
		src = src.trim();
		var imgur = new RegExp(/^http:\/\/(?:i\.)?imgur\.com\/(\w+)$/i);
		src = src.replace(imgur, "http://i.imgur.com/$1.png");
		var qkme = new RegExp(/^http:\/\/qkme\.me\/(\w+)$/i);
		src = src.replace(imgur, "http://i.qkme.me/$1.jpg");
		return src;
	}
	
	//show the popup       
	function showImage(e) {
	   img.attr('src', loading_gif);
	   var target = $(e.target);
	   if (target.hasClass('nsfw') && !GM_getValue('nsfw')) {
	       return;
	   }
	   //delay over riding CSS values until now to prevent RES from overwriting them
	   if (!css_overrides) {
	       $('.titlebox').children().css('z-index', 9999);
	       $('.side form#search').css('z-index', 9999);
	       css_overrides = true;
	   }
	   var loc = getSrc(this.href);
	   img.attr('src', loc);
	   img.css('display','block');
	}
	
    //hide the popup
	function hideImage(e) {
	   img.css('display','none');
	}
    
    //create the popup placeholder and attach to page
	img.css('position','fixed').css('top',5).css('right',5).css('z-index', 9999).css('max-height', window.innerHeight-35 + 'px');
	img.css('max-width', window.innerWidth-50+'px' ).css('box-shadow', '-10px 10px 10px #777').css('display', 'none');
	$("body").append(img);
	
	img.mouseenter(function(e) {
		img.css('display', 'block');
	});
	img.mouseleave(function(e) {
		img.css('display', 'none');
	});
	
	//attach the event delegator to the static parent
	$(static_parent).on('mouseenter', thumb_selector, showImage);
	$(static_parent).on('mouseleave', thumb_selector, hideImage);
		

	GM_registerMenuCommand("Toggle NSFW Images", toggleSFW, "t");
} catch (e) {
	GM_log(e)
}
	
