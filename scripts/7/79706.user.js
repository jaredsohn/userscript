// ==UserScript==
// @name           ReHezzinatior
// @namespace      Wingless
// @description    Based off of Furohmans 'Hezzy Unperson Removal' This script will send all names as 'Mr. Gestapo' To Hezzy, for all of you informed.
// @include        http://www.facepunch.com/*
// ==/UserScript==

(function(){
	
	var hezzinator = document.body.innerHTML.match(/Mr. Gestapo/ig);
	
	if (hezzinator != null)
	{
		if (hezzinator.length > 0)
		{
			document.body.innerHTML = document.body.innerHTML.replace(/Mr. Gestapo/ig,'Hezzy');	
		}	
	}
	
})();