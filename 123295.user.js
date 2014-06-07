// ==UserScript==
// @name           Fuck BNet
// @namespace      http://userscripts.org/users/132504
// @description    BNet is a dumbass
// @include        http://www.ndforums.com/*
// ==/UserScript==

window.onload=function(){
     if(document.location.href.indexOf("ndforums.com")!=-1) {
          document.body.style.backgroundImage="none";
          document.body.style.backgroundColor="#9B9CA0";
          var els=new Array('content','top','forum','navtable_td','popup','toptable','popup_post','popup_reg');
          var els2=new Array('toplink','reply_tr');
          setInterval(function(){
               var t=document.getElementsByTagName('table');
               for(var i=0;i<t.length;i++) {
                    t[i].style.backgroundImage="none";
                    t[i].style.backgroundColor="#9B9CA0";
               }
               for(e in els) {
                    var c=document.getElementsByClassName(els[e]);
                    for(var q=0;q<c.length;q++) {
                         c[q].style.backgroundImage="none";
                         c[q].style.backgroundColor="#9B9CA0";
                    }
               }
               for(e2 in els2) {
                    if(document.getElementById(els2[e2])){
                         document.getElementById(els2[e2]).style.backgroundImage="none";
                         document.getElementById(els2[e2]).style.backgroundColor="#9B9CA0";
                    }
               }
          },200);
     }
}