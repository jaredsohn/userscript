// ==UserScript==
// @name           Combat Report Auto-Converter Argentino
// @autor          Reaper
// @icon           http://img196.imageshack.us/img196/8994/50187963.jpg
// @description    Script para Ikariam. Editado del Script de WTF para los server argentinos.
// @homepage       http://userscripts.org/scripts/show/106532
// @include        http://s*.ikariam.*/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @version        v0.5.2
// @exclude        http://board.ikariam.*/*
// @exclude        http://support*.ikariam.*/*
// ==/UserScript==

var LANG = getLang();

language_ships = {
	ar: { ships: "Barcos", cargo: "Barcos mercantes", ram: "Barco-espolón", ballista: "Barco-ballesta", flame: "Barco-lanza llamas", catapult: "Barco-catapulta", paddle: "Barco-espolón a vapor", mortar: "Barco-mortero", diving: "Submarino", rocket: "Barco lanzamisiles", speed: "Lancha de palas", balloon : "Portaglobos", tender: "Barco de mantenimiento" },
	en: { ships: "Ships", cargo: "Cargo Ship", ram: "Ram-Ship", ballista: "Ballista ship", flame: "Flame-thrower", catapult: "Catapult Ship", paddle: "Steam Ram", mortar: "Mortar Ship", diving: "Diving boat", rocket: "Rocket Ship", speed: "Paddle Speedboat", balloon: "Balloon Carrier", tender: "Tender" }
};

language_units = {
	ar: { units: "Unidades", wall: "Muralla", slinger: "Hondero", swordsman: "Espadachín", phalanx: "Hoplita", archer: "Arquero", marksman: "Fusilero", gyrocopter: "Girocóptero", "steam giant": "Gigante a vapor", bombardier: "Bombardero", ram: "Ariete", catapult: "Catapulta", mortar: "Mortero", doctor: "Médico", cook: "Cocinero", spearmen: "Lancero", barbarian: "Bárbaro" },
	en: { units: "Units", wall: "Wall", slinger: "Slinger", swordsman: "Swordsman", phalanx: "Hoplite", archer: "Archer", marksman: "Sulphur Carabineer", gyrocopter: "Gyrocopter", "steam giant": "Steam Giant", bombardier: "Balloon-Bombardier", ram: "Battering ram", catapult: "Catapult", mortar: "Mortar", doctor: "Doctor", cook: "Cook", spearmen: "Spearmen", barbarian: "Barbarian-Axe Swinger" }
};


var L_SHIPS = language_ships[LANG];
var L_UNITS = language_units[LANG];
var crac_panel=document.createElement("div");
crac_panel.id = 'crac_panel';
crac_panel.style.visibility = 'visible';
crac_panel.style.zIndex = '1001';
crac_panel.style.left = "350px";
crac_panel.style.top = "0px";
crac_panel.style.height = "100px";
crac_panel.setAttribute("class", "yui-panel-container shadow templateView");
var battle_is_full3 = 0;
var total_lost = 0;
var limit = 1000; //minimo para postear batallas
window.setInterval(checkIfReport, 1000);

var url_now = location.href;
var url_split1 = url_now.split('http://');
var url_split2 = url_split1[1].split('/');
var url_split3 = url_now.split('http://s');
var url_split4 = url_split3[1].split('.');
var world = url_split4[0];
var server = url_split2[0];

var is_maritim = 0;

if(GM_getValue('forumclass')==null) { GM_setValue('forumclass','Burning'); }
if(GM_getValue('background')==null) { GM_setValue('background','Light'); }
if(GM_getValue('hour')==null) { GM_setValue('hour',2); }
if(GM_getValue('CRAC_city')==null) { GM_setValue('CRAC_city',1); }
if(GM_getValue('CRAC_troops')==null) { GM_setValue('CRAC_troops',1); }
if(GM_getValue('CRAC_ratio')==null) { GM_setValue('CRAC_ratio',2); }
if(GM_getValue('CRAC_percent')==null) { GM_setValue('CRAC_percent',2); }
if(GM_getValue('CRAC_loot')==null) { GM_setValue('CRAC_loot',2); }
if(GM_getValue('CRAC_off_points')==null) { GM_setValue('CRAC_off_points',1); }
if(GM_getValue('CRAC_troops_percent')==null) { GM_setValue('CRAC_troops_percent',1); }
if(GM_getValue('CRAC_wordunits')==null) { GM_setValue('CRAC_wordunits',2); }
if(GM_getValue('CRAC_showwall')==null) { GM_setValue('CRAC_showwall',2); }
if(GM_getValue('CRAC_showrounds')==null) { GM_setValue('CRAC_showrounds',2); }
if(GM_getValue('CRAC_bfsize')==null) { GM_setValue('CRAC_bfsize',1); }
if(GM_getValue('CRAC_ally')==null) { GM_setValue('CRAC_ally',1); }

var CRAC_REPORT = {
	info:   { type:null, place:null, time:null, attackers:null, defenders:null, wall:null },
	battle: { attacking_totals: [0, 0, 0], defending_totals: [0, 0, 0], wall: '', walltext: '', attackers: [], defenders: [], victors:null, losers:null },
	};

const VERSION = "v0.5.2";

var ffnew = 0;
if(/Mozilla/.test(navigator.userAgent)) {
	for(i=navigator.userAgent.length-1;i>0;i--) {
		if(navigator.userAgent[i]=='/') {
			break;
		}	
	}
	var moz_version = '';
	for(j=i+1;j<i+4;j++) {
		moz_version = moz_version + navigator.userAgent[j];
	}	
	if(parseFloat(moz_version)>=3.5) { 
		ffnew = 1;
	}
}

if(isNaN(parseInt(GM_getValue('CRAC_lastVcheck')))) {
	GM_setValue('CRAC_lastVcheck','0');
}
var today = new Date();
today = today.getTime();
var today2 = parseInt(today);
var last_check = parseInt(GM_getValue('CRAC_lastVcheck'))+86400000;

if(today2>last_check) {
	check_version('http://bit.ly/ikacracv'); 
}

const U_MAP = {
	name: { slinger: "army s301", swordsman: "army s302", phalanx: "army s303", archer: "army s313", marksman: "army s304", gyrocopter: "army s312", "steam giant": "army s308", bombardier: "army s309", ram: "army s307", catapult: "army s306", mortar: "army s305", doctor: "army s311", cook: "army s310" },
	clas: { "army s301": "slinger", "army s302": "swordsman", "army s303": "phalanx", "army s313": "archer", "army s304": "marksman", "army s312": "gyrocopter", "army s308": "steam giant", "army s309": "bombardier", "army s307": "ram", "army s306": "catapult", "army s305": "mortar", "army s311": "doctor", "army s310": "cook", "army s315": "spearmen", "army s316": "barbarian" }
};

const S_MAP = {
	name: { cargo: "fleet s201", ram: "fleet s210", ballista: "fleet s213", flame: "fleet s211", catapult: "fleet s214", paddle: "fleet s216", mortar: "fleet s215", diving: "fleet s212", rocket: "fleet s217", balloon: "fleet s219", speed: "fleet s218", tender: "fleet s220"},
	clas: { "fleet s201": "cargo", "fleet s210": "ram", "fleet s213": "ballista", "fleet s211": "flame", "fleet s214": "catapult", "fleet s216": "paddle", "fleet s215": "mortar", "fleet s212": "diving", "fleet s217":"rocket", "fleet s218":"speed", "fleet s219":"balloon", "fleet s220":"tender" }
};

function checkIfReport() {
	var PAGE_TYPE = document.body.innerHTML.indexOf("id=\"militaryAdvisorReportView_c") == -1 ? 'other' : 'report';
		if (PAGE_TYPE == 'report') {
			if (document.getElementById("extraDiv4") == null) {
				var extraDiv4=document.createElement("div");
				extraDiv4.id = 'extraDiv4';
				extraDiv4.style.display = 'none';
				var extraDiv5=document.createElement("div");
				extraDiv5.id = 'extraDiv5';
				extraDiv5.style.display = 'none';
				var extraDiv6=document.createElement("div");
				extraDiv6.id = 'extraDiv6';
				extraDiv6.style.display = 'none';
				document.getElementById("container").appendChild(extraDiv4);
				document.getElementById("container").appendChild(extraDiv5);
				document.getElementById("container").appendChild(extraDiv6);
			}
			crac_button();
	} 
}

function getLang() {
	var language = unsafeWindow.LocalizationStrings.language;
	if(language==null) { return 'es' } else { return language; }
}

function getServerWorld() {
	const hostMatch		= /(s\d+)(\.([a-z]+))?\.ikariam(\.[a-z]+)?\.([a-z]+)/i.exec( top.location.host );
	return (hostMatch?hostMatch[1]:false) || 's?';
}

function getServerDomain() {
	const hostMatch		= /(s\d+)(\.([a-z]+))?\.ikariam(\.[a-z]+)?\.([a-z]+)/i.exec( top.location.host );
	return (hostMatch?(hostMatch[3] || hostMatch[5]):false) || 'es';
}

function openInNewTab(URL) {
	var temporalForm = document.createElement('form');
	with (temporalForm) {
		setAttribute('method', 'GET');
		setAttribute('action', URL);
		setAttribute('target', '_blank');
	}

	var paramsString = URL.substring(URL.indexOf('?') + 1, URL.length);
	var paramsArray = paramsString.split('&');

	for (var i = 0; i < paramsArray.length; ++i) {
		var elementIndex = paramsArray[i].indexOf('=');
		var elementName = paramsArray[i].substring(0, elementIndex);
		var elementValue = paramsArray[i].substring(elementIndex + 1, paramsArray[i].length);
		var temporalElement = document.createElement('input');
		with(temporalElement) {
			setAttribute('type', 'hidden');
			setAttribute('name', elementName);
			setAttribute('value', elementValue);
		}

		temporalForm.appendChild(temporalElement);
	}
	
	document.body.appendChild(temporalForm);
	temporalForm.submit();
	document.body.removeChild(temporalForm);
}

