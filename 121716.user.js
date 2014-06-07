// ==UserScript==
// @require        http://sizzlemctwizzle.com/updater.php?id=121716
// @require        http://code.jquery.com/jquery-1.10.2.js
// @name           Rapports Only_War
// @namespace      Rapports Only_War.js
// @description    Crée des rapports pour Ogame
// @icon           http://only-war-ogame.vacau.com/Ogame rapport.ico
// @version        0.1.2
// @include        http://uni104.ogame.*/game/index.php?page=*
// @include        http://s104-fr.ogame.gameforge.com/game/index.php?page=*
// @include        http://only-war-ogame.vacau.com/*
// ==/UserScript==
//http://s104-fr.ogame.gameforge.com/game/index.php?page=highscore&site=11&searchRelId=182656

/* A faire :
LECTURE DES RAPPORTS D'ESPIONNAGE DIRECEMENT DANS MESSAGES.
Espionnage (+/-protection, +/-suppression, Lunes, status_abbr_honorableTarget)
Galaxie
HIGHSCORE
Rapports d'attaques/attaqués
+/-Trajets de flottes
Connexion : faire un fichier sur l'ordinateur qui contient la dernière heure envoyée et la dernière heure connectée mais pas envoyé. Si différence de 8 minutes -> envoie de la dernière heure pas envoyée et remplacer l'heure par deet actuelle, revérifier.
Flottes : Garder la liste des flottes envoyées
*/
/*GM_setValue(name, value);return GM_getValue(name, default_value);GM_deleteValue(name);
localStorage.setItem(name, value);localStorage.getItem(name);localStorage.removeItem(value);*/
/////////////GM_setValue("essai", "rien");alert(GM_getValue("essai"));GM_deleteValue("essai");
var isGM = typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined';
/***********************************************************************************
VOUS DEVEZ INSTALLER GREASEMONKEY SUR FIREFOX OU UTILISER GOOGLE CHROME POUR POUVOIR UTILISER CE SCRIPT !

AVEC FIREFOX, ALLEZ À CETTE ADRESSE : https://addons.mozilla.org/fr/firefox/addon/greasemonkey/ INSTALLEZ L'EXTENSION ET TÉLÉCHARGER LE SCRIPT EN CLIQUANT SUR CONTRIBUER !

AVEC OPERA, VOUS POUVEZ TÉLÉCHARGER LE SCRIPT ET INDIQUER OÙ SE TROUVE LE DOSSIER EN FAISANT : "Alt", "Réglages", "Préférences", "Avancé", "Contenu", "Options Javascript...", puis en cliquant sur "Choisir..." en-dessous de "Dossier JavaScript de l'utilisateur".

AVEC GOOGLE CHROME OU CHROMIUM, VOUS NE DEVRIEZ PAS AVOIR LE TEMPS DE LIRE CE MESSAGE, CAR IL SUFFIT D'OUVRIR LE SCRIPT POUR QU'IL DEMANDE À S'INSTALLER.

IL EXISTE ÉVENTUELLEMENT DES LOGICIELS SIMILAIRES POUR LES AUTRES NAVIGATEURS, MAIS JE N'AI PAS PRIS LA PEINE DE LES TROUVER (MAIS J'AI CHERCHÉ QUAND MÊME !)
************************************************************************************/
if (document.location.href.indexOf("only-war-ogame.vacau.com/") != -1){/*évite l'affichage sur only-war-ogame*/
	window.document.getElementById('Aidez').style.display='none';
}

var TimerTransition;

var source;
/* Ajoute la zone en bas à droite qui affiche la réponse du serveur */
	var Reponse = document.createElement('div');
	Reponse.innerHTML = '';
	Reponse.id = 'Reponse';
	Reponse.setAttribute('style','position:fixed; bottom:-40px; right:0; height:20px; background-color:#111; padding:5px; border-radius:5px 0 0 0; -moz-transition: all 1s ease-in-out;z-index: 5;');
	document.body.appendChild(Reponse);

if (document.location.href.indexOf("s104-fr.ogame.gameforge.com") != -1){// Vérification pour éviter Chrome
	source= document.documentElement.innerHTML;
 base(document.documentElement);
}

/* Recherche si un message est ouvert, si l'ID a été vu, et travaille dessus. */
var listeRapports = new Array();
var espionnageTimer;
if (document.location.href.indexOf("index.php?page=messages") != -1){
	espionnageTimer= setInterval(espionnageTimerfunct,500);
}
function espionnageTimerfunct (){
	for(i=0;i<document.getElementsByClassName('showmessage').length;i++){
		var id = document.getElementsByClassName('showmessage')[i].attributes[0].value
		if (listeRapports.indexOf(id)==-1){
			listeRapports.push(id);
			base(document.getElementsByClassName('showmessage')[i]);
		}
	}
}

