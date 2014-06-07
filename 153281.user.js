// ==UserScript==
// @id             magic.tcgplayer.com-53bd2142-b139-43fd-bade-c8a0e56d50e0@scriptish
// @name           tcgplayer price guide exporter
// @version        1.0
// @namespace      
// @author         subby
// @description    Exports tcgplayer's price guides into csv format
// @include        http://magic.tcgplayer.com/db/price_guide.asp*
// @run-at         document-end
// ==/UserScript==
function csvMe() {
	var csv = "Name,Cost,Type,Color,Rarity,High,Mid,Low,<br>";
	var entry = [].slice.call(document.body.childNodes.item(8).childNodes.item(1).childNodes);
	for(i = 0; i < entry.length-1; i++) {
		if(entry[i].childNodes.item(0).firstChild.innerHTML.replace("&nbsp;","").indexOf(",") != -1) {
			//Uh oh, looks like a card has a comma in it, which is bad for a "Comma separated value" table! let's do something about it!
			csv += "Comma dude!" + "," + entry[i].childNodes.item(1).firstChild.innerHTML.replace("&nbsp;","") + "," + entry[i].childNodes.item(2).firstChild.innerHTML.replace("&nbsp;","") + "," + entry[i].childNodes.item(3).firstChild.innerHTML.replace("&nbsp;","") + "," + entry[i].childNodes.item(4).firstChild.innerHTML.replace("&nbsp;","") + "," + entry[i].childNodes.item(5).firstChild.innerHTML.replace("&nbsp;","").replace("$","") + "," + entry[i].childNodes.item(6).firstChild.innerHTML.replace("&nbsp;","").replace("$","") + "," + entry[i].childNodes.item(7).firstChild.innerHTML.replace("&nbsp;","").replace("$","") + ",<br>";
		}
		else {
			csv += entry[i].childNodes.item(0).firstChild.innerHTML.replace("&nbsp;","") + "," + entry[i].childNodes.item(1).firstChild.innerHTML.replace("&nbsp;","") + "," + entry[i].childNodes.item(2).firstChild.innerHTML.replace("&nbsp;","") + "," + entry[i].childNodes.item(3).firstChild.innerHTML.replace("&nbsp;","") + "," + entry[i].childNodes.item(4).firstChild.innerHTML.replace("&nbsp;","") + "," + entry[i].childNodes.item(5).firstChild.innerHTML.replace("&nbsp;","").replace("$","") + "," + entry[i].childNodes.item(6).firstChild.innerHTML.replace("&nbsp;","").replace("$","") + "," + entry[i].childNodes.item(7).firstChild.innerHTML.replace("&nbsp;","").replace("$","") + ",<br>";
		}
	}
	document.body.innerHTML=csv;
}
var csvify = document.createElement('input');
csvify.setAttribute('type', 'button');
csvify.setAttribute('value', 'CSV me!'); // What the enduser sees on button
csvify.setAttribute('name', 'csvify');
csvify.onclick = function() {
	csvMe();
	onClick();
};
document.body.firstChild.appendChild(csvify);