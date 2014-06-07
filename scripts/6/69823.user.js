// ==UserScript==
// @name           PGHE Fr v0.31 GTH
// @namespace      LeonBuzz
// @description    PennerGame Highscore Extented Lite - PGHE v0.31g Fr GTH
// @include        http://*clodogame.fr/highscore/*
// @include        http://*pennergame.de/highscore/*
// @exclude		   *gang/*
// @exclude		   *.php*
// @exclude 	   *stuff*
// @require		   http://zahlii.independent-irc.com/script.class.js
// @require		   http://zahlii.independent-irc.com/updater.class.js
// @require		   http://zahlii.independent-irc.com/setting.class.js
// @version		v0.31g	18.06.2010: intégration d'un nouveau css dans le script en remplacement de la feuille de style (hors ligne)
// @version		v0.31f	05.05.2010: Correction d'un bug sur les animaux (Munich)
// @version		v0.31e	05.05.2010: Correction d'un bug sur les animaux (Marseille)
// @version		v0.31d	04.05.2010: Porté sur Marseille
// @version		v0.31c	13.04.2010: Remplacement des pages 'fight' (actuellement en erreur) par 'fight/overview'
// @version		v0.31b	25.03.2010: Porté sur PG Muenchen (interface en français)
// @version		v0.31a	24.02.2010: Adaptation du script original, modifications de l'interface (script original Anadorf: http://userscripts.org/scripts/show/66473 )
// ==/UserScript==
var tiere = init();
add_setting('PGHE-Lite',[['text','usort','Nach welcher Spalte soll sortiert werden:']]);
UpdateHandler('pghe_lite','0.3');
var regexp = new Object();
regexp['www.pennergame.de'] = new Object();
regexp['www.pennergame.de']['pet_own'] = /Basiswerten.*?von.*?<b>(.*?)<\/b>/;
regexp['www.pennergame.de']['pet'] = /http:\/\/(static|media).*?\/tiere\/(\d+\.jpg)/;
regexp['www.pennergame.de']['online'] = /Ist gerade Online/;
regexp['www.pennergame.de']['bann'] = /verbannt/
regexp['www.pennergame.de']['limit'] = /Dein Ziel muss (\d+) bis (\d+) Punkte haben/;
regexp['www.pennergame.de']['stat'] = /(Gewonnen:|Verloren:)<\/td><td>(\d+)<\/td>/g;;
regexp['pennergame.de'] = regexp['www.pennergame.de'];
regexp['berlin.pennergame.de'] = regexp['pennergame.de'];
regexp['muenchen.pennergame.de'] = regexp['pennergame.de'];
regexp['www.clodogame.fr'] = new Object();
regexp['www.clodogame.fr']['stat'] = /(Gagn.:|Perdu:).*?(\d+).*?<\/td/g;
regexp['www.clodogame.fr']['limit'] = /doit avoir de (\d+) à (\d+) points/;
regexp['www.clodogame.fr']['bann'] = /banni du jeu/
regexp['www.clodogame.fr']['online'] = /Est actuellement en ligne/;
regexp['www.clodogame.fr']['pet_own'] = /Basiswerten.*?von.*?<b>(.*?)<\/b>/;
regexp['www.clodogame.fr']['pet'] = /http:\/\/(media|static).*?\/tiere\/.*?(\d+\.jpg)/;
regexp['clodogame.fr'] = regexp['www.clodogame.fr'];
regexp['marseille.clodogame.fr'] = regexp['clodogame.fr'];
regexp['www.dossergame.co.uk'] = new Object();
regexp['www.dossergame.co.uk']['pet_own'] = /Basiswerten.*?von.*?<b>(.*?)<\/b>/;
regexp['www.dossergame.co.uk']['pet'] = /http:\/\/(media|static).*?\/tiere\/(\d+\.jpg)/;
regexp['www.dossergame.co.uk']['online'] = /is online/;
regexp['www.dossergame.co.uk']['bann'] = /banned/
regexp['www.dossergame.co.uk']['limit'] = /Dein Ziel muss (\d+) bis (\d+) Punkte haben/;
regexp['www.dossergame.co.uk']['stat'] = /(Won:|Lost:)<\/td><td>(\d+)<\/td>/g;

var usereg = document.location.hostname;
var regexp = regexp[usereg];

var head = ['Place','','Joueur','Points','Inscrit le','Diff&eacute;rence','Argent','Animal','Babiole','Quartier','&nbsp;&nbsp;&nbsp;&nbsp;Bande:&nbsp;&nbsp;&nbsp;<br>Status','','&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bande:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>Nom','Bande:<br>Rang','Bande:<br>Pts','Bande:<br>Membres','Bande:<br>Moy Pts','Bande:<br>Engagé le','Rank Pts'];

