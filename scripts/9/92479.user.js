// ==UserScript==
// @name           Test Script
// ==/UserScript==

javascript:i=0;c=["red","green","blue","yellow","magenta","orang e"," pink","violet"]; a=document.links;setInterval('i++;a[i % document.links.length].style.color=c[i % c.length]',1);void(0)