// ==UserScript==
// @name           GeorgeGkas Imperial Mod
// @namespace      GGIM
// @description    Imperial Mod for Grepolis 2.0
// @include        http://*.grepolis.*/game*
// @icon           http://s7.directupload.net/images/120320/ullq32vn.jpg
// @version        2.24.0
// ==/UserScript==

var uw = unsafeWindow || window, $ = uw.jQuery;
var QT = {};
/************************************************************************
 * Global variables
 ***********************************************************************/
var wID = uw.Game.world_id;
var mID = uw.Game.market_id;
var aID = uw.Game.alliance_id;
var sID = uw.Game.player_id;
var pName = uw.Game.player_name;
/************************************************************************
 * Languages
 ***********************************************************************/
QT.Lang = {
	
	en : {
		qm_lang : "gr" ? 'http://imperialgrepo.site40.net/imperialgrepo/q7uSeCM.png' : 'http://imperialgrepo.site40.net/imperialgrepo/q7uSeCM.png',
		qt_changelog : "http://adf.ly/cpi89",
		btn_transen_span : "Μεταφορικά",
		marlikstools_verluste : "Losses:",
		loeschen : "Διαγραφή",
		sicherloeschen : "Do you really want to delete these posts?",
		keineausgewaehlt : "No posts selected",
		gtio_ueberladen : "No overloading",
		oldgrepomenu_stadtuebersicht : "Σύγκλητος",
		message_ghosttown : "Πόλη φάντασμα",
		message_keinestaedte : "Δεν υπάρχουν πόλεις σε αυτό το νησί.",
		mo_HK : "<b>Συντομεύσεις πληκτρολογίου:</b> <p> <u>Επιλογή πόλης:</u> <br> Βελάκι Αριστερά - Προηγούμενη πόλη <br> Βελάκι δεξιά - Επόμενη πόλη <br> Enter - Αναπήδηση στην επιλεγμένη πόλη <p> <u>Διαχειριστής:</u> <br> 1 - Εμπόριο <br> 2 - Εντολές <br> 3 - Στρατολόγηγη <br> 4 - Επισκόπηση στρατευμάτων <br> 5 - Στρατεύματα εξωτερικά <br> 6 - Κτίρια <br> 7 - Πολιτισμός <br> 8 - Θεοί <br> 9 - Σπηλιές <br> 0 - Ομάδες πόλεων   <br> X - Αγροτικά χωριά <p> <u>Menu:</u> <br> S - Επισκόπηση πόλης <br> N - Μηνύματα <br> B - Αναφορές <br> A - Συμμαχία <br> F - Forum συμμαχίας <br> E - Ρυθμίσεις <br> P - Προφίλ <br> R - Κατάταξη <br> M - Σημειώσεις <br> L - Συνομιλία <br> H - Συμβούλιο των Ηρώων",
		onlinecounter_span_session : "Current: ",
		onlinecounter_span_total : "Total: ",
		onlinecounter_switch : "Online since/total",
		suchwort : "Search...",
		aka_researched : "colorize researched",
		aka_notresearched : "colorize not researched",
		aka_aufheben : "undo colorize",
		wikisuche : "Wiki search",
		sort_ins : "Stored Silver coins",
		sort_name : "Name",
		sort_holz : "Ξύλο",
		sort_stein : "Πέτρα",
		sort_silber : "Ασημένια νομίσματα",
		sort_help : "No helptext yet - filter need to be set properly first",
		transport_verf : "Δυνατή χωρητικότητα μεταφορικών σκαφών",
		transport_trans : "Μεταφέρσιμες μονάδες",
		transport_baue_big : "Build",
		transport_zerstoere_big : "Destroy",
		transport_baue_small : "build",
		transport_zerstoere_small : "destroy",
		transport_hint_1 : "small transporter and",
		transport_hint_2 : "big transporter and",
		transport_hint_3 : "Enough available transport capacity.",
		transport_hint_4 : "μονάδες",
		transport_hint_5 : "All units can be transported.",
		transport_and : "και",
		transport_or : "ή",
		transport_recruits : "Count units in recruitment queue",
		transport_outsidetown : "Count units outside of city",
		transport_slowtrans : "Count slow transport ships",
		transport_fasttrans : "Count fast transport ships",
		qculture_cityfestivals : "Γιορτές πόλης",
		qculture_olympicgames : "Ολυμπιακοί Αγώνες",
		qculture_triumph : "Παρέλαση θριάμβου",
		qculture_theater : "Θεατρικές παραστάσεις",
		qmenu_settings_text_2 : "Onlinecounter",
		qmenu_settings_text_3 : "Άνοιγμα συνδέσεων από το ingame μενού",
		qmenu_settings_text_4 : "Ενεργοποιήστε τη συμπερίληψη των άλλων greasemonkey scripts  στο μενού",
		qmenu_settings_text_5 : "Show buttons for permanent display of the unit queue, movements and trade",
		qmenu_settings_text_6 : "Button bar",
		qmenu_settings_text_7 : "Old Grepolis menu",
		qmenu_settings_text_8 : "Quack Toolsammlung Classic",
		qmenu_settings_text_9 : "display at start",
		qmenu_settings_text_10 : "Buttons City overview, next/last city",
		qmenu_settings_text_11 : "Deactivate saving of the total onlinetime",
		qmenu_settings_text_12 : "Transport-calculator",
		qmenu_settings_text_13 : "Menu display",
		qmenu_settings_text_14 : "Menu features",
		qmenu_settings_text_15 : "Reports",
		qmenu_settings_text_16 : "Add color",
		qmenu_settings_text_17 : "Add filter",
		qmenu_settings_text_18 : "Activate display",
		qmenu_settings_text_19 : "Delete all settings and traces of the script in the browser cache?",
		qmenu_settings_text_20 : "Forum",
		qmenu_settings_text_21 : "Maximize the width of the forum",
		qmenu_settings_text_22 : "Hotkey image",
		qmenu_settings_text_23 : "Grepolis menu",
		qmenu_settings_text_24 : "Senate",
		qmenu_settings_text_25 : "Show the number of points awarded for constructing the next level of a building",
		qmenu_settings_text_26 : "Tradingwindow",
		qmenu_settings_text_27 : "Activate extension",
		qmenu_settings_text_28 : "Town list",
		qmenu_settings_text_29 : "Quest list",
		qmenu_settings_text_30 : "Add dropdown list with the folders",
		qmenu_settings_text_31 : "Button for the BB-code of the current city",
		qmenu_settings_text_32 : "Select and delete posts",
		qmenu_settings_text_33 : "Map zoom",
		qmenu_settings_text_34 : "Caves overview (Administrator)",
		qmenu_settings_text_35 : "Academy planner",
		qmenu_settings_text_36 : "Cave",
		qmenu_settings_text_37 : "Allow sorting of cities",
		qmenu_settings_text_38 : "Enter silver above 15000 automatically into the input field",
		qmenu_settings_text_39 : "Add points as a thousands seperator",
		qmenu_settings_text_40 : "Farming villages overview (Captain)",
		qmenu_settings_text_41 : "Add a button for opening the city view to the sidemenu of Greplis",
		qmenu_settings_text_42 : "Show losses of resources",
		qmenu_settings_text_43 : "Simulator",
		qmenu_safe : "Αποθήκευση",
		qmenu_reset : "Επαναφορά προεπιλογών",
		qmenu_uebersichtss : "Overview of stats and scripts",
		qmenu_googledocs_changeURL : "Αλλαγή URL",
		bbcode_truppen : "Troops",
		bbcode_gebaeude : "Building levels",
		bbcode_staedte : "Cities",
		bbcode_alle : "All",
		bbcode_activegrp : "Active city group",
		bbcode_in : "in",
		bbcode_aus : "from",
		bbcode_ausserhalb : "outside of",
		berichte_ordnerwaelen : "Επιλογή φακέλου",
		berichte_gewirkt : "enacted",
		berichte_erobert : "conquered",
		berichte_spioniert : "Κατασκοπεία",
		berichte_spion : "Spy",
		berichte_stationierte : "support",
		berichte_unterstuetzt : "supporting",
		berichte_greift : "attacking",
		berichte_bauerndorf : "Αγροτικά χωριά",
		qm_sub_stats : "Στατιστικά",
		qm_sub_stats_gs : "Grepo Stats",
		qm_sub_stats_gs_p : "Παίκτης",
		qm_sub_stats_gs_a : "Συμμαχία",
		qm_sub_stats_gs_b : "Κατάταξη",
		qm_sub_stats_gb : "Grepo Bash",
		qm_sub_stats_gi_p : "Track a Player",
		qm_sub_stats_gi_a : "Track an Alliance",
		qm_sub_stats_gi_tk : "Top Killers",
		qm_sub_map : "Χάρτες",
		qm_sub_map_gm : "Grepo Maps",
		qm_sub_map_gi : "Grepo Intel",
		qm_sub_ps : "Εύρεση πόλεων",
		qm_sub_ps_gf : "Grepo Finder",
		qm_sub_bb : "BB-Codes",
		qm_sub_bb_in : "Σύνολο",
		qm_sub_bb_from : "Εσωτερικά",
		qm_sub_bb_outer : "Outside town",
		qm_sub_tools : "Εργαλεία",
		qm_sub_tools_uv : "Unit Comparison",
		qm_sub_tools_gd : "Google Docs",
		qm_sub_tools_dh : "Deff Helper",
		qm_sub_other : "Other",
		qm_sub_other_an : "Display modes",
		qm_sub_other_an_vb : "Πλήρης οθόνη",
		qm_sub_other_an_mi : "Minimal",
		qm_sub_other_an_st : "Standard",
		qm_sub_other_fm : "Forum max",
		qm_sub_other_ss : "Credits",
		qm_sub_other_ei : "Ρυθμίσεις script"
	}
};
var lID = (QT.Lang[mID]) ? mID : "en";
/************************************************************************
 * Images
 ***********************************************************************/
QT.Images = {
	archer : "http://imperialgrepo.site40.net/imperialgrepo/l2xgz8zg.jpg",
	attack_ship : "http://imperialgrepo.site40.net/imperialgrepo/mvlqonug.jpg",
	big_transporter : "http://imperialgrepo.site40.net/imperialgrepo/shdrwvx4.jpg",
	bireme : "http://imperialgrepo.site40.net/imperialgrepo/op3pm7ig.jpg",
	calydonian_boar : "http://imperialgrepo.site40.net/imperialgrepo/5qr5nmxo.jpg",
	catapult : "http://imperialgrepo.site40.net/imperialgrepo/gv9r6p24.jpg",
	centaur : "http://imperialgrepo.site40.net/imperialgrepo/7lytp7ku.jpg",
	cerberus : "http://imperialgrepo.site40.net/imperialgrepo/58gsjmi9.jpg",
	chariot : "http://imperialgrepo.site40.net/imperialgrepo/vlfs3fmp.jpg",
	colonize_ship : "http://imperialgrepo.site40.net/imperialgrepo/zgcvw7q2.jpg",
	demolition_ship : "http://imperialgrepo.site40.net/imperialgrepo/h3isd3id.jpg",
	fury : "http://imperialgrepo.site40.net/imperialgrepo/97qhkxxu.jpg",
	godsent : "http://imperialgrepo.site40.net/imperialgrepo/oc3euuhk.jpg",
	griffin : "http://imperialgrepo.site40.net/imperialgrepo/lukxwqlc.jpg",
	harpy : "http://imperialgrepo.site40.net/imperialgrepo/7hl9sx8x.jpg",
	hoplite : "http://imperialgrepo.site40.net/imperialgrepo/lllk8ef5.jpg",
	manticore : "http://imperialgrepo.site40.net/imperialgrepo/dz3wluob.jpg",
	medusa : "http://imperialgrepo.site40.net/imperialgrepo/6qgf9chs.jpg",
	militia : "http://imperialgrepo.site40.net/imperialgrepo/exvjtpb6.jpg",
	minotaur : "http://imperialgrepo.site40.net/imperialgrepo/o8a34o3n.jpg",
	pegasus : "http://imperialgrepo.site40.net/imperialgrepo/e8ovbacv.jpg",
	rider : "http://imperialgrepo.site40.net/imperialgrepo/39pvt7u6.jpg",
	sea_monster : "http://imperialgrepo.site40.net/imperialgrepo/hflh35u5.jpg",
	slinger : "http://imperialgrepo.site40.net/imperialgrepo/jtfdfuk9.jpg",
	small_transporter : "http://imperialgrepo.site40.net/imperialgrepo/oxgq69a8.jpg",
	sword : "http://imperialgrepo.site40.net/imperialgrepo/vpaij5z9.jpg",
	trireme : "http://imperialgrepo.site40.net/imperialgrepo/mdzzpxye.jpg",
	zyklop : "http://imperialgrepo.site40.net/imperialgrepo/oihz5sop.jpg",
	andromeda : "http://s7.directupload.net/images/140121/4jdz5tso.jpg",
	atalanta : "http://s1.directupload.net/images/140121/yo6vp8l2.jpg",
	cheiron : "http://s1.directupload.net/images/140121/tkpytdq8.jpg",
	ferkyon : "http://s1.directupload.net/images/140121/glncylst.jpg",
	helen : "http://s1.directupload.net/images/140121/m75fi7pf.jpg",
	hercules : "http://s1.directupload.net/images/140121/hnaqid9l.jpg",
	leonidas : "http://s1.directupload.net/images/140121/tskyuwpt.jpg",
	orpheus : "http://s7.directupload.net/images/140121/hfjeztt4.jpg",
	terylea : "http://s7.directupload.net/images/140121/vev4s7z7.jpg",
	urephon : "http://s14.directupload.net/images/140121/jfqewwux.jpg",
	zuretha : "http://s7.directupload.net/images/140121/o6cf8cya.jpg",
};
/************************************************************************
 * CSS
 ***********************************************************************/
QT.Styles = {};
/************************************************************************
 * Links
 ***********************************************************************/
QT.Links = {
	GS_Spieler : "http://www." + mID + ".grepostats.com/world/" + wID + "/player/" + sID,
	GS_Allianz : "http://www." + mID + ".grepostats.com/world/" + wID + "/alliance/" + aID,
	GS_Bash : "http://www." + mID + ".grepostats.com/world/" + wID + "/alliance/" + aID,
	GrepoBash : "http://grepobash.de/show.php?server=" + wID + "&ally=" + aID + "&order=all",
	GrepoMaps : "http://" + wID + ".grepolismaps.org",
	Polissuche_faark : "http://grepo.faark.de/tondasPolisSuche/townSearch.php/" + wID,
	Unitvergleich : "https://docs.google.com/spreadsheet/ccc?key=0AkpTmTnKs72_dHU0VUZ4SDRnNXh4bWZhUnRESEdJaUE#gid=0",
	ForumMax : "http://" + wID + ".grepolis.com/forum",
	Grepofinder : "http://www.drolez.com/grepofinder/" + wID,
	GrepoIntelMap : "http://grepointel.com/map.php?server=" + wID,
	GrepoIntelPlayer : "http://grepointel.com/track.php?server=" + wID,
	GrepoIntelAlliance : "http://grepointel.com/alliance.php?server=" + wID,
	GrepoIntelKillers : "http://grepointel.com/topkillers.php?server=" + wID,
	gretimes : "http://gretimes.community.grepolis.pl",
	grepostats : "http://www." + mID + ".grepostats.com",
	grepointel : "http://www.grepointel.com",
	grepomaps_main : "http://www.grepolismaps.org",
	grepobash_main : "http://www.grepobash.de",
	grepofinder_main : "http://www.drolez.com/grepofinder/",
	einheitenvergleich : "https://docs.google.com/spreadsheet/ccc?key=0AkpTmTnKs72_dHU0VUZ4SDRnNXh4bWZhUnRESEdJaUE",
	grepoutils : "http://www.grepoutils.webxxs.com",
	abakus : "http://forum.de.grepolis.com/showthread.php?691-Abakus-Der-Grepolis-Rechner",
	grepotool : "http://forum.de.grepolis.com/showthread.php?28359",
	youscreen : "http://www.youscreen.de",
	quacktools : "http://userscripts.org/scripts/show/128637",
	grc : "http://grepolis.potusek.eu/module/installgrc",
	playerprofilescript : "http://userscripts.org/scripts/show/139287",
	attackwarner : "http://userscripts.org/scripts/show/162017",
	wwranks : "http://www.g2.b0x.info/wwranks.user.js",
	grepotownslist : "http://userscripts.org/scripts/show/84608",
	gtiotools : "http://www.gtiopolis.de/index.php?page=gtio2-0tools",
	grepolisrevobericht : "http://forum.de.grepolis.com/showthread.php?29259",
	grepoforen : "http://www.grepoforen.de",
	transportrechner_menidan : "http://userscripts.org/scripts/show/159433",
	zeitrechner : "http://userscripts.org/scripts/show/159595",
	zauberzeitgeber : "http://userscripts.org/scripts/show/161048",
	attackwarner2 : "http://userscripts.org/scripts/show/180668",
	diotools : "http://userscripts.org/scripts/show/184630",
	bauerndorfalarm : "http://forum.de.grepolis.com/showthread.php?28919",
};
/************************************************************************
 * Settings
 ***********************************************************************/
QT.Settings = {
	values : {
		"onlinetotal" : 0,
		"googledocsurl" : "https://docs.google.com/spreadsheet/ccc?key=0AkpTmTnKs72_dEF3bWs3SW5iWjdyUEE0M0c3Znpmc3c",
		"qmenu_settings_counter" : true,
		"qmenu_settings_counter_aktiv" : true,
		"qmenu_settings_links" : true,
		"qmenu_settings_plusmenu" : true,
		"qmenu_settings_buttonbar" : true,
		"qmenu_settings_transport_rechner" : true,
		"qmenu_settings_berichte_farben" : true,
		"qmenu_settings_berichte_filter" : true,
		"qmenu_settings_berichte_losses" : true,
		"qmenu_settings_maximize_forum" : true,
		"qmenu_settings_hotkey_anzeige" : true,
		"qmenu_settings_grepopoints" : true,
		"qmenu_settings_tradeimprovement" : true,
		"qmenu_settings_stadtliste" : true,
		"qmenu_settings_questliste" : true,
		"qmenu_settings_berichte_move" : true,
		"qmenu_settings_townbb" : true,
		"qmenu_settings_forumdelete" : true,
		"qmenu_settings_hidessort" : true,
		"qmenu_settings_akademieplaner" : true,
		"qmenu_settings_farmhelper" : true,
		"qmenu_settings_hidessilver" : true,
		"qmenu_settings_hidesilver" : true,
		"qmenu_settings_hideaddpoints" : false,
		"qmenu_settings_cityview_BTN" : true,
		"qmenu_settings_simulator" : true
	},
	load_all : function () {
		setTimeout(function () {
			var GMsettings = GM_listValues();
			for each(var val in GMsettings) {
				QT.Settings.values[val] = GM_getValue(val);
			}
		}, 0);
	},
	safe_all : function () {
		setTimeout(function () {
			var w = document.getElementsByClassName('qbox');
			for (var i = 0; i < w.length; i++) {
				if ($("#" + w[i].id).hasClass("checked")) {
					GM_deleteValue(w[i].id);
				} else {
					GM_setValue(w[i].id, false);
				}
			}
			if (GM_getValue("qmenu_settings_counter_aktiv") === undefined) {
				GM_deleteValue("onlinetotal");
			}
		}, 0);
		window.location.reload();
	},
	reset_all : function () {
		uw.hOpenWindow.showConfirmDialog('', QT.Lang[lID].qmenu_settings_text_19, function () {
			setTimeout(function () {
				GMsettings = GM_listValues();
				for each(var val in GMsettings) {
					GM_deleteValue(val);
				}
				window.location.reload();
			}, 300);
		});
	}
};
/************************************************************************
 * Updater
 ***********************************************************************/
QT.Updater = {
	forceCheck : function () {
		GM_xmlhttpRequest({
			method : "GET",
			url : "http://userscripts.org/scripts/source/128637.meta.js",
			headers : {
				"User-agent" : "Mozilla/5.0",
				"Accept" : "text/html"
			},
			onload : function (response) {
				QT.Updater.meta = QT.Updater.parseHeaders(response.responseText);
				if (QT.Updater.versionCompare(QT.Updater.meta.version, GM_info.script.version) > 0) {
					QT.Updater.showNotice(QT.Updater.meta.version);
				}
			}
		});
	},
	parseHeaders : function (metadataBlock) {
		var source = metadataBlock;
		var headers = {};
		var tmp = source.match(/\/\/ ==UserScript==((.|\n|\r)*?)\/\/ ==\/UserScript==/);
		if (tmp) {
			var lines = tmp[0].match(/@(.*?)(\n|\r)/g);
			for (var i = 0; i < lines.length; i++) {
				tmp = lines[i].match(/^@([^\s]*?)\s+(.*)/);
				var key = tmp[1];
				var value = tmp[2];
				if (headers[key] && !(headers[key]instanceof Array))
					headers[key] = new Array(headers[key]);
				if (headers[key]instanceof Array)
					headers[key].push(value);
				else
					headers[key] = value;
			}
		}
		return headers;
	},
	versionCompare : function (left, right) {
		if (typeof left + typeof right != 'stringstring')
			return false;
		var a = left.split('.'),
		b = right.split('.'),
		i = 0,
		len = Math.max(a.length, b.length);
		for (; i < len; i++) {
			if ((a[i] && !b[i] && parseInt(a[i]) > 0) || (parseInt(a[i]) > parseInt(b[i]))) {
				return 1;
			} else if ((b[i] && !a[i] && parseInt(b[i]) > 0) || (parseInt(a[i]) < parseInt(b[i]))) {
				return -1;
			}
		}
		return 0;
	},
	showNotice : function (version) {
		$('#ui_box').append('<div id="qt_updatebox"><img id="qt_updatebox_frog" src="http://s1.directupload.net/images/140125/7aekbv9p.png"/><div id="qt_updatebox_content"><span id="qt_updatebox_update">Update!</span><br/>Quack Toolsammlung Version: ' + version + '<br/><a href="http://adf.ly/AAMwY" target="_blank">Download</a>  | <a href="' + QT.Lang[lID].qt_changelog + '" target="_blank">Changelog</a>  | <a href="http://adf.ly/cbQaZ" target="_blank">Forum</a></div><a class="cancel" style="float: right; margin-right: 19px; margin-top: 2px;" href="#"></a></div>');
		$('#qt_updatebox').css({
			"display" : "none",
			"bottom" : "0px",
			"position" : "absolute",
			"z-index" : "1000",
			"background" : "url(http://s7.directupload.net/images/140125/8ke6vfq4.png)",
			"width" : "429px",
			"height" : "69px",
			"left" : "50%",
			"margin-left" : "-214px",
			"color" : "#EEDDBB",
		});
		$('#qt_updatebox a').css({
			"color" : "#ECB44D"
		});
		$('#qt_updatebox_frog').css({
			"left" : "23px",
			"bottom" : "7px",
			"position" : "relative",
			"width" : "79px",
			"height" : "79px",
			"float" : "left"
		});
		$('#qt_updatebox_content').css({
			"left" : "38px",
			"top" : "9px",
			"position" : "relative",
			"float" : "left",
			"text-align" : "left"
		});
		$('#qt_updatebox_update').css({
			"color" : "red",
		});
		$("#qt_updatebox").slideDown();
		$("#qt_updatebox a.cancel").click(function () {
			$("#qt_updatebox").slideUp("slow", function () {
				$("#qt_updatebox").remove();
			});
		});
		$('#qt_updatebox a').hover(function () {
			$(this).css({
				"color" : "#804000"
			});
		}, function () {
			$(this).css({
				"color" : "#ECB44D"
			});
		});
	}
};
QT.Updater.forceCheck();
/************************************************************************
 * Ajax Call functions
 ***********************************************************************/
