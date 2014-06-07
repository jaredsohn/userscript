// ==UserScript==
// @name        Inline Pics Blown-Up on Dash
// @namespace   click_all_pics
// @description Clicks all inline pics on Tumblr dash so you don't have to.
// @include     http://www.tumblr.com/dashboard
// @include     http://www.tumblr.com/blog/*
// @include     http://www.tumblr.com/tagged/*
// @include     http://www.tumblr.com/likes
// @include     https://www.tumblr.com/likes
// @include     http://www.tumblr.com/liked/by/*
// @version     2.2
// ==/UserScript==
var source = 'window._index = 0;'+"\n"+
             'window.blow_up_pics = function(){'+"\n"+
             '	var post_length = jQuery(".post_container").length;'+"\n"+
             '	while(window._index<post_length){'+"\n"+
             '		if(jQuery(".post_container:eq("+window._index+") .inline_external_image").length>0)'+"\n"+
             '			jQuery(".post_container:eq("+window._index+") .inline_external_image").each(function(){'+"\n"+
             '				jQuery(this).attr("src", jQuery(this).attr("external_src")).addClass("enlarged");'+"\n"+
             '			});'+"\n"+
             '		if(jQuery(".post_container:eq("+window._index+") .toggle_inline_image").length>0)'+"\n"+
             '			jQuery(".post_container:eq("+window._index+") .toggle_inline_image").each(function(){'+"\n"+
             '				jQuery(this).removeClass("inline_image");'+"\n"+
             '			});'+"\n"+
             '		window._index++;'+"\n"+
             '	}'+"\n"+
             '}'+"\n"+
             'if(typeof window.after_auto_paginate===\'function\'){'+"\n"+
             '	window.after_auto_paginate = (function(){'+"\n"+
             '		var cached_function = window.after_auto_paginate;'+"\n"+
             '		return function(){'+"\n"+
             '			cached_function.apply(this, arguments);'+"\n"+
             '			window.blow_up_pics();'+"\n"+
             '		};'+"\n"+
             '	}());'+"\n"+
             '}else{'+"\n"+
             '	window.after_auto_paginate = function(){'+"\n"+
             '		window.blow_up_pics();'+"\n"+
             '	}'+"\n"+
             '}'+"\n"+
             'window.blow_up_pics();';

var script = document.createElement('script');
script.setAttribute("type", "application/javascript");
var addthis = document.createTextNode(source);
script.appendChild(addthis);
document.body.appendChild(script);