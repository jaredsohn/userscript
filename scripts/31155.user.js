// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "EasyAcces bar for TribalWars", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           EasyAcces bar for TribalWars
// @namespace      EasyAcces bar for TribalWars
// @include        http://ro*.triburile.ro/*
// @include        http://en*.tribalwars.net/*
// @include        http://en*.ds.ignames.net/*
// @include        http://nl*.tribalwars.nl/*
// @include        http://cs*.divokekmeny.cz/*
// @include        http://sv*.tribalwars.se/*
// @include        http://s*.tribalwars.es/*
// @include        http://s*.tribalwars.fr/*
// @include        http://s*.tribalwars.it/*
// @include        http://pl*.plemiona.pl/*
// @include	       http://*.ds.ignames.net/*
// @version        1.0
// ==/UserScript==

var languages = {
  "ro" : {	"main"     : "Cladirea principala",
  			"barracks" : "Cazarma",
			"stable"   : "Grajd",
			"garage"   : "Atelier",
			"snob"     : "Curtea nobila",
			"smith"    : "Fierarie",
			"place"    : "Piata centrala",
			"market"   : "Targ"},
  "en" : {	"main"     : "Main building",
  			"barracks" : "Barracks",
			"stable"   : "Stable",
			"garage"   : "Garage",
			"snob"     : "Noble house",
			"smith"    : "Blacksmith",
			"place"    : "Command centre",
			"market"   : "Market"}
  }
var lg;	
var lg=languages['en'];

tableIdIndex = 0;
trIdIndex = 0;
tdIdIndex = 0;

var imgsrc="http://ro5.triburile.ro/graphic/buildings/";

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
 VillId = "village="+rawVillId.substring(41,46)+"&"; //village=ID&
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
	else if(tdIdIndex == 5){
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
if (VillId!="village=vervi&"){
	newShortcut(imgsrc+"main.png", "/game.php?"+VillId+"screen=main", lg['main']+"      ");
	newShortcut(imgsrc+"barracks.png", "/game.php?"+VillId+"screen=barracks", lg['barracks']+"      ");
	newShortcut(imgsrc+"stable.png", "/game.php?"+VillId+"screen=stable", lg['stable']+"      ");
	newShortcut(imgsrc+"garage.png", "/game.php?"+VillId+"screen=garage", lg['garage']+"      ");
	newShortcut(imgsrc+"snob.png", "/game.php?"+VillId+"screen=snob", lg['snob']+"      ");
	newShortcut(imgsrc+"smith.png", "/game.php?"+VillId+"screen=smith", lg['smith']+"      ");
	newShortcut(imgsrc+"place.png", "/game.php?"+VillId+"screen=place", lg['place']+"      ");
	newShortcut(imgsrc+"market.png", "/game.php?"+VillId+"screen=market", lg['market']);
    tableIdIndex++;
	trIdIndex++;
	}
}