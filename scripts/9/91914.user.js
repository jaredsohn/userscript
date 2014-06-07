// ==UserScript==
// @name           Add YourAVHost link to kanzen21.com
// @namespace      fromKanzen21ToYouAVHost
// @include        http://*.kanzen21.com/*
// ==/UserScript==

(function(){
   var getContentsOriginal = unsafeWindow.getContents;
   unsafeWindow.getContents = function(arg){
     getContentsOriginal(arg);
     setTimeout(function(){
                         var items = document.getElementsByClassName("itemBox");
                         for(var i = 0 ; i < items.length ; i++){
                           var actressName = items[i].getElementsByTagName("h2")[0].innerHTML.match(/>(.*)</)[1];
                           var actressLink = document.createElement("a");
                           actressLink.setAttribute("target","_blank");
                           actressLink.setAttribute("href","http://youravhost.net/actress/" + actressName);
                           actressLink.innerHTML="Jump YourAVHost";
                           items[i].appendChild(actressLink);
                         }},3500);
   };
 }
)();
unsafeWindow.getContents();
