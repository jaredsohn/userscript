// ==UserScript==
// @name           SSW Time Suit
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Adds a link to put on your time suit.  Right click the link to make it green whenever you are on the same page.
// @include        http://www.secretsocietywars.com/*
// ==/UserScript==

var items = [["Timenesium T-Shirt", "shirt"], ["Timeslip Timepiece", "gloves"], ["Market Madness Boots", "shoes"], ["Envision Success Moneyshades", "shades"], ["Timenesium Trousers", "pants"]];
var otheritems = [["Weight Cheater Choker", "Necklace"], ["ACME Laxative Slacks", "pants"]];
var greenpages = eval(GM_getValue("greenpages", "({})"));
var currentpage = get_short_url();
var dbih = document.body.innerHTML;

if(/p=inventory&a=(costumes|equipment|equip)/.exec(document.location.href)) {
	var re;
	check_costumes();
	get_outfits();
} else if(/p=inventory&a=(consumables|use)/.exec(document.location.href)) {
	consumables();
}

if(document.location.href.indexOf("p=lodge&a=spaceman_supply") > -1) {
	check_token_usage();
}
if(document.location.href.indexOf("p=quests&a=quest&confirm=1") > -1) {
	check_empaths();
}
if((document.location.href.indexOf("p=casino&a=restroom") > -1) && (GM_getValue("ACME Laxative Slacks", 0) > 0)) {
	bathroom();
}
battle_tokens();

