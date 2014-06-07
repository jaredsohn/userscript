// ==UserScript==
// @name           RE_improved
// @description    Ajoute un lien vers speedSim (champs déjà rempli) et vers war-rider (profil de la cible) dans les rapports d'espionnage
// @namespace      Mwa
// @include        *ogame.fr/game/index.php?page=showmessage*
// @include        *ogame.fr/game/index.php?page=messages*
// @include        *ogame.fr/game/index.php?page=research*
// @include        *websim.speedsim.net*
// ==/UserScript==

var compte = '';

/////////////////////////////////
//////////   OPTIONS   //////////
/////////////////////////////////
	
	var nombreDeSimulations = 20;
	
	var defenseDansChampDeRuine = false;
	
	var pourcentageDansChampDeDebris = 50;

/////////////////////////////////
/////////   FIN OPTIONS  ////////
/////////////////////////////////

function recupererCoordonnéesNom()
{
	var titre = document.evaluate("//table[@class='material spy']/tbody/tr/th", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.innerHTML;
	var coord = titre.substring(titre.indexOf(')">[')+4, titre.indexOf(']</a> (')).split(":");
	return { nom : titre.substring(15, titre.indexOf(' <a onclick=')), galaxie : coord[0], systeme : coord[1], planete : coord[2] };
}

function enregistrerDonnees()
{
	GM_setValue('RE_to_simu', compte);
	if (document.evaluate("//table[@class='material spy']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue)
	{
		var coordNom = recupererCoordonnéesNom();
		var titre = document.evaluate("//table[@class='material spy']/tbody/tr/th", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.innerHTML;
		GM_setValue('reSimu_nom', coordNom.nom);
		GM_setValue('reSimu_coordonnees', coordNom.galaxie + ":" + coordNom.systeme + ":" + coordNom.planete);
		GM_setValue('reSimu_metal', document.evaluate("//table[@class='material spy']/tbody/tr[2]/td[2]/table/tbody/tr[1]/td[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.innerHTML.replace(' ', '').replace('.', ''));
		GM_setValue('reSimu_cristal', document.evaluate("//table[@class='material spy']/tbody/tr[2]/td[2]/table/tbody/tr[1]/td[4]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.innerHTML.replace(' ', '').replace('.', ''));
		GM_setValue('reSimu_deuterium', document.evaluate("//table[@class='material spy']/tbody/tr[2]/td[2]/table/tbody/tr[2]/td[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.innerHTML.replace(' ', '').replace('.', ''));	
	}
	var partie = 1;
	while (partie <= 4 && document.evaluate("//table[@class='fleetdefbuildings spy']["+partie+"]/tbody/tr/th", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue)
	{
		var ligne = 2;
		while (document.evaluate("//table[@class='fleetdefbuildings spy']["+partie+"]/tbody/tr["+ligne+"]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue)
		{
			if (partie != 3 || document.evaluate("//table[@class='fleetdefbuildings spy']["+partie+"]/tbody/tr["+ligne+"]/td[@class='key'][1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.innerHTML.indexof('Bouclier') >= 0 || document.evaluate("//table[@class='fleetdefbuildings spy']["+partie+"]/tbody/tr["+ligne+"]/td[@class='key'][1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.innerHTML.indexof('Protection des') >= 0 || document.evaluate("//table[@class='fleetdefbuildings spy']["+partie+"]/tbody/tr["+ligne+"]/td[@class='key'][1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.innerHTML.indexof('Armes') >= 0)
				GM_setValue("reSimu_"+document.evaluate("//table[@class='fleetdefbuildings spy']["+partie+"]/tbody/tr["+ligne+"]/td[@class='key'][1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.innerHTML, document.evaluate("//table[@class='fleetdefbuildings spy']["+partie+"]/tbody/tr["+ligne+"]/td[@class='value'][1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.innerHTML.replace('.', '').replace(',', '').replace(' ', ''));
			if (document.evaluate("//table[@class='fleetdefbuildings spy']["+partie+"]/tbody/tr["+ligne+"]/td[@class='key'][2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue)
				if (partie != 3 || document.evaluate("//table[@class='fleetdefbuildings spy']["+partie+"]/tbody/tr["+ligne+"]/td[@class='key'][2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.innerHTML.indexof('Bouclier') >= 0 || document.evaluate("//table[@class='fleetdefbuildings spy']["+partie+"]/tbody/tr["+ligne+"]/td[@class='key'][2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.innerHTML.indexof('Protection des') >= 0 || document.evaluate("//table[@class='fleetdefbuildings spy']["+partie+"]/tbody/tr["+ligne+"]/td[@class='key'][2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.innerHTML.indexof('Armes') >= 0)
					GM_setValue("reSimu_"+document.evaluate("//table[@class='fleetdefbuildings spy']["+partie+"]/tbody/tr["+ligne+"]/td[@class='key'][2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.innerHTML, document.evaluate("//table[@class='fleetdefbuildings spy']["+partie+"]/tbody/tr["+ligne+"]/td[@class='value'][2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.innerHTML.replace('.', '').replace(',', '').replace(' ', ''));
			ligne++;
		}
		partie++;
		if (partie == 3)
			partie++;
	}
}

function chargerDonnees()
{
	ressources = 0;
	valeurs = GM_listValues();
	for each (var val in valeurs)
		if (val.indexOf('reSimu_') >= 0)
		{
			switch (val)
			{
			case "reSimu_nom":
				document.evaluate("//input[@name='enemy_name']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = GM_getValue(val);
			break;
			case "reSimu_coordonnees":
				document.evaluate("//input[@name='enemy_pos']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = GM_getValue(val);
			break;
			case "reSimu_metal":
				document.evaluate("//input[@name='enemy_metal']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = GM_getValue(val);
				ressources += parseInt(GM_getValue(val));
			break;
			case "reSimu_cristal":
				document.evaluate("//input[@name='enemy_crystal']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = GM_getValue(val);
				ressources += parseInt(GM_getValue(val));
			break;
			case "reSimu_deuterium":
				document.evaluate("//input[@name='enemy_deut']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = GM_getValue(val);
				ressources += parseInt(GM_getValue(val));
			break;
			case "reSimu_Petit transporteur":
				document.evaluate("//input[@name='ship_d_0_b']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = GM_getValue(val);
			break;
			case "reSimu_Grand transporteur":
				document.evaluate("//input[@name='ship_d_1_b']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = GM_getValue(val);
			break;
			case "reSimu_Chasseur léger":
				document.evaluate("//input[@name='ship_d_2_b']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = GM_getValue(val);
			break;
			case "reSimu_Chasseur lourd":
				document.evaluate("//input[@name='ship_d_3_b']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = GM_getValue(val);
			break;
			case "reSimu_Croiseur":
				document.evaluate("//input[@name='ship_d_4_b']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = GM_getValue(val);
			break;
			case "reSimu_Vaisseau de bataille":
				document.evaluate("//input[@name='ship_d_5_b']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = GM_getValue(val);
			break;
			case "reSimu_Vaisseau de colonisation":
				document.evaluate("//input[@name='ship_d_6_b']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = GM_getValue(val);
			break;
			case "reSimu_Recycleur":
				document.evaluate("//input[@name='ship_d_7_b']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = GM_getValue(val);
			break;
			case "reSimu_Sonde d`espionnage":
				document.evaluate("//input[@name='ship_d_8_b']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = GM_getValue(val);
			break;
			case "reSimu_Bombardier":
				document.evaluate("//input[@name='ship_d_9_b']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = GM_getValue(val);
			break;
			case "reSimu_Satellite solaire":
				document.evaluate("//input[@name='ship_d_10_b']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = GM_getValue(val);
			break;
			case "reSimu_Destructeur":
				document.evaluate("//input[@name='ship_d_11_b']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = GM_getValue(val);
			break;
			case "reSimu_Étoile de la mort":
				document.evaluate("//input[@name='ship_d_12_b']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = GM_getValue(val);
			break;
			case "reSimu_Traqueur":
				document.evaluate("//input[@name='ship_d_13_b']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = GM_getValue(val);
			break;
			case "reSimu_Lanceur de missiles":
				document.evaluate("//input[@name='ship_d_14_b']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = GM_getValue(val);
			break;
			case "reSimu_Artillerie laser légère":
				document.evaluate("//input[@name='ship_d_15_b']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = GM_getValue(val);
			break;
			case "reSimu_Artillerie laser lourde":
				document.evaluate("//input[@name='ship_d_16_b']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = GM_getValue(val);
			break;
			case "reSimu_Canon de Gauss":
				document.evaluate("//input[@name='ship_d_17_b']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = GM_getValue(val);
			break;
			case "reSimu_Artillerie à ions":
				document.evaluate("//input[@name='ship_d_18_b']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = GM_getValue(val);
			break;
			case "reSimu_Lanceur de plasma":
				document.evaluate("//input[@name='ship_d_19_b']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = GM_getValue(val);
			break;
			case "reSimu_Petit bouclier":
				document.evaluate("//input[@name='ship_d_20_b']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = GM_getValue(val);
			break;
			case "reSimu_Grand bouclier":
				document.evaluate("//input[@name='ship_d_21_b']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = GM_getValue(val);
			break;
			case "reSimu_Technologie Armes":
				document.evaluate("//input[@name='tech_d_0']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = GM_getValue(val);
			break;
			case "reSimu_Technologie Bouclier":
				document.evaluate("//input[@name='tech_d_1']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = GM_getValue(val);
			break;
			case "reSimu_Technologie Protection des vaisseaux spatiaux":
				document.evaluate("//input[@name='tech_d_2']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = GM_getValue(val);
			break;
			}
			GM_deleteValue(val);
		}
	document.evaluate("//input[@name='tech_a_0']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = GM_getValue(compte+'RE_to_simu_techArmes', '');
	document.evaluate("//input[@name='tech_a_1']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = GM_getValue(compte+'RE_to_simu_techBouclier', '');
	document.evaluate("//input[@name='tech_a_2']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = GM_getValue(compte+'RE_to_simu_techProtection', '');
	document.evaluate("//input[@name='engine_0']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = GM_getValue(compte+'RE_to_simu_techCombustion', '');
	document.evaluate("//input[@name='engine_1']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = GM_getValue(compte+'RE_to_simu_techImpulsion', '');
	document.evaluate("//input[@name='engine_2']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = GM_getValue(compte+'RE_to_simu_techHyperespace', '');
	document.evaluate("//input[@name='start_pos']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = GM_getValue(compte+'RE_to_simu_coordonnees', '');
	document.evaluate("//input[@name='num_sim']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = nombreDeSimulations;
	document.evaluate("//input[@name='perc-df']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = pourcentageDansChampDeDebris;
	document.evaluate("//input[@name='def_to_df']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.checked = defenseDansChampDeRuine;
	document.evaluate("//input[@name='ship_a_1_b']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.value = Math.ceil(ressources / 50000);
}

function envoyerVaisseaux(order, galaxy, system, planet, planettype, shipCount) //sendShips
{

	GM_xmlhttpRequest(
		{
			method: "POST",
			url: "/game/index.php?page=minifleet&session=" + window.location.href.substring(window.location.href.indexOf('&session=')+9,window.location.href.indexOf('&', window.location.href.indexOf('&session=') + 9)) + "&ajax=1",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
				"X-Requested-With": "XMLHttpRequest",
				"Accept": "*/*"
			},
			data: "mission="+order + "&galaxy=" + galaxy + "&system=" + system + "&position=" + planet + "&type=" + planettype + "&shipCount=" + shipCount,
			onload: function(response) {
				var reponse = response.responseText.split(" ");
				switch (parseInt(reponse[0]))
				{
				case 600:
					GM_setValue(compte+'RE_to_simu_nbrSondes', reponse[5]);
					alert(reponse[5] + " sonde" + (reponse[5]=="1" ? " a" : "s ont") + " bien été envoyée" + (reponse[5]=="1" ? "" : "s") + " en " + reponse[7]);
				break;
				case 602:
					alert("Erreur! aucune lune à cet endroit : " + reponse[1]);
				break;
				case 603:
					alert("Erreur! le joueur ne peut être attaqué à cause de la protection des nouveaux joueurs : " + reponse[1]);
				break;
				case 604:
					alert("Ce joueur est trop fort, vous ne pouvez pas l`attaquer : " + reponse[1]);
				break;
				case 605:
					alert("Erreur! ce joueur est en mode vacances : " + reponse[1]);
				break;
				case 610:
					alert("Erreur, pas assez de vaisseaux disponibles, envoi du maximum possible : " + reponse[1]);
				break;
				case 611:
					alert("Erreur! pas de vaisseaux disponibles : " + reponse[1]);
				break;
				case 612:
					alert("Erreur! pas de slots de flotte libre : " + reponse[1]);
				break;
				case 613:
					alert("Erreur! pas assez de deutérium disponible : " + reponse[1]);
				break;
				case 614:
					alert("Erreur! aucune planète à cet endroit : " + reponse[1]);
				break;
				case 615:
					alert("Erreur! La capacité de chargement n`est pas suffisante : " + reponse[1]);
				break;
				case 616:
					alert("'Alerte au multi : " + reponse[1]);
				break;
				case 617:
					alert("Admin ou opérateur : " + reponse[1]);
				break;
				case 618:
					alert("Blocage général des attaques sur tout l'univers");
				break;
				default:
					alert("Une erreur est survenue.\nErreur : " + response.responseText);
				break;
				}
//600 3 54 0 15 4 1 [5:65:4]
			}
		}
	);

}

if (window.location.href.indexOf('http://uni') >= 0)
{
	var element = document.evaluate("//div[@id='playerName']/span[@class='textBeefy']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
	if (element != null)
		GM_setValue('compteCourant', window.location.href.substring(10, window.location.href.indexOf('.'))+element.innerHTML+'_');
	compte = GM_getValue('compteCourant');
	if (window.location.href.indexOf('ogame.fr/game/index.php?page=showmessage') >= 0)
	{
		var de = document.evaluate("//div[@id='messagebox']/div[@class='infohead']/table/tbody/tr[1]/td", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
		var objet = document.evaluate("//div[@id='messagebox']/div[@class='infohead']/table/tbody/tr[3]/td", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
		if (de.innerHTML.indexOf('Tour de contrôle ') >= 0 && objet.innerHTML.indexOf('Rapport d`espionnage') >= 0)
		{
			//speedSim
			var simu = document.createElement("li");
			simu.innerHTML = '<a id="simu" class="tipsStandard" href="http://websim.speedsim.net/index.php?version=1&lang=fr" target="blank"> Simuler avec SpeedSim ! </a>';
			var element = document.evaluate("//div[@id='messagebox']/div[@class='showMsgNavi']/ul[@class='toolbar']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
			element.appendChild(simu);
			document.getElementById('simu').addEventListener('click', function(e) {
				enregistrerDonnees();
			}, true);
			//war-riders
			var ligne = document.evaluate("//table[@class='material spy']/tbody/tr/th[@class='area']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
			if (ligne)
			{
				innerLigne = ligne.innerHTML;
				debut = innerLigne.substr(0, innerLigne.indexOf("(joueur '") + 9);
				fin = innerLigne.substr(innerLigne.indexOf("') le "));
				joueur = innerLigne.substring(innerLigne.indexOf("(joueur '") + 9, innerLigne.indexOf("') le "));
				uni = window.location.href.substring(10, window.location.href.indexOf('.ogame.'));
				ligne.innerHTML = debut + '<a href="http://www.war-riders.de/?lang=fr&uni=' + uni + '&page=search&post=1&type=player&name=' + joueur + '" target="blank">' + joueur + '</a>' + fin;
				var warRider = document.createElement("li");
				warRider.innerHTML = '<a id="warRider" class="tipsStandard" href="http://www.war-riders.de/?lang=fr&uni=' + uni + '&page=search&post=1&type=player&name=' + joueur + '" target="blank"> Voir sur War-Riders </a>';
				var element = document.evaluate("//div[@id='messagebox']/div[@class='showMsgNavi']/ul[@class='toolbar']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
				element.appendChild(warRider);
			}
			//espionnage
			var espioP = document.createElement("li");
			espioP.innerHTML = '<a id="espioP" class="tipsStandard" href=""> Espionner planète </a>';
			var espioL = document.createElement("li");
			espioL.innerHTML = '<a id="espioL" class="tipsStandard" href=""> Espionner lune </a>';
			var element = document.evaluate("//div[@id='messagebox']/div[@class='showMsgNavi']/ul[@class='toolbar']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
			element.appendChild(espioP);
			element.appendChild(espioL);
			document.getElementById('espioP').addEventListener('click', function(e) {
				var coordNom = recupererCoordonnéesNom();
				envoyerVaisseaux(6, coordNom.galaxie, coordNom.systeme, coordNom.planete, 1, parseInt(GM_getValue(compte+'RE_to_simu_nbrSondes', "4"))); // ordre (espionner : 6), galaxie, système, planète, type de planète (planète : 1), nombre de vaisseaux
			}, true);
			document.getElementById('espioL').addEventListener('click', function(e) {
				var coordNom = recupererCoordonnéesNom();
				envoyerVaisseaux(6, coordNom.galaxie, coordNom.systeme, coordNom.planete, 3, parseInt(GM_getValue(compte+'RE_to_simu_nbrSondes', "4"))); // ordre (espionner : 6), galaxie, système, planète, type de planète (planète : 1), nombre de vaisseaux
			}, true);
//600 3 54 0 15 4 1 [5:65:4]
			
		}		
	}
	else if (window.location.href.indexOf('ogame.fr/game/index.php?page=messages') >= 0)
	{
		var coord = document.evaluate("//a[@class='planetlink active tipsStandard']/span[@class='planet-koords']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.innerHTML;
		GM_setValue(compte+'RE_to_simu_coordonnees', coord.substring(coord.indexOf('[')+1, coord.indexOf(']')));
	}
	else if (window.location.href.indexOf('ogame.fr/game/index.php?page=research') >= 0)
	{
		var lvl = document.evaluate("//a[@id='details115']/span[@class='ecke']/span[@class='level']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.innerHTML;
		GM_setValue(compte+'RE_to_simu_techCombustion', lvl.substr(lvl.indexOf("</span>")+7));
		var lvl = document.evaluate("//a[@id='details117']/span[@class='ecke']/span[@class='level']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.innerHTML;
		GM_setValue(compte+'RE_to_simu_techImpulsion', lvl.substr(lvl.indexOf("</span>")+7));
		var lvl = document.evaluate("//a[@id='details118']/span[@class='ecke']/span[@class='level']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.innerHTML;
		GM_setValue(compte+'RE_to_simu_techHyperespace', lvl.substr(lvl.indexOf("</span>")+7));
		var lvl = document.evaluate("//a[@id='details109']/span[@class='ecke']/span[@class='level']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.innerHTML;
		GM_setValue(compte+'RE_to_simu_techArmes', lvl.substr(lvl.indexOf("</span>")+7));
		var lvl = document.evaluate("//a[@id='details110']/span[@class='ecke']/span[@class='level']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.innerHTML;
		GM_setValue(compte+'RE_to_simu_techBouclier', lvl.substr(lvl.indexOf("</span>")+7));
		var lvl = document.evaluate("//a[@id='details111']/span[@class='ecke']/span[@class='level']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.innerHTML;
		GM_setValue(compte+'RE_to_simu_techProtection', lvl.substr(lvl.indexOf("</span>")+7));	
	}
}
else if (window.location.href.indexOf('websim.speedsim.net') >= 0)
{
	if (GM_getValue('RE_to_simu', "non") != "non")
	{
		compte = GM_getValue('RE_to_simu', "non")
		GM_deleteValue('RE_to_simu');
		chargerDonnees();
	}
}