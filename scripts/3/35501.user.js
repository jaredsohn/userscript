// ==UserScript==
// @name		Assistant ADS 2007
// @namespace	http://userscripts.org/users/21175
// @include	http://ads.application.i2/servlet/*
// @include	http://userscripts.org/scripts*35501
// @version	0.1.b
// @author		Sylvain Comte : sylvain.comte@developpement-durable.gouv.fr
// @description	facilite le parcours et l'exploration des tableaux fournis par ADS 2007 pour le pilotage de l'activité ADS(donc uniquement sur le réseau du ministère de l'Ecologie)
//			pour l'instant à un niveau de développement très basique.
// @licence	creative commons by-nc-sa
// ==/UserScript==

/********** SCRIPT VERSION CONTROL *************/
//  http://userscripts.org/scripts/show/35611 > version 0.1 by Sylvain Comte
//  licence cc by-nc-sa 
/* This script parameters */
var thisId=35501;
var thisVersion="0.1.b";
/* script version control parameters */
var GMSUCtime=11;			// delay before alert disapears. Set to 0 if you don't want it to disapear (might be a bit intrusive!)
var GMSUCbgColor="black";	// background color
var GMSUCfgColor="white";	// foreground color
/* This script version control  */
GM_scriptVersionControl(thisId,thisVersion);
// define function
function GM_scriptVersionControl(scriptId,version) {
//  http://userscripts.org/scripts/show/35611 - version 0.1
	var scriptUrl="http://userscripts.org/scripts/show/"+scriptId;
	// go to script home page to get official release number and compare it to current one
	GM_xmlhttpRequest({
		method: 'GET',
		url: scriptUrl,
		headers: {
			 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			 'Accept': 'text/html,application/xml,text/xml',
			 },
		onload: function(responseDetails) {
			var parser=new DOMParser();
			var dom=parser.parseFromString(responseDetails.responseText,"text/xml");
			var offRel=dom.getElementById('right').getElementsByTagName('code')[0].getElementsByTagName('b')[0].textContent;
			var scriptName=dom.getElementById('content').getElementsByTagName('h1')[0].textContent;
			if(offRel!=version) {
				// Styling
				GM_addStyle("#GMSUC-alerte {position:absolute;top:5px;left:50%;margin:20px 0 0 -128px;padding:6px;width:250px;background:"+GMSUCbgColor+";border:"+GMSUCfgColor+" 1px solid;color:"+GMSUCfgColor+";font-size:1em;text-align:center;z-index:35501} #GMSUC-alerte a {font-weight:bold;font-size:1em} #GMSUC-alerte * {color:"+GMSUCfgColor+";} #GMSUC-alerte table {width:100%} #GMSUC-alerte td {width:33%;border:solid 1px "+GMSUCfgColor+"} #GMSUC-alerte td:hover{background:"+GMSUCfgColor+"} #GMSUC-alerte td:hover a {color:"+GMSUCbgColor+"} #GMSUC-timer {font:big bolder} #GMSUC-info {text-align:right} #GMSUC-info a {font:small sans-serif;text-decoration:none}  #GMSUC-info a:hover {background:"+GMSUCfgColor+";color:"+GMSUCbgColor+"}");
				// Lang detection and apply
				var Langues="en, fr";var lang=navigator.language;var reg=new RegExp(lang,"g");if(!Langues.match(lang)) lang="en";
				/* traductions / translations */
					var Txt=new Array();for(i=1;i<7;i++) {Txt[i]=new Array();} 
					// français
					Txt[1]["fr"]="Vous utilisez la version";Txt[2]["fr"]="du script";Txt[3]["fr"]="La version officielle est différente";Txt[4]["fr"]="installer";Txt[5]["fr"]="voir le code";Txt[6]["fr"]="propulsé par";
					// english
					Txt[1]["en"]="You're using";Txt[2]["en"]="version of";Txt[3]["en"]="script. Official release version is different";Txt[4]["en"]="install";Txt[5]["en"]="view code";Txt[6]["en"]="powered by";
				/* ------------------------------- */	
				var alerte=document.createElement('div');
				alerte.setAttribute('id','GMSUC-alerte');
				var GMSUCtextAlerte=Txt[1][lang]+" "+version+" "+Txt[2][lang]+" <i><b>"+scriptName+"</b></i>";	GMSUCtextAlerte+=". "+Txt[3][lang]+" (<a href='http://userscripts.org/scripts/show/"+scriptId+"'>"+offRel+"</a>)";GMSUCtextAlerte+="";GMSUCtextAlerte+="<table><tr><td><a href='http://userscripts.org/scripts/show/"+scriptId+"'>v."+offRel+"</a></td><td><a href='http://userscripts.org/scripts/review/"+scriptId+"'>"+Txt[5][lang]+"</a></td><td><a  href='http://userscripts.org/scripts/source/"+scriptId+".user.js'>"+Txt[4][lang]+"</a></td></tr></table>"
				if(GMSUCtime>0) GMSUCtextAlerte+="<div id='GMSUC-timer'>"+GMSUCtime+" s</div>";
				GMSUCtextAlerte+="<div id='GMSUC-info'>"+Txt[6][lang]+" <a href='http://userscripts.org/scripts/show/35611'>GM Script Update Control</a></div>";
				document.body.appendChild(alerte);document.getElementById('GMSUC-alerte').innerHTML=GMSUCtextAlerte;
				if(GMSUCtime>0) {function disparition() {if(GMSUCtime>0) {
							document.getElementById("GMSUC-timer").innerHTML=GMSUCtime+" s";
							GMSUCtime+=-1;
							setTimeout(disparition,1000)}
						else document.getElementById("GMSUC-alerte").setAttribute("style","display:none");
						} disparition();}}}});}

