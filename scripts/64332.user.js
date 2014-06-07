// ==UserScript==
// @name           Arenameister
// @author         Bouvere
// @version        1.2.11
// @license        GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// @include        http://*gondal*.de/*
// @include        http://*artyria.com/*
// @include        http://*artyria.de/*
// @include        http://*last-emperor.de/*
// @include        http://*lastemperor.de/*
// @description    Dieses Skript ist in der Lage die Arenakämpfe bei Gondal, Artyria und Last Emperor vollständig zu übernehmen, insofern gewünscht. Für eventuelle negative Folgen der Nutzung dieses Skripts übernehme ich keinerlei Verantwortung.
// ==/UserScript==

////////////////////////////////////////////////
// Alle nötigen Einstellungen können über die //
// Benutzerskript-Befehle vorgenommen werden. //
// (Rechtsklick auf das Greasemonkey Symbol)  //
////////////////////////////////////////////////

//Voreinstellungen für die verschiedenen Seiten
//Die Array Elemente sind wie folgt belegt:
// 0: ID des Spiels
// 1: Anzahl der Gegner auf der Arenaseite
// 2: Gibt an der wievielte Link auf der Arenaseite der erste "Angreifen" Link ist
// 3: Gibt an in der wievielten Tabellenzelle der Arenaseite die Ehre des ersten Gegners steht
// 4: Anzahl Tabellenzellen zwischen je zwei Ehrewerten der Gegner
// 5: Gibt an im wievielten "span" Element der Ergebnisseite der Name des Gegners steht
// 6: Gibt an in welcher Tabellenzelle die Beschriftung der "Gilden Ehrenpunkte" Spalte stehen könnte
// 7-12: Unterschiede in den Bezeichnungen, abhängig von der jeweiligen Seite 
// 13: Name des Select Elements mit dem man das Level des gesuchten Gegners festlegt
	if (window.location.hostname.search(/w1.gondal/) >= 0) {
		var Diff = new Array(0,17,17,47,5,3,71,'Gilden Ehrenpunkte','Machtkristalle','Stärke','Intelligenz','Geschicklichkeit','Ausdauer','searchLevel');
	} else if (window.location.hostname.search(/artyria/) >= 0) {
		var Diff = new Array(1,12,6,11,4,9,45,'Legion&nbsp;Ehre','Aureus','Schlagkraft','Scharfsinn','Konzentration','Gesundheit','selectLevel');
	} else if ((window.location.hostname.search(/w2.last-emperor/) >= 0) || (window.location.hostname.search(/w2.lastemperor/) >= 0)) {
		var Diff = new Array(5,12,16,7,4,3,32,'Clan Ehrenpunkte','Edelsteine','Stärke','Fokus','Geschicklichkeit','Ausdauer','searchLevel');
	} else if (window.location.hostname.search(/w2.gondal/) >= 0) {
		var Diff = new Array(3,17,17,47,5,3,71,'Gilden Ehrenpunkte','Machtkristalle','Stärke','Intelligenz','Geschicklichkeit','Ausdauer','searchLevel');
	} else if (window.location.hostname.search(/gondal-de/) >= 0) {
		var Diff = new Array(4,17,17,47,5,3,71,'Gilden Ehrenpunkte','Machtkristalle','Stärke','Intelligenz','Geschicklichkeit','Ausdauer','searchLevel');
	} else if ((window.location.hostname.search(/last-emperor/) >= 0) || (window.location.hostname.search(/lastemperor/) >= 0)) {
		var Diff = new Array(2,12,16,7,4,3,32,'Clan Ehrenpunkte','Edelsteine','Stärke','Fokus','Geschicklichkeit','Ausdauer','searchLevel');
	}

