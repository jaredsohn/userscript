// ==UserScript==
// @author		Orrie
// @contributor		Boom_Box
// @contributor		vkv
// @name		WoTStats - Unified Edition
// @version		0.8.6.22(61)
// @description		More info for World of Tanks profile page. Updated for 0.8.5
// @grant		GM_xmlhttpRequest
// @match		http://worldoftanks.com/*/accounts/*
// @match		http://worldoftanks.ru/*/accounts/*
// @match		http://worldoftanks.eu/*/accounts/*
// @match		http://worldoftanks.kr/*/accounts/*
// @include		http://worldoftanks.com/*/accounts/*
// @include		http://worldoftanks.ru/*/accounts/*
// @include		http://worldoftanks.eu/*/accounts/*
// @include		http://worldoftanks.kr/*/accounts/*
// @include		http://www.noobmeter.com/*
// @include		https://duckandcover.ru/wotka*
// @updateURL		http://userscripts.org/scripts/source/158333.meta.js
// @downloadURL		http://userscripts.org/scripts/source/158333.user.js
// ==/UserScript==

var acct_bats = 0,
	tclass = document.getElementsByClassName("t-table-dotted");

if (tclass.length > 0) {
	acct_bats = toFl(tclass[0].rows[1].cells[1].firstChild.data);
}

