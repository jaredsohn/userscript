// ==UserScript==
// @name           GoogleLinkDoNotTrack
// @version			1.4
// @namespace      http://userscripts.org/users/27225
// @include        http://*.google.tld/search*
// @include        http://*.google.com/search*
// @include        https://*.google.tld/search*
// @include        https://*.google.com/search*
// @exclude			https://drive.google.com/*
// @exclude			https://docs.google.com/*
// @exclude			https://*.google.com/calendar/*
// @exclude			https://*.google.com/analytics/*
// @exclude			https://adwords.google.com/*
// @exclude			https://mail.google.com/*
// @exclude			https://drive.google.tld/*
// @exclude			https://docs.google.tld/*
// @exclude			https://*.google.tld/calendar/*
// @exclude			https://*.google.tld/analytics/*
// @exclude			https://adwords.google.tld/*
// @exclude			https://mail.google.tld/*
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// ==/UserScript==

var tickIcon = "data:image/png;base64,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"
			+"Iupui8RDyYcAAAAASUVORK5CYII="
$(document).ready(function() {
	var lClass = $('.l');
	var googleResults;
	if(lClass.length > 0)
		googleResults = lClass;
	else
		googleResults = $("[onmousedown^='return rwt']");
		
	googleResults.each(function(){
		$(this).attr('onmousedown','');
		$(this).html('<img style="height:16px;width:16px" src="'+tickIcon+'" />'+$(this).html());
	});
});