//Laden der Einstellungen und anderer Informationen die zuvor gespeichert wurden
	var Ehre = GM_getValue("Ehre" + Diff[0], "Ehre / Name");
	var MK   = parseInt(GM_getValue("MK"   + Diff[0], "Anzahl an MK"));
	var Zeit = parseInt(GM_getValue("Zeit" + Diff[0], "Mindestwartezeit"));
	var Gold = parseInt(GM_getValue("Gold" + Diff[0], 0));
	var GegnerLvl = parseInt(GM_getValue("GegnerLvl" + Diff[0], 0));
	var Lvl  = parseInt(GM_getValue("Lvl"  + Diff[0], 1));
	var Eigenschaften = new Array(parseInt(GM_getValue("Str"  + Diff[0], 0)),parseInt(GM_getValue("Int"  + Diff[0], 0)),parseInt(GM_getValue("Ski"  + Diff[0], 0)),parseInt(GM_getValue("End"  + Diff[0], 0)));
	
//Menü initialisieren
	var Minimum = parseInt(makeMenuInput('Minimum',750,'Bitte die Mindestwartezeit in Millisekunden angeben','Wartezeit'));
	var Maximum = parseInt(makeMenuInput('Maximum',2000,'Bitte die Höchstwartezeit in Millisekunden angeben','Wartezeit'));
	var MinGold = parseInt(makeMenuInput('MinGold',100,'Bitte den Goldbetrag eingeben, ab dem ein Gegner weiter angegriffen werden soll, bis er weniger als den angegebenen Betrag an Gold abwirft.','Automatisierung'));
	if (Diff[0] == 1) var Volk = parseInt(makeMenuInput('Volk',0,'Wähle das Volk aus, dass du angreifen möchtest. Hierzu bitte die entsprechende Zahl angeben.\nAuf Gondal und Last Emperor hat dieser Wert keine Auswirkungen.\n0: Alle Völker\n1: Ägypter\n2: Babylonier\n3: Germanen\n4: Griechen\n5: Karthager\n6: Perser\n7: Phönizier\n8: Römer\n9: Wikinger','Artyria'));
	var Arbeiten = false;
	//var Arbeiten = makeMenuToggle('Arbeiten',true,'In Wartezeit arbeiten gehen','In Wartezeit nicht arbeiten gehen','Arbeit');

//Funktion zum Erstellen eines Menüs, auf das über das Greasemonkey Icon zugegriffen werden kann
	function makeMenuInput(key, defaultValue, question, prefix) {
		var Value = GM_getValue(key + Diff[0], defaultValue);
		GM_registerMenuCommand((prefix ? prefix+": " : "") + key + ' ('+Value+')', function() {
			GM_setValue(key + Diff[0],prompt(question,defaultValue));
		});
		return Value;
	}

//Funktion zum Erstellen eines Umschaltmenüs
	function makeMenuToggle(key, defaultValue, toggleOn, toggleOff, prefix) {
		var Value = GM_getValue(key + Diff[0], defaultValue);
		GM_registerMenuCommand((prefix ? prefix+": " : "") + (Value ? toggleOn : toggleOff), function() {
			GM_setValue(key + Diff[0], !Value);
			location.reload();
		});
		return Value;
	}

//Funktion die die Zeit formatiert als Zeichenkette zurückgibt
	function GibZeit() {
		var Uhrzeit = new Date();
		var Stunden = Uhrzeit.getHours();
		if (Stunden < 10) Stunden = "0" + Stunden;
		var Minuten = Uhrzeit.getMinutes();
		if (Minuten < 10) Minuten = "0" + Minuten;
		var Sekunden= Uhrzeit.getSeconds();
		if (Sekunden < 10) Sekunden = "0" + Sekunden;
		return Stunden + ':' + Minuten + ':' + Sekunden;
	}

//Funktion zum Laden einer neuen Seite
	function LadeSeite(Pfad) {
		window.setTimeout('window.location.pathname = "' + Pfad + '"', GetRandom(Minimum,Maximum));
	}

//Zufallsgenerator. Gibt eine Zahl zwischen min und max zurück
	function GetRandom( min, max ) {
		if( min > max ) {
			return( -1 );
		}
		if( min == max ) {
			return( min );
		}
		return( min + parseInt( Math.random() * ( max-min+1 ) ) );
	}

