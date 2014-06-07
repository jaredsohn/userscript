// ==UserScript==
// @name           Combat Report Auto-Converter Modificado
// @autor          WTF
// @description    Script for Ikariam. Convert CR to many forums
// @homepage       http://userscripts.org/scripts/show/56551
// @include        http://s*.ikariam.*/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version        2.4.3
// @exclude        http://board.ikariam.*/*
// @exclude        http://support*.ikariam.*/*

//@history	2.4.3 El boton de postear batalla ahora tambien funciona para los servidores de Chile, Colombia y Mexico.


// ==/UserScript==

const VERSION = '2.4.3';

const IkariamLanguageDetection		= new Object();
IkariamLanguageDetection.langToLanguageMap = {
		ar:	"spanish",	by:	"russian",	br:	"portuguese",	bg:	"bulgarian",
		cl:	"spanish",	cn:	"chinese",	co:	"spanish",	cz:	"czech",
		dk:	"danish",	ee:	"estonian",	en:	"english",	fi:	"finish",
		fr:	"french",	de:	"german",	gr:	"greek",	it:	"italian",
		hk:	"chinese",	hu:	"hungarian",	id:	"indonesian",	il:	"hebrew",
		kr:	"korean",	lv:	"latvian",	lt:	"lithuanian",	mx:	"spanish",
		nl:	"dutch",	no:	"norwegian",	pk:	"urdu",		pe:	"spanish",
		ph:	"filipino",	pt:	"portuguese",	pl:	"polish",	ro:	"romanian",
		ru:	"russian",	rs:	"serbian",	sk:	"slovak",	si:	"slovene",
		es:	"spanish",	se:	"swedish",	tw:	"chinese",	tr:	"turkish",
		ua:	"ukranian",	ae:	"arabic",	us:	"english",	ve:	"spanish",
		vn:	"vietnamese",	ba:	"bosnian",	hr:	"bosnian",	yu:	"bosnian"
	};
IkariamLanguageDetection.getLanguage	= function( langCode ) { return IkariamLanguageDetection.langToLanguageMap[ langCode ] || 'english'; }
IkariamLanguageDetection.lang		= unsafeWindow.LocalizationStrings.language || 'en';
IkariamLanguageDetection.language	= IkariamLanguageDetection.getLanguage( IkariamLanguageDetection.lang );


function getLang() {
	return IkariamLanguageDetection.lang;
}

function getLanguage( key ) {
	if ( typeof key == 'string' ) {
		var language = GM_getValue( key, false );
		if ( language )
			return language;
	}
	return IkariamLanguageDetection.language;
}

function populateLanguageSelect( value ) {
	
	var languages = {
		arabic:		'Arabic - اللغة العربية',		bulgarian:	'Bulgarian - Български',
		chinese:	'Chinese - 繁體中文',		czech:		'Czech - Čeština',
		danish:		'Danish - Dansk',		dutch:		'Dutch - Hollandsk',
		english:	'English',			estonian:	'Estonian - Eestlane',
		filipino:	'Filipino - Filipino',		finish:		'Finnish - Suomi',
		french:		'French - Français',		german:		'German - Deutsch',
		greek:		'Greek - Ελληνικά',		hebrew:		'Hebrew - עִברִית',
		hungarian:	'Hungarian - Magyar',		indonesian:	'Indonesian - Bahasa Indonesia',
		italian:	'Italian - Italiano',		korean:		'Korean - 한국어',	
		latvian:	'Latvian - Latviešu',		lithuanian:	'Lithuanian - Lietuvių',
		norwegian:	'Norwegian - Norsk',		polish:		'Polish - Polski',
		portuguese:	'Portuguese - Português',	romanian:	'Romanian - Româna',
		russian:	'Russian - Русский',		serbian:	'Serbian - Српски',
		slovak:		'Slovak - Slovenský',		slovene:	'Slovenian - Slovenski',
		spanish:	'Spanish - Español',		swedish:	'Swedish - Svenska',
		turkish:	'Turkish - Türkçe',		ukranian:	'Ukranian - Українська',
		urdu:		'Urdu',				vietnamese:	'Vietnamese - Tiếng Việt'
	}
	var html = '';
	for ( var l in languages )
		html += '<option value="' + l + '"' + (l == value?' selected':'') + '>' + languages[l] + '</option>';
	return html;
}

function getServerWorld() {
	const hostMatch		= /(s\d+)(\.([a-z]+))?\.ikariam(\.[a-z]+)?\.([a-z]+)/i.exec( top.location.host );
	return (hostMatch?hostMatch[1]:false) || 's?';
}

function getServerDomain() {
	const hostMatch		= /(s\d+)(\.([a-z]+))?\.ikariam(\.[a-z]+)?\.([a-z]+)/i.exec( top.location.host );
	return (hostMatch?(hostMatch[3] || hostMatch[5]):false) || 'org';
}


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
if(GM_getValue('city')==null) { GM_setValue('city',1); }
if(GM_getValue('CRAC_troops')==null) { GM_setValue('CRAC_troops',2); }
if(GM_getValue('CRAC_ratio')==null) { GM_setValue('CRAC_ratio',2); }
if(GM_getValue('CRAC_percent')==null) { GM_setValue('CRAC_percent',2); }
if(GM_getValue('CRAC_loot')==null) { GM_setValue('CRAC_loot',2); }
if(GM_getValue('CRAC_off_points')==null) { GM_setValue('CRAC_off_points',1); }
if(GM_getValue('CRAC_troops_percent')==null) { GM_setValue('CRAC_troops_percent',1); }
if(GM_getValue('CRAC_wordunits')==null) { GM_setValue('CRAC_wordunits',2); }
if(GM_getValue('CRAC_showwall')==null) { GM_setValue('CRAC_showwall',2); }
if(GM_getValue('CRAC_showrounds')==null) { GM_setValue('CRAC_showrounds',2); }
if(GM_getValue('CRAC_bfsize')==null) { GM_setValue('CRAC_bfsize',1); }

language_resources = {
	"arabic":	{population:"\u0627\u0644\u0633\u0643\u0627\u0646", actions:"\u0646\u0642\u0627\u0637 \u062A\u062D\u0631\u0643", wood:"\u0645\u0627\u062F\u0629 \u0635\u0646\u0627\u0639\u064A\u0629", wine:"\u0645\u0634\u0631\u0648\u0628 \u0627\u0644\u0639\u0646\u0628", marble:"\u0631\u062E\u0627\u0645", glass:"\u0628\u0644\u0648\u0631", sulfur:"\u0643\u0628\u0631\u064A\u062A", gold:"\u0630\u0647\u0628"},
	"bulgarian":	{population:"\u041D\u0430\u0441\u0435\u043B\u0435\u043D\u0438\u0435", actions:"\u0422\u043E\u0447\u043A\u0438 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435", wood:"\u0421\u0442\u0440\u043E\u0438\u0442\u0435\u043B\u0435\u043D \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B", wine:"\u0412\u0438\u043D\u043E", marble:"\u041C\u0440\u0430\u043C\u043E\u0440", glass:"\u041A\u0440\u0438\u0441\u0442\u0430\u043B", sulfur:"\u0421\u044F\u0440\u0430", gold:"\u0417\u043B\u0430\u0442\u043E"},
	"chinese":	{population:"\u4EBA\u53E3", actions:"\u884C\u52A8\u70B9", wood:"\u6728\u6750", wine:"\u8461\u8404", marble:"\u77F3\u5934", glass:"\u6C34\u6676", sulfur:"\u786B\u78FA", gold:"\u9EC4\u91D1"},
	"czech":	{population:"Populace", actions:"Ak\u010Dn\xED Body", wood:"Stavebn\xED materi\xE1l", wine:"V\xEDno", marble:"Mramor", glass:"Krystalick\xE9 Sklo", sulfur:"S\xEDra", gold:"Zlato"},
	"danish":	{population:"Befolkning", actions:"Action point", wood:"Tr\xE6", wine:"Vin", marble:"Marmor", glass:"Krystal Glas", sulfur:"Svovl", gold:"Guld"},
	"dutch":	{population:"Bevolking", actions:"Actiepunten", wood:"Bouwmateriaal", wine:"Wijn", marble:"Marmer", glass:"Kristal Glas", sulfur:"Zwavel", gold:"Goud"},
	"english":	{population:"Population", actions:"Action Points", wood:"Building material", wine:"Wine", marble:"Marble", glass:"Crystal Glass", sulfur:"Sulphur", gold:"Gold"},
	"estonian":	{population:"Rahvaarv", actions:"Tegevuspunktid", wood:"Ehitusmaterjal", wine:"Vein", marble:"Marmor", glass:"Kristallid", sulfur:"V\xE4\xE4vel", gold:"Kuld"},
	"filipino":	{population:"Papulasyon", actions:"Puntos ng Aksyon", wood:"Materyales sa Paggawa ng Gusali", wine:"Alak", marble:"Marmol", glass:"Kristal na Salamin", sulfur:"Asupre", gold:"Ginto"},
	"finish":	{population:"V\xE4kiluku", actions:"Toimintapisteet", wood:"Rakennusmateriaali", wine:"Viini", marble:"Marmori", glass:"Kristallilasi", sulfur:"Rikki", gold:"Kulta"},
	"french":	{population:"Population", actions:"Points d`action", wood:"Mat\xE9riau de construction", wine:"Vin", marble:"Marbre", glass:"Verre de cristal", sulfur:"Soufre", gold:"Or"},
	"german":	{population:"Bev\xF6lkerung", actions:"Aktionspunkte", wood:"Baumaterial", wine:"Wein", marble:"Marmor", glass:"Kristallglas", sulfur:"Schwefel", gold:"Gold"},
	"greek":	{population:"\u03A0\u03BB\u03B7\u03B8\u03C5\u03C3\u03BC\u03CC\u03C2", actions:"\u03A0\u03CC\u03BD\u03C4\u03BF\u03B9 \u0394\u03C1\u03AC\u03C3\u03B7\u03C2", wood:"\u039F\u03B9\u03BA\u03BF\u03B4\u03BF\u03BC\u03B9\u03BA\u03CC \u03C5\u03BB\u03B9\u03BA\u03CC", wine:"\u039A\u03C1\u03B1\u03C3\u03AF", marble:"\u039C\u03AC\u03C1\u03BC\u03B1\u03C1\u03BF", glass:"\u039A\u03C1\u03C5\u03C3\u03C4\u03AC\u03BB\u03BB\u03B9\u03BD\u03BF \u0393\u03C5\u03B1\u03BB\u03AF", sulfur:"\u0398\u03B5\u03AF\u03BF", gold:"\u03A7\u03C1\u03C5\u03C3\u03CC\u03C2"},
	"hebrew":	{population:"\u05D0\u05D5\u05DB\u05DC\u05D5\u05E1\u05D9\u05D9\u05D4", actions:"\u05E0\u05E7\u05D5\u05D3\u05D5\u05EA \u05E4\u05E2\u05D5\u05DC\u05D4", wood:"\u05E2\u05E6\u05D9\u05DD", wine:"\u05D9\u05D9\u05DF", marble:"\u05E9\u05D9\u05E9", glass:"\u05D2\u05D1\u05D9\u05E9\u05D9 \u05E7\u05E8\u05D9\u05E1\u05D8\u05DC", sulfur:"\u05D2\u05D5\u05E4\u05E8\u05D9\u05EA", gold:"\u05D6\u05D4\u05D1"},
	"hungarian":	{population:"Lakoss\xE1g", actions:"Action pontok", wood:"\xC9p\xEDt\u0151anyag", wine:"Bor", marble:"M\xE1rv\xE1ny", glass:"Krist\xE1ly", sulfur:"K\xE9npor", gold:"Arany"},
	"italian":	{population:"Popolazione", actions:"Punti Azione", wood:"Legno", wine:"Vino", marble:"Marmo", glass:"Cristallo", sulfur:"Zolfo", gold:"Oro"},
	"korean":	{population:"\uC778\uAD6C", actions:"\uD65C\uB3D9 \uC810\uC218", wood:"\uAC74\uCD95 \uC790\uC7AC", wine:"\uD3EC\uB3C4\uC8FC", marble:"\uB300\uB9AC\uC11D", glass:"\uC218\uC815 \uC720\uB9AC", sulfur:"\uC720\uD669", gold:"\uAE08\uD654"},
	"latvian":	{population:"Apdz\u012Bvot\u012Bba", actions:"R\u012Bc\u012Bbas punkti", wood:"Kokmateri\u0101li", wine:"V\u012Bns", marble:"Marmors", glass:"Krist\u0101ls", sulfur:"S\u0113rs", gold:"Zelts"},
	"lithuanian":	{population:"Populiacija", actions:"Veiksmo ta\u0161kai", wood:"Statybin\u0117s med\u017Eiagos", wine:"Vynas", marble:"Marmuras", glass:"Kristalai", sulfur:"Siera", gold:"Auksas"},
	"norwegian":	{population:"Befolkning", actions:"Handlingspoeng", wood:"Tre", wine:"Vin", marble:"Marmor", glass:"Krystallglass", sulfur:"Svovel", gold:"Gull"},
	"pinoy":	{population:"Papulasyon", actions:"Puntos ng Aksyon", wood:"Materyales sa Paggawa ng Gusali", wine:"Alak", marble:"Marmol", glass:"Kristal na Salamin", sulfur:"Asupre", gold:"Ginto"},
	"polish":	{population:"Populacja", actions:"Punkty akcji", wood:"Materia\u0142 budowlany", wine:"Wino", marble:"Marmur", glass:"Kryszta\u0142", sulfur:"Siarka", gold:"Z\u0142oto"},
	"portuguese":	{population:"Popula\xE7\xE3o", actions:"Pontos de a\xE7\xE3o", wood:"Materiais de constru\xE7\xE3o", wine:"Vinho", marble:"M\xE1rmore", glass:"Cristal", sulfur:"Enxofre", gold:"Ouro"},
	"romanian":	{population:"Populatia", actions:"Punctele actiunii", wood:"Material pentru constructii", wine:"Vin", marble:"Marmura", glass:"Cristal", sulfur:"Sulf", gold:"Aur"},
	"russian":	{population:"\u041D\u0430\u0441\u0435\u043B\u044C\u043D\u0456\u0446\u0442\u0432\u0430", actions:"\u0411\u0430\u043B\u044B \u0434\u0437\u0435\u044F\u043D\u043D\u044F", wood:"\u0411\u0443\u0434\u043C\u0430\u0442\u044D\u0440\u044B\u044F\u043B\u044B", wine:"\u0412\u0456\u043D\u0430\u0433\u0440\u0430\u0434", marble:"\u041C\u0430\u0440\u043C\u0443\u0440", glass:"\u041A\u0440\u044B\u0448\u0442\u0430\u043B\u044C", sulfur:"\u0421\u0435\u0440\u0430", gold:"\u0417\u043E\u043B\u0430\u0442\u0430"},
	"serbian":	{population:"\u041F\u043E\u043F\u0443\u043B\u0430\u0446\u0438\u0458\u0430", actions:"\u0410\u043A\u0446\u0438\u043E\u043D\u0438 \u043F\u043E\u0435\u043D\u0438", wood:"\u0413\u0440\u0430\u0452\u0435\u0432\u0438\u043D\u0441\u043A\u0438 \u043C\u0430\u0442\u0435\u0440\u0438\u0458\u0430\u043B", wine:"\u0412\u0438\u043D\u043E", marble:"\u041C\u0435\u0440\u043C\u0435\u0440", glass:"\u041A\u0440\u0438\u0441\u0442\u0430\u043B", sulfur:"\u0421\u0443\u043C\u043F\u043E\u0440", gold:"\u0417\u043B\u0430\u0442\u043E"},
	"slovak":	{population:"Popul\xE1cia", actions:"Ak\u010Dn\xE9 body", wood:"Stavebn\xFD materi\xE1l", wine:"V\xEDno", marble:"Mramor", glass:"Kry\u0161t\xE1lov\xE9 Sklo", sulfur:"S\xEDra", gold:"Zlato"},
	"slovene":	{population:"Populacija", actions:"Akcijske to\u010Dke", wood:"Gradbeni material", wine:"Vino", marble:"Marmor", glass:"Kristal", sulfur:"\u017Dveplo", gold:"Zlato"},
	"spanish":	{population:"Poblaci\xF3n", actions:"Puntos de acci\xF3n", wood:"Madera", wine:"Vino", marble:"M\xE1rmol", glass:"Cristal", sulfur:"Azufre", gold:"Oro"},
	"swedish":	{population:"Befolkning", actions:"Handlingspo\xE4ng", wood:"Tr\xE4", wine:"Vin", marble:"Marmor", glass:"Kristallglas", sulfur:"Svavel", gold:"Guld"},
	"turkish":	{population:"Halk", actions:"Aksiyon Puan\u0131", wood:"\u0130n\u015Fa Malzemesi", wine:"\u015Earap", marble:"Mermer", glass:"Kristal cam", sulfur:"S\xFClf\xFCr", gold:"Alt\u0131n"},
	"ukranian":	{population:"\u041D\u0430\u0441\u0435\u043B\u0435\u043D\u043D\u044F", actions:"\u0411\u0430\u043B\u0438 \u0434\u0456\u0457", wood:"\u0411\u0443\u0434\u0456\u0432\u0435\u043B\u044C\u043D\u0456 \u043C\u0430\u0442\u0435\u0440\u0456\u0430\u043B\u0438", wine:"\u0412\u0438\u043D\u043E", marble:"\u041C\u0430\u0440\u043C\u0443\u0440", glass:"\u041A\u0440\u0438\u0448\u0442\u0430\u043B\u044C", sulfur:"\u0421\u0456\u0440\u043A\u0430", gold:"\u0417\u043E\u043B\u043E\u0442\u043E"},
	"urdu":		{population:"\u0627\u0628\u0627\u062F\u06CC", actions:"\u062D\u0631\u06A9\u062A \u06A9\u06D2 \u0646\u0645\u0628\u0631", wood:"\u0639\u0645\u0627\u0631\u062A\u06CC \u0633\u0627\u0645\u0627\u0646", wine:"\u062C\u0648\u0633", marble:"\u0633\u0646\u06AF \u0645\u0631 \u0645\u0631", glass:"\u0634\u06CC\u0634\u06C1 \u06AF\u0644\u0627\u0633", sulfur:"\u0633\u0644\u0641\u0631", gold:"\u0633\u0648\u0646\u0627"},
	"vietnamese":	{population:"D\xE2n s\u1ED1", actions:"\u0110i\u1EC3m ho\u1EA1t \u0111\u1ED9ng", wood:"V\u1EADt li\u1EC7u x\xE2y d\u1EF1ng", wine:"R\u01B0\u1EE3u", marble:"C\u1EA9m th\u1EA1ch", glass:"Pha l\xEA", sulfur:"L\u01B0u hu\u1EF3nh", gold:"V\xE0ng"}
}


