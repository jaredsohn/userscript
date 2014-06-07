// ==UserScript==
// @name           Noderiety
// @namespace      Noderiety
// @description    Tidies up everything2.com
// @include        http://everything2.com/*
// ==/UserScript==




	var s = document.createElement("script");
	s.type = "text/javascript";
	s.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js";
	document.body.appendChild(s);
	var s2 = document.createElement("script");
	s2.type = "text/javascript";

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
	$("h2.nodelet_title").each(function (i) {
		$(this).bind("click",function(e) {
			$(this).next("div.nodelet_content").toggle("fast");
		});
	});
	$("#mainbody").prepend("<div id=\"notifications\"></div>");
	$("#nodelet_262 ul li:first a").appendTo("#notifications"); 
	$("#nodelet_262 ul li:first").remove();
	$("#nodelet_262 ul li:first a").appendTo("#notifications"); 
	$("#nodelet_262 ul li:first").remove();
	$("#nodelet_262 p").appendTo("#notifications");
	if ($("#notifications p font")) {
		// assume not logged in
		$("#notifications p font a").appendTo("#notifications");
		$("#notifications p:first").remove();
		$("#nodelet_262 div.nodelet_content").css("display","block");
	}  
	$("#header").prev().remove();
    }


