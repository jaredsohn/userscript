// Jaiku image tweaks
// Version 1.0
// 2009-03-06
// Copyright (c) Fredrik Johansson
//
// This is a Greasemonkey script which tweaks Jaiku.com
//
// ==UserScript==
// @name	Jaiku image tweaks
// @description	Tweaks Jaiku, bigger images on mouse over. Did also work with Flickr images until Jaiku removed support for feeds
// @include	http://jaiku.com/*
// @include	http://*.jaiku.com/*
// ==/UserScript==
//

(function(){


	var allImgs = document.getElementsByTagName("img");
	var profileImgPattern = /_(.?)\.jpg/g; 	
	var container = document.getElementById('container');
	var contentcol = document.getElementById('content');
	
	
	thescript = document.createElement('script');
	thescript.setAttribute('type','text/javascript');
	thescript.innerHTML = "var a = 0;"+ 
"	var posx = 0;"+
"	var posy = 0;"+	
	"$('body').append('<span id=\"largeImgContainer\"></span>');"+
	"document.onmousemove = captureMousePosition;"+
	"function setBg(img) {"+
		"jQuery(document).ready(function(){"+
   			"$('#largeImgContainer').attr('style','position: absolute; z-index: 9999; left:'+posx+'px; top:'+posy+'px;');"+
   			"var thesrc = $(this).attr('src');"+
   			"$('#largeImgContainer').html('<img src=\"'+img+'\" alt=\"\" style=\"border:2px solid #000;\"/>');"+
		"});"+
	"}"+
"	function captureMousePosition(e) {"+
"		if (!e) var e = window.event;"+
"		if (e.pageX || e.pageY) 	{"+
"			posx = e.pageX + 40;"+
"			posy = e.pageY - 80;"+
"		}"+
"	}";

	
	container.parentNode.insertBefore(thescript, container);
	
	if (container) {
	
		
		for (var i = 0; i < allImgs.length; i++) { 
			var imgSrc = allImgs[i].getAttribute("src"); 
			if (imgSrc.match(profileImgPattern)) {
				if (imgSrc.match(/flickr\.com/g)) {
					imgSrc = imgSrc.replace(/_(.?)\.jpg/g, "\.jpg");
				} else {
					imgSrc = imgSrc.replace(/_(.?)\.jpg/g, "_m\.jpg");
				}
				allImgs[i].setAttribute("onmouseover", "setBg('"+imgSrc+"')");
				allImgs[i].setAttribute("onmouseout", "$('#largeImgContainer img').hide()");
					
			} 
		}   
				
	
	}
})();

