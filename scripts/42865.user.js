// ==UserScript==
// @name           SSW Costume Doppelpets
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Allows you to equip or unequip a Doppelpet when you equip a costume.
// @include        http://www.secretsocietywars.com/index.php?p=inventory&a=costumes
// @include        http://www.secretsocietywars.com/index.php?p=inventory&a=equipment
// @include        http://www.secretsocietywars.com/examine.php?examine=custom&id=*
// @include        http://www.secretsocietywars.com/examine.php?examine=basic&id=*
// ==/UserScript==

var re;

if(document.location.href.indexOf("/examine.php") > -1) {
	add_doppelpet_conf();
} else if(document.location.href.indexOf("p=inventory") > -1) {
	save_doppelpet_info();
	if(re = /Equipping (?:Custom|Basic) Costume:\s*<i\s*>([^<]+)/i.exec(document.body.innerHTML)) {
		costume_doppelpet_action(re[1]);
	}
}

function save_doppelpet_info() {
	var info = get_doppelpet_info();
//	var current_doppelpet = document.evaluate('//text()[contains(., "Mini-")]/following-sibling::a[contains(@href, "p=records&a=view_player")]/text()', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var current_doppelpet = get_current_doppelpet();
	var doppelpets = new Array();
	for(var i = 0; i < info.length; i++) {
		doppelpets.push(info[i][2]);
	}
	if(current_doppelpet) {
		doppelpets.push(current_doppelpet);
	}
	GM_setValue("doppelpets", doppelpets.sort(cisort).toSource());
}

