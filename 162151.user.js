// ==UserScript==
// @name        Sparpa BAD Military Prospect
// @namespace   http://ibad.forumfree.it/?f=11153355
// @description Voi venite in chat e il tool dello Sparpa vi dice quanti generali sono :) e quanto vi costa
// @include     http://ibad.forumfree.it/?f=11153355
// @version     1
// ==/UserScript==
var moltOplita=70*0.02 ,
		moltGigante=310*0.02 ,
		moltGiavello=30*0.02,
		moltSpadaccino=60*0.02 ,
		moltFrombolo=20*0.02 ,
		moltArciere=55*0.02 ,
		moltFucile=200*0.02 ,
		moltAriete=220*0.02 ,
		moltCatapulta=560*0.02 ,
		moltMortaio=1550*0.02 ,
		moltGiro=125*0.02 ,
		moltPallone=290*0.02 ,
		moltCuoco=167*0.02 ,
		moltDottore=500*0.02 ,
		moltNaveAriete=250*0.02 ,
		moltNaveLanciafuoco=310*0.02 ,
		moltNaveVaporetto=1200*0.02 ,
		moltNaveBalestra=340*0.02 ,
		moltNaveCatapulta=320*0.02 ,
		moltNaveMortaio=1120*0.02 ,
		moltNaveSottomarino=1010*0.02 ,
		moltNaveLanciaMissile=1400*0.02,
		moltNaveTender=800*0.02,
		moltNaveGiro=320*0.02,
		moltNavePallone=1400*0.02;
//http://i42.tinypic.com/al585k.jpg
//http://i44.tinypic.com/o5qbtu.jpg
//http://i40.tinypic.com/4tsrb4.jpg
//http://i41.tinypic.com/116nm29.jpg
//http://i45.tinypic.com/2w3c9wz.jpg
//
var pesoOplita=5/500 ,
		pesoGigante=15/500 ,
		pesoGiavello=3/500,
		pesoSpadaccino=3/500 ,
		pesoFrombolo=3/500 ,
		pesoArciere=5/500,
		pesoFucile=5/500 ,
		pesoAriete=30/500 ,
		pesoCatapulta=30/500 ,
		pesoMortaio=30/500 ,
		pesoGiro=15/500 ,
		pesoPallone=30/500 ,
		pesoCuoco=20/500 ,
		pesoDottore=10/500 ;

var oroOplita=3,
		oroGigante=12,
		oroGiavello=1,
		oroSpadaccino=4,
		oroFrombolo=2,
		oroArciere=4,
		oroFucile=3,
		oroAriete=15,
		oroCatapulta=25,
		oroMortaio=30,
		oroGiro=15,
		oroPallone=45,
		oroCuoco=10,
		oroDottore=20,
		oroNaveAriete=15 ,
		oroNaveLanciafuoco=25 ,
		oroNaveVaporetto=45 ,
		oroNaveBalestra=20 ,
		oroNaveCatapulta=35 ,
		oroNaveMortaio=50 ,
		oroNaveSottomarino=50 ,
		oroNaveLanciaMissile=55,
		oroNaveTender=100,
		oroNaveGiro=5,
		oroNavePallone=100;

var sparpaFlotta=		'1090+800+120+122+87+102+88+114+30+109+80';
var laraFlotta=			'1140+432+700+0+0+200+100+170+50+184+152';
var grandeFlotta=		'1090+900+150+0+0+168+100+120+40+120+80';
var piccolaFlotta=	'400+200+30+0+56+42+50+12+15+30+20';
var sparpaTruppe=   '100+0+500+0+0+0+0+0+0+36+0+0+5+5';
var darkTruppe=			'8000+0+600+5000+0+0+336+120+0+120+500+700+60+0';
var flottaDaFare=		'500+400+100+0+70+84+80+40+30+100+60';
var valerieFlotta=	'1053+1160+160+12+0+168+150+108+30+150+60';

var truppeMinime=   '2000+0+0+2000+0+0+446+0+90+60+300+150+60+10';
var truppeMedie=    '3000+0+0+3000+0+0+504+0+90+60+150+150+60+10';
var truppeTante=    '5000+0+0+5000+0+0+504+0+120+90+300+400+60+10';
var truppePiccole=  '1500+0+0+1500+0+0+252+0+90+60+150+150+60+10';

function soloNumeretti(e) {
  this.value = this.value.replace(/[^0-9,]/ig, "");
  if (('' == this.value) || (' '==this.value )) this.value=0;
}

function AzzeraPunteggio (d ) {
  document.getElementById("lblGenerali").value=0;
  document.getElementById("lblOro").value=0;
  document.getElementById("lblNaviMercantili").value=0;
  document.getElementById("oInSimOplita").value=0;
  document.getElementById("oInSimGigante").value=0;
  document.getElementById("oInSimGiavello").value=0;
  document.getElementById("oInSimSpada").value=0;
  document.getElementById("oInSimFrombolo").value=0;
  document.getElementById("oInSimArciere").value=0;
  document.getElementById("oInSimTiratore").value=0;
  document.getElementById("oInSimAriete").value=0;
  document.getElementById("oInSimCatapulta").value=0;
  document.getElementById("oInSimMortaio").value=0;
  document.getElementById("oInSimGiro").value=0;
  document.getElementById("oInSimPallon").value=0;
  document.getElementById("oInSimDottore").value=0;
  document.getElementById("oInSimCuoco").value=0;
  document.getElementById("oInSimNaveAriete").value=0;
  document.getElementById("oInSimLanciafuoco").value=0;
  document.getElementById("oInSimVaporello").value=0;
  document.getElementById("oInSimNaveBalestra").value=0;
  document.getElementById("oInSimNaveCatapulta").value=0;
  document.getElementById("oInSimNaveMortaio").value=0;
  document.getElementById("oInSimNaveSottomarino").value=0;
  document.getElementById("oInSimNaveMissile").value=0;
  document.getElementById("oInSimNaveTender").value=0;
  document.getElementById("oInSimNaveGiro").value=0;
  document.getElementById("oInSimNavePortaPallone").value=0;
  document.getElementById("oInSimSelezionaTruppe").value=0;
  document.getElementById("oInSimSelezionaTruppe").value=0;
  document.getElementById("oInSimSelezionaFlotta").value=0;
}

var autore='Martino Marangi';
var nome='Sparpa Ragazzacci Military Project ';
var versione='0.5';

function AggiornaPunteggioN(d) {
	localStorage.setItem('TemplFuturoNavale', 	this.value);
	AggiornaPunteggio(d) ;
}

function AggiornaPunteggioM(d) {
	localStorage.setItem('TemplFuturoMilitare', this.value);
	AggiornaPunteggio(d) ;
}
function AggiornaCheckDittatura(d) {
	localStorage.setItem('TemplDittatura', this.checked);
	AggiornaPunteggio(d) ;
}
function AggiornaTruppe (d) {
		var s =this.value;
	var valori;
	switch(s) {
    case '1': valori =sparpaTruppe.split("+");break;
    case '2': valori =truppePiccole.split("+");break;
    case '3': valori =truppeMinime.split("+");break;
    case '4': valori =truppeMedie.split("+");break;
    case '5': valori =truppeTante.split("+");break;
    case '6': valori =darkTruppe.split("+");break;
  break; 
  default:
	}
	if (s!='0') {
	 document.getElementById("oInSimOplita").value				 = valori[0];
	 document.getElementById("oInSimGigante").value			 = valori[1]; 
	document.getElementById("oInSimGiavello").value 			 = valori[2]; 
	document.getElementById("oInSimSpada").value 					 = valori[3]; 
	document.getElementById("oInSimFrombolo").value 			 = valori[4]; 
	document.getElementById("oInSimArciere").value 				 = valori[5]; 
	document.getElementById("oInSimTiratore").value 			 = valori[6]; 
	document.getElementById("oInSimAriete").value 				 = valori[7]; 
	document.getElementById("oInSimCatapulta").value 			 = valori[8]; 
	document.getElementById("oInSimMortaio").value 				 = valori[9]; 
	document.getElementById("oInSimGiro").value 					 = valori[10];
	document.getElementById("oInSimPallon").value 				= valori[11];
	document.getElementById("oInSimDottore").value 				= valori[12];
	document.getElementById("oInSimCuoco").value 					= valori[13];
	}
	AggiornaPunteggio();
}
function AggiornaFlotta (d) {
	var s =this.value;
	var valori;
	switch(s) {
    case '1': valori =sparpaFlotta.split("+");break;
    case '2': valori =piccolaFlotta.split("+");break;
    case '3': valori =grandeFlotta.split("+");break;
//    case '4': valori =laraFlotta.split("+");break;
    case '5': valori =flottaDaFare.split("+");break;
    case '6': valori =valerieFlotta.split("+");break;
  break; 
  default:
	}
	if (s!='0') {
	 document.getElementById("oInSimNaveAriete").value				= valori[0];
	 document.getElementById("oInSimLanciafuoco").value 	    = valori[1]; 	
	 document.getElementById("oInSimVaporello").value 			  = valori[2];
	 document.getElementById("oInSimNaveBalestra").value 	    = valori[3];
	 document.getElementById("oInSimNaveCatapulta").value 	  = valori[4];
	 document.getElementById("oInSimNaveMortaio").value 		  = valori[5];
	 document.getElementById("oInSimNaveSottomarino").value   = valori[6];
	 document.getElementById("oInSimNaveMissile").value 		  = valori[7];
	 document.getElementById("oInSimNaveTender").value 		    = valori[8];
	 document.getElementById("oInSimNaveGiro").value 			    = valori[9];
	 document.getElementById("oInSimNavePortaPallone").value  = valori[10];
	}
	AggiornaPunteggio();
}
function AggiornaStoria() {
	var listaMilitare = document.getElementById("oInSimOplita").value + '+'
	+ document.getElementById("oInSimGigante").value + '+' 			
	+ document.getElementById("oInSimGiavello").value + '+'			
	+ document.getElementById("oInSimSpada").value + '+'					
	+ document.getElementById("oInSimFrombolo").value + '+'			
	+ document.getElementById("oInSimArciere").value + '+'				
	+ document.getElementById("oInSimTiratore").value + '+'			
	+ document.getElementById("oInSimAriete").value + '+'				
	+ document.getElementById("oInSimCatapulta").value + '+'			
	+ document.getElementById("oInSimMortaio").value + '+'				
	+ document.getElementById("oInSimGiro").value + '+'					
	+ document.getElementById("oInSimPallon").value + '+'				
	+ document.getElementById("oInSimDottore").value + '+'				
	+ document.getElementById("oInSimCuoco").value + '+'					
	+ document.getElementById("oInSimNaveAriete").value + '+'		
	+ document.getElementById("oInSimLanciafuoco").value + '+'		
	+ document.getElementById("oInSimVaporello").value + '+'			
	+ document.getElementById("oInSimNaveBalestra").value + '+'	
	+ document.getElementById("oInSimNaveCatapulta").value + '+'	
	+ document.getElementById("oInSimNaveMortaio").value + '+'		
	+ document.getElementById("oInSimNaveSottomarino").value + '+'
	+ document.getElementById("oInSimNaveMissile").value + '+'		
	+ document.getElementById("oInSimNaveTender").value + '+'		
	+ document.getElementById("oInSimNaveGiro").value + '+'			
	+ document.getElementById("oInSimNavePortaPallone").value ;
	localStorage.setItem('TemplListaMilitare', listaMilitare);
}
function AggiornaPunteggio(d) {
	AggiornaStoria();
	document.getElementById("lblGenerali").value=Math.round( (parseInt(document.getElementById("oInSimOplita").value)  			*moltOplita)
																							+ (parseInt(document.getElementById("oInSimGigante").value) 			*moltGigante)
																							+ (parseInt(document.getElementById("oInSimGiavello").value)			*moltGiavello)
																							+ (parseInt(document.getElementById("oInSimSpada").value)					*moltSpadaccino)
																							+ (parseInt(document.getElementById("oInSimFrombolo").value)			*moltFrombolo)
																							+ (parseInt(document.getElementById("oInSimArciere").value)				*moltArciere)
																							+ (parseInt(document.getElementById("oInSimTiratore").value)			*moltFucile)
																							+ (parseInt(document.getElementById("oInSimAriete").value)				*moltAriete)
																							+ (parseInt(document.getElementById("oInSimCatapulta").value)			*moltCatapulta)
																							+ (parseInt(document.getElementById("oInSimMortaio").value)				*moltMortaio)
																							+ (parseInt(document.getElementById("oInSimGiro").value)					*moltGiro)
																							+ (parseInt(document.getElementById("oInSimPallon").value)				*moltPallone)																				
																							+ (parseInt(document.getElementById("oInSimDottore").value)				*moltDottore) 
																							+ (parseInt(document.getElementById("oInSimCuoco").value)					*moltCuoco)
																							+ (parseInt(document.getElementById("oInSimNaveAriete").value)		*moltNaveAriete)
																							+ (parseInt(document.getElementById("oInSimLanciafuoco").value)		*moltNaveLanciafuoco)
																							+ (parseInt(document.getElementById("oInSimVaporello").value)			*moltNaveVaporetto)
																							+ (parseInt(document.getElementById("oInSimNaveBalestra").value)	*moltNaveBalestra)
																							+ (parseInt(document.getElementById("oInSimNaveCatapulta").value)	*moltNaveCatapulta)
																							+ (parseInt(document.getElementById("oInSimNaveMortaio").value)		*moltNaveMortaio)
																							+ (parseInt(document.getElementById("oInSimNaveSottomarino").value)*moltNaveSottomarino)	
																							+ (parseInt(document.getElementById("oInSimNaveMissile").value)		*moltNaveLanciaMissile)
																							+ (parseInt(document.getElementById("oInSimNaveTender").value)		*moltNaveTender)
																							+ (parseInt(document.getElementById("oInSimNaveGiro").value)			*moltNaveGiro)
																							+ (parseInt(document.getElementById("oInSimNavePortaPallone").value)*moltNavePallone))
																							;
	var  totTruppe =														(	(parseInt(document.getElementById("oInSimOplita").value)				*oroOplita)
																							+ (parseInt(document.getElementById("oInSimGigante").value) 			*oroGigante)
																							+ (parseInt(document.getElementById("oInSimGiavello").value)			*oroGiavello)
																							+ (parseInt(document.getElementById("oInSimSpada").value)					*oroSpadaccino)
																							+ (parseInt(document.getElementById("oInSimFrombolo").value)			*oroFrombolo)
																							+ (parseInt(document.getElementById("oInSimArciere").value)				*oroArciere)
																							+ (parseInt(document.getElementById("oInSimTiratore").value)			*oroFucile)
																							+ (parseInt(document.getElementById("oInSimAriete").value)				*oroAriete)
																							+ (parseInt(document.getElementById("oInSimCatapulta").value)			*oroCatapulta)
																							+ (parseInt(document.getElementById("oInSimMortaio").value)				*oroMortaio)
																							+ (parseInt(document.getElementById("oInSimGiro").value)					*oroGiro)
																							+ (parseInt(document.getElementById("oInSimPallon").value)				*oroPallone)																				
																							+ (parseInt(document.getElementById("oInSimDottore").value)				*oroDottore) 
																							+ (parseInt(document.getElementById("oInSimCuoco").value)					*oroCuoco)
																							);
	var totNavi = 															( (parseInt(document.getElementById("oInSimNaveAriete").value)		*oroNaveAriete)
																							+ (parseInt(document.getElementById("oInSimLanciafuoco").value)		*oroNaveLanciafuoco)
																							+ (parseInt(document.getElementById("oInSimVaporello").value)			*oroNaveVaporetto)
																							+ (parseInt(document.getElementById("oInSimNaveBalestra").value)	*oroNaveBalestra)
																							+ (parseInt(document.getElementById("oInSimNaveCatapulta").value)	*oroNaveCatapulta)
																							+ (parseInt(document.getElementById("oInSimNaveMortaio").value)		*oroNaveMortaio)
																							+ (parseInt(document.getElementById("oInSimNaveSottomarino").value)*oroNaveSottomarino)	
																							+ (parseInt(document.getElementById("oInSimNaveMissile").value)		*oroNaveLanciaMissile)
																							+ (parseInt(document.getElementById("oInSimNaveTender").value)		*oroNaveTender)
																							+ (parseInt(document.getElementById("oInSimNaveGiro").value)			*oroNaveGiro)
																							+ (parseInt(document.getElementById("oInSimNavePortaPallone").value)*oroNavePallone)		
																							);												 
	var totDittatura=0;
	if (document.getElementById("oInSimDittatura").checked == true ) totDittatura =2;

	document.getElementById("lblOro").value			=	Math.round((totTruppe - (totTruppe*(14+totDittatura+(document.getElementById("oInSimFuturoMilitare").value*2))/100)) 
																							+ (totNavi - (totNavi*(14+totDittatura+(document.getElementById("oInSimFuturoNavale").value*2))/100)) );

document.getElementById("lblNaviMercantili").value =Math.ceil( (parseInt(document.getElementById("oInSimOplita").value)  			*pesoOplita)
																							+ (parseInt(document.getElementById("oInSimGigante").value) 			*pesoGigante)
																							+ (parseInt(document.getElementById("oInSimGiavello").value)			*pesoGiavello)
																							+ (parseInt(document.getElementById("oInSimSpada").value)					*pesoSpadaccino)
																							+ (parseInt(document.getElementById("oInSimFrombolo").value)			*pesoFrombolo)
																							+ (parseInt(document.getElementById("oInSimArciere").value)				*pesoArciere)
																							+ (parseInt(document.getElementById("oInSimTiratore").value)			*pesoFucile)
																							+ (parseInt(document.getElementById("oInSimAriete").value)				*pesoAriete)
																							+ (parseInt(document.getElementById("oInSimCatapulta").value)			*pesoCatapulta)
																							+ (parseInt(document.getElementById("oInSimMortaio").value)				*pesoMortaio)
																							+ (parseInt(document.getElementById("oInSimGiro").value)					*pesoGiro)
																							+ (parseInt(document.getElementById("oInSimPallon").value)				*pesoPallone)																				
																							+ (parseInt(document.getElementById("oInSimDottore").value)				*pesoDottore) 
																							+ (parseInt(document.getElementById("oInSimCuoco").value)					*pesoCuoco));
																						
}

