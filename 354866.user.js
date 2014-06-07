// ==UserScript== 
// @name HK Tweaks
// @author Jordan Doyle
// @version 0.15
// @description Fixes all the problems with HK
// @include http://habbokingdomforum.co.uk/*
// @include http://www.habbokingdomforum.co.uk/*
// ==/UserScript==

var head = document.getElementsByTagName("head")[0];

var jquery = document.createElement("script");
	jquery.setAttribute("type", "text/javascript");
	jquery.setAttribute("src", "//cdn.jsdelivr.net/jquery/1.10.2/jquery-1.10.2.min.js");
	
	jquery.onload = function() {
		var $j = jQuery.noConflict();
		
			jQuery('table').each(function() {
				if(jQuery(this).find("tr .tcat").text() == "Notices") jQuery(this).hide();
			});
	};
	
head.appendChild(jquery);