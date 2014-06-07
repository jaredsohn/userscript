// ==UserScript==
// @name           SFP Bear Cavalry Orders (eRep)
// @namespace      www.erepublik.com
// @description    SFP Bear Cavalry Orders (eRep)
// @version        0.02
// @include        http://www.erepublik.com/en
// @include        http://www.erepublik.com/es
// ==/UserScript==

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://socialistfreedom.org/showthread.php?tid=353',

	onload:function(responseDetails){

			var responseText = responseDetails.responseText;
			var tags = responseText.split('~~');
			var parancs = tags[1];
			var regio = tags[2];
			var link = tags[3]
			var ido = tags[4]

			latest=document.getElementById('latestnews')

			parancs_el = document.createElement("h4")
			parancs_el.textContent=parancs + '         ' + regio 

			link_el = document.createElement("a"); 
			link_el.setAttribute('href',link)
			link_el.innerHTML = link

			ido_el=document.createElement("h4")
			ido_el.textContent ='Last Updated: ' + ido

			
			latest.parentNode.insertBefore(parancs_el, latest)
			
			latest.parentNode.insertBefore(ido_el, latest)	
			latest.parentNode.insertBefore(link_el, latest)
		}	
		}
	);