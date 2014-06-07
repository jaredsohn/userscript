// ==UserScript==
// @name           PGHE Lite
// @namespace      11235813[Bande:Dritteliga Penner]
// @description    PGHE-Laedt schneller, mehr Features, sicherer
// @include        http://*game*/highscore/*
// @include		   *game*settings*
// @exclude		   *gang/*
// @exclude		   *.php*
// @exclude 	   *stuff*
// @require		   http://zahlii.independent-irc.com/script.class.js
// @require		   http://zahlii.independent-irc.com/updater.class.js
// @require		   http://zahlii.independent-irc.com/setting.class.js
// ==/UserScript==
var tiere = init();
add_setting('PGHE-Lite',[['text','usort','Nach welcher Spalte soll sortiert werden:']]);
UpdateHandler('pghe_lite','0.3');
var regexp = new Object();
regexp['www.clodogame.fr'] = new Object();
regexp['www.pennergame.de'] = new Object();
regexp['www.pennergame.de']['pet_own'] = /Basiswerten.*?von.*?<b>(.*?)<\/b>/;
regexp['www.pennergame.de']['pet'] = /http:\/\/(static|media).*?\/tiere\/(\d+\.jpg)/;
regexp['www.pennergame.de']['online'] = /Ist gerade Online/;
regexp['www.pennergame.de']['bann'] = /verbannt/
regexp['www.pennergame.de']['limit'] = /Dein Ziel muss (\d+) bis (\d+) Punkte haben/;
regexp['www.pennergame.de']['stat'] = /(Gewonnen:|Verloren:)<\/td><td>(\d+)<\/td>/g;;
regexp['www.clodogame.fr']['stat'] = /(Gagn.:|Perdu:).*?(\d+).*?<\/td/g;
regexp['www.clodogame.fr']['limit'] = /doit avoir de (\d+).*?(\d+) points/;
regexp['www.clodogame.fr']['bann'] = /banni du jeu/
regexp['www.clodogame.fr']['online'] = /Est actuellement en ligne/;
regexp['www.clodogame.fr']['pet_own'] = /Basiswerten.*?von.*?<b>(.*?)<\/b>/;
regexp['www.clodogame.fr']['pet'] = /http:\/\/(media|static).*?\/tiere\/.*?(\d+\.jpg)/;
regexp['berlin.pennergame.de'] = regexp['pennergame.de'] = regexp['www.pennergame.de'];
regexp['www.dossergame.co.uk'] = new Object();
regexp['www.dossergame.co.uk']['pet_own'] = /Basiswerten.*?von.*?<b>(.*?)<\/b>/;
regexp['www.dossergame.co.uk']['pet'] = /http:\/\/(media|static).*?\/tiere\/(\d+\.jpg)/;
regexp['www.dossergame.co.uk']['online'] = /is online/;
regexp['www.dossergame.co.uk']['bann'] = /banned/
regexp['www.dossergame.co.uk']['limit'] = /Dein Ziel muss (\d+) bis (\d+) Punkte haben/;
regexp['www.dossergame.co.uk']['stat'] = /(Won:|Lost:)<\/td><td>(\d+)<\/td>/g;
var usereg = document.location.hostname;
var regexp = regexp[usereg];

var head = ['Platz','','Spieler','Punkte','Dif','RP','RegDatum','Geld','Haustier','Plunder','Stadtteil','Status','','Bande','Bandenplatz','Bandenpunkte','Mitglieder','Schnitt','Beitrittsdatum'];

var DEFAULT_SORT = GM_getValue('setting_PGHE-Lite_usort','Platz');
var links = {
			'Blog':'http://blog.farbflut.de/blog/',
			'News':Global.url.static+'news/',
			'Lets Fight':Global.url.static+'fight/overview/',
			'&Uuml;bersicht':Global.url.static+'overview/',
			'Bande':Global.url.static+'gang/',
			'Bandenhighscore':Global.url.static+'highscore/gang/',
			'Mein Highscore':Global.url.static+'highscore/joindate/'
};
var table = document.getElementsByTagName('table')[0];
var zeile = table.getElementsByTagName('tr');

var user_finished = 0;

var spielerdaten = {};
var benutzerdaten = {};
var daten_tabelle = [];
var tabelle = [];

var column = 0;

