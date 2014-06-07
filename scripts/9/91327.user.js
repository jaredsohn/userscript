// ==UserScript==
// @name           	PlurkBotBuster
// @version 		0.1.3
// @namespace      	hk.reality.plurk.botbuster
// @include        	http://www.plurk.com/*
// @exclude 		http://www.plurk.com/_comet/*
// @exclude 		http://www.plurk.com/Users/*
// @exclude 		http://www.plurk.com/Plurks/*
// @exclude 		http://www.plurk.com/Responses/*
// @exclude 		http://www.plurk.com/i18n/*
// @exclude 		http://www.plurk.com/API/*
// @require       	http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==
// 

var blockedUsers = ["轉噗機", "噗熱浪"];

jQuery.noConflict();

function checkPlurk() {
	var plurks = jQuery("div.plurk a.name");
	plurks.each(function(i, ele){
		var name = jQuery(ele).text();		
		jQuery(blockedUsers).each(function(i, user){		
			if (user == name) {
				var parent = jQuery(ele).parent().parent().parent().parent();
				parent.remove();				
			}
		});
	});	
};

setTimeout (function () {
            var t;
            content.addEventListener('DOMNodeInserted', function () { clearTimeout(t); t = setTimeout(checkPlurk, 30); }, false);
}, 2000);