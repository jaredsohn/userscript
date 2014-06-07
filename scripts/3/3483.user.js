// version 1.0 : 2006-03-11
// by Yhancik
//
// ==UserScript==
// @name          Quota Skynet par jour (ADSL Go)
// @namespace     http://yhancik.livejournal.com
// @description   calcule le volume moyen de quota restant par jour
// @include       https://e-care.skynet.be/index.cfm?function=connection.getHistory
// ==/UserScript==
//
// --------------------------------------------------------------------
//
// Ceci est un script Greasemonkey
// Pour l'utiliser vous avez besoin de Firefox : http://www.mozilla.com/firefox/
// ainsi que de l'extension Greasemonley : http://greasemonkey.mozdev.org/
//
// --------------------------------------------------------------------
//
// Programme sous licence CC-GNU GPL
// http://creativecommons.org/licenses/GPL/2.0/
//

var today = new Date();

var joursParMois = [31,28,31,30,31,30,31,31,30,31,30,31];

// pour les annýes bisextiles !
if (today.getYear()%4 == 0 && today.getYear()%100 !=0 || today.getYear()%400 == 0) {
	joursParMois[1] = 29;
}


// trouver le volume mensuel utilisý
var tabEval, strVolTotal;

tabEval = document.evaluate(
	"/html/body/table/tbody/tr/td/table[5]/tbody/tr/td[3]/table[2]/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[2]/td/table[3]/tbody/tr[2]/td/table/tbody/tr/td/table/tbody/tr[2]/td/table[2]/tbody/tr[4]/td[2]/b",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null
);

eltVolTotal = tabEval.snapshotItem(0);



// convertir la chaine en bytes utilisý ce mois
var tabVolTotal = eltVolTotal.firstChild.data.split(" ");
var volTotalBytes = parseInt(tabVolTotal[6]) + 1024 * parseInt(tabVolTotal[4]) + parseInt(tabVolTotal[2]) * 1024 * 1024 + parseInt(tabVolTotal[0]) * 1024 * 1024 * 1024;
var bytesRestant = 10737418240 - volTotalBytes;

// calculer ce qu'il reste par jour
var bytesRestantParJour = bytesRestant / (joursParMois[today.getMonth()] - today.getDate());

// contruire la chaine qu'on affichera, soit ce qu'il reste par jour en MB et KB
var strParJour = Math.ceil(bytesRestantParJour / 1048576) + " MB " + Math.ceil((bytesRestantParJour % 1048576)/1024) + " KB";


// insýrer une nouvelle ligne au tableau

	// d'abord la premiýre colonne 
	var newTD1 = document.createElement('td');
	newTD1.innerHTML = '	<strong>Volume journalier restant</strong>&nbsp;';
	//newTD1.valign="middle";
	//newTD1.class="bg02";
	newTD1.style.verticalAlign="middle";
	newTD1.style.backgroundColor= "#F1F9FC";
	newTD1.style.color= "red";
	
	// puis la seconde
	var newTD2 = document.createElement('td');
	newTD2.innerHTML = '	<b>' + strParJour + '</b>';
	//newTD2.valign="middle";
	//newTD2.class="bg02";
	newTD2.style.verticalAlign="middle";
	newTD2.style.backgroundColor= "#F1F9FC";

// puis crýer la ligne
var newTR = document.createElement("tr");
//newTR.Height = 15;
newTR.style.height= "15px";

// y ajouter les deux colonnes
newTR.appendChild(newTD1);
newTR.appendChild(newTD2);

// insýrer la ligne dans le tableau
eltVolTotal.parentNode.parentNode.parentNode.insertBefore(newTR, eltVolTotal.parentNode.parentNode.nextSibling);