var order = 'DESC';
if(!Boolean(document.location.href.match(/setting/))) {
document.getElementsByTagName('head')[0].innerHTML = '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"><title>PGHE V0.2</title><link rel="stylesheet" href="http://scripte.pennerstore.de/style_pghe.css" />';
document.body.innerHTML = '';

GM_xmlhttpRequest
({
method: 'GET',
url: Global.url.static+'fight/',
onload: 
function(responseDetails) 
{ 
	var cont = responseDetails.responseText;
	try {
	benutzerdaten.id = cont.match(/avatare\/(\d+)_small\.jpg/)[1];		
  	var newcont = cont.replace(/\s+/g,'');
	var vals = newcont.match(/>(\d+)<aclass="tooltip"/g);
	var att = vals[0].match(/(\d+)/)[0];
	benutzerdaten.att = parseInt(att);
	var def = vals[1].match(/(\d+)/)[0];
	benutzerdaten.def = parseInt(def);
	var wonlost = newcont.match(regexp['stat']);
	var won = wonlost[0].match(/(\d+)/)[1];
	benutzerdaten.won = parseInt(won);
	var lost = wonlost[1].match(/(\d+)/)[1];
	benutzerdaten.lost = parseInt(lost);
	benutzerdaten.lf = parseInt(parseInt(att)*1.16+parseInt(def));
	benutzerdaten.ratio = parseInt((benutzerdaten.won/(benutzerdaten.won+benutzerdaten.lost))*100);
	var limits = cont.match(regexp['limit']);
	} catch(e) {
		benutzerdaten.id = 'Bitte einloggen!';
		benutzerdaten.att = '';
		benutzerdaten.lf = '';
		benutzerdaten.lost = '';
		benutzerdaten.won = '';
		benutzerdaten.ratio = '';
		benutzerdaten.def = '';
		var limits = [0,0,1000000000];
	}
	benutzerdaten.limit_min = parseInt(limits[1],10);
	benutzerdaten.limit_max = parseInt(limits[2],10);
	for(var a = 1; a < zeile.length ; a++) {
		var zeile_aktiv = zeile[a];
		var felder = zeile_aktiv.getElementsByTagName('td');
		var id_feld = felder[1].innerHTML;
		var punkte_aktiv = parseInt(felder[4].innerHTML,10);
		var id_aktiv = id_feld.match(/\/profil\/id:(\d+)\//)[1];
		spielerdaten[id_aktiv] = {id: id_aktiv,	punkte_hs:punkte_aktiv};
		getDaten(id_aktiv);
	}
	navi();
}
});



function getDaten(id) {
	GM_xmlhttpRequest
	({
    method: 'GET',
    url: Global.url.static+'dev/api/user.'+id+'.xml',
    onload: 
	function(responseDetails) 
	{
		var dom = setParser(responseDetails.responseText,'XML');
		spielerdaten[id]['punkte'] = getTC('points',dom)[0];
		spielerdaten[id]['punkte_dif'] = spielerdaten[id]['punkte']-spielerdaten[id]['punkte_hs'];
		spielerdaten[id]['platz'] = getTC('position',dom)[0];
		spielerdaten[id]['name'] = getTC('name',dom)[0];
		try {
		spielerdaten[id]['cash'] = dom.getElementsByTagName('cash')[0].textContent;
		} catch(e) {
			spielerdaten[id]['cash'] = false;
		}
		spielerdaten[id]['rp'] = getTC('rankingpoints',dom)[0];
		spielerdaten[id]['reg'] = getTC('reg_since',dom)[0];
		spielerdaten[id]['stadtteil'] = getTC('city',dom)[0];
		spielerdaten[id]['status'] = getTC('status',dom)[0];		
		spielerdaten[id]['gang_id'] = getTC('id',dom,0)[1];
		if(spielerdaten[id]['gang_id'] != 'None' && spielerdaten[id]['gang_id'] != '0') {
			spielerdaten[id]['beitritt'] = getTC('joined',dom)[0];
			GM_xmlhttpRequest
			({
			method: 'GET',
			url: Global.url.static+'dev/api/gang.'+spielerdaten[id]['gang_id']+'.xml',
			onload: function(responseDetails) 
			{
				var dom = setParser(responseDetails.responseText,'XML');
				spielerdaten[id]['gang_name'] = getTC('name',dom)[0];
				spielerdaten[id]['gang_platz'] = getTC('position',dom)[0];
				spielerdaten[id]['gang_punkte'] = getTC('points',dom)[0];
				spielerdaten[id]['gang_mitglieder'] = getTC('member_count',dom)[0];
				spielerdaten[id]['gang_schnitt'] = parseInt(parseInt(spielerdaten[id]['gang_punkte'])/parseInt(spielerdaten[id]['gang_mitglieder']),10);
				getProfil(id);
			}
			});
		} else {
			spielerdaten[id]['gang_name'] = '-';
			spielerdaten[id]['gang_platz'] = '-';
			spielerdaten[id]['gang_punkte'] = '-';
			spielerdaten[id]['gang_mitglieder'] = '-';
			spielerdaten[id]['gang_schnitt'] = '-';
			spielerdaten[id]['status'] = 0;
			spielerdaten[id]['beitritt'] = '-';
			spielerdaten[id]['gang_id'] = false;
			getProfil(id);
		}
		
	}
	});
}
function getProfil(id) {
	GM_xmlhttpRequest
	({
    method: 'GET',
    url: Global.url.static+'profil/id:'+id+'/',
    onload: 
	function(responseDetails) 
	{
		var cont = responseDetails.responseText;
		if(cont.match(regexp['bann'])) {
			spielerdaten[id]['spieler_status'] = 'BANN';
			spielerdaten[id]['pet'] = false;
		} else {
			var cont_alt = cont;
			var cont = cont.split('headline')[2];
			if(typeof(cont) != 'undefined') {	
				//alert(cont);
				try {
					var pet = cont.match(regexp['pet_own'])[1];
					var pet = tiere[pet];
				} catch(e) {
					try {
						var pet = cont.match(regexp['pet'])[2];
						//alert(pet);
							if(typeof(pet)=='undefined') {
								var pet = false;
							}
					} catch(e) {
						var pet = false;
					}
				}
				spielerdaten[id]['pet'] = "http://media.pennergame.de/img/tiere/"+pet;
			} else {
				spielerdaten[id]['pet'] = false;
				
			}
			//alert(pet);
			var cont = cont_alt;
			try {
				var plunder = cont.match(/http:\/\/static\..*?\/img\/pv4\/plunder\/.*?\.(png|gif|jpg)/)[0];
			} catch(e) {
				var plunder = false;
			}
			spielerdaten[id]['plunder'] = plunder;
			
			if(cont.match(regexp['online'])) {
				spielerdaten[id]['spieler_status'] = 'ONLINE';
			} else {
				spielerdaten[id]['spieler_status'] = false;
			}

		}
		check();
	}
	});
}
function check() {
	user_finished++;
	//alert(user_finished);
	if(user_finished==zeile.length-1) {
		rawTable();
		buildInhalt();	
		for(var p = 0;p<head.length;p++) {
			if(head[p]==DEFAULT_SORT) {
				var col = p; 
				break;
			}
		}
		column = col;
		sortObj(p);
		
	}
}
function buildInhalt() {
	for(var f=0;f<daten_tabelle.length;f++) {
		var daten = daten_tabelle[f];
		daten[11] = ['-','Mitglied','CoAdmin','Admin'][parseInt(daten[11],10)];
		bla = daten[19];
		if(bla=='ONLINE') {
			var cde = '<br /><span style="font-weight:bold;color:#25ab22">Online</span>'
		} else if(bla=='BANN') {
			var cde = '<br /><span style="font-weight:bold;color:#df1818">Bann</span>'
		} else {
			var cde = '';
		}
		daten[3] = parseInt(daten[3],10);
		if(daten[3]<=benutzerdaten.limit_max && daten[3] >= benutzerdaten.limit_min) {
			var cde2 = '<br /><a href="'+Global.url.static+'fight/?to='+daten[2]+'"><img src="http://media.pennergame.de/img/att.png" style="border:none;height:18px;"/></a>';
		} else {
			var cde2 = '';
		}
			
		tabelle[f] = ['<strong>'+daten[0]+'.</strong>','<a href="'+Global.url.static+'profil/id:'+daten[1]+'/">'+daten[2]+'</a>'+cde+cde2,daten[3],daten[4],daten[5],daten[6],daten[7]?'<span style="font-weight:bold;color:'+color(daten[7])+';">'+format(daten[7])+'</span>':'-',daten[8]?'<img src="'+daten[8]+'" width="60px" height="68px" />':'-',daten[9]?'<img src="'+daten[9]+'" width="25px" heigth="25px" />':'-',daten[10],daten[11],daten[12]?'<a href="'+Global.url.static+'profil/bande:'+daten[12]+'/">'+daten[13]+'</a>':'-',daten[14]+'.',daten[15],daten[16],daten[17],daten[18]];
	}
	makeTable();
}
function rawTable() {
	var row = 0;
	for(i in spielerdaten) {
		var daten = spielerdaten[i];
		daten_tabelle[row] = [daten.platz,daten.id,daten.name,daten.punkte,daten.punkte_dif,daten.rp,daten.reg,daten.cash,daten.pet,daten.plunder,daten.stadtteil,daten.status,daten.gang_id,daten.gang_name,daten.gang_platz,daten.gang_punkte,daten.gang_mitglieder,daten.gang_schnitt,daten.beitritt,daten.spieler_status];
		row++;
	}
}
function makeTable() {
	document.body.innerHTML = '';
	navi();
	var div = document.createElement('div');
	div.id = 'usertablediv';
	var table = document.createElement('table');
	table.style.width = '100%';
	table.id = 'usertable';
	var tr = document.createElement('tr');
		for(var d = 0;d<head.length;d++) {
			if(head[d]!='') {
			var td = document.createElement('th');
			td.innerHTML = head[d];
			td.addEventListener('click',sortInhalt,true);
			tr.appendChild(td);
			}
		}
	table.appendChild(tr);
	for(var b = 0; b<tabelle.length;b++) {
		var tr = document.createElement('tr');
		tr.className = (b%2==0) ? 'zeileA' : 'zeileB';
		for(var c = 0;c<tabelle[b].length;c++) {
			var td = document.createElement('td');
			td.innerHTML = tabelle[b][c];
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	div.appendChild(table);
	document.body.appendChild(div);
}

function sortObj(column) {
	rawTable();
	switch(column) {
		case 0:
		case 3:
		case 4:
		case 5:
		case 7:
		case 10:
		case 11:
		case 14:
		case 15:
		case 16:
		case 17:
			var func = sort_number;
			break;
		case 6:
		case 18:
			var func = sort_reg;
			break;
		case 2:
		case 13:
			var func = sort_name;
			break;
		default:
			var func = sort_number;
			break;
		}
		daten_tabelle.sort(func);
		if(order=='DESC') {
			order = 'ASC';
			daten_tabelle.reverse()
		} else {
			order = 'DESC';
		}
		buildInhalt();
}
function sortInhalt() {
	var title = this.innerHTML;
	for(var e = 0;e<head.length;e++) {
		if(head[e]==title) {
			var col = e; 
			break;
		}
	}
	column = col;
	sortObj(e);
}
function sort_number(a,b) {
	return a[column]-b[column];
}
function sort_reg(a,b) {
	a = a[column];
	a = a.match(/(\d+)\.(\d+)\.(\d+)/);
	b = b[column];
	b = b.match(/(\d+)\.(\d+)\.(\d+)/);
	aa = a[3]+a[2]+a[1];
	bb = b[3]+b[2]+b[1];
	return parseInt(aa) -parseInt(bb);
}
function sort_name(a,b) {
	a=a[column];
	b=b[column];
	a = a.toLowerCase();
	b = b.toLowerCase();
	if(a<b) {
		return -1;
	} else if(a==b) {
		return 0;
	} else {
		return 1;
	}
}
function navi() {
	var div = document.createElement('div');
	div.style.width = '100%';
	div.className = 'dashtable';
	var div_1 = document.createElement('table');
	div_1.className = 'paginationdiv';
	div_1.style.marginTop = '0px';
	div_1.style.width = '100%';
	var tr = document.createElement('tr');
	for(var text in links) {
		var td = document.createElement('td');
		td.style.width = "9%";
		td.style.textAlign = "center";
		td.style.backgroundColor = "#272727";
		td.innerHTML ='<a style="display:block;" href="'+links[text]+'">'+text+'</a>';
		tr.appendChild(td);
	}
	div_1.appendChild(tr);
	div.appendChild(div_1);
	div.innerHTML += '<h1>PennergameHighscoreExtension Lite</h1>';
	//bla = '<a href="'+Global.url.static+'profil/id:'+benutzerdaten.id+'/"><img style="border:none;" width="124px" src="'+Global.url.ava+benutzerdaten.id+'.jpg" alt="'+benutzerdaten.id+'"/></a></td>';
	div.innerHTML += '<table class="userdata"><tr><td>ATT:</td><td>'+benutzerdaten.att+'</td><td class="line"/><td>Gewonnen:</td><td>'+benutzerdaten.won+'</td></tr><tr><td>DEF:</td><td>'+benutzerdaten.def+'</td><td class="line"/><td>Verloren:</td><td>'+benutzerdaten.lost+'</td></tr><tr><td>Kampfwert:</td><td>'+benutzerdaten.lf+'</td><td class="line"/><td>Ratio:</td><td>'+benutzerdaten.ratio+'%</td></tr></tbody></table>';
	var url = document.location.href;
	if(!url.match(/\/\d+\//)) {
		var teile = url.split('/');
		var letzterteil = teile.pop();
		var neueurl = teile.join('/');
		neueurl += '/1/';
		neueurl+=letzterteil;
	} else {
		var neueurl = url;
	}
	var page = parseInt(neueurl.match(/\/(\d+)\//)[1],10);
	var div_1 = document.createElement('table');
	div_1.className = 'paginationdiv';
	div_1.style.width = '100%';
	var tr = document.createElement('tr');
	for(var i= page-5;i<page+5;i++) {
		if(i>0) {
		var pagelink = neueurl.replace(/\/\d+\//,'/'+i+'/');
		var td = document.createElement('td');
		td.style.width = "9%";
		td.style.textAlign = "center";
		td.style.backgroundColor = "#272727";
		td.innerHTML ='<a style="display:block;" href="'+pagelink+'">'+i+'</a>';
		tr.appendChild(td);
		}
	}
	div_1.appendChild(tr);
	div.appendChild(div_1);
	document.body.appendChild(div);
}
}