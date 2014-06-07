// ==UserScript==
// @name           Google Current Site
// @namespace      KookiScript
// @description	   Search on current site
// @include        http://*
// ==/UserScript==
window.addEventListener("keypress", Init, false);
function Init(e){
if (e.keyCode == 113)//F2
{
var Langue = navigator.language;
var Site= document.location.host;
var Keyword = "		";
var URL = "http://www.google.com/#hl="+Langue+"&source=hp&q=site:"+Site+"+"+Keyword+"&meta=&aq=f&aqi=&aql=&oq=&gs_rfai=";
GM_openInTab(URL);
}
}