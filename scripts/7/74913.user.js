// ==UserScript==
// @name          Instapaper Unread Counter
// @include       http://*.instapaper.com/*
// ==/UserScript==

function count(){
   var counter=document.getElementById("counter");
   var bk_list=document.getElementById("bookmark_list");
   var unread=document.getElementById("categoryHeader");
   var unread_s=unread.innerHTML.split("Unread");
   if(counter)
      counter.innerHTML=bk_list.children.length;
   else
      unread.innerHTML=unread_s[0]+"Unread(<span id=\"counter\">"+bk_list.children.length+"</span>)"+unread_s[1];
   setTimeout(function(){count();},1000);
}

count();