// ==UserScript==
// @name           LidORS
// @namespace      LidORS
// @description    organise espionage reports in a short overview-table
// @include        http://*.ogame.*/game/index.php?*page=*
// @vOGgame        5.6.9
// @version        1
// @author         	Lidmaster
// @require        http://userscripts.org/scripts/source/118453.user.js
// @updateURL      http://userscripts.org/scripts/source/176889.meta.js
// @downloadURL    https://userscripts.org/scripts/source/176889.user.js
// ==/UserScript==


(function(){
	
	// unsafeWindow bzw. window
	var unsafe = (typeof unsafeWindow) != "undefined" ? unsafeWindow : window;
	// jQuery verfuegbar machen
	var $ = jQuery = unsafe.jQuery;
	// abbrechen wenn jQuery nicht verfuegbar ist
	if ( !$ ) return;

	// GM-fix
	if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported") != -1)) {
		this.GM_getValue = function(key, def){
			return localStorage[key] || def;
		};
		this.GM_setValue = function(key, value){
			return localStorage[key] = value;
		};
		this.GM_deleteValue = function(key){
			return delete localStorage[key];
		};
	}

	// GM setValue erweiterung mit JSON
	var setValue = function(key, value) {
		GM_setValue(key, JSON.stringify(value));
	}

	// GM getValue erweiterung mit JSON
	var getValue = function(key, def) {
		var value = GM_getValue(key);
		if (value === undefined) return def;
		return JSON.parse(value);
	} 

	// oGameVersionCheck laden
//	try { oGameVersionCheck('ORS','1','http://userscripts.org/scripts/show/176889'); } catch(e) {}

	// universum adresse aus den meta-daten laden
	var ogameUniverse = $('meta[name=ogame-universe]').attr('content');

	// alte speicher variablen entfernen
	GM_deleteValue(ogameUniverse + '_DFpercent');											// v2.1
	GM_deleteValue(ogameUniverse + '_techID');												// v2.1
	GM_deleteValue(ogameUniverse + '_techName');											// v2.1
	GM_deleteValue(ogameUniverse + '_selected');											// v3.4
	GM_deleteValue(ogameUniverse + '_sorting');												// v3.5
	GM_deleteValue(ogameUniverse + '_data');												// v4.0
	GM_deleteValue(ogameUniverse + '_data_4_1');											// v4.1
	// neue speicher variable
	var dataName = '_data_4_4';																// v4.4
	
	// default daten erstellen
	var defaults = {
		UNI:		ogameUniverse,
		NAME:		dataName,
		T0:			"SpioHelper: some data for usage are not loaded yet - please try again",
		T1:			"sort",
		T2:			"summary of espionage reports",
		T3:			"coordinates",
		T4:			"age",
		T5:			"player (<span style='color:#99CC00;font-weight:normal;'>activity</span>)", // alternativ dazu (/^(.+):/.exec($.trim($('li#playerName').text())||'player:'))[1] -> player/Spieler/...
		T6:			"loot",
		T7:			"DF",
		T8:			"DEF",
		T9:			"jump to spy report",
		T10:		'max. $1 ' + ($.trim($('div#countColonies .textCenter').text()).split(' '))[1],
		T11:		 $('ul#menuTable a.menubutton[href$="page=galaxy"] .textlabel').text() + ': show position $1',
		T12:		"count",
		T13:		"no data",
		T14:		"actions",
		T15:		"check/uncheck all",
		T16:		"invested resources",
		T17:		"points",
		T18:		"check/uncheck report",
		T19:		"open/close settings",
		T20:		"add",
		T21:		"save",
		T22:		$('ul#menuTable a.menubutton[href$="page=fleet1"] .textlabel').text(),		// flotte
		T23:		$('ul#menuTable a.menubutton[href$="page=defense"] .textlabel').text(),		// verteidigung
		T24:		"preferred ship order",
		T25:		"open FLEET1 in new tab/window",
		T26:		"action buttons after ...",
		T27:		"number-format in table",
		T28:		"minimize/maximize table",
		T29:		"send extra ships",
		R1:			 (/^(.+):|/.exec($('#metal_box').attr('title')||'metal:|'))[1],					// metall
		R2:			 (/^(.+):|/.exec($('#crystal_box').attr('title')||'crystal:|'))[1],					// kristall
		R3:			 (/^(.+):|/.exec($('#deuterium_box').attr('title')||'deuterium:|'))[1],				// deuterium
		R4:			 (/^(.+):|/.exec($('#energy_box').attr('title')||'energy:|'))[1],					// energie
		R5:			 (/^(.+):|/.exec($('#darkmatter_box a').attr('title')||'darkmatter:|'))[1]				// dunkle materie
	};    
	// gespeicherte daten laden
	var saved = getValue(ogameUniverse + dataName, {});

	// die gespeicherten daten durch die default daten ergaenzen bzw partiell ersetzen
	var data = $.extend({}, saved, defaults);

	// variable/flag um festzuhalten ob alle daten geladen wurden und das skript "normal" ausgefuehrt werden kann
	var ready = true;

	// default einstellungen fuer die initial-sortierung
	if (data.SORT === undefined || $.isEmptyObject(data.SORT)) {
		data.SORT = {
			REL:		'age',
			INVERSE:	false
		};
		setTimeout(function(){ setValue(ogameUniverse + dataName, data); },0);
	}
	
	// default einstellungen fuer die bevorzugte transporterart
	if (data.BEVORZUGT === undefined || !$.isArray(data.BEVORZUGT)) {
		data.BEVORZUGT = new Array();
		data.BEVORZUGT.push('A202');
		data.BEVORZUGT.push('A203');
		setTimeout(function(){ setValue(ogameUniverse + dataName, data); },0);
	}
	
	// default einstellung fuer die anzeige der action-buttons (nach welcher spalte)
	if (data.ACTIONCOLUMN === undefined) {
		data.ACTIONCOLUMN = 'def';
		setTimeout(function(){ setValue(ogameUniverse + dataName, data); },0);
	}
	
	// default einstellung minimierte bzw. maximierte anzeige der tabelle
	if (data.MINMAX === undefined) {
		data.MINMAX = false; // true -> minimiert, false -> maximiert
		setTimeout(function(){ setValue(ogameUniverse + dataName, data); },0);
	}
	
	// default einstellung fuer das oeffnen der FLEET1 seite (mittels attack-button) in neunem tab/fenster
	if (data.NEWTABFLEET1 === undefined || (data.NEWTABFLEET1 != true && data.NEWTABFLEET1 != false)) {
		data.NEWTABFLEET1 = false;
		setTimeout(function(){ setValue(ogameUniverse + dataName, data); },0);
	}
	
	// default einstellung fuer das oeffnen der FLEET1 seite (mittels attack-button) in neunem tab/fenster
	if (data.SENDEXTRASHIPS === undefined || (data.SENDEXTRASHIPS != true && data.SENDEXTRASHIPS != false)) {
		data.SENDEXTRASHIPS = false;
		setTimeout(function(){ setValue(ogameUniverse + dataName, data); },0);
	}
	
	// default einstellung fuer die anzeige der zahlen
	if (data.NUMBERFORMAT === undefined) {
		data.NUMBERFORMAT = 'long';
		setTimeout(function(){ setValue(ogameUniverse + dataName, data); },0);
	}

	// bereits ausgewaehlte berichte (IDs)
	if (data.CHECKED === undefined || !$.isArray(data.CHECKED)) {
		data.CHECKED = new Array();
		setTimeout(function(){ setValue(ogameUniverse + dataName, data); },0);
	}

	// lade die serverData.xml um die truemmerfeld-prozent anzahl zu bekommen
	if (data.DFPERCENT === undefined || data.DFPERCENT.toString().length == 0) {
		try { if (console) console.log('load: /api/serverData.xml'); } catch(e) {}
		ready = false;
		$.get('http://' + ogameUniverse + '/api/serverData.xml',function(xml){
			data.DFPERCENT = $(xml).find('debrisFactor').text() * 100;
		}).complete(function(){
			setTimeout(function(){ setValue(ogameUniverse + dataName, data); },0);
		});
	}
	// lade daten aus dem techtree wenn sie noch nicht verfuegbar sind
	if (data.TECH === undefined || $.isEmptyObject(data.TECH)) {
		try { if (console) console.log('load: /game/index.php?page=globalTechtree'); } catch(e) {}
		ready = false;
		$.get('http://' + ogameUniverse + '/game/index.php?page=globalTechtree',function(xml){
			data.TECH = {
				A109:	 [$.trim($(xml).find('.item > a[href$="techID=109"]').text())],								// waffentechnik
				A110:	 [$.trim($(xml).find('.item > a[href$="techID=110"]').text())],								// schildtechnik
				A111:	 [$.trim($(xml).find('.item > a[href$="techID=111"]').text())],								// raumschiffpanzerung
				A115:	 [$.trim($(xml).find('.item > a[href$="techID=115"]').text())],								// verbrennungstriebwerk
				A117:	 [$.trim($(xml).find('.item > a[href$="techID=117"]').text())],								// impulstriebwerk
				A118:	 [$.trim($(xml).find('.item > a[href$="techID=118"]').text())],								// hyperraumantrieb
				A124:	 [$.trim($(xml).find('.item > a[href$="techID=124"]').text())],								// astrophysik
				A202:	 [$.trim($(xml).find('.item > a[href$="techID=202"]').text()),2000,2000,0,'f',5000],			// kleiner transporter
				A203:	 [$.trim($(xml).find('.item > a[href$="techID=203"]').text()),6000,6000,0,'f',25000],			// großer transporter
				A204:	 [$.trim($(xml).find('.item > a[href$="techID=204"]').text()),3000,1000,0,'f',50],			// leichter jaeger
				A205:	 [$.trim($(xml).find('.item > a[href$="techID=205"]').text()),6000,4000,0,'f',100],				// schwerer jaeger
				A206:	 [$.trim($(xml).find('.item > a[href$="techID=206"]').text()),20000,7000,2000,'f',800],			// kreuzer
				A207:	 [$.trim($(xml).find('.item > a[href$="techID=207"]').text()),45000,15000,0,'f',1500],			// schlachtschiff
				A208:	 [$.trim($(xml).find('.item > a[href$="techID=208"]').text()),10000,20000,10000,'f',7500],		// kolonieschiff
				A209:	 [$.trim($(xml).find('.item > a[href$="techID=209"]').text()),10000,6000,2000,'f',20000],		// recycler
				A210:	 [$.trim($(xml).find('.item > a[href$="techID=210"]').text()),0,1000,0,'f'],					// spionagesonde
				A211:	 [$.trim($(xml).find('.item > a[href$="techID=211"]').text()),50000,25000,15000,'f',500],		// bomber
				A212:	 [$.trim($(xml).find('.item > a[href$="techID=212"]').text()),0,2000,500,'f'],					// solarsatellit
				A213:	 [$.trim($(xml).find('.item > a[href$="techID=213"]').text()),60000,50000,15000,'f',2000],		// zerstoerer
				A214:	 [$.trim($(xml).find('.item > a[href$="techID=214"]').text()),5000000,4000000,1000000,'f',1000000],	// todesstern
				A215:	 [$.trim($(xml).find('.item > a[href$="techID=215"]').text()),30000,40000,15000,'f',750],		// schlachtkreuzer
				A502:	 [$.trim($(xml).find('.item > a[href$="techID=502"]').text())],									// abfangrakete
				A503:	 [$.trim($(xml).find('.item > a[href$="techID=503"]').text())],									// interplanetarrakete
				A401:	 [$.trim($(xml).find('.item > a[href$="techID=401"]').text()),2000,0,0,'d',20],					// raketenwerfer
				A402:	 [$.trim($(xml).find('.item > a[href$="techID=402"]').text()),1500,500,0,'d',20],				// leichtes laserfeschuetz
				A403:	 [$.trim($(xml).find('.item > a[href$="techID=403"]').text()),6000,2000,0,'d',80],				// schweres lasergeschuetz
				A404:	 [$.trim($(xml).find('.item > a[href$="techID=404"]').text()),20000,15000,2000,'d',350],		// gaußkanone
				A405:	 [$.trim($(xml).find('.item > a[href$="techID=405"]').text()),2000,6000,0,'d',80],				// ionengeschuetz
				A406:	 [$.trim($(xml).find('.item > a[href$="techID=406"]').text()),50000,50000,30000,'d',1000],		// plasmawerfer
				A407:	 [$.trim($(xml).find('.item > a[href$="techID=407"]').text()),10000,10000,0,'d',200],			// kleine schildkuppel
				A408:	 [$.trim($(xml).find('.item > a[href$="techID=408"]').text()),50000,50000,0,'d',1000]			// große schildkuppel
			};
		}).complete(function(){
			setTimeout(function(){ setValue(ogameUniverse + dataName, data); },0);
		});
	}

	var parseBericht = function(bericht){
		try {
			// ogameClock[0] = whole text
			// ogameClock[1] = day
			// ogameClock[2] = month
			// ogameClock[3] = year
			// ogameClock[4] = hour
			// ogameClock[5] = minute
			// ogameClock[6] = second
			var ogameClock = /([0-9]+)\.([0-9]+)\.([0-9]+)\s([0-9]+):([0-9]+):([0-9]+)/.exec($('.OGameClock').html().replace(/<span>/g,'').replace(/<\/span>/g,''));
			var ogameClockDate = new Date(ogameClock[3],parseInt(ogameClock[2])-1,ogameClock[1],ogameClock[4],ogameClock[5],ogameClock[6]);
			
			var rc = {
				ID:			bericht.attr('id').replace(/spioDetails_/,''),										// bericht ID
				R1:			parseInt(bericht.find('table.material table td:eq(1)').html().replace(/\./g,'')),	// metall
				R2:			parseInt(bericht.find('table.material table td:eq(3)').html().replace(/\./g,'')),	// kristall
				R3:			parseInt(bericht.find('table.material table td:eq(5)').html().replace(/\./g,'')),	// deuterium
				R4:			parseInt(bericht.find('table.material table td:eq(7)').html().replace(/\./g,'')),	// energie
				FDB:		bericht.find('table.fleetdefbuildings').length										// anzahl abschnitte (fleet, defence, buildings, research)
			};
			
			rc.ACTIONS = $('tr#TR' + rc.ID + '.entry td.actions a');
			
			var temp = /\[(\d+:\d+:\d+)\][^\(]*\([^\(\s]+\s+[\']*([^\']+)[\']*\)/.exec(bericht.find ('table.material tr:eq(0) th').html());
			rc.COORDS = temp[1];																				// koordinaten
			rc.SPIELER = temp[2];																				// spieler-span mit style-class
			
			// link to galaxy view
			temp = /([0-9]+):([0-9]+):([0-9]+)/.exec(rc.COORDS);
			rc.GALAXY = 'http://' + data.UNI + '/game/index.php?page=galaxy&galaxy=' + temp[1] + '&system=' + temp[2] + '&planet=' + temp[3];
			
			// date[0] = whole text
			// date[1] = day
			// date[2] = month
			// date[3] = year
			// date[4] = hour
			// date[5] = minute
			// date[6] = second
			var date = /([0-9]+)\.([0-9]+)\.([0-9]+)\s([0-9]+):([0-9]+):([0-9]+)/.exec(bericht.prev().find('td.date').html());
			rc.DATE = date[0];																					// datem und uhrzeit des berichts
			var dateDate = new Date(date[3],parseInt(date[2])-1,date[1],date[4],date[5],date[6]);
			var ageInMilliseconds = ogameClockDate.getTime() - dateDate.getTime();
			var ageHours = Math.floor(ageInMilliseconds / 3600000);
			var ageMinutes = Math.floor(ageInMilliseconds / 60000) - (ageHours * 60);
			var ageSeconds = Math.floor(ageInMilliseconds / 1000) - (ageHours * 3600) - (ageMinutes * 60);
			rc.AGE = '';																						// bericht alter
			if (ageHours > 0) rc.AGE += ageHours + 'h ';
			if (ageMinutes > 0) rc.AGE += ageMinutes + 'm ';
			if (ageSeconds > 0) rc.AGE += ageSeconds + 's';
			
			// check player rank status (hororable, bandit, normal) -> plunder ratio/factor
			//var status = bericht.prev().find('td.subject span').eq(0).attr('class');
			rc.FACTOR = 0.5;																					// beute rate/faktor
			if (rc.SPIELER.indexOf('bandit') >= 0) {
				rc.FACTOR = 1;
			} else if (rc.SPIELER.indexOf('honorable') >= 0) {
				rc.FACTOR = 0.75;
			}
			
			// ueberpruefe die aktivitaet
			rc.ACTIVITY = bericht.find('table.aktiv font').html();												// aktivitaet-span mit style
			if (rc.ACTIVITY == null) {
				rc.ACTIVITY = '';
			} else {
				rc.ACTIVITY = ' (<span style="color:#99CC00;">' + rc.ACTIVITY + '</span>)';
			}
			
			temp = bericht.find('table.defenseattack tr:eq(1) td.attack a');
			rc.ATTACK = temp.attr('href');																		// href fuer den angreifen button
			rc.ATTACKTITLE = temp.html();																		// text/title fuer den angreifen button
			
			rc.MOON = false;																					// stammt der bericht von einem mond?
			if (rc.ATTACK.indexOf('&type=3&') != -1) rc.MOON = true;
			
			// calculate prey
			rc.LOOT = {
				m:	Math.round (rc.R1 * rc.FACTOR),
				k:	Math.round (rc.R2 * rc.FACTOR),
				d:	Math.round (rc.R3 * rc.FACTOR),
				s:	0
			};
			rc.LOOT.s = rc.LOOT.m + rc.LOOT.k + rc.LOOT.d;
			// loot summary
			data.LOOT.m += rc.LOOT.m;
			data.LOOT.k += rc.LOOT.k;
			data.LOOT.d += rc.LOOT.d;
			data.LOOT.s += rc.LOOT.s;
			// calculate needed space for prey
			var cap = rc.FACTOR * Math.max((rc.R1 + rc.R2 + rc.R3),Math.min((3 / 4) * (2 * rc.R1 + rc.R2 + rc.R3),2 * rc.R1 + rc.R3));
			
			// calculate ships
			rc.SHIPS = new Array();
			rc.EXTRASHIPS = new Array();
			for (var x1 = 0; x1 < data.BEVORZUGT.length; x1++) {
				var anzs100 = Math.ceil(cap / data.TECH[data.BEVORZUGT[x1]][5]);
				var anzs110 = Math.ceil( (cap * 1.1) / data.TECH[data.BEVORZUGT[x1]][5]); // extra schiffe berechnet aus 110% beute
				rc.SHIPS.push(anzs100);
				rc.EXTRASHIPS.push(anzs110 - anzs100);
			}
			
			rc.FLEET = { m: 0, k: 0, d: 0, s: 0, p: 0 };
			rc.DEFENCE = { m: 0, k: 0, d: 0, s: 0, p: 0 };
			rc.DEF = 0;
			rc.FLEETLIST = new Array();
			rc.DEFENCELIST = new Array();
			
			bericht.find('table.fleetdefbuildings td.key').each(function(){
				var key = $.trim($(this).text());
				var value = parseInt($(this).next().text().replace(/\./g,''),10);
				for (var item in data.TECH) {
					if (data.TECH[item][0] == key) {
						rc[item] = new Array();
						rc[item].push(value);
						if (data.TECH[item].length > 1) {
							rc[item].push(value * data.TECH[item][1]);
							rc[item].push(value * data.TECH[item][2]);
							rc[item].push(value * data.TECH[item][3]);
							if (data.TECH[item][4] == 'f') {
								rc.FLEET.m += (value * data.TECH[item][1]);
								rc.FLEET.k += (value * data.TECH[item][2]);
								rc.FLEET.d += (value * data.TECH[item][3]);
								rc.FLEETLIST.push([data.TECH[item][0],value]);
							} else if (data.TECH[item][4] == 'd') {
								rc.DEFENCE.m += (value * data.TECH[item][1]);
								rc.DEFENCE.k += (value * data.TECH[item][2]);
								rc.DEFENCE.d += (value * data.TECH[item][3]);
								rc.DEF += (value * data.TECH[item][5]);
								rc.DEFENCELIST.push([data.TECH[item][0],value]);
							}
						}
					}
				}
			});
			
			rc.FLEET.s = (rc.FLEET.m + rc.FLEET.k + rc.FLEET.d);
			rc.FLEET.p = Math.floor(rc.FLEET.s / 1000);
			rc.DEFENCE.s = (rc.DEFENCE.m + rc.DEFENCE.k + rc.DEFENCE.d);
			rc.DEFENCE.p = Math.floor(rc.DEFENCE.s / 1000);
			
			// calculate DF
			rc.DEBRISFIELD = {
				m: Math.round(rc.FLEET.m / 100 * data.DFPERCENT),
				k: Math.round(rc.FLEET.k / 100 * data.DFPERCENT),
				s: 0
			};
			rc.DEBRISFIELD.s = rc.DEBRISFIELD.m + rc.DEBRISFIELD.k;
			// df summary
			data.DF.m += rc.DEBRISFIELD.m;
			data.DF.k += rc.DEBRISFIELD.k;
			data.DF.s += rc.DEBRISFIELD.s;
			
			// calculate amount of recycler
			rc.RECS = Math.ceil(rc.DEBRISFIELD.s / 20000);
			
			// add ships to attack-link
			var l = ''
			for (var x2 = 0; x2 < data.BEVORZUGT.length; x2++) {
				var anzs = rc.SHIPS[x2];
				if (data.SENDEXTRASHIPS) anzs += rc.EXTRASHIPS[x2];
				l += data.BEVORZUGT[x2] + anzs;
			}
			rc.ATTACK += '&' + l;
			
			return rc;
		} catch(e) {
			return null;
		};
	};

	var Styles = {
		set: function(rule) {
			if (rule && rule.length > 0) {
				if ($.browser.msie) {
					spioHelperStylesheet.styleSheet.cssText	+= ( (typeof rule === 'string') ? rule : rule.join('\n') ) + '\n';
				}
				else {
					spioHelperStylesheet.appendChild(document.createTextNode( ( (typeof rule === 'string') ? rule : rule.join('\n') ) + '\n' ) );
				}
			}
		},
		init: function() {
			spioHelperStylesheet = document.createElement('style');
			spioHelperStylesheet.type = 'text/css';
			spioHelperStylesheet.media = 'screen';
			document.documentElement.firstChild.appendChild(spioHelperStylesheet);
			
			Styles.set([
				'#spioHelper { text-align:center; margin:0 auto 10px auto; padding:10px 0; width:630px; overflow:auto; }',
				'#spioHelper TABLE { border:1px solid #000000; width:98% !important; }',
				'#spioHelper TABLE * { white-space:nowrap !important; }',
				'#spioHelper .header { cursor:default; background-color:#23282D; box-shadow:0 0 3px 1px #00050A inset; }',
				'#spioHelper TH { padding:4px 2px !important; font-weight:bold;  border-bottom:1px solid #000000; border-right:1px solid #000000; text-align:center !important; }',
				'#spioHelper .row { cursor:default; background-color:#14191F; }',
				'#spioHelper .row.even { background-color:#0F141A; }',
				'#spioHelper .row:hover { box-shadow:0 0 2px 2px #1278CB; }',
				'#spioHelper TD { padding:4px 2px !important; border-right:1px solid #000000; vertical-align:middle !important; }',
				'#spioHelper TR TH:last-child, #spioHelper TR TD:last-child { border-right:0; }',
				'#spioHelper .checked { width:18px; text-align:center; background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAG7AAABuwBHnU4NQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHmSURBVDiNpZPPaxNBHMXfzG62PxLYFJuc6kKrB0GFZb5stRUkogetnougPagU/QukePbgX+ChePBSBVEaKKIFDypV0XTEGhElqaWQUg8Ntha62XSz42E3bUmsEn3wPczwPu878BimlML/iLdiJiKNiAb/KYCItA6zOnnw+PKM44jh+r3eCnziYvGsma6weLI64TgCudz7B38NICKt0/SymZH5ITNV4QCwj8o6gHtE5PMG8zARde6EE0kvmxkpbsEAoBSwshSvAiiwegv9A/Z151zp1pfX6bnV7x3HAHiJLi978lJxyEx5PAiAoAYEAfBuynK/ye4jUso8U0rh6KA9lrmwcNM69FOrrOvqyfj+j5uutnTmWvG0md6Gaz7w5pHlFmZDGACYEOLKqcvz4332GucawDmwsa4rv6LBTHtMqXBrbRN4ed9yv77dhoGwxulCbs8PzhhiBmC0AV0pn6Usjxnt4TkWA149bIYBgEspS4v5pD19p7fMopBYBBptgG4Azycs9/NMM1x/AaSUpYW5pP34dm+ZcQbDAIz2EH5213LzL34PR5WorRFC9Jy/2rcyucjU1DLU6A1rQwhxeKencVjjZyKingMDqx8Sph+ffdrdv+vmSE0BUcheAKaU8tOf4F0DWtEva5vqYGu9gNgAAAAASUVORK5CYII%3D") center center no-repeat transparent; }',
				'.SHicon { font-weight:bold; display:block; float:left; width:16px; line-height:16px; text-align:center; margin-right:5px; background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAADlJREFUOE9jYLcKYcjrnPefHAzSS7ZmmIWjBsz7PwjCoGnO+v+UYAZKNIP0jhpAjTAAZUlyYwKkFwBL+Kez49LIAgAAAABJRU5ErkJggg%3D%3D) center center no-repeat; }',
				'a.SHicon, a.SHicon:hover { text-decoration:none !important; color:#FFFFFF !important; }',
				'.textLeft { text-align:left !important; }',
				'.textCenter { text-align:center !important; }',
				'.textRight { text-align:right !important; }',
				'.pointer { cursor:pointer; }',
				'#spioHelper .moon { width:16px; height:16px; margin:0 0 -3px 5px; }',
				'#spioHelper .summary, .SHmaximize, .SHminimize { background-color:#23282D; border:1px solid #000000; box-shadow:0 0 3px 1px #00050A inset; color:#848484; display:inline-block; margin:5px 0 0 6px; padding:3px 7px; float:left; }',
				'#spioHelper .SHsettings { background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAClklEQVR42oWT3WuScRTHz6M+Q2Xoapq0McVkIOsuQ3aRIAla6x8Iqsu82AaKMFo0Zi/Dq2A0oYu621UQBJIvF1mxkJjUlJAoUbZUthyY727h1HXOjwniah048DzP75zP75zvOQ8H/7GFhYWzIpHo/Obm5vvV1dV2/znX++JyuU5bLJaX9Xrd3Ol07v1G29vbW9zf3z/F8/wPh8OhPRFgNpuvzczM+Gu1GrTbbWi1WoAMQABzhCyura0tlUolPhaLNY8B5ufnQxMTE1coMR6PQzabZd+Hh4eZb29vMyDB0Q1+vz/GAMFgMFytVi10SMnYK3xPpqDTbgH2D0NDMlCrNSAWi9n5EeBTOBw2ctizanp6Ol8ulwH7hmg0Cr7XfigXf73C4A8cGiYaR0ZGrxsMF7hisciqyufzy4lEwsXJZDKj0+mMjo2NMXogEKCKniFsCeOq6BL0caFQeHVqauouxaDIMDg46AyFQk+oBbVSqVzyeDy3SLz19XWIRCKGnZ2dWJ/gl2w22wsUcrRQKMDh4SH5HQJIEHDD7b7/vFIpAx3izN/5fD5LH2B8bm7uK8J5quJIi49MRK/Xm0ER1SQiaUFqY2sbeNsDHFkaQwxarfZxKpVS5XI5Rjs4OACseIUAvN1uz6EGqt3dXchkMkxM1A7VHwKpVMpu29ragkqlwkrH9zZW+hl3Y5YAHM54xWQyzdLs9Xo9S6Ybuk4ASuwuV6PRcGGby72LpJNIJDeR2FIoFLcnJyc13W3sOlWFa82e0dzJZPLhsU08snNWqzWJMBEFU+kDAwM/caGQreCpOhyhFZfozb8AYDQa38rl8suUnE6nL+KnDYFAcEan0z1qNptPUacvf/2ZekyArsHlEWMV30763f8ArhSG3+L/FYYAAAAASUVORK5CYII%3D") no-repeat scroll 2px 2px #23282D; margin-left: 5px; padding: 2px; }',
				'#spioHelper .select { background-color: #0F141A; border: 1px solid; width: 200px }',
				'#spioHelper .over:hover, .SHdelCloneDiv.over *:hover { box-shadow:0 0 2px 2px #1278CB; }',
				'.SHmaximize { background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAF2SURBVHjarFMxa8JQEL4nnQISdNbQwSmIi5OBSAJds/ozurZTTTt17s9w1CFLIUHBTBkS/AWJs5jF9fXueM+m4lQNHHfv++7uJXdfhJQSbnkENZh9z2KMvUvu4nx5U7J4WvgPFJ1OJ891XUbLsgTLssS1y5CTyPFhs9nwhdzgeDxCXddM5HlO5k2n06RZvV6vucA0TdA1508Yfg1lv9+HqqpgMplAmqbE+RhzEzxTcaw5nbt73omW7tZutwV6P4oisG2bsJjeioxiwoijHJWrJoNv0HnpsFexhybRwgYWKsxrYOzFXdZ4Dx3AeDxmIMsyHhjaO2KhwsjPabCIJQoD1AG0lA6k3i3GMTVDP9e3UKywWO9f15y3UBSFpGmPRiNYrVY87cYWfMKIoxyVC3+EFAQBGIYBy+WSNYA7/hXSIySoFR851sJgMGDBnWfQ++hJx3EYIIGgUK5JmTgWHD3b7Rb2b3vBDbqv3X/9TIfPg3/zGn8EGADE2Amv4QeLjAAAAABJRU5ErkJggg%3D%3D") no-repeat scroll 2px 2px #23282D; margin-left: 5px; padding: 2px; cursor:pointer; }',
				'.SHminimize { background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFtSURBVHjarFMxa8JQEL6UTgEJuCsdMgVxyRQhkEBXV39LN+0i9a84JkOWwgsEdBIxP0FHwcYla3rf+WJjEAq1geMd993de3ffF6OqKnrkM9Bg8jmZsT9lC9nSX2oCNsX2vnxdzp4QKcty6rouTsUWaL/C2fSBIUf7uJCkQVEUYRzHNBwO4as8zys+6Xw+i8HXMYUc5KIGtc+6AZ4dRlGkPM8j27Zpt9vR/GUubx5EAxqPx2SaJnEONUetG9BoNEoPh4PcuNlsJMa7oRpHDF+n06Fer5euVqufJXbfuvDbdKSnj5M8k3Gll3dDAOOXBg/T+B86uDsC8ywjMH53BMYvS2ROyfd9Y7/fV/1+X9Asy4LF14I0HjAuPucQ5xiM0w0LzK3cYFnWdfNgpO2DXragTaPIExoAz0yTFB2Px2uD7XZLoBk56/Va1Vqolagcx6EkSURhzLXRVqKOhchBLmqaOvjTz8Q6mD1M47cAAwBTLAkUzRxaEAAAAABJRU5ErkJggg%3D%3D") no-repeat scroll 2px 2px #23282D; margin-left: 5px; padding: 2px; cursor:pointer; }'
			]);
		}
	};

	var ausgabe = function(berichte){
		// main div
		var div = $('<div/>').attr('id','spioHelper').hide();
		$('#messageContent').prepend(div);
		var table = $('<table/>').attr('cellspacing','0').attr('cellpadding','0').appendTo(div);
		// header
		var header = $('<tr/>').addClass('header').appendTo(table);
		$('<th/>').width(18).attr('rel','check').attr('title',data.T15).addClass('checkAll').addClass('tooltip').appendTo(header);
		$('<th/>').attr('rel','coords').text(data.T3).attr('title',data.T1).addClass('tooltip').appendTo(header);
		$('<th/>').attr('rel','age').text(data.T4).attr('title',data.T1).addClass('tooltip').appendTo(header);
		$('<th/>').attr('rel','player').html(data.T5).attr('title',data.T1).addClass('tooltip').appendTo(header);
		$('<th/>').attr('rel','loot').text(data.T6).attr('title',data.T1).addClass('tooltip').appendTo(header);
		$('<th/>').attr('rel','df').text(data.T7).attr('title',data.T1).addClass('tooltip').appendTo(header);
		$('<th/>').attr('rel','def').text(data.T8).attr('title',data.T1).addClass('tooltip').appendTo(header);
		$('<th/>').width(84).attr('rel','actions').text(data.T14).insertAfter(header.find('[rel="' + data.ACTIONCOLUMN + '"]')); 
		
		// bericht
		for (var i = 0; i < berichte.length; i++) {
			var bericht = berichte[i];
			var row = $('<tr/>').addClass('row').appendTo(table);
			
			// other background-color on even rows
			if (i % 2 == 0) row.addClass('even');
			
			/* ===== checkbox ===== */
			var tdc = $('<td/>').addClass(bericht.ID).addClass('checkSingle').appendTo(row);
			$('<div/>').css({'width':'16px','height':'16px'}).attr('title',data.T18).addClass('tooltip').appendTo(tdc);
			
			/* ===== coords ===== */
			var td0 = $('<td/>').addClass('textCenter').appendTo(row);
			var td0a = $('<a/>').css('display','block').attr('href','#TR' + bericht.ID).attr('title',data.T9).text(bericht.COORDS).addClass('tooltip').appendTo(td0);
			// moon
			if (bericht.MOON) {
				$('<img/>').attr('src','http://' + data.UNI + '/cdn/img/galaxy/moon_a.gif').addClass('moon').appendTo(td0a);
			}
			
			/* ===== age ===== */
			var td1 = $('<td/>').appendTo(row);
			$('<span/>').text(bericht.AGE).attr('title',bericht.DATE).addClass('tooltip').appendTo(td1);
			
			/* ===== player ===== */
			var td2 = $('<td/>').appendTo(row);
			var temp = data.T13;
			// planets
			if (bericht.A124) {
				temp = data.T10.replace(/\$1/,(1 + Math.ceil(parseInt(bericht.A124[0]) / 2)));
			}
			$('<span/>').html(bericht.SPIELER + bericht.ACTIVITY).attr('title',temp).addClass('tooltip').appendTo(td2);
			
			/* ===== loot ===== */
			var td5 = $('<td/>').addClass('textRight').appendTo(row);
			var td5a = formatNumber(bericht.LOOT.s, data.NUMBERFORMAT);
			temp  = '<table cellspacing="0" cellpadding="10" style="border:0;">';
			for (var x4 = 0; x4 < data.BEVORZUGT.length; x4++) {
				var anzs = formatNumber(bericht.SHIPS[x4]);
				if (data.SENDEXTRASHIPS) anzs += ' (+ ' + bericht.EXTRASHIPS[x4] + ')';
				temp += '<tr><td style="padding-right:10px;">' + data.TECH[data.BEVORZUGT[x4]][0] + ': </td><td class="textRight">' + anzs + '</td></tr>';
			}
			temp += '<tr><td colspan="2" style="height:5px;"></td></tr>';
			temp += '<tr><td style="padding-right:10px;">' + data.T6 + ': </td><td class="textRight" style="color:#99CC00;">' + (bericht.FACTOR * 100) + '%</td></tr>';
			temp += '<tr><td style="padding-right:10px;">' + data.R1 + ': </td><td class="textRight">' + formatNumber(bericht.LOOT.m) + '</td></tr>';
			temp += '<tr><td style="padding-right:10px;">' + data.R2 + ': </td><td class="textRight">' + formatNumber(bericht.LOOT.k) + '</td></tr>';
			temp += '<tr><td style="padding-right:10px;">' + data.R3 + ': </td><td class="textRight">' + formatNumber(bericht.LOOT.d) + '</td></tr>';
			temp += '</table>';
			if (bericht.LOOT.s == 0) temp = '';
			$('<span/>').text(td5a).attr('title',temp).addClass('tooltip').appendTo(td5);
			
			/* ===== df ===== */
			var td6 = $('<td/>').addClass('textRight').appendTo(row);
			var td6a = formatNumber(bericht.DEBRISFIELD.s, data.NUMBERFORMAT);
			temp  = '<table cellspacing="0" cellpadding="10" style="border:0;">';
			temp += '<tr><td style="padding-right:10px;">' + data.TECH.A209[0] + ': </td><td class="textRight">' + formatNumber(bericht.RECS) + '</td></tr>';
			temp += '<tr><td colspan="2" style="height:5px;"></td></tr>';
			temp += '<tr><td style="padding-right:10px;">' + data.R1 + ': </td><td class="textRight">' + formatNumber(bericht.DEBRISFIELD.m) + '</td></tr>';
			temp += '<tr><td style="padding-right:10px;">' + data.R2 + ': </td><td class="textRight">' + formatNumber(bericht.DEBRISFIELD.k) + '</td></tr>';
			temp += '<tr><td colspan="2" style="height:15px;"></td></tr>';
			temp += '<tr><td colspan="2" style="color:#6F9FC8;font-weight:bold;font-size:11px;">' + data.T16 + '</td></tr>';
			temp += '<tr><td colspan="2"><div class="splitLine" style="min-height:1px;" /></td></tr>';
			temp += '<tr><td style="padding-right:10px;">' + data.R1 + ': </td><td class="textRight">' + formatNumber(bericht.FLEET.m) + '</td></tr>';
			temp += '<tr><td style="padding-right:10px;">' + data.R2 + ': </td><td class="textRight">' + formatNumber(bericht.FLEET.k) + '</td></tr>';
			temp += '<tr><td style="padding-right:10px;">' + data.R3 + ': </td><td class="textRight">' + formatNumber(bericht.FLEET.d) + '</td></tr>';
			temp += '<tr><td style="padding-right:10px;">' + data.T17 + ': </td><td class="textRight" style="color:#99CC00;">' + formatNumber(bericht.FLEET.p) + '</td></tr>';
			if (bericht.FLEETLIST.length > 0) {
				temp += '<tr><td colspan="2" style="height:15px;"></td></tr>';
				temp += '<tr><td colspan="2" style="color:#6F9FC8;font-weight:bold;font-size:11px;">' + data.T22 + '</td></tr>';
				temp += '<tr><td colspan="2"><div class="splitLine" style="min-height:1px;" /></td></tr>';
				for (var fl = 0; fl < bericht.FLEETLIST.length; fl++) {
					var flitem = bericht.FLEETLIST[fl];
					temp += '<tr><td style="padding-right:10px;">' + flitem[0] + ': </td><td class="textRight">' + formatNumber(flitem[1]) + '</td></tr>';
				}
			}
			temp += '</table>';
			if (bericht.DEBRISFIELD.s == 0) temp = '';
			if (bericht.FDB < 1) td6a = data.T13;
			$('<span/>').text(td6a).attr('title',temp).addClass('tooltip').appendTo(td6);
			
			/* ===== def ===== */
			var td7 = $('<td/>').addClass('textRight').appendTo(row);
			var td7a = formatNumber(bericht.DEF, data.NUMBERFORMAT);
			temp  = '<table cellspacing="0" cellpadding="10" style="border:0;">';
			temp += '<tr><td colspan="2" style="color:#6F9FC8;font-weight:bold;font-size:11px;">' + data.T16 + '</td></tr>';
			temp += '<tr><td colspan="2"><div class="splitLine" style="min-height:1px;" /></td></tr>';
			temp += '<tr><td style="padding-right:10px;">' + data.R1 + ': </td><td class="textRight">' + formatNumber(bericht.DEFENCE.m) + '</td></tr>';
			temp += '<tr><td style="padding-right:10px;">' + data.R2 + ': </td><td class="textRight">' + formatNumber(bericht.DEFENCE.k) + '</td></tr>';
			temp += '<tr><td style="padding-right:10px;">' + data.R3 + ': </td><td class="textRight">' + formatNumber(bericht.DEFENCE.d) + '</td></tr>';
			temp += '<tr><td style="padding-right:10px;">' + data.T17 + ': </td><td class="textRight" style="color:#99CC00;">' + formatNumber(bericht.DEFENCE.p) + '</td></tr>';
			if (bericht.DEFENCELIST.length > 0) {
				temp += '<tr><td colspan="2" style="height:15px;"></td></tr>';
				temp += '<tr><td colspan="2" style="color:#6F9FC8;font-weight:bold;font-size:11px;">' + data.T23 + '</td></tr>';
				temp += '<tr><td colspan="2"><div class="splitLine" style="min-height:1px;" /></td></tr>';
				for (var dl = 0; dl < bericht.DEFENCELIST.length; dl++) {
					var dlitem = bericht.DEFENCELIST[dl];
					temp += '<tr><td style="padding-right:10px;">' + dlitem[0] + ': </td><td class="textRight">' + formatNumber(dlitem[1]) + '</td></tr>';
				}
			}
			temp += '</table>';
			if (bericht.DEFENCE.s == 0) temp = '';
			if (bericht.FDB < 2) td7a = data.T13;
			$('<span/>').text(td7a).attr('title',temp).addClass('tooltip').appendTo(td7);
			
			/* ===== actions ===== */
			var whereactions = header.find('[rel="' + data.ACTIONCOLUMN + '"]').index();
			var td3 = $('<td/>').addClass('textCenter').insertAfter(row.find('td:eq(' + whereactions + ')'));
			var t3a = $('<div/>').css('display','inline-block').appendTo(td3);
			// actions
			bericht.ACTIONS.appendTo(t3a);
			// galaxy
			temp = data.T11.replace(/\$1/,bericht.COORDS);
			$('<a/>').attr('href',bericht.GALAXY).attr('title',temp).text('G').addClass('SHicon').addClass('tooltip').appendTo(t3a);
			// attack
			var attack = $('<a/>').attr('href',bericht.ATTACK).attr('title',bericht.ATTACKTITLE).text('A').addClass('attackIconButton').addClass('SHicon').addClass('tooltip').appendTo(t3a);
			if (data.NEWTABFLEET1) attack.attr('target','_blank');
		}
		
		var sum = data.T12 + ': ' + berichte.length + ' | ' + data.T6 + ': <span id="SHsummaryLOOT">' + formatNumber(data.LOOT.s) + '</span> | ' + data.T7 +  ': <span id="SHsummaryDF">' + formatNumber(data.DF.s) + '</span>';
		var summary = $('<div/>').width(360).html(sum).addClass('summary').appendTo(div);
		if (data.LOOT.s > 0) {
			temp  = '<table cellspacing="0" cellpadding="10" style="border:0;">';
			temp += '<tr><td style="padding-right:10px;">' + data.R1 + ': </td><td class="textRight">' + formatNumber(data.LOOT.m) + '</td></tr>';
			temp += '<tr><td style="padding-right:10px;">' + data.R2 + ': </td><td class="textRight">' + formatNumber(data.LOOT.k) + '</td></tr>';
			temp += '<tr><td style="padding-right:10px;">' + data.R3 + ': </td><td class="textRight">' + formatNumber(data.LOOT.d) + '</td></tr>';
			temp += '</table>';
			$('#SHsummaryLOOT').attr('title',temp).addClass('tooltip').css('cursor','help');
		}
		if (data.DF.s > 0) {
			temp  = '<table cellspacing="0" cellpadding="10" style="border:0;">';
			temp += '<tr><td style="padding-right:10px;">' + data.R1 + ': </td><td class="textRight">' + formatNumber(data.DF.m) + '</td></tr>';
			temp += '<tr><td style="padding-right:10px;">' + data.R2 + ': </td><td class="textRight">' + formatNumber(data.DF.k) + '</td></tr>';
			temp += '</table>';
			$('#SHsummaryDF').attr('title',temp).addClass('tooltip').css('cursor','help');
		}
		
		var settings = $('<div/>').width(16).addClass('summary').addClass('SHsettings').addClass('over').appendTo(div);
		
		$('<div/>').width(16).height(16).attr('id','SHsettingsButton').css({'float':'left','cursor':'pointer'}).attr('title',data.T19).addClass('tooltip').appendTo(settings);
		var einstellungen = $('#info.header #bar ul li a[href$="preferences"]').text();
		$('<div/>').width(210).height(18).css({'margin-left':'20px','text-align':'left'}).text(einstellungen).hide().appendTo(settings);
		$('<div/>').addClass('splitLine').css('margin','0 auto 3px 0').hide().appendTo(settings);
		var content = $('<div/>').css({'text-align':'left','min-height':'76px','margin':'3px','width':'225px'}).hide().appendTo(settings);
		
		// settings content
		$('<div/>').text(data.T27).css({'margin-top':'10px','font-weight':'normal','color':'#6F9FC8','text-align':'center'}).appendTo(content);
		var nf = $('<div/>').css({'margin-top':'3px','text-align':'center'}).appendTo(content);
		getNumberFormatSelect().val(data.NUMBERFORMAT).addClass('over').appendTo(nf);
		
		
		$('<div/>').text(data.T26).css({'margin-top':'15px','font-weight':'normal','color':'#6F9FC8','text-align':'center'}).appendTo(content);
		var ai = $('<div/>').css({'margin-top':'3px','text-align':'center'}).appendTo(content);
		getActionsPositionSelect().val(data.ACTIONCOLUMN).addClass('over').appendTo(ai);
		
		$('<div/>').text(data.T25).css({'margin-top':'15px','font-weight':'normal','color':'#6F9FC8','text-align':'center'}).appendTo(content);
		var ntf1 = $('<div/>').css({'margin-top':'3px','text-align':'center'}).appendTo(content);
		var ntf1b = 'false';
		if (data.NEWTABFLEET1) ntf1b = 'true';
		getNewTabFleet1Select().val(ntf1b).addClass('over').appendTo(ntf1);
		
		$('<div/>').text(data.T24).css({'margin-top':'15px','font-weight':'normal','color':'#6F9FC8','text-align':'center'}).appendTo(content);
		for (var x6 = 0; x6 < data.BEVORZUGT.length; x6++) {
			var d = $('<div/>').css({'margin-top':'3px','text-align':'center'}).appendTo(content);
			getShipSelect(data).val(data.BEVORZUGT[x6]).addClass('over').appendTo(d);
		}
		temp = $('<div/>').css({'margin-top':'3px','font-weight':'normal','font-style':'italic','color':'#6F9FC8','text-align':'right','padding-right':'10px'}).appendTo(content);
		$('<span/>').text(data.T20).addClass('over').css({'cursor':'pointer','margin':'0 5px','padding':'2px 7px'}).appendTo(temp).click(function(){
			var d = $('<div/>').css({'margin-top':'3px','text-align':'center'}).insertBefore($(this).parent());
			getShipSelect().val('').addClass('over').appendTo(d);
		});
		
		$('<div/>').text(data.T29).css({'margin-top':'15px','font-weight':'normal','color':'#6F9FC8','text-align':'center'}).appendTo(content);
		var ses1 = $('<div/>').css({'margin-top':'3px','text-align':'center'}).appendTo(content);
		var ses1b = 'false';
		if (data.SENDEXTRASHIPS) ses1b = 'true';
		getSendExtraShipsSelect().val(ses1b).addClass('over').appendTo(ses1);
		
		temp = $('<div/>').css({'margin-top':'15px','font-weight':'bold','color':'#6F9FC8','text-align':'center','padding-right':'10px'}).appendTo(content);
		$('<span/>').text(data.T21).addClass('over').css({'cursor':'pointer','margin':'0 0 7px 10px','padding':'2px 0','display':'block'}).appendTo(temp).click(function(){
			data.NUMBERFORMAT = $('.SHsettings .numberFormatSelect').val();
			
			data.ACTIONCOLUMN = $('.SHsettings .actionsPositionSelect').val();
			
			var dataNTF1 = false;
			if ($('.SHsettings .newTabFleet1Select').val() == 'true') dataNTF1 = true;
			data.NEWTABFLEET1 = dataNTF1;
			
			data.BEVORZUGT = new Array();
			$('.SHsettings .shipSelect').each(function(){
				if ($(this).val().length == 0) {
					$(this).parent().remove();
				} else {
					data.BEVORZUGT.push($(this).val());
				}
			});
			
			var dataSES = false;
			if ($('.SHsettings .sendExtraShipsSelect').val() == 'true') dataSES = true;
			data.SENDEXTRASHIPS = dataSES;
			
			setTimeout(function(){ setValue(data.UNI + data.NAME, data); },0);
			$('#SHsettingsButton').click();
		});
		
		
		return div;
	};

	var formatNumber = function(value, format){
		if (format === undefined) format = 'long';
		var parts = /([+-]*)([\d]+)([\.,\d]*)/.exec( (value) ? value.toString() : '' );
		if (parts && parts.length === 4) {
			if (format == 'long') {
				return parts[1] + parts[2].split('').reverse().join('').match(/.{1,3}/g).join('.').split('').reverse().join('') + parts[3];
			} else if (format == 'normal') {
				return value;
			} else if (format == 'short') {
				var v = parseInt(parts[2],10);
				var abk = '';
				if (parts[2].length > 7) {
					v = Math.ceil(v / 1000000);
					abk = ' M';
				} else if (parts[2].length > 4) {
					v = Math.ceil(v / 1000);
					abk = ' k';
				}
				parts[2] = '' + v;
				return parts[1] + parts[2].split('').reverse().join('').match(/.{1,3}/g).join('.').split('').reverse().join('') + abk;
			}
		}
		return '0';
	};
	
	var getShipSelect = function(){
		var select = $('<select/>').addClass('shipSelect').addClass('select');
		$('<option/>').val('').text('-').appendTo(select);
		$('<option/>').val('A202').text(data.TECH.A202[0]).appendTo(select);
		$('<option/>').val('A203').text(data.TECH.A203[0]).appendTo(select);
		$('<option/>').val('A204').text(data.TECH.A204[0]).appendTo(select);
		$('<option/>').val('A205').text(data.TECH.A205[0]).appendTo(select);
		$('<option/>').val('A206').text(data.TECH.A206[0]).appendTo(select);
		$('<option/>').val('A207').text(data.TECH.A207[0]).appendTo(select);
		$('<option/>').val('A208').text(data.TECH.A208[0]).appendTo(select);
		$('<option/>').val('A209').text(data.TECH.A209[0]).appendTo(select);
		$('<option/>').val('A211').text(data.TECH.A211[0]).appendTo(select);
		$('<option/>').val('A213').text(data.TECH.A213[0]).appendTo(select);
		$('<option/>').val('A214').text(data.TECH.A214[0]).appendTo(select);
		$('<option/>').val('A215').text(data.TECH.A215[0]).appendTo(select);
		return select;
	};
	
	var getActionsPositionSelect = function(){
		var select = $('<select/>').addClass('actionsPositionSelect').addClass('select');
		$('<option/>').val('check').text((data.T15.split(' '))[0]).appendTo(select);
		$('<option/>').val('coords').text((data.T3.split(' '))[0]).appendTo(select);
		$('<option/>').val('age').text((data.T4.split(' '))[0]).appendTo(select);
		$('<option/>').val('player').text((data.T5.split(' '))[0]).appendTo(select);
		$('<option/>').val('loot').text((data.T6.split(' '))[0]).appendTo(select);
		$('<option/>').val('df').text((data.T7.split(' '))[0]).appendTo(select);
		$('<option/>').val('def').text((data.T8.split(' '))[0]).appendTo(select);
		return select;
	};
	var getNewTabFleet1Select = function(){
		return getTrueFalseSelect('newTabFleet1Select');
	};
	
	var getSendExtraShipsSelect = function(){
		return getTrueFalseSelect('sendExtraShipsSelect');
	};
	
	var getTrueFalseSelect = function(className){
		var select = $('<select/>').addClass(className).addClass('select');
		$('<option/>').val('true').text('true').appendTo(select);
		$('<option/>').val('false').text('false').appendTo(select);
		return select;
	};
	
	var getNumberFormatSelect = function(){
		var select = $('<select/>').addClass('numberFormatSelect').addClass('select');
		$('<option/>').val('normal').text('9999 or 9999999 or 99999999').appendTo(select);
		$('<option/>').val('short').text('9.999 or 9.999 k or 99 M').appendTo(select);
		$('<option/>').val('long').text('9.999 or 9.999.999 or 99.999.999').appendTo(select);
		return select;
	};

	var addCheck = function(id){
		var index = data.CHECKED.indexOf(id);
		if (index == -1) {
			data.CHECKED.push(id);
			setTimeout(function(){ setValue(data.UNI + data.NAME, data); },0);
		}
		setTimeout(function(){ setValue(data.UNI + data.NAME, data); },0);
	};

	var removeCheck = function(id){
		if (data.CHECKED.length > 0) {
			var index = data.CHECKED.indexOf(id);
			if (index != -1) {
				data.CHECKED.splice(index, 1);
				setTimeout(function(){ setValue(data.UNI + data.NAME, data); },0);
			}
		}
	};

	var addAllCheck = function(div){
		div.find('td.checkSingle').each(function(){
			var id = (/([0-9]+)/.exec($(this).attr('class')))[1];
			addCheck(id);
		});
	};

	var removeAllCheck = function(div){
		div.find('td.checkSingle').each(function(){
			var id = (/([0-9]+)/.exec($(this).attr('class')))[1];
			removeCheck(id);
		});
	};

	var prepareForSorting = function(rel, value){
		var temp, temp2;
		// coordinates
		if (rel == 'coords') {
			temp = 0;
			temp2 = /([0-9]+):([0-9]+):([0-9]+)/.exec(value);
			if (temp2 != null) temp = parseInt( ('00'+temp2[1]).slice(-2) + ('000'+temp2[2]).slice(-3) + ('00'+temp2[3]).slice(-2) ,10);
			return temp;
		}
		// age
		if (rel == 'age') {
			temp = 0;
			temp2 = /(\d+)h/.exec(value);
			if (temp2 != null) temp += parseInt( temp2[1] ,10) * 3600;
			temp2 = /(\d+)m/.exec(value);
			if (temp2 != null) temp += parseInt( temp2[1] ,10) * 60;
			temp2 = /(\d+)s/.exec(value);
			if (temp2 != null) temp += parseInt( temp2[1] ,10);
			return temp;
		}
		// player
		if (rel == 'player') {
			temp = value.replace(/\s\([0-9]+\)/g,'');
			temp = $.trim(temp.toLowerCase());
			return temp;
		}
		// loot, df, def
		if (rel == 'loot' || rel == 'df' || rel == 'def') {
			value = value.replace(/\./g,'');
			if (value.indexOf(' M') != -1) {
				temp = parseInt(value = value.replace(/\sM/g,''),10);
				temp = temp * 1000000;
			} else if (value.indexOf(' k') != -1) {
				temp = parseInt(value = value.replace(/\sk/g,''),10);
				temp = temp * 1000;
			} else {
				temp = parseInt(value,10);
			}
			return temp;
		}
		return value;
	};
	
	var selectShips = function(tech){
		var url = document.location.href;
		var regExp = new RegExp(tech + '([0-9]+)');
		var result = regExp.exec(url);
		if (result != null && result.length == 2) {
			var shipNumber = tech.replace(/A/,'');
			var amount = parseInt(result[1],10);
			var available = parseInt(((/.*\s([0-9.]+)/.exec($('#ship_' + shipNumber).prev().find('span.level').text()))[1]).replace(/\./g,''),10);
			if (amount <= available) {
				$('#ship_' + shipNumber).val(amount).keyup();
				return true;
			}
		}
		return false;
	};

	// script startet hier, nachdem alle notwendigen daten geladen wurden
	if (ready) {
		if ($('body').attr('id') == 'messages') {
			$('body').ajaxSuccess(function(e,xhr,settings){
				if (settings.url == 'http://' + data.UNI + '/game/index.php?page=messages' && settings.type == 'POST') {
					// reset der summe der beute
					data.LOOT = { m:0, k:0, d:0, s:0 };
					// reset der summe der truemmerfelder
					data.DF = { m:0, k:0, s:0 };
					// spionage berichte suchen
					var berichteDOM = $('tr[id^="spioDetails_"]');
					// spionage berichte verarbeiten und DOM aufbereiten
					if (berichteDOM.size() > 0) {
						var berichte = new Array();
						// berichte parsen und daten aufbereiten
						berichteDOM.each(function(){
							var parsedBericht = parseBericht($(this));
							if (parsedBericht != null) berichte.push(parsedBericht);
						});
						// daten fuer ausgabe vorbereiten und ausgabe im DOM
						Styles.init();
						var div = ausgabe(berichte);
						// checkboxen und check-/auswahl-/select-verhalten
						$('input#checkAll.checker').click(function(){
							if ($(this).is(':checked')) {
								div.find('th.checkAll').addClass('checked');
								div.find('td.checkSingle').addClass('checked');
								addAllCheck(div);
							} else {
								div.find('th.checkAll').removeClass('checked');
								div.find('td.checkSingle').removeClass('checked');
								removeAllCheck(div);
							}
						});
						div.find('th.checkAll').addClass('pointer').click(function(){
							if ($(this).hasClass('checked')) {
								$('input#checkAll.checker').attr('checked',false);
								$('input[type="checkbox"].checker').not(':first').attr('checked',false);
								div.find('th.checkAll').removeClass('checked');
								div.find('td.checkSingle').removeClass('checked');
								removeAllCheck(div);
							} else {
								$('input#checkAll.checker').attr('checked',true);
								$('input[type="checkbox"].checker').not(':first').attr('checked',true);
								div.find('th.checkAll').addClass('checked');
								div.find('td.checkSingle').addClass('checked');
								addAllCheck(div);
							}
						});
						$('input[type="checkbox"].checker').not(':first').click(function(){
							var id = $(this).attr('id');
							if ($(this).is(':checked')) {
								div.find('td.' + id).addClass('checked');
								addCheck(id);
							} else {
								div.find('td.' + id).removeClass('checked');
								removeCheck(id);
							}
						});
						div.find('td.checkSingle').addClass('pointer').click(function(){
							var id = (/([0-9]+)/.exec($(this).attr('class')))[1];
							if ($(this).hasClass('checked')) {
								$('input#' + id + '.checker').attr('checked',false);
								$(this).removeClass('checked');
								removeCheck(id);
							} else {
								$('input#' + id + '.checker').attr('checked',true);
								$(this).addClass('checked');
								addCheck(id);
							}
						});
						// bericht markieren/checken wenn der angreifen icon button geklickt wurde
						$('a.attackIconButton').click(function(){
							var checker = $(this).closest('tr').find('td.checkSingle');
							if (!checker.hasClass('checked')) {
								var id = (/([0-9]+)/.exec(checker.attr('class')))[1];
								$('input#' + id + '.checker').attr('checked',true);
								checker.addClass('checked');
								addCheck(id);
							}
						});
						// initial checkbox set
						if (data.CHECKED.length > 0) {
							for (var i = 0; i < data.CHECKED.length; i++) {
								var id = data.CHECKED[i];
								var inputCheck = $('input#' + id + '.checker');
								var tdCheck = div.find('td.' + id);
								if (inputCheck.length > 0 && tdCheck.length > 0) {
									$('input#' + id + '.checker').attr('checked',true);
									div.find('td.' + id).addClass('checked');
								} else {
									removeCheck(id);
								}
							}
							if (data.CHECKED.length == berichte.length) {
								$('input#checkAll.checker').attr('checked',true);
								div.find('th.checkAll').addClass('checked');
							}
						}
						// sortieren
						var inverse = data.SORT.INVERSE;
						div.show().find('table th').not('[rel="check"]').not('[rel="actions"]').addClass('pointer').click(function(){
							div.find('table tr').not(':first').removeClass('even');
							var header = $(this), index = header.index(), rel = header.attr('rel'), temp, aa, bb;
							header.closest('table').find('td').filter(function(){
								return $(this).index() === index;
							}).sortElements(function(a, b){
								a = $(a).text();
								b = $(b).text();
								if (a == data.T13) {
									a = 0;
								} else {
									a = prepareForSorting(rel, a);
								}
								if (b == data.T13) {
									b = 0;
								} else {
									b = prepareForSorting(rel, b);
								}
								return (
									isNaN(a) || isNaN(b) ?
									a > b : +a > +b
								) ?
									inverse ? -1 : 1 :
									inverse ? 1 : -1;
							}, function(){
								return this.parentNode;
							});
							div.find('table tr').not(':first').filter(':even').addClass('even');
							// speichere sortierung
							data.SORT.REL = rel;
							data.SORT.INVERSE = inverse;
							setTimeout(function(){ setValue(data.UNI + data.NAME, data); },0);
							// drehe sortier-reihenfolge fuer das naechste mal um
							inverse = !inverse;
						});
						// initial-sortierung
						div.find('table tr').first().find('[rel="' + data.SORT.REL + '"]').click();
						var settingsclosed = true;
						// toggle settings on click
						$('#SHsettingsButton').click(function(){
							if (settingsclosed) {
								settingsclosed = false;
								$('#spioHelper .SHsettings').animate({
									width:'230px'
								},600,function(){
									$('#SHsettingsButton').addClass('over');
									$('#spioHelper .SHsettings').removeClass('over');
									$('#spioHelper .SHsettings > div:gt(0)').fadeIn();
								});
							} else {
								settingsclosed = true;
								$('#spioHelper .SHsettings > div:gt(0)').fadeOut(function(){
									$('#SHsettingsButton').removeClass('over');
									$('#spioHelper .SHsettings').addClass('over');
									$('#spioHelper .SHsettings').animate({
										width:'16px'
									},600);
								});
							}
						});
						
						// ogame delete button
						var delButton = $('.buttonOK.deleteIt');
						// ogame delete select
						var delSelect = delButton.prev();
						// clone delete select and button
						var delCloneDiv = $('<div/>').css({'width':'628px','margin':'0 auto'}).addClass('SHdelCloneDiv').addClass('over').prependTo($('#messageContent'));
						var delCloneSelect = delSelect.clone().appendTo(delCloneDiv).css({
							'background-color':'#141E26',
							'border':'1px solid #515151',
							'color':'#848484',
							'font-size':'11px',
							'margin':'6px 5px 0',
							'padding':'0',
							'width':'275px',
							'float':'left'
						}).removeClass('choose').removeClass('float_left').find('option').each(function(){
							$(this).attr('value',$(this).attr('id')).removeAttr('id');
						}).parent().change(function(){
							delSelect.find('option:eq(' + $(this).find('option:selected').index() + ')').attr('selected','selected').change();
							if ($(this).find('option:selected').is(':first')) {
								delCloneButton.add(delButton).hide();
							} else {
								delCloneButton.add(delButton).show();
							}
						});
						var delCloneButton = delButton.clone().appendTo(delCloneDiv).removeClass('buttonOK').removeClass('deleteIt').click(function(){
							delButton.click();
						});
						
						// correct ogame jQuery event for select delete messages option
						$('select').unbind('click');
						delSelect.change(function(){
							delCloneSelect.val($(this).find('option:selected').attr('id'));
							if ($(this).find('option:selected').is(':first')) {
								delCloneButton.add(delButton).hide();
							} else {
								delCloneButton.add(delButton).show();
							}
							unsafe.mod = $(this).find('option:selected').attr('id');
						});
						
						// minimieren bzw. maximieren
						var SHtable = div.find('table');
						var divMINMAX = $('<div/>').width(16).height(16).css('float','left').attr('title',data.T28).addClass('SHminimize').addClass('over').addClass('tooltip').prependTo($('.SHdelCloneDiv')).click(function(){
							if (SHtable.is(':visible')) {
								SHtable.hide();
								$(this).removeClass('SHminimize').addClass('SHmaximize');
								data.MINMAX = true;
								setTimeout(function(){ setValue(data.UNI + data.NAME, data); },0);
							} else {
								SHtable.show();
								$(this).removeClass('SHmaximize').addClass('SHminimize');
								data.MINMAX = false;
								setTimeout(function(){ setValue(data.UNI + data.NAME, data); },0);
							}
						});
						if (data.MINMAX) divMINMAX.click();
						
						
					} else {
						var posteingang = $('#tab-msg li#1').hasClass('aktiv');
						var spionage = $('#section2 .mailWrapper a#7');
						
						if (posteingang && (spionage.length > 0 && spionage.hasClass('active') || spionage.length == 0)) {
							if (data.CHECKED.length > 0) {
								for (var i = 0; i < data.CHECKED.length; i++) {
									var id = data.CHECKED[i];
									var inputCheck = $('input#' + id + '.checker');
									if (inputCheck.length == 0) {
										removeCheck(id);
									}
								}
							}
							
							// gibt es keine bericht zum anzeigen wird die sortierreihenfolge und die minmierte/maximierte einstellung zurueckgesetzt
							data.SORT.REL = 'age';
							data.SORT.INVERSE = false;
							data.MINMAX = false;
							setTimeout(function(){ setValue(data.UNI + data.NAME, data); },0);
						}
						
					}
				}
			});
		} else if ($('body').attr('id') == 'fleet1') {
			// select ships if possible
			for (var x3 = 0; x3 < data.BEVORZUGT.length; x3++) {
				if (selectShips(data.BEVORZUGT[x3])) break;
			}
		}
	} else {
		if ($('body').attr('id') == 'messages') {
			$('body').ajaxSuccess(function(e,xhr,settings){
				if (settings.url == 'http://' + data.UNI + '/game/index.php?page=messages' && settings.type == 'POST') {
					// spionage berichte suchen
					var berichteDOM = $('tr[id^="spioDetails_"]');
					if (berichteDOM.size() > 0) {
						$('<div/>').attr('id','spioHelper').css({
							'width':'80%',
							'margin':'10px auto',
							'padding':'10px'
						}).text(data.T0).prependTo($('#messageContent'));
					}
				}
			});
		}
	}


	/**
	* jQuery.fn.sortElements
	* --------------
	* @author James Padolsey (http://james.padolsey.com)
	http://github.com/padolsey/jQuery-Plugins/tree/master/sortElements/
	* @version 0.11
	* @updated 18-MAR-2010
	* --------------
	* @param Function comparator:
	* Exactly the same behaviour as [1,2,3].sort(comparator)
	*
	* @param Function getSortable
	* A function that should return the element that is
	* to be sorted. The comparator will run on the
	* current collection, but you may want the actual
	* resulting sort to occur on a parent or another
	* associated element.
	*
	* E.g. $('td').sortElements(comparator, function(){
	* return this.parentNode;
	* })
	*
	* The <td>'s parent (<tr>) will be sorted instead
	* of the <td> itself.
	*/
	jQuery.fn.sortElements=(function(){var sort=[].sort;return function(comparator,getSortable){getSortable=getSortable||function(){return this};var placements=this.map(function(){var sortElement=getSortable.call(this),parentNode=sortElement.parentNode,nextSibling=parentNode.insertBefore(document.createTextNode(''),sortElement.nextSibling);return function(){if(parentNode===this){throw new Error("You can't sort elements if any one is a descendant of another.");}parentNode.insertBefore(this,nextSibling);parentNode.removeChild(nextSibling)}});return sort.call(this,comparator).each(function(i){placements[i].call(getSortable.call(this))})}})();
	
})();