function updateVersionCheck() {
	var today = new Date();
	var today2 = today.getTime();
	var today3 = today2 + "";
	GM_setValue('CRAC_lastVcheck',today3);
}

function check_version(url){
}

function ParseReport() { 
	var total_lost = 0;
	var attackers_string = '';
	var defenders_string = '';
	
	if (GM_getValue('CRAC_showrounds')==2 || GM_getValue('CRAC_showwall')==2 || GM_getValue('CRAC_bfsize')==2) {
		var aUrl = $("#troopsReport p.link a.button").attr("href").split('?');
		GM_xmlhttpRequest({
		method: "POST",
  		url: "http://"+server+"/index.php",
  		data: aUrl[1] + "&ajax=1",
		headers:{
			'Content-type':'application/x-www-form-urlencoded',
			'Content-length':1,
			"Connection":"close"
			},
		onload: function(xhr) { 
		var parsedResponseArray = JSON.parse(xhr.responseText);
		var parsedResponse = parsedResponseArray[1].toString();

			 if (/ - Batalla /.test(parsedResponse)&&GM_getValue('CRAC_showrounds')==2){ 	
				var no_rounds = parsedResponse.split(' - Batalla ');
				var no_rounds2 = no_rounds[1].split('</li>');
				var no_rounds3 = no_rounds2[0].split(' / ');
				var no_rounds4 = no_rounds3[1];
				battle_duration(no_rounds4);

			}
			if (/Nivel de muro: /.test(parsedResponse)&&GM_getValue('CRAC_showwall')==2){ 	
				var wall_lvl1 = parsedResponse.split('Nivel de muro: ');
				var wall_lvl2 = wall_lvl1[1].split('</p>');
				var wall_lvl = wall_lvl2[0];
				show_wall(wall_lvl);
			}
			if (/id="fieldAttacker"/.test(parsedResponse)&&GM_getValue('CRAC_bfsize')==2){ 
				var bf_size1 = parsedResponse.split('id="fieldAttacker"');
				var bf_size2 = bf_size1[1].split('id="resDefender"');
				var bf_size3 = bf_size2[0].split('class="slot');
				var bf_size4 = bf_size3.length;
				if(bf_size4>=30&&bf_size4<50) {
					var bf_size=5;
				}
				if(bf_size4>=28&&bf_size4<30) { 
					var bf_size=4; 
				}
				if(bf_size4>=22&&bf_size4<28) {
					 var bf_size=3; 
				}
				if(bf_size4>=15&&bf_size4<22) {
					 var bf_size=2; 
				}
				if(bf_size4>=7&&bf_size4<15) { 
					var bf_size=1; 
				}
				battle_size(bf_size);
			}
			document.getElementById('CRAC_toselect').innerHTML = document.getElementById('extraDiv4').innerHTML.replace(/<br>/g,'\n') + document.getElementById('extraDiv5').innerHTML.replace(/<br>/g,'\n') + document.getElementById('extraDiv6').innerHTML.replace(/<br>/g,'\n');
				
		}
		});
	}


	CRAC_REPORT.info.type  = $("#troopsReport table.overview td.headline div").attr("class").split(' ')[0] == "army" ? "army" : "fleet";
	CRAC_REPORT.info.place = $("div#troopsReport h3.header")[0].childNodes[0].nodeValue;
	CRAC_REPORT.info.time  = $("div#troopsReport h3.header span.date").text().replace(/\(/,'').replace(/\)/, ''); 

	CRAC_REPORT.info.attackers = $("div#troopsReport div.content div:eq(0) span").text(); 
	CRAC_REPORT.info.defenders = $("div#troopsReport div.content div:eq(1) span").text(); 
	CRAC_REPORT.battle.attackers = new Array();
	CRAC_REPORT.battle.defenders = new Array();
	var unitSide = null;
	var unitKeys = new Array();
	$("#troopsReport table.overview tr").each(function() {
		
		if ($(this).find("td").attr("class").split(' ')[1] == 'headline') {
			unitSide = "attackers";
			unitKeys = []; 
			$(this).find("div").each(function() { unitKeys.push($(this).attr("class"));
 			});
		} else	if ($(this).find("td").attr("class").split(' ')[1] == 'nobg') { 
			unitSide = "defenders";
		} else	if ($(this).find("td.numbers").size() == unitKeys.length) {
			unitCount = 0; 
			$(this).find("td.numbers").each(function() {
				var unitClass = unitKeys[unitCount++];
				var unitName = CRAC_REPORT.info.type == "army" ? U_MAP.clas[unitClass] : S_MAP.clas[unitClass];
				if (unitName != null) { 
					AddUnit(unitSide == "attackers" ? CRAC_REPORT.battle.attackers : CRAC_REPORT.battle.defenders, unitName, $(this).text());
				}
			});
		}
	});


	CRAC_REPORT.battle.victors = $("div#troopsReport div.result div.winners").text(); 
	CRAC_REPORT.battle.losers = $("div#troopsReport div.result div.losers").text(); 
	CRAC_REPORT.battle.loot = $("div#troopsReport div.result").text(); 
}

function postToIkariam() { 
	var adress = new Array('0','38','44','86','136','161','180','189','197','207','237');
	var adress2 = adress[world];
	window.open('http://board.ar.ikariam.com/index.php?form=ThreadAdd&boardID='+ adress2);
}

 function battle_duration(rounds) {
	if(rounds==1) {
		document.getElementById('extraDiv4').innerHTML = document.getElementById('extraDiv4').innerHTML + ' tras una única ronda de combate';
	} else {
		document.getElementById('extraDiv4').innerHTML = document.getElementById('extraDiv4').innerHTML + ' tras ' + rounds + ' rondas de duro combate';
	}
}

function battle_size(bf_size) {
	if(bf_size==1) {
		document.getElementById('extraDiv4').innerHTML = document.getElementById('extraDiv4').innerHTML + ' en un pequeño campo de batalla';
	} else if(bf_size==2) {
		document.getElementById('extraDiv4').innerHTML = document.getElementById('extraDiv4').innerHTML + ' en un campo de batalla mediano';
	} else if (bf_size==3) {
		document.getElementById('extraDiv4').innerHTML = document.getElementById('extraDiv4').innerHTML + ' en un gran campo de batalla';	
	} else if (bf_size==4) {
		document.getElementById('extraDiv4').innerHTML = document.getElementById('extraDiv4').innerHTML + ' en un basto campo de batalla';	
	} else if (bf_size==5) {
		document.getElementById('extraDiv4').innerHTML = document.getElementById('extraDiv4').innerHTML + ' en campo abierto';
	} 
}

function show_wall(level) {
	if(GM_getValue('CRAC_wordunits')==2) { 
		var string = '[img]http://img213.imageshack.us/img213/9217/wallcrac.png[/img] [b]Muralla - [/b]Nivel: [b][size=12]' + level +'[/size][/b]';
		
	} else {
		var string = '[img]http://img213.imageshack.us/img213/9217/wallcrac.png[/img] Muralla: [b][size=12]' + level +'[/size][/b]';
	}
	string = Adaptformat(string);
	document.getElementById('extraDiv5').innerHTML = document.getElementById('extraDiv5').innerHTML + string;
}

