// ==UserScript==
// @name           InfoCompte (v0.84) adapted for FORUMS
// @namespace      vulca adaptation by KBX
// @description    InfoCompte adapted by KBX for PHPBB FORUMS
// @include http://*uni*.ogame.fr/game/index.php*
// ==/UserScript==




/*=================================================================================================================
 DERNIERE MISE A JOUR : 11/11/2008
 TOPIC DU FORUM OFFICIEL : http://board.ogame.fr/thread.php?postid=8634035#post8634035
 SCRIPT POUR OGAME.FR v 0.83

=================================================================================================================*/


/* *******************************************************************************************************************************************************************************************/
/* ********************************************************************* Librairie SSU********* **************************************************************************************************/
/* *******************************************************************************************************************************************************************************************/

var thisData = 
{
	namespace: 'infocompte', // Nom simplifié. Doit être unique. Eviter les espaces, majuscules & accentuations.
	name: 'InfoCompte', // Nom complet
	version: '2.2.4', // Version du script
	scriptURL: 'http://vulca.hostarea.org/script/infocompte.user.js', // Lien pour installer le script (fichier hosté)
	options: showOptions // fonction lançant les options
}

/*//		changelog::start

2.2.2
Production calculé par SSU
Ajout de l'univers dans le BBcode

2.2.0
possibilité d'afficher la production par jours

2.1.7
correction mineur

v2.1.4
Demande aux joueur d'aller voir les pages nessessaire à l'affichage des points si elles n'ont pas été visités
Enregistre les point de reference que si toute les info sont récupérés

v2.1.3
legere modif sur le calul des points

v2.1.2
Correction d'un probleme au niveau de la RaZ auto (ça ne pouvais pas marcher ^^)

v2.1.1
Supression de l'espace au niveau de la celulle du BBcode

v2.1.0
Ajout d'une remise à 0 de la progression automatique tout les X jours ( à voir dans option)
Rétablissement de la possibilité d'enlevez la progression ( qui avait mysterieusement disparu ^^)
correction de mini Bug

v2.0.5
correction bug

v2.0.4
correction d'une boullette :rolle:

v2.0.3
petite modif

v2.0.2
correction des petit bug

v 2.0.1
Ajout du changelog

  v2.0.0
 - Script compactible avec la librairie SSU
 - Ajout de la progression par jours
 
  v1.4 
 - Le graphique peut être composé de plusieurs couleur
 
  v1.3 
 - Ajout des couleurs en fonction des progression positive ou negative
 
 v1.2 
 - Ajout du menu option
 
 v1.1
- Ajout du pourcentage des points lunes

 v1.0
- Modification du code pour une meilleur compatibilité et un meilleur temps d'exécution (by lemort)
 
   v0.9 
  Ajout de la progression
  
   v0.8 
 Correction de bug au niveau des lunes
 Ajout du pourcentage des points flotte en vol
 
   v0.7 
 Modification de l'affichage du BBcode par THSK
Réduction de la petite flèche pour que ça rentre ( merci DarkFire67  ;))
 
  v0.6 
Ajout d'un export BBcode
 
 v0.5 
 Ajout d'un grafique
 
v0.4 
Alignement du tableau avec la page ogame
Possibilité de choisir ce qu'on veut afficher ( Point Bâtiment Total + Point Indestructible notamment )

v0.3 
rectification de bug

v0.2 
Amélioration graphique
simplification du code


v0.1
Création du script InfoCompte 
//		changelog::end*/


var declareFun = 
{
	fun: ['Bip', 'addElem', '$', '$A', '$C', '$E', 'id_', 'doTheBlack', 'findPath', 'isData', 'evalFunctions'], // Fonctions que l'on souhaite utiliser.
	proto: ['find'], // Prototypes que l'on souhaite utiliser.
	vari: ['URL', 'JSON', 'DATA', 'actualTime', 'page', 'session', 'server'] // Variables que l'on souhaite utiliser.
};
/**			Il faut modifier les variables qui sont ci-dessus selon les besoins de votre script			**/

// Seyguai's Script - SSU Method
switch (unsafeWindow.ssu) 
{ // Diverses erreurs du script librairie.
	case undefined:
		unsafeWindow.ssu = false;
		return alert("Ce script fait partie d'une suite créée par Seyguai.\nSon bon fonctionnement implique la présence du script \"Seyguai's Scripts Utilities\" fourni sur le site de l'auteur.\n\nSi toutefois ce script est déjà installé, veuillez le placer en première position de la liste des autres scripts GreaseMonkey.\n(Il n'altèrera en rien le fonctionnement des autres scripts)\n\nExécution des scripts SSU interrompue.");
	case false:
		return;
	case 'error':
		unsafeWindow.ssu = false;
		return alert("Une erreur s'est produite lors de l'exécution de la librairie \"Seyguai's Scripts Utilities\". Merci de contacter l'auteur.\n\nExécution des scripts SSU interrompue.");
}

eval(unsafeWindow.ssu.fun.evalFunctions(declareFun)); // Définition des fonctions/prototype/variables

if (unsafeWindow.ssu.fun.addScript(thisData)) // Référencement du script
	return; // false si script bloqué, true sinon.



/* *******************************************************************************************************************************************************************************************/
/* ********************************************************************* Debut du script InfoCompte**************************************************************************************************/
/* *******************************************************************************************************************************************************************************************/

