// ==UserScript==
// @name				tribalwars-overview-Shortcut-Units
// @description			يقوم بي احصاء انتاج القوات في المباني العسكريه و تقليل عدد الصور
// @namespace			none
// @author				Heinzel
// @include			http://*.tribalwars.*/game.php?*screen=overview_villages&mode=prod*
// ==/UserScript==



Array.prototype.contains = function(cont)
{
	for(var x = 0; x < this.length; x++) {
		if(this[x].split(":")[0] == cont)
			return "\"" + x + "\"";
	}
	
	return false;
}


var XPath = document.evaluate('//span[contains(@id, "label_")]/parent::td/parent::tr', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for(var x = 0; x < XPath.snapshotLength; x++) {
	var row = XPath.snapshotItem(x);
	if(!row.innerHTML.match(/<span id="label_/))
		continue;
	
	var cell = row.getElementsByTagName("td")[7];
	if(!cell.innerHTML.match(/<img/))
		continue;
	
	var images = cell.getElementsByTagName("img");
	var units = [];
	for(var i = 0; i < images.length; i++) {
		var unit = images[i].src.split("unit_")[1].split(".png")[0];
		var len = parseInt(images[i].title.split(" - ")[0], 10);
		var date = images[i].title.split(" - ")[1];
		
		if(units.contains(unit)) {
			var index = units.contains(unit).replace(/"/g, "");
			units[index] = unit + ":" + (parseInt(units[index].split(":")[1], 10)+len).toString() + ":" + escape(date);
		} else {
			units.push(unit + ":" + len.toString() + ":" + escape(date));
		}
		
		cell.removeChild(images[i--]);
	}
	
	for(var i = 0; i < units.length; i++) {
		var image = document.createElement("img");
		image.src = "http://" + location.host + "/graphic/unit/unit_" + units[i].split(":")[0] + ".png";
		image.title = units[i].split(":")[1] + " مجموع الوحدات- " + unescape(units[i].split(":")[2]);
		cell.appendChild(image);
	}
}