// ==UserScript==
// @name          relinker
// @namespace     http://puremango.co.uk
// @description	  Makes external links open in new windows. Designed for del.icio.us, so you can easily open a webpage with losing del.icio.us. Also adds favions and main urls.
// @include       http://del.icio.us/*
// ==/UserScript==

(function() {
	thissite=document.location.hostname;
	for(i=0;i<document.links.length;i++)
	{
		if(document.links[i].protocol=="http:" && document.links[i].hostname!=thissite)
		{
			document.links[i].innerHTML = "<img height=16 border='0' src='http://"+document.links[i].hostname+"/favicon.ico'>&nbsp;" + document.links[i].innerHTML + "&nbsp;<i><small>("+document.links[i].hostname+")</small></i>";
			void(document.links[i].target='_blank');
		}
	}
})();