/* ******************************Fonction********************************/
// Affichage du graphique
function draw_pie(data)
{
	var data_url = data.join(","); 
	if(mine)
		{var labels_url = "Mines|Batiments|Technos|Flottes|Defenses";}
	if(BatTotal)
		{var labels_url = "Batiments|Technos|Flotte|Defense";}
	var google_url = "http://chart.apis.google.com/chart?cht=p3&chf=bg,s,efefef00&chs=250x100&chld=M&&chtt=&chl=" + labels_url + "&chco="+CouleurGraph+"&chd=t:" + data_url;
	var img = document.createElement("img");
	img.setAttribute("src",google_url);
	img.setAttribute("align","top");
	if (!debugGraphique) {img.setAttribute("style", "margin-top:-30px");} 
	return img;
}

// separateur de milier
function addPoints(nombre)
{
	if (nombre==0) {return nombre;} 
	else 
	{
		var signe = '';
		if (nombre<0)
		{
			nombre = Math.abs(nombre);
			signe = '-';
		}
		var str = nombre.toString(), n = str.length;
		if (n <4) {return signe + nombre;} 
		else 
		{
			return  signe + (((n % 3) ? str.substr(0, n % 3) + '.' : '') + str.substr(n % 3).match(new RegExp('[0-9]{3}', 'g')).join('.'));
		}
	}
}

function pourcent(nombre,ref)
{
	if (ref == 0) 
		{return 0;}
	else
	{
		var pourcent = parseInt(nombre/ref*1000)/10;
		return pourcent;
	}
}

function oui_non_en_checked(oui_non) 
{
	if (oui_non == "true") {return "checked";} 
	else {return "unchecked";} 
}