function BuildStandardReport() {

	intro = '[i]';
	report = '';
	var time = CRAC_REPORT.info.time.split(" ");
	var place2 = CRAC_REPORT.info.place.split("Batalla ");
	
	if (/en /.test(place2[1])){
		place2[1] = place2[1].replace(/en /g,"");
	}
	if (/marítima frente a /.test(place2[1])){
		place2[1] = place2[1].replace(/marítima frente a /g,"");
	}
	var place = '';
	if(ffnew==1) {
		place = place2[1].trim();
	} else {
		place = place2[1];
		place = place.replace(/^\s*|\s*$/g,"");
	}
	
	intro += 'Batalla terrestre ';
	intro += 'finalizada el ' +  time[0];
	if(GM_getValue('hour')==2)  { 
		intro +=  ' a las ' +  time[1];
	}
	if(GM_getValue('CRAC_city')==2) {
		intro += ' en la ciudad de ' + place;
	}
	report +=  '[/i]<br/>' + '<br/>';
	report +='[size=14][b]Resumen de tropas[/b][/size]' + '<br/>' + '<br/>';

	var full_whodefend5 = document.getElementById('militaryAdvisorReportView').innerHTML.split('<label>Defensor:</label>');
	var full_whodefend4 = full_whodefend5[1].split('</span>');
	var full_whodefend3 = full_whodefend4[0].replace(/<span>/,'');
	var full_whodefend2 = full_whodefend3.split(' de <b>');
	var defenders = new Array();
	for(i=0;i<full_whodefend2.length-1;i++) {
		full_whodefend1 = full_whodefend2[i].split('">');
		if(/\<\/b\>, /.test(full_whodefend1[full_whodefend1.length-1])) {
				var full_whodefend6 = full_whodefend1[full_whodefend1.length-1].split('</b>, ');
				defenders[i] = full_whodefend6[full_whodefend6.length-1];
		} else {
			if(ffnew==1) {
				defenders[i] = full_whodefend1[full_whodefend1.length-1].replace('</a>','').trim();
			} else {
				defenders[i] = full_whodefend1[full_whodefend1.length-1].replace('</a>','').replace(/^\s*|\s*$/g,"");
			}
		} 
	}
		
	var full_whoattack5 = document.getElementById('militaryAdvisorReportView').innerHTML.split('<label>Atacante:</label>');
	var full_whoattack4 = full_whoattack5[1].split('</span>');
	var full_whoattack3 = full_whoattack4[0].replace(/<span>/,'');
	var full_whoattack2 = full_whoattack3.split(' de <b>');
	var attackers = new Array();
	for(i=0;i<full_whoattack2.length-1;i++) {
		full_whoattack1 = full_whoattack2[i].split('">');
		if(/\<\/b\>, /.test(full_whoattack1[full_whoattack1.length-1])) {
			var full_whoattack6 = full_whoattack1[full_whoattack1.length-1].split('</b>, ');
			attackers[i] = full_whoattack6[full_whoattack6.length-1];
		} else {
			if(ffnew==1) {
				attackers[i] = full_whoattack1[full_whoattack1.length-1].replace('</a>','').trim();
			} else {
				attackers[i] = full_whoattack1[full_whoattack1.length-1].replace('</a>','').replace(/^\s*|\s*$/g,"");
			}
		} 
	}
	
	attackers_string = '';
	defenders_string = '';
	atackers_ally_counter = 0;
	for(i=0;i<attackers.length;i++) {
		if(attackers[i]!= null) {
			attackers_string += attackers[i];
			if(atackers_ally_counter==0) {
				atackers_ally_member = attackers[i];
				atackers_ally_counter = 1;
			}
			if(i<attackers.length-2) {
				attackers_string += ', ';
			} 
			if(i==attackers.length-2) {
	 			attackers_string += ' y ';
			}
		}
	}

	if(GM_getValue('CRAC_ally')==2) { 

		var search_player_url = 'http://' + server + '/index.php';
		GM_xmlhttpRequest({
 			method: "POST",
  			url: search_player_url,
 			data: "view=highscore&searchUser=" + atackers_ally_member + "&ajax=1",
  			headers:{
			'Content-type':'application/x-www-form-urlencoded',
			'Content-length':1,
			"Connection":"close"
			},
 			onload: function(response) {
				var parsedResponseArray = JSON.parse(response.responseText);
				var parsedResponse = parsedResponseArray[1].toString();
				if (/class="allyLink"/.test(parsedResponse)){ 
					atackers_ally_alliance4 = parsedResponse.split('class="allyLink"');
					atackers_ally_alliance3 = atackers_ally_alliance4[1].split('</a>');
					atackers_ally_alliance2 = atackers_ally_alliance3[0].split('">');
					atackers_ally_alliance = atackers_ally_alliance2[1];
					if(atackers_ally_alliance!='') {
						document.getElementById('CRAC_toselectsubject').innerHTML = document.getElementById('CRAC_toselectsubject').innerHTML.replace(' vs ',' [' + atackers_ally_alliance + '] vs ');
					}
	  			}
 			 }
		});
	} 
	
	defenders_ally_counter = 0;
	for(i=0;i<defenders.length;i++) {
		if(defenders[i]!= null) {
			defenders_string += defenders[i];
			if(defenders_ally_counter==0) {
				defenders_ally_member = defenders[i];
				defenders_ally_counter = 1;
			}
			if(i<defenders.length-2) {
				 defenders_string += ', ';
			} 
			if(i==defenders.length-2) {
				defenders_string += ' y ';
			}
		}
	}

	if(GM_getValue('CRAC_ally')==2) { 

		var search_player_url = 'http://' + server + '/index.php';
		GM_xmlhttpRequest({
 			method: "POST",
  			url: search_player_url,
 			data: "view=highscore&searchUser=" + defenders_ally_member + "&ajax=1",
  			headers:{
			'Content-type':'application/x-www-form-urlencoded',
			'Content-length':1,
			"Connection":"close"
			},
 			onload: function(response) {
				var parsedResponseArray = JSON.parse(response.responseText);
				var parsedResponse = parsedResponseArray[1].toString();
				if (/class="allyLink"/.test(parsedResponse)){ 
					defenders_ally_alliance4 = parsedResponse.split('class="allyLink"');
					defenders_ally_alliance3 = defenders_ally_alliance4[1].split('</a>');
					defenders_ally_alliance2 = defenders_ally_alliance3[0].split('">');
					defenders_ally_alliance = defenders_ally_alliance2[1];
					if(defenders_ally_alliance!='') {
						document.getElementById('CRAC_toselectsubject').innerHTML = document.getElementById('CRAC_toselectsubject').innerHTML.replace(' (',' [' + defenders_ally_alliance + '] ('); 
					}
	  			}
 			 }
		});
	} 
	var winner2 = CRAC_REPORT.battle.victors.replace(/Ganador: /g,'');
	var winner1 = winner2.replace(/Ganadores: /g,'');
	var winner3 = winner1.split(',');
	var winner = winner3[0];
	var loser2 = CRAC_REPORT.battle.losers.replace(/Perdedor: /g,'');
	var loser1 = loser2.replace(/Perdedores: /g,'');
	var loser3 = loser1.split('     ');
	var loser4 = loser3[0].split(',');
	var loser = loser4[0];
	if(ffnew==1) {
		winner = winner.trim();
		loser = loser.trim();		
	} else {
		winner = winner.replace(/^\s*|\s*$/g,"");
		loser = loser.trim();
	}

	if(/Las siguientes materias primas han sido robadas/.test(document.getElementById('militaryAdvisorReportView').innerHTML)) {
		var loot = document.getElementById('militaryAdvisorReportView').innerHTML.split('Las siguientes materias primas han sido robadas:');
		var loot2 = loot[1].split('</div>');
		var loot3 = loot2[0];
		var loot_wood = loot3.split('Madera: </span>');
		var loot_wood3 = 0;
		for(i=1;i<=(loot_wood.length-1);i++) {
			var loot_wood2 = loot_wood[i].split('<');
			var loot_wood3 = parseInt(loot_wood3) + parseInt(loot_wood2[0]); 
		}
		var loot_sulphur = loot3.split('Azufre: </span>');
		var loot_sulphur3 = 0;
		for(i=1;i<=(loot_sulphur.length-1);i++) {
			var loot_sulphur2 = loot_sulphur[i].split('<');
			var loot_sulphur3 = parseInt(loot_sulphur3) + parseInt(loot_sulphur2[0]); 
		}
		var loot_crystal = loot3.split('Cristal: </span>');
		var loot_crystal3 = 0;
		for(i=1;i<=(loot_crystal.length-1);i++) {
			var loot_crystal2 = loot_crystal[i].split('<');
			var loot_crystal3 = parseInt(loot_crystal3) + parseInt(loot_crystal2[0]); 
		}
		var loot_wine = loot3.split('Vino: </span>');
		var loot_wine3 = 0;
		for(i=1;i<=(loot_wine.length-1);i++) {
			var loot_wine2 = loot_wine[i].split('<');
			var loot_wine3 = parseInt(loot_wine3) + parseInt(loot_wine2[0]); 
		}
		var loot_marble = loot3.split('rmol: </span>');
		var loot_marble3 = 0;
		for(i=1;i<=(loot_marble.length-1);i++) {
			var loot_marble2 = loot_marble[i].split('<');
			var loot_marble3 = parseInt(loot_marble3) + parseInt(loot_marble2[0]); 
		}
		var is_loot = 1;
	} else { 
		var is_loot = 0;
	}

	var winner_attacker = 2;
	var loser_attacker = 2;
	for(i=0;i<attackers.length;i++) {
		if((attackers[i]==winner)&&attackers[i]!=null) {
			winner_attacker = 1;
		}
	}
	for(i=0;i<defenders.length;i++) {
		if((defenders[i]==winner)&&defenders[i]!=null) {
			winner_attacker = 0;
		}
	}
	if(winner_attacker == 2) {
		for(i=0;i<attackers.length;i++) {
			if((attackers[i]==loser)&&attackers[i]!=null) {
				loser_attacker = 1;
			}
		}
		for(i=0;i<defenders.length;i++) {
			if((defenders[i]==loser)&&defenders[i]!=null) {
				loser_attacker = 0;
			}
		}
	}
	report +=  '[color=#660000][b][i]ATACANTE'
	if(attackers.length>1) { report += 'S'; }
	report += '[/i][/b][/color]';
	report += '<br/>';
	report += '[b][size=14][color=red]';
	report += attackers_string;
	report += '[/color][/size][/b]';
	report += '<br/>';
	report += '<br/>';

	var allUnitCosts = CRAC_REPORT.info.type == "army"
		? [ 20, 60, 70, 55,  200, 125, 310, 290, 220, 560, 1550, 500, 200, 30, 0]
		: [ 250, 340, 310, 320, 1200, 1120, 1010, 1400, 320, 1400, 800];
	var allUnitWood = CRAC_REPORT.info.type == "army"
		? [ 20, 30, 40, 30,  50, 25, 130, 40, 220, 260, 300, 50, 50, 30, 0]
		: [ 250, 180, 80, 180, 400, 220, 160, 200, 40, 700, 300 ];
	var allUnitSulphur = CRAC_REPORT.info.type == "army"
		? [ 0, 30, 30, 25,  150, 100, 180, 250, 0, 300, 1250, 0, 0, 0, 0]
		: [ 0, 160, 230, 140, 800, 900, 100, 1200, 280, 700, 250 ];
	var allUnitCrystal = CRAC_REPORT.info.type == "army"
		? [ 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 450, 0, 0, 0]
		: [ 0, 0, 0, 0, 0, 0, 750, 0, 0, 0, 250 ];
	var allUnitWine = CRAC_REPORT.info.type == "army"
		? [ 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 150, 0, 0]
		: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
	var allUnitCitizen = CRAC_REPORT.info.type == "army"
		? [ 1, 1, 1, 1,  1, 3, 2, 5, 5, 5, 5, 1, 1, 1, 0]
		: [ 3, 6, 4, 5, 2, 5, 3, 2, 1, 8, 7];
		
	var allUnits = CRAC_REPORT.info.type == "army"
		? ["slinger", "swordsman", "phalanx", "archer", "marksman", "gyrocopter", "steam giant", "bombardier", "ram","catapult", "mortar", "doctor", "cook", "spearmen", "barbarian"]
		: ["ram", "ballista", "flame", "catapult", "paddle", "mortar", "diving", "rocket", "speed", "balloon", "tender"];
	var UNIT = CRAC_REPORT.info.type == "army" ? L_UNITS : L_SHIPS;
	var troop_position = new Array ("Hondero", "Espadachín", "Hoplita", "Arquero", "Fusilero", "Girocóptero", "Gigante a vapor", "Bombardero", "Ariete", "Catapulta", "Mortero", "Médico", "Cocinero", "Lancero", "Barco-espolón", "Barco-ballesta", "Barco-lanza llamas", "Barco-catapulta", "Barco-espolón a vapor", "Barco-mortero", "Submarino", "Barco lanzamisiles", "Lancha de palas", "Portaglobos", "Barco de mantenimiento");
	var name_english = new Array("slinger","swordsman","phalanx","archer","marksman","gyrocopter","steamgiant","bombardier","ram","catapult","mortar","medic","cook","spearman","ram","ballista","flamethrower","catapult","steamboat","mortar","submarine","rocketship","paddlespeedship","ballooncarrier","tender");
	
	var attackersLosses = 0, defendersLosses = 0; 
	var attackersTotal = 0, defendersTotal = 0; 
	var attackerwood = 0, defenderwood = 0;
	var attackersulphur = 0, defendersulphur = 0;
	var attackercrystal = 0, defendercrystal = 0;
	var attackerwine = 0, defenderwine = 0;
	var attackercitizens = 0, defendercitizens = 0;
	var attackertroops_lost = 0, defendertroops_lost = 0;
	var attackertroops_total = 0,  defendertroops_total = 0;
	
	for (var unit = 0; unit < allUnits.length; unit++) {
		var unitName = UNIT[allUnits[unit]];
		var pos = 0;
		if (unitName != null) {
			var attacker = CRAC_REPORT.battle.attackers[allUnits[unit]]; 
			var defender = CRAC_REPORT.battle.defenders[allUnits[unit]];
			
		
			if (attacker != null) {
				for(i=0;i<troop_position.length;i++) { 
					if(unitName==troop_position[i]) {
						pos = i
					}
				}
				if(parseInt(attacker.left)!=0||parseInt(attacker.lost)!=0) { 
					report += '[img]http://'+server+'/skin/characters/'
					if(pos>=14) { 
						report += 'fleet/40x40/ship_';
						is_maritim=1;
						intro = intro.replace(/terrestre/,'marítima');
						if(GM_getValue('CRAC_city')==2) { 
							intro = intro.replace(/ en la ciudad de /,' frente al puerto de ');
						}
					} else { 
						report += 'military/x40_y40/y40_';
					}
					report += name_english[pos];
					if(pos>=14) {
						report += '_l_40x40.png'; 
					} else { 
						report += '_faceright.png';
					}
					report += '[/img] ';
					if(GM_getValue('CRAC_wordunits')==2) { 
						report += '[b]';
					}
					report +=  unitName;
					if(GM_getValue('CRAC_wordunits')==2) { 
						report += ' - [/b]Unidades: ';
					} else {
						report += ': ';
					}
					
					report += '[b][size=12]';
					report += parseInt(parseInt(attacker.left) + parseInt(attacker.lost));
					report += '[/size][/b] - [color=red][b][size=12]';
					report += attacker.lost;
					report += '[/size][/b][/color] = [b][color=green][size=12]';
					report += attacker.left;
					report += '[/size][/color][/b]';
					if(GM_getValue('CRAC_troops_percent')==2) {
						var troop_percent = (Math.round((parseInt(attacker.lost)/(parseInt(parseInt(attacker.left) + parseInt(attacker.lost))))*10000))/100;
						report += ' (-' + troop_percent + '%)';
					}
					attackersLosses += attacker.lost * allUnitCosts[unit];
					attackersTotal += parseInt(parseInt(attacker.lost * allUnitCosts[unit]) +  parseInt(attacker.left * allUnitCosts[unit]));
					attackerwood += attacker.lost * allUnitWood[unit];
					attackersulphur += attacker.lost * allUnitSulphur[unit];
					attackercrystal += attacker.lost * allUnitCrystal[unit];
					attackerwine += attacker.lost * allUnitWine[unit];
					attackercitizens += attacker.lost * allUnitCitizen[unit];
					attackertroops_lost += attacker.lost;
					attackertroops_total = parseInt(attackertroops_total) + parseInt(attacker.lost) + parseInt(attacker.left);

					report += '<br/>';
				}
			}
		}
	}
	
	report += '<br/>';
	report += '<br/>';
	report +=  '[color=#660000][b][i]DEFENSOR';
		
	if(defenders.length>1) {
		report += 'ES';
	}
		
	report += '[/i][/b][/color]';
	report += '<br/>';
	report += '[b][size=14][color=green]';
	report += defenders_string;
	report += '[/color][/size][/b]';
	report += '<br/>';
	report += '<br/>';
	
	for (var unit = 0; unit < allUnits.length; unit++) {
		var unitName = UNIT[allUnits[unit]]; 
		if (unitName != null) {
			var attacker = CRAC_REPORT.battle.attackers[allUnits[unit]]; 
			var defender = CRAC_REPORT.battle.defenders[allUnits[unit]];
				
			if (defender != null) {
				for(i=0;i<troop_position.length;i++) {
					if(unitName==troop_position[i]) {
						pos = i;
					}
				}
				if(parseInt(defender.left)!=0||parseInt(defender.lost)!=0) { 
					report += '[img]http://'+server+'/skin/characters/'
					if(pos>=14) {
						report += 'fleet/40x40/ship_'; 
					} else { 
						report += 'military/x40_y40/y40_'; 
					}
					report += name_english[pos];
					if(pos>=14) { 
						report += '_l_40x40.png'; 
					} else { 
						report += '_faceright.png'; 
					}
					report += '[/img] ';
					if(GM_getValue('CRAC_wordunits')==2) { 
						report += '[b]';
					}
					report +=  unitName;
					if(GM_getValue('CRAC_wordunits')==2) { 
						report += ' - [/b]Unidades: ';
					} else { 
						report += ': '; 
					}
					report += '[b][size=12]';
					report += parseInt(parseInt(defender.left) + parseInt(defender.lost));
					report += '[/size][/b] - [color=red][b][size=12]';
					report += defender.lost;
					report += '[/size][/b][/color] = [b][color=green][size=12]';
					report += defender.left;
					report += '[/size][/color][/b]';
					if(GM_getValue('CRAC_troops_percent')==2) {
						var troop_percent = (Math.round((parseInt(defender.lost)/(parseInt(parseInt(defender.left) + parseInt(defender.lost))))*10000))/100;
						report += ' (-' + troop_percent + '%)';
					}
					defendersLosses += defender.lost * allUnitCosts[unit];
					defendersTotal += parseInt(parseInt(defender.lost * allUnitCosts[unit]) + parseInt(defender.left * allUnitCosts[unit]));
					defenderwood += defender.lost * allUnitWood[unit];
					defendersulphur += defender.lost * allUnitSulphur[unit];
					defendercrystal += defender.lost * allUnitCrystal[unit];
					defenderwine += defender.lost * allUnitWine[unit];
					defendercitizens += defender.lost * allUnitCitizen[unit];
					defendertroops_lost += defender.lost;
					defendertroops_total = parseInt(defendertroops_total) + parseInt(defender.lost) + parseInt(defender.left);
					report += '<br/>';
				}
			}
		}
	}

	var results = '<br/>';
	results += '<br/>';
	results += '[size=14][b]Resultado de la batalla[/b][/size]'
	results += '<br/>';
	results += '<br/>';
	results +='[size=12][b]';

	if(winner_attacker==1) { 
		if(attackers.length>1) {
			results += 'Vencedores';  
		} else { 
			results += 'Vencedor';
		}
	} else if(winner_attacker==0) { 
		if(defenders.length>1) { 
			results += 'Vencedores'; 
		} else {
			results += 'Vencedor'; 
		}  
	} else { 
		results += 'Resultado'; 
	}

	results += '[/b][/size]';
	results += '<br/>';
	results += '[i][color=';

	if(winner_attacker==1) { 
		results += 'red';
	} else if(winner_attacker==0) { 
		results += 'green'; 
	} else { 
		results += 'darkblue'; 
	}
				
	results +='][size=18]';
	var still_process = /Batalla aun en proceso/;

	if(winner_attacker==1) { 
		results += attackers_string; 
	} else if(winner_attacker==0) { 
		results += defenders_string; 
	} else { 
		if(still_process.test(document.getElementById('militaryAdvisorReportView').innerHTML)) { 
			results += 'Batalla aún en proceso'; 
		} else { 
			if(/Coloso/g.test(CRAC_REPORT.battle.loot)) {
				if(loser_attacker==1) {
					results += defenders_string + ' (vence';
					if(defenders.length>1) {
						results += 'n';
					}
					results += ' por la activación de un coloso)';
				} else if (loser_attacker==0) {
					results += attackers_string + ' (vence';
					if(attackers.length>1) {
						results += 'n';
					}
					results += ' por la activación de un coloso)';
				} else if (loser_attacker==2) {
					results += 'Empate';
				}
			} else {
				results += 'Empate';
			}
		}
	}

	results += '[/size][/color][/i]';
	results += '<br/>';
	results += '<br/>';

	results += '[size=12][b]Puntos de GENERALES perdidos y totales[/b][/size]';
	results += '<br/>';

	var losses_ratio = (Math.round((defendersLosses/attackersLosses)*100))/100;
	var ratio_defender = 0;
	if(losses_ratio < 1) {
		losses_ratio = (Math.round((attackersLosses/defendersLosses)*100))/100; ratio_defender = 1;
	}
	if(losses_ratio == 1) {  
		ratio_defender = 2;
	}

	var attacker_percent = (Math.round((1-((attackersTotal - attackersLosses) / attackersTotal))*10000)) / 100;
	var deffender_percent = (Math.round((1-((defendersTotal - defendersLosses) / defendersTotal))*10000)) / 100;
	var total_percent = (Math.round((1-(((attackersTotal + defendersTotal) - (attackersLosses + defendersLosses)) / (attackersTotal + defendersTotal)))*10000)) / 100;
	var attacker_lost = attackersLosses*.02;
	var deffender_lost = defendersLosses*.02;
	total_lost = attacker_lost + deffender_lost;
	var attacker_total = attackersTotal*.02;
	var deffender_total = defendersTotal*.02;
	var total_total = attacker_total + deffender_total;

	var attacker_lost_units = attackertroops_lost;
	var deffender_lost_units = defendertroops_lost;
	var total_lost_units = attacker_lost_units + deffender_lost_units;
	var attacker_total_units = attackertroops_total;
	var deffender_total_units = defendertroops_total;
	var total_total_units = attacker_total_units + deffender_total_units;

	var attacker_percent_units = (Math.round((1-((attacker_total_units - attacker_lost_units) / attacker_total_units))*10000)) / 100;
	var deffender_percent_units = (Math.round((1-((deffender_total_units - deffender_lost_units) / deffender_total_units))*10000)) / 100;
	var total_percent_units = (Math.round((1-(((attacker_total_units + deffender_total_units) - (attacker_lost_units + deffender_lost_units)) / (attacker_total_units + deffender_total_units)))*10000)) / 100;

	attacker_lost = (Math.round(attacker_lost*100))/100;
	if(Math.floor(attacker_lost)!=attacker_lost) {
		if(Math.floor(attacker_lost*10)==attacker_lost*10) {
			attacker_lost += '0';
		}
	}
	deffender_lost = (Math.round(deffender_lost*100))/100;
	if(Math.floor(deffender_lost)!=deffender_lost) {
		if(Math.floor(deffender_lost*10)==deffender_lost*10) {
			deffender_lost += '0';
		}
	}
	total_lost = (Math.round(total_lost*100))/100;
	if(Math.floor(total_lost)!=total_lost) {
		if(Math.floor(total_lost*10)==total_lost*10) {
			total_lost += '0';
		}
	}
	attacker_total = (Math.round(attacker_total*100))/100;
	if(Math.floor(attacker_total)!=attacker_total) {
		if(Math.floor(attacker_total*10)==attacker_total*10) {
			attacker_total += '0';
		}
	}
	deffender_total = (Math.round(deffender_total*100))/100;
	if(Math.floor(deffender_total)!=deffender_total) {
		if(Math.floor(deffender_total*10)==deffender_total*10) {
			deffender_total += '0';
		}
	}
	total_total = (Math.round(total_total*100))/100;
	if(Math.floor(total_total)!=total_total) {
		if(Math.floor(total_total*10)==total_total*10) {
			total_total += '0';
		}
	}
	results += '[i][size=12]Atacante';
	if(attackers.length>1) {results += 's'; }
	results += ':[/size] [color=red][size=16][b]';
	results += addCommas(attacker_lost);
	results += '[/b][/size][/color] de [size=12]'; 
	results += addCommas(attacker_total);
	if(GM_getValue('CRAC_percent')==2) {
		results +=' (';
		results +=	attacker_percent;
		results += '%)';
	}
	results += '[/size]';
	results += '<br/>';
	results += '[size=12]Defensor';
	if(defenders.length>1) {
		results += 'es'; 
	}
	results +=':[/size] [color=green][size=16][b]';
	results += addCommas(deffender_lost);
	results += '[/b][/size][/color] de [size=12]';
	results += addCommas(deffender_total);
	if(GM_getValue('CRAC_percent')==2) {
		results +=' (';
		results +=	deffender_percent;
		results += '%)';
	}
	results += '[/size]';
	results += '<br/>';
	results += '[size=12]Total:[/size] [color=darkblue][size=18][b]';
	results += addCommas(total_lost);
	results += '[/b][/size][/color] de [size=14]';
	results += addCommas(total_total);
	if(GM_getValue('CRAC_percent')==2) {
		results +=' (';
		results +=	total_percent;
		results += '%)';
	}
	results += '[/size]';
	
	
	results += '[/i]';
	results += '<br/>';
	results += '<br/>';
	
	if(GM_getValue('CRAC_ratio')==2) { 	
		results +='[size=12][b]Relación de pérdidas de generales[/b][/size]';
		results += '<br/>';
		results += '[i]Ratio de[/i] [color=';
		if(ratio_defender==0) { 
			results += 'red'; 
		} else if(ratio_defender==1) { 
			results += 'green'; 
		} else { 
			results += 'darkblue';
		}
		results += '][size=18][b]';
		if(ratio_defender==1) { 
			results += losses_ratio; 
		} else { 
			results += '1'; 
		}
		results += ':';
		if(ratio_defender==0) { 
			results += losses_ratio; 
		} else { 
			results += '1'; 
		}
		results += '[/b][/size][/color] [i]';
		if(ratio_defender!=2) { 
			results += 'a favor de'; 
		} else { 
			results += 'acabando en un empate absoluto'; 
		}
		if(ratio_defender==0) { 
			if(attackers.length>1) { 
				results +=' los atacantes'; 
			} else { 
				results += 'l atacante'; 
			}
		} 
		if(ratio_defender==1) { 
			if(defenders.length>1) { 
				results +=' los defensores'; 
			} else { 
				results += 'l defensor'; 
			}
		}
		results += '.[/i]';
		results += '<br/>';
		results += '<br/>';
	}
	if(GM_getValue('CRAC_off_points')==2) { 

		results += '[size=12][b]Puntos ofensivos y defensivos[/b][/size]';
		results += '<br/>';
		results += '[i][size=12]Ofensivos';
		results += ':[/size] [color=red][size=16][b]';
		results += addCommas(deffender_lost*2.5);
		results += '[/b][/size][/color]';
		results += '<br/>';
		results += '[size=12]Defensivos';
		results +=':[/size] [color=green][size=16][b]';
		results += addCommas(attacker_lost*2.5);
		results += '[/b][/size][/color]';
		results += '<br/>';
		results += '[size=12]Total:[/size] [color=darkblue][size=18][b]';
		results += addCommas(total_lost*2.5);
		results += '[/b][/size][/color]';
		results += '[/i]';
		results += '<br/>';
		results += '<br/>';
	}
	if(GM_getValue('CRAC_troops')==2) { 
		results +='[size=12][b]Unidades perdidas y totales[/b][/size]';
		results += '<br/>';
		results += '[i][size=12]Atacante';
		if(attackers.length>1) {
			results += 's'; 
		}
		results += ':[/size] [color=red][size=14][b]';
		results += addCommas(attacker_lost_units);
		results += '[/b][/size][/color] de [size=12]'; 
		results += addCommas(attacker_total_units);
		if(GM_getValue('CRAC_percent')==2) { 
			results +=' (';
			results +=	attacker_percent_units;
			results += '%)';
		}
		results += '[/size]';
		results += '<br/>';
		results += '[size=12]Defensor';
		if(defenders.length>1) {
			results += 'es'; 
		}
		results +=':[/size] [color=green][size=14][b]';
		results += addCommas(deffender_lost_units);
		results += '[/b][/size][/color] de [size=12]';
		results += addCommas(deffender_total_units);
		if(GM_getValue('CRAC_percent')==2) { 
			results +=' (';
			results +=	deffender_percent_units;
			results += '%)';
		}
		results += '[/size]';
		results += '<br/>';
		results += '[size=12]Total:[/size] [color=darkblue][size=18][b]';
		results += addCommas(total_lost_units);
		results += '[/b][/size][/color] de [size=14]';
		results += addCommas(total_total_units);
		if(GM_getValue('CRAC_percent')==2) { 
			results +=' (';
			results +=	total_percent_units;
			results += '%)';
		}
		results += '[/size]';
		results += '[/i]';
		results += '<br/>';
		results += '<br/>';
	}
	if(GM_getValue('CRAC_loot')==2 &&  is_loot==1) { 
		results += '[size=12][b]Botín de guerra[/b][/size]';
		results += '<br/>';
		results += '[i]Atacante';
		if(attackers.length>1) {
			results += 's'; 
		}
		results +=	':[/i] [img]http://' + server + '/skin/resources/icon_wood.png[/img]  ';
		results += addCommas(loot_wood3);
		results += '   [img]http://' + server + '/skin/resources/icon_sulfur.png[/img]  ';
		results += addCommas(loot_sulphur3);
		results += '   [img]http://' + server + '/skin/resources/icon_glass.png[/img] ';
		results += addCommas(loot_crystal3);
		results += '   [img]http://' + server + '/skin/resources/icon_wine.png[/img] ';
		results += addCommas(loot_wine3);
		results += '   [img]http://' + server + '/skin/resources/icon_marble.png[/img] ';
		results += addCommas(loot_marble3);
		results += '<br/>';
		results += '<br/>';
	}

	results += '[size=12][b]Recursos y burgueses perdidos[/b][/size]';
	results += '<br/>';
	results += '[i]Atacante';
	if(attackers.length>1) {
		results += 's'; 
	}
	results +=	':[/i] [img]http://' + server + '/skin/resources/icon_wood.png[/img]  ';
	results += addCommas(attackerwood);
	results += '   [img]http://' + server + '/skin/resources/icon_sulfur.png[/img]  ';
	results += addCommas(attackersulphur);
	results += '   [img]http://' + server + '/skin/resources/icon_glass.png[/img] ';
	results += addCommas(attackercrystal);
	results += '   [img]http://' + server + '/skin/resources/icon_wine.png[/img] ';
	results += addCommas(attackerwine);
	results +='   [img]http://' + server + '/skin/resources/icon_citizen.png[/img] ';
	results += addCommas(attackercitizens);
	results += '<br/>';
	results += '[i]Defensor';
	if(defenders.length>1) {
		results += 'es'; 
	}
	results += ':[/i] [img]http://' + server + '/skin/resources/icon_wood.png[/img]  ';
	results += addCommas(defenderwood);
	results += '   [img]http://' + server + '/skin/resources/icon_sulfur.png[/img]  ';
	results += addCommas(defendersulphur);
	results += '  [img]http://' + server + '/skin/resources/icon_glass.png[/img] ';
	results += addCommas(defendercrystal);
	results += '  [img]http://' + server + '/skin/resources/icon_wine.png[/img] ';
	results += addCommas(defenderwine);
	results +='  [img]http://' + server + '/skin/resources/icon_citizen.png[/img] ';
	results += addCommas(defendercitizens);
	results += '<br/>';
	results += '<br/>[b][i]Compactado con: [url=http://board.ar.ikariam.com/board113-discusi%C3%B3n-global/board120-scripts-y-add-ons/53587-combat-report-auto-converter-argentino/]Combat Report Auto-Converter Argentino[/url] v0.5.2 [url=http://board.es.ikariam.com/index.php?page=Thread&threadID=129508]©[/url] Editado por [url=http://board.ar.ikariam.com/user/6694-]Reaper[/url][/i][/b]';
	document.getElementById('extraDiv4').innerHTML = intro;
	document.getElementById('extraDiv5').innerHTML = report;
	document.getElementById('extraDiv6').innerHTML = results;
	full_report = intro + report + results;
	return full_report;
}

