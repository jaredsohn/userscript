// ==UserScript==
// @name				DSimproveMainBuilding
// @author				Heinzel
// @namespace			none
// @description			Dieses Script ermoeglicht es, im Hauptgebaeude sowohl abzureissen als auch aufzubauen OHNE extra zwischen den einzelnen Modi hin und her zu wechseln. Dazu kommt noch, dass man seinen individuellen Ausbauwunsch dem Script mitteilen kann und dieses sagt einem dann, ob man die Gebäude noch abreißen/aufbauen/so lassen muss.
// @include			http://de*.die-staemme.de/game.php?*screen=main*
// @include			http://ch*.staemme.ch/game.php?*screen=main*
// ==/UserScript==


function getWorld() {
	return location.host.split(".")[0].replace(/de/, "");
}

if(getWorld() >= 36) {
	var buildings = ["","main:20","barracks:25","stable:20","garage:15","church:3","snob:3","smith:20","place:1","statue:1","market:25","wood:30","stone:30","iron:30","farm:30","storage:30","hide:10","wall:20"];
	var transArr = ["main:Hauptgebäude","barracks:Kaserne","stable:Stall","garage:Werkstatt","church:Kirche","snob:Adelshof","smith:Schmiede","place:Versammlungsplatz","statue:Statue","market:Marktplatz","wood:Holzfäller","stone:Lehmgrube","iron:Eisenmine","farm:Bauernhof","storage:Speicher","hide:Versteck","wall:Wall"];
} else {
	var buildings = ["","main:20","barracks:25","stable:20","garage:15","snob:3","smith:20","place:1","statue:1","market:25","wood:30","stone:30","iron:30","farm:30","storage:30","hide:10","wall:20"];
	var transArr = ["main:Hauptgebäude","barracks:Kaserne","stable:Stall","garage:Werkstatt","snob:Adelshof","smith:Schmiede","place:Versammlungsplatz","statue:Statue","market:Marktplatz","wood:Holzfäller","stone:Lehmgrube","iron:Eisenmine","farm:Bauernhof","storage:Speicher","hide:Versteck","wall:Wall"];
}

Array.prototype.contains = function(cont) {
	for(var x = 0; x < this.length; x++) {
		if(this[x].split(":")[1] == cont) {
			return "\"" + x + "\"";
		}
	}
	
	return false;
}

function getCookie(name) {
	if(document.cookie.match(/;/)) {
		var cooks = document.cookie.split("; ");
		for(var x = 0; x < cooks.length; x++) {
			var cookie = cooks[x];
			if(cookie.match(name + "=")) {
				var value = cookie.replace(name + "=", "");
				break;
			} else {
				var value = false;
			}
		}
	} else {
		var cookie = document.cookie;
		if(cookie.match(name + "="))
			var value = cookie.replace(name + "=", "");
		else
			var value = false;
	}
	
	return value;
}

function break_down(element, building) {
	
	if(element.parentNode.innerHTML.match(/&amp;h=([0-9a-z]+)/)) {
		var hash = RegExp.$1;
		
		if(!getCookie("DSIMB_hash" + sitterHash) || getCookie("DSIMB_hash" + sitterHash) != hash)
			document.cookie = "DSIMB_hash" + sitterHash + "=" + hash;
	} else if(getCookie("DSIMB_hash" + sitterHash)) {
		var hash = getCookie("DSIMB_hash" + sitterHash);
	} else {
		if(!location.href.match(/\&mode=destroy/)) {
			if(!getCookie("DSIMB_routing_" + vid)) {
				location.href = location.href + "&mode=destroy";
				document.cookie = "DSIMB_routing_" + vid + "=true";
			}
		}
		return;
	}
	
	var url = "http://" + location.host + "/game.php?" + t + "village=" + vid + "&screen=main&action=destroy&building_id=" + building + "&h=" + hash;
	
	var old_cell = element.getElementsByTagName("td")[0];
	var cell = document.createElement("td");
	var link = document.createElement("a");
	
	cell.setAttribute("colspan", "6");
	cell.align = "center";
	cell.className = "inactive";
	cell.appendChild(link);
	
	link.href = url;
	link.innerHTML = "Abriss um eine Stufe";
	
	element.innerHTML = "";
	element.appendChild(old_cell);
	element.appendChild(cell);
}

function ready(element) {
	var old_cell = element.getElementsByTagName("td")[0];
	var cell = document.createElement("td");
	
	cell.setAttribute("colspan", "6");
	cell.align = "center";
	cell.className = "inactive";
	cell.innerHTML = "Geb&auml;ude vollst&auml;ndig ausgebaut";
	
	element.innerHTML = "";
	element.appendChild(old_cell);
	element.appendChild(cell);
}

