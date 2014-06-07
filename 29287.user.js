// ==UserScript==
// @name           Show Password
// @namespace      By Yash
// @description    Shows the password when mouse is hoverd on the textbox
// @include        *
// ==/UserScript==


var d=document.getElementsByTagName("input");
for(i=0;i<d.length;i++){
if(d[i].type=="password"){
d[i].setAttribute("onmouseover","this.type='text'");
d[i].setAttribute("onmouseout","this.type='password'");
}
}