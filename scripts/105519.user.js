// ==UserScript==
// @name          Travian Distance Overview
// @author	  Modified by dvdvhss
// @version       3.1
// @include       http://*.travian.*/karte.php*
// ==/UserScript==


/*

Original script : http://userscripts.org/users/72477
Other script based: http://userscripts.org/scripts/show/75486

 */
var target;
var Ttr = document.createElement("tr");
var Ttd = document.createElement("p");
var merch_m, troop_m;
var merchants = new Array(12, 24, 16);
var german_troops = new Array(7, 7, 6, 9, 10, 9, 4, 3, 4, 5);
var gallic_troops = new Array(7, 6, 17, 19, 16, 13, 4, 3, 5, 5);
var roman_troops = new Array(6, 5, 7, 16, 14, 10, 4, 3, 4, 5);

/*
function pauseExec(ms) {
ms += new Date().getTime();
while (new Date() < ms);
} */

/*
// ALTERAÇÃO
function getTsLevel(village_selected) {
var village_selected = window.open(document.location.href.match(/http\:\/{2}s\d\.travian\.com\.*\w*\//)+'dorf2.php');
//pauseExec(2000);
var html = village_selected.document.getElementById('village_map');
if (html != null) {
var level = html.innerHTML.match(/building\sd\d{1,2}\sg14"\salt\W+[\w\ç\s\í]+(\d{2})/);
if (level == null) {
var level = html.innerHTML.match(/building\sd\d{1,2}\sg14"\salt\W+[\w\ç\s\í]+(\d{1})/);
}
return parseInt(level[1]);
} else { return 0; }
}*/

//var ts_l = getTsLevel();
// FIM ALTERAÇÃO

//var ts_l = GM_getValue("ts_level",0);
var ts_level = 0;
var vlist;
var loc = document.location.href;

server = loc.substring(7, loc.indexOf("/", 7));

uid = getPlayerUID();

check_vlist();
selectTS();
calcTimes(ts_level);

function check_vlist() {
	vlist = document.getElementById("vlist");
	if (vlist) {
		return;
	} // more than 1 villages
	
	player_x = GM_getValue(server + uid + "xkord", 1000);
	player_y = GM_getValue(server + uid + "ykord", 1000);
	
	if ((player_x < 1000) && (player_y < 1000)) {
		return;
	}
	
	document.location.href = "http://" + server + "/spieler.php?uid=" + uid;
	
	var capital_coords = getCapital();
	
	xCord = capital_coords.snapshotItem(0).textContent.replace("(", "");
	yCord = capital_coords.snapshotItem(2).textContent.replace(")", "");
	
	GM_setValue(server + uid + "xkord", xCord);
	GM_setValue(server + uid + "ykord", yCord);
	
	alert("Setup complete!\n X: " + xCord + "\n Y: " + yCord);
}

function reload(ts_szint) {
	temp = document.getElementById("ts_level");
	//GM_setValue("ts_level",temp.selectedIndex);
	ts_level = temp.selectedIndex;
	//document.location.href = loc;
	calcTimes(ts_level);
}

function selectTS() {
	if (document.location.href.match( /\w+\:\/\/\w+\.travian.com\.*\w*\/(\w+)/)[1] != 'karte')
		return;
	var Ttd2 = document.createElement("p");
	var text = '</b>Tournament Square  <select id="ts_level" >';
	
	for (j = 0; j < 21; j++) {
		text += '<option value=' + j + '> Level ' + j + ' - ' + (100 + j * 10) + ' %</option>';
	}
	
	try {
		var targetTs = document.getElementById("options").getElementsByTagName("tbody")[0];
	} catch (err) {
		return;
	}
	
	//if(!targetTs) { return; }
	Ttd2.innerHTML = text;
	Ttd2.style.fontSize = "10px";
	
	targetTs.appendChild(Ttd2);
	level = document.getElementById("ts_level");
	//level.selectedIndex = GM_getValue("ts_level",0);
	level.addEventListener("change", function () {
			reload();
		}, false);
}

