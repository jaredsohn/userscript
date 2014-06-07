// ==UserScript==
// @name          HideLike
// @namespace     http://www.joanpiedra.com/jquery/greasemonkey
// @description	  Hide Like Notifications from Facebook
// @author        Narendra Sisodiya
// @homepage      http://narendrasisodiya.com
// @include       http://www.facebook.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$("#jewelCase").append("<div id='clickmedislike'><a href='#' style='position: relative;top: 9px;float:left;color:white'><b>Hide Like Notifications</a></b></div>");
$("#clickmedislike").click(function(){
	$("#jewelNotifs").children().each(function() {    
		str = $("a", this).attr("href");
		if (str.indexOf("notif_t=like") >= 0)
		{
			$(this).hide();
		}
	});
})
