// ==UserScript==
// @name           Ogame
// @namespace      Mwa
// @include        *ogame.fr*
// ==/UserScript==

var gal_coordonnees = [];
var compte = '';

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
	GM_setValue("afficherBarre", "oui");
	cliquer("//a[@id='loginBtn']");
	document.getElementById('serverLogin').selectedIndex=10;
	var fauxChangement = document.createEvent('Events');
	fauxChangement.initEvent('change', false, false);
	document.getElementById('serverLogin').dispatchEvent(fauxChangement);
	document.getElementById('usernameLogin').value = pseudo;
	document.getElementById('passwordLogin').value = mdp;
	cliquer("//input[@id='loginSubmit']");
}

function gal_estAEspionner(planete)
{
	var joueurPresent = document.evaluate("//div[@id='galaxyContent']/table/tbody/tr[@class='row']["+planete+"]/td[@class='action']/a[@title='|Envoyer une demande d`ami']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
	var joueurInactif = document.evaluate("//div[@id='galaxyContent']/table/tbody/tr[@class='row']["+planete+"]/td[contains(@class, 'longinactive') or contains(@class, 'inactive')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
	var joueurNoobVacances = document.evaluate("//div[@id='galaxyContent']/table/tbody/tr[@class='row']["+planete+"]/td[contains(@class, 'noob') or contains(@class, 'vacation')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
	var joueurRang = document.evaluate("//div[@id='galaxyContent']/table/tbody/tr[@class='row']["+planete+"]/td[contains(@class, 'playername')]/div/div/div[@class='body']/ul/li[@class='rank']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
	if (joueurRang != null)
		joueurRang = joueurRang.innerHTML.substr(joueurRang.innerHTML.indexOf('Place: ')+7);
	else
		joueurRang = -1;
	var allianceJoueur =  document.evaluate("//div[@id='galaxyContent']/table/tbody/tr[@class='row']["+planete+"]/td[@class='allytag']/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
	if (allianceJoueur != null)
		allianceJoueur = allianceJoueur.innerHTML.substr(0, allianceJoueur.innerHTML.indexOf('<'));
	else
		allianceJoueur = "";

		//	test = (joueurRang != -1 && joueurPresent != null && joueurNoobVacances == null && ( GM_getValue(compte+'typeEspionnage', 'liste') == 'liste' || (    parseInt(joueurRang) <= parseInt(GM_getValue(compte+'rangMaxEspionnage')) && parseInt(joueurRang) >= parseInt(GM_getValue(compte+'rangMinEspionnage')) && ( GM_getValue(compte+"inactifEspionnage") == '3' || (joueurInactif != null && GM_getValue(compte+"inactifEspionnage") == '1') || (joueurInactif == null && GM_getValue(compte+"inactifEspionnage") == '2') ) ) ));
//	alert(planete + " : \npresent : " + (joueurPresent != null) + "\ninactif : " + (joueurInactif != null) + "\nnoobVacances : " + (joueurNoobVacances != null) + "\nrang : " + joueurRang + "\ntest : " + test);
	
	return (joueurRang != -1 && joueurPresent != null && joueurNoobVacances == null && GM_getValue(compte+"alliancesEspionnage", '<.__DT__.>').indexOf("<"+allianceJoueur+">")<0 && ( GM_getValue(compte+'typeEspionnage', 'liste') == 'liste' || (    parseInt(joueurRang) <= parseInt(GM_getValue(compte+'rangMaxEspionnage')) && parseInt(joueurRang) >= parseInt(GM_getValue(compte+'rangMinEspionnage')) && ( GM_getValue(compte+"inactifEspionnage") == '3' || (joueurInactif != null && GM_getValue(compte+"inactifEspionnage") == '1') || (joueurInactif == null && GM_getValue(compte+"inactifEspionnage") == '2') ) ) ));
}

function gal_espionner(numeroPlanete)
{
	return cliquer("//div[@id='galaxyContent']/table/tbody/tr[@class='row']["+numeroPlanete+"]/td[@class='action']/a[@title='|Espionner']");
}

function gal_attendreEspionnage()
{
	var element = document.evaluate("//td[@id='fleetstatusrow']/div", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
	if (element)
	{
		if (element.innerHTML.indexOf('ok') >= 0)
			gal_espionnageSuivant();
		else
			setTimeout(function(){gal_allerA(gal_coordonnees[0][0], gal_coordonnees[0][1], gal_espionnerSuivant);}, 1000*15);
			document.getElementById('txtInfo').innerHTML = "Tentative d'espionnage en [" + gal_coordonnees[0][0] + ":" + gal_coordonnees[0][1] + ":" + gal_coordonnees[0][2] + "] impossible, nouvelle tentative dans 15 secondes.";
	} 
	else
		setTimeout(gal_attendreEspionnage, 1000);
}

function gal_espionnageSuivant(enleverPremier)
{
	if (enleverPremier == undefined)
		enleverPremier = true;
	actualiser = true;
	if (enleverPremier)
	{
		if (gal_coordonnees.length > 1 && gal_coordonnees[0][0] == gal_coordonnees[1][0] && gal_coordonnees[0][1] == gal_coordonnees[1][1])
			actualiser = false;
		gal_coordonnees.shift();	
	}
	if (gal_coordonnees.length > 0)
		if (actualiser)
			gal_allerA(gal_coordonnees[0][0], gal_coordonnees[0][1], gal_espionnerSuivant);
		else
			gal_espionnerSuivant();
	else
		document.getElementById('txtInfo').innerHTML = "Espionnages terminés !";
}

function gal_espionnerSuivant()
{
	document.getElementById('txtInfo').innerHTML = "Tentative d'espionnage en [" + gal_coordonnees[0][0] + ":" + gal_coordonnees[0][1] + ":" + gal_coordonnees[0][2] + "]";
	if (gal_estAEspionner(gal_coordonnees[0][2]))
	{
		var element = document.evaluate("//td[@id='fleetstatusrow']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
		element.innerHTML = "";
		if (gal_espionner(gal_coordonnees[0][2]))
			setTimeout(gal_attendreEspionnage, 1000);
		else
		{
			setTimeout(function(){gal_allerA(gal_coordonnees[0][0], gal_coordonnees[0][1], gal_espionnerSuivant);}, 1000*15);
			document.getElementById('txtInfo').innerHTML = "Tentative d'espionnage en [" + gal_coordonnees[0][0] + ":" + gal_coordonnees[0][1] + ":" + gal_coordonnees[0][2] + "] impossible, nouvelle tentative dans 15 secondes.";
		}
	}
	else
		gal_espionnageSuivant();
}

function gal_attendreAffichage(fonction)
{
	var element = document.evaluate("//table[@id='galaxytable']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
	if (element)
		fonction();
	else
	{
		setTimeout(function (){gal_attendreAffichage(fonction);},1000);	
		document.getElementById('txtInfo').innerHTML = "Affichage des coordonnées : " + galaxie + ":" + systeme + "(attente affichage...)";
	}
}

function gal_allerA(galaxie, systeme, fonction)
{
	document.getElementById('txtInfo').innerHTML = "Affichage des coordonnées : " + galaxie + ":" + systeme;
	document.getElementById('galaxy_input').value = galaxie;
	document.getElementById('system_input').value = systeme;
	var element = document.evaluate("//div[@id='galaxyContent']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
	element.innerHTML = "";
	cliquer("//div[@id='showbutton']");
	setTimeout(function (){gal_attendreAffichage(fonction);},1000);
}


function gal_recupererDonnees()
{
	if (GM_getValue(compte+'typeEspionnage', 'liste') == 'liste')
	{
		var coordonnees = prompt("Entrez les coordonnées des planètes !", GM_getValue(compte+"coordonneesEspionnage", "5:65:4 9 5:67:8"));
		if (coordonnees != null)
		{
			var gal = 1;
			var sys = 1;
			GM_setValue(compte+"coordonneesEspionnage", coordonnees)
			coord = coordonnees.split(' ');
			gal_coordonnees = [];
			for(var i=0 ; i<coord.length ; i++)
				if (coord[i].indexOf(':')>=0)
				{
					galSysPla = coord[i].split(':');
					gal = galSysPla[0];
					sys = galSysPla[1];
					gal_coordonnees.push([gal, sys, galSysPla[2]]);
				}
				else
					gal_coordonnees.push([gal, sys, coord[i]]);
		}
	}
	else if (GM_getValue(compte+'typeEspionnage', 'liste') == 'plage')
	{
		var debut = prompt("Entrez la première coordonnée de la plage à espionner !", GM_getValue(compte+"debutPlageEspionnage", "5:65:4"));
		if (debut != null)
		{
			GM_setValue(compte+"debutPlageEspionnage", debut);
			var fin = prompt("Entrez la dernière coordonnée de la plage à espionner !", GM_getValue(compte+"finPlageEspionnage", "5:71:10"));
			if (fin != null)
			{
				GM_setValue(compte+"finPlageEspionnage", fin);
				var rangMin = prompt("Entrez le rang minimal des joueurs à espionner !", GM_getValue(compte+"rangMinEspionnage", "2000"));
				if (rangMin != null)
				{
					GM_setValue(compte+"rangMinEspionnage", rangMin);
					var rangMax = prompt("Entrez le rang maximal des joueurs à espionner !", GM_getValue(compte+"rangMaxEspionnage", "99000"));
					if (rangMax != null)
					{
						GM_setValue(compte+"rangMaxEspionnage", rangMax);
						var alliances = prompt("Alliances à ne pas espionner (TAG entre <>)", GM_getValue(compte+"alliancesEspionnage", '<.__DT__.>'));
						if (alliances != null)
						{
							GM_setValue(compte+"alliancesEspionnage", alliances);
							var inactif = prompt("Voulez-vous espionner les inactifs ? (1 : que les inactifs  - 2 : que les actifs - 3 : tous)", GM_getValue(compte+"inactifEspionnage", '3'));
							if (inactif != null)
							{
								GM_setValue(compte+"inactifEspionnage", inactif);
								var galSysPlaDebut = GM_getValue(compte+"debutPlageEspionnage", "5:65:4").split(':');
								var galSysPlaFin = GM_getValue(compte+"finPlageEspionnage", "5:71:10").split(':');
								var g = parseInt(galSysPlaDebut[0]);
								var s = parseInt(galSysPlaDebut[1]);
								var p = parseInt(galSysPlaDebut[2]);
								var gFin = parseInt(galSysPlaFin[0]);
								var sFin = parseInt(galSysPlaFin[1]);
								var pFin = parseInt(galSysPlaFin[2]);
								gal_coordonnees = [];
								while ( g < gFin || (g == gFin && s < sFin) || (g == gFin && s == sFin && p <= pFin) )
								{
									while (s <= 499 && ( g < gFin || (g == gFin && s < sFin) || (g == gFin && s == sFin && p <= pFin) ))
									{
										while (p <= 15 && ( g < gFin || (g == gFin && s < sFin) || (g == gFin && s == sFin && p <= pFin) ))
										{
											gal_coordonnees.push([g, s, p]);
											p++;
										}
										if ( g < gFin || (g == gFin && s < sFin) || (g == gFin && s == sFin && p <= pFin) )
											p = 1;
										s++;
									}
									if ( g < gFin || (g == gFin && s < sFin) || (g == gFin && s == sFin && p <= pFin) )
										s = 1;
									g++;
								}
							}
						}
					}
				}
			}
		}
	}
}

function envoyerVaisseaux(order, galaxy, system, planet, planettype, shipCount) //sendShips
{

	GM_xmlhttpRequest(
		{
			method: "POST",
			url: "/game/index.php?page=minifleet&session=f8b78471bcbf&ajax=1",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
				"X-Requested-With": "XMLHttpRequest",
				"Accept": "*/*"
			},
			data: "mission="+order + "&galaxy=" + galaxy + "&system=" + system + "&position=" + planet + "&type=" + planettype + "&shipCount=" + shipCount,
			onload: function(response) {
				alert(response.responseText);
			}
		}
	);

}

if (window.location.href.indexOf('http://uni') >= 0)
{
	var element = document.evaluate("//div[@id='playerName']/span[@class='textBeefy']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
	compte = window.location.href.substring(10, window.location.href.indexOf('.'))+element.innerHTML+'_';
	if (compte == '111Mwa_')
	{
		var barre = document.createElement("div");
		barre.id = "maBarre";
		barre.setAttribute("style",
									"	position: absolute; " + 
									"	bottom: 35px; " + 
									"	text-align:center; " + 
									"	margin-top: -35px; " + 
									"	width: 100%;" +
									"	left: auto;"
		);
		//barre.style.margin = "0px auto";
		//barre.className ="clearfloat";
		barre.innerHTML = "MWAHAHAHAHA  (<a href='' id='masquerBarre' onclick='return false;' >m</a>) " + 
					(window.location.href.indexOf('page=galaxy') >= 0 ? 
					"<a href='' id='lancerEspionnageListe' onclick='return false;' >Espionner liste</a>" + 
					" <a href='' id='lancerEspionnagePlage' onclick='return false;' >Espionner plage</a>" : 
					"")
					+ "</br><div id='txtInfo'>" + "Aucune info..." + "</div>";
		var i = 0;
		while (i<document.body.childNodes.length && document.body.childNodes[i].className != "contentBoxBody")
			i++;
		if (GM_getValue("afficherBarre", "oui") == "oui")
		{
			document.body.childNodes[i].appendChild(barre);
			if (window.location.href.indexOf('page=galaxy') >= 0)
			{
				document.getElementById('lancerEspionnageListe').addEventListener('click', function(e) {
					GM_setValue(compte+'typeEspionnage', 'liste');
					gal_recupererDonnees();
					gal_espionnageSuivant(false);
				}, false);
				document.getElementById('lancerEspionnagePlage').addEventListener('click', function(e) {
					GM_setValue(compte+'typeEspionnage', 'plage');
					gal_recupererDonnees();
//					alert(gal_coordonnees.length);
					gal_espionnageSuivant(false);
				}, false);				
			}
			document.getElementById('masquerBarre').addEventListener('click', function(e) {
				document.getElementById('maBarre').parentNode.removeChild(document.getElementById('maBarre'))
				GM_setValue("afficherBarre", "non");
			}, false);
		}

	}
}
else if (window.location.href.indexOf('http://ogame.fr') >= 0)
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
	connexion.innerHTML = "MWAHAHAHAHA    " +
	"<a href='' id='connexion1' onclick='return false;' >Connexion</a>"
	// + "<br>Pastacaisse    <a href='' id='connexion2' onclick='return false;' >Connexion</a>"
	;
	document.getElementById('header').appendChild(connexion);
	document.getElementById('connexion1').addEventListener('click', function(e) {
		acc_connexion("user1", "mdp1");
	}, false);
/*
	document.getElementById('connexion2').addEventListener('click', function(e) {
		acc_connexion("user2", "mdp2");
	}, false);
*/
}