var DEFAULT_SORT = GM_getValue('setting_PGHE-Lite_usort','Platz');
var links = {
			'Apercu':'http://'+document.location.hostname+'/overview/',
			'News':'http://'+document.location.hostname+'/news/',
			'Mode Attaque':'http://'+document.location.hostname+'/fight/overview/',
			'Caisse':'http://'+document.location.hostname+'/gang/credit/',
			'Bande':'http://'+document.location.hostname+'/gang/',
			'Classement des bandes':'http://'+document.location.hostname+'/highscore/gang/',
			'Ils ont commencé après moi':'http://'+document.location.hostname+'/highscore/joindate/',
			'Fondateur':'http://userscripts.org/scripts/show/62739',
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
document.getElementsByTagName('head')[0].innerHTML = '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"><title>PGHE v0.31 Fr</title><!--<link rel="stylesheet" href="http://zahlii.independent-irc.com//style_pghe.css" />-->'
+'<style>body{font-family:verdana,tahoma,arial; background-color:#333; font-size:10.3px;} table,tr,td,th,h1,img{border:0;margin:0;padding:0;} #userdetails{border-top:2px solid #222; font-weight: bold;} a{color:#666;} #usertable th{background-color:#222; color:#666; padding:4px;} #usertable td{padding:4px 3px 4px 3px; border-bottom:1px solid #222;} .zeileA:hover, .zeileB:hover {background-color:#313167;} .zeileA {background-color:#2d2d2d;} .zeileB {background-color:#313131;}</style>';
document.body.innerHTML = '';
GM_xmlhttpRequest
({
method: 'GET',
url: 'http://'+document.location.hostname+'/fight/overview/',
//url: Global.url.static+'fight/',
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
	benutzerdaten.lf = parseInt(parseInt(att)+(0.83*parseInt(def)));
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
var city = felder[3].innerHTML;
		spielerdaten[id_aktiv] = {id: id_aktiv,	punkte_hs:punkte_aktiv, stadtteil: city};
		getDaten(id_aktiv);
	}
	navi();
}
});



