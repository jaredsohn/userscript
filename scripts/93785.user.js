var metadata=<> 
// ==UserScript==
// @name           Spionage-Plünder-Rechner
// @namespace      http://userscripts.org/scripts/show/93785
// @include        http://s*.ikariam.com/*
// @exclude        http://support*.ikariam.*/*
// @author         Karandaras (http://userscripts.org/users/265255)
// @require        http://userscripts.org/scripts/source/94511.user.js
// @version        1.0h
// @updater:script http://userscripts.org/scripts/source/93785.user.js
// @updater:meta   http://userscripts.org/scripts/source/93785.meta.js
// @updater:delay  86400000
// ==/UserScript==
</>.toString();

// Lokalisierung
var languages = {
	de: {
		"warehouse": "Lagerhaus",
		"inactive": "Inaktiv?",
		"ships": "Schiffe",
		"pillage": "Plünderbar",
		"wall": "Stadtmauer"
	},
	en: {
		"warehouse": "Warehouse",
		"inactive": "Inactive?",
		"ships": "Ships",
		"pillage": "Pillageable",
		"wall": "Town wall"
	},
	es: {
		"warehouse": "Depósito",
		"inactive": "Inactivo?",
		"ships": "Barcos",
		"pillage": "Saqueable",
		"wall": "Muro de la Ciudad"
	}, 
};

var href = document.location.href;
var server = getServer(href);
var lang = getLanguage(href);
var store = server+"_"+lang;

var cities = loadArray(GM_getValue(store+'-cities',''));

// Update-Check
var update = new Updater(metadata,lang);
update.update();

var language = languages[lang];
if(language == null)
	language = languages['en'];

function getServer(href) {
	var server = href.replace(/........(\d+).*/,"$1");
	return server;
}

function getLanguage(href) {
	var language = href.replace(/........\d+.(\w+).*/,"$1");
	return language ;
}

// v0.4.2
var reports = document.getElementById('espionageReports');
var report = new Array();
var res = new Array();
var sep = ".";

if(document.body.id == "city") {
	var infobox = document.getElementById("information");
	var cityname = infobox.getElementsByTagName("h3")[0].innerHTML;
	var playername = "";
	if(infobox.getElementsByTagName("li").length > 0) {
		var node = infobox.getElementsByTagName("li")[0].firstChild.nextSibling;
		while(node.nodeValue == null)
			node = node.nextSibling;
			
		playername = node.nodeValue.replace(/^\W[ ]+/g,"").replace(/^ +/g,"").replace(/\W[ ]+$/g,"").replace(/ $/g,"");
	}
		
	if(playername != "") {
		if(cities[playername] == null)
			cities[playername] = new Object();
		if(cities[playername][cityname] == null)
			cities[playername][cityname] = new Object();
		
		cities[playername][cityname]["wall"] = document.getElementById("position14").getElementsByTagName("span")[0].innerHTML.replace(/\D+(\d+)/,"$1");
	
		var warehouse = 0;

		for(var i=3; i<=13; i++) {
			var pos = document.getElementById("position"+i);
			if(pos.getAttribute('class') == "warehouse")
				warehouse += parseInt(pos.getElementsByTagName("span")[0].innerHTML.replace(/\D+(\d+)/,"$1"));
		}

		cities[playername][cityname]["warehouse"] = warehouse;
		
		GM_setValue(store+'-cities',storeArray(cities));
	}
}

