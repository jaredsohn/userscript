// ==UserScript==
// @name           	City Enhancer
// @namespace      	City-Enhancer
// @description    	Adds modifiable InfoBanners to Town View (Upgradable, Name, Level, Missing Resources)
// @require         http://code.jquery.com/jquery-1.7.2.min.js
// @include         http://s*.*.ikariam.com/index.php?action=header&function=changeCurrentCity*
// @include        	http://s*.*.ikariam.com/index.php?view=city*
// @resource       	build_available http://ikariamlibrary.com/tools/images/townenhancer/upgrade.png
// @resource       	build_max       http://opendia.net/library/ikariam/gm/ve/images/icon_max_green.png
// @resource       	scrollbg        http://img705.imageshack.us/img705/6082/scrollbg.gif
// @resource       	scrollrightend  http://img7.imageshack.us/img7/917/scrollrightend.gif
// @resource       	scrollrightend2 http://img824.imageshack.us/img824/8836/scrollrightend2.gif
// @resource       	scrollleftend   http://img217.imageshack.us/img217/3575/scrollleftend.gif
// @resource       	scrollleftend2  http://img17.imageshack.us/img17/4140/scrollleftend2.gif
// @resource       	scrollbg2       http://img713.imageshack.us/img713/4477/scrollbg2.gif
// @author			MT-0
// @version			1.0.0
//
// @history			1.0.0 Initial release
// ==/UserScript==

