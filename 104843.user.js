// ==UserScript==
// @name           MipTimer v2
// @namespace      Sylver
// @description    Calcul de l'heure d'impact des Mips et du temps de Vol / Calculating the impact time of Mips and  flight's time
// @include		   http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

//************************************************
// VARIABLES GLOBALES
//************************************************
//*****
// PARAMETRES UTILISATEUR PERSONNALISABLES
//*****
var serveur = location.href.split('/')[2]; // recuperation du nom du serveur

if(GM_getValue('mipTimer'+'-op1'+serveur,-1) == -1 ) // si valeur non sauvée
{
	
	GM_setValue('mipTimer'+'-op1'+serveur,true); // initialisation à vrai
	
}
var feet = GM_getValue('mipTimer'+'-op1'+serveur,-1); // Affiche le texte en bas de page si true, en dessous de la barre d'évenement si faux (sauf page galaxie et page d'alliance, toujours en bas)



//************************************************
//************************************************
var version = '2.5' ; // Version du script

var pseudo = document.getElementById('playerName').getElementsByClassName('textBeefy')[0].innerHTML; // récupération du pseudo
var tab = new Array(); // Tableau contenant les heures d'impact des Mips

if (navigator.userAgent.indexOf('Firefox')>-1)  // Identification du navigateur
{
	var FireFox = true; 
	var nomScript='';
}
else 											
{
	var FireFox = false;
	var nomScript='miptimer2';
}
//--------------------------
var URL='http://userscripts.org/scripts/show/81363';
var Instal ='http://userscripts.org/scripts/source/81363.user.js';

//*************************************************
// FONCTIONS
//*************************************************
//------------------------
// Définition des fonctions GM_getValue et GM_setValue pour Google Chrome
//------------------------


	// Google Chrome & Opéra
	if(!FireFox) 
	{
		function GM_getValue(key,defaultVal) // déclaration des fonctions : 
		{
			var retValue = localStorage.getItem(key+nomScript);
			if ( !retValue ) 
			{
				return defaultVal;
			}
			return retValue;
		}

		function GM_setValue(key,value) 
		{
			localStorage.setItem(key+nomScript, value);
		}
	}
	if (typeof uneval === 'undefined') {
		uneval = function(obj) {
			return JSON.stringify(obj);
		}
	}