if (acct_bats > 0) // completely bypass new accounts and player search page
{
	var dc_class = document.getElementsByClassName("b-data-create")[0],
		ts_attr = dc_class.childNodes[1].getAttribute("data-timestamp"),
		daypassed = (new Date() - new Date(ts_attr * 1000)) / 1000/60/60/24;
		dc_class.innerHTML +="- "+daypassed.toFixed()+" Days Ago";

	var timeDiv = document.getElementsByClassName("b-data-date")[0];

	var scripthost = "http://userscripts.org/scripts/show/158333";
	timeDiv.innerHTML +="<p class='script'>"+(" <a target='_blank' href="+scripthost+">Script</a> version ") +"0.8.6.22(61) - Unified Edition</p>";

	var wg_host = document.location.host,
		server = wg_host.match(/\.([^\.]+)$/)[1],
		nick = document.getElementsByTagName("h1")[0].innerHTML,
		userid = document.location.href.match(/\/(\d+)/)[1];

	// noobmeter, duckandcover, wot-news, and mywotstats
	var nm_srv, dc_srv, wn_srv, mws_srv;
	if (server == "com") {
		nm_srv = "na";
		dc_srv = "NAm";
		wn_srv = "us";
		mws_srv = "NA";
	}
	else {
		nm_srv = wn_srv = server;
		dc_srv = server.toUpperCase();
		if (server == "eu") mws_srv = server.toUpperCase();
		else mws_srv = null;
	}

	var sid = "orrie_js_174043",
		nm_host = "http://www.noobmeter.com",
		nmapi_url = nm_host+"/simpleplayerprapi/"+nm_srv+"/"+nick+"/"+userid+"/"+sid,
		nm_target = nm_host+"/player/"+nm_srv+"/"+nick+"/"+userid;

	if (server != "ru" && server != "kr") {
		var wotlabs = "http://wotlabs.net",
			signature = "<a target='_blank' href="+wotlabs+"/"+nm_srv+"/player/"+nick+">WoTLabs</a> Signature: "
							+"[<a target='_blank' href='"+wotlabs+"/sig/"+nm_srv+"/"+nick+"/signature.png'>Light</a>] - "
							+"[<a target='_blank' href='"+wotlabs+"/sig_dark/"+nm_srv+"/"+nick+"/signature.png'>Dark</a>]";

		timeDiv.innerHTML +="<p class='script'>"+signature+"</p>";
	}

	var dc_url = "https://duckandcover.ru/wotka?search=acc&nickname="+nick+"&server="+dc_srv,
		dc_en_url = dc_url+"&lang=en";

	// determine browser types, beware inconsistencies, no method is reliable.
	console.log("browser appCodeName: ", navigator.appCodeName, ", browser appName: ", navigator.appName);
	console.log("userAgent: ", navigator.userAgent);

	var gecko = /Mozilla/.test(navigator.appCodeName),	// true for ff (and chrome lol)
		opera = /Opera/.test(navigator.appName),		// only true for opera
		chrome = /Chrome/.test(navigator.userAgent);

	if (opera || chrome) gecko = false;

	// api server
	var api_ver = "api/1.9",
		wa_token = "?source_token=WG-WoT_Assistant-1.4.1";

	if (opera) var api_domain = "http://"+wg_host;		// use same domain for opera, gets cookie reset
	else	   var api_domain = "http://api."+wg_host;	// new domain for FF and Chrome, logins preserved

	var api_url = api_domain+"/uc/accounts/"+userid+"/"+api_ver+"/"+wa_token;

	console.log(api_url);

	// who is logged in, only valid for NA or EU.
	var auth = (server == "com" || server == "eu"),
		user = null;

	if (auth && (authDiv = document.getElementsByClassName("b-auth-link")[0]) != undefined) {
		var mre = />([-\w]+)<\/a/;
		if (gecko && typeof(XPCNativeWrapper) === 'function') {
			// FF needs to unwrap authdiv
			user = XPCNativeWrapper.unwrap(authDiv).innerHTML.match(mre)[1];
		}
		else user = authDiv.innerHTML.match(mre)[1];
	}
	var devMode = (user=="Orrie");

	// script Custom CSS - formated for better overview
	// font-stretch not supported in chrome
	if (gecko) var font = "font-size: 12.5pt;font-weight: 600;font-stretch: condensed;";
	else var font = "font-size: 11pt;font-weight: bold;";

	timeDiv.innerHTML +="<style>"
						//modified tags
						+".l-content {width: 955px}"
						+".b-clan-list {position: absolute; left: 380px; top: 15px; width: 440px; margin: 0 !important;}"
						+".b-clan-list h4 {margin: 0;}"
						+".b-data-date {color: #9999AA; width: 360px}"
						+".b-data-create {margin: -15px 140px 0 0;}"
						+".l-sidebar {width: 144px !important; position: absolute; right: 5px; top: -20px;}"
						+".b-context-menu {width: 144px;}"
						+".t-result {margin: 75px 0 15px;}"
						+".t-statistic th {text-align: center;}"
						//new tags
						+".ratings-container {margin: 0 0 25px;}"
						+".medal-container {margin: 0 0 50px;}"
						+"div.stat-header {text-align: center;}"
						+"span.stat-header {color: #FFA759; font-family: Arial;" +font+ "line-height: 62px; border-bottom: 12px solid transparent;}"
						+"span.pl-hist {display: block; line-height: 140%;}"
						+"p.script {margin: 0; line-height: 140%;}"
						+"div.scriptlink {margin: 10px 0 0; float:right;}"
						+"div.clan-history {margin-left: 10px; color: #DDDDDD;}"
						//new tags - tables
						+".t-perfstats {margin-left: 10px; width: 938px;}"
						+".t-perfstats tbody tr {border-bottom: 1px dotted #333333;}"
						+".t-perfstats th {color: #BABFBA; font-size: 120%; line-height: 36px;}"
						+".t-perfstats td {line-height: 26px; text-align: center;}"
						+".t-cls-res {text-align: center;}"
						+".t-row-header {background: #050709; border-top: 1px solid #1D1D1F; border-bottom: 1px solid #1D1D1F;	font-size: 17px; font-weight: 300;}"
						+".t-row-header td {color: #8F9393; line-height: 100%; padding: 4px 12px; text-align: center;}"
						+".t-row-header td:first-child, .t-statistic th:first-child {text-align: left;}"
						+".t-table-dotted td.td-number-nowidth {color: #BABFBA; font-weight: bold; padding-right: 0; text-align: right;}"
						//new tags - medals
						+".medal {background-repeat: no-repeat; background-size: 50px auto; height: 50px; width: 50px; display: inline-block; position: relative;}"
						+"font.medalCounter {border: 1px solid #40312E; position: absolute; font-size: 10px; text-align: center; right: 1px; min-width: 26px; top: 35px; background-color: rgb(66, 15, 12); padding: 1px 0px;}"
						+"#warrior {margin-left: 125px}"
						+"#maxSniperSeries {margin-left: 175px;}"
						+"#medalBoelter {margin-left: 225px;}"
						+"#medalDumitru {margin-left: 250px;}"
						+"#medalAbrams {margin-left: 275px;}"
						+"#tankExpert, #mechanicEngineer {margin-left: 300px;}"
						// medal image position fix
						+"#medalBrothersInArms {background-position: 0 2px;}"
						+"#medalCrucialContribution {background-position: 0 5px ;}"
						+"#bombardier {background-position: 0 5px;}"
						+"#maxInvincibleSeries {background-position: 0 2px;}"
						+"#beasthunter {background-position: 0 1px;}"
						+"#pattonValley {background-position: 0 6px;}"
						+"</style>";

	var scripts = [sortTd, hideTypes, toType, toFl, col];

	for (i=0; i<scripts.length; ++i) {
		var script = document.createElement("script");
		script.className = "wotstats";
		script.type = "text/javascript";
		script.textContent = scripts[i].toString();
		document.head.appendChild(script);
	}

	var sc = (function() {
		var stat_color = {
			sup_uni: "5A3175", // super unicum
			unicum:	 "83579D", // unicum
			great:	 "4A92b7", // great
			v_good:	 "4C762E", // very good
			good:	 "6D9521", // good
			avg:	 "D7B600", // average
			b_avg:	 "CD3333", // below average
			bad:	 "B20000", // bad
			e_bad:	 "A10000", // ermahgerd bad
			no_col:	 "6B6B6B"  // default gray
		};
		return { col: stat_color };
	})();

	var veh_names = (function() {
		var tstrings = [];
		tstrings.push(['all','Light','Medium','Heavy','Tank&#8194;Destroyer','SP-Artillery']); // formally vtype

		// Yes this is where new tanks are added, just paste their wg strings in the appropriate array.
		// For now, do not change order of arrays, ie: light, med, hvy, td, spg. Still have dependencies.
		// Includes leaked/unreleased content, for future references.
		// Sorted by nation, then tier.
		tstrings.push(	// Light Tanks, 0.8.5
		[ 'Light', // group identifier
		// Soviet
		'ms-1',							// MS-1
		'bt-2',							// BT-2
		't-26',							// T-26
		't-60',							// T-60
		'tetrarch_ll',					// Tetrarch
		'bt-7',							// BT-7
		't-46',							// T-46
		't-70',							// T-70
		'bt-sv',						// BT-SV
		'm3_stuart_ll',					// M3 Light
		't-127',						// T-127
		'a-20',							// A-20
		't-50',							// T-50
		't80',							// T-80
		'valentine_ll',					// Valentine II
		't_50_2',						// T-50-2
		// German
		'ltraktor',						// Leichttraktor
		'pz35t',						// PzKpfw 35 (t)
		'pzii',							// PzKpfw II
		'pzi',							// Pz.Kpfw. I
		'h39_captured',					// PzKpfw 38H735 (f)
		'pz38t',						// PzKpfw 38 (t)
		'pziii_a',						// PzKpfw III Ausf. A
		'pzi_ausf_c',					// Pz.Kpfw. I Ausf. C
		'pz_ii_ausfg',					// Pz.Kpfw. II Ausf. G
		'pzii_j',						// PzKpfw II Ausf. J
		't-15',							// T-15
		'pzii_luchs',					// PzKpfw II Luchs
		'pz38_na',						// PzKpfw 38 nA
		'vk1602',						// VK 16.02 Leopard
		'vk2801',						// VK 28.01
		'auf_panther',					// Aufklärungspanzer Panther
		// USA
		't1_cunningham',				// T1 Cunningham
		'm2_lt',						// M2 Light Tank
		't2_lt',						// T2 Light Tank
		't1_e6',						// T1E6
		'm3_stuart',					// M3 Stuart
		'm22_locust',					// M22 Locust
		'mtls-1g14',					// MTLS-1G14
		'm5_stuart',					// M5 Stuart
		'm24_chaffee',					// M24 Chaffee
		't21',							// T21
		't71',							// T71
		// French
		'renaultft',					// RenaultFT
		'hotchkiss_h35',				// Hotchkiss H35
		'd1',							// D1
		'amx38',						// AMX 38
		'amx40',						// AMX 40
		'elc_amx',						// ELC AMX
		'amx_12t',						// AMX 12t
		'amx_13_75',					// AMX 13 75
		'amx_13_90',					// AMX 13 90
		// UK
		'gb03_cruiser_mk_i',			// Cruiser Mk. I
		'gb58_cruiser_mk_iii',			// Cruiser Mk. III
		'gb69_cruiser_mk_ii',			// Cruiser Mk. II
		'gb59_cruiser_mk_iv',			// Cruiser Mk. IV
		'gb04_valentine',				// Valentine
		'gb60_covenanter',				// Covenanter
		'gb20_crusader',				// Crusader
		// Chinese
		'ch06_renault_nc31',			// Renault NC-31
		'ch07_vickers_mke_type_bt26',	// Vickers Mk. E Type B
		'ch08_type97_chi_ha',			// Type 2597 Chi-Ha
		'ch09_m5',						// M5A1 Stuart
		'ch15_59_16',					// 59-16
		'ch02_type62',					// Type 62
		'ch16_wz_131',					// WZ-131
		'ch17_wz131_1_wz132',			// WZ-132
		// Rumours
		'm3_a3',						// USA - M3A3
		'gb14_m2',						// UK - M2A4
		'gb15_stuart_i',				// UK - Stuart I
		'gb16_stuart_vi',				// UK - Stuart IV
		'amr_p103',						// French - AMX P.103
		'amx_13fl11'					// French - AMX-13 FL-11
		]);

		tstrings.push( // Medium Tanks, 0.8.5
		[ 'Medium', // group identifier
		// Soviet
		't-28',							// T-28
		'a-32',							// A-32
		't-34',							// T-34
		'matilda_ii_ll',				// Matilda IV
		't-34-85',						// T-34-85
		't-43',							// T-43
		'kv-13',						// KV-13
		't-44',							// T-44
		't-54',							// T-54
		't62a',							// T-62A
		'object_907',					// Object 907 (CW Tank)
		// German
		's35_captured',					// PzKpfw S35 739 (f)
		'pziii',						// PzKpfw III
		'vk2001d',						// VK 20.01 (D)
		'pziv',							// PzKpfw IV
		'pziii_iv',						// PzKpfw III/IV
		't-25',							// T-25
		'pziv_hydro',					// PzKpfw IV Hydraulic
		'vk3601h',						// VK 36.01 (H)
		'vk3001h',						// VK 30.01 (H)
		'vk3001p',						// VK 30.01 (P)
		'vk3002db_v1',					// VK 30.01 (D)
		'pzv_pziv',						// PzKpfw V-IV
		'pzv_pziv_ausf_alfa',			// PzKpfw V-IV Alpha
		'pziv_schmalturm',				// PzKpfw IV Schmalturm
		'pzv',							// PzKpfw V Panther
		'vk3002db',						// VK 30.02 (D)
		'panther_m10',					// Panther-M10
		'panther_ii',					// Panther II
		'indien_panzer',				// Indien-Panzer
		'e-50',							// E-50
		'pro_ag_a',						// Leopard PT A
		'e50_ausf_m',					// E-50 Ausf. M
		'leopard1',						// Leopard 1
		// USA
		't2_med',						// T2 Medium Tank
		'm2_med',						// M2 Medium Tank
		'm3_grant',						// M3 Lee
		'm4_sherman',					// M4 Sherman
		'm7_med',						// M7
		'ram-ii',						// Ram II
		'm4a2e4',						// M4A2E4 Sherman
		'm4a3e8_sherman',				// M4A3E8 Sherman
		'sherman_jumbo',				// M4A3E2 Sherman Jumbo
		't20',							// T20
		'pershing',						// M26 Pershing
		't26_e4_superpershing',			// T26E4 Super Pershing
		't69',							// T69
		'm46_patton',					// Patton
		't54e1',						// T54E1
		'm48a1',						// M48A1 Patton
		'm60',							// M60 (CW Tank)
		// French
		'd2',							// D2
		'lorraine40t',					// Lorraine 40 t
		'bat_chatillon25t',				// Bat Chatillon 25 t
		// UK
		'gb01_medium_mark_i',			// Vickers Medium Mk. I
		'gb05_vickers_medium_mk_ii',	// Vickers Medium Mk. II
		'gb06_vickers_medium_mk_iii',	// Vickers Medium Mk. III
		'gb07_matilda',					// Matilda
		'gb68_matilda_black_prince',	// Matilda Black Prince
		'gb51_excelsior',				// Excelsior
		'gb21_cromwell',				// Cromwell
		'gb22_comet',					// Comet
		'gb23_centurion',				// Centurion Mk. I
		'gb24_centurion_mk3',			// Centurion Mk. 7/1
		'gb70_fv4202_105',				// FV4202
		// Chinese
		'ch21_t34',						// Type T-34
		'ch20_type58',					// Type 58
		'ch04_t34_1',					// T-34-1
		'ch01_type59',					// Type 59
		'ch05_t34_2',					// T-34-2
		'ch18_wz-120',					// WZ-120
		'ch19_121',						// 121
		// Rumours
		'a43',							// Soviet - A-43
		'a44',							// Soviet - A-44
		'object416',					// Soviet - Object 416
		't1_m1921',						// USA - T1 M1921
		't6_m',							// USA - T6 Medium
		'm4_improved',					// USA - M4A3
		'm4_90v',						// USA - M4A3 90mm
		'gb36_matilda_1',				// UK - Matilda I
		'gb02_a7',						// UK - A7
		'gb17_grant_i',					// UK - Grant I
		'gb34_ram',						// UK - Ram
		'gb33_sentinel_ac_i',			// UK - Sentinel AC I
		'gb35_sentinel_ac_iv',			// UK - Sentinel AC IV
		'gb18_sherman_ii',				// UK - Sherman M4A2
		'gb19_sherman_firefly',			// UK - Sherman Firefly
		'amc_35',						// French - AMC 35
		'somua_s35',					// French - Somua S35
		'renault_g1r',					// French - Renault G1 R
		'g1l'							// French - G1 L
		]);

		tstrings.push( // Heavy Tanks, 0.8.6
		[ 'Heavy', // group identifier
		//Soviet
		'kv1',						// KV-1
		'kv-220',					// KV-220 Beta-Test
		'churchill_ll',				// Churchill III
		'kv-220_action',			// KV-220
		'kv-1s',					// KV-1S
		'kv2',						// KV-2
		't150',						// T-150
		'is',						// IS
		'kv-3',						// KV-3
		'is-3',						// IS-3
		'object252',				// IS-6
		'kv4',						// KV-4
		'kv-5',						// KV-5
		'st_i',						// ST-I
		'is8',						// IS-8
		'is-4',						// IS-4
		'is-7',						// IS-7
		// German
		'b-1bis_captured',			// PzKpfw B2 740 (f)
		'pzvi',						// PzKpfw VI Tiger
		'pzvi_tiger_p',				// PzKpfw VI Tiger (P)
		'pzvib_tiger_ii',			// PzKpfw VIB Tiger II
		'vk4502a',					// VK 45.02 (P) Ausf. A
		'lowe',						// Löwe
		'vk4502p',					// VK 45.02 (P) Ausf. B
		'e-75',						// E-75
		'maus',						// Maus
		'e-100',					// E-100
		'vk7201',					// VK 72.01 (K)
		// USA
		't14',						// T14
		't1_hvy',					// T1 Heavy Tank
		'm6',						// M6
		't29',						// T29
		't34_hvy',					// T34
		't32',						// T32
		'm6a2e1',					// M6A2E1
		'm103',						// M103
		't110',						// T110E5
		't57_58',					// T57 Heavy Tank
		// French
		'b1',						// B1
		'bdr_g1b',					// BDR G1B
		'arl_44',					// ARL 44
		'amx_m4_1945',				// AMX M4(1945)
		'amx_50_100',				// AMX 50 100
		'fcm_50t',					// FCM 50 t
		'amx_50_120',				// AMX 50 120
		'f10_amx_50b',				// AMX 50B
		// UK
		'gb08_churchill_i',			// Churchill I
		'gb09_churchill_vii',		// Churchill VII
		'gb63_tog_ii',				// TOG II*
		'gb10_black_prince',		// Black Prince
		'gb11_caernarvon',			// Caernarvon
		'gb12_conqueror',			// Conqueror
		'gb13_fv215b',				// FV215b
		// Chinese
		'ch10_is2',					// IS-2
		'ch11_110',					// 110
		'ch03_wz-111',				// WZ-111
		'ch23_112',					// WZ-112
		'ch12_111_1_2_3',			// WZ-111 model 1-4
		'ch22_113',					// 113
		// Rumours
		't95_e2',					// USA - T95E2
		't54_e2',					// USA - T54E2
		'fcm_f1',					// French - FCM F1
		'amx_m4_1948',				// French - AMX M4 (1948)
		'amx_65t',					// French - AMX 65 t
		'fcm2c',					// French - FCM 2C
		'_2cbis'					// French - 2C Bis
		]);

		tstrings.push( // Tank Destroyers, 0.8.6
		[ 'Tank&#8194;Destroyer', // group identifier
		// Soviet
		'at-1',							// AT-1
		'su-76',						// SU-76
		'gaz-74b',						// SU-85B
		'su-85',						// SU-85
		'su_85i',						// SU-85 (I)
		'su-100',						// SU-100
		'su100y',						// SU-100Y
		'su-152',						// SU-152
		'su100m1',						// SU-100M1
		'su122_44',						// SU-122-44
		'isu-152',						// ISU-152
		'su-101',						// SU-101
		'object_704',					// Object 704
		'su122_54',						// SU-122-54
		'object268',					// Object 268
		'object263',					// Object 263
		// German
		'panzerjager_i',				// Panzerjäger I
		'g20_marder_ii',				// Marder II
		'hetzer',						// Hetzer
		'stugiii',						// StuG III
		'jagdpziv',						// JagdPz IV
		'dickermax',					// Dicker Max
		'jagdpanther',					// Jagdpanther
		'e-25',							// E-25
		'ferdinand',					// Ferdinand
		'jagdpantherii',				// Jagdpanther II
		'jagdtiger_sdkfz_185',			// 8,8 cm PaK 43 Jagdtiger
		'jagdtiger',					// Jagdtiger
		'jagdpz_e100',					// JagdPz E-100
		// USA
		't18',							// T18
		't82',							// T82
		't40',							// T40
		'm8a1',							// M8A1
		'm10_wolverine',				// M10 Wolverine
		't49',							// T49
		'm36_slagger',					// M36 Jackson
		'm18_hellcat',					// M18 Hellcat
		't25_at',						// T25 AT
		't25_2',						// T252
		't28',							// T28
		't28_prototype',				// T28 Prototype
		't30',							// T30
		't95',							// T95
		't110e4',						// T110E4
		't110e3',						// T110E3
		// French
		'renaultft_ac',					// RenaultFT AC
		'fcm_36pak40',					// FCM36 PaK40
		'renaultue57',					// Renault UE 57
		'somua_sau_40',					// Somua SAu-40
		's_35ca',						// S-35 CA
		'arl_v39',						// ARL V39
		'amx_ac_mle1946',				// AMX AC Mle. 1946
		'amx_ac_mle1948',				// AMX AC Mle. 1948
		'amx50_foch',					// AMX 50 Foch
		'amx_50fosh_155',				// AMX-50 Foch (155)
		// UK
		'gb39_universal_carrierqf2',	// Universal Carrier 2-pdr
		'gb42_valentine_at',			// Valentine AT
		'gb57_alecto',					// Alecto
		'gb73_at2',						// AT 2
		'gb74_at8',						// AT 8
		'gb40_gun_carrier_churchill',	// Churchill Gun Carrier
		'gb75_at7',						// AT 7
		'gb71_at_15a',					// AT 15A
		'gb72_at15',					// AT 15
		'gb32_tortoise',				// Tortoise
		'gb48_fv215b_183',				// FV215b (183)
		// Chinese
		// ...
		// Rumours
		'it45',							// Soviet - IT-45
		'su76l',						// Soviet - SU-76 (I)
		'su76bm',						// Soviet - SU-76BM
		'marder_iii',					// German - Marder III Ausf. H
		'e-10',							// German - E-10
		'e-25',							// German - E-25
		'nashorn',						// German - Nashorn
		'sturer_emil',					// German - VK 30.01 (H) Sturer Emil
		't24',							// USA - T24
		'panzerjager35r',				// French - Panzerjäger 35R
		'_28_32pz38hf',					// French - 28/32 PzKpfw 38H735 (f)
		'acl135'						// French - ACL 135
		]);

		tstrings.push( // Self-Propelled Guns, 0.8.6
		[ 'SP-Artillery', // group identifier
		// Soviet
		'su-18',				// SU-18
		'su-26',				// SU-26
		'su-5',					// SU-5
		'su-122a',				// SU-122A
		'su-8',					// SU-8
		's-51',					// S-51
		'su-14_1',				// SU-14-1
		'su-14',				// SU-14
		'object_212',			// Object 212
		'object_261',			// Object 261
		// German
		'gw_mk_vie',			// 10.5 GW Mk.IV(e)
		'bison_i',				// Sturmpanzer I Bison
		'wespe',				// Wespe
		'pz_sfl_ivb',			// Pz.SfI.IVb
		'sturmpanzer_ii',		// Sturmpanzer II
		'grille',				// Grille
		'hummel',				// Hummel
		'g_panther',			// GW Panther
		'g_elefant',			// GW Elefant
		'g_tiger',				// GW Tiger
		'g_e',					// GW Typ E
		// USA
		't57',					// T57
		'm7_priest',			// M7 Priest
		'm37',					// M37
		'm41',					// M41
		'm44',					// M44
		'm12',					// M12
		'm40m43',				// M40/M43
		'm53_55',				// M53/M55
		't92',					// T92
		// French
		'renaultbs',			// RenaultBS
		'lorraine39_l_am',		// Lorraine39 L AM
		'amx_ob_am105',			// AMX Obusier AM105
		'amx_105am',			// AMX 105AM
		'_105_lefh18b2',		// 105 leFH18B2
		'amx_13f3am',			// AMX 13 F3AM
		'lorraine155_50',		// Lorraine155 50
		'lorraine155_51',		// Lorraine155 51
		'bat_chatillon155_55',	// Bat Chatillon 155 55
		'bat_chatillon155',		// Bat Chatillon 155
		// UK
		'gb78_sexton_i',		// Sexton I
		// Chinese
		// ...
		// Rumours
		'brummbar',				// German - Brummbär
		'roket_sturmtiger',		// German - Sturmtiger
		'lorraine37_l_ac'		// French - Lorraine37 L AC
		]);

		var index = function(imgName) {
			for (j=1; j<tstrings.length; ++j) {
				if (tstrings[j].indexOf(imgName) >= 0) {
					// remove array order dependency by using
					//	a group identifer to index vtype
					return tstrings[0].indexOf(tstrings[j][0]);
				}
			}
			return 0;
		};

		var vclass = function(idx) {
			return tstrings[0][idx];
		};

		var vcls_idx = function(name) {
			return tstrings[0].indexOf(name);
		};

		var vcls_len = function() {
			return tstrings[0].length;
		};

		return { index: index, vclass: vclass, vcls_len: vcls_len, vcls_idx: vcls_idx };
	})();

	var veh_color = (function() {
		// Add any new prem tanks to this list (and in the appropriate veh_names arrays)
		var prems = // Premium Tanks, 0.8.5
		[
		// Soviet
		'tetrarch_ll',					// Tetrarch
		'bt-sv',						// BT-SV
		'm3_stuart_ll',					// M3 Light
		't-127',						// T-127
		'valentine_ll',					// Valentine II
		'a-32',							// A-32
		'matilda_ii_ll',				// Matilda IV
		'churchill_ll',					// Churchill III
		'kv-220',						// KV-220 Beta-Test
		'kv-220_action',				// KV-220
		'object252',					// IS-6
		'kv-5',							// KV-5
		'su_85i',						// SU-85 (I)
		'su100y',						// SU-100Y
		'su122_44',						// SU-122-44
		'object_907',					// Object 907 (CW Tank)
		// German
		'h39_captured',					// PzKpfw 38H735 (f)
		'pzii_j',						// PzKpfw II Ausf. J
		't-15',							// T-15
		's35_captured',					// PzKpfw S35 739 (f)
		't-25',							// T-25
		'pziv_hydro',					// PzKpfw IV Hydraulic
		'pzv_pziv',						// PzKpfw V-IV
		'pzv_pziv_ausf_alfa',			// PzKpfw V-IV Alpha
		'pziv_schmalturm',				// PzKpfw IV Schmalturm
		'panther_m10',					// Panther-M10
		'b-1bis_captured',				// PzKpfw B2 740 (f)
		'lowe',							// Löwe
		'dickermax',					// Dicker Max
		'e-25',							// E-25
		'jagdtiger_sdkfz_185',			// 8,8 cm Pak 43 Jagdtiger
		'vk7201',						// VK72.01 (CW Tank)
		// USA
		't2_lt',						// T2 Light Tank
		't1_e6',						// T1E6
		'm22_locust',					// M22 Locust
		'mtls-1g14',					// MTLS-1G14
		'ram-ii',						// Ram II
		'm4a2e4',						// M4A2E4 Sherman
		't26_e4_superpershing',			// T26E4 Superpershing
		't14',							// T14
		't34_hvy',						// T34
		'm6a2e1',						// M6A2E1
		'm60',							// M60 (CW Tank)
		// French
		'fcm_50t',						// FCM 50 t
		'fcm_36pak40',					// FCM36 PaK40
		'_105_lefh18b2',				// 105 leFH18B2
		// UK
		'gb68_matilda_black_prince',	// Matilda Black Prince
		'gb51_excelsior',				// Excelsior
		'gb63_tog_ii',					// TOG II*
		'gb71_at_15a',					// AT 15A
		'gb27_sexton',					// Sexton
		// Chinese
		'ch02_type62',					// Type 62
		'ch01_type59',					// Type 69
		'ch03_wz-111',					// WZ-111
		'ch23_112'						// WZ-112
		];

		var set_prem_col = function(imgName) {
			if (prems.indexOf(imgName) >= 0) return "#ffc363";
			return null;
		};

		return { set: set_prem_col };
	})();

	var levOrder = ["X","IX","VIII","VII","VI","V","IV","III","II","I"];

	var nations = [
			{ name: "all", battles: 0, wins: 0 },
			{ name: "Russia", icon: "js-ussr td-armory-icon", battles: 0, wins: 0 },
			{ name: "Germany", icon: "js-germany td-armory-icon", battles: 0, wins: 0 },
			{ name: "USA", icon: "js-usa td-armory-icon", battles: 0, wins: 0 },
			{ name: "France", icon: "js-france td-armory-icon", battles: 0, wins: 0 },
			{ name: "China", icon: "js-china td-armory-icon", battles: 0, wins: 0 },
			{ name: "UK", icon: "js-uk td-armory-icon", battles: 0, wins: 0 }
		];

	// result-container, overall results and battle performance
	var rdiv = document.createElement('div');
	rdiv.className = "result-container";

	var rtab = document.getElementsByClassName("t-result")[0];
	rtab.parentNode.insertBefore(rdiv, rtab.nextSibling);
	rdiv.appendChild(rtab);
	// end result container

	// fame-container, hall of fame
	var gdiv = document.createElement('div');
	gdiv.className = "fame-container";
	rdiv.parentNode.insertBefore(gdiv, rdiv.nextSibling);
	gdiv.innerHTML += "<div class='stat-header'><span class='stat-header'>Hall of Fame</span></div>";

	var tstat = document.getElementsByClassName("t-statistic"),
		globaltable = tstat[0];
	gdiv.appendChild(globaltable);
	// end fame-container container

	// table-container, div container for performance tables
	var cdiv = document.getElementsByClassName("l-content")[0].lastElementChild;
	cdiv.className = "table-container";
	gdiv.parentNode.insertBefore(cdiv, gdiv.nextSibling);

	// tank-container, 1st table for vehicle performance, ordered by battles with tank
	var tdiv = document.createElement('div');
	tdiv.className = "tank-container";
	cdiv.appendChild(tdiv);
	tdiv.innerHTML += "<div class='stat-header'><span class='stat-header'>Vehicle Performance</span></div>";

	var tanktable = tstat[1];
	tdiv.appendChild(tanktable);

	var click_style	  = "<div onclick='sortTd(this,0)' style='cursor: pointer'",
		l_click_style = "<div onclick='sortTd(this,0)' style='cursor: pointer;text-align: left'>";

	var th = document.createElement('th');
	th.className = "t-cls-res";
	th.innerHTML = click_style+">Winrate</div>";

	var yd = document.getElementsByTagName('th'),
		trth = yd[yd.length-1].parentNode;

	trth.innerHTML = "<th>"+("Tier")+"</th>"+trth.innerHTML.replace(2,1);
	trth.appendChild(th);

	trth.innerHTML = trth.innerHTML.replace(/<th>/gm,"<th class='t-cls-res'>"+l_click_style); // tier
	trth.innerHTML = trth.innerHTML.replace(/<th colspan="1">/gm,"<th class='t-cls-res'>"+l_click_style); // vehicles
	trth.innerHTML = trth.innerHTML.replace(/<th class="right"/gm, "<th class='t-cls-res'>"+click_style); // battles and victories
	trth.innerHTML = trth.innerHTML.replace(/<\/th>/gm,'</div></th>');

	// hideTypes on header row, will eventually style this steamer
	var nsel = '<select name="nation" id="nationality" onchange="hideTypes(this)" style="height:15px;font-size:11px;background-color:rgb(5,7,9);color:rgb(143,147,147)">';
		nsel +="<option value=0>Nation</option>";

	for (j=1; j<nations.length; ++j) {
		nsel += "<option value="+j+">"+nations[j].name+"</option>";
	}
	nsel +="</select>";
	trth.cells[0].innerHTML += nsel;

	// battles
	trth.cells[2].innerHTML += "<div style='font-size:11px'>> <input onchange='hideTypes(this)' size=1 name='from' id='chfrom' style='height:15px;width:36px;background-color:rgb(5,7,9);color:rgb(143,147,147);'>";

	// veh type
	var sel = document.createElement("select");
		sel.innerHTML += "<option value=0>All Types</option>";

	for (j=1; j<veh_names.vcls_len(); ++j) {
		var vnc = veh_names.vclass(j);
		sel.innerHTML += "<option value="+vnc+">"+vnc+"</option>";
	}
	sel.value = 0;

	var th = document.createElement('th');
	th.className = "t-cls-res";
	th.innerHTML = click_style+">Type</div>";
	th.appendChild(sel);
	th.innerHTML = th.innerHTML.replace('<select>','<select name="type" id="tankType" onchange="hideTypes(this)" style="height:15px;font-size:11px;background-color:rgb(5,7,9);color:rgb(143,147,147)" >');

	trth.insertBefore(th, trth.cells[0]);
	// end hideTypes

	var lev = new Object(),
		levtr = [],
		tt = new Object(),
		trTank = [];

	var yd = document.getElementsByTagName('td');

	// looping thru main tank table
	for (i=0; i<yd.length; i++)	 // dev has 826 tags o.O
	{
		if(yd[i].className.indexOf("td-armory-icon") >1 )
		{
			var b = toFl(yd[i+2].innerHTML);
			var w = toFl(yd[i+3].innerHTML);
			nations[0].battles += b;
			nations[0].wins += w;

			for (j=1; j<nations.length; ++j) {
				if(yd[i].className.indexOf(nations[j].icon) == 0) {
					nations[j].battles += b;
					nations[j].wins += w;
					nat = j;
					break;
				}
			}

			levN = yd[i].getElementsByTagName('span')[0].innerHTML.replace(/<[^<]*>/g,"").replace(/\s/g,"");
			if (lev[levN]==undefined) {
				lev[levN] = new Object();
				lev[levN].b = 0;
				lev[levN].w = 0;
				lev[levN].t = [];

				for (j=0; j < veh_names.vcls_len(); ++j) {
					lev[levN].t[j] = new Object();
					lev[levN].t[j].b = 0;
					lev[levN].t[j].w = 0;
				}
			}
			lev[levN].b += b;
			lev[levN].w += w;

			imgName = yd[i].getElementsByTagName('img')[0].src.match(/\/[^-]+-([^\/]*)\.png/)[1];

			var ttN = veh_names.index(imgName); // ttN is a class index, 1-5

			if((yd[i+1].getElementsByTagName("a")[0]) != undefined) {
				var prem_col = veh_color.set(imgName);
				if (prem_col != null) {
					yd[i+1].innerHTML = yd[i+1].innerHTML.replace(
							'a class="b-gray-link" href', "a style='color:"+veh_color.set(imgName)+"' href");
				}
			}

			tankType = "t"+ttN;
			if (tt[tankType]==undefined)
			{
				tt[tankType] = new Object();
				tt[tankType].b = 0;
				tt[tankType].w = 0;

				tt[tankType].n = [];

				for (j=1; j<nations.length; j++)
				{
					tt[tankType].n[j] = new Object();
					tt[tankType].n[j].b = 0;
					tt[tankType].n[j].w = 0;
				}
			}
			tt[tankType].b += b;
			tt[tankType].w += w;

			tt[tankType].n[nat].b += b;
			tt[tankType].n[nat].w += w;

			lev[levN].t[ttN].b += b;
			lev[levN].t[ttN].w += w;

			var a =(w/b*100);
			trTankTable = yd[i].parentNode;

			trTankTable.innerHTML = trTankTable.innerHTML.replace(/<td class="right value"/gm, "<td class='t-cls-res'");

			var tdProc = document.createElement("td");
			tdProc.className = "t-cls-res";
			tdProc.innerHTML = ""+col(a,2)+"%";
			trTankTable.appendChild(tdProc);

			trTank.push([trTankTable, ttN, imgName, b, w, a]);
			yd[i].setAttribute("nat", nat);
		}
	}

	var sv = (function() {
		var battles = nations[0].battles,
			wins	= nations[0].wins,

			caps	= spanText(tstat[0].rows[6].cells[3].innerHTML),
			damage	= spanText(tstat[0].rows[7].cells[3].innerHTML),
			defs	= spanText(tstat[0].rows[8].cells[3].innerHTML),
			frags	= spanText(tstat[0].rows[9].cells[3].innerHTML),
			spotted = spanText(tstat[0].rows[10].cells[3].innerHTML);

	function spanText(res) {
		if (res.indexOf("span") > 0) {
		   res=res.substr(0,res.indexOf("span"));
		}
		return toFl(res);
	}

		return {
			wins:	  wins,		// overall wins
			battles:  battles,	// overall battles

			avgFrags: (frags/battles),
			avgDmg:	  (damage/battles),
			avgSpots: (spotted/battles),
			avgDef:	  (defs/battles),
			avgCap:	  (caps/battles),
			avgWin:	  (wins/battles)
		};
	})();

	// scope a few helper functions, they will need to be
	// defined before use if included inside the script body
	function addTd(tr, val, classname, title)
	{
		var tdNew = document.createElement('td');
		tdNew.innerHTML = val;
		if(classname != "") {
			tdNew.className = classname;
		}
		if(title != "") {
			tdNew.title = title;
		}
		tdNew.value = val;
		tr.appendChild(tdNew);
	}

	function insertNewTr(NewTrParent, text, val, title, classname)
	{
		var trNew = document.createElement('tr');
		if (classname != "") {
			trNew.className = classname;
		}
		var tdNewName = document.createElement('td');
		tdNewName.innerHTML = text;

		var tdNew = document.createElement('td');
		tdNew.innerHTML = val;
		if (title != "") {
			tdNew.title = title;
		}
		tdNew.className = "td-number-nowidth";

		NewTrParent.parentNode.appendChild(trNew);
		trNew.appendChild(tdNewName);
		trNew.appendChild(tdNew);

		return trNew;
	}

	function addTr(NewTrParent, text)
	{
		var trNew = document.createElement('tr');
		trNew.innerHTML = text;

		NewTrParent.parentNode.appendChild(trNew);

		return trNew;
	}

	function insertTank(NewTrParent, level, battle, win, avgTier, name, title)
	{
		var trNew = document.createElement('tr');
		trNew.className = "t-row";
		var tdNewLevel = document.createElement('td');
		tdNewLevel.innerHTML = level;

		var tdNewBattle = document.createElement('td');
		tdNewBattle.className = "t-cls-res";
		tdNewBattle.innerHTML = battle;
		if (title != "") {
			tdNewBattle.title = title;
		}
		var tdNewW = document.createElement('td');
		if (avgTier == null) tdNewW.innerHTML = win;
		else tdNewW.innerHTML = avgTier;
		tdNewW.className = "t-cls-res";

		var tdNewP = document.createElement('td');
		tdNewP.innerHTML = "" + col(win/battle*100, 2) + "%";
		tdNewP.className = "t-cls-res";

		NewTrParent.parentNode.appendChild(trNew);
		trNew.appendChild(tdNewLevel);
		trNew.appendChild(tdNewBattle);
		trNew.appendChild(tdNewW);
		trNew.appendChild(tdNewP);

		return trNew;
	}
	// end helper functions

	// replace total cap with avgCap
	var ctable_cap = tclass[1].rows[5].cells;
	ctable_cap[0].firstChild.data = "Capture per Battle:";
	ctable_cap[1].firstChild.data = sv.avgCap.toFixed(2);

	// replace total def with avgDef
	var ctable_def = tclass[1].rows[6].cells;
	ctable_def[0].firstChild.data = "Defense per Battle:";
	ctable_def[1].firstChild.data = sv.avgDef.toFixed(2);

	// overall win% color
	var nat_win = col((sv.wins/sv.battles)*100, 2),
		ltable_vict = tclass[0].rows[2].cells[1];
	ltable_vict.innerHTML = ltable_vict.innerHTML.replace(/ \(.*\)/,"&nbsp;(" +nat_win +"%)");

	var NatParent =	  tclass[0].rows[tclass[0].rows.length-1].cells[0].parentNode.parentNode,
		NewtrParent = tclass[1].rows[tclass[1].rows.length-1].cells[0].parentNode.parentNode,
		ttParent =	  tclass[2].rows[tclass[2].rows.length-1].cells[0].parentNode.parentNode;

	for (i=1; i<nations.length; ++i) // skip 'all' in index
	{
		var nation = nations[i];

		if (nation.battles != 0) {
			var nwcol = col(nation.wins/nation.battles*100,2);
			insertNewTr(NatParent, "Battles with " +nation.name +":",
						("" +nation.battles+ " (" +nwcol + "%)"), "Battles/Win Percent", "");
		}
	}

	if (daypassed != 0) {
		insertNewTr(NatParent, "Battles per Day:",
					(""+(sv.battles/daypassed).toFixed(0)+""), "Total Days"+": "+daypassed.toFixed(), "");
	}
	// end tank-container

	// tier-container, 2nd tank table, ordered by tier
	var tdiv = document.createElement("div");
	tdiv.className = "tier-container";
	ts = trTankTable.parentNode.parentNode.parentNode;
	ts.parentNode.appendChild(tdiv);
	tdiv.innerHTML += "<div class='stat-header'><span class='stat-header'>Tier Performance per Vehicle Type</span></div>";

	var Table = document.createElement("table");
	Table.className = "t-statistic";
	tdiv.appendChild(Table);

	var tr = document.createElement("tr");
	Table.appendChild(tr);
	trTankTable = tr;
	trLev = insertNewTr(trTankTable, "<span class='t-classHdr'>Tier</span>",
									 "<span class='t-classHdr'>Battles</span>", "", "t-row-header");

	addTd(trLev, "Victories", "t-classHdr", "");
	addTd(trLev, "Overall", "t-classHdr", "");

	var tank_class = [];

	for (i=0; i<veh_names.vcls_len(); ++i) {
		// complete the tank_class objects, slight cost in doing this during runtime.
		// frags, spotted, damage, and survived can be obtained from api data eventually
		var tc_member = {name:(veh_names.vclass(i)),battles:0,wins:0,avgTier:0,frags:0,spotted:0,damage:0,survived:0};
		tank_class.push(tc_member);
	}
	var type_b = [];

	for (i=1; i<tank_class.length; ++i) {
		type_b[i] = [];
		addTd(trLev, tank_class[i].name, "t-classHdr", "");
	}

	for(i=0; i<levOrder.length; i++)
	{
		// init type_b slices
		for (k=1; k<type_b.length; ++k) {
			type_b[k].push(0);
		}

		key = levOrder[i];
		if(lev[key]!=undefined)
		{
			tank_class[0].avgTier += (10-i)*lev[key].b/sv.battles;

			levTr = insertTank(trTankTable, key, lev[key].b, lev[key].w,
								null, "lev", (lev[key].b/sv.battles*100).toFixed(2)+"%");

			for(j=1; j<type_b.length; ++j)
			{
				b = lev[key].t[j].b;

				type_b[j][i] = b;			 // save type battles per tier
				tank_class[j].battles += b;	 // accumulate class battles

				w = lev[key].t[j].w;
				tank_class[j].wins += w;

				if (b == 0) addTd(levTr, "x", "t-cls-res", "");
				else addTd(levTr, ""+col(w/b*100,2)+"%", "t-cls-res", ""+w+"/"+b);
			}
		}
	}
	// end tier-container

	var avgTier = tank_class[0].avgTier;

	// adjusted arty tiers for comparisons
	var spg = veh_names.vcls_idx('SP-Artillery');

	var tier_shift = 2;
	for (i=0; i<tier_shift; ++i) {
		type_b[spg].push(0);
		type_b[spg].shift();
	}

	var adjTier = 0;
	for (i=0; i<levOrder.length; ++i) {
		for (j=1; j<type_b.length; ++j) {
			adjTier += (levOrder.length-i)*type_b[j][i]/sv.battles;
		}
	}
	console.log("overall average tier, adjusted for SPG: ", adjTier.toFixed(2));

	// reverse the tier sequences, in case we want to show class
	// type/tier battles later in a somewhat more logical manner
	for (i=1; i<type_b.length; ++i) // for each class
	{
		type_b[i].reverse();

		// calculate average tier for each tank class
		for (j=0; j<levOrder.length; ++j) {
			tank_class[i].avgTier += (j+1) * type_b[i][j]/tank_class[i].battles;
		}
		console.log("tier 1-10 battles ", tank_class[i].name, type_b[i], " total: ", tank_class[i].battles,
					" avg tier: ", tank_class[i].avgTier.toFixed(3));
	}
	// warning: SPG in class table will show adjusted tier

	// stat functions (using basic module patterns)
	var eff_c = (function() {
		// common ranking for Eff stats
		var ranks = [
			{ step: 2050, color: sc.col.sup_uni },
			{ step: 1800, color: sc.col.unicum },
			{ step: 1500, color: sc.col.great },
			{ step: 1200, color: sc.col.good },
			{ step:	 900, color: sc.col.avg },
			{ step:	 600, color: sc.col.b_avg },
			{ step:	   0, color: sc.col.e_bad }
		],

		rankIndex = function(stat) {
			for (var i=0; i<ranks.length; ++i)
			{
				if (stat >= ranks[i].step) {
					var stat_col = ranks[i].color;
					break;
				}
				var stat_col = sc.col.no_col; // default color (none)
			}
			return "<font color='"+stat_col+"'>"+stat.toFixed(2)+"</font>";
		};

		return { fmt: rankIndex };
	})();

	var wn_c = (function() {
		// common ranking for WN stats
		var ranks = [
			{ step: 2050, color: sc.col.sup_uni },
			{ step: 1850, color: sc.col.unicum },
			{ step: 1550, color: sc.col.great },
			{ step: 1400, color: sc.col.v_good },
			{ step: 1150, color: sc.col.good },
			{ step:	 900, color: sc.col.avg },
			{ step:	 750, color: sc.col.b_avg },
			{ step:	 600, color: sc.col.bad },
			{ step: -999, color: sc.col.e_bad }
		],

		rankIndex = function(stat) {
			for (var i=0; i<ranks.length; ++i)
			{
				if (stat >= ranks[i].step) {
					var stat_col = ranks[i].color;
					break;
				}
				var stat_col = sc.col.no_col; // default color (none)
			}
			return "<font color='"+stat_col+"'>"+stat.toFixed(2)+"</font>";
		};

		return { fmt: rankIndex };
	})();

	var eff = (function() {
		var frag = sv.avgFrags*(0.35-2*avgTier/100)*1000,
			dmg	 = sv.avgDmg*(10/avgTier)*(0.15+2*avgTier/100),
			spot = sv.avgSpots*0.2*1000,
			cap	 = sv.avgCap*0.15*1000,
			def	 = sv.avgDef*0.15*1000,

			stat = frag + dmg + spot + cap + def;

		return { frag: frag, dmg: dmg, spot: spot, cap: cap, def: def, stat: stat, fmt: eff_c.fmt(stat) };
	})();

	var wneff = (function() {
		// new and improved Eff
		var frag = sv.avgFrags*250,
			dmg	 = sv.avgDmg*(10/(avgTier+2))*(0.23+2*avgTier/100),
			spot = sv.avgSpots*150,
			cap	 = log(sv.avgCap+1,1.732)*150,
			def	 = sv.avgDef*150,

			stat = frag + dmg + spot + cap + def;

		function log(n, b) {
			return Math.log(n)/Math.log(b);
		}

		return { frag: frag, dmg: dmg, spot: spot, cap: cap, def: def, stat: stat, fmt: eff_c.fmt(stat) };
	})();

	var wn4 = (function() {
		var frag = 465*sv.avgFrags,
			dmg	 = (sv.avgDmg*460)/(184*Math.exp(0.24*avgTier)),
			spot = sv.avgSpots*125,
			def	 = Math.min(2.2, sv.avgDef)*100,
			win	 = ((185/(0.17+Math.exp(((sv.avgWin*100)-35)*-0.134)))-500)*0.5,

			stat = frag + dmg + spot + def + win;

		return { frag: frag, dmg: dmg, spot: spot, def: def, win: win, stat: stat, fmt: wn_c.fmt(stat) };
	})();

	var wn6 = (function() {
		var frag = sv.avgFrags*(1240-1040/(Math.pow(Math.min(avgTier,6),0.164))),
			dmg	 = sv.avgDmg*530/(184*Math.exp(0.24*avgTier)+130),
			spot = sv.avgSpots*125,
			def	 = Math.min(2.2, sv.avgDef)*100,
			win	 = (((185/(0.17+Math.exp(((sv.avgWin*100)-35)*-0.134)))-500)*0.45)
				  +((6-Math.min(avgTier,6))*-60),

			stat = frag + dmg + spot + def + win;

		return { frag: frag, dmg: dmg, spot: spot, def: def, win: win, stat: stat, fmt: wn_c.fmt(stat) };
	})();

	var wn7 = (function() {
		var frag = sv.avgFrags*(1240-1040/(Math.pow(Math.min(avgTier,6),0.164))),
			dmg	 = sv.avgDmg*530/(184*Math.exp(0.24*avgTier)+130),
			spot = sv.avgSpots*125*Math.min(avgTier,3)/3,
			def	 = Math.min(2.2, sv.avgDef)*100,
			win	 = (((185/(0.17+Math.exp(((sv.avgWin*100)-35)*-0.134)))-500)*0.45)
				  -(((5-Math.min(avgTier,5))*125)/(1+Math.exp(avgTier-Math.pow(sv.battles/220,3/avgTier))*1.5)),

			stat = frag + dmg + spot + def + win;

		return { frag: frag, dmg: dmg, spot: spot, def: def, win: win, stat: stat, fmt: wn_c.fmt(stat) };
	})();

	// wn7a - adjusted spg's up 2 tiers
	var wn7a = (function() {
		var frag = sv.avgFrags*(1240-1040/(Math.pow(Math.min(adjTier,6),0.164))),
			dmg	 = sv.avgDmg*530/(184*Math.exp(0.24*adjTier)+130),
			spot = sv.avgSpots*125*Math.min(avgTier,3)/3,
			def	 = Math.min(2.2, sv.avgDef)*100,
			win	 = (((185/(0.17+Math.exp(((sv.avgWin*100)-35)*-0.134)))-500)*0.45)
				  -(((5-Math.min(avgTier,5))*125)/(1+Math.exp(avgTier-Math.pow(sv.battles/220,3/avgTier))*1.5)),

			stat = frag + dmg + spot + def + win;

		return { frag: frag, dmg: dmg, spot: spot, def: def, win: win, stat: stat, fmt: wn_c.fmt(stat) };
	})();
	// end stat modules

	// add stuff to 2nd col, top table
	insertNewTr(NewtrParent, "Damage per Battle:", sv.avgDmg.toFixed(2), "", "");
	insertNewTr(NewtrParent, "Frags per Battle:" , sv.avgFrags.toFixed(2), "", "");
	insertNewTr(NewtrParent, "Spotted per Battle:", sv.avgSpots.toFixed(2), "", "");
	insertNewTr(NewtrParent, "Average Tier:", avgTier.toFixed(2), "", "");
	insertNewTr(NewtrParent, "Average Tier (+2 SPG):", adjTier.toFixed(2), "", "");

	// add stuff to 3rd col, top table
	addTr(ttParent, "<th style='padding-top: 56px;' colspan='2'>Performance Ratings</th>", "");
	insertNewTr(ttParent, "New Efficiency:", wneff.fmt, "", "");
	insertNewTr(ttParent, "Old Efficiency:", eff.fmt, "", "");
	insertNewTr(ttParent, "WN7:", wn7.fmt, "", "");
	// noobmeter will pop in here when the site data is fetched

	// nation-container, 3rd tank table, ordered by type
	var tdiv = document.createElement("div");
	tdiv.className = "nation-container";
	ts = trTankTable.parentNode.parentNode;
	ts.parentNode.appendChild(tdiv);
	tdiv.innerHTML += "<div class='stat-header'><span class='stat-header'>Vehicle Type Performance per Nation</span></div>";

	var Table = document.createElement("table");
	Table.className = "t-statistic";
	tdiv.appendChild(Table);

	var tr = document.createElement("tr");
	Table.appendChild(tr);
	trTankTable = tr;

	trType = insertNewTr(trTankTable, "<span class='t-classHdr'>Type</span>",
									  "<span class='t-classHdr'>Battles</span>", "", "t-row-header");

	addTd(trType, "Average Tier", "t-classHdr", "");  // previously 'Victories'
	addTd(trType, "Overall", "t-classHdr", "");

	for(j=1; j<nations.length; j++) {
		addTd(trType, nations[j].name,"t-classHdr", "");
	}

	var ttOr = [];
	for (var key in tt) {
		tt[key].key = key;
		ttOr.push(tt[key]);
	}
	ttOr.sort(function (a1,a2) {
			if(a1.b < a2.b) return 1;
			else return -1;
		});

	for (i=0; i<ttOr.length; i++)
	{
		key = ttOr[i].key;

		var t_win = (tt[key].b/sv.battles*100).toFixed(2),
			tc_at = tank_class[key[1]].avgTier.toFixed(2);

		if (tank_class[key[1]].name == 'SP-Artillery') tc_at += ' (+2)'; // indicate +2 avg tier for arty

		typeTr = insertTank(trTankTable, toType(key), tt[key].b, tt[key].w, tc_at, "typ", t_win +"%");

		for(j=1; j<nations.length; j++)
		{
			b = tt[key].n[j].b; // battle by nation
			w = tt[key].n[j].w; // win
			if (b == 0) addTd(typeTr, "x", "t-cls-res", "");
			else addTd(typeTr, ""+col(w/b*100,2)+"%", "t-cls-res", ""+w+"/"+b);
		}
	}

	// left column 'Type' strings
	for (i=0; i<trTank.length; i++) {
		trTank[i][0].innerHTML = "<td>"+toType("t"+trTank[i][1])+"</td>"+trTank[i][0].innerHTML;
	}

	sortTd(trth.cells[1].childNodes[0]);
	// end nation-container
	// end table-container

	// create and populate performance ratings calcs table
	sdiv = document.createElement("div");
	sdiv.className = "ratings-container";
	sts = document.getElementsByClassName("result-container")[0];
	sts.parentNode.insertBefore(sdiv, sts.nextSibling);

	sdiv.innerHTML = "<div class='stat-header'><span class='stat-header'>Performance Rating Calculations</span></div>";

	var sTable = document.createElement("table");
	sTable.className = 't-perfstats';

	var sTHead = document.createElement("thead"),
		sTBody = document.createElement("tbody");

	sTable.appendChild(sTHead);
	sTable.appendChild(sTBody);

	var sRow, sCell;
	sRow = document.createElement("tr");
	sTHead.appendChild(sRow);

	var heading = ["Formula Type", "Total", "Frags", "Damage", "Spotting", "Capping", "Defence", "Victories"];

	for (i=0; i<heading.length; ++i)
	{
		sCell = document.createElement("th");
		sCell.innerHTML = heading[i];
		sRow.appendChild(sCell);
	}
	sdiv.appendChild(sTable);

	var bstat = [];

		 // header:	 Formula	 Total	   Frag		Dmg		Spot	Cap		Def		Win
	bstat.push(["New Efficiency", wneff.fmt, wneff.frag.toFixed(2), wneff.dmg.toFixed(2),
				wneff.spot.toFixed(2), wneff.cap.toFixed(2), wneff.def.toFixed(2), "x"]);

	bstat.push(["Old Efficiency", eff.fmt, eff.frag.toFixed(2), eff.dmg.toFixed(2),
				eff.spot.toFixed(2), eff.cap.toFixed(2), eff.def.toFixed(2), "x"]);

	bstat.push(["WN4", wn4.fmt, wn4.frag.toFixed(2), wn4.dmg.toFixed(2),
				wn4.spot.toFixed(2), "x", wn4.def.toFixed(2), wn4.win.toFixed(2)]);

	bstat.push(["WN6", wn6.fmt, wn6.frag.toFixed(2), wn6.dmg.toFixed(2),
				wn6.spot.toFixed(2), "x", wn6.def.toFixed(2), wn6.win.toFixed(2)]);

	bstat.push(["WN7", wn7.fmt, wn7.frag.toFixed(2), wn7.dmg.toFixed(2),
				wn7.spot.toFixed(2), "x", wn7.def.toFixed(2), wn7.win.toFixed(2)]);

	bstat.push(["WN7 (+2 SPG)", wn7a.fmt, wn7a.frag.toFixed(2), wn7a.dmg.toFixed(2),
				wn7a.spot.toFixed(2), "x", wn7a.def.toFixed(2), wn7a.win.toFixed(2)]);

	for (i=0; i<bstat.length; ++i)
	{
		sRow = document.createElement("tr");
		sTBody.appendChild(sRow);

		for (j=0; j<bstat[i].length; ++j)
		{
			sCell = document.createElement("td");
			sCell.innerHTML = bstat[i][j];
			sRow.appendChild(sCell);
		}
	}
	sdiv.innerHTML += "<div class='scriptlink'><a target='_blank' "
					+"href='http://forum.worldoftanks.com/index.php?/topic/184017-'>What is WN*?</a></div>";
	// end perf calcs table

	// response handlers for web requests
	function apiHnd(response)
	{
		eval("var resp ="+ response.responseText);

		ins_medal_resp(resp.data.achievements);

		if (devMode) ins_veh_resp(resp.data.vehicles);

		// other data available:
		// resp.data.ratings
		// resp.data.vehicles
		// resp.data.battles
		// resp.data.summary
		// resp.data.experience
		// resp.data.clan
	}

	function nmHnd(response)
	{
		var nmpr = parseFloat(response.responseText);

		if (isNaN(nmpr)) {
			var nm_fmt = "No Rating";
		}
		else
		{
			switch(true) {
				case (nmpr>=2000): color = sc.col.sup_uni; break;
				case (nmpr>=1950): color = sc.col.unicum;  break;
				case (nmpr>=1750): color = sc.col.great;   break;
				case (nmpr>=1450): color = sc.col.good;	   break;
				case (nmpr>=1250): color = sc.col.avg;	   break;
				case (nmpr>=1150): color = sc.col.b_avg;   break;
				case (nmpr<1150):  color = sc.col.e_bad;   break;
				default:		   color = sc.col.no_col;
			}
			var nm_fmt = "<font color='"+color+"'>"+nmpr.toFixed(2)+"</font>";
		}
		insert_nm_resp(nm_fmt);
	}

	function histHnd(response)
	{
		var resptxt = response.responseText;

		// aliases
		var alist = sift(/>([-\w]+)<\/fo/g, resptxt);
		if (alist.length > 0) {
			var aliases = alist.join(", ");
			timeDiv.innerHTML += "<span class='pl-hist'><br/>Aliases: "+aliases+"</span>";
		}

		// clan history
		var clist = sift(/>(\[[-\w]+\])/g, resptxt);
		if (clist.length > 0)
		{
			// clist contains full history, including re-ups
			//	and current clan, let's trim that down a bit
			console.log("full clan history: ", clist);

			// find consecutive re-ups
			var slist = clist.slice(0);
			clist.push(null);	 // tail
			slist.unshift(null); // head

			for (i=0; i<clist.length; i++) {
				// null adjacent dups
				if (clist[i] == slist[i]) slist[i]=null;
			}
			var filt_list = slist.filter(function(val) {
					// then strip nulls
				return !(val === "" || typeof val == "undefined" || val === null);
				});
			// restore clist to original state
			clist.pop();

			// check current membership
			var cl = document.getElementsByClassName("b-clan-list");
			if (cl.length !== 0)
			{
				var clantag = document.getElementsByClassName("tag")[0].firstChild.nodeValue;

				if (clantag != undefined)
				{
					// show mywotstats link if in a clan
					insert_mws_link();
					insert_wotcs_link();

					// and pop current clan if enrolled
					if (filt_list[(filt_list.length)-1] == clantag) filt_list.pop();
				}
			}
			if (filt_list.length > 0) {
				var clans = filt_list.join(", ");
				timeDiv.innerHTML += "<span class='pl-hist'><br/>Clan History: "+clans+"</span>";
			}

			// show d&c link if any history exists
			if (alist.length > 0 || clist.length > 0) insert_dc_link();
		}

		function sift(pattern, resptxt)
		{
			var smatch = resptxt.match(pattern);
			var names = [];

			if (smatch != null) {
				for (i=0; i<smatch.length; ++i) {
					var tmpstr = smatch[i].replace(pattern, "$1");
					names.push(tmpstr);
				}
			}
			return names;
		}
	}
	// end histHnd()

	function api_errHnd() {
		console.log("error retreiving WG API data");
		return null;
	}

	function nm_errHnd() {
		insert_nm_resp("");
		console.log("error retreiving NoobMeter data");
		return null;
	}

	function hist_errHnd() {
		console.log("error retreiving duckandcover data");
		if (opera) {
			insert_dc_link(); // show dc link for opera users
			insert_mws_link(); // and mywotstats
			insert_wotcs_link() // and wot clan statistics
		}
		return null;
	}

	function gRec(doc)
	{
		if (gecko)
		{
			var resp;
			GM_xmlhttpRequest({
				method: "GET",
				url: doc.url,
				headers: {
					"User-Agent": "Mozilla/5.0",
					"Accept": "text/xml"
				},
				onload: function(resp) {
					if (resp.readyState == 4) {
						if (resp.status == 200) doc.handler(resp);
					}
				},
				onerror: function() {
					doc.onerror();
				}
			});
		}
		else
		{
			var xhr = new XMLHttpRequest();
			var onLoadHandler = function(event) {
					doc.handler(event.target);
			}
			var onErrorHandler = function(event) {
					doc.onerror();
				}

			xhr.open("GET", doc.url, true);
			xhr.onload = onLoadHandler;
			xhr.onerror = onErrorHandler;
			xhr.send(null);
		}
	}

	// retrieve and process pages from wg api, noobmeter, and duckandcover
	var gRecProps = [
			{ url: api_url,	  handler: apiHnd,	onerror: api_errHnd,  nav: true },
			{ url: nmapi_url, handler: nmHnd,	onerror: nm_errHnd,	  nav: true },
			{ url: dc_url,	  handler: histHnd,	onerror: hist_errHnd, nav: true }
		];

	// moved so we fetch and process pages after stat tables have been populated
	for (i=0; i<gRecProps.length; ++i) {
		var doc = gRecProps[i];
		if (doc.nav) gRec(doc);
	}

	function ins_medal_resp(respdata)
	{
		// api 1.9, map medals for easier maintenance. If name: is defined then api returns it - all paths modified for EU server
		var MedalProps = [
			// battle achievements
			{ name: "warrior",					path: "achievements/top_gun",																											title: "Top Gun",				cat: "battle" },
			{ name: "sniper",					path: "achievements/sniper",																											title: "Sniper",				cat: "battle" },
			{ name: "steelwall",				path: "achievements/steel_wall",																										title: "Steel Wall",			cat: "battle" },
			{ name: "supporter",				path: "achievements/confederate",																										title: "Confederate",			cat: "battle" },
			{ name: "invader",					path: "achievements/invader",																											title: "Invader",				cat: "battle" },
			{ name: "defender",					path: "achievements/defender",																											title: "Defender",				cat: "battle" },
			{ name: "scout",					path: "achievements/scout",																												title: "Scout",					cat: "battle" },
			{ name: "evileye",					path: "achievements/new_achievements_80/dozorny",					path_na: "media/80_achievements_correct/dozorny",					title: "Patrol Duty",			cat: "battle" },
			{ name: "medalBrothersInArms",		path: "achievements/new_achievements_80/medalbrothersinarms",		path_na: "media/80_achievements_correct/medalbrothersinarms",		title: "Brothers In Arms",		cat: "battle" },
			{ name: "medalCrucialContribution", path: "achievements/new_achievements_80/medalcrucialcontribution",	path_na: "media/80_achievements_correct/medalcrucialcontribution",	title: "Crucial Contribution",	cat: "battle" },

			// commemorative achievements
			{ name: "ironMan",		path: "updateachievements/cool-headed", path_na: "achievements/cool-headed",	title: "Cool-Headed",	cat: "battle" },
			{ name: "luckyDevil",	path: "updateachievements/lucky",		path_na: "achievements/lucky",			title: "Lucky",			cat: "battle" },
			{ name: "huntsman",		path: "updateachievements/ranger",		path_na: "achievements/ranger",			title: "Ranger",		cat: "battle" },
			{ name: "sturdy",		path: "updateachievements/spartan",		path_na: "achievements/spartan",		title: "Spartan",		cat: "battle" },

			// special achievements
			{ name: "maxSniperSeries",		path: "achievements/sharpshooter",																				title: "Sharpshooter",	cat: "series" },
			{ name: "maxPiercingSeries",	path: "achievements/master_gunner",																				title: "Master Gunner",	cat: "series" },
			{ name: "maxKillingSeries",		path: "achievements/reaper",																					title: "Reaper",		cat: "series" },
			{ name: "kamikaze",				path: "achievements/kamikadze",																					title: "Kamikaze",		cat: "battle" },
			{ name: "bombardier",			path: "achievements/new_achievements_80/bombardier",	path_na: "media/80_achievements_correct/bombardier",	title: "Bombardier",	cat: "battle" },
			{ name: "maxInvincibleSeries",	path: "achievements/invincible",																				title: "Invincible",	cat: "series" },
			{ name: "maxDiehardSeries",		path: "achievements/survivor",																					title: "Survivor",		cat: "series" },
			{ name: "raider",				path: "achievements/raider",																					title: "Raider",		cat: "battle" },
			{ name: "beasthunter",			path: "achievements/tank_hunter",																				title: "Hunter",		cat: "special" },
			{ name: "mousebane",			path: "achievements/mouse_trap",																				title: "Mouse Trap",	cat: "special" },
			{ name: "pattonValley",			path: "updateachievements/patton_valley",				path_na: "achievements/patton_valley",					title: "Patton Valley",	cat: "special" },
			{ name: "sinai",				path: "portal_achievements/sinai_lion",					path_na: "maori/lion",									title: "Lion of Sinai",	cat: "special" },

			// epic achievements
			{ name: "medalBoelter",			path: "achievements/medal_belter",																				title: "Bölter&#39;s Medal",			cat: "epic" },
			{ name: "medalRadleyWalters",	path: "achievements/new_achievements_80/radley",		path_na: "media/80_achievements_correct/radley",		title: "Radley-Walter&#39;s Medal",		cat: "epic" },
			{ name: "medalLafayettePool",	path: "achievements/new_achievements_80/pool",			path_na: "media/80_achievements_correct/pool",			title: "Pool&#39;s Medal",				cat: "epic" },
			{ name: "medalOrlik",			path: "achievements/orlik",																						title: "Orlik&#39;s Medal",				cat: "epic" },
			{ name: "medalTamadaYoshio",	path: "achievements/new_achievements_80/tamada_yoshio",	path_na: "media/80_achievements_correct/tamada_yoshio",	title: "Tamada Yoshio&#39;s Medal",		cat: "epic" },
			{ name: "medalLehvaslaiho",		path: "achievements/new_achievements_80/lehveslaiho",	path_na: "media/80_achievements_correct/lehveslaiho",	title: "Lehväslaiho&#39;s Medal",		cat: "epic" },
			{ name: "medalOskin",			path: "achievements/new_achievements_80/oskin",			path_na: "media/80_achievements_correct/oskin",			title: "Oskin&#39;s Medal",				cat: "epic" },
			{ name: "medalNikolas",			path: "achievements/new_achievements_80/nicolos",		path_na: "media/80_achievements_correct/nicolos",		title: "Nichol&#39;s Medal",			cat: "epic" },
			{ name: "medalHalonen",			path: "achievements/halonen",																					title: "Halonen&#39;s Medal",			cat: "epic" },
			{ name: "medalPascucci",		path: "achievements/new_achievements_80/pascucci",		path_na: "media/80_achievements_correct/pascucci",		title: "Pascucci&#39;s Medal",			cat: "epic" },
			{ name: "medalDumitru",			path: "achievements/new_achievements_80/dumitru",		path_na: "media/80_achievements_correct/dumitru",		title: "Dumitru&#39;s Medal",			cat: "epic" },
			{ name: "medalBurda",			path: "achievements/new_achievements_80/burda",			path_na: "media/80_achievements_correct/burda",			title: "Burda&#39;s Medal",				cat: "epic" },
			{ name: "medalBillotte",		path: "achievements/billotte",																					title: "Billotte&#39;s Medal",			cat: "epic" },
			{ name: "medalBrunoPietro",		path: "achievements/new_achievements_80/bruno",			path_na: "media/80_achievements_correct/bruno",			title: "Bruno&#39;s Medal",				cat: "epic" },
			{ name: "medalTarczay",			path: "achievements/new_achievements_80/tarczay",		path_na: "media/80_achievements_correct/tarczay",		title: "Tarczay&#39;s Medal",			cat: "epic" },
			{ name: "medalKolobanov",		path: "achievements/kolobanov",																					title: "Kolobanov&#39;s Medal",			cat: "epic" },
			{ name: "medalFadin",			path: "achievements/fadin",																						title: "Fadin&#39;s Medal",				cat: "epic" },
			{ name: "heroesOfRassenay",		path: "portal_achievements/rassenay",					path_na: "maori/heroesofrassenay",						title: "Raseiniai Heroes&#39; Medal",	cat: "epic" },
			{ name: "medalDeLanglade",		path: "achievements/new_achievements_80/de_laglande",	path_na: "media/80_achievements_correct/de_laglande",	title: "De Langlade&#39;s Medal",		cat: "epic" },

			// step achievements
			{ name: "medalAbrams",		path: "achievements/abrams_all",		title: "Abrams&#39; Medal",			cat: "step" },
			{ name: "medalEkins",		path: "achievements/ekins_all",			title: "Ekins&#39; Medal",			cat: "step" },
			{ name: "medalCarius",		path: "achievements/carius_all",		title: "Carius&#39; Medal",			cat: "step" },
			{ name: "medalKnispel",		path: "achievements/knispel_all",		title: "Knispel&#39;s Medal",		cat: "step" },
			{ name: "medalPoppel",		path: "achievements/popel_all",			title: "Popel&#39;s Medal",			cat: "step" },
			{ name: "medalLeClerc",		path: "achievements/medalleclerc",		title: "LeClerc&#39;s Medal",		cat: "step" },
			{ name: "medalLavrinenko",	path: "achievements/lavrinenko_all",	title: "Lavrinenko&#39;s Medal",	cat: "step" },
			{ name: "medalKay",			path: "achievements/kay_all",			title: "Kay&#39;s Medal",			cat: "step" },

			// tank expert achievements
			{ name: "tankExpert",		path: "achievements/expert",						text: "Master Tanker",		title: "Master Tanker",		cat: "expert" },
			{ name: "tankExperts",		path: "TankExpertChina",		nation: "china",	text: "China",				title: "Expert: China",		cat: "expert" },
			{ name: "tankExperts",		path: "TankExpertFrance",		nation: "france",	text: "France",				title: "Expert: France",	cat: "expert" },
			{ name: "tankExperts",		path: "TankExpertGermany",		nation: "germany",	text: "Germany",			title: "Expert: Germany",	cat: "expert" },
			{ name: "tankExperts",		path: "TankExpertUK",			nation: "uk",		text: "UK",					title: "Expert: UK",		cat: "expert" },
			{ name: "tankExperts",		path: "TankExpertUSA",			nation: "usa",		text: "USA",				title: "Expert: USA",		cat: "expert" },
			{ name: "tankExperts",		path: "TankExpertUSSR",			nation: "ussr",		text: "USSR",				title: "Expert: USSR",		cat: "expert" },

			// mechanic engineer achievements
			{ name: "mechanicEngineer",		path: "portal_achievements/mechanic_engineer",	path_na: "maori/mechanicengineer",	text: "Technical Engineer",	title: "Senior Technical Engineer",		cat: "expert" },
			{ name: "mechanicEngineers",	path: "MechanicEngineerChina",					nation: "china",					text: "China",				title: "Tech Engineer: China",			cat: "expert" },
			{ name: "mechanicEngineers",	path: "MechanicEngineerFrance",					nation: "france",					text: "France",				title: "Tech Engineer: France",			cat: "expert" },
			{ name: "mechanicEngineers",	path: "MechanicEngineerGermany",				nation: "germany",					text: "Germany",			title: "Tech Engineer: Germany",		cat: "expert" },
			{ name: "mechanicEngineers",	path: "MechanicEngineerUK",						nation: "uk",						text: "UK",					title: "Tech Engineer: UK",				cat: "expert" },
			{ name: "mechanicEngineers",	path: "MechanicEngineerUSA",					nation: "usa",						text: "USA",				title: "Tech Engineer: USA",			cat: "expert" },
			{ name: "mechanicEngineers",	path: "MechanicEngineerUSSR",					nation: "ussr",						text: "USSR",				title: "Tech Engineer: USSR",			cat: "expert" },

			// hidden and unknowns
			{ name: "invincible",	path: "", title: "", cat: "" },	 // flags invincible
			{ name: "diehard",		path: "", title: "", cat: "" },	 // flags survivor
			{ name: "lumberjack",	path: "", title: "", cat: "" },
			{ name: "armorPiercer", path: "", title: "", cat: "" },
			{ name: "handOfDeath",	path: "", title: "", cat: "" },
			{ name: "titleSniper",	path: "", title: "", cat: "" }
		];

		var div = document.createElement("div");
		div.className = "medal-container";
		var ts = document.getElementsByClassName("ratings-container")[0];
		ts.parentNode.insertBefore(div, ts.nextSibling);
		div.innerHTML += "<div class='stat-header'><span class='stat-header'>Achievement Medals</span></div>";
		var medaldiv = document.createElement("div");
		medaldiv.className = "medal-content";
		div.appendChild(medaldiv);

		for (i=0; i < MedalProps.length; ++i)
		{
			var medal = MedalProps[i];
			var styleImg = "";
			var mc = respdata[medal.name];
			var mcsub = respdata[medal.name][medal.nation];
			var name = medal.name;
			var title = medal.title;
			var avg = (sv.battles/mc).toFixed(0);
			var medalImg = "http://worldoftanks.eu/dcont/fb/"+medal.path+".png";
			if (server == "com") {
				if ("path_na" in medal)
					{
						medal.path = medal.path_na;
					}
				medalImg = "http://worldoftanks.com/dcont/fb/"+medal.path+".png";
			}

			// normal medals
			if ((medal.path != "") && !("nation" in medal))
			{
				// titles for battle-, special- and epic achievements
				if ((medal.cat == "battle") ||
					(medal.cat == "special") ||
					(medal.cat == "epic"))
				{
					if (mc<1)
					{
						title += "&#13;&#10;Not Yet Achieved";
						styleImg = "opacity: 0.15;";
					}
					else
					{
						title += "&#13;&#10;Battles per Achievement: "+avg;
					}
				}

				// titles for sequence achievements
				if (medal.cat == "series")
				{
					if ((medal.name == "maxInvincibleSeries" && mc < 5) ||
						(medal.name == "maxDiehardSeries" && mc < 20))
					{
						title += "&#13;&#10;Not Yet Achieved";
						styleImg = "opacity: 0.15;";
					}
					title += "&#13;&#10;Series Record: "+mc;
				}

				// titles for step achievements
				if (medal.cat == "step")
				{
					styleImg = "background-size: auto;";
					if (mc==1)
						{
							styleImg += "background-position: -49px -50px;";
							title += " I Class";
						}
					else if (mc==2)
						{
							styleImg += "background-position: 0 -49px;";
							title += " II Class";
						}
					else if (mc==3)
						{
							styleImg += "background-position: -47px 0;";
							title += " III Class";
						}
					else if (mc==4)
						{
							styleImg += "background-position: 0 0;";
							title += " IV Class";
						}
					else
						{
							styleImg += "opacity: 0.15;";
						}
				}

				// fix for master tanker and techincal engineer
				if ((name == "mechanicEngineer") || (name == "tankExpert"))
				{
					if ((mc==false) || (mc<1)) // tank expert will return 1 if achieved
					{
						mc = medal.text;
						title += "&#13;&#10;Not Yet Achived";
						styleImg = "opacity: 0.15;";
					}
					else
					{
						mc = medal.text;
					}
				}

				// achievement counter
				var font = "<font class='medalCounter'>"+mc+"</font>";

				// html output
				medaldiv.innerHTML += "<div id='"+name+"' class='medal' style='background-image: url("+medalImg+"); "+styleImg+"' title='"+title+"'>"+font+"</div>";
			}
			// special event for tank expert and techincal engineer
			if ((medal.path != "") && ("nation" in medal))
			{
				mc = medal.text;
				// achievement counter
				var font = "<font class='medalCounter'>"+mc+"</font>";
				// tank expert and techincal engineer medal pictures are hosted on dropbox, as the official url path is unknown
				var medalImg = "http://dl.dropboxusercontent.com/u/12497046/wot/script/img/"+medal.path+".png";
				if (mcsub == true)
				{
					// html output
					medaldiv.innerHTML += "<div id='"+name+"' class='medal' style='background-image: url("+medalImg+"); "+styleImg+"' title='"+title+"'>"+font+"</div>";
				}
				else
				{
					title += "&#13;&#10;Not Yet Achived";
					styleImg = "opacity: 0.15;";
					// html output
					medaldiv.innerHTML += "<div id='"+name+"' class='medal' style='background-image: url("+medalImg+"); "+styleImg+"' title='"+title+"'>"+font+"</div>";
				}
			}
		}

		// description url
		var desc_url = "http://"+wg_host+"/game/guide/en/general/achievements";
		div.innerHTML += "<div class='scriptlink'><a target='_blank' href='"+desc_url+"'>Achievement Descriptions</a></div>";
	}
	// end ins_medal_resp()

	function ins_veh_resp(respdata)
	{
		var t_hdr = ["Dmg", "Frag", "Spot"];

		for (i=0; i<t_hdr.length; ++i) {
			var s_th = document.createElement('th');
			s_th.className = "t-cls-res";
			s_th.innerHTML = "<div onclick='sortTd(this,0)' style='cursor: pointer;text-align: left'>"+t_hdr[i]+"</div>";

			trth.appendChild(s_th); // uses trth global
		}

		var veh_data = respdata,
			rows = tstat[1].rows;

		for (i=1; i<rows.length; ++i)
		{
			var t = rows[i].cells;
			if (t[1].tagName != "TH" && t[1].innerHTML!="")
			{
				imgName = t[1].getElementsByTagName('img')[0].src.match(/\/[^-]+-([^\/]*)\.png/)[1];

				for (j=0; j<veh_data.length; j++) {
					if(veh_data[j].name.toLowerCase() == imgName) {
						var veh = veh_data[j];
						break;
					}
				}
				if (t[0].innerHTML == "undefined") t[0].innerHTML = toType(veh.class);

				var ncell = rows[i].insertCell(t.length);
				ncell.innerHTML = (veh.damageDealt/veh.battle_count).toFixed()+"";

				ncell = rows[i].insertCell(t.length);
				ncell.innerHTML = (veh.frags/veh.battle_count).toFixed(2)+"";

				ncell = rows[i].insertCell(t.length);
				ncell.innerHTML = (veh.spotted/veh.battle_count).toFixed(2)+"";
			}
		}
	}
	// end ins_veh_resp()

	function insert_nm_resp(fmt) {
		insertNewTr(ttParent, "<a target='_blank' href="+nm_target+">NoobMeter</a>:", fmt, "", "");
	}

	function insert_dc_link() {
		timeDiv.innerHTML += "<span class='pl-hist'>Player history on <a target='_blank' href='"
							+dc_en_url+"'>Duck and Cover</a></span>";
	}

	function insert_mws_link()
	{
		var clan_id = null,
			mws_clans = "http://www.mywotstats.com/Clan/View",
			clan_cls = document.getElementsByClassName("b-text")[0];

		if (clan_cls != undefined) {
			clan_id = clan_cls.firstChild.nextSibling.innerHTML.match(/\/(\d+)/)[1];
		}
		if (mws_srv != null && clan_id != null) {
			clan_cls.innerHTML += "<span class='pl-hist'>Clan stats on <a target='_blank' href='"
								+mws_clans+"/"+clan_id+"/"+mws_srv+"'>MyWOTStats</a></span>";
		}
	}

	function insert_wotcs_link()
	{
		var clan_id = null,
			wotcs_clans = "http://www.wotcs.com/clan.php?wid=",
			clan_cls = document.getElementsByClassName("b-text")[0];

		if (clan_cls != undefined) {
			clan_id = clan_cls.firstChild.nextSibling.innerHTML.match(/\/(\d+)/)[1];
		}
		if (mws_srv != null && clan_id != null) {
			clan_cls.innerHTML += "<span class='pl-hist'>Clan stats on <a target='_blank' href='"
								+wotcs_clans+ +clan_id+"'>WoT-CS</a></span>";
		}
	}
}
// end if not new account