function get_current_doppelpet() {
	var current_doppelpet = document.evaluate('//text()[contains(., "Mini-")]/following-sibling::a[contains(@href, "p=records&a=view_player")]/text()', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(current_doppelpet) {
		return current_doppelpet.data;
	}
	return undefined;
}

function cisort(a, b) {
	var al = a.toLowerCase(); 
	var bl = b.toLowerCase(); 
	if (al > bl) {
		return 1;
	} else if (a < b) {
		return -1 
	}
	return 0;
}


function costume_doppelpet_action(costume_name) {
	var action = GM_getValue(costume_name, "");
	var fieldset = new SSWFieldset();
	var cell;
	var re;

	if(action == "toss") {
		if(document.evaluate('//a[contains(@href, "p=pets&a=toss")]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue) {
			cell = fieldset.newcell();
			cell.innerHTML = '<b style="color: rgb(0, 102, 0);">Tossing Doppelpet...</b><br>';
//			change_pet_html("Tossing doppelpet...");
			GM_get("/index.php?p=pets&a=toss", function(responseText) {pet_tossed(responseText, cell);});
		}
	} else {
		var doppelpets = get_doppelpet_info().sort(dpet_sort);
		var dpetnum = -1;
		var re;
		if(doppelpets.length > 0) {
			if(re = /^mini-(.*)$/.exec(action)) {
				var dpetname = re[1];
				for(var i = 0; i < doppelpets.length; i++) {
					if(doppelpets[i][2] == dpetname) {
						dpetnum = i;
						break;
					}
				}
				if((dpetnum == -1) && (dpetname != get_current_doppelpet())) {
					cell = fieldset.newcell();
					cell.innerHTML = '<b style="color: rgb(102, 0, 0);">Unable to equip Mini-'+dpetname+'</b><br>';
				}
			} else if(action.match(/^with/) || (document.body.innerHTML.indexOf("No doppelpet equipped.") > -1)) {
				action = action.replace(/^with/, "");
				if(action == "highest") {
					dpetnum = doppelpets.length-1;
				} else if(action == "lowest") {
					dpetnum = 0;
				} else if(action == "random") {
					dpetnum = Math.floor(Math.random()*doppelpets.length);
				}
			}
			if(dpetnum >= 0) {
				cell = fieldset.newcell();
				cell.innerHTML = '<b style="color: rgb(0, 102, 0);">Equipping Mini-'+doppelpets[dpetnum][2]+'...</b><br>';
				equip_doppelpet(doppelpets[dpetnum][0], cell);
			}
		}
	}
}

function equip_doppelpet(id, cell) {
//	change_pet_html("Equipping doppelpet...");
	GM_post("/index.php?p=pets&a=take", "id="+id+"&submit=submit", function(responseText) {pet_changed(responseText, cell);});
}

function dpet_sort(a, b) {
	return a[1] - b[1];
}

function get_doppelpet_info() {
	var info = new Array();
	var select = document.evaluate('//form[contains(@action, "p=pets&a=take")]//select[@name="id"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	for(var i = 0; i < select.options.length; i++) {
		var opt = select.options[i];
		var re;
		if(re = /^\s*([^\s]+).*?E:([\d,]+)/.exec(opt.text)) {
			info.push([opt.value, parseInt(re[2].replace(/,/g, '')), re[1]]);
		}
	}
	return info;
}

function pet_tossed(responseText, cell) {
	var re;
	if(re = /YOUR DOPPELPETS[\w\W]*?(<table[\w\W]*?p=pets&a=take[\w\W]*?<\/table[\w\W]*?<\/table[\w\W]*?<\/table\s*>)(?=[\w\W]*<td[^>]+class="main")/i.exec(responseText)) {
		change_pet_html(re[1], cell);
	} else {
		change_pet_html("No doppelpet equipped.", cell);
	}
}

function pet_changed(responseText, cell) {
	var re;
	if(re = /YOUR DOPPELPETS[\w\W]*?(<table[\w\W]*?p=pets&a=take[\w\W]*?<\/table[\w\W]*?<\/table[\w\W]*?<\/table\s*>)(?=[\w\W]*<td[^>]+class="main")/i.exec(responseText)) {
		change_pet_html(re[1], cell);
	} else {
		change_pet_html("Pet changed", cell);
	}
}

function change_pet_html(newhtml, cell) {
	var doppelpet_table = document.evaluate('//form[contains(@action, "p=pets&a=take")]/ancestor::table[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(newhtml.indexOf("<") == -1) {
		if(doppelpet_table.rows.length == 3) {
			doppelpet_table.deleteRow(0);
		}
		doppelpet_table.rows[0].innerHTML = '<td style="padding: 2px; font-size: 10px; color: rgb(0, 0, 0); background-color: rgb(238, 238, 238); text-align: center;">'+newhtml+'</td>';
	} else {
		doppelpet_table.innerHTML = newhtml;
	}
	if(cell) {
		var re;
		cell.innerHTML = cell.innerHTML.replace("...", "").replace(/^(<[^>]*>[^\s]+)ing/, "$1ed");
	}
}

function add_doppelpet_conf() {
//	var table = document.evaluate('//text()[.="RIGHT HAND"]/ancestor::table[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var table = document.evaluate('//text()[contains(., "This costume consists")]/ancestor::tr[1]/following-sibling::tr[1]//table', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var costume_name = get_costume_name();
	var choice = GM_getValue(costume_name, "");
	if(table) {
		var row;
		var cell;
		var select;
		var optgroup;
		var doppelpets = eval(GM_getValue("doppelpets", "[]"));
		row = table.insertRow(table.rows.length);
		cell = row.insertCell(0);
		cell = row.insertCell(1);
		cell.style.fontSize = "10px";
		cell.innerHTML = "<B>DOPPELPET</B>";
		cell = row.insertCell(2);
		cell.style.fontSize = "12px";
		select = document.createElement('select');
		select.add(new Option("No Change", "nochange", choice == "nochange"), null);
		select.add(new Option("Toss Doppelpet", "toss", choice == "toss"), null);
		for(var i = 0; i < doppelpets.length; i++) {
			select.add(new Option("Mini-"+doppelpets[i], "mini-"+doppelpets[i], choice == "mini-"+doppelpets[i]), null);
		}
		/*
		select.add(new Option("Equip Highest Exp", "withhighest", choice == "withhighest"), null);
		select.add(new Option("Equip Lowest Exp", "withlowest", choice == "withlowest"), null);
		select.add(new Option("Equip Random", "withrandom", choice == "withrandom"), null);
		*/
		optgroup = document.createElement('optgroup');
		optgroup.label = "Without a Doppelpet";
		select.add(optgroup, null);
		select.add(new Option("Equip Highest Exp", "highest", choice == "highest"), null);
		select.add(new Option("Equip Lowest Exp", "lowest", choice == "lowest"), null);
		select.add(new Option("Equip Random", "random", choice == "random"), null);
		select.addEventListener('change', function(ev) {save_doppelpet_choice(ev, costume_name);}, false);
		cell.appendChild(select);
	}
}

function save_doppelpet_choice(ev, costume_name) {
	var opt = ev.target.options[ev.target.selectedIndex];
	GM_setValue(costume_name, opt.value);
}

function get_costume_name() {
	var costume = "";
	var re;
	if(re = /COSTUME:\s*([^<]+)/.exec(document.body.innerHTML)) {
		costume = re[1];
	}
	return costume;
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
		this.table.innerHTML = "";
	}
}

