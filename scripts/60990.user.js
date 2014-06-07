// ==UserScript==
// @name           Cool Via
// @namespace      http://blog.arpitnext.com
// @description    tweet via
// @author         ArpitNext
// @version        1.0
// @include        http://twitter.com/
// ==/UserScript==

(function()
{    
   var filter = function(a, p)
   {
      var res = [];
      for(var i = 0; i < a.length; ++i)
      {
         var curr = a[i];
         if(p(curr))
            res.push(curr);
      }
      
      return res;
   }
   
   var hasClass = function(e, className)
   {
      var s = e.className;
      return s.indexOf(className) >= 0;      
   }
   
   var forEach = function(a, f)
   {
      for(var i = 0; i < a.length; ++i)
      {
         var curr = a[i];
         f(curr, i);
      }
   }
   
   var process = function(par, index)
   {
      var meta = par.getElementsByClassName("meta")[0];

      var sep = document.createElement("span");
      sep.innerHTML = "&nbsp;&nbsp;";     
      meta.insertBefore(sep, null); 

      var rtSpan = document.createElement("a");
      rtSpan.innerHTML = "VIA";     
      rtSpan.style.cursor = "pointer";
      rtSpan.className = "published timestamp";
      meta.insertBefore(rtSpan, null);
      
      var retweet = function(evt)
      {
         var content = par.getElementsByClassName("entry-content")[0].textContent;
         var who = par.getElementsByClassName("status-body")[0].getElementsByTagName("a")[0].textContent;

         var textarea = document.getElementById("status");
         textarea.value = content + "  " + "(via @" + who + ") :)";
         textarea.focus();         
      }
      
     
      rtSpan.addEventListener("click", retweet, false);
   }
   
   
   var lis = document.getElementsByTagName("li");   
   lis = filter(lis, function(x) { return hasClass(x, "hentry") });
   
   forEach(lis, process);
      
})();
