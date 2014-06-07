// ==UserScript==
// @name           SSW Autogamble
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Gambles multiple turns for you at casino combat
// @include        http://www.secretsocietywars.com/index.php?p=casino&a=casinocombat
// ==/UserScript==

var form = document.evaluate('//input[@type="checkbox" and @name="tie"]/ancestor::form[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var insert_point = document.evaluate('//input[@type="submit" and @value="Change Cardset"]/ancestor::form[1]/following-sibling::node()[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var gain_text;
var gain_type;
var running = false;


if(form && insert_point) {
	var span = make_autogamble_span();
	insert_point.parentNode.insertBefore(span, insert_point);
}

function autogamble(ev) {
	var gain;
	var type;
	var fieldset = new SSWFieldset();
	var stop_row;
	var turns_row;
	var results_row;

	ev.preventDefault();
	if(!running) {
		running = true;
		gain = parseInt(gain_text.value, 10);
		if(isNaN(gain)) {
			gain = 0;
		}
		type = gain_type.options[gain_type.selectedIndex].value;
		fieldset.clear();
		stop_row = fieldset.newcell("stop_row");
		turns_row = fieldset.newcell("turns_row");
		results_row = fieldset.newcell("results_row");
		stop_row.appendChild(make_stop_link());
		ag_process(gain, type, 0, 0, 0, fieldset);
	}
}

function make_stop_link(fieldset) {
	var link = document.createElement('a');
	link.href = document.location.href;
	link.appendChild(document.createTextNode("Stop Autogamble"));
	link.addEventListener('click',
		function(ev) {
			running = false;
			ev.preventDefault();
			ev.target.parentNode.replaceChild(document.createTextNode("Stopping..."), ev.target);
		},
		false);
	return link;
}

function ag_process(gain, type, turns, luck, money, fieldset) {
	if(type == "turns" && turns >= gain) {
		running = false;
	} else if(type == "luck" && luck >= gain) {
		running = false;
	}
	fieldset.cell("turns_row").innerHTML = "Autogambled "+turns+" turns";
	if(money >= 0) {
		fieldset.cell("results_row").innerHTML = "Profit: " + money + " Starbux<br>Luck gained: " + luck;
	} else {
		fieldset.cell("results_row").innerHTML = "Loss: " + Math.abs(money) + " Starbux<br>Luck gained: " + luck;
	}
	if(running) {
		setTimeout(function(){ag_post(function(responseText){ag_parse(responseText, gain, type, turns, luck, money, fieldset);});}, (turns > 0 ? 5000 : 0));
	} else {
		fieldset.cell("stop_row").innerHTML = "<b>Stopped</b>";
	}
}

function ag_post(callback) {
	var tie = document.evaluate('.//input[@name="tie"]', form, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var bet = document.evaluate('.//select[@name="bet"]', form, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var whichgame = document.evaluate('.//input[@name="whichgame"]', form, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var submit = document.evaluate('.//input[@name="submit"]', form, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(tie && bet && whichgame && submit) {
		var vars = "";
		if(tie.checked) {
			vars = "tie=on&";
		}
		vars += "bet="+bet.value+"&whichgame="+whichgame.value+"&submit="+submit.value;
		GM_post("/index.php?p=casino&a=casinocombat", vars, callback);
	} else {
		alert("Autogamble:\nUnable to find the proper form.  This script is terminating.");
	}
}

function ag_parse(responseText, gain, type, turns, luck, money, fieldset) {
	var re;
	if(re = /You wager ([\d,]+) Starbu/i.exec(responseText)) {
		money -= parseInt(re[1].replace(/,/g, ""), 10);
	}
	if(re = /Tie Bet of ([\d,]+) Starbu/i.exec(responseText)) {
		money -= parseInt(re[1].replace(/,/g, ""), 10);
	}
	if(re = /Giving ([\d,]+) Imperial/i.exec(responseText)) {
		money += parseInt(re[1].replace(/,/g, ""), 10);
	}
	if(re = /Giving (\d+) Luck/i.exec(responseText)) {
		luck += parseInt(re[1], 10);
	}
	if(re = /Taking (\d+) Luck/i.exec(responseText)) {
		luck -= parseInt(re[1], 10);
	}
	if(re = /you don't have enough turns/i.exec(responseText)) {
		running = false;
		turns--;
	}
	ag_process(gain, type, turns+1, luck, money, fieldset);
}

function make_autogamble_span() {
	var span = document.createElement('span');
	var aglink = document.createElement('a');
	aglink.innerHTML = "Autogamble";
	aglink.href = "/index.php?p=casino&a=casinocombat";
	aglink.style.color = "white";
	aglink.addEventListener("click", autogamble, false);
	span.appendChild(aglink);
	span.appendChild(document.createElement('br'));
	gain_text = document.createElement('input');
	gain_text.type = "text";
	gain_text.size = 3;
	span.appendChild(gain_text);
	gain_type = document.createElement('select');
	gain_type.add(new Option("Turns", "turns"), null);
	gain_type.add(new Option("Luck", "luck"), null);
	span.appendChild(gain_type);
	return span;
}
	
function SSWFieldset() {
	this.fieldset = document.evaluate('//fieldset[@class="results"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	this.cells = new Object();

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

	this.newcell = function(cellname) {
		var cell;
		cell = this.table.insertRow(this.table.rows.length).insertCell(0);
		if(this.table.rows.length % 2) {
			cell.style.backgroundColor = "rgb(204, 204, 204)";
		} else {
			cell.style.backgroundColor = "rgb(238, 238, 238)";
		}
		if(cellname && (typeof(this.cells[cellname]) == "undefined")) {
			this.cells[cellname] = cell;
		}
		return cell;
	}

	this.cell = function(cellname) {
		return this.cells[cellname];
	}

	this.clear = function() {
		while(this.table.rows.length > 0) {
			this.table.deleteRow(0);
		}
	}
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
