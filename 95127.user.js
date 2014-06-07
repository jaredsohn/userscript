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
// @name value          PREMIUM SKIN FOR TRBALL WARS!!!
// @namespace      www.divoke-kmene.sk @description    PREMIUM SKIN FOR TRBALL WARS!!!(Village Headquarters, Barracks , Stable , Workshop , Academy , Smithy , Rally Point , Market)  
// @include        http://en*.tribalwars.net/*  
// @version        1.0
// ==/UserScript==


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
	newShortcut("http://ro5.triburile.ro/graphic/buildings/main.png", "/game.php?village="+VillId+"&screen=main", "Village Headquarters   ");
	newShortcut("http://ro5.triburile.ro/graphic/buildings/barracks.png", "/game.php?village=+VillId+&screen=barracks", "Barracks   ");
	newShortcut("http://ro5.triburile.ro/graphic/buildings/stable.png", "/game.php?village="+VillId+"&screen=stable", "Stable");
	newShortcut("http://ro5.triburile.ro/graphic/buildings/garage.png", "/game.php?village="+VillId+"&screen=garage", "Workshop   ");
	
newShortcut("http://ro5.triburile.ro/graphic/buildings/snob.png", "/game.php?village="+VillId+"&screen=snob", "Academy   ");
	newShortcut("http://ro5.triburile.ro/graphic/buildings/smith.png", "/game.php?village="+VillId+"&screen=smith", "Smithy   ");
	newShortcut("http://ro5.triburile.ro/graphic/buildings/place.png", "/game.php?village="+VillId+"&screen=place", "Rally Point   ");
	
newShortcut("http://ro5.triburile.ro/graphic/buildings/market.png", "/game.php?village="+VillId+"&screen=market", "Market")	
tableIdIndex++;
	trIdIndex++;
}