// ==UserScript==
// @name           SSW Drone Dropper
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Automatically drops drones in each sector you visit if the number of drones in that sector is below a threshold.
// @include        http://www.secretsocietywars.com/index.php?p=space*
// ==/UserScript==

var droneimg = "/images/items/battledrone.gif";

/* initialize communication with the spacenav so that it will wait when crossing multiple sectors */
var comspan1 = document.createElement('span');
var combutton = document.createElement('input');
combutton.type = "button";
combutton.id   = "wait";
combutton.style.display = "none";
//combutton.addEventListener('click', drop_drones, false);
comspan1.style.display = "none";
comspan1.id = "nardocom1";
comspan1.appendChild(combutton);
/* end spacenav communication */


var dronesgreen = "data:image/gif;base64,R0lGODlhUQATAMQAAEsbRK2trXtYdnRPblbfIDYTMTISLRsJGGVBX25MaHZXcXtjd4x5ibqot8GwvjMSLkUcP00gR1IlS1ctUYRugZSHkqCZn103WJqPmaWhpamoqVS+J1GIME5RPKurq////yH5BAEAAB8ALAAAAABRABMAAAX/4PchTEkJaKqubOu+cIwOyVWI3+I0GHMKioFwSCwaj8ikMimgIWyfDm8CqFqv2Kx2y+16txHIgdGgfqsTilq9SJjP8Pi2YGBUrh3OhrDhdLAIAYKDARQScoiJBQVqVh17BJF8f1aBARkMFhmCCxEAEhNUoJ6goROHaBMRpahVpaGerqanWYsoVY+SuhuUAJZ3AAoeghcAFBgYCBUYFxEUm5cUscgLDB4ZhmjWghYJrhXDARYLtQVBVRy66hyVgsDOgt4VghqCCAvhgh4UVfqDHt4iYBgGTQMVcISAXXlg4BwASOoibWgXQKECQfzmBfBgwQKCeh6ebNJwiJsCCoIY/wBIMExBhAScLgyrcEqASiwPHjiMqI6iQpgBVGq8QPRXFZQBEADAuModAAaCMCxzN0FQhgoUBryxUkDngCoQI06sYvSoIAUANFIkF0zQV05VLFRMS29jBkxPCWFgu9ArOp6R2JF16ktugGJqq1xIaTaAN7h072ikgKCyggQRLpxEGCALQyG4wkriRdHCgAWGbyb+VC9DZbkGlwZgO+/OgJRP7tWgjEBBa88GEngLrY40RUJXUWEQdIUCyGEebkJejgGAwEHQFlhCBvmKAQOV8ejh4wfLhY7ox73JZAFLprsWGJjpiPZpfDQVNMF3g+FuBgsVtGLFdxMolUgiF1RWTEYcCVbWSmVPaCHGAQU0c+CFGMIx4QEfFADBInTk9ACIJJZo4okopqjiinR8d8CLOFC4yHc01mjjjTQyhOOOPOrI448wfhACADs=";
var dronesred   = "data:image/gif;base64,R0lGODlhUQATAMQAAEsbRN8gIK2trXtYdnRPbjYTMTISLcYfJ50eMHQcOhsJGFcsUGVBX25MaHZXcbqot8GwvjMSLkUcP1AjSol1hpOGkaCZn103WIBpfVVMVJqOmaWhpamnqauqq6ysrP///yH5BAEAAB8ALAAAAABRABMAAAX/4PdlVUVhQ6qubOu+cCynRHMV4odBj3amDoJwSCwaj8ikMjmoMW6j3gJArVqv2Kx2y+1qJxIF5TH1UheYdHrQKJvfcG3BQNFYE4hD4IBIXBkCgYICFBNxh4gFBSdVCXoBkHt+VYACGxUWG4EYVBMLU5+Gnp8Lhmelo6adpKVVrK1XiilUjpG2B5MAlRVUDh2BFwB1GgwVGsEYmpYYphoaAxQdG4Vn0YEWDWcVvwIWA1iKQVQItuUIlIG8VBSB2RUeHhyBDBjcgR0UVPD2HdkTGr80eegw5d0gdVYiGBAH4FE5SAfQCUDoIFC+CvcsWGAgr8MTTRymXHOAwSKABh4E/ziY0GDThV8VSkHDEiECw4flJCJsSQgARgEXgu5aNw/AJk/phAXSYCzdgkCXKBBwU6WATQJUHD6MSGUolZIqfQaSyAlARQFYA30DYGEiAA2BOm64pFTQM5pXx+GEdK5rUl1tgYoVUOWCybrZNlHByOsnBQaQHTSYcMEBhW1jrygUQktrJFwSLRAYEDjf4CoT5G2A3JagUQFlGQMgYPEJAzYXMERWTdNAg2ydy4GWOOhSs8xfO/7yYFrxWwF2/glSpnspXAFrrRgwAPlOnj19rlzQSN4CBjcUNF5JP9dCTCoaHayzYHoBprkbsF3QgN+9qirbLcAAIgReAFkwcBgImUQqkD2RRRgKFHDBfwRWaCEXECrwQQESKDJHTRF4KOKIJJZo4okopjjHdgq0mEOEimwn44w01iijQjbmqCOOOvbo4gchAAA7";
var spacenav = document.evaluate('//text()[contains(., "SPACENAV ")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

var results_cell;

add_configure_span();
if(GM_getValue("enabled", true) && (document.location.href.indexOf("a=move&destination") > -1)) {
	drop_drones();
}

function drop_drones() {
	var drone_target = GM_getValue("drone_target", 100);
	var drones_in_sector = num_drones_in_sector();
	var planet = document.evaluate('//a[contains(@href, "p=planets&a=land")]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var dtorig = drone_target;
	var asterisk = false;

	if(drone_target.charAt(0) == '*') {
		asterisk = true;
		drone_target = drone_target.substr(1);
	} else if(drone_target.charAt(0) == '_') {
		drone_target = "-"+drone_target.substr(1);
	}
	drone_target = parseInt(drone_target, 10);

	if(asterisk && (drones_in_sector > drone_target)) {
		drone_target = -drone_target;
		dtorig = '-'+dtorig.substr(1);
	}

//	if(drone_target <= 0 && !document.evaluate('//a[contains(@href, "a=take_drones")]/text()[contains(., "drone")]', document, null, XPathResult.BOOLEAN_TYPE, null).booleanValue) {
//		return;
//	}

	if(!planet && spacenav && (drones_in_sector < drone_target)) {
		if(!results_cell) {
			results_cell = (new SSWFieldset()).newcell();
		}
		add_drones(drone_target - drones_in_sector);
	} else if(!planet && spacenav && drones_in_sector && ((drone_target < 0) || (dtorig == "-0"))) {
		if(!results_cell) {
			results_cell = (new SSWFieldset()).newcell();
		}
		if(drones_in_sector > -drone_target) {
			add_drones(-(drones_in_sector + drone_target));
		}
	}
}

function toggle_enabled(ev) {
	if(GM_getValue("enabled", true)) {
		GM_setValue("enabled", false);
		this.src = dronesred;
	} else {
		GM_setValue("enabled", true);
		this.src = dronesgreen;
		drop_drones();
	}
}

function change_target(ev) {
	var re;
	if(re = /[_\-\*]?\d+/.exec(this.value)) {
//		GM_setValue("drone_target", parseInt(re[0]));
		GM_setValue("drone_target", re[0]);
	} else {
		GM_setValue("drone_target", 0);
	}
}

function add_configure_span() {
	var toprow;
	var viewlink = document.evaluate('//a[contains(@href, "p=space&a=view_sector")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	
	toprow = find_parent(viewlink, "TR");
	if(toprow) {
		var dronesimg = document.createElement('img');
		var dronecount = document.createElement('input');
		var cell;
		var newtable = document.createElement('table');

		if(GM_getValue("enabled", true)) {
			dronesimg.src = dronesgreen;
		} else {
			dronesimg.src = dronesred;
		}
		dronesimg.addEventListener('click', toggle_enabled, false);
		dronesimg.style.cursor = "pointer";
		dronecount.type = 'text';
		dronecount.style.border = "2px solid rgb(75, 27, 68)";
		dronecount.style.fontSize = "12px";
		dronecount.style.width = "50px";
		dronecount.style.height = "19px";
		dronecount.value = GM_getValue("drone_target", 100);
		dronecount.addEventListener('keyup', change_target, false);

		cell = toprow.insertCell(toprow.cells.length);
		cell.style.verticalAlign = "middle";
		newtable.cellSpacing = 0;
		newtable.cellPadding = 0;
		newtable.border = 0;
		newtable.insertRow(0);
		newtable.rows[0].insertCell(0);
		newtable.rows[0].insertCell(1);
		newtable.rows[0].cells[0].style.paddingLeft = "1px";
		newtable.rows[0].cells[0].appendChild(dronecount);
		newtable.rows[0].cells[1].appendChild(dronesimg);
		cell.appendChild(newtable);
	}
}

function add_drones(num) {
	if(results_cell) {
//		results_cell.style.display = "block";
		if(num < 0) {
			results_cell.innerHTML = "Picking up drones...";
		} else {
			results_cell.innerHTML = "Adding " + num + " drones";
		}
	}
	document.body.appendChild(comspan1);
	if(num < 0) {
		GM_post("/index.php?p=space&a=take_drones", "drones2get="+(-num)+"&action=Recall", dropped_drones);
	} else {
		GM_post("/index.php?p=space&a=drop_drones", "drones2drop="+num+"&action=Deploy", dropped_drones);
	}
}

function dropped_drones(responseText) {
	var re;
	var dronetable;
	if(results_cell) {
		if(re = /<table border="0"><tr><td width="50"><img[^>]+title="[^"]*battle drone.*?<\/table>/i.exec(responseText)) {
			results_cell.innerHTML = re[0];
		} else if(responseText.indexOf("You do not have any drones") > -1) {
			results_cell.innerHTML = "<b>You do not have any drones</b>";
		} else {
			results_cell.innerHTML = "Added drones";
		}
	}

	if(re = /(\d+)\s+\S+(\s+\S+)?\s+Drones?!/.exec(responseText)) {
		var new_drone_text = re[0];
		var drone_textobj;
//		var takelink;
		var takeinput;
		var take_num = 0;
		dronetable = make_drone_table();
//		takelink   = make_drone_link(dronetable);
		takeinput  = make_drone_input(dronetable);
		drone_textobj = document.evaluate('.//text()[contains(., "Drone")]', dronetable, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if(drone_textobj) {
			drone_textobj.data = new_drone_text;
		}
		/*
		if(re = /Take (\d+) drone\(s\)/.exec(responseText)) {
			takelink.innerHTML = "Take " + re[1] + " drone(s)";
		}
		*/
		if(re = /name="drones2get" value="(\d+)"/.exec(responseText)) {
			takeinput.value = re[1];
		}
	}
	comspan1.removeChild(combutton);
}


function make_drone_table() {
	/* sectortable is the table that contains the stuff in the current sector: drones, asteroids, trading ports, etc. */
//	var sectortable = document.evaluate('//td[@class="main"]//table[@cellspacing="5"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var dronetable;
	var droplink = document.evaluate('//td[@class="main"]//table[@cellpadding="5"]//a[contains(@href, "index.php?p=space&a=drop_drones")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	
	dronetable = find_parent(find_parent(find_parent(droplink, "TABLE"), "TBODY"), "TABLE"); /* tbody -> table is done because table -> table doesn't work */
	if(dronetable && (dronetable.rows.length < 2)) {
		dronetable.insertRow(1).insertCell(0);
	}

	if(dronetable) {
		var gif = document.evaluate('.//img[contains(@src, "battledrone.gif")]', dronetable, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if(!gif) {
			var cell;
			var img = document.createElement('img');
			var textbox;			
			cell = dronetable.rows[1].cells[0];
			cell.innerHTML = "";
			cell.style.fontSize = "";
			cell.style.color = "";
			cell.className = "planet_info";
			cell.style.textAlign = "center";
			img.src = droneimg;
			cell.appendChild(img);
			cell.appendChild(document.createElement('br'));
			cell.appendChild(document.createTextNode("0 society Drones!"));
			cell.appendChild(document.createElement('br'));
			textbox = make_drone_input(dronetable);
			textbox.value = "0";
		}
	}
	return dronetable;
}

function make_drone_input(table) {
	var takeinputs = document.evaluate('.//input[@name="drones2get"]', table, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var takeinput;

	if(takeinputs.snapshotLength >= 1) {
		takeinput = takeinputs.snapshotItem(takeinputs.snapshotLength - 1);
	}
	if(!takeinput) {
		var form = document.createElement('form');
		var button = document.createElement('input');
		form.action = "/index.php?p=space&a=take_drones";
		form.method = "post";
		takeinput = document.createElement('input');
		takeinput.type = "text";
		takeinput.setAttribute("style", "width: 30px; font-size: 9px; background-color: rgb(204, 204, 204);");
		takeinput.value = "";
		takeinput.name = "drones2get";
		button.type = "submit";
		button.setAttribute("style", "font-size: 9px; background-color: rgb(204, 204, 204);");
		button.value = "Take Drone(s)";
		button.name = "action";
		form.appendChild(document.createTextNode(" "));
		form.appendChild(takeinput);
		form.appendChild(document.createTextNode(" "));
		form.appendChild(button);
		form.appendChild(document.createTextNode(" "));
		table.rows[1].cells[0].appendChild(form);
	}
	return takeinput;
}

function make_drone_link(table) {
	var takelinks = document.evaluate('.//a[contains(@href, "p=space&a=take_drones")]', table, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var takelink;
	
	if(takelinks.snapshotLength > 1) {
		takelink = takelinks.snapshotItem(takelinks.snapshotLength - 1);
	}	
	
	if(!takelink) {
		takelink = document.createElement('a');
		takelink.style.color = "rgb(255, 255, 255)";
		takelink.href = "http://www.secretsocietywars.com/index.php?p=space&a=take_drones";
		takelink.innerHTML = "Take 0 drone(s)";
		table.rows[1].cells[0].appendChild(takelink);
	}
	return takelink;
}

function num_drones_in_sector() {
	var re;
	var drones = 0;
	
	if(re = /(\d+)\s+\S+(?:\s+\S+)?\s+Drones!/.exec(document.body.innerHTML)) {
		drones = parseInt(re[1]);
	}
	return drones;
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

function find_parent(node, nodetype) {
	while(node && (node.nodeName != nodetype)) {
		node = node.parentNode;
	}
	return node;
}

function SSWFieldset() {
	this.fieldset = document.evaluate('//fieldset[@class="results"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

	if(this.fieldset) {
		this.table = document.evaluate('.//table//table', this.fieldset, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		this.legend = document.evaluate('.//legend', this.fieldset, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	} else {
		var maintd = document.evaluate('//td[@class="main"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		var table;
		var cell;
	
		this.legend = document.createElement('legend');
		this.legend.className = "results";
		this.legend.innerHTML = "&nbsp;&nbsp;<b>WHAT HAPPENED???</b>&nbsp;&nbsp;"
		this.fieldset = document.createElement('fieldset');
		this.fieldset.className = "results";
		table = document.createElement('table');
		table.width = "100%";
		table.cellSpacing = table.cellPadding = table.border = 0;
		cell = table.insertRow(0).insertCell(0);
		cell.style.padding = "10px";
		cell.style.backgroundColor = "white";
		cell.appendChild(this.fieldset);
		maintd.insertBefore(table, maintd.firstChild);
		table = document.createElement('table');
		table.width = "100%";
		table.cellSpacing = table.border = 0;
		table.cellPadding = 10;
		cell = table.insertRow(0).insertCell(0);
		this.fieldset.appendChild(this.legend);
		this.fieldset.appendChild(table);
		this.table = document.createElement('table');
		this.table.width = "100%";
		this.table.cellSpacing = this.table.border = 0;
		this.table.cellPadding = 10;
		cell.appendChild(this.table);
	}
	
	this.caption = function(cap) {
		this.legend.innerHTML = "&nbsp;&nbsp;<b>"+cap+"</b>&nbsp;&nbsp;";
	}

	this.newcell = function() {
		var cell;
		cell = this.table.insertRow(this.table.rows.length).insertCell(0);
		if(this.table.rows.length % 2) {
			cell.style.backgroundColor = "rgb(204, 204, 204)";
		} else {
			cell.style.backgroundColor = "rgb(238, 238, 238)";
		}
		return cell;
	}
	
	this.clear = function() {
		while(this.table.rows.length > 0) {
			this.table.deleteRow(0);
		}
	}
}
