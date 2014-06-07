// ==UserScript==
// @name           OGAME ALARME FR ( Chronomètre - Alarme - Refresh )
// @namespace      debbog.free.fr
// @description    alarme
// @include        *ogame*overview*
// ==/UserScript==

/*****************************************
**** Camouflage des icônes commandant ****
*****************************************/
var RegEx  = /http:\/\/.*?ogame.*?\/game\/.*?/i;
var Result = RegEx.exec(document.location);
if (Result != null) {
    function OGame_RemoveGFSpam() {
        var RegExSpamLink = /page=micropayment(?=&|$)/i;
        var RegExSpamImg  = /game\/img\/.*?_ikon.*?\.gif/i;
        var RegExDarkM    = /img\/dm_klein_2\.jpg/i;

        var links          = document.getElementsByTagName('a');
        for (i = 0, link = ''; link = links[i]; i++) {
            if ((link.getAttribute('href')) && (link.getAttribute('href').match(RegExSpamLink))) {
                if (link.parentNode.parentNode.parentNode.parentNode.parentNode.nodeName.toLowerCase() == 'td') {
                    var IconsSpam   = link.parentNode.parentNode.parentNode.parentNode;
                }
                else if (link.parentNode.parentNode.parentNode.parentNode.parentNode.nodeName.toLowerCase() == 'div') {
                    var MenuSpam    = link.parentNode.parentNode;
                }
            }
        }
        var imgs           = document.getElementsByTagName('img');
        for (i = 0, img = ''; img = imgs[i]; i++) {
            if ((img.getAttribute('src')) && (img.getAttribute('src').match(RegExDarkM))) {
                if (img.parentNode.parentNode.parentNode.parentNode.nodeName.toLowerCase() == 'table') {
                    var DarkMatiere = img.parentNode.parentNode.parentNode;
                }
            }
            else if ((img.getAttribute('src')) && (img.getAttribute('src').match(RegExSpamImg))) {
                if (img.parentNode.parentNode.parentNode.parentNode.parentNode.nodeName.toLowerCase() == 'table') {
                    var IconsSpam   = img.parentNode.parentNode.parentNode.parentNode.parentNode;
                    break;
                }
            }
        }

        if (IconsSpam) { IconsSpam.parentNode.removeChild(IconsSpam); }
        if (MenuSpam) { MenuSpam.parentNode.removeChild(MenuSpam); }
        if (DarkMatiere) {
            DarkMatiere.childNodes[0].removeChild(DarkMatiere.childNodes[0].childNodes[3]);
            DarkMatiere.childNodes[1].removeChild(DarkMatiere.childNodes[1].childNodes[3]);
            DarkMatiere.childNodes[2].removeChild(DarkMatiere.childNodes[2].childNodes[3]);
        }
    }

    OGame_RemoveGFSpam();

    if (self.opera) {
        opera.addEventListener('BeforeScript', OGame_RemoveGFSpam, false);
    }
}

/**************************************************************
************** Déclaration des variables du programme *********
**************************************************************/

var sonMessage,sonEspionnage,sonAttaqueConf,sonAttaque;
var listeElements,elementActuel,publi,commandant;
var timer,time,timerSuivant,volume,tempsMin,tempsMax,compteur;
var corps;
var session = 1;
var valeur  = 1;
var tempsHeures 	= 0;
var tempsMinutes	= 0;
var tempsSecondes	= 0;
var afficheHeures   = 0;
var afficheMinutes  = 0;
var afficheSecondes = 0;

var image = "http://transfert.infos.free.fr/xloadSkin6/images/ligne.gif";

/*************************************************************
*************  Ajustement des paramètres des sons  ***********
*************************************************************/

volume = "100";   // "0"= désactivé , "100"= activé totalement

/**************************************************************
************* Temps auquel doit se rafraichir la page  ********
**************************************************************/
tempsMin = 104000; //=  104sec   ou 01 Minutes 44 Secondes- Temps minimum
tempsMax = 1024000; //= 1024sec  ou 17 Minutes 04 Secondes- Temps maximum

// Calcul aléatoire du temps
time  = Math.random()*( tempsMax-tempsMin ) + tempsMin;
time.toFixed(2);
// Rafraichit la page overview
//if(parent.document.URL.indexOf('overview.php') != -1) {
timer = setTimeout( function(){ alertetotale(); } , time );
//}