language_ships = {
ae: { ships: "سفن", cargo: "سفن تجارية", ram: "سفينة مزودة بقوة دفع", ballista: "سفينة منجنيقية", flame: "قاذف اللهب", catapult: "سفينة مزودة بمنجنيق", paddle: "قوة دفع الطارة", mortar: "سفينة هاون", diving: "غواصة" },
ar: { ships: "Barcos", cargo: "Barcos mercantes", ram: "Barco-espolón", ballista: "Barco-ballesta", flame: "Barco lanza-llamas", catapult: "Barco-catapulta", paddle: "Barco-espolón a vapor", mortar: "Barco-mortero", diving: "Submarino" },
bg: { ships: "Кораби", cargo: "Търговски кораби", ram: "Кораб таран", ballista: "Кораб с балиста", flame: "Огнехвъргач", catapult: "Кораб с катапулт", paddle: "Парен таран", mortar: "Кораб с мортира", diving: "Подводница" },
br: { ships: "Barcos", cargo: "Barco de Carga", ram: "Trireme", ballista: "Barco Balista", flame: "Lança Chamas", catapult: "Barco Catapulta", paddle: "Abalroador a Vapor", mortar: "Barco Morteiro", diving: "Submergível" },
by: { ships: "Караблі", cargo: "Сухагруз", ram: "Карабель з таранам", ballista: "Карабель з балістай", flame: "Агнямётный карабель", catapult: "Карабель з катапультай", paddle: "Параход з таранам", mortar: "Карабель з марцірай", diving: "Падводная лодка" },
cl: { ships: "Barcos", cargo: "Barcos mercantes", ram: "Barco-espolón", ballista: "Barco-ballesta", flame: "Barco-lanza llamas", catapult: "Barco-catapulta", paddle: "Barco-espolón a vapor", mortar: "Barco-mortero", diving: "Submarino" },
cn: { ships: "舰船", cargo: "运输船", ram: "冲撞船", ballista: "强弩船", flame: "喷火船", catapult: "投石船", paddle: "明轮冲撞船", mortar: "迫击炮船", diving: "潜水艇" },
co: { ships: "Barcos", cargo: "Barcos mercantes", ram: "Barco-espolón", ballista: "Barco-ballesta", flame: "Barco lanza-llamas", catapult: "Barco-catapulta", paddle: "Barco-espolón a vapor", mortar: "Barco-mortero", diving: "Submarino" },
cz: { ships: "Lodě", cargo: "Nákladní Loď", ram: "Beranidlová Loď", ballista: "Balistová Loď", flame: "Plamenomet", catapult: "Katapultová Loď", paddle: "Parní Beranidlo", mortar: "Dělová Loď", diving: "Ponorka" },
de: { ships: "Schiffe", cargo: "Handelsschiffe", ram: "Rammschiff", ballista: "Ballistaschiff", flame: "Flammenwerfer", catapult: "Katapultschiff", paddle: "Schaufelradramme", mortar: "Mörserschiff", diving: "Tauchboot" },
dk: { ships: "Skibe", cargo: "Handels skib", ram: "Vædre-skib", ballista: "Bue skib", flame: "Flammekaster", catapult: "Katapult skib", paddle: "Hjuldamper væder", mortar: "Morter skib", diving: "Undervandsbåd" },
ee: { ships: "Laevad", cargo: "Kaubalaev", ram: "Rammlaev", ballista: "Amblaev", flame: "Leegiheitja", catapult: "Katapultlaev", paddle: "Ratasmootoriga ramm", mortar: "Mortiirlaev", diving: "Sukeldumislaev" },
en: { ships: "Ships", cargo: "Cargo Ship", ram: "Ram-Ship", ballista: "Ballista ship", flame: "Flame-thrower", catapult: "Catapult Ship", paddle: "Paddle-Wheel-Ram", mortar: "Mortar Ship", diving: "Diving boat" },
es: { ships: "Barcos", cargo: "Barcos mercantes", ram: "Barco-espolón", ballista: "Barco-ballesta", flame: "Barco-lanza llamas", catapult: "Barco-catapulta", paddle: "Barco-espolón a vapor", mortar: "Barco-mortero", diving: "Submarino" },
fi: { ships: "Laivat", cargo: "Kuljetuslaiva", ram: "Murtajalaiva", ballista: "Tykkilaiva", flame: "Liekinheitin", catapult: "Katapulttilaiva", paddle: "Siipiratasmurtaja", mortar: "Heitinalus", diving: "Sukellusvene" },
fr: { ships: "Bateaux", cargo: "Navires marchands", ram: "Bateau bélier", ballista: "Bateau Ballista", flame: "Lance-flammes", catapult: "Bateau à catapulte", paddle: "Bélier roue à aubes", mortar: "Bateau à mortier", diving: "Bateau de plongée" },
gr: { ships: "Σκάφη", cargo: "Σκάφος φορτίου", ram: "Σκάφος-Έμβολο", ballista: "Σκάφος βαλιστών", flame: "Φλογοβόλο", catapult: "Σκάφος καταπελτών", paddle: "Κουπί-Ρόδα-Κριός", mortar: "Σκάφος κονιάματος", diving: "Βάρκα Κατάδησης" },
hk: { ships: "艦隊", cargo: "運輸船", ram: "衝撞船", ballista: "強弩船", flame: "噴火船", catapult: "投石船", paddle: "明輪衝撞船", mortar: "迫擊砲船", diving: "潛水艇" },
hu: { ships: "Hajók", cargo: "Teherhajó", ram: "Törő-hajó", ballista: "Balliszta Hajó", flame: "Lánghajó", catapult: "Katapult Hajó", paddle: "Evezőkerék Törő Hajó", mortar: "Ágyú Hajó", diving: "Búvárhajó" },
id: { ships: "Kapal", cargo: "Kapal Kargo", ram: "Kapal-ram", ballista: "Kapal Ballista", flame: "Pelempar - api", catapult: "Kapal Menjepretkan", paddle: "Paddle-Wheel-Ram", mortar: "Kapal Mortir", diving: "Kapal menyelam" },
il: { ships: "ספינות", cargo: "ספינת מטען", ram: "ספינת אייל-ברזל", ballista: "ספינת בליסטרה", flame: "להביור", catapult: "ספינת קטפולטה", paddle: "אייל-ברזל מושט", mortar: "ספינת מרגמה", diving: "צוללת" },
it: { ships: "Navi", cargo: "Nave mercantile", ram: "Nave con Ariete", ballista: "Nave con Balestra", flame: "LanciaFuoco", catapult: "Nave con Catapulta", paddle: "Ariete su Nave a Vapore", mortar: "Nave con Mortaio", diving: "Sottomarino" },
kr: { ships: "전함", cargo: "무역선", ram: "돌격선", ballista: "노궁선", flame: "화염선", catapult: "투석선", paddle: "외륜선", mortar: "포선", diving: "잠수함" },
lt: { ships: "Laivai", cargo: "Krovininis laivas", ram: "Taranas", ballista: "Balistinis laivas", flame: "Ugninis laivas", catapult: "Laivas su katapulta", paddle: "Garais varomas taranas", mortar: "Mortyrinis laivas", diving: "Povandeninis laivas" },
lv: { ships: "Kuģi", cargo: "Tirdzniecības kuģis", ram: "Tarāna kuģis", ballista: "Ballistiskais kuģis", flame: "Ugunsmetējs", catapult: "Katapultas kuģis", paddle: "Dzenrata kuģis", mortar: "Mīnmetēja kuģis", diving: "Zemūdene" },
mx: { ships: "Barcos", cargo: "Barcos mercantes", ram: "Barco-espolón", ballista: "Barco-ballesta", flame: "Barco-lanza llamas", catapult: "Barco-catapulta", paddle: "Barco-espolón a vapor", mortar: "Barco-mortero", diving: "Submarino" },
nl: { ships: "Schepen", cargo: "Vrachtschip", ram: "Ram-schip", ballista: "Ballista schip", flame: "Vlammenwerper", catapult: "Katapult schip", paddle: "Scheprad-ram", mortar: "Mortier schip", diving: "Onderzeeër" },
no: { ships: "Skip", cargo: "Lasteskip", ram: "Rambukkskip", ballista: "Ballistaskip", flame: "Flammekaster", catapult: "Katapultskip", paddle: "Skovlhjulrambukk", mortar: "Morterskip", diving: "Dykkebåt" },
pe: { ships: "Barcos", cargo: "Barcos mercantes", ram: "Barco-espolón", ballista: "Barco-ballesta", flame: "Barco-lanza llamas", catapult: "Barco-catapulta", paddle: "Barco-espolón a vapor", mortar: "Barco-mortero", diving: "Submarino" },
ph: { ships: "Mga Barko", cargo: "Barko pangkargamento", ram: "Ram-Ship", ballista: "Ballista Ship", flame: "Flamethrower", catapult: "Catapult Ship", paddle: "Paddle-Wheel-Ram", mortar: "Mortar Ship", diving: "Diving Boat" },
pk: { ships: "جہاز", cargo: "کارگو شپ", ram: "اڑن تشتری", ballista: "بالستا جہاز", flame: "اگ پھینکنے والا", catapult: "کاٹا پولٹ جہاز", paddle: "پہیے والا مینڈھا", mortar: "تو پو ن والے جہاز", diving: "سب مارین" },
pl: { ships: "Statki", cargo: "Statek handlowy", ram: "Okręt z Taranem", ballista: "Balista", flame: "Okręt z Miotaczem ognia", catapult: "Okręt z Katapultą", paddle: "Okręt Parowy z Taranem", mortar: "Okręt z Moździerzem", diving: "Okręt Podwodny" },
pt: { ships: "Barcos", cargo: "Barco de Carga", ram: "Trireme", ballista: "Barco Balista", flame: "Lança-Chamas", catapult: "Barco Catapulta", paddle: "Abalroador a Vapor", mortar: "Barco Morteiro", diving: "Submergível" },
ro: { ships: "Nave", cargo: "Nava de transport", ram: "Nava-Berbec", ballista: "Nava balistica", flame: "Aruncator de flacari", catapult: "Nava cu catapulta", paddle: "Berbec cu vasla circulara", mortar: "Nava Mortier", diving: "Submarin" },
rs: { ships: "Бродови", cargo: "Трговачки брод", ram: "Брод ован", ballista: "Брод копљар", flame: "Бацач пламена", catapult: "Брод катапулт", paddle: "Парни ратни брод", mortar: "Брод минобацач", diving: "Подморница" },
ru: { ships: "Корабли", cargo: "Сухогруз", ram: "Корабль с тараном", ballista: "Корабль с баллистой", flame: "Огнеметный корабль", catapult: "Корабль с катапультой", paddle: "Пароход с тараном", mortar: "Корабль с мортирой", diving: "Подводная лодка" },
se: { ships: "Skepp", cargo: "Handelsskepp", ram: "Rammskepp", ballista: "Ballist-skepp", flame: "Eldkastare", catapult: "Katapultskepp", paddle: "Ångdriven Skovelramm", mortar: "Mörsarskepp", diving: "Ubåt" },
si: { ships: "Ladje", cargo: "Tovorna ladja", ram: "Ladja Ram", ballista: "Ladja Ballista", flame: "Metalec plamena", catapult: "Ladja Katapult", paddle: "Parna vojna ladja", mortar: "Ladja Mortar", diving: "Podmornica" },
sk: { ships: "Lode", cargo: "Nákladná loď", ram: "Baranidlová loď", ballista: "Balistová loď", flame: "Plameňomet", catapult: "Katapultová Loď", paddle: "Parné baranidlo", mortar: "Delová loď", diving: "Ponorka" },
tr: { ships: "Gemiler", cargo: "Kargo Gemisi", ram: "Şahmerdan-Gemisi", ballista: "Okçu Gemi", flame: "Alev Atıcı", catapult: "Mancınık Gemisi", paddle: "Buharlı Şahmerdan", mortar: "Havantopu Gemisi", diving: "Denizaltı" },
tw: { ships: "艦隊", cargo: "運輸船", ram: "衝撞船", ballista: "強弩船", flame: "噴火船", catapult: "投石船", paddle: "明輪衝撞船", mortar: "迫擊砲船", diving: "潛水艇" },
ua: { ships: "Кораблі", cargo: "Транспортне судно", ram: "Корабель з тараном", ballista: "Корабель з балістою", flame: "Вогнеметний корабель", catapult: "Корабель з катапультою", paddle: "Пароплав з тараном", mortar: "Корабель з мортирою", diving: "Підводний човен" },
us: { ships: "Ships", cargo: "Cargo Ship", ram: "Ram-Ship", ballista: "Ballista Ship", flame: "Flamethrower", catapult: "Catapult Ship", paddle: "Paddle-Wheel-Ram", mortar: "Mortar Ship", diving: "Diving Boat" },
ve: { ships: "Barcos", cargo: "Barcos mercantes", ram: "Barco-espolón", ballista: "Barco-ballesta", flame: "Barco-lanza llamas", catapult: "Barco-catapulta", paddle: "Barco-espolón a vapor", mortar: "Barco-mortero", diving: "Submarino" },
vn: { ships: "Tàu thuyền", cargo: "Tàu chở hàng", ram: "Ram-Ship", ballista: "Tàu chiến Ballista", flame: "Tàu phun lửa", catapult: "Tàu bắn đá", paddle: "Tàu hơi nước", mortar: "Tàu thần công", diving: "Tàu ngầm" },
}


