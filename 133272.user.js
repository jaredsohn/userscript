// ==UserScript==
// @name        Yammer-RTL
// @namespace   YammerRTL
// @description Enable RTL on Yammer
// @include     *.yammer.com/*
// @version     1.1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

// ajlajlajl peresents:

$(document).ready(function(){
	$(".yj-message-body").live("click", function(){
	    $(this).fadeTo(100, 0.33,function(){
	    	$(this).css("direction",$(this).css("direction")=="ltr"?"rtl":"ltr").fadeTo(100,1);
		});
	});
});
