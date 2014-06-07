// ==UserScript==
// @name           SRPSKI KORPUS - Naredjenja
// @namespace      www.erepublik.com
// @description    SRSPKI KORPUS - Naredjenja
// @version        1.00
// @include        http://www.erepublik.com/*
// ==/UserScript==

GM_xmlhttpRequest(
	{
		method: 'GET',
		url: 'http://pixelwars.x10hosting.com/SK/naredje.nje',

		onload:function(response)
		{
            //Retrieve and truncate string
			
			latest=document.getElementById('content');
        
			params_el = document.createElement("h3");
			params_el.innerHTML = response.responseText;
			
			latest.parentNode.insertBefore(params_el, latest);
			

		}	
	}
);