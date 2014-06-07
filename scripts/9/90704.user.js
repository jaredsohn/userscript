// ==UserScript==
// @name           Prefetch Google Ads at random
// @namespace      kiki
// @description    Prefetches Google Ad Links
// @include        http://*
// ==/UserScript==

(function() 
{
	window.addEventListener("load", function(e) 
	{
	    txt = "Load page" + document.location;
	    window.alert(txt);
		
		var l = document.getElementsByTagName('a');
		txt = "Founded " + l.length + "links";
	    window.alert(txt);
		
		for (i = 0; i < l.length; i++)
		{
			var link = l[i].href;	
			if ( link.match(/iclk\?/i) )
			{
			    rand = Math.floor(Math.random()*333;
				txt = "Random " + rand;
	            window.alert(txt);
		
				if ( rand == 33 )
				{
					txt = "Click on " + link;
	                window.alert(txt);
				
					GM_xmlhttpRequest({
					method:"GET",
					url:link,
					headers: {'Referer': document.location},
					onload:function(result) {
					}
					}
				});
			}
		}
	  }, false);
	}
)();