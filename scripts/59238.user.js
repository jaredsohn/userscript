// ==UserScript==
// @name           Devart temporary fix
// @namespace      http://userscripts.org/users/111427
// @version        1.0.0
// @author         color2life@gmail.com
// @description    http://deviantart.com temporary fix ; not much just chaning the urls from .net to .com for all images, js & css as .net is blocked 
// @include        http://www.deviantart.com/*
// @include        http://deviantart.com/*
// @include        http://*.deviantart.com/*
// ==/UserScript==

window.addEventListener("load", function(e) {
	
	var styleSheetsNum = document.styleSheets.length;
	for (var i=0 ; i< styleSheetsNum ; i++){
		var addcss = document.styleSheets[i].href;
		addcssr = addcss.replace(/net/,"com");
		document.getElementsByTagName("head")[0].innerHTML+="<link  rel='stylesheet' type='text/css \' href='"+addcssr+"' \>"
	}
	o
	var jsNum = document.getElementsByTagName('SCRIPT').length;
	for (var i=0 ; i< jsNum; i++){
		if(document.getElementsByTagName('SCRIPT')[i].src!=''){
		var addjs = document.getElementsByTagName('SCRIPT')[i].src;
		addjsr = addjs.replace(/net/,"com");
		document.getElementsByTagName("head")[0].innerHTML+="<script  type='text/javascript \' src='"+addjsr+"' \>"
		}
	}
  
}, false);


	// chagnes images .net to .com
	var imgNum = document.images.length;
	for (var i=0 ; i< document.images.length; i++){
		var addcss = document.images[i].src;
		document.images[i].src = addcss.replace(/net/,"com");
	  }