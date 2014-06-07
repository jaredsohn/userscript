// ==UserScript==
// @name           Bijeli Vukovi - Naredjenja
// @namespace      www.erepublik.com
// @description    Bijeli Vukovi - VeRS
// @version        1.00
// @include        http://www.erepublik.com/*
// ==/UserScript==

GM_xmlhttpRequest(
	{
		method: 'GET',
		url: 'https://docs.google.com/Doc?id=dd79fmwx_2c3fnwg3t',

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