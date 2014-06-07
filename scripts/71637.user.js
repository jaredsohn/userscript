var meta = <><![CDATA[
// ==UserScript==
// @name          Travian Upgrade Advisor
// @namespace     TravianUpgradeAdvisor
// @description   Suggests how to increase the production efficiently
// @version       17
// @include       http://*.travian.*/dorf1.php*
// @include       http://*.travian.*/dorf2.php*
// @require       http://sizzlemctwizzle.com/updater.php?id=71637
// ==/UserScript==
]]></>.toString();

//DATABASE
var serverLanguages = {
//server : language mapping
	'us'  : 'en',
	'com' : 'en',
	'uk'  : 'en',
	'au'  : 'en',
	'in'  : 'en',

	'de'  : 'de',
	'at'  : 'de',
	'org' : 'de',

	'hu'  : 'hu',
	'pl'  : 'pl',
	'br'  : 'br',
	'lt'  : 'lt',
	'si'  : 'si',
	'sk'  : 'sk',
	'cz'  : 'cz',
	'ro'  : 'ro',
	'dk'  : 'dk',
	'it'  : 'it',
	'ae'  : 'ae',
	'se'  : 'se',
};

var language;
const defaultLanguage = 'en';

var dictionary = {
	'en' : {
		REFRESH : 'To update advices, visit Village Center'
		,ALLUPS : 'All upgrades'
		,BESTUPS : 'Best upgrades'
		,TITLE : 'This shows the upgrades with the lowest cost/production rate.'
		,COSTS : 'costs'
		,RESOURCE : 'res'
		,WOOD : 'Wood'
		,CLAY : 'Clay'
		,IRON : 'Iron'
		,CROP : 'Crop'
		,PRODUC : 'production'
		,SHOWDETA : 'Advisor show details'
		,HIDEDETA : 'Advisor hide details'
		,LEVEL : 'Level'

		,WOODCUTTER : 'Woodcutter'
		,CLAYPIT : 'Clay Pit'
		,IRONMINE : 'Iron Mine'
		,CROPLAND : 'Cropland'
		,GRAINMILL : 'Grain Mill'
		,BAKERY : 'Bakery'
		,SAWMILL : 'Sawmill'
		,BRICKYARD : 'Brickyard'
		,IRONFOUNDRY : 'Iron Foundry'
	},
	'hu' : {
		REFRESH : 'Javaslatok frissítéséhez látogasd meg a Faluközpontot'
		,ALLUPS : 'Összes fejlesztés'
		,BESTUPS : 'Legjobb fejlesztések'
		,TITLE : 'Ez mutatja a legalacsonyabb ár/termelés arányú fejlesztéseket.'
		,COSTS : 'ára'
		,RESOURCE : 'nyersi'
		,WOOD : 'Fa'
		,CLAY : 'Agyag'
		,IRON : 'Vas'
		,CROP : 'Búza'
		,PRODUC : 'termelés'
		,SHOWDETA : 'Advisor részletek megjelenítése'
		,HIDEDETA : 'Advisor részletek elrejtése'
		,LEVEL : 'Szint'

		,WOODCUTTER : 'Favágó'
		,CLAYPIT : 'Agyagbánya'
		,IRONMINE : 'Vasércbánya'
		,CROPLAND : 'Búzafarm'
		,GRAINMILL : 'Malom'
		,BAKERY : 'Pékség'
		,SAWMILL : 'Fűrészüzem'
		,BRICKYARD : 'Agyagégető'
		,IRONFOUNDRY : 'Vasöntöde'
	},
	'pl' : { //joszik
		REFRESH : 'Aby zaktualizować porady odwiedź Centrum osady'
		,ALLUPS : 'Wszystkie rozbudowy'
		,BESTUPS : 'Najlepsze rozbudowy'
		,TITLE : 'Pokazuje rozbudowę z najlepszym stosunkiem kosztów do produkcji.'
		,COSTS : 'koszty'
		,RESOURCE : 'surowce'
		,WOOD : 'Drewno'
		,CLAY : 'Glina'
		,IRON : 'Żelazo'
		,CROP : 'Zboże'
		,PRODUC : 'produkcja'
		,SHOWDETA : 'TU Advisor pokaż szczegóły'
		,HIDEDETA : 'TU Advisor ukryj szczegóły'
		,LEVEL : 'Poziom'

		,WOODCUTTER : 'Las'
		,CLAYPIT : 'Kopalnia gliny'
		,IRONMINE : 'Kopalnia żelaza'
		,CROPLAND : 'Pole zboża'
		,GRAINMILL : 'Młyn'
		,BAKERY : 'Piekarnia'
		,SAWMILL : 'Tartak'
		,BRICKYARD : 'Cegielnia'
		,IRONFOUNDRY : 'Huta stali'
	},
	'de' : { //joszik
		REFRESH : 'Für aktualisierung bitte Dorfzentrum besuchen'
		,ALLUPS : 'Alle Bauaufträge'
		,BESTUPS : 'Beste Bauaufträge'
		,TITLE : 'Dies zeigt die Upgrades mit den niedrigsten Kosten/Rohstoffsmenge'
		,COSTS : 'Kosten'
		,RESOURCE : 'Rohstoffe'
		,WOOD : 'Holz'
		,CLAY : 'Lehm'
		,IRON : 'Eisen'
		,CROP : 'Getreide'
		,PRODUC : 'Produktion'
		,SHOWDETA : 'TU Advisor zeige Details'
		,HIDEDETA : 'TU Advisor verstecke Details'
		,LEVEL : 'Stufe'

		,WOODCUTTER : 'Holzfäller'
		,CLAYPIT : 'Lehmgrube'
		,IRONMINE : 'Eisenmine'
		,CROPLAND : 'Getreidefarm'
		,GRAINMILL : 'Getreidemühle'
		,BAKERY : 'Bäckerei'
		,SAWMILL : 'Sägewerk'
		,BRICKYARD : 'Lehmbrennerei'
		,IRONFOUNDRY : 'Eisengießerei'
	},
	'br' : { //bokassa
		REFRESH : 'Para atualizar as dicas, vá ao Centro da Aldeia'  
		,ALLUPS : 'Todos os upgrades'  
		,BESTUPS : 'Melhores upgrades'  
		,TITLE : 'Aqui estão os upgrades com melhor razão custo/produção'  
		,COSTS : 'Custo'  
		,RESOURCE : 'recursos'  
		,WOOD : 'Madeira'  
		,CLAY : 'Barro'  
		,IRON : 'Ferro'  
		,CROP : 'Cereal'  
		,PRODUC : 'produção'  
		,SHOWDETA : 'Mostrar detalhes'  
		,HIDEDETA : 'Ocultar detalhes'  
		,LEVEL : 'Nível'

		,WOODCUTTER : 'Bosque'  
		,CLAYPIT : 'Poço de Barro'  
		,IRONMINE : 'Mina de Ferro'  
		,CROPLAND : 'Campo de Cereal'  
		,GRAINMILL : 'Moinho'  
		,BAKERY : 'Padaria'  
		,SAWMILL : 'Serraria'  
		,BRICKYARD : 'Alvenaria'  
		,IRONFOUNDRY : 'Fundição'  
	},
	'lt' : { //FDisk
		REFRESH : 'Kad atnaujinti patarimus aplankyk miesto centrą'
		,ALLUPS : 'Galima statyti'
		,BESTUPS : 'Geriausia statyti'
		,TITLE : 'Čia rodoma ką geriausia statyti - su mažiausiom resursų sąnaudom.'
		,COSTS : 'Sąnaudos'
		,RESOURCE : 'res'
		,WOOD : 'Mediena'
		,CLAY : 'Molis'
		,IRON : 'Geležis'
		,CROP : 'Grūdai'
		,PRODUC : 'Gamyba'
		,SHOWDETA : 'Advisor show details'
		,HIDEDETA : 'Advisor hide details'
		,LEVEL : 'lygis'

		,WOODCUTTER : 'Medžių kirtavietė'
		,CLAYPIT : 'Molio karjeras'
		,IRONMINE : 'Geležies kasykla'
		,CROPLAND : 'Grūdų ferma'
		,GRAINMILL : 'Malūnas'
		,BAKERY : 'Kepykla'
		,SAWMILL : 'Lentpjūvė'
		,BRICKYARD : 'Plytinė'
		,IRONFOUNDRY : 'Liejykla'
	},
	'si' : { //Darij
		REFRESH : 'Za osvežitev obišči center vasi'
		,ALLUPS : 'Vse nadgradnje'
		,BESTUPS : 'Priporočljive nadgadnje'
		,TITLE : 'Prikazuje nadgradnje z najnižjo ceno/produkcijo'
		,COSTS : 'cena'
		,RESOURCE : 'surovine'
		,WOOD : 'Les'
		,CLAY : 'Glina'
		,IRON : 'Železo'
		,CROP : 'Žito'
		,PRODUC : 'proizvodnja'
		,SHOWDETA : 'Opomnik prikaži detaile'
		,HIDEDETA : 'Opomnik skrij detaile'
		,LEVEL : 'Stopnja'

		,WOODCUTTER : 'Gozdar'
		,CLAYPIT : 'Glinokop'
		,IRONMINE : 'Rudnik železa'
		,CROPLAND : 'Žitno polje'
		,GRAINMILL : 'Mlin'
		,BAKERY : 'Pekarna'
		,SAWMILL : 'Žaga'
		,BRICKYARD : 'Opekarna'
		,IRONFOUNDRY : 'Talilnica železa'
	},
	'sk' : { //Zapo
		REFRESH : 'Ak chcete aktualizovať rady navštívte centrum obce'
		,ALLUPS : 'Všetky upgrady'
		,BESTUPS : 'Najlepšie upgrady'
		,TITLE : 'Toto ukazuje upgrady s najnižšími nákladmi a rýchlosť výroby.'
		,COSTS : 'cena'
		,RESOURCE : 'suroviny'
		,WOOD : 'Drevo'
		,CLAY : 'Hlina'
		,IRON : 'Železo'
		,CROP : 'Obilie'
		,PRODUC : 'produkcia'
		,SHOWDETA : 'Ukázať podrobnosti poradcu'
		,HIDEDETA : 'Skryť podrobnosti poradcu'
		,LEVEL : 'úroveň'

		,WOODCUTTER : 'Drevorubač'
		,CLAYPIT : 'Hlinená baňa'
		,IRONMINE : 'Železná baňa'
		,CROPLAND : 'Obilné pole'
		,GRAINMILL : 'Mlyn'
		,BAKERY : 'Pekáreň'
		,SAWMILL : 'Píla'
		,BRICKYARD : 'Tehelňa'
		,IRONFOUNDRY : 'Zlievareň'
	},
	'cz' : { //horato
		REFRESH : 'Pokud chcete aktualizovat, navštivte centrum vesnice.'
		,ALLUPS : 'Všechny vylepšení'
		,BESTUPS : 'Nejlepší vylepšení'
		,TITLE : 'Toto ukazuje vylepšení s nejnižšími náklady a rychlost výroby.'
		,COSTS : 'cena'
		,RESOURCE : 'suroviny'
		,WOOD : 'Dřevo'
		,CLAY : 'Hlína'
		,IRON : 'Železo'
		,CROP : 'Obilí'
		,PRODUC : 'produkce'
		,SHOWDETA : 'Ukázat podrobnosti pomocníků'
		,HIDEDETA : 'Skrýt podrobnosti pomocníků'
		,LEVEL : 'úroveň'

		,WOODCUTTER : 'Dřevorubec'
		,CLAYPIT : 'Hliněný důl'
		,IRONMINE : 'Železný důl'
		,CROPLAND : 'Obilné pole'
		,GRAINMILL : 'Mlýn'
		,BAKERY : 'Pekárna'
		,SAWMILL : 'Pila'
		,BRICKYARD : 'Cihelna'
		,IRONFOUNDRY : 'Slévárna'
	},
	'ro' : { //mofox
		REFRESH : 'Pentru a actualiza sfaturile viziteaza Centrul Satului'
		,ALLUPS : 'Toate upgrade-urile'
		,BESTUPS : 'Cele mai bune upgrade-uri'
		,TITLE : 'Acest lucru demonstrează upgrade-urile cu cel mai mic cost / rata de producţie.'
		,COSTS : 'cheltuieli'
		,RESOURCE : 'resurse'
		,WOOD : 'Lemn'
		,CLAY : 'Lut'
		,IRON : 'Fier'
		,CROP : 'Grau'
		,PRODUC : 'productie'
		,SHOWDETA : 'Consilier arată detalii'
		,HIDEDETA : 'Consilier ascunde detalii'
		,LEVEL : 'Nivel'

		,WOODCUTTER : 'Cherestea'
		,CLAYPIT : 'Puţ de lut'
		,IRONMINE : 'Mina de fier'
		,CROPLAND : 'Lan de grâu'
		,GRAINMILL : 'Moara'
		,BAKERY : 'Brutarie'
		,SAWMILL : 'Fabrica de cherestea'
		,BRICKYARD : 'Fabrica de caramidă'
		,IRONFOUNDRY : 'Topitorie'
	},
	'dk' : { //erdmann
		REFRESH : 'For at opdatere forslag besøg Landsbycentrum'
		,ALLUPS : 'Alle opgraderinger'
		,BESTUPS : 'Bedste opgraderinger'
		,TITLE : 'Dette viser de bedste opgraderinger i forhold til den laveste pris/produktion.'
		,COSTS : 'pris'
		,RESOURCE : 'ressource'
		,WOOD : 'Træ'
		,CLAY : 'Ler'
		,IRON : 'Jern'
		,CROP : 'Korn'
		,PRODUC : 'produktion'
		,SHOWDETA : 'Advisor viser detaljer'
		,HIDEDETA : 'Advisor gemmer detaljer'
		,LEVEL : 'Trin'

		,WOODCUTTER : 'Skovhugger'
		,CLAYPIT : 'Lergrav'
		,IRONMINE : 'Jernmine'
		,CROPLAND : 'Kornavler'
		,GRAINMILL : 'Kornmølle'
		,BAKERY : 'Bageri'
		,SAWMILL : 'Savværk'
		,BRICKYARD : 'Lerbrænderi'
		,IRONFOUNDRY : 'Jernstøberi'
	},
	'it' : { //Barbarossa
		REFRESH : 'Per aggiornare la proposta visita il Riepilogo del Villaggio'
		,ALLUPS : 'Tutti gli ampliamenti'
		,BESTUPS : 'I migliori ampliamenti'
		,TITLE : 'Mostra i migliori ampliamenti in rapporto prezzo/produzione.'
		,COSTS : 'prezzo'
		,RESOURCE : 'risorse'
		,WOOD : 'Legno'
		,CLAY : 'Argilla'
		,IRON : 'Ferro'
		,CROP : 'Grano'
		,PRODUC : 'produzione'
		,SHOWDETA : 'Mostra i dettagli'
		,HIDEDETA : 'Nascondi i dettagli'
		,LEVEL : 'livello'

		,WOODCUTTER : 'Segheria'
		,CLAYPIT : "Pozzo d'argilla"
		,IRONMINE : 'Miniera di ferro'
		,CROPLAND : 'Campo di grano'
		,GRAINMILL : 'Mulino'
		,BAKERY : 'Forno'
		,SAWMILL : 'Falegnameria'
		,BRICKYARD : 'Fabbrica di mattoni'
		,IRONFOUNDRY : 'Fonderia'
	},
	'ae' : { //ww_start_t
		REFRESH : 'لتحديث أذهب إلى مركز القرية'
		,ALLUPS : 'كل الترقيات'
		,BESTUPS : 'أفضل الترقيات'
		,TITLE : 'هذا يعرض الترقيات وبأقل التكاليف / معدل الإنتاج.'
		,COSTS : 'التكاليف'
		,RESOURCE : 'الموارد'
		,WOOD : 'الخشب'
		,CLAY : 'الطين'
		,IRON : 'الحديد'
		,CROP : 'القمح'
		,PRODUC : 'الإنتاج'
		,SHOWDETA : 'إظهار التفاصيل'
		,HIDEDETA : 'إخفاء التفاصيل'
		,LEVEL : 'المستوى'

		,WOODCUTTER : 'الحطاب'
		,CLAYPIT : 'حفرة الطين'
		,IRONMINE : 'منجم حديد'
		,CROPLAND : 'حقل القمح'
		,GRAINMILL : 'المطاحن'
		,BAKERY : 'المخابز'
		,SAWMILL : 'معمل النجارة'
		,BRICKYARD : 'مصنع الطوب'
		,IRONFOUNDRY : 'حديد مسبك'
	},
	'se' : { //Tapirboy
		REFRESH : 'Besök bycentrum för att uppdatera råden'
		,ALLUPS : 'Alla uppgraderingarna'
		,BESTUPS : 'Bästa uppgraderingarna'
		,TITLE : 'Här visas den bästa uppgraderingen i förhållande till kostnad/produktion'
		,COSTS : 'kostnad'
		,RESOURCE : 'råvaror'
		,WOOD : 'trä'
		,CLAY : 'lera'
		,IRON : 'järn'
		,CROP : 'vete'
		,PRODUC : 'produktion'
		,SHOWDETA : 'Rådgivare: Visa detaljer'
		,HIDEDETA : 'Rådgivare: Dölj detaljer'
		,LEVEL : 'nivå'

		,WOODCUTTER : 'Skogshuggare'
		,CLAYPIT : 'Lergrop'
		,IRONMINE : 'Järngruva'
		,CROPLAND : 'Vetefält'
		,GRAINMILL : 'Vetekvarn'
		,BAKERY : 'Bageri'
		,SAWMILL : 'Sågverk'
		,BRICKYARD : 'Murbruk'
		,IRONFOUNDRY : 'Järngjuteri'
	},
};
function t(key) {
	if (!dictionary[language][key]) {
		alert('no translation: ' + key);
	}
	return dictionary[language][key];
}

