// ==UserScript==
// @name           البار السريع
// @namespace      Premium Quick Bar for Tribal Wars
// @description    البار السريع بدون عضوية خاصة
// @icon           http://a2.sphotos.ak.fbcdn.net/hphotos-ak-snc7/s320x320/380415_175908812504783_100002569976331_320065_411828996_n.jpg
// @author         Hawalta
// @version        1.0
// @include        http://ae*.tribalwars.ae/game.php*
// @copyright      Copyright (c) 2011 , Hawalta
// ==/UserScript==


var lang = "en";   // Language option


//Do Not Touch
function functionMain(e) {
	var b = document.getElementById('firsttime');

	if (b==null) {
		var ot = document.createElement('div'); // Added this element, hence the script must run only one time (without it, sometimes it will be 2 or 3 premium menus)
		ot.setAttribute('id','firsttime');
		document.getElementsByTagName('body')[0].appendChild(ot);
		
		var langArr = new Array(8);			
		langArr[0] = "المبنى الرئيسي";
		langArr[1] = "الثكنات";
		langArr[2] = "الاسطبل";
		langArr[3] = "الورشة";
		langArr[4] = "الأكاديمية";
		langArr[5] = "الحداد";
		langArr[6] = "نقطة التجمع";
		langArr[7] = "السوق";
		langArr[8] = "profile";
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
		var strFrameType = "0";
		if(document.getElementsByTagName("frameset")[0]){
			if(document.getElementsByTagName("frameset")[0].cols){
				document.getElementsByTagName("frameset")[0].cols = "*, 1";
				Hauptframe = frames[0].document;
				strFrameType = "1";
			} else if(document.getElementsByTagName("frameset")[0].rows){
				document.getElementsByTagName("frameset")[0].rows = "1, *";
				Hauptframe = frames[1].document;
				strFrameType = "2";
			} else { 
				Hauptframe = document;
				strFrameType = "3";
			}
		} else { 
			Hauptframe = document;
			strFrameType = "4";
		}
		//Village-Id holen
		 var rawVillId = String(Hauptframe.location);
		 VillId = rawVillId.substring(rawVillId.indexOf("village=")+8, rawVillId.indexOf("&"));
		//alert(VillId + "::" + strFrameType);
		//Quickbar erstellen
		createQuickbarTable();
		createQuickbarShortcuts();
		//Werbung im Forum entfernen
		//deleteForumAds();
		}, 500);
		}
		}
		}

		//Werbung im Forum lฬฆschen:
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
			if(imgSrc != "") {
				var newImg = document.createElement("img");
				newImg.setAttribute("src", imgSrc);
			}
			var newA = document.createElement("a");
			newA.setAttribute("href", aHref);
			if(imgSrc != "") {
				newA.appendChild(newImg);
			}
			var newText = document.createTextNode(text);
			newA.appendChild(newText);			
			var newTd = document.createElement("td");
			newTd.setAttribute("id", "myQuickbarTd"+tdIdIndex);
			if(tdIdIndex == 0){
				newTd.setAttribute("class", "icon-box firstcell"); 
			} else if(tdIdIndex == 7){
				newTd.setAttribute("class", "icon-box"); 
			} else {
				newTd.setAttribute("class", "icon-box"); 
			}
			Hauptframe.getElementById("myQuickbarTr"+trIdIndex).appendChild(newTd);
			Hauptframe.getElementById("myQuickbarTd"+tdIdIndex).appendChild(newA);
			tdIdIndex++;
		}

		window.createQuickbarTable = function() {
			var firstHR = Hauptframe.getElementsByTagName("hr")[0];
			//alert(firstHR.getAttribute("class"));
			var parentDiv = firstHR.parentNode;
			var newTable = document.createElement("table");
			newTable.setAttribute("id", "myQuickbarTableOuter"+tableIdIndex);
			//newTable.setAttribute("style", "margin:2px auto auto; padding:10px;");
			newTable.setAttribute("class", "header-border");
			newTable.setAttribute("align", "center");
			
			var myQuickbarTable = parentDiv.insertBefore(newTable, firstHR);			
			var newTr = document.createElement("tr");
			newTr.setAttribute("id", "myQuickbarOuterTr0");			
			newTr.setAttribute("style", "height: 20px;");
			newTr.setAttribute("align", "left");
			myQuickbarTable.appendChild(newTr);
			
			var newTDOuter = document.createElement("td");
			newTr.appendChild(newTDOuter);
			
			var newTable1 = document.createElement("table");
			newTable1.setAttribute("id", "myQuickbarTable"+tableIdIndex);			
			newTable1.setAttribute("class", "box  menu nowrap");
			newTable1.setAttribute("cellspacing", "0");
			newTable1.setAttribute("style", "empty-cells:show;");
			newTable1.setAttribute("align", "center");
			newTDOuter.appendChild(newTable1);
			
			var newTr1 = document.createElement("tr");
			newTr1.setAttribute("id", "myQuickbarTr0");
			newTr1.setAttribute("style", "height: 20px;");
			newTr1.setAttribute("align", "left");
			newTable1.appendChild(newTr1);
			
			
			
			//alert(myQuickbarTable.getAttribute("id"));
			//var quickbarTable = Hauptframe.getElementById("myQuickbarTable"+tableIdIndex);
			//alert(quickbarTable.getAttribute("id"));
			
		}

		window.createQuickbarShortcuts = function() {
			//"<tr>   " + 
			newShortcut("/graphic/buildings/main.png", "/game.php?village="+VillId+"&screen=main", langArr[0]);
			newShortcut("/graphic/buildings/barracks.png", "/game.php?village="+VillId+"&screen=barracks", langArr[1]);
			newShortcut("/graphic/buildings/stable.png", "/game.php?village="+VillId+"&screen=stable", langArr[2]);
			newShortcut("/graphic/buildings/garage.png", "/game.php?village="+VillId+"&screen=garage", langArr[3]);
			newShortcut("/graphic/buildings/snob.png", "/game.php?village="+VillId+"&screen=snob", langArr[4]);
			newShortcut("/graphic/buildings/smith.png", "/game.php?village="+VillId+"&screen=smith", langArr[5]);
			//+ "<tr>   " + 
			newShortcut("/graphic/buildings/place.png", "/game.php?village="+VillId+"&screen=place", langArr[6]);
			newShortcut("/graphic/buildings/market.png", "/game.php?village="+VillId+"&screen=market", langArr[7]);
			//+ "<tr>   " + 
            newShortcut("/graphic/unit/unit_snob.png", "/game.php?village="+VillId+"&screen=info_player&id=0000000", langArr[8]);
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