// inserted into main document via
// document.createElement("script")
function toFl(s)
{
	var a =""+s;
	return (parseFloat(a.replace(/[\D\.]/g,"")));
}

function toType(k)
{
	switch(true) {
		case (k == "t1" || k == "lightTank"):	return "Light";
		case (k == "t2" || k == "mediumTank"):	return "Medium";
		case (k == "t3" || k == "heavyTank"):	return "Heavy";
		case (k == "t4" || k == "AT-SPG"):		return "Tank&#8194;Destroyer";
		case (k == "t5" || k == "SPG"):			return "SP-Artillery";
		default: return null;
	}
}

function col(v, digit)
{
	if(isNaN(v)) return "x";

	switch(true) {
		case (v>=70): color = sc.col.sup_uni; break;
		case (v>=60): color = sc.col.unicum;  break;
		case (v>=54): color = sc.col.great;	  break;
		case (v>=51): color = sc.col.good;	  break;
		case (v>=48): color = sc.col.avg;	  break;
		case (v>=46): color = sc.col.b_avg;	  break;
		case (v<46):  color = sc.col.bad;	  break;
		default:	  color = sc.col.no_col;
	}
	return "<font color='"+color+"'>"+v.toFixed(digit)+"</font>";
}

function sortTd(el, dir)
{
	var p = el;
	while (p.tagName.toLowerCase() != "tbody") {
		if (p.tagName.toLowerCase() == "th" || p.tagName.toLowerCase() == "td")
			Index = p.cellIndex;
		p = p.parentNode;
	}
	tBody = p; //el.parentNode.parentNode;
	// alert(el.innerHTML);
	rows = tBody.rows;
	th = rows[0];
	sortar = [];

	for (i=1; i<rows.length ;i++) {
		sortar[i] = [];
		sortar[i][0] = defkey(rows[i],Index);
		sortar[i][1] = rows[i];
	}
	if (el.onclick.toString().indexOf('"u"')>0) {
		sortar.sort(_sort);
		el.setAttribute('onclick','sortTd(this, "d")');
	}
	else {
		sortar.sort(_sortR);
		el.setAttribute('onclick','sortTd(this, "u")');
	}
	tBody.innerHTML = "";
	tBody.appendChild(th);

	for (i=0; i<sortar.length-1 ;i++) {
		tBody.appendChild(sortar[i][1]);
	}

	function defkey(row, i) {
		var levOrder = ["X","IX","VIII","VII","VI","V","IV","III","II","I"];

		if ((i==3 || i==4) || i>=6)	 return parseFloat(row.cells[i].innerHTML.replace(/\D/g,""));  // battles, victories, dmg, frag, spot, ...
		else if (i==5) return parseFloat(row.cells[i].innerHTML.match(/>(.*)</)[1]); // winrate
		else if (i==1) return levOrder.indexOf(row.cells[i].getElementsByTagName("span")[0].innerHTML.replace(/<[^<]*>/g,"").replace(/\s/,"")); // tier
		else return row.cells[i].innerHTML;
	}

	function _sort(a, b) {
		a = a[0];
		b = b[0];
		if(a>b) return -1; else return 1;
	}

	function _sortR(a, b) {
		a = a[0];
		b = b[0];
		if(a>b) return 1; else return -1;
	}
}
// end sortTd()

