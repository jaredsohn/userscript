// ==UserScript==
// @name           Wild1s chat Nobot
// @description    Remove sidebar in facebook's games and add chatroom
// @include        *apps.*
// @author         mrUTman

// @run-at document-end
// ==/UserScript==
document.getElementById("rightCol").style.display = 'none';



   function makeFrame() {
   ifrm = document.createElement("IFRAME");
   ifrm.setAttribute("src", "http://twones.chatango.com");
   ifrm.style.width = 250+"px";
   ifrm.style.height = 550+"px";
   ifrm.style.position = "absolute";
   ifrm.style.top = 45+"px";
   ifrm.style.right = 0+"px";
   ifrm.style.border = 3+"px";
   document.body.appendChild(ifrm);
} 

makeFrame();