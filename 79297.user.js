// ==UserScript==
// @name           GBG raporty walki pl
// @namespace      Gallendor Battlegrounds
// @description    tlumaczenie raportow walki na j polski
// @include        http://bg*.gallendor.pl/*
// @include        http://pl3.gbg.my/*
// @author		   morri
// ==/UserScript==


function find(xpath,xpres) {
	var ret = document.evaluate(xpath,document,null,xpres,null);
	return  xpres == XPFirst ? ret.singleNodeValue : ret;
	
}

var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE,
    XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    XPOList = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;

	
function translate(){
	var text=find("//div[@class='dl4KBMain']",XPFirst);
	var lookup={
		"schießt":"strzela",
		"auf":"na",
		"wirkt":"rzuca czar",
		"noch":"pozosta\u0142o",
		"erleidet":"otrzymuje",
		"erhält":"zyskuje",
		"Schaden":"obra\u017Ce\u0144",
		"und":"i",
		"stirbt":"ginie",
		"für": "na",
		"Schutz" : "Ochron\u0119",//
		"vor" : "przed",
		"Magie":"magi\u0105",
		//poczatek nazw potworow
		"MONS_BLEICHER_RITTER":"wykl\u0119ty kap\u0142an",
		"MONS_HYDRA":"Hydra",
		"MONS_HOEHLENKRIECHER":"Jaskiniowy lizus",
		"MONS_KNUFFELDUFFEL":"Kosiarz",
		"MONS_ECHOHOELENFROSCH":"\u017Baba Jaskini Echo",
		"MONS_GOBLIN_BOGENSCHUETZE":"Goblin \u0141ucznik",
		"MONS_STINKENDER_BARBAR":"\u015Bmierdz\u0105cy Dzikus",
		"MONS_EISTITAN":"Homtash",
		"MONS_VERWESENDER_UNHOLD":"Zgni\u0142y Zwyrodnialec",
		"MONS_ROTER_GOBLIN":"Czerwony goblin",
		"MONS_SCHWARZER_DRACHEN":"Po\u017Ceracz ropniak\u00F3w",
		"MONS_RAUBHAMSTER":"Z\u0142odziejaszek",
		"MONS_GIFTIGER_RIESENSALAMAN":"Jadowity kot",
		"MONS_FLIEGENDER_SCHRECKEN":"Lataj\u0105cy strach",
		"MONS_ZORNIGER_SCHLEIM":"Gniewna wydzielina",
		"MONS_LINDWURMJUNGES":"M\u0142ody smok",
		"MONS_TROLL":"Troll",
		"MONS_MAGISCHE_KETTE":"Magiczny \u0141a\u0144cuch",
		"MONS_VERHEXTES_BAUERNBROT":"Zaczarowany Bochenek",
		"MONS_GOBLIN":"Goblin",
		"MONS_SMILE_PUMPKIN":"szydercza dynia",
		"MONS_VAMPIR":"Wampir",
		"MONS_LAUSCHWANZE":"Mamrak",
		"MONS_GOBLIN_LANGFINGER":"z\u0142odziejski goblin",
		"MONS_HEIMATLOSER_CHOSEN":"Bezdomny Wybraniec",
		"MONS_GROSSMEISTER_ACHTMANNZ":"Mistrz Wader",
		"MONS_BRENNENDER_DAEMON":"P\u0142on\u0105cy demon",
		"MONS_RACHSUECHTIGER_ALB":"m\u015Bciwy \u00D6rls",
		"MONS_PESTSPINNE":"paj\u0105k d\u017Cumy",
		"MONS_APOKALYPTISCHER_REITER":"Je\u017Adziec Apokalipsy",
		"MONS_FUERCHTERLICHE_DUNKELF":"Z\u0142y Omen",
		"MONS_BLUTELFE":"miotacz ska\u0142",
		//koniec nazw potworów
		//poczatke naz czarów
		"BRENNENDE_HAENDE_NAME":"P\u0142on\u0105ce r\u0119ce",
		"BLIZZARD_NAME":"Blizzard",
		"BLITZ_NAME": "Piorun",
		"TORNADO_NAME":"Tornado",
		"SCHLAMMBOMBE_NAME":"B\u0142otna bomba",
		"FEUERSTURM_NAME":"Burza ognia",
		"EISESKAELTE_NAME":"Zlodowacenie",
		"ERDSPALTUNG_NAME":"Rozszczepienie ziemi",
		"WELTENWIND_NAME":"Wiatr \u015Bwiat\u00F3w",
		"FROSTNOVA_NAME":"Mrozy",
		"LAVAWELLE_NAME":"Gor\u0105ca lawa",
		"WOGE_DES_HASSES_NAME":"Kolebka nienawi\u015Bci",
		"BRANDPFEIL_NAME":"Strza\u0142a ognia",
		"SENGENDE_KUGEL_NAME":"Czarna kula",
		"LEID_NAME":"Cierpienie",
		"ENTWAFFNUNG_NAME":"Brutalno\u015B\u0107",
		"KAMPFESLUST_NAME":"Ch\u0119\u0107 walki",
		//koniec nazw czarów
		"MAGISCHER_WALL_NAME":"Magiczna \u015Bciana",
		"Reihe":"rz\u0105d",
		"KILL":"\u015AMIER\u0106",
		"Erfahrungspunkte":"do\u015Bwiadczenia",
		"attackiert":"atakuje",
		"gegen":"na",
		"Runde":"Runda",
		"Nahkampf":"Walka wr\u0119cz",
		"Distanzkampf":"Walka z dystansu",
		"f\u00FCr":"na",
		"Runden":"rund",
		"Angriffspunkte":"punkt\u00F3w ataku\n"
		
		
		
	}
	try{
		var txt=text.innerHTML.replace(/[a-zA-Zßäü_]+/g,function(match){return lookup[match] || match;});
		text.innerHTML=txt;
	}
	catch(err){
	//alert(err);
	}
}
window.addEventListener( 'load', function( e ) {translate();},false);