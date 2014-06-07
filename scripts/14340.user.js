// ==UserScript==
// @name          Travian Report Analyser
// @autor         Ronny Garde
// @email         kb-parser@ronnygarde.de
// @version       1.0
// @namespace     http://kbparser.ronnygarde.de/
// @description   The script shows extented information for Travian reports.
// @include       http://*.travian.de/berichte.php?id=*
// @include       http://travian.de/berichte.php?id=*
// @include       http://*.travian.at/berichte.php?id=*
// @include       http://travian.at/berichte.php?id=*
// @include       http://*.travian.org/berichte.php?id=*
// @include       http://travian.org/berichte.php?id=*
// @include       http://*.travian.cz/berichte.php?id=*
// @include       http://travian.cz/berichte.php?id=*
// @include       http://*.travian.com/berichte.php?id=*
// @include       http://travian.com/berichte.php?id=*
// @include       http://*.travian.no/berichte.php?id=*
// @include       http://travian.no/berichte.php?id=*
// ==/UserScript==

roemer = new Array();
roemer[1] = new Array(40, 0, 35, 50, 120, 100, 180, 40, 280, 40);		/* Legionaer */
roemer[2] = new Array(30, 0, 65, 35, 100, 130, 160, 70, 308, 20);		/* Praetorianer */
roemer[3] = new Array(70, 0, 40, 25, 150, 160, 210, 80, 336, 50);		/* Imperianer */
roemer[4] = new Array(0, 0, 20, 10, 140, 160, 20, 40, 238, 0);			/* Equites Legati */
roemer[5] = new Array(0, 120, 65, 50, 550, 440, 320, 100, 462, 100);		/* Equites Imperatoris */
roemer[6] = new Array(0, 180, 80, 105, 550, 640, 800, 180, 616, 70);		/* Equites Caesaris */
roemer[7] = new Array(60, 0, 30, 75, 900, 360, 500, 70, 644, 0);		/* Rammbock */
roemer[8] = new Array(75, 0, 60, 10, 950, 1350, 600, 90, 1260, 0);		/* Feuerkatapult */
roemer[9] = new Array(50, 0, 40, 30, 30750, 27200, 4500, 37500, 12698, 0);	/* Sennator */
roemer[10] = new Array(0, 0, 80, 80, 5300, 5300, 7200, 5500, 3766, 3000);	/* Siedler */

germane = new Array();
germane[1] = new Array(40, 0, 20, 5, 95, 75, 40, 40, 122, 60);			/* Keulenschwinger */
germane[2] = new Array(10, 0, 35, 60, 145, 70, 85, 40, 189, 40);		/* Speerkaempfer */
germane[3] = new Array(60, 0, 30, 30, 130, 120, 170, 70, 203, 50);		/* Axtkaempfer */
germane[4] = new Array(0, 0, 10, 5, 160, 100, 50, 50, 189, 0);			/* Kundschaftler */
germane[5] = new Array(0, 55, 100, 40, 370, 270, 290, 75, 405, 110);		/* Paladin */
germane[6] = new Array(0, 150, 50, 75, 450, 515, 480, 80, 500, 80);		/* Teutonen Reiter */
germane[7] = new Array(65, 0, 30, 80, 1000, 300, 350, 70, 644, 0);		/* Ramme */
germane[8] = new Array(50, 0, 60, 10, 900, 1200, 600, 60, 1260, 0);		/* Katapult */
germane[9] = new Array(40, 0, 60, 40, 35500, 26600, 25000, 27200, 12698, 0);	/* Stammesfuehrer */
germane[10] = new Array(0, 10, 80, 80, 7200, 5500, 5800, 6500, 3766, 3000);	/* Siedler */

gallier = new Array();
gallier[1] = new Array(15, 0, 40, 50, 100, 130, 55, 30, 182, 30);		/* Phalanx */
gallier[2] = new Array(65, 0, 35, 20, 140, 150, 185, 60, 252, 45);		/* Schwertkaempfer */
gallier[3] = new Array(0, '0', 20, 10, 170, 150, 20, 40, 238, 0);		/* Spaeher */
gallier[4] = new Array(0, '90', 25, 40, 350, 450, 230, 60, 434, 75);		/* Theutates Blitz */
gallier[5] = new Array(0, '45', 115, 55, 360, 330, 280, 120, 448, 35);		/* Druidenreiter */
gallier[6] = new Array(0, '140', 50, 165, 500, 620, 675, 170, 546, 65);		/* Headuaner */
gallier[7] = new Array(50, 0, 30, 105, 950, 555, 330, 75, 700, 0);		/* Rammholz */
gallier[8] = new Array(70, 0, 45, 10, 960, 1450, 630, 90, 1260, 0);		/* Kriegskatapult */
gallier[9] = new Array(40, 0, 50, 50, 30750, 45400, 31000, 37500, 90660, 0);	/* Haeuptling */
gallier[10] = new Array(0, 0, 80, 80, 5500, 7000, 5300, 4900, 3766, 3000);	/* Siedler */

natur = new Array();
natur[1] = new Array(10, 0, 25, 10, 0, 0, 0, 0, 0, 0);				/* Ratte */
natur[2] = new Array(20, 0, 35, 40, 0, 0, 0, 0, 0, 0);				/* Spinne */
natur[3] = new Array(60, 0, 40, 60, 0, 0, 0, 0, 0, 0);				/* Schlange */
natur[4] = new Array(80, 0, 66, 50, 0, 0, 0, 0, 0, 0);				/* Fledermaus */
natur[5] = new Array(50, 0, 70, 33, 0, 0, 0, 0, 0, 0);				/* Wildschwein */
natur[6] = new Array(100, 0, 80, 70, 0, 0, 0, 0, 0, 0);				/* Wolf */
natur[7] = new Array(250, 0, 140,200 , 0, 0, 0, 0, 0, 0);			/* Baer */
natur[8] = new Array(450, 0, 380, 240, 0, 0, 0, 0, 0, 0);			/* Krokodil */
natur[9] = new Array(200, 0, 170, 250, 0, 0, 0, 0, 0, 0);;			/* Tiger */
natur[10] = new Array(600, 0, 440, 520, 0, 0, 0, 0, 0, 0);			/* Elefant */