if(reports != null) {
	var all_reports = reports.getElementsByTagName('table');
	
	for(var i=0; i<all_reports.length; i++) {
		if(all_reports[i].getAttribute('id') == 'resources')
			report.push(all_reports[i]);
	}
	
	for(var i=0; i<report.length; i++) {
		var rephead = report[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
		while(!rephead.id || rephead.id.indexOf("message") == -1)
			rephead = rephead.previousSibling;
			
		var wall = "?";
		var house = 0;
		var city = rephead.getElementsByTagName("td")[4].innerHTML.replace(/^\W[ ]+/g,"").replace(/[ ]+$/g,"");
		var player = rephead.getElementsByTagName("td")[3].innerHTML.replace(/^\W[ ]+/g,"").replace(/[ ]+$/g,"");
		if(cities[player] != null) {
			if(cities[player][city] != null) {
				if(cities[player][city]["warehouse"] != null)
					house = cities[player][city]["warehouse"];
				if(cities[player][city]["wall"] != null)
					wall = cities[player][city]["wall"];
			}
		}
					
		res[i] = getResources(report[i]);
		sep = getSeperator(report[i]);

		var header = document.createElement('th');
		header.setAttribute('class', 'count');
		header.innerHTML = language["pillage"];
		report[i].getElementsByTagName('tr')[0].appendChild(header);


		var holz = document.createElement('td');
		holz.setAttribute('class', 'count');
		holz.setAttribute('id', 'holz_'+i);
		holz.innerHTML = addCommas(pillage(res[i][0],house));
		report[i].getElementsByTagName('tr')[1].appendChild(holz);


		var wein = document.createElement('td');
		wein.setAttribute('class', 'count');
		wein.setAttribute('id', 'wein_'+i);
		wein.innerHTML = addCommas(pillage(res[i][1],house));
		report[i].getElementsByTagName('tr')[2].appendChild(wein);


		var marmor = document.createElement('td');
		marmor.setAttribute('class', 'count');
		marmor.setAttribute('id', 'marmor_'+i);
		marmor.innerHTML = addCommas(pillage(res[i][2],house));
		report[i].getElementsByTagName('tr')[3].appendChild(marmor);


		var glas = document.createElement('td');
		glas.setAttribute('class', 'count');
		glas.setAttribute('id', 'glas_'+i);
		glas.innerHTML = addCommas(pillage(res[i][3],house));
		report[i].getElementsByTagName('tr')[4].appendChild(glas);


		var schwefel = document.createElement('td');
		schwefel.setAttribute('class', 'count');
		schwefel.setAttribute('id', 'schwefel_'+i);
		schwefel.innerHTML = addCommas(pillage(res[i][4],house));
		report[i].getElementsByTagName('tr')[5].appendChild(schwefel);

		var ships = document.createElement('tr');
		var ships_td1 = document.createElement('td');
		ships_td1.setAttribute('colSpan','2');
		ships_td1.setAttribute('class', 'unitname');
		ships_td1.innerHTML = language["ships"];
		var ships_td2 = document.createElement('td');
		ships_td2.setAttribute('class', 'count');
		ships_td2.setAttribute('id', 'schiffe_'+i);
		ships_td2.innerHTML = schiffe(res[i],house);
		ships.appendChild(ships_td1);
		ships.appendChild(ships_td2);

		report[i].appendChild(ships);

		var warehouse = document.createElement('tr');
		var warehouse_td1 = document.createElement('td');
		warehouse_td1.setAttribute('colSpan','2');
		warehouse_td1.setAttribute('class', 'unitname');
		warehouse_td1.innerHTML = language["warehouse"];
		var warehouse_td2 = document.createElement('td');
		warehouse_td2.setAttribute('class', 'count');
		warehouse_td2.innerHTML = "<input class=textfield id=warehouse_"+i+" style='width:100%' type=text value='"+house+"'>";
		warehouse.appendChild(warehouse_td1);
		warehouse.appendChild(warehouse_td2);

		report[i].appendChild(warehouse);

		var inactive = document.createElement('tr');
		var inactive_td1 = document.createElement('td');
		inactive_td1.setAttribute('colSpan','2');
		inactive_td1.setAttribute('class', 'unitname');
		inactive_td1.innerHTML = language["inactive"];
		var inactive_td2 = document.createElement('td');
		inactive_td2.setAttribute('class', 'count');
		inactive_td2.innerHTML = "<input class=textfield id=inactive_"+i+" type=checkbox>";
		inactive.appendChild(inactive_td1);
		inactive.appendChild(inactive_td2);
		report[i].appendChild(inactive);

		var wall_tr = document.createElement('tr');
		var wall_td1 = document.createElement('td');
		wall_td1.setAttribute('colSpan','2');
		wall_td1.setAttribute('class', 'unitname');
		wall_td1.innerHTML = language["wall"];
		var wall_td2 = document.createElement('td');
		wall_td2.setAttribute('class', 'count');
		wall_td2.innerHTML = wall;
		wall_tr.appendChild(wall_td1);
		wall_tr.appendChild(wall_td2);
		report[i].appendChild(wall_tr);
		
		report[i].setAttribute('style','width:70%');
		report[i].getElementsByTagName('td')[0].setAttribute('style','width:10%');
		report[i].getElementsByTagName('td')[1].setAttribute('style','width:45%');
		report[i].getElementsByTagName('td')[2].setAttribute('style','width:45%');

		document.getElementById('warehouse_'+i).addEventListener('keyup', calc, true);
		document.getElementById('inactive_'+i).addEventListener('click', calc, true);
	}
}

/* v0.4.1
var resources = document.getElementById('resources');
if(resources != null) {
	var res = getResources(resources);
	
	var header = document.createElement('th');
	header.setAttribute('class', 'count');
	header.innerHTML = language["pillage"];
	resources.getElementsByTagName('tr')[0].appendChild(header);


	var holz = document.createElement('td');
	holz.setAttribute('class', 'count');
	holz.setAttribute('id', 'holz');
	holz.innerHTML = addCommas(pillage(res[0],0));
	resources.getElementsByTagName('tr')[1].appendChild(holz);


	var wein = document.createElement('td');
	wein.setAttribute('class', 'count');
	wein.setAttribute('id', 'wein');
	wein.innerHTML = addCommas(pillage(res[1],0));
	resources.getElementsByTagName('tr')[2].appendChild(wein);


	var marmor = document.createElement('td');
	marmor.setAttribute('class', 'count');
	marmor.setAttribute('id', 'marmor');
	marmor.innerHTML = addCommas(pillage(res[2],0));
	resources.getElementsByTagName('tr')[3].appendChild(marmor);


	var glas = document.createElement('td');
	glas.setAttribute('class', 'count');
	glas.setAttribute('id', 'glas');
	glas.innerHTML = addCommas(pillage(res[3],0));
	resources.getElementsByTagName('tr')[4].appendChild(glas);


	var schwefel = document.createElement('td');
	schwefel.setAttribute('class', 'count');
	schwefel.setAttribute('id', 'schwefel');
	schwefel.innerHTML = addCommas(pillage(res[4],0));
	resources.getElementsByTagName('tr')[5].appendChild(schwefel);

	var ships = document.createElement('tr');
	var ships_td1 = document.createElement('td');
	ships_td1.setAttribute('colSpan','2');
	ships_td1.setAttribute('class', 'unitname');
	ships_td1.innerHTML = language["ships"];
	var ships_td2 = document.createElement('td');
	ships_td2.setAttribute('class', 'count');
	ships_td2.setAttribute('id', 'schiffe');
	ships_td2.innerHTML = schiffe(res,0);
	ships.appendChild(ships_td1);
	ships.appendChild(ships_td2);

	resources.appendChild(ships);

	var warehouse = document.createElement('tr');
	var warehouse_td1 = document.createElement('td');
	warehouse_td1.setAttribute('colSpan','2');
	warehouse_td1.setAttribute('class', 'unitname');
	warehouse_td1.innerHTML = language["warehouse"];
	var warehouse_td2 = document.createElement('td');
	warehouse_td2.setAttribute('class', 'count');
	warehouse_td2.innerHTML = "<input class=textfield id=warehouse size=10 type=text>";
	warehouse.appendChild(warehouse_td1);
	warehouse.appendChild(warehouse_td2);

	resources.appendChild(warehouse);
	
	var inactive = document.createElement('tr');
	var inactive_td1 = document.createElement('td');
	inactive_td1.setAttribute('colSpan','2');
	inactive_td1.setAttribute('class', 'unitname');
	inactive_td1.innerHTML = language["inactive"];
	var inactive_td2 = document.createElement('td');
	inactive_td2.setAttribute('class', 'count');
	inactive_td2.innerHTML = "<input class=textfield id=inactive type=checkbox>";
	inactive.appendChild(inactive_td1);
	inactive.appendChild(inactive_td2);
	resources.appendChild(inactive);

	document.getElementById('warehouse').addEventListener('keyup', calc, true);
	document.getElementById('inactive').addEventListener('click', calc, true);
}
*/

function calc(event) {
	var ida = event.target.getAttribute('id').split('_');
	var id;
	if(ida.length <= 1)
		return;
	else
		id = parseInt(ida[1]);
		
		
	var lvl = parseInt(document.getElementById('warehouse_'+id).value);
	var inactive = document.getElementById('inactive_'+id).checked;
	
	if(isNaN(lvl)) {
		lvl=0;
		document.getElementById('warehouse_'+id).value=0;
	}
	
	if(inactive) {
		document.getElementById('holz_'+id).innerHTML = addCommas(pillagei(res[id][0],lvl));
		document.getElementById('wein_'+id).innerHTML = addCommas(pillagei(res[id][1],lvl));
		document.getElementById('marmor_'+id).innerHTML = addCommas(pillagei(res[id][2],lvl));
		document.getElementById('glas_'+id).innerHTML = addCommas(pillagei(res[id][3],lvl));
		document.getElementById('schwefel_'+id).innerHTML = addCommas(pillagei(res[id][4],lvl));
		document.getElementById('schiffe_'+id).innerHTML = schiffei(res[id],lvl);
	}
	else  {
		document.getElementById('holz_'+id).innerHTML = addCommas(pillage(res[id][0],lvl));
		document.getElementById('wein_'+id).innerHTML = addCommas(pillage(res[id][1],lvl));
		document.getElementById('marmor_'+id).innerHTML = addCommas(pillage(res[id][2],lvl));
		document.getElementById('glas_'+id).innerHTML = addCommas(pillage(res[id][3],lvl));
		document.getElementById('schwefel_'+id).innerHTML = addCommas(pillage(res[id][4],lvl));
		document.getElementById('schiffe_'+id).innerHTML = schiffe(res[id],lvl);
	}
	

	/* v0.4.1
	var lvl = parseInt(document.getElementById('warehouse').value);
	var inactive = document.getElementById('inactive').checked;
	
	if(isNaN(lvl)) {
		lvl=0;
		document.getElementById('warehouse').value=0;
	}
	
	if(inactive) {
		document.getElementById('holz').innerHTML = addCommas(pillagei(res[0],lvl));
		document.getElementById('wein').innerHTML = addCommas(pillagei(res[1],lvl));
		document.getElementById('marmor').innerHTML = addCommas(pillagei(res[2],lvl));
		document.getElementById('glas').innerHTML = addCommas(pillagei(res[3],lvl));
		document.getElementById('schwefel').innerHTML = addCommas(pillagei(res[4],lvl));
		document.getElementById('schiffe').innerHTML = schiffei(res,lvl);
	}
	else  {
		document.getElementById('holz').innerHTML = addCommas(pillage(res[0],lvl));
		document.getElementById('wein').innerHTML = addCommas(pillage(res[1],lvl));
		document.getElementById('marmor').innerHTML = addCommas(pillage(res[2],lvl));
		document.getElementById('glas').innerHTML = addCommas(pillage(res[3],lvl));
		document.getElementById('schwefel').innerHTML = addCommas(pillage(res[4],lvl));
		document.getElementById('schiffe').innerHTML = schiffe(res,lvl);
	}
	*/
}

function schiffe(res,lvl) {
	var summe = 0;
	for(var i=0; i<res.length; i++) {
		summe+=pillage(res[i],lvl);
	}
	return Math.ceil(summe/500);
}

function pillage(amount, level) {
	return Math.max(amount-level*480-100,0);
}

function schiffei(res,lvl) {
	var summe = 0;
	for(var i=0; i<res.length; i++) {
		summe+=pillagei(res[i],lvl);
	}
	return Math.ceil(summe/500);
}

function pillagei(amount, level) {
	return Math.max(amount-level*80-100,0);
}

function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? ',' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + sep + '$2');
	}
	return x1;
}

function getResources (report) {
	var tds = report.getElementsByTagName('td');
	var ressis = new Array();
	for(var i=1; i<tds.length; i=i+2) {
		ressis[i/2-0.5] = parseInt(tds[i].innerHTML.replace(/\./g,"").replace(/,/g,""));
	}
	
	return ressis;
}

function getSeperator (report) {
	var tds = report.getElementsByTagName('td');
	for(var i=1; i<tds.length; i=i+2) {
		if(tds[i].innerHTML.indexOf(",") > 0)
			return ",";
	}
	
	return sep;
}

function storeArray(array) {
	return array.toSource();
}

function loadArray(string) {
	if(string=="")
		return new Object();
	else
		return eval(string);
}