language_units = {
ae: { units: "وحدات", slinger: "مقلاع حجارة", swordsman: "مبارز", phalanx: "كتيبة", archer: "رامي سهام", marksman: "رماة", gyrocopter: "طائرة مروحية", "steam giant": "عملاق بخاري", bombardier: "قاصف", ram: "مدق", catapult: "منجنيق", mortar: "هاون", doctor: "طبيب", cook: "طباخ", spearmen: "Spearmen?", barbarian: "Barbarian?" },
ar: { units: "Unidades", slinger: "Hondero", swordsman: "Espadachín", phalanx: "Hoplita", archer: "Arquero", marksman: "Fusilero", gyrocopter: "Girocóptero", "steam giant": "Gigante a vapor", bombardier: "Bombardero", ram: "Ariete", catapult: "Catapulta", mortar: "Mortero", doctor: "Médico", cook: "Cocinero", spearmen: "Spearmen?", barbarian: "Barbarian?" },
bg: { units: "Единици", slinger: "Прашконосец", swordsman: "Мечоносец", phalanx: "Хоплит", archer: "Стрелци", marksman: "Мускетар", gyrocopter: "Жирокоптер", "steam giant": "Парен великан", bombardier: "Бомбардировач", ram: "Таран", catapult: "Катапулт", mortar: "Мортира", doctor: "Доктор", cook: "Готвач", spearmen: "Spearmen?", barbarian: "Barbarian?" },
br: { units: "Unidades", slinger: "Fundeiro", swordsman: "Guerreiro de Espada", phalanx: "Hoplita", archer: "Arqueiro", marksman: "Caçador", gyrocopter: "Giro-cóptero", "steam giant": "Gigante a Vapor", bombardier: "Balão Bombardeiro", ram: "Aríete", catapult: "Catapulta", mortar: "Morteiro", doctor: "Médico", cook: "Cozinheiro", spearmen: "Spearmen?", barbarian: "Barbarian?" },
by: { units: "Вайсковыя часткі", slinger: "Прашчнік", swordsman: "Мечнік", phalanx: "Фаланга", archer: "Лучнік", marksman: "Стралок", gyrocopter: "Гіракопцер", "steam giant": "Паравы гігант", bombardier: "Бамбавік", ram: "Таран", catapult: "Катапульта", mortar: "Марціра", doctor: "Доктар", cook: "Кухар", spearmen: "Spearmen?", barbarian: "Barbarian?" },
cl: { units: "Unidades", slinger: "Hondero", swordsman: "Espadachín", phalanx: "Hoplita", archer: "Arquero", marksman: "Fusilero", gyrocopter: "Girocóptero", "steam giant": "Gigante a vapor", bombardier: "Bombardero", ram: "Ariete", catapult: "Catapulta", mortar: "Mortero", doctor: "Médico", cook: "Cocinero", spearmen: "Spearmen?", barbarian: "Barbarian?" },
cn: { units: "部队", slinger: "投石兵", swordsman: "剑士", phalanx: "方阵兵", archer: "弓箭手", marksman: "火枪手", gyrocopter: "旋翼机", "steam giant": "蒸汽巨人", bombardier: "轰炸气球", ram: "冲撞车", catapult: "投石车", mortar: "迫击炮", doctor: "医生", cook: "厨师", spearmen: "Spearmen?", barbarian: "Barbarian?" },
co: { units: "Unidades", slinger: "Hondero", swordsman: "Espadachín", phalanx: "Hoplita", archer: "Arquero", marksman: "Fusilero", gyrocopter: "Girocóptero", "steam giant": "Gigante a vapor", bombardier: "Bombardero", ram: "Ariete", catapult: "Catapulta", mortar: "Mortero", doctor: "Médico", cook: "Cocinero", spearmen: "Spearmen?", barbarian: "Barbarian?" },
cz: { units: "Jednotky", slinger: "Střelec s Prakem", swordsman: "Šermíř", phalanx: "Falanga", archer: "Lučištník", marksman: "Střelec", gyrocopter: "Gyrokoptéra", "steam giant": "Parní Obr", bombardier: "Bombardér", ram: "Beranidlo", catapult: "Katapult", mortar: "Dělo", doctor: "Doktor", cook: "Kuchař", spearmen: "Spearmen?", barbarian: "Barbarian?" },
de: { units: "Einheiten", slinger: "Steinschleuderer", swordsman: "Schwertkämpfer", phalanx: "Phalanx", archer: "Bogenschütze", marksman: "Schütze", gyrocopter: "Gyrokopter", "steam giant": "Dampfgigant", bombardier: "Bombardier", ram: "Rammbock", catapult: "Katapult", mortar: "Mörser", doctor: "Arzt", cook: "Koch", spearmen: "Spearmen?", barbarian: "Barbarian?" },
dk: { units: "Enheder", slinger: "Stenslynger", swordsman: "Sværdkriger", phalanx: "Falanks", archer: "Bueskytte", marksman: "Musketer", gyrocopter: "Gyrokopter", "steam giant": "Damp-kæmpe", bombardier: "Bombardier", ram: "Rambuk", catapult: "Katapult", mortar: "Morter", doctor: "Læge", cook: "Kok", spearmen: "Spearmen?", barbarian: "Barbarian?" },
ee: { units: "Sõdurid", slinger: "Linguheitja", swordsman: "Mõõgamees", phalanx: "Faalanks", archer: "Vibulaskja", marksman: "Täpsuslaskur", gyrocopter: "Gürokopter", "steam giant": "Auruhiiglane", bombardier: "Pommiheitja", ram: "Lõhkumisramm", catapult: "Katapult", mortar: "Mortiir", doctor: "Doktor", cook: "Kokk", spearmen: "Spearmen?", barbarian: "Barbarian?" },
en: { units: "Units", slinger: "Slinger", swordsman: "Swordsman", phalanx: "Phalanx", archer: "Archer", marksman: "Marksman", gyrocopter: "Gyrocopter", "steam giant": "Steam Giant", bombardier: "Bombardier", ram: "Battering ram", catapult: "Catapult", mortar: "Mortar", doctor: "Doctor", cook: "Cook", spearmen: "Spearmen", barbarian: "Barbarian" },
es: { units: "Unidades", slinger: "Hondero", swordsman: "Espadachín", phalanx: "Hoplita", archer: "Arquero", marksman: "Fusilero", gyrocopter: "Girocóptero", "steam giant": "Gigante a vapor", bombardier: "Bombardero", ram: "Ariete", catapult: "Catapulta", mortar: "Mortero", doctor: "Médico", cook: "Cocinero", spearmen: "Lancero", barbarian: "Bárbaro" },
fi: { units: "Yksiköt", slinger: "Linkomies", swordsman: "Miekkamies", phalanx: "Keihäsmies", archer: "Jousiampuja", marksman: "Kiväärimies", gyrocopter: "Gyrokopteri", "steam giant": "Höyryjätti", bombardier: "Pommikone", ram: "Murtaja", catapult: "Katapultti", mortar: "Heitin", doctor: "Lääkäri", cook: "Kokki", spearmen: "Spearmen?", barbarian: "Barbarian?" },
fr: { units: "Unités", slinger: "Lance-pierre", swordsman: "Épéiste", phalanx: "Phalange", archer: "Archer", marksman: "Tireur", gyrocopter: "Gyrocoptère", "steam giant": "Géant à vapeur", bombardier: "Bombardier", ram: "Bélier", catapult: "Catapulte", mortar: "Mortier", doctor: "Médecin", cook: "Cuisinier", spearmen: "Spearmen?", barbarian: "Barbarian?" },
gr: { units: "Μονάδες", slinger: "Εκτοξευτής", swordsman: "Ξιφομάχος", phalanx: "Φάλαγγα", archer: "Τοξότης", marksman: "Οπλίτης", gyrocopter: "Γυροκόπτερο", "steam giant": "Γίγαντας Ατμού", bombardier: "Βομβαρδιστικό", ram: "Κριός", catapult: "Καταπέλτης", mortar: "Κονίαμα", doctor: "Γιατρός", cook: "Μάγειρας", spearmen: "Spearmen?", barbarian: "Barbarian?" },
hk: { units: "部隊", slinger: "投石兵", swordsman: "劍士", phalanx: "方陣兵", archer: "弓箭手", marksman: "火槍手", gyrocopter: "旋翼機", "steam giant": "蒸氣巨人", bombardier: "轟炸氣球", ram: "衝撞車", catapult: "投石車", mortar: "迫擊砲", doctor: "醫生", cook: "廚師", spearmen: "Spearmen?", barbarian: "Barbarian?" },
hu: { units: "Egységek", slinger: "Parittyás", swordsman: "Kardforgató", phalanx: "Phalanx", archer: "Íjász", marksman: "Lövész", gyrocopter: "Gyrokopter", "steam giant": "Gőzóriás", bombardier: "Bombázó", ram: "Faltörő Kos", catapult: "Katapult", mortar: "Ágyú", doctor: "Felcser", cook: "Séf", spearmen: "Spearmen?", barbarian: "Barbarian?" },
id: { units: "Unit", slinger: "Ambin", swordsman: "Ahli pemain anggar", phalanx: "Tulang jari", archer: "Pemanah", marksman: "Ahli", gyrocopter: "Gyrocopter", "steam giant": "Steam Giant", bombardier: "Bombardier", ram: "Alat pemukul dinding", catapult: "Katapel", mortar: "Mortir", doctor: "Doktor", cook: "Cook", spearmen: "Spearmen?", barbarian: "Barbarian?" },
il: { units: "יחידות", slinger: "קלע", swordsman: "נושא חרב", phalanx: "פלנקס", archer: "קשת", marksman: "רובאי", gyrocopter: "גירוקופטר", "steam giant": "ענק קיטור", bombardier: "מפציץ", ram: "אייל-ברזל", catapult: "קטפולטה", mortar: "מרגמה", doctor: "רופא", cook: "טבח", spearmen: "Spearmen?", barbarian: "Barbarian?" },
it: { units: "Unità", slinger: "Fromboliere", swordsman: "Spadaccino", phalanx: "Oplita", archer: "Arciere", marksman: "Tiratore", gyrocopter: "Girocoptero", "steam giant": "Gigante a Vapore", bombardier: "Bombardiere", ram: "Ariete", catapult: "Catapulta", mortar: "Mortaio", doctor: "Guaritore", cook: "Cuoco", spearmen: "Spearmen?", barbarian: "Barbarian?" },
kr: { units: "군사", slinger: "투석병", swordsman: "보병", phalanx: "창병", archer: "궁병", marksman: "총병", gyrocopter: "비행병", "steam giant": "철갑병", bombardier: "폭격병", ram: "공성추", catapult: "투석기", mortar: "포병", doctor: "의사", cook: "요리사", spearmen: "Spearmen?", barbarian: "Barbarian?" },
lt: { units: "Kariai", slinger: "Stropuotojas", swordsman: "Fechtuotojas", phalanx: "Falanga", archer: "Lankininkas", marksman: "Snaiperis", gyrocopter: "Girokopteris", "steam giant": "Garais varomas gigantas", bombardier: "Bombarduotojas", ram: "Taranas", catapult: "Katapulta", mortar: "Mortyra", doctor: "Daktaras", cook: "Kokas", spearmen: "Spearmen?", barbarian: "Barbarian?" },
lv: { units: "Vienības", slinger: "Metējs", swordsman: "Paukotājs", phalanx: "Šķēpnesis", archer: "Lokšāvējs", marksman: "Šāvējs", gyrocopter: "Helikopters", "steam giant": "Tvaika milzis", bombardier: "Bombardieris", ram: "Tarāns", catapult: "Katapulta", mortar: "Mīnmetējs", doctor: "Ārsts", cook: "Pavārs", spearmen: "Spearmen?", barbarian: "Barbarian?" },
mx: { units: "Unidades", slinger: "Hondero", swordsman: "Espadachín", phalanx: "Hoplita", archer: "Arquero", marksman: "Fusilero", gyrocopter: "Girocóptero", "steam giant": "Gigante a vapor", bombardier: "Bombardero", ram: "Ariete", catapult: "Catapulta", mortar: "Mortero", doctor: "Médico", cook: "Cocinero", spearmen: "Spearmen?", barbarian: "Barbarian?" },
nl: { units: "Eenheden", slinger: "Steen slinger", swordsman: "Zwaardvechter", phalanx: "Hopliet", archer: "Boogschutter", marksman: "Schutter", gyrocopter: "Gyrocopter", "steam giant": "Stoom reus", bombardier: "Bombardier", ram: "Ram", catapult: "Katapult", mortar: "Mortier", doctor: "Dokter", cook: "Kok", spearmen: "Spearmen?", barbarian: "Barbarian?" },
no: { units: "Enheter", slinger: "Stenslynger", swordsman: "Sverdkjemper", phalanx: "Phalanx", archer: "Bueskytter", marksman: "Skytter", gyrocopter: "Gyrokopter", "steam giant": "Dampkjempe", bombardier: "Bombardier", ram: "Rambukk", catapult: "Katapult", mortar: "Morter", doctor: "Doktor", cook: "Kokk", spearmen: "Spearmen?", barbarian: "Barbarian?" },
pe: { units: "Unidades", slinger: "Hondero", swordsman: "Espadachín", phalanx: "Hoplita", archer: "Arquero", marksman: "Fusilero", gyrocopter: "Girocóptero", "steam giant": "Gigante a vapor", bombardier: "Bombardero", ram: "Ariete", catapult: "Catapulta", mortar: "Mortero", doctor: "Médico", cook: "Cocinero", spearmen: "Spearmen?", barbarian: "Barbarian?" },
ph: { units: "Mga tauhan", slinger: "Slinger", swordsman: "Swordsman", phalanx: "Phalanx", archer: "Archer", marksman: "Gunsman", gyrocopter: "Gyrocopter", "steam giant": "Higanteng demakina", bombardier: "Bombardier", ram: "Ram", catapult: "Katapult", mortar: "Mortar", doctor: "Manggagamot", cook: "Tigaluto", spearmen: "Spearmen?", barbarian: "Barbarian?" },
pk: { units: "فوجی", slinger: "غلیل", swordsman: "تلوار باز", phalanx: "نیزہ انداز", archer: "تیر انداز", marksman: "فو جی", gyrocopter: "گیرو کوپٹر", "steam giant": "بھاپ کا جن", bombardier: "بمب بھینکنے والا", ram: "مُوسل", catapult: "کاٹا پولٹ", mortar: "توپین", doctor: "ڈاکٹر", cook: "باورچی", spearmen: "Spearmen?", barbarian: "Barbarian?" },
pl: { units: "Jednostki", slinger: "Procarz", swordsman: "Piechur", phalanx: "Hoplita", archer: "Łucznik", marksman: "Strzelec", gyrocopter: "Żyrokopter", "steam giant": "Gigant na Parę", bombardier: "Bombardier", ram: "Taran", catapult: "Katapulta", mortar: "Moździerz", doctor: "Medyk", cook: "Kucharz", spearmen: "Spearmen?", barbarian: "Barbarian?" },
pt: { units: "Unidades", slinger: "Fundeiro", swordsman: "Guerreiro de Espada", phalanx: "Hoplita", archer: "Arqueiro", marksman: "Caçador", gyrocopter: "Giracóptero", "steam giant": "Gigante a Vapor", bombardier: "Balão-Bombardeiro", ram: "Aríete", catapult: "Catapulta", mortar: "Morteiro", doctor: "Médico", cook: "Cozinheiro", spearmen: "Spearmen?", barbarian: "Barbarian?" },
ro: { units: "Unitati", slinger: "Aruncator cu prastia", swordsman: "Spadasin", phalanx: "Phalanx", archer: "Arcas", marksman: "Tragator", gyrocopter: "Girocopter", "steam giant": "Gigant pe aburi", bombardier: "Bombardier", ram: "Berbec", catapult: "Catapulta", mortar: "Mortier", doctor: "Medic", cook: "Bucatar", spearmen: "Spearmen?", barbarian: "Barbarian?" },
rs: { units: "Јединице", slinger: "Праћкар", swordsman: "Мачевалац", phalanx: "Копљаник", archer: "Стрелац", marksman: "Мускетар", gyrocopter: "Гирокоптер", "steam giant": "Челични џин", bombardier: "Бомбардер", ram: "Ован", catapult: "Катапулт", mortar: "Минобацач", doctor: "Доктор", cook: "Кувар", spearmen: "Spearmen?", barbarian: "Barbarian?" },
ru: { units: "Войсковые части", slinger: "Пращник", swordsman: "Мечник", phalanx: "Фаланга", archer: "Лучник", marksman: "Стрелок", gyrocopter: "Гирокоптер", "steam giant": "Паровой гигант", bombardier: "Бомбардировщик", ram: "Таран", catapult: "Катапульта", mortar: "Мортира", doctor: "Доктор", cook: "Повар", spearmen: "Spearmen?", barbarian: "Barbarian?" },
se: { units: "Enheter", slinger: "Slungare", swordsman: "Svärdsman", phalanx: "Hoplit", archer: "Pilbågsskytt", marksman: "Musketerare", gyrocopter: "Gyrokopter", "steam giant": "Ång-jätte", bombardier: "Bombfällare", ram: "Murbräcka", catapult: "Katapult", mortar: "Mörsare", doctor: "Doktor", cook: "Kock", spearmen: "Spearmen?", barbarian: "Barbarian?" },
si: { units: "Enote", slinger: "Pračar", swordsman: "Mečevalec", phalanx: "Suličar", archer: "Lokostrelec", marksman: "Mušketir", gyrocopter: "Girokopter", "steam giant": "Parni velikan", bombardier: "Bombarder", ram: "Oven", catapult: "Katapult", mortar: "Minometalec", doctor: "Zdravnik", cook: "Kuhar", spearmen: "Spearmen?", barbarian: "Barbarian?" },
sk: { units: "Jednotky", slinger: "Strelec s prakom", swordsman: "Šermiar", phalanx: "Falang", archer: "Lukostrelec", marksman: "Strelec", gyrocopter: "Gyrokoptéra", "steam giant": "Parný obor", bombardier: "Bombardér", ram: "Baranidlo", catapult: "Katapult", mortar: "Delo", doctor: "Doktor", cook: "Kuchár", spearmen: "Spearmen?", barbarian: "Barbarian?" },
tr: { units: "Birimler", slinger: "Taş Atıcı", swordsman: "Kılıç Ustası", phalanx: "Phalanx", archer: "Okçu", marksman: "Tüfekçi", gyrocopter: "Gyrokopter", "steam giant": "Buhar Devi", bombardier: "Balon", ram: "Şahmerdan", catapult: "Mancınık", mortar: "Topçu", doctor: "Hekim", cook: "Aşçı", spearmen: "Spearmen?", barbarian: "Barbarian?" },
tw: { units: "部隊", slinger: "投石兵", swordsman: "劍士", phalanx: "方陣兵", archer: "弓箭手", marksman: "火槍手", gyrocopter: "旋翼機", "steam giant": "蒸氣巨人", bombardier: "轟炸氣球", ram: "衝撞車", catapult: "投石車", mortar: "迫擊砲", doctor: "醫生", cook: "廚師", spearmen: "Spearmen?", barbarian: "Barbarian?" },
ua: { units: "Військові частини", slinger: "Пращник", swordsman: "Мечник", phalanx: "Фаланга", archer: "Лучник", marksman: "Стрілець", gyrocopter: "Гірокоптер", "steam giant": "Паровий гігант", bombardier: "Бомбардувальник", ram: "Таран", catapult: "Катапульта", mortar: "Мортира", doctor: "Лікар", cook: "Кухар", spearmen: "Spearmen?", barbarian: "Barbarian?" },
us: { units: "Units", slinger: "Slinger", swordsman: "Swordsman", phalanx: "Phalanx", archer: "Archer", marksman: "Gunsman", gyrocopter: "Gyrocopter", "steam giant": "Steam Giant", bombardier: "Bombardier", ram: "Ram", catapult: "Catapult", mortar: "Mortar", doctor: "Doctor", cook: "Cook", spearmen: "Spearmen?", barbarian: "Barbarian?" },
ve: { units: "Unidades", slinger: "Hondero", swordsman: "Espadachín", phalanx: "Hoplita", archer: "Arquero", marksman: "Fusilero", gyrocopter: "Girocóptero", "steam giant": "Gigante a vapor", bombardier: "Bombardero", ram: "Ariete", catapult: "Catapulta", mortar: "Mortero", doctor: "Médico", cook: "Cocinero", spearmen: "Lancero", barbarian: "Bárbaro" },
vn: { units: "Quân lính", slinger: "Người ném đá", swordsman: "Kiếm thủ", phalanx: "Phalanx", archer: "Cung thủ", marksman: "Xạ thủ", gyrocopter: "Trực thăng", "steam giant": "Người máy hơi nước", bombardier: "Pháo thủ", ram: "Ram", catapult: "Máy bắn đá", mortar: "Pháo binh", doctor: "Bác sĩ", cook: "Đầu bếp", spearmen: "Spearmen?", barbarian: "Barbarian?" },
}


