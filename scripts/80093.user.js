// ==UserScript==
// @name           MipTimer
// @namespace      Sylver
// @description    Calcul de l'heure d'impact des Mips et du temps de Vol / Calculating the impact time of Mips and  flight's time
// @include        http://*.ogame.*/game/index.php?page=galaxy&session=*
// @include                http://*.ogame.*/game/index.php?page=galaxy&no_header=*&galaxy=*&system=*&planet=*&session=*
// @include				   http://*.ogame.*/game/index.php?page=galaxy&galaxy=*&system=*&position=*&session=*
// @include				   http://*.ogame.*/game/index.php?page=resourceSettings&session=*
// ==/UserScript==



//*************************************************
// FONCTIONS
//*************************************************
//------------------------
// Définition de la fonction GM_getValue pour Google Chrome
//------------------------
if (navigator.userAgent.indexOf('Firefox')>-1)  
{
var FireFox = true; 
var nomScript='';
}
else 
{ 
var FireFox = false;
var nomScript='miptime';
}

	// Google Chrome & Opéra
	if(!FireFox) 
	{
		function GM_getValue(key,defaultVal) 
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
	
//----------------------------------

function serveurTimer()
{
	
	//---------------------------------------------------------------
	// CALCUL VITESSE
	//---------------------------------------------------------------
	var serveur = location.href.split('/')[2]; // recuperation du nom du serveur
	var pseudo = document.getElementById('playerName').getElementsByClassName('textBeefy')[0].innerHTML; // récupération du pseudo
	var vitesse = GM_getValue('vitesse'+serveur+pseudo , -1); // recuperation de la vitesse enregistrée
	
	
	//************************************************************
	
		
	var heureDep=document.getElementById("OGameClock").getElementsByTagName('span')[0].innerHTML; // récupération de l'heure du serveur
	var hdep=(heureDep[0])+heureDep[1]; // récupération des heures
	var mdep=(heureDep[3])+heureDep[4]; // récupération des minutes
	var sdep=heureDep[6]+heureDep[7]; // récupération des secondes
	
	
	var depart=0; // Systeme de départ des Mips
	var arrivee=0; // Systeme d'arrivée des Mips

	var sysArr=document.getElementById("system_input").value; // Système d'arrivée
	var galArr=document.getElementById("galaxy_input").value; // Galaxie d'arrivée

	var sysDep=document.getElementsByClassName('planetlink active tipsStandard')[0].getElementsByClassName('planet-koords')[0].innerHTML; // Récupération des coordonnées de la planète où l'on se situe
	var galDep=sysDep[1]; // Récuparation de la galaxie de départ
	if (sysDep[2] <= 9 && sysDep[2] >0) // Pour les uni où il y a plus de 9 galaxies
	{
		galDep=sysDep[1]+sysDep[2];
	}


	sysDep=sysDep[3]+sysDep[4]+sysDep[5]; // récupération du Système de départ, de base à 3 chiffres

	if(sysDep[2]==':') // Si le système ne comporte que 2 chiffres
	{
		sysDep=sysDep[0]+sysDep[1];
	}
	if(sysDep[1]==':') // Si le système ne comporte qu'1 chiffre
	{
		sysDep=sysDep[0];
	}
	var diff = (sysArr-sysDep); // Différence des systèmes, = nombre de minutes supplémantaires 
	if (diff<0) // Si résultat négatif, on le récupère en positif .
	{
		diff *= -1;
	}
	var time2=diff*60+30; // Calcul en secondes du temps de vol des Missiles
	
	//-------------- CALCUL HEURE IMPACT -------------------//
	
	var h = hdep; // heure de vol
	var m = mdep; // minute de vol
	var s = sdep; // seconde de vol
	
	diff = (1/vitesse)*(30+(60*diff));
	
	var date = new Date(); // récupération de la date
	var timeStamp = date.getTime(); // convertion en timestamp
	/*var diffSec = sdep - date.getSeconds(); // calcul de la différence entre le timestamp et l'heure serveur
	if (diffSec > 10 || diffSec < -10) // Si la différence est trop grande ...
	{
		diffSec=0;
	}*/
	
	timeStamp = (timeStamp-(timeStamp % 1000))/1000; // convertion du timestamp en secondes
	
	timeStamp = (timeStamp /*+ diffSec*/  + diff)*1000; // calcul du timestamp de l'heure d'impact
	
	var nvDate = new Date(timeStamp); // convertion du nouveau timestamp en une date
	//nvDate = nvDate.getDate() + ' à ' + nvDate.getHours() + ' : ' + nvDate.getMinutes() + ' : ' + nvDate.Seconds();
	h = (diff-(diff%3600))/3600;  // récupération des heures de vol
	diff = diff % 3600;
	m = (diff-(diff%60))/60; // récupération des minutes de vol
	diff = diff % 60;
	s = Math.round(diff); // récupération des secondes de vol, arrondie AU PLUS PROCHE
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
	
	//-------------------------------------------------------
	
	
	if(galArr == galDep) // Si on se situe dans la même galaxie 
	{

	if(vitesse == -1)
		{
			newElement.innerHTML = 'Veuillez visiter la page des Ressources D&eacute;tail&eacute;es pour charger la vitesse';
		}
		else
                {
			newElement.innerHTML = '<div align=center> Impact des Mips le ' + day + ' à ' + hours+ ':'+minutes+':'+seconds+ '. Temps de vol des Mips : '+ h + ':' + m +':'+ s  +' .</div>'+'<br>'+'<div align=center>Vitesse  * ' + vitesse + '</div>'; // Texte à afficher
		}
	}
	else
	{
		newElement.innerHTML = 'Mauvaise Galaxie';
	}
	document.getElementById('galaxy').insertBefore(newElement, document.getElementById('siteFooter')); // On l'affiche entre la page galaxie et le pied de page.
	
}


//***********************************************
//     SCRIPT
//***********************************************

	var page =location.href.split('?page=')[1].split('&')[0]; // recuperation du type de la page
	
	if (page == 'resourceSettings') // si l'on est dans la page des param des ressources
    {
		var revMBase =document.getElementById('inhalt').getElementsByClassName('undermark')[0].innerHTML; // récupération de revenu de base de metal
		
		var vitesse2 =revMBase/20; // calcul de la vitesse
		
		var serveur = location.href.split('/')[2]; // recuperation du nom de serveur
		var pseudo = document.getElementById('playerName').getElementsByClassName('textBeefy')[0].innerHTML; //recuperation du pseudo

		GM_setValue('vitesse'+serveur+pseudo, vitesse2); // enregistrement de la vitesse
		
	} 
	if (page == 'galaxy')
	{
		// Page galaxie
		var newElement = document.createElement("span"); // création d'un élément HTML <span></span>
		newElement.setAttribute("style","color:#FFFFFF;font-weight:bold;"); // Affectation des attributs : COULEUR

		setInterval(serveurTimer, 1000);  // Appel de la fonction toutes les secondes
	}	

/*------------------- FIN ---------------------*/


