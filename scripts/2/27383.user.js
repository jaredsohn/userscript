// ==UserScript==
// @name           Highlight NSFW links
// @namespace      reddit
// @description    Highlight in red NSFW links
// @include        http://reddit.com/
// @include        http://reddit.com/*
// @exclude        http://reddit.com/r/nsfw/
// @exclude        http://reddit.com/r/nsfw/*
// ==/UserScript==

window.addEventListener("load", function(e){

if(document.getElementById('siteTable')) {
 var ac=document.getElementById('siteTable').getElementsByTagName("p");
 for(var i=0; i < ac.length; i++) {
 if(ac[i].innerHTML.match(/nsfw|NSFW/)) {
 ac[i].style.background="pink";
 ac[i].style.color="red";
}
}
}

if(document.getElementById('siteTable')) {
 var a=document.getElementById('siteTable').getElementsByTagName("a");
 for(var i=0; i < a.length; i++) {
 if(a[i].href.indexOf('/r/nsfw') != -1) {
// a[i].style.background="#F8F5A7";
 a[i].style.color="#FF0000";			
 a[i].style.fontWeight = 'bolder';
}
}
}

if(document.getElementById('siteTable')) {
 var a=document.getElementById('siteTable').getElementsByTagName("a");
 for(var i=0; i < a.length; i++) {
 if(a[i].href.indexOf('/r/nsfw') != -1) {
// a[i].style.background="#F8F5A7";
 a[i].style.color="#FF0000";			
 a[i].style.fontWeight = 'bolder';
}
}
}

}, false)