Languague_forums = {
cl: ['0','32','65'],
co: ['0','35','52','108','115'],
es: ['0','107','108','109','110','111','112','113','121','134','152','195','216','234','260'],
mx: ['0','25','48','62','128','137','144','155','191'],
ve: ['0','48','67']
}


var IKCRC_REPORT = {
	info:   { type:null, place:null, time:null, attackers:null, defenders:null, wall:null },
	battle: { attacking_totals: [0, 0, 0], defending_totals: [0, 0, 0], wall: '', walltext: '', attackers: [], defenders: [], victors:null },
	};

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

var ffnew = 0;
if(/Mozilla/.test(navigator.userAgent)) {
for(i=navigator.userAgent.length-1;i>0;i--) {
	if(navigator.userAgent[i]=='/') {	break;	}	
}
var moz_version = '';
for(j=i+1;j<i+4;j++) {
	moz_version = moz_version + navigator.userAgent[j];
}
if(parseFloat(moz_version)>=3.5) { ffnew = 1; }
}

function check_version(url, data) {
    GM_xmlhttpRequest({
        method: "POST",
        url: url,
        headers:{'Content-type':'application/x-www-form-urlencoded'},
        data:encodeURI(data),
        onload: function(xhr) { 

		var testtext = /@version        /;
		
		if(testtext.test(xhr.responseText)) { 
			var version1 = xhr.responseText.split('@version        ');
			var version2 = version1[1].split('//');
			var version3 = version2[0];
			var version4 = '';
			
			if(ffnew==1) {
				version4 = version3.trim(); } 
			else {
				version4 = version3.replace(/^\s*|\s*$/g,"");
				}


if(VERSION!=version4) { if(confirm('Su script Combat Report Auto-Converter está obsoleto. ¿Desea actualizar a la última versión?')) {  openInNewTab('http://userscripts.org/scripts/source/56551.user.js','Actualizar Script');  } } else { 
updateVersionCheck();

}
		}
		
		}
    });
}
if(isNaN(parseInt(GM_getValue('CRAC_lastVcheck')))) { GM_setValue('CRAC_lastVcheck','0'); }
 var today = new Date();
