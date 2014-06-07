// ==UserScript==
// @name           Lady Freeman
// @namespace      http://www.youtube.com/watch?v=nTbL5elVXrU
// @description    Replace text reading "Lady Gaga" on every web page with "Gordon Freeman." 
// @version        0.1
// @date           2009-12-30
// @author         David.H
// @license        AGPL
// @include        *
// ==/UserScript==

(function(){
	
	var arrGagaInstances = document.body.innerHTML.match(/Porn/ig);
	
	if (arrGagaInstances != null)
	{
		if (arrGagaInstances.length > 0)
		{
			document.body.innerHTML = document.body.innerHTML.replace(/porn/ig,'Gordon Freeman');
			document.body.innerHTML = document.body.innerHTML.replace(/onion /ig,'Freeman ');
			document.body.innerHTML = document.body.innerHTML.replace(/sex /ig,'Free ');	
			document.body.innerHTML = document.body.innerHTML.replace(/adult /ig,'Freem ');
			document.body.innerHTML = document.body.innerHTML.replace(/cumshot /ig,'Freema ');	
		}	
	}
	
})();