function showOptions() 
{
	var content = doTheBlack(thisData.namespace); // En rapport avec la version 1.1.0 de la librairie, maj du code.

	var couleur = new Array('','','','','');
	var listeCouleur = new Array();
	listeCouleur = option[0].split(/,/);
		
	for (var i=0 ; i< listeCouleur.length ; i++)
		{couleur[i] = listeCouleur[i];}

	for(var i=1 ; i<option.length -1 ; i++)
		{option[i] = oui_non_en_checked(option[i]);}

	var content = doTheBlack(thisData.namespace, true);
		content.addElem('b', {}, thisData.name + ' - Options');
		content.addElem('br');
		var table = content.addElem('table');
			var tr = table.addElem('tr');
				tr.addElem('td', {class: 'header', style: 'border: 0px none; background-color: transparent; height: 100%;'});
			
		tr.addElem('td', {class: 'header', style: 'border: 0px none; background-color: transparent; height: 100%;'});
		tr.addElem('td', {class: 'header', style: 'border: 0px none; background-color: transparent; height: 100%;'});
		
		tr.addElem('tr', {class: 'header', style: 'border: 0px none; background-color: transparent; height: 100%;', align: 'center', colspan: 2}, '<th>Couleurs du graphique (remplissez le nombre de case que vous voulez)</th> <th><input class="couleur" name="couleur" maxlength="6" value="'+couleur[0]+'" type="text" size="8" style="text-align:center;">  <input class="couleur" name="couleur" maxlength="6" value="'+couleur[1]+'" type="text" size="8" style="text-align:center;">  <input class="couleur" name="couleur" maxlength="6" value="'+couleur[2]+'" type="text" size="8" style="text-align:center;">  <input class="couleur" name="couleur" maxlength="6" value="'+couleur[3]+'" type="text" size="8" style="text-align:center;"> <input class="couleur" name="couleur" maxlength="6" value="'+couleur[4]+'" type="text" size="8" style="text-align:center;"></th>');			
		tr.addElem('tr', {class: 'header', style: 'border: 0px none; background-color: transparent; height: 100%;', align: 'center', colspan: 2}, '<th >Afficher les points b'+aaccent+'timents total</th> 					<th><input class="InfoOptions" '+option[1]+' name="batTotal" type="checkbox"></th>');
		tr.addElem('tr', {class: 'header', style: 'border: 0px none; background-color: transparent; height: 100%;', align: 'center', colspan: 2},  '<th>Afficher les points Indestructibles</th> 								<th><input class="InfoOptions" '+option[2]+' name="indestructible" type="checkbox"></th>');
		tr.addElem('tr', {class: 'header', style: 'border: 0px none; background-color: transparent; height: 100%;', align: 'center', colspan: 2}, '<th>Afficher les points Technologie</th> 									<th><input class="InfoOptions" '+option[3]+' name="Techno" type="checkbox"></th>');
		tr.addElem('tr', {class: 'header', style: 'border: 0px none; background-color: transparent; height: 100%;', align: 'center', colspan: 2},  '<th>Afficher les points Flotte</th> 										<th><input class="InfoOptions" '+option[4]+' name="Flotte" type="checkbox"></th>');
		tr.addElem('tr', {class: 'header', style: 'border: 0px none; background-color: transparent; height: 100%;', align: 'center', colspan: 2},  '<th>Afficher les points D'+eaigu+'fense</th> 								<th><input class="InfoOptions" '+option[5]+' name="Defense" type="checkbox"></th>');
		tr.addElem('tr', {class: 'header', style: 'border: 0px none; background-color: transparent; height: 100%;', align: 'center', colspan: 2}, '<th>Afficher le pourcentage des vaisseaux en vol</th> 							<th><input class="InfoOptions" '+option[6]+' name="vol" type="checkbox"></th>');
		tr.addElem('tr', {class: 'header', style: 'border: 0px none; background-color: transparent; height: 100%;', align: 'center', colspan: 2}, '<th>Afficher les points lune</th> 											<th><input class="InfoOptions" '+option[7]+' name="lune" type="checkbox"></th>');
		tr.addElem('tr', {class: 'header', style: 'border: 0px none; background-color: transparent; height: 100%;', align: 'center', colspan: 2}, '<th>Tout afficher sur la m'+echap+'me ligne (pour flotte en vol et points lune)</th> <th><input class="InfoOptions" '+option[8]+' name="br" type="checkbox"></th>');
		tr.addElem('tr', {class: 'header', style: 'border: 0px none; background-color: transparent; height: 100%;', align: 'center', colspan: 2},  '<th>Afficher la progression</th> 											<th><input class="InfoOptions" '+option[9]+' name="prog" type="checkbox"></th>');
		tr.addElem('tr', {class: 'header', style: 'border: 0px none; background-color: transparent; height: 100%;', align: 'center', colspan: 2},  '<th>Cochez si vous '+echap+'tes plusieur sur le m'+echap+'me ordi et m'+echap+'me univers</th><th><input class="InfoOptions" '+option[10]+' name="plein" type="checkbox"></th>');
		tr.addElem('tr', {class: 'header', style: 'border: 0px none; background-color: transparent; height: 100%;', align: 'center', colspan: 2},  '<th>Afficher en couleur en fonction de la progression</th>					<th><input class="InfoOptions" '+option[11]+' name="couleurProg" type="checkbox"></th>');
		tr.addElem('tr', {class: 'header', style: 'border: 0px none; background-color: transparent; height: 100%;', align: 'center', colspan: 2},  '<th>Afficher la progression par jours</th>									<th><input class="InfoOptions" '+option[12]+' name="progJours" type="checkbox"></th>');
		tr.addElem('tr', {class: 'header', style: 'border: 0px none; background-color: transparent; height: 100%;', align: 'center', colspan: 2}, '<th>Afficher la production des mines par jours </th> <th><input class="InfoOptions" '+option[13]+' name="ProdJours" type="checkbox"></th>');
		
		tr.addElem('tr', {class: 'header', style: 'border: 0px none; background-color: transparent; height: 100%;', align: 'center', colspan: 2}, '<th>Nombre de jours pour la remise à automatique (mettez 0 pour ne pas avoir de remise à 0 automatique)</th> <th><input class="raz" name="raz" maxlength="6" value="'+option[14]+'" type="text" size="8" style="text-align:center;">');
	
		
		tr.addElem('tr', {class: 'header', style: 'border: 0px none; background-color: transparent; height: 100%;', align: 'center', colspan: 2},  '<td class="c" colspan="2">Annuler / Enregistrer les modifications :</td>');
		tr.addElem('tr', {class: 'header', style: 'border: 0px none; background-color: transparent; height: 100%;', align: 'center', colspan: 2},  '<th class="boutton_VG"><input title="Utiliser les valeurs de base" value="Valeurs par d'+eaigu+'faut" type="submit" class="Reset_VG"></th><th class="boutton_VG"><input title="Enregistrer les modifications apport'+eaigu+'es" value="Sauver les Options du Script" type="submit" class="Sauver_VG"></th>');
	
			// Definition du code du bouton de reset :
		var Boutton = document.getElementsByClassName("Reset_VG");
				
		if (Boutton[0]) 
		{
			Boutton[0].addEventListener("click", function() 
			{
				if(confirm("Voulez-vous vraiment utiliser les valeurs par d"+eaigu+"faut ?")) 
				{
					GM_setValue("options"+uni+pseudo, "3333ff;false;false;true;true;true;true;false;false;true;false;true;true;false;0");

					BOUTTON = document.getElementsByClassName("boutton_VG");
					BOUTTON[0].innerHTML = '<a href="http://uni'+uni+'.ogame.fr/game/index.php?page=overview&session='+session+'">Enregistr'+eaigu+' ! Actualisez la page !</a>';
				}
				else 
				{
					alert ("Annulation...");
				}
			}, true);
		}
		// Definition du code du bouton de sauvegarde :
		var Boutton = document.getElementsByClassName("Sauver_VG");
				
		if (Boutton[0]) 
		{
			Boutton[0].addEventListener("click", function() 
			{
				var Block1 = document.getElementsByClassName('couleur');
				if (Block1[0].value) 
				{
					CouleurGraph='';
					for (var i =0 ; i< Block1.length; i++)
					{
						if (Block1[i].value.length == 6)
						{
							CouleurGraph += Block1[i].value + ',';
						}
					}
				}
				CouleurGraph = CouleurGraph.substring(0, CouleurGraph.length-1)
				
				var SOptions = CouleurGraph+';';
				var Block = document.getElementsByClassName('InfoOptions');
				for (var f=0 ; f < Block.length ; f++ )
				{
					if (Block[f].checked) 
						{SOptions += "true;";} 
					else 
						{SOptions += "false;";}
				}
				
				var Block2 = document.getElementsByClassName('raz');
				if (Block2[0].value) 
					{var nbJours = parseInt(Block2[0].value);}
				
				SOptions += nbJours;
				
				GM_setValue("options"+uni+pseudo, SOptions);
				
				BOUTTON = document.getElementsByClassName("boutton_VG");
				BOUTTON[1].innerHTML = '<a href="http://uni'+uni+'.ogame.fr/game/index.php?page=overview&session='+session+'">Enregistr'+eaigu+' ! Actualisez la page !</a>';
			}, true);
		}
}



