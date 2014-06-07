// ==UserScript==
// @name           Chausseeette
// @namespace      Mwa
// @description    Chausseeette passe des commandes personnalisées
// @include        *ogame.fr*
// ==/UserScript==

function cliquer(xPath)
{
	var fauxClick = document.createEvent('MouseEvents');
    fauxClick.initMouseEvent('click', false, false, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
	var element = document.evaluate(xPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
	if (element)
	{
		element.dispatchEvent(fauxClick);
		return true;
	}
	else
		return false;
}

function acc_connexion(pseudo, mdp)
{
	cliquer("//a[@id='loginBtn']");
	document.getElementById('serverLogin').selectedIndex=10;
	var fauxChangement = document.createEvent('Events');
	fauxChangement.initEvent('change', false, false);
	document.getElementById('serverLogin').dispatchEvent(fauxChangement);
	document.getElementById('usernameLogin').value = pseudo;
	document.getElementById('passwordLogin').value = mdp;
	if (mdp != "")
		cliquer("//input[@id='loginSubmit']");
	else
		document.getElementById('passwordLogin').focus();
}

function attendreAffichage(fonction)
{
	var element = document.evaluate("//a[@id='link13' and @class='closed']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
	if (element)
		fonction();
	setTimeout(function (){attendreAffichage(fonction);},1000);	
}


if (window.location.href.indexOf('http://ogame.fr') >= 0 || window.location.href.indexOf('http://www.ogame.fr') >= 0)
{
	var connexion = document.createElement("div");
	connexion.id = "divConnexion";
	connexion.setAttribute("style",
								"	position: absolute; " + 
								"	top: 50px; " + 
								"	text-align:center; " + 
								"	width: 100%;" +
								"	left: auto;" +
								"	color: White;"
	);
	connexion.innerHTML = "Chausseeette    " + "<a href='' id='connexion1' onclick='return false;' >Connexion</a>"
	// 				  + "<br>Pastacaisse    <a href='' id='connexion2' onclick='return false;' >Connexion</a>"
	;
	document.getElementById('header').appendChild(connexion);
	document.getElementById('connexion1').addEventListener('click', function(e) {
		acc_connexion("Chausseeette", "");
	}, false);
/*
	document.getElementById('connexion2').addEventListener('click', function(e) {
		acc_connexion("pastacaisse", "");
	}, false);
*/
}
else if (window.location.href.indexOf('http://uni') >= 0 && window.location.href.indexOf('ogame.fr/game/index.php?page=alliance') >= 0)
{
	attendreAffichage(
		function()
		{
			cliquer("//a[@id='link12']");
			cliquer("//a[@id='link13']");
			cliquer("//a[@id='link14']");
		});
}