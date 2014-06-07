// ==UserScript==
// @name           PopUrls Digg Link Director
// @namespace      http://popurls.com/
// @description    Switches the links on popurl from pointing to Digg directly to the source article.
// @include        http://popurls.com*
// ==/UserScript==

var PU = Object();


PU.init = function() {

	uls = document.getElementsByTagName('UL');

	for ( i=0; i<3; i++ )
	{
		lis = uls[i].getElementsByTagName('li');

		
		for ( j=0; j<lis.length; j++ )
		{
			links = lis[j].getElementsByTagName('A');
			
			indir = false;
			dir = false;

			for ( k=0; k<links.length; k++ )
			{
				
				if ( !links[k].className )
					indir = links[k];

				if ( links[k].className == 'hrin')
					dir = links[k];

			}
			
			if (dir && indir)
			{
				indir.href = dir.href;
			}

		
		}
		
	
	}

}


window.addEventListener("load", PU.init, false);