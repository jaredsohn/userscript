// ==UserScript== 
// @name           Wildones Chat (WIDESCREEN)
// @author         mrUTman

// @include        *.kingdomsofcamelot.com/*main_src.php*
// @include        *.kingdomsofcamelot.com/*platforms/kabam*
// @include        *apps.facebook.com/kingdomsofcamelot/*


// @run-at document-end
// ==/UserScript==


//Fixed weird bug with koc game


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