/******************* STYLES **********************************/	
GM_addStyle(".surligne0 td {background:#f95 ! important} .surligne1 td {background:#fd5 ! important} .surligne2 td {background:#ff5 ! important} .surligne {border: medium solid black ! important}");
GM_addStyle("#Ads2007menu {position:absolute;top:1px;left:1px;margin:0;padding:1px;width:300px;background:#005FB8;border:white 1px solid;color:white;font-size:12px;z-index:100} #Ads2007menu a {color:white;font-weight:bold;font-size:12px} #Ads2007menu ul{margin:0}");
GM_addStyle("#Ads2007info {text-align:right;font-size:small;padding:0 2px 2px 0} #Ads2007info a {color:white;font-size:small;font-weight:normal;text-decoration:underline}");

/**************** EXECUTION ********************************/		
/* sur la page pilotage_alerte_date_limite.do? */
/* mise en place automatique de la date et du délai limite */
/* if(document.title=="[ADS] PILOTAGE ALERTE DATE LIMITE") {
	var dateFin=document.getElementById('ZZDTO_PERIODE_RECHERCHE-XDATE_FIN').value;
	var annee=eval(right(dateFin,4))-1;
	var dateDebut=left(dateFin,dateFin.length-4)+""+annee;
	document.getElementById('ZZDTO_PERIODE_RECHERCHE-XDATE_DEBUT').value=dateDebut;
	document.getElementById('ZZDTO_PERIODE_RECHERCHE-XDELAI').value=10;
	alert("l'outil a mis à jour les dates et le délai.\n Il n'y a plus qu'à appuyer sur le bouton...");
	}
/* surlignage des PC potentiellement à problème */
/*	var Cases=document.getElementsByTagName("td");
	for(var i=0;i<Cases.length;i++) {
		// identification des PC
		if(Cases[i].innerHTML.match("PC ")) {
			// surlignage pour les saisies en cours et délais <10 avec couleurs différentes en fonction du délai restant
			if(Cases[i+2].innerHTML.match("Saisie en cours")) {
				var delai=Cases[i+4].innerHTML;
				Cases[i].parentNode.setAttribute("class","surligne2");
				if(delai<7) Cases[i].parentNode.setAttribute("class","surligne1");
				if(delai<3) Cases[i].parentNode.setAttribute("class","surligne0");
				}
			}	
		}
		
/* mise en place d'une analyse sur un mois */
var p=window.location.href;
if(right(p,18)=="man_volumetrie.do?" || right(p,17)=="man_volumetrie.do" || right(p,19)=="dossier_tableau.do?" || right(p,18)=="dossier_tableau.do") {
	// se place en début de mois précédent
	var today=new Date(); var month=today.getMonth(); var year;
	if(month==0) {month=12;year=today.getFullYear()-1;}
	else year=today.getFullYear();
	var dateDebut=1+"/"+month+"/"+year;
	if(month==12) {month=1;year=year+1}
	date=new Date();
	date.setFullYear(year);date.setMonth(month-1);date.setDate(0);
	var dateFin=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
	document.getElementById('ZZDTO_PERIODE_RECHERCHE-XDATE_DEBUT').value=dateDebut;
	document.getElementById('ZZDTO_PERIODE_RECHERCHE-XDATE_FIN').value=dateFin;
	}
