// ==UserScript==
// @name           affiche sat
// @namespace      vulca

// @include        http://*.ogame.*/game/index.php*
// @exclude        http://*.ogame.*/game/index.php?page=galaxy*
// @exclude        http://*.ogame.*/game/index.php?page=imperium*

// ==/UserScript==


		function addPoints(nombre)
		{
			if (nombre<1000) {return nombre;} 
			else 
			{
				var signe = '';
				if (nombre<0)
				{
					nombre = Math.abs(nombre);
					signe = '-';
				}
				nombre=parseInt(nombre);
				var str = nombre.toString(), n = str.length;
				if (n <4) {return signe + nombre;} 
				else 
				{
					return  signe + (((n % 3) ? str.substr(0, n % 3) + '.' : '') + str.substr(n % 3).match(new RegExp('[0-9]{3}', 'g')).join('.'));
				}
			}
		}


	if ((document.getElementById('playerName'))) // Si ancienne version
	
{
var url = location.href;

		
	var ingenieur = (document.getElementsByTagName('body')[0].innerHTML.indexOf('="/game/img/layout/ingenieur_ikon_un.gif"') == -1 ? 1.1 : 1) ; 

	
	var energie = parseInt(document.getElementById("resources_energy").innerHTML.replace( /[^0-9-]/g, ""));
	var temperature = parseInt(document.getElementsByClassName('planetlink active tipsStandard')[0].title.split('°C')[1].replace( /[^0-9-]/g, ""));
	var tempMin = temperature-40;
	var prodSat = Math.floor(((temperature+tempMin)/2+160)/6)  * ingenieur;
		
	if ( energie < 0 )
	{
		
		var nbSat = Math.ceil(-energie / prodSat);

		var newElement = document.createElement("div");
		newElement.setAttribute("style","color:#FF5000;");
		newElement.innerHTML = 'Il faut construire : '+addPoints(nbSat) +' satellites' ;

		var parentNode = document.getElementById('officers');
		var RefNode = document.getElementById('officers').getElementsByTagName('a')[0];

		parentNode.insertBefore(newElement,    RefNode); // Affichage
	}






if(url.indexOf('page=resources&') > -1)
{
		function VaisseauOuvert()
		{

			if(document.getElementById('action'))
			{
				if(first)
				{	
					first = false;
					
					var nomBat = document.getElementById('content').getElementsByTagName('h2')[0].innerHTML;
				
					if( nomBat.indexOf('ine') > -1 || nomBat.indexOf('ynth')> -1 )
					{
						var commandant = 0;
						if( document.getElementsByTagName('body')[0].innerHTML.indexOf('="/game/img/layout/commander_ikon_un.gif"') == -1) 
							commandant=1;
					
						var energieReq = parseInt(document.getElementsByClassName('time')[1+commandant].innerHTML.replace( /[^0-9-]/g, ""));
					
						var nbSat = Math.ceil((-energie+energieReq) / prodSat);
						
						nbSat= ( nbSat<0 ? 0 : nbSat);
						
						var newElement = document.createElement("span"); // On crée un nouvelle élément div
						newElement.innerHTML = '(<span style="color:red;">'+nbSat+'</span> satellites)'; 
				
				document.getElementsByClassName('time')[1].appendChild(newElement);
					}
				}
			}
			else first = true;
		}
		
		var first = true;
		setInterval(VaisseauOuvert, 80);
}











	
}
		
	