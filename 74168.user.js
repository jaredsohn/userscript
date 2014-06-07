// ==UserScript==
// @name           Remove Google Redirects T
// @namespace      owlhawk.net
//@description    Removes the redirect on Google search result links and allows you to copy the real url. 
// @include        http://www.google.com/#hl=en*
// @include        http://www.google.com/webhp*
// @include        http://www.google.com/search*
// ==/UserScript==

function fixLinks() {
unsafeWindow.rwt = function(a,e,f,j,k,g,l,m){
try{if(a===window){
a=window.event.srcElement;
while(a){
if(a.href)break;
a=a.parentNode}}

var b=encodeURIComponent||escape,c;
c=a.getAttribute("href");
var n=["/url?sa=t","\x26source\x3dweb",e?"&amp;oi="+b(e):"",f?"&amp;cad="+b(f):"","&amp;ct=",b(j||"res"),"&amp;cd=",b(k),"&amp;ved=",b(m),"&amp;url=",b(c).replace(/\+/g,
"%2B"),"&amp;ei=","AU3CS6nbLcyHkAXrvvzlBQ",g?"&amp;usg="+g:"",l].join("");
}

catch(o){}return true};

window.addEventListener("load", fixLinks, true);
}