function base(origine){
	source=origine.innerHTML
	if(source.indexOf("<th scope=\"row\">Objet:</th>") != -1){/*Il y a un message*/ 
		if(source.indexOf("<td>Rapport d`espionnage de ") != -1){
		
		/******************************************/
		/***Espionnage (en cours -> Rapport.php)***/
		/******************************************/
			/* Recherche de la date */
			var Date_Message = source.substring(source.indexOf("<th scope=\"row\">Date:</th>")+26);
			Date_Message = Date_Message.substring(0,Date_Message.indexOf("</td>"));
			Date_Message = Date_Message.substring(Date_Message.indexOf(">")+1);
			
			//Date_Message = Date_Message.substring(0,Date_Message.indexOf("\">"));
			Date_Message = Date_Message.replace(/\./g, "/"); /* remplace tous (g = global) les points par un slash */
			/* Recherche de la planète espionnée */
			var NomPlanete = source.substring(source.indexOf("<td>Rapport d`espionnage de ")+28);
			NomPlanete = NomPlanete.substring(0,NomPlanete.indexOf("</td>"));
			NomPlanete = NomPlanete.substring(0,NomPlanete.lastIndexOf(" ["));
			/*Recherche de la galaxie, du sytème et de la position*/
			var Position = source.substring(source.indexOf("javascript:showGalaxy")+22);
			Position = Position.substring(0,Position.indexOf(")"));
			Position = Position.split(',');
			var Galaxie = Position[0]; var Systeme = Position[1]; var PositionPlanete = Position[2];
			/* Recherche du joueur espionné */
			var Joueur = source.substring(source.indexOf("Ressources sur ")+15);
			Joueur = Joueur.substring(0,Joueur.indexOf("</th>"));
			Joueur = Joueur.substring(Joueur.indexOf("(joueur:")+8);
			Joueur = Joueur.substring(Joueur.indexOf("<span class=\"status")+19);
			Joueur = Joueur.substring(Joueur.indexOf(">")+1);
			Joueur = Joueur.substring(0,Joueur.indexOf("<"));
			/* Recherche Lune/Planète */
			var Lune = source.substring(source.indexOf("Ressources sur ")+15);
			Lune = Lune.substring(0,Lune.indexOf("</figure>"));
			if(Lune.indexOf("moon")==-1){Lune = 0;}else{Lune = 1;}
			/*iIa*/
			var Actif = source.substring(source.indexOf("Ressources sur ")+15);
			Actif = Actif.substring(0,Actif.indexOf("</th>"));
			Actif = Actif.substring(Actif.indexOf("(joueur:")+8);
			Actif = Actif.substring(Actif.indexOf("class=\"status")+7);
			Actif = Actif.substring(0,Actif.indexOf(">")-1);
			if (Actif.indexOf("status_abbr_longinactive")!=-1){Actif="In";}else if (Actif.indexOf("status_abbr_inactive")!=-1){Actif="i";}else{Actif="a";}
			/* Recherche du métal */
			var Metal = source.substring(source.indexOf("<td class=\"item\">Métal:</td><td> ")+33);
			Metal = Metal.substring(0,Metal.indexOf("</td>"));
			Metal = Metal.replace(/\./g,"");
			/* Recherche du Cristal */
			var Cristal = source.substring(source.indexOf("<td class=\"item\">Cristal:</td> <td>")+35);
			Cristal = Cristal.substring(0,Cristal.indexOf("</td>"));
			Cristal = Cristal.replace(/\./g,"");
			/* Recherche du Deuterium */
			var Deuterium = source.substring(source.indexOf("<td class=\"item\">Deutérium:</td><td> ")+37);
			Deuterium = Deuterium.substring(0,Deuterium.indexOf("</td>"));
			Deuterium = Deuterium.replace(/\./g,"");
			/* Recherche de l'Energie */
			var Energie = source.substring(source.indexOf("<td class=\"item\">Energie:</td> <td>")+35);
			Energie = Energie.substring(0,Energie.indexOf("</td>"));
			Energie = Energie.replace(/\./g,"");
			/* Recherche de l'Activité */
			var Activite
			if (source.indexOf("Le scanner des sondes n`a pas détecté d`anomalies atmosphériques sur cette planète. Une activité sur cette planète dans la dernière heure peut quasiment être exclue.") !=-1){Activite=0;}
			else{
				Activite = source.substring(source.indexOf("activité sur cette planète dans les <font color=\"red\">")+54);
				Activite = Activite.substring(0,Activite.indexOf("</font>"));			
			}
			/* Recherche du Contre-espionnage */
			var Contreespionnage = source.substring(source.indexOf("Probabilité de contre-espionnage : ")+35);
			Contreespionnage = Contreespionnage.substring(0,Contreespionnage.indexOf(" %</td>"));
			/* Recherche des Flottes */
			var Flottes 
			if (source.indexOf("<tbody><tr><th class=\"area\" colspan=\"4\">Flottes</th></tr>") == -1){Flottes=""}
			else{
				Flottes = source.substring(source.indexOf("<tbody><tr><th class=\"area\" colspan=\"4\">Flottes</th></tr>")+57);
				Flottes = Flottes.substring(0,Flottes.indexOf("</tbody>"));
				Flottes = Flottes.replace(/<tr>/g,"");Flottes = Flottes.replace(/<\/tr>/g,"");Flottes = Flottes.replace(/<td class="key">/g,"<br/>");Flottes = Flottes.replace(/<td class="value">/g," ");Flottes = Flottes.replace(/<\/td>/g,""); Flottes = Flottes.substring(5);Flottes = Flottes.replace(/\./g," ");
				if (Flottes.length==0){Flottes="-";}
			}
			/* Recherche des Défenses */
			var Defense 
			if (source.indexOf("<tbody><tr><th class=\"area\" colspan=\"4\">Défense</th></tr>") == -1){Defense=""}
			else{
				Defense = source.substring(source.indexOf("<tbody><tr><th class=\"area\" colspan=\"4\">Défense</th></tr>")+57);
				Defense = Defense.substring(0,Defense.indexOf("</tbody>"));
				Defense = Defense.replace(/<tr>/g,"");Defense = Defense.replace(/<\/tr>/g,"");Defense = Defense.replace(/<td class="key">/g,"<br/>");Defense = Defense.replace(/<td class="value">/g," ");Defense = Defense.replace(/<\/td>/g,""); Defense = Defense.substring(5);Defense = Defense.replace(/\./g," ");
				if (Defense.length==0){Defense="-";}
			}
			/* Recherche des Bâtiments */
			var Batiment 
			if (source.indexOf("<tbody><tr><th class=\"area\" colspan=\"4\">Bâtiment</th></tr>") == -1){Batiment=""}
			else{
				Batiment = source.substring(source.indexOf("<tbody><tr><th class=\"area\" colspan=\"4\">Bâtiment</th></tr>")+58);
				Batiment = Batiment.substring(0,Batiment.indexOf("</tbody>"));
				Batiment = Batiment.replace(/<tr>/g,"");Batiment = Batiment.replace(/<\/tr>/g,"");Batiment = Batiment.replace(/<td class="key">/g,"<br/>");Batiment = Batiment.replace(/<td class="value">/g," ");Batiment = Batiment.replace(/<\/td>/g,""); Batiment = Batiment.substring(5);Batiment = Batiment.replace(/\./g," ");
				if (Batiment.length==0){Batiment="-";}
				
				/*Recherche de la Production*/
				var ProdMet = 0
				if(source.indexOf("<td class=\"key\">Mine de métal</td>") == -1){ProdMet=30}else{
					ProdMet = source.substring(source.indexOf("<td class=\"key\">Mine de métal</td><td class=\"value\">")+52);
					ProdMet = ProdMet.substring(0,ProdMet.indexOf("</td>"));
					ProdMet = 30 * ProdMet * Math.pow(1.1,ProdMet) + 30
				}
				var ProdCri = 0
				if(source.indexOf("<td class=\"key\">Mine de cristal</td>") == -1){ProdCri=15}else{
					ProdCri = source.substring(source.indexOf("<td class=\"key\">Mine de cristal</td><td class=\"value\">")+54);
					ProdCri = ProdCri.substring(0,ProdCri.indexOf("</td>"));
					ProdCri = 20 * ProdCri * Math.pow(1.1,ProdCri) + 15
				}
				var ProdDeu = 0
				if(source.indexOf("<td class=\"key\">Synthétiseur de deutérium</td>") == -1){ProdDeu=15}else{
					ProdDeu = source.substring(source.indexOf("<td class=\"key\">Synthétiseur de deutérium</td><td class=\"value\">")+64);
					ProdDeu = ProdDeu.substring(0,ProdDeu.indexOf("</td>"));
					ProdDeu = 10 * ProdDeu * Math.pow(1.1,ProdDeu *(-1.358619871478)); /*( (-0.002*39.309935739)+1.28)*/
				}
				var Production = ProdMet + ProdCri + ProdDeu;
			}
			
			
			/* Recherche des Recherches */
			var Recherche 
			if (source.indexOf("<tbody><tr><th class=\"area\" colspan=\"4\">Recherche</th></tr>") == -1){Recherche=""}
			else{
				Recherche = source.substring(source.indexOf("<tbody><tr><th class=\"area\" colspan=\"4\">Recherche</th></tr>")+59);
				Recherche = Recherche.substring(0,Recherche.indexOf("</tbody>"));
				Recherche = Recherche.replace(/<tr>/g,"");Recherche = Recherche.replace(/<\/tr>/g,"");Recherche = Recherche.replace(/<td class="key">/g,"<br/>");Recherche = Recherche.replace(/<td class="value">/g," ");Recherche = Recherche.replace(/<\/td>/g,""); Recherche = Recherche.substring(5);Recherche = Recherche.replace(/\./g," ");
				if (Recherche.length==0){Recherche="-";}
			}
			if (source.indexOf("<tbody><tr><th class=\"area\" colspan=\"4\">Défense</th></tr>") != -1){
				/*Recherches des Technologies de Combat*/
				var TechnologieArmes = 0
				if(source.indexOf("<td class=\"key\">Technologie Armes</td>") == -1){TechnologieArmes=0}else{
					TechnologieArmes = source.substring(source.indexOf("<td class=\"key\">Technologie Armes</td><td class=\"value\">")+56);
					TechnologieArmes = TechnologieArmes.substring(0,TechnologieArmes.indexOf("</td>"));
				}
				var TechnologieBouclier = 0
				if(source.indexOf("<td class=\"key\">Technologie Bouclier</td>") == -1){TechnologieBouclier=0}else{
					TechnologieBouclier = source.substring(source.indexOf("<td class=\"key\">Technologie Bouclier</td><td class=\"value\">")+59);
					TechnologieBouclier = TechnologieBouclier.substring(0,TechnologieBouclier.indexOf("</td>"));
				}
				var TechnologieProtection = 0
				if(source.indexOf("<td class=\"key\">Technologie Protection des vaisseaux spatiaux</td>") == -1){TechnologieProtection=0}else{
					TechnologieProtection = source.substring(source.indexOf("<td class=\"key\">Technologie Protection des vaisseaux spatiaux</td><td class=\"value\">")+84);
					TechnologieProtection = TechnologieProtection.substring(0,TechnologieProtection.indexOf("</td>"));
				}

				/*Calcul de la protection*/
				var PtStructure = 0
				var PtDefense = 0
				var Attaque = 0
				var temp
				if(source.indexOf("<td class=\"key\">Lanceur de missiles</td>") != -1){
					temp = source.substring(source.indexOf("<td class=\"key\">Lanceur de missiles</td><td class=\"value\">")+58);
					temp = temp.substring(0,temp.indexOf("</td>"));
					
					PtStructure += temp * (2000 + TechnologieProtection * 200)
					PtDefense += temp * (20 + TechnologieBouclier * 2)
					Attaque += temp * (80 + TechnologieArmes * 8)
				}
				if(source.indexOf("<td class=\"key\">Artillerie laser légère</td>") != -1){
					temp = source.substring(source.indexOf("<td class=\"key\">Artillerie laser légère</td><td class=\"value\">")+62);
					temp = temp.substring(0,temp.indexOf("</td>"));

					PtStructure += temp * (2000 + TechnologieProtection * 200)
					PtDefense += temp * (25 + TechnologieBouclier * 2.5)
					Attaque += temp * (100 + TechnologieArmes * 10)
				}
				if(source.indexOf("<td class=\"key\">Artillerie laser lourde</td>") != -1){
					temp = source.substring(source.indexOf("<td class=\"key\">Artillerie laser lourde</td><td class=\"value\">")+62);
					temp = temp.substring(0,temp.indexOf("</td>"));

					PtStructure += temp * (8000 + TechnologieProtection * 800)
					PtDefense += temp * (100 + TechnologieBouclier * 10)
					Attaque += temp * (250 + TechnologieArmes * 25)
				}
				if(source.indexOf("<td class=\"key\">Canon de Gauss</td>") != -1){
					temp = source.substring(source.indexOf("<td class=\"key\">Canon de Gauss</td><td class=\"value\">")+53);
					temp = temp.substring(0,temp.indexOf("</td>"));

					PtStructure += temp * (35000 + TechnologieProtection * 3500)
					PtDefense += temp * (200 + TechnologieBouclier * 20)
					Attaque += temp * (1100 + TechnologieArmes * 110)
				}
				if(source.indexOf("<td class=\"key\">Artillerie à ions</td>") != -1){
					temp = source.substring(source.indexOf("<td class=\"key\">Artillerie à ions</td><td class=\"value\">")+56);
					temp = temp.substring(0,temp.indexOf("</td>"));

					PtStructure += temp * (8000 + TechnologieProtection * 800)
					PtDefense += temp * (500 + TechnologieBouclier * 50)
					Attaque += temp * (150 + TechnologieArmes * 15)
				}
				if(source.indexOf("<td class=\"key\">Lanceur de plasma</td>") != -1){
					temp = source.substring(source.indexOf("<td class=\"key\">Lanceur de plasma</td><td class=\"value\">")+56);
					temp = temp.substring(0,temp.indexOf("</td>"));

					PtStructure += temp * (100000 + TechnologieProtection * 10000)
					PtDefense += temp * (300 + TechnologieBouclier * 30)
					Attaque += temp * (3000 + TechnologieArmes * 300)
				}

				if(source.indexOf("<td class=\"key\">Petit bouclier</td>") != -1){
					temp = source.substring(source.indexOf("<td class=\"key\">Petit bouclier</td><td class=\"value\">")+53);
					temp = temp.substring(0,temp.indexOf("</td>"));

					PtStructure += temp * (20000 + TechnologieProtection * 2000)
					PtDefense += temp * (2000 + TechnologieBouclier * 200)
					Attaque += temp * (1 + TechnologieArmes * 0.1)
				}
				if(source.indexOf("<td class=\"key\">Grand bouclier</td>") != -1){
					temp = source.substring(source.indexOf("<td class=\"key\">Grand bouclier</td><td class=\"value\">")+53);
					temp = temp.substring(0,temp.indexOf("</td>"));

					PtStructure += temp * (100000 + TechnologieProtection * 10000)
					PtDefense += temp * (10000 + TechnologieBouclier * 1000)
					Attaque += temp * (1 + TechnologieArmes * 0.1)
				}

				if(source.indexOf("<td class=\"key\">Chasseur léger</td>") != -1){
					temp = source.substring(source.indexOf("<td class=\"key\">Chasseur léger</td><td class=\"value\">")+53);
					temp = temp.substring(0,temp.indexOf("</td>"));

					PtStructure += temp * (4000 + TechnologieProtection * 400)
					PtDefense += temp * (10 + TechnologieBouclier * 1)
					Attaque += temp * (50 + TechnologieArmes * 5)
				}
				if(source.indexOf("<td class=\"key\">Chasseur lourd</td>") != -1){
					temp = source.substring(source.indexOf("<td class=\"key\">Chasseur lourd</td><td class=\"value\">")+53);
					temp = temp.substring(0,temp.indexOf("</td>"));

					PtStructure += temp * (10000 + TechnologieProtection * 1000)
					PtDefense += temp * (25 + TechnologieBouclier * 2.5)
					Attaque += temp * (150 + TechnologieArmes * 15)
				}
				if(source.indexOf("<td class=\"key\">Croiseur</td>") != -1){
					temp = source.substring(source.indexOf("<td class=\"key\">Croiseur</td><td class=\"value\">")+47);
					temp = temp.substring(0,temp.indexOf("</td>"));

					PtStructure += temp * (27000 + TechnologieProtection * 2700)
					PtDefense += temp * (50 + TechnologieBouclier * 5)
					Attaque += temp * (400 + TechnologieArmes * 40)
				}
				if(source.indexOf("<td class=\"key\">Vaisseau de bataille</td>") != -1){
					temp = source.substring(source.indexOf("<td class=\"key\">Vaisseau de bataille</td><td class=\"value\">")+59);
					temp = temp.substring(0,temp.indexOf("</td>"));

					PtStructure += temp * (60000 + TechnologieProtection * 6000)
					PtDefense += temp * (200 + TechnologieBouclier * 20)
					Attaque += temp * (1000 + TechnologieArmes * 100)
				}
				if(source.indexOf("<td class=\"key\">Traqueur</td>") != -1){
					temp = source.substring(source.indexOf("<td class=\"key\">Traqueur</td><td class=\"value\">")+47);
					temp = temp.substring(0,temp.indexOf("</td>"));

					PtStructure += temp * (70000 + TechnologieProtection * 7000)
					PtDefense += temp * (400 + TechnologieBouclier * 40)
					Attaque += temp * (700 + TechnologieArmes * 70)
				}
				if(source.indexOf("<td class=\"key\">Bombardier</td>") != -1){
					temp = source.substring(source.indexOf("<td class=\"key\">Bombardier</td><td class=\"value\">")+49);
					temp = temp.substring(0,temp.indexOf("</td>"));

					PtStructure += temp * (75000 + TechnologieProtection * 7500)
					PtDefense += temp * (500 + TechnologieBouclier * 50)
					Attaque += temp * (1000 + TechnologieArmes * 100)
				}
				if(source.indexOf("<td class=\"key\">Destructeur</td>") != -1){
					temp = source.substring(source.indexOf("<td class=\"key\">Destructeur</td><td class=\"value\">")+50);
					temp = temp.substring(0,temp.indexOf("</td>"));

					PtStructure += temp * (110000 + TechnologieProtection * 11000)
					PtDefense += temp * (500 + TechnologieBouclier * 50)
					Attaque += temp * (2000 + TechnologieArmes * 200)
				}
				if(source.indexOf("<td class=\"key\">Étoile de la mort</td>") != -1){
					temp = source.substring(source.indexOf("<td class=\"key\">Étoile de la mort</td><td class=\"value\">")+56);
					temp = temp.substring(0,temp.indexOf("</td>"));

					PtStructure += temp * (9000000 + TechnologieProtection * 900000)
					PtDefense += temp * (50000 + TechnologieBouclier * 5000)
					Attaque += temp * (200000 + TechnologieArmes * 20000)
				}
				if(source.indexOf("<td class=\"key\">Petit transporteur</td>") != -1){
					temp = source.substring(source.indexOf("<td class=\"key\">Petit transporteur</td><td class=\"value\">")+57);
					temp = temp.substring(0,temp.indexOf("</td>"));

					PtStructure += temp * (4000 + TechnologieProtection * 400)
					PtDefense += temp * (10 + TechnologieBouclier * 1)
					Attaque += temp * (5 + TechnologieArmes * 0.5)
				}
				if(source.indexOf("<td class=\"key\">Grand transporteur</td>") != -1){
					temp = source.substring(source.indexOf("<td class=\"key\">Grand transporteur</td><td class=\"value\">")+57);
					temp = temp.substring(0,temp.indexOf("</td>"));

					PtStructure += temp * (12000 + TechnologieProtection * 1200)
					PtDefense += temp * (25 + TechnologieBouclier * 2.5)
					Attaque += temp * (5 + TechnologieArmes * 0.5)
				}
				if(source.indexOf("<td class=\"key\">Vaisseau de colonisation</td>") != -1){
					temp = source.substring(source.indexOf("<td class=\"key\">Vaisseau de colonisation</td><td class=\"value\">")+63);
					temp = temp.substring(0,temp.indexOf("</td>"));

					PtStructure += temp * (30000 + TechnologieProtection * 3000)
					PtDefense += temp * (100 + TechnologieBouclier * 10)
					Attaque += temp * (50 + TechnologieArmes * 5)
				}
				if(source.indexOf("<td class=\"key\">Recycleur</td>") != -1){
					temp = source.substring(source.indexOf("<td class=\"key\">Recycleur</td><td class=\"value\">")+48);
					temp = temp.substring(0,temp.indexOf("</td>"));

					PtStructure += temp * (16000 + TechnologieProtection * 1600)
					PtDefense += temp * (10 + TechnologieBouclier * 1)
					Attaque += temp * (1 + TechnologieArmes * 0.1)
				}
				if(source.indexOf("<td class=\"key\">Sonde d`espionnage</td>") != -1){
					temp = source.substring(source.indexOf("<td class=\"key\">Sonde d`espionnage</td><td class=\"value\">")+57);
					temp = temp.substring(0,temp.indexOf("</td>"));

					PtStructure += temp * (1000 + TechnologieProtection * 100)
					PtDefense += temp * (0.01 + TechnologieBouclier * 0.001)
					Attaque += temp * (0.01 + TechnologieArmes * 0.001)
				}
				if(source.indexOf("<td class=\"key\">Satellite solaire</td>") != -1){
					temp = source.substring(source.indexOf("<td class=\"key\">Satellite solaire</td><td class=\"value\">")+56);
					temp = temp.substring(0,temp.indexOf("</td>"));

					PtStructure += temp * (2000 + TechnologieProtection * 200)
					PtDefense += temp * (1 + TechnologieBouclier * 0.1)
					Attaque += temp * (1 + TechnologieArmes * 0.1)
				}
				var Protection = PtStructure + PtDefense + Attaque
			}
				envoyer('http://only-war-ogame.vacau.com/Rapport.php?Rapport=Espionnage&Date=' + Date_Message + '&NomPlanete=' + NomPlanete + '&Galaxie=' + Galaxie + '&Systeme=' + Systeme + '&PosPla=' + PositionPlanete + '&Joueur=' + Joueur + '&Actif=' + Actif + '&Metal=' + Metal + '&Cristal=' + Cristal + '&Deuterium=' + Deuterium + '&Energie=' + Energie + '&Activite=' + Activite + '&CtrEsp=' + Contreespionnage + '&Flottes=' + Flottes + '&Defense=' + Defense + '&Batiment=' + Batiment + '&Recherche=' + Recherche + '&TechArm=' + TechnologieArmes + '&TechBou=' + TechnologieBouclier + '&TechPro=' + TechnologieProtection + '&Protection=' + Math.round(Protection) + '&Production=' + Math.round(Production) + '&Lune='+Lune); 
			
			//alert(Galaxie + ':' + Systeme + ':' + PositionPlanete);
			
			
			//document.documentElement.innerHTML+="GRANDS TRANSPORTEURS : "+Math.ceil((parseInt(Metal)+parseInt(Cristal)+parseInt(Deuterium))/50000);
			origine.innerHTML="GRANDS TRANSPORTEURS : <b>"+Math.ceil((parseInt(Metal)+parseInt(Cristal)+parseInt(Deuterium))/50000)+"</b>"+origine.innerHTML;
			
			//alert('Flottes=' + Flottes);alert('Defense=' + Defense);alert('Batiment=' + Batiment);alert('Recherche=' + Recherche);alert('TechnologieArmes=' + TechnologieArmes);alert('TechnologieBouclier=' + TechnologieBouclier);alert('TechnologieProtection=' + TechnologieProtection);alert('Protection=' + Protection);alert('Production=' + Production);
			
		}
		if(source.indexOf("Activité d`espionnage sur ") != -1){
		/****************/
		/*** Espionné ***/
		/****************/
			/* Recherche de la planète espionne */
			var PlaneteEspionne = source.substring(source.indexOf("Une flotte étrangère de la planète ")+35);
			PlaneteEspionne = PlaneteEspionne.replace(/<figure[^>]*><\/figure>/g, "");
			PlaneteEspionne = PlaneteEspionne.replace(/<a target="_parent" href="javascript:showGalaxy\([0-9]*,[0-9]*,[0-9]*\)">/g, "");
			PlaneteEspionne = PlaneteEspionne.substring(0,PlaneteEspionne.indexOf("</a>"));
			/* Recherche du joueur espion */
			var JoueurEspion = source.substring(source.indexOf("Une flotte étrangère de la planète")+34);
			JoueurEspion = JoueurEspion.substring(JoueurEspion.indexOf("</a> (")+6);
			JoueurEspion = JoueurEspion.substring(0,JoueurEspion.indexOf(") a été repérée à proximité de votre planète"));
			/* Recherche de la date */
			var Date_Message = source.substring(source.indexOf("<th scope=\"row\">Date:</th>")+26);
			Date_Message = Date_Message.substring(0,Date_Message.indexOf("</td>"));
			Date_Message = Date_Message.substring(Date_Message.indexOf(">")+1);
			//Date_Message = Date_Message.substring(0,Date_Message.indexOf("\">"));
			Date_Message = Date_Message.replace(/\./g, "/"); /* remplace tous (g = global) les points par un slash */
			/* Recherche de la planète espionnée */
			var PlaneteEspionnee = source.substring(source.indexOf("Activité d`espionnage sur ")+26);
			PlaneteEspionnee = PlaneteEspionnee.substring(0,PlaneteEspionnee.indexOf("</td>"));
			/* Recherche du joueur espionné */
			var JoueurEspionne = source.substring(source.indexOf("<th scope=\"row\">A:</th>")+23);
			JoueurEspionne = JoueurEspionne.substring(JoueurEspionne.indexOf("<td>")+4);
			JoueurEspionne = JoueurEspionne.substring(0,JoueurEspionne.indexOf("</td>"));
			/* Recherche du Contre-espionnage */
			var Contreespionnage = source.substring(source.indexOf("</a>. Probabilité de contre-espionnage : ")+41);
			Contreespionnage = Contreespionnage.substring(0,Contreespionnage.indexOf(" %            <br>"));
			
			envoyer('http://only-war-ogame.vacau.com/Rapport.php?Rapport=Espionne&Date='+Date_Message+'&PlaneteEspionne='+PlaneteEspionne+'&JoueurEspion='+JoueurEspion+'&PlaneteEspionnee='+PlaneteEspionnee+'&JoueurEspionne='+JoueurEspionne+'&Contreespionnage='+Contreespionnage); 
			
					
			//alert(Date_Message + '	' + PlaneteEspionne + '	' + JoueurEspion + '				' + PlaneteEspionnee + '	' + JoueurEspionne + '	' + Contreespionnage);
		}
	}
	/*****************/
	/*** Connexion ***/
	/*****************/
	connexion();

	/*** Flottes (en cours + Lune/Débris + heures) ***/
	if (source.indexOf("fleetDetails") != -1){
		//<span id="timer_28323947" title="|21.01.2012 16:51:38" class="timer tipsStandard" style="">
		var Flottes=source;
		var requete="";
		while (Flottes.indexOf("<div id=\"fleet") != -1){
			Flottes=Flottes.substring(Flottes.indexOf("<div id=\"fleet")+4);
			if(Flottes.indexOf("<div id=\"fleet") !=-1){var FlottesActu=Flottes.substring(0,Flottes.indexOf("<div id=\"fleet"));}else{var FlottesActu=Flottes.substring(0,Flottes.indexOf("<div id=\"rechts"));}

			var HeureArrivee = FlottesActu.substring(FlottesActu.indexOf("fleetDetails"));
			HeureArrivee = HeureArrivee.substring(HeureArrivee.indexOf("title=\"|")+8);
			HeureArrivee = HeureArrivee.substring(0,HeureArrivee.indexOf("id=\"timer")-2);
			
			var Mission = FlottesActu.substring(FlottesActu.indexOf("class=\"mission"));
			Mission = Mission.substring(Mission.indexOf(">")+1);
			Mission = Mission.substring(0,Mission.indexOf("<"));
			
			var originPlanet = FlottesActu.substring(FlottesActu.indexOf("class=\"originPlanet"));
			originPlanet = originPlanet.substring(originPlanet.indexOf(">")+18);
			originPlanet = originPlanet.substring(0,originPlanet.indexOf("<")-28);
			
			var originCoords = FlottesActu.substring(FlottesActu.indexOf("class=\"originCoords"));
			var originJoueur = originCoords.substring(originCoords.indexOf("title=\"|")+8);
			originJoueur = originJoueur.substring(0,originJoueur.indexOf("\""));
			originCoords = originCoords.substring(originCoords.indexOf(">")+1);
			originCoords = originCoords.substring(originCoords.indexOf(">")+1);
			originCoords = originCoords.substring(0,originCoords.indexOf("<"));
			
			var destinationPlanet = FlottesActu.substring(FlottesActu.indexOf("class=\"destinationPlanet"));
			destinationPlanet = destinationPlanet.substring(destinationPlanet.indexOf(">")+1);
			destinationPlanet = destinationPlanet.substring(destinationPlanet.indexOf("<span>")+27);
			destinationPlanet = destinationPlanet.substring(0,destinationPlanet.indexOf("</a>"));
			
			if (destinationPlanet.indexOf("class=\"tipsStandardMax\"") !=-1){/*Si le nom est trop long*/
				destinationPlanet = destinationPlanet.substring(destinationPlanet.indexOf("title=\"|")+8);
				destinationPlanet = destinationPlanet.substring(0,destinationPlanet.indexOf("\">"));
			}else{
				destinationPlanet = destinationPlanet.substring(0,destinationPlanet.indexOf("</span>")-32);
			}			
			
			var destinationCoords = FlottesActu.substring(FlottesActu.indexOf("class=\"destinationCoords"));
			var destinationJoueur = destinationCoords.substring(destinationCoords.indexOf("title=\"|")+8);
			destinationJoueur = destinationJoueur.substring(0,destinationJoueur.indexOf("\""));
			destinationCoords = destinationCoords.substring(destinationCoords.indexOf(">")+1);
			destinationCoords = destinationCoords.substring(destinationCoords.indexOf(">")+1);
			destinationCoords = destinationCoords.substring(0,destinationCoords.indexOf("<"));
			var Vaisseaux=FlottesActu;
			var TotalVaisseaux="";
			while (Vaisseaux.indexOf("<tr>") != -1){
				Vaisseaux=Vaisseaux.substring(Vaisseaux.indexOf("<tr>")+4);
				VaisseauxActu = Vaisseaux.substring(0,Vaisseaux.indexOf("</tr>"));
				if (VaisseauxActu.indexOf("<td>") != -1){
					if (VaisseauxActu.indexOf("Métal:") != -1){
						var Met = VaisseauxActu.substring(VaisseauxActu.indexOf("<td class=\"value\">")+31);
						Met = Met.substring(0,Met.indexOf("</td>")-8);
						Met = Met.replace(/\./g, "");
					}else if (VaisseauxActu.indexOf("Cristal:") != -1){
						var Cri = VaisseauxActu.substring(VaisseauxActu.indexOf("<td class=\"value\">")+31);
						Cri = Cri.substring(0,Cri.indexOf("</td>")-8);
						Cri = Cri.replace(/\./g, "");
					}else if (VaisseauxActu.indexOf("Deutérium:") != -1){
						var Deu = VaisseauxActu.substring(VaisseauxActu.indexOf("<td class=\"value\">")+31);
						Deu = Deu.substring(0,Deu.indexOf("</td>")-8);
						Deu = Deu.replace(/\./g, "");
					}else{
						var Type = VaisseauxActu.substring(VaisseauxActu.indexOf("<td>")+4);
						Type = Type.substring(0,Type.indexOf(":</td>"));
						var nbr = VaisseauxActu.substring(VaisseauxActu.indexOf("<td class=\"value\">")+39);
						nbr = nbr.substring(0,nbr.indexOf("</td>")-16);
						TotalVaisseaux += nbr + ' ' + Type + "\n";
					}
				}
			}
			var IDJoueur;
			if (FlottesActu.indexOf("index.php?page=writemessage&amp;to=") !=-1){/*Cible pas moi*/
				IDJoueur = FlottesActu.substring(FlottesActu.indexOf("index.php?page=writemessage&amp;to=")+35);
				IDJoueur = IDJoueur.substring(0,IDJoueur.indexOf("&amp;ajax="));
			}else{/*C'est moi*/
				IDJoueur = source.substring(source.indexOf("<meta name=\"ogame-player-id\" content=\"")+38);
				IDJoueur = IDJoueur.substring(0,IDJoueur.indexOf("\">"));
			}	
			
			var IDflotte = FlottesActu.substring(FlottesActu.indexOf("id=\"fleet")+9);
			IDflotte = IDflotte.substring(0,IDflotte.indexOf("\""));
			
			
			if (FlottesActu.indexOf("title=\"Rappel:") != -1){/*Allé*/
				var HeureRetour = FlottesActu.substring(FlottesActu.indexOf("nextTimer tipsStandard"));
				HeureRetour = HeureRetour.substring(HeureRetour.indexOf("title=\"|")+8);
				HeureRetour = HeureRetour.substring(0,HeureRetour.indexOf("id=\"timer")-2);
			}else{/*Retour*/
				var HeureRetour = "NULL"
			}
			requete += '&HeureArrivee[]=' + HeureArrivee + '&Mission[]=' + Mission + '&originPlanet[]=' + originPlanet + '&originCoords[]=' + originCoords + '&originJoueur[]=' + originJoueur + '&destinationPlanet[]=' + destinationPlanet + '&destinationCoords[]=' + destinationCoords + '&destinationJoueur[]=' + destinationJoueur + '&TotalVaisseaux[]=' + TotalVaisseaux + '&Met[]=' + Met + '&Cri[]=' + Cri + '&Deu[]=' + Deu + '&IDJoueur[]=' + IDJoueur + '&HeureRetour[]=' + HeureRetour + '&IDflotte[]=' + IDflotte;
		}
		/********envoyer('Rapport=Flottes' + requete, "POST");//Requête mais évitons de surcharger le serveur **********/
		//envoyer('http://only-war-ogame.vacau.com/Rapport.php?Rapport=Flottes' + requete, "POST");
		//alert('http://only-war-ogame.vacau.com/Rapport.php?Rapport=Flottes' + requete);
		//longueur max 2208
	}
}
	/*** Recherche ***/
	var timer;
	
	/*
	Attention, les fonctions de ce script ne sont pas ceux de la page...
	if (source.indexOf("Rechercher dans l`univers") !=-1){
		$( "a[data-overlay-title='Rechercher dans l`univers']" )[0].addEventListener("click",initRecherche, true);
		//setTimeout('$( "a[data-overlay-title=\'Rechercher dans l`univers\']" )[0].addEventListener("click",initRecherche, true);',2000);
		////document.getElementsByName("search")[0].addEventListener("submit",recherche, true); //quand on fait entrer
		////document.getElementsByName("search")[1].addEventListener("click",recherche, true); //quand on clique sur rechercher	
	}/**/
