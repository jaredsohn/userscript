// ==UserScript==
// @name            Erweiterte Dorfinfos
// @description     Zeigt Infos aus Berichten direkt im Infopopup auf der Karte.
// @version         2.2d (2010-02-24 14:45)
// @author          Simon Hilz, realneode, Peety, Heinzelmaenchen
// @namespace       realneode.seine-seite.com
// @include         http://*.*staemme.*/game.php?*screen=map*
// @include         http://*.*staemme.*/game.php?*screen=report*
// @include         http://*.*staemme.*/game.php?*screen=info_village*
// @include         http://*.*staemme.*/game.php?*screen=info_player*
// @include         http://*.*staemme.*/game.php?*screen=place*
// @include         http://*.tribalwars.nl/game.php?*screen=map*
// @include         http://*.tribalwars.nl/game.php?*screen=report*
// @include         http://*.tribalwars.nl/game.php?*screen=info_village*
// @include         http://*.tribalwars.nl/game.php?*screen=info_player*
// @include         http://*.tribalwars.nl/game.php?*screen=place*
// @include         file:///*:/*dorfinfos/*.html
// @include         file:///*:/*dorpsinfo/*.html
// ==/UserScript==

//Hier kann editiert werden:
var warn = false;
var berichtDurch = true; //Bericht durchschalten ein(true)- und ausschalten(false) (Standard: true)
var anzahlSpys = 1; //Anzahl Späher die das Skript einfügt. (Standard: 1)
//für Pfeiltaste ' eintragen.
var berichtVor = "S"; //Taste zum Bericht vorwärts schalten (Standard: S) 
//für Pfeiltaste % eintragen.
var berichtZur = "A"; //Taste zum Bericht rückwärts schalten (Standard: A)
var farmtaste1 = 18; //Taste zum aktivieren der 1. Farmeinheit (Standard: Alt)
var farmtaste2 = 16; //Taste zum aktivieren der 2. Farmeinheit (Standard: Umschalt)
var farmtaste3 = 17; //Taste zum aktivieren der 3. Farmeinheit (Standard: Strg)
var farmtaste4 = 226; //Taste zum aktivieren der 4. Farmeinheit (Standard: <)
var farmtasteD = 9; //Taste zum deaktivieren der Farmeinheiten (Standard: Tabulator)
//Ab hier nichts mehr verändern.


/*
function GM_deleteValue(name) {
	localStorage.removeItem("edi_"+name);
}

function GM_getValue(name, defaultValue) {
	var value = localStorage.getItem("edi_"+name);
	if (!value)
		return defaultValue;
	else
		return value;
}

function GM_setValue(name, value) {
	localStorage.setItem("edi_"+name, value);
}
*/

var url = getHref();
var server = document.location.host.split('.')[0];
var opera = window.opera?true:false;
/* settings: Truppen,Ressis,Speer,Schwert,Axt,LKav,BB,SKav,Gebäude,'frei',Spieler-ID,Info */
var sets = (GM_getValue(server+"_settings", "1,1,1,0,1,1,0,0,1,0,0,1,1")).split(",");
var settings = new Array(11);
for(var i=0; i<=10; i++) { 
	settings[i] = parseInt(sets[i],10);
}
if (settings[10] > 0) { 
	var player_id = settings[10];
}
else { 
	var player_id = false;
}
settings[11] = parseInt(sets[11],10);
settings[12] = parseInt(sets[12],10);

