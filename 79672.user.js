// ==UserScript==
// @name           Mr. Hezzy
// @namespace      Nick
// @description    For those who dislike change
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

//I lovingly ripped off "lady freeman" for this.  Any credit for the code goes to huertanix (http://userscripts.org/scripts/show/65329), I just edited some names.