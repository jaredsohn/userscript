// ==UserScript==
// @name           Fortress 12hr Clock Fix
// @namespace      http://www.theyeas.com/UD
// @include        *z15.invisionfree.com/Fortress*
// ==/UserScript==

var i=0;var temp=document.getElementsByTagName("iframe");while(i<6){temp[i].src=temp[i].src.replace('th1','th2');i++;}
