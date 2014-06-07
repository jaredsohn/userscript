// ==UserScript==
// @name			No More Smileys
// @namespace			TBP2
// @description			Gets rid of the image smileys on facebook
// @version			1.3.1
// @updateURL		none
// @grant			none
// @include			http://*.facebook.com/*
// @include			https://*.facebook.com/*
// @match			http://*.facebook.com/*
// @match			https://*.facebook.com/*
// @exclude			http://*.facebook.com/ajax/*
// @exclude			https://*.facebook.com/ajax/*
// ==/UserScript==

// Author: Christopher Vaughan
// Date: unknown
// License: GNU General Public License v3 (GPL)
// Url: http://www.vaughanfreelance.com	


	var load,execute,loadAndExecute;
load=function(a,b,c){
var d;
d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);
return d},execute=function(a){
var b,c;
typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);
return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};
	function smileycheck(){
		$(".emote_text").css("display","inline");
		$(".emote_custom").css("display","none");
		$(".emote_img").css("display","none");
	}
	loadAndExecute("https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js", function() {

		setInterval(function(){
			$(".emote_text").css("display","inline");
			$(".emote_custom").css("display","none");
			$(".emote_img").css("display","none");
		},500);
	});