if(document.body.innerHTML.match(/input name=\"sid_refresh_password/)) {
}
else{
	
	if ((url.match (/screen=map/)) || (url.match (/screen=report&mode=all&view/)) || (url.match (/screen=report&mode=attack&view/)) || (url.match (/screen=info/))){
		if (server != "") { 
			var language = document.location.host.match(/^\D+/)[0];
		} 
		else { 
			language = "??";
		}
		var lang = 0;
		if(language == "nl") {
			lang = 1;
			var rohstoffe = ["Hout","Leem","IJzer"];	
			var names = ["Houthakkers", "Leemgroeve", "IJzermijn", "Opslagplaats", "Schuilplaats", "Muur"];
			var ausdruck =[/Aanvaller:/,/de Verdediger/,/Verdediger:/,/Buit:/,/Toestemming/,/Spionage/,/Dorpoverzicht/];
			var bonusliste = [/houtprod/,/leemprod/,/ijzerprod/,/grondstofprod/,/opslagplaats cap/,/kazerne/,/stal/,/werkplaats/,/bevolking/,/(\d+)% [verhoog,snell,meer]/];
			var a_text = ["Toestemming","geen","geen bekend","niet bekend","Grondstoffen","Farm eenheden","Gebouwen","Bericht is ouder dan","dagen","weken","","Troepen","buiten","Info"];
			var opt_text = ["Level","Troepen aantonen","Grondstoffen aantonen","Gebouwen en toestemming","Snelheid","Waarschuwing bij oudere berichten","Dorpsinfo instellingen","Instellingen verbergen","Insert Spys"];
			var meldungen = ["Dorpsinfomatie","Eigen dorp","Dorpsinfo","verwijderd","gedeeltelijk bijgewerkt","bijgewerkt","Dit bericht is al geïmporteerd","Dit bericht is verouderd","geregistreerd","niet verwijderd"];
			var loeschen = ["Alle dorpsinfomatie verwijderen","Dorpsinfomatie verwijderen","Geen dorpsinformatie beschikbaar"];
			var sicherheit = "Weet je zeker dat je alle dorpinformaties van deze wereld wilt verwijderen ?";
			var gamespeed = [1,2,1.6,2];	// wereld 16
			var unitspeed = [1,1,0.6666666666,0.5];
			var loy_speed = [1,2,1.6,2];
			var welten = [];
			welten[0] = [2]; //Gamespeed 2; Unitspeed 1; Loyspeed 2
			welten[1] = [4,5,6,8,12,14]; //Gamespeed 1,5; Unitspeed 0,66; Loyspeed 1.5
			welten[2] = [7,13,15] //Gamespeed 2; Unitspeed 0.5; Loyspeed 2
		}
		else if(language == "ch") {
			lang = 2;
			var rohstoffe = ["Houz","Lehm","Isä"];
			var names = ["Houzfäuer","Lehmgruebe","Isemine","Spicher","Vrsteck","Wall"];
			var ausdruck =[/Agrifer:/,/vom Vrteidiger/,/Vrteidiger:/,/Beute:/,/Zuestimmig/,/Spionage/,/Dorfübersicht/];
			var bonusliste = [/Houzprod/,/Lehmprod/,/Iseprod/,/Rohstoffprod/,/Spicherkap/,/Kasärne/,/Stau/,/Wärkstatt/,/Bevöukerig/,/(\d+)% [meh,schneuer]/];
			var a_text = ["Zuestimmig","ke","ke bekannt","nid bekannt","Rohstoffe","Farmiheite","Geböide","Bricht isch meh aus","Täg","Wuche","aut","Truppe","uswärts","Info"];
			var opt_text = ["Stufe","Truppe azeige","Rohstoffe azeige","Geböide und Zuestimmig","Gschwindigkeit","Hiwis bi eutärä Bricht","Dorfinfo Optione","Optione versteckä","Insert Spys"];
			var meldungen = ["Dorfinformation","eignigs Dorf","Dorfinfos","glösche","teuwis aktualisiert","aktualisiert"," bereits igläse","Bricht isch verautet","itreit","nid glösche"];
			var loeschen = ["Aui Dorfinformatione lösche","Dorfinformatione lösche","ke Dorfinformatione vorhande"];
			var sicherheit = "Wosch du würklech aui dorfinformatione vo derä wäut lösche ?";
			var gamespeed = [1,1.6,1.6];	// bis Waut 9
			var unitspeed = [1,1,0.625];
			var loy_speed = [1,1.6,1.6];
			var welten = [];
			welten[0] = [4]; //Gamespeed 1,6; Unitspeed 1; Loyspeed 1.6
			welten[1] = [8,9]; ////Gamespeed 1,6; Unitspeed 0,625; Loyspeed 1.6
			
		}
			else {
			var rohstoffe = ["Holz","Lehm","Eisen"];	
			var names = ["Holzfäller", "Lehmgrube", "Eisenmine", "Speicher", "Versteck", "Wall"];
			var ausdruck =[/Angreifer:/,/des Verteidigers/,/Verteidiger:/,/Beute:/,/Zustimmung/,/Spionage/,/Dorfübersicht/,/Gesendet/];
			var bonusliste = [/Holzprod/,/Lehmprod/,/Eisenprod/,/Rohstoffprod/,/Speicherkap/,/Kaserne/,/Stall/,/Werkstatt/,/Bevölkerung/,/(\d+)% [mehr,schnell]/];
			var a_text = ["Zustimmung","keine","keine bekannt","nicht bekannt","Rohstoffe","Farmeinheiten","Gebäude","Bericht ist über","Tage","Wochen","alt","Truppen","auswärts","Info"];
			var opt_text = ["Stufe","Truppen anzeigen","Rohstoffe anzeigen","Gebäude und Zustimmung","Geschwindigkeit","Hinweis bei älteren Berichten","Dorfinfo Optionen","Optionen verstecken","Späher einfügen"];
			var meldungen = ["Dorfinfo Meldung","eigenes Dorf","Dorfinfos","gelöscht","teilweise aktualisiert","aktualisiert","Dieser Bericht wurde bereits eingelesen","Dieser Bericht ist veraltet","eingetragen","nicht gelöscht"];
			var loeschen = ["Alle Dorfinformationen löschen","Dorfinformationen löschen","keine Dorfinformationen vorhanden"];
			var sicherheit = "Möchtest du wirklich alle Dorfinformationen dieser Welt löschen ?";
			var gamespeed = [1,1.6,1.6];	// bis Welt 56
			var unitspeed = [1,0.625,0.625];
			var loy_speed = [1,1.6,1];
			var welten = [];
			welten[0] = [17,40,42,44,46,54]; //Gamespeed 1,6; Unitspeed 0,625; Loyspeed 1.6
			welten[1] = [26,30]; ////Gamespeed 1,6; Unitspeed 0,625; Loyspeed 1
		}

		var land = GM_getValue("language",11);
		if (land > 10) {
			if (language != "??"){
				GM_setValue("language", lang);
			}
			land = lang;
		}
	}
	
	if(((url.search(/&screen=report&mode=all&view/) > -1)||(url.search(/.+&screen=report&mode=attack&view/) > -1)) && berichtDurch){
		try{
			var tmp = document.evaluate('id(\'ds_body\')/table/tbody/tr/td/table/tbody//td[2]/table/tbody/tr/td/table[1]/tbody/tr/td/a',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
			var link = ["",""];
			for (var i=tmp.snapshotLength-2;i<tmp.snapshotLength;i++){
				if (tmp.snapshotItem(i).textContent == "<<"){
					link[0] = tmp.snapshotItem(i).href;
				}
				if (tmp.snapshotItem(i).textContent == ">>"){
					link[1] = tmp.snapshotItem(i).href;
				}
			}
			document.addEventListener('keydown', durchschalten, true);
		}catch(e){show_meldungen(meldungen[0],"Berichte durchschalten nicht möglich!",warn);}
	}
	
	if ((url.match(/dorfinfos/)) || (url.match(/dorpsinfo/))) {
		var sicherexp = [];	
		var sicherimp = [];	
		var sichersave= [];
		sicherexp[0] = "Möchtest du jetzt alle Dorfinformationen und Einstellungen sichern";		// de
		sicherimp[0] = "Möchtest du die Dorfinformationen und Einstellungen importieren";
		sichersave[0]= "Mit 'Seite speichern unter' jetzt die Datei speichern in den Ordner 'dorfinfos'."
		sicherexp[1] = "Wil je nu alle dorpsinformatie en instellingen opslaan";				// nl
		sicherimp[1] = "Wil je alle dorpsinformatie en instellingen importeren";
		sichersave[1]= "Sla nu het bestand op met 'Pagina opslaan als...' in de map 'dorpsinfo'."
		sicherexp[2] = "Wosch du jetz aui Dorfinfos und Istellige sichere";					// ch
		sicherimp[2] = "Wosch du aui Dorfinfos und Istellige jetz iläsä";
		sichersave[2]= "Mit 'Seite speichern unter' jetz bitte d Datei spichere im Ordner 'Dorfinfos'."
	}

	if (url.match(/place/)) {
		var spyinsert = parseInt(GM_getValue(server+"_settings","0,0,0,0,0,0,0,0,0,0,0,0,1").split(",")[12]);
		if ((url.match(/EDI/)) && (spyinsert == 1)){
			var spymax = parseInt(document.getElementsByName("spy")[0].nextSibling.nextSibling.textContent.replace(/\((\d+)\)/,"$1"));
			if((document.getElementsByName("spy").length > 0) && (spyinsert == 1)) {
				if ((spymax > 0) && (document.getElementsByName("spy")[0].value<2)) {
					document.getElementsByName("spy")[0].value = Math.min(spymax,anzahlSpys);
				}
			}
			var parameter = url.split('EDI=')[1].split("&")[0].split(",");
			var lkvmax = parseInt(document.getElementsByName(parameter[1])[0].nextSibling.nextSibling.textContent.replace(/\((\d+)\)/,"$1"))
			if((document.getElementsByName(parameter[1]).length > 0) && (parameter[0] > 0)){
				document.getElementsByName(parameter[1])[0].value = Math.min(parameter[0],lkvmax);
			}
		}
	}
	
	if(url.match (/screen=map/)) {
		var akt_map = "mapOld"; 	
		var watch_map = false; 
		var watch_map_timer;
		var taste=0;


		var caution = 'data:image/png;base64,' +
			'iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAYAAADtc08vAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/' +
			'oL2nkwAAAMFJREFUKM+VUcERwyAMExx71KO4kzSjJJskk9SjwCT0QUIMpU7jO99xICRZdjlnjCptz+bh' +
			'8Xq7Ec7DKuLSRnlTnfYeODoq/FYHEEWd/3RwqjOmGZhm1DHS5rJJUAFaHfuZAIC/SDoHdmDmCGlxGZAa' +
			'GiCIdfQ2i4LtHZB2sH+IOjw5V9s7SIvLiAeJdB87ItKOAV/tkAIfmmvpJkyNbUfgNnkAxALi9q5shKsL' +
			'P1zbVcUz7GDi1muuUAjv778YF3wAU2RReecthjIAAAAASUVORK5CYII=';
		var grafik = ["spear","sword","axe","light","marcher","heavy"];
		var einheit = ["Speer","Schwert","Axt","Leichte Kavallerie","Berittene Bogenschützen","Schwere Kavallerie"];
		var show_ressis = new Boolean(settings[1]);
	
		window.clearInterval(watch_map_timer);
		var koor_start = document.body.innerHTML.match(/\((\d+\|\d+)\)/);
		scan_map();
		var map_container = getElementsByClassName("map_container")[0];
		var tds = map_container.getElementsByTagName("td");
		tds[1].addEventListener("click",function() {check_map_move(akt_map);}, true);
		tds[3].addEventListener("click",function() {check_map_move(akt_map);}, true);
		tds[(tds.length - 4)].addEventListener("click",function() {check_map_move(akt_map);}, true);
		tds[(tds.length - 2)].addEventListener("click",function() {check_map_move(akt_map);}, true);
		var insertpos = getElementsByClassName("map_container")[1];
		insertpos = insertpos.parentNode.parentNode;
		var main = getElementsByClassName("main")[0];
		var div = document.createElement("div");
		div.setAttribute("style","text-align:left; margin: 0px auto;");

		var hr = document.createElement("hr");
		div.appendChild(hr);

		var table = document.createElement("table");
		table.setAttribute("id",'extended_dorfinfo_settings');
		table.setAttribute("class","small");
		table.setAttribute("style","display:none;");
		var p = document.createElement("p");
		p.setAttribute("class","small");
		p.setAttribute("align","center");
		p.setAttribute("style","font-size:88%;");

		var a = document.createElement("a");
		a.setAttribute("href","javascript:void(0);");
		a.addEventListener("click",function() {show_settings();}, false);
		a.appendChild(document.createTextNode("» "+opt_text[6]+" «"));
		a.innerHTML+="<br>";
		p.appendChild(a);
		div.appendChild(p);

		var row, td, check;

		show_einstellung("showtroups_0",opt_text[1],0);
		show_einstellung("showressis_1",opt_text[2],1);

		row = document.createElement("tr");
		td = document.createElement("td");
		td.setAttribute("style","text-indent:20px;");
		td.appendChild(document.createTextNode(a_text[5]+" (max. 4): "));
		br = document.createElement("br");
		td.appendChild(br);

		for(i=2; i<8; i++) {
			var obj = grafik[i-2];
			img = document.createElement("img");
			img.setAttribute("alt", "");
			img.setAttribute("src", "graphic/unit/unit_"+obj+".png");
			check = document.createElement("input");
			check.setAttribute("type", "Checkbox");
			check.setAttribute("name", "showunits_"+i);
			check.checked = settings[i];
			check.addEventListener("change",function() {edit_setting(this.name, this.checked);}, false);
			td.appendChild(check);
			td.appendChild(img);
		}
		row.appendChild(td);
		table.appendChild(row);

		show_einstellung("showwall_8",opt_text[3],8);
		show_einstellung("showinfo_11",opt_text[5],11);
		show_einstellung("showspys_12",opt_text[8],12);
	
		div.appendChild(table);
		hr = document.createElement("hr");
		div.appendChild(hr);
		insertpos.appendChild(div);
		
		window.clearInterval(watch_map_timer); watch_map = false;  stop				// ende
	}
	
	if((url.search(/&screen=report&mode=all&view/) > -1)||(url.search(/.+&screen=report&mode=attack&view/) > -1)) {
		var report = readReport();
		if (report) {
			report = report.split(",");
			/* report: Holz, Lehm, Eisen, Holzmine , Lehmmine, Eisenmine, Speicher, Versteck, Wall, Dorf-ID, Datum, neuste Bericht-ID, (Zustimmung) */
			var report_id = url.split('=');
			var rep_id = parseInt(report_id[report_id.length-1]);
			var vil_id = report[9];
			var heute = new Date();
			heute = heute.getDate();
			var farmer = GM_getValue(server + "_farm","0,0,0,0");
			farmer = farmer.split(",");
			var berichtstag = report[10];
			berichtstag = berichtstag.split(" ");
			berichtstag = berichtstag[0].split(".");
			berichtstag = parseInt(berichtstag[0],10);
			if (report[0] == -1) {			// eigenes Dorf
				var old = GM_getValue(server+"_"+vil_id, false);
				if (old) {
					del_village(vil_id);
					show_meldung(meldungen[0],(meldungen[1]+", "+meldungen[2]+" "+meldungen[3]));	// eigenes Dorf, Dorfinfos gelöscht);
				}
				else {
					show_meldung(meldungen[0],meldungen[1]);
				}
			}
			else {
				var old = GM_getValue(server+"_"+vil_id, false);
				if (old) {
					var old_report = old.split(",");
					var old_rep_id = old_report[11];
				}
				else {
					var old_rep_id = 0;
				}
				if(old && (old_rep_id > 0)) {
					if(rep_id > old_rep_id) {		// aktueller Bericht ist neuer
						var marker = false;
						if (berichtstag == heute){
							if ((farmer[3] == heute) || (farmer[3] == 0)){
								var tmp = readBeute();
								farmer[0] = parseInt(farmer[0]) + parseInt(tmp[0]);
								farmer[1] = parseInt(farmer[1]) + parseInt(tmp[1]);
								farmer[2] = parseInt(farmer[2]) + parseInt(tmp[2]);
								farmer[3] = heute;
								GM_setValue(server + "_farm",farmer+"");
							}
							else{
								if ((farmer[3] != heute) && (farmer.length>3)){
									var tmp = readBeute();
									tmp[3] = heute;
									GM_setValue(server + "_farm",tmp+"");
								}
							}
						}
						else{
							if ((farmer[3] != heute) && (farmer.length>3)){
								GM_setValue(server + "_farm","0,0,0,0");
							}
						}
						for (i=3;i<9;i++) {
							if (report[i] == -1) {
							/* alte Gebäudestufen behalten */
								report[i] = old_report[i];
								marker = true;
							}
						}
						report[11] = rep_id;
						GM_setValue(server + "_" + vil_id, ""+report);
						GM_setValue(server + "_truppen_" + vil_id, getTroups());
						if (marker) show_meldung(meldungen[0],(meldungen[2]+" "+meldungen[4]));	// Dorfinfos teilweise aktualisiert
						else  show_meldung(meldungen[0],(meldungen[2]+" "+meldungen[5]));	// Dorfinfos aktualisiert
					}
					else {
						if (rep_id == old_rep_id) show_meldung(meldungen[0],meldungen[6]);	// Bericht bereit eingelesen
						else show_meldung(meldungen[0],meldungen[7]);					// Bericht ist veraltet
					}
				}
				else {
					if ((farmer[3] == heute) || (farmer[3] == 0)){
						if (berichtstag == heute){
							var tmp = readBeute();
							farmer[0] = parseInt(farmer[0]) + parseInt(tmp[0]);
							farmer[1] = parseInt(farmer[1]) + parseInt(tmp[1]);
							farmer[2] = parseInt(farmer[2]) + parseInt(tmp[2]);
							farmer[3] = heute;
							GM_setValue(server + "_farm",farmer+"");
						}
					}
					else{
						GM_setValue(server + "_farm","0,0,0,0");
					}
					report[11] = rep_id;
					GM_setValue(server + "_" + vil_id, ""+report);
					GM_setValue(server + "_truppen_" + vil_id, getTroups());
					show_meldung(meldungen[0],(meldungen[2]+" "+meldungen[8]));				// Dorfinfos eingetragen
				}
			}		
		}
	}
	
	if(url.match (/screen=info_player&id=/)) {
		var tab = document.evaluate('//table[@class="main"]/tbody/tr/td/table/tbody/tr/td/table[@class="vis"]/tbody', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		var new_row_0 = document.createElement("tr");
		var new_row_2 = document.createElement("tr");
		var new_cell_0 = document.createElement("td");
		var new_cell_2 = document.createElement("td");
		var new_Link = document.createElement("a");
		var new_Link2 = document.createElement("a");
		new_cell_0.setAttribute("colspan","2");
		new_cell_2.setAttribute("colspan","2");
	
		/* Die Funktionen per Eventhandler an die Links koppeln */
		new_Link.innerHTML = "»  "+loeschen[1];							// Dorfinformationen löschen
		new_Link.href = "javascript: void()";
		new_Link.addEventListener('click', function() {
			var id = [];
			id[0] = document.evaluate('id(\'ds_body\')/table[3]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td[1]/table/tbody/tr/td[1]/a/@href',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
			id[1] = [];
			var tmp,tmp2=0;
			for (var i=0;i<id[0].snapshotLength;i++){
				tmp= (id[0].snapshotItem(i).textContent.match(/info_village/)) ? id[0].snapshotItem(i).textContent.split("&id=") : "";
				if (tmp.length>1){
					id[1][tmp2]=tmp[1].split("&")[0];
					tmp2++;
				}
			}
			var geloescht = false;
			for (var i=0;i<id[1].length;i++){
				if(GM_getValue(server + "_" + id[1][i], false)) {
					del_village(id[1][i]);
					geloescht=true;
				}		
			}
			if (geloescht){
				new_Link.innerHTML = "»  "+meldungen[2]+" "+meldungen[3];	// Dorfinformationen gelöscht
			}
			else{
				new_Link.innerHTML = "»  "+loeschen[2];					// keine Dorfinformationen vorhanden
			}
		}, false); 

		new_Link2.innerHTML = "»  "+loeschen[0];						// Alle Dorfinformationen löschen
		new_Link2.href = "javascript: void()";
		new_Link2.addEventListener('click', function() {
			var liste = [];
			liste = GM_listValues();
			var sicher;
			sicher = window.confirm(sicherheit);
			if (sicher) {
				var counter = 0;
				for (var i=0; i<liste.length; i++){
					if (liste[i].split("_")[0] == server) {
						GM_deleteValue(liste[i]);
						counter++;
					}
				}
				new_Link2.innerHTML = "» "+counter+" "+meldungen[2]+" "+meldungen[3];	// Dorfinformationen gelöscht
			}
			else {
				new_Link2.innerHTML = "»  "+meldungen[2]+" "+meldungen[9];			// Dorfinformationen nicht gelöscht
			}
		}, false); 
		new_cell_0.appendChild(new_Link);
		new_cell_2.appendChild(new_Link2);
		new_row_0.appendChild(new_cell_0);
		new_row_2.appendChild(new_cell_2);
		tab.appendChild(new_row_0);
		tab.appendChild(new_row_2);
	}
	
	if(url.match (/screen=info_village&id=/)) {
		if (url.match(/EDI/)) {
		var edi = url.split("EDI=")[1];
		var xpathResult = document.evaluate('id(\'ds_body\')/table[2]/tbody/tr/td//tr/td/table/tbody/tr/td/table/tbody/tr[9]/td/a/@href',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		tmp = xpathResult.snapshotItem(0).textContent;
		xpathResult.snapshotItem(0).textContent = tmp + "&EDI="+edi; 
		}
		if(document.body.innerHTML.match(ausdruck[6])) {						// Dorfübersicht, eigenes Dorf
			if (player_id == false) {
				player_id = document.body.innerHTML.match(/screen=info_player&amp;id=(\d+)/)[1];
				edit_setting("playerid_10", player_id);
			}
		}
		var tab = document.evaluate('//table[@class="main"]/tbody/tr/td/table[@class="vis left"]/tbody',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
		var new_row_0 = document.createElement("tr");
		var new_row_2 = document.createElement("tr");
		var new_cell_0 = document.createElement("td");
		var new_cell_2 = document.createElement("td");
		var new_Link = document.createElement("a");
		var new_Link2 = document.createElement("a");
		new_cell_0.setAttribute("colspan","2");
		new_cell_2.setAttribute("colspan","2");

	/* Die Funktionen per Eventhandler an die Links koppeln */
		new_Link.innerHTML = "»  "+loeschen[1];							// Dorfinformationen löschen
		new_Link.href = "javascript: void()";
		new_Link.addEventListener('click', function() {
			var id = location.href.split("id=")[1].replace(/\&.+/,"");
			if(GM_getValue(server + "_" + id, false)) {
				del_village(id);
				new_Link.innerHTML = "»  "+meldungen[2]+" "+meldungen[3];	// Dorfinformationen gelöscht
			}
			else { 
				new_Link.innerHTML = "»  "+loeschen[2];					// keine Dorfinformationen vorhanden
			}
		}, false); 

		new_Link2.innerHTML = "»  "+loeschen[0];						// Alle Dorfinformationen löschen
		new_Link2.href = "javascript: void()";
		new_Link2.addEventListener('click', function() {
			var liste = [];
			liste = GM_listValues();
			var sicher;
			sicher = window.confirm(sicherheit);
			if (sicher) {
				var counter = 0;
				for (var i=0; i<liste.length; i++){
					if (liste[i].split("_")[0] == server) {
						GM_deleteValue(liste[i]);
						counter++;
					}
				}
				new_Link2.innerHTML = "» "+counter+" "+meldungen[2]+" "+meldungen[3];	// Dorfinformationen gelöscht
			}
			else {
				new_Link2.innerHTML = "»  "+meldungen[2]+" "+meldungen[9];			// Dorfinformationen nicht gelöscht
			}
		}, false); 
		new_cell_0.appendChild(new_Link);
		new_cell_2.appendChild(new_Link2);
		new_row_0.appendChild(new_cell_0);
		new_row_2.appendChild(new_cell_2);
		tab.appendChild(new_row_0);
		tab.appendChild(new_row_2);
	}
	
	if ((url.match(/dorfinfos/)) || (url.match(/dorpsinfo/))) {
		/* Daten sichern / einlesen */
		var liste = []; 
		var einlesen = false;
		try {
			liste = document.body.innerHTML;
			if (liste) {
				einlesen = true;
			}
		} catch(e) {liste = "";}
		if (einlesen){
			liste = liste.split('<br>');
			if (liste[0] == "Dorfinfos;") {
				var sicher = window.confirm(sicherimp[land]+" ?");
				if (sicher){
					for (var i=1; i < liste.length-1; i++) {
						liste[i] = liste[i].split(";");
						if (liste[i][1] == "false"){
							GM_setValue(liste[i][0],false);
						}
						else {
							if (liste[i][1] == "true"){
								GM_setValue(liste[i][0],true);
							}
							else {
								GM_setValue(liste[i][0],liste[i][1]);
							}
						}
					}
				}
				else { liste = "";}
			}
			else { liste = "";}
		}
		if ((liste == "")) {
			var sicher2 = window.confirm(sicherexp[land]+" ?");
			if (sicher2){
				liste = GM_listValues();
				var ausgabe = "";
				for (var i=0; i < liste.length; i++){
					ausgabe += liste[i]+";";
					ausgabe += GM_getValue(liste[i])+"<br>";
				}
				document.body.innerHTML = "Dorfinfos;<br>"+ausgabe;
				alert(sichersave[land]);
			}
		}

	}

}

function show_meldungen(msg1,msg2,warner) {
	if ((warner == undefined)||(warner == true)){
		var row = document.createElement("tr");
		var td1 = document.createElement("td");
		var td2 = document.createElement("td");
		td1.innerHTML = msg1;
		td2.innerHTML = msg2;
		row.appendChild(td1);
		row.appendChild(td2);
		var tab = getElementsByClassName("vis")[2].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[1];
		tab.parentNode.insertBefore(row, tab);
	}
}

function show_farmheute() {
	var farmheute = GM_getValue(server + "_farm","0,0,0,0");
	farmheute = farmheute.split(",");
	show_meldungen("heute gefarmt:","<img src=\"/graphic/holz.png\">"+trennzeichen(farmheute[0])+" <img src=\"/graphic/lehm.png\">"+trennzeichen(farmheute[1])+" <img src=\"/graphic/eisen.png\">" + trennzeichen(farmheute[2]));
}

function show_meldung(msg1,msg2) {
	show_farmheute();
	show_meldungen(msg1,msg2);
}

function show_einstellung(msg,msg2,wert) {
	row = document.createElement("tr");
	td = document.createElement("td");
	check = document.createElement("input");
	check.setAttribute("type","checkbox");
	check.setAttribute("name",msg);
	check.checked = settings[wert];
	check.addEventListener("change",function() {edit_setting(this.name, this.checked);}, false);
	td.appendChild(check);
	td.appendChild(document.createTextNode(msg2));
	row.appendChild(td);
	table.appendChild(row);
}


function show_settings() {
	$id('extended_dorfinfo_settings').setAttribute("style", "");
	a.removeEventListener("click",function(){show_settings();}, false);
	a.addEventListener("click",function(){hide_settings();}, false);
	a.innerHTML = "« "+opt_text[7]+" »"+"<br>";
}


function hide_settings() {
	$id('extended_dorfinfo_settings').setAttribute("style", "display:none;");
	a.removeEventListener("click",function(){hide_settings();}, false);
	a.addEventListener("click",function(){show_settings();}, false);
	a.innerHTML = "» "+opt_text[6]+" «" + "<br>";
}


function edit_setting(set, new_value) {
	if (set == "playerid_10") {
		settings[10] = new_value;
	} 
	else {
		var wert = 1;
		if ((new_value == false) || (new_value == "false")) wert = 0;
		settings[set.split("_")[1]] = wert;
	}
	GM_setValue(server+"_settings", ""+settings);
}


function check_map_move(akt_map_loc) {
	var groesse = $id('map').getElementsByTagName("tr").length;
	if(!watch_map) {
		watch_map_timer = window.setInterval(check_map_move,300,akt_map);
		watch_map = true;
		return false;
	}
	var obj = $id(akt_map_loc);
	if (obj) {
		var obj1 = obj.style.left; 
		var obj2 = obj.style.top;
		if(obj1 == (groesse*53)*(-1)+"px" || obj1 == (groesse*53)+"px" || obj2 == (groesse*38)*(-1)+"px" || obj2 == (groesse*38)+"px")
		{
			switch(akt_map_loc)
			{
				case "mapOld":
					akt_map = "mapNew";
					break;
				case "mapNew":
					akt_map = "mapOld";
					break;
			}
			scan_map();
			window.clearInterval(watch_map_timer);
			watch_map = false;
		}
	}
}

function readBeute() {
	var beute = [0,0,0];
	var h4 = document.getElementsByTagName("th");
	if (isOwnReport()) {
		for(x = 0; x < h4.length; x++ ) {
			if(h4[x].innerHTML.search(ausdruck[3]) > -1) {
				beute = h4[x].parentNode.parentNode.rows[0].cells[1].innerHTML.replace(/<[^>]+>/g, "").replace(/\./g,"").split(" ");
			}
		}
		for(i = 0; i<3;i++){
			if(isNaN(parseInt(beute[i]))){
				beute[i]=0;
			}
			else{
				beute[i]=parseInt(beute[i]);
			}
		}
	}
	return beute;
}

function isOwnReport() {
	var urlaubsvertretung = url.split("t=");
	if (!isNull(urlaubsvertretung[1])){
		return false;
	}
	var node = document.evaluate('//td[.="Weitergeleitet am:"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if(node.length > 0) {
		return false;
	} else {
		return true;
	}
}


function readReport() {
	var tmp;
	/* handelt es sich um einen Bericht?  */
	try{
		tmp = document.evaluate('id(\'ds_body\')//table[4]//th[1]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).textContent;
		var bericht = (tmp.match(ausdruck[2])) ? true : false;
	}catch(e){show_meldungen(meldungen[0],"Berichtserkennung fehlgeschlagen.",warn);return false; }
	/* Beute */
	var beute = [0,0,0];
	try{
		tmp = document.evaluate('id(\'ds_body\')//table[6]/tbody/tr[1]/td[1]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
		for (var i=0,j=0;i<3;i++){
			if (tmp.innerHTML.match(rohstoffe[i])){
				beute[i] = tmp.textContent.split(" ")[j].replace(".","");
				j++;
			}
		}
	}
	catch(e){show_meldungen(meldungen[0],"Beute auslesen nicht möglich.",warn);}
	var beute_x = 0;
	/* Angreifer-ID auslesen */
	var player = [];
	try{
		tmp = document.evaluate('id(\'ds_body\')//tr//table[3]//tr/th[2]//@href',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).textContent;
		player[0] = tmp.split("id=")[1].split("&")[0];
	}
	catch(e){show_meldungen(meldungen[0],"Angreifer-ID auslesen nicht möglich.");player[0]= 0;}
	/* Verteidiger-ID auslesen */
	try{
		tmp = document.evaluate('id(\'ds_body\')//tr//table[4]//tr/th[2]//@href',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).textContent;
		player[1] = tmp.split("id=")[1].split("&")[0];
	}
	catch(e){show_meldungen(meldungen[0],"Verteidiger-ID auslesen nicht möglich.",warn);player[1]= 0;	}
	//
	//for(var x = 0, h4 = document.getElementsByTagName("th"); x < h4.length; x++) {	
	//	if(h4[x].innerHTML.search(ausdruck[3]) > -1) {
	//		beute_x = x;
	//	}
	//}
	/* Dorf-ID auslesen */
	try {
		var vilId = document.evaluate('id(\'ds_body\')//table[4]/tbody/tr/td[2]//@href',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).textContent;
		vilId = vilId.split("id=")[1].split("&")[0];
	} catch(e) {show_meldungen(meldungen[0],"Dorf-ID auslesen nicht möglich.",warn);return false;}
	// Prüfen ob Spieler selbst
	if ((player[1] == player_id) && (player[1] != "0")) {
		output = "-1,-1,-1,-1,-1,-1,-1,-1,-1,"+vilId+",0,0";
		return output;
	}
	/* Bericht-ID auslesen */
	try{
		var berId = url.split("view=")[1].split("&")[0];
	}
	catch(e){show_meldungen(meldungen[0],"Berichts-ID auslesen nicht möglich.",warn);return false;	}
	/* Datum + Zeit auslesen */
	try{
		var date = document.evaluate('id(\'ds_body\')//td[2]/table/tbody/tr/td/table[2]/tbody/tr',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var i=0;i<date.snapshotLength;i++){
			if (date.snapshotItem(i).textContent.match(ausdruck[7])){
				date = date.snapshotItem(i).textContent.replace(ausdruck[7],"");
			}
		}
	} catch(e) {show_meldungen(meldungen[0],"Berichtsdatum auslesen nicht möglich.",warn);return false; }
	/* Art des Berichtes (Späh, Farm oder Adelsbericht) */
	try{
		tmp = document.evaluate('//h4',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		var xx = (tmp.snapshotLength-1);
		tmp = tmp.snapshotItem(tmp.snapshotLength-1).textContent;
		var spy = (tmp.match(ausdruck[5])) ? true : false;
		var adel = (tmp.match(ausdruck[1])) ? true : false;
	} catch(e) {show_meldungen(meldungen[0],"Berichtsart auslesen nicht möglich.",warn);return false; }
	
	/* Zustimmung auslesen */
	try{
		var zustimmung = document.evaluate('id(\'ds_body\')/table/tbody//td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table[2]/tbody/tr/td/table/tbody/tr/td',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		zustimmung = zustimmung.snapshotItem(zustimmung.snapshotLength-1).textContent;
		zustimmung = (zustimmung.match(/Zustimmung/)) ? parseInt(zustimmung.split("auf ")[1],10) : "";
		zustimmung = ((zustimmung != "")&&(zustimmung<=0)) ? 25 : zustimmung;
		zustimmung = (zustimmung != "") ? ","+zustimmung : zustimmung;
	}
	catch(e){show_meldungen(meldungen[0],"Zustimmung auslesen nicht möglich.",warn);var zustimmung=""}
	
	
//	var tab = document.evaluate('//table[@class="main"]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table[@class="vis"]/tbody',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(1);
	if (adel) {
		var bericht1 = 0;
		var ths = document.getElementsByTagName("th");
		for(var x = 0; x < ths.length; x++) {
			if(ths[x].innerHTML.search(ausdruck[0])>-1) {
				bericht1 = x;
			}
		}
		if(bericht1 > 0) {
		/* Angreifer-ID auslesen */
			if(ths[bericht1+1].innerHTML.match(/screen=info_player&amp;id=\d+/)) {
				var player1 = ths[bericht1+1].innerHTML.match(/screen=info_player&amp;id=(\d+)/);
				if (player1[1] == player_id) {
					output = "-1,-1,-1,-1,-1,-1,-1,-1,-1,"+vilId+",0,"+berId+zustimmung;
					return output;
				}
			}
		}
		output = "0,0,0,-1,-1,-1,-1,-1,-1,"+vilId+","+date+","+berId+zustimmung;	// fremder Adelsbericht
		return output;
	}

	if (spy) {
	/* Rohstoffe auslesen */
		var res = [0,0,0];
		try{
			tmp = document.evaluate('id(\'ds_body\')/table//tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table[5]/tbody/tr[1]/td',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
			for (var i=0,j=0;i<3;i++){
				if (tmp.innerHTML.match(rohstoffe[i])){
					res[i] = tmp.textContent.split(" ")[j].replace(".","");
					j++;
				}
			}
		}
		catch(e){show_meldungen(meldungen[0],"Rohstoffe auslesen nicht möglich.",warn);}
		
		//var tab1 = h4[xx].nextSibling.nextSibling;
		//if (!tab1.getElementsByTagName("td")[1]) {
		//	var output = res[0]+","+res[1]+","+res[2]+",-1,-1,-1,-1,-1,-1,"+vilId+","+date+","+berId; //  -1  damit Gebäudestufen nicht gelöscht werden
		//	output = zustimmung(output);
		//	return output;
		//}
	/* Gebäude auslesen */
		var buildings = [0,0,0,0,0,0];
		try{
			tmp = document.evaluate('id(\'ds_body\')/table//tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table[5]/tbody/tr[2]/td',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).textContent;
			var marker = 0;
			for(var x = 0; x < names.length; x++) {
				if(tmp.match(names[x]))	{
					buildings[x] = tmp.split(names[x] + " ("+opt_text[0]+" ")[1].split(")")[0];
					marker ++;
				}
			}
			if (marker == 0) {
			/* Gebäude konnten nicht ausgelesen werden */
				buildings = [-1,-1,-1,-1,-1,-1];	// Gebäudestufen aus altem Bericht behalten
			}
		}
		catch(e){show_meldungen(meldungen[0],"Gebäude auslesen nicht möglich.",warn);}
		var output = res+","+buildings+","+vilId+","+date+","+berId+zustimmung;
		return output;
	}
	else { 	/* (keine Spionage) */
		if(bericht){
			var beute = "0";
			try{
				tmp = document.evaluate('id(\'ds_body\')/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[1]/td[2]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(1).textContent.split("/");
				tmp = parseInt(tmp[1])-parseInt(tmp[0]);
				beute = (tmp==0) ? "-1" : "0";
			}
			catch(e){show_meldungen(meldungen[0],"Höhe der Beute auslesen nicht möglich.",warn);}
		 	var output = "0,"+beute+",0,-1,-1,-1,-1,-1,-1,"+vilId+","+date+","+berId+zustimmung;
			return output;
		}
		return false;
	}
}

function getTroups() {
/* Liest die Truppen aus einem Bericht aus */
	var units = [];	// inside troups
	var stand = [];
	var tab = document.evaluate('//table[@class="main"]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table[@class="vis"]/tbody/tr/td/table/tbody/tr/td/table[@class="vis"]/tbody',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(1);
	if(tab) {
		stand = tab.getElementsByTagName("tr")[1].getElementsByTagName("td");
		var loose = tab.getElementsByTagName("tr")[2].getElementsByTagName("td");

		for(var x = 1; x < stand.length; x++) {
			var diff = stand[x].innerHTML-loose[x].innerHTML;
			units.push(diff);
		}
	}
	var unitsa = [];	// outside troups
	var tab = document.evaluate('//table[@class="main"]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table[@class="vis"]/tbody/tr/td/table/tbody/tr/td/table/tbody',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(3); 
	if(tab) {
		var tds = tab.getElementsByTagName("td"); 
		for(var x = 0; x < tds.length; x++) {
			unitsa[x] = tds[x].innerHTML;
		}
	}
	return (units+";"+unitsa);
}


function del_village(id) {
	GM_deleteValue(server + "_" + id);
	GM_deleteValue(server + "_truppen_" + id);
}


function trennzeichen(zahl) {
	zahl=Math.floor(zahl)+"";
	var laenge = zahl.length;
	var ausgabe = zahl.substr(0,parseInt(laenge%3));
	for (var i=0;i<parseInt(laenge/3);i++){
		if (!((laenge%3 == 0) && (i==0))){
			if (laenge/3 > 1.0){
				ausgabe += ".";
			}
		}
		ausgabe +=zahl.substr(parseInt(laenge%3)+i*3,3);
	}
	return ausgabe;
}


function getElementsByClassName(classname, node) {
	if(!node) node = document.getElementsByTagName("body")[0];
	var a = [];
	var re = new RegExp('\\b' + classname + '\\b');
	var els = node.getElementsByTagName("*");
	for(var i=0,j=els.length; i<j; i++) {
		if(re.test(els[i].className)) {
			a.push(els[i]);
		}
	}
	return a;
}


function $id(id) {
	var object = document.getElementById(id);
	return object;
}


function scan_map() {
	var cont_tb = $id('info_content').getElementsByTagName("tbody")[0];
	remove_info(cont_tb);

	switch(getElementsByClassName("map").length) {
	case 1:
		map = getElementsByClassName("map")[0];
		break;

	case 2:
		map = getElementsByClassName("map")[1];
		break;
	}
	var tds = map.getElementsByTagName("td");
	for(var j = 0; j<tds.length;j++) {
		if(tds[j].getElementsByTagName('a').length == 1) {
			tds[j].getElementsByTagName("img")[0].setAttribute("id",j);
			tds[j].getElementsByTagName("img")[0].addEventListener("mouseover",function(e) {add_info_to_map(e.target.id);}, false);
		}
	}
}


function diffhour (last_att) {
	var att_time = last_att.split(" ")[1].split(":");
	var att_date = last_att.split(" ")[0].split(".");
	var att = new Date(("20"+att_date[2]),(att_date[1]-1),att_date[0],att_time[0],att_time[1],0);
	var now = new Date();
	var diff_h = (now.getTime() - att.getTime()) /1000 /3600;
	var gmt = now.getTimezoneOffset()/60+1;
	if ((diff_h+gmt) < 0.0){
		alert("Bitte Systemzeit überprüfen!");
		return 0;
	}
	return diff_h+gmt;
}


function remove_info(cont_tb) {
	if($id('last_att_units')) cont_tb.removeChild($id('last_att_units'));
	if($id('last_att_ressis')) cont_tb.removeChild($id('last_att_ressis'));
	if($id('next_att_units')) cont_tb.removeChild($id('next_att_units'));
	if($id('last_att_zustimmung')) cont_tb.removeChild($id('last_att_zustimmung'));
	if($id('last_att_wall')) cont_tb.removeChild($id('last_att_wall'));
	if($id('last_date')) cont_tb.removeChild($id('last_date'));
}


function add_info_to_map(k) {
	var temp = [];
	var anzahl_werte = 0;
	for (var i=0; (i<6) && (anzahl_werte < 4); i++) {
		if (settings[i+2] == 1) {
			temp[anzahl_werte] = einheit[i];
			anzahl_werte++;
		}
	}
	document.addEventListener('keydown', function (event) {
		switch(event.which) {
			case farmtasteD:
				GM_setValue(server+"_taste",0);
				var xpathResult = document.evaluate('id(\'ds_body\')//tr//td/table[1]//div/p/a', document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
				if (xpathResult.snapshotLength < 2){
					var a = document.createElement("a");
					a.innerHTML="<br>";
					a.appendChild(document.createTextNode("» deaktiviert «"));
					p.appendChild(a);
					div.appendChild(p);
				}
				else {
					GM_setValue(server+"_taste",0);
					xpathResult.snapshotItem(1).textContent = "» deaktiviert «";
				}
				break;
			case farmtaste1:
				GM_setValue(server+"_taste",1);
				var xpathResult = document.evaluate('id(\'ds_body\')//tr//td/table[1]//div/p/a', document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
				if (xpathResult.snapshotLength < 2){
					var a = document.createElement("a");
					a.innerHTML="<br>";
					a.appendChild(document.createTextNode("» " + temp[0] + " aktiviert «"));
					p.appendChild(a);
					div.appendChild(p);
				}
				else {
					GM_setValue(server+"_taste",1);
					xpathResult.snapshotItem(1).textContent = "» " + temp[0] + " aktiviert «";
				}
				break;
			case farmtaste2:
				GM_setValue(server+"_taste",2);
				var xpathResult = document.evaluate('id(\'ds_body\')//tr//td/table[1]//div/p/a', document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
				if (xpathResult.snapshotLength < 2){
					var a = document.createElement("a");
					a.innerHTML="<br>";
					a.appendChild(document.createTextNode("» " + temp[1] + " aktiviert «"));
					p.appendChild(a);
					div.appendChild(p);
				}
				else {
					GM_setValue(server+"_taste",2);
					xpathResult.snapshotItem(1).textContent = "» " + temp[1] + " aktiviert «";
				}
				break;
			case farmtaste3:
				GM_setValue(server+"_taste",3);
				var xpathResult = document.evaluate('id(\'ds_body\')//tr//td/table[1]//div/p/a', document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
				if (xpathResult.snapshotLength < 2){
					var a = document.createElement("a");
					a.innerHTML="<br>";
					a.appendChild(document.createTextNode("» " + temp[2] + " aktiviert «"));
					p.appendChild(a);
					div.appendChild(p);
				}
				else {
					GM_setValue(server+"_taste",3);
					xpathResult.snapshotItem(1).textContent = "» " + temp[2] + " aktiviert «";
				}
				break;
			case farmtaste4:
				GM_setValue(server+"_taste",4);
				var xpathResult = document.evaluate('id(\'ds_body\')//tr//td/table[1]//div/p/a', document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
				if (xpathResult.snapshotLength < 2){
					var a = document.createElement("a");
					a.innerHTML="<br>";
					a.appendChild(document.createTextNode("» " + temp[3] + " aktiviert «"));
					p.appendChild(a);
					div.appendChild(p);
				}
				else {
					GM_setValue(server+"_taste",4);
					xpathResult.snapshotItem(1).textContent = "» " + temp[3] + " aktiviert «";
				}
				break;
		}
	}, true);
	var cont_tb = $id('info_content').getElementsByTagName("tbody")[0];
	remove_info(cont_tb);

	var trs = cont_tb.getElementsByTagName("tr");
	var hidden = 0;
	for(var j = 0; j < trs.length;j++) {
		if(trs[j].style.display == "none") hidden++;
	}
	if ($id('info_bonus_image')) {
		$id('info_bonus_image').setAttribute("rowspan",(8 - (hidden -1)));   // testen
	}
	var map = getElementsByClassName("map")[0];
	var tds = map.getElementsByTagName("td");
	var link = tds[k].getElementsByTagName("a")[0];
	var akt_id = link.href;
	akt_id = akt_id.split("&EDI")[0];
	akt_id = (akt_id.match(/id=/)) ? akt_id.split("id=")[1].split("&")[0] : akt_id;
	akt_id = (akt_id.match(/target=/)) ? akt_id.split("target=")[1].split("&")[0] : akt_id;
		
	var koor_target = tds[k].innerHTML.match(/\((\d+\|\d+)\)/);
	var grau = tds[k].innerHTML.match(/, null, null, false,/);
	var report = GM_getValue(server+"_"+akt_id, false);
	if (report) {
/* report: Holz, Lehm, Eisen, Holzmine , Lehmmine, Eisenmine, Speicher, Versteck, Wall, Dorf-ID, Datum, neueste Bericht-ID, (Zustimmung) */
		var report = report.split(",");
		var ressis = [report[0], report[1], report[2]];
		var show_troups = Boolean(settings[0]);
		var show_ressis = Boolean(settings[1]);
		var show_wall = Boolean(settings[8]);
		var server_speed = Boolean(settings[9]);
		var show_info = Boolean(settings[11]);
		var diff_h = diffhour(report[10]);
		var world = server.match(/(\d+)/)[1];
		
		var speed = gamespeed[0];
		var speed1 = unitspeed[0];
		var speed2 = loy_speed[0];		//speed für Zustimmung

		for (var i=0; i < welten.length;i++) {
			for (var j=0; j < welten[i].length; j++) {
				if (welten[i][j]==world){
					var speed = gamespeed[i+1];
					var speed1 = unitspeed[i+1];
					var speed2 = loy_speed[i+1];
				}
			}
		}
		
		if (show_ressis) {
		/* Bonusdörfer ermitteln */
			var bonuswert = 0.0;
			var bonustyp = 9;
			var bonus = false;
			if (tds[k].innerHTML.match(/\/bonus\//)) {
				for (var i=0; i < bonusliste.length; i++) {
					if (tds[k].innerHTML.match(bonusliste[i])) {
						if (i < 5) {
							bonus = true;			// hat Einfluss auf die Ressi-Produktion
							bonustyp = i;
							bonuswert = tds[k].innerHTML.match(bonusliste[9])[1];
							bonuswert = bonuswert/100;
						}
						break;
					}
				}
			}
		}

	/* Truppen */
		var truppen = ""+GM_getValue(server + "_truppen_" + akt_id, false);
		var truppenHeim = false;
		var truppenAus = false;
		var troops = false;
		if (truppen) {
			truppen = truppen.split(";");
			truppenHeim = truppen[0];
			if (truppen[1]) {
				truppenAus = truppen[1];
			}
			if (!show_troups) {
				if ((truppenHeim != "0,0,0,0,0,0,0,0,0,0,0,0") || ((truppenAus != "") && (truppenAus != "0,0,0,0,0,0,0,0,0,0,0,0"))){
					troops = true;
				}
			}
		}
		if (show_troups) {
			if (truppenHeim) {
				truppenHeim = truppenHeim.split(",");
				row = document.createElement("tr");
				row.setAttribute("id",'last_att_units');
				td1 = document.createElement("td");
				td1.innerHTML = a_text[11]+": ";					// Truppen
				if (truppenAus) {
					truppenAus = truppenAus.split(",");
					td1.innerHTML = "<br>"+a_text[11]+": <br><br>+ "+a_text[12]+": ";	//Truppen auswärts
				}
				td2 = document.createElement("td");
				td2.setAttribute("valign","top");
				td2.setAttribute("colspan","2");

				if (truppenHeim.length == 12) {
					var einheiten = ["spear","sword","axe","archer","spy","light","marcher","heavy","ram","catapult","knight","snob"];
				}
				else if (truppenHeim.length == 11) {
					var einheiten = ["spear","sword","axe","archer","spy","light","marcher","heavy","ram","catapult","snob"];
				}
				else if (truppenHeim.length == 9) {
					var einheiten = ["spear","sword","axe","spy","light","heavy","ram","catapult","snob"];
				}

				var	code = "<tr class=\"center\">";
				var counter = 0;
				for (var i=0; i < truppenHeim.length; i++) {
					if ((truppenHeim[i] >0) || (truppenAus && (truppenAus[i] >0))) {
						counter++;
						code += "<td width=\"35\"><img src=\"/graphic/unit/unit_" + einheiten[i] + ".png\"></td>";
					}
				}

				if (counter >0) {
					code += "</tr><tr class=\"center\">";
				}
				for (var i=0; i < truppenHeim.length; i++) {
					if (parseInt(truppenHeim[i]) == 0) {
						if (truppenAus[i] >0) {
							code += "<td width=\"35\">" + ""+truppenHeim[i] + "</td>";
						}
					}
					else {
						code += "<td width=\"35\">" + ""+truppenHeim[i] + "</td>";
					}
				}
				if (counter == 0) {		// keine Truppen
					if (grau) {
						code += a_text[1];
					}
					else {
						code += a_text[2];;
					}
				}
				code += "</tr>";
				if (truppenAus) {
					code += "<tr class=\"center\">";
					for (var i=0; i < truppenAus.length; i++)
					{
						if (parseInt(truppenAus[i]) == 0) {
							if (truppenHeim[i] >0) {
								code += "<td width=\"35\">" + ""+truppenAus[i] + "</td>";
							}
						} 
						else {
							code += "<td width=\"35\">" + ""+truppenAus[i] + "</td>";
						}
					}
					code += "</tr>";
				}
				var table = document.createElement("table");
				table.setAttribute("class","vis");
				table.innerHTML = code;
				td2.appendChild(table);
				row.appendChild(td1);
				row.appendChild(td2);
				cont_tb.appendChild(row);
			}
		}

	/* Rohstoffe */
		var ResPerHour = [5,30,35,41,47,55,64,74,86,100,117,136,158,184,214,249,289,337,391,455,530,616,717,833,969,1127,1311,1525,1774,2063,2400];
		if ((world == 3) || (world == 9) || (world == 34)){
			ResPerHour = [5,34,40,46,52,60,69,80,92,106,121,140,161,185,212,244,281,323,371,427,491,565,649,747,859,988,1136,1306,1502,1727];
		}
		if (world == 52){
			ResPerHour = [5,15,18,21,25,30,35,42,49,58,69,82,97,115,136,161,191,227,269,318,377,447,530,628,744,882,1045,1238,1467,1739,2060];
		}
		var speicher = [0,1000,1229,1512,1859,2285,2810,3454,4247,5222,6420,7893,9705,11932,14670,18037,22177,27266,33523,41217,50675,62305,76604,94184,115798,142373,175047,215219,264611,325337,400000];
		var speicherstufe = parseInt(report[6]);
		var versteck = [0,150,200,267,356,474,632,843,1125,1500,2000];
		var versteckstufe = parseInt(report[7]);
		var maxres = speicher[speicherstufe] - versteck[versteckstufe] - (versteckstufe>0 && speicherstufe<30);
		if (bonustyp == 4) {
			maxres += Math.floor(speicher[speicherstufe] * bonuswert);
		}
		var ressis1 = [1.0,1.0,1.0];  		// Res Bericht
		var graphic = ["holz","lehm","eisen"];
		var tragen1 = [25,15,10,80,50,50]; 	// Beute tragen
		var duration1 = [18.0,22.0,18.0,10.0,10.0,11.0]; 	// Standard-Dauer 
		var ressis2 = [1.0,1.0,1.0];			// für errechnete Ressis
		var graphicname = ["","","",""];
		var tragen = [0,0,0,0];
		var duration = [0.0,0.0,0.0,0.0];
		var anzahl_werte = 0;
		for (var i=0; (i<6) && (anzahl_werte < 4); i++) {
			obj = grafik[i];
			if (settings[i+2] == 1) {
				duration[anzahl_werte] = duration1[i] * speed1 / speed;  // Dauer pro Feld = Standarddauer mal Einheitengeschw. durch gamespeed
				tragen[anzahl_werte] = tragen1[i];
				graphicname[anzahl_werte] = grafik[i];
				anzahl_werte++;
			}
		}

	/*  Berechnen der Ressis zur aktuellen Zeit (mit Bonusdörfern) */
		var ausgabe = "";
		var unknown = (parseInt(ressis[1]) == -1);
		for (var i=0; i<=2; i++) {
			ressis1[i] = parseInt(ressis[i],10); 	//vorhandene Res
			if (maxres > 100) {					// Res-Berechnung ist möglich
					ressis2[i] += (diff_h * ResPerHour[report[i+3]] * speed);	//berechnete Res
				if (bonus) {
					if ((bonustyp == i) || (bonustyp == 3)) {
						ressis2[i] += (ressis2[i] * bonuswert)	// Bonus addieren
					}
				}
				ressis2[i] += ressis1[i];  		// vorhandene und berechnete addieren
				ausgabe += "<img src=\"/graphic/"+graphic[i]+".png\">";
				if (maxres <= ressis2[i]){
					ausgabe += "<a style=\"color:#FF0000\">";
				}
				else if (0.8*maxres <=ressis2[i]) {
					ausgabe += "<a style=\"color:#EE8000\">";
				}
				else if (bonus) {
					if ((bonustyp == i) || (bonustyp == 3)) {
						ausgabe += "<a style=\"color:#005000\">";
					}
				}
				ressis2[i] = Math.min(maxres, Math.ceil(ressis2[i]));
				if (ressis2[i] >0) {
					ausgabe += trennzeichen(ressis2[i])+" ";
				}
				if ((0.8 * maxres <= ressis2[i]) || (bonustyp == i) || (bonustyp == 3)) {
					ausgabe += "</a>";
				}
			}
			else {  								// keine Res-Berechnung möglich
				ausgabe += "<a style=\"color:#0000B0\"><img src=\"/graphic/"+graphic[i]+".png\" alt=\"\">";
				if (unknown) {
					ausgabe += "<b>?</b></a> ";
				}
				else {
					ausgabe += ressis1[i]+"</a> ";
				}
			}
		}
		if ((show_ressis) && (speicherstufe != 0)) {   		// Rohstoffe anzeigen
			row = document.createElement("tr");
			row.setAttribute("id",'last_att_ressis');
			td1 = document.createElement("td");
			td1.innerHTML = a_text[4]+": ";
			td2 = document.createElement("td");
			td2.setAttribute("colspan","2");
			td2.innerHTML = ausgabe;
			row.appendChild(td1);
			row.appendChild(td2);
			cont_tb.appendChild(row);
		}
		if(anzahl_werte > 0){						// Farmeinheiten anzeigen
			row = document.createElement("tr");
			row.setAttribute("id",'next_att_units');
			td1 = document.createElement("td");
			td1.innerHTML = a_text[5]+": ";
			td2 = document.createElement("td");
			td2.setAttribute("colspan","2");

		/* Berechnen der Ressis für die Laufzeit zum Zieldorf (mit Bonusdörfern) */
			var vstart = koor_start[1].split("|");		// Koordinaten Startdorf  und Zieldorf
			var vtarget = koor_target[1].split("|");
			var fields  = laufzeitfaktor(vstart[0],vstart[1],vtarget[0],vtarget[1]);
			var bedarf  = [0,0,0,0];
			var bedarf1 = [0,0,0,0];
			var ressis3 = [1,1,1,1]; 				//Einheiten
			ausgabe = "";
			for (var i=0; i < anzahl_werte; i++) {
				ressis3[i] = [0,0,0];				// Holz, Lehm, Eisen
				for (var j=0; j <=2; j++) {
					ressis3[i][j] = (fields * duration[i] * ResPerHour[report[j+3]]/60.0);  // Felder mal Laufzeit/Feld mal Ressis/min
					if (bonus) {
						if ((bonustyp == 3) || (bonuswert == j)) {
							ressis3[i][j] =+ (ressis3[i][j] * bonuswert);
						}
					}
					bedarf[i] += Math.min(maxres,Math.ceil(ressis2[j] + ressis3[i][j]));
				}
				bedarf1[i]= parseInt(Math.ceil((bedarf[i] / tragen[i])*1.01)+1);
				ausgabe += " <img src=\"/graphic/unit/unit_"+graphicname[i]+".png\">";
				if (bedarf1[i] >0){
					ausgabe +=trennzeichen(bedarf1[i])+" ";
				}
				else {
					ausgabe += "<b>?</b> ";
				}
			}
			var xpathResult = document.evaluate('id(\'map\')//@href', document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
			var tmp = [];
			taste = parseInt(GM_getValue(server+"_taste",0));
			for(var j = 0; j<xpathResult.snapshotLength; j++){
				tmp[0] = xpathResult.snapshotItem(j).textContent;
				tmp[1] = (tmp[0].match(/id/)) ? tmp[0].split("id=")[1].split("&")[0] : tmp[0].split("target=")[1].split("&")[0];
				tmp[2] = "/game.php?village=";
				tmp[2] += tmp[0].split("village=")[1].split("&")[0];
				tmp[2] += (tmp[0].split("&t=").length>1) ? "&t=" + tmp[0].split("t=")[1].split("&")[0] : "";
				tmp[2] += (tmp[0].split("?t=").length>1) ? "&t=" + tmp[0].split("t=")[1].split("&")[0] : "";
				tmp[2] += ((tmp[1] == akt_id) && (servertest())) ? "&screen=place&mode=command&target="+tmp[1] : "&screen=info_village&id="+tmp[1];
				tmp[2] += ((tmp[1] == akt_id) && (taste > 0)) ? "&EDI="+bedarf1[taste-1]+","+graphicname[taste-1] : "";
				xpathResult.snapshotItem(j).textContent=tmp[2];
			}
			td2.innerHTML = ausgabe;
			row.appendChild(td1);
			row.appendChild(td2);
			cont_tb.appendChild(row);
		}

	/* Gebäude */
		if (show_wall) {
			row = document.createElement("tr");
			row.setAttribute("id",'last_att_wall');
			td1 = document.createElement("td");
			td1.innerHTML = a_text[6]+": ";
			td2 = document.createElement("td");
			td2.setAttribute("colspan","2");
			var counter = 0;
			var ausgabe = "";
			if (speicherstufe > 0) {
				ausgabe = "<img src=\"/graphic/res.png\">";
				ausgabe += speicherstufe+" ";
				if (bonustyp == 4) {
					ausgabe += "<a style=\"color:#005000\">";
				}
				ausgabe += " ("+trennzeichen(maxres)+") ";
				if (bonustyp == 4) {
					ausgabe += "</a>";
				}
				if (versteckstufe > 0) {
					ausgabe += " <img src=\"/graphic/buildings/hide.png\">"+ versteckstufe;
				}
			}
			else {
				for (var x = 3; x < 8; x++) {
					counter += parseInt(report[x]);
				}
			}
			if (counter == -5){
				ausgabe += a_text[3];
			}
			if (report[8] != -1) {
				ausgabe += " <img src=\"/graphic/buildings/wall.png\"> "+report[8];
			}
			if (report.length == 13) {
				var zustimmung = parseInt(report[12]);
				zustimmung += diff_h * speed2;
				zustimmung = Math.min(Math.floor(zustimmung),100);
				ausgabe += " / "+a_text[0]+" " + zustimmung;
			}
			td2.innerHTML = ausgabe;
			row.appendChild(td1);
			row.appendChild(td2);
			cont_tb.appendChild(row);
		}

		if (show_info || troops) {
			var alter = parseInt(diff_h/24);
			if (troops || (alter >= 2)) {
				var ausgabe = "";
				row = document.createElement("tr");
				row.setAttribute("id",'last_date');
				td1 = document.createElement("td");
				td1.innerHTML = a_text[13]+": ";			// Info
				td2 = document.createElement("td");
				td2.setAttribute("colspan","2");
			}
			if (troops) {
				tr_img = document.createElement("img");
				tr_img.setAttribute("src", caution);
				tr_img.setAttribute("style", "vertical-align: bottom");
				td2.appendChild(tr_img);
				td2.appendChild(document.createTextNode(" "+a_text[11]+"! ")); 
			}
			if (alter >= 2) {
				ausgabe += a_text[7];									// Bericht ist über
				if (alter < 14) {
					ausgabe += " <b>"+alter+"</b> "+a_text[8]+" "+a_text[10];	// Tage alt
				}
				else {
					ausgabe += "<a style=\"color:#DD2200\"> <b>"+parseInt(alter/7)+" "+a_text[9]+"</b></a> "+a_text[10]+"!";	// Wochen alt
				}
			}
			if (troops || (alter >= 2)) {
				td2.innerHTML += ausgabe;
				row.appendChild(td1);
				row.appendChild(td2);
				cont_tb.appendChild(row);
			}
		}
	}
}


function laufzeitfaktor(x1,y1,x2,y2) {
	var Ergebnis = (x1-x2)*(x1-x2);
	Ergebnis += (y1-y2)*(y1-y2);
	Ergebnis = Math.sqrt(Ergebnis);
	return Ergebnis;
}

function isNull(val){
	return(val==null);
}

function servertest() {
	if(document.getElementsByClassName("menu nowrap quickbar")[0]){
		var taste = parseInt(GM_getValue(server+"_taste",0));
		return (taste >0) ? true : false;
	}
	return false;
}

function getHref(){
	var parameter = ["village","screen","mode","view","id","target","EDI"];
	var link = document.location.href.split("?")[1].split("&");
	var link2 = eval({});
	for (var i=0; i<link.length;i++){
		link2[link[i].split("=")[0]]=link[i].split("=")[1];
	}
	link = document.location.href.split("?")[0]+"?";
	for (var i=0; i<parameter.length;i++){
		link += parseText(parameter[i] + "=" + link2[parameter[i]]+"&");
	}
	return (link.substring(0,link.length-1));
}

function parseText(text){
	if (text.match(/undefined/)){
		return "";
	}
	return text;
}

function durchschalten(e) {
	var key = e.keyCode;
	var thechar = String.fromCharCode(key);

	switch (thechar){			
		case berichtVor:
			if (link[1] != ""){
				location.href = link[1];
			}
			break;
		case berichtZur:
			if (link[0] != ""){
				location.href = link[0];
			}
			break;
	}
};