sprache = window.location.href.match(/(Travian)(\.[a-zA-Z]*)/i);
sprachdatei = new Array();
sprachdatei2 = new Array();

if(sprache[2]) {
	switch (sprache[2]){
			// Deutsch - German (100% / 100%)
			case ".de":
			case ".org":
			case ".at":
			sprachdatei=["greift", "um", "aus Dorf", "am", "Beute", "Info"];
			sprachdatei2=["Statistik", "Angreifer", "Verteidiger", "Verluste", "Einheiten", "Angriff", "Inf.", "Kav.", "Verteidigung", "Verlust", "Holz", "Lehm", "Eisen", "Getreide", "Gesamt", "Bauzeit", "Tragekapazität", "Actions", "Info", "Bericht speichern", "Password", "Tage", "Std."];
			break;
			// Česky - Czech (100% / 100%)
			case ".cz":
			sprachdatei=["zaútočil", "v", "z", "dne", "Kořist", "Info"];
			sprachdatei2=["Statistiky", "Útočník", "Obránce", "Ztráty", "Jednotky", "Útok", "Pěch.", "Jiz.", "Obrana", "Ztráta", "Dřevo", "Hlína", "Železo", "Obilí", "Celkem", "Doba stavby", "Zisk", "Akce", "Info", "Uložit hlášení", "Heslo", "Dní", "h"];
			break;
			// English - English (100% / 100%)
			case ".com":
			sprachdatei=["attacks", "at", "from the village", "on", "Bounty", "Info"];
			sprachdatei2=["Statistics", "Attacker", "Defender", "Casualties", "Troops", "Attack", "Inf.", "Cav.", "Defense", "Casualties", "Wood", "Clay", "Iron", "Crop", "Total", "Building time", "Bounty", "Actions", "Info", "Save Report", "Passwort", "Days", "h"];
			break;
			// Norsk - Norwegian (100% / 20%)
			case ".no":
			sprachdatei=["angriper", "ved", "Fra landsbyen.", "på", "Bytte", "Informasjon"];
			sprachdatei2=["xStatistics", "xAttacker", "xDefender", "xCasualties", "xTroops", "xAttack", "Inf.", "Kav.", "xDefense", "xCasualties", "Tømmer", "Leire", "Jern", "Korn", "xTotal", "xBuilding time", "xBounty", "xActions", "xInfo", "xSave Report", "xPasswort", "xDays", "xh"];
			break;
	}
}

function bauzeit(seconds) {
	var days  = parseInt(seconds / (60 * 60 * 24));
	var seconds  = seconds % (60 * 60 * 24);
	var hours = parseInt(seconds / (60 * 60));
	var seconds  = seconds % (60 * 60);
	var mins  = parseInt(seconds / 60);
	var secs = parseInt(seconds % 60);

	if(!days) var days = "0";
	if(!hours) var hours = "00";
	if(!mins) var mins = "00";
	if(!secs) var secs = "00";
	if(hours.lenght == "1") hours = "0"+hours;
	if(mins.lenght == "1") mins = "0"+mins;
	if(secs.lenght == "1") secs = "0"+secs;

	return days+" "+sprachdatei2[21]+", "+hours+":"+mins+":"+secs;
}

function berichtsart(art) {
	var regex = "^.{1,20} ("+sprachdatei[0]+") .{1,20}";
	var bericht = parsetab.snapshotItem(0).getElementsByTagName("tr")[0].getElementsByTagName("td")[1].textContent.match(regex);
	
	if(art == 'kampfbericht' && RegExp.$1 == sprachdatei[0]) { return true; }
}

function infos_allgemein() {
	var regex = "^"+sprachdatei[3]+" (.{1,2}\..{1,2}\..{1,2}) "+sprachdatei[1]+" (.{1,2}:.{1,2}:.{1,2})";
	var datum_uhrzeit = parsetab.snapshotItem(0).getElementsByTagName("tr")[1].getElementsByTagName("td")[1].textContent.match(regex);
	
	if(datum_uhrzeit) datum = RegExp.$1; uhrzeit = RegExp.$2;
}

