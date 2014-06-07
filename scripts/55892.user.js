// ==UserScript==
// @name           FWZ PPWN Shoppe Enhancer
// @namespace      http://userscripts.org/users/livinskull
// @author         livinskull
// @version	       1.07
// @description    Additional links for selling all Equippables or all Consumables
// @include        http://www.forumwarz.com/stores/ppwn/sell
// @include        http://forumwarz.com/stores/ppwn/sell
// ==/UserScript==

var Bulk = unsafeWindow['Bulk'];
var Modalbox = unsafeWindow['Modalbox'];
$ = unsafeWindow['window'].$;

// setting vars
var settings_double_check = GM_getValue("double_check", "");
var settings_less_than_flezz = GM_getValue("less_than_flezz", "");
var settings_flezz = GM_getValue("flezz", 0);
var settings_items_excluded = GM_getValue("items_excluded", "");
if (settings_items_excluded != "")
	settings_items_excluded = settings_items_excluded.split("|");
else
	settings_items_excluded = new Array();

// deactivated cause of .moar file naming irregularities	
var settings_moars = GM_getValue("moars", '');
if (settings_moars != "")
	settings_moars = settings_moars.split("|");
else
	settings_moars = new Array();
	

var SellTable = document.getElementById('selling').getElementsByTagName('form')[0].getElementsByTagName('table')[0];
var Items = new Array();


//injecting Modalbox stylesheet
var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'http://www.forumwarz.com/stylesheets/modalbox.css';
document.getElementsByTagName("head")[0].appendChild(link);


Array.prototype.in_array = function(needle) {
	var max = this.length;
	for(var i=0; i < max; ++i) if(this[i] === needle) return true;
	return false;
}

function trim(str, chars) {
	return ltrim(rtrim(str, chars), chars);
}
 
function ltrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
 
function rtrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}


function Item(tablerow) {
	this.Id     = tablerow.id.match(/item_row_([0-9]+)/)[1];
	this.Type   = trim(tablerow.getElementsByTagName('td')[3].innerHTML);
	this.amount = parseInt(document.getElementById('max_'+this.Id).innerHTML);
	this.name 	= trim(tablerow.getElementsByTagName('td')[1].innerHTML);
	this.prize  = parseInt(tablerow.getElementsByTagName('td')[5].getElementsByTagName('span')[0].innerHTML.replace(',',''));

	//GM_log(this.Id+" "+this.name+" x"+this.amount+" prize: "+this.prize);
	
	this.sell = function() {
		$("store_qty_" + this.Id).value++;
	}
	
	this.sellAll = function() {
		$("store_qty_" + this.Id).value = this.amount;

	}
}


document.getElementById('store').getElementsByTagName('div')[3].innerHTML +=  "&nbsp;&nbsp;<a href=\"#\" id=\"sell_all_equip\">Sell All Equippables</a>";
// deactivated cause off .moar file naming irregularities
document.getElementById('store').getElementsByTagName('div')[3].innerHTML += "&nbsp;(<a href=\"#\" id=\"only_moars\">only .moars</a>";
document.getElementById('store').getElementsByTagName('div')[3].innerHTML += "&nbsp;||&nbsp;<a href=\"#\" id=\"only_equip\">only buyables</a>)";

document.getElementById('store').getElementsByTagName('div')[3].innerHTML +=  "&nbsp;&nbsp;<a href=\"#\" id=\"sell_all_consumable\">Sell All Consumables</a>";
document.getElementById('store').getElementsByTagName('div')[3].innerHTML +=  "&nbsp;&nbsp;<a href=\"#\" id=\"sell_all_junk\">Sell All Junk</a>";
document.getElementById('store').getElementsByTagName('div')[3].innerHTML +=  "&nbsp;&nbsp;<a href=\"#\" id=\"ppwn_enhancer_settings\">Ppwn Enhancer Settings</a>";
document.getElementById('sell_all_equip').addEventListener("click", sellAllEquippables, true);
document.getElementById('sell_all_consumable').addEventListener("click", sellAllConsumables, true);
document.getElementById('sell_all_junk').addEventListener("click", sellAllJunk, true);
document.getElementById('ppwn_enhancer_settings').addEventListener("click", showSettings, true);

document.getElementById('only_moars').addEventListener("click", sellMoars, true);
document.getElementById('only_equip').addEventListener("click", sellBuyables, true);

fetch_moar_files();


for (i = 1; i < SellTable.rows.length-2; i++)
	Items.push(new Item(SellTable.rows[i]));
	

	
function sellAllEquippables() {
	var alreadythere = new Array();
	var itemCount = Items.length;
	//var startTime = new Date();
	
	for (var i = 0; i < itemCount; ++i) {
		if (Items[i].Type == "Equippable" && !settings_items_excluded.in_array(Items[i].name)) {
			if (settings_less_than_flezz == "" || (settings_less_than_flezz=="checked" && Items[i].prize < settings_flezz)) {
		
				if (settings_double_check == "checked") {
					if (alreadythere[Items[i].name])
						Items[i].sellAll();
					else
						alreadythere[Items[i].name] = true;
				} else {
					Items[i].sellAll();
				}
			}
		}
	}
	Bulk.recalculate();
	
	//var endTime = new Date();
	//GM_log('Sell Equippables duration: ' + (endTime.getTime() - startTime.getTime()));
}

