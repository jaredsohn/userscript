// ==UserScript==
// @name		ByePUDDI
// @description		Removes any mention of the name PUDDI
// @version		1.5
// @copyright		2010 - Daniel P.
// @license		CC-BY-SA :Creative Commons Attribution-Share Alike 3.0 Unported License; http://creativecommons.org/licenses/by-sa/3.0/
// @include http://*
// ==/UserScript==

(function(){
	
	var PUDDIInstances = document.body.innerHTML.match(/PUDDI/ig);
	
	if (PUDDIInstances != null)
	{
		if (PUDDIInstances.length > 0)
		{
			document.body.innerHTML = document.body.innerHTML.replace(/PUDDI/ig,' ');

		}	
	}
	
})();