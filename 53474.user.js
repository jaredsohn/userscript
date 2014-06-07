// ==UserScript==
// @name           eRepublik Napiparancs
// @namespace      erepstats.com
// @include        http://www.erepublik.com/en
// ==/UserScript==






GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://lowrider.go.ro/',

	onload:function(responseDetails){

			var responseText = responseDetails.responseText;
			var tags = responseText.split('|');
			var parancs = tags[0];
			var link = tags[1]
			

			latest=document.getElementById('latestnews')

			parancs_el = document.createElement("h3")
			parancs_el.textContent=parancs

			link_el = document.createElement("a"); 
			link_el.setAttribute('href',link)
			link_el.innerHTML = link

			ido_el=document.createElement("h3")
			

			
			latest.parentNode.insertBefore(parancs_el, latest)
			latest.parentNode.insertBefore(link_el, latest)
		}	
		}
	);