/* mise en place d'une analyse sur un an au jour d'aujourd'hui */	
if(right(p,31)=="pilotage_alerte_date_limite.do?" || right(p,30)=="pilotage_alerte_date_limite.do") {
	// se place en début de mois l'année précédente
	var today=new Date(); var day=today.getDate(); var month=today.getMonth()+1; var year=today.getFullYear();
	var dateFin=day+"/"+month+"/"+year;
	var dateDebut=day+"/"+month+"/"+(year-1);
	document.getElementById('ZZDTO_PERIODE_RECHERCHE-XDATE_DEBUT').value=dateDebut;
	document.getElementById('ZZDTO_PERIODE_RECHERCHE-XDATE_FIN').value=dateFin;
	document.getElementById('ZZDTO_PERIODE_RECHERCHE-XDELAI').value=10;
	}
	
	/* surlignage des PC potentiellement à problème */
	var Cases=document.getElementsByTagName("td");
	for(var i=0;i<Cases.length;i++) {
		// identification des PC
		if(Cases[i].innerHTML.match("PC ")) {
			// surlignage pour les saisies en cours et délais <10 avec couleurs différentes en fonction du délai restant
			if(Cases[i+2].innerHTML.match("Saisie en cours")) {
				var delai=Cases[i+4].innerHTML;
				Cases[i].parentNode.setAttribute("class","surligne2");
				if(delai<7) Cases[i].parentNode.setAttribute("class","surligne1");
				if(delai<3) Cases[i].parentNode.setAttribute("class","surligne0");
				}
			}	
		}
		
/* mise en place du menu en haut */
var menuHtml="<table><tr>";
menuHtml+="<td><ul><li><a href='http://ads.application.i2/servlet/accueil_pilotage.do?'>Edition A</a></li><li><a href='http://ads.application.i2/servlet/man_volumetrie.do?'>Edition J</a></li><li><a href='http://ads.application.i2/servlet/dossier_tableau.do?'>Edition D</a></li></li></ul></td>";
menuHtml+="<td><ul><li><a href='http://ads.application.i2/servlet/pilotage_alerte_date_limite.do?'>Alertes</a></li></ul></td>";
menuHtml+="</tr></table><div id='Ads2007info'><a href='http://intra.dre-haute-normandie.i2/articles.php3?id_article=6209'>à propos de l'assistant ADS 2007</a></div>";

var menuDiv=document.createElement("div");
	menuDiv.setAttribute("id","Ads2007menu");
	menuDiv.innerHTML=menuHtml;
	document.body.appendChild(menuDiv);
/********************************************************************************************/
/* Fonctions support */
function right(texte,longueur) {
	return(texte.substr(texte.length-longueur));
	}
function left(texte,longueur) {
	return(texte.substr(0,longueur));
	}