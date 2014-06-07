// Ceci est un script Greasemonkey.
// 
// Pour l'avoir : Télécharger tout d'abord Mozilla Firefox à cette adresse : http://download.mozilla.org/?product=firefox-3.0.10&os=win&lang=fr, faites "Enregistrer" et le téléchargement va s'enclencher. Suivez ensuite les instructions d'installation.
// Ensuite aller ici : https://addons.mozilla.org/fr/firefox/downloads/latest/748/addon-748-latest.xpi et faites "Installer Maintenant" après 3 secondes.
// Redémarrez Mozilla Firefox.
// Ensuite télécharger le script là : http://userscripts.org/scripts/show/48014
// Acceptez la configuration de défaut et installer le script après 3 secondes. 
//
// Pour désinstaller le script : Aller dans Outils/Greasemonkey/Gérer les Scripts. Sélectionner le Script ( ici, le nom est "Toolbar Pour The West" ).
// Selectioner le et cliquez sur désinstaller.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Toolbar Pour The West
// @namespace      Toolbar Pour The West
// @description    Toolbar Pour The West ( En Français ) (Salle Polyvalente, Saloon, Église, Banque, Hôtel, Armurier, Tailleur, L'Épicerie, Ordonnateur de Pompes Funèbres ). Autres Instructions : A la place de tous les "xx" ligne 113, 114, 116, 118, 119, 121, 123, remplacer les par l'ID de votre ville ( Visible dans le classement, déposer la souris sur le nom de votre ville et dans la barre d'état ce sera écrit )
// @include        http://*.the-west.*/*  
// @version        0.1
// ==/UserScript==

tableIdIndex = 0;
trIdIndex = 0;
tdIdIndex = 0;

if(String(document.location).indexOf() > -1){
    window.setTimeout(function(){
	var adDiv = document.body.childNodes[5].childNodes[1].childNodes[0].childNodes[1].childNodes[5];
	 if(adDiv.childNodes[1] == "[object XPCNativeWrapper [object HTMLIFrameElement]]"){
		document.body.childNodes[5].childNodes[1].childNodes[0].childNodes[1].removeChild(adDiv);
	 }
	}, 500);
}
else{
window.setTimeout(function() {
// Supprimer la publicité (en tant que premier de préciser que "la maison cadre" peut être définie):
if(document.getElementsByTagName("frameset")[0]){
 if(document.getElementsByTagName("frameset")[0].cols){
 	document.getElementsByTagName("frameset")[0].cols = "*, 1";
	Hauptframe = frames[0].document;
 }
 else if(document.getElementsByTagName("frameset")[0].rows){
	document.getElementsByTagName("frameset")[0].rows = "1, *";
	Hauptframe = frames[1].document;
 }
 else Hauptframe = document;
}else Hauptframe = document;
//Village-Id apporter
 var rawVillId = String(Hauptframe.location);
 VillId = rawVillId.substring(rawVillId.indexOf("village=")+8, rawVillId.indexOf("&"));
//Quickbar erstellen
 createQuickbarTable();
 createQuickbarShortcuts();
//Werbung im Forum entfernen
 deleteForumAds();
}, 500);
}

//Werbung im Forum l?schen:
window.deleteForumAds = function(){
  if(Hauptframe.getElementsByTagName('iframe')[0]){
	var forumFrame = Hauptframe.getElementsByTagName('iframe')[0];
	var doc = forumFrame.contentDocument;
	var docBody = doc.getElementsByTagName('body')[0];
	var adDiv = docBody.childNodes[5].childNodes[1].childNodes[0].childNodes[1].childNodes[5];
	if(adDiv.childNodes[1] == "[object XPCNativeWrapper [object HTMLIFrameElement]]"){
		docBody.childNodes[5].childNodes[1].childNodes[0].childNodes[1].removeChild(adDiv);
	}
  }
}

