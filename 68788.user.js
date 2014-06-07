// ==UserScript==
// @name           AB
// @namespace      ABBA
// @description    auto scroll
// @version        001
// @include        file:///C:/Documents%20and%20Settings/M-D/Desktop/BIBLIO/HTML_XHTML/guide/01%29_HTML/00.htm
// ==/UserScript==
var scrolledPx=-1; 
var vs=1;
function scrolla()
{
self.scrollBy(0,vs);
scrPx=(document.documentElement && document.documentElement.scrollTop)?
document.documentElement.scrollTop:document.body.scrollTop;
if(scrolledPx==scrPx)
{
vs=(vs==1)?-1:1
}
scrolledPx=scrPx
setTimeout("scrolla()",30);
}
window.onload=scrolla