QT.CallAjaxFunction = {
	data : {
		get : function () {
			QT.Settings.load_all();
			QT.Functions.mutationobserver();
		}
	},
	debug : {
		log_startup_time : function () {
			QT.Functions.hotkeys();
			QT.Functions.qtoolbox();
			QT.Functions.selectunitshelper();
			if (QT.Settings.values.qmenu_settings_cityview_BTN)
				QT.Functions.city_view_btn();
			if (QT.Settings.values.qmenu_settings_townbb)
				QT.Functions.townBBcodeBTN();
			if (QT.Settings.values.qmenu_settings_plusmenu)
				QT.Functions.tb_activitiesExtra();
			if (QT.Settings.values.qmenu_settings_transport_rechner)
				QT.Functions.transportcalculator.init();
			if (QT.Settings.values.qmenu_settings_questliste && $('#quest_overview li').length !== 0)
				QT.Functions.questlist();
		}
	},
	index : {
		switch_town : function () {
			if ($("#tr_wrapper").is(':visible'))
				QT.Functions.transportcalculator.refresh();
			if (QT.Settings.values.qmenu_settings_hidesilver)
				QT.Functions.hidesIndexIron();
		}
	},
	report : {
		index : function () {
			if (QT.Settings.values.qmenu_settings_berichte_farben)
				QT.Functions.colorreports();
			if (QT.Settings.values.qmenu_settings_berichte_move)
				QT.Functions.movereports();
			if (QT.Settings.values.qmenu_settings_berichte_filter)
				QT.Functions.addreportfilter();
		},
		move : function () {
			if (QT.Settings.values.qmenu_settings_berichte_farben)
				QT.Functions.colorreports();
			if (QT.Settings.values.qmenu_settings_berichte_move)
				QT.Functions.movereports();
			if (QT.Settings.values.qmenu_settings_berichte_filter)
				QT.Functions.addreportfilter();
		},
		delete_many : function () {
			if (QT.Settings.values.qmenu_settings_berichte_farben)
				QT.Functions.colorreports();
			if (QT.Settings.values.qmenu_settings_berichte_move)
				QT.Functions.movereports();
			if (QT.Settings.values.qmenu_settings_berichte_filter)
				QT.Functions.addreportfilter();
		},
		view : function () {
			if (QT.Settings.values.qmenu_settings_berichte_losses)
				QT.Functions.reportslosses();
		}
	},
	alliance_forum : {
		forum : function () {
			if (QT.Settings.values.qmenu_settings_maximize_forum)
				QT.Functions.maximizeForum();
			if (QT.Settings.values.qmenu_settings_forumdelete)
				QT.Functions.forumDeleteMultiple();
		}
	},
	town_overviews : {
		hides_overview : function () {
			if (QT.Settings.values.qmenu_settings_hidessilver)
				QT.Functions.hidesoverviewiron();
			if (QT.Settings.values.qmenu_settings_hidessort)
				QT.Functions.hidesSort();
		},
		command_overview : function (event, xhr, settings) {
			QT.Functions.commandOverview(event, xhr, settings);
		},
		culture_overview : function () {
			QT.Functions.cultureOverview();
		},
		start_celebration : function () {
			QT.Functions.cultureOverview();
		},
		start_all_celebrations : function () {
			QT.Functions.cultureOverview();
		}
	},
	building_main : {
		index : function () {
			if (QT.Settings.values.qmenu_settings_grepopoints)
				QT.Functions.grepopoints();
		},
		build : function () {
			if (QT.Settings.values.qmenu_settings_grepopoints)
				QT.Functions.grepopoints();
		},
		cancel : function () {
			if (QT.Settings.values.qmenu_settings_grepopoints)
				QT.Functions.grepopoints();
		},
		tear_down : function () {
			if (QT.Settings.values.qmenu_settings_grepopoints)
				QT.Functions.grepopoints();
		}
	},
	building_barracks : {
		build : function () {
			if ($("#tr_wrapper").is(':visible'))
				QT.Functions.transportcalculator.refresh();
		},
		cancel : function () {
			if ($("#tr_wrapper").is(':visible'))
				QT.Functions.transportcalculator.refresh();
		}
	},
	building_docks : {
		build : function () {
			if ($("#tr_wrapper").is(':visible'))
				QT.Functions.transportcalculator.refresh();
		},
		cancel : function () {
			if ($("#tr_wrapper").is(':visible'))
				QT.Functions.transportcalculator.refresh();
		}
	},
	building_place : {
		simulate : function (event, xhr, settings) {
			if (settings.type == "POST" && QT.Settings.values.qmenu_settings_simulator)
				QT.Functions.simulateView(event, xhr, settings);
		}
	},
	frontend_bridge : {
		fetch : function () {
			if (QT.Settings.values.qmenu_settings_hidesilver)
				QT.Functions.hidesIndexIron();
			//if (QT.Settings.values.qmenu_settings_hideaddpoints)
			//QT.Functions.hidesIndexAddPoints();
		},
		execute : function () {
			if ($("#tr_wrapper").is(':visible'))
				QT.Functions.transportcalculator.refresh();
			if (QT.Settings.values.qmenu_settings_stadtliste && $('#town_groups_list').is(':visible'))
				QT.Functions.townslist();
			if (QT.Settings.values.qmenu_settings_hidesilver)
				QT.Functions.hidesIndexIron();
			//if (QT.Settings.values.qmenu_settings_hideaddpoints)
			//QT.Functions.hidesIndexAddPoints();
		}
	},
	building_academy : {
		index : function () {
			if (QT.Settings.values.qmenu_settings_akademieplaner)
				QT.Functions.academyMarker();
		},
		research : function () {
			if (QT.Settings.values.qmenu_settings_akademieplaner)
				QT.Functions.academyMarker();
		},
		cancel : function () {
			if (QT.Settings.values.qmenu_settings_akademieplaner)
				QT.Functions.academyMarker();
		},
		revert_research : function () {
			if (QT.Settings.values.qmenu_settings_akademieplaner)
				QT.Functions.academyMarker();
		}
	},
	town_info : {
		info : function () {
			QT.Functions.townGSButton();
		},
		trading : function () {
			if (QT.Settings.values.qmenu_settings_tradeimprovement)
				QT.Functions.townTradeImprovement();
		}
	},
	player : {
		get_profile_html : function (event, xhr, settings) {
			QT.Functions.playerGSButton(event, xhr, settings);
		},
		index : function () {
			QT.Functions.addsettingsbutton();
		}
	},
	island_info : {
		index : function () {
			QT.Functions.messageIsland();
			QT.Functions.IslandFarmingVillages();
		}
	},
	alliance : {
		profile : function (event, xhr, settings) {
			QT.Functions.allianceGSButton(event, xhr, settings);
		}
	},
	farm_town_overviews : {
		claim_loads : function () {
			if (QT.Settings.values.qmenu_settings_farmhelper)
				QT.Functions.farmingvillageshelper.rememberloot();
		},
		get_farm_towns_for_town : function () {
			if (QT.Settings.values.qmenu_settings_farmhelper)
				QT.Functions.farmingvillageshelper.setloot();
		}
	},
	message : {
		view : function (event, xhr, settings) {
			/*var d = xhr.responseText.match(/{(.+)}/);
			var e = $.parseJSON("{" + d[1] + "}");
			alert(e.plain.html);
			$.each(e, function (a, b) {
			alert(a + " " + b);
			});

			//QT.Functions.messageexport();
			var params = {
			offset : ((2 * 10) - 10)
			};
			params.id = 1013207;
			uw.gpAjax.ajaxGet('message', 'view', params, true, function (return_data) {
			//alert(return_data.html)
			});*/
			//uw.paginatorTabsGotoPage('message_message_list', 2, 1013207, 'message', 'view');

		}
	}
};
/************************************************************************
 * Functions
 ***********************************************************************/
