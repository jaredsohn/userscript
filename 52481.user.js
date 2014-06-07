// ==UserScript==
// @name           SSW Facility Creator
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Creates and scraps facilities until they use the ore you want them to use
// @include        http://www.secretsocietywars.com/index.php?p=facilities&a=create
// ==/UserScript==

var ores = ["Afaikite", "Bofhozonite", "Esabatmite", "Fwiwzium", "Imhozium", "Lmaozium", "Lolnium", "Nimbyite", "Omgonite", "Pebkacium", "Rofolzium", "Tanstaaflite"];
var checkboxes = new Object();
var need;
var want;
var needed = GM_getValue("needed", 1);
var messagespan;
var need_select;
var facilities_created = 0;
var confirm_number = 0;
var confirmed = false;

if(typeof(GM_getValue("need_Bofhozonite")) == "undefined") {
	GM_setValue("need_Bofhozonite", true);
	GM_setValue("need_Fwiwzium", true);
}

if(!config_rores()) {
	add_create_form();
}

function config_rores() {
	var found;
	found = config_rore(1);
	found = config_rore(2) || found;
	found = config_rore(3) || found;
	return found;
}

function config_rore(num) {
	var rore = document.evaluate('//select[@name="rores'+num+'"]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if(rore) {
		rore.addEventListener('change', function(ev) {GM_setValue("rores"+num, this.value);}, false);
		rore.value = GM_getValue("rores"+num, rore.value);
		return true;
	}
	return false;
}