var tinverse = null;
function ParseBuilding(name) {
	name = name.toLowerCase();

	if (!tinverse) {
		tinverse = new Object();
		for ( var key in dictionary[language] ) {
			tinverse[ dictionary[language][key].toLowerCase() ] = key;
		}
	}
//	if (!tinverse[name]) {
//		GM_log("ParseBuilding: don't know what is translated to this: '" + name + "'");
//	}
	return tinverse[name];
}

//upgradecost = woodcost+claycost+ironcost+cropcost
var bluePrints = {
	WOODCUTTER : {
		0 : {upgradecost:0, production:2},
		1 : {upgradecost:250, production:5},
		2 : {upgradecost:415, production:9},
		3 : {upgradecost:695, production:15},
		4 : {upgradecost:1165, production:22},
		5 : {upgradecost:1945, production:33},
		6 : {upgradecost:3250, production:50},
		7 : {upgradecost:5425, production:70},
		8 : {upgradecost:9060, production:100},
		9 : {upgradecost:15125, production:145},
		10 : {upgradecost:25255, production:200},
		11 : {upgradecost:42180, production:280},
		12 : {upgradecost:70440, production:375},
		13 : {upgradecost:117630, production:495},
		14 : {upgradecost:196450, production:635},
		15 : {upgradecost:328075, production:800},
		16 : {upgradecost:547880, production:1000},
		17 : {upgradecost:914965, production:1300},
		18 : {upgradecost:1527990, production:1600},
		19 : {upgradecost:2551745, production:2000},
		20 : {upgradecost:4261410, production:2450}
	},
	CLAYPIT : {
		0 : {upgradecost:0, production:2},
		1 : {upgradecost:250, production:5},
		2 : {upgradecost:420, production:9},
		3 : {upgradecost:700, production:15},
		4 : {upgradecost:1170, production:22},
		5 : {upgradecost:1940, production:33},
		6 : {upgradecost:3250, production:50},
		7 : {upgradecost:5425, production:70},
		8 : {upgradecost:9060, production:100},
		9 : {upgradecost:15125, production:145},
		10 : {upgradecost:25250, production:200},
		11 : {upgradecost:42185, production:280},
		12 : {upgradecost:70440, production:375},
		13 : {upgradecost:117635, production:495},
		14 : {upgradecost:196450, production:635},
		15 : {upgradecost:328075, production:800},
		16 : {upgradecost:547875, production:1000},
		17 : {upgradecost:914970, production:1300},
		18 : {upgradecost:1527990, production:1600},
		19 : {upgradecost:2551740, production:2000},
		20 : {upgradecost:4261405, production:2450}
	},
	IRONMINE : {
		0 : {upgradecost:0, production:2},
		1 : {upgradecost:270, production:5},
		2 : {upgradecost:450, production:9},
		3 : {upgradecost:755, production:15},
		4 : {upgradecost:1260, production:22},
		5 : {upgradecost:2100, production:33},
		6 : {upgradecost:3510, production:50},
		7 : {upgradecost:5855, production:70},
		8 : {upgradecost:9785, production:100},
		9 : {upgradecost:16335, production:145},
		10 : {upgradecost:27275, production:200},
		11 : {upgradecost:45555, production:280},
		12 : {upgradecost:76075, production:375},
		13 : {upgradecost:127045, production:495},
		14 : {upgradecost:212170, production:635},
		15 : {upgradecost:354325, production:800},
		16 : {upgradecost:591710, production:1000},
		17 : {upgradecost:988160, production:1300},
		18 : {upgradecost:1650225, production:1600},
		19 : {upgradecost:2755880, production:2000},
		20 : {upgradecost:4602325, production:2450}
	},
	CROPLAND : {
		0 : {upgradecost:0, production:2},
		1 : {upgradecost:250, production:5},
		2 : {upgradecost:415, production:9},
		3 : {upgradecost:695, production:15},
		4 : {upgradecost:1165, production:22},
		5 : {upgradecost:1945, production:33},
		6 : {upgradecost:3250, production:50},
		7 : {upgradecost:5425, production:70},
		8 : {upgradecost:9055, production:100},
		9 : {upgradecost:15125, production:145},
		10 : {upgradecost:25255, production:200},
		11 : {upgradecost:42180, production:280},
		12 : {upgradecost:70445, production:375},
		13 : {upgradecost:117640, production:495},
		14 : {upgradecost:196445, production:635},
		15 : {upgradecost:328070, production:800},
		16 : {upgradecost:547880, production:1000},
		17 : {upgradecost:914960, production:1300},
		18 : {upgradecost:1527985, production:1600},
		19 : {upgradecost:2551735, production:2000},
		20 : {upgradecost:4261410, production:2450}
	},
	GRAINMILL : {
		0 : {upgradecost:0},
		1 : {upgradecost:2560, dependency:{CROPLAND:5}},
		2 : {upgradecost:4605},
		3 : {upgradecost:8295},
		4 : {upgradecost:14925},
		5 : {upgradecost:26875}
	},
	BAKERY : {
		0 : {upgradecost:0},
		1 : {upgradecost:5150, dependency:{CROPLAND:10, GRAINMILL:5}},
		2 : {upgradecost:9270},
		3 : {upgradecost:16690},
		4 : {upgradecost:30035},
		5 : {upgradecost:54060}
	},
	SAWMILL : {
		0 : {upgradecost:0},
		1 : {upgradecost:1280, dependency:{WOODCUTTER:10}},
		2 : {upgradecost:2300},
		3 : {upgradecost:4145},
		4 : {upgradecost:7465},
		5 : {upgradecost:13440}
	},
	BRICKYARD : {
		0 : {upgradecost:0},
		1 : {upgradecost:1290, dependency:{CLAYPIT:10}},
		2 : {upgradecost:2320},
		3 : {upgradecost:4175},
		4 : {upgradecost:7520},
		5 : {upgradecost:13545}
	},
	IRONFOUNDRY : {
		0 : {upgradecost:0},
		1 : {upgradecost:1280, dependency:{IRONMINE:10}},
		2 : {upgradecost:2305},
		3 : {upgradecost:4150},
		4 : {upgradecost:7465},
		5 : {upgradecost:13440}
	}
};

