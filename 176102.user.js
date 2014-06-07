// ==UserScript==
// @name           Europa2.sk - Odkryvac linkov
// @version        1.0
// @namespace      Europa 2
// @author         MerlinSVK
// @description    
// @include        http://europa2.sk/srv/www/*
// @include        http://www.europa2.sk/srv/www/*
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @run-at         document-end
// ==/UserScript==

if(typeof unsafeWindow=="undefined"){unsafeWindow=window}if(navigator.userAgent.indexOf("Chrome")!=-1){window.unsafeWindow||(unsafeWindow=function(){var a=document.createElement("p");a.setAttribute("onclick","return window;");return a.onclick()}())};

if(!window.jQuery)
{
   var script = document.createElement('script');
   script.type = "text/javascript";
   script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js";
   document.getElementsByTagName('head')[0].appendChild(script);
}

$(function (){
	$('.mp3-anchor').css("display", "block");
});