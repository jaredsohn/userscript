// ==UserScript==
// @name				NemexiaOzone
// @namespace		http://davy8.free.fr/gmscripts
// @description	Calculateur d'Ozone pour Nemexia
// @version			0.8.1
// @icon 			http://www.nemexia.fr/img/gate/race_icon_1.ico
// @include			http://game.nemexia.*
// ==/UserScript==
// -----------------------------------------------------------------------------
// "Constantes"
// -----------------------------------------------------------------------------
// Nombre de points d'ozone perdus par jour et par niveau de batiment
const iOzoneLevelFactor = 10;
// Points d'ozone produits par niveau d'Ecologie
const iOzoneProdFactor = 250;
// Prefix de nommage des cookies pour le stockage de l'ozone
const sCookiePrefix = 'NemexiaOzone_';
// Durée de vie des cookies (en secondes)
const iCookieTTL = 3600;
// Page du laboratoire
const sPageLab = 'laboratory.php';
// Page du laboratoire en ajax pour récupérer le niveau d'écologie
const sAjaxLabPage = 'http://game.nemexia.fr/ajax_laboratory.php';
// Liste des pages pour lesquelles il faut stocker la perte d'ozone
const aOzonePages = new Array(
	'zone_resource.php',
	'zone_industry.php',
	'zone_military.php'
);
// Cookie contenant la production d'ozone
const sCookieProd = "production";
// Couleurs pour l'affichage
const sCoulVerte = '#99ff99';
const sCoulRouge = '#ff3333';
// Id de l'element dans laquelle on va afficher les infos
const sOzoneElmId = "ozoneSpan";
// -----------------------------------------------------------------------------
// Variables globales
// -----------------------------------------------------------------------------
// URL
var sPath = window.location.pathname;
// Nom de la page
var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
// Liste des planètes
var aPlanetIds = new Array();
// Planète actuellement sélectionnée
var iActivePlanetId = 0;
// Consommation d'ozone de la planète actuelle, par page
var aCurrentPlanetCons = new Array();
// Production d'ozone (Ecologie)
var iOzoneProduced = 0;
// -----------------------------------------------------------------------------
// Fonctions
// -----------------------------------------------------------------------------
/**
 * Enregistre un cookie
 * @see http://www.w3schools.com/JS/js_cookies.asp
 */