window.newShortcut = function(imgSrc, aHref, text){
	var newImg = document.createElement("img");
	newImg.setAttribute("src", imgSrc);
	var newA = document.createElement("a");
	newA.setAttribute("href", aHref);
	newA.appendChild(newImg);
	var newText = document.createTextNode(text);
	newA.appendChild(newText);
	var newTd = document.createElement("td");
	newTd.setAttribute("id", "myQuickbarTd"+tdIdIndex);
	if(tdIdIndex == 0){
		newTd.setAttribute("style", "border-width:1px; border-style:solid; border-right-style:none; background-color:#F8F4E8; padding-left:4px; padding-right:4px; border-spacing:1px;"); 
	}
	else if(tdIdIndex == 8){
		newTd.setAttribute("style", "border-width:1px; border-style:solid; border-left-style:none; background-color:#F8F4E8; padding-left:4px; padding-right:4px; border-spacing:1px;"); 
	}
	else{
		newTd.setAttribute("style", "border-width:1px; border-style:solid; border-left-style:none; border-right-style:none; background-color:#F8F4E8; padding-left:4px; padding-right:4px; border-spacing:1px;");
	} 
	Hauptframe.getElementById("myQuickbarTr"+trIdIndex).appendChild(newTd);
	Hauptframe.getElementById("myQuickbarTd"+tdIdIndex).appendChild(newA);
	tdIdIndex++;
}
window.createQuickbarTable = function() {
	var firstHR = Hauptframe.getElementsByTagName("hr")[0];
	var newTable = document.createElement("table");
	newTable.setAttribute("id", "myQuickbarTable"+tableIdIndex);
	newTable.setAttribute("align", "center");
	newTable.setAttribute("style", "margin-top:5px;border-collapse:collapse;");
	var newTr = document.createElement("tr");
	newTr.setAttribute("id", "myQuickbarTr0");
	Hauptframe.getElementsByTagName("body")[0].insertBefore(newTable, firstHR);
	Hauptframe.getElementById("myQuickbarTable"+tableIdIndex).appendChild(newTr);
}

window.createQuickbarShortcuts = function() {
	"<tr>   " + 
	newShortcut("http://nsm01.casimages.com/img/2009/05/02//090502044446577973584863.png", "javascript:AjaxWindow.show('building_cityhall');", "Salle Polyvalente");

newShortcut("http://nsm01.casimages.com/img/2009/05/02//090502044447577973584864.png", "javascript:AjaxWindow.show('building_saloon');", "Saloon");
newShortcut("http://nsm01.casimages.com/img/2009/05/02//090502044443577973584859.png", "javascript:AjaxWindow.show('building_church',{town_id:xx},'xx');", "Église");
newShortcut("http://nsm01.casimages.com/img/2009/05/02//090502044443577973584858.png", "javascript:AjaxWindow.show('building_bank',{town_id:xx},'xx');", "Banque");

newShortcut("http://nsm01.casimages.com/img/2009/05/02//090502044444577973584860.png", "javascript:AjaxWindow.show('building_hotel',{town_id:xx},'xx');", "Hôtel");

newShortcut("http://nsm01.casimages.com/img/2009/05/02//090502044442577973584857.png", "javascript:AjaxWindow.show('building_gunsmith',{town_id:xx},'xx');", "Armurier");
newShortcut("http://nsm01.casimages.com/img/2009/05/02//090502044447577973584865.png", "javascript:AjaxWindow.show('building_tailor',{town_id:xx},'xx');", "Tailleur");

newShortcut("http://nsm01.casimages.com/img/2009/05/02//090502044444577973584861.png", "javascript:AjaxWindow.show('building_general',{town_id:xx},'xx');", "L'Épicerie");

newShortcut("http://nsm01.casimages.com/img/2009/05/02//090502044445577973584862.png", "javascript:AjaxWindow.show('building_mortician',{town_id:xx},'xx');", "Ordonnateur de Pompes Funèbres");

tableIdIndex++;
	trIdIndex++;
}