function getBuildUp(building) {
	var XPath = document.evaluate('//th[. = "Fertigstellung"]/parent::tr/parent::tbody/tr', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var counter = 0;
	
	if(XPath.snapshotLength == 0) {
		return 0;
	}
	
	for(var x = 1; x < XPath.snapshotLength; x++) {
		var row = XPath.snapshotItem(x);
		
		if(row.innerHTML.match(/([a-zA-ZäöüÄÖÜ]+) \(Stufe \d+/)) {
			var ger_building = RegExp.$1;
			var build = (transArr.contains(ger_building)) ? transArr[transArr.contains(ger_building).replace(/"/g, "")].split(":")[0] : false;
			
			if(build != building) {
				continue;
			} else {
				counter++;
			}
		} else if(row.innerHTML.match(/([a-zA-ZäöüÄÖÜ]+) \(Stufe abrei/)) {
			var ger_building = RegExp.$1;
			var build = (transArr.contains(ger_building)) ? transArr[transArr.contains(ger_building).replace(/"/g, "")].split(":")[0] : false;
			
			if(build != building) {
				continue;
			} else {
				counter--;
			}
		} else {
			continue;
		}
	}
	
	return counter;
}

function addStepPreferences() {
	var table = document.getElementById("operation_table");
	table.innerHTML = "";
	table.style.tableLayout = "fixed";
	
	var head_row = document.createElement("tr");
	var norm_row = document.createElement("tr");
	
	for(var x = 1; x < buildings.length; x++) {
		var head_cell = document.createElement("th");
		head_cell.style.width = 100/buildings.length + "%";
		head_cell.style.textAlign = "right";
		head_cell.id = "head_" + x;
		head_row.appendChild(head_cell);
		
		var image = document.createElement("img");
		image.src = "http://de" + getWorld() + ".die-staemme.de/graphic/buildings/" + buildings[x].split(":")[0] + ".png";
		head_cell.appendChild(image);
		
		var norm_cell = document.createElement("td");
		norm_cell.style.width = 100/buildings.length + "%";
		norm_cell.style.textAlign = "right";
		norm_row.appendChild(norm_cell);
		
		var field = document.createElement("input");
		field.type = "text";
		field.size = "2";
		field.style.textAlign = "right";
		field.id = "field_" + x
		field.value = buildings[x].split(":")[1];
		norm_cell.appendChild(field);
	}
	
	var sub_row = document.createElement("tr");
	var sub_cell = document.createElement("td");
	var button = document.createElement("button");
	
	button.innerHTML = "Setzen";
	button.addEventListener('click', function() {
		var string = "";
		for(var x = 1; x < buildings.length; x++) {
			var building = document.getElementById("head_" + x).firstChild.src.split("buildings/")[1].split(".")[0];
			var step = document.getElementById("field_" + x).value;
			
			string += "," + building + ":" + step;
		}
		
		document.cookie = "DSIMB_buildings" + sitterHash + "=" + string + ";expires=" + getExpires();
		location.reload();
	}, false);
	
	sub_cell.appendChild(button);
	sub_row.appendChild(sub_cell);
	
	table.appendChild(head_row);
	table.appendChild(norm_row);
	table.appendChild(sub_row);
}

function getExpires() {
  var date = new Date();
  date.setYear(date.getYear()+1905);		// Um 5 Jahre erhöhen
  
  return date.toGMTString();
}

(function main() {
	vid = document.body.innerHTML.match(/village=(\d+)\&amp;screen=main/)[1];
	sitterHash = (location.href.match(/t=(\d+)/)) ? RegExp.$1 : "";
	t = (sitterHash) ? "t=" + sitterHash + "&" : "";
	
	if(getCookie("DSIMB_buildings" + sitterHash))
		buildings = getCookie("DSIMB_buildings" + sitterHash).split(",");
	
	var XPath = document.evaluate('//a[. = "Abriss"]/parent::td/parent::tr/parent::tbody', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
	if(XPath.snapshotLength == 0) {
		var tab = document.evaluate('//th[. = "Bedarf"]/parent::tr/parent::tbody/parent::table', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		var table = document.createElement("table");
		tab.parentNode.insertBefore(table, tab);
	} else {
		var table = XPath.snapshotItem(0);
	}
	table.id = "operation_table";
	table.innerHTML = "";
	
	var row = document.createElement("tr");
	table.appendChild(row);
	
	var cell = document.createElement("th");
	cell.colSpan = "2";
	row.appendChild(cell);
	
	var link = document.createElement("a");
	link.addEventListener('click', addStepPreferences, false);
	link.style.cursor = "pointer";
	link.style.color = "#804000";
	link.style.fontWeight = "bold"; 
	link.style.textDecoration = "none";
	link.style.fontSize = "0.8em";
	link.setAttribute("onmouseover", 'javascript: (function() {document.getElementById("change_link").style.color = "#0082BE";})();');
	link.setAttribute("onmouseout",  'javascript: (function() {document.getElementById("change_link").style.color = "#804000";})();');
	link.innerHTML = "Geb&auml;udeaufbau bearbeiten";
	link.id = "change_link";
	cell.appendChild(link);
	
	var XPath = document.evaluate('//th[. = "Gebäude"]/parent::tr/parent::tbody/tr', document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var count = 0;
	
	for(var index = 1; index < XPath.snapshotLength; index++) {
		var row = XPath.snapshotItem(index);
		var tar_index = index+count;
		var building = row.innerHTML.match(/buildings\/([a-zA-Z]+)\.png/)[1];
		var step = (!row.innerHTML.match(/nicht vorhanden/)) ? row.innerHTML.split("(Stufe ")[1].split(")")[0] : "0";
		
		var tar_building = buildings[tar_index].split(":")[0];
		var tar_step = buildings[tar_index].split(":")[1];
		
		if(tar_building != building) {
			count++;
			index--;
			continue;
		}
		
		step = parseInt(step)+parseInt(getBuildUp(building));
		
		if(parseInt(step) > parseInt(tar_step))
			break_down(row, building);
		else if(parseInt(step) == parseInt(tar_step))
			ready(row);
	}
	
	if(location.href.match(/\&mode=destroy/)) {
		location.href = location.href.replace(/\&mode=destroy/g, "");
	}
})();