/* ******************************Recuperation de ce qui est utile********************************/

	var uni = server.match(/uni(\d+)\.ogame\.fr/)[1];
	var url=location.href;
	var eaigu = String.fromCharCode(233);
	var egrave = String.fromCharCode(232);
	var agrave = String.fromCharCode(224);
	var aaccent = String.fromCharCode(226);
	var et = String.fromCharCode(38);
	var ptvirg = String.fromCharCode(59);
	var apos = String.fromCharCode(39);
	var emaj = String.fromCharCode(201);
	var echap = String.fromCharCode(234);

	if (PlusieurSurMemeUni)
		{var pseudo = GM_getValue("pseudo"+uni,'');}
	else
		{var pseudo ='';}
		
	var codeImg = 'R0lGODlhEAAQAPUAAChsKDA8EdrtwXvEApjWAYnNAur13EZRKoPJAidsJ8PjmJPTAcTxAIzDSJ3ZAbjJmqPdAZPKTJrVGozMHKfgAbvsALXoAHWRCXTAAqviAa/YepnMRFxlQ73hipSahLrgfJTQJ6ncN63If7PbfKPYOMHhl7HmALbch5+lkXS2BIekB4mtBni3BJTLRGu6AnmTCYzHPpS2Sc7t3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADIALAAAAAAQABAAAAaOQJlwSCwaE4Bk0igERAzQaARQBDQE2Cy2kSA2FJ3OY1xSmGFDp2b0EXk8qI/m1KLKAK4BiBQKxTgcIAMYdgAYKQEBB4sHiQgDhQMsiZSUBQiRBQsEGSYqiQQFkE0IBQQQK5QUDguYQxOmEBcXLwyrBRNEABsLDhUMwBALG3ZpEpwWFRYEEsVFSEpdTNNFQQA7';

	/* ******************************Option********************************/
	var OptionSauvegarde = GM_getValue("options"+uni+pseudo,"3333ff;false;false;true;true;true;true;false;false;true;false;true;true;0");
	var option = new Array();
	option = OptionSauvegarde.split(/;/);
	
	var CouleurGraph = option[0];

	var BatTotal = false; 
	var indestructible = false; 
	var techno = false; 
	var flottes = false; 
	var Def = false; 
	var VaisseauxVol  = false; 
	var pointLune = false; 
	var sauterLignePourPourcentageFlotteVol = false; 
	var progression = false; 
	var PlusieurSurMemeUni  = false;
	var debugGraphique = false;
	var couleurPoint = false ;
	var ProgJours = true;
	var ProdJours = true;

	if (option[1] == 'true')
		{BatTotal = true;} 
	if (option[2] == 'true')
		{indestructible = true;}
	if (option[3] == 'true')
		{techno = true; }
	if (option[4] == 'true')
		{flottes = true; }
	if (option[5] == 'true')
		{Def = true; }
	if (option[6] == 'true')
		{VaisseauxVol  = true;}
	if (option[7] == 'true')
		{pointLune = true;}
	if (option[8] == 'true')
		{sauterLignePourPourcentageFlotteVol = true;}
	if (option[9] == 'true')
		{progression = true;}
	if (option[10] == 'true')
		{PlusieurSurMemeUni  = true; }
	if (option[11] == 'true')
		{couleurPoint = true; }
	if (option[12] == 'false')
		{ProgJours = false; }
	if (option[13] == 'false')
		{ProdJours = false; }
	