function getDaten(id) {
	GM_xmlhttpRequest
	({
    method: 'GET',
    url: 'http://'+document.location.hostname+'/dev/api/user.'+id+'.xml',
    //url: Global.url.static+'dev/api/user.'+id+'.xml',
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
//		spielerdaten[id]['stadtteil'] = getTC('city',dom)[0];
		spielerdaten[id]['status'] = getTC('status',dom)[0];		
		spielerdaten[id]['gang_id'] = getTC('id',dom,0)[1];
		if(spielerdaten[id]['gang_id'] != 'None' && spielerdaten[id]['gang_id'] != '0') {
			spielerdaten[id]['beitritt'] = getTC('joined',dom)[0];
			GM_xmlhttpRequest
			({
			method: 'GET',
			url: 'http://'+document.location.hostname+'/dev/api/gang.'+spielerdaten[id]['gang_id']+'.xml',
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
    url: 'http://'+document.location.hostname+'/profil/id:'+id+'/',
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
				
				if(Boolean(document.location.hostname.match('marseille')))	{	if(pet=='73933.jpg')	{	var tmp = 'ma_FR/tiere/';	} else	{	var tmp = 'ma_FR/tiere/fr';	} }
				if(Boolean(document.location.hostname.match('clodogame')))	{	if(pet=='73933.jpg')	{	var tmp = 'fr_FR/tiere/';	} else	{	var tmp = 'fr_FR/tiere/fr';	} }
				if(Boolean(document.location.hostname.match('muenchen')))		{	var tmp = 'mu_DE/tiere/';	}
				
				spielerdaten[id]['pet'] = "http://static.pennergame.de/img/pv4/shop/"+tmp+pet;
			} else {
				spielerdaten[id]['pet'] = false;
				
			}
			
			var cont = cont_alt;
			try {
				var plunder = cont.match(/http:\/\/static.pennergame.de\/img\/pv4\/plunder\/.*?\.(png|gif|jpg)/)[0];
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
		daten[10] = ['-','<font><img src="http://static.pennergame.de/img/pv4/shop/fr_FR/bande/member.gif">&nbsp;Membre</font>','<font color="orange"><img src="http://static.pennergame.de/img/pv4/shop/fr_FR/bande/coadmin.gif">&nbsp;CoAdmin</font>','<font color="royalblue"><img src="http://static.pennergame.de/img/pv4/shop/fr_FR/bande/admin.gif">&nbsp;Admin</font>'][parseInt(daten[10],10)];
		bla = daten[19];
		if(bla=='ONLINE') { 
			var cde = '<br /><font style="color:#25ab22; font-variant:small-caps; font-size:10px;"><img align="absmiddle" width="10" height="10" src="http://static.pennergame.de/img/pv4/icons/on.png"/>&nbsp;Online</font>'
		} else if(bla=='BANN') {
			var cde = '<br /><font style="font-weight:bold;color:#df1818">Banni</font>'
		} else {
			var cde = '';
		}
		daten[3] = parseInt(daten[3],10);
		if(daten[3]<=benutzerdaten.limit_max && daten[3] >= benutzerdaten.limit_min) {
			var cde2 = '<a href="http://'+document.location.hostname+'/fight/overview/?to='+daten[2]+'"><img align="absmiddle" src="http://media.pennergame.de/img/att.png" style="background-color:#243B0B;border:none;height:18px;"/></a>';
		} else {
			var cde2 = '&nbsp;';
		}
			
		tabelle[f] = ['<strong>'+daten[0]+'.</strong>',cde2+'<b><u><a href="http://'+document.location.hostname+'/profil/id:'+daten[1]+'/">'+daten[2]+'</a></u></b>'+cde,'<b><center>'+daten[3]+'</center></b>','<center>'+daten[4]+'</center>','<center>'+daten[5]+'</center>',daten[6]?'<span align="center" style="font-weight:bold;color:'+color(daten[6])+';">'+format(daten[6])+'</span>':'<center>-</center>',daten[7]?'<center><img src="'+daten[7]+'" width="60px" height="68px" /></center>':'<center>-</center>',daten[8]?'<center><img src="'+daten[8]+'" width="25px" heigth="25px" /></center>':'<center>-</center>','<center>'+daten[9]+'</center>',daten[10],daten[11]?'<a style="font-variant:small-caps;" href="http://'+document.location.hostname+'/profil/bande:'+daten[11]+'/"><u>'+daten[12]+'</u></a>':'<center>-</center>','<center>'+daten[13]+'.</center>','<center>'+daten[14]+'</center>','<center>'+daten[15]+'</center>','<center>'+daten[16]+'</center>','<center>'+daten[17]+'</center>','<center>'+daten[18]+'</center>'];
	}
	makeTable();
}
function rawTable() {
	var row = 0;
	for(i in spielerdaten) {
		var daten = spielerdaten[i];
		daten_tabelle[row] = [daten.platz,daten.id,daten.name,daten.punkte,daten.reg,daten.punkte_dif,daten.cash,daten.pet,daten.plunder,daten.stadtteil,daten.status,daten.gang_id,daten.gang_name,daten.gang_platz,daten.gang_punkte,daten.gang_mitglieder,daten.gang_schnitt,daten.beitritt,daten.rp,daten.spieler_status];
												//			0						1					2						3						4						5								6					7						8						9								10					11							12							13								14							15										16							17							18				19
		row++;
	}
}
function makeTable() {
	document.body.innerHTML = '';
	navi();
	var div = document.createElement('div');
	div.id = 'usertablediv';
	var table = document.createElement('table');
	table.setAttribute('cellspacing','0');
	table.setAttribute('cellpadding','0');
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
			td.align = 'left';
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
		case 0:		//Place
		case 3:		//pts
		case 5:		//diff
		case 6:		//argent
		case 9:		//quartier
		case 10:	//bande: status
		case 13:	//bande: rang
		case 14:	//bande: pts
		case 15:	//bande: nb membres
		case 16:	//bande: moy pts
		case 18:		//rank pts
			var func = sort_number;
			break;
		case 4:		//inscrit le
		case 17:	//bande: engagé le
			var func = sort_reg;
			break;
		case 2:		//joueur
		case 12:	//bande: nom
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
	var divcont = '<table width="100%" id="userdetails" cellpadding="0" cellspacing="0" style="padding: 0 5px 0 5px;"><tr>';
	divcont += '<td><h1><img src="http://static.pennergame.de/img/pv4/plunder/kleeblatt2.png">&nbsp;PGHE v0.31 Fr <font color="royalblue">&loz;</font> <font style="font-size:11px;"><i>mod</i> <img align="absmiddle" src="http://inodes.pennergame.de/fr_FR/gangicon/6993.jpg" width="40" height="20" alt="GTH"/></font></h1></td>';
	divcont += '<td align="left"><a href="#" title="ta valeur d\'ATT" style="cursor:pointer;text-decoration:none;"><img src="http://static.pennergame.de/img/pv4/icons/att.png" alt="ta valeur d\'ATT" align="absmiddle">'+benutzerdaten.att+'</a></td>';
	divcont += '<td align="left"><a href="#" title="ta valeur de DEF" style="cursor:pointer;text-decoration:none;"><img src="http://static.pennergame.de/img/pv4/icons/def.png" alt="ta valeur de DEF" align="absmiddle">'+benutzerdaten.def+'</a></td>';
	divcont += '<td align="left"><a href="#" title="ta valeur de combat" style="cursor:pointer;text-decoration:none;"><img src="http://static.pennergame.de/img/pv4/icons/att.gif" alt="ta valeur de combat" align="absmiddle">'+benutzerdaten.lf+'</a></td><td class="line"/><td class="line"/>';
	divcont += '<td align="right">Combats gagn&eacute;s:</td><td align="left">'+benutzerdaten.won+'</td>';
	divcont += '<td align="right">Combats perdus:</td><td align="left">'+benutzerdaten.lost+'</td>';
	divcont += '<td align="right">Ratio victoires:</td><td align="left">'+benutzerdaten.ratio+'%</td>';
	divcont += '</tr></tbody></table>';
	div.innerHTML += divcont;
	div.appendChild(div_1);
	
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