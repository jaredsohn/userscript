// This is a Greasemonkey user script.
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
// @name           Premium bar for Tribal Wars
// @namespace      www.tribalwars.net
// @description    Premium bar for Tribalwars (Village Headquarters, Barracks , Stable , Workshop , Academy , Smithy , Rally Point , Market)  
// @include        http://*.tribalwars.net/*  
// @include        http://ae*.tribalwars.ae/* 
// @version        1.0
// ==/UserScript==

tableIdIndex = 0;
trIdIndex = 0;
tdIdIndex = 0;

if(String(document.location).indexOf("forum.php") < 0){
if(String(document.location).indexOf("help2.php") < 0){
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
}
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
		newTd.setAttribute("style", "border-width:1px; border-style:solid; border-color:#FFEECC #BB9955 #997733 #FFDD99; border-right-style:none; background-repeat:repeat-y; padding-left:4px; background-color:#F7EED3; padding-right:4px; border-spacing:1px;"); 
	}
	else if(tdIdIndex == 6){
		newTd.setAttribute("style", "border-width:1px; border-style:solid; border-color:#FFEECC #BB9955 #997733 #FFDD99; border-right-style:none; border-left:1px dotted; background-repeat:repeat-y; background-repeat:repeat-y; padding-left:4px; background-color:#F7EED3; padding-right:4px; border-spacing:1px;"); 
	}
	else if(tdIdIndex == 7){
		newTd.setAttribute("style", "border-width:1px; border-style:solid; border-color:#FFEECC #BB9955 #997733 #FFDD99; border-left-style:none; background-repeat:repeat-y; padding-left:4px; background-color:#F7EED3; padding-right:4px; border-spacing:1px;"); 
	}
	else{
		newTd.setAttribute("style", "border-width:1px; border-style:solid; border-color:#FFEECC #BB9955 #997733 #FFDD99; border-left-style:none; border-right-style:none; background-repeat:repeat-y; background-color:#F7EED3; padding-left:4px; padding-right:4px; border-spacing:1px;");
	}
	Hauptframe.getElementById("myQuickbarTr"+trIdIndex).appendChild(newTd);
	Hauptframe.getElementById("myQuickbarTd"+tdIdIndex).appendChild(newA);
	tdIdIndex++;
}

window.createQuickbarTable = function() {
	var firstHR = Hauptframe.getElementsByTagName("hr")[0];
	var newTable = document.createElement("table");
	newTable.setAttribute("id", "myQuickbarTable"+tableIdIndex);
	newTable.setAttribute("style", "margin:11px auto auto; width:840px; border-collapse:collapse; border-width:1px; border-style:solid; border-color:#997733 #FFDD99 #FFEECC #BB9955;");
	newTable.setAttribute("class", "menu nowrap");
	newTable.setAttribute("align", "center");
	var newTr = document.createElement("tr");
	newTr.setAttribute("id", "myQuickbarTr0");
	newTr.setAttribute("align", "center");
	Hauptframe.getElementsByTagName("body")[0].insertBefore(newTable, firstHR);
	Hauptframe.getElementById("myQuickbarTable"+tableIdIndex).appendChild(newTr);
}

window.createQuickbarShortcuts = function() {
	"<tr>   " + 
	newShortcut("/graphic/buildings/main.png", "/game.php?village="+VillId+"&screen=main", "مركز القرية   ");
	newShortcut("/graphic/buildings/barracks.png", "/game.php?village="+VillId+"&screen=barracks", "الثكنات   ");
	newShortcut("/graphic/buildings/stable.png", "/game.php?village="+VillId+"&screen=stable", "الاسطبل");
	newShortcut("/graphic/buildings/garage.png", "/game.php?village="+VillId+"&screen=garage", "الورشة   ");
    newShortcut("/graphic/buildings/snob.png", "/game.php?village="+VillId+"&screen=snob", "الاكديمية   ");
	newShortcut("/graphic/buildings/smith.png", "/game.php?village="+VillId+"&screen=smith", "الحداد   ");
	+ "<tr>   " + 
	newShortcut("/graphic/buildings/place.png", "/game.php?village="+VillId+"&screen=place", "نقطة التجمع  ");
    newShortcut("/graphic/buildings/market.png", "/game.php?village="+VillId+"&screen=market", "السوق");
tableIdIndex++;
	trIdIndex++;
}