//-----------------------------------------------
// AJOUT BOUTON
//-----------------------------------------------
function addButton() // @Copyright Terminator By Lame Noire
{
	var buttonPosition = document.getElementById("links");
	if(!buttonPosition) 
	{
		return;
	}

	var button = document.createElement("li");
	button.innerHTML = '<span class="menu_icon" id="IconeScript"><img src="http://img810.imageshack.us/img810/3261/imgestionscript.png" ></span/><a target="_self" accesskey="" href="' + location.href + "&Scripts" + '" class="menubutton "><span class="textlabel">Gestion Scripts</span></a>';
	buttonPosition = document.getElementById("links").getElementsByTagName("ul")[0].getElementsByTagName("li")[10];
	insertAfter(button, buttonPosition);
}
//-----------------------------------------------
// INSERT AFTER
//-----------------------------------------------
function insertAfter(elem, after) // @copyright Terminator By Lame Noire
{
	var dad = after.parentNode;
	if(dad.lastchild == after)
		dad.appendChild(elem);
	else 
		dad.insertBefore(elem, after.nextSibling);
}
//-----------------------------------------------
// FADE BOX
//-----------------------------------------------
//function petit rectangle affiché (genre pop up) 0 V , 1 erreur
function fadeBoxx(message, failed, temps){
	
	unsafeWindow.tb_remove();
    	
	if (failed) {
		unsafeWindow.$("#fadeBoxStyle").attr("class", "failed");
	} else {
		unsafeWindow.$("#fadeBoxStyle").attr("class", "success");
	}
	unsafeWindow.$("#fadeBoxContent").html(message);
	unsafeWindow.$("#fadeBox").stop(false, true).show().fadeOut(temps);
}
//-----------------------------------------------
// TEXT OPTIONS
//-----------------------------------------------
function displayOptions()
{

if(!document.getElementById('headGestionScript')) // Si ce script est le script racine (le premier a être traité)
	{
	document.getElementById('inhalt').innerHTML= ' <span id="headGestionScript"><center><h2>Gestionnaire des Scripts</h2></center></span>'; // On affiche le titre
	document.getElementById('inhalt').innerHTML+='<table bgcolor="#333333" style="border: 1px solid #606060 !important;" ><tr><td><center><img src="http://img716.imageshack.us/img716/5640/iconemiptimercopie.png" /><br><font size=3 color=#009999><b>Mip Timer v2</b></font></center><b><font color=#cc9900>Afficher en pied de page : </font>Oui - <input type="radio" name="grp3mT" value="1" id="mT1a">       Non - <input type="radio" name="grp3mT" value="0" id="mT1b"></b><br><input type="submit" id="mTsave" value="Save"></input><br><br><center><font color=#333333>_____________________________________________________________________________________</font></center></td></tr></table>';// On affiche les options
	document.getElementById("mTsave").addEventListener("click", function(event){save();}, true);	// on ajoute l'évenement au bouton Submit
	}
	else
	{
	var text='<table bgcolor="#333333" style="border: 1px solid #606060 !important;" ><tr><td><center><img src="http://img716.imageshack.us/img716/5640/iconemiptimercopie.png" /><br><font size=3 color=#009999><b>Mip Timer v2</b></font></center><b><font color=#cc9900>Afficher en pied de page : </font>Oui - <input type="radio" name="grp3mT" value="1" id="mT1a">       Non - <input type="radio" name="grp3mT" value="0" id="mT1b"></b><br><input type="submit" id="mTsave" value="Save"></input><br><br><center><font color=#333333>_____________________________________________________________________________________</font></center></td></tr></table>';// On saisie le texte à afficher
	// LE BUT EST DE RAJOUTER LE TEXTE SANS TOUCHER AU addEventListener précédent, pour ne pas qu'il soit désactivé = INDISPENSABLE
	var sp1 = document.createElement("span"); // on crée une balise span
	 sp1.setAttribute("id", "AffichagemT"); // on y ajoute un id
	 var sp1_content = document.createTextNode('');
	 sp1.appendChild(sp1_content); 
	 var sp2 = document.getElementById('headGestionScript') ; // Lieu où on veut afficher (A remplacer par ce que vous voulez 
	 var parentDiv = sp2.parentNode;
	 parentDiv.insertBefore(sp1, sp2.nextSibling);
	 var tableau = document.createElement("span");
	 tableau.innerHTML = text; // Ce qu'on veut afficher 
	 document.getElementById('AffichagemT').insertBefore(tableau, document.getElementById('AffichagemT').firstChild); // Affichage
	  
	 document.getElementById("mTsave").addEventListener("click", function(event){save();}, true);// ajout du nouvel évenement de sauvegarde
	}	 

	var op=String(GM_getValue('mipTimer'+'-op1'+serveur,-1)); // recup option

	if(op == -1) // si non sauvegardée
	{
		document.getElementById('mT1a').checked=true; // bouton oui coché
	}
	else
	{
		if(op == 'true') // si "oui" sauvé
		{
			document.getElementById('mT1a').checked=true; // bouton oui coché
		}
		if(op == 'false') // si "non" sauvé
		{
			document.getElementById('mT1b').checked=true; // bouton non coché
		}
	}
}	
//-----------------------------------------------
// SAVE OPTIONS
//-----------------------------------------------
function save() // sauvegarde des options saisies à suite à l'appui du bouton save
{
	GM_setValue('mipTimer'+'-op1'+serveur, document.getElementById('mT1a').checked);
	if(FireFox)  
	{
		fadeBoxx("Sauvegardé",0,2000); // affichage d'une fadebox
	}
	else
	{
		alert("Sauvegardé");
	}
}
//-----------------------------------------------
// RECUPERATION DE LA VITESSE
//-----------------------------------------------
	
