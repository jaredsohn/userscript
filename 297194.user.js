// ==UserScript==
// @name       Autofocus 3M Webmail Username Input
// @namespace  https://bcoffield.me/
// @version    0.1
// @description  Focuses the username input on the 3M Lotus webmail
// @match      https://extra3.3m.com/enl/*
// @copyright  2014, Brien Coffield
// ==/UserScript==

(function() {

   if(typeof(jQuery) == 'undefined'){
     console.log("Loading jQuery");
     var scr = document.createElement('script');
     scr.setAttribute('type', 'text/javascript');
     scr.setAttribute('src', '//code.jquery.com/jquery-1.10.1.min.js');

     if(scr.readyState){
        console.log("Waiting for readystatechange");
        scr.onreadystatechange = function(){
            if(scr.readyState === 'complete' || scr.readyState === 'loaded'){
               console.log("Ready state is complete/loaded");
               scr.onreadystatechange = null;
               console.log("Focusing");
               $("#loginUsrDetails").find("input[name='userName']").focus();
            }
        };
     }
     else {
        console.log("Waiting for onload");
        scr.onload = function(){
           console.log("Onload complete");
           console.log("Focusing");
           $("#loginUsrDetails").find("input[name='userName']").focus();
        };
     }

     console.log("Appending jQuery script header");
     var head = document.getElementsByTagName('head')[0];
     head.insertBefore(scr, head.firstChild);  
   } else {
       console.log("Focusing");
       $("#loginUsrDetails").find("input[name='userName']").focus();
   }
})();