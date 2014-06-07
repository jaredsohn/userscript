// ==UserScript==
// @description Skip advertisement interstitial.
// @grant       none
// @include     http://imgunix.com/*
// @include     http://www.creativecow.net/interstitial.php*
// @include     http://www.euro-pic.eu/*
// @include     http://www.imgnip.com/*
// @include     http://www.jeuxvideo.com/billboard_hp.htm
// @include     http://www.nintendo-master.com/*
// @include     http://www.pixsor.com/*
// @include     http://www.pixzilla.org/*
// @name        Skip advertisement
// @namespace   http://userscripts.org/users/nescafe
// @version     6
// ==/UserScript==

// Test document
if (('http://imgunix.com/' === document.location.href.substr(0, 19)) || ('http://www.euro-pic.eu/' === document.location.href.substr(0, 23)) || ('http://www.imgnip.com/' === document.location.href.substr(0, 22)) || ('http://www.pixsor.com/' === document.location.href.substr(0, 22)) || ('http://www.pixzilla.org/' === document.location.href.substr(0, 24)))
{
	// Call page method
	document.location.assign('javascript:doClose();');
}
else if ('http://www.creativecow.net/interstitial.php' === document.location.href.substr(0, 43))
{
	// Parse query
	g_a_sQuery = document.location.search.substring(1).split('&')

	// Loop through query
	for (var g_iIndex = 0; g_iIndex < g_a_sQuery.length; ++g_iIndex)
	{
		// Get element
		var g_a_sElement = g_a_sQuery[g_iIndex].split('=');

		// Test element
		if ('url' === g_a_sElement[0])
		{
			// Redirect
			document.location.assign(unescape(g_a_sElement[1]));
		}
	}
}
else if ('http://www.jeuxvideo.com/billboard_hp.htm' === document.location.href)
{
	// Call page method
	document.location.assign('javascript:redirection()');
}
else if ('http://www.nintendo-master.com/' === document.location.href.substr(0, 31))
{
	// Call page method
	document.location.assign('javascript:fermerpub();');
}
