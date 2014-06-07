// ==UserScript==
// @name           non
// @namespace      www.grepolis.com
// @description    non
// @include        http://*.grepolis.*/game/index?town_id=* 
// @version        non
// ==/UserScript==.

//History
//0.0.3
//Add new links see image on the About page
//Add new image for the top link 
//
//bug's
//the top image and the background images are links to (NOT FIX YET)



//code 1
document.getElementById("links").getElementsByTagName("a")[8].innerHTML= "Help/Wiki";



var matches = {
"^http://[a-z0-9\s]+\.grepolis\.com/": "^grepolis - "
};

for (var url in matches) {
    if (location.href.match(new RegExp(url))) {
        document.title = document.title.replace(new RegExp(matches[url],'i'),'');
        break;
    }
}

//pass Alt+a to go to www.grepolis.com needs to be a www. in it
window.addEventListener('keypress', function(e) {
	if(a.altKey) {
		if(String.fromCharCode(e.charCode)=='a') location.href = 'http://www.grepolis.com/';
	}
}, false);


//Do Not Touch
function functionMain(e) {
	var b = document.getElementById('firsttime');

	if (b==null) {
		var ot = document.createElement('div'); // Added this element, hence the script must run only one time (without it, sometimes it will be 2 or 3 premium menus)
		ot.setAttribute('id','firsttime');
		document.getElementsByTagName('a')[0].appendChild(ot);
		
//e1 = English no words
//en = English
var lang = "en";   // Language option

		var langArr = new Array(3);
		if (lang == "e1") {   // no words
                        langArr[0] = "";    
			langArr[1] = "";  
			langArr[2] = "";  
			langArr[3] = "";  
			langArr[4] = "";  
			langArr[5] = "";  
			langArr[6] = "";  
			langArr[8] = "back 2";  
			langArr[12] = "back 1";  
			langArr[13] = "stats";
			langArr[14] = "map";
			langArr[15] = "update";
			langArr[16] = "tribalwars";  
			langArr[18] = "chatango";  
			langArr[19] = "Facebook";  
			langArr[20] = "Fan site";  
			langArr[21] = "Guide";
			langArr[22] = "innogames";
	        }
		if (lang == "en") {   // images  
			langArr[0] = "";
			langArr[1] = "";
			langArr[2] = "";
			langArr[3] = "";
			langArr[4] = "";
			langArr[5] = "";
			langArr[6] = "";
			langArr[7] = "";
			langArr[8] = "";
			langArr[9] = "";
			langArr[10] = "";
			langArr[11] = "";
			langArr[12] = "";
			langArr[13] = "";
			langArr[14] = "";
			langArr[15] = "";
			langArr[16] = "";
			langArr[17] = "";
			langArr[18] = "";
			langArr[19] = "";
			langArr[20] = "";
			langArr[21] = "";
			langArr[22] = "";
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
			}, 800);
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
		//city-Id holen
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
				newTd.setAttribute("style", "border-width:1px; border-style:Gold; border-color:#0e0eae #0e0eae #0e0eae #0e0eae; border-left-style:none; background-repeat:no-repeat;position:absolute;margin:-70px;width:22px;top:140px;left:399px;}#techtree .main_hide_not_possible{background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-left:4px; {background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-right:4px; border-spacing:1px;"); 
			}
			else if(tdIdIndex == 1){
				newTd.setAttribute("style", "border-width:1px; border-style:Gold; border-color:#0e0eae #0e0eae #0e0eae #0e0eae; border-left-style:none; background-repeat:no-repeat;position:absolute;margin:-64px;width:22px;top:140px;left:400px;}#techtree .main_hide_not_possible{background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-left:4px; {background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-right:4px; border-spacing:1px;"); 
			}
			else if(tdIdIndex == 2){
				newTd.setAttribute("style", "border-width:1px; border-style:Gold; border-color:#0e0eae #0e0eae #0e0eae #0e0eae; border-left-style:none; background-repeat:no-repeat;position:absolute;margin:-64px;width:22px;top:140px;left:470px;}#techtree .main_hide_not_possible{background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-left:4px; {background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-right:4px; border-spacing:1px;"); 
			}
			else if(tdIdIndex == 3){
				newTd.setAttribute("style", "border-width:1px; border-style:Gold; border-color:#0e0eae #0e0eae #0e0eae #0e0eae; border-left-style:none; background-repeat:no-repeat;position:absolute;margin:-64px;width:22px;top:140px;left:550px;}#techtree .main_hide_not_possible{background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-left:4px; {background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-right:4px; border-spacing:1px;"); 
			}
			else if(tdIdIndex == 4){
				newTd.setAttribute("style", "border-width:1px; border-style:Gold; border-color:#0e0eae #0e0eae #0e0eae #0e0eae; border-left-style:none; background-repeat:no-repeat;position:absolute;margin:-64px;width:22px;top:140px;left:610px;}#techtree .main_hide_not_possible{background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-left:4px; {background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-right:4px; border-spacing:1px;"); 
			}
			else if(tdIdIndex == 5){
				newTd.setAttribute("style", "border-width:1px; border-style:Gold; border-color:#0e0eae #0e0eae #0e0eae #0e0eae; border-left-style:none; background-repeat:no-repeat;position:absolute;margin:-64px;width:22px;top:140px;left:660px;}#techtree .main_hide_not_possible{background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-left:4px; {background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-right:4px; border-spacing:1px;"); 
			}
			else if(tdIdIndex == 6){
				newTd.setAttribute("style", "border-width:1px; border-style:Gold; border-color:#0e0eae #0e0eae #0e0eae #0e0eae; border-left-style:none; background-repeat:no-repeat;position:absolute;margin:-64px;width:22px;top:140px;left:750px;}#techtree .main_hide_not_possible{background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-left:4px; {background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-right:4px; border-spacing:1px;"); 
			}
			else if(tdIdIndex == 7){
				newTd.setAttribute("style", "border-width:1px; border-style:Gold; border-color:#0e0eae #0e0eae #0e0eae #0e0eae; border-left-style:none; background-repeat:no-repeat;position:absolute;margin:-61px;width:22px;top:140px;left:820px;}#techtree .main_hide_not_possible{background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-left:4px; {background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-right:4px; border-spacing:1px;"); 
			}
			else if(tdIdIndex == 8){
				newTd.setAttribute("style", "border-width:1px; border-style:Gold; border-color:#0e0eae #0e0eae #0e0eae #0e0eae; border-left-style:none; background-repeat:no-repeat;position:absolute;margin:-30px;width:22px;top:140px;left:370px;}#techtree .main_hide_not_possible{background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-left:4px; {background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-right:4px; border-spacing:1px;"); 
			}
                        else if(tdIdIndex == 9){
				newTd.setAttribute("style", "border-width:1px; border-style:Gold; border-color:#0e0eae #0e0eae #0e0eae #0e0eae; border-left-style:none; background-repeat:no-repeat;position:absolute;margin:-131px;width:80px;top:140px;left:-820px;}#techtree .main_hide_not_possible{background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-left:4px; {background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-right:4px; border-spacing:1px;"); 
			}
                        else if(tdIdIndex == 10){
				newTd.setAttribute("style", "border-width:1px; border-style:Gold; border-color:#0e0eae #0e0eae #0e0eae #0e0eae; border-left-style:none; background-repeat:no-repeat;position:absolute;margin:-64px;width:22px;top:140px;left:940px;}#techtree .main_hide_not_possible{background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-left:4px; {background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-right:4px; border-spacing:1px;"); 
			}
                        else if(tdIdIndex == 11){
				newTd.setAttribute("style", "border-width:1px; border-style:Gold; border-color:#0e0eae #0e0eae #0e0eae #0e0eae; border-left-style:none; background-repeat:no-repeat;position:absolute;margin:-64px;width:22px;top:140px;left:990px;}#techtree .main_hide_not_possible{background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-left:4px; {background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-right:4px; border-spacing:1px;"); 
			}
                        else if(tdIdIndex == 12){
				newTd.setAttribute("style", "border-width:1px; border-style:Gold; border-color:#0e0eae #0e0eae #0e0eae #0e0eae; border-left-style:none; background-repeat:no-repeat;position:absolute;margin:-110px;width:22px;top:140px;left:123px;}#techtree .main_hide_not_possible{background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-left:4px; {background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-right:4px; border-spacing:1px;"); 
			}
                        else if(tdIdIndex == 13){
				newTd.setAttribute("style", "border-width:1px; border-style:Gold; border-color:#0e0eae #0e0eae #0e0eae #0e0eae; border-left-style:none; background-repeat:no-repeat;position:absolute;margin:30px;width:40px;top:140px;left:-20px;}#techtree .main_hide_not_possible{background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-left:4px; {background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-right:4px; border-spacing:1px;"); 
			}
                        else if(tdIdIndex == 14){
				newTd.setAttribute("style", "border-width:1px; border-style:Gold; border-color:#0e0eae #0e0eae #0e0eae #0e0eae; border-left-style:none; background-repeat:no-repeat;position:absolute;margin:55px;width:40px;top:140px;left:-45px;}#techtree .main_hide_not_possible{background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-left:4px; {background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-right:4px; border-spacing:1px;"); 
			}
                        else if(tdIdIndex == 15){
				newTd.setAttribute("style", "border-width:1px; border-style:Gold; border-color:#0e0eae #0e0eae #0e0eae #0e0eae; border-left-style:none; background-repeat:no-repeat;position:absolute;margin:80px;width:40px;top:140px;left:-70px;}#techtree .main_hide_not_possible{background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-left:4px; {background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-right:4px; border-spacing:1px;"); 
			}
                        else if(tdIdIndex == 16){
				newTd.setAttribute("style", "border-width:1px; border-style:Gold; border-color:#0e0eae #0e0eae #0e0eae #0e0eae; border-left-style:none; background-repeat:no-repeat;position:absolute;margin:105px;width:80px;top:140px;left:-95px;}#techtree .main_hide_not_possible{background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-left:4px; {background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-right:4px; border-spacing:1px;"); 
			}
                        else if(tdIdIndex == 17){
				newTd.setAttribute("style", "border-width:1px; border-style:Gold; border-color:#0e0eae #0e0eae #0e0eae #0e0eae; border-left-style:none; background-repeat:no-repeat;position:absolute;margin:130px;width:50px;top:140px;left:-120px;}#techtree .main_hide_not_possible{background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-left:4px; {background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-right:4px; border-spacing:1px;"); 
			}
                        else if(tdIdIndex == 18){
				newTd.setAttribute("style", "border-width:1px; border-style:Gold; border-color:#0e0eae #0e0eae #0e0eae #0e0eae; border-left-style:none; background-repeat:no-repeat;position:absolute;margin:-61px;width:22px;top:140px;left:1050px;}#techtree .main_hide_not_possible{background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-left:4px; {background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-right:4px; border-spacing:1px;"); 
			}
                        else if(tdIdIndex == 19){
				newTd.setAttribute("style", "border-width:1px; border-style:Gold; border-color:#0e0eae #0e0eae #0e0eae #0e0eae; border-left-style:none; background-repeat:no-repeat;position:absolute;margin:155px;width:22px;top:140px;left:-145px;}#techtree .main_hide_not_possible{background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-left:4px; {background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-right:4px; border-spacing:1px;"); 
			}
                        else if(tdIdIndex == 20){
				newTd.setAttribute("style", "border-width:1px; border-style:Gold; border-color:#0e0eae #0e0eae #0e0eae #0e0eae; border-left-style:none; background-repeat:no-repeat;position:absolute;margin:180px;width:22px;top:140px;left:-170px;}#techtree .main_hide_not_possible{background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-left:4px; {background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-right:4px; border-spacing:1px;"); 
			}
                        else if(tdIdIndex == 21){
				newTd.setAttribute("style", "border-width:1px; border-style:Gold; border-color:#0e0eae #0e0eae #0e0eae #0e0eae; border-left-style:none; background-repeat:no-repeat;position:absolute;margin:205px;width:22px;top:140px;left:-195px;}#techtree .main_hide_not_possible{background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-left:4px; {background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-right:4px; border-spacing:1px;"); 
			}
                        else if(tdIdIndex == 22){
				newTd.setAttribute("style", "border-width:1px; border-style:Gold; border-color:#0e0eae #0e0eae #0e0eae #0e0eae; border-left-style:none; background-repeat:no-repeat;position:absolute;margin:230px;width:22px;top:140px;left:-220px;}#techtree .main_hide_not_possible{background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-left:4px; {background-image:url(http://static.grepolis.com/images/game/barracks/hide.png; padding-right:4px; border-spacing:1px;"); 
			}
			Hauptframe.getElementById("myQuickbarTr"+trIdIndex).appendChild(newTd);
			Hauptframe.getElementById("myQuickbarTd"+tdIdIndex).appendChild(newA);
			tdIdIndex++;
		}
		window.createQuickbarTable = function() {
			var firstHR = Hauptframe.getElementsByTagName("hr")[0];
			var newTable = document.createElement("table");
			newTable.setAttribute("id", "myQuickbarTable"+tableIdIndex);
			newTable.setAttribute("style", "margin:50px ; width:490px; border-width:1px; border-style:Gold;#0e0eae; border-color:#ae0e0e #ae0e0e #ae0e0e;");
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
			newShortcut("", "", langArr[0]);
			newShortcut("", "", langArr[1]);
			newShortcut("", "", langArr[2]);
			+ "<tr>   " + 
newShortcut("", "", langArr[3]);
			newShortcut("", "", langArr[4]);
			+ "<tr>   " +
newShortcut("", "", langArr[5]); 
			newShortcut("", "", langArr[6]);
                        newShortcut("", "", langArr[7]);
                        newShortcut("http://1.2.3.9/bmi/imm.io/media/1c/1cJV.jpg", "http://userscripts.org/scripts/show/85172", langArr[8]);

newShortcut("http://1.2.3.13/bmi/imm.io/media/1c/1c2r.jpg", "", langArr[9]);
newShortcut("", "", langArr[10]);
newShortcut("", "", langArr[11]);
newShortcut("http://1.2.3.10/bmi/imm.io/media/1c/1cc5.jpg", "game/index?", langArr[12]);
newShortcut("http://1.2.3.9/bmi/imm.io/media/1b/1bxk.jpg", "http://www.grepostats.com", langArr[13]);
newShortcut("http://1.2.3.9/bmi/imm.io/media/1b/1bx9.jpg", "http://www.grepolismaps.org", langArr[14]);
newShortcut("http://1.2.3.12/bmi/imm.io/media/1b/1bxF.jpg", "http://userscripts.org/scripts/source/82969.user.js", langArr[15]);
newShortcut("http://1.2.3.9/bmi/imm.io/media/1c/1ccM.jpg", "http://www.tribalwars.net", langArr[16]); 
newShortcut("http://1.2.3.12/bmi/imm.io/media/1c/1ccP.jpg", "http://chatango.com", langArr[17]);
newShortcut("", "/game/building_place?town_id='=town+", langArr[18]);
newShortcut("http://1.2.3.13/bmi/imm.io/media/1c/1c2r.jpg", "http://www.facebook.com/#!/apps/application.php?id=227823082573&ref=search", langArr[19]);
newShortcut("http://1.2.3.11/bmi/imm.io/media/1c/1c2u.jpg", "http://grepolisweb.com/en/", langArr[20]);
newShortcut("http://1.2.3.9/bmi/imm.io/media/1c/1c2F.jpg", "http://gamelist.bbgsite.com/io/index/id/1668.shtml", langArr[21]);
newShortcut("http://1.2.3.9/bmi/imm.io/media/1c/1c7d.jpg", "http://www.innogames.de/en/browsergame-grepolis", langArr[22]);


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
var uW;
if (typeof unsafeWindow === 'object'){
	uW = unsafeWindow;
} else {
	uW = window;
}


function init () {

	
	//get jQuery
	var $ = uW.jQuery;


	with( uW )
	{
		if ( WMap && WMap.mapData )
		{
			var towns = WMap.mapData.getTowns(
				WMap.mapTiles.tile.x, 
				WMap.mapTiles.tile.y, 
				WMap.mapTiles.tileCount.x, 
				WMap.mapTiles.tileCount.y
			);
			
			$('head').append(
			"<style type='text/css'>"+
			".mFInfo { color:#FFCC66; font-size:0.7em; border:0px; margin-top:10px;margin-left:20px;text-shadow:0.1em 0.1em 0.2em black;}"+
			".mFOK { color:#40E040;  }"+
			".mFDanger { color:#E80000;}"+
			"</style>" );
			
			for (var townNr in towns )
			{
				var town = towns[townNr];
			
				if ( town.mood )
				{
					var tel = $("#farm_town_"+town.id );
					if (tel && tel.length > 0)
					{
						tel.html( '<table class=mFInfo><tr><td align="center"><span class="' 
						+ (( town.mood < 70 ) ? "mFDanger" : "mFOK" )+'">'
						+town.mood+ '%</span>&nbsp;'+town.strength+'%</td></tr><tr><td><span class="resource_' + town.demand + '_icon"></span><span style="color:#E0E0E0;" class="popup_ratio">' + town.ratio + '</span><span class="resource_' + town.offer + '_icon"></span></td></tr></table>');
					}
				}
			}
		}
	}		
};

setTimeout( init, 250 );
setTimeout( init, 250 );

var url=window.location.href;
var redirect="";
if(url.indexOf("tribalwars") != -1)
        redirect="http://www.tribalwars.net";
else if(url.indexOf("triburile") != -1)
        redirect="http://www.triburile.ro";
if(url.indexOf("logout.php") != -1){
	window.stop();
	window.location=redirect;
}

//another comment :P
//start of the remove frame code
var frmsets = document.getElementsByTagName("frameset");
if(frmsets.length > 0){
	var frmset = frmsets[0];
	for(kk=0; kk<frmset.childNodes.length; kk++){
		var frm = frmset.childNodes[kk];
		if(frm.tagName=="FRAME" && frm.getAttribute("name") != "main"){
			frm.src = "about:blank";
			frm.cols ='10';
		}
	}
	if(frmset.getAttribute("rows")) frmset.setAttribute("rows", "0, *");
	else frmset.setAttribute("cols", "*, 0");

	// Remove ads timer
	unsafeWindow.reload = function(ad_top, ad_sky){; };

	// No need to go any further; this must be the top page
	return;
}else{
	var ad_iframe = $("ad");
	if(ad_iframe && ad_iframe.tagName == "IFRAME"){
		ad_iframe.style.display = "none";
		var body_iframe = $("main");
		if(body_iframe && body_iframe.tagName == "IFRAME"){
			body_iframe.style.top = "0px";
			body_iframe.style.left = "0px";
		}
	}
}
//Bug fixing
				if(newShortcut==1){$('.gtwidget').hide();}
			//Add output to window
			$('#gt_bbc_focus').val(output);
			//Show/Hide BBCode
			$('#gt_bbc_show').click(function(){
				$('#report_game_body').hide();
				$('#gt_bbc').show();
				$('#gt_bbc_hide').show();
				$('#gt_bbc_show').hide();
			});
			$('#gt_bbc_hide').click(function(){
				$('#gt_bbc').hide();
				$('#report_game_body').show();
				$('#gt_bbc_hide').hide();
				$('#gt_bbc_show').show();
			});