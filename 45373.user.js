// ==UserScript==
// @name				DScombineUnitImgs
// @version				1.1.0
// @description			Fasst in der Produktionsuebersicht die Einheitgrafiken zusammen
// @namespace			die-staemme.de
// @author				Heinzel
// @include			http://de*.die-staemme.de/game.php?*screen=overview_villages*
// ==/UserScript==




(function main() {
	var ScriptAPI = (typeof(unsafeWindow) != 'undefined') ? unsafeWindow.ScriptAPI : window.ScriptAPI;
	ScriptAPI.register('DScombineUnitImgs', 7.4, 'Heinzelmänchen', 'Heinzelmänchen@scripter.die-staemme.de');
	
	if(!location.href.match(/mode=prod/)) {	
		var mode = document.getElementById("overview").value;
		
		if(!mode) { // pa
			return;
		}
		
		if(mode != "prod") {
			return;
		}
	}
	
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
		if(!row.innerHTML.match(/<span id="label_/i))
			continue;
		
		var cells = row.getElementsByTagName("td");
		for(var y = 0; y < cells.length; y++) {
			if(cells[y].getElementsByTagName("img")) {
				var images = cells[y].getElementsByTagName("img")
				var cell = cells[y];
			}
		}
		
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
			image.title = units[i].split(":")[1] + " Stück - " + unescape(units[i].split(":")[2]);
			cell.appendChild(image);
		}
	}
})();