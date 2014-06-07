// ==UserScript==
// @name           Idiot
// @namespace      *
// @description    cool
// @include        *
// ==/UserScript==

(function(){
	
	var arrPhoneInstances = document.body.innerHTML.match(/Idiot/ig);
	
	if (arrPhoneInstances != null)
	{
		if (arrPhoneInstances.length > 0)
		{
			document.body.innerHTML = document.body.innerHTML.replace(/Idiot/ig,'Idiot');	
		}	
	}
	
})();