// ==UserScript==
// @name        YouTube HD Redirect
// @namespace   https://userscripts.org/users/SystemDisc
// @description Redirects to a url including 'hd=1' while watching a video on YouTube if not already
// @include     /^http[s]?:\/\/([a-z0-9]+\.)?youtube(\.[a-z]+)+\/watch\?/
// @grant       none
// @run-at      document-start
// @downloadURL	https://userscripts.org/scripts/source/165813.user.js
// @updateURL	https://userscripts.org/scripts/source/165813.meta.js
// @version     0.02
// ==/UserScript==

// Do it
function make_hd()
{
	var hd = false;
	var new_url;
	var url = new String(window.location);

	// Remove HTML anchor
	if (url.indexOf('#') > -1) url = url.split('#')[0];
	new_url = url;
  
	// Make sure we have a querystring (just in case)
	if (url.indexOf('?') > -1)
	{
		url = url.split('?')[1];
		var segments = url.split('&');
		
		// Check to see if we currently have a requested format
		for (var i=0; i<segments.length; i++)
		{
			var current = segments[i].split('=');
			if (current[0] == "hd")
			{
				hd = current[1];
				if (hd) break;
			}
		}
    
		// If not redirect to video in HD format
		if (!hd)
		{
			window.location.replace(new_url + "&hd=1");
			return true;
		}
	}
  
	// Not a video link
	return false;
}

return make_hd();