/*
function initRecherche(){
	setTimeout('document.getElementsByName("search")[0].addEventListener("submit",recherche, true);document.getElementsByName("search")[1].addEventListener("click",recherche, true);',3000);
}*/
var AncienRapport;
var AncienBool=false;
	/* Recherche (en cours)*/
	function recherche(){
		var liste = document.getElementsByTagName('a');
		for(var i=0;i<liste.length;i++){
			if((liste[i].getAttribute('onclick') && liste[i].getAttribute('onclick').indexOf("ajaxLoad(")!=-1) || liste[i].className=="tab" || liste[i].className=="buttonSave"){
				liste[i].addEventListener("click",function (){recherche();}, true); //ajoute la fonction rechercher quand on clique sur un des onglet ou sur le changement de page.
			}
		}
	
		source = document.documentElement.innerHTML;
		clearInterval(timer);
		if (AncienRapport==source || (source.indexOf("<td class=\"userName\">")==-1 && source.indexOf("Aucun joueur trouvé")==-1 && source.indexOf("<td class=\"allyTag\">")==-1)){AncienBool=true; timer=setInterval(recherche,1000);}
		else{AncienBool=false;}
		AncienRapport=source;

		var TypeRech = source.substring(source.indexOf("ui-tabs-selected"));
		TypeRech = TypeRech.substring(TypeRech.indexOf("<span>")+6);
		var Rech=TypeRech;
		TypeRech = TypeRech.substring(0,TypeRech.indexOf("</span>"));
		if(TypeRech.indexOf("Joueurs") != -1 || TypeRech.indexOf("Planètes") != -1){/*Si on a des joueurs ou des planètes*/
			var requete="";
			while (Rech.indexOf("<td class=\"userName\">")!=-1){
				var Rech1 = Rech.substring(Rech.indexOf("<td class=\"userName\">"));
				Rech1 = Rech1.substring(0,Rech1.indexOf("</tr>"));
				Rech = Rech.substring(Rech.indexOf("<td class=\"userName\">"));
				Rech = Rech.substring(Rech.indexOf("</tr>")+5);
				
				var Joueur = Rech1.substring(Rech1.indexOf("<td class=\"userName\">")+37);
				Joueur = Joueur.substring(0,Joueur.indexOf("</td>")-8);
				Joueur = Joueur.replace(/<span class="searchMark">/g, "");
				Joueur = Joueur.replace(/<span class=".*">/g, "");
				Joueur = Joueur.replace(/<\/span>/g, "");
				var Ally_id = Rech1.substring(Rech1.indexOf("allianceInfo.php?allianceId=")+28);
				Ally_id = Ally_id.substring(0,Ally_id.indexOf("\">"));
				var Ally_name = Rech1.substring(Rech1.indexOf("allianceInfo.php?allianceId=")+28);
				Ally_name = Ally_name.substring(Ally_name.indexOf("\">")+19);
				Ally_name = Ally_name.substring(0,Ally_name.indexOf("</a>")-12);
				var PlanMere = Rech1.substring(Rech1.indexOf("<td class=\"home\">")+17);
				PlanMere = PlanMere.substring(0,PlanMere.indexOf("</td>"));
				PlanMere = PlanMere.replace(/<span class="searchMark">/g, "");
				PlanMere = PlanMere.replace(/<\/span>/g, "");
				if (Rech1.indexOf("http://s104-fr.ogame.gameforge.com/game/index.php?page=galaxy&amp;galaxy=") !=-1){
					var Coord = Rech1.substring(Rech1.indexOf("http://s104-fr.ogame.gameforge.com/game/index.php?page=galaxy&amp;galaxy=")+61);
					Galaxie = Coord.substring(0,Coord.indexOf("&amp;system="));
					Coord = Coord.substring(Coord.indexOf("&amp;system=")+12);
					Syst = Coord.substring(0,Coord.indexOf("&amp;planet="));
					Coord = Coord.substring(Coord.indexOf("&amp;planet=")+12);
					Position = Coord.substring(0,Coord.indexOf("\">"));
				}else if (Rech1.indexOf("javascript:showGalaxy") !=-1){
					var Coord = Rech1.substring(Rech1.indexOf("javascript:showGalaxy(")+22);
					Coord = Coord.substring(0,Coord.indexOf(");"));
				Coord = Coord.split(',');
				var Galaxie = Coord[0]; var Syst = Coord[1]; var Position = Coord[2];
				}
				
				var Joueur_id = Rech1.substring(Rech1.indexOf("searchRelId=")+12);
				Joueur_id = Joueur_id.substring(0,Joueur_id.indexOf("\">"));

				requete += '&ID_Ogame[]='+Joueur_id+'&Joueur[]='+Joueur+'&Planetes[]='+PlanMere+'&Galaxie[]='+Galaxie+'&Systeme[]='+Syst+'&Position[]='+Position+'&Tag_Alliance[]='+Ally_name+'&ID_Alliance[]='+Ally_id;
			}
			envoyer('Rapport=Rechercher' + requete, "POST");
		}else if(TypeRech.indexOf("Alliances/Tags") != -1){/*Si on a les alliances*/
			var requete="";
			while (Rech.indexOf("<td class=\"allyTag\">")!=-1){
				var Rech1 = Rech.substring(Rech.indexOf("<td class=\"allyTag\">"));
				Rech1 = Rech1.substring(0,Rech1.indexOf("</tr>"));
				Rech = Rech.substring(Rech.indexOf("<td class=\"allyTag\">"));
				Rech = Rech.substring(Rech.indexOf("</tr>")+5);
				
				var Tag_Alliance = Rech1.substring(Rech1.indexOf("<td class=\"allyTag\">")+20);
				var Tag_Alliance = Tag_Alliance.substring(Tag_Alliance.indexOf(">")+1+17);
				Tag_Alliance = Tag_Alliance.substring(0,Tag_Alliance.indexOf("</a>")-6);
				Tag_Alliance = Tag_Alliance.replace(/<span class="searchMark">/g, "");
				Tag_Alliance = Tag_Alliance.replace(/<\/span>/g, "");
				
				var Ally_id = Rech1.substring(Rech1.indexOf("allianceInfo.php?allianceId=")+28);
				Ally_id = Ally_id.substring(0,Ally_id.indexOf("\">"));
				
				var Ally_name = Rech1.substring(Rech1.indexOf("allianceInfo.php?allianceId=")+28);
				Ally_name = Ally_name.substring(Ally_name.indexOf("allyName\">")+10);
				Ally_name = Ally_name.substring(Ally_name.indexOf("\">")+19);
				Ally_name = Ally_name.substring(0,Ally_name.indexOf("</a>")-12);
				Ally_name = Ally_name.replace(/<span class="searchMark">/g, "");
				Ally_name = Ally_name.replace(/<\/span>/g, "");
				
				var allyMembers = Rech1.substring(Rech1.indexOf("class=\"allyMembers\">")+20);
				allyMembers = allyMembers.substring(0,allyMembers.indexOf("</td>"));
				
				var allyPoints = Rech1.substring(Rech1.indexOf("class=\"allyPoints\">")+20);
				allyPoints = allyPoints.substring(allyPoints.indexOf("\">")+2);
				allyPoints = allyPoints.substring(0,allyPoints.indexOf("</a>"));
				allyPoints = allyPoints.replace(/\./g, "");
				
				requete += '&ID_Alliance[]='+Ally_id+'&Nom_Alliance[]='+Ally_name+'&Tag_Alliance[]='+Tag_Alliance+'&NbrMembres[]='+allyMembers+'&Points[]='+allyPoints;
			}
			envoyer('Rapport=RechercherAlly' + requete, "POST");
			alert(requete);
		}else{clearInterval(timer);}
	}

	
