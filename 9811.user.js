// ==UserScript==
// @name          Dark Throne - Spy Missions
// @namespace     http://riddle.pl/h/greasemonkey/darkthrone.spymissions.user.js
// @author        ridd1e_PL
// @description   Appends all three direct links to spy missions in user's profile
// @include       http://omega.darkthrone.com/viewprofile.dt*
// @include       http://www.omega.darkthrone.com/viewprofile.dt*
// ==/UserScript==

var links = document.getElementsByTagName('a');

	for (var i = 0; i < links.length; i++) {
	
		var ismission = links[i].href.indexOf('spymissions');
		
		if (ismission > -1) {
		
			
			//http://darkthrone.com/infiltration.dt?session=&infil=158698
			//http://darkthrone.com/assassination.dt?session=&sas=158698
			//http://darkthrone.com/spy.dt?session=&spy=158698
			
			//http://omega.darkthrone.com/spymissions.dt?session=&spy=462289
			
			var infilhref = links[i].href.replace('spymissions.dt?session=&spy=','infiltration.dt?session=&infil=');
			var sashref = links[i].href.replace('spymissions.dt?session=&spy=','assassination.dt?session=&sas=');
			
			links[i].href = links[i].href.replace('spymissions','spy');
			links[i].innerHTML = 'Spy';
			
			var infil = document.createElement('a');
			infil.href = infilhref;
			infil.style.position = 'relative';
			infil.style.top = '-6px';
			infil.style.marginLeft = '10px;';
			infil.innerHTML = 'Infiltrate';
			
			var sas = document.createElement('a');
			sas.href = sashref;
			sas.style.position = 'relative';
			sas.style.top = '-6px';
			sas.style.marginLeft = '10px;';
			sas.innerHTML = 'Assassinate';
			
			var cont = links[i].parentNode;
			
			cont.appendChild(infil);
			cont.appendChild(sas);
			
			
			
		}
		
	}