//SCRIPT LOGIC

function getBuildingsLevels(node) {
	if (!node) {
		node = document;
	}
	var buildings = new Object();
	var areas = find('//area', XPList, node);

	for (var i=0; i<areas.snapshotLength; ++i) {
		var area = areas.snapshotItem(i);

		var s = area.title.toLowerCase().split((' '+t('LEVEL')+' ').toLowerCase());
		if ( s.length == 2 ) {
			var type = ParseBuilding(s[0]);
			var level = parseInt(s[1]);
			
			//GM_log(type + ' level ' + level);

			if ( ! buildings[type] ) {
				buildings[type] = new Object();
			}
			if ( ! buildings[type][level] ) {
				buildings[type][level] = 0;
			}
			buildings[type][level]++;
//		} else {
//			GM_log('getBuildingsLevels: ignored ' + area.title);
		}
	}

	return buildings;
}

function getSingleBuildingLevel(buildings, type) {
	var L = 0;
	var i = 0;
	for (var level in buildings[type]) {
		if ( 0 < i ) {
			alert('Only 1 building of type '+type+' allowed/village, this is an illegal state');
		}
		L = parseInt(level);
		i++;
	}
	return L;
}

function getFieldsProduction(fields, type) {
	var baseProduction = 0;
	var field = fields[type];
	for ( var level in field ) {
		var count = field[level];
		baseProduction += bluePrints[type][level].production * count;
	}
	return baseProduction;
}

