// ==UserScript==
// @include        http://nl*.tribalwars.nl/game.php*
// @include        http://nl*.tribalwars.nl/public_report/*
// @include        http://zz*.tribalwars.net/game.php*
// @include        http://zz*.tribalwars.net/public_report/*
// @name           TBR map
// @version        3.2.26
// @namespace      http://tbrmap.twscripters.wyk.nl/
// @description    TBR Map v3.2.26 voor Tribalwars.nl / beta.tribalwars.net
// ==/UserScript==

/**
 *
 * TBR Map V3 Copyright (C) 2008, 2009, 2010 Mark Vink (info@markvink.nl), Joost Klootwijk (jk@twscripters.wyk.nl)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version. (See http://www.gnu.org/licenses/gpl.txt)
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * v3.1.3 Opera version
 * v3.1.4 First public working v6.0 script
 * v3.1.4.1 Modified for tribalwars v6.2, replacing xml+GM_set for game_data
 *          Firefox fox: use of innerHTML & unsageWindow.game_data
 * v3.1.4.2 bugfix: legenda & vacation mode, preparation for localStorage
 * v3.1.4.9 Added publicreports beta
 * v3.1.4.9.2 Various bugfixes, initial lang support, error msg on map.
 *           Eenheden onbekend gefixed
 * v3.1.4.9.3 First testing on beta, english version (v6.3)
 * v3.1.4.9.4 New layout for village_info (notes inline)
 * v3.1.4.9.5 New xmlRequest implementation
 * v3.1.5 More state changes and synchronized Opera/Firefox version
 * v3.1.5.1 Corrected for tw subversion 8575 6.3 new event in map)
 * v3.1.5.2 Updated security check of onmessage function, fixing firefox & Opera v9
 * v3.1.5.3 No tbr without tribe, no troopinfo for own villages (cleanup)
 * v3.1.5.4 Added error for offline server, error placed on map
 * v3.1.5.5 Removed notes from all villages
 * v3.2.0.0 debug xhr reinstated
 * v3.2.0.1 Update to API towards server, support for farmrule worlds, initial gathering of settings,
 *          bug fix for public reports, compatible trim for Opera <10.50, support for seconds in reports
 *          changed state to text (due to problems with  some quickbar scripts)
 *          legend colors corrected
 * v3.2.1.1 first support tw v7.0
 * v3.2.1.2 compatible with sangu package, debugged for v7.0
 * v3.2.1.3 injected version
 * v3.2.1.4 more strict date selector, fixes some ad-related bugs
 * v3.2.1.5 fixed map for x<100
 * v3.2.1.6 support for map-dragging, fully ajax style
 * v3.2.1.7 map fixed for tw v7.1, 
 *          integrated notes into tw's premium village notes **PREMIUM ONLY**
 *          BB-codes for notes (no TW specific BB yet)
 *          Map enhancements: age of report, villagecount of troops, new reporthighlight
 *          Map info is cached local
 * v3.2.1.8	Tijdelijke fix door Tuam (Spelversie 8.0)
 * v3.2.1.9     grote kaart schuift weer mee met de kleine kaart (Tuam)
 * v3.2.20	Bug fix voor tw-update van 29 oktober 2012 waardoor het opslaan niet meer werkte
 * 		    Bugfix voor opslag resources
 * 			Debug mode voor Ongeldige Datum (o.a. als de berichtenhernoemer wordt gebruikt)
 * v3.2.21	update jquery-jsonp van v2.1.4 naar 2.5.0 (ivm mogelijke fix 'error' bij opslaan)
 *          debugmode voor ongeldige datum uitgebreid
 * v3.2.22	hersteld dorpsinfo voor non-premium spelers en voor spelers zonder stam
 * v3.2.23	pass debug mode and clearcookie request to server
 * v3.2.24	farmworld settings for nlc1
 * v3.2.25	fix opslaan en verwijderen notities: melding 'Er is geen wereld aangegeven'
 * v3.2.26	fix for new variable names in user_data + fix for loadSector (Da Stewie)
 */

