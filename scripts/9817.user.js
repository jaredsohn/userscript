// ==UserScript==
// @name          SZ OT-Killer V1.0
// @description   Blendet alle OT-Kommentare automatisch ein
// @author        fNORD
// @include       http://www.sklavenzentrale.com/?act=forum*
// ==/UserScript==

for(FnOrD=1;FnOrD<500;FnOrD++){var elem=document.getElementById('fETag'+FnOrD); 
var elemH=document.getElementById('fETag'+FnOrD+'h'); 
if(elem && elemH){void(elem.innerHTML=elemH.innerHTML)}};