//calculate all this at 'buildings' generation, in 'getBuildingsLevels' func
function getBuildingMaxLevel(type, buildings) {
	var max = 0;
	for ( var level in buildings[type] ) {
		var count = buildings[type][level];
		if (count > 0) {
			max = Math.max(level, max);
		}
	}
	return max;
}

//true: buildable, false: prerequisites are not met
function dependencyCheck(building, fields, buildings) {
	if ( ! bluePrints[building.type][building.level+1] ) {
		//max level reached, no more upgrades
		return false;
	}

	var dependencies = bluePrints[building.type][building.level+1].dependency;
	if ( ! dependencies ) {
		//no dependencies means building is available
		return true;
	}

	for ( var type in dependencies ) {
		var minLevel = dependencies[type];
		var maxFieldLevel = getBuildingMaxLevel(type, fields);
		var maxBuildingLevel = getBuildingMaxLevel(type, buildings);

		//not met
		if ( minLevel > maxFieldLevel && minLevel > maxBuildingLevel ) {
			return false;
		}
	}

	//all ok
	return true;
}

function getAdvices(fields, buildings, fieldType, bonusBuildings) {
	var advices = [];

	var baseProduction = getFieldsProduction(fields, fieldType);
	var bonusProductionPerLevel = baseProduction * 0.05;

	var bonusLevel = 0;
	for ( var i in bonusBuildings ) {
		var type = bonusBuildings[i].type;

		bonusBuildings[i].level = getSingleBuildingLevel(buildings, type);
		bonusLevel += bonusBuildings[i].level;
	}

	//create field advices
	var maxLevel = 0;
	for ( var level in fields[fieldType] ) {
		var L = parseInt(level);
		maxLevel = Math.max(maxLevel, L);
		if ( L < 20 ) {
			var o = bluePrints[fieldType][level];
			var o1 = bluePrints[fieldType][parseInt(level)+1];
			advices.push({
							name : (t(fieldType) + " "+t('LEVEL')+" " + level + " &rarr; " + (parseInt(level)+1)),
							value : Math.round( o1.upgradecost / ((o1.production - o.production ) * (1.0 + bonusLevel * 0.05)) )
						});
		}
	}

	//create bonus advices
	for ( var i in bonusBuildings ) {
		var type = bonusBuildings[i].type;
		var building = bonusBuildings[i];
		if ( dependencyCheck(building, fields, buildings) ) {
			var o = bluePrints[type][building.level+1];
			advices.push({
							name : (t(type) + " "+t('LEVEL')+" " + building.level + " &rarr; " + (building.level+1)),
							value : Math.round( o.upgradecost / bonusProductionPerLevel )
						});
		}
	}
//	if (advices.length == 0) {
//		GM_log('getAdvices: No advice found for ' + fieldType);
//	}
	return advices;
}