function getSpeed()
{
	
	var vitesse = GM_getValue('vitesse'+serveur+pseudo ,-1); // recuperation de la vitesse enregistrée
	
	return vitesse;
}
//-----------------------------------------------
// SAUVEGARDE DE LA VITESSE
//-----------------------------------------------
function setSpeed()
{
	var revMBase =document.getElementById('inhalt').getElementsByClassName('undermark')[0].innerHTML; // récupération de revenu de base de metal
		
	var vitesse2 =revMBase/20; // calcul de la vitesse

	GM_setValue('vitesse'+serveur+pseudo, vitesse2); // enregistrement de la vitesse
}
//-----------------------------------------------
// RECUPERATION DES DONNÉES RELATIVES AUX
// COORDONÉES ET A LA DURÉE DE VOL DES MIPS
//-----------------------------------------------
function getCoords_And_Distance()
{
	var sysArr=document.getElementById("system_input").value; // Système d'arrivée
	var galArr=document.getElementById("galaxy_input").value; // Galaxie d'arrivée
	var posDep = document.getElementById("rechts").getElementsByClassName("active")[0].getElementsByClassName("planet-koords")[0].textContent;
	/(\d*):(\d*):(\d*)/.exec(posDep); // Separation de la chaine en trois morceau séparés pas les " :" 
	var galDep = RegExp.$1; // récupération des resultats
	var sysDep = RegExp.$2;
	var vitesse = getSpeed();
	
	var diff = Math.abs((sysArr-sysDep)); // Différence des systèmes, = nombre de minutes supplémantaires 
	diff = ( 1/vitesse )*(30+(60*diff));
	
	var coord = new Array();
	coord.data = // objet comprotant les données de distance et de position
	{
		gDep : galDep,
		sDep : sysDep,
		gArr : galArr,
		sArr : sysArr,
		dist : diff,
	}
	return coord.data;
}
//----------------------------------------------
// CALCUL DES DONNÉES RELATIVES A L'HEURE 
// D'IMPACT
//----------------------------------------------
function getDateOfImpact()
{
	
	//-------------- CALCUL HEURE IMPACT -------------------//
	
	var distance = getCoords_And_Distance(); // recupération des données de distance et de position
	var diff = distance.dist;
	var date;
	if(FireFox) 
	{
		date = unsafeWindow.serverTime;
	}
	else
	{
		date = new Date();
	}
	var timeStamp = date.getTime(); // convertion en timestamp
	
	timeStamp = (timeStamp-(timeStamp % 1000))/1000; // convertion du timestamp en secondes
	
	timeStamp = (timeStamp /*+ diffSec*/  + diff)*1000; // calcul du timestamp de l'heure d'impact
	
	var nvDate = new Date(timeStamp); // convertion du nouveau timestamp en une date
	var h = (diff-(diff%3600))/3600;  // récupération des heures de vol
	diff = diff % 3600;
	var m = (diff-(diff%60))/60; // récupération des minutes de vol
	diff = diff % 60;
	var s = Math.round(diff); // récupération des secondes de vol, arrondie a L'INFERIEUR
	var day = nvDate.getDate(); // récupération du jour d'impact
	var hours = nvDate.getHours(); // récupération de l'heure d'impact
	if (hours <10)
	{
		hours = '0'+hours;
	}
	var minutes = nvDate.getMinutes();// récupération de la minute d'impact
	if (minutes <10)
	{
		minutes = '0'+minutes;
	}
	var seconds = nvDate.getSeconds();// récupération de la seconde d'impact
	if (seconds <10)
	{
		seconds = '0'+seconds;
	}
	//------------------------SAUVEGARDE-------------------------//
	var data = new Array();
	data.time =  // objet comportant les données de temps
	{
		dayImp : day,
		hoursImp : hours,
		minImp : minutes,
		secImp : seconds,
		hFly : h,
		mFly : m,
		sFly : s,
		timestamp : timeStamp,
	}
	return data.time;
}
//------------------------------------------------------
// AFFICHAGE DES DONNÉES CALCULÉES DANS LA PAGE 
// GALAXIE
//------------------------------------------------------
function serveurTimer() // affichage du temps de vol et l'heure théorique d'impact si l'on lance à l'instant
{

	var distance = getCoords_And_Distance(); // récuperation des données de distance et de position
	var impact = getDateOfImpact(); // récuperation des données de date d'impact
	var vitesse = getSpeed(); // récupération de la vitesse
	if(distance.gArr == distance.gDep) // Si on se situe dans la même galaxie 
	{
		if(getSpeed() <= 0) 
		{
			newElement.innerHTML = 'Veuillez visiter la page des Ressources D&eacute;tail&eacute;es pour charger la vitesse'; // Si la vitesse n'est pas chargée
		}
		else
		{
			if (!newElement.getElementsByTagName("div")[0])
				newElement.innerHTML = '<div align=center style="color:#9F0;background-color:#333"></div>'+'<br>'+'<div align=center style="color:#9F0;background-color:#333">Vitesse  * ' + vitesse + '</div>'; // Texte à afficher, statique
				
			newElement.getElementsByTagName("div")[0].textContent = 'Impact des Mips le ' + impact.dayImp + ' à ' + impact.hoursImp+ ':'+ impact.minImp+':'+ impact.secImp+ '. Temps de vol des Mips : '+ impact.hFly + ':' + impact.mFly +':'+ impact.sFly  +'.'; // Texte à mettre à jour et à afficher
			 

		}
	}
	else
	{
		newElement.textContent = 'Mauvaise Galaxie'; // si l'on se situe dans une autre galaxie que la courante
	}
	
	
	//*************************
	callCountDown();
	//*************************
}
	//-------------------------------------------------------
	// AJOUT D'EVENEMENT APPELANT LA FONCTION setCountDown
	// AU BOUTON "FEU"
	//-------------------------------------------------------
	function callCountDown()
	{
		var page =location.href.split('?page=')[1].split('&')[0]; // recuperation du type de la page
		if (page == 'galaxy')
		{
			if (document.getElementById('TB_window'))
			{
				var button = document.getElementById('grid').getElementsByClassName('attack_button')[0]; // recupération du bouton "Feu!"
				button.addEventListener("click", setCountDown, false ); // Ajout de l'evenement click appelant le setCountDown
				
			}
		}
	
	
	
	}
	//---------------------------------------------------------
	// AJOUT DES DONNÉES D'UNE VAGUE DANS LE TABLEAU ET TRI
	// (ET SAUVEGARDE)
	//---------------------------------------------------------
	function setCountDown()
	{
		tab = eval(GM_getValue('table'+serveur+pseudo , "[]")); // Récuperation du tableau comportant les vagues de mip
		
		var impact = getDateOfImpact(); // Récupération des données de l'impact au moment de l'appui sur le bouton
		var coordCible =document.getElementById('position').innerHTML; // Récupération des coordonées de la cible
		var nbMips = document.getElementById('anz').value; // récupération du nombre de Mips envoyés
		var select = document.getElementById('pziel').getElementsByTagName("select")[0]; // Récuperation de la liste déroulante
		var ciblePrinc = select.options[select.selectedIndex].value; // Récupération du code de la cible principale
		ciblePrinc = getCiblePrinc(ciblePrinc); // Récupération de l'équivalent du code en son nom
		var heure = impact.hoursImp+':'+impact.minImp+':'+impact.secImp; // Création de la chaine de caractère représentant l'heure d'impact
		
		tab.push([impact.timestamp , coordCible , ciblePrinc , nbMips , heure]); // Ajout en dernier position du tableau de la nouvelle vague de mip
		tab.sort();// Tri du tableau, les vagues arrivant en premier sont en tête du tableau
		GM_setValue('table'+serveur+pseudo,uneval(tab)); // Sauvegarde du tableau après transformation en chaine
		

	}
	//-------------------------------------------------------
	// CALCUL / MISE A JOUR DU COMPTE A REBOURS ET AFFICHAGE
	//-------------------------------------------------------
	
	function countDown() // Calcul et affichage du message de chaque vague
	{
		var res = eval(GM_getValue('table'+serveur+pseudo , -1)); // récupération du tableau des mips 
		var i; // indice de parcours
		var date; // date actuelle
		var timeStamp; // timestamp du chrono
		var h , m ,s ; // élement du chrono affiché
		if(FireFox) // si le navigateur est Firefox
				{
					date = unsafeWindow.serverTime; // récuperation de la date actuelle
				}
				else // sinon ...
				{
					date = new Date();
				}
				
		for ( i=0 ; i< res.length ; i++) // parcours de chaque ligne du tableau
		{		
				timeStamp = date.getTime(); // convertion en timestamp de la date
				timeStamp = res[i][0] - timeStamp; // calcul du chrono en timestamp
				timeStamp = (timeStamp-(timeStamp % 1000))/1000; // récupération des secondes du timestamp
				
				if (timeStamp > -1 ) // si chrono >= à 0
				{
						h = (timeStamp-(timeStamp%3600))/3600;  // récupération des heures de vol
						timeStamp = timeStamp % 3600;
						m = (timeStamp-(timeStamp%60))/60; // récupération des minutes de vol
						timeStamp = timeStamp % 60;
						s = Math.round(timeStamp); // récupération des secondes de vol, arrondie a L'INFERIEUR
					if (!mipElement.getElementsByTagName("div")[2*i]) // Si pas encore créé
						mipElement.innerHTML += '<div><font color=#009900>'+res[i][4]+' </font> : Impact de '+ res[i][3] + ' Mip(s) sur ' + res[i][1] + ' avec pour cible : ' + res[i][2] + '.<div><br><div ></div>'; // Texte à afficher
						
					mipElement.getElementsByTagName("div")[(2*i)+1].textContent = h+':'+m+':'+s; // affichage du chrono et mise à jour
						
						if ( h== 0 && m == 0 && s == 0) // Si le chrono atteind 0, on affiche le texte
						mipElement.getElementsByTagName("div")[(2*i)+1].textContent ='Terminé';					
				}
				else 
				{
					if(mipElement.getElementsByTagName("div")[(2*i)+1] != undefined && mipElement.getElementsByTagName("div")[(2*i)+1].textContent != 'Terminé' )
					{ // Si la vague est arrivée et n'est pas affichée en ce moment et n'est pas indéfinie
						res.shift(); // Suppression de la vague du tableau
						GM_setValue('table'+serveur+pseudo,uneval(res));  // Mise à jour du tableau
					}
				}
					
		}
	}

