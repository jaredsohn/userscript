// ==UserScript==
// @name           Facebook Apps - reload error page
// @namespace      Wr3cktangle
// @include        http://apps.facebook.com/*
// ==/UserScript==

//There are still a few kinks Facebook and the makers of ___ 
//are trying to iron out. We appreciate your patience as we try to fix 
//these issues. Your problem has been logged - if it persists, please 
//come back in a few days. Thanks!
if(document.body.innerHTML.indexOf("Error while loading page from") != -1)
{
   //probably redundant to find this button, but it doesn't harm anything
   var tryAgain = document.getElementById("try_again_button");
   if(tryAgain != null)
   {
      setTimeout(function(){ window.location.reload(); }, 10000);
   }
}