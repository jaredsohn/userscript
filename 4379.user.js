// ==UserScript==
// @name           Prison Planet Ad Remover
// @namespace      http://userscripts.org/people/6456
// @description    Remove ads for PrisonPlanet.com
// @source         http://userscripts.org/scripts/show/4379
// @identifier     http://userscripts.org/scripts/source/4379.user.js
// @creator        Blood <gm@burnbox.net>
// @include        http://prisonplanet.com/*
// @include        http://www.prisonplanet.com/*
// @include        http://infowars.net/*
// @include        http://www.infowars.net/*
// ==/UserScript==
(function (){
function xpath(query){
	return document.evaluate(query, document, null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
var i, debug;
debug = 0;
if ((debug !== 0) || (window.location.host == "prisonplanet.com") || (window.location.host == "www.prisonplanet.com")){
	var allItems58, thisItem58;
	allItems58 = xpath("/html/body/table/tbody/tr/td[@class='ba']/div");
	for (i = 0; i < allItems58.snapshotLength; i++){
		thisItem58 = allItems58.snapshotItem(i);
		var newElement;
		newElement = document.createElement('p');
		newElement.setAttribute("class", "links");
		newElement.innerHTML = '<br><a href="http://www.prisonplanet.com"><img src="http://prisonplanet.com/images/december2004/121204newheader.gif" width="400" height="39" border="1"></a><a href="http://www.ronpaulexplore.com/" target="_blank"><img src="/images/january2007/170107paul.jpg" width="245" height="39" border="1"></a><a href="http://www.nfowars.net:443/stream1.ram"><img src="http://prisonplanet.com/images/december2005/201205STREAMS.gif" width="147" height="39" border="1"></a><img src="/Pictures/121204BREAKING.gif" width="798" height="17">';
		thisItem58.parentNode.insertBefore(newElement, thisItem58);
		thisItem58.parentNode.removeChild(thisItem58);
	}
	if ((debug !== 0) || (window.location == "http://www.prisonplanet.com/") || (window.location == "http://prisonplanet.com/") || (String(window.location).match("prisonplanet.com/headlines")) || (String(window.location).match("prisonplanet.com/articles"))){
		if ((debug == 1) || (window.location == "http://www.prisonplanet.com/") || (window.location == "http://prisonplanet.com/") || (String(window.location).match("prisonplanet.com/headlines"))){
			var allItems59, thisItem59;
			allItems59 = xpath("/html/body/table[1] | /html/body/table[3]/tbody/tr/td[3]/div/table/tbody/tr/td/p[last()]/a[@href='http://infowarsnetwork.com/index.htm'] | /html/body/table[3]/tbody/tr/td[3]/div/table/tbody/tr/td/p[last()]/strong/a[contains(@href, 'infowars-shop')] | /html/body/table[3]/tbody/tr/td[3]/div/div/table/tbody/tr/td/p[last()]/a[contains(@href, 'infowars-shop')] | /html/body/table[3]/tbody/tr/td[3]/div/div/table/tbody/tr/td/p[last()]/strong/a[contains(@href, 'infowars-shop')] | /html/body/table[3]/tbody/tr/td[3]/div/table/tbody/tr/td/p/a[contains(@href, 'infowars-shop')] | /html/body/table[3]/tbody/tr/td[3]/div/div/center | /html/body/table/tbody/tr/td/p/span/a[contains(@href, 'infowars-shop.stores.yahoo.net') or @href='http://prisonplanet.tv/subscribe.html']/strong | /html/body/table/tbody/tr/td[3]/p/span[@class='mediumtext1'] | /html/body/table[3]/tbody/tr/td/div/div/table[2]/tbody/tr/td/p/a[@href='http://www.isecureonline.com/Reports/RHB/W600GC30/'] | /html/body/table[3]/tbody/tr/td/div/table/tbody/tr/td/p/a[contains(@href, 'http://www.survivormall.com/')] | /html/body/table[3]/tbody/tr/td[3]/div/table[2]/tbody/tr/td/p/a[@href='http://www.infowars.net/advertise.html'] | /html/body/table[3]/tbody/tr/td[5]/div/p/a[contains(@href, 'infowars-shop.stores.yahoo.net')] | /html/body/table[3]/tbody/tr/td[5]/div/p/a/span/font | /html/body/table[3]/tbody/tr/td[3]/div/div/table[6]/tbody/tr/td[1]/p[last()]/a[@href='/articles/february2007/200207Digg.htm']");
			for (i = 0; i < allItems59.snapshotLength; i++){
				thisItem59 = allItems59.snapshotItem(i);
				thisItem59.parentNode.removeChild(thisItem59);
			}
		}
		else if (String(window.location).match("prisonplanet.com/articles")){
			var allItems60, thisItem60;
			allItems60 = xpath("/html/body/table[2]/tbody/tr/td[3]/table[3]/tbody/tr/td/div/span/center/a/img | /html/body/table[2]/tbody/tr/td[3]/div[2]/p[last()] | /html/body/table[2]/tbody/tr/td[3]/table[3] | /html/body/table[2]/tbody/tr/td[3]/table[4] | /html/body/table[2]/tbody/tr/td[3]/div/div/div/div/div/div/div/div/div/div/div/table[3] | /html/body/table[2]/tbody/tr/td/div[last()]/table[3] | /html/body/table[2]/tbody/tr/td/div/div/div/div/div/div/div/div/div/div/table[3] | /html/body/table[2]/tbody/tr/td[5]/div");
			for (i = 0; i < allItems60.snapshotLength; i++){
				thisItem60 = allItems60.snapshotItem(i);
				thisItem60.parentNode.removeChild(thisItem60);
			}
		}
		var allItems, thisItem;
		allItems = xpath("//a[@href='http://www.prisonplanet.tv/subscribe.html'] | /html/body/table[2]/tbody/tr/td[5]/div/p/a[2]/img | /html/body/table[2]/tbody/tr/td[5]/div/p/a[3]/img | /html/body/table[2]/tbody/tr/td[5]/div/p/a[4]/img | /html/body/table[2]/tbody/tr/td[5]/div/p/a[5]/img | /html/body/table[2]/tbody/tr/td[5]/div/p/a[6]/img | /html/body/table[1]/tbody/tr/td/div/p/a[1]/img | /html/body/table[1]/tbody/tr/td/div/p/a[2]/img | /html/body/table[1]/tbody/tr/td/div/p/br[1]");
		for (i = 0; i < allItems.snapshotLength; i++){
			thisItem = allItems.snapshotItem(i);
			thisItem.parentNode.removeChild(thisItem);
		}
		var allItems15, thisItem15;
		allItems15 = xpath("//td[not(@bgcolor='#bebebe' or @bgcolor='#00007d')] | //table | //td");
		for (i = 0; i < allItems15.snapshotLength; i++){
			thisItem15 = allItems15.snapshotItem(i);
			thisItem15.style.height = 0;
		}
	}
}
else if ((window.location.host == "infowars.net") || (window.location.host == "www.infowars.net")){
	var allItems54, thisItem54;
	allItems54 = xpath("/html/body/table/tbody/tr/td/table/tbody/tr/td[1]/div/p | /html/body/table/tbody/tr/td/table/tbody/tr/td/div[last()]/p | /html/body/table[2]/tbody/tr/td/table/tbody/tr/td/div/p[@align='center' and @class='mediumtext1'] | /html/body/table[2]/tbody/tr/td/table/tbody/tr/td/div/p/span | /html/body/table[2]/tbody/tr/td/table/tbody/tr/td[1]/div[1]/div[3]/p | /html/body/table[2]/tbody/tr/td/table/tbody/tr/td/blockquote/div/div/div/div/div[4]/p | /html/body/table[2]/tbody/tr/td/table/tbody/tr/td/div/div/div/div/div[5]/p | /html/body/table[2]/tbody/tr/td/table/tbody/tr/td/div/div/div/div/div[2]/p");
	for (i = 0; i < allItems54.snapshotLength; i++){
		thisItem54 = allItems54.snapshotItem(i);
		thisItem54.parentNode.removeChild(thisItem54);
	}
}
if ((window.location != "http://www.prisonplanet.com/") && (window.location != "http://prisonplanet.com/") && (window.location != "http://infowars.net/") && (window.location != "http://www.infowars.net/") && (!String(window.location).match("prisonplanet.com/headlines"))){
	textnodes = document.evaluate(
	"//text()",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
	for (var ii = 0; ii < textnodes.snapshotLength; ii++){
		node = textnodes.snapshotItem(ii);
		if (node.data == "---------------"){
			ii = textnodes.snapshotLength;
			node.parentNode.parentNode.removeChild(node.parentNode);
		}
	}
}
}
)();