//--------------------------------------------------
// CONVERTION CODE CIBLE EN CHAINE DE CARACTERE
//--------------------------------------------------
	function getCiblePrinc(code) // Converti le code de la cible principale en son équivalant 
	{
		switch (parseInt(code))
		{
			case 0 : return 'Tous';
					break;
			case 401 : return 'Lanceur de missiles' ;
					break;
			case 402 : return 'Artillerie laser légère';
					break;
			case 403 : return 'Artillerie laser lourde';
					break;
			case 404 : return 'Canon de Gauss';
					break;
			case 405 : return 'Artillerie à ions';
					break;
			case 406 : return 'Lanceur de plasma';
					break;
			case 407 : return 'Petit bouclier';
					break;
			case 408 : return 'Grand bouclier';
					break;
			default : return 'Unknown';
					break;
		}
	}
	
//-------------------------------------------------
// MISE A JOUR
//-------------------------------------------------

function checkUpDate() // Copyright Lame Noire(author)
{
	GM_xmlhttpRequest(
	{
		method: 'GET', url: URL, onload: 
		function(answers)
		{
			var page = answers.responseText;
			var versionOfScript = page.substring(page.indexOf('<b>Version</b> : ')+17, page.length);
			versionOfScript = versionOfScript.substring(1, versionOfScript.indexOf("]"));
			if(version != versionOfScript)
				{ MaJ.innerHTML = "<br><a href='"+ Instal +"'><font color=orange> Mise à jour disponible  </font></a><br>";	}
		}
	});
}
	
	
//***********************************************
//     SCRIPT
//***********************************************
if(!document.getElementById('IconeScript') )
{
	addButton();
}
	var page =location.href.split('?page=')[1].split('&')[0]; // recuperation du type de la page
	if (page == 'resourceSettings') // si l'on est dans la page des param des ressources
    {
		setSpeed();
		
	} 
	if (page == 'galaxy')
	{
		// Page galaxie
		var newElement = document.createElement("span"); // création d'un élément HTML <span></span>
		newElement.setAttribute("style","color:#FFFFFF;font-weight:bold;"); // Affectation des attributs : COULEUR
		document.getElementById('galaxy').insertBefore(newElement, document.getElementById('siteFooter')); // On l'affiche entre la page galaxie et le pied de page.

		var idInterval = setInterval(serveurTimer, 1000);  // Appel de la fonction toutes les secondes
		
		
	}	
	//toutes les pages si des mips sont lancés
	var res = eval(GM_getValue('table'+serveur+pseudo , -1));
	if (res.length > 0 && res.length != 0)
	{
		
		var mipElement = document.createElement("span"); // création d'un élément HTML <span></span>
					mipElement.setAttribute("style","color:#FFFFFF;font-weight:bold;"); // Affectation des attributs : COULEUR
		if ( !feet && page != 'galaxy' && page != 'alliance') // Si on veux afficher en haut et que les pages ne sont pas Galaxie ou Alliance
		{
			
					document.getElementById('box').insertBefore(mipElement, document.getElementById('inhalt')); // On l'affiche entre les evenement et le corps de page.				
		}
		else 
		{
			document.getElementById(page).insertBefore(mipElement, document.getElementById('siteFooter')); // On l'affiche en bas de page (avant le footer) 
			
		}
		
	var countDownInterval = setInterval(countDown, 1000);  // Appel de la fonction toutes les secondes
	}
	else
	{
		clearInterval(countDownInterval); // On stoppe l'appel
	}
//*********** MISE A JOUR **************//

if (FireFox && page == 'overview')
{
		var MaJ = document.createElement("div"); // création d'un élément HTML <div></div>
		MaJ.setAttribute("style","font-weight:bold;"); // Affectation des attributs : Gras
		document.getElementById('overview').insertBefore(MaJ, document.getElementById('siteFooter')); // On l'affiche entre la page galaxie et le pied de page.
		//MaJ.innerHTML = '<font color="orange">Test</font>';
		checkUpDate();
}

if ( (location.href.split('&')[2]) == 'Scripts') // si dans la partie 'Scripts'
{
	displayOptions(); // affichage des options
	
}	
	
	
/*------------------- FIN ---------------------*/


