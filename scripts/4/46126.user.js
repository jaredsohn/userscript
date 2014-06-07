// ==UserScript==
// @name           FriendFeed Twitter Tweaker
// @namespace      kshep
// @description    Tweak the way Twitter entries are displayed on FriendFeed
// @include        http://beta.friendfeed.com/*
// ==/UserScript==

var code = (function(){
	if (!window.jQuery) return; // no jQuery, no fun!

	$('div.entry').each(function(){

		var name      = $(this).find('div.name');
		var name_link = name.find('a').attr('href');
		var name_html = name.html().replace(/\s/g,"");

		var service      = $(this).find('a.service');
		var service_html = service.html();
		var service_link = service.attr('href');

		if ( service_html == "Twitter" ) {
                        var username = service_link.substr(19);
		        service.html('Twitter ('+username+')');
		        if ( name_html == "" || name_link.indexOf('twitter-friends') != -1 ) {
				name.html("<a href='"+service_link+"'>"+username+"</a>");
				name.css('font-weight','bold');
				name.css('color','#00F');
			}
		};
	});
		
})

// evaluate the Code after jQuery has been loaded...
window.addEventListener("load", function(){
	var scripts = document.getElementsByTagName('script');
	var lastScript = scripts[scripts.length-1];
	var newElement = document.createElement('script');
	newElement.innerHTML = '('+code+')()';
	lastScript.parentNode.insertBefore(newElement, lastScript.nextSibling);
}, false); 
// 
