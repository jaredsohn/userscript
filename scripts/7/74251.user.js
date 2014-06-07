// ==UserScript==
// @name           Lucifer Bieber
// @namespace      http://strikegently.com/?p=19773
// @description    Replace text reading "Justin Bieber" on every web page with "The Artist of the Beast." 
// @version        0.1
// @date           4-12-2010
// @author         Sonictrey
// @include        *
// ==/UserScript==

(function(){
	
	var arrBieberInstances = document.body.innerHTML.match(/Justin Bieber/ig);
	
	if (arrBieberInstances != null)
	{
		if (arrBieberInstances.length > 0)
		{
			document.body.innerHTML = document.body.innerHTML.replace(/Justin Bieber/ig,'The Artist of the Beast');
			document.body.innerHTML = document.body.innerHTML.replace(/Bieber /ig,'Beast');	
		}	
	}
	
})();