function AddUnit(list, unit, details) {
	if (details.indexOf("(") != -1) {
		if (list[unit] == null || list[unit] == undefined) { 
			list[unit] = { left: 0, lost: 0 }
		}
		list[unit].left += parseInt(details.substr(0, details.indexOf('(')).replace(/\s+/, ''));
		list[unit].lost += parseInt(details.substr(details.indexOf('-') + 1).replace(/\s+/, '').replace(/\)/, ''));
	}
}
function Todark(text) {
		text = text.replace(/color=darkblue/g,'color=#4080FF');
		text = text.replace(/color=red/g,'color=#FF4040');
		text = text.replace(/color=green/g,'color=#00BF40');
		text = text.replace(/color=#660000/g,'color=#FFBF80');
		return text;
}
function Tosmf(text) {
		text = text.replace(/size=8/g,'size=8pt');
		text = text.replace(/size=12/g,'size=12pt');
		text = text.replace(/size=14/g,'size=14pt');
		text = text.replace(/size=16/g,'size=16pt');
		text = text.replace(/size=18/g,'size=18pt');
		return text;
}
function Toburning(text) {
		text = text.replace(/size=16/g,'size=14');
		return text;
}
function Tophpbb3(text) {
		text = text.replace(/size=8/g,'size=80');
		text = text.replace(/size=12/g,'size=120');
		text = text.replace(/size=14/g,'size=140');
		text = text.replace(/size=16/g,'size=160');
		text = text.replace(/size=18/g,'size=180');
		return text;
}
function Tophpbb2(text) {
		text = text.replace(/size=18/g,'size=20');
		text = text.replace(/size=16/g,'size=18');
		text = text.replace(/size=14/g,'size=16');
		text = text.replace(/size=12/g,'size=14');
		text = text.replace(/size=8/g,'size=10');
		return text;
}
function Tovbulletin(text) {
		text = text.replace(/size=8/g,'size=1');
		text = text.replace(/size=12/g,'size=3');
		text = text.replace(/size=14/g,'size=4');
		text = text.replace(/size=16/g,'size=5');
		text = text.replace(/size=18/g,'size=6');
		return text;
}
function Tointernal(text) {
		text = text.replace(/\[size=(.*?)\]/g,'');
		text = text.replace(/\[\/size\]/g,'');
		return text;
}
function Toplain(text) {
		text = text.replace('[img]http://'+server+'/skin/resources/icon_wood.png[/img]','Madera:');
		text = text.replace('[img]http://'+server+'/skin/resources/icon_wine.png[/img]','Vino:');
		text = text.replace('[img]http://'+server+'/skin/resources/icon_glass.png[/img]','Cristal:');
		text = text.replace('[img]http://'+server+'/skin/resources/icon_sulfur.png[/img]','Azufre:');
		text = text.replace('[img]http://'+server+'/skin/resources/icon_citizen.png[/img]','Burgueses:');
		text = text.replace('[img]http://'+server+'/skin/resources/icon_wood.png[/img]','Madera:');
		text = text.replace('[img]http://'+server+'/skin/resources/icon_wine.png[/img]','Vino:');
		text = text.replace('[img]http://'+server+'/skin/resources/icon_glass.png[/img]','Cristal:');
		text = text.replace('[img]http://'+server+'/skin/resources/icon_sulfur.png[/img]','Azufre:');
		text = text.replace('[img]http://'+server+'/skin/resources/icon_citizen.png[/img]','Burgueses:');
		text = text.replace('[b][i]Compactado con: [url=http://board.ar.ikariam.com/board113-discusi%C3%B3n-global/board120-scripts-y-add-ons/53587-combat-report-auto-converter-argentino/]Combat Report Auto-Converter Argentino[/url] v0.5.2 [url=http://board.es.ikariam.com/index.php?page=Thread&threadID=129508]©[/url] Editado por [url=http://board.ar.ikariam.com/user/6694-]Reaper[/url][/i][/b]','Compactado con: Combat Report Auto-Converter Argentino v0.5.2 © Editado por Reaper');
		text = text.replace(/\[img\](.*?)\[\/img\]/g,'');
		text = text.replace(/\[.*?\]/g,'');
		return text;
}
function Toallbutphpbb2(text) {
		text = text.replace(/size=10/g,'size=16');
		return text;
}
function Adaptformat(text) {
	if(GM_getValue('background')=='Dark') {
		text = Todark(text);
	}
	if(GM_getValue('forumclass')=='SMF') {
		text = Tosmf(text);
	}
	if(GM_getValue('forumclass')=='Burning') {
		text = Toburning(text);
	}
	if(GM_getValue('forumclass')=='phpBB3') {
		text = Tophpbb3(text);
	}
	if(GM_getValue('forumclass')=='vBulletin') {
		text = Tovbulletin(text);
	}
	if(GM_getValue('forumclass')=='phpBB2') {
		text = Tophpbb2(text);
	}
	if(GM_getValue('forumclass')=='internal') {
		text = Tointernal(text);
	}
	if(GM_getValue('forumclass')=='plain') {
		text = Toplain(text);
	}
	if(GM_getValue('forumclass')!='phpBB2') {
		text = Toallbutphpbb2(text);
	}
	return text;
}
function BuildReport() {
	var final_text = '';
	final_text = BuildStandardReport();

	var final_subject = attackers_string + ' vs ' + defenders_string + ' (' + addCommas(Math.round(total_lost)) + ' ptos)';

	document.getElementById('extraDiv4').innerHTML = Adaptformat(document.getElementById('extraDiv4').innerHTML);
	document.getElementById('extraDiv5').innerHTML = Adaptformat(document.getElementById('extraDiv5').innerHTML);
	document.getElementById('extraDiv6').innerHTML = Adaptformat(document.getElementById('extraDiv6').innerHTML);
	final_text = Adaptformat(final_text);

	var new_militaryAdvisorReportView =  '<h3 class="header">Compactador</h3><div class="content"><table style="border:none;"><tr><td style="border:none; height:8px;"></td></tr><tr><td style="vertical-align:middle; text-align:center; height:60px; border:none;">Hacé click sobre Seleccionar la parte que quieras, pulsa CTRL+C y luego pegala en el foro pulsando CTRL+V';
	var battle_is_full = document.getElementById('militaryAdvisorReportView').innerHTML.split('combatRound=');
	var battle_is_full2 = battle_is_full[1].split('&amp;');
	battle_is_full3 = battle_is_full2[0];
	if(battle_is_full3!=1) {
		new_militaryAdvisorReportView += '<br/><br/><b>ATENCION: No has estado en esta batalla desde el principio, el reporte no mostrará todas las pérdidas!!</b>';
	}
	final_text = final_text.replace(/<br\/>/g,'\n');
		
	new_militaryAdvisorReportView += '</td></tr><tr style="border:none;"><td style="border:none; width:674px; text-align:center;"><button class="button" style="margin-right:40px;" id="CRAC_selectallsubject">Seleccionar asunto</button><button style="margin-right:40px;" class="button" id="CRAC_selectall">Seleccionar batalla</button>';

	if(battle_is_full3==1) {
		if(parseInt(total_lost)<limit) {
			total_lost = Math.round(total_lost);
			new_militaryAdvisorReportView += '<button class="button" id="CRAC_postToForum"">Batalla no posteable ('+total_lost+' gen.)</button>';
		} else {
			new_militaryAdvisorReportView += '<button class="button" id="CRAC_postToForum">Postear en el foro ('+total_lost+' gen.)</button>';
		}
	} else {
		new_militaryAdvisorReportView += '<button class="button" id="CRAC_postToForum"">Batalla no posteable (incompleta)</button>';
	}
	new_militaryAdvisorReportView += '</td></tr><tr><td style="text-align:center; border:none; height:10px; width:674px;"><textarea id="CRAC_toselectsubject" readonly="readonly" style="width:0px; position:absolute; top:-50px; height:0px; border:none;">' + final_subject + '</textarea><textarea id="CRAC_toselect" readonly="readonly"style="width:0px;  position:absolute; top:-50px;  height:0px; border:none;">' + final_text + '</textarea><div style="visibility:hidden;" id="CRAC_intro"></div></td></tr></table></div><div class="footer"></div></div><div class="contentBox01h"><h3 class="header"><div style="text-align:center; ">Configuración</div><div style="text-align:right; position:absolute; z-index:100; right:10px;"></div></h3><div class="content" id="CRAC_config_content"><table><tr><td style="border:none; text-align:center;"><form action="#" method="POST" name="CRAC_options" id="CRAC_options"><table><tr><td rowspan="2" style="border:none; vertical-align:middle; text-align:center; width:115px;"><b>Tipo de foro:</b></td><td style="border:none; text-align:left; height:30px; width:559px;"><span style="margin-right:100px;"><input type="radio" id="forumclass1" name="forumclass" value="Burning"> Burning Board (Foro Ikariam)</span><span style="margin-right:100px;"><input type="radio" id="forumclass2" name="forumclass" value="phpBB3"> phpBB3</span><input type="radio" id="forumclass3" name="forumclass" value="phpBB2"> phpBB2</td></tr><tr><td style="border:none; height:30px; text-align:left;"><span style="margin-right:74px;"><input type="radio" id="forumclass4" name="forumclass" value="SMF">SMF</span><span style="margin-right:74px;"><input type="radio" id="forumclass5" name="forumclass" value="vBulletin"> vBulletin</span><span style="margin-right:74px;"><input type="radio" id="forumclass6" name="forumclass" value="internal"> Interno Alianza</span><input type="radio" id="forumclass7" name="forumclass" value="plain"> Sin formato</td></tr><tr><td style="height:10px; border:none;"></td></tr><tr><td style="border:none; text-align:center;"><b>Color de fondo:</b></td><td style="border:none; text-align:left; height:30px;"><span style="margin-right:80px;"><input type="radio" id="background1" name="background" value="Light"> Claro (Foro Ikariam) </span><input type="radio" id="background2" name="background" value="Dark"> Oscuro</td></tr><tr><td style="height:10px; border:none;"></td></tr><tr><td style="border:none; vertical-align:middle; height:30px; t text-align:center;"><b>Introducción:</b></td><td style="border:none; text-align:left;"><span style="border:none; margin-right:20px;"><input type="checkbox" id="hour" name="hour"> Hora</span><span style="border:none; margin-right:20px;"><input type="checkbox" id="CRAC_city" name="CRAC_city"> Nombre de la ciudad</span><span style="border:none; margin-right:20px;"><input type="checkbox" id="CRAC_bfsize" name="CRAC_bfsize"> Tamaño del campo de batalla</span><input type="checkbox" id="CRAC_showrounds" name="CRAC_showrounds"> Número de rondas</td></tr><tr><td style="height:10px; border:none;"></td></tr><tr><td style="border:none; vertical-align:middle; text-align:center;"><b>Resumen tropas:</b></td><td style="border:none; text-align:left; height:30px; "><span style="border:none; margin-right:32px;"><input type="checkbox" id="CRAC_wordunits" name="CRAC_wordunits"> Palabra "unidades" </span><span style="border:none; margin-right:32px;"><input type="checkbox" id="CRAC_troops_percent" name="CRAC_troops_percent"> Porcentajes perdidos de cada unidad </span><input type="checkbox" id="CRAC_showwall" name="CRAC_showwall"> Nivel de la muralla</td></tr><tr><td style="height:10px; border:none;"></td></tr><tr><td rowspan="2" style="border:none; vertical-align:middle; text-align:center;"><b>Informes y estadísticas:</b></td><td style="border:none; height:30px; text-align:left;"><span style="border:none; margin-right:22px;"><input type="checkbox" id="CRAC_ratio" name="CRAC_ratio"> Relación de pérdidas</span><span style="border:none; margin-right:22px;"><input type="checkbox" id="CRAC_troops" name="CRAC_troops"> Número de unidades perdidas</span><input type="checkbox" id="CRAC_off_points" name="CRAC_off_points"> Puntos ofensivos y defensivos</td></tr><tr><td style="border:none; height:30px;text-align:left;"><span style="border:none; margin-right:24px; "><input type="checkbox" id="CRAC_percent" name="CRAC_percent"> Porcentajes en los resúmenes</span><span style="border:none; margin-right:24px;"><input type="checkbox" id="CRAC_loot" name="CRAC_loot"> Botín de guerra</span><input type="checkbox" id="CRAC_ally" name="CRAC_ally"> Alianza en asunto (sólo cuenta una)</td></tr></table></form><br><button class="button" id="CRAC_save_settings">Guardar cambios</button></td></tr></table><br/></div><div class="footer"></div>';
	

	var militaryAdvisorReportView = new_militaryAdvisorReportView;

	var cadena_forumclass = 'name="forumclass" value="' + GM_getValue('forumclass') +'">';
	var cadena_forumclass_checked = 'name="forumclass" checked="checked" value="' + GM_getValue('forumclass') +'">';
	var cadena_background = 'name="background" value="' + GM_getValue('background') +'">';
	var cadena_background_checked = 'name="background" checked="checked" value="' + GM_getValue('background') +'">';
	
	if(GM_getValue('hour')==2) { 
		var cadena_hour = 'id="hour" name="hour">';
		var cadena_hour_checked = 'id="hour" checked="checked" name="hour">';
		militaryAdvisorReportView = militaryAdvisorReportView.replace(cadena_hour,cadena_hour_checked);
	}
	if(GM_getValue('CRAC_city')==2) { 
		var cadena_CRAC_city = 'id="CRAC_city" name="CRAC_city">';
		var cadena_CRAC_city_checked = 'id="CRAC_city" checked="checked" name="CRAC_city">';
		militaryAdvisorReportView = militaryAdvisorReportView.replace(cadena_CRAC_city,cadena_CRAC_city_checked);
	}
	if(GM_getValue('CRAC_troops')==2) { 
		var cadena_CRAC_troops = 'id="CRAC_troops" name="CRAC_troops">';
		var cadena_CRAC_troops_checked = 'id="CRAC_troops" checked="checked" name="CRAC_troops">';
		militaryAdvisorReportView = militaryAdvisorReportView.replace(cadena_CRAC_troops,cadena_CRAC_troops_checked);
	}
	if(GM_getValue('CRAC_ratio')==2) { 
		var cadena_CRAC_ratio = 'id="CRAC_ratio" name="CRAC_ratio">';
		var cadena_CRAC_ratio_checked = 'id="CRAC_ratio" checked="checked" name="CRAC_ratio">';
		militaryAdvisorReportView = militaryAdvisorReportView.replace(cadena_CRAC_ratio,cadena_CRAC_ratio_checked);
	}

	if(GM_getValue('CRAC_troops_percent')==2) { 
		var cadena_CRAC_troops_percent = 'id="CRAC_troops_percent" name="CRAC_troops_percent">';
		var cadena_CRAC_troops_percent_checked = 'id="CRAC_troops_percent" checked="checked" name="CRAC_troops_percent">';
		militaryAdvisorReportView = militaryAdvisorReportView.replace(cadena_CRAC_troops_percent,cadena_CRAC_troops_percent_checked);
	}

	if(GM_getValue('CRAC_loot')==2) { 
		var cadena_CRAC_loot = 'id="CRAC_loot" name="CRAC_loot">';
		var cadena_CRAC_loot_checked = 'id="CRAC_loot" checked="checked" name="CRAC_loot">';
		militaryAdvisorReportView = militaryAdvisorReportView.replace(cadena_CRAC_loot,cadena_CRAC_loot_checked);
	}

	if(GM_getValue('CRAC_off_points')==2) { 
		var cadena_CRAC_off_points = 'id="CRAC_off_points" name="CRAC_off_points">';
		var cadena_CRAC_off_points_checked = 'id="CRAC_off_points" checked="checked" name="CRAC_off_points">';
		militaryAdvisorReportView = militaryAdvisorReportView.replace(cadena_CRAC_off_points,cadena_CRAC_off_points_checked);
	}

	if(GM_getValue('CRAC_percent')==2) { 
		var cadena_CRAC_percent = 'id="CRAC_percent" name="CRAC_percent">';
		var cadena_CRAC_percent_checked = 'id="CRAC_percent" checked="checked" name="CRAC_percent">';
		militaryAdvisorReportView = militaryAdvisorReportView.replace(cadena_CRAC_percent,cadena_CRAC_percent_checked);
	}

	if(GM_getValue('CRAC_wordunits')==2) { 
		var cadena_CRAC_wordunits = 'id="CRAC_wordunits" name="CRAC_wordunits">';
		var cadena_CRAC_wordunits_checked = 'id="CRAC_wordunits" checked="checked" name="CRAC_wordunits">';
		militaryAdvisorReportView = militaryAdvisorReportView.replace(cadena_CRAC_wordunits,cadena_CRAC_wordunits_checked);
	}

	if(GM_getValue('CRAC_showwall')==2) { 
		var cadena_CRAC_showwall = 'id="CRAC_showwall" name="CRAC_showwall">';
		var cadena_CRAC_showwall_checked = 'id="CRAC_showwall" checked="checked" name="CRAC_showwall">';
		militaryAdvisorReportView = militaryAdvisorReportView.replace(cadena_CRAC_showwall,cadena_CRAC_showwall_checked);
	}

	if(GM_getValue('CRAC_showrounds')==2) { 
		var cadena_CRAC_showrounds = 'id="CRAC_showrounds" name="CRAC_showrounds">';
		var cadena_CRAC_showrounds_checked = 'id="CRAC_showrounds" checked="checked" name="CRAC_showrounds">';
		militaryAdvisorReportView = militaryAdvisorReportView.replace(cadena_CRAC_showrounds,cadena_CRAC_showrounds_checked);
	}

	if(GM_getValue('CRAC_bfsize')==2) { 
		var cadena_CRAC_bfsize = 'id="CRAC_bfsize" name="CRAC_bfsize">';
		var cadena_CRAC_bfsize_checked = 'id="CRAC_bfsize" checked="checked" name="CRAC_bfsize">';
		militaryAdvisorReportView = militaryAdvisorReportView.replace(cadena_CRAC_bfsize,cadena_CRAC_bfsize_checked);
	}
	if(GM_getValue('CRAC_ally')==2) { 
		var cadena_CRAC_ally = 'id="CRAC_ally" name="CRAC_ally">';
		var cadena_CRAC_ally_checked = 'id="CRAC_ally" checked="checked" name="CRAC_ally">';
		militaryAdvisorReportView = militaryAdvisorReportView.replace(cadena_CRAC_ally,cadena_CRAC_ally_checked);
	}
	militaryAdvisorReportView = militaryAdvisorReportView.replace(cadena_forumclass,cadena_forumclass_checked);
	militaryAdvisorReportView = militaryAdvisorReportView.replace(cadena_background,cadena_background_checked);
	
crac_panel.innerHTML = '<div style="width:46px; height:46px; position: absolute; top:140px; left:13px; z-index:100000000000; background-image:url(http://img443.imageshack.us/img443/8994/50187963.jpg);"></div><div class="mainContentBox contentBox01h toggleMenu yui-module yui-overlay yui-panel" id="militaryAdvisorReportView_z" style="visibility: inherit; " ><div id="militaryAdvisorReportView_g" class="hd header mainHeader draggable" style="cursor: move; " ><h3><a href="http://board.ar.ikariam.com/board113-discusi%C3%B3n-global/board120-scripts-y-add-ons/53587-combat-report-auto-converter-argentino/" target="_blank">Combat Report Auto-Converter Argentino</a> v0.5.2 <a href="http://board.ikariam.es/index.php?page=Thread&threadID=129508" target="_blank">©</a> Editado por <a href="http://board.ar.ikariam.com/user/6694-" target="_blank">Reaper</a></b></h3><div class="back invisible" id="crac_back"></div><div class="close" id="crac_close"></div></div><div style="height: 510px;" class="bd mainContentScroll"><div style="top: 0px;" class="mainContent minimizableContent"><div class="buildingDescription"><h1>Combat Report Auto-Converter Argentino</h1></div><div class="contentBox01h">' + militaryAdvisorReportView + '</div></div></div>';

    if(navigator.userAgent.indexOf("MSIE")>=0) navegador=0;
    else navegador=1;
	
	var cursorComienzoX = 0;
	var cursorComienzoY = 0;
	var xActual = 0;
	var yActual = 0;
	var elComienzoX = 0;
	var elComienzoY = 0;
	
	
}
function comenzarmov(event) {
	comienzoMovimiento(event,'crac_panel');
}
function evitaEventos(event)
{
    if(navegador==0)
    {
        window.event.cancelBubble=true;
        window.event.returnValue=false;
    }
    if(navegador==1) event.preventDefault();
}
 
function comienzoMovimiento(event, id)
{
    elMovimiento=document.getElementById(id);
   
     // Obtengo la posicion del cursor
    if(navegador==0)
     {
        cursorComienzoX=window.event.clientX+document.documentElement.scrollLeft+document.body.scrollLeft;
        cursorComienzoY=window.event.clientY+document.documentElement.scrollTop+document.body.scrollTop;
 
        document.attachEvent("onmousemove", enMovimiento);
        document.attachEvent("onmouseup", finMovimiento);
    }
    if(navegador==1)
    {   
        cursorComienzoX=event.clientX+window.scrollX;
        cursorComienzoY=event.clientY+window.scrollY;
       
        document.addEventListener("mousemove", enMovimiento, true);
        document.addEventListener("mouseup", finMovimiento, true);
		
    }
    elComienzoX=parseInt(elMovimiento.style.left);
    elComienzoY=parseInt(elMovimiento.style.top);
     evitaEventos(event);
}
 
function enMovimiento(event)
{ 
    var xActual, yActual;
    if(navegador==0)
    {   
        xActual=window.event.clientX+document.documentElement.scrollLeft+document.body.scrollLeft;
        yActual=window.event.clientY+document.documentElement.scrollTop+document.body.scrollTop;
    } 
    if(navegador==1)
    {
        xActual=event.clientX+window.scrollX;
        yActual=event.clientY+window.scrollY;
    }

    elMovimiento.style.left=(elComienzoX+xActual-cursorComienzoX)+"px";
    elMovimiento.style.top=(elComienzoY+yActual-cursorComienzoY)+"px";
 
    evitaEventos(event);
}
 
function finMovimiento(event)
{
    if(navegador==0)
    {   
        document.detachEvent("onmousemove", enMovimiento);
        document.detachEvent("onmouseup", finMovimiento);
    }
    if(navegador==1)
    {
        document.removeEventListener("mousemove", enMovimiento, true);
        document.removeEventListener("mouseup", finMovimiento, true);
    }
}
function SelectAll() {
	document.getElementById("CRAC_toselect").select();
}

function SelectAllSubject() {
	document.getElementById("CRAC_toselectsubject").select();
}
function hide_cracpanel() {
	var mydiv = document.getElementById('crac_panel');
	var container = document.getElementById('container');
	container.removeChild(mydiv);
	
}
function SetValues() {
	for(i=1;i<=7;i++){
		if(document.getElementById("forumclass"+i).checked){
			var forumclass_value = document.getElementById("forumclass"+i).value;
		}
	}
	GM_setValue('forumclass',forumclass_value);
	for(i=1;i<=2;i++){
		if(document.getElementById("background"+i).checked){
			var background_value = document.getElementById("background"+i).value;
		}
	}
	GM_setValue('background',background_value);
	if(document.getElementById("hour").checked){
		GM_setValue('hour',2);
	} else { 
		GM_setValue('hour',1); 
	}
	if(document.getElementById("CRAC_city").checked){
		GM_setValue('CRAC_city',2);
	} else { 
		GM_setValue('CRAC_city',1); 
	}
	if(document.getElementById("CRAC_troops").checked){
		GM_setValue('CRAC_troops',2);
	} else { 
		GM_setValue('CRAC_troops',1); 
	}
	if(document.getElementById("CRAC_ratio").checked){
		GM_setValue('CRAC_ratio',2);
	} else { 
		GM_setValue('CRAC_ratio',1); 
	}
	if(document.getElementById("CRAC_troops_percent").checked){
		GM_setValue('CRAC_troops_percent',2);
	} else { 
		GM_setValue('CRAC_troops_percent',1); 
	}
	if(document.getElementById("CRAC_percent").checked){
		GM_setValue('CRAC_percent',2);
	} else {
		GM_setValue('CRAC_percent',1);
	}
	if(document.getElementById("CRAC_loot").checked){
		GM_setValue('CRAC_loot',2);
	} else { 
		GM_setValue('CRAC_loot',1); 
	}
	if(document.getElementById("CRAC_off_points").checked){
		GM_setValue('CRAC_off_points',2);
	} else { 
		GM_setValue('CRAC_off_points',1); 
	}
	if(document.getElementById("CRAC_wordunits").checked){
		GM_setValue('CRAC_wordunits',2);
	} else { 
		GM_setValue('CRAC_wordunits',1); 
	}
	if(document.getElementById("CRAC_showwall").checked){
		GM_setValue('CRAC_showwall',2);
	} else { 
		GM_setValue('CRAC_showwall',1); 
	}
	if(document.getElementById("CRAC_showrounds").checked){
		GM_setValue('CRAC_showrounds',2);
	} else { 
		GM_setValue('CRAC_showrounds',1); 
	}
	if(document.getElementById("CRAC_bfsize").checked){
		GM_setValue('CRAC_bfsize',2);
	} else { 
		GM_setValue('CRAC_bfsize',1); 
	}
	if(document.getElementById("CRAC_ally").checked){
		GM_setValue('CRAC_ally',2);
	} else { 
		GM_setValue('CRAC_ally',1);
	}
	hide_cracpanel();
	show_crac();
}

function crac_button() {
	if(document.getElementById("CRAC_access")==null) {
		var crac_access=document.createElement("div");
		crac_access.id = 'CRAC_access';
		crac_access.innerHTML = '<a href="javascript:;" style="position:relative; top:-15px; left: 170px;" class="button">Compactar batalla</a>';
		$("#troopsReport p.link").append(crac_access);
		var addonclick7 = document.getElementById('CRAC_access');
		addonclick7.addEventListener("click", show_crac, false);
	}
}
function show_crac() { 
	ParseReport();
	BuildReport();
	$("#container").append(crac_panel);

	var addonclick = document.getElementById('CRAC_save_settings');
	addonclick.addEventListener("click", SetValues, false);
	
	var addonclick2 = document.getElementById('CRAC_selectall');
	addonclick2.addEventListener("click", SelectAll, false);

	var addonclick3 = document.getElementById('CRAC_selectallsubject');
	addonclick3.addEventListener("click", SelectAllSubject, false);
	
	var addonclick4 = document.getElementById('crac_close');
	addonclick4.addEventListener("click", hide_cracpanel, false);
	
	var addonclick5 = document.getElementById('crac_panel');
	addonclick5.addEventListener("mousedown", comenzarmov, false);

	var addonclick8 = document.getElementById('crac_back');
	addonclick8.addEventListener("click", hide_cracpanel, false);

	if((parseInt(total_lost)>limit)&&(battle_is_full3==1)) {
		var addonclick6 = document.getElementById('CRAC_postToForum');
		addonclick6.addEventListener("click", postToIkariam, true);
	}
}
function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}