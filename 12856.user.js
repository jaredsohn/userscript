// ==UserScript==
// @name           The WSICSIYH??? removal script
// @namespace      
// @description    deletes a retarded thread from the Rock Forum
// @include        http://forums.myspace.com/*
// ==/UserScript==

// Version Three Point Pwn
var tdtr = document.getElementsByTagName("TD");
	for (var n = 0; n < tdtr.length; n++) {
		if (tdtr[n].textContent == "\n						    \n							    \n								    \n								        \n								        What song is currently stuck in your head???\n								    \n								    \n							    \n						    \n						    \n							    \n								    \n										Topic Starter:\n										Jahronomo    					                        \n								    \n							    \n						    \n					    "){
					if (tdtr[n].parentNode && tdtr[n].parentNode.tagName == "TR")
						tdtr[n].parentNode.style['display'] = 'none';
				}
};