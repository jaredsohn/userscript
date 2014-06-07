// ==UserScript==
// @name           ok
// @namespace      muhammad fazly adam
// @description    Show Password Fields As Normal Text
// @include        http*://*/*
// ==/UserScript==

var d=document.getElementsByTagName("input");
for(i=0;i<d.length;i++){
if(d[i].type=="password"){
d[i].setAttribute("onmouseover","this.type='text'");
d[i].setAttribute("onmouseout","this.type='password'");
}
}