// ==UserScript==
// @name           Change hashtags
// @namespace      http://userscripts.org/users/72113
// @description    Strips the hashtags from the hash character in displayed posts
// @include        https://www.joindiaspora.com/*
// @include        https://joindiaspora.com/*
// ==/UserScript==
// 
// written by oli@joindiaspora.com
// IMPORTANT: Insert the name of your pod instead of joindiaspora.com :)


 p=document.getElementsByClassName("tag");
 for (i=0;i<p.length;i++) {
    var s=p[i].innerHTML;
    p[i].innerHTML=s.substring(1,s.length) ;
 }