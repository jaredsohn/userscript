// ==UserScript==
// @name        Aide aux pillages
// @namespace   Aide aux pillages
// @description Donne nombre PCs et Drones nécessaires aux pillages
// @include     http://*.spaccon.net/game/message.php?session=*
// @version     1
// ==/UserScript==

function recupereRessource (resource, rapport) 
{
	
	if (resource == 'acier') {
		var position = new Array(1, 1);
	} else if (resource == 'sili') {
		var position = new Array(1, 3);
	} else if (resource == 'deut') {
		var position = new Array(2, 1);
	}
	
	var quantiteS = rapport.getElementsByTagName('tr')[position[0]].getElementsByTagName('th')[position[1]].innerHTML;
	var quantiteS = quantiteS.replace( /[^0-9-]/g, "");

		return quantiteI = parseInt(quantiteS);
}

function espionner(rapport)
{
    alert(rapport);
}

function affiche (rapport, i)
{

	var acier = recupereRessource('acier', rapport);
	var sili = recupereRessource('sili', rapport);
	var deut = recupereRessource('deut', rapport);
	
	var totalResource = acier+sili+deut;
	var nombrePc = Math.ceil(totalResource/10000);
	var nombreDrone = Math.ceil(totalResource/10);
	var nombreGc = Math.ceil(totalResource/50000);
	
	var newElement = document.createElement('span');
		newElement.innerHTML = '   (' + nombrePc + ' PCs ou ' + nombreDrone + ' Drones ou ' + nombreGc +' GCs )';
	
	rapport.getElementsByTagName('td')[0].insertBefore(newElement, null);
	return true;
}

var table = document.getElementsByTagName('table');
var regex = new RegExp('(Ressources)', ["i"]);
for (i = 0; i < table.length; i++) 
{
	if (table[i].getAttribute('id') == 're') {
		var rapport = table[i].getElementsByTagName('tbody')[0].childNodes[6];
		var rapportTexte = rapport.textContent;

		if (regex.test(rapportTexte))
		{
			affiche(rapport, i);
		}
	}
}