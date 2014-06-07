// ==UserScript==
// @name           Fark Keyboard Shortcuts
// @include        http://*.fark.com/*
// @include        http://fark.com/*
// ==/UserScript==


(function getKeyevent(e)
{
	window.addEventListener('keypress', getKeyevent, true);
	
	if(e.which == 118)
	{
		window.stop();
		window.location = document.getElementById('bodyHeadlineContainer').getElementsByTagName('a')[3];
	}
})();