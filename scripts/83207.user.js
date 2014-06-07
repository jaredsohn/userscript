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
// @name           Premium bar for Tribal Wars Multi-Language
// @namespace      www.tribalwars.net
// @description    Premium bar to tribalwars multi-language iniatialize with language Portuguese 
// @include        http://*.tribalwars.*
// @include        https://*.tribalwars.*  
// @version        2.0
// ==/UserScript==

//en = English
//lt = Lithuanian
//ae = Arabic
//br = Braileiro
//it = Italian
//hu = Hungarian
//nl = Dutch
//se = Swedish
//tur = Turkish
var lang = "br";   // Language option


//Do Not Touch
function functionMain(e) {
	var b = document.getElementById('firsttime');

	if (b==null) {
		var ot = document.createElement('div'); // Added this element, hence the script must run only one time (without it, sometimes it will be 2 or 3 premium menus)
		ot.setAttribute('id','firsttime');
		document.getElementsByTagName('body')[0].appendChild(ot);
		
		var langArr = new Array(8);
		if (lang == "en") {   // English
			langArr[0] = "Village Headquarters";
			langArr[1] = "Barracks";
			langArr[2] = "Stable";
			langArr[3] = "Workshop";
			langArr[4] = "Academy";
			langArr[5] = "Smithy";
			langArr[6] = "Rally Point";
			langArr[7] = "Market";
		}
		if (lang == "lt") {   // Lithuanian
			langArr[0] = "Rotušė";
			langArr[1] = "Kareivinės";
			langArr[2] = "Arklidės";
			langArr[3] = "Dirbtuvės";
			langArr[4] = "Akademija";
			langArr[5] = "Kalvė";
			langArr[6] = "Susibūrimo vieta";
			langArr[7] = "Turgus";
		}
                if (lang == "ae") {   // Arabic
			langArr[0] = "مركز القريه   ";
			langArr[1] = "الثكنات   ";
			langArr[2] = "لاسطبل";
			langArr[3] = "الورشه   ";
			langArr[4] = "الاكادميه   ";
			langArr[5] = "الحداد   ";
			langArr[6] = "نقطة التجمع   ";
			langArr[7] = "السوق";
		}
		if (lang == "br") {   // Spanish
			langArr[0] = "Edifico Principal";
			langArr[1] = "Quartel";
			langArr[2] = "Estábulo";
			langArr[3] = "Oficina";
			langArr[4] = "Academia";
			langArr[5] = "Ferreiro";
			langArr[6] = "Praça de Reunião";
			langArr[7] = "Mercado";
		}
                if (lang == "it") {   // Italian
			langArr[0] = "Quartier generale   ";
			langArr[1] = "Caserma   ";
			langArr[2] = "Stalla";
			langArr[3] = "Officina   ";
			langArr[4] = "Fabbro   ";
			langArr[5] = "Accademia   ";
			langArr[6] = "Punto di raduno   ";
			langArr[7] = "Mercato";
		}
                if (lang == "hu") {   // Hungarian
			langArr[0] = "Főhadiszállás";
			langArr[1] = "Barakk";
			langArr[2] = "Istálló";
			langArr[3] = "Műhely";
			langArr[4] = "Akadémia";
			langArr[5] = "Kovácsműhely";
			langArr[6] = "Gyülekezőhely";
			langArr[7] = "Piac";
		}
		if (lang == "nl") {   // dutch
			langArr[0] = "Hoofdgebouw   ";
			langArr[1] = "Kazerne   ";
			langArr[2] = "Stal";
			langArr[3] = "Werkplaats   ";
			langArr[4] = "Adelshoeve   ";
			langArr[5] = "Smederij   ";
			langArr[6] = "Verzamelplaats   ";
			langArr[7] = "Markt";
		}
                if (lang == "se") { // Swedish
                        langArr[0] = "Högkvarter"; 
                        langArr[1] = "Barack"; 
                        langArr[2] = "Stall"; 
                        langArr[3] = "Verkstad"; 
                        langArr[4] = "Akademi"; 
                        langArr[5] = "Smedja"; 
                        langArr[6] = "Samlingsplats"; 
                        langArr[7] = "Marknad";
                }
                if (lang == "tur") { // Turkish
                       langArr[0] = "Merkez Bina"; 
                       langArr[1] = "Kisla"; 
                       langArr[2] = "At Ciftligi"; 
                       langArr[3] = "Atolye"; 
                       langArr[4] = "Akademi"; 
                       langArr[5] = "Arastirma Binasi"; 
                       langArr[6] = "Harekat Merkezi"; 
                       langArr[7] = "Market";
               }

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
			newShortcut("/graphic/buildings/main.png", "/game.php?village="+VillId+"&screen=main", langArr[0]);
			newShortcut("/graphic/buildings/barracks.png", "/game.php?village="+VillId+"&screen=barracks", langArr[1]);
			newShortcut("/graphic/buildings/stable.png", "/game.php?village="+VillId+"&screen=stable", langArr[2]);
			newShortcut("/graphic/buildings/garage.png", "/game.php?village="+VillId+"&screen=garage", langArr[3]);
			newShortcut("/graphic/buildings/snob.png", "/game.php?village="+VillId+"&screen=snob", langArr[4]);
			newShortcut("/graphic/buildings/smith.png", "/game.php?village="+VillId+"&screen=smith", langArr[5]);
			+ "<tr>   " + 
			newShortcut("/graphic/buildings/place.png", "/game.php?village="+VillId+"&screen=place", langArr[6]);
			newShortcut("/graphic/buildings/market.png", "/game.php?village="+VillId+"&screen=market", langArr[7]);
			tableIdIndex++;
			trIdIndex++;
		}
	}
}

if (window.addEventListener) {
	window.addEventListener('load', functionMain, false);
} else {
	window.attachEvent('onload', functionMain);
}