today = today.getTime();
var today2 = parseInt(today);
var last_check = parseInt(GM_getValue('CRAC_lastVcheck'))+86400000;

if(today2>last_check) {
check_version('http://userscripts.org/scripts/review/56551', '');  } 


const PAGE_ID = {
	militaryAdvisorReportView:	"report"
}[ $("body").attr("id") ];

const PAGE_TYPE = document.location.href.indexOf("detailedCombatId") == -1 ? 'overview' : 'detailed';

const U_MAP = {
	name: { slinger: "army s301", swordsman: "army s302", phalanx: "army s303", archer: "army s313", marksman: "army s304", gyrocopter: "army s312", "steam giant": "army s308", bombardier: "army s309", ram: "army s307", catapult: "army s306", mortar: "army s305", doctor: "army s311", cook: "army s310" },
	clas: { "army s301": "slinger", "army s302": "swordsman", "army s303": "phalanx", "army s313": "archer", "army s304": "marksman", "army s312": "gyrocopter", "army s308": "steam giant", "army s309": "bombardier", "army s307": "ram", "army s306": "catapult", "army s305": "mortar", "army s311": "doctor", "army s310": "cook", "army s315": "spearmen", "army s316": "barbarian" }
};
const S_MAP = {
	name: { cargo: "fleet s201", ram: "fleet s210", ballista: "fleet s213", flame: "fleet s211", catapult: "fleet s214", paddle: "fleet s216", mortar: "fleet s215", diving: "fleet s212" },
	clas: { "fleet s201": "cargo", "fleet s210": "ram", "fleet s213": "ballista", "fleet s211": "flame", "fleet s214": "catapult", "fleet s216": "paddle", "fleet s215": "mortar", "fleet s212": "diving" }
};


if (PAGE_ID == 'report') {
	
	var LANG = getLang();
	var LANGUAGE = getLanguage();
	var L_SHIPS = language_ships[LANG];
	var L_UNITS = language_units[LANG];

	if (PAGE_TYPE == 'overview') {
		ParseReport();
		BuildReport();
	}
}

function ParseReport() { 
	
	IKCRC_REPORT.info.type  = $("#troopsReport table.overview td.headline div").attr("class").split(' ')[0] == "army" ? "army" : "fleet";
	IKCRC_REPORT.info.place = $("div#troopsReport h3.header")[0].childNodes[0].nodeValue;
	IKCRC_REPORT.info.time  = $("div#troopsReport h3.header span.date").text().replace(/\(/,'').replace(/\)/, ''); 
		
	IKCRC_REPORT.info.attackers = $("div#troopsReport div.content div:eq(0) span").text(); 
	IKCRC_REPORT.info.defenders = $("div#troopsReport div.content div:eq(1) span").text(); 

	var unitSide = null;
	var unitKeys = new Array();
	$("#troopsReport table.overview tr").each(function() {
		
		if ($(this).find("td").attr("class").split(' ')[1] == 'headline') {
			unitSide = "attackers";
			unitKeys = []; 
			$(this).find("div").each(function() { unitKeys.push($(this).attr("class"));
 });
		}
		else
		if ($(this).find("td").attr("class").split(' ')[1] == 'nobg') { 
			unitSide = "defenders";
		}
		else
		if ($(this).find("td.numbers").size() == unitKeys.length) {
			unitCount = 0; 
			$(this).find("td.numbers").each(function() {
				var unitClass = unitKeys[unitCount++];
				var unitName = IKCRC_REPORT.info.type == "army" ? U_MAP.clas[unitClass] : S_MAP.clas[unitClass];
				if (unitName != null) { 
					AddUnit(unitSide == "attackers" ? IKCRC_REPORT.battle.attackers : IKCRC_REPORT.battle.defenders, unitName, $(this).text());
				}
			});
		}
	});

	IKCRC_REPORT.battle.victors = $("div#troopsReport div.result div.winners").text(); 
	IKCRC_REPORT.battle.loot = $("div#troopsReport div.result").text(); 
	
	
}


function postToIkariam() { 

	IKCRC_REPORT.info.forumserver = $("div#GF_toolbar li.forum a").attr("href")
	var adress = Languague_forums[LANG];
	window.open(IKCRC_REPORT.info.forumserver + '/index.php?form=ThreadAdd&boardID=' + adress[world]);

}

var total_lost = 0;
var attackers_string = '';
var deffenders_string = '';
var detailed_report_url1 = document.body.innerHTML.split('<a href="?view=militaryAdvisorDetailedReportView');
var detailed_report_url2 = detailed_report_url1[1].split('" class="button">');
var detailed_report_url3 = 'http://' + server + '/index.php?view=militaryAdvisorDetailedReportView' + detailed_report_url2[0];
var detailed_report_url = detailed_report_url3.replace(/&amp;/g,'&');


		GM_xmlhttpRequest({
        method: "GET",
        url: detailed_report_url,
        headers:{'Content-type':'application/x-www-form-urlencoded'},
        onload: function(xhr) { 
		
if (/<li class="roundNo">Batalla /.test(xhr.responseText)){ 	
	var no_rounds = xhr.responseText.split('<li class="roundNo">Batalla ');
var no_rounds2 = no_rounds[1].split('</li>');
var no_rounds3 = no_rounds2[0].split(' / ');
var no_rounds4 = no_rounds3[1];
if(GM_getValue('CRAC_showrounds')==2) {
		battle_duration(no_rounds4);
}
}
	if (/<div id="fieldAttacker">/.test(xhr.responseText)){ 	
		var bf_size1 = xhr.responseText.split('<div id="fieldAttacker">');
var bf_size2 = bf_size1[1].split('<div id="resDefender">');
var bf_size3 = bf_size2[0].split('<li>');
var bf_size4 = bf_size3.length;

if(bf_size4>22&&bf_size4<28) { var bf_size=3; }
if(bf_size4>16&&bf_size4<21) { var bf_size=2; }
if(bf_size4>7&&bf_size4<15) { var bf_size=1; }

if(GM_getValue('CRAC_bfsize')==2) {
	battle_size(bf_size);
}
	}
	if (/Nivel de muro: /.test(xhr.responseText)){ 	
		var wall_lvl1 = xhr.responseText.split('Nivel de muro: ');
var wall_lvl2 = wall_lvl1[1].split('</p>');
var wall_lvl = wall_lvl2[0];
if(GM_getValue('CRAC_showwall')==2) {
show_wall(wall_lvl);
}
	}


		}
    });
function battle_duration(rounds) {
	if(rounds==1) {
		document.getElementById('copytext').innerHTML = document.getElementById('copytext').innerHTML.replace('[/i]&lt;br/&gt;&lt;br/&gt;[size=14][b]Resumen de tropas[/b]',' tras una única ronda de combate[/i]&lt;br/&gt;&lt;br/&gt; [size=14][b]Resumen de tropas[/b]');
	document.getElementById('copytext').innerHTML = document.getElementById('copytext').innerHTML.replace('[/i]&lt;br/&gt;&lt;br/&gt;[size=14][b]Resumen de tropas[/b]',' tras una única ronda de combate[/i]&lt;br/&gt;&lt;br/&gt; [size=14][b]Resumen de tropas[/b]');
	} else {
	document.getElementById('copytext').innerHTML = document.getElementById('copytext').innerHTML.replace('[/i]&lt;br/&gt;&lt;br/&gt;[size=14][b]Resumen de tropas[/b]',' tras ' + rounds + ' rondas de duro combate[/i]&lt;br/&gt;&lt;br/&gt; [size=14][b]Resumen de tropas[/b]');
	document.getElementById('copytext').innerHTML = document.getElementById('copytext').innerHTML.replace('[/i]&lt;br/&gt;&lt;br/&gt;[size=14][b]Resumen de tropas[/b]',' tras ' + rounds + ' rondas de duro combate[/i]&lt;br/&gt;&lt;br/&gt; [size=14][b]Resumen de tropas[/b]');
	}
		
}

function battle_size(bf_size) {
	if(GM_getValue('CRAC_showrounds')==2) {
		if(bf_size==1) {
		document.getElementById('copytext').innerHTML = document.getElementById('copytext').innerHTML.replace('[/i]&lt;br/&gt;&lt;br/&gt; [size=14][b]Resumen de tropas[/b]',' en un pequeño campo de batalla[/i]&lt;br/&gt;&lt;br/&gt;[size=14][b]Resumen de tropas[/b]');
	document.getElementById('copytext').innerHTML = document.getElementById('copytext').innerHTML.replace('[[/i]&lt;br/&gt;&lt;br/&gt; [size=14][b]Resumen de tropas[/b]',' en un pequeño campo de batalla[/i]&lt;br/&gt;&lt;br/&gt;[size=14][b]Resumen de tropas[/b]');
	} else if(bf_size==2) {
	document.getElementById('copytext').innerHTML = document.getElementById('copytext').innerHTML.replace('[/i]&lt;br/&gt;&lt;br/&gt; [size=14][b]Resumen de tropas[/b]',' en un campo de batalla mediano[/i]&lt;br/&gt;&lt;br/&gt;[size=14][b]Resumen de tropas[/b]');
	document.getElementById('copytext').innerHTML = document.getElementById('copytext').innerHTML.replace('[/i]&lt;br/&gt;&lt;br/&gt; [size=14][b]Resumen de tropas[/b]',' en un campo de batalla mediano[/i]&lt;br/&gt;&lt;br/&gt; [size=14][b]Resumen de tropas[/b]');
	} else if (bf_size==3) {
		document.getElementById('copytext').innerHTML = document.getElementById('copytext').innerHTML.replace('[/i]&lt;br/&gt;&lt;br/&gt; [size=14][b]Resumen de tropas[/b]',' en un gran campo de batalla[/i]&lt;br/&gt;&lt;br/&gt; [size=14][b]Resumen de tropas[/b]');
	document.getElementById('copytext').innerHTML = document.getElementById('copytext').innerHTML.replace('[/i]&lt;br/&gt;&lt;br/&gt; [size=14][b]Resumen de tropas[/b]',' en un gran campo de batalla[/i]&lt;br/&gt;&lt;br/&gt; [size=14][b]Resumen de tropas[/b]');	
	} 
	} else {
		if(bf_size==1) {
		document.getElementById('copytext').innerHTML = document.getElementById('copytext').innerHTML.replace('[/i]&lt;br/&gt;&lt;br/&gt;[size=14][b]Resumen de tropas[/b]',' en un pequeño campo de batalla[/i]&lt;br/&gt;&lt;br/&gt; [size=14][b]Resumen de tropas[/b]');
	document.getElementById('copytext').innerHTML = document.getElementById('copytext').innerHTML.replace('[/i]&lt;br/&gt;&lt;br/&gt;[size=14][b]Resumen de tropas[/b]',' en un pequeño campo de batalla[/i]&lt;br/&gt;&lt;br/&gt; [size=14][b]Resumen de tropas[/b]');
	} else if(bf_size==2) {
	document.getElementById('copytext').innerHTML = document.getElementById('copytext').innerHTML.replace('[/i]&lt;br/&gt;&lt;br/&gt;[size=14][b]Resumen de tropas[/b]',' en un campo de batalla mediano[/i]&lt;br/&gt;&lt;br/&gt; [size=14][b]Resumen de tropas[/b]');
	document.getElementById('copytext').innerHTML = document.getElementById('copytext').innerHTML.replace('[/i]&lt;br/&gt;&lt;br/&gt;[size=14][b]Resumen de tropas[/b]',' en un campo de batalla mediano[/i]&lt;br/&gt;&lt;br/&gt; [size=14][b]Resumen de tropas[/b]');
	} else if (bf_size==3) {
		document.getElementById('copytext').innerHTML = document.getElementById('copytext').innerHTML.replace('[/i]&lt;br/&gt;&lt;br/&gt;[size=14][b]Resumen de tropas[/b]',' en un gran campo de batalla[/i]&lt;br/&gt;&lt;br/&gt; [size=14][b]Resumen de tropas[/b]');
	document.getElementById('copytext').innerHTML = document.getElementById('copytext').innerHTML.replace('[/i]&lt;br/&gt;&lt;br/&gt;[size=14][b]Resumen de tropas[/b]',' en un gran campo de batalla[/i]&lt;br/&gt;&lt;br/&gt; [size=14][b]Resumen de tropas[/b]');	
	} 	
		
	}
}