if (page == 'overview')
{ 	
	if(BatTotal)
	{
		var AutreBat = false;
		var mine = false; 
	}
	else
	{
		var AutreBat = true;
		var mine = true; 
	}

	if (PlusieurSurMemeUni)
		{GM_setValue("pseudo"+uni,DATA.player.name);}
	
	var nom_def = new Array('lm', 'lle', 'llo', 'gauss', 'ion', 'pla', 'pb', 'gb', 'mic', 'mip');
	var prixInitial_def = new Array(2,2,8,37,8,130,20,100,10,25);

	
	var nom_techno = new Array('espi', 'ordi', 'arme', 'bouc', 'prot', 'ener', 'hype', 'comb', 'impu', 'phyp', 'lase', 'ions', 'plas', 'rese', 'expe');
	var prixInitial_techno = new Array(1.4,1,1,0.8,1,1.2,6,1,6.6,36,0.3,1.3,7,800,16);

	
	var nom_bat = new Array('mmet', 'mcri' , 'mdet', 'ces', 'cef', 'nan', 'lab', 'ter', 'silo', 'depo', 'cspa','rob', 'hmet', 'hcri', 'hdet', 'base', 'phal', 'port');
	var prixInitial_bat = new Array(0.075,0.072,0.3,0.105,1.44,1600,0.8,150,41,60,0.7,0.720,2,3,4,80,80,8000);
	var exposant = new Array(1.5,1.6,1.5,1.5,1.8,2,2,2,2,2,2,2,2,2,2,2,2,2)
	
	
	var PointsBatimentsTotal =0;
	var PointsMinesTotal=0;
	var PointsDefTotal=0;
	var pointLuneTotal = 0;
	var PointsTechno= 0;
	var PointsDefTotal=0;
	
	var info_bat = true;
	var info_tech = true;
	var info_def = true;
	var prod = 0;
	
	for (var f=0; f<DATA.planet.length ; f++)
	{
		/* ******************************Production********************************/
		prod+= DATA.planet[f].resource.prod.m+DATA.planet[f].resource.prod.c+DATA.planet[f].resource.prod.d;
		
		/* ******************************Batiment********************************/
		for (var i = 0 ; i<nom_bat.length ; i++)
		{		
			if (DATA.planet[f].building[nom_bat[i]] < 0) info_bat = false;
			if (i<3)
				{
					PointsMinesTotal+=Math.floor(prixInitial_bat[i]*(Math.pow(exposant[i],DATA.planet[f].building[nom_bat[i]])-1)/(exposant[i]-1)*1000)/1000;
				}
			else
			{
				if (i<15) 
					{PointsBatimentsTotal += Math.floor(prixInitial_bat[i] *(Math.pow(exposant[i],DATA.planet[f].building[nom_bat[i]])-1)/(exposant[i]-1)*1000)/1000;}
				if (i>9 && f<DATA.moon.length)
				{
					if (DATA.moon[f].building[nom_bat[i]] < 0) info_bat = false;
					pointLuneTotal += Math.floor(prixInitial_bat[i] *(Math.pow(exposant[i],DATA.moon[f].building[nom_bat[i]])-1)/(exposant[i]-1)*1000)/1000;
				}
			}
	
			/* ******************************Defense********************************/
			if ( i< nom_def.length)
			{
				if (DATA.planet[f].defence[nom_def[i]] < 0) info_def = false;
				PointsDefTotal += prixInitial_def[i] * DATA.planet[f].defence[nom_def[i]];
				
				
				if( f < DATA.moon.length )
				{
					if (DATA.moon[f].defence[nom_def[i]] < 0) info_def = false;
					PointsDefTotal += prixInitial_def[i] * DATA.moon[f].defence[nom_def[i]];
				}
			}
			
			/* ******************************Techno********************************/
			if (i<nom_techno.length && f==0)
			{
				if (DATA.techno[nom_techno[i]] < 0) info_tech = false;
				PointsTechno += Math.floor(prixInitial_techno[i] *(Math.pow(2,DATA.techno[nom_techno[i]])-1)*1000)/1000;
			}
		}
	}
	
	
	prod = parseInt(prod*24/1000);
	
	PointsBatimentsTotal=PointsBatimentsTotal+pointLuneTotal;
	pointLuneTotal=parseInt(pointLuneTotal);
	PointsBatimentsTotal=parseInt(PointsBatimentsTotal);
	PointsMinesTotal=parseInt(PointsMinesTotal);
	PointsTechno=parseInt(PointsTechno);
	PointsDefTotal=parseInt(PointsDefTotal);

	var PointsTotal = DATA.player.stats.player.ressources.value;
	var PointsFlotteTotal = PointsTotal-PointsTechno-PointsMinesTotal-PointsBatimentsTotal-PointsDefTotal;
	
	var prixVaisseauxVol =0;
	var nom_flotte = new Array('pt', 'gt', 'cle', 'clo', 'crois', 'vb', 'vc', 'rec', 'esp', 'bomb', 'dest','edlm','traq');
	var prixInitial_flotte = new Array(4,12,4,10,29,60,40,18,1,90,125,10000,85);
	
	/* ******************************Flotte en vol********************************/	
	for (var i=0 ; i<DATA.fleet.length ; i++)
	{
		if (DATA.fleet[i].mission.way == 'return' || DATA.fleet[i].mission.type == 'owndeploy' ) // Si flotte est sur le retour ou en stationné
		{
			for (var f=0 ; f<nom_flotte.length ; f++)
				{prixVaisseauxVol+= DATA.fleet[i].ships[nom_flotte[f]]*prixInitial_flotte[f];}
		}
	}

	/* ******************************recuperation des points de reference********************************/
	var dateComplete = new Date()+ '';

	var timetemp = actualTime-2 ;
	var PointRef = GM_getValue("PointRef"+uni+pseudo,PointsTotal+';'+dateComplete+';'+PointsMinesTotal+';'+PointsBatimentsTotal+';'+PointsTechno+';'+PointsFlotteTotal+';'+PointsDefTotal+';true;'+PointsTotal+';'+timetemp+'').split(/;/);
	
	var dates = new Array();
	
	dates = PointRef[1].split(/ /);
	dateRef = dates[2] +' '+dates[1];

	if(PointRef[7]== 'true' && info_def && info_tech && info_bat) // Si y'avais rien d'enregistré on enregistre
	{
		GM_setValue("PointRef"+uni+pseudo,PointsTotal+';'+dateComplete+';'+PointsMinesTotal+';'+PointsBatimentsTotal+';'+PointsTechno+';'+PointsFlotteTotal+';'+PointsDefTotal+';false;'+PointsTotal+';'+actualTime);
	}


	/* ******************************RaZ Auto********************************/	
	var RaZAuto = false;
	var nbjours=0;

	if (option[13]> 0)
	{
		RaZAuto = true;
		nbjours = (actualTime-Date.parse(PointRef[1])/1000)/(3600*24);
	}

	if ( RaZAuto && nbjours> option[13]  )
	{
		GM_setValue("PointRef"+uni+pseudo,PointsTotal+';'+dateComplete+';'+PointsMinesTotal+';'+PointsBatimentsTotal+';'+PointsTechno+';'+PointsFlotteTotal+';'+PointsDefTotal+';false;'+PointRef[8]+';'+PointRef[9]);
		alert('Remise à 0% de la progression effectuée');
	}
	
	/* ******************************BBcode********************************/	
	var BBcode="[center][size=24][b]D"+eaigu+"tail de l'investissement des points[/b][/size]\n\n";
	BBcode+="[size=18]Points Total : [b][color=#ff0000]"+addPoints(PointsTotal)+"[/color][/b][/size]\n";

	var nbAfficher=0; // Nombre de colone a afficher (pour graphique)
	if(mine) 
	{
		nbAfficher++;
		BBcode+="Points Mines :	[b][color=#ff0000]"+addPoints(PointsMinesTotal)+"[/color][/b] soit  [b][color=#ff0000]"+pourcent(PointsMinesTotal,PointsTotal)+"[/color][/b] % \n";
	}
	if(AutreBat) 
	{
		nbAfficher++;
		BBcode+="Points Autres B"+aaccent+"timents :	[b][color=#ff0000]"+addPoints(PointsBatimentsTotal)+"[/color][/b] soit [b][color=#ff0000]"+pourcent(PointsBatimentsTotal,PointsTotal)+"[/color][/b] % \n";
	}
	if(BatTotal) 
	{
		nbAfficher++;
		BBcode+="Points B"+aaccent+"timents : [b][color=#ff0000]"+addPoints(PointsMinesTotal+PointsBatimentsTotal)+"[/color][/b] soit  [b][color=#ff0000]"+pourcent(PointsMinesTotal+PointsBatimentsTotal,PointsTotal)+"[/color][/b] % \n";
	}
	if(techno) nbAfficher++;
	if(flottes) nbAfficher++;
	if(Def) nbAfficher++;
	if(indestructible) nbAfficher++;
	
	BBcode+="Points Technologies :	[b][color=#ff0000]"+addPoints(PointsTechno)+"[/color][/b] soit [b][color=#ff0000]"+pourcent(PointsTechno,PointsTotal)+"[/color][/b] %\n";
	BBcode+="Points Flotte :	[b][color=#ff0000]"+addPoints(PointsFlotteTotal)+"[/color][/b]  soit [b][color=#ff0000]"+pourcent(PointsFlotteTotal,PointsTotal)+"[/color][/b] % \n";
	BBcode+="Points D"+eaigu+"fense :	[b][color=#fF0000]"+addPoints(PointsDefTotal)+"[/color][/b] soit [b][color=#ff0000]"+pourcent(PointsDefTotal,PointsTotal)+"[/color][/b] % \n\n";
	BBcode+="Votre compte poss"+egrave+"de donc [b][color=#ff0000]"+addPoints(PointsMinesTotal+PointsBatimentsTotal+PointsTechno)+"[/color][/b] soit [b][color=#ff0000]"+pourcent(PointsMinesTotal+PointsBatimentsTotal+PointsTechno,PointsTotal)+"[/color][/b] % de points indestructibles\n";	
	BBcode+='Progression moyenne : [b][color=#ff0000]'+addPoints(Math.round((PointsTotal- PointRef[8])/((actualTime-PointRef[9])/(3600*24))))+ ' [/color][/b]Points par jour\n';
	BBcode+='Production : [b][color=#ff0000]'+addPoints(Math.round(prod))+ ' [/color][/b]Points par jour\n';
	BBcode+="Uni : [b][color=#ff0000]"+ uni+"[/color][/b][/center]"
	/* ******************************Etablissement des couleurs********************************/
	var Color_mine= '';
	var Color_autreBat= '';
	var Color_batTotal= '';
	var Color_techno= '';
	var Color_flotte= '';
	var Color_def= '';
	var Color_indestr= '';
	var Color_prog= '';
	
	if	(couleurPoint)
	{
		if(PointsMinesTotal>parseInt(PointRef[2])+1) 			{Color_mine= 'style="color: #00FF00;"';}
		else if (PointsMinesTotal<parseInt(PointRef[2]) -1) 	{Color_mine= 'style="color: #FF0000;"';}
		
		if( PointsBatimentsTotal>parseInt(PointRef[3])+1) 		{Color_autreBat= 'style="color: #00FF00;"';}
		else if (PointsBatimentsTotal<parseInt(PointRef[3])-1) 	{Color_autreBat= 'style="color: #FF0000;"';}
		
		if((PointsMinesTotal+PointsBatimentsTotal)>(parseInt(PointRef[2])+parseInt(PointRef[3])+1)) 			{Color_batTotal= 'style="color: #00FF00;"';}
		else if ((PointsMinesTotal+PointsBatimentsTotal)<(parseInt(PointRef[2])+parseInt(PointRef[3])) -1)  	{Color_batTotal= 'style="color: #FF0000;"';}
		
		if( PointsTechno>parseInt(PointRef[4])+1) 			{Color_techno= 'style="color: #00FF00;"';}
		else if (PointsTechno<parseInt(PointRef[4]) -1) 		{Color_techno= 'style="color: #FF0000;"';}
		
		if( PointsFlotteTotal>parseInt(PointRef[5])+1) 		{Color_flotte= 'style="color: #00FF00;"';}
		else if (PointsFlotteTotal<parseInt(PointRef[5]) -1) 	{Color_flotte= 'style="color: #FF0000;"';}
		
		if( PointsDefTotal>parseInt(PointRef[6])+1)			{Color_def= 'style="color: #00FF00;"';}
		else if (PointsDefTotal<parseInt(PointRef[6]) -1) 		{Color_def= 'style="color: #FF0000;"';}
		
		if((PointsMinesTotal+PointsBatimentsTotal+PointsTechno)>(parseInt(PointRef[2])+parseInt(PointRef[3])+parseInt(PointRef[4])+1)) 			{Color_indestr= 'style="color: #00FF00;"';}
		else if((PointsMinesTotal+PointsBatimentsTotal+PointsTechno)<(parseInt(PointRef[2])+parseInt(PointRef[3])+parseInt(PointRef[4]) -1)) 	{Color_indestr= 'style="color: #FF0000;"';}

		if( PointsTotal>parseInt(PointRef[0])+1) 				{Color_prog= 'style="color: #00FF00;"';}
		else if (PointsTotal<parseInt(PointRef[0]) -1) 		{Color_prog= 'style="color: #FF0000;"';}
	}	
	
	/* ******************************option affichage********************************/
	var br = '';
	if (!sauterLignePourPourcentageFlotteVol)
		{br ='<br/>';}
	
	var flottesEnVol = '';
	if(VaisseauxVol && PointsFlotteTotal>0) 
		{flottesEnVol = ' '+br+pourcent(prixVaisseauxVol,PointsFlotteTotal)+' % en vol';}
		
	var affichePointLune ='';
	if (pointLune && AutreBat)
		{affichePointLune = ' '+br+pourcent(pointLuneTotal,PointsBatimentsTotal)+' % sur lune';}
	else if (pointLune && BatTotal)
		{affichePointLune = ' '+br+pourcent(pointLuneTotal,(PointsMinesTotal+PointsBatimentsTotal))+' % sur lune';}

		
/* *******************************************************************************************************************************************************************************************/
/* ***************************************************************************Affichage ********************************************************************************************************/
/* *******************************************************************************************************************************************************************************************/	
		var styleBB = 'none';

	var tr = addElem(findPath('//tbody')[5], 'tr');
	tr.addElem('td', {class: 'c', width: '60px', colspan: 4}, 'D'+eaigu+'tail de l\'investissement des points');
	
	var a = tr.addElem('td', {style: 'background-color: transparent;'}).addElem('a', {title: 'Cliquez pour afficher le BBcode (pour forum)'})
	var img = a.addElem('img', {id: 'pointRef', style: 'margin-left:-20px; position: relative;', src: 'data:image/gif;base64,'+codeImg});
	img.$E(
	{
		click: function (event) // Affiche si clique si clique
		{
			var cellule = id_('zonecode');
			if (styleBB == 'none') 
			{
				cellule.style.display = '';
				styleBB= '';
			}
			else 
			{
				cellule.style.display = 'none';
				styleBB= 'none';
			}
		}
	});
	var tr = addElem(findPath('//tbody')[5], 'tr', {id: 'zonecode', style:'display:'+styleBB+';'}); // Contient BBcode, invisible par defaut
	tr.addElem('td', {colspan: 4},'<textarea cols="20" onClick="javascript:this.select();">'+BBcode+'</textarea>');
	
	if(mine)
	{
		var tr = addElem(findPath('//tbody')[5], 'tr');
		tr.addElem('th', { width: '60px', colspan:1}, 'Mines');
		
		
			tr.addElem('th', { width: '60px', colspan:2},'<a '+Color_mine+' TITLE="'+addPoints(Math.round(PointsMinesTotal-parseInt(PointRef[2])))+' Points ('+pourcent(PointsMinesTotal-parseInt(PointRef[2]),PointsMinesTotal)+' %)";>'+addPoints(PointsMinesTotal)+' ( '+pourcent(PointsMinesTotal,PointsTotal)+' % ) </a>');
			tr.addElem('th', { id:'piebox', rowspan:nbAfficher },'');
		
		if(!info_bat) tr.addElem('th', { width: '60px', colspan:2},'Vous devez visiter toutes vos pages bâtiments');
			
	}
	if(AutreBat)
	{
		var tr = addElem(findPath('//tbody')[5], 'tr');
		tr.addElem('th', { width: '60px', colspan:1}, 'Autres B'+aaccent+'ti');
	
		
		tr.addElem('th', { width: '60px', colspan:2},'<a '+Color_autreBat+' TITLE="'+addPoints(Math.round(PointsBatimentsTotal-parseInt(PointRef[3])))+' Points  ('+pourcent(PointsBatimentsTotal-parseInt(PointRef[3]),PointsBatimentsTotal)+' %)";>'+addPoints(PointsBatimentsTotal)+' ( '+pourcent(PointsBatimentsTotal,PointsTotal)+' % )  </a>'+affichePointLune+'</th>');
		
		if(!info_bat) tr.addElem('th', { width: '60px', colspan:2},'Vous devez visiter toutes vos pages bâtiments');

	}
	if(BatTotal)
	{
		var tr = addElem(findPath('//tbody')[5], 'tr');
		tr.addElem('th', { width: '60px', colspan:1}, 'B'+aaccent+'timents');
		
		
			tr.addElem('th', { width: '60px', colspan:2},'<a '+Color_batTotal+' TITLE="'+addPoints(Math.round((PointsMinesTotal+PointsBatimentsTotal)-(parseInt(PointRef[2])+parseInt(PointRef[3]))))+' Points ('+pourcent((PointsMinesTotal+PointsBatimentsTotal)-(parseInt(PointRef[2])+parseInt(PointRef[3])),PointsMinesTotal+PointsBatimentsTotal)+' %)";>'+addPoints(PointsMinesTotal+PointsBatimentsTotal)+' ( '+pourcent(PointsMinesTotal+PointsBatimentsTotal,PointsTotal)+' % )  </a>'+affichePointLune);
			tr.addElem('th', { id:'piebox', rowspan:nbAfficher },'');	
		
		if(!info_bat) tr.addElem('th', { width: '60px', colspan:2},'Vous devez visiter toutes vos pages bâtiments');
	}
	if(techno)
	{
		var tr = addElem(findPath('//tbody')[5], 'tr');
		 tr.addElem('th', { width: '60px', colspan:1}, '<a href="http://uni'+uni+'.ogame.fr/game/index.php?page=statistics&session='+session+'&who=player&type=research&start=-1&sort_per_member=0">Technologies</a>');
		if(!info_tech) tr.addElem('th', { width: '60px', colspan:2},'Vous devez visiter une page de laboratoire');
		tr.addElem('th', { width: '60px', colspan:2},'<a '+Color_techno+' TITLE="'+addPoints(Math.round(PointsTechno-parseInt(PointRef[4])))+' Points ('+pourcent(PointsTechno-parseInt(PointRef[4]),PointsTechno)+' %)";>'+addPoints(PointsTechno)+' ( '+pourcent(PointsTechno,PointsTotal)+' % ) </a>');
	}
	if(flottes)
	{
		var tr = addElem(findPath('//tbody')[5], 'tr');
		tr.addElem('th', { width: '60px', colspan:1}, '<a href="http://uni'+uni+'.ogame.fr/game/index.php?page=statistics&session='+session+'&who=player&type=fleet&start=-1&sort_per_member=0">Flotte</a>');
		tr.addElem('th', { width: '60px', colspan:2},'<a '+Color_flotte+' TITLE="'+addPoints(Math.round(PointsFlotteTotal-parseInt(PointRef[5])))+' Points ('+pourcent(PointsFlotteTotal-parseInt(PointRef[5]),PointsFlotteTotal)+' %)";>'+addPoints(PointsFlotteTotal) + ' ( '+pourcent(PointsFlotteTotal,PointsTotal)+' % ) </a>'+flottesEnVol);
	}
	if(Def)
	{
		var tr = addElem(findPath('//tbody')[5], 'tr');
		tr.addElem('th', { width: '60px', colspan:1}, 'D'+eaigu+'fense');
		 tr.addElem('th', { width: '60px', colspan:2},'<a '+Color_def+' TITLE="'+addPoints(Math.round(PointsDefTotal-parseInt(PointRef[6])))+' Points ('+pourcent(PointsDefTotal-parseInt(PointRef[6]),PointsDefTotal)+' %)";>'+addPoints(PointsDefTotal)+' ( '+pourcent(PointsDefTotal,PointsTotal)+' % ) </a>');
		if(!info_def) tr.addElem('th', { width: '60px', colspan:2},'Vous devez visiter toutes vos pages defense');	}
	if(indestructible)
	{
		var tr = addElem(findPath('//tbody')[5], 'tr');
		tr.addElem('th', { width: '60px', colspan:1}, 'Indestructible');
		tr.addElem('th', { width: '60px', colspan:2},'<a '+Color_indestr+' TITLE="'+addPoints(Math.round((PointsMinesTotal+PointsBatimentsTotal+PointsTechno)-(parseInt(PointRef[2])+parseInt(PointRef[3])+parseInt(PointRef[4]))))+' Points ('+pourcent((PointsMinesTotal+PointsBatimentsTotal+PointsTechno)-(parseInt(PointRef[2])+parseInt(PointRef[3])+parseInt(PointRef[4])),PointsMinesTotal+PointsBatimentsTotal+PointsTechno)+' %)";>'+addPoints(PointsMinesTotal+PointsBatimentsTotal+PointsTechno)+' ( '+pourcent(PointsMinesTotal+PointsBatimentsTotal+PointsTechno,PointsTotal)+' % ) </a>');
	}

	if (progression)
	{
		var tr = addElem(findPath('//tbody')[5], 'tr');
		tr.addElem('th', {width: '60px', colspan: 1}, 'Progression');
		tr.addElem('th', {colspan: 3}, '<span '+Color_prog+'>'+addPoints(Math.round(PointsTotal-parseInt(PointRef[0])))+' points (soit ' +Math.round((PointsTotal-PointRef[0])/PointRef[0]*1000)/10 +' %) depuis le '+dateRef+'</span>');
		var a = tr.addElem('td', {style: 'background-color: transparent;'}).addElem('a', {title: 'Cliquez pour remettre votre progression à 0'})
			var img = a.addElem('img', {id: 'pointRef', style: 'margin-left:-20px; position: relative;', src: 'data:image/gif;base64,'+codeImg});
			img.$E(
			{
				click: function (event) // RAZ si clique
				{
					if(confirm('Etes vous sur de vouloir r'+eaigu+'initialiser votre progression ?')) 
					{	
						GM_setValue("PointRef"+uni+pseudo,PointsTotal+';'+dateComplete+';'+PointsMinesTotal+';'+PointsBatimentsTotal+';'+PointsTechno+';'+PointsFlotteTotal+';'+PointsDefTotal+';false;'+PointRef[8]+';'+PointRef[9]);
						alert('Remise à 0% effectuée');
					}	
				}
			});
	}
	if(ProgJours)
	{
		var tr = addElem(findPath('//tbody')[5], 'tr');
		tr.addElem('th', { width: '60px', colspan:1}, 'Moyenne');
		tr.addElem('th', { width: '60px', colspan:3},addPoints(Math.round((PointsTotal- PointRef[8])/((actualTime-PointRef[9])/(3600*24))))+ ' Points par jour');
	}
	
	if(ProdJours)
	{
		var tr = addElem(findPath('//tbody')[5], 'tr');
		tr.addElem('th', { width: '60px', colspan:1}, 'Production');
		tr.addElem('th', { width: '60px', colspan:3},addPoints(prod)+ ' Points par jour');
	}


	/* ******************************Graphique ********************************/
	if (mine)
		{var pie = draw_pie([pourcent(PointsMinesTotal,PointsTotal),pourcent(PointsBatimentsTotal,PointsTotal),pourcent(PointsTechno,PointsTotal),pourcent(PointsFlotteTotal,PointsTotal),pourcent(PointsDefTotal,PointsTotal)]);}
	else if(BatTotal)
		{var pie = draw_pie([pourcent(PointsMinesTotal+PointsBatimentsTotal,PointsTotal),pourcent(PointsTechno,PointsTotal),pourcent(PointsFlotteTotal,PointsTotal),pourcent(PointsDefTotal,PointsTotal)]);}
	var piebox = id_('piebox');		
	if (piebox) {piebox.appendChild(pie);}
}	
		
if (page == 'statistics')
{	
	var Joueur = document.getElementById('content').getElementsByTagName('table')[1].getElementsByTagName('tr');
	var f = 1;
	while (f < Joueur.length) {
		if (Joueur[f].innerHTML.indexOf("page=writemessages") == -1) { 
			N = f-10; if (N < 0) {N = 1;}
			Joueur[N].getElementsByTagName('a')[0].name = 'Player';
			Joueur[f].getElementsByTagName('th')[0].style.backgroundColor = '#000000';
			location.href = location.href + "#Player";
			f = Joueur.length;
		}
		f++;
	}
}
	
/* *******************************************************************************************************************************************************************************************/
/* *********************************************************************Fin du script InfoCompte****************************************************************************************************/
/* *******************************************************************************************************************************************************************************************/

unsafeWindow.ssu.fun.updateStatus(thisData.namespace, 'activ');