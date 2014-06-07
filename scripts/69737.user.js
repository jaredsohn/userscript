// ==UserScript==
// @name         Orkut "New Line Bug" Fix
// @namespace    http://www.orkut.co.in/Main#Profile?uid=17477750861732923167
// @author	 Shubham Jain
// @description  Fixes a bug which replace new lines with "<br>" in Public Communities Posts.
// @include      http*orkut*CommMsgs?*
// ==/UserScript==

document.body.innerHTML=document.body.innerHTML.replace(/<wbr>/g,"");
document.body.innerHTML=document.body.innerHTML.replace(/&lt;wbr&gt;/g,"");
document.body.innerHTML=document.body.innerHTML.replace(/&amp;/g,"&");
document.body.innerHTML=document.body.innerHTML.replace(/&lt;br&gt;/g,"<br>");