//Funktion die eine Zahl zurück gibt, die angibt der wievielte Link auf der Arenaseite der Link zum Gegner mit maximal MaxEhre ist
	function Suche(MaxEhre) {
		var Ehrarray = new Array(Diff[1]);
		for (var i = 0; i < Diff[1]; i++) {
			Ehrarray[i] = new Array(2);
			Ehrarray[i][0] = Diff[2] + 2*i;
			Ehrarray[i][1] = document.getElementsByTagName("td")[Diff[3] + Diff[4]*i].innerHTML;
		}
		Ehrarray.sort(arrsort);
		if(Ehrarray[0][1] <= MaxEhre) {
			i = 0;
			while (i < Ehrarray.length - 1 && Ehrarray[i+1][1] <= MaxEhre) i++;
			return Ehrarray[i][0];
		} else return false;
	}

//Einfache Funktion zum Vergleich zweier Arrays. Wird zum sortieren benötigt
	function arrsort(a, b) {
	  return a[1] - b[1];
	}
	
//Funktion die den Goldbetrag des letzten Gegners zurückgibt
	function GibLetztenGegner() {
		if (Statistik == '') return new Array(0,'');
		else {
			var i = 0;
			while (Statistik[1 + 6*i].split(" ")[0] == "Skillung" || Statistik[1 + 6*i] == "Bankeinzahlung") i++;
			return new Array(Statistik[5 + 6*i],Statistik[1 + 6*i]);
		}
	}

// Die folgenden zwei Funktionen müssen leider so umständlich gemacht werden, da sonst kein Zugriff der Seite auf Skripteinstellungen möglich sind.
// Informationen hierzu: http://wiki.greasespot.net/0.7.20080121.0_compatibility

//Funktion zum speichern der Einstellungen
	unsafeWindow.EinstellungenSpeichern = function(zEhre,zMK,zZeit,zGold,zGegnerLvl) {
		window.setTimeout(GM_setValue, 0, 'Aktiv' + Diff[0], true);
		window.setTimeout(GM_setValue, 0, 'Ehre'  + Diff[0], zEhre);
		window.setTimeout(GM_setValue, 0, 'MK'    + Diff[0], zMK);
		window.setTimeout(GM_setValue, 0, 'Zeit'  + Diff[0], zZeit);
		window.setTimeout(GM_setValue, 0, 'Gold'  + Diff[0], zGold);
		window.setTimeout(GM_setValue, 0, 'GegnerLvl'  + Diff[0], zGegnerLvl);
	}

// Sollte es einmal zu Problemen kommen ruft einfach die Funktion Deaktivieren() auf und das Skript sollte nicht mehr weiter arbeiten
unsafeWindow.Deaktivieren = function() {
	window.setTimeout(GM_setValue, 0, 'Aktiv' + Diff[0], false);
}

var Statistik = GM_getValue('Statistik' + Diff[0], '').split("\\");
unsafeWindow.Statistik = Statistik;

// StatistikBereinigen(Art,Grenze,Anzahl)
// gelöscht werden
// Art: 
//	0  (alle Einträge)
//	1  (nur Ereignisse)
//	2  (nur Gegner)
// mit 
// Grenze: 
//	0  (beliebigem Goldbetrag)
// 	>0 (weniger als dem angegebenen Goldbetrag)
// und dies in
// Anzahl:
//	0  (unbegrenzter Anzahl)
//	>0 (durch angegebenen Wert begrenzter Anzahl)
//
// So löscht StatistikBereinigen(2,200,5) die 5 letzten Gegner mit weniger als 200 Gold
// und StatistikBereinigen(1,0,10) die letzten 10 Ereignisse
// und StatistikBereinigen(0,0,0) die gesamte Statistik
// Die Funktion gibt die tatsächlich gelöschte Anzahl zurück, durch Aufruf von z.B.
// alert(StatistikBereinigen(1,0,10)) erfahrt ihr ob wirklich 10 Einträge gelöscht wurden.