function sellMoars() {
	alert('not working properly, take care');

	if (settings_moars.length == 0) {
		alert('Couldn\'t get moar_list, sry');
		return;
	}

	var alreadythere = new Array();
	var itemCount = Items.length;
	
	for (var i = 0; i < itemCount; ++i) {
		if (Items[i].Type == "Equippable" && !settings_items_excluded.in_array(Items[i].name) && settings_moars.in_array(Items[i].name)) {
			if (settings_less_than_flezz == "" || (settings_less_than_flezz=="checked" && Items[i].prize < settings_flezz)) {
		
				if (settings_double_check == "checked") {
					if (alreadythere[Items[i].name])
						Items[i].sellAll();
					else
						alreadythere[Items[i].name] = true;
				} else {
					Items[i].sellAll();
				}
			}
		}
	}
	Bulk.recalculate();
}

function sellBuyables() {
	var alreadythere = new Array();
	var itemCount = Items.length;
	
	alert('not working properly, take care');
	
	if (settings_moars.length == 0) {
		alert('Couldn\'t get moar list, sry');
		return;
	}
	
	for (var i = 0; i < itemCount; ++i) {
		if (Items[i].Type == "Equippable" && !settings_items_excluded.in_array(Items[i].name) && !settings_moars.in_array(Items[i].name)) {
			if (settings_less_than_flezz == "" || (settings_less_than_flezz=="checked" && Items[i].prize < settings_flezz)) {
		
				if (settings_double_check == "checked") {
					if (alreadythere[Items[i].name])
						Items[i].sellAll();
					else
						alreadythere[Items[i].name] = true;
				} else {
					Items[i].sellAll();
				}
			}
		}
	}
	Bulk.recalculate();
}

function sellAllConsumables() {
	var itemCount = Items.length;
	//var startTime = new Date();
	
	for (var i = 0; i < itemCount; i++) {
		if (Items[i].Type == "Consumable" && !settings_items_excluded.in_array(Items[i].name))
			Items[i].sellAll();
	}
	
	Bulk.recalculate();
	//var endTime = new Date();
	//GM_log('Sell Consumables duration: ' + (endTime.getTime() - startTime.getTime()));
}

/* sell all Junk with exception list support */
function sellAllJunk() {
	var itemCount = Items.length;
	
	for (var i = 0; i < itemCount; i++) {
		if (Items[i].Type == "Junk" && !settings_items_excluded.in_array(Items[i].name))
			Items[i].sellAll();
	}
	
	Bulk.recalculate();
}


function fetch_moar_files() {
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://livinskull.kilu.de/files/other/fwz_moars.txt",
		onload: function (resp) {
			if (resp.status == 200) {
				settings_moars = resp.responseText.split("\n");
				GM_setValue('moars', settings_moars.join('|'));
				GM_log('moars fetched');
			}
		}
	});
}

function showSettings() {
	var settingsHTML 	= '<br />'
						+ '<input id="ppwn_settings_double_check" type="checkbox" '+settings_double_check+' />'
						+ '<label for="ppwn_settings_double_check">Only sell duplicate .Moars (keep one of each type)</label><br />'
						+ '<input id="ppwn_settings_less_than_flezz" type="checkbox" '+settings_less_than_flezz+' />'
						+ '<label for="ppwn_settings_less_than_flezz">Only sell .Moars worth less than </label><span class="flezz">'
						+ '<input id="ppwn_settings_flezz" value="'+settings_flezz+'" type="text" /></span><br /><br />'
						+ '<table><tr><th width="250px">Available Items</th><th width="100px"></th><th width="250px">Items to exclude</th></tr>'
						+ '<td><select id="ppwn_settings_items_available" size="10" style="width:200px">';
	
	var alreadythere = new Array();
	for (i=0; i<Items.length; i++) {
		if (!settings_items_excluded.in_array(Items[i].name) && !alreadythere.in_array(Items[i].name)) {
			settingsHTML += '<option>' + Items[i].name + '</option>';
			alreadythere.push(Items[i].name);
		}
	}
	
	settingsHTML	+= '</select></td><td><br/><input type="button" value="--> exclude item -->" onclick="javascript:move(document.getElementById(\'ppwn_settings_items_available\'), document.getElementById(\'ppwn_settings_items_excluded\'));" /><br /><br />'
					+ '<input type="button" value="<-- include item <--" onclick="javascript:move(document.getElementById(\'ppwn_settings_items_excluded\'), document.getElementById(\'ppwn_settings_items_available\'));" /></td>'
					+ '<td><select id="ppwn_settings_items_excluded" size="10" style="width:200px">';
					
	for (i=0; i<settings_items_excluded.length; i++)
		settingsHTML += '<option>' + settings_items_excluded[i] + '</option>';
					
	settingsHTML    += '</select></td></tr></table>'
					+ '<br /><input onclick="closeSettings();" type="button" value="Save" style="width:570px" />';
						
	Modalbox.show(settingsHTML, {title:'Ppwn Enhancer Settings', width: 600, overlayClose: false});
}

unsafeWindow['document'].move = function(from, to) {
	sel = from.selectedIndex;
	neuer = new Option(from.options[sel].text);
	to.options[to.length] = neuer;
	from.options[sel] = null;
}

unsafeWindow['document'].closeSettings = function() {
	window.setTimeout(function() {
		settings_double_check = document.getElementById("ppwn_settings_double_check").checked?"checked":"";
		GM_setValue('double_check', settings_double_check);
		settings_less_than_flezz = document.getElementById("ppwn_settings_less_than_flezz").checked?"checked":"";
		GM_setValue('less_than_flezz', settings_less_than_flezz);
		settings_flezz = trim(document.getElementById("ppwn_settings_flezz").value.replace(/\D/g,''));
		GM_setValue('flezz', settings_flezz);
		settings_items_excluded = new Array();
		if (tmp = document.getElementById('ppwn_settings_items_excluded').options) {
			for (i in tmp)
				settings_items_excluded.push(tmp[i].text);
			GM_setValue('items_excluded', settings_items_excluded.join('|'));
		}
		}, 0);
	
	Modalbox.hide();
}

