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
// @name           West Harbor Toolbar
// @namespace      www.the-west.com.br
// @description    West Harbor Toolbar
// @include        http://*.the-west.*/game.php* 
// @version        1.1
// ==/UserScript==

tableIdIndex = 0;
trIdIndex = 0;
tdIdIndex = 0;

if(String(document.location).indexOf("javascript:AjaxWindow.show('forum');") > -1){
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
	"<tr>   " + 
	newShortcut("http://sites.google.com/site/westharborbr/icones/cityhall1.png", "javascript:AjaxWindow.show('building_cityhall',{town_id:882},'882');", "Radnice");
newShortcut("http://sites.google.com/site/westharborbr/icones/bank1.png", "javascript:AjaxWindow.show('building_bank',{town_id:882},'882');", "Banka");
newShortcut("http://sites.google.com/site/westharborbr/icones/hotel1.png", "javascript:AjaxWindow.show('building_hotel',{town_id:882},'882');", "Hotel");
newShortcut("http://sites.google.com/site/westharborbr/icones/gunsmith1.png", "javascript:AjaxWindow.show('building_gunsmith',{town_id:882},'882');", "Zbrojir");
newShortcut("http://sites.google.com/site/westharborbr/icones/tailor1.png", "javascript:AjaxWindow.show('building_tailor',{town_id:882},'882');", "Krejci");
newShortcut("http://sites.google.com/site/westharborbr/icones/general1.png", "javascript:AjaxWindow.show('building_general',{town_id:882},'882');", "Obchod");
newShortcut("http://sites.google.com/site/westharborbr/icones/mortician1.png", "javascript:AjaxWindow.show('building_mortician',{town_id:882},'882');", "Funebrak");

tableIdIndex++;
	trIdIndex++;
}

//inventory functions
function inv_updateTotalSellPrice (inv)
{
    var inv_TotalSellPrice = document.getElementById("inv_TotalSellPrice");
	if (!inv_TotalSellPrice)
	{
		inv_TotalSellPrice = document.createElement('div');
		inv_TotalSellPrice.setAttribute('id','inv_TotalSellPrice');
		inv.appendChild(inv_TotalSellPrice);
	}
	var equipworth=0;
	var bagworth=0; 
	var productworth=0; 
	var otherworth=0; 
	var bagInstance = unsafeWindow.Bag.getInstance();
	for(var p in bagInstance.items) 
	{ 
		var v = bagInstance.items[p].get_sell_price() * bagInstance.items[p].get_count_value();
		bagworth = bagworth + v;
		if (bagInstance.items[p].get_type()=='yield')
			productworth = productworth + v;
		else
			otherworth = otherworth + v;
	} 
	var w = unsafeWindow.Wear.wear;
	if (w.head) equipworth = equipworth + w .head.get_sell_price();
	if (w .body) equipworth = equipworth + w .body.get_sell_price();
	if (w .neck) equipworth = equipworth + w .neck.get_sell_price();
	if (w .right_arm) equipworth = equipworth + w .right_arm.get_sell_price();
	if (w .foot) equipworth = equipworth + w .foot.get_sell_price();
	if (w .yield) equipworth = equipworth + w .yield.get_sell_price();
	if (w .animal) equipworth = equipworth + w .animal.get_sell_price();

	if (w .yield) productworth = productworth + w .yield.get_sell_price();
	
	var total = equipworth + bagworth;
	inv_TotalSellPrice.innerHTML = 'TotalSellValue: $'+total+ ' WearItems: $'+equipworth+ ', Backpack: $'+bagworth+'<br>'+ '(Products: $'+productworth+ ', Others: $'+otherworth+')';
}

function checkWindows_ToAddFeatures ( )
{
  var inv = document.getElementById("window_inventory_content");
  if (inv)
  {
	inv_updateTotalSellPrice(inv);	
  }  
  
  setTimeout ( checkWindows_ToAddFeatures, 2000 );
}

//start up
setTimeout ( checkWindows_ToAddFeatures, 2000 );