function setCookie(c_name, value, ttl){
	var exdate = new Date();
	if(ttl > 0){
		exdate.setTime(exdate.getTime() + (ttl * 1000));
	}
	
	var c_value = escape(value) + ((ttl == null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie = c_name + "=" + c_value;
}
// -----------------------------------------------------------------------------
/**
 * Recupère la valeur d'un cookie
 * @see http://www.w3schools.com/JS/js_cookies.asp
 */
function getCookie(c_name){
	var i, x, y;
	
	var ARRcookies = document.cookie.split(";");
	
	for(i=0 ; i < ARRcookies.length ; i++){
		x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
		y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
		x = x.replace(/^\s+|\s+$/g,"");
		if(x == c_name){ return unescape(y); }
	}
}
// -----------------------------------------------------------------------------
/**
 * Verifie que sString existe dans aArray
 */
function in_array(sString, aArray){
	var bRet = false;
	for(var i in aArray){
		if(aArray[i] == sString){
			bRet = true; break;
		}
	}
	return bRet;
}
// -----------------------------------------------------------------------------
/**
 * Parse la query GET dans l'url sUrl
 */
function parseQuery(sUrl){
	var aRet = new Array();
	
	var indQ = sUrl.indexOf('?');
	if(indQ < 0){ indQ = 0; }
	else{ indQ++; }
	
	var sQuery = sUrl.substr(indQ);
	
	// Retrait du fragment, si il y a
	var indFrag = -1;
	if((indFrag = sQuery.indexOf('#')) > 0){
		sQuery = sQuery.substr(0, indFrag);
	}
	
	var aValues = sQuery.split('&');
	for(var i in aValues){
		var aPair = aValues[i].split('=');
		if(aPair.length >= 2){
			aRet[aPair[0]] = aPair[1];
		}
	}
	
	return aRet;
}
// -----------------------------------------------------------------------------
/**
 * Recupère la liste des id de planètes controlées par le joueur et les insère
 * dans la variable globale 'aPlanetIds'
 * Met l'id de la planète active dans la variable globale 'iActivePlanetId'
 */
function getPlanets(){
	// Init des variables globales
	aPlanetIds			= new Array();
	iActivePlanetId	= 0;

	var eLstPlanets = document.getElementById("planetsListHolder");
	
	// Liste des planètes
	for(var i in eLstPlanets.childNodes){
		var eNode = eLstPlanets.childNodes[i];
		if(eNode.nodeName != 'LI'){ continue; }
		
		// Url de la planet
		var aPlanetQuery = parseQuery(eNode.firstChild.href);		
		var iPlanetId = parseInt(aPlanetQuery['id']);

		if(iPlanetId > 0){
			aPlanetIds.push(iPlanetId);
			if(eNode.className == 'active'){
				iActivePlanetId = iPlanetId;
			}
		}
	}
}
// -----------------------------------------------------------------------------
/**
 * Récupère la production d'Ozone du joueur (par rapport au niveau d'écologie)
 * Ne retourne pas la valeur étant donné qu'on ne la récupère qu'à la fin
 * de la requête HTTP, c'est à dire 'on ne sait quand'
 */
function updateOzoneProduction(){
	// en ajax : http://game.nemexia.fr/ajax_laboratory.php
	// en post : type=loadScience
	// FIXME -> A revoir parce que le parsing n'est pas terrible
	GM_xmlhttpRequest({
		method: 'POST',
		url: sAjaxLabPage,
		headers: {
			'Content-type': 'application/x-www-form-urlencoded'
		},
		data: 'type=loadScience',
		onload: function(response) {
			// Recup les science avancées
			var eTempDiv = document.createElement('div');
			eTempDiv.innerHTML = JSON.parse(response.responseText)[2];
			
			var eEco = null;
			
			// researchThumb-13 correspond toujours à l'écologie
			var aDivs = eTempDiv.getElementsByTagName('div');
			for(var i in aDivs){
				if(aDivs[i].id == 'researchThumb-13'){
					eEco = aDivs[i];
					break;
				}
			}
			
			var sEco = eEco.innerHTML.substr(eEco.innerHTML.indexOf('<b>') + 3);
			sEco = sEco.substr(0, sEco.indexOf('</b>'));
			iOzoneProduced = parseInt(sEco) * iOzoneProdFactor;
			
			setCookie(sCookiePrefix + sCookieProd, iOzoneProduced, iCookieTTL);
			
			updateOzoneDisplay();
		}
	});
}
// -----------------------------------------------------------------------------
/**
 * Récupère la consommation d'ozone de la planète active
 */
function updateOzoneConsumption(){
	// Chaque page a fetcher
	for(var iPageNum in aOzonePages){
		var sUrl =	window.location.protocol + "//" + 
						window.location.host + "/" +
						aOzonePages[iPageNum];
		
		GM_xmlhttpRequest({
			method: 'GET',
			url: sUrl,
			pageNum: iPageNum,
			onload: function(response) {
				var sContent = response.responseText;
				
				var iIndBuild = 0;
				if((iIndBuild = sContent.indexOf('BuildingsInfo', iIndBuild)) < 0){
					return;
				}
				
				// On restreint le code au JS pour éviter de tout parser a chaque fois
				sContent = sContent.substring(
					sContent.lastIndexOf("<script", iIndBuild),
					sContent.indexOf("</script>", iIndBuild)
				);

				var BuildingsInfo = new Array();
				var sEval = "";
								
				iIndBuild = 0;
				while((iIndBuild = sContent.indexOf('BuildingsInfo[', iIndBuild)) >= 0){
					var iFinVar = sContent.indexOf('};', iFinVar) + 2;
					
					sEval += sContent.substring(iIndBuild, iFinVar) + "\n";
					
					iIndBuild = iFinVar;
				}
				eval(sEval);
				
				// Recapitulatif de la consomation des batiments sur la page web
				aCurrentPlanetCons[this.pageNum] = 0;
				for(var i in BuildingsInfo){
					aCurrentPlanetCons[this.pageNum] += (BuildingsInfo[i]['current_level'] * iOzoneLevelFactor);
				}
				
				setCookie(sCookiePrefix + "_Planet_" + iActivePlanetId, aCurrentPlanetCons.join(','), iCookieTTL);
				
				updateOzoneDisplay();
			}
		});
	}
}
// -----------------------------------------------------------------------------
/**
 * Met a jour la production et la consommation
 */
function updateAllOzone(){
	updateOzoneProduction();
	updateOzoneConsumption();
}
// -----------------------------------------------------------------------------
/**
 * Affiche la conso/production d'ozone dans la page
 * Si les valeurs sont déja affichées, mise à jour
 */
function updateOzoneDisplay(){
	// Total d'ozone perdu sur tous les batiments
	var iTotalOzone = 0;
	for(var i in aCurrentPlanetCons){
		iTotalOzone += aCurrentPlanetCons[i];
	}
	
	// Contenu à afficher
	var sSpanContent =	"<a href=\"#\" id=\"ozoneUpdateLink\" title=\"Update\">Ozone</a> : " + 
								"<font color=\"" + ((iTotalOzone > iOzoneProduced)?sCoulRouge:sCoulVerte) + "\">" + 
									((iTotalOzone <= 0)?0:iTotalOzone) + 
								"</font>" + 
								" / " + 
								"<font color=\"" + sCoulVerte + "\">" + 
									((iOzoneProduced <= 0)?0:iOzoneProduced) + 
								"</font>";

	var ozoneElm = document.getElementById(sOzoneElmId);
	
	// Maj si l'element existe
	if(ozoneElm != null){
		ozoneElm.innerHTML = sSpanContent;
	}
	// Creation de l'element
	else{
		document.getElementById('mainMenu').innerHTML += " | <span id=\"" + sOzoneElmId + "\">" + sSpanContent + "</span>";
	}
	
	// Evenement onclick pour le lien de mise a jour
	document.getElementById('ozoneUpdateLink').addEventListener("click", updateAllOzone, true);
}
// -----------------------------------------------------------------------------
// Script
// -----------------------------------------------------------------------------
// Recup des infos sur les planètes
getPlanets();

// Recuperation des infos en cookie, pour éviter de faire des requetes
// tout le temps
var sCookie = "";

// Recup en cookie de la conso d'ozone pour la planete active
sCookie = getCookie(sCookiePrefix + "_Planet_" + iActivePlanetId);
if(sCookie == null){
	updateOzoneConsumption();
}
else{
	var aTemp = sCookie.split(',');
	if(aTemp.length >= 3){
		aCurrentPlanetCons = new Array();
		for(var i in aTemp){
			aCurrentPlanetCons[i] = parseInt(aTemp[i]);
		}
	}
}

// Quantité d'ozone produite, recup en cookie
sCookie = getCookie(sCookiePrefix + sCookieProd);
if(sCookie == null){
	updateOzoneProduction();
}
else{
	iOzoneProduced = parseInt(sCookie);
}
// -----------------------------------------------------------------------------
// Maj de la production quand on va sur la page du labo
if(sPage == sPageLab){
	updateOzoneProduction();
}
// TODO -> Maj de la consommation quand on va sur une des pages de batiments
else{

}
// -----------------------------------------------------------------------------
// Affichage des données
updateOzoneDisplay();
// -----------------------------------------------------------------------------
