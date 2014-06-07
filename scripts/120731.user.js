// ==UserScript==
// @name           Shit Hamine
// @namespace      http://friendsoftom.com
// @description    Replace text reading "Mit Hamine" on every web page with "Shit Hamine" 
// @version        0.1
// @date           12-17-2011
// @author         Cutout
// @include        *
// ==/UserScript==

(function(){
	
	var arrHamineInstances = document.body.innerHTML.match(/Mit Hamine/ig);
	
	if (arrHamineInstances != null)
	{
		if (arrHamineInstances.length > 0)
		{
			document.body.innerHTML = document.body.innerHTML.replace(/Mit Hamine/ig,'Shit Hamine');
		}	
	}
	
})();