function infos_angreifer() {
	var regex = "(.{1,15}) "+sprachdatei[5]+" (.{1,20})";
	var angreifer = parsetab.snapshotItem(1).getElementsByTagName("tr")[0].getElementsByTagName("td")[1].textContent.match(regex);
	
	// Name, Dorf
	if(angreifer) a_name = RegExp.$1; a_dorf = RegExp.$2;
	
	// Held
	if(parsetab.snapshotItem(1).getElementsByTagName("tr")[1].innerHTML.indexOf("hero") != -1) { a_held = 1; } else { a_held = 0; }
	
	// Volk
	if(parsetab.snapshotItem(1).getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML.indexOf("u/1.gif") > 0) a_volk = 1;
	if(parsetab.snapshotItem(1).getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML.indexOf("u/11.gif") > 0) a_volk = 2;
	if(parsetab.snapshotItem(1).getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML.indexOf("u/21.gif") > 0) a_volk = 3;
	if(!a_volk) { a_volk = 0; }
	
	// Einheiten
	for(var i=1; i <= 10+a_held; i++) {
		a_einheiten[i] = parsetab.snapshotItem(1).getElementsByTagName("tr")[2].getElementsByTagName("td")[i].textContent;
		a_einheiten[i] = parseInt(a_einheiten[i]);
	}
	at = a_einheiten[1]+a_einheiten[2]+a_einheiten[3]+a_einheiten[4]+a_einheiten[5]+a_einheiten[6]+a_einheiten[7]+a_einheiten[8]+a_einheiten[9]+a_einheiten[10];
	if(a_einheiten[11]) { at += a_einheiten[11]; }
	
	// Verluste
	for(var i=1; i <= 10+a_held; i++) {
		a_verluste[i] = parsetab.snapshotItem(1).getElementsByTagName("tr")[3].getElementsByTagName("td")[i].textContent;
		a_verluste[i] = parseInt(a_verluste[i]);
	}
	av = a_verluste[1]+a_verluste[2]+a_verluste[3]+a_verluste[4]+a_verluste[5]+a_verluste[6]+a_verluste[7]+a_verluste[8]+a_verluste[9]+a_verluste[10];
	if(a_verluste[11]) { av += a_verluste[11]; }
	
	// Differenz
	for(var i=1; i <= 10+a_held; i++) {
		a_danach[i] = a_einheiten[i] - a_verluste[i];
		a_danach[i] = parseInt(a_danach[i]);
	} 

	// Beute + Infos
	find_beute = document.evaluate("//table[@class='tbg']//table[@class='tbg'][position() = 1]/tbody/tr", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	beute = "0 0 0 0"; info = 0;
	for(var i=4; i < find_beute.snapshotLength; i++) {
	  if(find_beute.snapshotItem(i).getElementsByTagName("td")[0].textContent == sprachdatei[4]) {
	    beute = find_beute.snapshotItem(i).getElementsByTagName("td")[1].textContent.split(" ");
		beute[0] = parseInt(beute[0]);
		beute[1] = parseInt(beute[1]);
		beute[2] = parseInt(beute[2]);
		beute[3] = parseInt(beute[3]);
	  }
	  if(find_beute.snapshotItem(i).getElementsByTagName("td")[0].textContent == sprachdatei[5]) {
	    info += "-"+find_beute.snapshotItem(i).getElementsByTagName("td")[1].textContent;
	  }
	}
	if(typeof(beute[0]) != "number") { beute = new Array(); beute[0] = 0; beute[1] = 0; beute[2] = 0; beute[3] = 0; }
}

function infos_verteidiger() {
	var regex = "(.{1,15}) "+sprachdatei[5]+" (.{1,20})";
	var verteidiger = parsetab.snapshotItem(2).getElementsByTagName("tr")[0].getElementsByTagName("td")[1].textContent.match(regex);
	
	// Name, Dorf
	if(verteidiger) v_name = RegExp.$1; v_dorf = RegExp.$2;
	
	// Held
	if(parsetab.snapshotItem(2).getElementsByTagName("tr")[1].innerHTML.indexOf("hero") != -1) { v_held = 1; } else { v_held = 0; }
	
	// Volk
	if(parsetab.snapshotItem(2).getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML.indexOf("u/1.gif") > 0) v_volk = 1;
	if(parsetab.snapshotItem(2).getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML.indexOf("u/11.gif") > 0) v_volk = 2;
	if(parsetab.snapshotItem(2).getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML.indexOf("u/21.gif") > 0) v_volk = 3;
	if(parsetab.snapshotItem(2).getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML.indexOf("u/31.gif") > 0) v_volk = 4;
	if(!v_volk) { v_volk = 0; }
	
	// Einheiten
	for(var i=1; i <= 10+v_held; i++) {
		v_einheiten[i] = parsetab.snapshotItem(2).getElementsByTagName("tr")[2].getElementsByTagName("td")[i].textContent;
		v_einheiten[i] = parseInt(v_einheiten[i]);
	}
	vt = v_einheiten[1]+v_einheiten[2]+v_einheiten[3]+v_einheiten[4]+v_einheiten[5]+v_einheiten[6]+v_einheiten[7]+v_einheiten[8]+v_einheiten[9]+v_einheiten[10];
	if(v_einheiten[11]) { vt += v_einheiten[11]; }
	
	// Verluste
	for(var i=1; i <= 10+v_held; i++) {
		v_verluste[i] = parsetab.snapshotItem(2).getElementsByTagName("tr")[3].getElementsByTagName("td")[i].textContent;
		v_verluste[i] = parseInt(v_verluste[i]);
	}
	vv = v_verluste[1]+v_verluste[2]+v_verluste[3]+v_verluste[4]+v_verluste[5]+v_verluste[6]+v_verluste[7]+v_verluste[8]+v_verluste[9]+v_verluste[10];
	if(v_verluste[11]) { vv += v_verluste[11]; }
}

function infos_verteidiger2(check_only) {
	if(parsetab.snapshotItem(3)) {
		if(check_only == 0) {
		// Held
		if(parsetab.snapshotItem(3).getElementsByTagName("tr")[1].innerHTML.indexOf("hero") != -1) { v2_held = 1; } else { v2_held = 0; }
	
		// Volk
		if(parsetab.snapshotItem(3).getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML.indexOf("u/1.gif") > 0) v2_volk = 1;
		if(parsetab.snapshotItem(3).getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML.indexOf("u/11.gif") > 0) v2_volk = 2;
		if(parsetab.snapshotItem(3).getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML.indexOf("u/21.gif") > 0) v2_volk = 3;
		if(parsetab.snapshotItem(3).getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML.indexOf("u/31.gif") > 0) v2_volk = 4;
		if(!v2_volk) { v2_volk = 0; }
	
		// Einheiten
		for(var i=1; i <= 10+v2_held; i++) {
			v2_einheiten[i] = parsetab.snapshotItem(3).getElementsByTagName("tr")[2].getElementsByTagName("td")[i].textContent;
			v2_einheiten[i] = parseInt(v2_einheiten[i]);
		}
		vt2 = v2_einheiten[1]+v2_einheiten[2]+v2_einheiten[3]+v2_einheiten[4]+v2_einheiten[5]+v2_einheiten[6]+v2_einheiten[7]+v2_einheiten[8]+v2_einheiten[9]+v2_einheiten[10];
		if(v2_einheiten[11]) { vt2 += v2_einheiten[11]; }
	
		// Verluste
		for(var i=1; i <= 10+v2_held; i++) {
			v2_verluste[i] = parsetab.snapshotItem(3).getElementsByTagName("tr")[3].getElementsByTagName("td")[i].textContent;
			v2_verluste[i] = parseInt(v2_verluste[i]);
		}
		vv2 = v2_verluste[1]+v2_verluste[2]+v2_verluste[3]+v2_verluste[4]+v2_verluste[5]+v2_verluste[6]+v2_verluste[7]+v2_verluste[8]+v2_verluste[9]+v2_verluste[10];
		if(v2_verluste[11]) { vv2 += v2_verluste[11]; }
		}

        return true; 
        } else { return false; }
}

function infos_verteidiger3(check_only) {
	if(parsetab.snapshotItem(4)) {
		if(check_only == 0) {	
		// Held
		if(parsetab.snapshotItem(4).getElementsByTagName("tr")[1].innerHTML.indexOf("hero") != -1) { v3_held = 1; } else { v3_held = 0; }
	
		// Volk
		if(parsetab.snapshotItem(4).getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML.indexOf("u/1.gif") > 0) v3_volk = 1;
		if(parsetab.snapshotItem(4).getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML.indexOf("u/11.gif") > 0) v3_volk = 2;
		if(parsetab.snapshotItem(4).getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML.indexOf("u/21.gif") > 0) v3_volk = 3;
		if(parsetab.snapshotItem(4).getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML.indexOf("u/31.gif") > 0) v3_volk = 4;
		if(!v3_volk) { v3_volk = 0; }
	
		// Einheiten
		for(var i=1; i <= 10+v3_held; i++) {
			v3_einheiten[i] = parsetab.snapshotItem(4).getElementsByTagName("tr")[2].getElementsByTagName("td")[i].textContent;
			v3_einheiten[i] = parseInt(v3_einheiten[i]);
		}
		vt3 = v3_einheiten[1]+v3_einheiten[2]+v3_einheiten[3]+v3_einheiten[4]+v3_einheiten[5]+v3_einheiten[6]+v3_einheiten[7]+v3_einheiten[8]+v3_einheiten[9]+v3_einheiten[10];
		if(v3_einheiten[11]) { vt3 += v3_einheiten[11]; }
	
		// Verluste
		for(var i=1; i <= 10+v3_held; i++) {
			v3_verluste[i] = parsetab.snapshotItem(4).getElementsByTagName("tr")[3].getElementsByTagName("td")[i].textContent;
			v3_verluste[i] = parseInt(v3_verluste[i]);
		}
		vv3 = v3_verluste[1]+v3_verluste[2]+v3_verluste[3]+v3_verluste[4]+v3_verluste[5]+v3_verluste[6]+v3_verluste[7]+v3_verluste[8]+v3_verluste[9]+v3_verluste[10];
		if(v3_verluste[11]) { vv3 += v3_verluste[11]; }
		}

        return true; 
        } else { return false; }
}

function statistik(stat, volk, einheiten) {
	var result1,result2,result3,result4,result5,result6,result7,result8,result9,result10;
	var tstat;

	if(stat == 'AInf') { tstat = 0; }
	if(stat == 'AKav') { tstat = 1; }
	if(stat == 'VInf') { tstat = 2; }
	if(stat == 'VKav') { tstat = 3; }
	if(stat == 'Holz') { tstat = 4; }
	if(stat == 'Lehm') { tstat = 5; }
	if(stat == 'Eisen') { tstat = 6; }
	if(stat == 'Getreide') { tstat = 7; }
	if(stat == 'Bauzeit') { tstat = 8; }
	if(stat == 'Tragekapa') { tstat = 9; }

	switch (volk){
		case 1:volk=roemer;break;
		case 2:volk=germane;break;
		case 3:volk=gallier;break;
		case 4:volk=natur;break;
		default:volk=null;break;	
	}
	
	switch (einheiten){
		case 1:einh=a_einheiten;break;
		case 2:einh=a_verluste;break;
		case 3:einh=v_einheiten;break;
		case 4:einh=v_verluste;break;
		case 5:einh=a_danach;break;
		case 6:einh=v2_einheiten;break;
		case 7:einh=v2_verluste;break;
		case 8:einh=v3_einheiten;break;
		case 9:einh=v3_verluste;break;
		default:einh=null;break;
	}
	
	result1 = volk[1][tstat]*einh[1];
	result2 = volk[2][tstat]*einh[2];
	result3 = volk[3][tstat]*einh[3];
	result4 = volk[4][tstat]*einh[4];
	result5 = volk[5][tstat]*einh[5];
	result6 = volk[6][tstat]*einh[6];
	result7 = volk[7][tstat]*einh[7];
	result8 = volk[8][tstat]*einh[8];
	result9 = volk[9][tstat]*einh[9];
	result10 = volk[10][tstat]*einh[10];

	return parseInt(result1+result2+result3+result4+result5+result6+result7+result8+result9+result10);
}

function createTable(volk1, volk2, v1t, v1v, v2t, v2v, img_v1, img_v2, text1, text2, row513) {
	if(row513 == 1) { var n1 = 2; var n2 = 4; var n3 = 3; var n4 = 3; } else { var n1 = 7; var n2 = 9; var n3 = 6; var n4 = 8; }

	// Tabelle erstellen
	var p = document.createElement("p");
	if(row513 == 1) {
	var formu = document.createElement("form");
		formu.setAttribute("action", "http://daemon.ronnygarde.de/KB_Parser1.0/kb_extern.php");
		formu.setAttribute("method", "post");
		formu.setAttribute("target", "iframee");
	}
	var table = document.createElement("table");
		table.setAttribute("cellspacing", "1");
		table.setAttribute("cellpadding", "2");
		table.className = "tbg";

	var tbody = document.createElement("tbody");

	/* ROW 1 */

	var row1 = document.createElement("tr");
		row1.className = "cbg1";
	var cell1 = document.createElement("td");
		cell1.className = "c1 b";
		cell1.setAttribute("colspan", "3");
		cell1.appendChild(document.createTextNode(sprachdatei2[0]));
	
	row1.appendChild(cell1);

	/* ROW 2 */
	
	var row2 = document.createElement("tr");

	var cell1 = document.createElement("td");
		cell1.appendChild(document.createTextNode(" "));
	
	var cell2 = document.createElement("td");
		if(row513 == 1) { cell2.className = "c2 b"; } else { cell2.className = "c1 b"; }
		cell2.appendChild(document.createTextNode(text1));
	
	var cell3 = document.createElement("td");
		cell3.className = "c1 b";
		cell3.appendChild(document.createTextNode(text2));
	
	row2.appendChild(cell1);
	row2.appendChild(cell2);
	row2.appendChild(cell3);

	/* ROW 3 */
	
	var row3 = document.createElement("tr");

	var cell1 = document.createElement("td");
		cell1.appendChild(document.createTextNode(sprachdatei2[3]));
	
	var cell2 = document.createElement("td");
		img = document.createElement("img");
			img.setAttribute("src", "http://daemon.ronnygarde.de/KB_Parser1.0/img.php?r="+img_v1+"&p="+img_v1);
		cell2.appendChild(img);
	
	var cell3 = document.createElement("td");
		img = document.createElement("img");
			img.setAttribute("src", "http://daemon.ronnygarde.de/KB_Parser1.0/img.php?r="+img_v2+"&p="+img_v2);
		cell3.appendChild(img);
	
	row3.appendChild(cell1);
	row3.appendChild(cell2);
	row3.appendChild(cell3);

	/* ROW 4 */
	
	var row4 = document.createElement("tr");

	var cell1 = document.createElement("td");
		cell1.appendChild(document.createTextNode(sprachdatei2[3]+" / "+sprachdatei2[4]));
	
	var cell2 = document.createElement("td");
		cell2.appendChild(document.createTextNode(v1v+" / "+v1t));
	
	var cell3 = document.createElement("td");
		cell3.appendChild(document.createTextNode(v2v+" / "+v2t));
	
	row4.appendChild(cell1);
	row4.appendChild(cell2);
	row4.appendChild(cell3);

	/* ROW 5 */
	
	if(row513 == 1) {
	var row5 = document.createElement("tr");

	var cell1 = document.createElement("td");
		cell1.appendChild(document.createTextNode(sprachdatei2[5]+" ("+sprachdatei2[6]+" / "+sprachdatei2[7]+") "));
		img = document.createElement("img");
			img.setAttribute("src", "img/un/a/att_all.gif");
			img.setAttribute("title", "Angriff");
		cell1.appendChild(img);
	
	var cell2 = document.createElement("td");
		cell2.appendChild(document.createTextNode(statistik("AInf", volk1, 1)+" / "+statistik("AKav", volk1, 1)));
	
	var cell3 = document.createElement("td");
		cell3.appendChild(document.createTextNode("- / -"));
	
	row5.appendChild(cell1);
	row5.appendChild(cell2);
	row5.appendChild(cell3);
	}

	/* ROW 6 */
	
	var row6 = document.createElement("tr");

	var cell1 = document.createElement("td");
		cell1.appendChild(document.createTextNode(sprachdatei2[8]+" ("));
		img = document.createElement("img");
			img.setAttribute("src", "img/un/a/def_i.gif");
			img.setAttribute("title", "Infantrie");
		cell1.appendChild(img);
		cell1.appendChild(document.createTextNode(" / "));
		img = document.createElement("img");
			img.setAttribute("src", "img/un/a/def_c.gif");
			img.setAttribute("title", "Kavallarie");
		cell1.appendChild(img);
		cell1.appendChild(document.createTextNode(")"));
	
	var cell2 = document.createElement("td");
		if(row513 == 1) { cell2.appendChild(document.createTextNode("- / -")); }
		if(row513 == 0) { cell2.appendChild(document.createTextNode(statistik("VInf", volk2, n3)+" / "+statistik("VKav", volk2, n3))); }
	
	var cell3 = document.createElement("td");
		cell3.appendChild(document.createTextNode(statistik("VInf", volk2, n4)+" / "+statistik("VKav", volk2, n4)));
	
	row6.appendChild(cell1);
	row6.appendChild(cell2);
	row6.appendChild(cell3);

	/* ROW 7 */
	
	var row7 = document.createElement("tr");

	var cell1 = document.createElement("td");
		cell1.appendChild(document.createTextNode(sprachdatei2[3]+" "));
		img = document.createElement("img");
			img.setAttribute("src", "img/un/r/1.gif");
			img.setAttribute("title", sprachdatei2[10]);
		cell1.appendChild(img);
	
	var cell2 = document.createElement("td");
		cell2.appendChild(document.createTextNode(statistik("Holz", volk1, n1)));
	
	var cell3 = document.createElement("td");
		cell3.appendChild(document.createTextNode(statistik("Holz", volk2, n2)));
	
	row7.appendChild(cell1);
	row7.appendChild(cell2);
	row7.appendChild(cell3);

	/* ROW 8 */
	
	var row8 = document.createElement("tr");

	var cell1 = document.createElement("td");
		cell1.appendChild(document.createTextNode(sprachdatei2[3]+" "));
		img = document.createElement("img");
			img.setAttribute("src", "img/un/r/2.gif");
			img.setAttribute("title", sprachdatei2[11]);
		cell1.appendChild(img);
	
	var cell2 = document.createElement("td");
		cell2.appendChild(document.createTextNode(statistik("Lehm", volk1, n1)));
	
	var cell3 = document.createElement("td");
		cell3.appendChild(document.createTextNode(statistik("Lehm", volk2, n2)));
	
	row8.appendChild(cell1);
	row8.appendChild(cell2);
	row8.appendChild(cell3);

	/* ROW 9 */
	
	var row9 = document.createElement("tr");

	var cell1 = document.createElement("td");
		cell1.appendChild(document.createTextNode(sprachdatei2[3]+" "));
		img = document.createElement("img");
			img.setAttribute("src", "img/un/r/3.gif");
			img.setAttribute("title", sprachdatei2[12]);
		cell1.appendChild(img);
	
	var cell2 = document.createElement("td");
		cell2.appendChild(document.createTextNode(statistik("Eisen", volk1, n1)));
	
	var cell3 = document.createElement("td");
		cell3.appendChild(document.createTextNode(statistik("Eisen", volk2, n2)));
	
	row9.appendChild(cell1);
	row9.appendChild(cell2);
	row9.appendChild(cell3);

	/* ROW 10 */
	
	var row10 = document.createElement("tr");

	var cell1 = document.createElement("td");
		cell1.appendChild(document.createTextNode(sprachdatei2[3]+" "));
		img = document.createElement("img");
			img.setAttribute("src", "img/un/r/4.gif");
			img.setAttribute("title", sprachdatei2[13]);
		cell1.appendChild(img);
	
	var cell2 = document.createElement("td");
		cell2.appendChild(document.createTextNode(statistik("Getreide", volk1, n1)));
	
	var cell3 = document.createElement("td");
		cell3.appendChild(document.createTextNode(statistik("Getreide", volk2, n2)));
	
	row10.appendChild(cell1);
	row10.appendChild(cell2);
	row10.appendChild(cell3);

	/* ROW 11 */
	
	var row11 = document.createElement("tr");

	var cell1 = document.createElement("td");
		cell1.appendChild(document.createTextNode(sprachdatei2[3]+" "));
		img = document.createElement("img");
			img.setAttribute("src", "img/un/r/1.gif");
			img.setAttribute("title", sprachdatei2[10]);
		cell1.appendChild(img);
		img = document.createElement("img");
			img.setAttribute("src", "img/un/r/2.gif");
			img.setAttribute("title", sprachdatei2[11]);
		cell1.appendChild(img);
		img = document.createElement("img");
			img.setAttribute("src", "img/un/r/3.gif");
			img.setAttribute("title", sprachdatei2[12]);
		cell1.appendChild(img);
		img = document.createElement("img");
			img.setAttribute("src", "img/un/r/4.gif");
			img.setAttribute("title", sprachdatei2[13]);
		cell1.appendChild(img);
	
	var cell2 = document.createElement("td");
		cell2.appendChild(document.createTextNode(statistik("Holz", volk1, n1)+statistik("Lehm", volk1, n1)+statistik("Eisen", volk1, n1)+statistik("Getreide", volk1, n1)));
	
	var cell3 = document.createElement("td");
		cell3.appendChild(document.createTextNode(statistik("Holz", volk2, n2)+statistik("Lehm", volk2, n2)+statistik("Eisen", volk2, n2)+statistik("Getreide", volk2, n2)));
	
	row11.appendChild(cell1);
	row11.appendChild(cell2);
	row11.appendChild(cell3);

	/* ROW 12 */
	
	var row12 = document.createElement("tr");

	var cell1 = document.createElement("td");
		cell1.appendChild(document.createTextNode(sprachdatei2[15]));
	
	var cell2 = document.createElement("td");
		cell2.appendChild(document.createTextNode(bauzeit(statistik("Bauzeit", volk1, n1))+" "+sprachdatei2[22]));
	
	var cell3 = document.createElement("td");
		cell3.appendChild(document.createTextNode(bauzeit(statistik("Bauzeit", volk2, n2))+" "+sprachdatei2[22]));
	
	row12.appendChild(cell1);
	row12.appendChild(cell2);
	row12.appendChild(cell3);
	
	if(row513 == 1) {
	
	/* ROW 13 */
	
	var row13 = document.createElement("tr");

	var cell1 = document.createElement("td");
		cell1.appendChild(document.createTextNode(sprachdatei2[16]));
	
	var cell2 = document.createElement("td");
		cell2.appendChild(document.createTextNode(beute[0]+beute[1]+beute[2]+beute[3]+" / "+statistik("Tragekapa", volk1, 5)));
	
	var cell3 = document.createElement("td");
		cell3.appendChild(document.createTextNode("- / -"));
	
	row13.appendChild(cell1);
	row13.appendChild(cell2);
	row13.appendChild(cell3);
	
	/* ROW 14 */
	
	var row14 = document.createElement("tr");

	var cell1 = document.createElement("td");
		cell1.appendChild(document.createTextNode(sprachdatei2[17]));
	
	var cell2 = document.createElement("td");
		cell2.setAttribute("colspan", "2");
		submit = document.createElement("input");
			submit.setAttribute("type", "submit");
			submit.setAttribute("value", sprachdatei2[19]);
			submit.setAttribute("style", "border:1px #999999 solid;");
		cell2.appendChild(submit);
		
		cell2.appendChild(document.createTextNode(" ["+sprachdatei2[20]+": "));
		input = document.createElement("input");
			input.setAttribute("type", "text");
			input.setAttribute("name", "PW");
			input.setAttribute("style", "width:70px; border:1px #999999 solid;");
		cell2.appendChild(input);
		cell2.appendChild(document.createTextNode("]"));
	
	row14.appendChild(cell1);
	row14.appendChild(cell2);
	
	/* ROW 15 */
	
	var row15 = document.createElement("tr");

	var cell1 = document.createElement("td");
		cell1.appendChild(document.createTextNode(sprachdatei2[18]));
	
	var cell2 = document.createElement("td");
		cell2.setAttribute("style", "padding: 1px; margin-left: 2px; text-align: left;");
		cell2.setAttribute("colspan", "2");
		cell2.setAttribute("id", "td_info");
		var iframe = document.createElement("iframe");
			iframe.setAttribute("name", "iframee");
			iframe.setAttribute("frameborder", "0");
			iframe.setAttribute("width", "330");
			iframe.setAttribute("height", "20");
		cell2.appendChild(iframe);
	
	row15.appendChild(cell1);
	row15.appendChild(cell2);
	}
	/* Hidden-Buttons */
	
	if(row513 == 1) {
	button1 = document.createElement("input");
		button1.setAttribute("type", "hidden");
		button1.setAttribute("name", "art");
		if(berichtsart('kampfbericht')) { button1.setAttribute("value", "1"); } else { button1.setAttribute("value", "2"); }
		
	button2 = document.createElement("input");
		button2.setAttribute("type", "hidden");
		button2.setAttribute("name", "duu");
		button2.setAttribute("value", datum+"|"+uhrzeit+"|"+sprache[2]);
		
	button3 = document.createElement("input");
		button3.setAttribute("type", "hidden");
		button3.setAttribute("name", "aName");
		button3.setAttribute("value", a_name);
		
	button4 = document.createElement("input");
		button4.setAttribute("type", "hidden");
		button4.setAttribute("name", "aDorf");
		button4.setAttribute("value", a_dorf);
		
	button5 = document.createElement("input");
		button5.setAttribute("type", "hidden");
		button5.setAttribute("name", "aVolk");
		button5.setAttribute("value", a_volk);
		
	button6 = document.createElement("input");
		button6.setAttribute("type", "hidden");
		button6.setAttribute("name", "aEinheiten");
		button6.setAttribute("value", a_einheiten[1]+"|"+a_einheiten[2]+"|"+a_einheiten[3]+"|"+a_einheiten[4]+"|"+a_einheiten[5]+"|"+a_einheiten[6]+"|"+a_einheiten[7]+"|"+a_einheiten[8]+"|"+a_einheiten[9]+"|"+a_einheiten[10]+"|"+a_einheiten[11]);
		
	button7 = document.createElement("input");
		button7.setAttribute("type", "hidden");
		button7.setAttribute("name", "aVerluste");
		button7.setAttribute("value", a_verluste[1]+"|"+a_verluste[2]+"|"+a_verluste[3]+"|"+a_verluste[4]+"|"+a_verluste[5]+"|"+a_verluste[6]+"|"+a_verluste[7]+"|"+a_verluste[8]+"|"+a_verluste[9]+"|"+a_verluste[10]+"|"+a_verluste[11]);
		
	button8 = document.createElement("input");
		button8.setAttribute("type", "hidden");
		button8.setAttribute("name", "aBeute");
		button8.setAttribute("value", beute[0]+"|"+beute[1]+"|"+beute[2]+"|"+beute[3]);
		
	button9 = document.createElement("input");
		button9.setAttribute("type", "hidden");
		button9.setAttribute("name", "aInfos");
		button9.setAttribute("value", info);
		
	button10 = document.createElement("input");
		button10.setAttribute("type", "hidden");
		button10.setAttribute("name", "vName");
		button10.setAttribute("value", v_name);
		
	button11 = document.createElement("input");
		button11.setAttribute("type", "hidden");
		button11.setAttribute("name", "vDorf");
		button11.setAttribute("value", v_dorf);
		
	button12 = document.createElement("input");
		button12.setAttribute("type", "hidden");
		button12.setAttribute("name", "vVolk");
		button12.setAttribute("value", v_volk);
		
	button13 = document.createElement("input");
		button13.setAttribute("type", "hidden");
		button13.setAttribute("name", "vEinheiten");
		button13.setAttribute("value", v_einheiten[1]+"|"+v_einheiten[2]+"|"+v_einheiten[3]+"|"+v_einheiten[4]+"|"+v_einheiten[5]+"|"+v_einheiten[6]+"|"+v_einheiten[7]+"|"+v_einheiten[8]+"|"+v_einheiten[9]+"|"+v_einheiten[10]+"|"+v_einheiten[11]);
		
	button14 = document.createElement("input");
		button14.setAttribute("type", "hidden");
		button14.setAttribute("name", "vVerluste");
		button14.setAttribute("value", v_verluste[1]+"|"+v_verluste[2]+"|"+v_verluste[3]+"|"+v_verluste[4]+"|"+v_verluste[5]+"|"+v_verluste[6]+"|"+v_verluste[7]+"|"+v_verluste[8]+"|"+v_verluste[9]+"|"+v_verluste[10]+"|"+v_verluste[11]);
		
	if(infos_verteidiger2(1)) {
	button15 = document.createElement("input");
		button15.setAttribute("type", "hidden");
		button15.setAttribute("name", "v2Volk");
		button15.setAttribute("value", v2_volk);
		
	button16 = document.createElement("input");
		button16.setAttribute("type", "hidden");
		button16.setAttribute("name", "v2Einheiten");
		button16.setAttribute("value", v2_einheiten[1]+"|"+v2_einheiten[2]+"|"+v2_einheiten[3]+"|"+v2_einheiten[4]+"|"+v2_einheiten[5]+"|"+v2_einheiten[6]+"|"+v2_einheiten[7]+"|"+v2_einheiten[8]+"|"+v2_einheiten[9]+"|"+v2_einheiten[10]+"|"+v2_einheiten[11]+"|");
		
	button17 = document.createElement("input");
		button17.setAttribute("type", "hidden");
		button17.setAttribute("name", "v2Verluste");
		button17.setAttribute("value", v2_verluste[1]+"|"+v2_verluste[2]+"|"+v2_verluste[3]+"|"+v2_verluste[4]+"|"+v2_verluste[5]+"|"+v2_verluste[6]+"|"+v2_verluste[7]+"|"+v2_verluste[8]+"|"+v2_verluste[9]+"|"+v2_verluste[10]+"|"+v2_verluste[11]+"|");
	}
		
	if(v3_isset == 1) {
	button18 = document.createElement("input");
		button18.setAttribute("type", "hidden");
		button18.setAttribute("name", "v3Volk");
		button18.setAttribute("value", v3_volk);
		
	button19 = document.createElement("input");
		button19.setAttribute("type", "hidden");
		button19.setAttribute("name", "v3Einheiten");
		button19.setAttribute("value", v3_einheiten[1]+"|"+v3_einheiten[2]+"|"+v3_einheiten[3]+"|"+v3_einheiten[4]+"|"+v3_einheiten[5]+"|"+v3_einheiten[6]+"|"+v3_einheiten[7]+"|"+v3_einheiten[8]+"|"+v3_einheiten[9]+"|"+v3_einheiten[10]+"|"+v3_einheiten[11]+"|");
		
	button20 = document.createElement("input");
		button20.setAttribute("type", "hidden");
		button20.setAttribute("name", "v3Verluste");
		button20.setAttribute("value", v3_verluste[1]+"|"+v3_verluste[2]+"|"+v3_verluste[3]+"|"+v3_verluste[4]+"|"+v3_verluste[5]+"|"+v3_verluste[6]+"|"+v3_verluste[7]+"|"+v3_verluste[8]+"|"+v3_verluste[9]+"|"+v3_verluste[10]+"|"+v3_verluste[11]+"|");	
	}
	}

	/* Zusammenbauen */

	tbody.appendChild(row1);
	tbody.appendChild(row2);
	tbody.appendChild(row3);
	tbody.appendChild(row4);
	if(row513 == 1) { tbody.appendChild(row5); }
	tbody.appendChild(row6);
	tbody.appendChild(row7);
	tbody.appendChild(row8);
	tbody.appendChild(row9);
	tbody.appendChild(row10);
	tbody.appendChild(row11);
	tbody.appendChild(row12);
	if(row513 == 1) { tbody.appendChild(row13); tbody.appendChild(row14); tbody.appendChild(row15);}
	table.appendChild(tbody);
	if(row513 == 1) {
	formu.appendChild(table);
	formu.appendChild(button1);
	formu.appendChild(button2);
	formu.appendChild(button3);
	formu.appendChild(button4);
	formu.appendChild(button5);
	formu.appendChild(button6);
	formu.appendChild(button7);
	formu.appendChild(button8);
	formu.appendChild(button9);
	formu.appendChild(button10);
	formu.appendChild(button11);
	formu.appendChild(button12);
	formu.appendChild(button13);
	formu.appendChild(button14);
	if(infos_verteidiger2(1)) { formu.appendChild(button15);
	formu.appendChild(button16);
	formu.appendChild(button17); }
	if(v3_isset == 1) { formu.appendChild(button18);
	formu.appendChild(button19);
	formu.appendChild(button20); }
	}

	// Tabelle einhängen
	erstelletab.snapshotItem(0).getElementsByTagName("td")[5].appendChild(p);
	if(row513 == 1) { 
	erstelletab.snapshotItem(0).getElementsByTagName("td")[5].appendChild(formu); 
	} else { erstelletab.snapshotItem(0).getElementsByTagName("td")[5].appendChild(table); }

}

// Main
var parsetab = document.evaluate("//table[@class='tbg']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
var erstelletab = document.evaluate("//table[@class='tbg']/tbody", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
var check_fx_ext = document.evaluate("//form[@action='http://daemon.ronnygarde.de/KB_Parser1.0/kb_extern.php']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

if(check_fx_ext.snapshotLength >= 1) { alert("You have activated the Firefox Extension as well as the Greasemonkeyscript. Please deactive one of them."); } else {

if(berichtsart('kampfbericht') && sprache[1] != null) {
	// Variablendeklaration (Allgemein)
		// Variablen
		var datum, uhrzeit;

	// Variablendeklaration (Angreifer)
		// Variablen
		var a_name, a_dorf, a_held, a_volk, at, av, beute, info;
	
		// Arrays
		a_einheiten  = new Array();
		a_verluste = new Array();
		a_danach = new Array();
	
	// Variablendeklaration (Verteidiger)
		// Variablen
		var v_name, v_dorf, v_held, v_volk, vt, vv;
	
		// Arrays
		v_einheiten = new Array();
		v_verluste = new Array();
		
	if(infos_verteidiger2(1)) {
	// Variablendeklaration (Verteidiger 2)
		// Variablen
		var v2_held, v2_volk, vt2, vv2;
	
		// Arrays
		v2_einheiten = new Array();
		v2_verluste = new Array();
	}
	
	if(infos_verteidiger3(1)) {
	// Variablendeklaration (Verteidiger 3)
		// Variablen
		var v3_held, v3_volk, vt3, vv3;
		var v3_isset = 1;
	
		// Arrays
		v3_einheiten = new Array();
		v3_verluste = new Array();
	} else {
		var v3_held = 0;
		var v3_volk = 1;
		var v3_isset = 0;
		var vt3 = 0;
		var vv3 = 0;
		v3_einheiten = new Array();
		v3_verluste = new Array();
		
		for(var i=1; i <= 10; i++) { v3_einheiten[i] = 0; }
		for(var i=1; i <= 10; i++) { v3_verluste[i] = 0; }
	}
	
	infos_allgemein();
	infos_angreifer();
	infos_verteidiger();
	infos_verteidiger2(0);
	infos_verteidiger3(0);

	var img_a = Math.round((av*100)/at);
	if(vt > 0) { var img_v = Math.round((vv*100)/vt); }
	
	if(infos_verteidiger2(1)) { var img_v2 = Math.round((vv2*100)/vt2); }
	if(infos_verteidiger3(1)) { var img_v3 = Math.round((vv2*100)/vt3); } else { var img_v3 = 0; }
	
	createTable(a_volk, v_volk, at, av, vt, vv, img_a, img_v, sprachdatei2[1], sprachdatei2[2], 1);
	if(infos_verteidiger2(1)) { createTable(v2_volk, v3_volk, vt2, vv2, vt3, vv3, img_v2, img_v3, sprachdatei2[2]+" 2", sprachdatei2[2]+" 3", 0); }
}
}