function submit_create_facility(ev) {
	var radio = document.evaluate('//input[@type="radio"][@name="facility"][@value="drone_factory"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

	need = new Array();
	want = new Array();
	if(radio) {
		if(radio.checked) {
			ev.preventDefault();
			needed = parseInt(need_select.options[need_select.selectedIndex].value);
			GM_setValue("needed", needed);
			for(var i = 0; i < checkboxes.need.length; i++) {
				GM_setValue("need_"+ores[ i ], checkboxes.need[ i ].checked);
				if(checkboxes.need[ i ].checked) {
					need.push(ores[ i ]);
				}
			}
			for(var i = 0; i < checkboxes.want.length; i++) {
				GM_setValue("want_"+ores[ i ], checkboxes.want[ i ].checked);
				if(checkboxes.want[ i ].checked && !checkboxes.need[ i ].checked) {
					want.push(ores[ i ]);
				}
			}
			if(need.length < needed) {
				alert("Error: You have chosen only " + need.length + " ores in the top section but have said you require " + needed + " of them.");
			} else if(need.length + want.length < 3) {
				alert("Error: You need to select at least 3 ores");
			} else {
				var fs;
				fs = get_fieldset();
				messagespan = document.createElement('span');
				fs.appendChild(messagespan);
				create_facility(0);
			}
		}
	}
}

function create_facility(confirm) {
	if(!confirmed) {
		facilities_created++;
	}
	messagespan.innerHTML = "Creating Facility #" + facilities_created;
	if(typeof(confirm) == "undefined") {
		confirm = confirm_number;
	}
	GM_post("/index.php?p=facilities&a=create", "facility=drone_factory&confirm="+confirm+"&submit=YES, I want to create a new Mining Colony here", facility_created);
}

function facility_created(responseText) {
	var matched = 0;

	for(var i = 0; i < need.length; i++) {
		if(responseText.indexOf(need[ i ] + " Ore") > -1) {
			matched++;
		}
	}
	if(matched < needed) {
		scrap_facility(responseText);
		return;
	}
	for(var i = 0; i < want.length; i++) {
		if(responseText.indexOf(want[ i ] + " Ore") > -1) {
			matched++;
		}
	}

	if(matched < 3) {
		scrap_facility(responseText);
	} else {
		manage_facility(responseText);
	}
}

function scrap_facility(responseText) {
	var re;
	if(re = /p=facilities&a=facility&id=(\d+)/.exec(responseText)) {
		confirmed = false;
		messagespan.innerHTML = "Scrapping facility";
		GM_get("/index.php?p=facilities&a=scrap&id="+re[1]+"&accept=yes", function() {create_facility();});
	} else if(responseText.indexOf("You do not have any Construction Kits") > -1) {
		messagespan.innerHTML = "<B>Error:</B> You don't have any more construction kits.  The script is quitting.  You should buy more construction kits";
	} else if(!confirmed && (responseText.indexOf("Are you sure you want to create a new") > -1)) {
		if(re = /name="confirm"[^>]+value="(\d+)"/i.exec(responseText)) {
			confirm_number = re[1];
			confirmed = true;
			create_facility(confirm_number);
		} else {
			messagespan.innerHTML = "<B>Error:</B> Unable to determine confirm number.  This script probably won't work again until nardo fixes it, but you're free to try again.";
		}
	} else {
		messagespan.innerHTML = "<B>Error:</B> Unable to find ID to scrap facility.  This probably means that a facility could not be created because you were PVP'd, buy maybe you ran out of construction kits.  In any event, you should refresh the page to see what's up.  The script has quit and is no longer running.";
		alert("pausing: "+responseText.length);
		document.body.innerHTML = responseText;
	}
}

function manage_facility(responseText) {
	var re;
	if(re = /p=facilities&a=facility&id=(\d+)/.exec(responseText)) {
		document.location.href = "/index.php?"+re[0];
	} else {
		messagespan.innerHTML = "<B>Error:</B> Facility with desired ores was created, but I'm unable to take you to the manage screen.";
	}
}

function add_create_form() {
	var table = document.createElement('table');
	var row;
	var cell;
	var dronetable;
	var button = document.evaluate('//input[contains(@value, "CREATE FACILITY")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

	if(button) {
		button.addEventListener("click", submit_create_facility, false);
	} else {
		return;
	}

	cell = table.insertRow(0).insertCell(0);
	cell.colSpan = 3;
	cell.appendChild(document.createTextNode("Require "));
	cell.appendChild(need_select = make_select([0, 1, 2, 3], [0, 1, 2, 3], needed));
	cell.appendChild(document.createTextNode(" of these ores"));
	make_ore_table("need", table);
	cell = table.insertRow(table.rows.length).insertCell(0);
	cell.colSpan = 3;
	cell.appendChild(document.createTextNode("Usable Ores"));
	make_ore_table("want", table);
	
	dronetable = document.evaluate('//text()[contains(., "BATTLE DRONE FACTORY")]//ancestor::table[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(dronetable) {
		dronetable.rows[1].cells[1].appendChild(document.createElement('br'));
		dronetable.rows[1].cells[1].appendChild(table);
	}
}

function make_ore_table(id, table) {
	var row;
	var cell;
	checkboxes[id] = new Array();
	for(var i = 0; i < ores.length; i++) {
		if((i % 3) == 0) {
			row = table.insertRow(table.rows.length);
		}
		cell = row.insertCell(row.cells.length);
		cell.appendChild(create_checklabel(ores[ i ], id));
	}
}

function make_select(labels, values, def) {
	var s = document.createElement('select');
	for(var i = 0; i < labels.length; i++) {
		s.options[ i ] = new Option(labels[ i ], values[ i ]);
		if(values[ i ] == def) {
			s.options[ i ].selected = true;
		}
	}
	return s;
}

function create_checklabel(ore, id) {
	var span = document.createElement('span');
	var check;
	var label;

	check = document.createElement('input');
	check.type = "checkbox";
	check.value = ore;
	check.id = id+ore;
	check.checked = GM_getValue(id+"_"+ore, false);
	check.addEventListener('click', function() {GM_setValue("use_"+this.value, this.checked);}, false);
	label = document.createElement('label');
	label.htmlFor = "ore_"+ore;
	label.innerHTML = ore;
	span.appendChild(check);
	span.appendChild(label);
	checkboxes[id].push(check);
	return span;
}

function get_fieldset() {
	var fieldset = document.evaluate('//fieldset[@class="results"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var legend = document.createElement('legend');
		
	
	if(fieldset) {
		fieldset.innerHTML = "";
	} else {
		var maintd = document.evaluate('//td[@class="main"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		var table = document.createElement('table');
		var cell;
		
		table.width = "100%";
		table.cellSpacing = 0;
		table.cellPadding = 0;
		table.border = 0;
		fieldset = document.createElement('fieldset');
		fieldset.className = "results";
		cell = table.insertRow(0).insertCell(0);
		cell.setAttribute("style", "padding: 10px; background-color: rgb(255, 255, 255);");
		cell.appendChild(fieldset);
		maintd.insertBefore(table, maintd.firstChild);
	}
	legend.className = "results";
	legend.innerHTML = "&nbsp;&nbsp;<b>WHAT'S HAPPENING???</b>&nbsp;&nbsp;";
	fieldset.appendChild(legend);
	return fieldset;
}

function GM_get( dest, callback, external) {
	var theHost = (external)?"":document.location.host;
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://'+ theHost + dest,
		onload:function(details) {
			if( typeof callback=='function' ){
				callback(details.responseText);
			}
		}
	});
}

function GM_post( dest, vars, callback, external) {
	var theHost = (external)?"":document.location.host;
	if(GM_getValue('debug',false)){ 
		GM_log("dest " + dest);
		GM_log("var " + vars);
		GM_log("fn: "+callback.name);
		GM_log("caller "+GM_post.caller.name);
	}
	 GM_xmlhttpRequest({
	    method: 'POST',
	    url: 'http://'+theHost + dest,
	    headers: {'Content-type': 'application/x-www-form-urlencoded'},
			data: vars,
			onload:function(details) {
				if( typeof callback=='function' ){
					callback( details.responseText);
				}
			}
	});
}