unsafeWindow.StatistikBereinigen = function(Art,Grenze,Anzahl) {
	if (Art == 0 && Grenze == 0 && Anzahl == 0) {
		var ErgAnz = parseInt(Statistik.length/6);
		window.setTimeout(GM_setValue, 0, 'Statistik' + Diff[0], '');
	} else {
		var ZuLoeschen = new Array();
		for (var i = parseInt(Statistik.length/6) - 1; i >= 0; i--) {
			if ((Anzahl == 0) || (ZuLoeschen.length < Anzahl)) {
				if ((Art == 0) || ((Statistik[i*6+1] == 'Bankeinzahlung' || Statistik[i*6+1].split(' ')[0] == 'Skillung') ? (Art == 1) : (Art == 2)))
					if ((Grenze == 0) || (Statistik[i*6+5] < Grenze))
						ZuLoeschen.push(i);
			} else break;
		}
		var Bereinigt = new Array();
		var ErgAnz = ZuLoeschen.length;
		if (ZuLoeschen.length > 0) {
			for (var i = parseInt(Statistik.length/6) - 1; i >= 0; i--) {
				if (i == ZuLoeschen[0])	ZuLoeschen.shift()
				else for (var j = 5; j >= 0; j--) Bereinigt.unshift(Statistik[i*6+j]);
			}
			Statistik = Bereinigt;
		}
		window.setTimeout(GM_setValue, 0, 'Statistik' + Diff[0], Statistik.join("\\"));
	}
	return ErgAnz + ' Element(e) wurde(n) gelöscht';
}

function ErweitereStatistik(Zeit, Name, HP, Ehre, Gilde, Gold) {
	Statistik.unshift(Zeit, Name, parseInt(HP*10000)/10000, Ehre, Gilde, Gold);
	GM_setValue('Statistik' + Diff[0], Statistik.join("\\"));
}

function Statistikausgabe() {
	var Code = "<table><tr><td>Zeit</td><td>Name</td><td>RestHP</td><td>Ehre</td><td>Gildenehre</td><td>Gold</td></tr>";
	for (var i = 0; i < parseInt(Statistik.length/6); i++) {
		Code = Code + '<tr><td>' + Statistik[6*i] + '</td><td><span onclick="javascript:document.getElementById(\'MaxEhre\').value = \'' + (Statistik[6*i+1]) 
		+ '\'" style="color: ' + ((Statistik[6*i+3] > 0) ? 'green' : 'red') + ';">' + (Statistik[6*i+1]) + '</span></td><td>' 
		+ parseInt(Statistik[6*i+2]*10000)/100 + '%</td><td>' + Statistik[6*i+3] + '</td><td>' + Statistik[6*i+4] + '</td><td><span style="color: rgb(255,' 
		+ parseInt(255 - Math.min(255,Math.sqrt(Statistik[6*i+5]*50))) + ',' + parseInt(255 - Math.min(255,Math.sqrt(Statistik[6*i+5]*50))) + ');">' + Statistik[6*i+5] + '</span></td></tr>';
	}
	Code.concat("</table>");
	return Code;
}

