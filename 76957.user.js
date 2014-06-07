// ==UserScript==
// @name           OGAME ALARM PL by Mayeek
// @namespace      debbog.free.fr
// @description    alarme
// @include        *ogame*overview*
// Create by oO, modify by Mayeek
// ==/UserScript==

/***************************************************************
**************** FONCTIONS DE REDONDANCES **********************
***************************************************************/

function sonID(objID)
{
    return document.getElementById(objID);
}
function tagName(objTAG)
{
    return document.getElementsByTagName(objTAG);
}
function sonInner(objINNER)
{
    return objINNER.innerHTML;
}
function REGEXE(objREG)
{
    return objREG.exec(document.location);
}

/**************************************************************
************** Déclaration des variables du programme *********
**************************************************************/
var sonMessage,sonEspionnage,sonAttaqueConf,sonAttaque,image;
var listeElements,elementActuel,publi,commandant,tab_sons;
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


//image = "http://transfert.infos.free.fr/xloadSkin6/images/ligne.gif";

/****************************************************************
*************  Ajustement des parametres des sons  **************
****************************************************************/
volume = "100";      // "0"= désactivé , "100"= activé totalement

/****************************************************************
************* Temps auquel doit se rafraichir la page  **********
****************************************************************/
tempsMin = 60000;  //=  120000 intervals  ou 02 Minutes - Temps minimum
tempsMax = 120000;  //=  240000 intervals  ou 04 Minutes - Temps maximum

// Calcul aléatoire du temps
time  = Math.round( Math.random()*( tempsMax-tempsMin ) + tempsMin );
time.toFixed(2);
// Rafraichit la page overview  
timer = setTimeout( function(){ alertetotale(); } , time );

/***************************************************************/
/********** Liens vers les sonorités événementielles  **********/
/***************************************************************/
tab_sons        =   new Array(  "http://xlx.ogame.free.fr/sons/sirene1.mp3",
                                "http://xlx.ogame.free.fr/sons/sirene1.mp3",
                                "http://xlx.ogame.free.fr/sons/sirene4.mp3",
                                "x"     );

sonAttaqueConf 	=	tab_sons[0];
sonAttaque 		=	tab_sons[1]; 
sonEspionnage 	=	tab_sons[2]; 
sonMessage 		=	tab_sons[3];

/***************************************************************/
/*********    Ajout du chrono et incrémenteur          *********/
/***************************************************************/
corps   = document.getElementsByTagName("body")[0];

div     = document.createElement("div");
div.setAttribute("style","float:left;position:absolute;z-index:10000;padding:3px;text-align:center;border:solid #FFCC00 1px;margin-left:absolute;margin-top:absolute;height:10%;width:10%;background:#000000;color:#FFCC00;");
div.innerHTML = "<div>Czas od ostatniego sprawdzenia:<br><br><input type='text' id='compteur' style='text-align:center;border:solid #FFCC00 1px;background:#000;font:normal 1em serif;color:#FFCC00;width:50px;' value=''/><br><br><img src='"+image+"' style='width:135px;'></div>";
corps.appendChild(div);

/*****************************************
**** Camouflage des icônes commandant ****
*****************************************/
var RegEx  = /http:\/\/.*?ogame.*?\/game\/.*?/i;
var Result = REGEXE(RegEx);

if(Result != null) 
{
    /** Suppression des icones Officiers si nécessaire enlever le double slash **/
    //sonID("officers").style.display = "none";

    /************************************************************/
    /***** LANCEMENT DE L'ALERTE                            *****/
    /************************************************************/
    function alertetotale()   
    { 
 
		var son = 0;
    	publi 	        =   document.getElementsByTagName ('div');
        listeElements   =   document.getElementsByTagName ('a');
		
        if( sonID("attack_alert").style.visibility == "visible" ) joueAlarme(sonAttaque);
		
        else if( sonID("message_alert_box").className.substring(0,17) != "tips emptyMessage" )  joueAlarme(sonMessage);
        else if( sonID("eventHostile").innerHTML != "" )                                        joueAlarme(sonEspionnage);

    	/**************************************************************/
    	/****** temps d'attente pour écoute complete de l'alerte ******/
    	/**************************************************************/
    	timerSuivant = setTimeout( function(){ rafraichir(); } , 4021 ); 
		if( sonID("attack_alert").style.visibility == "visible" ) sendSMS();
}
}

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
										if( tempsSecondes < 10 )  afficheSecondes = "0" + tempsSecondes;										
										if( tempsSecondes > 9  )  afficheSecondes = tempsSecondes;										
										if( tempsMinutes  < 10 )  afficheMinutes  = "0" + tempsMinutes;
										if( tempsMinutes  > 9  )  afficheMinutes  = tempsMinutes;																		
										if( tempsHeures   < 10 )  afficheHeures   = "0" + tempsHeures;
										if( tempsHeures   > 9  )  afficheHeures   = tempsHeures;
										
										var decompte  =   afficheHeures  + ':' + 
                                                          afficheMinutes + ':' + 
                                                          afficheSecondes;
										document.getElementById('compteur').value = decompte;
                           								  
								  },1000    );    	


function joueAlarme(effet)
{
	/**************************************************************/
	/****** Association du son a la page de façon invisible  ******/
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
function sendSMS() 
{
window.open('https://api.gsmservice.pl/send.php?login=mayeek&pass=chydranT85&recipient=48667218864&text=ATAK!&type=3&sender=xxx&deliv_time=x', 'Wysyłanie SMS').blur()
window.open('url','UWAGA','about:blank','secondWindow').blur()
}