﻿// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Bara cu cladiri pt The-West
// @namespace      www.the-west.ro @description    Bara cu cladiri pentru The-West (Primarie ,Saloon , Biserica , Banca , Hotel, Armurier , Croitor , Magazin , Cioclu  
// @include        http://*.the-west.*/*  
// @version        2.0
// ==/UserScript==

tableIdIndex = 0;
trIdIndex = 0;
tdIdIndex = 0;

if(String(document.location).indexOf("http://ch1.ds.ignames.net/forum.php") > -1){
    window.setTimeout(function(){
	var adDiv = document.body.childNodes[5].childNodes[1].childNodes[0].childNodes[1].childNodes[5];
	 if(adDiv.childNodes[1] == "[object XPCNativeWrapper [object HTMLIFrameElement]]"){
		document.body.childNodes[5].childNodes[1].childNodes[0].childNodes[1].removeChild(adDiv);
	 }
	}, 500);
}
else{
window.setTimeout(function() {
//Werbung entfernen (muss als erstes gemacht werden, dass "Hauptframe" definiert werden kann):
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
//Village-Id holen
 var rawVillId = String(Hauptframe.location);
 VillId = rawVillId.substring(rawVillId.indexOf("village=")+8, rawVillId.indexOf("&"));
//Quickbar erstellen
 createQuickbarTable();
 createQuickbarShortcuts();
//Werbung im Forum entfernen
 deleteForumAds();
}, 500);
}

//Werbung im Forum l̦schen:
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
	newShortcut("http://ro1.the-west.ro/images/bank/city.png", "javascript:AjaxWindow.show('building_cityhall');", "Şehir Salonu");

newShortcut("http://bsienok.bs.funpic.org/thewesttoolbar/saloon.png", "javascript:AjaxWindow.show('building_saloon');", "Bar");
newShortcut("http://bsienok.bs.funpic.org/thewesttoolbar/church.png", "javascript:AjaxWindow.show('building_church',{town_id:14},'469_581');", "Kilise");
newShortcut("http://bsienok.bs.funpic.org/thewesttoolbar/bank2.png", "javascript:AjaxWindow.show('building_bank',{town_id:14},'469_581');", "Banka");

newShortcut("http://bsienok.bs.funpic.org/thewesttoolbar/hotel3.png", "javascript:AjaxWindow.show('building_hotel',{town_id:14},'469_581');", "Hotel");

newShortcut("http://bsienok.bs.funpic.org/thewesttoolbar/gunsmith2.png", "javascript:AjaxWindow.show('building_gunsmith',{town_id:14},'469_581');", "Silah Tüccari");
newShortcut("http://bsienok.bs.funpic.org/thewesttoolbar/tailor3.png", "javascript:AjaxWindow.show('building_tailor',{town_id:14},'469_581');", "Terzi");

newShortcut("http://bsienok.bs.funpic.org/thewesttoolbar/general3.png", "javascript:AjaxWindow.show('building_general',{town_id:14},'469_581');", "Züccaciye");

newShortcut("http://bsienok.bs.funpic.org/thewesttoolbar/mortician.png", "javascript:AjaxWindow.show('building_mortician',{town_id:14},'469_581');", "Cenaze Kaldırıcısı");

tableIdIndex++;
	trIdIndex++;
}