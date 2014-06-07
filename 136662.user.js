// ==UserScript==
// @name Always Ready
// @description Always Ready is a Kings of Chaos Addon.
// @namespace http://firstworldgaming.info/script/
// @include http://*.kingsofchaos.com/*.php*
// @exclude 		http://*.kingsofchaos.com/confirm.login.php*
// @exclude 		http://*.kingsofchaos.com/security.php*
// ==/UserScript==
//add full google chrome support
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}
function getText(where, first, second) {
		var x = where.indexOf(first) + first.length;
		var y = where.indexOf(second, x);
		return where.substring(x,y);
}
var gold = getText(document.body.innerHTML, 'Gold:<font color="#250202">', '<').replace(/,/g,'');
var fields = new Array();
var buttons = new Array();
var num_untrained;
var mypage = window.location.href.split(".com/")[1].split(".php")[0];		
function obj(id) {
	return document.getElementById(id);
}
function alreadyRuning() {
	if(obj("alwaysready_runing")) {
		return true;
	}
	else {
		var div = document.body.appendChild(document.createElement("div"));
		div.id = "alwaysready_runing";
		div.style.display = "none";
	}
}
function getElementsByClassName(className, tag, elm){
	var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
	var tag = tag || "*";
	var elm = elm || document;
	var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
	var returnElements = [];
	var current;
	var length = elements.length;
	for(var i=0; i<length; i++){
		current = elements[i];
		if(testClass.test(current.className)){
			returnElements.push(current);
		}
	}
	return returnElements;
}
function insertAfter( referenceNode, newNode ) {
    referenceNode.parentNode.insertBefore( newNode, referenceNode.nextSibling );
}
function addCommas(str) {
	str = String(str);
	var sRegExp = new RegExp('(-?[0-9]+)([0-9]{3})');	
	while(sRegExp.test(str)) {	
		str = str.replace(sRegExp, '$1,$2');
	}
	return str;	
}
//Create The Storage Object.
var storage = {
	get: function(name, val) { return GM_getValue(name, val); },
	set: function(name, val) { GM_setValue(name, val); }
};
//Create The System Object.
var system = { 
	server:	"http://firstworldgaming.org/script/",
	version: [1,3,2,20284].join("."),
	lastCheck: storage.get("lastCheck", -1),
	hour: (new Date()).getHours(),
	page: window.location.href.split(".com/")[1].split(".php")[0]
};
//Create The request Object.
var request = {
	get: function(url, cb) {
		var details = {};
		details.method = 'GET';
		details.url = url;
		details.headers = {};
		details.headers['Content-Type'] = 'application/x-www-form-urlencoded';
		details.onload = function (responseDetails) {
			cb(responseDetails.responseText);
		};
		GM_xmlhttpRequest(details);
	},
	post: function(url, data, cb) {
		var details = {};
		details.method = 'POST';
		details.url = url;
		details.headers = {};
		details.headers['Content-Type'] = 'application/x-www-form-urlencoded';
		details.data = data;
		details.onload = function (responseDetails) {
			cb(responseDetails.responseText);
		};
		GM_xmlhttpRequest(details);
	}
};
//Create Data Object.
var data = {
	tableId: function(header) {
		var row = (arguments.length > 1 ? arguments[1] : 0);
		var cell = (arguments.length > 2 ? arguments[2] : 0);
		var tables = document.getElementsByTagName("table");
		for(var i = 0; i < tables.length; i++) {
			if(tables[i].rows.length >= 2) {
				if(tables[i].rows[row].cells[cell].innerHTML.match(header)) {
					return i;
				}
			}
		}
		return -1;
	},
	tableId2: function(ele, header) {
		var tables = ele.getElementsByTagName("table");
		for(var i = 0; i < tables.length; i++) {
			if(tables[i].rows.length >= 2) {
				if(tables[i].rows[0].cells[0].innerHTML.match(header)) {
					return i;
				}
			}
		}
		return -1;
	},
	rowId: function(tableId, header) {
		var table = document.getElementsByTagName("table");
		if(table[tableId]) {
			for(var i = 0; i < table[tableId].rows.length; i++) {
				if(table[tableId].rows[i].cells[0].innerHTML.match(header)) {
					return i;
				}
			}
		}
		else {
			return -1;
		}
	},
	getText: function(where, first, second) {
		var x = where.indexOf(first) + first.length;
		var y = where.indexOf(second, x);
		return where.substring(x,y);
	}
};
//Create The Updater Object.
var updater = {
	check: function() {
		request.get(system.server + "version.php", function(response) {
			if(response > system.version) {
				updater.display(response);
			} else {
				AR.changer();
			}
			storage.set("lastCheck", system.hour);
		});
	},
	display: function(version) {
		//make sure updater isn't already showing.
		if(obj("ar_updater")) {
			var updater = obj("ar_updater");
			updater.id = "ar_updater";
		} else {
			var updater = document.body.appendChild(document.createElement("div"));
			updater.id = "ar_updater";
		}
		updater.setAttribute("style", "width: 450px; height: auto; background: #222222; border: 1px solid #cccccc; position: fixed; top: 35%; right: 25%;");
		updater.innerHTML = "<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" class=\"table_lines\">" + 
		"<tr>" +
		"<th colspan=\"2\" align=\"center\"><div style=\"color: yellow;\">Updater!!!!</th>" +
		"</tr>" +
		"<tr>" +
		"<td colspan=\"2\" align=\"center\">Your running version " + system.version + " When version " + version + " is the latest version, Update Now?</td>" +
		"</tr>" +
		"<tr>" +
		"<td width=\"50%\" align=\"left\"><input id=\"ar_cancel\" value=\"Cancel\" type=\"submit\" /></td>" +
		"<td width=\"50%\" align=\"right\"><input id=\"ar_upgrade\" value=\"Upgrade\" type=\"submit\" /></td>" +
		"</tr>" +
		"</table>";
		if(obj("ar_cancel")) {
			obj("ar_cancel").addEventListener("click", function() {
				obj("ar_updater").parentNode.removeChild(obj("ar_updater"));
			},true);
		}
		if(obj("ar_upgrade")) {
			obj("ar_upgrade").addEventListener("click", function() {
				window.location = system.server + "always_ready.user.js";
			},true);
		}
	}
};
//Create The AR Object.
var AR = { 
	init: function() {
		//check to see if we should check for an up.
		if(system.lastCheck != system.hour || system.lastCheck < 0) {
			//its been more then an hour since last check, check for update.
			updater.check();
		} else {
			//its been less than an hour no need to check.
			this.changer();
		}
	},
	changer: function() {
		var kocname = storage.get("kocname", "");
		var statsid = storage.get("statsid", "");
		if(kocname == "" || statsid == "") {
			if(system.page != "base") {
				window.location = "http://www.kingsofchaos.com/base.php";
			} else {
				base.init();
			}
		}
		switch(system.page) {
			case 'base': base.init(); break;
			case 'train': train.init(); break;
			case 'mercs': mercs.init(); break;
			case 'armory': armory.init(); break;
			case 'battlefield': battlefield.init(); break;
			case 'stats': statspage.init(); break;
			case 'attack': attackpage.init(); break;
			case 'inteldetail': statspage.ready(); attackpage.sabb(); break;
		}
		var div = document.body.appendChild(document.createElement("div"));
		div.style.width = "auto";
		div.style.height = "auto";
		div.style.position = "fixed";
		div.style.left = "0";
		div.style.top = "0";
		div.innerHTML = "<input type=\"submit\" id=\"targets_menu\" value=\"Gold Finder\" />";
		if(obj("targets_menu")) {
			obj("targets_menu").addEventListener('click',targets.init,true);
		}
	}
};
var base = {
	init: function() {
		var table = document.getElementsByTagName("table");
		var u_id = data.tableId("User Info");
		var user_id = data.rowId(u_id, "<b>Name</b>");
		var userinfo = table[u_id];
		var statsid = parseInt(data.getText(userinfo.rows[user_id].cells[1].innerHTML, 'id=', '"'));
		var kocname = data.getText(userinfo.rows[user_id].cells[1].innerHTML, '">', '</a');
		var race_id = data.rowId(u_id, "<b>Race</b>");
		var race = userinfo.rows[race_id].cells[1].innerHTML.split(" ").join("").split("\t").join("");
		storage.set("kocname", kocname);
		storage.set("statsid", statsid);
		var p_id = data.tableId("Personnel");
		var army = table[p_id];
		var tff_id = data.rowId(p_id, "<b>Total Fighting Force</b>");
		var tff = army.rows[tff_id].cells[1].innerHTML.split(",").join("");
		var ra_id = data.tableId("Recent Attacks on You");
		var recent = table[ra_id];
		var me_id = data.tableId("Military Effectiveness");
		var military = table[me_id];
		military.rows[0].cells[0].innerHTML += " <input id=\"ar_statsupdate\" type=\"submit\" value=\"Update Stats\" />";
		var r_id = data.tableId("Grow Your Army!");
		var recruit = table[r_id];
		var link = data.getText(recruit.rows[2].cells[0].innerHTML,'uniqid=','"');
		for(var i = 2; i < recent.rows.length; i++) {
			var gold = recent.rows[i].cells[2].innerHTML
			var defended = 0;
			if(gold == "Attack defended") {
				defended = 1;
			} else {
				gold = gold.replace(' Gold stolen','').split(",").join("");
			}
			base.lowhit(i, recent, race, gold, tff, defended);
		}
		var strike = parseInt(military.rows[1].cells[1].innerHTML.split(",").join(""));
		var defense = parseInt(military.rows[2].cells[1].innerHTML.split(",").join(""));
		var spy = parseInt(military.rows[3].cells[1].innerHTML.split(",").join(""));
		var sentry = parseInt(military.rows[4].cells[1].innerHTML.split(",").join(""));
		if(obj("ar_statsupdate")) {
			obj("ar_statsupdate").addEventListener("click", function() {
				var data = "username=" + kocname + "&stats=" + statsid + "&strike=" + strike + "&defense=" + defense + "&spy=" + spy + "&sentry=" + sentry;
				request.post(system.server + "base.php", data, function(response) {
					if(response.match('Stats Updated')) {
						alert("Your Stats have been updated.");
					}
				});
			},true);
		}
		
	},
	lowhit: function(i, recent, race, gold, tff, defended) {
		var bonus = 1;
		if(race == "Humans") { bonus = 1.3; }
		else if(race == "Dwarves") { bonus = 1.15; }
		var min60 = Math.round(Number(Number(Number(tff)*Number(60))*Number(bonus)));
		var color = "";
		if(gold < min60 || defended > 0) {
			color = " style=\"color: red;\"";
		}
		else { 
			color = " style=\"color: yellow;\"";
		}
		recent.rows[i].cells[2].innerHTML = "<div id=\"hit_"+i+"\" "+color+">"+recent.rows[i].cells[2].innerHTML+"</div>";
		min60 = Math.round(Number(Number(min60)/Number(60)));
		min60 = Math.round(Number(Number(min60)*Number(bonus)));
		var taken = parseInt(Math.round(Number(Number(gold)/Number(min60))));
		if(defended > 0) { taken = 0; }
		if(obj("hit_"+i)) {
			GM_addStyle("#menu_hits { "+
			"width: 200px;"+
			"height: auto;"+
			"position: absolute;"+
			"background: #222222;"+
			"border: 1px dotted #cccccc;"+
			"}");
			obj("hit_"+i).addEventListener("mouseover", function(event) {
				if(obj("menu_hits")) {
					var hit = obj("menu_hits");
					var x = event.clientX + window.scrollX;
					var y = event.clientY + window.scrollY;
					obj("menu_hits").style.left = (x+16) +  "px";
					obj("menu_hits").style.top = (y+16) + "px";
				} else {
					var hit = document.body.appendChild(document.createElement("div"));
					hit.id = "menu_hits";
					var x = event.clientX + window.scrollX;
					var y = event.clientY + window.scrollY;
					hit.style.left = (x+16) + "px";
					hit.style.top = (y+16) + "px";
				}
				hit.innerHTML = "<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" class=\"table_lines\">"+
				"<tr>"+
				"<th colspan=\"2\">Attack Statistics</th>"+
				"</tr>"+
				"<tr>"+
				"<td width=\"50%\">Gold Stolen:</td>"+
				"<td width=\"50%\">"+(gold > 0 ? addCommas(gold) : gold)+"</td>"+
				"</tr>"+
				"<tr>"+
				"<td width=\"50%\">Turns Taken:</td>"+
				"<td width=\"50%\">"+taken+"</td>"+
				"</tr>"+
				"</table>";
			},true);
			obj("hit_"+i).addEventListener('mousemove',function(event) {
				if(obj("menu_hits")) {
					var x = event.clientX + window.scrollX;
					var y = event.clientY + window.scrollY;
					obj("menu_hits").style.left = (x+16) +  "px";
					obj("menu_hits").style.top = (y+16) + "px";
				}
			},true);
			obj("hit_"+i).addEventListener('mouseout',function() {
				if(obj("menu_hits")) {
					obj("menu_hits").parentNode.removeChild(obj("menu_hits"));
				}
			},true);
		}
	}
};
var train = {
	init: function() {
		var gold = data.getText(document.body.innerHTML, 'Gold:<font color="#250202">', '</font>').split(" ").join("").split(",").join("");
		gold = parseInt(gold.replace('M', '000000'));
		var t_id = data.tableId("Train Your Troops");
		var tables = document.getElementsByTagName("table");
		var per_tab = tables[t_id];
		var diff_th = document.createElement("th");
		diff_th.className = "subh";
		diff_th.innerHTML = "Diffrence";
		per_tab.rows[0].cells[0].setAttribute("colspan", "4");
		per_tab.rows[1].cells[1].parentNode.insertBefore(diff_th, per_tab.rows[1].cells[1]);
		var diff_att = document.createElement("td");
		diff_att.id = "diff_att";
		diff_att.setAttribute("align", "center");
		diff_att.innerHTML = 0;
		var diff_def = document.createElement("td");
		diff_def.id = "diff_def";
		diff_def.setAttribute("align", "center");
		diff_def.innerHTML = 0;
		var diff_spy = document.createElement("td");
		diff_spy.id = "diff_spy";
		diff_spy.setAttribute("align", "center");
		diff_spy.innerHTML = 0;
		var diff_sen = document.createElement("td");
		diff_sen.id = "diff_sen";
		diff_sen.setAttribute("align", "center");
		diff_sen.innerHTML = 0;
		var diff_rea = document.createElement("td");
		diff_rea.id = "diff_rea";
		diff_rea.setAttribute("align", "center");
		diff_rea.innerHTML = "&nbsp;";
		var diff_red = document.createElement("td");
		diff_red.id = "diff_red";
		diff_red.setAttribute("align", "center");
		diff_red.innerHTML = "&nbsp;";
		per_tab.rows[2].cells[1].parentNode.insertBefore(diff_att, per_tab.rows[2].cells[1]);
		per_tab.rows[3].cells[1].parentNode.insertBefore(diff_def, per_tab.rows[3].cells[1]);
		per_tab.rows[4].cells[1].parentNode.insertBefore(diff_spy, per_tab.rows[4].cells[1]);
		per_tab.rows[5].cells[1].parentNode.insertBefore(diff_sen, per_tab.rows[5].cells[1]);
		per_tab.rows[6].cells[1].parentNode.insertBefore(diff_rea, per_tab.rows[6].cells[1]);
		per_tab.rows[7].cells[1].parentNode.insertBefore(diff_red, per_tab.rows[7].cells[1]);
		per_tab.rows[8].cells[0].setAttribute("colspan", "4");
		//addCommas
		if(storage.get("attack", -1) == -1) {
			storage.set("attack", 0);
		}
		if(storage.get("defense", -1) == -1) {
			storage.set("defense", 0);
		}
		if(storage.get("spy", -1) == -1) {
			storage.set("spy", 0);
		}
		if(storage.get("sentry", -1) == -1) {
			storage.set("sentry", 0);
		}
		var per_id = data.tableId("Personnel")+1;
		var pers_tab = tables[per_id];
		var att_sold = pers_tab.rows[1].cells[1].innerHTML.split(",").join("");
		var def_sold = pers_tab.rows[3].cells[1].innerHTML.split(",").join("");
		var spys = pers_tab.rows[7].cells[1].innerHTML.split(",").join("");
		var sentrys = pers_tab.rows[8].cells[1].innerHTML.split(",").join("");
		var untrain = pers_tab.rows[5].cells[1].innerHTML.split(",").join("");
		var att_diff = Math.round(parseInt(Number(Number(att_sold)-Number(storage.get("attack")))));
		var def_diff = Math.round(parseInt(Number(Number(def_sold)-Number(storage.get("defense")))));
		var spy_diff = Math.round(parseInt(Number(Number(spys)-Number(storage.get("spy")))));
		var sentry_diff = Math.round(parseInt(Number(Number(sentrys)-Number(storage.get("sentry")))));
		att_msg = (att_diff < 0) ? "<div style=\"color: red;\">" + addCommas(att_diff) + "</div>" : "<div style=\"color: lime;\">" + addCommas(att_diff) + "</div>";
		def_msg = (def_diff < 0) ? "<div style=\"color: red;\">" + addCommas(def_diff) + "</div>" : "<div style=\"color: lime;\">" + addCommas(def_diff) + "</div>";
		spy_msg = (spy_diff < 0) ? "<div style=\"color: red;\">" + addCommas(spy_diff) + "</div>" : "<div style=\"color: lime;\">" + addCommas(spy_diff) + "</div>";
		sentry_msg = (sentry_diff < 0) ? "<div style=\"color: red;\">" + addCommas(sentry_diff) + "</div>" : "<div style=\"color: lime;\">" + addCommas(sentry_diff) + "</div>";
		if(att_diff > 0 || att_diff < 0) {
			if(obj("diff_att")) {
				obj("diff_att").innerHTML = att_msg;
			}
		}
		if(def_diff > 0 || def_diff < 0) {
			if(obj("diff_def")) {
				obj("diff_def").innerHTML = def_msg;
			}
		}
		if(spy_diff > 0 || spy_diff < 0) {
			if(obj("diff_spy")) {
				obj("diff_spy").innerHTML = spy_msg;
			}
		}
		if(sentry_diff > 0 || sentry_diff < 0) {
			if(obj("diff_sen")) {
				obj("diff_sen").innerHTML = sentry_msg;
			}
		}
		storage.set("attack",att_sold);
		storage.set("defense",def_sold);
		storage.set("spy", spys);
		storage.set("sentry",sentrys);
		var attack_but = document.getElementsByName("train[attacker]")[0];
		var defense_but = document.getElementsByName("train[defender]")[0];
		var spy_but = document.getElementsByName("train[spy]")[0];
		var sentry_but = document.getElementsByName("train[sentry]")[0];
		attack_but.addEventListener('click', function() {
			var amount = Math.floor(Number(Number(gold)/Number(2000)));
			amount = (amount > untrain) ? untrain : amount;
			attack_but.value = amount;
			defense_but.value = 0;
			spy_but.value = 0;
			sentry_but.value = 0;
		},true);
		defense_but.addEventListener('click', function() {
			var amount = Math.floor(Number(Number(gold)/Number(2000)));
			amount = (amount > untrain) ? untrain : amount;
			attack_but.value = 0;
			defense_but.value = amount;
			spy_but.value = 0;
			sentry_but.value = 0;
		},true);
		spy_but.addEventListener('click', function() {
			var amount = Math.floor(Number(Number(gold)/Number(3500)));
			amount = (amount > untrain) ? untrain : amount;
			attack_but.value = 0;
			defense_but.value = 0;
			spy_but.value = amount;
			sentry_but.value = 0;
		},true);
		sentry_but.addEventListener('click', function() {
			var amount = Math.floor(Number(Number(gold)/Number(3500)));
			amount = (amount > untrain) ? untrain : amount;
			attack_but.value = 0;
			defense_but.value = 0;
			spy_but.value = 0;
			sentry_but.value = amount;
		},true);
	}
};
var mercs = {
	init: function() {
		var gold = data.getText(document.body.innerHTML, 'Gold:<font color="#250202">','</font>').split(" ").join("").split(",").join("").replace('M','000000');
		var m_id = data.tableId("Buy Mercenaries");
		var tables = document.getElementsByTagName("table");
		var merc_tab = tables[m_id];
		var diff_th = document.createElement("th");
		diff_th.className = "subh";
		diff_th.innerHTML = "Diffrence";
		var diff_amer = document.createElement("td");
		diff_amer.id = "diff_amer";
		diff_amer.innerHTML = 0;
		var diff_dmer = document.createElement("td");
		diff_dmer.id = "diff_dmer";
		diff_dmer.innerHTML = 0;
		var diff_umer = document.createElement("td");
		diff_umer.id = "diff_umer";
		diff_umer.innerHTML = 0;
		merc_tab.rows[1].cells[3].parentNode.insertBefore(diff_th, merc_tab.rows[1].cells[3]);
		merc_tab.rows[0].cells[0].setAttribute("colspan","5");
		merc_tab.rows[2].cells[3].parentNode.insertBefore(diff_amer, merc_tab.rows[2].cells[3]);
		merc_tab.rows[3].cells[3].parentNode.insertBefore(diff_dmer, merc_tab.rows[3].cells[3]);
		merc_tab.rows[4].cells[3].parentNode.insertBefore(diff_umer, merc_tab.rows[4].cells[3]);
		merc_tab.rows[5].cells[0].setAttribute("colspan", "5");
		var per_id = data.tableId("Personnel");
		var pers_tab = tables[per_id];
		var att_merc = pers_tab.rows[2].cells[1].innerHTML.split(",").join("");
		var def_merc = pers_tab.rows[4].cells[1].innerHTML.split(",").join("");
		var unt_merc = pers_tab.rows[6].cells[1].innerHTML.split(",").join("");
		if(storage.get("attack_merc",-1) == -1) {
			storage.set("attack_merc", 0);
		}
		if(storage.get("defense_merc", -1) == -1) {
			storage.set("defense_merc", 0);
		}
		if(storage.get("untrain_merc", -1) == -1) {
			storage.set("untrain_merc", 0);
		}
		var att_diff = Math.floor(Number(Number(att_merc)-Number(storage.get("attack_merc"))));
		var def_diff = Math.floor(Number(Number(def_merc)-Number(storage.get("defense_merc"))));
		var unt_diff = Math.floor(Number(Number(unt_merc)-Number(storage.get("untrain_merc"))));
		var att_msg = (att_diff < 0) ? "<div style=\"color: red;\">"+addCommas(att_diff)+"</div>" : "<div style=\"color: lime;\">"+addCommas(att_diff)+"</div>";
		var def_msg = (def_diff < 0) ? "<div style=\"color: red;\">"+addCommas(def_diff)+"</div>" : "<div style=\"color: lime;\">"+addCommas(def_diff)+"</div>";
		var unt_msg = (unt_diff < 0) ? "<div style=\"color: red;\">"+addCommas(unt_diff)+"</div>" : "<div style=\"color: lime;\">"+addCommas(unt_diff)+"</div>";
		if(att_diff > 0 || att_diff < 0) {
			if(obj("diff_amer")) {
				obj("diff_amer").innerHTML = att_msg;
			}
		}
		if(def_diff < 0 || def_diff > 0) {
			if(obj("diff_dmer")) {
				obj("diff_dmer").innerHTML = def_msg;
			}
		}
		if(unt_diff < 0 || unt_diff > 0) {
			if(obj("diff_umer")) {
				obj("diff_umer").innerHTML = unt_msg;
			}
		}
		storage.set("attack_merc",att_merc);
		storage.set("defense_merc",def_merc);
		storage.set("untrain_merc",unt_merc);
		
		var att_avi = merc_tab.rows[2].cells[2].innerHTML;
		att_avi = (att_avi == "None") ? 0 : att_avi.split(",").join(""); 
		var def_avi = merc_tab.rows[3].cells[2].innerHTML;
		def_avi = (def_avi == "None") ? 0 : def_avi.split(",").join("");
		var unt_avi = merc_tab.rows[4].cells[2].innerHTML;
		unt_avi = (unt_avi == "None") ? 0 : unt_avi.split(",").join("");
		var attack_but = document.getElementsByName("mercs[attack]")[0];
		var defense_but = document.getElementsByName("mercs[defend]")[0];
		var untrain_but = document.getElementsByName("mercs[general]")[0];
		attack_but.addEventListener('click', function() { 
			var amount = Math.floor(Number(Number(gold)/Number(4500)));
			amount = (amount > att_avi) ? att_avi : amount;
			attack_but.value = amount;
			defense_but.value = 0;
			untrain_but.value = 0;
		},true);
		defense_but.addEventListener('click', function() {
			var amount = Math.floor(Number(Number(gold)/Number(4500)));
			amount = (amount > def_avi) ?  def_avi : amount;
			defense_but.value = amount;
			attack_but.value = 0;
			untrain_but.value = 0;
		},true);
		untrain_but.addEventListener('click', function() {
			var amount = Math.floor(Number(Number(gold)/Number(3500)));
			amount = (amount > unt_avi) ? unt_avi : amount;
			untrain_but.value = amount;
			attack_but.value = 0;
			defense_but.value = 0;
		},true);
		var weapons = new Array();
	}
};
var armory = {
	weapons:  {"LookoutTower":"1000000","Nunchaku":"1000000","BlackpowderMissile":"1000000","InvisibilityShield":"1000000","SkeletonKey":"600000","Chariot":"450000","GuardDog":"250000","GrapplingHook":"250000","DragonClaw":"200000","Dragonskin":"200000","FlamingArrow":"200000","Dragon":"200000","BattleAxe":"200000","Excalibur":"200000","Cloak":"140000","Tripwire":"140000","Dirk":"75000","Horn":"75000","HammerofThor":"50000","Warg":"50000","MistVeil":"50000","HeavyShield":"50000","Gauntlets":"50000","ElvenCloak":"50000","Mithril":"50000","Steed":"50000","BigCandle":"40000","Rope":"40000","Broadsword":"16400","SteelBow":"16400","Warhammer":"16400","Warblade":"16400","PlateArmor":"16400","Chainmail":"5100","Spear":"5100","Longbow":"5100","Lance":"5100","Scimitar":"5100","Mace":"5100","LongSword":"3200","Shield":"3200","Club":"3200","Pike":"3200","Crossbow":"3200","Helmet":"2000","Sling":"1800","Hatchet":"1800","ShortBow":"1800","Knife":"1000","BrokenStick":"200"},
	init: function(){
		var tables = document.getElementsByTagName("table");
		var add_tab = document.createElement("table");
		add_tab.setAttribute("width", "100%");
		add_tab.setAttribute("border", "0");
		add_tab.setAttribute("cellspacing", "0");
		add_tab.setAttribute("cellpadding", "6");
		add_tab.innerHTML = "<tr>" +
		"<td width=\"55%\" id=\"left\" style=\"vertical-align: top;\">&nbsp;</td>"+
		"<td width=\"45%\" id=\"right\" style=\"vertical-align: top;\">&nbsp;</td>"+
		"</tr>";
		var wep_id = data.tableId("Current Weapon Inventory");
		var wep_tab = tables[wep_id];
		wep_tab.parentNode.insertBefore(add_tab, wep_tab);
		if(obj("left")) {
			obj("left").innerHTML = "<table width=\"100%\" class=\"table_lines\" border=\"0\" cellspacing=\"0\" cellpadding=\"6\">" +
			"<tr>" +
			"<th colspan=\"4\">Stats Diffrence:</th>" +
			"</tr>" +
			"<tr>" +
			"<td width=\"25%\"><b>Strike:</b></td>" +
			"<td width=\"25%\" id=\"old_strike\">&nbsp;</td>" +
			"<td width=\"25%\" id=\"new_strike\">&nbsp;</td>" +
			"<td width=\"25%\" id=\"strike_diff\">&nbsp;</td>" +
			"</tr>" +
			"<tr>" +
			"<td width=\"25%\"><b>Defense:</b></td>" +
			"<td width=\"25%\" id=\"old_defense\">&nbsp;</td>" +
			"<td width=\"25%\" id=\"new_defense\">&nbsp;</td>" +
			"<td width=\"25%\" id=\"defense_diff\">&nbsp;</td>" +
			"</tr>" +
			"<tr>" +
			"<td width=\"25%\"><b>Spy:</b></td>" +
			"<td width=\"25%\" id=\"old_spy\">&nbsp;</td>" +
			"<td width=\"25%\" id=\"new_spy\">&nbsp;</td>" +
			"<td width=\"25%\" id=\"spy_diff\">&nbsp;</td>" +
			"</tr>" +
			"<tr>" +
			"<td width=\"25%\"><b>Sentry:</b></td>" +
			"<td width=\"25%\" id=\"old_sentry\">&nbsp;</td>" +
			"<td width=\"25%\" id=\"new_sentry\">&nbsp;</td>" +
			"<td width=\"25%\" id=\"sentry_diff\">&nbsp;</td>" +
			"</tr>" +
			"</table>";
		}
		if(obj("right")) {
			obj("right").innerHTML = "<table id=\"lostlogs\" width=\"100%\" class=\"table_lines\" border=\"0\" cellspacing=\"0\" cellpadding=\"6\">" +
			"<tr>" +
			"<th colspan=\"3\">Last 5 Lost Weapons:</th>" +
			"</tr>" +
			"</table>" + 
			"<br />" +
			"<table width=\"100%\" class=\"table_lines\" border=\"0\" cellspacing=\"0\" cellpadding=\"6\">" +
			"<tr>" +
			"<th colspan=\"2\">Total Worth:</th>" +
			"</tr>" +
			"<tr>" +
			"<td><b>Buy:</b></td>" +
			"<td id=\"buytotal\">&nbsp;</td>" +
			"</tr>" +
			"<tr>" +
			"<td><b>Sell</b></td>" +
			"<td id=\"selltotal\">&nbsp;</td>" +
			"</tr>" +
			"</table>";
		}
		if(storage.get("stats_strike",-1) == -1) {
			storage.set("stats_strike", 0);
		}
		if(storage.get("stats_defense",-1) == -1) {
			storage.set("stats_defense", 0);
		}
		if(storage.get("stats_spy",-1) == -1) {
			storage.set("stats_spy", 0);
		}
		if(storage.get("stats_sentry",-1) == -1) {
			storage.set("stats_sentry", 0);
		}
		var s_id = data.tableId("Military Effectiveness");
		var stats_tab = tables[s_id];
		var strike = stats_tab.rows[1].cells[1].innerHTML.split(",").join("");
		var defense = stats_tab.rows[2].cells[1].innerHTML.split(",").join("");
		var spy = stats_tab.rows[3].cells[1].innerHTML.split(",").join("");
		var sentry = stats_tab.rows[4].cells[1].innerHTML.split(",").join("");
		if(obj("old_strike")) {
			obj("old_strike").innerHTML = "<div style=\"color: teal;\">" + addCommas(storage.get("stats_strike")) + "</div>";
		}
		if(obj("old_defense")) {
			obj("old_defense").innerHTML = "<div style=\"color: teal;\">" + addCommas(storage.get("stats_defense")) + "</div>";
		}
		if(obj("old_spy")) {
			obj("old_spy").innerHTML = "<div style=\"color: teal;\">" + addCommas(storage.get("stats_spy")) + "</div>";
		}
		if(obj("old_sentry")) {
			obj("old_sentry").innerHTML = "<div style=\"color: teal;\">" + addCommas(storage.get("stats_sentry")) + "</div>";
		}
		if(obj("new_strike")) {
			obj("new_strike").innerHTML = addCommas(strike);
		}
		if(obj("new_defense")) {
			obj("new_defense").innerHTML = addCommas(defense);
		}
		if(obj("new_spy")) {
			obj("new_spy").innerHTML = addCommas(spy);
		}
		if(obj("new_sentry")) {
			obj("new_sentry").innerHTML = addCommas(sentry);
		}
		//strike_diff
		var strike_diff = Math.round(Number(Number(strike)-Number(storage.get("stats_strike"))));
		var defense_diff = Math.round(Number(Number(defense)-Number(storage.get("stats_defense"))));
		var spy_diff = Math.round(Number(Number(spy)-Number(storage.get("stats_spy"))));
		var sentry_diff = Math.round(Number(Number(sentry)-Number(storage.get("stats_sentry"))));
		var strike_msg = (strike_diff < 0) ? "<div style=\"color: red;\">"+addCommas(strike_diff)+"</div>" : "<div style=\"color: lime;\">"+addCommas(strike_diff) + "</div>";
		var defense_msg = (defense_diff < 0) ? "<div style=\"color: red;\">"+addCommas(defense_diff)+"</div>" : "<div style=\"color: lime;\">"+addCommas(defense_diff) + "</div>";
		var spy_msg = (spy_diff < 0) ? "<div style=\"color: red;\">"+addCommas(spy_diff)+"</div>" : "<div style=\"color: lime;\">"+addCommas(spy_diff) + "</div>";
		var sentry_msg = (sentry_diff < 0) ? "<div style=\"color: red;\">"+addCommas(sentry_diff)+"</div>" : "<div style=\"color: lime;\">"+addCommas(sentry_diff) + "</div>";
		if(strike_diff > 0 || strike_diff < 0) {
			if(obj("strike_diff")) {
				obj("strike_diff").innerHTML = strike_msg;
			}
		} 
		else {
			if(obj("strike_diff")) {
				obj("strike_diff").innerHTML = 0;
			}
		}
		if(defense_diff > 0 || defense_diff < 0) {
			if(obj("defense_diff")) {
				obj("defense_diff").innerHTML = defense_msg;
			}
		} 
		else {
			if(obj("defense_diff")) {
				obj("defense_diff").innerHTML = 0;
			}
		}
		if(spy_diff > 0 || spy_diff < 0) {
			if(obj("spy_diff")) {
				obj("spy_diff").innerHTML = spy_msg;
			}
		} 
		else {
			if(obj("spy_diff")) {
				obj("spy_diff").innerHTML = 0;
			}
		}
		if(sentry_diff > 0 || sentry_diff < 0) {
			if(obj("sentry_diff")) {
				obj("sentry_diff").innerHTML = sentry_msg;
			}
		} 
		else {
			if(obj("sentry_diff")) {
				obj("sentry_diff").innerHTML = 0;
			}
		}
		storage.set("stats_strike", strike);
		storage.set("stats_defense", defense);
		storage.set("stats_spy", spy);
		storage.set("stats_sentry", sentry);
		var buy = 0;
		var tool_id = data.tableId("Current Tool Inventory");
		var tool_tab = tables[tool_id];
		var lost_name = "";
		var lost_amount = "";
		for(var i = 2; i < wep_tab.rows.length; i++) {
			if(wep_tab.rows[i].cells[0].innerHTML.match("Repair")) { 
				continue;
			}
			var weapon_name = wep_tab.rows[i].cells[0].innerHTML.split(" ").join("");
			var real_name = wep_tab.rows[i].cells[0].innerHTML;
			var amount = wep_tab.rows[i].cells[1].innerHTML.split(",").join("");
			if(armory.weapons[weapon_name]) {
				buy += parseInt(Math.round(Number(Number(amount)*Number(armory.weapons[weapon_name])))); 
			}
			var diffrence = parseInt(Math.round(Number(Number(storage.get(weapon_name))-Number(amount))));
			if(diffrence > 0) {
				if(lost_name == "") {
					lost_name = real_name;
				}
				else {
					lost_name = lost_name + "|" + real_name;
				}
				if(lost_amount == "") {
					lost_amount = diffrence;
				}
				else {
					lost_amount = lost_amount + "|" + diffrence;
				}
			}
			storage.set(weapon_name, amount);
		}
		for(var j = 2; j < tool_tab.rows.length; j++) {
			var weapon_name = tool_tab.rows[j].cells[0].innerHTML.split(" ").join("");
			var real_name = tool_tab.rows[j].cells[0].innerHTML;
			var amount = tool_tab.rows[j].cells[1].innerHTML.split(",").join("");
			if(armory.weapons[weapon_name]) {
				buy += parseInt(Math.round(Number(Number(amount)*Number(armory.weapons[weapon_name])))); 
			}
			var diffrence = parseInt(Math.round(Number(Number(storage.get(weapon_name))-Number(amount))));
			if(diffrence > 0) {
				if(lost_name == "") {
					lost_name = real_name;
				}
				else {
					lost_name = lost_name + "|" + real_name;
				}
				if(lost_amount == "") {
					lost_amount = diffrence;
				}
				else {
					lost_amount = lost_amount + "|" + diffrence;
				}
			}
			storage.set(weapon_name, amount);
		}
		var sell = parseInt(Math.round(Number(Number(buy)*Number(0.7))));
		if(obj("buytotal")) {
			obj("buytotal").innerHTML = addCommas(buy);
		}
		if(obj("selltotal")) {
			obj("selltotal").innerHTML = addCommas(sell);
		}
		var info = "statsid=" + storage.get("statsid") + "&weapons=" + lost_name + "&amount=" + lost_amount;
		request.post(system.server + "log_lost.php", info, function(response) {
			request.get(system.server + "get_lost.php?statsid=" + storage.get("statsid"), function(res) {
				if(res.match("<tr>")) {
					if(obj("lostlogs")) {
						obj("lostlogs").innerHTML += res;
					}
				}
			});
		});
		armory.displayaat(buy);
	},
	displayaat: function(buy) {
		var tables = document.getElementsByTagName("table");
		var wep_id = data.tableId("Current Weapon Inventory");
		var wep_tab = tables[wep_id];
		var tool_id = data.tableId("Current Tool Inventory");
		var tool_tab = tables[tool_id];
		var sabb = parseInt(Math.round(Number(Number(buy)/Number(400))));
		wep_tab.rows[0].cells[0].setAttribute("colspan","5");
		tool_tab.rows[0].cells[0].setAttribute("colspan","5");
		for(var i = 1; i < wep_tab.rows.length; i++) {
			if(wep_tab.rows[i].cells[0].innerHTML.match("Attack Weapons") || wep_tab.rows[i].cells[0].innerHTML.match("Defense Weapons")) {
				var th = wep_tab.rows[i].cells[0].parentNode.appendChild(document.createElement("th"));
				th.className = "subh";
				th.innerHTML = "<acronym title=\"At A Time\">AAT</acronym>";
			}
			var weapon_name = wep_tab.rows[i].cells[0].innerHTML.split(" ").join("");
			if(armory.weapons[weapon_name]) {
				var td = wep_tab.rows[i].cells[0].parentNode.appendChild(document.createElement("td"));
				td.setAttribute("align", "center");
				var amount = wep_tab.rows[i].cells[1].innerHTML.split(",").join("");
				var aat = parseInt(Math.round(Number(Number(sabb)/Number(armory.weapons[weapon_name]))));
				aat = (aat > amount) ? amount : aat;
				td.innerHTML = addCommas(aat);
			}
		}
		for(var j = 1; j < tool_tab.rows.length; j++) {
			if(tool_tab.rows[j].cells[0].innerHTML.match("Spy Tools") || tool_tab.rows[j].cells[0].innerHTML.match("Sentry Tools")) {
				var th = tool_tab.rows[j].cells[0].parentNode.appendChild(document.createElement("th"));
				th.className = "subh";
				th.innerHTML = "<acronym title=\"At A Time\">AAT</acronym>";
			}
			var weapon_name = tool_tab.rows[j].cells[0].innerHTML.split(" ").join("");
			if(armory.weapons[weapon_name]) {
				var td = tool_tab.rows[j].cells[0].parentNode.appendChild(document.createElement("td"));
				td.setAttribute("align", "center");
				var amount = tool_tab.rows[j].cells[1].innerHTML.split(",").join("");
				var aat = parseInt(Math.round(Number(Number(sabb)/Number(armory.weapons[weapon_name]))));
				aat = (aat > amount) ? amount : aat;
				td.innerHTML = addCommas(aat);
			}
		}
	}
};
var battlefield = {
	init: function() {
		var div = document.body.appendChild(document.createElement("div"));
		div.id = "strike_action";
		div.setAttribute("style", "background: #222222; border: 1px solid #CCCCCC; width: auto; height: auto; position: fixed; right: 2; top: 2;");
		div.innerHTML = "Strike Action: " + addCommas(storage.get("stats_strike", "unknown"));
		var players = getElementsByClassName("player", "tr", document);
		var names = "";
		var statsids = "";
		var armys = "";
		var golds = "";
		for(var i = 0; i < players.length; i++) {
			 	var statsid = data.getText(players[i].cells[2].innerHTML, 'id=', '"');
				var name = data.getText(players[i].cells[2].innerHTML, '">', '</a');
				var army = players[i].cells[3].innerHTML.split(",").join("");
				var gold =  players[i].cells[5].innerHTML.replace(' Gold','').split(",").join("");
				if(statsids == "") {
					statsids = statsid;
				}
				else {
					statsids = statsids + "|" + statsid;
				}
				if(names == "") {
					names = name;
				}
				else {
					names = names + "|" + name;
				}
				if(armys == "") {
					armys = army;
				}
				else {
					armys = armys + "|" + army;
				}
				if(golds == "") {
					golds = gold;
				}
				else {
					golds = golds + "|" + gold;
				}
		}
		var info = "statsids=" + statsids + "&names=" + names + "&armys=" + armys + "&golds=" + golds;
		request.post(system.server + "logbf2.php", info, function(response) {
			var bftab = getElementsByClassName("battlefield", "table", document);
			var th = document.createElement("th");
			th.innerHTML = "Defense";
			bftab[0].rows[0].cells[5].parentNode.insertBefore(th,bftab[0].rows[0].cells[5]);
			var defenses = data.getText(response, '(defense)', '(/defense)').split("|");
			var golds = data.getText(response, '(gold)', '(/gold)').split("|");
			var players = getElementsByClassName("player", "tr", document);
			var links = getElementsByClassName("nav", "tr", document);
			links[0].cells[0].innerHTML = links[0].cells[0].innerHTML;
			links[0].cells[2].innerHTML = links[0].cells[2].innerHTML;
			links[0].cells[2].setAttribute("colspan", "2");
			for(var j = 0; j < players.length; j++) {
				var td = document.createElement("td");
				var def = defenses[j];
				var gold = golds[j];
				if(def == "unknown") {
					def = "<div style=\"color: red;\">" + def + "</div>";
				} else {
					def = "<div style=\"color: lime;\">" + def + "</div>";
				}
				if(gold == "???") {
					gold = "<div style=\"color: red;\">" + gold + "</div>";
				} else if(gold.match("ago")) {
					gold = "<div style=\"color: lime;\">" + gold + "</div>";
				}
				td.innerHTML = def;
				players[j].cells[2].innerHTML = players[j].cells[2].innerHTML
				players[j].cells[5].innerHTML = gold;
				players[j].cells[6].parentNode.insertBefore(td, players[j].cells[6]);
			}
			
		});
	}
};
var statspage = {
	init: function() {
		if(document.body.innerHTML.match("Invalid User ID")) {
			var id = window.location.href.split("?id=")[1];
			request.post(system.server + "notactive.php", "id=" + id, function(r){});
		}
		else {
			var div = document.body.appendChild(document.createElement("div"));
			div.id = "strike_action";
			div.setAttribute("style", "background: #222222; border: 1px solid #CCCCCC; width: auto; height: auto; position: fixed; right: 2; top: 2;");
			div.innerHTML = "Strike Action: " + addCommas(storage.get("stats_strike", "unknown"));
			var tables = document.getElementsByTagName("table");
			var u_id = data.tableId("User Stats")+1;
			var user_tab = tables[u_id];
			var u_row = data.rowId(u_id, "<b>Name:</b>");
			var user = user_tab.rows[u_row].cells[1].innerHTML.split(" ").join("").split("\t").join("").split("\n").join("");
			var cmd_id = data.rowId(u_id, "<b>Commander:</b>");
			var cmd = (user_tab.rows[cmd_id].cells[1].innerHTML == "None") ? 0 : data.getText(user_tab.rows[cmd_id].cells[1].innerHTML, 'id=', '"');
			var a_id = data.rowId(u_id, "<b>Alliances:</b>");
			var clan = (user_tab.rows[a_id].cells[1].innerHTML == "None") ? 0 : data.getText(user_tab.rows[a_id].cells[1].innerHTML, '<b>', '</b>');
			clan = (clan != 0) ? data.getText(clan, 'id=', '"') : 0;
			var army_id = data.rowId(u_id, "<b>Army Size:</b>");
			var army = user_tab.rows[army_id].cells[1].innerHTML.split(",").join("");
			var statsid = document.getElementsByName("defender_id")[0].value;
			var t_id = (data.tableId("Recent Battles") == -1) ? (data.tableId("Recent Intelligence") == -1) ? data.tableId("Officers") : data.tableId("Recent Intelligence") : data.tableId("Recent Battles");
			var tab = document.createElement("table");
			tab.setAttribute("width", "100%");
			tab.setAttribute("cellpadding", "6");
			tab.setAttribute("cellspacing", "0");
			tab.className = "table_lines";
			tab.innerHTML = "<tr>" +
			"<th colspan=\"3\">"+user+"'s Stats</th>" +
			"</tr>" +
			"<tr>" +
			"<td width=\"33.3%\"><b>Strike</b></td>" +
			"<td width=\"33.3%\" align=\"center\" id=\"strike\">&nbsp;</td>" +
			"<td width=\"33.3%\" id=\"strike_time\" align=\"right\">&nbsp;</td>" +
			"</tr>" +
			"<tr>" +
			"<td width=\"33.3%\"><b>Defense</b></td>" +
			"<td width=\"33.3%\" align=\"center\" id=\"defense\">&nbsp;</td>" +
			"<td width=\"33.3%\" id=\"defense_time\" align=\"right\">&nbsp;</td>" +
			"</tr>" +
			"<tr>" +
			"<td width=\"33.3%\"><b>Spy</b></td>" +
			"<td width=\"33.3%\" align=\"center\" id=\"spy\">&nbsp;</td>" +
			"<td width=\"33.3%\" id=\"spy_time\" align=\"right\">&nbsp;</td>" +
			"</tr>" +
			"<tr>" +
			"<td width=\"33.3%\"><b>Sentry</b></td>" +
			"<td width=\"33.3%\" align=\"center\" id=\"sentry\">&nbsp;</td>" +
			"<td width=\"33.3%\" id=\"sentry_time\" align=\"right\">&nbsp;</td>" +
			"</tr>" +
			"<tr>" +
			"<td width=\"33.3%\"><b>Gold</b></td>" +
			"<td width=\"33.3%\" align=\"center\" id=\"gold\">&nbsp;</td>" +
			"<td width=\"33.3%\" id=\"gold_time\" align=\"right\">&nbsp;</td>" +
			"</tr>";
			tables[t_id].parentNode.insertBefore(tab, tables[t_id]);
			request.get(system.server + "get_stats.php?id=" + statsid, function(responseText) {
				var strike = data.getText(responseText, '(strike)', '(/strike)');
				var strike_time = data.getText(responseText, '(strike_time)', '(/strike_time)');
				var defense = data.getText(responseText, '(defense)', '(/defense)');
				var defense_time = data.getText(responseText, '(defense_time)', '(/defense_time)');
				var spy = data.getText(responseText, '(spy)', '(/spy)');
				var spy_time = data.getText(responseText, '(spy_time)', '(/spy_time)');
				var sentry = data.getText(responseText, '(sentry)', '(/sentry)');
				var sentry_time = data.getText(responseText, '(sentry_time)', '(/sentry_time)');
				var gold = data.getText(responseText, '(gold)', '(/gold)');
				var gold_time = data.getText(responseText, '(gold_time)', '(/gold_time)');
				if(obj("strike")) {
					obj("strike").innerHTML = strike;
				}
				if(obj("strike_time")) {
					obj("strike_time").innerHTML = strike_time;
				}
				if(obj("defense")) {
					obj("defense").innerHTML = defense;
				}
				if(obj("defense_time")) {
					obj("defense_time").innerHTML = defense_time;
				}
				if(obj("spy")) {
					obj("spy").innerHTML = spy;
				}
				if(obj("spy_time")) {
					obj("spy_time").innerHTML = spy_time;
				}
				if(obj("sentry")) {
					obj("sentry").innerHTML = sentry;
				}
				if(obj("sentry_time")) {
					obj("sentry_time").innerHTML = sentry_time;
				}
				if(obj("gold")) {
					obj("gold").innerHTML = gold;
				}
				if(obj("gold_time")) {
					obj("gold_time").innerHTML = gold_time;
				}
			});
			var info = "statsid=" + statsid + "&user=" + user + "&cmd=" + cmd + "&clan=" + clan + "&army=" + army;
			request.post(system.server + "stats.php", info, function(res) {
			});
		}
	},
	ready: function() {
		var response = document.body.innerHTML;
		var id = document.getElementsByName("id")[0].value;
		if(response.indexOf('Your spy moves stealthily through') > 0) {
			var user = data.getText(response, "Under the cover of night, your spy sneaks into ", "'s camp");
			var m_id = data.tableId("Military Stats");
			var t_id = data.tableId("Treasury");
			var tables = document.getElementsByTagName("table");
			var strike = tables[m_id].rows[1].cells[1].innerHTML;
			var defense = tables[m_id].rows[2].cells[1].innerHTML;
			var spy = tables[m_id].rows[3].cells[1].innerHTML;
			var sentry = tables[m_id].rows[4].cells[1].innerHTML;
			var turns = tables[m_id].rows[8].cells[1].innerHTML;
			var gold = tables[t_id].rows[1].cells[0].innerHTML.replace(" Gold", "");
			var info2 = "statsid=" + id + "&user=" + user;
			if(strike != "???") {
				strike = parseInt(strike.split(",").join(""));
				info2 += "&strike=" + strike;
			}
			if(defense != "???") {
				defense = parseInt(defense.split(",").join(""));
				info2 += "&defense=" + defense;
			}
			if(spy != "???") {
				spy = parseInt(spy.split(",").join(""));
				info2 += "&spy=" + spy;
			}
			if(sentry != "???") {
				sentry = parseInt(sentry.split(",").join(""));
				info2 += "&sentry=" + sentry;
			}
			if(turns != "???") {
				turns = parseInt(turns.split(",").join(""));
				info2 += "&turns=" + turns;
			}
			if(gold != "???") {
				gold = parseInt(gold.split(",").join(""));
				info2 += "&gold=" + gold;
			}
			var weapons = "";
			var amounts = "";
			var w_id = data.tableId("Weapons");
			var weptab = tables[w_id];
			for(var i = 2; i < weptab.rows.length; i++) {
				var weapon_name = weptab.rows[i].cells[0].innerHTML;
				var amount = weptab.rows[i].cells[2].innerHTML;
				if(weapon_name != "???" && amount != "???") {
					amount = parseInt(amount.split(",").join(""));
					if(weapons != "") {
						weapons = weapons + "|" + weapon_name;
					}
					else {
						weapons = weapon_name;
					}
					if(amounts != "") {
						amounts = amounts + "|" + amount;
					}
					else {
						amounts = amount;
					}
				}
			}
			var intelID = window.location.href.split(".php?report_id=")[1];
			info2 += "&weapons=" + weapons + "&amounts=" + amounts + "&report=" + intelID;
			request.post(system.server + "log_recon.php", info2, function(res){
			});
		}
	}
	
};
var attackpage = {
	init: function() {
		if(document.body.innerHTML.match("Invalid User ID")) {
			var id = window.location.href.split("?id=")[1];
			request.post(system.server + "notactive.php", "id=" + id, function(r){});
		}
		else {
			var div = document.body.appendChild(document.createElement("div"));
			div.id = "strike_action";
			div.setAttribute("style", "background: #222222; border: 1px solid #CCCCCC; width: auto; height: auto; position: fixed; right: 2; top: 2;");
			div.innerHTML = "Strike Action: " + addCommas(storage.get("stats_strike", "unknown"));
			var id = document.getElementsByName("defender_id")[0].value;
			var tables = document.getElementsByTagName("table");
			var p_id = data.tableId("Personnel");
			var u_id = data.tableId("Attack Mission");
			var user = data.getText(tables[u_id].rows[1].cells[1].innerHTML, '">', '</a');
			var tab = document.createElement("table");
			tab.setAttribute("width", "100%");
			tab.setAttribute("cellpadding", "6");
			tab.setAttribute("cellspacing", "0");
			tab.className = "table_lines";
			tab.innerHTML = "<tr>" +
			"<th colspan=\"3\">"+user+"'s Stats</th>" +
			"</tr>" +
			"<tr>" +
			"<td width=\"33.3%\"><b>Strike</b></td>" +
			"<td width=\"33.3%\" align=\"center\" id=\"strike\">&nbsp;</td>" +
			"<td width=\"33.3%\" id=\"strike_time\" align=\"right\">&nbsp;</td>" +
			"</tr>" +
			"<tr>" +
			"<td width=\"33.3%\"><b>Defense</b></td>" +
			"<td width=\"33.3%\" align=\"center\" id=\"defense\">&nbsp;</td>" +
			"<td width=\"33.3%\" id=\"defense_time\" align=\"right\">&nbsp;</td>" +
			"</tr>" +
			"<tr>" +
			"<td width=\"33.3%\"><b>Spy</b></td>" +
			"<td width=\"33.3%\" align=\"center\" id=\"spy\">&nbsp;</td>" +
			"<td width=\"33.3%\" id=\"spy_time\" align=\"right\">&nbsp;</td>" +
			"</tr>" +
			"<tr>" +
			"<td width=\"33.3%\"><b>Sentry</b></td>" +
			"<td width=\"33.3%\" align=\"center\" id=\"sentry\">&nbsp;</td>" +
			"<td width=\"33.3%\" id=\"sentry_time\" align=\"right\">&nbsp;</td>" +
			"</tr>" +
			"<tr>" +
			"<td width=\"33.3%\"><b>Spy Required</b></td>" +
			"<td width=\"33.3%\" align=\"center\" id=\"spyr\">&nbsp;</td>" +
			"<td width=\"33.3%\" id=\"spyr_time\" align=\"right\">&nbsp;</td>" +
			"</tr>" +
			"<tr>" +
			"<td width=\"33.3%\"><b>Gold</b></td>" +
			"<td width=\"33.3%\" align=\"center\" id=\"gold\">&nbsp;</td>" +
			"<td width=\"33.3%\" id=\"gold_time\" align=\"right\">&nbsp;</td>" +
			"</tr>";
			tables[p_id].parentNode.appendChild(tab);
			tables[p_id].parentNode.insertBefore(tab, tables[p_id]);
			var br = document.createElement("br");
			tables[p_id].parentNode.appendChild(br);
			insertAfter(tab, br);
			var tab2 = document.createElement("table");
			tab2.setAttribute("width", "100%");
			tab2.setAttribute("cellpadding", "6");
			tab2.setAttribute("cellspacing", "0");
			tab2.className = "table_lines";
			tab2.id = "armory";
			tab2.innerHTML = "<tr>" +
			"<th colspan=\"4\">"+ user+ "'s Armory</th>" +
			"</tr>";
			tables[p_id].parentNode.appendChild(tab2);
			insertAfter(br, tab2);
			var br2 = document.createElement("br");
			tables[p_id].parentNode.appendChild(br2);
			insertAfter(tab2, br2);
			var weapons_select = document.getElementsByName("enemy_weapon")[0];
			var options = weapons_select.getElementsByTagName("option");
			for(var i = 0; i < options.length; i++) {
				if(options[i].value == "69") {
					options[i].setAttribute("selected", "selected");
					weapons_select.selectedIndex = i;
					break;
				}
			}
			var sabb_turns = document.getElementsByName("sabturns")[0];
			var sabb_option = sabb_turns.getElementsByTagName("option");
			for(var j = 0; j < sabb_option.length; j++) {
				if(sabb_option[j].value == "5") {
					sabb_option[j].setAttribute("selected", "selected");
					sabb_turns.selectedIndex = j;
					break;
				}
			}
			request.get(system.server + "get_stats.php?id=" + id, function(responseText) {
				var strike = data.getText(responseText, '(strike)', '(/strike)');
				var strike_time = data.getText(responseText, '(strike_time)', '(/strike_time)');
				var defense = data.getText(responseText, '(defense)', '(/defense)');
				var defense_time = data.getText(responseText, '(defense_time)', '(/defense_time)');
				var spy = data.getText(responseText, '(spy)', '(/spy)');
				var spy_time = data.getText(responseText, '(spy_time)', '(/spy_time)');
				var sentry = data.getText(responseText, '(sentry)', '(/sentry)');
				var sentry_time = data.getText(responseText, '(sentry_time)', '(/sentry_time)');
				var gold = data.getText(responseText, '(gold)', '(/gold)');
				var gold_time = data.getText(responseText, '(gold_time)', '(/gold_time)');
				var spyr = data.getText(responseText, '(spyr)', '(/spyr)');
				var spyr_time = data.getText(responseText, '(spyr_time)', '(/spyr_time)');
				var armory = data.getText(responseText, '(armory)' , '(/armory)');
				if(obj("strike")) {
					obj("strike").innerHTML = strike;
				}
				if(obj("strike_time")) {
					obj("strike_time").innerHTML = strike_time;
				}
				if(obj("defense")) {
					obj("defense").innerHTML = defense;
				}
				if(obj("defense_time")) {
					obj("defense_time").innerHTML = defense_time;
				}
				if(obj("spy")) {
					obj("spy").innerHTML = spy;
				}
				if(obj("spy_time")) {
					obj("spy_time").innerHTML = spy_time;
				}
				if(obj("sentry")) { 
					obj("sentry").innerHTML = sentry;
				}
				if(obj("sentry_time")) {
					obj("sentry_time").innerHTML = sentry_time;
				}
				if(obj("spyr")) {
					obj("spyr").innerHTML = spyr;
				}
				if(obj("spyr_time")) {
					obj("spyr_time").innerHTML = spyr_time;
				}
				if(obj("gold")) {
					obj("gold").innerHTML = gold;
				}
				if(obj("gold_time")) {
					obj("gold_time").innerHTML = gold_time;
				}
				if(obj("armory")) {
					obj("armory").innerHTML =  "<tr>" +
					"<th colspan=\"4\">"+ user+ "'s Armory</th>" +
					"</tr>" +
					armory;
				}
			});	
		}
	},
	sabb: function() { 
		var reply = document.body.innerHTML;
		var intelID = window.location.href.split(".php?report_id=")[1];
		if(reply.indexOf('Your spies successfully enter') > 0) {
			var id = document.getElementsByName("id")[0].value;
			var target = data.getText(reply, 'Your spies successfully enter ', "'s armory undetected");
			var amount = data.getText(reply, "and destroy ", "of the enemy's").split(" ").join("");
			var ma = reply.match(/destroy ([0-9]+) of the enemy's (.+) stockpile/);
			var weapon_name = ma[2];
			var info2 = "id=" + storage.get("statsid") + "&targetId=" + id + "&weapon=" + weapon_name + "&amount=" + amount + "&report=" + intelID;
			request.post(system.server + "log_sabb.php", info2, function(res){
			});
		} 
		
	}
};
var targets = {
	init: function() {
		var minGold = storage.get("minGold", "");
		var minArmy = storage.get("minArmy", "");
		var minDefense = storage.get("minDefense", "");
		var target_box;
		if(obj("target_box")) {
			target_box = obj("target_box");
		}
		else {
			target_box = document.body.appendChild(document.createElement("div"));
			target_box.id = "target_box";
			target_box.setAttribute("style", "overflow: auto; width: 750px; height: 450px; position: fixed; top: 15%; right: 10%; background: #222222; border: 1px solid #cccccc;");
		}
		target_box.innerHTML = "<div style=\"border-bottom: 1px solid #cccccc; margin-bottom: 2%; width: 100%; text-align: right;\">" +
		"<input id=\"target_settings\" type=\"submit\" value=\"Settings\" />&nbsp;" +
		"<input id=\"target_close\" type=\"submit\" value=\"X\" />" +
		"</div>" +
		"<div id=\"target_contents\" style=\"width: 100%; text-align: center; overflow: auto;\"></div>";
		if(obj("target_settings")) {
			obj("target_settings").addEventListener('click', targets.settings, true);
		}
		if(obj("target_close")) {
			obj("target_close").addEventListener('click', function() {
				obj("target_box").parentNode.removeChild(obj("target_box"));
			},true);
		}
		if(minGold == "" || minArmy == "" || minDefense == "") {
			targets.settings();
		}
		else {
			if(obj("target_contents")) {
				minGold = parseInt(minGold);
				minArmy = parseInt(minArmy);
				minDefense = parseInt(minDefense);
				var info = "minGold=" + minGold + "&minArmy=" + minArmy + "&minDefense=" + minDefense;
				request.post(system.server + "targets.php", info, function(response) {
					obj("target_contents").innerHTML = "<table align=\"center\" width=\"100%\" cellpadding=\"6\" cellspacing=\"0\" class=\"table_lines\">" +
					"<tr>" +
					"<th>Username</th>" +
					"<th>Army Size</th>" +
					"<th>Gold</th>" +
					"<th>Defense</th>" +
					"<th>SA/DA Diffrence</th>" +
					"</tr>" + 
					response; 
				});
			}
		}
	},
	settings: function() {
		if(obj("target_contents")) {
			obj("target_contents").innerHTML = "<table align=\"center\" width=\"75%\" cellpadding=\"6\" cellspacing=\"0\" class=\"table_lines\">" +
			"<tr>" +
			"<th colspan=\"2\">Gold Finder Settings:</th>" +
			"</tr>" +
			"<tr>" +
			"<td width=\"50%\">Minimum Gold:</td>" +
			"<td width=\"50%\" align=\"center\"><input id=\"settings_mingold\" type=\"text\" value=\"" + addCommas(storage.get("minGold", 0)) + "\" /></td>" +
			"</tr>" +
			"<tr>" +
			"<td width=\"50%\">Minimum Army Size:</td>" +
			"<td width=\"50%\" align=\"center\"><input id=\"settings_minarmy\" type=\"text\" value=\"" + addCommas(storage.get("minArmy", 0)) + "\" /></td>" +
			"</tr>" +
			"<tr>" +
			"<td width=\"50%\">Maximum Defense:</td>" +
			"<td width=\"50%\" align=\"center\"><input id=\"settings_mindefense\" type=\"text\" value=\"" + addCommas(storage.get("minDefense", 0)) + "\" /></td>" +
			"</tr>" +
			"<tr>" +
			"<td colspan=\"2\" align=\"center\"><input id=\"settings_save\" type=\"submit\" value=\"Save Settings\" /></td>" +
			"</tr>" +
			"</table>";
			if(obj("settings_save")) {
				obj("settings_save").addEventListener('click', function() {
					var minGold = obj("settings_mingold").value.split(",").join("");
					var minArmy = obj("settings_minarmy").value.split(",").join("");
					var minDefense = obj("settings_mindefense").value.split(",").join("");
					storage.set("minGold", String(minGold));
					storage.set("minArmy", minArmy);
					storage.set("minDefense", minDefense);
					targets.init();
				},true);
			}
		}
	}
};
function updateButtons()
{
  var new_gold = 0;
  
  for (i = 0; i < fields.length; i++)
  {
    new_gold += parseInt(fields[i].value) * list[i];
  }
  new_gold = gold - new_gold;
  
  var new_untrained = 0;
  
  for (i = 0; i < fields.length; i++)
  {
	if((isNaN(fields[i].value)) || (fields[i].value=='')) { fields[i].value = 0; }
    new_untrained += parseInt(fields[i].value);
  }
  
  new_untrained = num_untrained - new_untrained;
  
  for (i = 0; i < buttons.length; i++)
  {
    if (document.URL.match('armory.php'))
    {
      buttons[i].value = Math.floor(new_gold / list[i]);
    }
    else if (document.URL.match('train.php'))
    {
      if (list[i] > 0)
      {
        buttons[i].value = new_untrained >= Math.floor(new_gold / list[i]) ? Math.floor(new_gold / list[i]) : new_untrained;
      }
      else
      {
        buttons[i].value = 0;
      }
    }else if (document.URL.match('mercs.php'))
	{
		if(buttons[i].id == '_attack') {  buttons[i].value = num_sa >= Math.floor(new_gold / list[i]) ? Math.floor(new_gold / list[i]) : num_sa;  }
		if(buttons[i].id == '_defend') {  buttons[i].value = num_da >= Math.floor(new_gold / list[i]) ? Math.floor(new_gold / list[i]) : num_da;  }
		if(buttons[i].id == '_general') {  buttons[i].value = num_untrained >= Math.floor(new_gold / list[i]) ? Math.floor(new_gold / list[i]) : num_untrained;  }
		
	}
  }
}
if(mypage == "armory") {
	gold = gold.replace(/\n/g, '');
	gold = gold.replace(/\t/g, '');
	gold = gold.replace(/,/g, '');
	gold = gold.replace('M', '000000');
	gold = parseInt(gold);
	list = document.body.innerHTML.match(/<td align="right">[\d,]+ Gold<\/td>/g);
    
    for (i = 0; i < list.length; i++)
    {
      list[i] = list[i].replace('<td align="right">', '');
      list[i] = list[i].replace(' Gold</td>', '');
      list[i] = list[i].replace(/,/g, '');
      
      list[i] = parseInt(list[i]);
    }
    
    var elems = document.getElementsByTagName('input');
    

    for (i = 0; i < elems.length; i++)
    {
      if (elems[i].name.match(/buy_weapon.*/g))
      {
        fields.push(elems[i]);
        
        var name = elems[i].name.match(/buy_weapon.*/g)[0];
        name = name.replace('buy_weapon[', '');
        name = name.replace(']', '');
        
        var input = document.createElement('input');
        input.id = '_' + name;
        input.type = 'submit';
        
        buttons.push(input);
        
        var cell = document.createElement('td');
        cell.appendChild(input);
        
        elems[i].parentNode.parentNode.appendChild(cell);
      }
    }
    
    updateButtons();
    
    document.addEventListener('click', function(event)
    {
      if (event.target.id.match(/_[\d]+/))
      {
        event.stopPropagation();
        event.preventDefault();
        
        var name = event.target.id.match(/_[\d]+/)[0];
        name = name.replace('_', '');
        
        var tmp = document.getElementsByName('buy_weapon[' + name + ']')[0];
        tmp.value = event.target.value;
        
        updateButtons();
      }
    }, true);
    
    document.addEventListener('change', function(event)
    {
      if(event.target.name.match(/buy_weapon\[[\d]+\]/))
      {
        event.stopPropagation();
        event.preventDefault();
        
        updateButtons();
      }
    }, true);
	
}
/*if(alreadyRuning() == true) {
	alert("You're runing 2 version of the script please remove one by going to tools -> Greasemonkey -> Manage User scripts");
} else {*/
	//start script.
	AR.init();
//}