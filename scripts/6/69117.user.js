// ==UserScript==
// @name           Google- Optimizer
// @namespace      http://www.google.de
// @description    Replace text reading "Google" on every web page with "Guugle." 
// @version        0.1
// @date           2009-12-30
// @author         Benny R.
// @license        AGPL
// @include        *
// ==/UserScript==

(function(){
	
	var arrGoogleInstances = document.body.innerHTML.match(/google/ig);
	
	if (arrGoogleInstances != null)
	{
		if (arrGoogleInstances.length > 0)
		{
			document.body.innerHTML = document.body.innerHTML.replace(/google/ig,'guuuuuuuugle');
			document.body.innerHTML = document.body.innerHTML.replace(/Google /ig,'Guuuuuuugle');	
		}	
	}
	
})();