function show_wall(level) {
	
	if(GM_getValue('CRAC_wordunits')==2) { 
		document.getElementById('copytext').innerHTML = document.getElementById('copytext').innerHTML.replace('&lt;br/&gt;&lt;br/&gt;[size=14][b]Resultado de la batalla[/b]','[img]http://img213.imageshack.us/img213/9217/wallcrac.png[/img] [b]Muralla - [/b]Nivel: [b][size=12]' + level +'[/size][/b]&lt;br/&gt; &lt;br/&gt;[size=14][b]Resultado de la batalla[/b]');
		document.getElementById('copytext').innerHTML = document.getElementById('copytext').innerHTML.replace('&lt;br/&gt;&lt;br/&gt;[size=14][b]Resultado de la batalla[/b]','[img]http://img213.imageshack.us/img213/9217/wallcrac.png[/img] [b]Muralla - [/b]Nivel: [b][size=12]' + level +'[/size][/b]&lt;br/&gt; &lt;br/&gt;[size=14][b]Resultado de la batalla[/b]');
	} else {
		document.getElementById('copytext').innerHTML = document.getElementById('copytext').innerHTML.replace('&lt;br/&gt;&lt;br/&gt;[size=14][b]Resultado de la batalla[/b]','[img]http://img213.imageshack.us/img213/9217/wallcrac.png[/img] Muralla: [b][size=12]' + level +'[/size][/b]&lt;br/&gt; &lt;br/&gt;[size=14][b]Resultado de la batalla[/b]');
		document.getElementById('copytext').innerHTML = document.getElementById('copytext').innerHTML.replace('&lt;br/&gt;&lt;br/&gt;[size=14][b]Resultado de la batalla[/b]','[img]http://img213.imageshack.us/img213/9217/wallcrac.png[/img] Muralla: [b][size=12]' + level +'[/size][/b]&lt;br/&gt; &lt;br/&gt;[size=14][b]Resultado de la batalla[/b]');	
	}
	
}



