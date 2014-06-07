// ==UserScript==
// @name        compteur_nom
// @namespace   pyroscript_compteur_caracteres
// @description compte en temps reel le nombre de caractere du nom du cheval
// @include     http://*.equideow.com/elevage/chevaux/cheval?id=*
// @version     1.1.1
// ==/UserScript==
if (document.getElementById('profil-popup'))
	{
	var cpt = document.getElementById('horseNameName').parentNode.parentNode.getElementsByTagName('td')[2].getElementsByTagName('span')[0] ;
	cpt.innerHTML = '<span id="nbCarac" style="font-weight:bold;"></span> caract&egrave;res (max : 20 caract&egrave;res)' ;
	document.getElementById('nbCarac').innerHTML = document.getElementById('horseNameName').value.length ;
	
	document.getElementById('horseNameName').onkeyup = function() 
		{
		document.getElementById('nbCarac').innerHTML = document.getElementById('horseNameName').value.length ;
		if (document.getElementById('nbCarac').innerHTML > 20)
			{
			document.getElementById('nbCarac').setAttribute('style','color:red;') ;
			}
		else
			{
			document.getElementById('nbCarac').setAttribute('style','color:black;') ;
			}
		}
	}