if (GM_getValue('Aktiv' + Diff[0], false) || window.location.pathname == "/fights/waitFight" || window.location.pathname == "/characters/index") {
	if (window.location.pathname == "/characters/index") {
		GM_setValue('Lvl' + Diff[0],unsafeWindow.charLevel);
		GM_setValue('Str' + Diff[0],unsafeWindow.baseStr);
		GM_setValue('Int' + Diff[0],unsafeWindow.baseInt);
		GM_setValue('Ski' + Diff[0],unsafeWindow.baseSkill);
		GM_setValue('End' + Diff[0],unsafeWindow.baseSta);
		var Einstellungen = document.createElement("div");
		Einstellungen.innerHTML = 'Zum aktivieren des Autokampfsystems bitte die Ehre oder den Spielernamen des gewünschten Gegners angeben. Es wird automatisch der Gegner angegriffen der weniger oder gleich viel Ehre wie angegeben besitzt oder bei Angabe des Namens der entsprechende Spieler. Wenn bei einer langen Wartezeit automatisch ' + Diff[8] + ' benutzt werden sollen um schneller angreifen zu können geben sie sowohl Anzahl als auch Wartezeit (in Sekunden) an, ab der die ' + Diff[8] + ' eingesetzt werden sollen. Möchten sie keine ' + Diff[8] + ' nutzen füllen sie bitte beide Felder mit einer "0". <br><img src="http://frontend1.gondal.de/img/img/icons/ehre.gif" alt="MaxEhre"></img><input id="MaxEhre" value="' + Ehre + '"></input><img src="http://frontend1.gondal.de/img/img/icons/machtkristall.gif" alt="MaxMK"></img><input id="MaxMK" value="' + MK + '"></input><img src="http://frontend1.gondal.de/img/img/icons/time.gif" alt="MinTime"></img><input id="MinTime" value="' + Zeit + '"></input><select id="Gold"><option>Gold behalten</option><option>Zur Bank bringen</option><option>'+Diff[9]+' skillen</option><option>'+Diff[10]+' skillen</option><option>'+Diff[11]+' skillen</option><option>'+Diff[12]+' skillen</option></select> Gegnerlevel (0 für alle Level): <input id="GegnerLvl" value="' + GegnerLvl + '"></input><br><input type="button" value="Automatisierung aktivieren" onclick=\'javascript:EinstellungenSpeichern(document.getElementById("MaxEhre").value,document.getElementById("MaxMK").value,document.getElementById("MinTime").value,document.getElementById("Gold").selectedIndex,document.getElementById("GegnerLvl").value);alert("Werte wurden gespeichert und die Automatisierung aktiviert");\'></input><input type="button" value="Automatisierung deaktivieren" onclick=\'javascript:Deaktivieren();alert("Automatisierung deaktiviert");\'></input><br>Lösche die ältesten <input id="Anzahl" value="0"/> <select id="Art"><option>Einträge</option><option>Ereignisse</option><option>Gegner</option></select> mit weniger als <input id="Grenze" value="0"/> Gold <input type="button" onclick=\'javascript:alert(StatistikBereinigen(document.getElementById("Art").selectedIndex,parseInt(document.getElementById("Grenze").value),parseInt(document.getElementById("Anzahl").value)))\' value="Löschen"/>';
		Einstellungen.innerHTML = Einstellungen.innerHTML + Statistikausgabe();
		document.getElementsByClassName("content-bg")[0].appendChild(Einstellungen);
		document.getElementById("Gold").selectedIndex = Gold;
	}
	if (window.location.pathname == "/fights/start") {
		if (!isNaN(Ehre) && GibLetztenGegner()[0] < MinGold && (GegnerLvl > 0 && !(Diff[0] == 1 || (document.getElementsByTagName("td")[Diff[3] - ((Diff[0] == 0 || Diff[0] == 3 || Diff[0] == 4)?3:2)].innerHTML == GegnerLvl && document.getElementsByTagName("td")[Diff[3] + Diff[4]*(Diff[1]-1) - ((Diff[0] == 0 || Diff[0] == 3 || Diff[0] == 4)?3:2)].innerHTML == GegnerLvl)) || (Diff[0] == 1 && ((GegnerLvl > 0 && document.getElementsByName("selectLevel")[0].selectedIndex != GegnerLvl) || document.getElementsByName("selectRace")[0].selectedIndex != Volk)))) {
			if (Diff[0] == 1) {
				document.getElementsByName("selectRace")[0].selectedIndex = Volk;
				if (GegnerLvl != 0) {
					document.getElementsByName("selectLevel")[0].selectedIndex = GegnerLvl;
				}
				window.setTimeout('document.getElementsByTagName("form")[1].submit()',GetRandom(750,2000));
			} else {
				document.getElementsByName("searchLevel")[0].selectedIndex = GegnerLvl - 1;
				window.setTimeout('document.getElementsByTagName("form")[0].submit()',GetRandom(750,2000));
			}
		} else {
			if (isNaN(Ehre) || GibLetztenGegner()[0] >= MinGold) {
				if (!isNaN(Ehre)) Ehre = GibLetztenGegner()[1];
				if (Diff[0] == 1) {
					if (document.getElementById("flashMessage") == null) {
						document.getElementsByName("data[Character][name]")[0].value = Ehre;
						window.setTimeout('document.getElementsByTagName("form")[0].submit()',GetRandom(750,1250));
					} else {
						Deaktivieren();
						document.getElementById("flashMessage").innerHTML = document.getElementById("flashMessage").innerHTML + " Deshalb wurde die Automatisierung der Arenakämpfe beendet. Um sie erneut zu starten einfach einen anderen Namen oder Ehre auf der Warteseite zwischen Arenakämpfen angeben.";
					}
				} else {
					if (document.getElementsByTagName("td")[Diff[3] - 1].innerHTML.split(">")[1].split("<")[0] == Ehre)
						LadeSeite(document.getElementsByTagName("a")[Diff[2]].pathname);
					else { 
						document.getElementsByName("data[Character][name]")[0].value = Ehre;
						window.setTimeout('document.getElementsByTagName("form")[1].submit()',GetRandom(750,1250));
					}
				}
			} else {
				var Pos = Suche(parseInt(Ehre));
				if (!(Pos===false)) LadeSeite(document.getElementsByTagName("a")[Pos].pathname)
				else LadeSeite("/fights/start");
			}
		}
	}
	if (window.location.pathname.split("/")[1] == "fights" && window.location.pathname.split("/")[2] == "start" && window.location.pathname.split("/").length > 3)
		LadeSeite("/fights/start");
	if (window.location.pathname == "/fights/fight")
		if (Diff[0] != 1)
			LadeSeite(document.getElementById("fighttostats").innerHTML.split('"')[1])
		else window.setTimeout('window.location.pathname = "/fights/fight"',GetRandom(120000,180000));
	//Speichern der Kampfergebnisse
	if (window.location.pathname.split("/")[2] == "results") {
		var StatName = document.getElementsByTagName("span")[Diff[5]].innerHTML;
		var StatAtt  = parseFloat(document.getElementsByTagName("strong")[(Diff[0] == 1) ? 12 : 14].innerHTML.split(" / ")[0] / document.getElementsByTagName("strong")[(Diff[0] == 1) ? 12 : 14].innerHTML.split(" / ")[1]);
		var StatDef  = parseFloat(document.getElementsByTagName("strong")[(Diff[0] == 1) ? 13 : 15].innerHTML.split(" / ")[0] / document.getElementsByTagName("strong")[(Diff[0] == 1) ? 13 : 15].innerHTML.split(" / ")[1]);
		var StatEhre = document.getElementsByTagName("strong")[(Diff[0] == 1) ? 14 : 16].innerHTML.split(">")[(Diff[0] != 1) ? 0 : 1].split(" ")[0];
		var StatGilde= (document.getElementsByTagName("td")[Diff[6]].innerHTML != Diff[7]) ? '' : document.getElementsByTagName("strong")[(Diff[0] == 1) ? 16 : 18].innerHTML.split(">")[(Diff[0] != 1) ? 0 : 1].split(" ")[0];
		var StatGold = document.getElementsByTagName("strong")[(document.getElementsByTagName("td")[Diff[6]].innerHTML == Diff[7]) ? (Diff[0] == 1) ? 18 : 20 : (Diff[0] == 1) ? 16 : 18].innerHTML.split(">")[(Diff[0] != 1) ? 0 : 1].split("<")[0].split(" ")[0];
		ErweitereStatistik(GibZeit(),StatName,Math.max(StatAtt,StatDef),StatEhre,StatGilde,StatGold);
		LadeSeite("/fights/start");
	}
	if (window.location.pathname == "/fights/searchCharacter")
		LadeSeite(document.getElementsByTagName("a")[1].pathname);
	if (window.location.pathname == "/fights/waitFight") {
		if (typeof( unsafeWindow.timers ) != "undefined" && typeof( unsafeWindow.timers["remaining"] ) != "undefined") {
			var currentGold = document.getElementById("currentGold").innerHTML;
			if (Gold == 1 && (currentGold - (100 + 20*Lvl)) > 100) {
				GM_xmlhttpRequest({
					method: "POST",
					url:'http://' + location.host + '/bank/einzahlen',
					headers:{'Content-type':'application/x-www-form-urlencoded'},
					data:"data[Bank][in]=" + (currentGold - (100 + 20*Lvl))
				});
				ErweitereStatistik(GibZeit(),'Bankeinzahlung',0,'Gebühr:',parseInt((currentGold - (100 + 20*Lvl))*0.1),parseInt((currentGold - (100 + 20*Lvl))*0.9));
				document.getElementById("currentGold").innerHTML = 100 + 20*Lvl;
			} else if (Gold > 1) {
				while (currentGold >= (Eigenschaften[Gold - 2]*5 - 40)) {
					var Link = "";
					Eigenschaften[Gold - 2]++;
					switch (Gold) {
						case 2: Link = 'http://' + location.host + '/characters/charLeft/strength'; 
						GM_setValue('Str' + Diff[0], Eigenschaften[0]); break;
						case 3: Link = 'http://' + location.host + '/characters/charLeft/intelligence'; 
						GM_setValue('Int' + Diff[0], Eigenschaften[1]); break;
						case 4: Link = 'http://' + location.host + '/characters/charLeft/skill'; 
						GM_setValue('Ski' + Diff[0], Eigenschaften[2]); break;
						case 5: Link = 'http://' + location.host + '/characters/charLeft/endurance'; 
						GM_setValue('End' + Diff[0], Eigenschaften[3]); break;
					}
					GM_xmlhttpRequest({
						method: "GET",
						url:Link,
						headers:{'Content-type':'application/x-www-form-urlencoded'},
						data:""
					});
					ErweitereStatistik(GibZeit(),'Skillung ' + Diff[7 + Gold],0,'auf',Eigenschaften[Gold - 2],(Eigenschaften[Gold - 2]*5 - 45));
					currentGold -= Eigenschaften[Gold - 2]*5 - 45;
					document.getElementById("currentGold").innerHTML = currentGold;
				}				
			}
			var RemTime = unsafeWindow.timers["remaining"]["time"]
			if (MK > 0 && RemTime > Zeit) {
				MK--;
				unsafeWindow.EinstellungenSpeichern(Ehre,MK,Zeit,Gold);
				LadeSeite("/fights/waitFight/buy");
			} else {
				var Einstellungen = document.createElement("div");
				Einstellungen.innerHTML = 'Zum aktivieren des Autokampfsystems bitte die Ehre oder den Spielernamen des gewünschten Gegners angeben. Es wird automatisch der Gegner angegriffen der weniger oder gleich viel Ehre wie angegeben besitzt oder bei Angabe des Namens der entsprechende Spieler. Wenn bei einer langen Wartezeit automatisch ' + Diff[8] + ' benutzt werden sollen um schneller angreifen zu können geben sie sowohl Anzahl als auch Wartezeit (in Sekunden) an, ab der die ' + Diff[8] + ' eingesetzt werden sollen. Möchten sie keine ' + Diff[8] + ' nutzen füllen sie bitte beide Felder mit einer "0". <br><img src="http://frontend1.gondal.de/img/img/icons/ehre.gif" alt="MaxEhre"></img><input id="MaxEhre" value="' + Ehre + '"></input><img src="http://frontend1.gondal.de/img/img/icons/machtkristall.gif" alt="MaxMK"></img><input id="MaxMK" value="' + MK + '"></input><img src="http://frontend1.gondal.de/img/img/icons/time.gif" alt="MinTime"></img><input id="MinTime" value="' + Zeit + '"></input><select id="Gold"><option>Gold behalten</option><option>Zur Bank bringen</option><option>'+Diff[9]+' skillen</option><option>'+Diff[10]+' skillen</option><option>'+Diff[11]+' skillen</option><option>'+Diff[12]+' skillen</option></select> Gegnerlevel (0 für alle Level): <input id="GegnerLvl" value="' + GegnerLvl + '"></input><br><input type="button" value="Automatisierung aktivieren" onclick=\'javascript:EinstellungenSpeichern(document.getElementById("MaxEhre").value,document.getElementById("MaxMK").value,document.getElementById("MinTime").value,document.getElementById("Gold").selectedIndex,document.getElementById("GegnerLvl").value);alert("Werte wurden gespeichert und die Automatisierung aktiviert");\'></input><input type="button" value="Automatisierung deaktivieren" onclick=\'javascript:Deaktivieren();alert("Automatisierung deaktiviert");\'></input><br>Lösche die ältesten <input id="Anzahl" value="0"/> <select id="Art"><option>Einträge</option><option>Ereignisse</option><option>Gegner</option></select> mit weniger als <input id="Grenze" value="0"/> Gold <input type="button" onclick=\'javascript:alert(StatistikBereinigen(document.getElementById("Art").selectedIndex,parseInt(document.getElementById("Grenze").value),parseInt(document.getElementById("Anzahl").value)))\' value="Löschen"/>';
				Einstellungen.innerHTML = Einstellungen.innerHTML + Statistikausgabe();
				document.getElementById("wrapper").appendChild(Einstellungen);
				document.getElementById("Gold").selectedIndex = Gold;
				if (RemTime > Math.max(Zeit,60) && GM_getValue('Aktiv' + Diff[0], false) && Arbeiten) {
					GM_xmlhttpRequest({
						method: "POST",
						url:'http://' + location.host + "/services/index/gold",
						headers:{'Content-type':'application/x-www-form-urlencoded'},
						data:"data[Service][duration]=" + Math.floor(RemTime/36)/100
					});
				}				
			}
		} else {
			LadeSeite("/fights/start");
		}
	}
	//Schreiben in den Stundenanzahl Feldern beim Arbeiten erlauben
	if (window.location.pathname.split("/")[2] == "index" && window.location.pathname.split("/").length > 3) {
		if (Diff[0] != 1) document.getElementById("valueInput").removeAttribute("readonly") 
		else {
			document.getElementsByName("data[Service][duration]")[1].removeAttribute("readonly");
			document.getElementsByName("data[Service][duration]")[1].removeAttribute("typelock");
		}
	}
	if (window.location.pathname == "/services/finish")
		LadeSeite("/fights/start");
	if (window.location.pathname == "/services/serve/")
		window.setTimeout('window.location.pathname = "/services/serve/"', GetRandom(120000,180000));
	if (window.location.pathname == "/services/index")
		window.setTimeout('window.location.pathname = "/fights/start"', GetRandom(20000,40000));
}

