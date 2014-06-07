// ==UserScript==
// @name        PJ06 Pagination
// @namespace   smk
// @include     http://projectrs06.com/Thread-*
// @version     1
// ==/UserScript==
var a,b=[],c;a=document.getElementsByClassName("pagination");c=document.getElementById("posts").previousSibling.previousSibling;for(i=0;i<a.length;i++)"pagination"==a[i].className&&"DIV"==a[i].tagName&&b.push(a[i]);c.parentNode.insertBefore(b.shift().cloneNode(true),c);
