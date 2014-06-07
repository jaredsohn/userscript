// ==UserScript==
// @name           ItsMahAwesomeness
// @namespace      *
// @include        *
// ==/UserScript==
var postButton = document.forms.namedItem("post").elements.namedItem("post");


function styling(){
var newmsg = "";
var oldmsg = "";
var postMessage = document.forms.namedItem("post").elements.namedItem("message");
var newmsgpos = 0;

 if (postMessage.value.lastIndexOf("[/quote]") == -1){
   newmsg = postMessage.value;
   oldmsg = "";
   }
 else if (postMessage.value.lastIndexOf("[/quote]") != -1){
   newmsgpos = postMessage.value.lastIndexOf("[/quote]");
   newmsg = postMessage.value.substring(newmsgpos + 8);
   oldmsg = postMessage.value.substring(0,newmsgpos + 8);
   }

   

   postMessage.value = oldmsg + "[size=14] " + newmsg + " [/size]";
 
}

postButton.addEventListener("click", styling, true);