$(document).ready(function(){

const V=document.getElementsByTagName("body")[0].id;
if(!({"options":1,"city":1})[V])return;

const	S = document.location.hostname.split(".").slice(0,2).join('.'),
		G = function(v,d){return GM_getValue(S+"_cE_"+v,d);},
		activeLanguage = G("Language","en"),
		languages = {
			en: {
				"dump": "Dump",
				"temple": "Temple",
				"townHall": "Town Hall",
				"academy": "Academy",
				"warehouse": "Warehouse",
				"tavern": "Tavern",
				"palace": "Palace",
				"palaceColony": "Gov. Residence",
				"museum": "Museum",
				"port": "Port",
				"shipyard": "Shipyard",
				"barracks": "Barracks",
				"wall": "Town Wall",
				"embassy": "Embassy",
				"branchOffice": "Trading Post",
				"workshop": "Workshop",
				"safehouse": "Hideout",
				"forester": "Forester",
				"glassblowing": "Glassblower",
				"alchemist": "Alchemist",
				"winegrower": "Winery",
				"stonemason": "Mason",
				"carpentering": "Carpenter",
				"optician": "Optician",
				"fireworker": "Fireworks",
				"vineyard": "Wine Cellar",
				"architect": "Architect",
				"buildingGround": "Building Ground",
				"settings-main-title": "City Enhancer Settings",
				"settings-save-text": "Save Settings",
				"settings-research-title": "Completed Research",
				"settings-research-selector": "Highest Completed Research",
				"settings-research-pulley": "Pulley",
				"settings-research-geometry": "Geometry",
				"settings-research-spiritlevel": "Spirit Level",
				"settings-display-title": "Display Settings",
				"settings-display-buildingname": "Display Building Name",
				"settings-display-buildinglevel": "Display Building Level",
				"settings-display-upgradebutton": "Display Upgrade Button",
				"settings-display-missingresources": "Display Missing Resources",
				"settings-display-enableupgrade": "Enable Quick Upgrade Link",
				"settings-language-title": "Language Settings",
				"settings-language-selector": "Available Languages",
				"confirm-upgrade": "Upgrade Building \"<%building%>\"? [<%old%> to <%new%>]",
				"language-name": "English"
			}
		},
		language = languages[activeLanguage];
// </language presets>

if(V=="options"){
(function(){
	const	r = parseInt(G("Research",0)),
			d = document.createElement("div"),
			c = function(i){return !!document.getElementById("tE_"+i).checked;},
			o = function(e){return e.options[e.selectedIndex].value;},
			s = function(n,v){GM_setValue(S+"_cE_"+n, v);};
	var		h = [];

	for ( var x in languages )
		h.push( ['<option value="', x, '"', (x==activeLanguage?' selected':''), '>', languages[x]['language-name'], '</option>' ].join('') );

	d.innerHTML = [
		'<div class="contentBox01h" id="CityEnhancer"><h3 class="header">',
		language["settings-main-title"],
		'</h3><div class="content"><div><h3>',
		language["settings-research-title"],
		'</h3><table cellspacing="0" cellpadding="0"><tbody><tr><th>',
		language["settings-research-selector"],
		'</th><td><select id="tE_ResearchSelector"><option value="0"',
		(r==0?' selected':''), '>-</option><option value="2"',
		(r==2?' selected':''), '>', language["settings-research-pulley"],
		'</option><option value="6"',
		(r==6?' selected':''), '>', language["settings-research-geometry"],
		'</option><option value="14"',
		(r==14?' selected':''), '>', language["settings-research-spiritlevel"],
		'</option></select></td></tr></tbody></table></div><div><h3>',
		language["settings-display-title"],
		'</h3><table cellspacing="0" cellpadding="0"><tbody><tr><th>',
		language["settings-display-buildingname"],
		'</th><td><input type="checkbox" id="tE_BuildingName"',
		(G("DisplayName", true)?' checked':''),
		'></td></tr><tr><th>',
		language["settings-display-buildinglevel"],
		'</th><td><input type="checkbox" id="tE_BuildingLevel"',
		(G("DisplayLevel", true)?' checked':''),
		'></td></tr><tr><th>',
		language["settings-display-upgradebutton"],
		'</th><td><input type="checkbox" id="tE_UpgradeButton"',
		(G("DisplayUpgrade", true)?' checked':''),
		'></td></tr><tr><th>',
		language["settings-display-missingresources"],
		'</th><td><input type="checkbox" id="tE_MissingRes"',
		(G("MissingRes", true)?' checked':''),
		'></td></tr></tbody></table></div><div><h3>',
		language["settings-language-title"],
		'</h3><table cellspacing="0" cellpadding="0"><tr><th>',
		language["settings-language-selector"],
		'</th><td><select id="tE_LanguageSelector">',
		h.join(''),
		'</select></td></tr></table></div><div class="centerButton"><input type="button" id="tE_save" value="Save Settings"></div></div><div class="footer"></div></div>'
	].join('');

	document.getElementById("vacationMode").parentNode.appendChild(d.childNodes[0]);
	document.getElementById("tE_save").onclick = function() {
			s("Research", o(document.getElementById("tE_ResearchSelector")));
			s("Language", o(document.getElementById("tE_LanguageSelector")));
			s("DisplayName", c("BuildingName"));
			s("DisplayLevel", c("BuildingLevel"));
			s("DisplayUpgrade", c("UpgradeButton"));
			s("MissingRes", c("MissingRes"));
//			return window.location.reload();
		}
})();
}else if(V=="city"){
(function(){
	const	showName = G("DisplayName", true),
			showLevel = G("DisplayLevel", true),
			showUpgrade = G("DisplayUpgrade", true),
			showRes = G("MissingRes", true);

	if (!(showName||showLevel||showUpgrade||showRes)){return;}

	GM_addStyle( [
		'#locations a:hover { text-decoration: none; color: #e4b873; }',
		'.nobr { white-space: nowrap; }',
		'.bb { top: 50px; }',
		'.mr, .mr2 { top: 75px; }',
		'.constructionSite+a .mr, .constructionSite+a .mr2 { top: 100px; }',
		'.bb, .bb:before, .bb:after, .mr, .mr:before, .mr:after { height: 23px; }',
		'.mr2 { height: 40px; }',
		'.bb:before, .bb:after, .mr:before, .mr:after, .mr2:before, .mr2:after { content: ""; width: 12px; white-space: nowrap; position: absolute; background-size: 100% 100%; top: 0px; height: 100%; }',
		'.bb, .mr { background: url('+GM_getResourceURL('scrollbg')+') no-repeat 50% 50%; }',
		'.bb:before, .mr:before { background: url('+GM_getResourceURL('scrollleftend')+') no-repeat 50% 50%; left: -12px; }',
		'.bb:after, .mr:after { background: url('+GM_getResourceURL('scrollrightend')+') no-repeat 50% 50%; right: -12px; }',
		'.mr2 { background: url('+GM_getResourceURL('scrollbg2')+') no-repeat 50% 50%; }',
		'.mr2:before { background: url('+GM_getResourceURL('scrollleftend2')+') no-repeat 50% 50%; left: -12px; }',
		'.mr2:after { background: url('+GM_getResourceURL('scrollrightend2')+') no-repeat 50% 50%; right: -12px; }',
		'.bb, .mr, .mr2 { position: absolute; font-size: 10px; color: #50110a; background-size: 100% 100%; line-height: 23px; text-align: center; }',
		'.bb img, .mr img, .mr2 img { position: relative; top: 3px; height: 13px; padding: 0 0.3em; }',
		'.bb br + span, .mr br + span, .mr2 br + span { position: relative; top: -6px; }',
		'.cs { color:red !important; }',
		'#city #container #mainview #locations .timetofinish { top: 48px; }',
		'#city #locations .building .timetofinish { top: 68px; }',
		'#city #container #mainview #locations .garnison { z-index: 290; }',
		'#friends { top: 153px; }',
		'#city #locations .building a { -moz-transform: rotate( 0deg ); }'
	].join('') );

	const	D = {
				// 1			2			3			4			5			6			7			8			9			10			11			12			13			14			15			16			17			18			19			20			21			22			23			24			25			26			27			28			29			30			31			32			33			34			35			36			37			38			39			40
				dump: {
				w: [640,		1152,		1766,		2504,		3388,		4450,		5724,		7253,		9088,		11289,		13931,		17101,		20905,		25470,		30948,		37522,		45410,		54876,		66236,		79867,		96223,		115852,		139407,		167672,		201592,		242293,		291136,		349749,		420081,		504483,		605763,		727300,		873143,		1048157,	1258171,	1510191,	1812613,	2175519,	2611007,	3133592,	null],
				m: [497,		932,		1445,		2051,		2762,		3609,		4604,		5778,		7164,		8799,		10728,		13005,		15691,		18862,		22602,		27016,		32225,		38371,		45623,		54181,		64278,		76194,		90256,		106847,		126424,		149528,		176787,		208956,		246913,		291702,		344555,		406921,		480512,		567350,		669817,		790730,		933408,		1101767,	1300431,	1534855,	null],
				g: [701,		1146,		1668,		2278,		2991,		3526,		4803,		5946,		7283,		8847,		10678,		12819,		15324,		18257,		21687,		25700,		30395,		35889,		42316,		49837,		58635,		68929,		80973,		95065,		111553,		130843,		153414,		179821,		201716,		246864,		289157,		338642,		396536,		464274,		543528,		636253,		744742,		871676,		1020187,	1193945,	null],
				s: [384,		845,		1398,		2061,		2858,		3813,		4960,		6336,		7987,		9968,		12346,		15199,		18623,		22731,		27661,		33578,		40677,		49197,		59420,		71688,		86409,		104076,		125274,		150714,		181241,		217872,		261830,		314581,		377881,		453842,		544994,		654378,		785637,		943149,		1132163,	1358979,	1631159,	1957774,	2349714,	2820041,	null]},
				temple: {
				w: [216,		228,		333,		465,		598,		760,		958,		1197,		1432,		1773,		2112,		2512,		3082,		3655,		4458,		5126,		6232,		7167,		8687,		10247,		11784,		14228,		16752,		19265,		23156,		26663,		32026,		36830,		43256,		50782,		59591,		68528,		null],
				g: [172,		189,		290,		423,		566,		752,		988,		1290,		1610,		2080,		2586,		3210,		4109,		5084,		6471,		7765,		9850,		11821,		14952,		18402,		22082,		27824,		34183,		41020,		51514,		61817,		77477,		92972,		113941,		139576,		170910,		205093,		null]},
				townHall: {
				w: [0,			158,		335,		623,		923,		1390,		2015,		2706,		3661,		4776,		6173,		8074,		10281,		13023,		16424,		20986,		25423,		32285,		40232,		49286,		61207,		74804,		93956,		113035,		141594,		170213,		210011,		258875,		314902,		387655,		471194,		572580,		695615,		854728,		1037814,	1274043,	1714396,	1876185,	null],
				m: [0,			0,			0,			0,			285,		551,		936,		1411,		2091,		2945,		4072,		5664,		7637,		10214,		13575,		18254,		23250,		31022,		40599,		52216,		68069,		87316,		115101,		145326,		191053,		241039,		312128,		403824,		515592,		666227,		850031,		1084292,	1382826,	1783721,	2273685,	2930330,	3692589,	4756439,	null]},
				academy: {
				w: [64,			68,			115,		263,		382,		626,		982,		1330,		2004,		2665,		3916,		5156,		7446,		9753,		12751,		18163,		23691,		33450,		43571,		56728,		73832,		103459,		144203,		175058,		243930,		317208,		439967,		536310,		743789,		1027469,	1257244,	1736681,	null],
				g: [0,			0,			0,			0,			225,		428,		744,		1089,		1748,		2454,		3786,		5216,		7862,		10729,		14599,		21627,		29321,		43020,		58213,		78724,		106414,		154857,		224146,		282571,		408877,		552141,		795252,		1006647,	1449741,	2079650,	2642546,	3790581,	null]},
				warehouse: {
				w: [160,		288,		442,		626,		847,		1113,		1431,		1813,		2272,		2822,		3483,		4275,		5226,		6368,		7737,		9380,		11353,		13719,		16559,		19967,		24056,		28963,		34852,		41917,		50398,		60574,		72784,		87437,		105021,		126333,		151441,		181825,		218286,		262039,		314543,		377548,		453153,		543880,		652752,		783398,		null],
				m: [0,			0,			0,			96,			211,		349,		515,		714,		953,		1240,		1584,		1997,		2492,		3086,		3800,		4656,		5683,		6915,		8394,		10169,		12299,		14855,		17921,		21602,		26019,		31319,		37679,		45310,		54468,		65457,		78645,		94471,		113461,		136249,		163595,		196409,		235787,		283041,		339745,		407790,		null]},
				tavern: {
				w: [101,		222,		367,		541,		750,		1001,		1302,		1663,		2097,		2617,		3241,		3990,		4888,		5967,		7261,		8814,		10678,		12914,		15598,		18818,		22683,		27320,		32885,		39562,		47576,		57192,		68731,		82578,		99194,		119134,		143061,		171774,		206230,		247577,		297193,		356732,		428179,		513916,		616800,		740261,		888413,		1066196,	1279537,	1535545,	1842756,	2211407,	null],
				m: [0,			0,			0,			94,			122,		158,		206,		267,		348,		452,		587,		764,		993,		1290,		1677,		2181,		2835,		3685,		4791,		6228,		8097,		10526,		13684,		17789,		23125,		30063,		39082,		50806,		66048,		85862,		111621,		145107,		188640,		245232,		318801,		414441,		538774,		700406,		910528,		1183686,	1538791,	2000427,	2600557,	3380725,	4394943,	5713425,	null]},
				palace: {
				w: [712,		5824,		16048,		36496,		77392,		159184,		322768,		649936,		1304272,	2612944,	4743517,	null],
				W: [0,			0,			0,			10898,		22110,		44534,		89382,		179078,		358470,		717254,		1434821,	null],
				m: [0,			1434,		4546,		10770,		23218,		48114,		97906,		197490,		396658,		794994,		1591666,	null],
				g: [0,			0,			0,			0,			21188,		42400,		84824,		169672,		339368,		678760,		1357543,	null],
				s: [0,			0,			3089,		10301,		24725,		53573,		111269,		226661,		457445,		919013,		1842149,	null]},
				palaceColony: {
				w: [712,		5824,		16048,		36496,		77392,		159184,		322768,		649936,		1304272,	2612944,	4743517,	null],
				W: [0,			0,			0,			10898,		22110,		44534,		89382,		179078,		358470,		717254,		1434821,	null],
				m: [0,			1434,		4546,		10770,		23218,		48114,		97906,		197490,		396658,		794994,		1591666,	null],
				g: [0,			0,			0,			0,			21188,		42400,		84824,		169672,		339368,		678760,		1357543,	null],
				s: [0,			0,			3089,		10301,		24725,		53573,		111269,		226661,		457445,		919013,		1842149,	null]},
				museum: {
				w: [560,		1435,		2748,		4716,		7669,		12099,		18744,		28710,		47733,		66084,		99723,		150181,		225866,		339394,		509686,		765124,		1148280,	1723016,	2585120,	3878276,	5818008,	null],
				m: [280,		1190,		2573,		4676,		7871,		12729,		20112,		31335,		52895,		74322,		113735,		173642,		264701,		403110,		613492,		933272,		1419338,	2158157,	3281164,	4988136,	7582730,	null]},
				port: {
				w: [60,			150,		274,		429,		637,		894,		1207,		1645,		2106,		2735,		3537,		4492,		5689,		7103,		8850,		11094,		13731,		17062,		21097,		25965,		31810,		39190,		47998,		58713,		71955,		87627,		107102,		130776,		159019,		193937,		235849,		286514,		348718,		423990,		513947,		625160,		758178,		919693,		1116013,	1353517,	1642274,	1990223],
				m: [0,			0,			0,			0,			0,			176,		326,		540,		791,		1138,		1598,		2176,		2928,		3859,		5051,		6628,		8566,		11089,		14265,		18241,		23197,		29642,		37636,		47703,		60556,		76367,		96639,		122156,		153753,		194089,		244300,		307174,		386955,		486969,		610992,		769302,		965792,		1212790,	1523570,	1913072,	2403313,	3015688]},
				shipyard: {
				w: [105,		202,		324,		477,		671,		914,		1222,		1609,		2096,		2711,		3485,		4460,		5689,		7238,		9190,		11648,		14746,		18649,		23568,		29765,		37573,		47412,		59808,		75428,		95108,		119906,		151151,		190520,		240124,		302626,		381378,		480605,		null],
				m: [0,			0,			0,			0,			0,			778,		1052,		1397,		1832,		2381,		3071,		3942,		5038,		6420,		8161,		10354,		13118,		16601,		20989,		26517,		33484,		42261,		53321,		67256,		84814,		106938,		134814,		169937,		214192,		269954,		340214,		428741,		null]},
				barracks: {
				w: [49,			114,		195,		296,		420,		574,		766,		1003,		1297,		1662,		2115,		2676,		3371,		4234,		5304,		6630,		8275,		10314,		12843,		15979,		19868,		24690,		30669,		38083,		47277,		58676,		72812,		90341,		112076,		139028,		172448,		213889,		265276,		328996,		408008,		505984,		627473,		778119,		964922,		1196557,	1483783],
				m: [0,			0,			0,			0,			0,			0,			0,			0,			178,		431,		745,		1134,		1616,		2214,		2956,		3875,		5015,		6429,		8183,		10357,		13052,		16395,		20540,		25680,		32054,		39957,		49757,		61909,		76977,		95661,		118830,		147560,		183185,		227359,		282136,		350059,		434282,		538720,		668222,		828807,		1027931]},
				wall: {
				w: [114,		361,		657,		1012,		1439,		1951,		2565,		3302,		4186,		5247,		6521,		8049,		9882,		12083,		14724,		17892,		21695,		26258,		31733,		38304,		46189,		55650,		67004,		80629,		96978,		116599,		140142,		168395,		202298,		242982,		291802,		350387,		420689,		505049,		606284,		727765,		873541,		1048473,	1258393,	1510294,	1812577,	2175317,	2610603,	3132948,	3759764],
				m: [0,			203,		516,		892,		1344,		1885,		2535,		3315,		4251,		5374,		6721,		8338,		10279,		12608,		15402,		18755,		22779,		27607,		33402,		40355,		48699,		58711,		70726,		85144,		102445,		123208,		148121,		178019,		213896,		256948,		308610,		370605,		444998,		534270,		641397,		769949,		924213,		1109328,	1331467,	1598031,	1917913,	2301767,	2762392,	3315144,	3978446]},
				embassy: {
				w: [242,		415,		623,		873,		1173,		1532,		1964,		2482,		3103,		3849,		4743,		5817,		7105,		8651,		10507,		12733,		15404,		18498,		22457,		27074,		32290,		39261,		47240,		56812,		70157,		84318,		101310,		121979,		146503,		175932,		222202,		266778,		null],
				m: [155,		342,		571,		850,		1190,		1606,		2112,		2730,		3484,		4404,		5527,		6896,		8566,		10604,		13090,		16123,		19824,		24339,		29846,		36564,		45216,		54769,		66733,		81859,		104537,		129580,		158759,		193849,		236659,		288888,		358869,		437985,		null]},
				branchOffice: {
				w: [48,			173,		346,		581,		896,		1314,		1863,		2580,		3509,		4706,		6241,		8203,		10699,		13866,		17872,		22926,		29285,		37272,		47283,		59806,		75446,		94954,		119245,		149453,		186977,		233530,		291225,		362658,		451015,		560208,		695038,		861391,		null],
				m: [0,			0,			0,			0,			540,		792,		1123,		1555,		2115,		2837,		3762,		4945,		6450,		8359,		10774,		13820,		17654,		22469,		28503,		36051,		45481,		57240,		71883,		90092,		112712,		121067,		175556,		218617,		271878,		337705,		418983,		446564,		null]},
				workshop: {
				w: [220,		383,		569,		781,		1023,		1299,		1613,		1972,		2380,		2846,		3377,		3982,		4672,		5458,		6355,		7377,		8542,		9870,		11385,		13111,		15078,		17321,		19481,		22796,		26119,		29909,		34228,		39153,		44766,		51166,		58462,		66778,		null],
				m: [95,			167,		251,		349,		461,		592,		744,		920,		1125,		1362,		1637,		1956,		2326,		2755,		3253,		3831,		4500,		5279,		6180,		7226,		8439,		9847,		11477,		13373,		15570,		18118,		21074,		24503,		28481,		33095,		38447,		44656,		null]},
				safehouse: {
				w: [113,		248,		402,		578,		779,		1007,		1267,		1564,		1903,		2288,		2728,		3230,		3801,		4453,		5195,		6042,		7007,		8107,		9547,		10793,		12422,		14282,		16400,		18815,		21570,		24708,		28288,		32368,		37019,		42321,		48365,		55255,		null],
				m: [0,			0,			0,			129,		197,		275,		366,		471,		593,		735,		900,		1090,		1312,		1569,		1866,		2212,		2613,		2924,		3617,		4242,		4967,		5810,		6785,		7919,		9233,		10757,		12526,		14577,		16956,		19716,		22917,		26631,		null]},
				forester: {
				w: [250,		430,		664,		968,		1364,		1878,		2546,		3415,		4544,		6013,		7922,		10403,		13629,		17823,		23274,		30362,		39574,		51552,		67123,		87363,		113680,		147889,		192360,		250173,		325258,		422862,		550048,		715169,		929826,		1208878,	1571646,	2043246,	null],
				m: [0,			104,		237,		410,		635,		928,		1309,		1803,		2446,		3282,		4368,		5781,		7617,		10004,		13108,		17142,		22386,		29204,		38068,		49589,		64569,		84041,		109337,		142266,		185046,		240663,		312964,		406956,		529144,		687989,		894489,		1162937,	null]},
				glassblowing: {
				w: [274,		467,		718,		1045,		1469,		2021,		2738,		3671,		4883,		6459,		8508,		11172,		14634,		19135,		24987,		32594,		42483,		55339,		72050,		93778,		122021,		158740,		206471,		268524,		349194,		454063,		590392,		767620,		998018,		1297535,	1686905,	2193088,	null],
				m: [0,			116,		255,		436,		671,		977,		1375,		1892,		2564,		3437,		4572,		6049,		7968,		10462,		13705,		17921,		23402,		30527,		39790,		51830,		67485,		87835,		114290,		148680,		193389,		251512,		327069,		425294,		552985,		718987,		934788,		1215329,	null]},
				alchemist: {
				w: [274,		467,		718,		1045,		1469,		2021,		2738,		3671,		4883,		6459,		8508,		11172,		14634,		19135,		24987,		32594,		42483,		55339,		72050,		93778,		122021,		158740,		206471,		268524,		349194,		454063,		590392,		767620,		998018,		1297535,	1686905,	2193088,	null],
				m: [0,			116,		255,		436,		671,		977,		1375,		1892,		2564,		3437,		4572,		6049,		7968,		10462,		13705,		17921,		23402,		30527,		39790,		51830,		67485,		87835,		114290,		148680,		193389,		251512,		327069,		425294,		552985,		718987,		934788,		1215329,	null]},
				winegrower: {
				w: [274,		467,		718,		1045,		1469,		2021,		2738,		3671,		4883,		6459,		8508,		11172,		14634,		19135,		24987,		32594,		42483,		55339,		72050,		93778,		122021,		158740,		206471,		268524,		349194,		454063,		590392,		767620,		998018,		1297535,	1686905,	2193088,	null],
				m: [0,			116,		255,		436,		671,		977,		1375,		1892,		2564,		3437,		4572,		6049,		7968,		10462,		13705,		17921,		23402,		30527,		39790,		51830,		67485,		87835,		114290,		148680,		193389,		251512,		327069,		425294,		552985,		718987,		934788,		1215329,	null]},
				stonemason: {
				w: [274,		467,		718,		1045,		1469,		2021,		2738,		3671,		4883,		6459,		8508,		11172,		14634,		19135,		24987,		32594,		42483,		55339,		72050,		93778,		122021,		158740,		206471,		268524,		349194,		454063,		590392,		767620,		998018,		1297535,	1686905,	2193088,	null],
				m: [0,			116,		255,		436,		671,		977,		1375,		1892,		2564,		3437,		4572,		6049,		7968,		10462,		13705,		17921,		23402,		30527,		39790,		51830,		67485,		87835,		114290,		148680,		193389,		251512,		327069,		425294,		552985,		718987,		934788,		1215329,	null]},
				carpentering: {
				w: [63,			122,		192,		274,		372,		486,		620,		777,		962,		1178,		1432,		1730,		2078,		2486,		2964,		3524,		4178,		4933,		5841,		6890,		8117,		9550,		11229,		13190,		15484,		18167,		21299,		24946,		29245,		34247,		40096,		46930,		null],
				m: [0,			0,			0,			0,			0,			0,			0,			359,		444,		546,		669,		816,		993,		1205,		1459,		1765,		2131,		2571,		3731,		3731,		4490,		5402,		6496,		7808,		9383,		11273,		15397,		16256,		19531,		23450,		28154,		33798,		null]},
				optician: {
				w: [119,		188,		269,		362,		471,		597,		742,		912,		1108,		1335,		1600,		1906,		2261,		2673,		3152,		3706,		4348,		5096,		5962,		6966,		8131,		9482,		11050,		12868,		14978,		17424,		20262,		23553,		27373,		31804,		36943,		42904,		null],
				m: [0,			35,			96,			167,		249,		345,		455,		584,		733,		905,		1106,		1338,		1608,		1921,		2283,		2704,		3191,		3759,		4416,		5178,		6062,		7087,		8276,		9656,		11257,		13113,		15267,		17762,		20662,		24024,		27922,		32447,		null]},
				fireworker: {
				w: [273,		353,		445,		551,		673,		813,		974,		1159,		1373,		1618,		1899,		2223,		2596,		3025,		3517,		4084,		4736,		5485,		6346,		7338,		8478,		9790,		11297,		13030,		14990,		17317,		19954,		22986,		26472,		30484,		35096,		40398,		null],
				m: [135,		212,		302,		405,		526,		665,		827,		1015,		1233,		1486,		1779,		2120,		2514,		2972,		3503,		4119,		4834,		5662,		6623,		7738,		9032,		10534,		12275,		13355,		16636,		19354,		22507,		26163,		30404,		35325,		41033,		47652,		null]},
				vineyard: {
				w: [339,		423,		520,		631,		758,		905,		1074,		1269,		1492,		1749,		2045,		2384,		2775,		3225,		3741,		4336,		5132,		5813,		6875,		7941,		8944,		10319,		11900,		13718,		15809,		18215,		20978,		24159,		27816,		32021,		36857,		42419,		null],
				m: [123,		198,		285,		387,		504,		640,		798,		981,		1194,		1440,		1726,		2058,		2443,		2889,		3407,		4008,		4705,		5513,		6450,		7537,		8800,		10263,		11961,		13930,		16214,		18864,		21938,		25503,		29639,		34437,		40002,		46457,		null]},
				architect: {
				w: [185,		291,		413,		555,		720,		911,		1133,		1390,		1689,		2035,		2437,		2902,		3443,		4070,		4797,		5640,		6618,		7754,		9070,		10598,		12369,		14424,		16807,		19573,		22780,		26501,		30817,		35825,		41631,		48371,		56185,		65251,		null],
				m: [106,		160,		222,		295,		379,		475,		587,		716,		865,		1036,		1233,		1460,		1722,		2023,		2369,		2767,		3226,		3752,		4358,		5056,		5857,		6777,		7836,		9052,		10448,		12054,		13899,		16017,		18450,		21246,		24454,		28141,		null]}
			},
			N = {	"Dump": 'dump',
					"Temple": 'temple',
					"Town hall": 'townHall',
					"Academy": 'academy',
					"Warehouse": 'warehouse',
					"Tavern": 'tavern',
					"Palace": 'palace',
					"Governor`s Residence": 'palaceColony',
					"Museum": 'museum',
					"Trading port": 'port',
					"Shipyard": 'shipyard',
					"Barracks": 'barracks',
					"Town wall": 'wall',
					"Embassy": 'embassy',
					"Trading Post": 'branchOffice',
					"Workshop": 'workshop',
					"Hideout": 'safehouse',
					"Forester`s House": 'forester',
					"Glassblower": 'glassblowing',
					"Alchemist`s Tower": 'alchemist',
					"Winegrower": 'winegrower',
					"Stonemason": 'stonemason',
					"Carpenter": 'carpentering',
					"Optician": 'optician',
					"Firework Test Area": 'fireworker',
					"Wine Press": 'vineyard',
					"Architect`s Office": 'architect' },
			getElementsByClassName=function(n,c) {if(n.getElementsByClassName)return n.getElementsByClassName(c);else{var a=n.getElementsByTagName("*"),e=[],r=new RegExp("\\b"+c+"\\b"),i;for(i in a)if(r.test(a[i].className))e.push(a[i]);return e;}},
			R = ['wood','wine','marble','crystal','sulfur'],
			L = {w:0,W:1,m:2,g:3,s:4},
			P = function(e,p) { return parseInt(document.defaultView.getComputedStyle(e,null).getPropertyValue(p),10); },
			centerElement = function(e) { e.style.left = Math.floor((P(e.parentNode,"width")-P(e,"width")-P(e,"padding-left")-P(e,"padding-right"))/2) + "px"; },
			checkResource = function(r,a){for(var i in r)if(r[i]&&r[i]>a[i])return false;return true;},
			Q = document.getElementById("locations").children,
			C = function(n,t){var a=n.firstChild;while(a&&t!==a.tagName)a=a.nextSibling;return a;},
			p = {},
			d = function(n,e,i,l,s){const d=n.b[i],h=[];if(showName)h.push(l);if(showLevel)h.push(d.l+(d.u?' &#x25BA '+(d.l+1):''));e.innerHTML+="<div class='bb nobr"+(d.u?' cs':'')+"'>"+(s?"<img src='"+GM_getResourceURL(s)+"' />":'')+h.join(' ')+"</div>";centerElement(e.lastChild);},
			V = (function(){const v=/^v\s*(\d+)\.(\d+)/.exec(C(C(getElementsByClassName(document,"version")[0],"A"),"SPAN").innerHTML);return v[1]==0&&v[2]<5;})();

	var		a,b,e,f,j,k,m,n,q,U=false,Z=true;
	for(q in Q)
		if(Q[q].id&&/^position\d+$/.test(Q[q].id)){
			if(V){
				if({townhall:1,buildingGround:2}[n=Q[q].className]){Z&=a!==2;continue;}
				a=/^(.*) \S+ (\d+)(?: (.*))?$/.exec(C(C(Q[q],'A'),'SPAN').innerHTML);
				e=typeof a[3]==='string';
			}else{
				a=/^(.+)\s+(?:\S+\s+(\d+)|(\(.+\)))/.exec(C(Q[q],'A').title);
				if(!a||(b={townhall:1,lockedPosition:1,buildingGround:2}[n=N[a[1]]])){Z&=b!==2;continue;}				
				e=/constructionSite/.test(Q[q].className);
//				alert([Q[q].id,a,b,n].join('\n'));
//				if(e)alert([a,(!!a?N[a[1]]:""),e,parseInt(a[2],10)].join("\n"));
			}
			if(!a)continue;
			if(!p[n])p[n]={n:a[1],b:[]};
			p[n].b.push({l:parseInt(a[2],10),u:e,e:Q[q]});
			U=U||e;
		}
	const	B = (function(){const B=["carpentering","vineyard","architect","optician","fireworker"],r=G("Research",0),x=[];for (var b in B)x.push((100-r-(p[B[b]]?p[B[b]].b[0].l:0))/100);return x;})(),
			S = (V	?function(){const S=[];for(var r in R)S[r]=parseInt(document.getElementById('value_'+R[r]).firstChild.nodeValue.replace(/k$/i, '000').replace(/[,.]/g,""),10);return S;}
					:function(){const S=[];for(var r in R)S[r]=parseInt(document.getElementById('js_GlobalMenu_'+R[r]).firstChild.nodeValue.replace(/k$/i, '000').replace(/[,.]/g,""),10);return S;}
				)();
//	var i = 0;
	for(q in p)for (a in p[q].b){
		n=p[q].b[a];
		b=n.l+(n.u?1:0);
//		i++;
//		if(!D[q])alert(q+"\n"+i);
		if(D[q].w[b]!==undefined){
			j=language[q];
			e=n.e.getElementsByTagName('A')[0];
			if(D[q].w[b]===null)d(p[q],e,a,j,showUpgrade?'build_max':'');
			else{
				m=[];
				for(f in D[q]){u=Math.floor((D[q][f][b]||0)*B[L[f]]-S[L[f]]);if(u>0)m.push((u<1000?u:u<1000000?(Math.ceil(u/1000)+'K'):(Math.ceil(u/100000)/10+'M'))+"<img src='/skin/resources/icon_"+R[L[f]]+".png' />");}
				if (Z&&(k=m.length)){
					d(p[q],e,a,j);
					if(k>2)m.splice(Math.ceil(k/2),0,'</span><br /><span class="nobr">');
					e.innerHTML+='<div class="mr'+(k>2?'2':'')+'"><span class="nobr">'+m.join('')+'</span></div>';
					centerElement(e.lastChild);
				}else d(p[q],e,a,j,(Z&&showUpgrade)?'build_available':'');
			}
		}
		if(Z&&n.u)centerElement(getElementsByClassName(n.e,'timetofinish')[0]);
	}

	if ( !showRes )
		GM_addStyle( [
			'ul#locations>li>a>.mr, ul#locations>li>a>.mr2 { display: none; }',
			'ul#locations>li>a:hover>.mr, ul#locations>li>a:hover>.mr2 { display: block; }'
		].join('') );

/*
	var x = document.createElement("textarea"),
		h=[],
		Q=function(y,w,z){
			var a = data[y][w]===null?"null":''+(data[y][w][z]||0),
				b = w==0?10:(''+(data[y][w-1][z]||0)).length;
			return (b<7?'\t':'')+(b<3?'\t':'')+a;
		};
	for ( var y in data ) {
		var hhh = [];
		for ( var z in data[y][data[y].length - 2] ) {
			if (z==='t') continue;
			var hh = [];
			for ( var w in data[y] )
				hh.push( Q(y,w,z) );
			hhh.push( z + ": ["+hh.join(',\t')+"]" );
		}
		h.push( y + ': {\n' + hhh.join( ',\n' ) + '}' );
	}
	x.innerHTML = h.join( ",\n" );
	document.getElementsByTagName("body")[0].appendChild(x);
*/
})();
}
// </building banners>
});