function calcTimes(ts_level) {
	try {
		target = document.getElementById("options").getElementsByTagName("tbody")[0];
	} catch (err) {
		return;
	}
	//if(!target) { return; }
	var selVil = getSelectedVillage();
	
	if (!selVil.snapshotLength) {
		xCord = GM_getValue(server + uid + "xkord", 1000);
		yCord = GM_getValue(server + uid + "ykord", 1000);
	} else {
		xCord = selVil.snapshotItem(0).textContent.replace("(", "");
		yCord = selVil.snapshotItem(2).textContent.replace(")", "");
	}
	
	var curD = document.location.href.match(/d=(\d+)&c/)[1];
	
	curD = id2xy(curD);
	
	merch_m = 1;
	troops_m = 1;
	
	if (loc.indexOf("speed") != -1) {
		merch_m = 3; // Merchants are 3 times faster
		troops_m = 2; // Troops are 2 times faster
	}
	
	var xDist = xCord - curD[0];
	var yDist = yCord - curD[1];
	var distance = Math.sqrt(xDist * xDist + yDist * yDist);
	
	//var text = 'Distance: <b>' + Math.round(distance) + '</b>   Tournament Square  <select id="ts_level" >';
	/*
	for(j=0;j<21;j++){
	text += '<option value=' + j + '> Level '+ j +' - '+ (100+j*10)+ ' %</option>';
	}
	
	text += '</select></br><table cellspacing="0" border="0"><thead>';
	 */
	var text = 'Distance: <b>' + Math.round(distance);
	text += '</br></br><table cellspacing="0" border="0"><thead>';
	// Calcula tempo de mercadores.
	merch_german = 3600 / (merchants[0] * merch_m);
	merch_gallic = 3600 / (merchants[1] * merch_m);
	merch_roman = 3600 / (merchants[2] * merch_m);
	
	time_german = Math.round(merch_german * distance);
	time_gallic = Math.round(merch_gallic * distance);
	time_roman = Math.round(merch_roman * distance);
	
	// Calcula tempo dos mercadores para os TEUTÕES.
	t_hh = parseInt(time_german / 3600);
	t_mm = parseInt((time_german / 60) % 60);
	t_ss = time_german % 60;
	
	// Se o tempo for igual a 1 casa decimal adiona-se um 0 na frente.
	if (t_hh < 10) {
		t_hh = "0" + t_hh;
	}
	if (t_mm < 10) {
		t_mm = "0" + t_mm;
	}
	if (t_ss < 10) {
		t_ss = "0" + t_ss;
	}
	
	// Calcula tempo dos mercadores para os GAULESES.
	g_hh = parseInt(time_gallic / 3600);
	g_mm = parseInt((time_gallic / 60) % 60);
	g_ss = time_gallic % 60;
	
	// Se o tempo for igual a 1 casa decimal adiona-se um 0 na frente.
	if (g_hh < 10) {
		g_hh = "0" + g_hh;
	}
	if (g_mm < 10) {
		g_mm = "0" + g_mm;
	}
	if (g_ss < 10) {
		g_ss = "0" + g_ss;
	}
	
	// Calcula tempo dos mercadores para os ROMANOS.
	r_hh = parseInt(time_roman / 3600);
	r_mm = parseInt((time_roman / 60) % 60);
	r_ss = time_roman % 60;
	
	// Se o tempo for igual a 1 casa decimal adiona-se um 0 na frente.
	if (r_hh < 10) {
		r_hh = "0" + r_hh;
	}
	if (r_mm < 10) {
		r_mm = "0" + r_mm;
	}
	if (r_ss < 10) {
		r_ss = "0" + r_ss;
	}
	
	// Monta tags HTML com os tempos para exibir no documento.
	text += '<tr><td width="90"><img src="img/x.gif" class="iReport iReport14"> ' + t_hh + ':' + t_mm + ':' + t_ss + '</td>';
	text += '<td  width="90"><img src="img/x.gif" class="iReport iReport14"> ' + g_hh + ':' + g_mm + ':' + g_ss + '</td>';
	text += '<td  width="80"><img src="img/x.gif" class="iReport iReport14"> ' + r_hh + ':' + r_mm + ':' + r_ss + '</td></tr>';
	
	f_dis = distance;
	r_dis = 0;
	
	if (distance > 30) {
		f_dis = 30;
		r_dis = distance - f_dis;
	}
	
	ts_speedup = (100 + ts_level * 10) / 100;
	
	for (j = 0; j < 10; j++) {
		spd_german_f = 3600 / (german_troops[j] * troops_m);
		spd_german_r = 3600 / (german_troops[j] * ts_speedup * troops_m);
		
		spd_gallic_f = 3600 / (gallic_troops[j] * troops_m);
		spd_gallic_r = 3600 / (gallic_troops[j] * ts_speedup * troops_m);
		
		spd_roman_f = 3600 / (roman_troops[j] * troops_m);
		spd_roman_r = 3600 / (roman_troops[j] * ts_speedup * troops_m);
		
		time_german = Math.round(spd_german_f * f_dis + spd_german_r * r_dis);
		time_gallic = Math.round(spd_gallic_f * f_dis + spd_gallic_r * r_dis);
		time_roman = Math.round(spd_roman_f * f_dis + spd_roman_r * r_dis);
		
		t_hh = parseInt(time_german / 3600);
		t_mm = parseInt((time_german / 60) % 60);
		t_ss = time_german % 60;
		
		if (t_hh < 10) {
			t_hh = "0" + t_hh;
		}
		if (t_mm < 10) {
			t_mm = "0" + t_mm;
		}
		if (t_ss < 10) {
			t_ss = "0" + t_ss;
		}
		
		g_hh = parseInt(time_gallic / 3600);
		g_mm = parseInt((time_gallic / 60) % 60);
		g_ss = time_gallic % 60;
		
		if (g_hh < 10) {
			g_hh = "0" + g_hh;
		}
		if (g_mm < 10) {
			g_mm = "0" + g_mm;
		}
		if (g_ss < 10) {
			g_ss = "0" + g_ss;
		}
		
		r_hh = parseInt(time_roman / 3600);
		r_mm = parseInt((time_roman / 60) % 60);
		r_ss = time_roman % 60;
		
		if (r_hh < 10) {
			r_hh = "0" + r_hh;
		}
		if (r_mm < 10) {
			r_mm = "0" + r_mm;
		}
		if (r_ss < 10) {
			r_ss = "0" + r_ss;
		}
		
		text += '<tr><td width="90"><img class="unit u' + (j + 11) + '" src="img/x.gif"> ' + t_hh + ':' + t_mm + ':' + t_ss + '</td>';
		text += '<td  width="90"><img class="unit u' + (j + 21) + '" src="img/x.gif"> ' + g_hh + ':' + g_mm + ':' + g_ss + '</td>';
		text += '<td  width="80"><img class="unit u' + (j + 1) + '" src="img/x.gif"> ' + r_hh + ':' + r_mm + ':' + r_ss + '</td></tr>';
	}
	
	text += '</thead>';
	
	Ttd.innerHTML = text;
	Ttd.style.fontSize = "10px";
	
	target.appendChild(Ttd);
	
	//level = document.getElementById("ts_level");
	//level.selectedIndex = GM_getValue("ts_level",0);
	//level.addEventListener("change", function () { reload(); }, false);
}

function getSelectedVillage() {
	var xpath = '//table[@id="vlist"]/tbody/tr[td/@class="dot hl"]/td[@class="aligned_coords"]/div';
	var anch = fastEval(xpath, document);
	var id = anch;
	//var id = anch.href.match(/=(\d+)/)[1];
	return anch;
}

function getCapital() {
	var xpath = '//td[@class="aligned_coords"]/div';
	var anch = fastEval(xpath, document);
	var id = anch;
	//var id = anch.href.match(/=(\d+)/)[1];
	return anch;
}

function id2xy(vid) {
	var arrXY = new Array;
	var ivid = parseInt(vid);
	arrXY[0] = (ivid % 801 ? (ivid % 801) - 401 : 400);
	arrXY[1] = 400 - (ivid - 401 - arrXY[0]) / 801;
	return arrXY;
}

function fastEval(xpath, context) {
	return document.evaluate(xpath, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function getPlayerUID() {
	var side = document.getElementById("side_navi");
	text = side.innerHTML;
	uid = text.substring(text.indexOf("uid=", 0) + 4, text.indexOf('">', text.indexOf("uid=", 0)));
	
	return uid;
}
 