/*Place classement (en cours)*/
/*function affiche_galaxie_content()
{
//if (document.getElementById("highscoreContent").innerHTML == '' )return;
if (document.getElementById("highscoreContent")){return;}
else if (document.getElementById("highscoreContent").innerHTML.indexOf("Position") !=-1){
clearInterval(timer);
//alert(document.getElementById("highscoreContent").innerHTML.indexOf("Apokaly"));
var Place = document.getElementById("highscoreContent").innerHTML
var Place = Place.substring(Place.indexOf("myrank")); //Position voulue != de ma position
Place = Place.substring(Place.indexOf("name=\"position")+14); Place = Place.substring(0,Place.indexOf("\""));
document.getElementById('changelog_link').innerHTML= Place;
}
}
 var timer=setInterval(affiche_galaxie_content,500);

document.getElementById("inhalt").addEventListener("click", function(event){timer=setInterval(affiche_galaxie_content,500);}, true);*/


/*function getHTTPObject(){
	var xmlhttp = false;

	// on essaie de créer l'objet si ce n'est pas déjà fait 
	if (!xmlhttp && typeof XMLHttpRequest != 'undefined'){
		 try {
				xmlhttp = new XMLHttpRequest();
		 }
		 catch (e){
				xmlhttp = false;
		 }
	}

	if (xmlhttp)  {
		// on définit ce qui doit se passer quand la page répondra 
		xmlhttp.onreadystatechange=function(){
			if (xmlhttp.readyState == 4){ // 4 : état "complete" 
				if (xmlhttp.status == 200 || xmlhttp.status == 0){ // 200 : code HTTP pour OK 
				alert(xmlhttp.responseText);
					//	Traitement de la réponse.
				}
			}
		}
	}
	return xmlhttp;
}
*/
function Disparition(){clearInterval(TimerTransition);window.document.getElementById('Reponse').style.bottom='-40px';}
function getHTTPObject() {
	var xmlhttp = null;
	
	if (window.XMLHttpRequest || window.ActiveXObject) {
		if (window.ActiveXObject) {
			try {
				xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
		} else {
			xmlhttp = new XMLHttpRequest(); 
		}
	} else {
		alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
		return null;
	}
	
	return xmlhttp;
}
function envoyer(message, type) {
	//alert(message);
	var xmlhttp = getHTTPObject();
	
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && (xmlhttp.status == 200 || xmlhttp.status == 0)) {
			var Rep = xmlhttp.responseText;
			Rep = Rep.substring(0,Rep.indexOf("<script"));
			if (Rep != "CONNECTÉ"){
				window.document.getElementById('Reponse').style.bottom='15px';document.getElementById("Reponse").innerHTML=Rep;
				clearInterval(TimerTransition);TimerTransition=setInterval(Disparition,3000);
				//xmlhttp.status == 0 -> ne répond pas
			}
		}
	};
	if (!type || type == "GET"){
		xmlhttp.open("GET", message, true);
		xmlhttp.send(null);
	}else if(type == "POST"){
		xmlhttp.open("POST","http://only-war-ogame.vacau.com/Rapport.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send(message); 
	}

}