const refreshIcon = "data:image/gif;base64,R0lGODlhEAAQAPcAAAAAAB82YSlGfTBTlDZgpjhqsjhwuDh3vTh+wjiHxjiOyjeXzjSo1TK12pqmv7CytLKztpKrzp2rx5G726Cyz6u40r/AwqLH4aPL46zM4qHS58rKzMrKzcvMzszMzsLH0MbM2N3e38ze683n7uDh4eDh4uLi4uHi4+Pj5OXl5ubm5+bn6Ozs7e/v7+/v8PDw8PDw8fLy8vLy8/T09AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAiVAP8JFDhjBouBCBPKaNBgxImECVVoYBBjBcSEIhZgSHERoYkLCjKEGIgCBoqBJFy4SJBggsoSJV4kePHwXwsEOHMiUJnTRYl/HFQcGDpUhVCiB1QI7LDCgFOjTqM+FehhRYEVHDisUBGhQAGjHAZW7TDQQgUCFMJ2FMhBwgAQD9YCVSHAgdqOED4ECKBU7lwVG/yuDQgAOw==";

//create Advisor panel
function renderPanel(woodAdvice, clayAdvice, ironAdvice, cropAdvice, node) {
	if ( ! node ) {
		node = document;
	}

	woodAdvice.sort(function(a,b){return a.value-b.value;});
	clayAdvice.sort(function(a,b){return a.value-b.value;});
	ironAdvice.sort(function(a,b){return a.value-b.value;});
	cropAdvice.sort(function(a,b){return a.value-b.value;});

	//render title
	var table = document.createElement('table');
	table.id = "advices";
	table.style.width = "99%";
	table.cellSpacing = 0;
	table.cellPadding = 0;
	var a = '<tr><td>';
		// == BEST UPGRADES ==
		a += '<table id="bestTable" style="display: ' + (loadVillageVariable('details', 0)==0?'inline':'none') + ';" title="'+t('TITLE')+'">';
		//render title
		a += '<tr><td style="padding-left: 22px;"><a id="bestAnchor" style="color: black;" href="javascript:void(0)"><strong>' + t('BESTUPS') + ':</strong></a>&nbsp;&nbsp;';
		a += '<a id="upadvRef1" href="javascript:void(0);">';
		a += '<img alt="'+t('REFRESH')+'" title="'+t('REFRESH')+'" src="'+refreshIcon+'">';
		a += '</a></td></tr>';
		//render wood
		if ( woodAdvice.length > 0 ) {
			a += '<tr><td style="padding-left: 24px;"><img title="'+t('WOOD')+'" alt="'+t('WOOD')+'" class="r1" src="img/x.gif">';
			a += '&nbsp;&nbsp;' + woodAdvice[0].name;
			a += '</td></tr>';
		}
		//render clay
		if ( clayAdvice.length > 0 ) {
			a += '<tr><td style="padding-left: 24px;"><img title="'+t('CLAY')+'" alt="'+t('CLAY')+'" class="r2" src="img/x.gif">';
			a += '&nbsp;&nbsp;' + clayAdvice[0].name;
			a += '</td></tr>';
		}
		//render iron
		if ( ironAdvice.length > 0 ) {
			a += '<tr><td style="padding-left: 24px;"><img title="'+t('IRON')+'" alt="'+t('IRON')+'" class="r3" src="img/x.gif">';
			a += '&nbsp;&nbsp;' + ironAdvice[0].name;
			a += '</td></tr>';
		}
		//render crop
		if ( cropAdvice.length > 0 ) {
			a += '<tr><td style="padding-left: 24px;"><img title="'+t('CROP')+'" alt="'+t('CROP')+'" class="r4" src="img/x.gif">';
			a += '&nbsp;&nbsp;' + cropAdvice[0].name;
			a += '</td></tr>';
		}
		a += '</table>';

		// == ALL UPGRADES ==
		a += '<table id="allTable" style="display: ' + (loadVillageVariable('details', 0)==1?'inline':'none') + ';" title="'+t('TITLE')+'">';
		//render title
		a += '<tr><td style="padding-left: 22px;"><a id="allAnchor" style="color: black;" href="javascript:void(0)"><strong>' + t('ALLUPS') + ':</strong></a>&nbsp;&nbsp;';
		a += '<a id="upadvRef2" href="javascript:void(0);">';
		a += '<img alt="'+t('REFRESH')+'" title="'+t('REFRESH')+'" src="'+refreshIcon+'">';
		a += '</a></td></tr>';
		//render wood
		for ( var i in woodAdvice ) {
			a += '<tr><td style="padding-left: 24px;"><img title="'+t('WOOD')+'" alt="'+t('WOOD')+'" class="r1" src="img/x.gif">';
			a += '&nbsp;&nbsp;' + woodAdvice[i].name + ' (<i>'+t('COSTS')+ ' ' + woodAdvice[i].value + ' '+t('RESOURCE')+'/'+t('WOOD')+' '+t('PRODUC')+ '</i>)</td></tr>';
		}
		//render clay
		for ( var i in clayAdvice ) {
			a += '<tr><td style="padding-left: 24px;"><img title="'+t('CLAY')+'" alt="'+t('CLAY')+'" class="r2" src="img/x.gif">';
			a += '&nbsp;&nbsp;' + clayAdvice[i].name + ' (<i>'+t('COSTS')+ ' ' + clayAdvice[i].value + ' '+t('RESOURCE')+'/'+t('CLAY')+' '+t('PRODUC')+ '</i>)</td></tr>';
		}
		//render iron
		for ( var i in ironAdvice ) {
			a += '<tr><td style="padding-left: 24px;"><img title="'+t('IRON')+'" alt="'+t('IRON')+'" class="r3" src="img/x.gif">';
			a += '&nbsp;&nbsp;' + ironAdvice[i].name + ' (<i>'+t('COSTS')+ ' ' + ironAdvice[i].value + ' '+t('RESOURCE')+'/'+t('IRON')+' '+t('PRODUC')+ '</i>)</td></tr>';
		}
		//render crop
		for ( var i in cropAdvice ) {
			a += '<tr><td style="padding-left: 24px;"><img title="'+t('CROP')+'" alt="'+t('CROP')+'" class="r4" src="img/x.gif">';
			a += '&nbsp;&nbsp;' + cropAdvice[i].name + ' (<i>'+t('COSTS')+ ' ' + cropAdvice[i].value + ' '+t('RESOURCE')+'/'+t('CROP')+' '+t('PRODUC')+ '</i>)</td></tr>';
		}
		a += '</table></td></tr>';

	table.innerHTML = a;

	if ( ! insertAfter(table, find("//table[@id='building_contract']", XPFirst, node)) ) {
		if ( ! insertAfter(table, find("//div[@id='map_details']", XPFirst, node)) ) {
			var content = find("//div[@id='content']");
			content.appendChild(table);
		}
	}

	a = document.getElementById('bestAnchor');
	a.addEventListener('click', allUpgrades, 0);
	a = document.getElementById('allAnchor');
	a.addEventListener('click', bestUpgrades, 0);

	a = document.getElementById('upadvRef1');
	a.addEventListener('click', refreshDorf2, 0);
	a = document.getElementById('upadvRef2');
	a.addEventListener('click', refreshDorf2, 0);

	function bestUpgrades() {
		var details = 0;
		saveVillageVariable('details', details);
		document.getElementById('bestTable').style.display = 'inline'; 
		document.getElementById('allTable').style.display = 'none'; 
	}

	function allUpgrades() {
		var details = 1;
		saveVillageVariable('details', details);
		document.getElementById('allTable').style.display = 'inline'; 
		document.getElementById('bestTable').style.display = 'none'; 
	}

	function refreshDorf2() {
		removeNode(find("//table[@id='advices']", XPFirst, node));
		ajaxRequest('dorf2.php', 'GET', null, function(response) {
				var wrapper = responseWrap(response);
				processDorf2(wrapper);
				processDorf1();
			}
		);
	}
}

