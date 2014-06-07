// ==UserScript==
// @name Add eRepublik eSouth Korea GagaLive Chat
// @homepageURL http://userscripts.org/scripts/show/183863
// @include http://*.erepublik.com/*
// @include https://*.erepublik.com/*
// @match http://*.erepublik.com/*
// @match https://*.erepublik.com/*
// @version 1.1.0
// ==/UserScript==

if (document.querySelector('#large_sidebar')) {
sidebar=document.querySelector("#large_sidebar");
live=document.createElement("div");
live.setAttribute("id","Gagalive");
live.setAttribute("class","sidebar");
live.setAttribute("style","right:200px;");
nick=document.querySelector("a.user_name").text;
live.innerHTML="<embed height='350' width='180' src='http://www.gagalive.kr/livechat1.swf?chatroom=esk&position=2&user="+nick+"'></embed>";

for(i=0;i<sidebar.children.length;i++) {
sidebar.children[i].setAttribute("style","bottom:350px;"+sidebar.children[i].getAttribute("style"))
}

sidebar.insertBefore(live, sidebar.firstChild);
}