function BuildStandardReport() {
	
	report = '[i]';
	var time = IKCRC_REPORT.info.time.split(" ");
	var place2 = IKCRC_REPORT.info.place.split("Batalla ");
	if (/en /.test(place2[1])){
		place2[1] = place2[1].replace(/en /g,"");
	}
	var place = '';

			if(ffnew==1) {
				place = place2[1].trim(); } 
			else {
				place = place2[1];
				place = place.replace(/^\s*|\s*$/g,"");
				}
		
		
	report += 'Batalla terrestre ';
	report += 'finalizada el ' +  time[0];
	if(GM_getValue('hour')==2)  { report +=  ' a las ' +  time[1]; }
	if(GM_getValue('city')==2) { report += ' en la ciudad de ' + place; }
	report +=  '[/i]<br/>' + '<br/>';
	report +='[size=14][b]Resumen de tropas[/b][/size]' + '<br/>' + '<br/>';
	
	var full_whoattack = IKCRC_REPORT.info.attackers;
	var full_whodeffend = IKCRC_REPORT.info.defenders;
	var full_whoattack2 = full_whoattack.split(',');
	var full_whodeffend2 = full_whodeffend.split(',');
	var attackers = new Array();
	for(i=0;i<full_whoattack2.length;i++) {
		var full_whoattack3 = full_whoattack2[i].split(' de ');
		if(full_whoattack3.length>1) {
		var full_whoattack4 = full_whoattack3[0];
	
			if(ffnew==1) {
				attackers[i] = full_whoattack4.trim(); } 
			else {
				full_whoattack4 = full_whoattack4.replace(/^\s*|\s*$/g,"");
				attackers[i] = full_whoattack4;
			}
		
		
		}
	}
	var deffenders = new Array();
	for(i=0;i<full_whodeffend2.length;i++) {
		var full_whodeffend3 = full_whodeffend2[i].split(' de ');
		if(full_whodeffend3.length>1) {
		var full_whodeffend4 = full_whodeffend3[0];
		
			if(ffnew==1) {
				deffenders[i] = full_whodeffend4.trim(); } 
			else {
				full_whodeffend4 = full_whodeffend4.replace(/^\s*|\s*$/g,"");
				deffenders[i] = full_whodeffend4;
			}
		
		}
	}
	
attackers_string = '';
deffenders_string = '';	
for(i=0;i<attackers.length;i++) {
	if(attackers[i]!= null) {
	attackers_string += attackers[i];
	if(i<attackers.length-2) {
	 attackers_string += ', ';
	} 
	if(i==attackers.length-2) {
	 attackers_string += ' y ';
	}
	}
}


for(i=0;i<deffenders.length;i++) {
	if(deffenders[i]!= null) {
	deffenders_string += deffenders[i];
	if(i<deffenders.length-2) {
	 deffenders_string += ', ';
	} 
	if(i==deffenders.length-2) {
	 deffenders_string += ' y ';
	}
	}
}



	

var winner2 = IKCRC_REPORT.battle.victors.replace(/Ganador: /g,'');
var winner3 = winner2.split(',');
var winner = winner3[0];


			if(ffnew==1) {
				winner = winner.trim(); } 
			else {
				winner = winner.replace(/^\s*|\s*$/g,"");
			}

if(/Las siguientes materias primas han sido robadas/.test(document.getElementById('mainview').innerHTML)) {
var loot = document.getElementById('mainview').innerHTML.split('Las siguientes materias primas han sido robadas:');
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
} else { var is_loot = 0; }

var winner_attacker = 2;
	for(i=0;i<attackers.length;i++) {
		if((attackers[i]==winner)&&attackers[i]!=null) {
			winner_attacker = 1;
		}
	}
	
		for(i=0;i<deffenders.length;i++) {
		if((deffenders[i]==winner)&&deffenders[i]!=null) {
			winner_attacker = 0;
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

var allUnitCosts = IKCRC_REPORT.info.type == "army"
			? [ 20, 60, 70, 55,  200, 125, 310, 290, 220, 560, 1550, 500, 200, 30, 0]
			: [ 270, 340, 310, 320, 1800, 1120, 910 ];
var allUnitWood = IKCRC_REPORT.info.type == "army"
			? [ 20, 30, 40, 30,  50, 25, 130, 40, 220, 260, 300, 50, 50, 30, 0]
			: [ 220, 180, 80, 180, 300, 220, 160 ];
var allUnitSulphur = IKCRC_REPORT.info.type == "army"
			? [ 0, 30, 30, 25,  150, 100, 180, 250, 0, 300, 1250, 0, 0, 0, 0]
			: [ 50, 160, 230, 140, 1500, 900, 0 ];
var allUnitCrystal = IKCRC_REPORT.info.type == "army"
			? [ 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 450, 0, 0, 0]
			: [ 0, 0, 0, 0, 0, 0, 750 ];
var allUnitWine = IKCRC_REPORT.info.type == "army"
			? [ 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 150, 0, 0]
			: [ 0, 0, 0, 0, 0, 0, 0 ];
var allUnitCitizen = IKCRC_REPORT.info.type == "army"
			? [ 1, 1, 1, 1,  1, 3, 2, 5, 5, 5, 5, 1, 1, 1, 0]
			: [ 5, 6, 4, 5, 2, 5, 6 ];
		var allUnits = IKCRC_REPORT.info.type == "army"
			? ["slinger", "swordsman", "phalanx", "archer", "marksman", "gyrocopter", "steam giant", "bombardier", "ram", 
			   "catapult", "mortar", "doctor", "cook", "spearmen", "barbarian"]
			: ["ram", "ballista", "flame", "catapult", "paddle", "mortar", "diving"];
		var UNIT = IKCRC_REPORT.info.type == "army" ? L_UNITS : L_SHIPS;
		var troop_position = new Array ("Hondero", "Espadachín", "Hoplita", "Arquero", "Fusilero", "Girocóptero", "Gigante a vapor", "Bombardero", "Ariete", "Catapulta", "Mortero", "Médico", "Cocinero", "Lancero", "Barco-espolón", "Barco-ballesta", "Barco-lanza llamas", "Barco-catapulta", "Barco-espolón a vapor", "Barco-mortero", "Submarino");
		var name_english = new Array("slinger","swordsman","phalanx","archer","marksman","gyrocopter","steamgiant","bombardier","ram","catapult","mortar","medic","cook","spearman","ram","ballista","flamethrower","catapult","steamboat","mortar","submarine");
	
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
			var attacker = IKCRC_REPORT.battle.attackers[allUnits[unit]]; 
			var defender = IKCRC_REPORT.battle.defenders[allUnits[unit]];
			
				if (attacker != null) {
					for(i=0;i<troop_position.length;i++) { if(unitName==troop_position[i]) { pos = i}}
					report += '[img]http://'+server+'/skin/characters/'
					if(pos>=14) { report += 'fleet/40x40/ship_';
					is_maritim=1;
					report = report.replace(/terrestre/,'marítima');
					if(GM_getValue('city')==2) { report = report.replace(/la ciudad de marítima frente a /,'el puerto de '); }
					} else { report += 'military/x40_y40/y40_'; }
					report += name_english[pos];
					if(pos>=14) { report += '_l_40x40.gif'; } else { report += '_faceright.gif'; }
					report += '[/img] ';
					if(GM_getValue('CRAC_wordunits')==2) { 
					report += '[b]';
					}
					report +=  unitName;
						if(GM_getValue('CRAC_wordunits')==2) { 
					report += ' - [/b]Unidades: ';
					} else { report += ': '; }
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
	report += '<br/>';
	report += '<br/>';
		report +=  '[color=#660000][b][i]DEFENSOR';
		
		if(deffenders.length>1) { report += 'ES'; }
		
		report += '[/i][/b][/color]';
	report += '<br/>';
	report += '[b][size=14][color=green]';
	report += deffenders_string;
	report += '[/color][/size][/b]';
	report += '<br/>';
	report += '<br/>';
	
	for (var unit = 0; unit < allUnits.length; unit++) {
		var unitName = UNIT[allUnits[unit]]; 
		if (unitName != null) {
			var attacker = IKCRC_REPORT.battle.attackers[allUnits[unit]]; 
			var defender = IKCRC_REPORT.battle.defenders[allUnits[unit]];
						
				if (defender != null) {
					for(i=0;i<troop_position.length;i++) { if(unitName==troop_position[i]) { pos = i}}
					report += '[img]http://'+server+'/skin/characters/'
					if(pos>=14) { report += 'fleet/40x40/ship_'; } else { report += 'military/x40_y40/y40_'; }
					report += name_english[pos];
					if(pos>=14) { report += '_l_40x40.gif'; } else { report += '_faceright.gif'; }
					report += '[/img] ';
					if(GM_getValue('CRAC_wordunits')==2) { 
					report += '[b]'
					}
					report +=  unitName;
					if(GM_getValue('CRAC_wordunits')==2) { 
					report += ' - [/b]Unidades: ';
					} else { report += ': '; }
					
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


	var results = '<br/>';
	results += '<br/>';
	results += '[size=14][b]Resultado de la batalla[/b][/size]'
results += '<br/>';
results += '<br/>';
results +='[size=12][b]';

if(winner_attacker==1) { if(attackers.length>1) {results += 'Vencedores';  } else { results += 'Vencedor';}  } else if(winner_attacker==0) {  if(deffenders.length>1) { results += 'Vencedores'; } else {results += 'Vencedor'; }  } else { results += 'Resultado'; }

results += '[/b][/size]';
results += '<br/>';
results += '[i][color=';

if(winner_attacker==1) { results += 'red'; } else if(winner_attacker==0) { results += 'green'; } else { results += 'darkblue'; }
				
results +='][size=18]';
var still_process = /Batalla aun en proceso/;

if(winner_attacker==1) { results += attackers_string; } else if(winner_attacker==0) { results += deffenders_string; } else { if(still_process.test(document.getElementById('mainview').innerHTML)) { results += 'Batalla aún en proceso'; } else { results += 'Empate' } }

results += '[/size][/color][/i]';
results += '<br/>';
results += '<br/>';

results += '[size=12][b]Puntos de GENERALES perdidos y totales[/b][/size]';
results += '<br/>';

var losses_ratio = (Math.round((defendersLosses/attackersLosses)*100))/100;
var ratio_defender = 0;
if(losses_ratio < 1) { losses_ratio = (Math.round((attackersLosses/defendersLosses)*100))/100; ratio_defender = 1; }
if(losses_ratio == 1) {  ratio_defender = 2; }

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
	if(deffenders.length>1) {results += 'es'; }
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
		if(ratio_defender==0) { results += 'red'; }	else if(ratio_defender==1) { results += 'green'; } else { results += 'darkblue'; }
	results += '][size=18][b]';
	if(ratio_defender==1) { results += losses_ratio; } else { results += '1'; }
	results += ':';
	if(ratio_defender==0) { results += losses_ratio; } else { results += '1'; }
	results += '[/b][/size][/color] [i]';
	if(ratio_defender!=2) { results += 'a favor de'; } else { results += 'acabando en un empate absoluto'; }
	if(ratio_defender==0) { if(attackers.length>1) { results +=' los atacantes'; } else { results += 'l atacante'; } } 
	if(ratio_defender==1) { if(deffenders.length>1) { results +=' los defensores'; } else { results += 'l defensor'; } }
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
	if(attackers.length>1) {results += 's'; }
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
	if(deffenders.length>1) {results += 'es'; }
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
	if(attackers.length>1) {results += 's'; }
	results +=	':[/i] [img]http://' + server + '/skin/resources/icon_wood.gif[/img]  ';
	results += addCommas(loot_wood3);
	 results += '   [img]http://' + server + '/skin/resources/icon_sulfur.gif[/img]  ';
	 results += addCommas(loot_sulphur3);
	 results += '   [img]http://' + server + '/skin/resources/icon_glass.gif[/img] ';
	 results += addCommas(loot_crystal3);
	 results += '   [img]http://' + server + '/skin/resources/icon_wine.gif[/img] ';
	 results += addCommas(loot_wine3);
	 results += '   [img]http://' + server + '/skin/resources/icon_marble.gif[/img] ';
	 results += addCommas(loot_marble3);
	 results += '<br/>';
	 results += '<br/>';
	
	}
	
	
	
	results += '[size=12][b]Recursos y burgueses perdidos[/b][/size]';
	results += '<br/>';
	results += '[i]Atacante';
	if(attackers.length>1) {results += 's'; }
	results +=	':[/i] [img]http://' + server + '/skin/resources/icon_wood.gif[/img]  ';
	results += addCommas(attackerwood);
	 results += '   [img]http://' + server + '/skin/resources/icon_sulfur.gif[/img]  ';
	 results += addCommas(attackersulphur);
	 results += '   [img]http://' + server + '/skin/resources/icon_glass.gif[/img] ';
	 results += addCommas(attackercrystal);
	 results += '   [img]http://' + server + '/skin/resources/icon_wine.gif[/img] ';
	 results += addCommas(attackerwine);
	 results +='   [img]http://' + server + '/skin/resources/icon_citizen.gif[/img] ';
	 results += addCommas(attackercitizens);
	 results += '<br/>';
results += '[i]Defensor';
if(deffenders.length>1) {results += 'es'; }
	results += ':[/i] [img]http://' + server + '/skin/resources/icon_wood.gif[/img]  ';
	results += addCommas(defenderwood);
	 results += '   [img]http://' + server + '/skin/resources/icon_sulfur.gif[/img]  ';
	 results += addCommas(defendersulphur);
	 results += '  [img]http://' + server + '/skin/resources/icon_glass.gif[/img] ';
	 results += addCommas(defendercrystal);
	 results += '  [img]http://' + server + '/skin/resources/icon_wine.gif[/img] ';
	 results += addCommas(defenderwine);
	 results +='  [img]http://' + server + '/skin/resources/icon_citizen.gif[/img] ';
	 results += addCommas(defendercitizens);
	 results += '<br/>';

	report += results;

		
	report += '<br/>[b][i]Compactado con: [url=http://board.ve.ikariam.com/index.php?page=Thread&threadID=24430]Combat Report Auto-Converter[/url] v' + VERSION + ' © by [url=http://board.ikariam.es/index.php?page=User&userID=47984]WTF[/url], Modificado por [url=http://board.ve.ikariam.com/index.php?page=User&userID=6243]Madacol[/url][/i][/b]';


return report;
}


function AddUnit(list, unit, details) {
		if (details.indexOf("(") != -1) {
		if (list[unit] == null || list[unit] == undefined) { list[unit] = { left: 0, lost: 0 } }
		list[unit].left += parseInt(details.substr(0, details.indexOf('(')).replace(/\s+/, ''));
		list[unit].lost += parseInt(details.substr(details.indexOf('-') + 1).replace(/\s+/, '').replace(/\)/, ''));
	}
	
}

function BuildReport() {
	var report = '', 		
	report = BuildStandardReport();

		
var final_text = report;
var final_subject = attackers_string + ' vs ' + deffenders_string + ' (' + addCommas(Math.round(total_lost)) + ' ptos)';

if(GM_getValue('background')=='Dark') {
final_text = final_text.replace(/color=darkblue/g,'color=#4080FF');
final_text = final_text.replace(/color=red/g,'color=#FF4040');
final_text = final_text.replace(/color=green/g,'color=#00BF40');
final_text = final_text.replace(/color=#660000/g,'color=#FFBF80');
}
if(GM_getValue('forumclass')=='SMF') {
final_text = final_text.replace(/size=8/g,'size=8pt');
final_text = final_text.replace(/size=12/g,'size=12pt');
final_text = final_text.replace(/size=14/g,'size=14pt');
final_text = final_text.replace(/size=16/g,'size=16pt');
final_text = final_text.replace(/size=18/g,'size=18pt');
}
if(GM_getValue('forumclass')=='Burning') {
final_text = final_text.replace(/size=16/g,'size=14');
}
if(GM_getValue('forumclass')=='phpBB3') {
final_text = final_text.replace(/size=8/g,'size=80');
final_text = final_text.replace(/size=12/g,'size=120');
final_text = final_text.replace(/size=14/g,'size=140');
final_text = final_text.replace(/size=16/g,'size=160');
final_text = final_text.replace(/size=18/g,'size=180');
}
if(GM_getValue('forumclass')=='vBulletin') {
final_text = final_text.replace(/size=8/g,'size=1');
final_text = final_text.replace(/size=12/g,'size=3');
final_text = final_text.replace(/size=14/g,'size=4');
final_text = final_text.replace(/size=16/g,'size=5');
final_text = final_text.replace(/size=18/g,'size=6');
}
if(GM_getValue('forumclass')=='phpBB2') {
final_text = final_text.replace(/size=18/g,'size=20');
final_text = final_text.replace(/size=16/g,'size=18');
final_text = final_text.replace(/size=14/g,'size=16');
final_text = final_text.replace(/size=12/g,'size=14');
final_text = final_text.replace(/size=8/g,'size=10');
}
if(GM_getValue('forumclass')=='plain') {
	final_text = final_text.replace('[img]http://'+server+'/skin/resources/icon_wood.gif[/img]','Madera:');
	final_text = final_text.replace('[img]http://'+server+'/skin/resources/icon_wine.gif[/img]','Vino:');
	final_text = final_text.replace('[img]http://'+server+'/skin/resources/icon_glass.gif[/img]','Cristal:');
	final_text = final_text.replace('[img]http://'+server+'/skin/resources/icon_sulfur.gif[/img]','Azufre:');
	final_text = final_text.replace('[img]http://'+server+'/skin/resources/icon_citizen.gif[/img]','Burgueses:');
	final_text = final_text.replace('[img]http://'+server+'/skin/resources/icon_wood.gif[/img]','Madera:');
	final_text = final_text.replace('[img]http://'+server+'/skin/resources/icon_wine.gif[/img]','Vino:');
	final_text = final_text.replace('[img]http://'+server+'/skin/resources/icon_glass.gif[/img]','Cristal:');
	final_text = final_text.replace('[img]http://'+server+'/skin/resources/icon_sulfur.gif[/img]','Azufre:');
	final_text = final_text.replace('[img]http://'+server+'/skin/resources/icon_citizen.gif[/img]','Burgueses:');
	final_text = final_text.replace('[b][i]Compactado con: [url=http://board.ve.ikariam.com/index.php?page=Thread&threadID=24430]Combat Report Auto-Converter[/url] v1.1 © by [url=http://board.ikariam.es/index.php?page=User&userID=47984]WTF[/url][/i][/b]','Compactado con: Combat Report Auto-Converter v1.1 © by WTF');
final_text = final_text.replace(/\[img\](.*?)\[\/img\]/g,'');

final_text = final_text.replace(/\[.*?\]/g,'');
}
if(GM_getValue('forumclass')!='phpBB2') {
	final_text = final_text.replace(/size=10/g,'size=16');
}
final_text = final_text.replace(/&/g,'[ANDERSAN]');
final_text = final_text.replace(/%/g,'[PERCENT]');

function ChangeCollapse() { 

if(GM_getValue('CRAC_iscollapsed')==2) {
	
	document.getElementById('CRAC_Collapse').innerHTML = '▲';
	 GM_setValue('CRAC_iscollapsed',1);
	 document.getElementById('CRAC_config_content').style.display = 'block'; 
} else {
	
	document.getElementById('CRAC_Collapse').innerHTML = '▼';
	 GM_setValue('CRAC_iscollapsed',2);
	document.getElementById('CRAC_config_content').style.display = 'none'; 
}
}

function SetValues() {

for(i=1;i<=6;i++){
	if(document.getElementById("forumclass"+i).checked){
var forumclass_value = document.getElementById("forumclass"+i).value; }
}
GM_setValue('forumclass',forumclass_value);
for(i=1;i<=2;i++){
	if(document.getElementById("background"+i).checked){
var background_value = document.getElementById("background"+i).value; }
}
GM_setValue('background',background_value);
if(document.getElementById("hour").checked){
	GM_setValue('hour',2);
} else { GM_setValue('hour',1); }

if(document.getElementById("city").checked){
	GM_setValue('city',2);
} else { GM_setValue('city',1); }

if(document.getElementById("CRAC_troops").checked){
	GM_setValue('CRAC_troops',2);
} else { GM_setValue('CRAC_troops',1); }

if(document.getElementById("CRAC_ratio").checked){
	GM_setValue('CRAC_ratio',2);
} else { GM_setValue('CRAC_ratio',1); }


if(document.getElementById("CRAC_troops_percent").checked){
	GM_setValue('CRAC_troops_percent',2);
} else { GM_setValue('CRAC_troops_percent',1); }

if(document.getElementById("CRAC_percent").checked){
	GM_setValue('CRAC_percent',2);
} else { GM_setValue('CRAC_percent',1); }

if(document.getElementById("CRAC_loot").checked){
	GM_setValue('CRAC_loot',2);
} else { GM_setValue('CRAC_loot',1); }

if(document.getElementById("CRAC_off_points").checked){
	GM_setValue('CRAC_off_points',2);
} else { GM_setValue('CRAC_off_points',1); }

if(document.getElementById("CRAC_wordunits").checked){
	GM_setValue('CRAC_wordunits',2);
} else { GM_setValue('CRAC_wordunits',1); }

if(document.getElementById("CRAC_showwall").checked){
	GM_setValue('CRAC_showwall',2);
} else { GM_setValue('CRAC_showwall',1); }

if(document.getElementById("CRAC_showrounds").checked){
	GM_setValue('CRAC_showrounds',2);
} else { GM_setValue('CRAC_showrounds',1); }

if(document.getElementById("CRAC_bfsize").checked){
	GM_setValue('CRAC_bfsize',2);
} else { GM_setValue('CRAC_bfsize',1); }


	location.reload();
}

var limit = 1000;  

document.getElementById('mainview').innerHTML = document.getElementById('mainview').innerHTML.replace(/Resultado de la batalla<\/h5>/,'Resultado de la batalla: '+ addCommas(total_lost)+' puntos de generales perdidos</h5>');

var new_mainview =  '<div class="footer"></div></div><div class="contentBox01h"><h3 class="header"><a href="http://board.ikariam.es/index.php?page=Thread&threadID=129508" target="_blank">Combat Report Auto-Converter</a> v' + VERSION + ' © by <a href="http://board.ikariam.es/index.php?page=User&userID=47984" target="_blank">WTF</a>, Modificado por <a href="http://board.ve.ikariam.com/index.php?page=User&userID=6243" target="_blank">Madacol</a></b></h3><div class="content"><table style="border:none;"><tr><td style="border:none; height:8px;"></td></tr><tr><td style="vertical-align:middle; text-align:center; border:none;">Doble click sobre la parte que quieras y ya estará copiada en tu portapapeles! (luego pegala con CTRL+V)';

var battle_is_full = document.getElementById('mainview').innerHTML.split('combatRound=');
var battle_is_full2 = battle_is_full[1].split('&amp;');
var battle_is_full3 = battle_is_full2[0];

if(battle_is_full3!=1) {
	new_mainview += '<br/><br/><b>ATENCION: No has estado en esta batalla desde el principio, el reporte no mostrará todas las pérdidas!!</b>';
}

new_mainview += '</td></tr><tr style="border:none;"><td style="border:none;"><table style="border:none;"><tr style="border:none;"><td style="width:20px; border:none;"></td><td style="vertical-align:middle; border:none;"><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="121" height="27" id="copysubject">  <param name="movie" value="http://rafaelrivas.webcindario.com/cosassubidas/copysubject.swf?textocopy=' + final_subject + '"><param name="quality" value="high"><param name="wmode" value="transparent"><param name="swfversion" value="6.0.65.0"><!-- La siguiente etiqueta object es para navegadores distintos de IE. Ocúltela a IE mediante IECC. --><!--[if !IE]>--><object type="application/x-shockwave-flash" data="http://rafaelrivas.webcindario.com/cosassubidas/copysubject.swf?textocopy=' + final_subject + '" width="121" height="27"><!--<![endif]--><param name="quality" value="high"><param name="wmode" value="transparent"><!--[if !IE]>--></object><!--<![endif]--></object></td><td style="width:20px; border:none;"></td><td style="vertical-align:middle; border:none;" id="copytext_td"><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="205" height="27" id="copytext">  <param name="movie" value="http://rafaelrivas.webcindario.com/cosassubidas/copytext.swf?textocopy=' + final_text + '"><param name="quality" value="high"><param name="wmode" value="transparent"><param name="swfversion" value="6.0.65.0"><!-- La siguiente etiqueta object es para navegadores distintos de IE. Ocúltela a IE mediante IECC. --><!--[if !IE]>--><object type="application/x-shockwave-flash" data="http://rafaelrivas.webcindario.com/cosassubidas/copytext.swf?textocopy=' + final_text + '" width="205" height="27"><!--<![endif]--><param name="quality" value="high"><param name="wmode" value="transparent"><!--[if !IE]>--></object><!--<![endif]--></object></td><td style="width:20px; border:none;"></td><td style="vertical-align:middle; border:none;">';

if(battle_is_full3==1) {
if(parseInt(total_lost)<limit) {
	total_lost = Math.round(total_lost);
	
	new_mainview += '<button class="button" id="CRAC_postToForum"">Batalla no posteable ('+total_lost+' gen.)</button>';
	
	} else {
		new_mainview += '<button class="button" id="CRAC_postToForum">Postear en el foro de Ikariam </button>';
		
}
} else {
	
	new_mainview += '<button class="button" id="CRAC_postToForum"">Batalla no posteable (incompleta)</button>';
	
}
new_mainview += '</td></tr></table></td></tr></table></div><div class="footer"></div></div>';
new_mainview += '<div class="contentBox01h"><h3 class="header"><div style="text-align:center; position:absolute; left:245px; ">Configuración CR Auto-Converter</div><div style="text-align:right; position:absolute; z-index:100; right:10px;"><a href="javascript:;" id="CRAC_Collapse" name="CRAC_Collapse">';

if(GM_getValue('CRAC_iscollapsed')==2) { new_mainview +='▼'; } else { new_mainview +='▲'; }

new_mainview +='</a></div></h3><div class="content"  id="CRAC_config_content"';

if(GM_getValue('CRAC_iscollapsed')==2) { new_mainview += 'style="display:none;"' }
new_mainview += '><table><tr><td style="border:none; text-align:center;"><form action="#" method="POST" name="CRAC_options" id="CRAC_options"><table><tr><td style="width:12px; border:none;"></td><td style="width:97px; border:none; text-align:left; border:none;"><b>Tipo de foro:</b></td><td style=" border:none;"><input type="radio" id="forumclass1" name="forumclass" value="Burning"> Burning Board (Foro Ikariam)</td><td style=" border:none;"><input type="radio" id="forumclass2" name="forumclass" value="phpBB3"> phpBB3</td><td style=" border:none;"><input type="radio" id="forumclass3" name="forumclass" value="phpBB2"> phpBB2</td><td style=" border:none;"><input type="radio" id="forumclass4" name="forumclass" value="SMF"> SMF</td><td style=" border:none;"><input type="radio" id="forumclass5" name="forumclass" value="vBulletin"> vBulletin</td><td style=" border:none;"><input type="radio" id="forumclass6" name="forumclass" value="plain"> Texto sin formato</td><td style="width:10px; border:none;"></td></tr></table><table><tr><td style="width:13px; border:none;"></td><td style="width:107px; border:none; text-align:left;"><b>Color de fondo:</b></td><td style="width:138px; border:none;"><input type="radio" id="background1" name="background" value="Light"> Claro (Foro Ikariam)</td><td style="width:76px; border:none;"><input type="radio" id="background2" name="background" value="Dark"> Oscuro</td><td style="width:380px; border:none;"></td></tr></table><table><tr><td style="width:15px; border:none;"></td><td style="width:105px; border:none; text-align:left;"><b>Otras opciones:</b></td><td style="width:138px; border:none;"><input type="checkbox" id="hour" name="hour"> Mostrar Hora</td><td style="width:200px; border:none;"><input type="checkbox" id="city" name="city"> Mostrar nombre ciudad</td><td style="width:390px; border:none;"><input type="checkbox" id="CRAC_troops" name="CRAC_troops"> Mostrar resumen de pérdidas de tropas </td></tr><tr><td colspan="2" style=" border:none;"></td><td colspan="3" style=" border:none;"><table><tr><td style="width:5px; border:none;"></td><td style=" border:none; width:280px;"><input type="checkbox" id="CRAC_troops_percent" name="CRAC_troops_percent"> Mostrar porcentajes perdidos de cada unidad </td><td style="width:2px; border:none;"></td><td style=" border:none;"><input type="checkbox" id="CRAC_percent" name="CRAC_percent"> Mostrar porcentajes en los resúmenes</td><td style="width:24px; border:none;"></td></tr></table><table><tr><td style="width:5px; border:none;"></td><td style=" width:280px; border:none;"><input type="checkbox" id="CRAC_off_points" name="CRAC_off_points"> Mostrar puntos ofensivos y defensivos</td><td style="width:55px; border:none;"></td><td style=" border:none;  width:195px;"><input type="checkbox" id="CRAC_loot" name="CRAC_loot"> Mostrar botín de guerra</td><td style="width:135px; border:none;"></td></tr></table><table><tr><td style="width:8px; border:none;"></td><td style=" border:none; width:200px;"><input type="checkbox" id="CRAC_wordunits" name="CRAC_wordunits"> Mostrar palabra "unidades" </td><td style="width:201px; border:none;"><input type="checkbox" id="CRAC_showwall" name="CRAC_showwall"> Mostrar nivel de la muralla </td><td style="width:202px; border:none;"><input type="checkbox" id="CRAC_showrounds" name="CRAC_showrounds"> Mostrar num. de rondas </td><td style="width:40px; border:none;"></td></tr></table><table><tr><td style="width:9px; border:none;"></td><td style=" border:none; width:250px;"><input type="checkbox" id="CRAC_bfsize" name="CRAC_bfsize"> Mostrar tamaño del campo de batalla </td><td style="width:20px; border:none;"> </td><td style="width:200px; border:none;"><input type="checkbox" id="CRAC_ratio" name="CRAC_ratio"> Mostrar relación de pérdidas </td><td style="width:145px; border:none;"> </td></tr></table></td></tr></table></form><button class="button" id="CRAC_save_settings">Click aquí si has modificado algo de la configuración</button></td></tr></table></div><div class="footer">';


var mainview = document.getElementById('mainview').innerHTML.replace(/<div class="footer">/,new_mainview);

	
var cadena_forumclass = 'name="forumclass" value="' + GM_getValue('forumclass') +'">';
var cadena_forumclass_checked = 'name="forumclass" checked="checked" value="' + GM_getValue('forumclass') +'">';

var cadena_background = 'name="background" value="' + GM_getValue('background') +'">';
var cadena_background_checked = 'name="background" checked="checked" value="' + GM_getValue('background') +'">';

if(GM_getValue('hour')==2) { 
var cadena_hour = 'id="hour" name="hour">';
var cadena_hour_checked = 'id="hour" checked="checked" name="hour">';
mainview = mainview.replace(cadena_hour,cadena_hour_checked);
}

if(GM_getValue('city')==2) { 
var cadena_city = 'id="city" name="city">';
var cadena_city_checked = 'id="city" checked="checked" name="city">';
mainview = mainview.replace(cadena_city,cadena_city_checked);
}

if(GM_getValue('CRAC_troops')==2) { 
var cadena_CRAC_troops = 'id="CRAC_troops" name="CRAC_troops">';
var cadena_CRAC_troops_checked = 'id="CRAC_troops" checked="checked" name="CRAC_troops">';
mainview = mainview.replace(cadena_CRAC_troops,cadena_CRAC_troops_checked);
}

if(GM_getValue('CRAC_ratio')==2) { 
var cadena_CRAC_ratio = 'id="CRAC_ratio" name="CRAC_ratio">';
var cadena_CRAC_ratio_checked = 'id="CRAC_ratio" checked="checked" name="CRAC_ratio">';
mainview = mainview.replace(cadena_CRAC_ratio,cadena_CRAC_ratio_checked);
}

if(GM_getValue('CRAC_troops_percent')==2) { 
var cadena_CRAC_troops_percent = 'id="CRAC_troops_percent" name="CRAC_troops_percent">';
var cadena_CRAC_troops_percent_checked = 'id="CRAC_troops_percent" checked="checked" name="CRAC_troops_percent">';
mainview = mainview.replace(cadena_CRAC_troops_percent,cadena_CRAC_troops_percent_checked);
}

if(GM_getValue('CRAC_loot')==2) { 
var cadena_CRAC_loot = 'id="CRAC_loot" name="CRAC_loot">';
var cadena_CRAC_loot_checked = 'id="CRAC_loot" checked="checked" name="CRAC_loot">';
mainview = mainview.replace(cadena_CRAC_loot,cadena_CRAC_loot_checked);
}

if(GM_getValue('CRAC_off_points')==2) { 
var cadena_CRAC_off_points = 'id="CRAC_off_points" name="CRAC_off_points">';
var cadena_CRAC_off_points_checked = 'id="CRAC_off_points" checked="checked" name="CRAC_off_points">';
mainview = mainview.replace(cadena_CRAC_off_points,cadena_CRAC_off_points_checked);
}

if(GM_getValue('CRAC_percent')==2) { 
var cadena_CRAC_percent = 'id="CRAC_percent" name="CRAC_percent">';
var cadena_CRAC_percent_checked = 'id="CRAC_percent" checked="checked" name="CRAC_percent">';
mainview = mainview.replace(cadena_CRAC_percent,cadena_CRAC_percent_checked);
}

if(GM_getValue('CRAC_wordunits')==2) { 
var cadena_CRAC_wordunits = 'id="CRAC_wordunits" name="CRAC_wordunits">';
var cadena_CRAC_wordunits_checked = 'id="CRAC_wordunits" checked="checked" name="CRAC_wordunits">';
mainview = mainview.replace(cadena_CRAC_wordunits,cadena_CRAC_wordunits_checked);
}

if(GM_getValue('CRAC_showwall')==2) { 
var cadena_CRAC_showwall = 'id="CRAC_showwall" name="CRAC_showwall">';
var cadena_CRAC_showwall_checked = 'id="CRAC_showwall" checked="checked" name="CRAC_showwall">';
mainview = mainview.replace(cadena_CRAC_showwall,cadena_CRAC_showwall_checked);
}

if(GM_getValue('CRAC_showrounds')==2) { 
var cadena_CRAC_showrounds = 'id="CRAC_showrounds" name="CRAC_showrounds">';
var cadena_CRAC_showrounds_checked = 'id="CRAC_showrounds" checked="checked" name="CRAC_showrounds">';
mainview = mainview.replace(cadena_CRAC_showrounds,cadena_CRAC_showrounds_checked);
}

if(GM_getValue('CRAC_bfsize')==2) { 
var cadena_CRAC_bfsize = 'id="CRAC_bfsize" name="CRAC_bfsize">';
var cadena_CRAC_bfsize_checked = 'id="CRAC_bfsize" checked="checked" name="CRAC_bfsize">';
mainview = mainview.replace(cadena_CRAC_bfsize,cadena_CRAC_bfsize_checked);
}

mainview = mainview.replace(cadena_forumclass,cadena_forumclass_checked);
mainview = mainview.replace(cadena_background,cadena_background_checked);


document.getElementById('mainview').innerHTML = mainview;
var addonclick = document.getElementById('CRAC_save_settings');
addonclick.addEventListener("click", SetValues, false);

var addonclick2 = document.getElementById('CRAC_Collapse');
addonclick2.addEventListener("click", ChangeCollapse, false);

if((parseInt(total_lost)>limit)&&(battle_is_full3==1)) {
var addonclick3 = document.getElementById('CRAC_postToForum');
addonclick3.addEventListener("click", postToIkariam, true);
}

}


function addCommas(nStr)
{
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