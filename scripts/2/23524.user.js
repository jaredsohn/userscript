// ==UserScript==
// @name           Goozex Tweaks
// @namespace      thlayli.detrave.net
// @description    Converts Goozex points to prices and fixes cover image sizes
// @include        http://www.goozex.com/*
// @include        http://goozex.com/*
// @version        2.3
// ==/UserScript==

var centerColumn = xpath(document, "//div[contains(@class, 'centerColumnContent')]").snapshotItem(0);
var bluPoints = xpath(document, "//b");

for(i=0;i<bluPoints.snapshotLength;i++){
	var price = bluPoints.snapshotItem(i).textContent * 0.05;
	if(!isNaN(bluPoints.snapshotItem(i).textContent) && bluPoints.snapshotItem(i).textContent >= 100 && !/Results/.test(bluPoints.snapshotItem(i).parentNode.textContent))
		if(bluPoints.snapshotItem(i).parentNode.className == "txt9Light")
			bluPoints.snapshotItem(i).innerHTML += ('<br><b style="float: right;">$' + price.toFixed(2) + '&nbsp;&nbsp;&nbsp;</b>');
		else
			bluPoints.snapshotItem(i).innerHTML += (' (<b>$' + price.toFixed(2) + '</b>)');
}

var curPoints = xpath(document, "//a[@class='upperMenuBlueGray']").snapshotItem(0);
var pointPrice = curPoints.textContent * 0.05;
curPoints.innerHTML += (' (<b>$' + pointPrice.toFixed(2) + '</b>)');

var imgs = xpath(centerColumn, "//img[@class='coverimg' and @height!='60']");

for(i=0;i<imgs.snapshotLength;i++){

	if(/itemdetail\.asp/.test(imgs.snapshotItem(i).parentNode.href)){
		var gameType = imgs.snapshotItem(i).parentNode.parentNode.nextSibling.firstChild.alt;
		var position = "top";
		switch(gameType){
			case "PlayStation":
				h = 79;
				break;
			case "Nintendo DS":
				h = 75;
				break;
			case "Game Boy Advance":
				h = 84;
				break;
			case "Playstation 3":
				h = 100;
				break;
			case "PlayStation Portable":
				w = 70;
				break;
			case "Dreamcast":
				h = 83;	
				break;
			default:
				var h = 120;
				var w = 84;
		}
	}else{
		var position = "bottom";
		var gameType = imgs.snapshotItem(i).parentNode.href;
		var h = 120;
		if(/PlayStation$/.test(gameType))
			h = 79;
		if(/Nintendo_DS$/.test(gameType))
			h = 75;
		if(/Game_Boy_Advance$/.test(gameType))
			h = 84;
		if(/Playstation_3$/.test(gameType))
			h = 100;
		if(/PlayStation_Portable$/.test(gameType))
			w = 70;
		if(/Dreamcast$/.test(gameType))
			h = 83;
	}

	if(h != 120 && imgs.snapshotItem(i).src.indexOf('images/en/noicon.jpg') == -1){
		imgs.snapshotItem(i).height = h;
		if(position == "top")
			imgs.snapshotItem(i).style.marginBottom = (120-h) + 'px';
		else
			imgs.snapshotItem(i).style.marginTop = (120-h) + 'px';
	}

	if(w != 84 && imgs.snapshotItem(i).src.indexOf('images/en/noicon.jpg') == -1){
		imgs.snapshotItem(i).width = w;
		imgs.snapshotItem(i).style.marginRight = (84-w) + 'px';
	}

}

function xpath(obj,query) {
    return document.evaluate(query, obj, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}