if(!document.evaluate('//a[contains(@href, "p=space&a=view_sector")]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue) {
	var append = new Array();
	if(!wearing_suit()) {
		append.push(make_equip_link());
	}
	if(GM_getValue("empaths_fed", "unknown") != get_date()) {
		append.push(document.createTextNode("US"));
	}

	if(append.length > 0) {
		var row = document.evaluate('//form[@name="pnform"]//ancestor::tr[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		var cell;
		if(row) {
			for(var i = 0; i < append.length; i++) {
				cell = row.insertCell(0);
				cell.style.verticalAlign = "middle";
				cell.style.padding = "0px 4px 0px 0px";
				cell.style.color = "white";
				cell.appendChild(append[i]);
			}
		}
	}
	add_outfit_options("pnselect", false);
} else {
	add_outfit_options("pnselect", true);
}


if(document.location.href.indexOf("#equiptimesuit") > -1) {
	equip_time_suit();
}

if(document.location.href.indexOf("#equiplaxativepants") > -1) {
	equip_laxative_pants();
}

function battle_tokens() {
	var tokens = GM_getValue("battle_tokens", 0);
	var last_checked = GM_getValue("battle_tokens_checked", 0);
	var epeen_cell = document.evaluate('//text()[contains(., "E-PEEN")]/ancestor::td[1][contains(@class, "pattrL")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
//	var today = get_date();
	var now = get_date() + " " + get_hour();
	var inbattle = document.evaluate('//select[@name="rh_attack"]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	
	if(epeen_cell) {
		var epeen_row = document.evaluate('./ancestor::tr[1]', epeen_cell, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		var epeen_table = document.evaluate('./ancestor::table[1]', epeen_row, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		var row = epeen_table.insertRow(epeen_row.rowIndex+1);
		var cell = document.createElement('td');
		var cell2 = document.createElement('td');
		var text = document.createTextNode(tokens);

		if(epeen_cell.className == "pattrL1") {
			cell.className = "pattrL2";
			cell2.className = "pattrR2";
		} else {
			cell.className = "pattrL1";
			cell2.className = "pattrR1";
		}
		cell.appendChild(document.createTextNode("TOKENS"));
		row.appendChild(cell);
		cell2.appendChild(text);
		row.appendChild(cell2);
		if(!inbattle && past_rollover() && (last_checked != now)) {
			text.data = "Loading..."
			GM_get("/index.php?p=inventory&a=inventory", function(rt) {update_tokens(rt, text);});
		}
	}
}

function check_token_usage() {
	var re;
	if(re = /Taking\s+[\d,]+\s+Battle Tokens.*?ow you have\s+(none|[\d,]+)/.exec(dbih)) {
		if(re[1] == "none") {
			GM_setValue("battle_tokens", 0);
		} else {
			GM_setValue("battle_tokens", re[1]);
		}
	}
}

function update_tokens(responseText, textnode) {
	var re;
	var tokens = 0;
	if(re = /Battle Token\s+\(([\d,]+)\)/.exec(responseText)) {
		tokens = re[1];
	}
	textnode.data = tokens;
	GM_setValue("battle_tokens", tokens);
	GM_setValue("battle_tokens_checked", get_date()+" "+get_hour());
}

function consumables() {
	if(GM_getValue("Weight Cheater Choker") > 0) {
		var table = document.getElementById('inv');
		if(table) {
			var cell = table.insertRow(1).insertCell(0);
			cell.colSpan = 5;
			cell.style.background = "rgb(255, 128, 128)";
			cell.innerHTML = "*Warning* Choker is unequiped";
		}
	}
}

function check_empaths() {
	if((dbih.indexOf("Taking 1 Dolphin Brain") > -1) && (dbih.indexOf("Taking 1 Spliff") > -1)) {
		GM_setValue("empaths_fed", get_date());
	}
}

function bathroom() {
	var td = document.evaluate('//text()[contains(., "Number Two enough today")]/ancestor::td[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var button = document.evaluate('//input[@value="Number Two"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

	if(button && (GM_getValue("ACME Laxative Slacks", 0) > 0)) {
		add_bathroom_buttonwarning(button);
	} else if(td) {
		add_bathroom_tdlink(td);
	}
}

function add_bathroom_tdlink(td) {
	var link = document.createElement('a');
	link.href = "/index.php?p=inventory&a=equipment#equiplaxativepants";
	link.addEventListener('click', function(ev) {ev.preventDefault(); equip_laxative_pants_a(td, link);}, false);
	link.innerHTML = "Equip Laxative Pants";
	td.appendChild(document.createElement('br'));
	td.appendChild(link);
}

function add_bathroom_buttonwarning(button) {
	var div = document.createElement('div');
	var link = document.createElement('a');
	link.href = "/index.php?p=inventory&a=equipment#equiplaxativepants";
	link.addEventListener('click', function(ev) {ev.preventDefault(); equip_laxative_pants_b(div, link);}, false);
	link.innerHTML = "Equip Laxative Pants";
	div.style.width = button.style.width;
	div.style.backgroundColor = "rgb(255, 128, 128)";
	div.style.textAlign = "center";
	div.appendChild(link);
	button.parentNode.insertBefore(div, button.nextSibling);
	button.parentNode.insertBefore(document.createElement('br'), div);
}

function get_date() {
	var re;
	if(re = /UTC:[^\d]*(\d+:\d+)(?:&nbsp;|\s)*([^&\s]+)(?:&nbsp;|\s)*(\d+),(?:&nbsp;|\s)*(\d+)/.exec(dbih)) {
		return re[2] + " " + re[3] + ", " + re[4];
	}
	return "unknown";
}

function get_hour() {
	var re;
	if(re = /UTC:[^\d]*(\d+):\d+(?:&nbsp;|\s)*([^&\s]+)(?:&nbsp;|\s)*(\d+),(?:&nbsp;|\s)*(\d+)/.exec(dbih)) {
		return re[1];
	}
	return "unknown";
}

function past_rollover() {
	var re;
	if(re = /UTC:[^\d]*(\d+):(\d+)(?:&nbsp;|\s)*([^&\s]+)(?:&nbsp;|\s)*(\d+),(?:&nbsp;|\s)*(\d+)/.exec(dbih)) {
		var h = parseInt(re[1], 10);
		var m = parseInt(re[2], 10);
		if((h == 0) && (m <= 5)) {
			return false;
		}
	}
	return true;
}


function is_green_page() {
	return (greenpages[currentpage] ? true : false);
}

function toggle_green_page(ev) {
	ev.preventDefault();
	ev.stopPropagation();
	if(is_green_page()) {
		remove_green_page();
		ev.target.style.color = link_color(false);
	} else {
		add_green_page();
		ev.target.style.color = link_color(true);
	}
}

function add_green_page() {
	greenpages[currentpage] = true;
	GM_setValue("greenpages", greenpages.toSource());
}

function remove_green_page() {
	delete(greenpages[currentpage]);
	GM_setValue("greenpages", greenpages.toSource());
}	

function get_short_url() {
	var url = document.location.href;
	var re;
	if(re = /p=[^&]*&a=[^&]*/.exec(url)) {
		url = re[0];
	}
	return url;
}

function add_outfit_options(selname, spaceonly) {
	var select = document.getElementsByName(selname)[0];
	var outfits = eval(GM_getValue("outfits", "[]"));
	var i;
	var added = 0;
	if(select) {
		select.addEventListener("change", change_outfit, false);
		for(i = 0; i < outfits.length; i++) {
			if(!spaceonly || GM_getValue("space:"+outfits[i][0], false)) {
				var opt = new Option("Equip " + outfits[i][0], "", false, false);
				select.add(opt, select.options[++added]);
			}
		}
		select.add(new Option("- - - - - - - - - - - - - - - - -", "", false, false), select.options[added+1]);
	}
}

function change_outfit(ev) {
	var opt = ev.target.options[ev.target.selectedIndex];
	if(opt.value == "") {
		var re;
		if(re = /^Equip (.*)$/.exec(opt.text)) {
			var outfit_number = get_outfit_number(re[1]);
			if(outfit_number != "") {
				var form = document.createElement('form');
				var hidden = document.createElement('input');
				var action = document.createElement('input');
				var submit = document.createElement('input');
				form.action = "http://www.secretsocietywars.com/index.php?p=inventory&a=costumes";
				form.method = "POST";
				hidden.type = "hidden";
				hidden.name = "equip_custom_costume";
				hidden.value = outfit_number;
				action.type = "hidden";
				action.name = "action";
				action.value = "Equip Custom Costume";
				submit.type = "hidden";
				submit.name = "submit";
				submit.value = "Equip Costume";
				form.appendChild(hidden);
				form.appendChild(action);
				form.appendChild(submit);
				document.body.appendChild(form);
				form.submit();
			}
		}
	}			
}

function get_outfit_number(name) {
	var outfits = eval(GM_getValue("outfits", "[]"));
	for(var i = 0; i < outfits.length; i++) {
		if(outfits[i][0] == name) {
			return outfits[i][1];
		}
	}
	return "";
}

function check_costumes() {
	var allitems = items.concat(otheritems);
	var costumetext;
	for(var i = 0; i < allitems.length; i++) {
		var item = allitems[i][0];
		var opt = document.evaluate('//option[starts-with(text(), "'+item+'")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

		if(opt) {
			GM_setValue(item, parseInt(opt.value) ? parseInt(opt.value) : 0);
		} else {
			GM_setValue(item, -1);
		}
	}
	costumetext = document.evaluate('//text()[contains(., "Equipping Custom Costume: ")]/following-sibling::i[1]/text()', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(costumetext) {
		var spaceoutfit = document.evaluate('//text()[contains(., "Space Fuel:")]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		if(spaceoutfit) {
			GM_setValue("space:"+costumetext.data, true);
		} else {
			GM_setValue("space:"+costumetext.data, false);
		}
	}
}

function get_outfits() {
	var select = document.getElementsByName('equip_custom_costume')[0];
	var outfits = new Array();
	for(var i = 1; i < select.options.length; i++) {
		outfits.push([select.options[i].text, select.options[i].value]);
	}
	GM_setValue("outfits", outfits.toSource());
}

function wearing_suit() {
	for(var i = 0; i < items.length; i++) {
		var itemnum = GM_getValue(items[i][0], -1);
		if(itemnum > 0) {
			return false;
		}
	}
	return true;
}

function make_equip_link() {
	var link = document.createElement('a');
	link.addEventListener("click", equip_time_suit, false);
	link.addEventListener("contextmenu", toggle_green_page, false);
	link.href = "/index.php?p=inventory&a=equipment#equiptimesuit";
	link.innerHTML = "Time Suit";
	link.style.color = link_color();
	return link;
}

function link_color(forcegreen) {
	var greenshade = "rgb(0, 255, 0)";
	if(forcegreen) {
		return greenshade;
	} else if(/UTC:[^\d]*\d+:5[89]/.exec(dbih)) {
		return "red";
	} else if(is_green_page()) {
		return greenshade;
	} else {
		return "white";
	}
}

function equip_laxative_pants(ev) {
	var form = document.createElement('form');
	var hidden = document.createElement('input');
	if(typeof(ev) != "undefined") {
		ev.preventDefault();
	}
	form.action = "http://www.secretsocietywars.com/index.php?p=inventory&a=equip";
	form.method = "POST";
	hidden.type = "hidden";
	hidden.name = "pants";
	hidden.value = GM_getValue("ACME Laxative Slacks");
	form.appendChild(hidden);
	document.body.appendChild(form);
	form.submit();
}

function equip_laxative_pants_a(td, link) {
	link.parentNode.replaceChild(document.createTextNode("Equipping..."), link);
	GM_post("/index.php?p=inventory&a=equip", "pants="+GM_getValue("ACME Laxative Slacks"), function(rt) {laxative_pants_equipped_a(rt, td);});
}

function equip_laxative_pants_b(div, link) {
	link.parentNode.replaceChild(document.createTextNode("Equipping..."), link);
	GM_post("/index.php?p=inventory&a=equip", "pants="+GM_getValue("ACME Laxative Slacks"), function(rt) {laxative_pants_equipped_b(rt, div);});
}

function laxative_pants_equipped_a(responseText, td) {
	var i2 = document.createElement('input');
	var parent_table = document.evaluate('./ancestor::table[1]', td, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var re;
	i2.type = "submit";
	i2.setAttribute("style", "background-color: rgb(153, 102, 0); width: 200px; height: 50px; font-size: 18px;");
	i2.name = "submit";
	i2.value = "Number Two";
	parent_table.parentNode.replaceChild(i2, parent_table);
	GM_setValue("ACME Laxative Slacks", 0);
	if(re = /<option value="([^"]+)">Timenesium Trousers/.exec(responseText)) {
		GM_setValue("Timenesium Trousers", re[1]);
	}
}

function laxative_pants_equipped_b(responseText, div) {
	div.parentNode.removeChild(div);
	GM_setValue("ACME Laxative Slacks", 0);
	if(re = /<option value="([^"]+)">Timenesium Trousers/.exec(responseText)) {
		GM_setValue("Timenesium Trousers", re[1]);
	}
}

function equip_time_suit(ev) {
	var form = document.createElement('form');
	if(typeof(ev) != "undefined") {
		ev.preventDefault();
	}
	form.action = "http://www.secretsocietywars.com/index.php?p=inventory&a=equip";
	form.method = "POST";
	for(var i = 0; i < items.length; i++) {
		var val;
		if((val = GM_getValue(items[i][0], -1)) > 0) {
			var hidden;
			hidden = document.createElement('input');
			hidden.type = "hidden";
			hidden.name = items[i][1];
			hidden.value = val;
			form.appendChild(hidden);
		}
	}
	document.body.appendChild(form);
	form.submit();
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
