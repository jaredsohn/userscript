// ==UserScript==
// @name        Kaskus Beta URL Shortener
// @description Add shorten url button in kaskus livebeta threads
// @author      indra4213
// @include     http://livebeta.kaskus.us/thread/*
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @version     1.0
// ==/UserScript==

$(function() {
	
	// Shorten URL
	var url_trim = $(location).attr('href').substr(0,57)+ '';
	var url_short = url_trim.replace('http://livebeta.kaskus.us/thread/', 'http://kask.us/');
	
	// Inject Button
	$('#thread-header > .thread-act > .social-media').append('<a id="shorturl">Short URL</a>');
	$('#shorturl').attr('href', url_short);
		
	// Styling
	var css = "#shorturl{color:#1284dc; float:right; margin:0px; font-size:12px; font-weight:bold; line-height:20px; padding:0 7px; text-align:center; text-shadow:1px 1px #FFFFFF; border:1px solid #CCCCCC; border-radius:4px; display:inline-block; text-decoration:none; background:-moz-linear-gradient(#FFFFFF 0%, #E1E1E1 100%) repeat scroll 0 0 transparent; background:-o-linear-gradient(#FFFFFF 0%, #E1E1E1 100%) repeat scroll 0 0 transparent; background:-webkit-linear-gradient(#FFFFFF 0%, #E1E1E1 100%) repeat scroll 0 0 transparent;} #shorturl:hover{background:-moz-linear-gradient(#FFFFFF 0%, #CCCCCC 100%) repeat scroll 0 0 transparent; background:-o-linear-gradient(#FFFFFF 0%, #CCCCCC 100%) repeat scroll 0 0 transparent; background:-webkit-linear-gradient(#FFFFFF 0%, #E1E1E1 100%) repeat scroll 0 0 transparent;} #thread-header > .thread-act > .inst-forum, .social-media {width:auto !important;}";
	if (typeof GM_addStyle != "undefined") {
		GM_addStyle(css);
	} else if (typeof PRO_addStyle != "undefined") {
		PRO_addStyle(css);
	} else if (typeof addStyle != "undefined") {
		addStyle(css);
	} else {
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			var node = document.createElement("style");
			node.type = "text/css";
			node.appendChild(document.createTextNode(css));
			heads[0].appendChild(node); 
		}
	}
	
})();