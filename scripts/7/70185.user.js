// ==UserScript==
// @name           CORSAIR FANBOY
// @namespace      no
// @description    renames someone
// @version        0.69
// @date           2010-3-1
// @author         Nick
// @license        AGPL
// @include        http://www.facepunch.com/
// ==/UserScript==

(function(){
	
	var arrWordInstances = document.body.innerHTML.match(/the/ig);
	
	if (arrWordInstances != null)
	{
		if (arrWordInstances.length > 0)
		{
			document.body.innerHTML = document.body.innerHTML.replace(/ferrus/ig,'Corsair Fanboy');
			
		}	
	}
	
})();