// ==UserScript==
// @name           Google Reader +1 char counter
// @include        https://plusone.google.com/u/0/_/+1/confirm*
// ==/UserScript==
setTimeout('document.getElementById(":0.f").onkeyup=function(){(this.nextSibling||this.parentNode.appendChild((_counter=document.createElement("div")).setAttribute("style", "position:absolute;bottom: 2px;right: 2px;z-index: 100;font-size: x-small;color: #999;")||_counter)).innerHTML=this.innerHTML.replace(/<br>|&nbsp;/g, " ").trim().length}', 1500);