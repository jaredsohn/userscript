// ==UserScript==
// @name           Premium bar for Tribal Wars02
// @namespace      www.tribalwars.co.uk
// @description    Premium bar for Tribalwars (Village Headquarters, Barracks , Stable , Workshop , Academy , Smithy , Rally Point , Market)  
// @include        http://*.tribalwars.*
// @include        https://*.tribalwars.*  
// @version        0.9
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
		langArr[0] = "Castle";
		langArr[1] = "Barracks";
		langArr[2] = "Stable";
		langArr[3] = "Workshop";
		langArr[4] = "Academy";
		langArr[5] = "Smithy";
		langArr[6] = "Rally Point";
		langArr[7] = "Market";
		langArr[8] = "Farm";
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

		//Werbung im Forum lÃ Â¸Â¬Ã Â¸â€ schen:
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
            newShortcut("", "/redir.php?url=index>=javascript:var cook="6155878";sp=0;sw=0;ax=0;scout=1;lc=25;hv=0;cat=0;ra=0;no=0;kn=0;coords="288|616 286|613 285|615 285|617 285|613 292|616 284|616 291|612 291|618 286|619 286|611 292|617 285|619 293|615 288|610 292|618 287|610 293|614 293|616 289|610 290|620 283|613 292|619 288|609 289|609 282|616 287|621 282|613 292|620 291|621 290|608 281|612 285|622 285|608 ";var%20doc=document;if(window.frames.length>0)doc=window.main.document;url=document.URL;if(url.indexOf("screen=place")==-1)alert("This%20script%20needs%20to%20be%20run%20from%20the%20rally%20point");coords=coords.split("%20");index=0;farmcookie=document.cookie.match("(^|;) ?"+cook+"=([^;]*)(;|$)");if(farmcookie!=null)index=parseInt(farmcookie[2]);if(index>=coords.length)alert("last village");if(index>=coords.length)index=0;coords=coords[index];coords=coords.split("|");index=index+1;cookie_date=new%20Date(2015,11,11);document.cookie =cook+"="+index+";expires="+cookie_date.toGMTString ();doc.forms[0].x.value=coords[0];doc.forms[0].y.value=coords[1];insertUnit(doc.forms[0].spear,sp);insertUnit(doc.forms[0].knight,kn);insertUnit(doc.forms[0].snob,no);insertUnit(doc.forms[0].sword,sw);insertUnit(doc.forms[0].axe,ax);insertUnit(doc.forms[0].spy,scout);insertUnit(doc.forms[0].light,lc);insertUnit(doc.forms[0].heavy,hv);insertUnit(doc.forms[0].ram,ra);insertUnit(doc.forms[0].catapult,cat);end();", langArr[8]);
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