function connexion0(){
if (getValue("Joueur") == undefined){setValue("Joueur",""); setValue("ID_Joueur","");}
	var ID_Joueur = ""; var Joueur = "";
	if (source.indexOf("<meta name=\"ogame-player-id\" content=\"") != -1){
		ID_Joueur = source.substring(source.indexOf("<meta name=\"ogame-player-id\" content=\"")+38);
		ID_Joueur = ID_Joueur.substring(0,ID_Joueur.indexOf("\">"));
		setValue("ID_Joueur",ID_Joueur);}
	if (source.indexOf("<meta name=\"ogame-player-name\" content=\"") != -1){
		Joueur = source.substring(source.indexOf("<meta name=\"ogame-player-name\" content=\"")+40);
		Joueur = Joueur.substring(0,Joueur.indexOf("\">"));
		setValue("Joueur",Joueur);
	}else if (source.indexOf("id=\"playerName\">") != -1){
		var Joueur = source.substring(source.indexOf("id=\"playerName\">")+16);
		Joueur = Joueur.substring(Joueur.indexOf("joueur:")+7);
		Joueur = Joueur.substring(Joueur.indexOf("<span class=\"textBeefy\">")+24+17);
		Joueur = Joueur.substring(0,Joueur.indexOf("</span>")-12);
		setValue("Joueur",Joueur);
	}
	if((ID_Joueur != "" || getValue("ID_Joueur") != "") && (Joueur != "" || getValue("Joueur") != "")){
	ID_Joueur=getValue("ID_Joueur");
	Joueur=getValue("Joueur");
		envoyer('http://only-war-ogame.vacau.com/Rapport.php?Rapport=Connexion&Joueur='+Joueur+'&ID_Joueur='+ID_Joueur);		
		try {
			if (getValue("ConnexionEnvoyee&ID_Joueur"+ID_Joueur) == undefined){setValue("ConnexionEnvoyee&ID_Joueur"+ID_Joueur, "0000-00-00 00:00:00");setValue("ConnexionNonEnvoyee&ID_Joueur"+ID_Joueur, "0000-00-00 00:00:00"); setValue("Joueur","");setValue("ID_Joueur","");}
			/*Dernière connexion envoyée*/
			var CoE = getValue("ConnexionEnvoyee&ID_Joueur"+ID_Joueur);
			var DateE = CoE.split(' ');
			var JoursE = DateE[0].split('-');
			var HeuresE = DateE[1].split(':');
			var dateE = new Date();dateE.setFullYear(JoursE[0]);dateE.setMonth(JoursE[1]-1);dateE.setDate(JoursE[2]);dateE.setHours(HeuresE[0]);dateE.setMinutes(HeuresE[1]);dateE.setSeconds(HeuresE[2]);dateE.setMilliseconds(0);
			/*Dernière connexion non envoyée*/
			var CoNE = getValue("ConnexionNonEnvoyee&ID_Joueur"+ID_Joueur);
			var DateNE = CoNE.split(' ');
			var JoursNE = DateNE[0].split('-');
			var HeuresNE = DateNE[1].split(':');
			var dateNE = new Date();dateNE.setFullYear(JoursNE[0]);dateNE.setMonth(JoursNE[1]-1);dateNE.setDate(JoursNE[2]);dateNE.setHours(HeuresNE[0]);dateNE.setMinutes(HeuresNE[1]);dateNE.setSeconds(HeuresNE[2]);dateNE.setMilliseconds(0);
			/*Connexion actuelle*/
			if (source.indexOf("<li id=\"OGameClock\">") !=-1){
				var HeureActu = source.substring(source.indexOf("<li id=\"OGameClock\">")+20);
				HeureActu = HeureActu.substring(0,HeureActu.indexOf("</span>"));
				HeureActu = HeureActu.replace(/<span>/g, "");
				var DateA = HeureActu.split(' ');
				var Jours = DateA[0].split('.');
				var Heures = DateA[1].split(':');
				var dateAc = new Date();dateAc.setFullYear(Jours[2]);dateAc.setMonth(Jours[1]-1);dateAc.setDate(Jours[0]);dateAc.setHours(Heures[0]);dateAc.setMinutes(Heures[1]);dateAc.setSeconds(Heures[2]);dateAc.setMilliseconds(0);
				
				if(dateAc-dateNE>540000){ // 1000*60*9=9min
					/*envoyer('http://only-war-ogame.vacau.com/Rapport.php?Rapport=Connexion&Joueur='+Joueur+'&ID_Joueur='+ID_Joueur+'&Date='+CoNE);*/
					setValue("ConnexionEnvoyee&ID_Joueur"+ID_Joueur, Jours[2] + "-" + Jours[1] + "-" + Jours[0] + " " + DateA[1]);
					setValue("ConnexionNonEnvoyee&ID_Joueur"+ID_Joueur, Jours[2] + "-" + Jours[1] + "-" + Jours[0] + " " + DateA[1]);
					/*envoyer('http://only-war-ogame.vacau.com/Rapport.php?Rapport=Connexion&Joueur='+Joueur+'&ID_Joueur='+ID_Joueur+'&Date='+Jours[2] + "-" + Jours[1] + "-" + Jours[0] + " " + DateA[1]);*/
					////alert("Double Envoi");
				}else if(dateAc-dateE>540000){
					setValue("ConnexionEnvoyee&ID_Joueur"+ID_Joueur, Jours[2] + "-" + Jours[1] + "-" + Jours[0] + " " + DateA[1]);
					setValue("ConnexionNonEnvoyee&ID_Joueur"+ID_Joueur, Jours[2] + "-" + Jours[1] + "-" + Jours[0] + " " + DateA[1]);
					/*envoyer('http://only-war-ogame.vacau.com/Rapport.php?Rapport=Connexion&Joueur='+Joueur+'&ID_Joueur='+ID_Joueur+'&Date='+Jours[2] + "-" + Jours[1] + "-" + Jours[0] + " " + DateA[1]);*/
					////alert("Simple Envoi");
				}else{
					setValue("ConnexionNonEnvoyee&ID_Joueur"+ID_Joueur, Jours[2] + "-" + Jours[1] + "-" + Jours[0] + " " + DateA[1]);
				}
			}else if (source.indexOf("<meta name=\"ogame-timestamp\" content=\"") != -1){
				dateAc = source.substring(source.indexOf("<meta name=\"ogame-timestamp\" content=\"")+38);
				dateAc = dateAc.substring(0,dateAc.indexOf("\">"));
				var dateAc = new Date(dateAc*1000);
				//alert(dateAc.getFullYear() + "-" + (dateAc.getMonth()+1) + "-" + dateAc.getDate() + " " + dateAc.getHours() + ":" + dateAc.getMinutes() + ":" + dateAc.getSeconds());

			}
		}catch (e){
		}
	}
}
function connexion(){
	if (getValue("Joueur") == undefined){setValue("Joueur",""); setValue("ID_Joueur","");}
	
	if (source.indexOf("<meta name=\"ogame-player-id\" content=\"") != -1){
		var ID_Joueur = source.substring(source.indexOf("<meta name=\"ogame-player-id\" content=\"")+38);
		ID_Joueur = ID_Joueur.substring(0,ID_Joueur.indexOf("\">"));
		setValue("ID_Joueur",ID_Joueur);}
	if (source.indexOf("<meta name=\"ogame-player-name\" content=\"") != -1){
		var Joueur = source.substring(source.indexOf("<meta name=\"ogame-player-name\" content=\"")+40);
		Joueur = Joueur.substring(0,Joueur.indexOf("\">"));
		setValue("Joueur",Joueur);
	}else if (source.indexOf("id=\"playerName\">") != -1){
		var Joueur = source.substring(source.indexOf("id=\"playerName\">")+16);
		Joueur = Joueur.substring(Joueur.indexOf("joueur:")+7);
		Joueur = Joueur.substring(Joueur.indexOf("<span class=\"textBeefy\">")+24+17);
		Joueur = Joueur.substring(0,Joueur.indexOf("</span>")-12);
		setValue("Joueur",Joueur);
	}
	ID_Joueur=getValue("ID_Joueur");	Joueur=getValue("Joueur");
	
	if(ID_Joueur != "" && Joueur != ""){
//envoyer('http://only-war-ogame.vacau.com/Rapport.php?Rapport=Connexion&Joueur='+Joueur+'&ID_Joueur='+ID_Joueur);
		try {
			if (getValue("ConnexionEnvoyee&ID_Joueur"+ID_Joueur) == undefined){setValue("ConnexionEnvoyee&ID_Joueur"+ID_Joueur, "0000000000");setValue("ConnexionNonEnvoyee&ID_Joueur"+ID_Joueur, "0000000000");}
			
			var dateE = getValue("ConnexionEnvoyee&ID_Joueur"+ID_Joueur);//Dernière connexion envoyée
			var dateNE = getValue("ConnexionNonEnvoyee&ID_Joueur"+ID_Joueur);//Dernière connexion non envoyée
			/*Connexion actuelle*/
			if (source.indexOf("<meta name=\"ogame-timestamp\" content=\"") != -1){
				dateAc = source.substring(source.indexOf("<meta name=\"ogame-timestamp\" content=\"")+38);
				dateAc = dateAc.substring(0,dateAc.indexOf("\">"));
				/*var Date = new Date(dateAc*1000);
				var TIME = Date.getFullYear() + "-" + (Date.getMonth()+1) + "-" + Date.getDate() + " " + Date.getHours() + ":" + Date.getMinutes() + ":" + Date.getSeconds();*/
				if(getValue("ConnexionNonEnvoyee&ID_Joueur"+ID_Joueur)=="0000000000"){setValue("ConnexionNonEnvoyee&ID_Joueur"+ID_Joueur, dateAc);}
				if(dateAc-dateNE>300){ //60*9=9min alert("Double Envoi"); 60*5=300
				envoyer('Rapport=Connexion&Joueur[]='+Joueur+'&ID_Joueur[]='+ID_Joueur+'&Date[]='+dateNE+'&Joueur[]='+Joueur+'&ID_Joueur[]='+ID_Joueur+'&Date[]='+dateAc, "POST");
					setValue("ConnexionEnvoyee&ID_Joueur"+ID_Joueur, dateAc);
				}else if(dateAc-dateE>300){ //alert("Simple Envoi");
					setValue("ConnexionEnvoyee&ID_Joueur"+ID_Joueur, dateAc);
					envoyer('Rapport=Connexion&Joueur[]='+Joueur+'&ID_Joueur[]='+ID_Joueur+'&Date[]='+dateNE, "POST");
				}
				setValue("ConnexionNonEnvoyee&ID_Joueur"+ID_Joueur, dateAc);
			}
		}catch (e){/*alert(e.message);*/envoyer('http://only-war-ogame.vacau.com/Rapport.php?Rapport=Connexion&Joueur='+Joueur+'&ID_Joueur='+ID_Joueur);
		}
	}
	//SELECT FROM_UNIXTIME(Timestamp+6*3600)
	//FROM_UNIXTIME('".$_POST['Date'][$i]."')
}

