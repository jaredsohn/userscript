// ==UserScript==
// @name			BlankMe
// @description		Removes any mention of the name MobileMe
// @version			1.5
// @copyright		2010 - Daniel P.
// @license			CC-BY-SA :Creative Commons Attribution-Share Alike 3.0 Unported License; http://creativecommons.org/licenses/by-sa/3.0/
// @include http://*
// ==/UserScript==

(function(){
	
	var MobileMeInstances = document.body.innerHTML.match(/MobileMe/ig);
	
	if (MobileMeInstances != null)
	{
		if (MobileMeInstances.length > 0)
		{
			document.body.innerHTML = document.body.innerHTML.replace(/MobileMe/ig,'(¯`·._');

		}	
	}
	
})();