if (location.href.match(/^http:\/\/((nl|zz|en).*\.tribalwars\.(nl|net)\/(game.php|public_report).*)/)) {

	(function (f) {
		var d = document,
			s = d.createElement('script');
		s.setAttribute('type', 'application/javascript');
		s.textContent = '(' + f.toString() + ')()';
		(d.head || d.documentElement || d.body).appendChild(s);
		s.parentNode.removeChild(s)
	})(function () {

		/* default configuration, can be changed through UI. Clear storage to restore. */
		var settings = {
			"active": "07",				// mask: 1=report, 2=villageinfo, 4=map, 8=mapdetail	(unused)
			"kleuren": ["#9900FF", "#FFFFFF", "#00FF00", "#FF7F50", "#FF0000", "#000000"],	//	(unused)
			"legenda": [5, 40000, 100000, 200000, 400000, 9999999],
			"legenda_farmrule": [0, 25, 50, 75, 100, 9999999],	// percentage * max * 30;  for farmrule worlds		(unused)
			"useStorage": true,		// for local caching, do not use yet
			"showAge": true,			// show age of report with the thickness of the border
			"maxAge": 30,				// show reports older than maxAge using thin lines (days)
			"showRecent": 0.2,			// highlight the most recent reports (days)
			"showCount": true,			// show number of troops in village, divided by 20000
			"showType": false,			// show type of troops in village
			"TypeList": 'AVZSE',		// Letter to be used for, in order: {Attack, Defense, Heavy Cavalery, Scouts, Noble} 
			"showNotes": true			// show notes on map
		},
			/* would be stored in cookie/localStorage */

			config = {
				"opslaan": "http://tbrmap.twmerge.nl/opslaan.php?",
				"note": "http://tbrmap.twmerge.nl/note.php?",
				"info": "http://tbrmap.twmerge.nl/info.php?",
				"map": "http://tbrmap.twmerge.nl/map.php?",	
				"version": "3.2.26",
				"farmrule": {
					"nl5": 1200,
					"nl10": 1800,
					"nl16": 2500,
					"nl24": 2500
				} // used to calculate default legend
			},
			nohide = false,
			debug = false,

			txtDB = {
				"nl": { /* textmessages, should be translated */
					"err_no_attack": "Geen aanvals rapport",
					"err_unknown_def": "Verdediger onbekend, mogelijk een conflict met een ander script (18)?",
					/* NL specific, 18 refers to an allowed nl script */
					"err_dump_own": "Dump op eigen dorp",
					"err_my_village": "Aanval op eigen dorp",
					"err_unknown_units": "Geen eenheden bekend!",
					"err_noinfo": "TBRmap info niet beschikbaar",
					"msg_prev_stored": "Al opgeslagen: %s op %s",
					"info_saving": "opslaan...",
					"err_no_gamedata": "No game_data available",
					"err_nosave": "Er is een fout opgetreden, niet opgeslagen",
					"err_offline": "TBR Map is tijdelijk niet beschikbaar",
					"btn_edit": "Bewerken",
					"btn_save": "Opslaan",
					"btn_del": "Verwijderen",
					/* debug messages */
					"msg_settings": "Taal: %s\nStam: %s",
					"msg_load": "TBRMap: ophalen...",
					"msg_save": "Opslaan: ",
					"report_save": "Rapport opslaan: Reportid=%s\tDatum=%s\tOnderwerp=%s\nAanvaller=%s\tVerdediger=%s\tDoel=%s\tAantal=%s\tVerliezen=%s",
					"report_extras": "        extras : Grondstoffen=%s\tBuit=%s\tToestemming=%s\nGebouwen=%s",
					"hd_troopinfo": "Info over troepen",

					/* Fields / regular expressions, must be adjusted to the server language */
					"attrep_re": /( valt .* aan| verovert )/,
					"subject": "Onderwerp",
					"send_at": "Verzonden",
					"attacker": "Aanvaller:",
					"defender": "Verdediger:",
					"target": "Doel:",
					"troops": "Aantal:",
					"losses": "Verliezen:",
					"village_re": /^(Dorp)/,
					"resources": "grondstoffen",
					"buildings": "Gebouwen",
					"haul": "Buit",
					"loyalty": "Toestemming",
					"player_map_re": /(.+)\s\([0-9.]+ punten\)/,
					"tribe_map_re": /(.+)\s\([0-9.]+ punten\)/,
					"expired": "Sessie afgelopen",

					/* TBRmap server responses, used to translate by client */
					"msg_nonote": "Geen notitie.",
					"msg_no_troops_intel": "Geen info bekend.",
					"msg_save_ok": "Opgeslagen!",
					/* TBRmap related regular expressions - do not translate (see above for translation) */
					"nonote_re": /Geen notitie./,
					"noinfo_re": /Geen info bekend./,
					"saveok_re": /Opgeslagen!/,
					"offline_re": /(De website is tijdelijk offline|Not Found)/,
					"error_re": /(Teveel requests|De website is tijdelijk offline|Uw huidige TBR Map versie.^versie!|timeout|error)/,
					/* accepted standard errormessages */

					/* misc */
					"lang": "nederlands"
				},
				"zz": { /* textmessages */
					"err_no_attack": "Not a report of an attack",
					"err_unknown_def": "No defender found, possibly due to a conflicting script",
					/* NL specific, 18 refers to an allowed nl script */
					"err_dump_own": "Dump of troops at your own village",
					"err_my_village": "Attack at your own village",
					"err_unknown_units": "Unknown defending units!",
					"err_noinfo": "TBRmap information not available",
					"msg_prev_stored": "Already stored: %s at %s",
					"info_saving": "saving...",
					"err_no_gamedata": "No game_data available",
					"err_nosave": "An error occured, report is not saved",
					"err_offline": "TBR Map is temporarily unavailable",
					"btn_edit": "Edit",
					"btn_save": "Save",
					"btn_del": "Remove",

					/* debug messages */
					"msg_settings": "Language: %s\nStam: %s",
					"msg_load": "TBRMap: Loading...",
					"msg_save": "Saving: ",
					"report_save": "Srrt: Reportid=%s\tDatum=%s\tOnderwerp=%s\nAanvaller=%s\tVerdediger=%s\tDoel=%s\tAantal=%s\tVerliezen=%s",
					"report_extras": "        extras : Grondstoffen=%s\tBuit=%s\tToestemming=%s\nGebouwen=%s",
					"hd_troopinfo": "Intelligence on troops",

					/* Fields / regular expressions */
					"attrep_re": /( attacks | conquers )/,
					"subject": "Subject",
					"send_at": "Sent",
					"attacker": "Attacker:",
					"defender": "Defender:",
					"target": "Destination:",
					"troops": "Quantity:",
					"losses": "Losses:",
					"village_re": /^(Village:)/,
					"resources": "resources",
					"buildings": "Buildings",
					"haul": "Haul",
					"loyalty": "Loyalty",
					"player_map_re": /(.+)\s\([0-9.]+ Points\)/,
					"tribe_map_re": /(.+)\s\([0-9.]+ Points\)/,
					"expired": "Session expired",

					/* TBRmap server responses, used to translate by client */
					"msg_nonote": "No note.",
					"msg_no_troops_intel": "No troops known",
					"msg_save_ok": "Stored!",

					/* TBRmap related regular expressions - do not translate (see above for translation) */
					"nonote_re": /Geen notitie./,
					"noinfo_re": /Geen info bekend./,
					"saveok_re": /Opgeslagen!/,
					"offline_re": /(De website is tijdelijk offline|Not Found)/,
					"error_re": /(Teveel requests|De website is tijdelijk offline|Uw huidige TBR Map versie.^versie!)/,
					/* accepted standard errormessages */

					/* misc */
					"lang": "english - beta"
				}
			};
		txtDB.en = txtDB.zz; // copy from zz
		txtDB.en.lang = "english";

		// jquery.jsonp 2.4.0 (2012-08-21) (c) 2012 Julian Aubourg
		// https://github.com/jaubourg/jquery-jsonp
		(function(e){function t(){}function n(e){C=[e]}function r(e,t,n){return e&&e.apply(t.context||t,n)}function i(e){return/\?/.test(e)?"&":"?"}function O(c){function Y(e){if(!(z++)){W();j&&(T[I]={s:[e]});D&&(e=D.apply(c,[e]));r(O,c,[e,b,c]);r(_,c,[c,b])}}function Z(e){if(!(z++)){W();j&&e!=w&&(T[I]=e);r(M,c,[c,e]);r(_,c,[c,e])}}c=e.extend({},k,c);var O=c.success,M=c.error,_=c.complete,D=c.dataFilter,P=c.callbackParameter,H=c.callback,B=c.cache,j=c.pageCache,F=c.charset,I=c.url,q=c.data,R=c.timeout,U,z=0,W=t,X,V,J,K,Q,G;S&&S(function(e){e.done(O).fail(M);O=e.resolve;M=e.reject}).promise(c);c.abort=function(){!(z++)&&W()};if(r(c.beforeSend,c,[c])===!1||z){return c}I=I||u;q=q?typeof q=="string"?q:e.param(q,c.traditional):u;I+=q?i(I)+q:u;P&&(I+=i(I)+encodeURIComponent(P)+"=?");!B&&!j&&(I+=i(I)+"_"+(new Date).getTime()+"=");I=I.replace(/=\?(&|$)/,"="+H+"$1");if(j&&(U=T[I])){U.s?Y(U.s[0]):Z(U)}else{E[H]=n;K=e(y)[0];K.id=l+N++;if(F){K[o]=F}L&&L.version()<11.6?(Q=e(y)[0]).text="document.getElementById('"+K.id+"')."+p+"()":K[s]=s;if(A){K.htmlFor=K.id;K.event=h}K[d]=K[p]=K[v]=function(e){if(!K[m]||!/i/.test(K[m])){try{K[h]&&K[h]()}catch(t){}e=C;C=0;e?Y(e[0]):Z(a)}};K.src=I;W=function(e){G&&clearTimeout(G);K[v]=K[d]=K[p]=null;x[g](K);Q&&x[g](Q)};x[f](K,J=x.firstChild);Q&&x[f](Q,J);G=R>0&&setTimeout(function(){Z(w)},R)}return c}var s="async",o="charset",u="",a="error",f="insertBefore",l="_jqjsp",c="on",h=c+"click",p=c+a,d=c+"load",v=c+"readystatechange",m="readyState",g="removeChild",y="<script>",b="success",w="timeout",E=window,S=e.Deferred,x=e("head")[0]||document.documentElement,T={},N=0,C,k={callback:l,url:location.href},L=E.opera,A=!!e("<div>").html("<!--[if IE]><i><![endif]-->").find("i").length;O.setup=function(t){e.extend(k,t)};e.jsonp=O})(jQuery)

		// Debug: object and array dumper
		var dump = function (obj, depth) {
				if (obj.constructor == Array || obj.constructor == Object) {
					var text = '';
					if (!depth) depth = 0;
					for (var p in obj) {
						if (typeof (obj[p]) == 'function') continue;
						for (var i = 0; i < depth; i++)
						text += '   ';
						text += '[' + p + '] => ';
						if (obj[p].constructor == Array || obj[p].constructor == Object) {
							text += typeof (obj) + "...\n" + arguments.callee(obj[p], depth + 1);
						} else {
							var to = typeof (obj[p]);
							text += (to == 'string' ? '"' : '') + obj[p] + (to == 'string' ? '"' : '') + "\n";
						}
					}
					return text;
				}
				return '';
			},

			logMsg = function (strMessage) {
				try {
					if ((log = $('#TBRlog')).length == 0) {
						log = $('<div>').attr('id', 'TBRlog').css({
							border: 2,
							borderStyle: 'solid',
							borderColor: '#0d7cda',
							paddingBottom: 25
						});
						if (debug || nohide) {
							log.show()
						} else log.hide();
						$('#footer').before(log);
					}
					lines = strMessage.split('\n');
					for (var i = 0, len = lines.length; i < len; i++) {
						log.append(document.createTextNode('TBRmap: ' + lines[i])).append('<br>');
					}
				} catch (objError) {
					if (console) {
						console.log(strMessage + "\n" + objError);
					} else opera.postError(strMessage + "\n" + objError); /* for opera 9.64 */
				}
			},

			// createElement
			ce = function (name) {
				return document.createElement(name);
			},

			icons = [
				["info", "#112233", "/graphic/new_mail.png"],
				["claim", "#000000", "/graphic/face.png"]
			],
			
			//createIcon
			createIcon = function (idx) {
				var img = ce('img');
				var style = '';
				img.src = icons[idx][2];
				img.title = icons[idx][0];
				img.setAttribute('style', style + 'background-color: ' + icons[idx][1]);
				return img;
			},

			sprintf = function () {
				var num = arguments.length,
					oStr = arguments[0],
					i = 1;
				if (num == 1) return oStr;
				while (i <= num) {
					oStr = oStr.replace(/%s/, arguments[i++]);
				}
				return oStr;
			},

			parse_date = function (date) {
				if (lang.match(/nl|de/)) {
					//24.06.10 18:06
					//14.09.10 13:45:32
					return date;
				} else if (lang.match(/(en|zz)/)) {
					//Jul 03,2010 01:24
					//Aug 24, 2010  10:25:12
					var datum = date.match(/([A-Za-z]+) (\d+), 20(\d+) *(\d+):(\d+)(?::(\d+))?/); // Mon, DD, YY, HH, MM[, ss]
					monthstr = 'JanFebMarAprMayJunJulAugSepOctNovDec';
					month = monthstr.indexOf(datum[1]) / 3 + 1;
					if (month < 10) month = '0' + month;
					if (datum) {
						if (datum[6] === null) {
							return (datum[2] + '.' + month + '.' + datum[3] + ' ' + datum[4] + ':' + datum[5]);
						} else {
							return (datum[2] + '.' + month + '.' + datum[3] + ' ' + datum[4] + ':' + datum[5] + ':' + datum[6]);
						}
					} else {
						return (date);
					}
				}
			},

			is_errormsg = function (msg) {
				err = '';
				if (msg.match(txtDB['offline_re'])) {
					errdetail = msg.match(txtDB['error_re']);
					err = txtDB['err_offline'];
					//if (errdetail)
					//	err+=' '+errdetail[1];
				} else if (msg.match(/error\|/)) {
					err = msg.split('|')[1];
				}
				return (err);
			},

			TBRpopup, 
			TBRpop = function (event, target, url, closeText, handler, UserOptions, width, height, x, y, toToggle) { // aangepast obv van UI.ajaxPopup
				var topmenu_height = 60,
					defaults = {
						dataType: 'jsonp'
					},
					options = $.extend(defaults, UserOptions),
					fillpopup = function (msg) {
						var container = null;
						if ($('#' + target).length == 0) {
							container = $('<div>').attr('id', target).addClass('popup_style').css({
								width: width,
								position: 'fixed'
							});
							var menu = $('<div>').attr('id', target + '_menu').addClass('popup_menu').html($('<a>').attr("id", "closelink_" + target).attr('href', '#').html(closeText)),
								content = $('<div>').attr('id', target + '_content').addClass('popup_content').css('height', height);
							container.append(menu).append(content);
							container.bind("dragstop", function () {
								document.onselectstart = function (event) {
									$(event.target).trigger('select')
								}
							});
							$('#ds_body').append(container);
							UI.Draggable('#' + target);
							$("#closelink_" + target).click(function (event) {
								event.preventDefault();
								$(toggleSelector).toggle()
							})
						} else container = $('#' + target);
						if (handler) {
							handler.call(this, msg, $('#' + target + '_content'))
						} else $('#' + target + '_content').html(msg);
						if ($.cookie('popup_pos_' + target)) {
							var pos = $.cookie('popup_pos_' + target).split('x');
							x = parseInt(pos[0], 10);
							y = parseInt(pos[1], 10)
						} else $.cookie('popup_pos_' + target, x + 'x' + y);
						if (!mobile) {
							if (y > $(window).height()) y = $(window).height() - $(container).outerHeight();
							if (x > $(window).width()) y = $(window).width() - $(container).outerWidth();
							if (x < 0) x = 0;
							if (y < topmenu_height) y = topmenu_height;
							container.css('top', y).css('left', x)
						};
						container.show();
					};
				if (options.reload || ($('#' + target).length == 0)) {
					var button = null;
					//logMsg('popup: #'+target+' url='+url+' type='+options.dataType+' html='+options.html+'pos='+x+','+y);
					if (event && (!x || !y)) { // Open popup next to calling link
						if (event.srcElement) {
							button = event.srcElement
						} else button = event.target;
						var offset = $(button).offset();
						if (!x) x = offset.left;
						if (!y) y = offset.top + $(button).height() + 1
					};
					if (!height) height = 'auto';
					if (!width) width = 'auto';
					var toggleSelector = '#' + target;
					if (typeof (toToggle) != 'undefined') if (toToggle.length > 0) for (key in toToggle) toggleSelector = toggleSelector + ', ' + toToggle[key];
					//logMsg('popup: #'+target+' url='+url+' type='+options.dataType+' html='+options.html+'pos='+x+','+y);
					if (options.dataType == 'direct' && options.html) {
						logMsg(options.html);
						fillpopup(options.html)
					} else {
						$.ajax({
							url: url,
							dataType: options.dataType,
							success: fillpopup
						})
					}
				} else $('#' + target).show()
			},
			
			TBRsettings = function() {
				var options = {
						'showNotes': ['checkbox', 'Notities tonen'],
						'showBorder': ['checkbox', 'Toon aantal troepen met kaders'],
						'showAge': ['checkbox', 'Kaderdikte afhankelijk van de leeftijd rapport'],
						'showRecent': ['checkbox', 'Verlicht recentste rapporten (&lt;12 uur)'],
						'showCount': ['checkbox', 'Aantal dorpen OS tonen (20.000 per dorp)', 'Aantal dorpen OS tonen (20.000 per dorp)'],
						'showType': ['checkbox', 'Aantal dorpen OS tonen'],
						'showLegend': ['checkbox', 'Legenda tonen'],
						'showLegendAsVil': ['checkbox', 'Legenda als aantal dorpen OS (20.000)']
					},
					popup='<label><input type="checkbox" name="tbrmap" onclick="TWMap.TBR.toggle();" id="tbrmap" checked="checked"/> ';
				popup+='TBRmap tonen';
				popup+=' <a href="javascript:toggle_element(\'#tbrmap_options\')">opties</a></label><br/><div id="tbrmap_options" style="display: none">';
				for (var o in options) {
					popup+='<label><input type="'+options[o][0]+'" onclick="TWMap.TBR.toggle();" id="tbrmap_'+o+'" checked="'+(settings[o]?'checked':'')+'"/>'+options[o][1]+'</label><br/>';
				}
				popup+='</div>';
				//popup= $('<label><input type="checkbox" name="tbrmap" onclick="TWMap.TBR.toggle();" id="tbrmap" checked="checked"/> TBRmap tonen <a href="javascript:toggle_element(\'#tbrmap_options\')">opties</a></label><br/><div id="tbrmap_options" style="display: none"><label><input type="checkbox" onclick="TWMap.TBR.toggle();" id="tbrmap_show_notes" checked="checked"/>Notities tonen </label><br/><label><input type="checkbox" onclick="TWMap.TBR.toggle();" id="tbrmap_show_border"/> Toon aantal troepen met kaders</label><br/><label><input type="checkbox" onclick="TWMap.TBR.toggle();" id="tbrmap_show_age"/> Kaderdikte afhankelijk van de leeftijd rapport</label><br/><label><input type="checkbox" onclick="TWMap.TBR.toggle();" id="tbrmap_show_recent"/> Verlicht recentste rapporten (&lt;12 uur)</label><br/><label><input type="checkbox" onclick="TWMap.TBR.toggle();" id="tbrmap_show_count"/> Aantal dorpen OS tonen (20.000 per dorp)</label><br/><label><input type="checkbox" onclick="TWMap.TBR.toggle();" id="tbrmap_show_type"/> Aantal dorpen OS tonen</label><br/><label><input type="checkbox" onclick="TWMap.TBR.toggle();" id="tbrmap_show_legend"/> Legenda tonen</label><br/></div>');
				return $(popup);
			},

			do_request = function (req) {
				if (req.cmd == 'opslaan') {
					if (debug) logMsg(txtDB['msg_save'] + ' player=' + req.player + '\ttribe=' + req.tribe + '\tworld=' + req.world + '\tsubject=' + req.onderwerp + '\n' + txtDB['msg_save'] + ' village=' + req.village + '\ttroops=' + req.aantal + '\tlosses=' + req.verliezen);
					//if (!req.onderwerp.match(txtDB["attrep_re"])) {
					//	return(txtDB["err_no_attack"]);
					//}
					if (typeof req.verdediger == 'undefined') {
						return (txtDB["err_unknown_def"]);
					}
					if (req.aanvaller == req.verdediger) {
						return (txtDB["err_dump_own"]);
					}
					if (req.verdediger == req.player) {
						return (txtDB["err_my_village"]);
					}
					if (req.aantal == 'none') {
						return (txtDB["err_unknown_units"]);
					}

					host = config['opslaan'];
					host += 'tribe=' + req.tribe;
					host += '&player=' + req.player;
					host += '&world=' + req.world;
					host += '&id=' + req.report;
					host += '&datum=' + req.datum;
					host += '&aanvaller=' + req.aanvaller;
					host += '&verdediger=' + (req.verdediger ? req.verdediger : 0);
					host += '&village=' + req.village;
					host += '&aantal=' + req.aantal;
					host += '&verliezen=' + req.verliezen;
					if (toestemming!='') host += '&loyalty=' + req.toestemming;
					if (gebouwen!='') host += '&buildings=' + req.gebouwen;
					if (grondstoffen!='') host += '&resources=' + req.grondstoffen;
					if (buit!='') host += '&haul=' + req.buit;
					host += '&verliezen=' + req.verliezen;
					host += '&v=' + req.version;
					host += '&json';
					if (req.info!='') {
						host += '&debugme';		// Add DEBUG flag
						// TBRpop(null,'', '', 'sluiten', null, {dataType: 'direct', html: '<i>Send to debug:</i><hr>'+JSON.parse(req.info.debug)}, 700, 1000, $(window).width()/2-350, $(window).height()/2-500, '');
						logMsg('Send debug info to: http://tbrmap.twmerge.nl/debuginfo.php?error=' + req.info.error + '&version=' + req.info.bugid + '&v='+req.version+'&world='+req.world+'&player='+req.player);
						$.post('http://tbrmap.twmerge.nl/debuginfo.php?error=' + req.info.error + '&bugid=' + req.info.bugid + '&v='+req.version+'&world='+req.world+'&player='+req.player, {desc: 'full report html', url: host, report: req.info});
					}
				
					if (debug || url.match('&debug')) {
						logMsg('xmlrequest: ' + host);
					}

					$.jsonp({
						url: host + '&callback=?',
						timeout: 15000,
						success: function (response) {
							if (req["onload"]) req["onload"](response);
						},
						error: function (xhr, status, err) {
							logMsg('foutje: ' + status + ' code=' + err);
							if (req["onload"]) req["onload"]({
								error: status
							});
						}
					});
					return (txtDB["info_saving"]);
				}
			},

			village_id, player_id, tribe_id, world, lang,
			get_settings = function () {
				lang = 'nl'; /* Default for error messages */
				if (typeof gd == 'object') {
					village_id = gd.village.id;
					player_id = gd.player.id;
					player_name = gd.player.name;
					tribe_id = gd.player.ally;
					world = gd.world;
					lang = gd.market;
				} else if (debug) logMsg(txtDB["err_no_gamedata"]);
			},

			addState = function (txt, disp) {
				state = doc.getElementById('TBRMap');
				if (state === null) {
					ct = doc.getElementById('content_value');
					statediv = ce('div');
					statediv.style.position = 'relative';
					statediv.height = 0;
					ct.insertBefore(statediv, doc.getElementsByTagName('H2', ct)[0].nextSibling);

					state = ce('text'); // no more h4 due to interference with report rename
					state.id = "TBRMap";
					state.style.position = 'absolute';

					state.style.top = '-35px';
					state.style.left = '470px'; // 470: for longest name on beta

					state.appendChild(doc.createTextNode(''));
					statediv.appendChild(state);
				}
				state.firstChild.nodeValue = txt;
				if (disp == 'warn') {
					state.className = 'warn';
				} else {
					state.style.display = disp;
				}
				return (state);
			},

			init_TWmapTBR = function () {
				
				TWMap.TBR = [];
				TWMap.urls.TBRmap = config.map + 'tribe=' + game_data.player.ally + '&player=' + game_data.player.id + '&world=' + game_data.world + '&v=' + config.version + '&json';

				TWMap.TBR.handler = {
					_waitingSectors: {},
					_loadedSectors: {},
					
					
					onReceiveSectorInformation: function (data_array, skip_store) {
						var inf = data_array,
							// inf = data_array[sector_idx],
							data = inf.data,
							sx = inf.x,
							sy = inf.y,
							_me = this;
							sectorData = this._waitingSectors[inf.id];
							if (debug) logMsg('received TBR data: '+data_array.id+' skip_store='+skip_store);
							//logMsg('data_array='+JSON.stringify(inf.data));
							if (sectorData) {
								/*if (!skip_store) {
									// logMsg('storing map info TBR_map_' + sx + '_' + sy + ": " + JSON.stringify(inf));
									TWMap.store.gset('TBRmap_' + gd.player.id+ '_' + sx + '_' + sy, inf, 600);      // store TBRmap info 10 minutes
								};*/
								sectorData.x = sx;
								sectorData.y = sy;
								sectorData.data = data;
								for (var i in sectorData.queue) {
										sectorData.queue[i].loaded = true;
											(function (data, sector, sx, sy, count) {
												if (debug) logMsg(sx+'_'+sy+': Count='+count);
												if (debug) logMsg('_me='+_me+' data='+data+' sector='+sector+' sx='+sx+' sy='+sy);
												//logMsg('spawning '+_me.sectorData.queue[_me.i].id+' twload-state: '+TWMap.mapHandler._waitingSectors[_me.sx+'_'+_me.sy]);
												//logMsg('spawning '+sector.id+' twload-state: '+TWMap.mapHandler._waitingSectors[sx+'_'+sy]);
												/*if (typeof TWMap.TBR.handler._waitingSectors[sx + '_' + sy] == 'undefined') {
													*/_me.TspawnSector(data, sector);
												/*} else {
													//alert('fout');
													count++;
													setTimeout(arguments.callee, 200, data, sector, sx, sy, count);
													if (debug) logMsg('waiting for _waitingSectors '+(sx+'_'+sy));
												};*/
											})(sectorData.data, sectorData.queue[i], sx, sy, 1);
									};
								delete this._waitingSectors[sx + '_' + sy]
							}
						},

					
					
					
					
					TspawnSector: function(data,sector){
						var beginX = sector.x,
						endX = beginX + TWMap.mapSubSectorSize,
						beginY = sector.y,
						endY = beginY + TWMap.mapSubSectorSize;
						if (debug) logMsg('spawn sector ('+beginX+','+beginY+')-('+endX+','+endY+')');
						now=((new Date()).getTime())/1000;
						//if (TWMap.villages) logMsg("vilnum="+dump(TWMap.villages));                                          
					 
						var sect_list='sector ('+beginX+','+beginY+')-('+endX+','+endY+')=';
						for (var d in data.villages) {
							var vil = data.villages[d],
								coords = d.split('|'),
								x = coords[0],
								y = coords[1],
								coords = x * 1000 + y * 1,
								cur, id;
							if (x < beginX || x >= endX) continue;
							if (y < beginY || y >= endY) continue;
							sect_list+=x+'_'+y+' ';
							id=TWMap.villages[coords];
							if (!(id)) {if (debug) logMsg('notfound: villages['+coords+']');continue;}
							if (debug) logMsg('Dorp '+d+' ('+x+','+y+') '+coords+'; vil='+JSON.stringify(id)+' id='+id+': border='+(vil.troops?vil.troops.color:'none')+' note='+(vil.note?vil.note.short:'nonote')+' TWMap.villages[]='+typeof TWMap.villages[x+y]);
							cur = $('#map_village_' + id.id);
							if (vil.note && TWMap.context._showPremium) {
								sector.appendElement($('<img src="http://tbrmap.twmerge.nl/note_trans.gif">').css({
									position: 'absolute',
									'z-index': 4,
									'margin-top': 13,
									'margin-left': 18,
									'background-color': vil.note.color ? vil.note.color : '#ffffff',
									top: cur.offsetTop,
									left: cur.offsetLeft
								})[0], x - beginX, y - beginY);
							}
							if (vil.troops) {
								var txt='',
									age = (now - vil.troops.date) / 86400; // age in days
								if (!settings.showAge) age = 6.9;
								if (age > settings.maxAge) age += 10;
								var box = document.createElement('canvas');
								if (box.getContext) {
									box.style.position = 'absolute';
									box.width = TWMap.map.scale[0];
									box.height = TWMap.map.scale[1];
									box.style.zIndex = '4';
									box.style.marginTop = '0px';
									box.style.marginLeft = '0px';
									sector.appendElement(box, x - beginX, y - beginY);
									var ctx = box.getContext("2d");
									ctx.strokeStyle = vil.troops.color;
									ctx.globalAlpha = Math.max(1.0 - age / 30, 0.3); // Optionally set to reports age
									ctx.lineWidth = Math.max(5 - age / 10, 2);
									if (debug) logMsg('('+d+') datum: '+vil.troops.date+' nu: '+now+' Dagen: '+age+' Alpha: '+ctx.globalAlpha+' width: '+ctx.lineWidth);
									ctx.fillStyle = "rgba(230, 230, 230, 0.2)";
									if (age < settings.showRecent) ctx.fillRect(0, 0, TWMap.map.scale[0], TWMap.map.scale[1]); // greyout most recent
									ctx.strokeRect(0, 0, TWMap.map.scale[0], TWMap.map.scale[1]);
									if (settings.showType && vil.troops.troops) {
										var troops=toString(vil.troops.troops).split('|');
										logMsg('troops for typeident ('+(typeof vil.troops.troops)+': '+JSON.stringify(troops));
										//if (troops[1]>1000 || troops[2]>1000 || troops[4]>1000) txt+='D';
										if (troops[3]>1000 || troops[6]>500 || troops[7]>200) txt+='O';
										if (troops[8]>1000) txt+='Z';
										//if (troops[5]>400) txt+='V';
										//if (troops[10]>300) txt+='K';
										//if (troops[12]>0) txt+='E';
									}
									if (settings.showCount) {
										ctx.globalAlpha = 1;
										ctx.lineWidth = 2;
										ctx.fillStyle = '#eee';
										ctx.font = 'italic 18px sans-serif';
										ctx.textBaseline = 'top';
										var cnt = Math.round(vil.troops.total / 2000) / 10;
										if (debug) logMsg('showCount: '+(cnt+txt));
										ctx.strokeStyle = '#000';
										ctx.strokeText(cnt+txt, 5, 5);
										ctx.fillText(cnt+txt, 5, 5);
									}
								//ctx.strokeRect(1, 1, TWMap.map.scale[0]-2, TWMap.map.scale[1]-2);
								} else {
									var el_img = document.createElement('img');
									el_img.style.position = 'absolute';
									el_img.width = TWMap.map.scale[0] - 4;
									el_img.height = TWMap.map.scale[1] - 4;
									el_img.style.zIndex = '4';
									el_img.style.marginTop = '0px';
									el_img.style.marginLeft = '0px';
									el_img.style.border = (age < 7 ? '2px solid' : age < 14 ? '1px solid' : age < 21 ? '1px dashed' : '1px dotted'); // dashed, dotted to indicate age?
									el_img.style.borderColor = vil.troops.color;
									el_img.src = "http://tbrmap.twmerge.nl/images/spacer.gif";
									sector.appendElement(el_img, x - beginX, y - beginY)
								}
							}
						}
						logMsg(sect_list);
					},
						
	
					

					loadSector_TBRResult: function (store_found, store_data, wait_data) {
						if (config.useStorage && store_found) {
							if (debug) logMsg('loading from store: '+ wait_data.id);
							if (debug) logMsg('cache='+JSON.stringify(store_data.data));
							wait_data.got_tbr = true;
							wait_data.data = store_data.data;
						} else wait_data.got_tbr = false;
						this.loadSector_Callback(wait_data)
					},
					loadSector_Callback: function (wait_data) {
						var i = 0;
						if (wait_data.got_tbr !== undefined) if (wait_data.got_tbr === true) {
							//alert('test');
							this.onReceiveSectorInformation(wait_data, true)
						} else {
							var coords = wait_data.id.split('_');
							/* TODO: change to $.jsonp() */
							$.ajax({
								url: TWMap.urls.TBRmap + '&x=' + coords[0] + '&y=' + coords[1],
								dataType: 'jsonp',
								success: function (data) {
									return TWMap.TBR.handler.onReceiveSectorInformation({"id": wait_data.id, "x": coords[0], "y": coords[1], "data": data})
								}
							})
						}
					},
					
					
					loadSectors: function (sectors) {
						var wait_sectors = [],
						wait_list = "";
						for (var i = 0; i < sectors.length; i++) {
							var sector=sectors[i],
								sx=sector.x-(sector.x%20),
								sy=sector.y-(sector.y%20),
								sector_id=sx+'_'+sy,
								wait_data=this._waitingSectors[sector_id];

							if (wait_data) {
								wait_data.queue.push(sector);
								wait_list += sector_id + ' ';
							} else {
								wait_data = {id: sector_id, x: sx, y: sy, tiles:null, pmap:null, data:null, queue:[sector], got_tbr: undefined};
								this._waitingSectors[sector_id] = wait_data;
								wait_sectors.push(wait_data);
							}
						};
						//logMsg('loading multiple sectors: ('+wait_list+')');
						if (wait_sectors.length < 1) return;
						this._sector_request_queue=[];
						for (var i = 0; i < wait_sectors.length; i++) {
							var wait_data = wait_sectors[i];
							wait_data.tiles=TWMap.storeTiles.get(wait_data.x,wait_data.y);
							wait_data.data=TWMap.storeVillage.get(wait_data.x,wait_data.y);
							if(TWMap.politicalMap.displayed){
								wait_data.pmap=TWMap.storePolitical.get(wait_data.x,wait_data.y)
							}
							else wait_data.pmap=[[],[]];
							//if(wait_data.data!==null&&wait_data.tiles!==null&&wait_data.pmap!==null){
								//TWMap.TBR.handler.onReceiveSectorInformation(wait_data,true)
								TWMap.TBR.handler.loadSector_TBRResult('TBRmap_' + gd.player.id+ '_' + wait_data.id,TWMap.TBR.handler.loadSector_TBRResult,wait_data,this);
							//}
							/*else*/ this._sector_request_queue.push(wait_data)
						};
						if(this._sector_request_queue.length>0){
							var query_string='/map.php?e='+((new Date()).getTime());
							for(var i=0;i<this._sector_request_queue.length;i++){
								var wait_data=this._sector_request_queue[i],
								query_val=0;
								if(wait_data.tiles===null)query_val+=1;
								if(wait_data.pmap===null)query_val+=2;
								query_string+='&'+wait_data.id+'='+query_val};
								//loadSector_TBRResult('TBRmap_' + gd.player.id+ '_' + wait_data.id, this.loadSector_TBRResult, wait_data, this); // nieuw
								$.ajax({type:'GET',url:query_string,dataType:'json',success:function(data){
									TWMap.TBR.handler.loadSector_TBRResult('TBRmap_' + gd.player.id+ '_' + wait_data.id, TWMap.TBR.handler.loadSector_TBRResult, wait_data, this);
										//return TWMap.TBR.handler.onReceiveSectorInformation(data,false)
									}
								});
							this._sector_request_queue=[];
						}
					},
				}

				function TBRloadSectors(sectors) {
					TWMap.mapHandler.TWloadSectors(sectors);
					TWMap.TBR.handler.loadSectors(sectors);
				}

				TWMap.mapHandler.TWloadSectors = TWMap.mapHandler.loadSectors;
				TWMap.mapHandler.loadSectors = TBRloadSectors;
			
				/* Periodicly auto-clean local cache */
				if (localStorage && localStorage.length>300 && Math.random()<-0.1) {
					TWMap.store.gget('lastvacuum', function (store_found, store_data) {
						var cachelen=localStorage.length;
						if (!store_found) {
							TWMap.store.vacuum();
							if (debug) alert('cache Opgeschoond: '+cachelen+'->'+localStorage.length);
							TWMap.store.gset('lastvacuum', 60+(new Date).getTime()/1000, 86400);	// Only vacuum once per day
						}
					}, null, this);
				}
			},

			do_map = function (update) {
				state = addState(txtDB['msg_load'], 'block');
				init_TWmapTBR();
				/* hide political map options by default, creating more room for TBR options - TODO test on non-PA */
				$('#pmap_options').hide();
	/* fout? */
				if (gd.player.premium) $('#map_config label:first').append('<a href=\'javascript:toggle_element(\"#pmap_options\")\'>opties</a>');
				/* not working yet
				$('#map_config').append(TBRsettings());
				$('#tbrmap_options').css({'margin-bottom': '9px', 'margin-left': '20px', 'margin-right': '0px', 'margin-top': '0px'}); 
				*/
				
				//var cell = document.getElementById("map_topo");
				//var div = ce('div');
				if (max = config['farmrule'][world]) {
					if (debug) logMsg('farmrule actief: ' + max);
					max = 30 * max / 100;
					legenda = [0, Math.round(0.25 * max) / 10, Math.round(0.5 * max) / 10, Math.round(0.75 * max) / 10, max / 10, 9999999]; // show per 1000
					var iHtml = '<table width="100%" height="54" cellspacing="1" cellpadding="0" class="map_container"><tr><td style="background-color:' + settings['kleuren'][0] + '" width="20"></td><td class="small">Leeg</td><td style="background-color:' + settings['kleuren'][2] + '" width="20"></td><td class="small">' + legenda[1] + '-' + legenda[2] + 'k</td><td style="background-color:' + settings['kleuren'][4] + '" width="20"></td><td class="small">' + legenda[3] + '-' + legenda[4] + 'k</td></tr><tr><td style="background-color:' + settings['kleuren'][1] + '" width="20"></td><td class="small">' + legenda[0] + '-' + legenda[1] + 'k</td><td style="background-color:' + settings['kleuren'][3] + '" width="20"></td><td class="small">' + legenda[2] + '-' + legenda[3] + 'k</td><td style="background-color:' + settings['kleuren'][5] + '" width="20"></td><td class="small">' + legenda[4] + 'k of meer</td></tr></table>';
				} else {
					legenda = settings['legenda'];
					$.each(legenda, function (i, v) {
						legenda[i] = Math.round(v / 2000) / 10
					}); // show as number of def villages of 20k
					var iHtml = '<table width="100%" height="54" cellspacing="1" cellpadding="0" class="map_container"><tr><td style="background-color:' + settings['kleuren'][0] + '" width="20"></td><td class="small">Leeg</td><td style="background-color:' + settings['kleuren'][2] + '" width="20"></td><td class="small">' + legenda[1] + '-' + legenda[2] + ' dorp</td><td style="background-color:' + settings['kleuren'][4] + '" width="20"></td><td class="small">' + legenda[3] + '-' + legenda[4] + ' dorp</td></tr><tr><td style="background-color:' + settings['kleuren'][1] + '" width="20"></td><td class="small">' + legenda[0] + '-' + legenda[1] + ' dorp</td><td style="background-color:' + settings['kleuren'][3] + '" width="20"></td><td class="small">' + legenda[2] + '-' + legenda[3] + ' dorp</td><td style="background-color:' + settings['kleuren'][5] + '" width="20"></td><td class="small">' + legenda[4] + ' dorp of meer</td></tr></table>';
				}
				$('<div id="TBRlegend" class="ui-widget-content">').html(iHtml).appendTo('#map_topo');

				var load_list="",
					load_sectors=[];
					// Laadt de sectoren (5x5), werkt goed
				for (var s in TWMap.map._visibleSectors/*_loadedSectors*/) {
					var sector = TWMap.map._visibleSectors/*_loadedSectors*/[s];
					//if (sector.visible) { 
						var sx = sector.x /*- (sector.x % 20)*/,
						sy = sector.y /*- (sector.y % 20)*/,
						sectorID = sx + '_' + sy;
						load_sectors.push(sector);
						//alert(sector.x + ' ' + sector.y);
						//TWMap.TBR.handler.loadSector(sector);
						load_list += sector.x + '_' + sector.y + ' ';
					//}
				}
				TWMap.TBR.handler.loadSectors(load_sectors);
				logMsg('Preloaded sectors: '+load_list);
				$('#TBRMap').fadeOut(1800);
				/*cur = document.getElementById('map_village_54635');
				cur.parentNode.appendChild('<img src="http://cdn.tribalwars.net/graphic//map/v1_left.png" z-index="4">');
				*/
			}

		do_report = function (mode) {
			logMsg('do_report: ' + mode);
			var aanvaller = verdediger = village = aantal = verliezen = village = datum = toestemming = gebouwen = grondstoffen = buit = info = '';

			if (mode == 'public') {
				report = url.match(/public_id=(.*$)/)[1];
				heads = [doc.getElementsByTagName('h3'), doc.getElementsByTagName('h4')];
/*	Public: H1 H3{onderwerp} H4{datum} H3{uitslag} H4{gelukkop} t#attack_luck t#attack_moral br
					   #attack_info_att{#attack_info_att_units} #attack_info_def{#attack_info_def_units} 
					   H4{spionagekop} t#attack_spy t#attack_results br
				Heads: H3-H4-H3-H4-..-H4 = [(H3:)[onderwerp,uitslag],(h4:) [datum/tijd],geluk_head,spionage_head]] 
				Tables: #attack_luck, #attack_moral, #attack_info_att, #attack_info_def, attack_spy, attack_results,
						   #attack_info_att_units, #attack_info_def_units */
				onderwerp = heads[0][0].innerHTML;
				datum = heads[1][0].innerHTML;
			} else if (mode == 'report') {
/* report: 	t#1{th{Onderwerp} td{datum} {t#2}} 
					t#2:H3{uitslag} H4{gelukkop} t#attack_luck t#attack_moral br
						#attack_info_att{#attack_info_att_units} #attack_info_def{#attack_info_def_units} 
						H4{spionagekop} t#attack_spy t#attack_results br */

				report = url.match(/view=(\d+)/)[1];
				th = doc.getElementsByTagName('th');
				var rt;
				onderwerp = $.trim($('#content_value th:contains("' + txtDB['subject'] + '") + th').text());
				datum = parse_date($('#content_value table.vis td:contains("' + txtDB['send_at'] + '") + td').first().text()); // for v7.0
				/* DEBUG invalid date */
				if (!datum.match(/\d+\.\d+\.\d+ \d+:\d+:\d+/)) {
					try {
						/* info=$('#content_value th:contains("' + txtDB['subject'] + '")').parent().parent().parent().find('tr:lt(4):not(:has(table))').html()+'_v3';	// DEBUG info for invalid date top of report */
						/* info=$('#content_value th:contains("' + txtDB['subject'] + '")').parent().parent().parent().find('tr:lt(4):not(:has(table))').html()+'_v3';	// DEBUG info for invalid date top of report */
						/* info = $('#content_value table.vis td:contains("' + txtDB['send_at'] + '") + td').html()+"_v3"; */
						info = $('#content_value table th:contains("' + txtDB['subject'] + '")').parent().parent().html();
					} catch (objError) {
						info='Invalid date, info not found '+objError;
					}
					info = {error: 'invalid date', bugid: 1, debug: ((typeof info == 'undefined') ? 'undefined' : JSON.stringify(info)) };
				}
			}
			if (tr = doc.getElementById('attack_info_att')) {
				tr = tr.rows;
				if (tr[0].cells[0].textContent == txtDB["attacker"]) {
					if (false) { // lang == 'nl') {	// TMPFIX
						var aanvaller = tr[0].cells[1].innerHTML.match(/info_player&amp;(t=\d+&amp;)?id=([^"]+)/)[2];
					} else {
						var aanvaller = tr[0].cells[1].innerHTML.match(/id=(\d+)/)[1];
					}
				}
				if (tr = doc.getElementById('attack_info_def')) {
					tr = tr.rows;
					for (var i = 0, len = tr.length; i < len; i++) {
						c = tr[i].cells[0].textContent;
						if (c == txtDB["defender"]) {
							var verdediger = tr[i].cells[1].innerHTML.match(/id=(\d+)/);		// BUGFIX update tw okt-2012
							verdediger = verdediger === null ? '' : verdediger[1];
						} else if (c == txtDB["target"]) {
							village = tr[i].cells[1].textContent;
							village = (tmp = village.match(/(\d+\|\d+)\) [CK]\d+$/)) ? tmp[1] : '';
						}
					}
				}

				if (tr = doc.getElementById('attack_info_def_units')) {
					tr = tr.rows;
					for (var i = 0, len = tr.length; i < len; i++) {
						c = tr[i].cells[0].textContent;
						if (c == txtDB["troops"]) {
							aantal = "";
							for (a = 1, clen = tr[i].cells.length; a < clen; a++) {
								if (n = tr[i].cells[a].innerHTML) {
									aantal += "|" + n;
								}
							}
						} else if (c == txtDB["losses"]) {
							verliezen = "";
							for (a = 1, clen = tr[i].cells.length; a < clen; a++) {
								if (n = tr[i].cells[a].innerHTML) {
									verliezen += "|" + n;
								}
							}
						}
					}
				}
				if (spy=$('#attack_spy th')) {
					spy.each(function(i,e){
						e=$(e);
						if ($(e).text().match(txtDB['resources'])) {
							// grondstoffen=$(e).next().text().replace(/\./g,'');
							grondstoffen=$(e).next().text().replace(/\./g,'').match(/\s([0-9]+)\s([0-9]+)\s([0-9]+)/);
							// "101838 186356 68705 "
						} else if ($(e).text().match(txtDB['buildings'])) {
							gebouwen=JSON.stringify($(e).next().text().replace(/(^\s+|\s+$)/gm,'').replace(/ \(Level\s+(\d+)\)/gm, '=$1').split("\n")).replace(/=/g,'":"');
							// "["Hoofdgebouw":"20","Kazerne":"25","Stal":"20","Werkplaats":"15","Adelshoeve":"1","Smederij":"20","Verzamelplaats":"1","Standbeeld":"1","Marktplaats":"20","Houthakkers":"30","Leemgroeve":"30","IJzermijn":"30","Boerderij":"30","Opslagplaats":"30","Schuilplaats":"10","Muur":"20"]"
						}
					});
				}
				if (results=$('#attack_results th')) {
					results.each(function(i,e){
						e=$(e);
						if (e.text().match(txtDB['haul'])) {
							var empty=$(e).next().next().text().split('/');
							empty=(empty[0]!=empty[1]);
							buit=e.next().text().replace(/\./g,'')+empty*1;
							// "1646 1646 1648 0"  of " 1"
						} else if (e.text().match(txtDB['loyalty'])) {
							toestemming=e.next().text().match(/-?\d+$/)[0];
							// "55" of "-3"
						}
					});
				}
				/* Simple test for proper format, captures hidden troops (public reports) and unscouted defenders */
				if (!(aantal.match(/^(\|\d+){9,14}$/))) aantal = 'none';
				if (!verliezen.match(/^(\|\d+){9,14}$/)) verliezen = 'none';
				
				if (debug) {
					logMsg(sprintf(txtDB['report_save'], report, datum, onderwerp, aanvaller, verdediger, village, aantal, verliezen));
				}
				if (debug) {
					logMsg(sprintf(txtDB['report_extras'], grondstoffen, buit, toestemming, gebouwen));
				}
				// alert(player_id + ' '+tribe_id+' '+world+ ' '+onderwerp+ '\n '+datum+ ' '+aanvaller+ ' '+ verdediger+ '\n'+village+ ' '+aantal+ ' '+verliezen+ '\n'+gebouwen+ ' '+grondstoffen+ ' '+toestemming + ' '+buit+ '\n'+ report+ ' '+ config['version']+' '+time);
				state = addState("TBRMap", 'block');
				request = {
					cmd: 'opslaan',
					player: player_id,
					tribe: tribe_id,
					world: world,
					onderwerp: onderwerp,
					datum: datum,
					aanvaller: aanvaller,
					verdediger: verdediger,
					village: village,
					aantal: aantal,
					verliezen: verliezen,
					gebouwen: gebouwen,
					grondstoffen: grondstoffen,
					toestemming: toestemming,
					buit: buit,
					report: report,
					version: config['version'],
					time: time,
					info: info
				};
				request.onload = function (req) {
					if (debug) logMsg(JSON.stringify(req));
					result = req;
					if (req.error) {
						//alert(req.error);
						//debug = true;
						if (!req.error.match(txtDB["error_re"])) {
							if (debug) logMsg(req.error); /* log unknown messages at the bottom */
							result = txtDB["err_nosave"] + ': ' + req.error;
						}
						addState(req.error, 'warn');
					} else {
						addState("TBRmap: " + req.msg, 'block');
						//alert('test');
					}

				};
				resp = do_request(request);
			} else {
				resp = txtDB['err_no_attack'];
			}

			addState('TBRMap: ' + resp, 'block');
		},

		do_info_village = function do_info_village() {
			info = $("#content_value td:contains('rdinate')").last().parent().nextAll().andSelf(); // all rows, starting from 'Coordinates' , skips sangu table
			c_village = info.first().children().next().text();
			c_owner = info.next().next().first().children().next().html().match(/id=(\d+)">(.*)<\/[aA]\>/); // matches playerid, playername
			if (c_owner === null) c_owner = ["", 0, ""];

			state = addState(txtDB['msg_load'], true);

			host = config['info'];
			host += 'tribe=' + tribe_id;
			host += '&player=' + player_id;
			host += '&world=' + world;
			host += '&village=' + c_village;
			host += '&v=' + config['version'];
			host += '&json';

			if (debug) {
				logMsg('xmlrequest: ' + host);
			}

			//			my_xmlhttpRequest({method: 'GET', url: host, onload: function(req) {
			$.ajax({
				url: host,
				async: true,
				cache: false,
				dataType: "jsonp",
				success: function (data, status, req) {
					//alert(dump(data));
					TBR = doc.getElementById('TBRMap');
					if (data.tbrmsg) TBRpop(null,'TBRpopup', '', 'sluiten', null, {dataType: 'direct', html: data.tbrmsg}, 300, 400, $(window).width()/2-150, $(window).height()/2-200, '');
					if (data.error) {
						debug = true;
						if (!data.error.match(txtDB["error_re"])) {
							//addState(txtDB['err_noinfo']+error,'warn');
							addState(data.error, 'warn');
							logMsg(data.error); /* log unknown messages at the bottom */
						} else {
							addState(data.error, 'warn');
						}
					} else {
						if (debug) {
							logMsg("ResponseText=" + JSON.stringify(data));
						}
						var gentime = data.generated;

						// remove loading sign
						if (debug && gentime) {
							addState('generated in ' + gentime + 'ms', 'block');
						} else {
							addState('TBR loaded', 'block');
						}
						$('#TBRMap').fadeOut(900);

						// Try to add note
						var bbbar = $('#bbcodes'), 
							notetxt,
							TBRhead;
						if (bbbar) {
							$('#village_note').parent().parent().find('th,td').attr('colSpan',2);
							// $("th:nth(2)").attr('colSpan',1).after("<th><a id="tbrdel">href='#TBRdel'>Verwijderen</a></th>");
							$('#message').after('<div>TBRmap notitie</div><textarea name="tbrnote" id="tbrmessage" rows="10" cols="40" style="width: 98%"></textarea>');
							//    .after($('#bbcodes').clone());
							if (data.note) {
								TBRhead='TBRmap notitie (' + data.authorname + ', ' + data.notesave + ')';
								notetxt = decodeURIComponent(decodeURIComponent(data.note));
							} else {
								TBRhead='TBRmap notitie';
								data.notehtml = txtDB['msg_nonote'];
								notetxt='';
							}
							bbbar.parent().parent().before('<tr class="show_notes_row"><th>' + TBRhead + '</th>' + 
								'<th style="text-align: right; font-size: small; font-weight: normal;"><a id="tbrdel" href="#TBRdel">' + txtDB.btn_del + '</a></th></tr>' +
								'<tr class="show_notes_row" colspan="2"><td colspan="2"><div id="TBRnote_show">' + 
								decodeURIComponent(decodeURIComponent(data.notehtml)) + '</div></td></tr>');
							$('#tbrmessage').val(notetxt);
						}

						// Troop info table
						if (data.units) {
							var tbrtable = '<span id="TBR_data" style="display:"' + (nohide ? 'block' : 'none') + '">' + '<table class="vis left" width="28%" style="margin-right:10px;" id="TBR_info_def">' + '<tr><th>' + txtDB.hd_troopinfo + '</th><th style="text-align: right; font-weight: normal;">' + data.date + ' (' + data.attacker + ')' + '</th></tr>' + '<tr><td colspan="2"><table id="TBR_info_def_units" class="vis"><tr class="center"><td></td>';
							$.each(data.units, function (i, e) {
								tbrtable += '<td width="35" align="right"><img src="/graphic/unit/unit_' + e + '.png" title="' + e + '" alt="" /></td>';
							});
							tbrtable += '</tr><tr class=""><td>Aantal:</td>';
							$.each(data.troops, function (i, e) {
								tbrtable += '<td ' + (e == 0 ? 'class="hidden"' : '') + '>' + e + '</td>';
							});
							tbrtable += '</tr><tr class=""><td>Verliezen:</td>';
							$.each(data.losses, function (i, e) {
								tbrtable += '<td ' + (e == 0 ? 'class="hidden"' : '') + '>' + e + '</td>';
							});
							tbrtable += '</tr><tr class=""><td>Huidig:</td>';
							$.each(data.current, function (i, e) {
								tbrtable += '<td ' + (e == 0 ? 'class="hidden"' : '') + '>' + e + '</td>';
							});
							tbrtable += '</tr></table></td></tr></table></span>';
							$(tbrtable).appendTo("#content_value>table");
						}

						$('input[value="' + txtDB.btn_save + '"]').bind('click', function (e) {
							// Post TBRnote through ajax
							var tbrmsg = $('#tbrmessage'),
								host = config.note + 'world=' + world + '&village=' + c_village + '&tribe=' + tribe_id + '&player=' + player_id + '&owner=' + c_owner[1] + '&hash=' + data.note_hash + '&v=' + config.version + '&json';
							e.preventDefault();
							if (debug) logMsg('Posting to TBR, url='+host+'&Bewerk&note='+tbrmsg.val());
							$.ajax({
								url: host,
								async: true,
								cache: false,
								dataType: "jsonp",
								data: {
									note: tbrmsg.val(),
									Bewerk: true
								},
								success: function (data, status, req) {
									//$('form:first').submit();
									$('#TBRnote_show').html(decodeURIComponent(decodeURIComponent(data.notehtml)))
										.parent().parent().prev().children().first().text('TBRmap notitie (' + data.authorname + ', ' + data.notesave + ')');
								}
							});
						});
						$('#tbrdel').bind('click', function (e) {
							// Post TBRnote through ajax, hide it for regular posting
							var tbrmsg = $('#tbrdel'),
								host = config.note + 'world=' + world + '&village=' + c_village + '&tribe=' + tribe_id + '&player=' + player_id + '&owner=' + c_owner[1] + '&hash=' + data.note_hash + '&v=' + config.version + '&delete';
							e.preventDefault();
							if (debug) logMsg('Posting to TBR, url='+host+' delete');
							$.ajax({
								url: host,
								async: true,
								cache: false,
								dataType: "jsonp",
								data: {
									note: tbrmsg.val(),
									Bewerk: true
								},
								success: function (data, status, req) {
									//if (!debug) $('form:first').submit();
									//this.remove();
									$('#TBRnote_show').html(txtDB['msg_nonote'])
										.parent().parent().prev().children().first().text('TBRmap notitie');
									
								}
							});
							/*tbrmsg.closest('tr').next().andSelf().fadeOut(300, function () {
								$('form:first').submit();
							}); */
						});
						$('form:first').bind('reset', function (e) {
							var tbrnote = $('#tbrmessage').val();
							e.preventDefault();
							//VillageInfo.toggleEditNotes();
							this.reset();
							$('#tbrmessage').val(tbrnote);
						});
					}
				}
			});
		},
		
		get_gamedata = function () { // Google Chrome / Webkit
			gd = win.game_data;
		},

		/* Main */
		url = location.href;

		if (url.match(/http:\/\/.*\.tribalwars\./)) {
			var win = window.main ? window.main : window,
				doc = win.document,
				url = doc.URL,
				gd = [],
				player_id, player_name, tribe_id, world, lang = 'nl';

			if (debug || url.match('&debug')) {
				debug = true;
				config['opslaan']+='debug&';
				config['note']+='debug&';
				config['info']+='debug&';
				config['map']+='debug&';
			}
			if (url.match('&clear')) {
				config['opslaan']+='clear&';
				config['note']+='clear&';
				config['info']+='clear&';
				config['map']+='clear&';
			}
			if (url.match('&show')) {
				config['opslaan']+='show&';
				config['note']+='show&';
				config['info']+='show&';
				config['map']+='show&';
			}
			if (url.match('&nohide')) nohide = true;

			get_gamedata();
			if (typeof gd == 'undefined') {
				if (doc.title == txtDB[lang]["expired"]) return;
			}
			if (!gd.screen.match(/(map|report|info_village)/)) return;
			time = parseInt(new Date().getTime().toString().substring(0, 10));

			logMsg("tribalwars version: " + gd.version.replace(/\n$/m, ''));
			logMsg("TBRmap v" + config['version']);
			logMsg("Browser: " + navigator.userAgent);

			if (typeof jQuery != 'undefined') {
				if (debug) logMsg('jQuery v' + jQuery.fn.jquery);
			} else {
				if (debug) logMsg('jQuery not available');
				$ = function (s) {
					alert('jQuery unsupported (arg=' + s + ')')
				};
			}
			get_settings();
			txtDB = txtDB[lang];
			logMsg(sprintf(txtDB["msg_settings"], txtDB["lang"], tribe_id));
			logMsg('screen=' + gd.screen + ' mode=' + gd.mode);
			logMsg('url=' + url);

			if (gd.screen == 'map') {
				// wait for TWMap to be initiated (needed for ff+GM)
				if (typeof TWMap != 'undefined') {
					(function () {
						if ((TWMap) && (TWMap.map) && (typeof TWMap.map.pos[0] != 'undefined')) {
							do_map();
						} else {
							if (debug) logMsg('sleeping');
							setTimeout(arguments.callee, 11);
						}
					})();
				} else do_map();
			} else if (gd.screen == 'report') {
				if (gd.mode == 'view_public_report') {
					do_report('public');
				} else if (url.match(/view=/)) {
					do_report('report');
				}
			} else if (gd.screen == 'info_village') {
				do_info_village();
			}
		}

	})
}
