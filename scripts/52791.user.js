// ==UserScript==
// @name				DSwriteUnitsInSim
// @author				
// @namespace			http://userscripts.org
// @description			Schreibt nach Auswahl bestimmte Einheiten in den Simulator
// @include			http://de*.die-staemme.de/game.php?*screen=place&mode=sim*
// ==/UserScript==




function _evaluate(path, context) {
	if(!context) {
		var context = document;
	}
	
	var XPath = document.evaluate(path, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var nodes = [];
	for(var x = 0; x < XPath.snapshotLength; x++) {
		nodes.push(XPath.snapshotItem(x));
	}
	
	return nodes;
}

function _$(kind) {
	return document.createElement(kind);
}

function _getCookie(name) {
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

function _setCookie(name, value) {
	var date_obj = new Date();
	time = date_obj.getTime();
	time += 1*365*24*60*60*1000;
	date_obj.setTime(time);
	
	var expires = "expires=" + date_obj.toGMTString() + ";";

	document.cookie = name + "=" + value + ";" + expires;
}

function _eraseCookie(name) {
   document.cookie = name + "=; expires=Thu, 01-Jan-70 00:00:01 GMT";
}


function pa_exists() {
	// Zurueckgeben, ob PA vorhanden ist
	return (document.body.innerHTML.match(/villages\.php/)) ? true : false;
}

function getGroupInfos() {
	var cookie = unescape(_getCookie("DSwriteUnitsInSim_groupinfos"));
	cookie = (cookie != "false") ? (cookie.split(",")) ? cookie.split(",") : [cookie] : [];
	var groups = [];
	
	for(var x = 0; x < cookie.length; x++) {
		var group = {};
		group.name = unescape(cookie[x].split(":")[0]);
		
		var units = cookie[x].split(":")[1].split("&");
		for(var y = 0; y < units.length; y++) {
			var key = units[y].split(">")[0];
			var value = units[y].split(">")[1];
			
			group[key] = value;
		}
		
		groups.push(group);
	}
	
	return groups;
}


function insertUnits() {
	// nachschauen, was ausgewaehlt ist
	var selected = document.getElementById("group_select").value;
	if(!selected) {
		return;
	} else {
		var hidden = _$("input");
		hidden.type = "hidden";
		hidden.id = "selected";
		hidden.value = selected;
		document.body.appendChild(hidden);
	}
	
	// Speicherungen einlesen
	var group = getGroupInfos()[selected];
	
	// Kopf setzen
	head.innerHTML = group.name;
	
	// Grafik zum loeschen des Eintrags setzen
	var link = _$("a");
	link.style.marginLeft = "7px";
	link.href = "javascript: //do nothing";
	link.addEventListener("click", deleteEntry, false);
	head.appendChild(link);
	
	var image = _$("img");
	image.style.height = "9px";
	image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGBQTFRFwradsqaOi39xxsCwKR4rjZWIo5V4f3BTcnxwl5yRpZyOzcWu1sy00Mexk4l9lp2OkJiKm4pqurWr1Muz3dK42M61mqCRlJuN0sivhY+Cf3Vwl42Dc19EeG1mjYN7AAAAg3R8aAAAACB0Uk5T/////////////////////////////////////////wBcXBvtAAAAhklEQVR42kzPVxaDIBBA0VGqYAIoiKY4+99lqBr+3mWAAywk4LVmsgBhce2t2aQhWNlFM7l5wIeVZu0dELBL7QxVcs9YoUjrClkOU7oDO+Q/pIFo7yOBt0sNbxOjiOVZ8axw0pH7NOi+VCUARd+4py2/+xcdCLiPuj7rT8FhcHB/P8VPgAEAd7IVfpMZXvYAAAAASUVORK5CYII=";
	link.appendChild(image);
	
	// Grafik zum bearbeiten des Eintrags setzen
	var link = _$("a");
	link.style.marginLeft = "7px";
	link.href = "javascript: //do nothing";
	link.addEventListener("click", openEditMode, false);
	head.appendChild(link);
	
	var image = _$("img");
	image.style.height = "9px";
	image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAMAAABstdySAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAMBQTFRFo5CH7pIW18m96ObdjFVIdXFjylEI9e3kraad9+3eundr6rOUtDgK3drOxG8D/fr5xMG11M/Ccm5h2tbMrKmg/f39/fz86+jfzYUo8LR7393Rs0getUok+vn119THixUI/Pz8r2Yl2IUb5X8F94w003wEx6ain2Rbzb654bmBzcS0zcq/3sTE2s3N5+XcgHpq16Zs5N7SvUsBopyNv1kAxbmoo0Aw9NrAvlMjp3RxwWgD9/f0ymEC2tHQ13QpAAAAZFsvlwAAAEB0Uk5T////////////////////////////////////////////////////////////////////////////////////AMJ7sUQAAAB6SURBVHjaYuBlZtYzNFWUlrdn0BMVVbA2sGKT1wExxcwlTHhYjEFMWU0+IzMGfRCTU8mKh0uLFcSUVLWRYRJkZWAWY2dUZePiBDH5uRmVLZikBIRATBU7dSY5EFNMjcVSQ1hYG6RWl8NWXJxdmJVBQAQEODiMhQACDABikQveh7ocXwAAAABJRU5ErkJggg==";
	link.appendChild(image);
	
	// Daten setzen
	var inputs = document.getElementsByTagName("input");
	for(var x = 0; x < inputs.length; x++) {
		var name = inputs[x].name;
		if(!name) {
			continue;
		}
		
		if(group[name]) {
			if(inputs[x].type == "checkbox") {
				inputs[x].checked = eval(group[name]);
			} else {
				inputs[x].value = group[name];
			}
		}
	}
}

function openEditMode() {
	// nachschauen, ob ein Eintrag editiert werden soll (wenn ja, dann dessen Index auslesen) oder ein neuer Eintrag erstellt werden soll
	if(document.getElementById("selected")) {
		var selected = document.getElementById("selected").value;
		var group = getGroupInfos()[selected];
	} else {
		var group = false;
	}
	
	// Anzeigen, dass man sich im Editierungsmodus befindet
	head.innerHTML = "Editierungsmodus";
	head.style.color = "red";
	
	// Textfeld fuer den Namen des Speichercontainers erzeugen
	cell.innerHTML = "Name: ";
	
	var name_field = _$("input");
	name_field.type = "text";
	name_field.id = "name";
	name_field.name = "name";
	name_field.value = (group) ? group.name : "";
	cell.appendChild(name_field);
	
	// Button aendern
	var button = _evaluate('//input[@type = "submit"]')[0];
	button.type = "button";
	button.addEventListener("click", saveEdits, false);
	button.value = "Speichern";
}

function saveEdits() {
	// nachschauen, ob ein Eintrag editiert werden soll (wenn ja, dann dessen Index auslesen) oder ein neuer Eintrag erstellt werden soll
	if(document.getElementById("selected")) {
		var selected = document.getElementById("selected").value;
	} else {
		var selected = false;
	}
	
	var inputs = document.getElementsByTagName("input");
	var entry = "";
	
	loop: for(var x = 0; x < inputs.length; x++) {
		var name = inputs[x].name;
		
		switch(inputs[x].type) {
			case "text":
				var value = escape(inputs[x].value);
				break;
			case "checkbox":
				var value = escape(inputs[x].checked);
				break;
			default:
				continue loop;
		}
		
		if(name == "name") {
			if(value == "") {
				return;
			}
			entry = value + ":";
			continue;
		}
		
		entry += (x == inputs.length-1) ? name + ">" + value : name + ">" + value + "&";
	}
	
	var cookie = unescape(_getCookie("DSwriteUnitsInSim_groupinfos"));
	cookie = (cookie != "false") ? (cookie.split(",")) ? cookie.split(",") : [cookie] : [];
	if(selected) {
		cookie[selected] = entry;
	} else {
		cookie.push(entry);
	}
	
	_setCookie("DSwriteUnitsInSim_groupinfos", escape(cookie.join(",")));
	location.reload();
}

function deleteEntry() {
	// aktuelle Auswahl ermitteln
	var selected = document.getElementById("selected").value;
	
	// cookie einlesen
	var cookie = unescape(_getCookie("DSwriteUnitsInSim_groupinfos"));
	cookie = (cookie != "false") ? (cookie.split(",")) ? cookie.split(",") : [cookie] : [];
	
	// aktuelle Auswahl rausloeschen
	cookie.splice(selected, 1);
	
	// speichern
	if(cookie.length == 0) {
		_eraseCookie("DSwriteUnitsInSim_groupinfos");
	} else {
		_setCookie("DSwriteUnitsInSim_groupinfos", escape(cookie.join(",")));
	}
	location.reload();
}


function addSelectField() {
	var select = _$("select");
	select.id = "group_select";
	select.addEventListener("change", insertUnits, false);
	cell.appendChild(select);
	
	var groups = getGroupInfos();
	if(groups.length == 0) {
		var option = _$("option");
		option.value = "false";
		option.innerHTML = " -- keine Eingaben -- ";
		select.appendChild(option);
		
		return;
	}
	
	var option = _$("option");
	option.value = "false";
	option.innerHTML = " -- bitte ausw&auml;hlen -- ";
	select.appendChild(option);
	
	for(var x = 0; x < groups.length; x++) {
		var option = _$("option");
		option.value = x;
		option.innerHTML = groups[x].name;
		select.appendChild(option);
	}
}

function addEditLink() {
	var link = _$("a");
	link.style.marginLeft = "7px";
	link.href = "javascript: //do nothing";
	cell.appendChild(link);
	
	var image = _$("img");
	image.addEventListener("click", openEditMode, false);
	image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAMAAABstdySAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAMBQTFRFo5CH7pIW18m96ObdjFVIdXFjylEI9e3kraad9+3eundr6rOUtDgK3drOxG8D/fr5xMG11M/Ccm5h2tbMrKmg/f39/fz86+jfzYUo8LR7393Rs0getUok+vn119THixUI/Pz8r2Yl2IUb5X8F94w003wEx6ain2Rbzb654bmBzcS0zcq/3sTE2s3N5+XcgHpq16Zs5N7SvUsBopyNv1kAxbmoo0Aw9NrAvlMjp3RxwWgD9/f0ymEC2tHQ13QpAAAAZFsvlwAAAEB0Uk5T////////////////////////////////////////////////////////////////////////////////////AMJ7sUQAAAB6SURBVHjaYuBlZtYzNFWUlrdn0BMVVbA2sGKT1wExxcwlTHhYjEFMWU0+IzMGfRCTU8mKh0uLFcSUVLWRYRJkZWAWY2dUZePiBDH5uRmVLZikBIRATBU7dSY5EFNMjcVSQ1hYG6RWl8NWXJxdmJVBQAQEODiMhQACDABikQveh7ocXwAAAABJRU5ErkJggg==";
	link.appendChild(image);
}


(function main() {
	if(!pa_exists()) {
		return; // nur mit PA erlaubt!
	}
	
	head = _evaluate('//th[. = "Angreifer"]/preceding-sibling::th')[0];
	head.style.textAlign = "center";
	
	cell = _evaluate('//a[@href = "javascript:unit_att();"]/parent::td/preceding-sibling::td')[0];
	cell.style.textAlign = "center";
	
	addSelectField();
	addEditLink();
})();