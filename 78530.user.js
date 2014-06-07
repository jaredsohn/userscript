// ==UserScript==
// @name           Twitter Apple Spam Remover
// @namespace      TASR
// @description    Removes all posts with apple spam (keywords apple, iphone etc...)
// @include        http://twitter.com/
// ==/UserScript==
function unSpam()
{
   var entries = document.getElementsByClassName("entry-content");
   for each (entry in entries)
   {
      if(entry.innerHTML.search(/(iphone|ios|ipad|steve|jobs|apple)/i)>=0)
      {
         if (entry.parentNode.className=="status-content")
         {
            entry.parentNode.parentNode.parentNode.style.display="none";
         }
         else if (entry.parentNode.className=="status-body")
         {
            entry.parentNode.parentNode.style.display="none";
         }
      }
   }
}
unSpam();