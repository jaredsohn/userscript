// ==UserScript==
// @name           Anyone
// @namespace      http://www.youtube.com/watch?v=sBe5bQ1wZtI
// @description    Replace text reading "anypony" on Ponychan page with "anyone" 
// @include       http://www.ponychan.net*
// ==/UserScript==

(function(){
	
	var arrPonyInstances = document.body.innerHTML.match(/anypony/ig);
	
	if (arrPonyInstances != null)
	{
		if (arrPonyInstances.length > 0)
		{
			document.body.innerHTML = document.body.innerHTML.replace(/anypony/ig,'anyone');
		}	
	}
	
})();