// ==UserScript==
// @id             artmama.sme.sk-185b2c40-8e32-4c45-ab09-2c34b48ca3e9@artmama
// @name           Artmama.sk - Odstraňovač reklám
// @version        1.0
// @namespace      artmama
// @author         MerlinSVK
// @description    
// @include        http://artmama.sk/*
// @include        http://artmama.sme.sk/*
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
	$('div[id*="block-block-"]').not('#block-block-81').remove();
	$('#header-top-wrapper').remove();
	$('#postscript-bottom-wrapper').remove();
	$('#secondary-menu').remove();
	$('#footer-inner').remove();
	$('#sfooter-theend').remove();
});