// ==UserScript==
// @name         E-Univers : FlechesDebug
// @namespace    E-Univers : FlechesDebug
// @description	 Si vous perdez la possibilité d'utilisation des flêches dans la Galaxie, ce script est fait pour vous
// @author       Benoit485
// @version 	 0.1
// @include       http://beta*.e-univers.org/index.php?action=galaxie
// ==/UserScript==

document.addEventListener("keypress", cursorevent, true);

function cursorevent(event) 
{
	//alert(event.keyCode);
	
	if(event.keyCode == 37) 
	{
		g = document.getElementsByName('systemec')[0];
		g.value = parseInt(g.value)-1;
		//alert(document.getElementsByName('systemec')[0].value);
		document.getElementById('curseur_gal').submit();
	}

	if(event.keyCode == 39) 
	{
		g = document.getElementsByName('systemec')[0];
		g.value = parseInt(g.value)+1;
		document.getElementById('curseur_gal').submit();
	}

	if(event.keyCode == 38) 
	{
		g = document.getElementsByName('galaxiec')[0];
		g.value = parseInt(g.value)+1;
		document.getElementById('curseur_gal').submit();
	}

	if(event.keyCode == 40) 
	{
		g = document.getElementsByName('galaxiec')[0];
		g.value = parseInt(g.value)-1;
		document.getElementById('curseur_gal').submit();
	}
}