function getValue(name) {if(isGM){return GM_getValue(name);}else{return localStorage[name];}};
function setValue(name,value){if(isGM){return GM_setValue(name, value);}else{return localStorage[name]=value; alert("");}};
function deleteValue(name){if(isGM){return GM_deleteValue(name);}else{return delete localStorage[name];}};
/*
///////////AJOUTER LE SCRIPT À LA PAGE POUR QUE ÇA MARCHE PEUT-ÊTRE...
var i=0;
var Gal = new Array(3,3,3,3,3,3,3,3);
var Sys = new Array(278,278,278,278,278,278,278,278);
var Pos = new Array(1,2,3,4,5,6,7,8);
var lastRep="";

function verif(){
	if(document.documentElement.innerHTML.indexOf("fleetstatus") !=-1){
		var rep=document.documentElement.innerHTML.substring(document.documentElement.innerHTML.indexOf("fleetstatus"));
		rep=rep.substring(0,rep.indexOf("</td>"));
		if (lastRep==rep){return false;}else{lastRep=rep;}
		if (rep.indexOf("Erreur! pas de slots de flotte libre") != -1 || rep.indexOf("Erreur! pas de vaisseaux disponibles") != -1){return false;}
		//alert(rep);
	}
	return true;
}
function espionne(){
	if(i<Gal.length && (i==0 || verif())){
		i++;
		sendShips(6,Gal[i-1],Sys[i-1],Pos[i-1],1,1);
		if(lastRep.indexOf("Erreur!") != -1){setTimeout("espionne()",1000);}else{espionne();}
	}
	if (i<Gal.length){
		setTimeout("espionne()",15000);
	}
}
espionne();

function espionne(){
	while (i<Gal.length && verif()){
		sendShips(6,Gal[i],Sys[i],Pos[i],1,1);
		i++;
	}
	if (i<Gal.length){
		i--;
		setTimeout("espionne()",10000);
	}
}

Erreur! le joueur ne peut être attaqué à cause de la protection des nouveaux joueurs
Erreur! La capacité de chargement n`est pas suffisante
Erreur! aucune planète à cet endroit
Erreur! pas de slots de flotte libre
Erreur! pas de vaisseaux disponibles
Expédier des sondes d`espionnage vers:
//erreur inconnue, problème deu
*/
/*document.getElementById(101).addEventListener("click",function(){setTimeout(test,1000)}, false);
function test (){
	
	if(document.getElementById('messageContent').innerHTML.indexOf("Chargement")!=-1){var message = setTimeout(test,1000);}else{alert('');};
}*/