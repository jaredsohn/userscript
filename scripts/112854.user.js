// ==UserScript==
// @name           Rediff - Show all slides on ONE Page
// @namespace      net.rajeshsoni
// @include        http*://*.rediff.com/*
// ==/UserScript==

for(i=0; i<100; i++) 
{ 
	document.getElementById('slide_0').style.display='none'; try{ document.getElementById('slide_' + i).style.display=''; }catch(ex){}; 
} 