// ==UserScript==
// @name           Reddactied
// @namespace      blank
// @description    Replace [deleted] with [redacted] on Reddit
// @include        http*://*.reddit.com/*
// ==/UserScript==

(function(){
	
	var arrDelete = document.body.innerHTML.match(/\[deleted\]/ig);
	
	if (arrDelete != null)
	{
		if (arrDelete.length > 0)
		{
			document.body.innerHTML = document.body.innerHTML.replace(/\[deleted\]/ig,'[redacted]');
		}	
	}
	
})();
