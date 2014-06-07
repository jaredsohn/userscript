// ==UserScript==
// @name		Napiparancs
// @version		0.1
// @description	napi parancs szkript
// @author		Gyermek
// @namespace	Gyermek
// @include		http://*erepublik.com/*
// ==/UserScript==






GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://truth.comxa.com/skyhuszar/np.php',

	onload:function(responseDetails){

			var responseText = responseDetails.responseText
			var tags = responseText.split('|')
			
			var cim = "Sky Huszar Szazad Napiparancs"
			var parancs = tags[0]
			var link = tags[1]
			var ido = tags[2]

			latest=document.getElementById('shouts')
				

			cim_el = document.createElement("h3")
			cim_el.textContent=cim
			
			
			parancs_el = document.createElement("h3")
			parancs_el.textContent=parancs


			link_el = document.createElement("a")
			link_el.setAttribute('href',link)
			link_el.innerHTML = link

			ido_el=document.createElement("h3")
			ido_el.textContent = ido

			latest.parentNode.insertBefore(cim_el, latest)
			latest.parentNode.insertBefore(parancs_el, latest)
			
			latest.parentNode.insertBefore(ido_el, latest)	
			latest.parentNode.insertBefore(link_el, latest)
		}	
		}
	);
