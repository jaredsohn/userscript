// ==UserScript==
// @name           Change Image Link To Image
// @namespace      http://userscripts.org/users/531617
// @description    
// @include        
// @copyright      2013 by Mizuho
// @license        (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/2.0/kr/
// @version        0.524
// @injectframes   1
// ==/UserScript==

(function()
{
	start();

	function start()
	{
		// Change Image Link To Image
		for( var i = 0; i < document.links.length; ++i )
		{
			var link = document.links[i].href;
			if( /.[jgp][pin][e]*[gf]/gi.test(link) )
			{
				if( !/searchbyimage/gi.test(link) )
				{
					var newlink = link.substring(link.lastIndexOf("http"), link.length);
					newlink = decodeURIComponent(newlink.replace(/\+/g,  " "));
					var linklength = newlink.lastIndexOf("&title=");
					if( linklength < 0 )
						linklength = newlink.length;
					newlink = newlink.substring(0, linklength);
					document.links[i].outerHTML = "<img src='" + newlink + "'>";
					--i;
				}
			}
		}
	}
})();