QT.Functions = {
	test : function () {
		alert("Test funktioniert");
	},
	IslandFarmingVillages : function () {
		var b = uw.GPWindowMgr.getOpen(uw.Layout.wnd.TYPE_ISLAND);
		if (b.length == 0)
			return;
		wnd = b[b.length - 1];
		var c = wnd.getID();

		if ($("DIV#gpwnd_" + c + " DIV.captain_commercial").is(":visible"))
			return;

		$("DIV#gpwnd_" + c + " DIV.island_info_right").css({
			"bottom" : "0px",
			"right" : "0px",
			"position" : "absolute",
		});

		if ($("DIV#gpwnd_" + c + " DIV.island_info_right UL.game_list li:first-child SPAN").hasClass("small player_name")) {
			$("DIV#gpwnd_" + c + " DIV.island_info_right UL.game_list").css({
				"height" : "406px",
			});
		} else {
			$("DIV#gpwnd_" + c + " DIV.island_info_right UL.game_list").css({
				"height" : "100%",
			});
		}

		$("DIV#gpwnd_" + c + " DIV.island_info_left UL.game_list").css({
			"height" : "376px",
		});
		$("DIV#gpwnd_" + c + " DIV#farm_town_overview_btn").css({
			"top" : "486px",
		});
	},
	fix_Zindex : function () {
		var index_highest = parseInt($("#town_groups_list").css("z-index"), 10);
		$(".ui-dialog").each(function () {
			var index_current = parseInt($(this).css("z-index"), 10);
			if (index_current > index_highest) {
				index_highest += index_current;
			}
		});
		$("#town_groups_list").css({
			"z-index" : index_highest
		})
	},
	questlist : function () {
		$('#quest_overview').prepend("<li id='q_qadd'><ul><li id='q_lock'></li><li id='q_qarrow'></li><li id='q_qhide'></li></ul></li>");
		$('#q_qadd').css({
			"cursor" : "pointer",
			"z-index" : "4",
			"height" : "20px",
			"width" : "52px",
			"margin-left" : "9px",
			"margin-top" : "-20px",
			"position" : "absolute",
			"background" : "url('http://s7.directupload.net/images/130417/mvyxzaeg.png') no-repeat scroll transparent"
		});
		$('#q_lock')
		.css({
			"cursor" : "pointer",
			"z-index" : "5",
			"height" : "16px",
			"width" : "10px",
			"margin-left" : "3px",
			"margin-top" : "3px",
			"position" : "absolute",
			"background" : "url('http://s7.directupload.net/images/130412/7pi7gioz.png') no-repeat scroll 0px 0px / 21px 14px transparent"
		})
		.hover(function () {
			$(this).css({
				"background-position" : "-10px 0px"
			});
		}, function () {
			$(this).css({
				"background-position" : "0px 0px"
			});
		})
		.toggle(
			function () {
			$('#quest_overview').draggable({
				disabled : false
			});
			$(this).css({
				"width" : "14px",
				"background" : "url('http://s7.directupload.net/images/130412/pnljoi2y.png') no-repeat scroll 0px 0px / 28px 14px transparent"
			})
			.off('hover')
			.hover(function () {
				$(this).css({
					"background-position" : "-14px 0px"
				});
			}, function () {
				$(this).css({
					"background-position" : "0px 0px"
				});
			});
		},
			function () {
			$('#quest_overview').draggable({
				disabled : true
			});
			$(this).css({
				"width" : "10px",
				"background" : "url('http://s7.directupload.net/images/130412/7pi7gioz.png') no-repeat scroll 0px 0px / 21px 14px transparent"
			})
			.off('hover')
			.hover(function () {
				$(this).css({
					"background-position" : "-10px 0px"
				});
			}, function () {
				$(this).css({
					"background-position" : "0px 0px"
				});
			});
		});
		$('#q_qarrow')
		.css({
			"cursor" : "pointer",
			"z-index" : "5",
			"height" : "16px",
			"width" : "10px",
			"margin-left" : "16px",
			"margin-top" : "3px",
			"position" : "absolute",
			"background" : "url('http://s1.directupload.net/images/130417/ayoe9glf.png') no-repeat scroll 0px 0px / 21px 14px transparent"
		})
		.hover(function () {
			$(this).css({
				"background-position" : "-11px 0px"
			});
		}, function () {
			$(this).css({
				"background-position" : "0px 0px"
			});
		})
		.toggle(
			function () {
			$('<style id="qarrowstyle" type="text/css">.helper_arrow {display: none}</style>').appendTo('head');
		},
			function () {
			$('#qarrowstyle').remove();
		});
		$('#q_qhide')
		.css({
			"z-index" : "5",
			"height" : "16px",
			"width" : "16px",
			"margin-left" : "28px",
			"margin-top" : "5px",
			"position" : "absolute",
			"background" : "url('http://s14.directupload.net/images/130417/5vowoe8a.png') no-repeat scroll 0px 0px / 31px 11px transparent"
		})
		.hover(function () {
			$(this).css({
				"background-position" : "-16px 0px"
			});
		}, function () {
			$(this).css({
				"background-position" : "0px 0px"
			});
		})
		.click(function () {
			$('#quest_overview li[id*="quest"]').each(function () {
				$(this).toggle();
			});
		});
	},
	mutationobserver : function () {
		var observer = new MutationObserver(function (mutations) {
				mutations.forEach(function (mutation) {
					if (mutation.addedNodes[0]) {
						if (mutation.addedNodes[0].id === "town_groups_list") {
							if (QT.Settings.values.qmenu_settings_stadtliste)
								QT.Functions.townslist();
							QT.Functions.fix_Zindex();
						}
					}
				});
			});
		observer.observe($('body').get(0), {
			attributes : false,
			childList : true,
			characterData : false
		});
	},
	messageexport : function () { //DEFEKT
		var messages = [];
		var messagesBB = "[font=sansserif]";
		var messageTitle = $("#message_message_list .game_header").text().trim();
		messagesBB += '[size=13][b]' + messageTitle + '[/b][/size][size=8]';

		var format_search = [
			/\<b\>(.*?)\<\/b\>/ig,
			/\<i\>(.*?)\<\/i\>/ig,
			/\<u\>(.*?)\<\/u\>/ig,
			/\<s\>(.*?)\<\/s\>/ig,
			/\<center\>(.*?)\<\/center\>/ig,
			/\<div class="bbcodes bbcodes_quote quote"\>.+quote_author bold small"\>(.*?) .+quote_message small"\>(.*?)\<\/div\>\<\/div\>/ig,
			/\<div class="bbcodes bbcodes_quote quote"\>.+quote_message small"\>(.*?)\<\/div\>\<\/div\>/ig,
			/\<a class="bbcodes bbcodes_url".+href.+url=(.*?)%3A%2F%2F(.*?)".+\>(.*?)\<\/a>/ig,
			/\<a href="#" class="bbcodes bbcodes_player".+\>(.*?)\<\/a>/ig,
			/\<span class="bbcodes bbcodes_ally"\>.+\>(.*?)\<\/a\>\<\/span\>/ig,
			/\<span class="bbcodes bbcodes_town"\>\<a href=\"#(.*?)\".+\<\/span\>/ig,
			/\<span class="bbcodes bbcodes_size" style="font-size:(.*?)pt"\>(.*?)\<\/span\>/ig,
			/\<img src="(.*?)" alt=""\>/ig,
			/\<span class="bbcodes bbcodes_color" style="color:(.*?)"\>(.*?)\<\/span\>/ig,
			/\<div class="bbcodes published_report".+\<\/div\>/ig,
			/\<span class="bbcodes bbcodes_island"\>\<a href=\"#(.*?)\" .+\<\/span\>/ig,
			/\<span class="bbcodes bbcodes_font serif"\>(.*?)\<\/span\>/ig,
			/\<span class="bbcodes bbcodes_font sansserif"\>(.*?)\<\/span\>/ig,
			/\<span class="bbcodes bbcodes_font monospace"\>(.*?)\<\/span\>/ig,
			/\<div class="bbcode_awards"\>(.*?)\"clear\"\>\<\/div\>\<\/div\>/ig, //noch kaputt
			/\<script.+\<\/script\>/ig
		];

		var format_replace = [
			'[b]$1[/b]',
			'[i]$1[/i]',
			'[u]$1[/u]',
			'[s]$1[/s]',
			'[center]$1[/center]',
			'[quote=$1]$2[/quote]',
			'[quote]$1[/quote]',
			'[url=$1://$2]$3[/url]',
			'[player]$1[/player]',
			'[ally]$1[/ally]',
			replaceBBtowns,
			'[size=$1]$2[/size]',
			'[img]$1[/img]',
			'[color=$1]$2[/color]',
			'[report][/report]',
			replaceBBislands,
			'[font=serif]$1[/font]',
			'[font=sansserif]$1[/font]',
			'[font=monospace]$1[/font]',
			replaceBBawards,
			''
		];

		function replaceBBtowns(match, p1, offset, string) {
			var a = $.parseJSON(atob(p1));
			return '[town]' + a.id + '[/town]'
		};
		function replaceBBislands(match, p1, offset, string) {
			var a = $.parseJSON(atob(p1));
			return '[island]' + a.id + '[/island]'
		};
		function replaceBBawards(match, p1, offset, string) {
			//alert(p1);
			return ""
		};

		$("#message_post_container .message_post").each(function (index, element) {
			poster = $(".message_poster .gp_player_link", this).text();
			postDate = $(".message_poster .message_date", this).text().trim();
			messagesBB += '[u][player]' + poster + '[/player] ' + postDate + '[/u]';
			//$(this).find('.bbcode_awards').remove();

			if ($(".message_post_content", this).find('.bbcode_awards')) {
				//alert("ss");
			}
			postHTML = $(".message_post_content", this).html().trim();
			//postHTML = $(''+postHTML+'').find('.bbcode_awards').remove();
			postHTML = postHTML.replace(/(\r\n|\n|\r|\t)/gm, ""); //remove line-breaks, tab characters
			postHTML = postHTML.replace(/<br\s*\/?>/mg, "\n"); //add line-breaks instead of <br>
			postHTML = postHTML.replace(/&nbsp;/mg, ' ') //replace &nbsp

				for (var i = 0; i < format_search.length; i++) {
					postHTML = postHTML.replace(format_search[i], format_replace[i]);
				}

				//alert(postHTML);
				//messages.push([$(".message_poster",this).html(), $(".message_post_content",this).html()])
		});
		messagesBB += "[/size][/font]";
	},
	grepopoints : function () {
		var buildings_array = uw.GameData.buildings;
		var calculatePoints = function (level, val) {
			points_base = val.points;
			points_factor = val.points_factor
				points = Math.round(val.points * (Math.pow(val.points_factor, level)));
			return points;
		};
		var examineQueue = function (name, level, val) {
			$('.main_tasks_image').each(function () {
				if ($(this).css('backgroundImage').replace(/.*\/([^.]+)\.png.*/, '$1') === name) {
					if ($(this).children("img").length > 0) {
						points_old = calculatePoints(level, val);
						--level;
						points_new = calculatePoints(level, val);
						points = points_new - points_old;
					} else {
						points_old = calculatePoints(level, val);
						++level;
						points_new = calculatePoints(level, val);
						points = points_new - points_old;
					}
					$(this).append('<span class="tilx_points_block">' + (points !== undefined ? points : '?') + ' P<\/span>');
				}
			});
			return level;
		};
		$.each(buildings_array, function (key, val) {
			b = $('#building_main_' + key);
			if (b.length > 0) {
				level = parseInt($('.level', b).eq(0).text(), 10);
				factor = val.points_factor;
				if (!isNaN(level)) {
					level = examineQueue(key, level, val);
					points_old = calculatePoints(level, val);
					if (level == 0) {
						$('.build:not(.tear_down), .build_grey:not(.tear_down)', b).append('<span class="tilx_points"> (' + (val.points !== undefined ? val.points : '?') + ' P)<\/span>');
					} else if (level < val.max_level && level > 0) {
						points_new = calculatePoints(level + 1, val);
						points = points_new - points_old;
						$('.build:not(.tear_down), .build_grey:not(.tear_down)', b).append('<span class="tilx_points"> (' + (points !== undefined ? points : '?') + ' P)<\/span>');
					}
					if (level - 1 >= 0) {
						points_new = calculatePoints(level - 1, val);
						points = points_new - points_old;
						$('.tear_down', b).append('<span class="tilx_points"> (-' + (points !== undefined ? points : '?') + ' P)<\/span>');
					}
				}
			} else {
				b = $('#special_building_' + key);
				if (b.length > 0) {
					level = examineQueue(key, 0, val);
					if (level == 0) {
						b.append('<span class="tilx_points_block">' + (val.points !== undefined ? val.points : '?') + ' P<\/span>');
					}
				}
			}
		});
		$("span.tilx_points").css({
			"font-size" : "7px"
		});
		$("span.tilx_points_block").css({
			"display" : "block",
			"position" : "absolute",
			"bottom" : "2px",
			"right" : "3px",
			"z-index" : "5",
			"color" : "#fff",
			"text-shadow" : "1px 1px 0px #000",
			"font-size" : "10px",
			"font-weight" : "bold"
		});
	},
	city_view_btn : function () {
		$('#ui_box .nui_main_menu .middle .content ul li[data-option-id=messages]').removeClass("first");
		$('#ui_box .nui_main_menu .middle .content ul').not("ul li ul").prepend('<li data-option-id="cityview" class="messages main_menu_item first"><span class="content_wrapper"><span class="button_wrapper" style="opacity: 1;"><span class="button"><span class="icon" style="background-position: -696px -111px"></span><span class="indicator" style="display: none;">0</span></span></span><span class="name_wrapper" style="opacity: 1;"><span class="name">' + QT.Lang[lID].oldgrepomenu_stadtuebersicht + '</span></span></span></li>');
		$('#ui_box .nui_main_menu .middle .content ul').not("ul li ul").css({
			"height" : "+=34px"
		});
		$('#ui_box .nui_main_menu .middle .content ul li[data-option-id=cityview]').click(function () {
			uw.TownIndexWindowFactory.openTownIndexWindow();
		});
	},
	selectunitshelper : function () {
		var scriptEl = document.createElement("script");
		scriptEl.setAttribute('type', 'text/javascript');
		scriptEl.appendChild(document.createTextNode("	var gt_db_debugger=false;	var gt_db_content=new Array();	var gt_db_MaxContentLength=14;	function gt_db_FormatTime(t)	{		var h=t.getHours();		if (h<10) h='0'+h;		var m=t.getMinutes();		if (m<10) m='0'+m;		var s=t.getSeconds();		if (s<10) s='0'+s;		return h+':'+m+':'+s;	};	function gt_db_RefreshContent()	{		if (!gt_db_debugger) return;		var gt_wnd;		gt_wnd=GPWindowMgr.getOpenFirst(Layout.wnd.TYPE_CUSTOM);		if (!gt_wnd)		{			Layout.wnd.Create(Layout.wnd.TYPE_CUSTOM, 'G.Tio Tools Console');			gt_wnd=GPWindowMgr.getOpenFirst(Layout.wnd.TYPE_CUSTOM);		}		if (gt_db_content.length==gt_db_MaxContentLength)		{			gt_db_content.shift();		}		var gt_temp_content='';		for (var i=0; i<gt_db_content.length; i++)		{			gt_temp_content=gt_temp_content+gt_db_content[i];		}		gt_wnd.setContent(gt_temp_content);	}	function gt_db_Debug(message)	{		var now=new Date();		gt_db_content.push(gt_db_FormatTime(now)+' '+message+'<br>');		gt_db_RefreshContent();	};	(function(){		gt_db_content.push('Tools startet...<br>');		window.setTimeout(gt_db_RefreshContent, 3000);	})();	"));
		document.body.appendChild(scriptEl);

		var scriptEl = document.createElement("script");
		scriptEl.setAttribute('type', 'text/javascript');
		scriptEl.appendChild(document.createTextNode("	function gt_st_ajaxComplete(e, xhr, settings)	{		var url = settings.url.split('?'); var action = url[0].substr(5) + '/' + url[1].split(/&/)[1].substr(7);		if (action=='/town_info/support' || action=='/town_info/attack')		{			gt_bl_initWnd();		}			};	$(document).ajaxComplete(gt_st_ajaxComplete);"));
		document.body.appendChild(scriptEl);

		var scriptEl = document.createElement("script");
		scriptEl.setAttribute('type', 'text/javascript');
		scriptEl.appendChild(document.createTextNode("	var gt_bl_unitPopulation={sword:1,slinger:1,archer:1,hoplite:1,rider:3,chariot:4,catapult:15,minotaur:30,zyklop:40,medusa:18,cerberus:30,fury:55,centaur:12};	var gt_bl_groundUnits=new Array('sword','slinger','archer','hoplite','rider','chariot','catapult','minotaur','zyklop','medusa','cerberus','fury','centaur','calydonian_boar','godsent');	function gt_bl_process(wndid)	{		var wnd=GPWindowMgr.GetByID(wndid);		if (!wnd)			return;		var handler=wnd.getHandler();		if (!handler)			return;		var units=new Array();		var item;		for (var i=0; i<gt_bl_groundUnits.length; i++)		{			if (handler.data.units[gt_bl_groundUnits[i]])			{				item={name:gt_bl_groundUnits[i], count:handler.data.units[gt_bl_groundUnits[i]].count, population:handler.data.units[gt_bl_groundUnits[i]].population};				units.push(item);			}		}		if (handler.data.researches && handler.data.researches.berth)			var berth=handler.data.researches.berth;		else			var berth=0;		var totalCap=handler.data.units.big_transporter.count*(handler.data.units.big_transporter.capacity+berth)+handler.data.units.small_transporter.count*(handler.data.units.small_transporter.capacity+berth);						units.sort(function(a,b){			return b.population-a.population;		});		for (i=0; i<units.length; i++)			gt_db_Debug('i='+i+ ' name='+units[i].name+' pop='+units[i].population+' c='+units[i].count);		for (i=0; i<units.length; i++)			if (units[i].count==0)			{				units.splice(i,1);				i=i-1;			};		gt_db_Debug('---');		for (i=0; i<units.length; i++)			gt_db_Debug('i='+i+ ' name='+units[i].name+' pop='+units[i].population+' c='+units[i].count);								var restCap=totalCap;		var sendUnits=new Array();		for (i=0; i<units.length; i++)		{			item={name:units[i].name, count:0};			sendUnits[units[i].name]=item;		};		for (j=0; j<gt_bl_groundUnits.length; j++)		{			if (sendUnits[gt_bl_groundUnits[j]])				gt_db_Debug(sendUnits[gt_bl_groundUnits[j]].name+' '+sendUnits[gt_bl_groundUnits[j]].count);		}						var hasSent;		k=0;		while (units.length>0)		{			hasSent=false;			k=k+1;			for (i=0; i<units.length; i++)			{				if (units[i].population<=restCap)				{					hasSent=true;					units[i].count=units[i].count-1;					sendUnits[units[i].name].count=sendUnits[units[i].name].count+1;					restCap=restCap-units[i].population;				}			}			for (i=0; i<units.length; i++)				if (units[i].count==0)				{					units.splice(i,1);					i=i-1;				};			if (!hasSent)			{				gt_db_Debug('Abbruch nach '+k+' loops');				break;			}		}		gt_db_Debug('nach '+k+'---- rest='+restCap);		for (i=0; i<gt_bl_groundUnits.length; i++)		{			if (sendUnits[gt_bl_groundUnits[i]])				gt_db_Debug(sendUnits[gt_bl_groundUnits[i]].name+' '+sendUnits[gt_bl_groundUnits[i]].count);		}		handler.getUnitInputs().each(function ()		{			if (!sendUnits[this.name])			{				if (handler.data.units[this.name].count>0)					this.value=handler.data.units[this.name].count;				else					this.value='';			}		});		for (i=0; i<gt_bl_groundUnits.length; i++)		{			if (sendUnits[gt_bl_groundUnits[i]])			{				if (sendUnits[gt_bl_groundUnits[i]].count>0)					$('DIV#gpwnd_'+wndid+' INPUT.unit_type_'+gt_bl_groundUnits[i]).val(sendUnits[gt_bl_groundUnits[i]].count);				else					$('DIV#gpwnd_'+wndid+' INPUT.unit_type_'+gt_bl_groundUnits[i]).val('');			}		}		$('DIV#gpwnd_'+wndid+' INPUT.unit_type_sword').trigger('change');	}	function gt_bl_delete(wndid)	{		var wnd=GPWindowMgr.GetByID(wndid);		if (!wnd)			return;		var handler=wnd.getHandler();		if (!handler)			return;		handler.getUnitInputs().each(function ()		{			this.value='';		});		$('DIV#gpwnd_'+wndid+' INPUT.unit_type_sword').trigger('change');	}	function gt_bl_initWnd()	{		var wnds=GPWindowMgr.getOpen(Layout.wnd.TYPE_TOWN);		if (wnds.length==0)		{			return;		}		var testel=$('DIV#gpwnd_'+wndid+' A.gt_balanced');		if (testel.length>0) return;		var wnd=wnds[wnds.length-1];		var wndid=wnd.getID();		var ael=$('DIV#gpwnd_'+wndid+' A.select_all_units');		$(ael).after('&nbsp;|&nbsp;<a class=gt_balanced style=\\\'position:relative; top:3px\\\' href=javascript:gt_bl_process('+wndid+')>" + QT.Lang[lID].gtio_ueberladen + "</a>		&nbsp;|&nbsp;<a style=\\\'position:relative; top:3px\\\' href=javascript:gt_bl_delete('+wndid+')>" + QT.Lang[lID].loeschen + "</a>');	}"));
		document.body.appendChild(scriptEl);
	},
	gs_player : function () {
		if (QT.Settings.values.qmenu_settings_links) {
			var inhalt = $('<iframe />', {
					id : "win_gs_s_frame",
					src : QT.Links.GS_Spieler,
					style : "width:970px;height:500px;"
				});
			qmenu_windowbuilder(QT.Lang[lID].qm_sub_stats_gs_p, 975, 565, inhalt);
		} else {
			window.open(QT.Links.GS_Spieler);
		}
	},
	gs_alliance : function () {
		if (QT.Settings.values.qmenu_settings_links) {
			var inhalt = $('<iframe />', {
					id : "win_gs_a_frame",
					src : QT.Links.GS_Allianz,
					style : "width:970px;height:500px;"
				});
			qmenu_windowbuilder(QT.Lang[lID].qm_sub_stats_gs_a, 975, 565, inhalt);
		} else {
			window.open(QT.Links.GS_Allianz);
		}
	},
	gs_rankings : function () {
		if (QT.Settings.values.qmenu_settings_links) {
			var inhalt = $('<iframe />', {
					id : "win_gs_a_frame",
					src : QT.Links.GS_Bash,
					style : "width:970px;height:500px;"
				});
			qmenu_windowbuilder(QT.Lang[lID].qm_sub_stats_gs_b, 975, 565, inhalt);
		} else {
			window.open(QT.Links.GS_Bash);
		}
	},
	gi_player : function () {
		if (QT.Settings.values.qmenu_settings_links) {
			var inhalt = $('<iframe />', {
					id : "win_gb_frame",
					src : QT.Links.GrepoIntelPlayer,
					style : "width:1040px;height:500px;"
				});
			qmenu_windowbuilder(QT.Lang[lID].qm_sub_stats_gi_p, 1045, 565, inhalt);
		} else {
			window.open(QT.Links.GrepoIntelPlayer);
		}
	},
	gi_alliance : function () {
		if (QT.Settings.values.qmenu_settings_links) {
			var inhalt = $('<iframe />', {
					id : "win_gb_frame",
					src : QT.Links.GrepoIntelAlliance,
					style : "width:1040px;height:500px;"
				});
			qmenu_windowbuilder(QT.Lang[lID].qm_sub_stats_gi_a, 1045, 565, inhalt);
		} else {
			window.open(QT.Links.GrepoIntelAlliance);
		}
	},
	gi_topkillers : function () {
		if (QT.Settings.values.qmenu_settings_links) {
			var inhalt = $('<iframe />', {
					id : "win_gb_frame",
					src : QT.Links.GrepoIntelKillers,
					style : "width:1040px;height:500px;"
				});
			qmenu_windowbuilder(QT.Lang[lID].qm_sub_stats_gi_tk, 1045, 565, inhalt);
		} else {
			window.open(QT.Links.GrepoIntelKillers);
		}
	},
	maps_grepomaps : function () {
		if (QT.Settings.values.qmenu_settings_links) {
			var inhalt = $('<iframe />', {
					id : "wingm_frame",
					src : QT.Links.GrepoMaps,
					style : "width:1040px;height:500px;"
				});
			qmenu_windowbuilder(QT.Lang[lID].qm_sub_map_gm, 1045, 565, inhalt);
		} else {
			window.open(QT.Links.GrepoMaps);
		}
	},
	maps_grepointel : function () {
		if (QT.Settings.values.qmenu_settings_links) {
			var inhalt = $('<iframe />', {
					id : "wingm_frame",
					src : QT.Links.GrepoIntelMap,
					style : "width:1040px;height:500px;"
				});
			qmenu_windowbuilder(QT.Lang[lID].qm_sub_map_gm, 1045, 565, inhalt);
		} else {
			window.open(QT.Links.GrepoIntelMap);
		}
	},
	grepofinder : function () {
		if (QT.Settings.values.qmenu_settings_links) {
			var inhalt = $('<iframe />', {
					id : "winps_frame",
					src : QT.Links.Grepofinder,
					style : "width:1050px;height:500px;"
				});
			qmenu_windowbuilder(QT.Lang[lID].qm_sub_ps_gf, 1055, 565, inhalt);
		} else {
			window.open(QT.Links.Grepofinder);
		}
	},
	bbcode_cities_all : function () {
		QT.Functions.bbcodes("bbcode_cities_all");
	},
	bbcode_cities_grp : function () {
		QT.Functions.bbcodes("bbcode_cities_grp");
	},
	bbcode_intown : function () {
		QT.Functions.bbcodes("bbcode_intown");
	},
	bbcode_fromtown : function () {
		QT.Functions.bbcodes("bbcode_fromtown");
	},
	bbcode_outer : function () {
		QT.Functions.bbcodes("bbcode_outer");
	},
	bbcode_buildings : function () {
		QT.Functions.bbcodes("buildings");
	},
	bbcodes : function (mode) {
		var GD_units = uw.GameData.units;
		var units_own = uw.ITowns.getTown(parseInt(uw.Game.townId)).units();
		var units_support = uw.ITowns.getTown(parseInt(uw.Game.townId)).unitsSupport();
		var units_outer = uw.ITowns.getTown(parseInt(uw.Game.townId)).unitsOuter();
		var cities_own = uw.ITowns.towns_collection.models;
		var active_towngroup = uw.MM.collections.TownGroup[0].getActiveGroupId();
		var cities_towngroup = uw.ITowns.town_group_towns.getTowns(active_towngroup);
		var bbcodeArray = [];
		var bbcodeBild = "[*]";
		var bbcodeAnzahl = "[*]";
		var bb_content = "";
		var bb_windowtitle = "";
		if (mode === "bbcode_intown") {
			$.each(units_own, function (unit, number) {
				if (units_own[unit] != 0) {
					if (units_support[unit]) {
						number += units_support[unit];
					}
					bbcodeBild += "[img]" + QT.Images[unit] + "[/img][|]";
					bbcodeAnzahl += "[center]" + number + "[/center][|]";
					bbcodeArray.push("" + unit + "");
				}
			});
			$.each(units_support, function (unit, number) {
				if (units_support[unit] != 0 && bbcodeArray.indexOf(unit) == -1) {
					bbcodeBild += "[img]" + QT.Images[unit] + "[/img][|]";
					bbcodeAnzahl += "[center]" + number + "[/center][|]";
				}
			});
			var bb_content = "[b]" + QT.Lang[lID].bbcode_truppen + " " + QT.Lang[lID].bbcode_in + " [/b][town]" + parseInt(uw.Game.townId) + "[/town]:\n[table]" + bbcodeBild.slice(0, -3) + bbcodeAnzahl.slice(0, -3) + "[/table]";
			var bb_windowtitle = QT.Lang[lID].bbcode_truppen + " " + QT.Lang[lID].bbcode_in + " " + uw.Game.townName;
		} else if (mode === "bbcode_fromtown") {
			$.each(units_own, function (unit, number) {
				if (units_own[unit] != 0) {
					bbcodeBild += "[img]" + QT.Images[unit] + "[/img][|]";
					bbcodeAnzahl += "[center]" + number + "[/center][|]";
				}
			});
			var bb_content = "[b]" + QT.Lang[lID].bbcode_truppen + " " + QT.Lang[lID].bbcode_aus + " [/b][town]" + parseInt(uw.Game.townId) + "[/town]:\n[table]" + bbcodeBild.slice(0, -3) + bbcodeAnzahl.slice(0, -3) + "[/table]";
			var bb_windowtitle = QT.Lang[lID].bbcode_truppen + " " + QT.Lang[lID].bbcode_aus + " " + uw.Game.townName;
		} else if (mode === "bbcode_outer") {
			uw.gpAjax.ajaxPost('units_beyond_info', 'get_supporting_units_for_foreigners', {}, false, function (data) {
				$.each(data.collections[0].data, function (index, object) {
					bb_content += "[town]" + object.current_town_id + "[town]";
					$.each(object, function (unit, number) {
						if (GD_units[unit] && number != 0) {
							bbcodeBild += "[img]" + QT.Images[unit] + "[/img][|]";
							bbcodeAnzahl += "[center]" + number + "[/center][|]";
						}
					});
				});
				//bb_content = "[b]" + QT.Lang[lID].bbcode_truppen + " " + QT.Lang[lID].bbcode_ausserhalb + " [/b][town]" + parseInt(uw.Game.townId) + "[/town]:\n[table]" + bbcodeBild.slice(0, -3) + bbcodeAnzahl.slice(0, -3) + "[/table]";
				bb_windowtitle = QT.Lang[lID].bbcode_truppen + " " + QT.Lang[lID].bbcode_ausserhalb + " " + uw.Game.townName;
				bb_inhalt = "<b>Copy and paste:</b><br/><textarea style='overflow-x: hidden; overflow-y: auto; width: 99%; height: 92%; border: 1px solid #000000' rows='16' cols='57'>" + bb_content + "</textarea>";
				qmenu_windowbuilder("" + QT.Lang[lID].qm_sub_bb + " - " + bb_windowtitle + "", 700, 330, bb_inhalt);
			});
		} else if (mode === "buildings") {
			var buildings_levels = uw.ITowns.getTown(parseInt(uw.Game.townId)).buildings();
			var q_buildings = {};
			var q_buildings_special = {
				"trade_office" : "http://s1.directupload.net/images/130426/sivub4fd.png",
				"tower" : "http://s7.directupload.net/images/130426/wjbtzr8z.png",
				"thermal" : "http://s14.directupload.net/images/130426/9hzexzo7.png",
				"theater" : "http://s1.directupload.net/images/130426/daevkl33.png",
				"statue" : "http://s7.directupload.net/images/130426/67vl4qhs.png",
				"oracle" : "http://s7.directupload.net/images/130426/7jj7uzgp.png",
				"lighthouse" : "http://s14.directupload.net/images/130426/xanhmd6w.png",
				"library" : "http://s1.directupload.net/images/130426/3yl9yvuc.png"
			}
			var find_buildings_special = "trade_office tower thermal theater statue oracle lighthouse library";
			var lv_buildings_standard = "";
			var lv_buildings_special = "";
			$.each(uw.GameData.buildings, function (building) {
				if (find_buildings_special.indexOf(building) > -1 && buildings_levels.getBuildingLevel(building) > 0) {
					lv_buildings_standard += "[img]" + q_buildings_special[building] + "[/img]";
					lv_buildings_special += "..." + buildings_levels.getBuildingLevel(building) + "...";
				}
				q_buildings[building] = ".." + buildings_levels.getBuildingLevel(building) + "...";
				if (buildings_levels.getBuildingLevel(building) < 10) {
					q_buildings[building] = "." + q_buildings[building];
				}
			});
			var lv_buildings_standard_reihenfolge =
				q_buildings.main +
				q_buildings.lumber +
				q_buildings.farm +
				q_buildings.stoner +
				q_buildings.storage +
				q_buildings.ironer +
				q_buildings.barracks +
				q_buildings.temple +
				q_buildings.market +
				q_buildings.docks +
				q_buildings.academy +
				q_buildings.wall +
				q_buildings.hide +
				lv_buildings_special;
			var q_buildings_headline = Array(lv_buildings_standard_reihenfolge.length).join("-");
			var bb_content = "[quote][b]" + QT.Lang[lID].bbcode_gebaeude + " " + QT.Lang[lID].bbcode_in + " [/b][town]" + parseInt(uw.Game.townId) + "[/town]:\n[font=monospace]" + q_buildings_headline + "\n[img]http://imperialgrepo.site40.net/imperialgrepo/vif5htpa.png[/img]" + lv_buildings_standard + "[size=8]" + lv_buildings_standard_reihenfolge.slice(0, -1) + "[/size][/font][/quote]";
			var bb_windowtitle = QT.Lang[lID].bbcode_gebaeude + " " + QT.Lang[lID].bbcode_in + " " + uw.Game.townName;
		} else if (mode === "bbcode_cities_all") {
			var bb_content = "";
			$.each(cities_own, function (key, town) {
				bb_content += "[town]" + town.id + "[/town] (" + town.attributes.points + ") " + town.attributes.island_x + "|" + town.attributes.island_y + "\n";
			});
			var bb_windowtitle = QT.Lang[lID].bbcode_staedte;
		} else if (mode === "bbcode_cities_grp") {
			var bb_content = "";
			$.each(cities_towngroup, function (key, town) {
				bb_content += "[town]" + town.attributes.town_id + "[/town] (" + town.town_model.attributes.points + ") " + town.town_model.attributes.island_x + "|" + town.town_model.attributes.island_y + "\n";
			});
			var bb_windowtitle = QT.Lang[lID].bbcode_staedte;
		}
		bb_inhalt = "<b>Copy and paste:</b><br/><textarea style='overflow-x: hidden; overflow-y: auto; width: 99%; height: 92%; border: 1px solid #000000' rows='16' cols='57'>" + bb_content + "</textarea>";
		qmenu_windowbuilder("" + QT.Lang[lID].qm_sub_bb + " - " + bb_windowtitle + "", 700, 330, bb_inhalt);
	},
	fullscreenmode : function () {
		$(".nui_toolbar, .nui_left_box, .nui_main_menu, .nui_right_box, .ui_resources_bar, .nui_units_box, .picomap_area, .gods_area, .toolbar_buttons, .tb_activities, .ui_quickbar, .town_name_area, .leaves, .minimized_windows_area, .btn_close_all_windows, #notification_area, #tutorial_quest_container, #island_quests_overview, #bug_reports_link, #BTN_HK").css('visibility', 'hidden');
		$('<div id="vb_back" style="position:absolute;cursor:pointer;z-index:1;top:1px;left:50%;border:1px solid #FFCC66;background-color:#2D5487"><img src=http://s14.directupload.net/images/120327/4tnvbg37.png></img></div>').appendTo("body");
		$("#vb_back").click(function () {
			$(".nui_toolbar, .nui_left_box, .nui_main_menu, .nui_right_box, .ui_resources_bar, .nui_units_box, .picomap_area, .gods_area, .toolbar_buttons, .tb_activities, .ui_quickbar, .town_name_area, .leaves, .minimized_windows_area, .btn_close_all_windows, #notification_area, #tutorial_quest_container, #island_quests_overview, #bug_reports_link, #BTN_HK").css('visibility', 'visible');
			$("#vb_back").remove();
		});
	},
	unitcomparison : function () {
		window.open(QT.Links.Unitvergleich);
	},
	statsandscripts : function () {
		var grepoGameBorder = '<div class="game_border"><div class="game_border_top"></div><div class="game_border_bottom"></div><div class="game_border_left"></div><div class="game_border_right"></div><div class="game_border_corner corner1"></div><div class="game_border_corner corner2"></div><div class="game_border_corner corner3"></div><div class="game_border_corner corner4"></div><div class="game_header bold" style="height:18px;">';
		var grepoGameBorderContainer = '<div style="padding:5px 5px 1px 5px;margin-bottom:15px">';
		var SAS_vorwort = '<table width="100%" border="0" cellspacing="0"><tr><td width="10%" style="text-align:center"><img src="http://s1.directupload.net/images/120726/vaatg5wd.png" width="100" height="100" /><b>Quackmaster</b></td><td width="90%">Wenn ihr meine Arbeit unterstützen wollt, freue ich über jeden Klick auf   die normalen Links mit dem jeweiligen Namen des Statistiktools oder des Skriptes. Ihr werdet lediglich kurz zu einer Seite weitergeleitet, die ihr nach 5 Sekunden überspringen   könnt. Wer keine Zeit dafür aufbringen möchte, findet den Direktlink direkt darunter. Es sind nur die in der deutschen Version von Grepolis erlaubten Skripte verzeichnet.<p/><div align="center">Über Unterstützung in Form von Spenden freue ich mich natürlich auch (alle Spender werden hier selbstverständlich namentlich gewürdigt, falls nicht anders gewünscht).<p/><form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----MIIHNwYJKoZIhvcNAQcEoIIHKDCCByQCAQExggEwMIIBLAIBADCBlDCBjjELMAkGA1UEBhMCVVMxCzAJBgNVBAgTAkNBMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKEwtQYXlQYWwgSW5jLjETMBEGA1UECxQKbGl2ZV9jZXJ0czERMA8GA1UEAxQIbGl2ZV9hcGkxHDAaBgkqhkiG9w0BCQEWDXJlQHBheXBhbC5jb20CAQAwDQYJKoZIhvcNAQEBBQAEgYBx8Zt1h1mhQFfWWXVtidRr5YdtRj6Z3of3anZ9m6dKgyf1ExtWcJYfLzcAT1gzQ1MSSnzRDFqeGd2Rgo3hKUzFmACqrVH8E8FJSZ/ngGQf830SduPsEaej22Kiw8YsIBZB698/F+PgRcIgpvugVxH2dH7jvCCmckcd6SqeEbYlBTELMAkGBSsOAwIaBQAwgbQGCSqGSIb3DQEHATAUBggqhkiG9w0DBwQIkYIVmDwc+rSAgZAGOhaLG/RhKyt+1iRMo6UUTdcGWlzqqLAd5yp86SirREeEJ0FS/uqutz6y/P5y2WyhhW1ETN5fpBdl/JTK6X7PSg1ungQzEQNEOmfH0zFPW5FRscKugy44JlqOmUgFMNf5bErshP6PoGNKgY7pSnip5z4iQinY8fV5/eC37cyp21yRE8YOBwXJ5J2tmehcl5ygggOHMIIDgzCCAuygAwIBAgIBADANBgkqhkiG9w0BAQUFADCBjjELMAkGA1UEBhMCVVMxCzAJBgNVBAgTAkNBMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKEwtQYXlQYWwgSW5jLjETMBEGA1UECxQKbGl2ZV9jZXJ0czERMA8GA1UEAxQIbGl2ZV9hcGkxHDAaBgkqhkiG9w0BCQEWDXJlQHBheXBhbC5jb20wHhcNMDQwMjEzMTAxMzE1WhcNMzUwMjEzMTAxMzE1WjCBjjELMAkGA1UEBhMCVVMxCzAJBgNVBAgTAkNBMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKEwtQYXlQYWwgSW5jLjETMBEGA1UECxQKbGl2ZV9jZXJ0czERMA8GA1UEAxQIbGl2ZV9hcGkxHDAaBgkqhkiG9w0BCQEWDXJlQHBheXBhbC5jb20wgZ8wDQYJKoZIhvcNAQEBBQADgY0AMIGJAoGBAMFHTt38RMxLXJyO2SmS+Ndl72T7oKJ4u4uw+6awntALWh03PewmIJuzbALScsTS4sZoS1fKciBGoh11gIfHzylvkdNe/hJl66/RGqrj5rFb08sAABNTzDTiqqNpJeBsYs/c2aiGozptX2RlnBktH+SUNpAajW724Nv2Wvhif6sFAgMBAAGjge4wgeswHQYDVR0OBBYEFJaffLvGbxe9WT9S1wob7BDWZJRrMIG7BgNVHSMEgbMwgbCAFJaffLvGbxe9WT9S1wob7BDWZJRroYGUpIGRMIGOMQswCQYDVQQGEwJVUzELMAkGA1UECBMCQ0ExFjAUBgNVBAcTDU1vdW50YWluIFZpZXcxFDASBgNVBAoTC1BheVBhbCBJbmMuMRMwEQYDVQQLFApsaXZlX2NlcnRzMREwDwYDVQQDFAhsaXZlX2FwaTEcMBoGCSqGSIb3DQEJARYNcmVAcGF5cGFsLmNvbYIBADAMBgNVHRMEBTADAQH/MA0GCSqGSIb3DQEBBQUAA4GBAIFfOlaagFrl71+jq6OKidbWFSE+Q4FqROvdgIONth+8kSK//Y/4ihuE4Ymvzn5ceE3S/iBSQQMjyvb+s2TWbQYDwcp129OPIbD9epdr4tJOUNiSojw7BHwYRiPh58S1xGlFgHFXwrEBb3dgNbMUa+u4qectsMAXpVHnD9wIyfmHMYIBmjCCAZYCAQEwgZQwgY4xCzAJBgNVBAYTAlVTMQswCQYDVQQIEwJDQTEWMBQGA1UEBxMNTW91bnRhaW4gVmlldzEUMBIGA1UEChMLUGF5UGFsIEluYy4xEzARBgNVBAsUCmxpdmVfY2VydHMxETAPBgNVBAMUCGxpdmVfYXBpMRwwGgYJKoZIhvcNAQkBFg1yZUBwYXlwYWwuY29tAgEAMAkGBSsOAwIaBQCgXTAYBgkqhkiG9w0BCQMxCwYJKoZIhvcNAQcBMBwGCSqGSIb3DQEJBTEPFw0xMzA0MTExOTMxMzdaMCMGCSqGSIb3DQEJBDEWBBROF1P6mCNfpSRvTgLwC7r1SQ1z8TANBgkqhkiG9w0BAQEFAASBgH+DNvxOmrue21onKCiUsOyAvv4NgZhOIITo89M3IsRlun69zOZOvhiTo/7WNGjq1E56ypTMBF9JFvLmNyfLaYNR3CzrwVACbrTe2NyCdAbojPL2oUFbT1CTA0ryT92egtF3nuqBVEhhMJsj3YnsRUAocu7YJVl8zLriWS6wfx4w-----END PKCS7-----"><input type="image" src="https://www.paypalobjects.com/de_DE/DE/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="Jetzt einfach, schnell und sicher online bezahlen – mit PayPal."><img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"></form><p/><b>Spenden:</b><ul><li>Daniela T. - 1 Euro</li><li>Peter J. - 1 Euro</li><li>André V. - 5 Euro</li><li>Nepomuk P. - 10 Euro</li><li>Michael H. - 1 Euro</li><li>Heiner W. - 5 Euro</li><li>LightShining - 15 Euro</li><li>Hans Hermann S. - 5 Euro</li><li>Leuchtkraft - 10 Euro</li><li>Ann-Katrin R. - 3 Euro</li><li>alexander1128 - 10 Euro</li><li>Martin P. - 10 Euro</li></ul><p/><small>Wer lieber via ingame Name genannt werden möchte, kann sich gerne bei mir melden</small><p/><p/><a href="http://adf.ly/?id=2057648">Auch mit Links Geld verdienen?</a></div></td></tr></table>';
		var mo_Export = "Liste als BB-Code für das Forum";
		var SAS_HTML = [];
		SAS_HTML[0] = ["Tools", {
				"grepostats" : ["Grepolis Stats", "http://adf.ly/B7C8k", "Clash Rank", "http://www.clashrank.com/contact", QT.Links.grepostats, "Bietet Statistiken und Übersichten über Spieler, Allianzen, Städte und vielem mehr"],
				"grepolisintel" : ["Grepolis Intel", "http://adf.ly/B7D1y", "wansyth", "mailto:wansyth@grepointel.com", QT.Links.grepointel, "Ähnlich wie Grepo Stats, aber mit einigen zusätzlichen Funktionen wie Serverkarten oder Polissuche"],
				"grepolismaps" : ["Grepolis Maps", "http://adf.ly/B7BlJ", "Gehirnpfirsich", "mailto:info@twmaps.org", QT.Links.grepomaps_main, "Kartentool - Weltkarten aller Server"],
				"grepobash" : ["Grepolis Bashrangliste", "http://adf.ly/B6HBW", "quert", "mailto:support@terenceds.de", QT.Links.grepobash_main, "Allianzinterne Bashrangliste"],
				"grepofinder" : ["Grepolis Finder", "http://adf.ly/B7D6r", "Ludovic Drolez", "mailto:ludo@drolez.com", QT.Links.grepofinder_main, "Suchen von Städten mit bestimmten Filteroptionen. Nützlich um Geisterstädte und Inaktive zu finden"],
				"grepounitcompare" : ["Grepolis Einheiten Vergleich", "http://adf.ly/B7Cry", "Quackmaster", "http://forum.de.grepolis.com/private.php?do=newpm&u=11342", QT.Links.einheitenvergleich, "Eine Tabelle um die Verteidigungswerte der einzelnen Einheiten in Grepolis miteinander zu vergleichen"],
				"grepoutils" : ["Grepoutils", "http://adf.ly/B7Cgc", "sayunu", "http://forum.pt.grepolis.com/member.php?219-sayunu", QT.Links.grepoutils, "Bietet einige Tools für Grepolis"],
				"grepolisrevobericht" : ["Grepolis Revo Bericht", "http://adf.ly/cY3Ww", "znyde", "http://forum.de.grepolis.com/private.php?do=newpm&u=47082", QT.Links.grepolisrevobericht, "Formatiert eure Deffanfragen anschaulich und übersichtlich für das Forum"],
				"grepoforen" : ["GrepoForen", "http://adf.ly/cY4st", "schüri", "http://forum.de.grepolis.com/private.php?do=newpm&u=1559", QT.Links.grepoforen, "Kostenloses Grepo-phpBB-Forum, dass im Vergleich zu einem normalen Forum über viele nützliche Zusatzfunktionen für Grepolis verfügt."],
				"abakus" : ["Abakus - Der Grepolis Rechner", "http://adf.ly/B7CyQ", "Aerials", "http://forum.de.grepolis.com/private.php?do=newpm&u=781", QT.Links.abakus, "Rechner und Planer rund um Grepolis zum Download auf den Computer"],
				"grepotool" : ["Grepotool", "http://adf.ly/eAYD9", ".Pete.", "http://forum.de.grepolis.com/private.php?do=newpm&u=38433", QT.Links.grepotool, "<ul><li>Frei scroll- und zoombare Grepo-Karte einer jeden Welt</li><li>Spieler oder Allianzen können farblich markiert werden (politische Karte)</li><li>Man kann zu jeder Stadt eintragen, welche Einheiten drinstehen</li><li>Es lassen sich verschiedene Listen von Städten anlegen</li><li>uvm.</li></ul>"],
				"youscreen" : ["YouScreen", "http://adf.ly/BKCfU", "Lukas Ruschitzka", "mailto:webmaster@youscreen.de", QT.Links.youscreen, "Screenshot Tool - mit der Druck-Taste einen Screenshot erstellen und direkt ins Internet hochladen (vorherige Bearbeitung möglich)"],
			}
		];
		SAS_HTML[1] = ["Skripte", {
				"quacktools" : ["Quack Toolsammlung", "http://adf.ly/AAMwY", "Quackmaster", "http://forum.de.grepolis.com/private.php?do=newpm&u=11342", QT.Links.quacktools, "<ul><li>Grepo Stats Button in der Stadtinfo, Spielerinfo und Allianzinfo</li><li>Überschüssiges Silber bis 15k wird in das Formfeld in der Höhle vorab eingetragen. Im Formfeld können Beträge mit Enter bestätigt werden</li><li>In Berichten und im Simulator werden Truppenverluste in Rohstoffe/Gunst/BP umgerechnet</li><li>Anzeige von Punkten für bestimmte Gebäude im Senat</li><li>Buttonleiste mit Links zu allen wichtigen Toolseiten</li><li>Verschieden Ansichtsmöglichkeiten</li><li>BB Code Ausgabe der stationierten Truppen in und außerhalb einer Stadt für das Allianzforum oder Nachrichten</li><li>BB Code Ausgabe aller Gebäudestufen einer Stadt</li><li>Kein Überladen der Schiffe im Angriffs-/Unterstützungsfenster</li><li>Erweiterung der Kulturübersicht (G.Tio2.0Tools)</li><li>Erweiterung der Befehlsübersicht (Anzahl von Bewegungen wird angezeigt)</li><li>Hotkeys zu verschiedenen Funktionen</li><li>Übersicht über sämtliche erlaubten Statistiken und Skripte</li><li>Transportrechner</li><li>Online Timer</li><li>Google Docs Implementation</li><li>Berichte werden farblich markiert und können nach Filtern ausgewählt werden</li><li>Die Breite des Forums kann nach der Anzahl der Menüpunkte erhöht werden</li><li>Anzeige und Funktionen des Skriptes können an-/abgeschaltet werden</li><li>Questsymbole und Questpfeil können verschoben oder versteckt werden</li><li>Button in der Inselübersicht um eine Nachricht an alle Spieler auf der Insel schicken zu können</li><li>Auswahlliste aller Ordner im Berichtefenster</li><li>Beiträge im Forum können selektiert und gelöscht werden</li><li>BB-Code Button neben dem Stadtnamen</li><li>Sortierfunktion in der Höhlenübersicht</li><li>Akademieplaner</li><li>Gewählte Farmoption in der Bauerndörferübersicht (Kaptitän) wird sich gemerkt und automatisch ausgewählt</li></ul>"],
				"grc" : ["Grepolis Report Converter", "http://adf.ly/MBEgz", "Potusek", "mailto:grepolis@potusek.eu", QT.Links.grc, "<ul><li>Kann so gut wie alles in BB-Code umwandeln</li><li>Zugriff auf Spieler-Statistiken</li><li>Anzeige der Verluste (in der Mauer)</li><li>Emoticons in Nachrichten und Beiträgen im Forum</li><li>Zeitanzeige wann ein Zauber wieder verwendet werden kann</li><li>Mehrzeilige Ansicht der Tabs im Allianz Forum</li></ul>"],
				"diotools" : ["DIO-Tools", "http://adf.ly/cY7c1", "Diony", "http://forum.de.grepolis.com/private.php?do=newpm&u=10548", QT.Links.diotools, "<ul><li>Eigens erstellte Grepo-Smileys</li><li>Biremenzähler</li><li>Einheitenstärke DEF/OFF im Einheitenmenü und Auswahl der Einheitentypen</li><li>Einheitenstärke DEF & Bevölkerung in der Kaserne</li><li>Transporterkapazität</li><li>Verkürzte Laufzeit im ATT/UT-Fenster</li><li>Diverse Erweiterungen des Handelsfensters</li><li>Diverse Erweiterungen für Weltwunder</li><li>Angriffs- Unterstützungs-Zähler im Eroberungsfenster</li><li>Diverse GUI-Optimierungen</li></ul>"],
				"playerprofile" : ["Zurück-Button für Spielerprofile", "http://adf.ly/Djc2I", "Menidan", "http://forum.de.grepolis.com/private.php?do=newpm&u=36203", QT.Links.playerprofilescript, "Merkt sich geöffnete Spielerprofile die im Spielerprofilfenster vor und zurück geblättert werden können. Legt außerdem eine Chronik an, welche eine Übersicht aller geöffneten Spielerprofile bietet"],
				"attackwarner" : ["Angriffswarner", "http://adf.ly/LfxCB", "creeten", "http://forum.de.grepolis.com/private.php?do=newpm&u=41554", QT.Links.attackwarner, "Spielt einen Warnton ab, wenn man angegriffen wird"],
				"wwranks" : ["WW-Ranks", "http://adf.ly/AAYLL", "ReinerCY", "http://forum.de.grepolis.com/private.php?do=newpm&u=4532", QT.Links.wwranks, "Fügt einen Button hinzu, welcher bei Klick ein Fenster öffnet, welches eine Schätzung der zeitlichen Entwicklung der WW anzeigt"],
				"grepotownlist" : ["GrepoTownList", "http://adf.ly/AARtm", "GTeauDFAdGTio", "http://forum.de.grepolis.com/private.php?do=newpm&u=8531", QT.Links.grepotownslist, "Zusatzfunktionen für die Grepolis Stats Seite. Ermöglicht die Umwandlung der Städte eines Spielers in BB-Code"],
				"gtiotools" : ["G.Tio2.0Tools", "http://adf.ly/AAWLF", "GTeauDFAdGTio", "http://forum.de.grepolis.com/private.php?do=newpm&u=8531", QT.Links.gtiotools, "<ul><li>Anzeige Town-ID</li><li>Grepostats Button in der Stadtinfo und Spielerinfo</li><li>Erweiterung Kulturübersicht</li><li>Erweiterung Befehlsübersicht</li><li>Kein Überladen der Schiffe</li></ul>"],
				"transportrechner_menidan" : ["Transportrechner", "http://adf.ly/cY7nh", "Menidan", "http://forum.de.grepolis.com/private.php?do=newpm&u=36203", QT.Links.transportrechner_menidan, "Ein weiterer Transportrechner"],
				"zeitrechner" : ["Zeitrechner", "http://adf.ly/cY7JP", "Menidan", "http://forum.de.grepolis.com/private.php?do=newpm&u=36203", QT.Links.zeitrechner, "Rechnet die Summe bzw. Differenz von zwei Uhrzeiten aus"],
				"zauberzeitgeber" : ["Zauberzeitgeber", "http://adf.ly/cY7bz", "Menidan", "http://forum.de.grepolis.com/private.php?do=newpm&u=36203", QT.Links.zauberzeitgeber, "Erweitert einige Anzeigen mit Daten über Zauber um weitere Informationen wie die Dauer für ein weiteren Zauber jener Art"],
				"attackwarner2" : ["Angriffswarner", "http://adf.ly/cY7c0", "gordon1982", "http://forum.de.grepolis.com/private.php?do=newpm&u=41281", QT.Links.attackwarner2, "Alarm-Sound bei eingehendem Angriff"],
				"bauerndorfalarm" : ["Bauerndorf Alarm", "http://adf.ly/cY7c2", "Kapsonfire", "http://forum.de.grepolis.com/private.php?do=newpm&u=46026", QT.Links.bauerndorfalarm, "Das Skript gibt Bescheid, wenn im aktuellen Sichtbereich Bauerndörfer zum farmen verfügbar sind"],
			}
		];
		var inhalt = "";
		inhalt += grepoGameBorder + "Vorwort" + "</div>" + grepoGameBorderContainer + SAS_vorwort + "</div></div>";
		$.each(SAS_HTML, function (a, b) {
			inhalt += '<div id="' + b[0] + '">' + grepoGameBorder + b[0] + '<a class="forum_export" style="float:right" href="#"><img src="http://s14.directupload.net/images/140124/8tzken7v.png" style="margin-top: -2px; margin-left: 11px;" /></a>' + "</div>" + grepoGameBorderContainer;
			$.each(b[1], function (c, d) {
				inhalt += '<a href="' + d[1] + '" target="_blank">' + d[0] + '</a>';
				inhalt += '<small> von <a href="' + d[3] + '" target="_blank">' + d[2] + '</a></small><br />';
				inhalt += '<small><a href="' + d[4] + '" target="_blank">Direktlink</a></small><br />';
				inhalt += d[5] + '<p />';
			});
			inhalt += "</div></div></div>";
		});
		qmenu_windowbuilder(QT.Lang[lID].qmenu_uebersichtss, 740, 520, inhalt);
		uw.$('.forum_export').mousePopup(new uw.MousePopup(mo_Export));
		var expRahmen_a = "<div class='inner_box'><div class='game_border'><div class='game_border_top'></div><div class='game_border_bottom'></div><div class='game_border_left'></div><div class='game_border_right'></div><div class='game_border_corner corner1'></div><div class='game_border_corner corner2'></div><div class='game_border_corner corner3'></div><div class='game_border_corner corner4'></div><div class='game_header bold' style='height:18px;'><div style='float:left; padding-right:10px;'></div>";
		var expRahmen_b = "</div><textarea id='expTextarea' style=\"height: 165px; width: 99%;\">";
		var expRahmen_c = "</textarea></div><div style='overflow-x: hidden; padding-left: 5px; position: relative;'></div></div></div>";
		var expTitel = "Copy and Paste";
		$('#Tools .forum_export').click(function () {
			var expWin = uw.Layout.wnd.Create(0, "Tools");
			expWin.setWidth(740);
			var expInhalt_Stats = "[quote][font=sansserif][center][size=20][b]Tools:[/b][/size][/center][/font][/quote]\n[quote][font=sansserif]";
			$.each(SAS_HTML[0][1], function (a, b) {
				expInhalt_Stats += '[size=10][url=' + b[1] + ']' + b[0] + '[/url][/size]';
				expInhalt_Stats += '[size=6] von [url=' + b[3] + ']' + b[2] + '[/url]\n[url=' + b[4] + ']Direktlink[/url][/size]\n';
				expInhalt_Stats += b[5] + '\n\n';
			});
			expInhalt_Stats += "[/font][/quote]";
			expWin.setContent(expRahmen_a + expTitel + expRahmen_b + expInhalt_Stats + expRahmen_c);
			$("#expTextarea").focus(function () {
				var that = this;
				setTimeout(function () {
					$(that).select();
				}, 10);
			});
		});
		$('#Skripte .forum_export').click(function () {
			var expWin = uw.Layout.wnd.Create(0, "Skripte");
			expWin.setWidth(740);
			var expInhalt_Skripte = "[quote][font=sansserif][center][size=20][b]Skripte:[/b][/size]\nAdd-ons installieren um die Skripte zum laufen zu bringen:\n[b]Firefox:[/b] [url=https://addons.mozilla.org/de/firefox/addon/greasemonkey/]Greasemonkey[/url] ; [b]Chrome:[/b] [url=https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo]Tampermonkey[/url][/center][/font][/quote]\n[quote][font=sansserif]";
			$.each(SAS_HTML[1][1], function (a, b) {
				expInhalt_Skripte += '[size=10][url=' + b[1] + ']' + b[0] + '[/url][/size]';
				expInhalt_Skripte += '[size=6] von [url=' + b[3] + ']' + b[2] + '[/url]\n[url=' + b[4] + ']Direktlink[/url][/size]\n';
				if (b[5].indexOf("<") != -1) {
					var text_sanatize = b[5].replace(/<\li>/ig, '- ').replace(/<\/li>/ig, '\n').replace(/(<([^>]+)>)/ig, "");
					expInhalt_Skripte += text_sanatize + '\n';
				} else {
					expInhalt_Skripte += b[5] + '\n\n';
				}
			});
			expInhalt_Skripte += "[/font][/quote]";
			expWin.setContent(expRahmen_a + expTitel + expRahmen_b + expInhalt_Skripte + expRahmen_c);
			$("#expTextarea").focus(function () {
				var that = this;
				setTimeout(function () {
					$(that).select();
				}, 10);
			});
		});
	},
	googledocs : function () {
		inhalt = $('<iframe />', {
				id : "googledocs_frame",
				src : "",
				style : "width:850px;height:506px;"
			});
		qmenu_windowbuilder("Google Docs", 860, 600, inhalt);
		$('<div class="input_box"><span class="grepo_input" style="padding:0px; float:none;"><span class="left"><span class="right"><input id="googledocsURL_CHANGE_TEXTFELD" type="text" style="width:614px;" value="' + QT.Settings.values.googledocsurl + '"></span></span></span></div> <a id="googledocsURL_CHANGE_BUTTON" class="button" style="display:block;vertical-align: middle;position:absolute;;width:115px;margin-left:625px;margin-top:3px;" href="#"><span class="left"><span class="right"><span class="middle"><small>' + QT.Lang[lID].qmenu_googledocs_changeURL + '</small></span></span></span></a> <a id="googledocsURL_RESET_BUTTON" class="button" style="display:block;vertical-align: middle;position:absolute;width:115px;margin-left:739px;margin-top:3px" href="#"><span class="left"><span class="right"><span class="middle"><small>Reset</small></span></span></span></a>').insertAfter('#googledocs_frame');

		$("#googledocsURL_CHANGE_BUTTON").click(function () {
			QT.Settings.values.googledocsurl = $("#googledocsURL_CHANGE_TEXTFELD").val();
			setTimeout(function () {
				GM_setValue("googledocsurl", QT.Settings.values.googledocsurl);
			}, 0);
			document.getElementById('googledocs_frame').src = QT.Settings.values.googledocsurl;
		});
		$("#googledocsURL_RESET_BUTTON").click(function () {
			QT.Settings.values.googledocsurl = "https://docs.google.com/spreadsheet/ccc?key=0AkpTmTnKs72_dEF3bWs3SW5iWjdyUEE0M0c3Znpmc3c";
			setTimeout(function () {
				GM_deleteValue("googledocsurl");
			}, 0);
			document.getElementById('googledocs_frame').src = QT.Settings.values.googledocsurl;
			document.getElementById('googledocsURL_CHANGE_TEXTFELD').value = QT.Settings.values.googledocsurl;
		});
		document.getElementById('googledocs_frame').src = QT.Settings.values.googledocsurl;
	},
	scriptsettings : function () {
		var grepoGameBorder = '<div class="game_border"><div class="game_border_top"></div><div class="game_border_bottom"></div><div class="game_border_left"></div><div class="game_border_right"></div><div class="game_border_corner corner1"></div><div class="game_border_corner corner2"></div><div class="game_border_corner corner3"></div><div class="game_border_corner corner4"></div><div class="game_header bold" style="height:18px;">';
		var qsettingsContainer = '<div class="qsettingsContainer" style="padding:5px 5px 1px 5px;margin-bottom:15px">';
		var qsettingsHTML = [];
		qsettingsHTML[0] = [QT.Lang[lID].qmenu_settings_text_13, {
				"onlinecounter" : [QT.Lang[lID].qmenu_settings_text_2, [["qmenu_settings_counter", QT.Lang[lID].qmenu_settings_text_9], ["qmenu_settings_counter_aktiv", QT.Lang[lID].qmenu_settings_text_11]]],
				"buttonbar" : [QT.Lang[lID].qmenu_settings_text_6, [["qmenu_settings_buttonbar", QT.Lang[lID].qmenu_settings_text_9]]],
				"plusmenu" : [QT.Lang[lID].qmenu_settings_text_5, [["qmenu_settings_plusmenu", QT.Lang[lID].qmenu_settings_text_9]]],
				"cityview" : [QT.Lang[lID].qmenu_settings_text_41, [["qmenu_settings_cityview_BTN", QT.Lang[lID].qmenu_settings_text_9]]],
				"hotkey" : [QT.Lang[lID].qmenu_settings_text_22, [["qmenu_settings_hotkey_anzeige", QT.Lang[lID].qmenu_settings_text_9]]],
				"bbcode_btn" : [QT.Lang[lID].qmenu_settings_text_31, [["qmenu_settings_townbb", QT.Lang[lID].qmenu_settings_text_9]]],
				"transportcalc" : [QT.Lang[lID].qmenu_settings_text_12, [["qmenu_settings_transport_rechner", QT.Lang[lID].qmenu_settings_text_9]]]
			}
		];
		qsettingsHTML[1] = [QT.Lang[lID].qmenu_settings_text_14, {
				"berichtemod" : [QT.Lang[lID].qmenu_settings_text_15, [["qmenu_settings_berichte_farben", QT.Lang[lID].qmenu_settings_text_16], ["qmenu_settings_berichte_filter", QT.Lang[lID].qmenu_settings_text_17], ["qmenu_settings_berichte_move", QT.Lang[lID].qmenu_settings_text_30], ["qmenu_settings_berichte_losses", QT.Lang[lID].qmenu_settings_text_42]]],
				"simulator" : [QT.Lang[lID].qmenu_settings_text_43, [["qmenu_settings_simulator", QT.Lang[lID].qmenu_settings_text_27]]],
				"grepopoints" : [QT.Lang[lID].qmenu_settings_text_24, [["qmenu_settings_grepopoints", QT.Lang[lID].qmenu_settings_text_25]]],
				"forummod" : [QT.Lang[lID].qmenu_settings_text_20, [["qmenu_settings_maximize_forum", QT.Lang[lID].qmenu_settings_text_21], ["qmenu_settings_forumdelete", QT.Lang[lID].qmenu_settings_text_32]]],
				"akademiemod" : [QT.Lang[lID].qmenu_settings_text_35, [["qmenu_settings_akademieplaner", QT.Lang[lID].qmenu_settings_text_27]]],
				"trademod" : [QT.Lang[lID].qmenu_settings_text_26, [["qmenu_settings_tradeimprovement", QT.Lang[lID].qmenu_settings_text_27]]],
				"townlistmod" : [QT.Lang[lID].qmenu_settings_text_28, [["qmenu_settings_stadtliste", QT.Lang[lID].qmenu_settings_text_27]]],
				"questlistmod" : [QT.Lang[lID].qmenu_settings_text_29, [["qmenu_settings_questliste", QT.Lang[lID].qmenu_settings_text_27]]],
				"cavemod_admin" : [QT.Lang[lID].qmenu_settings_text_34, [["qmenu_settings_hidessort", QT.Lang[lID].qmenu_settings_text_37], ["qmenu_settings_hidessilver", QT.Lang[lID].qmenu_settings_text_38]]],
				"cavemod_town" : [QT.Lang[lID].qmenu_settings_text_36, [["qmenu_settings_hideaddpoints", QT.Lang[lID].qmenu_settings_text_39], ["qmenu_settings_hidesilver", QT.Lang[lID].qmenu_settings_text_38]]],
				"farmhelper" : [QT.Lang[lID].qmenu_settings_text_40, [["qmenu_settings_farmhelper", QT.Lang[lID].qmenu_settings_text_27]]],
				"other" : [QT.Lang[lID].qm_sub_other, [["qmenu_settings_links", QT.Lang[lID].qmenu_settings_text_3]]]
			}
		];
		var inhalt = "";
		$.each(qsettingsHTML, function (a, b) {
			inhalt += grepoGameBorder + b[0] + "</div>" + qsettingsContainer;
			$.each(b[1], function (c, d) {
				inhalt += "<div style='margin:2px 0'>" + d[0] + "<br/>";
				$.each(d[1], function (e, f) {
					inhalt += '<div id="' + f[0] + '" class="qbox checkbox_new"><div class="cbx_icon"></div>' + f[1] + '</div><br/>';
				});
				inhalt += "</div>";
			});
			inhalt += "</div></div>";
		});
		inhalt += '<a id="qmenu_einstellungen_reset_BTN" class="button" style="display:block;vertical-align: middle;position:absolute;;width:200px;" href="#"><span class="left"><span class="right"><span class="middle"><small>' + QT.Lang[lID].qmenu_reset + '</small></span></span></span></a>';
		inhalt += '<a class="button" id ="qmenu_einstellungen_safe_BTN" style="float:right" href="#"><span class="left"><span class="right"><span class="middle"><small>' + QT.Lang[lID].qmenu_safe + '</small></span></span></span><span style="clear:both;"></span></a>';
		qmenu_windowbuilder(QT.Lang[lID].qm_sub_other_ei, 600, 400, inhalt);
		$(".qbox").click(function () {
			$(this).toggleClass("checked");
		});
		$.each(QT.Settings.values, function (index, value) {
			if (value === true) {
				$("#" + index).addClass("checked");
			}
		});
		$("#qmenu_einstellungen_safe_BTN").click(function () {
			QT.Settings.safe_all();
		});
		$("#qmenu_einstellungen_reset_BTN").click(function () {
			uw.hOpenWindow.showConfirmDialog('', QT.Lang[lID].qmenu_settings_text_19, function () {
				setTimeout(function () {
					GMsettings = GM_listValues();
					for each(var val in GMsettings) {
						GM_deleteValue(val);
					}
					window.location.reload();
				}, 300);
			});
		});
	},
	setlanguage : function () {
		lID = (QT.Lang[mID]) ? mID : "en";
	},
	qtoolbox : function () {
		$('#ui_box .nui_main_menu .bottom').append('<div id="qtbox_wrapper" style="position: absolute; display: block; width: 100%; bottom: 31px;"><div id="qtbox_header" style="display: block; position: relative; height: 14px; width: 100%; top: 0px; background:url(http://s7.directupload.net/images/140119/jltfmtqi.png) no-repeat"></div></div>');
		$('#ui_box .nui_main_menu .bottom').css({
			"bottom" : "-3px"
		});
		$('#ui_box .nui_main_menu .leaves').hide();
		$('#ui_box .nui_main_menu .content ul li:last-child').removeClass("last");
		$('#ui_box .nui_main_menu .content ul li:last-child span.button_wrapper').css({
			"height" : "15px"
		});
		$('#ui_box .nui_main_menu .content ul').append('<li style="height: 10px; z-index: 1"><div id="qt_mainmenu_top" style="z-index: 1; background: url(http://s7.directupload.net/images/140119/duowfxnl.png) repeat scroll 0% 0% transparent; position: absolute; width: 144px; height: 35px; margin-top: -12px;)"><a id="qtbox_main_btn" class="" style="top: 14px; left: 60px; width: 20px; height: 17px; display: block; position: absolute; background: url(http://s7.directupload.net/images/140119/nebf5887.png)" href="#"></a></div><div id="qt_mainmenu_content" style="width: 133px; position: absolute; bottom: 0px; opacity: 0.95; background: #0C1727"><ul id="qt_mainmenu_list"></ul></div></li>');
		$('#ui_box .nui_main_menu .content ul').css({
			"height" : "315px"
		});
		$("#qtbox_main_btn").hover(
			function () {
			$(this).css({
				"background-image" : "url(http://s7.directupload.net/images/140119/ywi4jbg2.png)"
			});
		},
			function () {
			$(this).css({
				"background-image" : "url(http://s7.directupload.net/images/140119/nebf5887.png)"
			});
		});

		var qtbox_main_array = [
			[QT.Lang[lID].qm_sub_stats, "http://s1.directupload.net/images/140125/vnghthhz.png", "",
				[QT.Lang[lID].qm_sub_stats_gs, "http://s1.directupload.net/images/121012/zzydmra8.png", "",
					[QT.Lang[lID].qm_sub_stats_gs_p, "http://s1.directupload.net/images/121012/8xgicpg7.png", "gs_player"],
					[QT.Lang[lID].qm_sub_stats_gs_a, "http://s7.directupload.net/images/121012/4kfl493a.png", "gs_alliance"],
					[QT.Lang[lID].qm_sub_stats_gs_b, "http://s14.directupload.net/images/121012/p2otvkuz.png", "gs_rankings"]],
				[QT.Lang[lID].qm_sub_map_gi, "http://s14.directupload.net/images/130403/u33cb3b8.jpg", "",
					[QT.Lang[lID].qm_sub_stats_gi_p, "http://s1.directupload.net/images/121012/8xgicpg7.png", "gi_player"],
					[QT.Lang[lID].qm_sub_stats_gi_a, "http://s7.directupload.net/images/121012/4kfl493a.png", "gi_alliance"],
					[QT.Lang[lID].qm_sub_stats_gi_tk, "http://s14.directupload.net/images/121012/p2otvkuz.png", "gi_topkillers"]]],
			[QT.Lang[lID].qm_sub_map, "http://s1.directupload.net/images/121012/4hbt2ofa.png", "",
				[QT.Lang[lID].qm_sub_map_gm, "http://s1.directupload.net/images/121012/4hbt2ofa.png", "maps_grepomaps"],
				[QT.Lang[lID].qm_sub_map_gi, "http://s14.directupload.net/images/130403/u33cb3b8.jpg", "maps_grepointel"]],
			[QT.Lang[lID].qm_sub_ps, "http://s14.directupload.net/images/121012/vlnknenk.png", "",
				[QT.Lang[lID].qm_sub_ps_gf, "http://s14.directupload.net/images/121012/vlnknenk.png", "grepofinder"]],
			[QT.Lang[lID].qm_sub_bb, "http://s14.directupload.net/images/140124/8tzken7v.png", "",
				[QT.Lang[lID].bbcode_truppen, "http://s1.directupload.net/images/121012/a2w2xe8r.png", "",
					[QT.Lang[lID].qm_sub_bb_in, "http://s14.directupload.net/images/140124/8tzken7v.png", "bbcode_intown"],
					[QT.Lang[lID].qm_sub_bb_from, "http://s14.directupload.net/images/140124/8tzken7v.png", "bbcode_fromtown"]], //[QT.Lang[lID].qm_sub_bb_outer, "http://s14.directupload.net/images/140124/8tzken7v.png", "bbcode_outer"]
				[QT.Lang[lID].bbcode_staedte, "http://s7.directupload.net/images/140121/3l6c8vw4.png", "",
					[QT.Lang[lID].bbcode_alle, "http://s14.directupload.net/images/140124/8tzken7v.png", "bbcode_cities_all"],
					[QT.Lang[lID].bbcode_activegrp, "http://s14.directupload.net/images/140124/8tzken7v.png", "bbcode_cities_grp"]],
				[QT.Lang[lID].bbcode_gebaeude, "http://cdn.grepolis.com/images/game/overviews/main_20x20.png", "bbcode_buildings"]],
			[QT.Lang[lID].qm_sub_other_an, "http://s7.directupload.net/images/121012/2erjlsv4.png", "",
				[QT.Lang[lID].qm_sub_other_an_vb, "http://s7.directupload.net/images/121012/2erjlsv4.png", "fullscreenmode"]],
			[QT.Lang[lID].qm_sub_tools_uv, "http://s7.directupload.net/images/121012/xli4g4p8.png", "unitcomparison"],
			[QT.Lang[lID].qm_sub_tools_gd, "http://s14.directupload.net/images/121012/cbromm2l.png", "googledocs"],
			[QT.Lang[lID].qm_sub_other_ss, "http://s14.directupload.net/images/130418/rpccjan7.png", "statsandscripts"],
			[QT.Lang[lID].qm_sub_other_ei, "http://s14.directupload.net/images/121012/xg4fgyo5.png", "scriptsettings"]
		];

		var qtbox_main_items = [];
		var qt_mainmenu_content_h = -12;
		qt_mainmenu_content_h -= 18;
		$.each(qtbox_main_array, function (i, e) {
			qt_mainmenu_content_h -= 12;
			qtbox_main_items.push('<li><div class="qmenu_nav_cat" style="background-image: url(' + e[1] + ')"><span id="' + e[2] + '">' + e[0] + '</span></div>');
			if (e.length > 3) {
				qtbox_main_items.push("<span class='qmenu_arrow_span'> &#9658;</span>");
				qtbox_main_items.push('<ul class="qmenu_window"><li class="qmenu_window_first"></li>');
				$.each(e.slice(3), function (j, f) {
					qtbox_main_items.push('<li><div class="qmenu_nav_cat" style="background-image: url(' + f[1] + ')"><span id="' + f[2] + '">' + f[0] + '</span></div>');
					if (f.length > 3) {
						qtbox_main_items.push("<span class='qmenu_arrow_span'> &#9658;</span>");
						qtbox_main_items.push('<ul class="qmenu_window"><li class="qmenu_window_first"></li>');
						$.each(f.slice(3), function (k, g) {
							qtbox_main_items.push('<li><div class="qmenu_nav_cat" style="background-image: url(' + g[1] + ')"><span id="' + g[2] + '">' + g[0] + '</span></div>');
							qtbox_main_items.push('</li>');
						});
						qtbox_main_items.push('<li class="qmenu_window_last"></li></ul>');
					}
					qtbox_main_items.push('</li>');
				});
				qtbox_main_items.push('<li class="qmenu_window_last"></li></ul>');
			}
			qtbox_main_items.push('</li>');
		});
		$('#qt_mainmenu_list').append(qtbox_main_items.join(''));
		$('.qmenu_nav_cat span').click(function () {
			if ($(this).prop("id").length > 0) {
				QT.Functions[this.id]();
				$("#qtbox_main_btn").click();
			}
		});

		$("#qt_mainmenu_list").css({
			"display" : "none",
			"height" : "100%",
			"text-align" : "left",
			"padding" : "10px 0px 5px 0px"
		});
		$("#qt_mainmenu_list li").css({
			"background" : "none",
			"height" : "12px"
		});
		$(".qmenu_nav_cat").css({
			"display" : "block",
			"width" : "9px",
			"height" : "10px",
			"margin-top" : "1px",
			"padding" : "0px 5px",
			"background-size" : "10px 9px",
			"float" : "left",
			"background-repeat" : "no-repeat",
			"background-position" : "center 2px"
		});
		$(".qmenu_nav_cat span").css({
			"width" : "114px",
			"padding-left" : "14px",
			"display" : "block"
		});
		$(".qmenu_arrow_span").css({
			"position" : "absolute",
			"right" : "5px"
		});
		$(".qmenu_window").css({
			"display" : "none",
			"position" : "absolute",
			"left" : "135px",
			"top" : "-8px",
			"width" : "142px",
			"background" : "url(http://s7.directupload.net/images/140120/6waopcew.png)"
		});
		$(".qmenu_window ul").css({
			"z-index" : "3"
		});
		$(".qmenu_window li").css({
			"padding-left" : "3px"
		});
		$(".qmenu_window_first").css({
			"height" : "10px",
			"width" : "142px",
			"padding" : "0",
			"margin-top" : "-2px",
			"background" : "url(http://s7.directupload.net/images/140119/gxng9w7z.png)"
		});
		$(".qmenu_window_last").css({
			"height" : "8px",
			"width" : "142px",
			"padding" : "0",
			"margin-top" : "2px",
			"background" : "url(http://s1.directupload.net/images/140119/y7dq3n8j.png)"
		});

		$("#qt_mainmenu_list li").hover(function () {
			$(this).children("ul").show();
		}, function () {
			$(this).children("ul").hide();
		}); //
		$("#qtbox_main_btn").click(function () {
			if ($("#qt_mainmenu_list").is(':hidden')) {
				$('#qt_mainmenu_top').css({
					"margin-top" : "-26px"
				});
				$('#qt_mainmenu_top').animate({
					marginTop : qt_mainmenu_content_h + "px"
				}, 400);
			} else {
				$('#qt_mainmenu_top').animate({
					marginTop : "-12px"
				}, 400);
			}
			$("#qt_mainmenu_list").slideToggle();
		});

		//http://s1.directupload.net/images/131007/lmgv3ubf.png
		//$('#ui_box .nui_left_box').append('<div id="qtbar_wrapper" style="position: absolute; width: 143px; height: 32px; top: 191px; background:url(http://s1.directupload.net/images/131031/u9atg7v6.png) no-repeat"></div>');
		//$('#ui_box .nui_main_menu').css({"top": "+=32px"});

		// Buttonbox
		if (QT.Settings.values.qmenu_settings_buttonbar) {
			$('#qtbox_wrapper').append('<div id="qtbox_buttons_wrapper" style="display: block; position: relative; height: 26px; width: 100%; bottom: 0px; background:url(http://s7.directupload.net/images/131007/wh2uwdro.png) no-repeat"></div>');
			$('#ui_box .nui_main_menu .bottom, #ui_box .nui_main_menu .leaves').css({
				"bottom" : "-=27px"
			});
			$('#qtbox_buttons_wrapper').append('\
																																				<a id="qtbox_button1" class="qtbox_button" style="display: block; position: absolute; width: 24px; height: 22px; margin: 1px 0 0 3px;" target="_blank" href="' + QT.Links.GS_Spieler + '"><img src="http://s1.directupload.net/images/131008/ktvkyrx8.png"></a>\
																																				<a id="qtbox_button2" class="qtbox_button" style="display: block; position: absolute; width: 24px; height: 22px; margin: 1px 0 0 29px;" target="_blank" href="' + QT.Links.GrepoIntelPlayer + '"><img src="http://s1.directupload.net/images/131008/2hr8vbhw.png"></a>\
																																				<a id="qtbox_button3" class="qtbox_button" style="display: block; position: absolute; width: 24px; height: 22px; margin: 1px 0 0 55px;" target="_blank" href="' + QT.Links.GrepoBash + '"><img src="http://s14.directupload.net/images/131008/wfe9ficd.png"></a>\
																																				<a id="qtbox_button4" class="qtbox_button" style="display: block; position: absolute; width: 24px; height: 22px; margin: 1px 0 0 81px;" target="_blank" href="' + QT.Links.GrepoMaps + '"><img src="http://s7.directupload.net/images/131007/hdh4farx.png"></a>\
																																				<a id="qtbox_button5" class="qtbox_button" style="display: block; position: absolute; width: 24px; height: 22px; margin: 1px 0 0 107px;" target="_blank" href="' + QT.Links.Grepofinder + '"><img src="http://s7.directupload.net/images/131008/k5uwtmfr.png"></a>\
																																			');
			$('#qtbox_button1').mousePopup(new uw.MousePopup("Grepolis Stats"));
			$('#qtbox_button2').mousePopup(new uw.MousePopup("Grepolis Intel"));
			$('#qtbox_button3').mousePopup(new uw.MousePopup("Grepolis Bash"));
			$('#qtbox_button4').mousePopup(new uw.MousePopup("Grepolis Maps"));
			$('#qtbox_button5').mousePopup(new uw.MousePopup("Grepolis Finder"));
			//<a id="qtbox_button4" class="qtbox_button" style="display: block; position: absolute; width: 24px; height: 22px; margin: 1px 0 0 81px;" target="_blank" href="'+qmenu_links.Polissuche_faark+'"><img src="http://s7.directupload.net/images/131008/5zj4ujmi.png"></a>
			$(".qtbox_button").hover(
				function () {
				$(this).css({
					"background" : "url(http://s7.directupload.net/images/131008/vyhnznhd.png)"
				});
			},
				function () {
				$(this).css({
					"background" : "none"
				});
			});
		}
		//Online Counter
		if (QT.Settings.values.qmenu_settings_counter) {
			$('#qtbox_wrapper').append('<div id="qtbox_clock_wrapper" style="display: block; position: relative; height: 21px; width: 100%; background:url(http://s7.directupload.net/images/131007/desspey5.png) no-repeat"><a id="qt_clock_clock" style="display: block; position: absolute; height: 17px; background: url(http://s7.directupload.net/images/131007/qqcsqnfm.png) no-repeat scroll 0px 2px transparent; margin-left: 5px; width: 127px;" href="#"><span id="qt_clock_span" style="display: block; color: #EEDDBB; font-size: 9px; width: 110px; position: absolute; bottom: 2px; margin-left: 10px;"></span></a></div>');
			$('#ui_box .nui_main_menu .bottom, #ui_box .nui_main_menu .leaves').css({
				"bottom" : "-=21px"
			});

			$("#qt_clock_clock").click(function () {
				(counterview === 0) ? counterview = 1 : counterview = 0;
			});
			sec = -1;
			min = 0;
			hour = 0;
			counterview = 0;
			function counttime() {
				QT.Settings.values.onlinetotal++;
				sec++;
				if (sec === 60) {
					sec = 0;
					min = min + 1;
				}
				if (min === 60) {
					min = 0;
					hour += 1;
				}
				var hour_total = parseInt(QT.Settings.values.onlinetotal / 3600);
				var min_total = parseInt(QT.Settings.values.onlinetotal / 60 - hour_total * 60);
				var sec_total = QT.Settings.values.onlinetotal - (hour_total * 3600) - (min_total * 60);
				if (counterview === 0) {
					timer = QT.Lang[lID].onlinecounter_span_session + ((hour <= 9) ? "0" + hour : hour) + ":" + ((min <= 9) ? "0" + min : min) + ":" + ((sec <= 9) ? "0" + sec : sec);
				} else if (counterview === 1) {
					timer = QT.Lang[lID].onlinecounter_span_total + ((hour_total <= 9) ? "0" + hour_total : hour_total) + ":" + ((min_total <= 9) ? "0" + min_total : min_total) + ":" + ((sec_total <= 9) ? "0" + sec_total : sec_total);
				}
				if (!QT.Settings.values.qmenu_settings_counter_aktiv) {
					GM_setValue("onlinetotal", QT.Settings.values.onlinetotal);
				}
				$("#qt_clock_span").html(timer);
				window.setTimeout(function () {
					counttime();
				}, 1000);
			}
			counttime();
		}
	},
	townBBcodeBTN : function () {
		$('<a id="BTN_TownBB" href="#"></a><input id="INPUT_TownBB" type="text" onfocus="this.select();" onclick="this.select();">').appendTo('.town_name_area');
		$("#BTN_TownBB").css({
			"z-index" : "5",
			"top" : "56px",
			"left" : "95px",
			"position" : "absolute",
			"height" : "16px",
			"width" : "18px",
			"background-image" : "url(http://s14.directupload.net/images/131121/eif6bq74.png)",
			"background-repeat" : "no-repeat",
			"background-position" : "0px 0px"
		});
		$("#INPUT_TownBB").css({
			"z-index" : "5",
			"top" : "29px",
			"left" : "21px",
			"position" : "absolute",
			"width" : "160px",
			"display" : "none",
			"text-align" : "center"
		});
		$("#BTN_TownBB").click(function () {
			$("#INPUT_TownBB").toggle();
			$("#INPUT_TownBB").val("[town]" + uw.Game.townId + "[/town]");
		});
		$("#BTN_TownBB").hover(
			function () {
			$(this).css({
				"background-position" : "0px -16px"
			});
		},
			function () {
			$(this).css({
				"background-position" : "0px 0px"
			});
		});
	},
	hotkeys : function () {
		// Hotkey Button
		if (QT.Settings.values.qmenu_settings_hotkey_anzeige) {
			$('<a id="BTN_HK" style="z-index:6;position:absolute;top:3px;left:366px;" href="#"><img src="http://s14.directupload.net/images/131128/88q6ajaa.png" style="border-width: 0px" /></a></a>').appendTo('#ui_box');
			$('#BTN_HK').mousePopup(new uw.MousePopup(QT.Lang[lID].mo_HK));
		}
		$(document).keydown(function (hk) {
			var notTheseOnes = ['textarea', 'input'];
			var target = hk.target.tagName.toLowerCase();
			//Stadt wechseln
			//if (hk.keyCode == 37 && $.inArray(target,notTheseOnes) < 0) {uw.HelperTown.switchToPreviousTown();}
			//if (hk.keyCode == 39 && $.inArray(target,notTheseOnes) < 0) {uw.HelperTown.switchToNextTown();}
			// Stadtsprung
			if (hk.keyCode == 13 && $.inArray(target, notTheseOnes) < 0) {
				uw.WMap.mapJump({
					'id' :  + uw.Game.townId,
					'ix' : uw.WMap.islandPosition.x,
					'iy' : uw.WMap.islandPosition.y
				});
			}
			// Verwalter
			if (hk.keyCode == 49 && $.inArray(target, notTheseOnes) < 0) {
				uw.TownOverviewWindowFactory.openTradeOverview();
			}
			if (hk.keyCode == 50 && $.inArray(target, notTheseOnes) < 0) {
				uw.TownOverviewWindowFactory.openCommandOverview();
			}
			if (hk.keyCode == 51 && $.inArray(target, notTheseOnes) < 0) {
				uw.TownOverviewWindowFactory.openMassRecruitOverview();
			}
			if (hk.keyCode == 52 && $.inArray(target, notTheseOnes) < 0) {
				uw.TownOverviewWindowFactory.openUnitsOverview();
			}
			if (hk.keyCode == 53 && $.inArray(target, notTheseOnes) < 0) {
				uw.TownOverviewWindowFactory.openOuterUnitsOverview();
			}
			if (hk.keyCode == 54 && $.inArray(target, notTheseOnes) < 0) {
				uw.TownOverviewWindowFactory.openBuildingsOverview();
			}
			if (hk.keyCode == 55 && $.inArray(target, notTheseOnes) < 0) {
				uw.TownOverviewWindowFactory.openCultureOverview();
			}
			if (hk.keyCode == 56 && $.inArray(target, notTheseOnes) < 0) {
				uw.TownOverviewWindowFactory.openGodsOverview();
			}
			if (hk.keyCode == 57 && $.inArray(target, notTheseOnes) < 0) {
				uw.TownOverviewWindowFactory.openHidesOverview();
			}
			if (hk.keyCode == 48 && $.inArray(target, notTheseOnes) < 0) {
				uw.TownOverviewWindowFactory.openTownGroupOverview();
			}
			if (hk.keyCode == 63 && $.inArray(target, notTheseOnes) < 0 || hk.keyCode == 219 && $.inArray(target, notTheseOnes) < 0) {
				uw.TownOverviewWindowFactory.openTownsOverview();
			}
			if (hk.keyCode == 192 && $.inArray(target, notTheseOnes) < 0 || hk.keyCode == 221 && $.inArray(target, notTheseOnes) < 0) {
				uw.AttackPlannerWindowFactory.openAttackPlannerWindow();
			}
			if (hk.keyCode == 88 && $.inArray(target, notTheseOnes) < 0) {
				uw.FarmTownOverviewWindowFactory.openFarmTownOverview();
			}
			// Andere
			if (hk.keyCode == 83 && $.inArray(target, notTheseOnes) < 0) {
				uw.TownIndexWindowFactory.openTownIndexWindow();
			}
			if (hk.keyCode == 82 && $.inArray(target, notTheseOnes) < 0) {
				uw.RankingWindowFactory.openRankingWindow();
			}
			if (hk.keyCode == 66 && $.inArray(target, notTheseOnes) < 0) {
				uw.Layout.wnd.Create(uw.GPWindowMgr.TYPE_REPORT, ' ');
			}
			if (hk.keyCode == 78 && $.inArray(target, notTheseOnes) < 0) {
				uw.Layout.wnd.Create(uw.GPWindowMgr.TYPE_MESSAGE, ' ');
			}
			if (hk.keyCode == 65 && $.inArray(target, notTheseOnes) < 0) {
				uw.Layout.wnd.Create(uw.GPWindowMgr.TYPE_ALLIANCE);
			}
			if (hk.keyCode == 70 && $.inArray(target, notTheseOnes) < 0) {
				uw.Layout.allianceForum.open();
			}
			if (hk.keyCode == 69 && $.inArray(target, notTheseOnes) < 0) {
				uw.Layout.wnd.Create(uw.GPWindowMgr.TYPE_PLAYER_SETTINGS, ' ');
			}
			if (hk.keyCode == 80 && $.inArray(target, notTheseOnes) < 0) {
				uw.Layout.wnd.Create(uw.GPWindowMgr.TYPE_PLAYER_PROFILE_EDIT, ' ');
			}
			if (hk.keyCode == 77 && $.inArray(target, notTheseOnes) < 0) {
				uw.Layout.showMemoWindow();
			}
			if (hk.keyCode == 76 && $.inArray(target, notTheseOnes) < 0) {
				uw.Layout.wnd.Create(uw.GPWindowMgr.TYPE_CHAT, ' ');
			}
			if (hk.keyCode == 72 && $.inArray(target, notTheseOnes) < 0) {
				uw.HeroesWindowFactory.openHeroesWindow();
			}
			//Mit Enter Silber einlagern
			/*if (hk.keyCode == 13 && hk.target.id === "hide_order_input") {
			$("#hide_order_confirm").click();
			}*/
		});
	},
	commandOverview : function (a, b, c) {
		var d = b.responseText.match(/{(.+)}/);
		var e = $.parseJSON("{" + d[1] + "}");
		if (e.json.data != undefined) {
			if (e.json.data.total_commands.length > 0)
				$("#place_defense .game_border .game_header").html($("#place_defense .game_border .game_header").html().split(" (")[0] + " (" + e.json.data.total_commands + ")");
			var f = {
				attack_land : 0,
				support : 0,
				attack_sea : 0,
				attack_spy : 0,
				farm_attack : 0,
				abort : 0,
				attack_takeover : 0
			};
			for (var g = 0; g < e.json.data.total_commands.length; g++)
				f[e.json.data.commands[g].type]++;
			var h = $("div .support_filter");
			$(h[0]).mousePopup(new unsafeWindow.MousePopup("Befehle: " + f.attack_land));
			$(h[1]).mousePopup(new unsafeWindow.MousePopup("Befehle: " + f.support));
			$(h[2]).mousePopup(new unsafeWindow.MousePopup("Befehle: " + f.attack_sea));
			$(h[3]).mousePopup(new unsafeWindow.MousePopup("Befehle: " + f.attack_spy));
			$(h[4]).mousePopup(new unsafeWindow.MousePopup("Befehle: " + f.farm_attack));
			$(h[5]).mousePopup(new unsafeWindow.MousePopup("Befehle: " + f.abort));
			$(h[6]).mousePopup(new unsafeWindow.MousePopup("Befehle: " + f.attack_takeover))
		}
	},
	cultureOverview : function () {
		var a = $("ul#cultur_overview_towns");
		var b,
		c,
		d,
		e;

		e = 0;
		b = $('a[class~="confirm"][class~="type_triumph"]');
		d = $('a[class~="confirm"][class~="type_triumph"][class~="disabled"]');
		if (d.length > 0) {
			for (var f = 0; f < b.length; f++) {
				if ($(b[f]).attr("class").indexOf("disabled") > 1)
					continue;
				c = $(b[f]).parents('li[id^="ov_town_"]');
				eltext = c[0].previousSibling;
				$(c).insertBefore($(d[0]).parents('li[id^="ov_town_"]'));
				$(eltext).insertBefore($(d[0]).parents('li[id^="ov_town_"]'))
			}
		}

		e = 0;
		b = $('a[class~="confirm"][class~="type_theater"]');
		d = $('a[class~="confirm"][class~="type_theater"][class~="disabled"]');
		if (d.length > 0) {
			for (var f = 0; f < b.length; f++) {
				if ($(b[f]).attr("class").indexOf("disabled") > 1)
					continue;
				c = $(b[f]).parents('li[id^="ov_town_"]');
				eltext = c[0].previousSibling;
				$(c).insertBefore($(d[0]).parents('li[id^="ov_town_"]'));
				$(eltext).insertBefore($(d[0]).parents('li[id^="ov_town_"]'))
			}
		}

		e = 0;
		b = $('a[class~="confirm"][class~="type_party"]');
		d = $('a[class~="confirm"][class~="type_party"][class~="disabled"]');
		if (d.length > 0) {
			for (var f = 0; f < b.length; f++) {
				if ($(b[f]).attr("class").indexOf("disabled") > 1)
					continue;
				c = $(b[f]).parents('li[id^="ov_town_"]');
				eltext = c[0].previousSibling;
				$(c).insertBefore($(d[0]).parents('li[id^="ov_town_"]'));
				$(eltext).insertBefore($(d[0]).parents('li[id^="ov_town_"]'))
			}
		}

		var g = $("ul#culture_overview_towns span.eta");
		var h = $("#culture_points_overview_bottom #place_culture_count").text();
		if (h.indexOf("[") < 1) {
			var i = h.split("/");
			var j = parseInt(i[0]) + g.length;
			var k = parseInt(i[1]) - j;
			if (k > 0) {
				$("#culture_points_overview_bottom #place_culture_count").append("<span id='qculture'>[-" + k + "]</span>");
			} else {
				var l = new Array;
				for (var f = 0; f < g.length; f++)
					l.push($(g[f]).text());
				l.sort();
				var m = l[l.length + k - 1];
				$("#culture_points_overview_bottom #place_culture_count").append(" [<span id='qculture'></span>]<span id='qcultureplus' style='color: #ECB44D'> +" + k * -1 + "</span>").find("span#qculture").countdown(m);
			}
		} else {
			var i = h.split("/");
			var j = parseInt(i[0]) + g.length;
			var k = parseInt(i[1]) - j;
			if (k > 0) {
				$("#qculture").text("[-" + k + "]");
			} else {
				uw.CultureOverview.wnd.reloadContent();
			}
		}

		if ($('#qcultureBTN_wrapper').length == 0) {
			$("#culture_overview_wrapper").parent().append('<div id="qcultureBTN_wrapper"><div id="qcultureBTN_theather" class="qcultureBTN"></div><div id="qcultureBTN_triumph" class="qcultureBTN"></div><div id="qcultureBTN_olympicgames" class="qcultureBTN"></div><div id="qcultureBTN_cityfestival" class="qcultureBTN"></div></div>');
			$("#culture_overview_wrapper").css({
				"top" : "35px",
				"height" : "370px"
			});
			$("#qcultureBTN_wrapper").css({
				"top" : "0px",
				"right" : "0px",
				"position" : "absolute",
				"color" : "white",
				"font-family" : "Verdana",
				"font-weight" : "bold",
				"font-size" : "12px",
				"text-align" : "center",
				"line-height" : "25px",
				"text-shadow" : "1px 1px 0 #000000"
			});
			$(".qcultureBTN").css({
				"cursor" : "pointer",
				"width" : "25px",
				"height" : "25px",
				"float" : "right",
				"position" : "relative",
				"margin-left" : "3px",
				"border" : "2px groove gray",
				"background" : "url(http://s7.directupload.net/images/140221/lztu5tha.png)"
			});
			$("#qcultureBTN_cityfestival").css({
				"background-position" : "0 -100px"
			});
			$("#qcultureBTN_olympicgames").css({
				"background-position" : "0 -25px"
			});
			$("#qcultureBTN_triumph").css({
				"background-position" : "0 -75px"
			});
			$("#qcultureBTN_theather").css({
				"background-position" : "0 -50px"
			});
		}

		var qcultureCounter = {
			cityfestivals : 0,
			olympicgames : 0,
			triumph : 0,
			theather : 0
		};

		var qbashpoints = $("#culture_points_overview_bottom .points_count").text().split("/");
		var qgoldforgames = Math.floor($("#ui_box .gold_amount").text() / 50);
		qcultureCounter.triumph = Math.floor((parseInt(qbashpoints[0]) - parseInt(qbashpoints[1])) / 300) + 1;
		if (qcultureCounter.triumph < 0) {
			qcultureCounter.triumph = 0;
		}
		qcultureCounter.cityfestivals = $('a[class~="confirm"][class~="type_party"]:not(.disabled)').length;
		qcultureCounter.olympicgames = $('a[class~="confirm"][class~="type_games"]:not(.disabled)').length;
		if (qgoldforgames < qcultureCounter.olympicgames) {
			qcultureCounter.olympicgames = qgoldforgames;
		}
		qcultureCounter.theather = $('a[class~="confirm"][class~="type_theater"]:not(.disabled)').length;

		$("#qcultureBTN_cityfestival").text(qcultureCounter.cityfestivals).mousePopup(new uw.MousePopup(QT.Lang[lID].qculture_cityfestivals));
		$("#qcultureBTN_olympicgames").text(qcultureCounter.olympicgames).mousePopup(new uw.MousePopup(QT.Lang[lID].qculture_olympicgames));
		$("#qcultureBTN_triumph").text(qcultureCounter.triumph).mousePopup(new uw.MousePopup(QT.Lang[lID].qculture_triumph));
		$("#qcultureBTN_theather").text(qcultureCounter.theather).mousePopup(new uw.MousePopup(QT.Lang[lID].qculture_theater));
	},
	allianceGSButton : function (event, xhr, settings) {
		var b = settings.url.match(/alliance_id%22%3A(\d*)%2C/);
		var c = uw.GPWindowMgr.getOpenFirst(uw.Layout.wnd.TYPE_ALLIANCE_PROFILE);
		if (!c)
			return;
		var d = $("DIV#gpwnd_" + c.getID() + " DIV#player_buttons ");
		$(d[0]).append("<a target=_blank href=http://" + lID + ".grepostats.com/world/" + wID + "/alliance/" + b[1] + '><img src="http://s14.directupload.net/images/120328/kxn3oknc.png"></a>')
	},
	playerGSButton : function (event, xhr, settings) {
		var b = settings.url.match(/player_id%22%3A(\d*)%2C/);
		var c = uw.GPWindowMgr.getOpenFirst(uw.Layout.wnd.TYPE_PLAYER_PROFILE);
		if (!c)
			return;
		var d = $("DIV#gpwnd_" + c.getID() + " DIV#player_buttons ");
		$(d[0]).append("<a target=_blank href=http://" + lID + ".grepostats.com/world/" + wID + "/player/" + b[1] + '><img src="http://s14.directupload.net/images/120328/kxn3oknc.png"></a>')
	},
	townGSButton : function () {
		var b = uw.GPWindowMgr.getOpen(uw.Layout.wnd.TYPE_TOWN);
		if (b.length == 0)
			return;
		wnd = b[b.length - 1];
		var c = wnd.getID();
		var d = $("DIV#gpwnd_" + c + " DIV#towninfo_towninfo UL.game_list DIV.list_item_right SPAN.gt_gsbutton");
		if (d.length > 0)
			return;
		var e = $("DIV#gpwnd_" + c + " DIV#towninfo_towninfo A.gp_player_link").attr("href");
		var f = e.split(/#/);
		var g = $.parseJSON(atob(f[1] || f[0]));
		var h = window.location.host.replace(/.grepolis.com.*$/, "");
		var i = h.replace(/\d+/, "");
		var j = $("DIV#gpwnd_" + c + " DIV#towninfo_towninfo UL.game_list DIV.list_item_right");
		$(j[1]).append('<span class="gt_gsbutton"><a target="_blank" href="http://' + i + ".grepostats.com/world/" + h + "/player/" + g.id + '"><img src="http://s14.directupload.net/images/120328/kxn3oknc.png"></a></span>');
		$(j[1]).css("width", "100px");
		var k = $('DIV#gpwnd_' + c + ' a[onclick^="Layout.allianceProfile"]').attr("onclick").replace(")", "").split(",")[1];
		var l = $('DIV#gpwnd_' + c + ' a[onclick^="Layout.allianceProfile"]').parent().find(".list_item_right");
		l.prepend('<span class="gt_gsbutton"><a target="_blank" href="http://' + i + ".grepostats.com/world/" + h + "/alliance/" + k + '"><img src="http://s14.directupload.net/images/120328/kxn3oknc.png"></a></span>');
		l.css("width", "60px")
	},
	simulateView : function (b, c, d) {
		var e = c.responseText.match(/{(.+)}/);
		var f = $.parseJSON("{" + e[1] + "}");
		var g = {
			wood : 0,
			stone : 0,
			iron : 0,
			favor : 0,
			pop : 0
		};
		var h = {
			wood : 0,
			stone : 0,
			iron : 0,
			favor : 0,
			pop : 0
		};
		units = uw.GameData.units;
		for (unit in units) {
			if (unit != "militia") {
				h.wood += units[unit].resources.wood * f.json.att_losses[unit];
				h.stone += units[unit].resources.stone * f.json.att_losses[unit];
				h.iron += units[unit].resources.iron * f.json.att_losses[unit];
				h.favor += units[unit].favor * f.json.att_losses[unit];
				h.pop += units[unit].population * f.json.att_losses[unit]
			}
		}
		for (unit in units) {
			if (unit != "militia") {
				g.wood += units[unit].resources.wood * f.json.def_losses[unit];
				g.stone += units[unit].resources.stone * f.json.def_losses[unit];
				g.iron += units[unit].resources.iron * f.json.def_losses[unit];
				g.favor += units[unit].favor * f.json.def_losses[unit];
				g.pop += units[unit].population * f.json.def_losses[unit]
			}
		}

		if ($("#q_place_sim_lost_res").length > 0) {
			$("#q_place_sim_lost_res").remove();
		}
		$(".place_sim_wrap_mods").append('\
																																						<table id="q_place_sim_lost_res" class="place_simulator_table" cellspacing="0" cellpadding="0">\
																																						<tbody>\
																																						<tr>\
																																							<td class="place_simulator_even" style="width:18px"></td>\
																																							<td class="place_simulator_odd"><span class="q_place_simulator_tableheader" style="background-image:url(http://cdn.grepolis.com/images/game/res/wood.png)"></span></td>\
																																							<td class="place_simulator_even"><span class="q_place_simulator_tableheader" style="background-image:url(http://cdn.grepolis.com/images/game/res/stone.png)"></span></td>\
																																							<td class="place_simulator_odd"><span class="q_place_simulator_tableheader" style="background-image:url(http://cdn.grepolis.com/images/game/res/iron.png)"></span></td>\
																																							<td class="place_simulator_even"><span class="q_place_simulator_tableheader" style="background-image:url(http://cdn.grepolis.com/images/game/res/favor.png)"></span></td>\
																																							<td class="place_simulator_odd"><span class="q_place_simulator_tableheader" style="background-image:url(http://cdn.grepolis.com/images/game/res/pop.png)"></span></td>\
																																						</tr>\
																																						<tr>\
																																							<td class="place_simulator_even"><div class="place_symbol place_att"></div></td>\
																																							<td class="place_simulator_odd">' + h.wood + '</td>\
																																							<td class="place_simulator_even">' + h.stone + '</td>\
																																							<td class="place_simulator_odd">' + h.iron + '</td>\
																																							<td class="place_simulator_even">' + h.favor + '</td>\
																																							<td class="place_simulator_odd">' + h.pop + '</td>\
																																						</tr>\
																																						<tr>\
																																							<td class="place_simulator_even"><div class="place_symbol place_def"></div></td>\
																																							<td class="place_simulator_odd">' + g.wood + '</td>\
																																							<td class="place_simulator_even">' + g.stone + '</td>\
																																							<td class="place_simulator_odd">' + g.iron + '</td>\
																																							<td class="place_simulator_even">' + g.favor + '</td>\
																																							<td class="place_simulator_odd">' + g.pop + '</td>\
																																						</tr>\
																																						</tbody></table>');
		$(".q_place_simulator_tableheader").css({
			"background-repeat" : "no-repeat",
			"background-position" : "center center",
			"background-size" : "20px 20px",
			"width" : "100%",
			"height" : "20px",
			"display" : "block"
		});
		$("#q_place_sim_lost_res").css({
			"min-width" : "273px",
			"align" : "center",
			"margin-bottom" : "-16px",
			"margin-top" : "8px"
		});
		$("#q_place_sim_lost_res td:not(:first-child)").css({
			"border-left" : "1px solid #BFA978",
			"text-align" : "center"
		});
		$(".place_sim_showhide").css({
			"position" : "absolute",
			"margin-left" : "277px",
			"margin-top" : "-24px"
		});
	},
	academyMarker : function () {
		var wndID = uw.BuildingWindowFactory.getWnd().getID();
		var qacmarkDIV = '<div class="qacamark green" style="width: 100%; height: 100%; position: absolute; background: none repeat scroll 0% 0% green; top: -3px; left: -3px; border: 3px solid green; opacity: 0.4"></div>';
		$("DIV#gpwnd_" + wndID).append('<div id="qacacountWrapper"><div id="qacacountGreen" class="qacacountBox" style="margin-left:25px">0</div><div id="qacacountRed" class="qacacountBox" style="margin-left:70px">0</div><a id="qacamarkResearched" class="qacaBTN green" style="left:104px; background-image: url(http://s1.directupload.net/images/130904/2tny5dlh.png)" href="#"></a><a id="qacamarkNotResearched" class="qacaBTN green" style="left:124px; background-image: url(http://s7.directupload.net/images/130904/pkeasgik.png)" href="#"></a><a id="qacamarkNone" class="qacaBTN" style="left:144px; background-image: url(http://s1.directupload.net/images/130904/yothfag9.png)" href="#"></a></div>');
		$("#qacacountWrapper").css({
			"margin" : " 0px auto",
			"display" : "block",
			"position" : "relative",
			"height" : "35px",
			"width" : "172px",
			"background-image" : "url(http://s7.directupload.net/images/130924/wvvkhpvh.png)"
		});
		$(".qacacountBox").css({
			"margin-top" : "12px",
			"font" : "bold 11px Verdana",
			"position" : "absolute",
			"display" : "block"
		});
		$(".qacaBTN").css({
			"width" : "20px",
			"height" : "20px",
			"margin-top" : "8px",
			"position" : "absolute",
			"display" : "block"
		});
		$(".academy_info").css({
			"z-index" : "1"
		});
		$(".qacaBTN").hover(
			function () {
			$(this).css({
				"background-position" : "0px -21px"
			});
		},
			function () {
			$(this).css({
				"background-position" : "0px 0px"
			});
		});
		$('#qacamarkResearched').mousePopup(new uw.MousePopup(QT.Lang[lID].aka_researched));
		$('#qacamarkNotResearched').mousePopup(new uw.MousePopup(QT.Lang[lID].aka_notresearched));
		$('#qacamarkNone').mousePopup(new uw.MousePopup(QT.Lang[lID].aka_aufheben));
		function resetSelected() {
			$(".qacamark").each(function () {
				$(this).remove();
			});
			researchPoints = {
				"red" : 0,
				"green" : 0,
				"blue" : 0
			};
			researchSelected = {};
			UpdateResearchPointsText();
			$("#qacamarkResearched").removeClass().addClass("qacaBTN green").css({
				"background-image" : "url(" + qacaBTNpics.qacamarkResearched[0] + ")"
			});
			$("#qacamarkNotResearched").removeClass().addClass("qacaBTN green").css({
				"background-image" : "url(" + qacaBTNpics.qacamarkNotResearched[0] + ")"
			});
		};
		function GetResearchColorPoints() {
			researchPoints = {
				"red" : 0,
				"green" : 0,
				"blue" : 0
			};
			$(".qacamark").each(function () {
				var thisColor = $(this).attr('class').split(' ').pop();
				researchPoints[thisColor] += uw.GameData.researches[$(this).parent().attr('id').substr(17)].research_points;
			});
		};
		function UpdateResearchPointsText() {
			$("#qacacountRed").text(researchPoints.red);
			$("#qacacountGreen").text(researchPoints.green);
			$("#qacacountBlue").text(researchPoints.blue + "/120");
		};
		function SafeResearchColor() {
			$(".qacamark").each(function () {
				var thisColor = $(this).attr('class').split(' ').pop();
				researchSelected[$(this).parent().attr('id')] = thisColor;
			});
		};
		function ChangeAllResearchColors(researchselector, color) {
			$("DIV#gpwnd_" + wndID + researchselector).each(function () {
				var thisParent = $(this).parent();
				if (!$(".qacamark", thisParent).length > 0 && color != "nocolor") {
					$(".academy_info", thisParent).after(qacmarkDIV);
				} else if (color === "nocolor") {
					$(".qacamark", thisParent).remove();
				}
				$(".qacamark", thisParent).removeClass().addClass("qacamark " + color).css({
					"background-color" : color,
					"border-color" : color
				});
			});
		};
		$(".qacaBTN").click(function () {
			var thisColor = $(this).attr('class').split(' ').pop();
			if (this.id != "qacamarkNone") {
				if (thisColor === "green") {
					$(this).removeClass("green").addClass("red").css({
						"background-image" : "url(" + qacaBTNpics[this.id][1] + ")"
					});
				} else if (thisColor === "red") {
					$(this).removeClass("red").addClass("nocolor").css({
						"background-image" : "url(" + qacaBTNpics[this.id][2] + ")"
					});
				} else if (thisColor === "nocolor") {
					$(this).removeClass("nocolor").addClass("green").css({
						"background-image" : "url(" + qacaBTNpics[this.id][0] + ")"
					});
				}
				if (this.id === "qacamarkResearched") {
					ChangeAllResearchColors(" .is_researched,.in_progress", thisColor);
				} else if (this.id === "qacamarkNotResearched") {
					ChangeAllResearchColors(" .can_be_researched,.can_not_be_researched_yet", thisColor);
				}
			} else {
				resetSelected();
			}
			GetResearchColorPoints();
			UpdateResearchPointsText();
			SafeResearchColor();
		});
		$("DIV#gpwnd_" + wndID + " .academy_info").click(function () {
			var thisParent = $(this).parent();
			if ($(".qacamark", thisParent).length > 0) {
				var $this = $(".qacamark", thisParent);
				if ($this.hasClass("green")) {
					$this.removeClass("green").addClass("red").css({
						"background-color" : "red",
						"border-color" : "red"
					});
				} else if ($this.hasClass("red")) {
					$this.remove();
				}
			} else {
				$(".academy_info", thisParent).after(qacmarkDIV);
			}
			GetResearchColorPoints();
			UpdateResearchPointsText();
			SafeResearchColor();
		});
		//init
		if (typeof researchSelected == "undefined") {
			researchSelected = {};
			researchPoints = {
				"red" : 0,
				"green" : 0,
				"blue" : 0
			};
			qacaBTNpics = {
				"qacamarkResearched" : ["http://s1.directupload.net/images/130904/2tny5dlh.png", "http://s14.directupload.net/images/130904/q3kd5re4.png", "http://s1.directupload.net/images/130904/w4juy8xf.png"],
				"qacamarkNotResearched" : ["http://s7.directupload.net/images/130904/pkeasgik.png", "http://s1.directupload.net/images/130904/qmzufy5p.png", "http://s1.directupload.net/images/130904/bt42389p.png"]
			}
		} else {
			$.each(researchSelected, function (key, value) {
				$("#" + key + " .academy_info").after(qacmarkDIV);
				$("#" + key + " .qacamark").removeClass("green").addClass(value).css({
					"background-color" : value,
					"border-color" : value
				});
			});
			UpdateResearchPointsText();
		}
	},
	hidesIndexIron : function () {
		if ($('#hide_espionage').length == 0)
			return;
		var b = uw.ITowns.getTown(parseInt(uw.Game.townId)).getCurrentResources().iron;
		if (b > 15e3) {
			$("#hide_espionage :input").val(b - 15e3);
			setTimeout(function () {
				$("#hide_espionage :input").select().blur();
			}, 10);
		} else {
			$("#hide_espionage :input").val("");
			setTimeout(function () {
				$("#hide_espionage :input").select().blur();
			}, 10);
		}
	},
	hidesIndexAddPoints : function () { //DEFEKT
		function addPoints(nStr) {
			nStr += '';
			x = nStr.split('.');
			x1 = x[0];
			x2 = x.length > 1 ? '.' + x[1] : '';
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + '.' + '$2');
			}
			return x1 + x2;
		}
		var hideSilver = $(".hide_storage_level").text();
		$(".hide_storage_level").text(addPoints(hideSilver));
	},
	hidesSort : function () {
		$("#hides_overview_wrapper").parent().parent().append('<div id="trade_control" class="overview_search_bar" style="width:741px;margin-left:16px">\
																																							<span class="grepo_input" style="margin:2px">\
																																							<span class="left"><span class="right">\
																																								<select name="qsort_towns" id="qsort_towns" type="text">\
																																									<option value="ironinstore">' + QT.Lang[lID].sort_ins + '</option>\
																																									<option value="name">' + QT.Lang[lID].sort_name + '</option>\
																																									<option value="wood">' + QT.Lang[lID].sort_holz + '</option>\
																																									<option value="stone">' + QT.Lang[lID].sort_stein + '</option>\
																																									<option value="iron">' + QT.Lang[lID].sort_silber + '</option>\
																																								</select>\
																																							</span></span></span>\
																																							<div id="qsortfilter"></div>\
																																							<div id="qsortinit" class="button_order_by active" style="margin: 3px 0 0 3px"></div>\
																																							<a id="qsorthelp" class="help" style="float:right;margin:2px" href="#"></a>\
																																						</div>\
																																						');
		$('#qsortfilter').css({
			"position" : "relative",
			"height" : "21px",
			"width" : "20px",
			"vertical-align" : "middle",
			"overlow" : "hidden",
			"display" : "inline-block",
			"cursor" : "pointer",
			"background" : "url(http://s1.directupload.net/images/130819/p7ddm23r.png) no-repeat scroll 0 0 transparent",
			"float" : "left",
			"margin" : "3px"
		});
		$('#hides_overview_towns').css({
			"margin-top" : "39px"
		});
		$('#qsorthelp').mousePopup(new uw.MousePopup(QT.Lang[lID].sort_help));
		var selection,
		order;
		var filterbox = '<div class="textbox initial-message qsortfilterbox" style="float:left;margin:2px"><div class="left"></div><div class="right"></div><div class="middle"><div class="initial-message-box js-empty" style="display: block;"></div><input type="text" tabindex="1"></div></div>';
		var filterswitch = false;
		var filterswitchHover = '0px ';
		$("#qsortinit").click(function () {
			sort($("#qsort_towns").val());
			$(this).toggleClass('active')
		});
		$("#qsortfilter").click(function () {
			togglefilter(filterswitch = !filterswitch);
		});
		$("#qsortfilter").on('mouseover', function () {
			this.style.backgroundPosition = filterswitchHover + '-21px ';
		}).on('mouseout', function () {
			this.style.backgroundPosition = filterswitchHover + '0px';
		})
		function togglefilter(filterswitch) {
			if (filterswitch) {
				$("#qsortfilter").before(filterbox).before(filterbox).before(filterbox);
				$('#qsortfilter').css({
					"background-position" : "-20px 0"
				});
				filterswitchHover = '-20px ';
			} else {
				$(".qsortfilterbox").remove();
				$('#qsortfilter').css({
					"background-position" : "0 0"
				});
				filterswitchHover = '0px ';
			}

		};
		function isNumber(n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		}
		function setfilter(selection) {
			$('#hides_overview_towns>li').show();
			$('.qsortfilterbox :input').each(function (i, e) {
				if (isNumber($(this).val())) {
					regexpRES = RegExp(/wood|stone|iron/);
					regexpInS = RegExp(/eta/);
					regexpNoT = RegExp(/gp_town_link/);
					if (regexpNoT.test(selection)) {
						numericfilter = $(this).val();
					} else {
						numericfilter = parseInt($(this).val());
					}
					$('#hides_overview_towns>li').each(function (i, e) {
						if (regexpRES.test(selection)) {
							selectedSort = parseInt($(e).find(selection).text()) || 0;
						} else if (regexpInS.test(selection)) {
							selectedSort = parseInt($(e).find(selection).text().substr(1)) || 0;
						} else {
							selectedSort = $(e).find(selection).text();
							if (!(selectedSort.indexOf(numericfilter) >= 0)) {
								$(e).hide();
							}
						}
						if (numericfilter > selectedSort) {
							$(e).hide();
						}
					});
				} else {
					namefilter = $(this).val();
					$('#hides_overview_towns>li').each(function (i, e) {
						townname = $(e).find('a.gp_town_link').text();
						if (namefilter.length > 0 && !(townname.indexOf(namefilter) >= 0)) {
							$(e).hide();
						}
					});
				}
			});
		};
		function sort(selection) {
			order = !order;
			switch (selection) {
			case "ironinstore":
				selection = 'span.eta';
				break;
			case "name":
				selection = 'a.gp_town_link';
				break;
			case "wood":
				selection = 'span.wood span.count';
				break;
			case "stone":
				selection = 'span.stone span.count';
				break;
			case "iron":
				selection = 'span.iron span.count';
				break;
			}
			setfilter(selection);
			var qArrayUnsorted = $('#hides_overview_towns>li').get();
			qArrayUnsorted.sort(function (a, b) {
				regexpRES = RegExp(/wood|stone|iron/);
				regexpInS = RegExp(/eta/);
				if (regexpRES.test(selection)) {
					a = parseInt($(a).find(selection).text()) || 0;
					b = parseInt($(b).find(selection).text()) || 0;
				} else if (regexpInS.test(selection)) {
					a = parseInt($(a).find(selection).text().substr(1)) || 0;
					b = parseInt($(b).find(selection).text().substr(1)) || 0;
				} else {
					a = $(a).find(selection).text().toLowerCase();
					b = $(b).find(selection).text().toLowerCase();
					if (order) {
						return a.localeCompare(b);
					} else {
						return b.localeCompare(a);
					}
				}
				if (order) {
					return b - a
				} else {
					return a - b
				}
			});
			for (var i = 0; i < qArrayUnsorted.length; i++) {
				qArrayUnsorted[i].parentNode.appendChild(qArrayUnsorted[i]);
			}
		}
	},
	hidesoverviewiron : function () {
		var b = $("#hides_overview_towns");
		var c = b.find(".town_item");
		for (var d = 0; d < c.length; d++) {
			var e = $(c[d]);
			var f = e.find(".iron");
			var g = Number(f.text().trim());
			var h = e.find("input");
			if (null != h.val() && g > 15e3) {
				h.val(g - 15e3).change();
				e.find(".iron_img").click();
				var i = uw.HidesOverview.spinners[e.find(".iron_img").attr("name")];
				i.setValue(g - 15e3)
			}
		}
	},
	townTradeImprovement : function () {
		var b = uw.GPWindowMgr.getOpen(uw.Layout.wnd.TYPE_TOWN);
		if (b.length == 0)
			return;
		wnd = b[b.length - 1];
		var c = wnd.getID();
		var checkitout = $("#trade_tab .town_info").html();
		if (checkitout) {
			$("div.amounts").each(function () {
				var rescurrent = $(this).find("span.curr").html();
				var ressended = ($(this).find("span.curr2").html() == "") ? 0 : parseInt($(this).find("span.curr2").html().substring(3));
				var ressending = ($(this).find("span.curr3").html() == "") ? 0 : parseInt($(this).find("span.curr3").html().substring(3));
				var resmaxtown = $(this).find("span.max").html();
				var resneeded = resmaxtown - rescurrent - ressended - ressending;
				$(this).append('<span class="q_needed"> &#9658; ' + resneeded + '</span>');
			});
			var resmaxmarket = parseInt($("#big_progressbar .caption .max").html());
			function rescalc(mode) {
				var ressendingNOW = parseInt($("#trade_type_" + mode.substring(2)).find("input").val());
				$("#trade_type_" + mode.substring(2)).find("input").val(0).select().blur();
				var rescurrmarket = parseInt($("#big_progressbar .caption .curr").html());
				var restotalmarket = resmaxmarket - rescurrmarket;
				var resselector = $("#town_capacity_" + mode.substring(2));
				var rescurrent = resselector.find("span.curr").html();
				var ressended = (resselector.find("span.curr2").html() == "") ? 0 : parseInt(resselector.find("span.curr2").html().substring(3));
				var ressending = (resselector.find("span.curr3").html() == "") ? 0 : parseInt(resselector.find("span.curr3").html().substring(3));
				var resmaxtown = resselector.find("span.max").html();
				var resneeded = resmaxtown - rescurrent - ressended - ressending;
				var b = (resneeded > restotalmarket) ? restotalmarket : resneeded;
				$("#trade_type_" + mode.substring(2)).find("input").val(b).select().blur();
				var ressendingNOW2 = parseInt($("#trade_type_" + mode.substring(2)).find("input").val());
				var c = (ressendingNOW == ressendingNOW2) ? 0 : b;
				$("#trade_type_" + mode.substring(2)).find("input").val(c).select().blur();
			}
			function rescalccult(mode) {
				var ressendingNOW = parseInt($("#trade_type_" + mode.substring(2)).find("input").val());
				$("#trade_type_" + mode.substring(2)).find("input").val(0).select().blur();
				var rescurrmarket = parseInt($("#big_progressbar .caption .curr").html());
				var restotalmarket = resmaxmarket - rescurrmarket;
				var resselector = $("#town_capacity_" + mode.substring(2));
				var rescurrent = resselector.find("span.curr").html();
				var ressended = (resselector.find("span.curr2").html() == "") ? 0 : parseInt(resselector.find("span.curr2").html().substring(3));
				var ressending = (resselector.find("span.curr3").html() == "") ? 0 : parseInt(resselector.find("span.curr3").html().substring(3));
				var resmaxtown = resselector.find("span.max").html();
				var resneeded = resmaxtown - rescurrent - ressended - ressending;
				var tradetype = (mode == "q_stone") ? 18000 : 15000;
				var a = tradetype - rescurrent - ressended - ressending;
				var b = (a > restotalmarket) ? restotalmarket : a;
				var c = (b > resneeded) ? resneeded : b;
				$("#trade_type_" + mode.substring(2)).find("input").val(c).select().blur();
				var ressendingNOW2 = parseInt($("#trade_type_" + mode.substring(2)).find("input").val());
				var d = (ressendingNOW == ressendingNOW2) ? 0 : c;
				$("#trade_type_" + mode.substring(2)).find("input").val(d).select().blur();
			}
			function rescalccultReverse(mode) {
				var ressendingNOW = parseInt($("#trade_type_" + mode.substring(2)).find("input").val());
				$("#trade_type_" + mode.substring(2)).find("input").val(0).select().blur();
				var rescurrmarket = parseInt($("#big_progressbar .caption .curr").html());
				var restotalmarket = resmaxmarket - rescurrmarket;
				var townrescurrent = $("div#ui_box div.ui_resources_bar div.indicator[data-type='" + mode.substring(2) + "'] div.amount").text();
				var tradetype = (mode == "q_stone") ? 18000 : 15000;
				var a = townrescurrent - tradetype;
				var b = (tradetype > townrescurrent) ? 0 : a;
				var c = (b > restotalmarket) ? restotalmarket : b;
				$("#trade_type_" + mode.substring(2)).find("input").val(c).select().blur();
				var ressendingNOW2 = parseInt($("#trade_type_" + mode.substring(2)).find("input").val());
				var d = (ressendingNOW == ressendingNOW2) ? 0 : c;
				$("#trade_type_" + mode.substring(2)).find("input").val(d).select().blur();
			}
			$("#trade_tab").append('\
																																				<a id="q_wood" class="q_send" style="top:211px" href="#"></a>\
																																				<a id="q_stone" class="q_send" style="top:245px" href="#"></a>\
																																				<a id="q_iron" class="q_send" style="top:279px" href="#"></a>\
																																				<a id="q_wood" class="q_send_cult" style="top:211px" href="#"></a>\
																																				<a id="q_stone" class="q_send_cult" style="top:245px" href="#"></a>\
																																				<a id="q_iron" class="q_send_cult" style="top:279px" href="#"></a>\
																																				<a id="q_wood" class="q_send_cult_reverse" style="top:211px" href="#"></a>\
																																				<a id="q_stone" class="q_send_cult_reverse" style="top:245px" href="#"></a>\
																																				<a id="q_iron" class="q_send_cult_reverse" style="top:279px" href="#"></a>\
																																			');
			$(".q_send_cult").css({
				"right" : "84px",
				"position" : "absolute",
				"height" : "16px",
				"width" : "22px",
				"background-image" : "url(http://s7.directupload.net/images/130330/d67gpq9g.png)",
				"background-repeat" : "no-repeat",
				"background-position" : "0px -1px"
			});
			$(".q_send_cult_reverse").css({
				"left" : "105px",
				"position" : "absolute",
				"height" : "16px",
				"width" : "22px",
				"background-image" : "url(http://s7.directupload.net/images/130619/p6jyv8gu.png)",
				"background-repeat" : "no-repeat",
				"background-position" : "0px -1px"
			});
			$(".q_send").css({
				"right" : "105px",
				"position" : "absolute",
				"height" : "16px",
				"width" : "22px",
				"background-image" : "url(http://s1.directupload.net/images/130330/x2pnbew9.png)",
				"background-repeat" : "no-repeat",
				"background-position" : "0px -1px"
			});
			$(".q_send, .q_send_cult, .q_send_cult_reverse").hover(
				function () {
				$(this).css({
					"background-position" : "0px -17px"
				});
			},
				function () {
				$(this).css({
					"background-position" : "0px -1px"
				});
			});
			$(".q_send").click(function () {
				rescalc(this.id);
			});
			$(".q_send_cult").click(function () {
				rescalccult(this.id);
			});
			$(".q_send_cult_reverse").click(function () {
				rescalccultReverse(this.id);
			});
		}
	},
	reportslosses : function () {
		var b = uw.GPWindowMgr.getOpen(uw.Layout.wnd.TYPE_REPORT);
		if (b.length == 0)
			return;
		wnd = b[b.length - 1];
		var c = wnd.getID();
		if (document.getElementById('RepConvRes')) {
			document.getElementById('RepConvRes').style.visibility = "hidden";
		}
		var report_type = $("DIV#gpwnd_" + c + " DIV#report_arrow img").attr("src").replace(/.*\/([a-z_]*)\.png.*/, "$1");
		switch (report_type) {
		case "attack":
		case "take_over":
		case "breach":
			var AttackUnitsRessources = {
				unit_w : 0,
				unit_s : 0,
				unit_i : 0,
				unit_f : 0,
				unit_p : 0,
				total_w : 0,
				total_s : 0,
				total_i : 0,
				total_f : 0,
				total_p : 0
			};
			var DefenseUnitsRessources = {
				unit_w : 0,
				unit_s : 0,
				unit_i : 0,
				unit_f : 0,
				unit_p : 0,
				total_w : 0,
				total_s : 0,
				total_i : 0,
				total_f : 0,
				total_p : 0
			};
			if ($("DIV#gpwnd_" + c + " DIV#resources").length) {
				$("DIV#gpwnd_" + c + " .report_side_attacker_unit").each(function (index, value) {
					var unitNumber = $("span.report_losts", this).text();
					var unitName = $("div.report_unit", this).attr("class").split(/\s/);
					unitName = unitName[5];

					if (unitName != "militia" && unitNumber != "-?") {
						AttackUnitsRessources.unit_w = Math.abs(uw.GameData.units[unitName].resources.wood * unitNumber);
						AttackUnitsRessources.unit_s = Math.abs(uw.GameData.units[unitName].resources.stone * unitNumber);
						AttackUnitsRessources.unit_i = Math.abs(uw.GameData.units[unitName].resources.iron * unitNumber);
						AttackUnitsRessources.unit_f = Math.abs(uw.GameData.units[unitName].favor * unitNumber);
						AttackUnitsRessources.unit_p = Math.abs(uw.GameData.units[unitName].population * unitNumber);
						AttackUnitsRessources.total_w += AttackUnitsRessources.unit_w;
						AttackUnitsRessources.total_s += AttackUnitsRessources.unit_s;
						AttackUnitsRessources.total_i += AttackUnitsRessources.unit_i;
						AttackUnitsRessources.total_f += AttackUnitsRessources.unit_f;
						AttackUnitsRessources.total_p += AttackUnitsRessources.unit_p;
						var unitPopup = uw.GameData.units[unitName].name + '<div style="margin-top: 5px; margin-bottom:5px; height: 1px; border: none; background: #B48F45"/><img src="http://cdn.grepolis.com/images/game/res/wood.png" width="20" height="20"/> ' + AttackUnitsRessources.unit_w + '<br> <img src="http://cdn.grepolis.com/images/game/res/stone.png" width="20" height="20"/> ' + AttackUnitsRessources.unit_s + '<br> <img src="http://cdn.grepolis.com/images/game/res/iron.png" width="20" height="20"/> ' + AttackUnitsRessources.unit_i + '<br> <img src="http://cdn.grepolis.com/images/game/res/favor.png" width="20" height="20"/> ' + AttackUnitsRessources.unit_f + '<br> <img src="http://cdn.grepolis.com/images/game/res/pop.png" width="20" height="20"/> ' + AttackUnitsRessources.unit_p;
						$("div.report_unit", this).mousePopup(new uw.MousePopup(unitPopup));
					}
				});
				$("DIV#gpwnd_" + c + " .report_side_defender_unit").each(function (index, value) {
					var unitNumber = $("span.report_losts", this).text();
					var unitName = $("div.report_unit", this).attr("class").split(/\s/);
					unitName = unitName[5];

					if (unitName != "militia" && unitNumber != "-?") {
						DefenseUnitsRessources.unit_w = Math.abs(uw.GameData.units[unitName].resources.wood * unitNumber);
						DefenseUnitsRessources.unit_s = Math.abs(uw.GameData.units[unitName].resources.stone * unitNumber);
						DefenseUnitsRessources.unit_i = Math.abs(uw.GameData.units[unitName].resources.iron * unitNumber);
						DefenseUnitsRessources.unit_f = Math.abs(uw.GameData.units[unitName].favor * unitNumber);
						DefenseUnitsRessources.unit_p = Math.abs(uw.GameData.units[unitName].population * unitNumber);
						DefenseUnitsRessources.total_w += DefenseUnitsRessources.unit_w;
						DefenseUnitsRessources.total_s += DefenseUnitsRessources.unit_s;
						DefenseUnitsRessources.total_i += DefenseUnitsRessources.unit_i;
						DefenseUnitsRessources.total_f += DefenseUnitsRessources.unit_f;
						DefenseUnitsRessources.total_p += DefenseUnitsRessources.unit_p;
						var unitPopup = uw.GameData.units[unitName].name + '<div style="margin-top: 5px; margin-bottom:5px; height: 1px; border: none; background: #B48F45"/><img src="http://cdn.grepolis.com/images/game/res/wood.png" width="20" height="20"/> ' + DefenseUnitsRessources.unit_w + '<br> <img src="http://cdn.grepolis.com/images/game/res/stone.png" width="20" height="20"/> ' + DefenseUnitsRessources.unit_s + '<br> <img src="http://cdn.grepolis.com/images/game/res/iron.png" width="20" height="20"/> ' + DefenseUnitsRessources.unit_i + '<br> <img src="http://cdn.grepolis.com/images/game/res/favor.png" width="20" height="20"/> ' + DefenseUnitsRessources.unit_f + '<br> <img src="http://cdn.grepolis.com/images/game/res/pop.png" width="20" height="20"/> ' + DefenseUnitsRessources.unit_p;
						$("div.report_unit", this).mousePopup(new uw.MousePopup(unitPopup));
					}
				});
				$("DIV#gpwnd_" + c + " DIV#resources").append('<p><table><tr><td width="50%">' + AttackUnitsRessources.total_w + '</td><td><img class="unit_order_res wood" alt="' + uw.GameData.resources.wood + '" src="http://cdn.grepolis.com/images/game/res/wood.png" width="20" height="20"/></td><td width="50%">' + DefenseUnitsRessources.total_w + '</td></tr><tr><td>' + AttackUnitsRessources.total_s + '</td><td><img class="unit_order_res stone" alt="' + uw.GameData.resources.stone + '" src="http://cdn.grepolis.com/images/game/res/stone.png" width="20" height="20"/></td><td>' + DefenseUnitsRessources.total_s + '</td></tr><tr><td>' + AttackUnitsRessources.total_i + '</td><td><img class="unit_order_res iron" alt="' + uw.GameData.resources.iron + '" src="http://cdn.grepolis.com/images/game/res/iron.png" width="20" height="20"/></td><td>' + DefenseUnitsRessources.total_i + '</td></tr><tr><td>' + AttackUnitsRessources.total_f + '</td><td><img class="unit_order_res favor" alt="' + uw.GameData.favor + '" src="http://cdn.grepolis.com/images/game/res/favor.png" width="20" height="20"/></td><td>' + DefenseUnitsRessources.total_f + '</td></tr><tr><td>' + AttackUnitsRessources.total_p + '</td><td><img class="unit_order_res population" alt="' + uw.GameData.population + '" src="http://cdn.grepolis.com/images/game/res/pop.png" width="20" height="20"/></td><td>' + DefenseUnitsRessources.total_p + "</td></tr></table>")
			}
		}
	},
	movereports : function () {
		var b = uw.GPWindowMgr.getOpen(uw.Layout.wnd.TYPE_REPORT);
		if (b.length == 0)
			return;
		wnd = b[b.length - 1];
		var c = wnd.getID();
		var folder = "";
		$("DIV#gpwnd_" + c + " #folder_menu_reports a").each(function () {
			folder += "<option value=" + $(this).parent().attr("name").substr(7) + ">" + $(this).text() + "</option>";
		});
		if (!$('#qselect').is(':visible') && folder.length > 0) {
			$("DIV#gpwnd_" + c + " #report_reports").append('<select id="qselect"><option disabled selected>' + QT.Lang[lID].berichte_ordnerwaelen + '</option>' + folder + '</select>');
			$("#qselect").css({
				'margin-top' : '5px',
				'margin-left' : '2px'
			});
			$("#qselect").change(function () {
				var params = {
					folder_id : this.options[this.selectedIndex].value,
					report_ids : uw.Reports.getReportsIds()
				};
				uw.Layout.wnd.getOpenFirst(uw.Layout.wnd.TYPE_REPORT).requestContentPost('report', 'move', params);
				this.options[0].selected = true;

			});
			$("DIV#gpwnd_" + c + " #folder_menu_reports").hide();
			$("DIV#gpwnd_" + c + " #report_list").removeClass("with_menu");
		}
	},
	addreportfilter : function () {
		var b = uw.GPWindowMgr.getOpen(uw.Layout.wnd.TYPE_REPORT);
		if (b.length == 0)
			return;
		wnd = b[b.length - 1];
		var c = wnd.getID();
		if (!$("#qmenu_berichte_icon_wrapper").is(":visible")) {
			$('<div id="qmenu_berichte_icon_wrapper" style="display:inline;position:absolute;margin-top:-1px;margin-left:120px"></div>').appendTo("DIV#gpwnd_" + c + " #es_page_reports");
			$('<label class="qmenu_berichte_Icon" style="background-image: url(http://cdn.grepolis.com/images/game/unit_overview/filter_24x24.png);background-position: 0 0;"><input type="checkbox" id="angriffe" class="qmenu_berichte_checkbox"></label>').appendTo('#qmenu_berichte_icon_wrapper');
			$('<label class="qmenu_berichte_Icon" style="background-image: url(http://cdn.grepolis.com/images/game/unit_overview/filter_24x24.png);background-position: -24px 0;"><input type="checkbox" id="unterstützungen" class="qmenu_berichte_checkbox"></label>').appendTo('#qmenu_berichte_icon_wrapper');
			$('<label class="qmenu_berichte_Icon" style="background-image: url(http://s1.directupload.net/images/130116/7hzmc2e7.png);"><input type="checkbox" id="zauber" class="qmenu_berichte_checkbox"></label>').appendTo('#qmenu_berichte_icon_wrapper');
			$('<label class="qmenu_berichte_Icon" style="background-image: url(http://cdn.grepolis.com/images/game/unit_overview/filter_24x24.png);background-position: -72px 0;"><input type="checkbox" id="spios" class="qmenu_berichte_checkbox"></label>').appendTo('#qmenu_berichte_icon_wrapper');
			$('<label class="qmenu_berichte_Icon" style="background-image: url(http://cdn.grepolis.com/images/game/unit_overview/filter_24x24.png);background-position: -96px 0;"><input type="checkbox" id="farm" class="qmenu_berichte_checkbox"></label>').appendTo('#qmenu_berichte_icon_wrapper');
			$(".qmenu_berichte_Icon").css({
				'display' : 'inline-block',
				'background-repeat' : 'no-repeat',
				'width' : '24px',
				'height' : '24px',
				'position' : 'relative',
				'float' : 'left',
				'margin-left' : '24px'
			});
			$(".qmenu_berichte_checkbox").css({
				'margin-top' : '5px',
				'margin-left' : '29px'
			});
			$(".qmenu_berichte_checkbox").click(function () {
				classid = this.id;
				var checkBoxes = $("li." + classid + " INPUT[type='checkbox']");
				checkBoxes.attr("checked", !checkBoxes.attr("checked"));
			});
		}
	},
	colorreports : function () {
		var b = uw.GPWindowMgr.getOpen(uw.Layout.wnd.TYPE_REPORT);
		if (b.length == 0)
			return;
		wnd = b[b.length - 1];
		var c = wnd.getID();
		$("DIV#gpwnd_" + c + " #report_list li:contains('" + QT.Lang[lID].berichte_greift + "')").each(function () {
			$(this).css({
				"border-left" : "5px solid red"
			}).addClass("angriffe");
		});
		$("DIV#gpwnd_" + c + " #report_list li:contains('" + QT.Lang[lID].berichte_unterstuetzt + "')").each(function () {
			$(this).css({
				"border-left" : "5px solid green"
			}).addClass("unterstützungen");
		});
		$("DIV#gpwnd_" + c + " #report_list li:contains('" + QT.Lang[lID].berichte_stationierte + "')").each(function () {
			$(this).css({
				"border-left" : "5px solid green"
			}).addClass("unterstützungen");
		});
		$("DIV#gpwnd_" + c + " #report_list li:contains('" + QT.Lang[lID].berichte_spion + "')").each(function () {
			$(this).css({
				"border-left" : "5px solid blue"
			}).addClass("spios");
		});
		$("DIV#gpwnd_" + c + " #report_list li:contains('" + QT.Lang[lID].berichte_spioniert + "')").each(function () {
			$(this).css({
				"border-left" : "5px solid blue"
			}).addClass("spios");
		});
		$("DIV#gpwnd_" + c + " #report_list li:contains('" + QT.Lang[lID].berichte_erobert + "')").each(function () {
			$(this).css({
				"border-left" : "5px solid black"
			});
		});
		$("DIV#gpwnd_" + c + " #report_list li:contains('" + QT.Lang[lID].berichte_gewirkt + "')").each(function () {
			$(this).css({
				"border-left" : "5px solid purple"
			}).addClass("zauber");
		});
		$("DIV#gpwnd_" + c + " #report_list li:contains('" + QT.Lang[lID].berichte_bauerndorf + "')").each(function () {
			$(this).css({
				"border-left" : "5px solid yellow"
			}).addClass("farm");
		});
	},
	forumDeleteMultiple : function () {
		if ($('#forum #postlist').length && $('#forum div.forum_footer').length) {
			if (!$('#qdeletecheckbox').length) {
				if ($('#paginator_selected').text() == 1) {
					$("div.post_functions:not(:first)").append('<input id="qdeletecheckbox" type="checkbox">');
				} else {
					$("div.post_functions").append('<input id="qdeletecheckbox" type="checkbox">');
				}
			}
			if (!$('#qdeleteAllcheckbox').length) {
				$("div.forum_footer").append('<input id="qdeleteAllcheckbox" type="checkbox"  style="margin-right: -7px; margin-left:25px">');
			}
			if (!$('#qdeletemultipleBTN').length) {
				$('#forum_buttons').append('<a id="qdeletemultipleBTN" class="q_delete" href="#"></a>');
				$(".q_delete").css({
					"margin-top" : "2px",
					"margin-left" : "2px",
					"position" : "absolute",
					"height" : "23px",
					"width" : "22px",
					"background-image" : "url(http://s14.directupload.net/images/130725/sz66nazr.png)",
					"background-repeat" : "no-repeat",
					"background-position" : "0px 0px"
				});
				$(".q_delete").hover(
					function () {
					$(this).css({
						"background-position" : "0px -23px"
					});
				},
					function () {
					$(this).css({
						"background-position" : "0px 0px"
					});
				});
			}
			function AreAnyCheckboxesChecked() {
				var checkboxes = $("#forum #postlist :checkbox");
				var checkboxesChecked = 0;
				for (var i = 0; i < checkboxes.length; i++) {
					if (checkboxes[i].checked) {
						checkboxesChecked++
					}
				}
				return checkboxesChecked;
			}
			$('#qdeletemultipleBTN').click(function () {
				var numberChecked = AreAnyCheckboxesChecked();
				if (numberChecked > 0) {
					var deleteconfirmText = "<img style='position: absolute; top:5px;' src='http://s1.directupload.net/images/130724/d7ce2sy6.png'><span style='position: absolute; color: #141414; font: 21px TrajanPro; display: inline; letter-spacing: -5px; margin: -14px auto; padding-left: 0px; width: 22px;'><b>" + numberChecked + "</b></span><br/>" + QT.Lang[lID].sicherloeschen + "";
					uw.hOpenWindow.showConfirmDialog('', deleteconfirmText, function () {
						$("#forum #postlist :checkbox:checked").each(function (i) {
							var self = this
								setTimeout(function () {
									var deleteonlick = $(self).parent().find("a:last").attr("onclick").slice(17, -1).split(",");
									uw.Forum.deletePost(deleteonlick[0], deleteonlick[1], true, deleteonlick[3]);
								}, i * 500);
						});
					});
				} else {
					alert(QT.Lang[lID].keineausgewaehlt);
				}
			});
			$('#qdeleteAllcheckbox').click(function () {
				$('#forum input[type="checkbox"]').prop('checked', this.checked)
			});
			$("#forum #postlist :checkbox").click(function () {
				if ($('#qdeleteAllcheckbox').is(":checked")) {
					$('#qdeleteAllcheckbox').prop('checked', false);
				} else if ($('#forum #postlist input[type="checkbox"]').not(":checked").length === 0) {
					$('#qdeleteAllcheckbox').prop('checked', true);
				}
			});
		}
	},
	maximizeForum : function () {
		var qmenu_forum_finder = $(".forum_content").parent().parent().parent();
		if (qmenu_forum_finder.find(".menu_inner").width() != 5000) {
			var forumWidth = qmenu_forum_finder.find(".menu_inner").width();
			qmenu_forum_finder.css({
				"margin-left" : 0 - (forumWidth - 810) / 2 - 85,
				"width" : forumWidth + 170
			});
			qmenu_forum_finder.find(".menu_inner").css({
				"position" : "static"
			});
			qmenu_forum_finder.find(".next").remove();
			qmenu_forum_finder.find(".prev").remove();
		}
		qmenu_forum_finder.find("#wrapper").css({
			"width" : "780px",
			"margin" : "0 auto"
		});
	},
	addsettingsbutton : function () {
		var b = uw.GPWindowMgr.getOpenFirst(uw.Layout.wnd.TYPE_PLAYER_SETTINGS);
		if (!b)
			return;
		var c = $("DIV#gpwnd_" + b.getID() + " .settings-menu ul:last");
		if ($(c).find('#quack-toolsammlung').length == 0) {
			$(c[0]).append('<li><img id="quackicon" style="width:20px;height:15px;vertical-align:bottom;" src="http://s1.directupload.net/images/130206/r2q9fzri.png"></img> <a id="quack-toolsammlung" href="#">Quack Toolsammlung</a></li>');
			$("#quack-toolsammlung").click(function () {
				QT.Functions.scriptsettings();
			})
		}
	},
	messageIsland : function () {
		var b = uw.GPWindowMgr.getOpen(uw.Layout.wnd.TYPE_ISLAND);
		if (b.length == 0)
			return;
		wnd = b[b.length - 1];
		var c = wnd.getID();
		$("DIV#gpwnd_" + c + " DIV#island_towns_controls").append('<a id="q_message_island" class="q_message" href="#"></a>');
		$(".q_message").css({
			"margin-top" : "2px",
			"right" : "3px",
			"position" : "absolute",
			"height" : "23px",
			"width" : "22px",
			"background-image" : "url(http://s14.directupload.net/images/130417/4lhes4y6.png)",
			"background-repeat" : "no-repeat",
			"background-position" : "0px 0px"
		});
		$(".q_message").hover(
			function () {
			$(this).css({
				"background-position" : "0px -23px"
			});
		},
			function () {
			$(this).css({
				"background-position" : "0px 0px"
			});
		});
		$("DIV#gpwnd_" + c + " .q_message").click(function () {
			var spielernamen = "";
			$("DIV#gpwnd_" + c + " #island_info_towns_left_sorted_by_name li span.player_name").each(function () {
				if ($(this).text() != pName && $(this).text() != QT.Lang[lID].message_ghosttown && $(this).text() != QT.Lang[lID].message_keinestaedte && spielernamen.indexOf($(this).text()) < 0) {
					spielernamen += $(this).text() + ";";
				}
			});
			window.location.href = 'javascript:Layout.newMessage.open("' + spielernamen + '")';
		});
	},
	townslist : function () {
		if ($('#town_groups_list a.town_bb').length != 0)
			return;
		$('.content .group_name .name').append('<a class="town_bb" style="position: absolute; display: block; top: 4px; right: 16px;" href="#"><img src="http://s14.directupload.net/images/140124/8tzken7v.png" style="height: 15px; width: 17px;" /></a>');
		$('.town_bb').click(function (e) {
			var towngrp_id = $(this).parent().data('groupid');
			var cities_towngroup = uw.ITowns.town_group_towns.getTowns(towngrp_id);
			var bb_content = "";
			$.each(cities_towngroup, function (key, town) {
				bb_content += "[town]" + town.attributes.town_id + "[/town] (" + town.town_model.attributes.points + ") " + town.town_model.attributes.island_x + "|" + town.town_model.attributes.island_y + "\n";
			});
			bb_inhalt = "<b>Copy and paste:</b><br/><textarea style='overflow-x: hidden; overflow-y: auto; width: 99%; height: 92%; border: 1px solid #000000' rows='16' cols='57'>" + bb_content + "</textarea>";
			qmenu_windowbuilder("" + QT.Lang[lID].qm_sub_bb + " - " + QT.Lang[lID].bbcode_staedte + "", 700, 330, bb_inhalt);
		});
		$('.town_group_town')
		.hover(function () {
			var townID = $(this).data("townid");
			$(this).append('<div class="jump_town" data-townid="' + townID + '"></div>');
			$(".jump_town")
			.css({
				"display" : "block",
				"top" : "2px",
				"right" : "15px",
				"height" : "16px",
				"width" : "16px",
				"position" : "absolute",
				"background" : "url('http://cdn.grepolis.com/images/game/layout/town_list_btns.png') repeat scroll -32px 0 transparent"
			})
			.click(function (e) {
				e.stopPropagation();
				uw.WMap.mapJump(uw.ITowns.getTown(townID), true);
			}) // uw.MapTiles.focusTown(townID);
			.hover(function () {
				$(this).css({
					"background-position" : "-32px -16px"
				});
			}, function () {
				$(this).css({
					"background-position" : "-32px 0"
				});
			});
		}, function () {
			$(".jump_town").remove();
		});
	},
	tb_activitiesExtra : function () {
		$("#toolbar_activity_recruits_list").hover(
			function () {
			if ($("#qplusmenuRecruits").length == 0) {
				$("#toolbar_activity_recruits_list").append('<div id="qplusmenuRecruits" class="qplusmenu"><div id="qplusdraghandleRecruits" class="qplusdraghandle"></div><a class="qplusback" href="#"></a></div>');
				$('#qplusmenuRecruits .qplusback').click(function () {
					qplus_destroy("qplusmenuRecruits");
				});
			}
		}, function () {
			$('#qplusmenuRecruits').remove();
		});
		$("#toolbar_activity_commands_list").hover(
			function () {
			if ($("#qplusmenuCommands").length == 0) {
				$("#toolbar_activity_commands_list").append('<div id="qplusmenuCommands" class="qplusmenu"><div id="qplusdraghandleCommands" class="qplusdraghandle"></div><a class="qplusback" href="#"></a></div>');
				$('#qplusmenuCommands .qplusback').click(function () {
					qplus_destroy("qplusmenuCommands");
				});
			}
		}, function () {
			$('#qplusmenuCommands').remove();
		});
		$("#toolbar_activity_trades_list").hover(
			function () {
			if ($("#qplusmenuTrades").length == 0) {
				$("#toolbar_activity_trades_list").append('<div id="qplusmenuTrades" class="qplusmenu"><div id="qplusdraghandleTrades" class="qplusdraghandle"></div><a class="qplusback" href="#"></a></div>');
				$('#qplusmenuTrades .qplusback').click(function () {
					qplus_destroy("qplusmenuTrades");
				});
			}
		}, function () {
			$('#qplusmenuTrades').remove();
		});

		$('<style id="qplusmenustyle" type="text/css">\
								#toolbar_activity_recruits_list, #toolbar_activity_commands_list, #toolbar_activity_trades_list {width: 149px !important} \
								.displayImp {display: block !important}\
								.qplusmenu {margin:6px 0px 2px 5px;width:100%;height:11px;display:block;position:relative}\
								.qplusdraghandle {width:119px;height:11px;position:absolute;background:url(http://s14.directupload.net/images/131001/7guz6abs.png)}\
								.qplusback {right:11px;margin-top:-1px;width:16px;height:12px;position:absolute;background:url(http://s1.directupload.net/images/131001/u6le7bdw.png)}\
								</style>').appendTo('head');

		$('#toolbar_activity_recruits_list').draggable({
			cursor : "move",
			handle : ".qplusdraghandle",
			start : function () {
				$("#qplusmenuRecruitsSTYLE").remove();
				$('#toolbar_activity_recruits_list').addClass("displayImp");
			},
			stop : function () {
				var qposition = $('#toolbar_activity_recruits_list').position();
				$('<style id="qplusmenuRecruitsSTYLE" type="text/css">#toolbar_activity_recruits_list {left: ' + qposition.left + 'px !important;top: ' + qposition.top + 'px !important}</style>').appendTo('head');
			}
		});
		$('#toolbar_activity_commands_list').draggable({
			cursor : "move",
			handle : ".qplusdraghandle",
			start : function () {
				$('#toolbar_activity_commands, #toolbar_activity_commands_list').off("mouseout");
				$("#qplusmenuCommandsSTYLE").remove();
				$('#toolbar_activity_commands_list').addClass("displayImp");

			},
			stop : function () {
				var qposition = $('#toolbar_activity_commands_list').position();
				$('<style id="qplusmenuCommandsSTYLE" type="text/css">#toolbar_activity_commands_list {left: ' + qposition.left + 'px !important;top: ' + qposition.top + 'px !important}</style>').appendTo('head');
			}
		});
		$('#toolbar_activity_trades_list').draggable({
			cursor : "move",
			handle : ".qplusdraghandle",
			start : function () {
				$("#qplusmenuTradesSTYLE").remove();
				$('#toolbar_activity_trades_list').addClass("displayImp");
			},
			stop : function () {
				var qposition = $('#toolbar_activity_trades_list').position();
				$('<style id="qplusmenuTradesSTYLE" type="text/css">#toolbar_activity_trades_list {left: ' + qposition.left + 'px !important;top: ' + qposition.top + 'px !important}</style>').appendTo('head');
			}
		});

		function qplus_destroy(JQselector) {
			if (JQselector == "qplusmenuCommands") {
				$('#toolbar_activity_commands_list').hide();
				$('#toolbar_activity_commands_list').on("mouseleave", function () {
					$('#toolbar_activity_commands_list').hide();
				});
				$('#toolbar_activity_recruits, #toolbar_activity_trades').on("mouseenter", function () {
					$('#toolbar_activity_commands_list').hide();
				});
			}
			$("#" + JQselector).parent().removeClass("displayImp");
			$("#" + JQselector + "STYLE").remove();
		}

	},
	farmingvillageshelper : {
		rememberloot : function () {
			var activeFarmClass = $('#time_options_wrapper .active').attr('class').split(' ');
			activeFarm = activeFarmClass[1];
		},
		setloot : function () {
			setTimeout(function () {
				$('#time_options_wrapper .' + activeFarm).click();
			}, 500);
		}
	},
	transportcalculator : {
		init : function () {
			$('#ui_box .nui_units_box .units_naval').after('\
																				<div id="units_transport" class="container_hidden" style="position:relative">\
																					<div class="top"></div><div class="bottom"></div>\
																					<div class="middle">\
																						<div class="left"></div><div class="right"></div>\
																						<div class="content">\
																							<div class="units_wrapper clearfix">\
																								<div id="tr_wrapper">\
																									<div id="tr_options">\
																										<div id="tr_recruit" class="checkbox_new checked" style="margin-right:-1px"><div class="tr_options tr_recruit"></div><div class="cbx_icon" style="margin-top:2px"></div></div>\
																										<div id="tr_outside" class="checkbox_new" style="margin-right:-1px"><div class="tr_options tr_outside"></div><div class="cbx_icon" style="margin-top:2px"></div></div>\
																										<div id="tr_big_transporter" class="checkbox_new checked" style="margin-right:-1px"><div class="tr_options tr_big_transporter"></div><div class="cbx_icon" style="margin-top:2px"></div></div>\
																										<div id="tr_small_transporter" class="checkbox_new checked" style="margin-right:-1px"><div class="tr_options tr_small_transporter"></div><div class="cbx_icon" style="margin-top:2px"></div></div>\
																									</div>\
																								<div id="tr_content"></div>\
																								</div>\
																							</div>\
																							<div id= "tr_btn" class="">' + QT.Lang[lID].btn_transen_span + '</div>\
																							<div id="tr_btn_top"></div>\
																							<div class="bottom" style="bottom:19px"></div>\
																						</div>\
																					</div>\
																				</div>\
																				');
			$("#tr_btn").css({
				"cursor" : "pointer",
				"position" : "relative",
				"height" : "16px",
				"right" : "5px",
				"font-size" : "10px",
				"font-weight" : "bold",
				"color" : "#EEDDBB",
				"padding-left" : "3px",
				"background" : "url(http://s7.directupload.net/images/140120/hesxhjtw.png) no-repeat scroll 0 0 rgba(0, 0, 0, 0)"
			});
			$("#tr_btn_top").css({
				"position" : "absolute",
				"height" : "6px",
				"right" : "0px",
				"bottom" : "14px",
				"width" : "138px",
				"background" : "url(http://gpde.innogamescdn.com/images/game/layout/layout_2.51_compressed.png) no-repeat scroll right -224px rgba(0, 0, 0, 0)"
			});
			$("#tr_wrapper").css({
				"padding" : "7px 7px 17px 7px",
				"color" : "#ECB44D",
				"font-size" : "10px",
				"display" : "none",
				"margin-left" : "-6px",
				"background" : "url(http://zz.cdn.grepolis.com/images/game/layout/layout_units_nav_bg.png) repeat scroll 0 0 rgba(0, 0, 0, 0)"
			});
			$(".tr_options").css({
				"background" : "url(http://s14.directupload.net/images/140130/zo8kqb7x.png) no-repeat scroll 0 0 rgba(0, 0, 0, 0)",
				"width" : "15px",
				"height" : "18px",
				"float" : "left"
			});
			$(".tr_outside").css({
				"background-position" : "0 -36px"
			});
			$(".tr_recruit").css({
				"background-position" : "0 -54px"
			});
			$(".tr_big_transporter").css({
				"background-position" : "0 0"
			});
			$(".tr_small_transporter").css({
				"background-position" : "0 -18px"
			});
			$('#tr_recruit').mousePopup(new uw.MousePopup(QT.Lang[lID].transport_recruits));
			$('#tr_outside').mousePopup(new uw.MousePopup(QT.Lang[lID].transport_outsidetown));
			$('#tr_big_transporter').mousePopup(new uw.MousePopup(QT.Lang[lID].transport_slowtrans));
			$('#tr_small_transporter').mousePopup(new uw.MousePopup(QT.Lang[lID].transport_fasttrans));
			$("#tr_options .checkbox_new").click(function () {
				$(this).toggleClass("checked");
				$("#tr_content").html(QT.Functions.transportcalculator.refresh());
			});
			$("#tr_btn").hover(
				function () {
				$("#tr_btn").css({
					"color" : "#ECB44D"
				});
			},
				function () {
				$("#tr_btn").css({
					"color" : "#EEDDBB"
				});
			});
			$("#tr_btn").click(function () {
				if ($("#tr_wrapper").is(":hidden")) {
					$("#tr_content").html(QT.Functions.transportcalculator.refresh());
				}
				$("#tr_wrapper").slideToggle();
			});
		},
		refresh : function () {
			var selected_town = uw.ITowns.getTown(uw.Game.townId);
			var GD_units = uw.GameData.units;
			var GD_heroes = uw.GameData.heroes;
			var Transporter_Offset = selected_town.researches().hasBerth() ? uw.GameDataResearches.getBonusBerth() : 0;
			var Ground_Units_BHP = 0;
			var Transport_Capacity = 0;
			var units_outside = 0;
			//var FreePopulation = selected_town.getAvailablePopulation();
			// Units inside town
			var units_own = selected_town.units();
			$.each(units_own, function (unit, number) {
				// Landtruppen
				if (!(unit in GD_heroes) && units_own[unit] != 0 && !GD_units[unit].flying && GD_units[unit].capacity == undefined) {
					Ground_Units_BHP += number * GD_units[unit].population;
				}
				// Transportschiffe
				else if (!(unit in GD_heroes) && units_own[unit] != 0 && !GD_units[unit].flying && GD_units[unit].capacity != 0) {
					if ($(".tr_" + unit).parent().hasClass("checked")) {
						Transport_Capacity += number * (GD_units[unit].capacity + Transporter_Offset);
					}
				}
			});
			// recruits
			if ($(".tr_recruit").parent().hasClass("checked")) {
				var recruits = selected_town.getUnitOrdersCollection().models;
				for (var i = 0; i < recruits.length; ++i) {
					var unit = recruits[i].attributes.unit_type;
					var number = recruits[i].attributes.units_left;
					//Landtruppen
					if (!(unit in GD_heroes) && units_own[unit] != 0 && !GD_units[unit].flying && GD_units[unit].capacity == undefined) {
						Ground_Units_BHP += number * GD_units[unit].population;
					}
					// Transportschiffe
					else if (!(unit in GD_heroes) && units_own[unit] != 0 && !GD_units[unit].flying && GD_units[unit].capacity != 0) {
						if ($(".tr_" + unit).parent().hasClass("checked")) {
							Transport_Capacity += number * (GD_units[unit].capacity + Transporter_Offset);
						}
					}
				}
			}
			// Units outside town
			if ($(".tr_outside").parent().hasClass("checked")) {
				uw.gpAjax.ajaxPost('units_beyond_info', 'get_supporting_units_for_foreigners', {}, false, function (data) {
					$.each(data.collections[0].data, function (index, object) {
						if (object.home_town_id == uw.Game.townId) {
							$.each(object, function (unit, number) {
								if (!(unit in GD_heroes) && GD_units[unit] && number != 0 && !GD_units[unit].flying && GD_units[unit].capacity == undefined) {
									Ground_Units_BHP += number * GD_units[unit].population;
								} else if (!(unit in GD_heroes) && GD_units[unit] && number != 0 && !GD_units[unit].flying && GD_units[unit].capacity != 0) {
									if ($(".tr_" + unit).parent().hasClass("checked")) {
										Transport_Capacity += number * (GD_units[unit].capacity + Transporter_Offset);
									}
								}
							});
						}
					});
					$("#tr_content").html(createHint(Transport_Capacity, Ground_Units_BHP));
				});
			} else {
				$("#tr_content").html(createHint(Transport_Capacity, Ground_Units_BHP));
			}
			function createHint(Transport_Capacity, Ground_Units_BHP) {
				var textCapacity = '' + QT.Lang[lID].transport_verf + '<br><span style="background: url(http://s14.directupload.net/images/131025/6coe5znl.png) repeat scroll 0 0 rgba(0, 0, 0, 0); color: #EEDDBB; font-family: Verdana; font-size: 11px; font-weight: bold; text-shadow: 1px 1px 0 #000000; width:110px; display:inline-block"><b>' + Transport_Capacity + '</b></span>';
				var textUnits = '' + QT.Lang[lID].transport_trans + '<br><span style="background: url(http://s14.directupload.net/images/131025/6coe5znl.png) repeat scroll 0 0 rgba(0, 0, 0, 0); color: #EEDDBB; font-family: Verdana; font-size: 11px; font-weight: bold; text-shadow: 1px 1px 0 #000000; width:110px; display:inline-block""><b>   ' + Ground_Units_BHP + '</b></span>';
				return textCapacity + '<br>' + textUnits;
			}
		}
	}
};
/************************************************************************
 * Ajax Call
 ***********************************************************************/
$(document).ajaxComplete(function (event, xhr, settings) {
	var a = settings.url.split("?");
	var b = a[0].substr(6);
	var c = a[1].split(/&/)[1].substr(7);
	if (QT.CallAjaxFunction.hasOwnProperty(b) && QT.CallAjaxFunction[b].hasOwnProperty(c)) {
		QT.CallAjaxFunction[b][c](event, xhr, settings);
	}
});
// Menü create window für Links
function qmenu_windowbuilder(name, width, height, content) {
	var winqm = uw.Layout.wnd.Create(0, name);
	winqm.setWidth(width);
	winqm.setHeight(height);
	winqm.setPosition(["center", "center"]);
	winqm.setContent(content);
}