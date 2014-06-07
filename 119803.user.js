// ==UserScript== 
// @name           Bau-Mogul Iframe Chat
// @author         banane4fun
// @description    Fügt bei Bau-Mogul den Chat als Iframe auf jeder Seite hinzu.
// @include     http://www.bau-mogul.de/default.aspx*
// ==/UserScript==

function makeFrame() {
   ifrm = document.createElement("IFRAME");
   ifrm.setAttribute("src", "http://www.bau-mogul.de/cheat.aspx");
   ifrm.style.width = 265+"px";
   ifrm.style.height = 550+"px";
   ifrm.style.position = "fixed";
   ifrm.style.top = 45+"px";
   ifrm.style.left = 45+"px";
   ifrm.style.border = 0+"px";
   document.body.appendChild(ifrm);
} 

makeFrame();