// Autoupdate Code von http://userscripts.org/scripts/show/38017
// The following code is released under public domain.

var AutoUpdater = {
 id: 43453,
 days: 1,
 version: '1.2.8',
 name: 'Arenameister',
 time: new Date().getTime(),
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  onload: function(xpr) {AutoUpdater.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
    this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
    if ( (this.xversion) && (this.xname[1] == this.name) ) {
      this.xversion = this.xversion[1].replace(/\./g, '');
      this.xname = this.xname[1];
    } else {
      if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) 
	GM_setValue('updated_43453', 'off');
      return false;
    }
    if ( (+this.xversion > +this.version.replace(/\./g, '')) && (confirm('Eine Neue Version des '+this.xname+' Userscripts ist verfügbar. Willst du ein Update ausführen?')) ) {
      GM_setValue('updated_43453', this.time+'');
      top.location.href = 'https://userscripts.org/scripts/source/'+this.id+'.user.js';
    } else if ( (this.xversion) && (+this.xversion > +this.version.replace(/\./g, '')) ) {
      if(confirm('Willst du die automatische Updatefunktion ausschalten?')) {
	GM_setValue('updated_43453', 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated_43453', new Date().getTime()+''); AutoUpdater.call(true);});
	alert('Die automatischen Updates können über die Benutzerskript-Befehle Leiste wieder aktiviert werden.');
      } else {
	GM_setValue('updated_43453', this.time+'');
      }
    } else {
      if(response) alert('Keine Updates verfügbar für '+this.name);
      GM_setValue('updated_43453', this.time+'');
    }
  },
 check: function() {
    if (GM_getValue('updated_43453', 0) == 0) GM_setValue('updated_43453', this.time+'');
    if ( (GM_getValue('updated_43453', 0) != 'off') && (+this.time > (+GM_getValue('updated_43453', 0) + (1000*60*60*24*this.days))) ) {
      this.call();
    } else if (GM_getValue('updated_43453', 0) == 'off') {
      GM_registerMenuCommand("Aktiviere "+this.name+" Updates", function(){GM_setValue('updated_43453', new Date().getTime()+'');AutoUpdater.call(true);});
    } else {
      GM_registerMenuCommand("Überprüfe "+this.name+" auf Updates", function(){GM_setValue('updated_43453', new Date().getTime()+'');AutoUpdater.call(true);});
    }
    }
};
if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') AutoUpdater.check();