function hideTypes(el)
{
	var p = el;

	while (p.tagName.toLowerCase() != "tbody")
	{
		if (p.tagName.toLowerCase() == "th") Index = p.cellIndex;
		p = p.parentNode;
	}
	var tBody = p,
		rows = tBody.rows;

	var bat=0, win=0,
		ftype = document.getElementById("tankType").value,
		nat = document.getElementById("nationality").value,
		chfrom = document.getElementById("chfrom").value;

	for (var i=1; i<rows.length; ++i)
	{
		if ((rows[i].cells[0].innerHTML == ftype || ftype == 0) &&		// type
			(rows[i].cells[1].getAttribute("nat") == nat || nat==0) &&	// level
			(toFl(rows[i].cells[3].innerHTML) > chfrom ))				// battles
		{
			rows[i].style.display = "";
			bat += toFl(rows[i].cells[3].innerHTML);
			win += toFl(rows[i].cells[4].innerHTML);
		}
		else rows[i].style.display = "none";
	}

	// footer, totals
	tBody = tBody.parentNode;
	if (tBody.tFoot!=undefined) tBody.deleteTFoot();

	var r = tBody.createTFoot().insertRow(0);
	r.insertCell(0).innerHTML = "Total";
	r.insertCell(1); // blank cell under tier
	r.insertCell(2); // blank cell under vehicle

	var c = r.insertCell(3);	// battles
	c.innerHTML =""+bat;
	c.className = "t-cls-res";

	var c = r.insertCell(4);	// victories
	c.innerHTML =""+win;
	c.className = "t-cls-res";

	var c = r.insertCell(5);	// win rate
	c.innerHTML =""+(win/bat*100).toFixed(2)+"%";
	c.className = "t-cls-res";
}
// end hideTypes
// end script