function sparpaMilitary(){if (!(document.getElementsByName('submit')[0]) ) {
		var panel= document.createElement('div');
		panel.setAttribute('class', 'dynamic');
		var titre=document.createElement('h3');
		titre.setAttribute('class', 'header'); 
		titre.setAttribute('style',"text-align:center;margin: 3 auto 0 auto;Color:#FFD700;");
		var docNomeVersione=document.createTextNode(nome+versione);
		titre.appendChild(docNomeVersione);
		var corps=document.createElement('div');
		corps.setAttribute('class','content');
		panel.appendChild(titre);
		panel.appendChild(corps);
		var listaMilitare='0+0+0+0+0+0+0+0+0+0+0+0+0+0+0+0+0+0+0+0+0+0+0+0+0+0+0+0+0+0+0';
		if (localStorage.getItem('TemplListaMilitare') ) {
			listaMilitare=localStorage.getItem('TemplListaMilitare');
		}
		var valori= listaMilitare.split("+");
		var valOplita						=valori[0];
		var valGigante          =valori[1];
		var valGiavello         =valori[2];
		var valSpada            =valori[3];
		var valFrombolo         =valori[4];
		var valArciere          =valori[5];
		var valTiratore         =valori[6];
		var valAriete           =valori[7];
		var valCatapulta        =valori[8];
		var valMortaio          =valori[9];
		var valGiro             =valori[10];
		var valPallon           =valori[11];
		var valDottore          =valori[12];
		var valCuoco            =valori[13];
		var valNaveAriete       =valori[14];
		var valLanciafuoco      =valori[15];
		var valVaporello        =valori[16];
		var valNaveBalestra     =valori[17];
		var valNaveCatapulta    =valori[18];
		var valNaveMortaio      =valori[19];
		var valNaveSottomarino  =valori[20];
		var valNaveMissile      =valori[21];
		var valNaveTender       =valori[22];
		var valNaveGiro         =valori[23];
		var valNavePortaPallone =valori[24];
		var futuroNavale=0;

		if (localStorage.getItem('TemplFuturoNavale') ) {
			futuroNavale=localStorage.getItem('TemplFuturoNavale');
		}
		var futuroMilitare=0;
		if (localStorage.getItem('TemplFuturoNavale') ) {
			futuroMilitare=localStorage.getItem('TemplFuturoMilitare');
		}
		var checkDittatura=false;
		if (localStorage.getItem('TemplDittatura') ) {
			checkDittatura=localStorage.getItem('TemplDittatura');
		}
		var oTbody=document.createElement("tbody");
		var oTable=document.createElement("table");
		oTable.setAttribute('align','center');
		
		// Genereazione riga di intestazione INIZIO
		var oTrIntestazione=document.createElement("tr");
		var oTrResocontoFinale=document.createElement("tr");
		var oTrIntestazioneNavi=document.createElement("tr");
		var oTrValoriNavi=document.createElement("tr");
		var oImgOplita=document.createElement("img");
		oImgOplita.setAttribute('src', 'data:image/gif;base64,R0lGODlhKAAoAMQAABwNDtina2pHJZloUM9vKvjq42pWTa2in7ltLfrJVkEiC2g4NIpWKtKLNFQwIrCDb4owDm8wDP35gu+WNcy+uj8GA4FMGfipQNexOqtaKayDK+zKPZ5pJ7llFp9CHwAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZGmeaKqu4sG+cAHP6SHTOEnd+bkEAc2pUHD1Sg4BY+FZmHbG40ghcACuJ4oU6VhcAb4tKeOwgk8V8SjDYWDRalFmMqGi0vHJJZGQSOBqFnp9fkIleGIWBBwaGAkYDiaIYgRuABwOHJJimh8eiwMPAw2bUg0JFw0WEAQDAwwdpUcbDRsXEwIRAgsOsYdSGrQbtg8RFgYCHQO/RxoEGMMbExwWSh0BDyMG2UcIBBnQ0g0NtwQLDwUUDw6u3eMEwxgTfLdXAgoKDgwGRwMeDQQaYMDQYEIDBB5ELOD3wUk/CBkyIBh4EAECCCYiSYHgAUGGcQDH+SKh8YgFBhwihP7LECGCgmUktxg46UGDTQv4BGgh4VCKA2OM2jw4QGHniJJHDOhDaWEABaJRFKopI8BChAdPD3Ab0XOLA3wODmhFhiSOCANLPhgAgLSh2Q8PPGhUUEEAz7cZIDAQ4aACQ6lmOUQYwRYm4DgL/IoAoOAq17cLFiggoeDvXzWvVFwWw2tLCAA7');
		oImgOplita.setAttribute('class','advisorUnitIcon');
		oImgOplita.setAttribute('title','Oplita');
		var oTdOplita=document.createElement("td");
		oTdOplita.appendChild(oImgOplita);
		oTrIntestazione.appendChild(oTdOplita);
		var oImgGigante=document.createElement("img");
		oImgGigante.setAttribute('src', 'data:image/gif;base64,R0lGODlhKAAoAMQAAJ13UWxKMbCMYUgoGg0IC3FbRcOdcEo4KYZMLi0YDvrw5DkuIzIjGuHOpmQ8JatqM140Gt61gFpGMr8AAPgCAYdiQnVBIkAfCIuLgYtLIZ5cONqPTfxPPh8YFCMkJQAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOYkaeaKqmmYM8YhCtdP1BHaFDDtEoM5uQBLkYO54ORqGgUJgcCmy4ylggC4+HUChMnooolQaBjC46gicxwGQoY9VgcZiiLvHVAmOobDANKBZ5KgUNAIgECwUYGAAbJoQoXA8ZGRoFBB0DDB4AkZIkHhpllgYFCRUGBxWhJBkMCAOqBhoIER0VAAcCriIOwBAHBg0RAggbEgScAL4fFtADCBYIAn0apwepBnaE0GUAx4gByAAKGAfNrhBXtAAIBu8Phg0BBWMPGygZEAAG8RbGYXIU4ACJAAwcjNA344GGhxq6tRDwQIAABxUKOLDQZQC7CA1CAujAw0EAhAcG/ziA2O2ZA0QCAEDoggDLggQ4dQloIOBmhxwESLQc0Q6RBowFZCFh0IHBgQMLGKTpMIZfhasWJACoYIEBHW0HuhSQgCdPhgEWbA2Q0MVBgq8JJGTUGIoBO2ESJFgY4GGB3wQHTlZQKAmC1wN5A1jA+TMBAQYJLpgJtfewXgYjDH5o5ezGAI97c42QEMCBgc4fHPAYkMBDHRJQT6MegXBBANgMLM4WcYCBbxKcAiyY3TXBzxE4fmJGjYVAghMLCJSdXWE5CQnDd384MOiEB+2bv5/ADn4BYeRBtUs9gSP97KcLQD3wIEGAgs4IEOWOwB/A2A4FAPADEK6wUsACFoXEkw8E2x0AQV7ZdZbSBZF1FgIAOw==');
		oImgGigante.setAttribute('class','advisorUnitIcon');
		oImgGigante.setAttribute('title','Gigante a Vapore');
		var oTdGigante=document.createElement("td");
		oTdGigante.appendChild(oImgGigante);
		oTrIntestazione.appendChild(oTdGigante);
		var oImgGiavello=document.createElement("img");
		oImgGiavello.setAttribute('src', 'data:image/gif;base64,R0lGODlhKAAoAOZ/APTHjOfk6M+tT8ViIrOvqXFIF8yPTNLNuq6Gbvrqx+LbxotnTuzn1V5USqGVLOvjyqtpPXyvb++XTLB5SsuXYPHs0tc1L/75afzz1IlHLvdoVs3IUf/SQvSLMMulPrKil/z22r2NVdCmbf/3Wt96JvzlafuzO/nHXdrPvubXubBSMNarj/zwhfrlp+i7iv3YaP/9dY2Gd5WVjaOglct0SNTClycPB/7lR8zKxvLduvZ3Z0gTCJdsE04qFMK+tAgDAZEHA/rEaJRWH28oEOPIqPXXrfy4deCjRn5nJPrXVsyYi/7rO/7NTFlDMfu0ave2UzAjDr8HAf/ldoo0GfaqabQ1DP/dPNeZHuK+Qy48P4hxZPykXfXw24lXSKp6JObIUvftXmcyHe3tV1oFBOW3Xd7b3uK0f/jv0/vfg93XSbaafONMOvFWN/HZnimjCEmbM2TVV//7T3xAHOfEYOLCd+K4IvueRaKcofu9RuCqc+G7b9bCIPeBWcbJ29HPzv322SH5BAEAAH8ALAAAAAAoACgAAAf/gH+Cg4SFhoeIiYqLjIJ+fgQHKAxniiAYGI2HDAEBBHefFSCGDytKSggomoUgDz6dAWU+o4QKXUBAUVEWOg+rhBU+fp1lClyDZwu5ulG4XRW/yAd3ONU4ZQ8gK0BjNjtj4Bkx0NGDDwogFSg+fURqPzYhFGYULjULvuWHZzgLPfAQMmSYAMFGE1X6EhH48QOCnB5dJlBQoyChQoZ5AAAwkgDACga0LBZa+COMCwNQmtgIk09kIQVQYmTZsaPHlDA2JrRxyYoBlw/wptBcEKOJgRwJMFnE0AIACwFyhjCEJ6IFkR47KBTJAfLXJQBPXpR4gaaNCyFQbKRhgUacFhtD/8KYyRGSEQYnHEZc4HMCBgw0LQTUgfFCjw0RNHZA8dFASIgimRgBsKIXxpYkcWBcOBFEzAUYXn4MGbJjBpcKOLQsgNAigaIzeEaMuNHBjokbcW4s6YBHDBgk8H40IPeHi4KiXgBUOlSEww0mazp0YMPGxBIrS+xscOBARgMZxwwpIFBARPhCRS6A0XDiBR+xGqTAGMHkCPdGDw4wONRCgpMtUuiggxFGOMEHC2DUQUIaDpy3SF3IPBEEFVJowIYFV9RRxRVVDEACGGls4JpFAuzBxxESWADEhgMcccQJVKjHwwrLlQMCCgV4MQUPQhyBxRVriPWFCkmckGMOSyHghdMHKrRIgwo+fmGABx0A4AECIyZ0BgI8eEABDQYIIIAHBtCAx5AD1ABhOWd8gISOBbwpRA9QyOGBG2+0JNIZCnyAwAJhQAFFBHC88QMSIhDHEwZnPCCHAE2IgsMPEqXAkyEhzIGAIBNAYUAIll46CAZkTBBCJinEKUKNogJABgUUVEKADRCIEKqofzxAhwA1CDIDrQhosR+uCkBgQBPHgCADFAsQkcKaFh0gUA8HDELAAiKo4SBPXQgxgRqEcOGDnjyB8MEEZmiBayIMxNBAtevGK0ggADs=');
		oImgGiavello.setAttribute('class','advisorUnitIcon');
		oImgGiavello.setAttribute('title','Giavellottiere');
		var oTdGiavello=document.createElement("td");
		oTdGiavello.appendChild(oImgGiavello);
		oTrIntestazione.appendChild(oTdGiavello);
				var oImgSpadaccino=document.createElement("img");
		oImgSpadaccino.setAttribute('src', 'data:image/gif;base64,R0lGODlhKAAoAMQAAMuKdJSLhf/8+21lYlY2L++ylK1qUc/GxfrMrVgnEaFcOxgLBwMAALB6Zm1KQIRZTIBAL00cBCUMAJhkVLirpvTu5sJySjkWBikZFDYhHd6gg0UqI243GiwRA+bd3AAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZGmeZICubEsJbSyLAjzf51vhPOkJh56wIlAJGYzZoHZEOmMBYM9JTbJeR8wjwEUUMKyDR4gBaAoIb2PD2gkzDceCsGavBm4hAPAwACYFKw8aFEIigAVmDRooBhsTBoYiDQ8OEw4EJhoaDo+ZkhkOAAaXIxRefAsDDZIfEhkPBAsbiwUVFQhxGa0fDQ0JHBMbGBAGHAoADRMEYLwIABfHCtMQEQmyVrwABQ3RFgoGFhAJC7wlybIJ4NMJEebnDh8MFwn1Fx0S7yMNALsL+PQS3Cunb1O5BRfocWgXIZ8+AAjsdLgnoaIEgu8mIHggYkGVUPo+PPAigsuAkwE8chTSh0gDgQM1BHjwUCGIPgfKklGg6eGAzwNG3mXAgMHBgVs9fVIYEJLEAApiPAQYwLEpCQgO4n3YsKGD1REdPn3AsABjU4sjypoNWRHjggwQvn5A2EweAQORrBKAYKdjgm1WIfA1MawpAQ0PsskdwUxfCAA7');
		oImgSpadaccino.setAttribute('class','advisorUnitIcon');
		oImgSpadaccino.setAttribute('title','Spadaccino');
		var oTdSpadaccino=document.createElement("td");
		oTdSpadaccino.appendChild(oImgSpadaccino);
		oTrIntestazione.appendChild(oTdSpadaccino);
				var oImgFrombolo=document.createElement("img");
		oImgFrombolo.setAttribute('src', 'data:image/gif;base64,R0lGODlhKAAoAMQAANKZdRALB45QHVVjjSsYCeqsii4mJUpUdnBLOlItFEkxJvHKqHlSQzE2SZZkUD1GY05HUadzWjshC4ZcSf/vzox7cl49LamksG8+HbmDaBcXGiMoN71qIm56qWxaYAAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZDlel6murAoAWdXOtIhxuFDvayL8mARvSCJIEhjMjzgzOJ2aEfI3WSyYJY1Bo9k0GpuSJVKgRLAj7WPQOUA8JQWCMZHo0IHGwcPIACwkCgwGIxIcaBoBCAgGGQ4IhQkWBCJCN1gBAQ4wBS8jGBmAlSJ3RJkML34ZIgRIQqwiEpiKDrUTEwALFgkJlGglmQR9GY5kBRG+v1kBFpsAcxEOCsomMA8MDnQKCoTUJbkFHgPEAAzeKgULABBsFRce3eciuAUZDWxsFgfyIwCdDhsODBhwIMEAfiI6ZVCwYc0BBRIONOBnAcORABoaPGhAQONEeRKSSIKwkYCBBxv5jREg4KAMBSsVND4IAzKAAQAv0y2A4EWlBALMFtSLwIDkgAfyAkhYSmBCBAQKHgg8sO9cACM/8+ihSvWgVawENEjl2pWfUgkBGpKViPDD1QAfNHqA4KRtiabSgNoNFGGCAgLT9opQEE2BhQUvBSuopYFABMQy7C52IFiMp8ojLBQoMAHziM0FPIvoc0ZZCAA7');
		oImgFrombolo.setAttribute('class','advisorUnitIcon');
		oImgFrombolo.setAttribute('title','Fromboliere');
		var oTdFrombolo=document.createElement("td");
		oTdFrombolo.appendChild(oImgFrombolo);
		oTrIntestazione.appendChild(oTdFrombolo);
				var oImgArciere=document.createElement("img");
		oImgArciere.setAttribute('src', 'data:image/gif;base64,R0lGODlhKAAoAMQAAKiOd6uckGRGMyURDpFbNtCfWU07MRAFBOfe07yxpJlpRUcrHq97U/rscnZVQlhPS3A9KS8sK0oRDG9nZYx+dX1vXePTuP38l6mIQdbFq4VYPjkfFtPViffLiVwwIQAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZGmeKDolKQm18EgBLJu+cfskVPAElJLt48HlTr+AwbAaXZ5PDoZwTE0oj4ghICo0vg3Oc0qtliKTSQTd7XQw8AJ8UTaTHgat4SMo+BWABAoMHwMKdiUHHxEDBwR+cAoQCwIOIhBGiB8HnANwcA4aAgajIhuZmgMDC58Mrq+El5okGwsGghgKDoMEHhojHrMkAhsDpAsHAx4LyMDCIgwFAguiC40DErWmC88E0QwGDAQCHsUHGx0i1s8CGoPk4hryFBodXNwlCBZDLQICgwwUPAAAABBBCAU6OJAwQMSAAAgiRszAJYUGPwUYOKDAUYLHjxI8iPTA6UGFiDxi6Az4JmBCAB8bDFBQs6GdK34PzCxQYGCAlmkHKgSoYMpBwFjPYpIjJpOoCAGCDj37YMCDAwcQACwJMqKSgKl8imwcaqyEBLBUhRKcYeDABBISAIAF8ODBBKEVDDxAQGKBpWcJAmSgMKouAAt8uwZ79jKDBQsZEiRAnFiEA3zCBDvOsDlDxGENn1WYDPkxggQVuDoEu8zkZNTt5KoDa2DDBkUjDkBQUMAUWk64hwnKsAEthdsRTKiqVXxqhVWhEy0o1lwYAw3WopcYUBMstWYoFkD4i7YF9wWyy6NYBUFDBvUpHGWEH7+RnRAAOw==');
		oImgArciere.setAttribute('class','advisorUnitIcon');
		oImgArciere.setAttribute('title','Arciere');
		var oTdArciere=document.createElement("td");
		oTdArciere.appendChild(oImgArciere);
		oTrIntestazione.appendChild(oTdArciere);
				var oImgTiratore=document.createElement("img");
		oImgTiratore.setAttribute('src', 'data:image/gif;base64,R0lGODlhKAAoAMQAANugX/TWohMKDG5JMikYEVE1KsGObhwuT7F7Ut6wghEXJo9OMEkqHTguL5tvT/7932wvEzUhGW9SR65rL2Q7KYdFGK1/ZaJWHoJdSY5jOsdvTRchN6tdQcx2JUAeCwAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZOkET1CubOsCTxxnbm2LFZCg/O2zl04HlnokfsiPZyIEBAIAy4SR9EEml8oCsdshqjcPpDLZBRIGCwVs83i0mQGjIGfbGB7BwIKwWAwOdjUeBAIMfzpRgiwGEYWPBQwUHAYNiyNPCBgIDgOFAqAEDFSXBgAICBkIpg4MEREFjhiXHwCdqBkZDg6RCxocHAlHghIWBQQDEhEDzMcUCxwaTmd2BhgMewYSA5EFsXPP0V1fFMISNwgLFScB2hQUAxkEn6IF4RkUv6E2AxAQBsKMzYtFoACGa/MIRBiVb94rGw0aLDNgrcExBRgVALSAIdYHhQMWvBuw5kcBB+86tQrIKMGBBHgjBNiDxqHkD2zcNihYqSDCRwIlFE7ikETAhog6N4DC6ELUgCTzeCrYoHMprRFupmbUiXHDgasi5ik4cIDrVLJfwX4w6hWt27Rq377doFZEA6pvG5yri8DTSq4nDdT94E+AzxEDVllQS6HCBVKI+dC4urBCB8hhGfijhUEgnhWGJoy5RMEABVAsPKirUIEWahf+IAxuQaCC7NkrJNHBHZQBhkC8SWDYsTf42tdJQgAAOw==');
		oImgTiratore.setAttribute('class','advisorUnitIcon');
		oImgTiratore.setAttribute('title','Tiratore Fucile a Zolfo');
		var oTdTiratore=document.createElement("td");
		oTdTiratore.appendChild(oImgTiratore);
		oTrIntestazione.appendChild(oTdTiratore);
				var oImgAriete=document.createElement("img");
		oImgAriete.setAttribute('src', 'data:image/gif;base64,R0lGODlhKAAoAMQAACkaEUo5KTQgF5BTNkIpHGpRO7RtS1pHM/jnqpJyTP786dyCUHtdPQYEBKuOYTgsIB8YFBoRDcJ/VBEMCvi1duiMXdawd5dZP2Q3JPTIj1kyD+eib2xEFNeVYKpkQAAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZGmeaKqubOu+cCzPdG3feK7vo2cMPs9ucAECDT6J5MIQ4hadiqSzUFo9iew0g5gtDBIDWNwJG7JZRuFQMFAUcPhqIPZIPEGfOJ0oACIABAQYCxQIcBkpCxsVixUdFBUVFB1nCQyYBBObgYMGFVwUTiUeF3hEHqgXGGsCD4IEfwCzgQIYHgsLFQMomhATEBCAwhBrmxMRwwLLnYMDzxgnGgGvAdbX1moNwRHAy8yuggEY5CIath/B1rKvsw8HmNu/3t8Ay7CCGiITAQcf1gceCPjzKkKDBvAKHJwFaKC9b/gI6EsnoAADBxQcBIggAJ4DBAgcdDxwsOSEbyjvusXi8EHNgYAFOlwKdCBAAQuHHHBENmwWuJQDRTDoV0BQgpo2AywrkKHpy0sF1mzsycxntA8k+wWsOTBqQAIOLFgYOpTaQE60/nAMkEBEAYAvAwZjE/eiAwYPqL0a2C2ZML8E2IjoR0BrAIIvtcJjENBarL5p/fpk+UHABw4CCHf7p/jaxBGAPmjg5heZZRGZP1Trq9oV4aApkm0KnSJWCaV5g51WoeFzDGqzeAgfTry48ePIkytfzrxGCAA7');
		oImgAriete.setAttribute('class','advisorUnitIcon');
		oImgAriete.setAttribute('title','Ariete');
		var oTdAriete=document.createElement("td");
		oTdAriete.appendChild(oImgAriete);
		oTrIntestazione.appendChild(oTdAriete);
				var oImgCatapulta=document.createElement("img");
		oImgCatapulta.setAttribute('src', 'data:image/gif;base64,R0lGODlhKAAoAMQAAG5ILZxhMg0FBY5sUEssD8aslCsqK6OLdy0dEzUnHVtKNVY7JkM2JXVxc1NJQm1YRWE1En9OGWJAJUQsHzc4O1o9L1QaG4o2Ikc9NMJ6RFAwIj5ARmJfYB4aGH9WNQAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZGmeaKqubOu+cCzPdD1nng17A1AtkoAuFalkMoNBhZMZnnyezONAbTpNgGzFwaEerthKRbLFUMCmoqaSBQjRJvLEDU8xJrl6XPOJogMFKQsATQNvLhoXJQIIJ2wAEhIbBwWUlS0WJAQCJQAig5ATFBscDR6UXysQiiICECgSCgAaBhsbBh0IHQYGmB8RBAkDGQx5EVkKDx4TCaMGCLq5IxgYDCPQER8PANAVAQEGUQoeChjJAAkiuAkd7a8iDgqcIh0POA8IAgIeAcQeHgwGPPjhgds1aAnSTWMw74OABBDIKRigz02HggImLJiwZgGCVxKYceQzQt8AEQE44XQ4icBBgQd4PFwMgEDDBAFrNHyEwK7DBGbvBpS6lGTAgQUdODwYQI4BAwAeFixIOKbCSKlAIvF7wKEABwdNHFCwJmBDAw4MLEDo4JQBNQVw4f5YA0CBhDYAKFAwMFFIgw0ObjZocIAihAklGCRoKzKCYwBOay7AtQRevHkbDHXQkGcEgVyLOwjoQCLXvFFmPyx4t0CdiAS63omApsFtAlckELB7pZiBAtUjJERI0Jp2pBI1nbIj4DnBBF0fEEc/gWBBVBUjn5MuwVw1HwKdaXRPMYF5gPB60qtfz769+/chAAA7');
		oImgCatapulta.setAttribute('class','advisorUnitIcon');
		oImgCatapulta.setAttribute('title','Catapulta');
		var oTdCatapulta=document.createElement("td");
		oTdCatapulta.appendChild(oImgCatapulta);
		oTrIntestazione.appendChild(oTdCatapulta);
				var oImgMortaio=document.createElement("img");
		oImgMortaio.setAttribute('src', 'data:image/gif;base64,R0lGODlhKAAoAMQAAA4HBTgiGdu+mSUYEXBQN0IlGJFrTLCQcNWiZWhSS5dfMl1FL0c2JzotIVBLTIJZQ1Q5KLB+TkotIGdkZ2s2KVI/NKldS3NKH44+MUQ+PmE6EzA1PHxhRZJ6aC0gGAAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZGmeaKqubOu+cCzPdG3fuElAWs5KkgDBl7pAgkPbQaBaHAvJ1SKBsZgOiNOF4IR4EyyGZ0GhWFkLCeYILDRYAEmiwkFpqgpRI1NpFwIScAwGCQcoDB0HDyIDCxMVTx4QcAMMDQwoBBwIix8eBRIVonMTBiwBAAMDKH8FIhqfrQGzlymEHQ4DAIYoABQiBXELs8QDPSiEBwcZEwJZCEwfyh0JgwcVBh0IAQMe3sYfCFklHQYEFFUWGBTYHwoJe30SEAECBwYRtA2z9p0lFbpSBQQAQIQ3BwmeDEhgAB+BBxAjGnhgqkSCDRscTOjwwdUHDhcKXJhgqduABgQI+0Q4MJCgBANYSkyYmWAjiQuXZHHz0GCBPQUQUjHgkM2cShI0M2QAQ+JTt326eHoggA9BBIjDdEHAN4LATAdgHZTo9sebh6HmGDBY8CAoQYEMHhAY98GB0gwb6jRVxZNBhQUqERDoeYADhAVd1ALeJGLHBwmrSCyo0OCSX0sBFkSIwCBIAQPiQiMwwI1DhA+IPQUgUVnM0wYVLKGtAKgAhJS4d/yh+jjQAI8i1DYY2Ijy3wX7gHhQpYqgSQgXPkAPeXpEZV2S9yEPcD3yCA0CvfWQAHFAhTyvApJQ69cDAA8plsufwb0ywRXebEhocJ+I//8ABijggAQWGEMIADs=');
		oImgMortaio.setAttribute('class','advisorUnitIcon');
		oImgMortaio.setAttribute('title','Mortaio');
		var oTdMortaio=document.createElement("td");
		oTdMortaio.appendChild(oImgMortaio);
		oTrIntestazione.appendChild(oTdMortaio);
				var oImgGirocottero=document.createElement("img");
		oImgGirocottero.setAttribute('src', 'data:image/gif;base64,R0lGODlhKAAoAPf/AOrq6L3Z6PTz6P762svj6ZWVio1aRP7++ry1o9nHqvXz04SJhbOKd4l2afW7i8OtmrmRd3dWVv7EjJRoU42ntdPMs+3x2nWKmJliSMfX24ZoV8bq+aE9G7Wpm4h9dMrBscWYfHp3auvq4/74zcenkFQpG+HcyHlNN3ZqZFAZC7y7sLh3VtH0/PPx5K6jkXVjWvz94vTszL+ljPX18ismJYlhTfr47pi5x3A2IcK/rVo6KpeZmv7//cuIZ8Pd4nopELevpvPu28zMtN3t3M37/8h5VOHb1ZhwWmlHOamoqLyYZGVUQ6xYOqqIZs68q0crJe3w6L3Hu4VPNphJJ/n49OXm4dPMvL3S2HpbS+rn5Vk4MoR9hsny/c3LvPvsuGtbXTIOB9WJaP7vw1JBOfHt5sXFuc3TwjgnH+LTs/3999vi3qOKerOIZn5VRf/+8/r7+MyeiPLy8c+zm8m7nr2cg//5x9nXwNbXyoierXpTPUo0KVxHP///7q2Oc/j37Uw6NOjo3qejkbGtsdvUvNvax6rH0MiTXquLe//90Ht3eOzs1unZsvz3wPfos7CYjdvQtsCKX7Tr9ejr2Oju3XBeUdvd3ejr6d3Lt8bDsb/Ovc/ArNHt91tUXfXqv6COgKaag6CdkbW/xsC8st65otXTwc+qftLazeyDVdvWzt7cz6zIz9/Dlsvh2eDFnufl0+fr0+Ps29S4m4hvZVNXYdv6/5F7bPz8+rm0sP7RpaFyMuethPSvhfX/5H4/JtXDtqiQesL2/8f+//z77/3/6tHj07nDwffrxG4bAPf47+DavY6iqrhaM8Kwm9BZLtmggspiOoNCKI9HOvbjvGN0gqFpUKh3X5CJgfL28ZCzvIGFcZ6GdqFHJKdWL/Tgrf/hoP/qrLGVhbefhff48cS5qLewtM/WvU1JSMGZb09TVKKKccR3Fvf39NTQte6fdtbVvnxHVNvYvOncvNyJX5qSgNxpScrNwsDf8Lzk/dmVYunt2u/v33BYRfn389LX1dvY1v///yH5BAEAAP8ALAAAAAAoACgAAAj/AP8JHEiwoMGDCBMqXMiwocOHECNKnEixosWLFD/IgoJxIQIIrfjwudYxYaUECgYMiIEMYosqRiKSQuNlGEeDLaCIQMOO3aBxzJhB+PeGh0E/NmwgQ2ZDnK0DfuZwK8JEDiEzdky4E1LhURVAQQqS4GAHhgUFnbp5acSozog6YgYoSAavQp4T7ZwpetijmQMedRAhwuVNgoNYcmSIumPJ1kAcBWAYi+EQwrNTrxI46RAoRxdLMwq6iCcwT4V/D6QpmMTwWjQDXQCENnjATa1/6QaeWCQQwSi5+SrWazAnzRMUKtSo+ZfH38AyJGC44WUhor8CmV5UE7hAz5IIe3Rk/yFohQOHMLscBDnwcAG2RNEkCQBj7s8ZME9yqXuTqs8tH9SkoEcKP0wxXkMCbHEBNSsgoAEILzyhxxMpQDNBFKHcIkoAkezQxj5LsOcQFBMcgQESE0CQxxM6nEHDMaDcc0UhFFgTQhKOSVTFEdcwowEcBpwxhgEgNDDEDcrgEUIEIlLEHg9azPOCHi/s0YMM+OxwQQFA+AGHMBdZsUcIC2DBgA5YrLFEEau8M84/ZDAAERlyALGDNR5ko8UX83iAxSE1/DGBBLo48A0EbfwTARUM8ZOAEo4IgkESFOCxAS2qTMNJDdXo4AElSMgThgRiaIECOgtdogQd5GxAhD1c0LkhizI3bMJFBlFs8QMYLjRBCQ3L1ADCGSVs4wtCMkBwSwD2bOJDBgTYE0wxGoSwRBN9IJDANcS4kkIK9EjxxB39ZNJLDdrkSFA4vwDDgg9XELCBD6xAwAYmftAGSxyz/NDLEQLx08A/AKRxECrc6EMEEQFoYsg5MSUkxBv/mNLGFBOsocFNCWXBhhOlQCJDHA2ZIVA5Xwwxj0MCgPMBRBZ4kIUnqZSkUCCfYGLzzjz37PPPQActtEMBAQA7');
		oImgGirocottero.setAttribute('class','advisorUnitIcon');
		oImgGirocottero.setAttribute('title','Girocottero');
		var oTdGirocottero=document.createElement("td");
		oTdGirocottero.appendChild(oImgGirocottero);
		oTrIntestazione.appendChild(oTdGirocottero);
				var oImgPallone=document.createElement("img");
		oImgPallone.setAttribute('src', 'data:image/gif;base64,R0lGODlhKAAoAMQAAI9pSmoND2xdSU8HB6yRaosyMPPbo4pFOnNKNSETD8uleQUGBXUwKFQ3Ktq4h4ZZRzcuK6RxTFVGNUwpHbGDVjIhGaBOQ6GKZXAeHYNyV4MYGZk9OZR+XrqYb39bOgAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZClmGYeabOueRHQcHfFsEffurNNtwI5huClYOrzkx0EpbCwWx9DgAG4oOmWLWXAWIg6pNGIpUrSsjqJwYBcoYapBwShrImhSxjA7aBgFYWJDFkYPDwJ5Ih0cDIcIDBgKHR0OCgoGFI4PGAyKHwR+hQwIB5OVllQIGEUaCHkCDhoahRoBCAQEapMKFxgBXbd5HB0BGq0BGxcZugoEGQoHA8ABnmgXEQGsBbYWCsyUKQ4A0wzaeRcW2sjeFwIcHAIEDhEDAxgYA3kZ6hhdtgCcpVChi4M9bfrQCFBXrcCvgATiCWD2zN60TwACaHM4AKK7dxcIkDv4ScAvbfke/3S48JFDSA8WE+aREEljgAEPCLAUMDEkAoufREjAp3EAggvweGYIOcFegqAiKpwcwABpBqVI7U2ASuLXPXhXe/6cAIHrhwoJElgEoGIiB3IfJLzi6sHDiAQTeE5sMILCXKgSIlAAICJBBQkCtn7wQLisWREAKPjNmxiBh7+PSwhG0KBuZhcDGiBAMGFBggWfSTSAYLqCgLQJGlRAnXlAgggCWkuoAADABAYTMphtMKGC6OIVDr/mmQCQWQwHGsRuwKH4A9YQOjDY8Ph3aNESJuSdfZsB38d1fyavyxMCoASOzT6wvKpOhAxtPECAn7lzhP8AmMMAcLvB9xR6/wkWICMpFUCAVgWpLaYgffBBGOEIjFkmHQTxXSjCaGft5yELaaERAgA7');
		oImgPallone.setAttribute('class','advisorUnitIcon');
		oImgPallone.setAttribute('title','Pallone Bombardiere');
		var oTdPallone=document.createElement("td");
		oTdPallone.appendChild(oImgPallone);
		oTrIntestazione.appendChild(oTdPallone);
				var oImgCuoco=document.createElement("img");
		oImgCuoco.setAttribute('src', 'data:image/gif;base64,R0lGODlhKAAoAMQAANGZa6l5VcSxqkxTsaSamykRBhAFAmxgYPr19JlfPjAtVlQ3KnVNNKir5l9q3PG2jVonEkIXCsi/w3MtFO7VzHeE9TEeFys0i/l/eT5HoYp9kUEuJJJDITs9cRkeRgAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeO5ChRJ1KubFtKSCzHbm1/R64RxLHdwJbBssgdgsjVgSCQCJJQkabpjCYNDIAW8LAGDYbAY0yheG+WsDagdT0oT2vCkkhsDItFC0B5IMpRCxsBhAwBCS0cCGMYGGZQhmNbDCsFEQl9GH4AUBZZARsbFiwREQUTYmWUSAcLRKIMBaSmBZamSRkSALFpBi21wGC+SBUVTgcWHh0aLMC1YEnFDg4SFQMOFQ3NBcLDQQPFGRnZ0w47K91QAloaFxcDDAfYBAxdJGB6UGIACR4ZHaU0xFiQSsQBAz+iiJnjYUAHhBRiELAEgY0BWVa0HOigbEEBAjMMHmBAMOMDABoOwESYwAECyBiPRDCoI+cBKJZ1JjBIAeiDhgUMVunbZQBnggkTNJyo8qGWUCgECkHgkIDDBAgHJGglIMIAszMzCUFACqFA1q1nSsxM4LFUBAMHBMjlmpbEpUOmEDIRQOBrXYNhF4A5oKHwgAt/SWzIk0aBuAHiECc2KMxxhgGQ3U0W8faAgguXMV/eLCIAhMVFFKjOR1pEAUEHuBUYG6B1UwujPliotRIRaQulSuz2Oxl4BNa2R2yIAAF5chG4E/4NAQA7');
		oImgCuoco.setAttribute('class','advisorUnitIcon');
		oImgCuoco.setAttribute('title','Cuoco');
		var oTdCuoco=document.createElement("td");
		oTdCuoco.appendChild(oImgCuoco);
		oTrIntestazione.appendChild(oTdCuoco);
				var oImgDottore=document.createElement("img");
		oImgDottore.setAttribute('src', 'data:image/gif;base64,R0lGODlhKAAoAMQAAFcxJ6NqRt6XYfHr625ILwYEBnlubvnblmNPTZmLiz00M7KmpiUUD45cPUxAQKaYl6B8cAQCK8OzsS0CKyYVSH4JCT4mGcF9UWdfYXJeWrWpCB0eJ4V6etTJyOOzdgAAACH5BAEAAB8ALAAAAAAoACgAAAX/4CeOZPl5x+GZbOuSTSofwWvbFuTt6IHcwFJhSBAIeKugclggXC5Go3I5fAYIAAKhMAUyGAUAAMz8bLq3AqMBKCgyCgs6CAhctA5CbX5jEBoBbFh8NhwNFlpabCMLA4QkDwMSAIiADSQUGJePdh0DDxYMiAAkERENGhpzUAIXEgMdEGKDIhEbZx8AqlNGFwEBDx0SsXZ7BRPIFBEiBEpWBBYWCRILHR2/AQcfDMjIy12BYGAGDw/DCWwBAm3ec79yDgwYCeYdCwRfbAWm310NF6QcYODAYRq1DBk+NBGTZc+Uf80UGOBgIMECCQ8SQHhEwskliQQfLFhQziFHJxdE2mCoKHJBggQYOI7QA0iBA3IiMyYwwDGBMER+bOJ0mYDDj0cWHEBAEEoOAwQZJiIAgMABRwVYM8iyUNXngAEJGBTkSQirGAQQIBhIWw0sAwcLYhJyUKEuAAdaESAI1gEUgKKPENStkNRBVQUWP1kA+ciBgsF3HUsc9uAtArJ8HA+u4MCxAw4SJMDEcJPjBgAVxBi2yWHkSwMSZW5YrLcqAno7jSrgIFMEVqiGB3JY6ThBbxEb8AodjgHDZEfHPwSn2Nw5AwMdoovIq0B7C6U7vbdI8FV8CwOY+YQAADs=');
		oImgDottore.setAttribute('class','advisorUnitIcon');
		oImgDottore.setAttribute('title','Dottore');
		var oTdDottore=document.createElement("td");
		oTdDottore.appendChild(oImgDottore);
		oTrIntestazione.appendChild(oTdDottore);
				var oTdSelTruppe=document.createElement("td");
		oTdSelTruppe.setAttribute('bgColor','#FFD700');
		oTdSelTruppe.appendChild(document.createTextNode( 'Seleziona Truppe' ));
		oTrIntestazione.appendChild(oTdSelTruppe);
				var oImgArietini=document.createElement("img");
		oImgArietini.setAttribute('src', 'data:image/gif;base64,R0lGODlhKAAoANUAAPnu0KqMce6kXK6nk3NeT6h1SP///W4xEZFJHalZJpWIdYtrU8K1lrVjK8l5T5tSI+RmNqqbg+TculgqEot5Z2I6KP7+5LWvoIlLIVIxIHpGJuLbxXVIN7WEVpVNIJhbNP6NjJlmPsrApDEWC+DTt4tUOcK8qp2bjtTKqdh/fKNRHdTMtahgRM7Hs2JLPurhwPmGNoVaQ1gfCX1CGn9LNqN+Xm5ALNza0/16ftrRsOJ/W3xQMebi4IZQLcrUvu7mwiH5BAEAAD8ALAAAAAAoACgAAAb/wJ9wSCwaj8ikcslsOp/QqLT4UkynEpqkmMtdlaQDinRRmCOob3Igo0RuPIN8qya+IpRBXM43iKYiDAICLz85ChQmfYt+UywQMAIpMQs3jIw3Ux0qDiA4KT4Wl4x/UQydOJ4kFqyiowYtUwEgnp8AAK2ujBaFUCIqHCkgEDIit7etu15QAQgIGh8HFQEbJCQvL8i5rMtPNSMHCSozBzsrLejn18e32FEdIyPOEyMTJi0i+frpLSQDUgEeTJhgY+CBCyYSJrxwYcCAEyciMJDCIMGHDBoOyJjAsGNDiIgIZHgwMUqJBhoqTNBQo6HDhydCuoix48CDAAv+OVmgAkOH/w4FIoBUQMDFgqMFQnyYMeEADBYBnqD4II5FjQA1koaQMYLmjkENEjSA5EBHySYvSiD4EKLAzwIWP/T40CCsCrENbFSgQActgQoPEngI0aEGOQ91H8xYvDjDXl8E/hkOLFecBw3OPGj2MKOCjVJNBijYkoMAhR1hMQROLDaB65QlOqRZIiGCTgYE/rygAfgBht+bfSOwYSNDDAcdcvQtIiKREDO9FriIEML1g+sefi+uUIKGgwgLykYtgoc0gQhCshAYkiNQhBohgKuw8YEFi9csBDigUAN9APQ/MFABgCJUYEUSLzAQQAgalMDCbyEEqFR+ZtERgAtpkFBDDDo1UUMaBx7s0MsPLpRQggPjLbDeDyLooMN4UIi23AAc2MDBAj8kKEQEZQFYx44KMLBcADqwcNaPSdTAwmxINunkk1BG2WQQADs=');
		oImgArietini.setAttribute('class','advisorUnitIcon');
		oImgArietini.setAttribute('title','Nave con Ariete');
		var oTdArietini=document.createElement("td");
		oTdArietini.appendChild(oImgArietini);
		oTrIntestazioneNavi.appendChild(oTdArietini);
				var oImgLanciafiamme=document.createElement("img");
		oImgLanciafiamme.setAttribute('src', 'data:image/gif;base64,R0lGODlhKAAoANUAAHRELk0nE6mNceufWm9kWJhrTmcyFWc5KPsAAFxekKZaKCgSB/qMjLqskVgzIvlvcNLJq8lmKY1GHLhtU8SylnMJBK9cRZB7Y3g4FIiP255UJJROIbCfg9KckoRHKopjSIhKNBMJBZVYOHpYPrInETMdE8+ETI0DAqtOH+HYtpyVnrddK0E0KLIXBtx8NoZULn1BHEIeDOnhvv+dnsa9n/S7bf9/f5RKMRYQPnp6qyYhJcdnaWFNQLuyos5DOu7mwiH5BAEAAD8ALAAAAAAoACgAAAb/wJ9wSCwaj8ikcslsOp/QqHQalQlS1KptoMqpINmmq5MpJ3jgMBKSK2dyv4uOoFIbVe7EhcAqhXRYdkIyXTk4ISELCyUxDhQCAoIUBQkJJQYwHiAAAA4XCAgcdgIoHjwHJAAHBw4BMT8WCBajKBskoBUOBrsBNBc+s2ofMAcYoCQVJxUBASAWExOiYSIBu7fIyjExB6oA0g02HYFPKxIxGAYYGMm5nQGMND89DzM24R0NThcRGwYB6ihWYFDlqsSCCxToPWBg44GFHQzSLFGwQkSBARhFrHKgLQYBBvRsgJxxQgeLDzsiLSmgIMIAFy40ruIGooNIBgwXnghRwiAP/5VKGmxY4bLGAQOcQNwosGPHwoU2WrCY+e5CkxcaNLg0UeAoAE0BWBgo4ONBCx4jRrzgdGBEExobYEiQ4GJAjQK6VDlwcIAHjBdp9R7wMOKCDCYXmGFAocBFjQEfPGjYpIrbxgAHNABVImNPgwIwSsBYscGFCQUoUMDI5IEtZhE3VkhLwuGCNAFTN2wIIIGxgg2KYqQLsAiACBEWnuUzwuGD1R8QCDz/8M7Aiqwb1PnT5m8VgOQWQEiUF1nahQtpBPwcFkEBdt1yI6BgNtP4MwEcIFwYQeBHZ29C6GeYEL68sIF7WWUVgQT+YHbAVCBMwEpa8XBQAAD5pCDAB/EYQV7BBZG9J4F2GGwAwAhsjYAFBAU4J8QFIjynhIYjrCYXBszQZQIHp1AgxAcjxPOZi0+k8NkLcmkw1wom/DDOIBcUQMB4URi5oQci+GiEACNsJsiXYIYp5phklmkmEkEAADs=');
		oImgLanciafiamme.setAttribute('class','advisorUnitIcon');
		oImgLanciafiamme.setAttribute('title','Nave Lanciafiamme');
		var oTdLanciafiamme=document.createElement("td");
		oTdLanciafiamme.appendChild(oImgLanciafiamme);
		oTrIntestazioneNavi.appendChild(oTdLanciafiamme);
				var oImgVaporetto=document.createElement("img");
		oImgVaporetto.setAttribute('src', 'data:image/gif;base64,R0lGODlhKAAoANUAAGdWSJVtT8Kykah3SjUtJldSUfmvd4RUM82OV66jiK2WddbNrGdIN2czE/nIdHlTOnZubKtaKraEVVQoDsxlLceiZ7tqK/rKh5yMc1dJQJVnQoFaRIt3YsCWYZdPIP/rjXFPPGthW0syIxgSEeWbWVQ6KzgcDIw3Fv+mTDw4NueCON/WtDklGGQ7I2ZHLnM9Gr6kelxAL+KoaHxGIREXHEItIuffvMF+RevjwMq/o5p/Z0dBQIRgPSUjI6CAVO7mwiH5BAEAAD8ALAAAAAAoACgAAAb/QMHi9wusiMikcslk6gQcTsvWrFqZthwEdMJdv+Bf7jQMm5vPs1qJwawUnMTaLKBQOCmCfA5WTBouKT05ZitUZgomDSctIgJWCwIwCzAdhGY+ExMeDTQvA5dLFRcyPgEae2EzDSaMNJoNHh1HSRguIgw3DhcKYTkTLzOBPRkPGQyLEkk7JSAlDBcfBgKhVTAmBzcpGSEQEAUAHQMRMD82HDU86i4gMjIdqVUCMy0tBCk73RAbGdEyCit0sHjwQF2JGC54xGuyQIUDBwh4+MiQb0sNGNIk6EiXIQXBGhJI6PiyYJcDGRIGuDDBIkUBDgwwyDiwgcQFAxkItGARICKY/woIJGg4cACBjAEHXOR7AACABhkXLmgYwYJFCR+gvsB8MADBwwsObrwQUeBbgWYaQIBoxEKEgQ8VDjXBoRbEhmgnEdwIgQHCjr81RNRgwaCDjBgmFH5RsCEljwAGHsqAkcDv3zyCaxQIAeNChwBgbIBIOSDAjVJ2U9DA93cHN2/eOMC4caOMFQ4DeDzosCEGDwQDBPfAt1mftwIEeoyYgOBLgg1EA/jYoFcDCZX3uIXYDiFnDxojTMhC4mWJ6A0Hp0uQoPshAgb4MmzekbzHgbQTIkhQcKMcEw69xTDdBgNoUOBbDujWVE4EPEDCSRrM8IIGNwxAyxI5NNaBBGpB9e2BBg1IEJYFJJaoAm0FblAQCAsp8VwFHdjlQAWVAeNBBBHciGOOLjDAQF0xhPDDhf+tiFAMRAjgQjAz6IijB3WpVcIIOcAwjRUBqMWAgRggkcCSL4QpZo8+ljAQCQYYQIJcSySQwwIDkKCAbUQk8ECYDeTZgo8MxABZmiSg0IFz1SixQAB4tqBlDHYFoIIKKKDgHx9EHOrBDFr+CAIDEdCGwJWUIiGAblESFIEFEfwIWqi1qFjXAXZEoNYGrCqRoasPRECBrBtwUKsSK/CggQYAvKHiBr38qoQOXNYZQKHK/iAAZC1GqwQMMlh7RhAAOw==');
		oImgVaporetto.setAttribute('class','advisorUnitIcon');
		oImgVaporetto.setAttribute('title','Ariete su Nave a Vapore');
		var oTdVaporetto=document.createElement("td");
		oTdVaporetto.appendChild(oImgVaporetto);
		oTrIntestazioneNavi.appendChild(oTdVaporetto);
				var oImgBalestra=document.createElement("img");
		oImgBalestra.setAttribute('src', 'data:image/gif;base64,R0lGODlhKAAoANUAAP6OhqQKCnBFK/thYf/7+z5Fq9DGpvsBAdadYpuHb2xcXJJuT7mtlKZZJnA5GTEUCgAAgLZzTn2H/GI5KshwNYxIHa9gLFgqFPrIxp1UJb+4qayagYhhSs0CAlEvJVkIA4uRlH5GIt3UsvtCP4J0aZCIv83JzKp5ZoVWMo9RJrxXb6JQHphaN4JPPNM2N55wQZNGKujw88srZHkID6hYRSkeW5qpr+XdurXHzOriv389OPsbGZhZYFFAReLX2+7mwiH5BAEAAD8ALAAAAAAoACgAAAb/wJ9wSCwaj8ikcslsOp/QqHRKrVqFN4Xm6szVIAUGV2kgKWazQk2lEY2Fos3psMMQdqOYCpOzijQGBjR1BAAHB3Z4eltUJxYrFiUydASFlAQHAD48VSwVGSUSEocjlQMHA5aFN1M3GS+hopOIlYd2mRgGUyIICAoFEgUfpDExpwMxeLlTBr0oLyQ9IYcdGjhzLjguLhtuUgYoKBUvERMTHegbNjwBMDYBNCdUOc8VKCkOD+gdICA6ATpIzOAhr1W4CxNQ5EMXoB+aHj0+9NBFxEAfJp4uXBCA4sKHDgBBKPjwwYOCDaxEGJDTogXFJQsyrEAh4MKDGR1mKFDw4AWC/wwLNiQgBwABjQROGJCoQMHmgwcTHLR4EaInAg7kWlzQEeHFAicGWjDI8eKCgwYsFrxYKwCqjgksWDzwoPFCiBMINkRghaSFAG8JHKzI0GBtCx2IJ3iYQMMnzQgWLDTIwCLJhglihCQQ4MABjMOfaToI4cACiggUUlsgHWKDZaQ/VhpgIMCcYEiTG1CwUCHE4NwhBOyOgMCAiItE4hjf4JoE586/CUvv/Ym0ABYCQkROYeFE5hsMGBhIkCCHiAQWW0Sd/FtyhgrwYQiY/+OGG6UaKmlg0G0z+gRiKKXLBingM1p8pGnkAAocYLFBMT5U4sMfLXAw3gL7ceDaEDls8GtcZw7UNVpaQhhQCQExoLgFfwxoqEEELDBSRA4JpDBZgTg2YMFX9fnggwkmaAACIzQycAINC3hjGQvsRcfjDwzgYAMImRGxAQsbNsHAAvGlEAIgQmxAJXJjzLaBLuAZ98aabLbp5ptwxqlEEAA7');
		oImgBalestra.setAttribute('class','advisorUnitIcon');
		oImgBalestra.setAttribute('title','Nave con Balestra');
		var oTdBalestra=document.createElement("td");
		oTdBalestra.appendChild(oImgBalestra);
		oTrIntestazioneNavi.appendChild(oTdBalestra);
				var oImgCatapulta=document.createElement("img");
		oImgCatapulta.setAttribute('src', 'data:image/gif;base64,R0lGODlhKAAoANUAAIlNKK6QdLShh8OylP379nBKNq5bJrlkKXJjUB4WD65yS5RtUkIyJ9NpTNTIqOLYuP6ZZ+h5NVVMOWA9LPaFOtOCUZ2IcJJ4YcVkJp4zJ9Slf41bQumTW7SEV9h+OnY7G65/Zt5sKlcxG65cQceXavB0T/28uMZ2NsZHL/asbMZrMalSGv9maNl0L8J4Xv+Lj9tEPZ1TJp1dOuvhwc1uLNJxM8vAotunYf9/hP+sSOC7ire9wXRCI+q8nv9XWe7mwiH5BAEAAD8ALAAAAAAoACgAAAb/wJ9wSCwaj8ikcslsOp/QqHQ6DZwc1GinFchCAxiS9znAdB+Ox1g5U3UqEUpIvEYqKIpOhxap1I8XEwNCA3ccM39EeTgmLjY/JBViDwKDdQoaLCYwFkIPAQgTDAqIawKaPhkiIy4yDAyiBQJrNi8mLBkSryIbMiMVIwkbaxo4MAASBQUfPDwVENAFDJZUDjAoBRIfAAIBOgsiChApEL0dAwKPRTNqSQIGLQcSCBo6JBYXFhMTMgAjCws+xDigAMSQARRy3Gh3RMABDCduBMg3YIaDUK8mKNChQYYMFxUK2tgQIQQFOkg6hFjxkMQABK/mIZgp4QAEEzNmaKgAwiGF/xgxaigpE0PFwxMbGEhYKmHBhQ0BQPQgQDXAhg/wgspQ8qCZ0QMrVnhIocECgl+yCGjQ4MBCRhEfQkSgZkTABhsDDAjEcOBhCw4VmDFAIGBHgQSIEVxAYCDCAiQz8CECtYAGgA81aGAIa2AFjwUeYohIrCFFnAOzjNi4MOhBPiEbJgTFgEGzgYEPQ+iOw/sAACxEbIzYgGjAhUcznD6oHIGGAXgtThy4vS3GB4EAABQoEqAE8QcgOv1wsCD1jwEyWrQwquKrdmUTRPDQDnx8gwadBIy4IETAgvpDCDAQDS14YBQPExSA4AQ8DDNEAA2MgMUCMQwiQAOPJWFcLzIYAGDAPiACIJ4QCvAn3HY/uFCChE7k9MAAC4wQAwAy3FWEBSN0YkMDJSzAUBQOHeACBxzQFcAjEDbQxRgWyPAMBBwAaEGEdHkRQAEjQDPiDwJc8GMdxi1QSiJklmnmmWhmEQQAOw==');
		oImgCatapulta.setAttribute('class','advisorUnitIcon');
		oImgCatapulta.setAttribute('title','Nave con Catapulta');
		var oTdCatapulta=document.createElement("td");
		oTdCatapulta.appendChild(oImgCatapulta);
		oTrIntestazioneNavi.appendChild(oTdCatapulta);
				var oImgNaveMortaio=document.createElement("img");
		oImgNaveMortaio.setAttribute('src', 'data:image/gif;base64,R0lGODlhKAAoANUAAPv6+rqsj8W6m8/GqJVtUGY1F1IzJIpFG4pcR9/WtQoDAlsuF8Z2OKVVOqpvTCoZEJqJcc9pSvXMkIpUOWlKOGE6KbpcRL1lLJh8ZH1EI3RcSP/npqSOdnREMoZJH8uPZ9OndXo+FqOVfYdGM5lcMrFXIJpgP+maVYg9EplLHrB8YZdWJaqIbD8nHv/6u5VMNraMZo5RJmNCMObfw7eab//wrvbAfEMhDP3cnK+dgW8+H9B/PH5RPX1QMKmSaO7mwiH5BAEAAD8ALAAAAAAoACgAAAb/wJ9wSCwaj8ikcslsOp/QqFQYSEynBMHs+hwIRIGZlducAc4CclObAAzU6zS8OZHNmQEDRDgIvO9FGAYYGhQVBQYUImN3CTwUEwySFz0yFGksGHJqBBMICBQyFYcZPyIRDxN/XAMONx6HBQ8LBSE5PBO5q1OOEwoLBwU3Dw4FBTwdFS0tagIXGQ8GwpY9BR08Bi0PPJtTMyQXDBk3Nx82IBUdE8k8KgUkLCw5WA4pJQwgMHUdBhUG/S0QmNjxwQQCAruYECDRqcSOEApujFD24IECAw9kwJBQQ4BBByy2MGFx4IADBzEurKiw4N8/fwpiGpDggsDCHTtMcFAigFCK/xAkHBC4cEJDzIoxF1DwIQHHhg86OnTwMCDhkAQcdv5AUCCFBxMgbOAI0EImDacb0qb98CLDvCNYIbwRIFdACh0hVoCo4WIDjbAb+LqoQdgGia9HWr0I8APr2wAEEKRIUcAEgR4OTKC4sOOEDQk2TpRIseLtVRUWJggYoILDlgEYtGLIsMCrBw8hcodAMdlrbh1FOFhokCOBihc7Z2T60xNCjNEZSh6YjFuHsQI6uiGwgGFGjhEIZrRqIEKIcgxWZmCIwT5GhhDSPbTfQ8SPxw6MYURoQB+yaT4Y2JRDT3i9NwojQwgwAgY/BGBBBAgMMIMKEZhg1RECaDCKJSIRkT6AGA7sN4+DEVhwYRIcpNMBgkRsR4AYBDwYoRQDaDBBeRgyloMFFiBHhh9KYFDijIAcgYFORSap5JJMNplEEAA7');
		oImgNaveMortaio.setAttribute('class','advisorUnitIcon');
		oImgNaveMortaio.setAttribute('title','Nave Mortaio');
		var oTdNaveMortaio=document.createElement("td");
		oTdNaveMortaio.appendChild(oImgNaveMortaio);
		oTrIntestazioneNavi.appendChild(oTdNaveMortaio);
				var oImgNaveSottomarino=document.createElement("img");
		oImgNaveSottomarino.setAttribute('src', 'data:image/gif;base64,R0lGODlhKAAoANUAAPOcbdXMrK2jiJJtTVU2KZWLdqySc3ZZR/ZzLMC3mQIDDLVdKIhcR8VkKjUxL1pSTm07GYxFG7FjNsGPXrl5V3hLNDI5QnhmVGI+LZhYPIlWOtFrK3pEK2tJOEwrF4t7aE5CO7drRYxJJKloSXZwb3hTPZpMI6R3Vsx2UN1zL6xYIoM/GZdTLq9xVEFCRWZRQc9aIXY+GoNONBoZHf+BL59eQiceIOXdum5AJcSpeKSDYItPKsFSHstqPDYnIu7mwiH5BAEAAD8ALAAAAAAoACgAAAb/wJ9wSCwaj8ikcslsOp/QqHRKrUYTglvx9hkZAtaiwKUdJkAhAGNWDv8Kj6LLodEoFGD37UEqCAM5Fg4HBAogbkNzAj8DFBMgLwkJBW1SAQIFmQYPDj8BDRwcFQQylZYlDAwlESIuF104NjsqHioJVgWpDCIwMD0UJQuFOAsxJicJeVIXJQcVCxspKBQWFi8ErBgrOwIfBbdRBR2rGw0tLRIsIC4uHTsMOjoTOpkf4E43GCUr5SctLAsaqGN3YcIEAznmCbhgKsmFF+I8RFigygaBBuUyvLDgakKOHAZOHDDgpECAABgIeIDQoYICHywwmEgxggEIjhd0DNBx4Zwy/yYBLhDAUWIUBwwKMFCgEKKBBhfVqoGoESLEoicCOnTAAEGEjKTnJGBsIAMDBxMqMrAYgUJHlJMCSkDgIINBjR0+OERDQAMBAAAUMtRAcaJhEwE4cHTQgNTDhmjS/gIQmGGa4SYFirKY4TjFBgkURgBIgQDBggwh3FIRwJWDiIAbQjgKQbq0CdT3LBmQG0PFghrnGqQYjoAHhxof3LxwILECgwyQHzeIoaFElQAGNiCQAMKH1h0NwnuenpLKBxIfQvQdUOBACQ4qGiyYryKGjBYGChgg+eRGgT4DgHPDAdqwEsEKEHhQwQiC/XXVE5MYEUAuMVQIQUoFEIDaX4gMESBAAh8ccMEtH1SwGAr8dXgEMyKmqOKLMMYo44w01khjEAA7');
		oImgNaveSottomarino.setAttribute('class','advisorUnitIcon');
		oImgNaveSottomarino.setAttribute('title','Sottomarino');
		var oTdNaveSottomarino=document.createElement("td");
		oTdNaveSottomarino.appendChild(oImgNaveSottomarino);
		oTrIntestazioneNavi.appendChild(oTdNaveSottomarino);
								var oImgNaveGiro=document.createElement("img");
		oImgNaveGiro.setAttribute('src', 'data:image/gif;base64,R0lGODlhKAAoAOZ/AM6TdtbEsEspGfbOj9OJWy0cE/Sjq4tJHf313Wc7KdBYTaWXi++Lk+6udGoy%20Eqh7ZM56Tah0Rui2hZhoRdaWl+bUu7ekk/fs03RXRYRGLZpdPopaPKNYJZdZLOp3hbeKZ+raws/R%20ypleTda0ltW8pLKvqJdfNFk4JeVZa/PlzuZreP79/rCGWnJJMf756adjRs+ef6lrVk40IsShja2K%20cLNoOXFCL+jgy3ZUONF/N/rs7ZVNIbmXglNJSM63oqhXQ6VpON9IV7uVZ5hnVuyZoax4UOu/qtyt%20mYlnUkU7N7+Oc+HMtLdpKJeDdbpzM6RbLlxDLIJMMpp2aKSCcG1EKLx9Q/TCw9OziffL0Pbax7RZ%20PnpAHb1jSoU/FpRxUsitkohSLKqOfvfX265bJMW8uMGed5eenLhqVqo4Qa6ZZ+iCf/jh5GBoYP/h%20oefl4+/z7r90VL/Dwc23l+yXS9Kri6BUIlxoZXxtUMtqaKF0UGg+LnxRMaJQO/7ilj4uI//33yH5%20BAEAAH8ALAAAAAAoACgAAAf/gH+Cg4SFhoeIiYqLjI2Oj5CGFT4IkZaCJDSVl5E+QykpIEs+AZuc%20iClhGBYlrWQ3p4cXJGEWZBQGBlgrKy6xhCA8YSVuOh4oHh5BKjq+v4IVFiG8KChrWFZiKiouposI%203oYXFy5EQWvmyGIoVuGJFUtfZSMkIDcWJBUXfxcIQURYgmDRwYABETXOvi2ZYqQMgQYAPmxAQgeG%20hSVZglgpGMJOCAYGPCRUdGEGEiRSWjyUICGPFwgEipAIYkSNgRIFzOTyoMPdoRs8Hpw4sSFDFDgT%20cEzAsIGAgiMUVNxgE8egB3CObvgI01SDVxkn9iTxk6BGgzJoPoww4uFgt0gV/75M0LDBjwAoGya0%20iJJjDhwNUbQAwHMEK1wvGAoIuGuWVIYMEOBEeZEDAp0Al2A8odJCgIweJxxYWBGmgIwEeihXIfAi%20hSUSNZg8cZBk7IkAb3hkSJBgQ4caNapM+OJTEYg8GuowwZGkx4IbIZoISACGihMnEYREYDFi36ML%20QPI+YQIEQ4+xd4TgcMBkRwcTGyJE+ABhAAjXjFJMcMAhwoQnT8jgRxoDDNBHGovVsYcfMuBQRBRV%20PGDBIimQcJESDmxhQh5FECBBgSB2UEAHE5wgg0QJsABCcX+kAEAMPoSyVQddbMHCAG0M0MAVZZQB%20HxBOdBCBBAnsMUIiFxzBxe4QASxRBiUX8NBCFweAUcYHE0ygBw5eaLdhERqk6J0hJMDxwhcVKBFD%20ABcYMUIFIHywhQBddLEDBzscsAVnG3iVwQZyJCJCGCDMIAIPKSgpxT4pzDDFBHfuUMcYlNaxQ54J%202PABfrIEEIMUIFRAgBZTpJDFER9ghgAJLIBxwKsH5Klnb1csYkGMMGixZgowQPACCIQgsMQHHVwK%206xY25FEBIxW8wAeiAcDBxZqIgFAGpJMeoMcHYyayUAAu/sBHGJwiMksZQmBwghDdKrLEGVoM4UMk%20NzRBQ7mKzPADqJykwOIzAAcs8MAEF2ywJYEAADs=%20');
		oImgNaveGiro.setAttribute('class','advisorUnitIcon');
		oImgNaveGiro.setAttribute('title','Nave Lanciamissile');
		var oTdNaveGiro=document.createElement("td");
		oTdNaveGiro.appendChild(oImgNaveGiro);
		oTrIntestazioneNavi.appendChild(oTdNaveGiro);
								var oImgNaveGiro=document.createElement("img");
		oImgNaveGiro.setAttribute('src', 'data:image/gif;base64,R0lGODlhKAAoAOZ/AOfWtU04KWczFt+JOGZHNsmaboZEG/zz2qlZI8i6pOjbw3FWRI19bvXs1ZKEdtaqaU8rGbaolfXmy8J2RLCchpJkOnhlVYpkS8mzmdvNtum7hryNVaV5UnZQOrqWeah4RYZqU2o+IfKpSaRkKOvhyppmRnBMOr6ui/bjtVtDM+qjW9nErKSJc5p2XSQXEaFuRPrFhaSEbOjFm/i5c4NZO/vFb+Wzaum2cz4lGX10aHg/G5pXJbJqQcOEV7p5ORYKBPm2XpVZNL20o4VULcKnhmE/K/KoV9+obTYtKMWGRdSLQcvFs+6iQqFRINe/oZpySMvArffSlblxKKpxMoBcR8yALpVuVNqfWdSJXMKslr9uQp6ThNG3mJNKH+iYP+DTvOedasSXWt6mdbCgjO/n0WtQON+mYadnOrSOcoFJJ9SSSKeRfKd+YHlKLP7///Tbgo9xX3JWMalfQbmJX7GAQK1vK7ZsJvzvxequVrd0S9esitqzj+LZxPKtYfm2Yv/33yH5BAEAAH8ALAAAAAAoACgAAAf/gH+Cg4SFhoeIiYqLjI2Oj45rOBGQlYQRVidklpYHQjIJBwecj2QHYxp8DaOkjCQNZGwyZJutiw0Nf0JYX7S2iKJLQoIxWBIktb+CElFHGifDf3wlYmTIvwcAGkdmNTdxRKwMWnoHqqQHMgUFZngiUy80GzMofyRUvNK5jwcSMkdX8DAxAkPClgAVHsAwcuOAEzliSOh7pGCCDRgivAyQ4cbNgQcBcDw54qWGhyJgNKxKxkgCjyp9YKhgIgLGjAFKrjyJI+IIgBwuOMyQsUdGBCiOMDQxcMVmxgFqAvoxY6RADBoQCIiBAQZLkSUkMjRy0qGLkhs3zNjAg+dDDywb/5Kk4aHlzIUoGqgsULAFaSMJeRAoAQJExBMOHRITqDAkRIAXJeZEsZBiwRZWY7s08YEHSAUTRYoECIClh5Q2BDoUAUF59AkAmBUdYCNAhw81QwiIJlAmsRcmHwK4WBCDQYQlYzCIXUQiQg4LOnQ0GVEGSZk3NlJUECGiymgIFhKQAOAEjYcVGWILapABw5gIZPgswKEDwZAAceZwKKGGiRQaOSzwAxIOUBHEBFhg4QEX+whCAgYtxJABLBg4IEQWQ0BgwAh1JOEDXVpUQYcDHsDBwBoBmFACDTRc8EEUhJgo3gpEULDEKkJYQAAE0tkxQhtB8JAEDwswwAUKd1iAQ/8KLrgQABtX2HDHKEsoAKEFSEmwAgVbNEDCBTgI0AUCIwyRRgUlQDDCGmNQgMQPKThAQAAJABBDGg9EkYAVcISSARosZLEJCVtsgcELEGiIwA4CFEFHFS1QYIGTKQCAAggZoMCFDjsU8AUUDayAxgVw8PHHARhQAMUBJDwXhAFiNoGAFBwm8QEdN4QRhgYfcPBBBS9wYOofFFzgwBd/NEBEC1mIUmF6GBQBQQgINKFZtQhkW20biZmQWhaDfGHqASu0cMGETqyRwKlZ5JAAFxycUW0X9DZhr7UEEOAtAS1IUAgJMVgQAblWgKDAH19QMIZEp2ZABAevGhCdDiGEkC9tASl0AO6/FHxBggdUdAmABywsV0gDVsbQmAAsF7EvFcge8gWfqmRRAhwMJ8JqeRVQvG+/iJAA6gpsgDAwJGQQ8Zm3aKhXSAYXMDCsJV/E0IEJBThNSAN8aP1IAxF0kLUyjWThgb9kp6322o8EAgA7');
		oImgNaveGiro.setAttribute('class','advisorUnitIcon');
		oImgNaveGiro.setAttribute('title','Nave Tender');
		var oTdNaveGiro=document.createElement("td");
		oTdNaveGiro.appendChild(oImgNaveGiro);
		oTrIntestazioneNavi.appendChild(oTdNaveGiro);
								var oImgNaveGiro=document.createElement("img");
		oImgNaveGiro.setAttribute('src', 'data:image/gif;base64,R0lGODlhKAAoAOZ/AKxYJTIXDLNqM1JRUq2FU7anlg8ODlEoEcqbaKaaldOqaJNjO+bQtnlUNmVX%20TWhGK4ZFHf3JeUk0JYx4aIRdOsizmnRqaVVEOFg+KWJMOtbCppxVKHU8GM28o/Ply2g3FjUsKPft%201P303H1CGTsrHJGEd5JOI+a0h6WLdJtlQE0dB//ni6WHatbJt6Z6UsiVXYVrVaVPHKt1S4tLIdTI%20ntaYV4ZXLXFoW9bQ0bOVeEg5MPnZnOncw6yRd5xxSP71ofq6bj0xKP/ymJeLivjGh19FLkpCOue6%20dO3Jevvdiv/ZeaVoP3ZEIf/olP32yZdHGYlyXufHmruVYu2xX8WIUm5ROerhydK8mLN/SL6jiZ1d%20LywoJf6/dJ1RIL5jJoJPMcSDR7eOcDQ0N29OL/Do0sKcfbWegeDRuBwZGR0fIrJ/WTtCSLiIYPz5%2044FpS4pwQZE/FXtfS9W+fWU+JP/qf7Wxt14wEnEvDtq+ksjBstyrbO+6bfuqZ558YS8vMf/33yH5%20BAEAAH8ALAAAAAAoACgAAAf/gH+Cg4SFhoeIiYqLjI2Oj5CRkpOUlZaXjh54PCIhZ2YwLGSYhlFa%20BFFEUDpBNyGkhWcKEXw1BRYGJZecgp4VBR16QDU+KCUGBX8iIpRLLK8dMBcYclJLLggKCHE0TjQe%20lDUuLh4eDmlbbhc6DghESU1yLlCjky8/CCkeHX5BOv9GLrBB8EYChmSUwkT4oSBFFgesMIzJIOEC%20BQw+TlR4NUkDGCRSLm5BE+BBlTEUMugo06RJlCz1IoVIAQDbCxAGJFQp8qABhQtxdjTZkQOKBmaQ%20QsjoUgOBDzQZduDBQAIDhQZBeuyIcMIBiD4tkqrp4uVLGgNx8KAgkXPMHAkZ/05wQZDBCIEFfXgc%20WlZIRJYuMTj4EXOhCgk0aDBIOCABBIwXWNgcibAHC4UcHAXxaBFzEI8lAGYYWWMkg4PTOEvqFMZl%20z5EVQpBY3lihh5k8SAtV0AIAQIMBAyxYMAIiQIAiGDIQeNHARxIhQlYk0ZMCRpwcWTpYaZN5UJbe%20XjYA1zEHgnE7QdCAkLAlwBc9SlaYuREHSo4SFhLQuBLWUI4NAHghwBcccMDEGDYwcUAAWxgRRAAq%20HCBADT8lgEMPDdhRBQtldDeICGbw5sUTHBCARAQ1yLAAEx9QFcABKqiQggYtFDBBBg1Q4cMGAoCD%20SAeg2dHFFCs0kQQSR+xBxdsXRWSQAQVZ4DBEER8YiMELXAjwjCJnyPABBDGA8dwKdCghBRR99AAM%20AxZAaEeVENiwRAp6LeIBCxt0AYcXUyiRxBUJ1IHCBDdU4AQKB7xZIBMQQFCBIyLsZgIcT2iAQwEJ%20DAFDAw9QwAIbalDAwQgQzJBCBbk1csaOXSxhwgIL2FAFjhQ8AAAVPGhghhkaeOhICD3wdocdDaRg%20wxhgKFADAD2kaokGMkAwwrRPxCCADAKkYAUsgljxXxddmGDCCBzM8Ci3g2jQxwwmzDCDD6iiK++8%209NZr7734BgIAOw==%20');
		oImgNaveGiro.setAttribute('class','advisorUnitIcon');
		oImgNaveGiro.setAttribute('title','Nave Giro');
		var oTdNaveGiro=document.createElement("td");
		oTdNaveGiro.appendChild(oImgNaveGiro);
		oTrIntestazioneNavi.appendChild(oTdNaveGiro);
						var oImgNavePallone=document.createElement("img");
		oImgNavePallone.setAttribute('src', 'data:image/gif;base64,R0lGODlhKAAoAOZ/AHmTqci2jrWXZk44J5FOJvjXhPz02zozMOW1bpWBaXVkU1NMStanZufcqurYmHGgxHZXOYqst/jiirqiai1vqad0QpWXk3Vwaa+UaGdMNcaZYcamd82UVpCwwFtINk0wHNXKlribdVJwjvTpyaeDV6SKZbDI24ZmQNTGqnddRfbCc7SjhuTDevfoldm3dzmL1O/juOvhyruJVayZgripkWuGnYp7amt6gMupadisdIh1WOfLgefcw9zNs/7yltbFh556UeOtW+vilvXr05lzSWFYVJ1mReHSj0N4qx93xC0lHxBpt8u8o5x9XPzXfqaSd0ZZcbi5sezbjcnIu66ETtLj7pJ0U5yCWFaDqqaRX93Gd+/VhN7Uu7GKY7qcXkpBOtS3bWtFKKuljG1cS93ayd/SpVlAK2tVPOXUhevWiavLt+fcjJd5VI1wTZJ6XO7bhjs4QZNpUJuJdIhrT39iRvjvz8HIpMLRqziAvhoaHMGxmOXz+d7MnvHOg+3Tf//33yH5BAEAAH8ALAAAAAAoACgAAAf/gH+Cg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmHNB5imodDBoJMSgl1hqKUBmRTPRUbIwY9B3NlqQYjfCCnkKtkUTV4AEYERBsleWdXXCMNIEdCQkcNqY1TD3gPHVhLeDVuXid0GykzAkA7LdoSQmUw1YpRVQ/dEQAUSQ8XSmZWISQfMnhxYeeOEClStjSItShGhD0mKCx5YKEGEiRFlCjRMebDgAFWJEjYItLHmwm8FE2pYWIeBSwAamARUeQLnAMHIEBgQ0LLmx1+3pRAAcNBgzrwCsW48cCECSQioIi4oSMDzgNZcIRo0oYBAwEB+Bwp4MOHkIWH6sD4cQNKDQA0/z2YyXCCioYsV3TowODFig05ITR4keJjDRp2aAX1CHDkSIAxHuBcEPMEgpmdVjQ4KXBlgY4JGGjMyJDBSp8daKSoUbNmR4MYfyb8ALHGSxE4X7T4OMKASoq/GBAwYJFlQZEJLjBkMHMGAoYWLSI8OCLBwYY/KCbsSJNcQZY1CXdQAYIhBw4dKWQgyCJOQYk2pAfQOYz6II4VgrhgwCHtyBo/EvgwgQAq5FBCAjNwkUAGc/RRAk5FnPMFG0BcgcERaQigRzUG6CEACwUE6AMYE6DxAx8rpBCHHlVBQIIMQFxQxAJfHHDBDAqcgIMAKBzCQwgTSOBHFjagUAYfTgRxhuoAJKQg1wAecMAAGBvMmEIXTOjxBGyIGMAEBm7Q0IMDUmzWAhgMbABEGB5lkEIbFVRghBFEQCBHUojEoCcLZjrhBHcu/LDBCfI9YYENH3wQxhhjMIFnIgasgIAKKrDgQg6nqbBDDlR4YIMFejBBwxweKDBEJEPMwEEOIVBqwQsAeJVDE0/wMAJsBtCgAA2PKmLADBrksEEQM+CBBQMchLCBBkzEUA0XM/QgSaQydNEEBxzIIEAIXVBRAheojDBJrkAcKAAGTQDBxgpcftIhEE24wca6PHxiiB5ErNuuvfz26++/AAcs8MCIBAIAOw==');
		oImgNavePallone.setAttribute('class','advisorUnitIcon');
		oImgNavePallone.setAttribute('title','Nave Pallone');
		var oTdNavePallone=document.createElement("td");
		oTdNavePallone.appendChild(oImgNavePallone);
		oTrIntestazioneNavi.appendChild(oTdNavePallone);
		var oTdFuturoNavale=document.createElement("td");
		oTdFuturoNavale.setAttribute('bgColor','#0066CC'); 
		oTdFuturoNavale.appendChild(document.createTextNode( 'Futuro' ));
		oTdFuturoNavale.appendChild(document.createElement("br"));
		oTdFuturoNavale.appendChild(document.createTextNode( 'Navale' ));
		oTrIntestazioneNavi.appendChild(oTdFuturoNavale);
		var oTdFuturoMilitare=document.createElement("td");
		oTdFuturoMilitare.setAttribute('bgColor','#FF6666');
		oTdFuturoMilitare.appendChild(document.createTextNode( 'Futuro' ));
		oTdFuturoMilitare.appendChild(document.createElement("br"));
		oTdFuturoMilitare.appendChild(document.createTextNode( 'Militare' ));
		oTrIntestazioneNavi.appendChild(oTdFuturoMilitare);
		var oTdDittatura=document.createElement("td");
		oTdDittatura.setAttribute('bgColor','#CADABA');
		oTdDittatura.appendChild(document.createTextNode( 'Dittat' ));
		oTrIntestazioneNavi.appendChild(oTdDittatura);
		var oTdSelFlotta=document.createElement("td");
		oTdSelFlotta.setAttribute('bgColor','#FFD700');
		oTdSelFlotta.appendChild(document.createTextNode( 'Seleziona Flotta' ));
		oTrIntestazioneNavi.appendChild(oTdSelFlotta);
		
		oTbody.appendChild(oTrIntestazione);

		// Per ogni citta
		var conta =1;
		var posizioneVettore=0;
		var oTrSimulazione=document.createElement("tr");
		var oTdSimula=document.createElement("td"); 
				oTdSimula.setAttribute('align','center');
				oTdSimula.setAttribute('colspan','14');
				oTdSimula.setAttribute('bgColor','#406f9d'); 
		oTrSimulazione.appendChild(oTdSimula);
		var lblGenerali=document.createElement("input");
		var lblOro=document.createElement("input");
		var lblNaviMercantili=document.createElement("input");
		var azzeraCalcolo = document.createElement("input");
		azzeraCalcolo.setAttribute('type','button');
		azzeraCalcolo.setAttribute('value','Azzera');
	  azzeraCalcolo.addEventListener('click',AzzeraPunteggio,false);
		lblGenerali.setAttribute('class','textfield');
		lblGenerali.setAttribute('id','lblGenerali');
		lblGenerali.setAttribute('maxlength','5');
		lblGenerali.setAttribute('value','0');
		lblGenerali.setAttribute('disabled','disabled');
		lblGenerali.setAttribute('style','width: 60px;font-family: Verdna; font-size: 12px;');
		lblOro.setAttribute('class','textfield');
		lblOro.setAttribute('id','lblOro');
		lblOro.setAttribute('maxlength','5');
		lblOro.setAttribute('value','0');
		lblOro.setAttribute('disabled','disabled');
		lblOro.setAttribute('style','width: 60px;font-family: Verdna; font-size: 12px;');
		lblNaviMercantili.setAttribute('class','textfield');
		lblNaviMercantili.setAttribute('id','lblNaviMercantili');
		lblNaviMercantili.setAttribute('maxlength','3');
		lblNaviMercantili.setAttribute('value','0');
		lblNaviMercantili.setAttribute('disabled','disabled');
		lblNaviMercantili.setAttribute('style','width: 60px;font-family: Verdna; font-size: 12px;');
		
		oTdSimula.appendChild(lblGenerali);
		var descGen=document.createTextNode( 'Tot Generali' );
		oTdSimula.appendChild(descGen);
		oTdSimula.appendChild(lblOro);
		oTdSimula.appendChild(document.createTextNode( 'Tot Oro' ));
		oTdSimula.appendChild(azzeraCalcolo);
		oTdSimula.appendChild(lblNaviMercantili);
		oTdSimula.appendChild(document.createTextNode( 'Navi Mercantili' ));
		oTrResocontoFinale.appendChild(oTdSimula);

		var oTdSimOplita=document.createElement("td"); 
		oTdSimOplita.setAttribute('align','center');
		var oInSimOplita=document.createElement("input");
		oInSimOplita.setAttribute('class','textfield');
		oInSimOplita.setAttribute('id','oInSimOplita');
		oInSimOplita.setAttribute('maxlength','5');
		oInSimOplita.setAttribute('style','width: 40px;font-family: Verdna; font-size: 12px;');
		oInSimOplita.setAttribute('value',valOplita);
		oInSimOplita.addEventListener('change',AggiornaPunteggio,false);
		oInSimOplita.addEventListener('keyup',soloNumeretti,false);
		oTdSimOplita.appendChild(oInSimOplita);
		oTrSimulazione.appendChild(oTdSimOplita);

		var oTdSimGigante=document.createElement("td"); 
		oTdSimGigante.setAttribute('align','center');
		var oInSimGigante=document.createElement("input");
		oInSimGigante.setAttribute('class','textfield');
		oInSimGigante.setAttribute('id','oInSimGigante');
		oInSimGigante.setAttribute('maxlength','5');
		oInSimGigante.setAttribute('style','width: 40px;font-family: Verdna; font-size: 12px;');
		oInSimGigante.setAttribute('value',valGigante);
		oInSimGigante.addEventListener('change',AggiornaPunteggio,false);
		oInSimGigante.addEventListener('keyup',soloNumeretti,false);
		oTdSimGigante.appendChild(oInSimGigante);
		oTrSimulazione.appendChild(oTdSimGigante);

		var oTdSimGiavello=document.createElement("td"); 
		oTdSimGiavello.setAttribute('align','center');
		var oInSimGiavello=document.createElement("input");
		oInSimGiavello.setAttribute('class','textfield');
		oInSimGiavello.setAttribute('id','oInSimGiavello');
		oInSimGiavello.setAttribute('maxlength','5');
		oInSimGiavello.setAttribute('style','width: 40px;font-family: Verdna; font-size: 12px;');
		oInSimGiavello.setAttribute('value',valGiavello);
		oInSimGiavello.addEventListener('change',AggiornaPunteggio,false);
		oInSimGiavello.addEventListener('keyup',soloNumeretti,false);
		oTdSimGiavello.appendChild(oInSimGiavello);
		oTrSimulazione.appendChild(oTdSimGiavello);

		var oTdSimSpada=document.createElement("td"); 
		oTdSimSpada.setAttribute('align','center');
		var oInSimSpada=document.createElement("input");
		oInSimSpada.setAttribute('class','textfield');
		oInSimSpada.setAttribute('id','oInSimSpada');
		oInSimSpada.setAttribute('maxlength','5');
		oInSimSpada.setAttribute('style','width: 40px;font-family: Verdna; font-size: 12px;');
		oInSimSpada.setAttribute('value',valSpada)
		oInSimSpada.addEventListener('change',AggiornaPunteggio,false);
		oInSimSpada.addEventListener('keyup',soloNumeretti,false);
		oTdSimSpada.appendChild(oInSimSpada);
		oTrSimulazione.appendChild(oTdSimSpada);

	  var oTdSimFrombolo=document.createElement("td"); 
		oTdSimFrombolo.setAttribute('align','center');
		var oInSimFrombolo=document.createElement("input");
		oInSimFrombolo.setAttribute('class','textfield');
		oInSimFrombolo.setAttribute('id','oInSimFrombolo');
		oInSimFrombolo.setAttribute('maxlength','5');
		oInSimFrombolo.setAttribute('style','width: 40px;font-family: Verdna; font-size: 12px;');
		oInSimFrombolo.setAttribute('value',valFrombolo)
		oInSimFrombolo.addEventListener('change',AggiornaPunteggio,false);
		oInSimFrombolo.addEventListener('keyup',soloNumeretti,false);
		oTdSimFrombolo.appendChild(oInSimFrombolo);
		oTrSimulazione.appendChild(oTdSimFrombolo);

		var oTdSimArciere=document.createElement("td"); 
		oTdSimArciere.setAttribute('align','center');
		var oInSimArciere=document.createElement("input");
		oInSimArciere.setAttribute('class','textfield');
		oInSimArciere.setAttribute('id','oInSimArciere');
		oInSimArciere.setAttribute('maxlength','5');
		oInSimArciere.setAttribute('style','width: 40px;font-family: Verdna; font-size: 12px;');
		oInSimArciere.addEventListener('change',AggiornaPunteggio,false);
		oInSimArciere.addEventListener('keyup',soloNumeretti,false);
		oInSimArciere.setAttribute('value',valArciere);
		oTdSimArciere.appendChild(oInSimArciere);
		oTrSimulazione.appendChild(oTdSimArciere);

		var oTdSimTiratore=document.createElement("td"); 
		oTdSimTiratore.setAttribute('align','center');
		var oInSimTiratore=document.createElement("input");
		oInSimTiratore.setAttribute('class','textfield');
		oInSimTiratore.setAttribute('id','oInSimTiratore');
		oInSimTiratore.setAttribute('maxlength','5');
		oInSimTiratore.setAttribute('style','width: 40px;font-family: Verdna; font-size: 12px;');
		oInSimTiratore.setAttribute('value',valTiratore);
		oInSimTiratore.addEventListener('change',AggiornaPunteggio,false);
		oInSimTiratore.addEventListener('keyup',soloNumeretti,false);
		oTdSimTiratore.appendChild(oInSimTiratore);
		oTrSimulazione.appendChild(oTdSimTiratore);
		
		var oTdSimAriete=document.createElement("td"); 
		oTdSimAriete.setAttribute('align','center');
		var oInSimAriete=document.createElement("input");
		oInSimAriete.setAttribute('class','textfield');
		oInSimAriete.setAttribute('id','oInSimAriete');
		oInSimAriete.setAttribute('maxlength','5');
		oInSimAriete.setAttribute('style','width: 40px;font-family: Verdna; font-size: 12px;');
		oInSimAriete.setAttribute('value',valAriete);
	  oInSimAriete.addEventListener('change',AggiornaPunteggio,false);
		oInSimAriete.addEventListener('keyup',soloNumeretti,false);	
		oTdSimAriete.appendChild(oInSimAriete);
		oTrSimulazione.appendChild(oTdSimAriete);
	
		var oTdSimCatapulta=document.createElement("td"); 
		oTdSimCatapulta.setAttribute('align','center');
		var oInSimCatapulta=document.createElement("input");
		oInSimCatapulta.setAttribute('class','textfield');
		oInSimCatapulta.setAttribute('id','oInSimCatapulta');
		oInSimCatapulta.setAttribute('maxlength','5');
		oInSimCatapulta.setAttribute('style','width: 40px;font-family: Verdna; font-size: 12px;');
		oInSimCatapulta.setAttribute('value',valCatapulta);
	  oInSimCatapulta.addEventListener('change',AggiornaPunteggio,false);
		oInSimCatapulta.addEventListener('keyup',soloNumeretti,false);
		oTdSimCatapulta.appendChild(oInSimCatapulta);
		oTrSimulazione.appendChild(oTdSimCatapulta);
		
		var oTdSimMortaio=document.createElement("td"); 
		oTdSimMortaio.setAttribute('align','center');
		var oInSimMortaio=document.createElement("input");
		oInSimMortaio.setAttribute('class','textfield');
		oInSimMortaio.setAttribute('id','oInSimMortaio');
		oInSimMortaio.setAttribute('maxlength','5');
		oInSimMortaio.setAttribute('style','width: 40px;font-family: Verdna; font-size: 12px;');
		oInSimMortaio.setAttribute('value',valMortaio)
	  oInSimMortaio.addEventListener('change',AggiornaPunteggio,false);
		oInSimMortaio.addEventListener('keyup',soloNumeretti,false);
		oTdSimMortaio.appendChild(oInSimMortaio);
		oTrSimulazione.appendChild(oTdSimMortaio);
		
		var oTdSimGiro=document.createElement("td"); 
		oTdSimGiro.setAttribute('align','center');
		var oInSimGiro=document.createElement("input");
		oInSimGiro.setAttribute('class','textfield');
		oInSimGiro.setAttribute('id','oInSimGiro');
		oInSimGiro.setAttribute('maxlength','5');
		oInSimGiro.setAttribute('style','width: 40px;font-family: Verdna; font-size: 12px;');
		oInSimGiro.setAttribute('value',valGiro);
	  oInSimGiro.addEventListener('change',AggiornaPunteggio,false);
		oInSimGiro.addEventListener('keyup',soloNumeretti,false);
		oTdSimGiro.appendChild(oInSimGiro);
		oTrSimulazione.appendChild(oTdSimGiro);
		
		var oTdSimPallon=document.createElement("td"); 
		oTdSimPallon.setAttribute('align','center');
		var oInSimPallon=document.createElement("input");
		oInSimPallon.setAttribute('class','textfield');
		oInSimPallon.setAttribute('id','oInSimPallon');
		oInSimPallon.setAttribute('maxlength','5');
		oInSimPallon.setAttribute('style','width: 40px;font-family: Verdna; font-size: 12px;');
		oInSimPallon.setAttribute('value',valPallon);
	  oInSimPallon.addEventListener('change',AggiornaPunteggio,false);
	  oInSimPallon.addEventListener('keyup',soloNumeretti,false);
		oTdSimPallon.appendChild(oInSimPallon);
		oTrSimulazione.appendChild(oTdSimPallon);
		
		var oTdSimDottore=document.createElement("td"); 
		oTdSimDottore.setAttribute('align','center');
		var oInSimDottore=document.createElement("input");
		oInSimDottore.setAttribute('class','textfield');
		oInSimDottore.setAttribute('id','oInSimDottore');
		oInSimDottore.setAttribute('maxlength','5');
		oInSimDottore.setAttribute('style','width: 40px;font-family: Verdna; font-size: 12px;');
		oInSimDottore.setAttribute('value',valPallon);
	  oInSimDottore.addEventListener('change',AggiornaPunteggio,false);
	  oInSimDottore.addEventListener('keyup',soloNumeretti,false);
		oTdSimDottore.appendChild(oInSimDottore);
		oTrSimulazione.appendChild(oTdSimDottore);
		
		var oTdSimCuoco=document.createElement("td"); 
		oTdSimCuoco.setAttribute('align','center');
		var oInSimCuoco=document.createElement("input");
		oInSimCuoco.setAttribute('class','textfield');
		oInSimCuoco.setAttribute('id','oInSimCuoco');
		oInSimCuoco.setAttribute('maxlength','5');
		oInSimCuoco.setAttribute('style','width: 40px;font-family: Verdna; font-size: 12px;');
		oInSimCuoco.setAttribute('value',valDottore);
	  oInSimCuoco.addEventListener('change',AggiornaPunteggio,false);
	  oInSimCuoco.addEventListener('keyup',soloNumeretti,false);
		oTdSimCuoco.appendChild(oInSimCuoco);
		oTrSimulazione.appendChild(oTdSimCuoco);
		
				var oTdSimSelezionaTruppe=document.createElement("td"); 
		oTdSimSelezionaTruppe.setAttribute('align','center');
		var oInSimSelezionaTruppe=document.createElement("select");
		oInSimSelezionaTruppe.setAttribute('id','oInSimSelezionaTruppe');
		var opzTruppe0=document.createElement("option");
		opzTruppe0.innerHTML="Seleziona";
		opzTruppe0.setAttribute('value','0');
		oInSimSelezionaTruppe.appendChild(opzTruppe0);
		var opzTruppe1=document.createElement("option");
		opzTruppe1.setAttribute('value','1');
		opzTruppe1.innerHTML="Sparpa Truppe";
		oInSimSelezionaTruppe.appendChild(opzTruppe1);
		var opzTruppe2=document.createElement("option");
		opzTruppe2.setAttribute('value','2');
		opzTruppe2.innerHTML="Poche Truppe";
		oInSimSelezionaTruppe.appendChild(opzTruppe2);
				var opzTruppe3=document.createElement("option");
		opzTruppe3.setAttribute('value','3');
		opzTruppe3.innerHTML="Minime Truppe";
		oInSimSelezionaTruppe.appendChild(opzTruppe3);
				var opzTruppe4=document.createElement("option");
		opzTruppe4.setAttribute('value','4');
		opzTruppe4.innerHTML="Standard Truppe";
		oInSimSelezionaTruppe.appendChild(opzTruppe4);
				var opzTruppe5=document.createElement("option");
		opzTruppe5.setAttribute('value','5');
		opzTruppe5.innerHTML="Tante Truppe";
		oInSimSelezionaTruppe.appendChild(opzTruppe5);
				var opzTruppe6=document.createElement("option");
		opzTruppe6.setAttribute('value','6');
		opzTruppe6.innerHTML="Dark Truppe";
		oInSimSelezionaTruppe.appendChild(opzTruppe6);
		
  	oInSimSelezionaTruppe.addEventListener('change',AggiornaTruppe,false);
		oTdSimSelezionaTruppe.appendChild(oInSimSelezionaTruppe);
		oTrSimulazione.appendChild(oTdSimSelezionaTruppe);

				
		
		var oTdSimNaveAriete=document.createElement("td"); 
		oTdSimNaveAriete.setAttribute('align','center');
		var oInSimNaveAriete=document.createElement("input");
		oInSimNaveAriete.setAttribute('class','textfield');
		oInSimNaveAriete.setAttribute('id','oInSimNaveAriete');
		oInSimNaveAriete.setAttribute('maxlength','5');
		oInSimNaveAriete.setAttribute('style','width: 40px;font-family: Verdna; font-size: 12px;');
		oInSimNaveAriete.setAttribute('value',valNaveAriete);
  	oInSimNaveAriete.addEventListener('change',AggiornaPunteggio,false);
  	oInSimNaveAriete.addEventListener('keyup',soloNumeretti,false);
		oTdSimNaveAriete.appendChild(oInSimNaveAriete);
		oTrValoriNavi.appendChild(oTdSimNaveAriete);
		
		var oTdSimLanciafuoco=document.createElement("td"); 
		oTdSimLanciafuoco.setAttribute('align','center');
		var oInSimLanciafuoco=document.createElement("input");
		oInSimLanciafuoco.setAttribute('class','textfield');
		oInSimLanciafuoco.setAttribute('id','oInSimLanciafuoco');
		oInSimLanciafuoco.setAttribute('maxlength','5');
		oInSimLanciafuoco.setAttribute('style','width: 40px;font-family: Verdna; font-size: 12px;');
		oInSimLanciafuoco.setAttribute('value',valLanciafuoco);
  	oInSimLanciafuoco.addEventListener('change',AggiornaPunteggio,false);
  	oInSimLanciafuoco.addEventListener('keyup',soloNumeretti,false);
		oTdSimLanciafuoco.appendChild(oInSimLanciafuoco);
		oTrValoriNavi.appendChild(oTdSimLanciafuoco);
		
		var oTdSimVaporello=document.createElement("td"); 
		oTdSimVaporello.setAttribute('align','center');
		var oInSimVaporello=document.createElement("input");
		oInSimVaporello.setAttribute('class','textfield');
		oInSimVaporello.setAttribute('id','oInSimVaporello');
		oInSimVaporello.setAttribute('maxlength','5');
		oInSimVaporello.setAttribute('style','width: 40px;font-family: Verdna; font-size: 12px;');
		oInSimVaporello.setAttribute('value',valVaporello);
  	oInSimVaporello.addEventListener('change',AggiornaPunteggio,false);
		oInSimVaporello.addEventListener('keyup',soloNumeretti,false);
		oTdSimVaporello.appendChild(oInSimVaporello);
		oTrValoriNavi.appendChild(oTdSimVaporello);
		
		var oTdSimNaveBalestra=document.createElement("td"); 
		oTdSimNaveBalestra.setAttribute('align','center');
		var oInSimNaveBalestra=document.createElement("input");
		oInSimNaveBalestra.setAttribute('class','textfield');
		oInSimNaveBalestra.setAttribute('id','oInSimNaveBalestra');
		oInSimNaveBalestra.setAttribute('maxlength','5');
		oInSimNaveBalestra.setAttribute('style','width: 40px;font-family: Verdna; font-size: 12px;');
		oInSimNaveBalestra.setAttribute('value',valNaveBalestra);
  	oInSimNaveBalestra.addEventListener('change',AggiornaPunteggio,false);
  	oInSimNaveBalestra.addEventListener('keyup',soloNumeretti,false);
		oTdSimNaveBalestra.appendChild(oInSimNaveBalestra);
		oTrValoriNavi.appendChild(oTdSimNaveBalestra);
		
		var oTdSimNaveCatapulta=document.createElement("td"); 
		oTdSimNaveCatapulta.setAttribute('align','center');
		var oInSimNaveCatapulta=document.createElement("input");
		oInSimNaveCatapulta.setAttribute('class','textfield');
		oInSimNaveCatapulta.setAttribute('id','oInSimNaveCatapulta');
		oInSimNaveCatapulta.setAttribute('maxlength','5');
		oInSimNaveCatapulta.setAttribute('style','width: 40px;font-family: Verdna; font-size: 12px;');
		oInSimNaveCatapulta.setAttribute('value',valNaveCatapulta);
  	oInSimNaveCatapulta.addEventListener('change',AggiornaPunteggio,false);
  	oInSimNaveCatapulta.addEventListener('keyup',soloNumeretti,false);
		oTdSimNaveCatapulta.appendChild(oInSimNaveCatapulta);
		oTrValoriNavi.appendChild(oTdSimNaveCatapulta);
		
		var oTdSimNaveMortaio=document.createElement("td"); 
		oTdSimNaveMortaio.setAttribute('align','center');
		var oInSimNaveMortaio=document.createElement("input");
		oInSimNaveMortaio.setAttribute('class','textfield');
		oInSimNaveMortaio.setAttribute('id','oInSimNaveMortaio');
		oInSimNaveMortaio.setAttribute('maxlength','5');
		oInSimNaveMortaio.setAttribute('style','width: 40px;font-family: Verdna; font-size: 12px;');
		oInSimNaveMortaio.setAttribute('value',valNaveMortaio);
  	oInSimNaveMortaio.addEventListener('change',AggiornaPunteggio,false);
  	oInSimNaveMortaio.addEventListener('keyup',soloNumeretti,false);
		oTdSimNaveMortaio.appendChild(oInSimNaveMortaio);
		oTrValoriNavi.appendChild(oTdSimNaveMortaio);
		
		var oTdSimNaveSottomarino=document.createElement("td"); 
		oTdSimNaveSottomarino.setAttribute('align','center');
		var oInSimNaveSottomarino=document.createElement("input");
		oInSimNaveSottomarino.setAttribute('class','textfield');
		oInSimNaveSottomarino.setAttribute('id','oInSimNaveSottomarino');
		oInSimNaveSottomarino.setAttribute('maxlength','5');
		oInSimNaveSottomarino.setAttribute('style','width: 40px;font-family: Verdna; font-size: 12px;');
		oInSimNaveSottomarino.setAttribute('value',valNaveSottomarino);
  	oInSimNaveSottomarino.addEventListener('change',AggiornaPunteggio,false);
  	oInSimNaveSottomarino.addEventListener('keyup',soloNumeretti,false);
		oTdSimNaveSottomarino.appendChild(oInSimNaveSottomarino);
		oTrValoriNavi.appendChild(oTdSimNaveSottomarino);

		var oTdSimNaveMissile=document.createElement("td"); 
		oTdSimNaveMissile.setAttribute('align','center');
		var oInSimNaveMissile=document.createElement("input");
		oInSimNaveMissile.setAttribute('class','textfield');
		oInSimNaveMissile.setAttribute('id','oInSimNaveMissile');
		oInSimNaveMissile.setAttribute('maxlength','5');
		oInSimNaveMissile.setAttribute('style','width: 40px;font-family: Verdna; font-size: 12px;');
		oInSimNaveMissile.setAttribute('value',valNaveMissile);
  	oInSimNaveMissile.addEventListener('change',AggiornaPunteggio,false);
  	oInSimNaveMissile.addEventListener('keyup',soloNumeretti,false);
		oTdSimNaveMissile.appendChild(oInSimNaveMissile);
		oTrValoriNavi.appendChild(oTdSimNaveMissile);
		
				var oTdSimNaveTender=document.createElement("td"); 
		oTdSimNaveTender.setAttribute('align','center');
		var oInSimNaveTender=document.createElement("input");
		oInSimNaveTender.setAttribute('class','textfield');
		oInSimNaveTender.setAttribute('id','oInSimNaveTender');
		oInSimNaveTender.setAttribute('maxlength','5');
		oInSimNaveTender.setAttribute('style','width: 40px;font-family: Verdna; font-size: 12px;');
		oInSimNaveTender.setAttribute('value',valNaveTender);
  	oInSimNaveTender.addEventListener('change',AggiornaPunteggio,false);
  	oInSimNaveTender.addEventListener('keyup',soloNumeretti,false);
		oTdSimNaveTender.appendChild(oInSimNaveTender);
		oTrValoriNavi.appendChild(oTdSimNaveTender);
		
				var oTdSimNaveGiro=document.createElement("td"); 
		oTdSimNaveGiro.setAttribute('align','center');
		var oInSimNaveGiro=document.createElement("input");
		oInSimNaveGiro.setAttribute('class','textfield');
		oInSimNaveGiro.setAttribute('id','oInSimNaveGiro');
		oInSimNaveGiro.setAttribute('maxlength','5');
		oInSimNaveGiro.setAttribute('style','width: 40px;font-family: Verdna; font-size: 12px;');
		oInSimNaveGiro.setAttribute('value',valNaveGiro);
	 	oInSimNaveGiro.addEventListener('change',AggiornaPunteggio,false);
	 	oInSimNaveGiro.addEventListener('keyup',soloNumeretti,false);
  	oTdSimNaveGiro.appendChild(oInSimNaveGiro);
		oTrValoriNavi.appendChild(oTdSimNaveGiro);
		
				var oTdSimNavePortaPallone=document.createElement("td"); 
		oTdSimNavePortaPallone.setAttribute('align','center');
		var oInSimNavePortaPallone=document.createElement("input");
		oInSimNavePortaPallone.setAttribute('class','textfield');
		oInSimNavePortaPallone.setAttribute('id','oInSimNavePortaPallone');
		oInSimNavePortaPallone.setAttribute('maxlength','5');
		oInSimNavePortaPallone.setAttribute('style','width: 40px;font-family: Verdna; font-size: 12px;');
		oInSimNavePortaPallone.setAttribute('value',valNavePortaPallone);
  	oInSimNavePortaPallone.addEventListener('change',AggiornaPunteggio,false);
		oInSimNavePortaPallone.addEventListener('keyup',soloNumeretti,false);
		oTdSimNavePortaPallone.appendChild(oInSimNavePortaPallone);
		oTrValoriNavi.appendChild(oTdSimNavePortaPallone);

				var oTdSimFuturoNavale=document.createElement("td"); 
		oTdSimFuturoNavale.setAttribute('align','center');
		var oInSimFuturoNavale=document.createElement("input");
		oInSimFuturoNavale.setAttribute('class','textfield');
		oInSimFuturoNavale.setAttribute('id','oInSimFuturoNavale');
		oInSimFuturoNavale.setAttribute('maxlength','2');
		oInSimFuturoNavale.setAttribute('style','width: 20px;font-family: Verdna; font-size: 12px;');
		oInSimFuturoNavale.setAttribute('value',futuroNavale);
  	oInSimFuturoNavale.addEventListener('change',AggiornaPunteggioN,false);
		oInSimFuturoNavale.addEventListener('keyup',soloNumeretti,false);
		oTdSimFuturoNavale.appendChild(oInSimFuturoNavale);
		oTdSimFuturoNavale.appendChild(document.createTextNode( 'Liv' ));
		oTdSimFuturoNavale.setAttribute('bgColor','#000000');
		oTrValoriNavi.appendChild(oTdSimFuturoNavale);

				var oTdSimFuturoMilitare=document.createElement("td"); 
		oTdSimFuturoMilitare.setAttribute('align','center');
		var oInSimFuturoMilitare=document.createElement("input");
		oInSimFuturoMilitare.setAttribute('class','textfield');
		oInSimFuturoMilitare.setAttribute('id','oInSimFuturoMilitare');
		oInSimFuturoMilitare.setAttribute('maxlength','2');
		oInSimFuturoMilitare.setAttribute('style','width: 20px;font-family: Verdna; font-size: 12px;');
		oInSimFuturoMilitare.setAttribute('value',futuroMilitare)
  	oInSimFuturoMilitare.addEventListener('change',AggiornaPunteggioM,false);
		oInSimFuturoMilitare.addEventListener('keyup',soloNumeretti,false);
		oTdSimFuturoMilitare.appendChild(oInSimFuturoMilitare);
		oTdSimFuturoMilitare.appendChild(document.createTextNode( 'Liv' ));
		oTdSimFuturoMilitare.setAttribute('bgColor','#000000');
		oTrValoriNavi.appendChild(oTdSimFuturoMilitare);

		var oTdSimDittatura=document.createElement("td"); 
		oTdSimDittatura.setAttribute('align','center');
		var oInSimDittatura=document.createElement("input");
		oInSimDittatura.setAttribute('type','checkbox');
		oInSimDittatura.setAttribute('id','oInSimDittatura');
		oInSimDittatura.setAttribute('style','width: 30px;font-family: Verdna; font-size: 12px;');
		if ( checkDittatura == 'true'  )
			oInSimDittatura.setAttribute('checked',checkDittatura);
  	oInSimDittatura.addEventListener('change',AggiornaCheckDittatura,false);
		oTdSimDittatura.appendChild(oInSimDittatura);
		oTdSimDittatura.setAttribute('bgColor','#000000');
		oTrValoriNavi.appendChild(oTdSimDittatura);

		var oTdSimSelezionaFlotta=document.createElement("td"); 
		oTdSimSelezionaFlotta.setAttribute('align','center');
		var oInSimSelezionaFlotta=document.createElement("select");
		oInSimSelezionaFlotta.setAttribute('id','oInSimSelezionaFlotta');
		var opzFlotta0=document.createElement("option");
		opzFlotta0.innerHTML="Seleziona";
		opzFlotta0.setAttribute('value','0');
		oInSimSelezionaFlotta.appendChild(opzFlotta0);
		var opzFlotta1=document.createElement("option");
		opzFlotta1.setAttribute('value','1');
		opzFlotta1.innerHTML="Sparpa Flotta";
		oInSimSelezionaFlotta.appendChild(opzFlotta1);
		var opzFlotta2=document.createElement("option");
		opzFlotta2.setAttribute('value','2');
		opzFlotta2.innerHTML="Piccola Flotta";
		oInSimSelezionaFlotta.appendChild(opzFlotta2);
		var opzFlotta3=document.createElement("option");
		opzFlotta3.setAttribute('value','3');
		opzFlotta3.innerHTML="Grande Flotta";
		oInSimSelezionaFlotta.appendChild(opzFlotta3);
//		var opzFlotta4=document.createElement("option");
//		opzFlotta4.setAttribute('value','4');
//		opzFlotta4.innerHTML="Lara Flotta";
		var opzFlotta5=document.createElement("option");
		opzFlotta5.setAttribute('value','5');
		opzFlotta5.innerHTML="Flotta Tipo";
		var opzFlotta6=document.createElement("option");
		opzFlotta6.setAttribute('value','6');
		opzFlotta6.innerHTML="Non Si Fanno Nomi";
//		oInSimSelezionaFlotta.appendChild(opzFlotta4);
		oInSimSelezionaFlotta.appendChild(opzFlotta5);
		oInSimSelezionaFlotta.appendChild(opzFlotta6);
  	oInSimSelezionaFlotta.addEventListener('change',AggiornaFlotta,false);
		oTdSimSelezionaFlotta.appendChild(oInSimSelezionaFlotta);
		oTrValoriNavi.appendChild(oTdSimSelezionaFlotta);
			
		oTbody.appendChild(oTrSimulazione);
		oTbody.appendChild(oTrIntestazioneNavi);
		oTbody.appendChild(oTrValoriNavi);
		oTbody.appendChild(oTrResocontoFinale);
		oTable.setAttribute('border',3);
		oTable.setAttribute('style',"padding: 3px; background-color: rgb(252, 244, 222); ");
		oTable.appendChild(oTbody);
		corps.appendChild(oTable);

		var p2 = document.getElementsByTagName('div')[5];
		p2.parentNode.insertBefore(panel,p2);
		AggiornaPunteggio();
}
}
//-----------------------------------------------------------------------------
function main() {
		sparpaMilitary();
}
//-----------------------------------------------------------------------------
main();
//-----------------------------------------------------------------------------
