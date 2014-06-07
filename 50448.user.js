// ==UserScript==
// @name           facebook quiz cleaner
// @namespace      http://userscripts.org/scripts/review/50448
// @include        http://www.facebook.com/*
// @author         Harsh Doshi
// ==/UserScript==

(function () {
          
      //alert("hello world");
   
   //document.addEventListener("DOMContentLoaded",cleanQuiz);
  document.addEventListener("DOMNodeInserted", cleanQuiz, false);
   
   function cleanQuiz() {       
      var nodes = document.getElementsByClassName("UIIntentionalStory_Body");
      for (var i = 0 ; i < nodes.length ; i++) {
          var node = nodes[i];
          if ((node.innerHTML.match('apps\.facebook\.com')) || (node.innerHTML.match('Take this quiz')) || (node.innerHTML.match('Take this Quiz'))) {
              node.parentNode.style.display='none';
                        
           }
      }
    
   }


}) ();