function insertAfter( newNode, referenceNode ) {
	if (referenceNode) {
		var parent = referenceNode.parentNode;
		parent.insertBefore(newNode, referenceNode.nextSibling);
		return true;
	}
	return false;
}

function removeNode( element ) {
	if (element && element.parentNode) {
		element.parentNode.removeChild(element);
	}
}

function xpathToFirstFound(query, startNode) {
	if (!startNode) {
		startNode = document;
	}
    return document.evaluate(query, startNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

var userId = null;
function GetUserId() {
	if (!userId) {
		var profileLink = xpathToFirstFound("//div[@id='side_navi']//a[contains(@href, 'spieler.php')]") + "";
		userId = profileLink.split('=')[1];
	}
	return userId;
}

var serverName = null;
function GetServerName() {
	if (!serverName) {
		serverName = window.location.host;
	}
	return serverName;
}

/* village id */
var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
var XPIterate = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
var XPNumber = XPathResult.NUMBER_TYPE;
var XPAny = XPathResult.ANY_TYPE;

function ajaxRequest(url, method, param, onSuccess, onFailure) {
	var response = new XMLHttpRequest();
	response.onreadystatechange = function() {
		if (response.readyState == 4 && response.status == 200)
			onSuccess(response);
		else if (response.readyState == 4 && response.status != 200)
			onFailure(response);
		};
	response.open(method, url, true);
	if (method == 'POST')
		response.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
	response.send(param);
};

function responseWrap(response) {
	var ad = document.createElement('div');
	ad.innerHTML = response.responseText;
	return ad;
};

function find(xpath, xpres, startnode) {
	if (!startnode) {
		startnode = document;
	}
	var ret = document.evaluate(xpath, startnode, null, xpres, null);
	return xpres == XPFirst ? ret.singleNodeValue : ret;
}

function getVillagesTableNode(doc) {
	var tag;
	tag = find(".//table[@class='vlist']", XPFirst, doc);
	if (tag == null) {
		tag = find(".//table[@id='vlist']", XPFirst, doc);
	}
	if (tag == null) {
		tag = find(".//div[@id='sright']//table[@class='f10']", XPFirst, doc);
	}
	if (tag == null) {
		return null;
	}
	return tag;
}

var currentVillageId = null;
function GetCurrentVillageId() {
	if (!currentVillageId) {
		var tag, hrefs;
		tag = getVillagesTableNode(null);
		if (tag == null) {
			GM_log("GetCurrentVillageId: No villages list tag.");
			return 0;
		}
		hrefs = find(".//a[contains(@href,'newdid')][@class='active_vl']", XPFirst, tag);
		if (hrefs == null) {
			hrefs = find(".//td[@class='dot hl']/..//a[contains(@href,'newdid')]", XPFirst, tag);
		}
		if (hrefs == null) {
			GM_log("GetCurrentVillageId: Can't recognize which village is active.");
			return 0;
		}
		temp = hrefs.href.split("?")[1].split('&');
		currentVillageId = temp[0];
	}
	return currentVillageId;
}

function setLanguage() {
	var s = GetServerName().split('.');
	language = serverLanguages[ s[s.length-1] ];
	//GM_log('setLanguage: ' + language);
}

/*
//not used
function saveServerVariable(varname, object) {
	var _varname = GetServerName() + '_' + varname;
	GM_setValue(_varname, uneval(object));
}

function loadServerVariable(varname, defaultObject) {
	var _varname = GetServerName() + '_' + varname;
	var val = GM_getValue(_varname);
	if (val == undefined) {
		return defaultObject;
	}
	return eval(val);
}

function saveUserVariable(varname, object) {
	var _varname = GetServerName() + '_u' + GetUserId() + '_' + varname;
	GM_setValue(_varname, uneval(object));
}

function loadUserVariable(varname, defaultObject) {
	var _varname = GetServerName() + '_u' + GetUserId() + '_' + varname;
	var val = GM_getValue(_varname);
	if (val == undefined) {
		return defaultObject;
	}
	return eval(val);
}
*/

const dorf2BuildingsVariableName = 'BuildingsLevels';

function saveVillageVariable(varname, object) {
	var _varname = GetServerName() + '_u' + GetUserId() + '_v' + GetCurrentVillageId() + '_' + varname;
	GM_setValue(_varname, uneval(object));
}

function loadVillageVariable(varname, defaultObject) {
	var _varname = GetServerName() + '_u' + GetUserId() + '_v' + GetCurrentVillageId() + '_' + varname;
	var val = GM_getValue(_varname);
	if (val == undefined) {
		return defaultObject;
	}
	return eval(val);
}

function isCurrentPage(page) {
	return window.location.href.indexOf(page) > -1;
}

function processDorf1(node) {
	if ( ! node ) {
		node = document;
	}
	var fields = getBuildingsLevels(node);
	var buildings = loadVillageVariable(dorf2BuildingsVariableName, {} );

	var woodAdvices = getAdvices( fields, buildings, 'WOODCUTTER', [{type:'SAWMILL'}] );
	var clayAdvices = getAdvices( fields, buildings, 'CLAYPIT', [{type:'BRICKYARD'}] );
	var ironAdvices = getAdvices( fields, buildings, 'IRONMINE', [{type:'IRONFOUNDRY'}] );
	var cropAdvices = getAdvices( fields, buildings, 'CROPLAND', [{type:'GRAINMILL'}, {type:'BAKERY'}] );
	renderPanel(woodAdvices, clayAdvices, ironAdvices, cropAdvices, node);
}

function processDorf2(node) {
	if ( ! node ) {
		node = document;
	}
	var buildings = getBuildingsLevels(node);
	saveVillageVariable(dorf2BuildingsVariableName, buildings);
}

function main(ignore) {
	try {
		var startTime = new Date().getTime();
		GM_log('script starting');

		//set serverLanguage
		setLanguage();

		if ( isCurrentPage('/dorf1.php') ) {
			//village overview
			processDorf1();

		} else if ( isCurrentPage('/dorf2.php') ) {
			//village center
			processDorf2();

		}

		GM_log('script finished in ' + (new Date().getTime() - startTime) + ' milliseconds');
	} catch (e) {
		GM_log(e);
	}
}

window.addEventListener('load', function(e){ main(e); }, false);
