// ==UserScript==
// @name           SSW Autosell
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Keeps track of what items you want to sell to Sid.
// @include        http://www.secretsocietywars.com/index.php?p=inventory&a=pack
// @include        http://www.secretsocietywars.com/index.php?p=inventory&a=transfer
// ==/UserScript==

var prefs = eval(GM_getValue("prefs", "({})"));
var items = new Array();

var sell_table = document.evaluate('//text()[contains(., "SELL NORMAL ITEMS TO SID")]/ancestor::table[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if(sell_table) {
	var autosell_link = document.createElement('a');
	var cell = sell_table.insertRow(0).insertCell(0);
	autosell_link.href = "http://www.secretsocietywars.com/index.php?p=inventory&a=pack";
	autosell_link.innerHTML = "Autosell";
	autosell_link.addEventListener('click', add_autosell_table, false);
	autosell_link.style.fontSize = "16px";
	cell.colSpan = 2;
	cell.align = "middle";
	cell.appendChild(autosell_link);
}


function add_autosell_table(ev) {
	var inv = document.evaluate('//select[@name="inv[]"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var div = document.createElement('div');
	var button = document.evaluate('//input[contains(@value, "Sell Normal Items")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var invtable;

	ev.preventDefault();
	div.style.height = inv.style.height;
	div.style.width = inv.style.width;
	div.style.overflow = "auto";
	invtable = create_item_table(inv);
	div.appendChild(invtable);
	button.addEventListener('click', autosell_step1, false);
	button.value = "Autosell Items";
	inv.parentNode.replaceChild(div, inv);
	autosell_link.style.visibility = "hidden";
}	

function autosell_step1(ev) {
	var form = document.createElement('form');
	var hidden;
	ev.preventDefault();
	form.action = "/index.php?p=inventory&a=transfer";
	form.method = "POST";
	for(var i = 0; i < items.length; i++) {
		var itemname = items[ i ][0];
		var itemnum  = items[ i ][1];
		var total    = items[ i ][2];
		var radios = document.getElementsByName("autosell:"+itemname);
		var value = false;
		for(var j = 0; j < radios.length; j++) {
			if(radios[j].checked) {
				value = radios[j].value;
			}
		}
		if(value) {
			prefs[itemname] = value;
			if(value != "keep") {
				hidden = make_hidden(itemnum, (value == "sell" ? total : total-1));
				if(hidden.value > 0) {
					form.appendChild(hidden);
				}
			}
		}
	}
	GM_setValue("prefs", prefs.toSource());
	form.appendChild(make_hidden("action", "Sell Items"));
	form.appendChild(make_hidden("submit", "Sell Items (step 2 of 2)"));
	document.body.appendChild(form);
	form.submit();
}

function make_hidden(name, value) {
	var h = document.createElement('input');
	h.type = "hidden";
	h.name = name;
	h.value = value;
	return h;
}

function create_item_table(select) {
	var table = document.createElement('table');
	var tablehtml;
	tablehtml = '<tr><td style="font-size:9px;font-weight:bold">Keep</td><td style="font-size:9px;font-weight:bold">Keep1</td><td style="font-size:9px;font-weight:bold">Sell</td><td style="font-size:9px;font-weight:bold">Item</td></tr>';
	for(var i = 0; i < select.options.length; i++) {
		var itemname;
		var re;
		var num;
		if(re = /^(.*?)\s+\((\d+)\)\s*$/.exec(select.options[ i ].text)) {
			itemname = re[1];
			num = re[2];
		} else {
			itemname = select.options[ i ].text;
			num = 0;
		}
		items.push([itemname, select.options[ i ].value, num]);
		tablehtml += '<tr><td>'+make_radio(itemname, "keep")+'</td><td>'+make_radio(itemname, "keep1")+'</td><td>'+make_radio(itemname, "sell")+'</td><td onclick="popWindow(\'http://www.secretsocietywars.com/examine.php?examine=inv&id='+select.options[ i ].value+'\', \'describeWindow\', 300, 400)" style="cursor:pointer;">'+itemname+'</td></tr>';
	}
	table.innerHTML = tablehtml;
	return table;
}

function make_radio(itemname, value) {
	var html = '<input type="radio" name="autosell:'+itemname+'" value="'+value+'" title="'+value+'"';
	if(prefs[itemname] == value) {
		html += ' checked="checked"';
	}
	return html + '>';
}
