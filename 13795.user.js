// ==UserScript==
// @name				Unblock Torrent Files
// @author				http://joshdick.net/programs
// @version				1.1
// @namespace	        		http://userscripts.org/users/37231/scripts
// @description	        		Rewrites links to .torrent files so that they are downloaded with a web proxy.
// @include				*
// ==/UserScript==

window.addEventListener("load", function(e) {
	var defaultProxy = 'http://txtor.dwerg.net/download?url=';
	var userProxy;

	if (!GM_getValue('userProxy')) {
		userProxy = prompt('Which web proxy would you like to use to download .torrent files?', defaultProxy);
		GM_setValue('userProxy', userProxy);
	} else {
		userProxy = GM_getValue('userProxy', defaultProxy);
	}

	var torrentParsers = new Array(3);
	torrentParsers[0] = /(.*\.torrent)/i;
	torrentParsers[1] = /(.*isohunt\.com\/download.*)/i;
	torrentParsers[2] = /(.*mininova\.org\/get.*)/i;

	for (var i = 0; i < document.links.length; i++)
	{
		var elem = document.links[i];

		for (var j = 0; j < torrentParsers.length; j++)
		{ 
			var torrentRegex = torrentParsers[j];
			if (elem.href.match(torrentRegex))
			{
				elem.href = userProxy + RegExp.$1;
			}	   
		}
	}
}, false);