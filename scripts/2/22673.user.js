// ==UserScript==
// @name           GameFAQs "Fix" Page Listings
// @namespace      global
// @include        *.gamefaqs.com/boards/*
// @description    This script replaces the "..." on the page listings with the actual page numbers that are missing.
// ==/UserScript==

function p(){
try{

a=document.body.innerHTML.match(/<li><a href="\/boards\/gen(?:topic|message)\.php\?board\=([0-9]+)(?:&amp;topic\=([0-9]+))?&amp;page\=([0-9]+)">(?:[0-9]+)<\/a><\/li>\s*<li>\.{3}<\/li>\s*<li><a href="\/boards\/gen(?:topic|message)\.php\?board\=(?:[0-9]+)(?:&amp;topic\=(?:[0-9]+))?&amp;page\=([0-9]+)"/)||[,,,]; //if none found, set to null
b="";
if(!a[1]){return false;}
for(c=parseInt(a[3])+1;c<parseInt(a[4]);c+=1)
b+='<li><a href="/boards/genmessage.php?board='+a[1]+((a[2])?'&amp;topic='+a[2]:"")+'&amp;page='+c+'">'+(c+1)+'</a></li>';document.body.innerHTML=document.body.innerHTML.replace(/<li>\.{3}<\/li>/,b);
}catch(e){};
}
p();p(); //init TWICE!!!!1111!!

//<insert cookie stealer here />