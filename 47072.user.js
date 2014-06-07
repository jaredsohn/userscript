// ==UserScript==
// @name           SSW View Sector Fix
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    This fixes the view sector problem that a couple people have.
// @include        http://www.secretsocietywars.com/index.php?p=space&a=view_sector
// @include        http://www.secretsocietywars.com/index.php?p=space&a=take_drones
// @include        http://www.secretsocietywars.com/index.php?p=space&a=drop_drones
// @include        http://www.secretsocietywars.com/index.php?p=space&a=move#takedrones
// @include        http://www.secretsocietywars.com/index.php?p=space&a=move#dropdrones
// ==/UserScript==

var node = document.evaluate('//a', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

if(!node) {
	if(document.location.href.indexOf("a=view_sector") > -1) {
		document.location.href = "http://www.secretsocietywars.com/index.php?p=space&a=move";
	} else if(document.location.href.indexOf("a=take_drones") > -1) {
		document.location.href = "http://www.secretsocietywars.com/index.php?p=space&a=move#takedrones";
	} else if(document.location.href.indexOf("a=drop_drones") > -1) {
		document.location.href = "http://www.secretsocietywars.com/index.php?p=space&a=move#dropdrones";
	}
} else if(document.location.href.indexOf("#takedrones") > -1) {
	var fset = new SSWFieldset();
	var cell;
	fset.clear();
	cell = fset.newcell();
	cell.appendChild(make_take_form());
} else if(document.location.href.indexOf("#dropdrones") > -1) {
	var fset = new SSWFieldset();
	var cell;
	fset.clear();
	cell = fset.newcell();
	cell.appendChild(make_drop_form());
}

function make_take_form() {
	return make_drone_form("How many drones would you like to recall?", "/index.php?p=space&a=take_drones", "drones2get", "Recall");
}

function make_drop_form() {
	return make_drone_form("How many drones would you like to drop?", "/index.php?p=space&a=drop_drones", "drones2drop", "Deploy");
}

function make_drone_form(txt, action, textname, bvalue) {
	var span = document.createElement('span');
	var form = document.createElement('form');
	var text = document.createElement('input');
	var button = document.createElement('input');
	form.appendChild(document.createTextNode(txt+" "));
	form.action = action;
	form.method = "post";
	text.type = "text";
	text.style.width = "150px";
	text.value = 1;
	text.name = textname;
	form.appendChild(text);
	button.type = "submit";
	button.name = "action";
	button.value = bvalue;
	form.appendChild(document.createTextNode(" "));
	form.appendChild(button);
	span.appendChild(form);
	return span;
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
		while(this.table.rows.length > 0) {
			this.table.deleteRow(0);
		}
	}
}

