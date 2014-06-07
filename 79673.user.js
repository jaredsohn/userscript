// ==UserScript==
// @name           Hezzy Unperson Removal
// @namespace      Nick
// @description    For those who understand that there was never a 'Hezzy' and only a 'Mr. Gestapo'
// @include        http://www.facepunch.com/*
// ==/UserScript==

(function(){
	
	var hezzinator = document.body.innerHTML.match(/Mr. Gestapo/ig);
	
	if (hezzinator != null)
	{
		if (hezzinator.length > 0)
		{
			document.body.innerHTML = document.body.innerHTML.replace(/Hezzy/ig,'Mr. Gestapo');	
		}	
	}
	
})();