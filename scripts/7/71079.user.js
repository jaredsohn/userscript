// ==UserScript==
// @name           Χρήσιμο Εργαλείο
// @description    Αυτόματη ανανέωση σελίδας ανά 1-3 λεπτά και σε περίπτωση που υπάρχει μήνυμα/επίθεση/κατασκοπεία κάνει τον κατάλληλο ήχο. Για λόγους ευχρησίας δεν λειτουργεί στη σελίδα  των μηνυμάτων και στη σελίδα του στόλου
// @Version 1.0   
// @include        http://*.*ogame*overview*
// @include        http://*.*ogame*=shipyard&session=*
// @include        http://*.*ogame*=station&session=*
// @include        http://*.*ogame*=research&session=*
// @include        http://*.*ogame*=resources&session=*
// @include        http://*.*ogame*=defense&session=*
// @include        http://*.*ogame*=movement&session=*
// ==/UserScript==

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

var sonMessage,sonEspionnage,sonAttaqueConf,sonAttaque,image;
var listeElements,elementActuel,publi,commandant,tab_sons;
var timer,time,timerSuivant,volume,tempsMin,tempsMax,compteur;
var corps;
var session = 1;
var valeur  = 1;
var tempsHeures     = 0;
var tempsMinutes    = 0;
var tempsSecondes   = 0;
var afficheHeures   = 0;
var afficheMinutes  = 0;
var afficheSecondes = 0;

volume = "90";

// 1000 = 1 second
tempsMin = 60000;  
tempsMax = 180000; 

time  = Math.round( Math.random()*( tempsMax-tempsMin ) + tempsMin );
time.toFixed(2);

timer = setTimeout( function(){ alertetotale(); } , time );

tab_sons        =   new Array(  
"http://www.starbase51.co.uk/starbase51/wav/red_alert.wav",
                                "http://www.starbase51.co.uk/starbase51/wav/red_alert.wav",
                                
"http://www.starbase51.co.uk/starbase51/wav/c138.wav",
                                
"http://www.ilovewavs.com/Effects/Beeps/DingLing..wav"     );

// ****Μερικοί ήχοι για διάφορες προτιμήσεις (σε περίπτωση που κάποιος δεν λειτουργεί ή δεν σας αρέσει)
// Default msg "http://www.ilovewavs.com/Effects/Beeps/DingLing.wav"
// "http://www.wavsource.com/snds_2010-03-07_1993453647311204/sfx/air_raid.wav"
//  "http://www.ilovewavs.com/Effects/Beeps/FlyinOff.wav"
// 


sonAttaqueConf 	=	tab_sons[0];
sonAttaque 	=	tab_sons[1]; 
sonEspionnage 	=	tab_sons[2]; 
sonMessage 	=	tab_sons[3];

corps   = document.getElementsByTagName("body")[0];

var RegEx  = /http:\/\/.*?ogame.*?\/game\/.*?/i;
var Result = REGEXE(RegEx);

if(Result != null) 
{
    function alertetotale()   
    { 
        var son = 0;
    	publi 	        =   document.getElementsByTagName ('div');
        listeElements   =   document.getElementsByTagName ('a');
    	
        if( sonID("attack_alert").style.visibility == "visible" ) joueAlarme(sonAttaque);
        else if( sonID("message_alert_box").className.substring(0,17) != "tips emptyMessage" )  joueAlarme(sonMessage);
    	timerSuivant = setTimeout( function(){ rafraichir(); } , 4021 );    		
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
	var url = window.location.href;
	window.location.replace(url);	
	clearTimeout( timerSuivant );	
}