/**************************************************************/
/********** Liens vers les sonorités événementielless *********/
/**************************************************************/
sonAttaqueConf 	=	"http://xlx.ogame.free.fr/sons/sirene1.mp3";
sonAttaque 		=	"http://xlx.ogame.free.fr/sons/sirene1.mp3"; 
sonEspionnage 	=	"http://xlx.ogame.free.fr/sons/sirene4.mp3"; 
sonMessage 		=	"http://xlx.ogame.free.fr/sons/sirene5.mp3";

/**************************************************************/
/*********    Ajout du chrono et incrémenteur          ********/
/**************************************************************/



corps = document.getElementsByTagName("body")[0];
div   = document.createElement("div");
div.setAttribute("style","border:solid #FFCC00 1px;left:170;top:100;height:75px;width:140px;position:absolute;z-index:100;background:#000000;color:#FFCC00;");
div.innerHTML = "<div style='padding:3px;text-align:center;'>Temps écoulé depuis<br>dernière mise à jour:<br><br><input type='text'  id='compteur'style='text-align:center;border:none;width:50px;' value=''/><br><br><img src='"+image+"' style='width:135px;'></div>";
corps.appendChild(div);

tempsChrono = setInterval(function(){
										tempsSecondes=tempsSecondes+1;
										

										if(tempsSecondes>59) 
										{
											tempsMinutes=tempsMinutes+1;
											tempsSecondes = 0;	
										}
										
										if(tempsMinutes>59) 
										{
											tempsHeures=tempsHeures+1;
											tempsMinutes = 0;	
										}
										/******************************************************/
										/************** Traitement exceptions******************/
										/******************************************************/
										if(tempsSecondes<10)
										{
											afficheSecondes = "0"+tempsSecondes;
										}
										if(tempsSecondes>9)
										{
											afficheSecondes = tempsSecondes;
										}										
										if(tempsMinutes<10)
										{
											afficheMinutes = "0"+tempsMinutes;																							
										}
										if(tempsMinutes>9)
										{
											afficheMinutes = tempsMinutes;												
										}										
										if(tempsHeures<10)
										{
											afficheHeures = "0"+tempsHeures;
										}
										if(tempsHeures>9)
										{
											afficheHeures = tempsHeures;
										}
										
										var decompte = afficheHeures+':'+afficheMinutes+':'+ afficheSecondes;
										document.getElementById('compteur').value = decompte;
								  
								  },1000);    	

function sonInner(objet)  
{
	return objet.innerHTML;	
} 
function alertetotale()   
{ 
    var son = 0;
	publi 			= document.getElementsByTagName ('th');
    listeElements 	= document.getElementsByTagName('span');
	
	for (var i = publi.length - 1; i >= 0; i--)
	{
		var pageHTML = sonInner(publi[i]);
		
		if( pageHTML.indexOf('?page=messages') != -1 )
        { 
		    if( son != sonEspionnage )
			{
				son = sonMessage;
				joueAlarme(son);
			}
		}

	}
	
	/*************************************************
	**** Balayage de la liste des éléments 'SPAN' ****
	*************************************************/
    for (var i = 0; i < listeElements.length; i++)
	{
		
		elementActuel = listeElements[i];

        
	    if(elementActuel.className.substring(0,17)=='federation')//viene ataque de Confederacion
        {
			
            if( son != sonEspionnage )
			{
				son	=	sonAttaqueConf;
				joueAlarme(son);				
			}
		}
        else if(elementActuel.className.substring(0,13)=='flight attack')//Una flota enemiga te va a atacar
		{
			if( son != sonEspionnage )
			{
				son	=	sonAttaque;  
				joueAlarme(son);
			}
		}
        else if (elementActuel.className.substring(0,16)=='flight espionage')//Flota enemiga te Espia
		{
			son	=	sonEspionnage;
			joueAlarme(son);
        }
  
    } 
	
	
	/**************************************************************/
	/****** temps d'attente pour écoute complète de l'alerte ******/
	/**************************************************************/
	timerSuivant = setTimeout( function(){ rafraichir(); } , 4021 );
		
}
function joueAlarme(effet)
{

	/**************************************************************/
	/****** Association du son à la page de façon invisible  ******/
	/**************************************************************/
	body = document.getElementsByTagName("body")[0];
	var emb = document.createElement("embed");
	
	emb.src = effet;
	emb.setAttribute("autostart", "true");
	emb.setAttribute("loop", "false");
	emb.setAttribute("hidden", "true");
	emb.setAttribute("volume", volume);
	
	body.appendChild(emb);	
}

function rafraichir()
{	
	/**************************************************************/
	/***************** Relance de la page en cours  ***************/
	/**************************************************************/		
	var url = window.location.href;
	window.location.replace(url);	
	clearTimeout( timerSuivant );	
}


