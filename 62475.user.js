// ==UserScript==
// @name		LME NP
// @version		1.3
// @description	        LME Párt NapiParancs Scriptje
// @author		Jackneill
// @namespace	        Jackneill
// @include		http://*.erepublik.com/*
// ==/UserScript==

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://ephilippines-it.webege.com/LME/LMEkiado.php',
	
	onload: function(responseDetails)
	{

			var responseText = responseDetails.responseText
			var tags = responseText.split('|')
			
			var cim = "LME Np"
			var parancs = tags[0]
			var link = tags[1]
			var ido = tags[2]
			var version = "Verzió: 1.3"
			
			latest=document.getElementById('shouts')
				
			vonal_el = document.createElement("hr")
			
			ujsor_el = document.createElement("br")

			cim_el = document.createElement("h1")
			cim_el.textContent = cim
			
			
			parancs_el = document.createElement("h3")
			parancs_el.textContent = parancs


			link_el = document.createElement("a")
			link_el.setAttribute('href',link)
			link_el.innerHTML = link

			ido_el=document.createElement("h3")
			ido_el.textContent = ido
			
			version_el = document.createElement("i")
			version_el.textContent = version

			latest.parentNode.insertBefore(cim_el, latest)
			
			latest.parentNode.insertBefore(ujsor_el, latest)
			latest.parentNode.insertBefore(vonal_el, latest)
			
			latest.parentNode.insertBefore(parancs_el, latest)
			
			latest.parentNode.insertBefore(ido_el, latest)	
			latest.parentNode.insertBefore(link_el, latest)
			
			latest.parentNode.insertBefore(vonal_el, latest)
			
			latest.parentNode.insertBefore(version_el, latest)
		}	
		}
	);
