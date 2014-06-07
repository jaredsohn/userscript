// ==UserScript==
// @name	EngineTC (by spiritRKS1910)
// Want you more? Visit my page: www.crimsteam.site90.net
// Made by tochihut, updated by Pundare and powered by spiritRKS1910
// @include        *.thecrims.com/*
// ==/UserScript==


/*
   =================================== BOT MUST GO ON ==================================== 

   ================== Powered by spiritRKS1910 (www.crimsteam.site90.net)=================
*/



// Languages

// English
var lang_gb = new Array();

// Drugs	
lang_gb['painkillers']  	= 'Painkillers';
lang_gb['weed'] 		= 'Weed';
lang_gb['booze'] 		= 'Booze';
lang_gb['magic mushrooms']	= 'Magic mushrooms'; 
lang_gb['lsd']			= 'LSD'; 	
lang_gb['hash'] 		= 'Hash';
lang_gb['ghb'] 			= 'GHB';
lang_gb['ecstacy'] 		= 'Ecstacy';
lang_gb['opium']		= 'Opium'; 
lang_gb['amphetamine'] 		= 'Amphetamine';
lang_gb['special k']		= 'Special k'; 
lang_gb['morphine']		= 'Morphine'; 
lang_gb['cocaine']		= 'Cocaine'; 
lang_gb['heroin']		= 'Heroin'; 

// Armor
lang_gb['Diaper']			= 'Diaper';
lang_gb['Leather Jacket']		= 'Leather jacket';	
lang_gb['Shining body armor']		= 'Shining body armor';	
lang_gb['Body armor']			= 'Body armor';	
lang_gb['Nano Fiber Combat Jacket']	= 'Nano fiber combat jacket'; 	
lang_gb['Nomex plated armor']		= 'Nomex plated armor';

// Strings used by the script
lang_gb['SOLO SAFE']	= 'SOLO SAFE';
lang_gb['NORMAL']	= 'NORMAL';



// Swedish

var lang_se = new Array();

// Droger	
lang_se['weed'] 		= 'Gräs';	
lang_se['painkillers']  	= 'Smärtstillande';
lang_se['booze'] 		= 'Sprit';
lang_se['magic mushrooms']	= 'Magic mushrooms'; 
lang_se['lsd']			= 'LSD'; 	
lang_se['hash'] 		= 'Hasch';
lang_se['ghb'] 			= 'GHB';
lang_se['ecstacy'] 		= 'Ecstacy';
lang_se['opium']		= 'Opium'; 
lang_se['amphetamine'] 		= 'Amfetamin';
lang_se['special k']		= 'Special k'; 
lang_se['morphine']		= 'Morfin'; 
lang_se['cocaine']		= 'Kokain'; 
lang_se['heroin']		= 'Heroin'; 


// Rustningar
lang_se['Diaper']			= 'Blöja';  	
lang_se['Leather Jacket']		= 'Läderjacka';	
lang_se['Shining body armor']		= 'Blänkande kroppsskydd'; 	
lang_se['Body armor']			= 'Skottsäker väst'; 	
lang_se['Nano Fiber Combat Jacket']	= 'Skottsäker jacka av nano-fiber'; 	
lang_se['Nomex plated armor']		= 'Nomex-pläterad rustning';


// Strings used by the script
lang_se['SOLO SAFE']	= 'SOLO SAFE';
lang_se['NORMAL']	= 'NORMAL';




// PL
var lang_pl = new Array();
lang_pl['weed']			= 'Zioło';
lang_pl['painkillers']		= 'Piguły';
lang_pl['booze']		= 'Piwo';
lang_pl['magic mushrooms']	= 'Grzybki';
lang_pl['hash']			= 'Hash';
lang_pl['lsd']			= 'LSD';
lang_pl['ghb']			= 'GHB';
lang_pl['ecstacy']		= 'Ecstasy';
lang_pl['opium']		= 'Opium';
lang_pl['amphetamine']		= 'Amfetamina';
lang_pl['cocaine']		= 'Kokaina';
lang_pl['special k']		= 'Special K';
lang_pl['morphine']		= 'Morfina';
lang_pl['heroin']		= 'Heroina';


lang_pl['Diaper']			= 'Pielucha';
lang_pl['Leather Jacket']		= 'Kurtka skórzana';
lang_pl['Shining body armor']		= 'Błyszcząca zbroja';
lang_pl['Body armor']			= 'Kamizelka kuloodporna';
lang_pl['Nano Fiber Combat Jacket']	= 'Węglowa kamizelka ochronna';
lang_pl['Nomex plated armor']		= 'Pancerz z nomexu';




// ES

var lang_es = new Array();

lang_es['weed']			= 'Marihuana';
lang_es['painkillers']		= 'Analgésicos';
lang_es['booze']		= 'Alcohol';
lang_es['magic mushrooms'] 	= 'Hongos alucinógenos';
lang_es['hash']			= 'Hash';
lang_es['lsd']			= 'LSD';
lang_es['ghb']			= 'GHB';
lang_es['ecstacy']		= 'Extasis';
lang_es['opium']		= 'Opio';
lang_es['amphetamine']		= 'Anfetamina';
lang_es['cocaine']		= 'Cocaina';
lang_es['special k']		= 'Especial K';
lang_es['morphine']		= 'Morfina';
lang_es['heroin']		= 'Heroina';


lang_es['Diaper']			= 'Diper';
lang_es['Leather Jacket']		= 'Chaqueta De Cuero';
lang_es['Shining body armor']		= 'Armadura brillante';
lang_es['Body armor']			= 'Armadura Corporal';
lang_es['Nano Fiber Combat Jacket']	= 'Chaqueta de Combate con Nano Fibra';	
lang_es['Nomex plated armor']		= 'Armadura plateada Nomex';




// PT

var lang_pt = new Array();

lang_pt['weed']			= 'Marijuana';
lang_pt['painkillers']		= 'Analgésicos';
lang_pt['booze']		= 'Alcoól';
lang_pt['magic mushrooms'] 	= 'Cogumelos alucinógenicos';
lang_pt['hash']			= 'Haxixe';
lang_pt['lsd']			= 'LSD';
lang_pt['ghb']			= 'GHB';
lang_pt['ecstacy']		= 'Ecstacy';
lang_pt['opium']		= 'Ópio';
lang_pt['amphetamine']		= 'Anfetamina';
lang_pt['cocaine']		= 'Cocaína';
lang_pt['special k']		= 'Special K';
lang_pt['morphine']		= 'Morfina';
lang_pt['heroin']		= 'Heroína';


lang_pt['Diaper']			= 'Colete';
lang_pt['Leather Jacket']		= 'Casaco de Cabedal';
lang_pt['Shining body armor']		= 'Casaco brihante';
lang_pt['Body armor']			= 'Colete a prova de balas';	
lang_pt['Nano Fiber Combat Jacket']	= 'Casaco de combate futurista';
lang_pt['Nomex plated armor']		= 'Casaco feito de Nomex';




// SI

var lang_si = new Array();

lang_si['weed']			= 'Travca';
lang_si['painkillers']		= 'Painkillerji';
lang_si['booze']		= 'Alko';
lang_si['magic mushrooms'] 	= 'Magic mushrooms';
lang_si['hash']			= 'Hašiš';
lang_si['lsd']			= 'LSD';
lang_si['ghb']			= 'GHB';
lang_si['ecstacy']		= 'Ekstazy';
lang_si['opium']		= 'Opium';
lang_si['amphetamine']		= 'Amphetamine';
lang_si['cocaine']		= 'Cocaine';
lang_si['special k']		= 'Special K';
lang_si['morphine']		= 'Morfij';
lang_si['heroin']		= 'Heroin';


lang_si['Diaper']			= 'Plenica';
lang_si['Leather Jacket']		= 'Usnjena jakna';
lang_si['Shining body armor']		= 'SWAT neprebojni jopič';
lang_si['Body armor']			= 'Jopič Slovenske policije';
lang_si['Nano Fiber Combat Jacket']	= 'Nano fiber bojni jopič';
lang_si['Nomex plated armor']		= 'Nomex neprebojni jopič';




// CZ

var lang_cz = new Array();

lang_cz['weed']			= 'Travka';	
lang_cz['painkillers']		= 'Léky';
lang_cz['booze']		= 'Chlast';
lang_cz['magic mushrooms'] 	= 'Houbičky';
lang_cz['hash']			= 'Hašiš';
lang_cz['lsd']			= 'LSD';
lang_cz['ghb']			= 'GHB';
lang_cz['ecstacy']		= 'Exstáze';
lang_cz['opium']		= 'Opium';
lang_cz['amphetamine']		= 'Amfetamin';
lang_cz['cocaine']		= 'Kokain';
lang_cz['special k']		= 'Ketamin';
lang_cz['morphine']		= 'Morfium';
lang_cz['heroin']		= 'Herák';


lang_cz['Diaper']			= 'Plína';
lang_cz['Leather Jacket']		= 'Kožená vesta';
lang_cz['Shining body armor']		= 'Kovová zbroj';
lang_cz['Body armor']			= 'Celotělní zbroj';
lang_cz['Nano Fiber Combat Jacket']	= 'Bojová vesta z nano vláken';
lang_cz['Nomex plated armor']		= 'Nomex plátová zbroj';




// DE

var lang_de = new Array();

lang_de['weed']			= 'Gras';
lang_de['painkillers']		= 'Schmerztabletten';	
lang_de['booze']		= 'Bier';
lang_de['magic mushrooms'] 	= 'Pilze';
lang_de['hash']			= 'Hasch';
lang_de['lsd']			= 'LSD';
lang_de['ghb']			= 'GHB';
lang_de['ecstacy']		= 'Ecstacy';
lang_de['opium']		= 'Opium';
lang_de['amphetamine']		= 'Amphetamine';
lang_de['cocaine']		= 'Kokain';
lang_de['special k']		= 'Ketamin';
lang_de['morphine']		= 'Morphium';
lang_de['heroin']		= 'Heroin';


lang_de['Diaper']			= 'Windel';
lang_de['Leather Jacket']		= 'Lederjacke';
lang_de['Shining body armor']		= 'Glänzende Rüstung';
lang_de['Body armor']			= 'Körperrüstung';
lang_de['Nano Fiber Combat Jacket']	= 'Sehr gute Jacke';
lang_de['Nomex plated armor']		= 'Nomax besetzte Rüstung';




// RO

var lang_ro = new Array();

lang_ro['weed']			= 'Weed';
lang_ro['painkillers']		= 'Painkillers';
lang_ro['booze']		= 'Booze';
lang_ro['magic mushrooms'] 	= 'Magic mushrooms';
lang_ro['hash']			= 'Hasis';
lang_ro['lsd']			= 'LSD';
lang_ro['ghb']			= 'GHB';
lang_ro['ecstacy']		= 'Ecstasy';
lang_ro['opium']		= 'Opium';
lang_ro['amphetamine']		= 'Amfetamina';
lang_ro['cocaine']		= 'Cocaina';
lang_ro['special k']		= 'Special K';
lang_ro['morphine']		= 'Morfina';
lang_ro['heroin']		= 'Heroina';


lang_ro['Diaper']			= 'Scutec';
lang_ro['Leather Jacket']		= 'Jaketa Piele';
lang_ro['Shining body armor']		= 'Armura de corp stralucitoare';
lang_ro['Body armor']			= 'Armura de Corp';
lang_ro['Nano Fiber Combat Jacket']	= 'Jaketa Nano Fibra';
lang_ro['Nomex plated armor']		= 'Armura Nomex';




// LT

var lang_lt = new Array();

lang_lt['weed']			= 'Žolė';
lang_lt['painkillers']		= 'Vaistai';
lang_lt['booze']		= 'Gėralas';
lang_lt['magic mushrooms'] 	= 'Magiški grybai';
lang_lt['hash']			= 'Hašas';
lang_lt['lsd']			= 'LSD';
lang_lt['ghb']			= 'GHB';
lang_lt['ecstacy']		= 'Ratai';
lang_lt['opium']		= 'Opijus';
lang_lt['amphetamine']		= 'Amfa';
lang_lt['cocaine']		= 'Kokainas';
lang_lt['special k']		= 'Ypatingasis K';
lang_lt['morphine']		= 'Morfijus';
lang_lt['heroin']		= 'Heroinas';


lang_lt['Diaper']			= 'Sauskelnės';
lang_lt['Leather Jacket']		= 'Odinis švarkas';
lang_lt['Shining body armor']		= 'Blizgantys kūno šarvai';
lang_lt['Body armor']			= 'Kūno šarvai';
lang_lt['Nano Fiber Combat Jacket']	= 'Kovinis švarkas';	
lang_lt['Nomex plated armor']		= 'Farų apranga';




// EL

var lang_el = new Array();

lang_el['weed']			= 'Χόρτο';
lang_el['painkillers']		= 'Παυσίπονα';
lang_el['booze']		= 'Οινόπνευμα';
lang_el['magic mushrooms'] 	= 'Μανιτάρια';
lang_el['hash']			= 'Χασίς';
lang_el['lsd']			= 'LSD';
lang_el['ghb']			= 'GHB';
lang_el['ecstacy']		= 'Ecstacy';
lang_el['opium']		= 'Όπιο';
lang_el['amphetamine']		= 'Αμφεταμίνες';
lang_el['cocaine']		= 'Κοκαΐνη';
lang_el['special k']		= 'Σπέσιαλ Κ';
lang_el['morphine']		= 'Μορφίνη';
lang_el['heroin']		= 'Πρέζα';


lang_el['Diaper']			= 'Πάνα';
lang_el['Leather Jacket']		= 'Πέτσινο μπουφάν';
lang_el['Shining body armor']		= 'Πανοπλία αρχαίου Έλληνα';
lang_el['Body armor']			= 'Αλεξίσφαιρο γιλέκο';
lang_el['Nano Fiber Combat Jacket']	= 'Μπουφάν μάχης με νανο-ίνες';
lang_el['Nomex plated armor']		= 'Θωράκιση Nomex';




// NO

var lang_no = new Array();

lang_no['weed']			= 'Fyrings';
lang_no['painkillers']		= 'Smertestillende';
lang_no['booze']		= 'Sprit';
lang_no['magic mushrooms'] 	= 'Fleinsopp';
lang_no['hash']			= 'hasj';
lang_no['lsd']			= 'LSD';
lang_no['ghb']			= 'GhB';
lang_no['ecstacy']		= 'Ecstacy';
lang_no['opium']		= 'Opium';
lang_no['amphetamine']		= 'Amfetamin';
lang_no['cocaine']		= 'Kokain';
lang_no['special k']		= 'Valium';
lang_no['morphine']		= 'Morfin';
lang_no['heroin']		= 'Heroin';


lang_no['Diaper']			= 'Bleie';
lang_no['Leather Jacket']		= 'Lær jakke';
lang_no['Shining body armor']		= 'Skinnende rustning';
lang_no['Body armor']			= 'Skuddsikker vest';
lang_no['Nano Fiber Combat Jacket']	= 'Nano fiber Krigs jakke';
lang_no['Nomex plated armor']		= 'Nomex pansret beskyttelse';




// Fix arabic




// IT

var lang_it = new Array();

lang_it['weed']			= 'Erba';
lang_it['painkillers']		= 'Analgesico';
lang_it['booze']		= 'Birra';
lang_it['magic mushrooms'] 	= 'Funghi magici';
lang_it['hash']			= 'Hash';
lang_it['lsd']			= 'LSD';
lang_it['ghb']			= 'GHB';
lang_it['ecstacy']		= 'Ecstasy';
lang_it['opium']		= 'Oppio';
lang_it['amphetamine']		= 'Anfetamina';
lang_it['cocaine']		= 'Cocaina';
lang_it['special k']		= 'Special K';
lang_it['morphine']		= 'Morfina';
lang_it['heroin']		= 'Eroina';


lang_it['Diaper']			= 'Pannolino';
lang_it['Leather Jacket']		= 'Giubbino di pelle';
lang_it['Shining body armor']		= 'Armatura';
lang_it['Body armor']			= 'Giubbino Antiproiettili';
lang_it['Nano Fiber Combat Jacket']	= 'Giubbotto antiproiettili Nano Fiber';
lang_it['Nomex plated armor']		= 'Giubbotto Antiproiettili Nomex';




// RU

var lang_ru = new Array();

lang_ru['weed']			= 'Табак';
lang_ru['painkillers']		= 'Болеутоляющее';
lang_ru['booze']		= 'Спиртное';
lang_ru['magic mushrooms'] 	= 'Волшебные грибки';
lang_ru['hash']			= 'Мешанина';
lang_ru['lsd']			= 'ЛСД';
lang_ru['ghb']			= 'ГХБ';
lang_ru['ecstacy']		= 'Экстази';
lang_ru['opium']		= 'Опиум';
lang_ru['amphetamine']		= 'Амфетамин';
lang_ru['cocaine']		= 'Кокаин';
lang_ru['special k']		= 'Специальный K';
lang_ru['morphine']		= 'Морфий';
lang_ru['heroin']		= 'Героин';


lang_ru['Diaper']			= 'Подгузник';
lang_ru['Leather Jacket']		= 'Кожанная куртка';
lang_ru['Shining body armor']		= 'Блестящий бронежелет';
lang_ru['Body armor']			= 'Бронежелет';
lang_ru['Nano Fiber Combat Jacket']	= 'Бойцовская куртка';
lang_ru['Nomex plated armor']		= 'Форма Фаров';




// BR

var lang_br = new Array();

lang_br['weed']			= 'Maconha';	
lang_br['painkillers']		= 'Analgésicos';
lang_br['booze']		= 'Cerva';
lang_br['magic mushrooms'] 	= 'Cogumelos Alucinógenos';
lang_br['hash']			= 'Hash';
lang_br['lsd']			= 'LSD';
lang_br['ghb']			= 'GHB';
lang_br['ecstacy']		= 'Ecstacy';
lang_br['opium']		= 'Ópio';
lang_br['amphetamine']		= 'Anfetamina';
lang_br['cocaine']		= 'Cocaína';
lang_br['special k']		= 'Special K';
lang_br['morphine']		= 'Morfina';
lang_br['heroin']		= 'Heroína';


lang_br['Diaper']			= 'Fraldinha';
lang_br['Leather Jacket']		= 'Jaqueta de couro';
lang_br['Shining body armor']		= 'Colete brilhante metálico';
lang_br['Body armor']			= 'Colete corporal';
lang_br['Nano Fiber Combat Jacket']	= 'Jaqueta Nano de fibra';
lang_br['Nomex plated armor']		= 'Colete Nomex de Aço';




// TR

var lang_tr = new Array();

lang_tr['weed']			= 'Ot';
lang_tr['painkillers']		= 'Aspirin';
lang_tr['booze']		= 'İçki';
lang_tr['magic mushrooms'] 	= 'Mantar';
lang_tr['hash']			= 'Esrar';
lang_tr['lsd']			= 'LSD';
lang_tr['ghb']			= 'Gamma Hidroksibütrik asit (GHB)';
lang_tr['ecstacy']		= 'Ecstacy';
lang_tr['opium']		= 'Afyon';
lang_tr['amphetamine']		= 'Amfetamin';
lang_tr['cocaine']		= 'Kokain';
lang_tr['special k']		= 'Ketamin(Special K)';
lang_tr['morphine']		= 'Morfin';
lang_tr['heroin']		= 'Eroin';


lang_tr['Diaper']			= 'Bez';
lang_tr['Leather Jacket']		= 'Deri ceket';
lang_tr['Shining body armor']		= 'Parlak Zırh';
lang_tr['Body armor']			= 'Kurşun Geçirmez Yelek';
lang_tr['Nano Fiber Combat Jacket']	= 'Nano Fiber Savaş Ceketi';
lang_tr['Nomex plated armor']		= 'Nomex kaplı zırh';




// ID

var lang_id = new Array();

lang_id['weed']			= 'Ganja';	
lang_id['painkillers']		= 'Painkillers';
lang_id['booze']		= 'Topi Miring';	
lang_id['magic mushrooms'] 	= 'Jamur gaib';
lang_id['hash']			= 'Hash';
lang_id['lsd']			= 'LSD';
lang_id['ghb']			= 'GHB';
lang_id['ecstacy']		= 'Inex';
lang_id['opium']		= 'Opium';
lang_id['amphetamine']		= 'Amphetamine';
lang_id['cocaine']		= 'Kokain';
lang_id['special k']		= 'Spesial K';
lang_id['morphine']		= 'Morpin';
lang_id['heroin']		= 'Heroin';


lang_id['Diaper']			= 'Popok';
lang_id['Leather Jacket']		= 'Jaket kulit';
lang_id['Shining body armor']		= 'Baju pelindung kinclong';
lang_id['Body armor']			= 'Baju pelindung tubuh';
lang_id['Nano Fiber Combat Jacket']	= 'Jaket Tempur Nano Fiber';
lang_id['Nomex plated armor']		= 'Baju pelindung Nomex';




// AL

var lang_al = new Array();

lang_al['weed']			= 'Weed';
lang_al['painkillers']		= 'Painkillers';
lang_al['booze']		= 'Booze';
lang_al['magic mushrooms'] 	= 'Magic mushrooms';
lang_al['hash']			= 'Tasjebab';
lang_al['lsd']			= 'LSD';
lang_al['ghb']			= 'GHB';
lang_al['ecstacy']		= 'Ecstacy';
lang_al['opium']		= 'Opium';
lang_al['amphetamine']		= 'Amphetamine';
lang_al['cocaine']		= 'Cocaine';
lang_al['special k']		= 'Special K';
lang_al['morphine']		= 'Morfine';
lang_al['heroin']		= 'Heroin';


lang_al['Diaper']			= 'Bebelino';
lang_al['Leather Jacket']		= 'Xhakete lekure';
lang_al['Shining body armor']		= 'Mbrojtese ilire';
lang_al['Body armor']			= 'Mbrojtese kundra plumb';
lang_al['Nano Fiber Combat Jacket']	= 'Xhakete beteje me fije fibri';
lang_al['Nomex plated armor']		= 'Mbrojtese nomex e kromuar';




// LV

var lang_lv = new Array();

lang_lv['weed']			= 'Zāle';
lang_lv['painkillers']		= 'Tabletes';
lang_lv['booze']		= 'Šņabis';
lang_lv['magic mushrooms'] 	= 'Maģiskās sēnes';
lang_lv['hash']			= 'Hašs';
lang_lv['lsd']			= 'LSD';
lang_lv['ghb']			= 'GHB';
lang_lv['ecstacy']		= 'Ekstazī tabletes';
lang_lv['opium']		= 'Opijs';
lang_lv['amphetamine']		= 'Amfetamīns';
lang_lv['cocaine']		= 'Kokaīns';
lang_lv['special k']		= 'Speciālais K';
lang_lv['morphine']		= 'Vitja';
lang_lv['heroin']		= 'Heroīns';


lang_lv['Diaper']			= 'Autiņi';
lang_lv['Leather Jacket']		= 'Ādas jaka';
lang_lv['Shining body armor']		= 'Spīdošas ķermeņa bruņas';
lang_lv['Body armor']			= 'Ķermeņa bruņas';
lang_lv['Nano Fiber Combat Jacket']	= 'Nano šķiedru kaujas jaka';
lang_lv['Nomex plated armor']		= 'Nomex plākšņu bruņas';




// AT

var lang_at = new Array();

lang_at['weed']			= 'Gras';
lang_at['painkillers']		= 'Schmerztabletten';
lang_at['booze']		= 'Bier';
lang_at['magic mushrooms'] 	= 'Pilze';
lang_at['hash']			= 'Hasch';
lang_at['lsd']			= 'LSD';
lang_at['ghb']			= 'GHB';
lang_at['ecstacy']		= 'XTC';
lang_at['opium']		= 'Opium';
lang_at['amphetamine']		= 'Amfetamine';
lang_at['cocaine']		= 'Koks';
lang_at['special k']		= 'Ketamin';
lang_at['morphine']		= 'Morphium';
lang_at['heroin']		= 'Heroin';


lang_at['Diaper']			= 'Windel';
lang_at['Leather Jacket']		= 'Lederjacke';
lang_at['Shining body armor']		= 'Rüstung';
lang_at['Body armor']			= 'Körperweste';
lang_at['Nano Fiber Combat Jacket']	= 'Nano';
lang_at['Nomex plated armor']		= 'Nomex';




// SK

var lang_sk = new Array();

lang_sk['weed']			= 'Ganja';
lang_sk['painkillers']		= 'Lieky';
lang_sk['booze']		= 'Chľast';
lang_sk['magic mushrooms'] 	= 'Halucinogénne hubičky';
lang_sk['hash']			= 'Hašiš';
lang_sk['lsd']			= 'LSD';
lang_sk['ghb']			= 'GHB';
lang_sk['ecstacy']		= 'Extáza';
lang_sk['opium']		= 'Ópium';
lang_sk['amphetamine']		= 'Amfetamín';
lang_sk['cocaine']		= 'Kokaín';
lang_sk['special k']		= 'Ketamín';
lang_sk['morphine']		= 'Morfium';
lang_sk['heroin']		= 'Heroín';


lang_sk['Diaper']			= 'Plienky';
lang_sk['Leather Jacket']		= 'Kožená vesta';
lang_sk['Shining body armor']		= 'Kovová zbroj';
lang_sk['Body armor']			= 'Celotelová zbroj';
lang_sk['Nano Fiber Combat Jacket']	= 'Bojová vesta z nanovlákien';
lang_sk['Nomex plated armor']		= 'Nomexová zbroj';




// FR

var lang_fr = new Array();

lang_fr['weed']			= 'Herbe';
lang_fr['painkillers']		= 'Pilules';
lang_fr['booze']		= 'Bière';
lang_fr['magic mushrooms'] 	= 'Champignons Hallucinogènes';
lang_fr['hash']			= 'Hashish';
lang_fr['lsd']			= 'LSD';
lang_fr['ghb']			= 'GHB';
lang_fr['ecstacy']		= 'Extasy';
lang_fr['opium']		= 'Opium';
lang_fr['amphetamine']		= 'Amphets';
lang_fr['cocaine']		= 'Coke';
lang_fr['special k']		= 'Special K';
lang_fr['morphine']		= 'Morphine';
lang_fr['heroin']		= 'Héro';


lang_fr['Diaper']			= 'Couche culotte';
lang_fr['Leather Jacket']		= 'Veste en cuir';
lang_fr['Shining body armor']		= 'Armure Métallique';
lang_fr['Body armor']			= 'Gilet pare-balles';
lang_fr['Nano Fiber Combat Jacket']	= 'Veste de Combat Nano-Fibres';
lang_fr['Nomex plated armor']		= 'Armure blindée';




// FI

var lang_fi = new Array();

lang_fi['weed']			= 'Ruoho';
lang_fi['painkillers']		= 'Särkylääkkeitä';
lang_fi['booze']		= 'Viina';
lang_fi['magic mushrooms'] 	= 'Kärpässieniä';
lang_fi['hash']			= 'Hasis';
lang_fi['lsd']			= 'LSD';
lang_fi['ghb']			= 'GHB';
lang_fi['ecstacy']		= 'Ekstaasi';
lang_fi['opium']		= 'Oopiumi';
lang_fi['amphetamine']		= 'Amfetamiini';
lang_fi['cocaine']		= 'Kokaiini';
lang_fi['special k']		= 'Erikois K';
lang_fi['morphine']		= 'Morphiini';
lang_fi['heroin']		= 'Heppa';


lang_fi['Diaper']			= 'Vaippa';
lang_fi['Leather Jacket']		= 'Nahkatakki';
lang_fi['Shining body armor']		= 'Kiiltävä wnb-suoja';
lang_fi['Body armor']			= 'Luotiliivi';
lang_fi['Nano Fiber Combat Jacket']	= 'Nano Kuitu KevlarTakki';
lang_fi['Nomex plated armor']		= 'Nomex luotiliivi';




// CS

var lang_cs = new Array();

lang_cs['weed']			= 'Weed';
lang_cs['painkillers']		= 'Bensedin';
lang_cs['booze']		= 'Pivo';
lang_cs['magic mushrooms'] 	= 'Magične pečurke';
lang_cs['hash']			= 'Hašiš';
lang_cs['lsd']			= 'LSD';
lang_cs['ghb']			= 'GHB';
lang_cs['ecstacy']		= 'Ekstazi';
lang_cs['opium']		= 'Opijum';
lang_cs['amphetamine']		= 'Amfetamin';
lang_cs['cocaine']		= 'Kokain';
lang_cs['special k']		= 'Special K';
lang_cs['morphine']		= 'Morfijum';
lang_cs['heroin']		= 'Heroin';


lang_cs['Diaper']			= 'Pelena';
lang_cs['Leather Jacket']		= 'Kožna Jakna';
lang_cs['Shining body armor']		= 'Sjajni Metalni Oklop';
lang_cs['Body armor']			= 'Pancir';
lang_cs['Nano Fiber Combat Jacket']	= 'Nano Fiber Borbena Jakna';
lang_cs['Nomex plated armor']		= 'Nomeks Zaštitno Odelo';




// Fix CN




// MS

var lang_ms = new Array();

lang_ms['weed']			= 'Ganja';
lang_ms['painkillers']		= 'Ubat tahan sakit';
lang_ms['booze']		= 'Arak';
lang_ms['magic mushrooms'] 	= 'Cendawan silap mata';
lang_ms['hash']			= 'Hash';
lang_ms['lsd']			= 'LSD';
lang_ms['ghb']			= 'GHB';
lang_ms['ecstacy']		= 'Pil Khayal';
lang_ms['opium']		= 'Candu';
lang_ms['amphetamine']		= 'Amphetamin';
lang_ms['cocaine']		= 'Kokain';
lang_ms['special k']		= 'Special K';
lang_ms['morphine']		= 'Morfin';
lang_ms['heroin']		= 'Heroin';


lang_ms['Diaper']			= 'Lampin';
lang_ms['Leather Jacket']		= 'Jaket kulit';
lang_ms['Shining body armor']		= 'Baju perisai berkilat';
lang_ms['Body armor']			= 'Baju perisai';
lang_ms['Nano Fiber Combat Jacket']	= 'Jaket Tempur Serat Nano';
lang_ms['Nomex plated armor']		= 'Baju perisai nomex';




//BG

var lang_bg = new Array();

lang_bg['weed']			= 'Трева';
lang_bg['painkillers']		= 'Болкоуспокояващи';
lang_bg['booze']		= 'Пиене';
lang_bg['magic mushrooms'] 	= 'Магически гъбки';
lang_bg['hash']			= 'Hash';
lang_bg['lsd']			= 'LSD';
lang_bg['ghb']			= 'GHB';
lang_bg['ecstacy']		= 'Екстази';
lang_bg['opium']		= 'Опиум';
lang_bg['amphetamine']		= 'Амфетамин';
lang_bg['cocaine']		= 'Кокаин';
lang_bg['special k']		= 'Special K';
lang_bg['morphine']		= 'Morphine';
lang_bg['heroin']		= 'Хероин';


lang_bg['Diaper']			= 'Памперс';
lang_bg['Leather Jacket']		= 'Кожено яке';
lang_bg['Shining body armor']		= 'Лъскава броня';
lang_bg['Body armor']			= 'Бронежилетка';
lang_bg['Nano Fiber Combat Jacket']	= 'Нанофибрично бойно яке';
lang_bg['Nomex plated armor']		= 'Боен костюм';




//Fix IL




//NL

var lang_nl = new Array();

lang_nl['weed']			= 'Weed';
lang_nl['painkillers']		= 'Painkillers';
lang_nl['booze']		= 'Booze';
lang_nl['magic mushrooms'] 	= 'Magic mushrooms';
lang_nl['hash']			= 'Hash';
lang_nl['lsd']			= 'LSD';
lang_nl['ghb']			= 'GHB';
lang_nl['ecstacy']		= 'Ecstacy';
lang_nl['opium']		= 'Opium';
lang_nl['amphetamine']		= 'Amphetamine';
lang_nl['cocaine']		= 'Cocaine';
lang_nl['special k']		= 'Special K';
lang_nl['morphine']		= 'Morphine';
lang_nl['heroin']		= 'Heroïne';


lang_nl['Diaper']			= 'Luier';
lang_nl['Leather Jacket']		= 'Lederen Jas';
lang_nl['Shining body armor']		= 'Glimmende kogelvrije vest';
lang_nl['Body armor']			= 'Kogelvrije vest';
lang_nl['Nano Fiber Combat Jacket']	= 'Nano Fiber Combat Jacket';
lang_nl['Nomex plated armor']		= 'Nomex plated armor';




// The only way I could find the language was in the cookie
var tc_lang = document.cookie.split('tc_lang=')[1].split(';')[0];


// Set Language
switch(tc_lang){
	
	case 'GB':
		language = lang_gb;
	break;

	case 'SE':
		language = lang_se;
	break;


	case 'PL':
		language = lang_pl;
	break;

	case 'ES':
		language = lang_es;
	break;

	case 'PT':
		language = lang_pt;
	break;

	case 'SI':
		language = lang_si;
	break;

	case 'CZ':
		language = lang_cz;
	break;

	case 'DE':
		language = lang_de;
	break;

	case 'RO':
		language = lang_ro;
	break;

	case 'LT':
		language = lang_lt;
	break;

	case 'EL':
		language = lang_el;
	break;

	case 'NO':
		language = lang_no;
	break;

/*
	case 'AR':
		break; */

	case 'IT':
		language = lang_it;
	break;

	case 'RU':
		language = lang_ru;
	break;

	case 'BR':
		language = lang_br;
	break;

	case 'TR':
		language = lang_tr;
	break;

	case 'ID':
		language = lang_id;
	break;

	case 'AL':
		language = lang_al;
	break;

	case 'LV':
		language = lang_lv;
	break;

	case 'AT':
		language = lang_at;
	break;

	case 'SK':
		language = lang_sk;
	break;

	case 'FR':
		language = lang_fr;
	break;

	case 'FI':
		language = lang_fi;
	break;

	case 'CS':
		language = lang_cs;
	break;

/*	case 'CN':
		break;*/

	case 'MS':
		language = lang_ms;
	break;

	case 'BG':
		language = lang_bg;
	break;

	/*case 'IL':
		break;*/

	case 'NL':
		language = lang_nl;
	break;

	default: alert("Your language is'nt supported yet");
}

var Profile = new Profile();

var PageEngine = new PageEngine();

PageEngine.extractStats(language, Profile);

function PageEngine() {
	
	this.debug = false;

	
	getElementsByClass = function(searchClass,node,tag) {
		var classElements = new Array();
		if ( node == null )
			node = document;
		if ( tag == null )
		tag = '*';
		var els = node.getElementsByTagName(tag);
		var elsLen = els.length;
		var pattern = new RegExp("(^|\\\\s)"+searchClass+"(\\\\s|$)");
		for (i = 0, j = 0; i < elsLen; i++) {
			if ( pattern.test(els[i].className) ) {
				classElements[j] = els[i];
				j++;
			}
		}
		if(classElements[0]==null)
		return false;

		return classElements;
	}

	
	this.DeleteElement = function(element, index){
		if(typeof element == "string")
			element = document.getElementById(element)? document.getElementById(element) : getElementsByClass(element)[index];
	
		if(element)
			return element.parentNode.removeChild(element);
	}
	
	
	
	this.InsertBefore = function(newElement, referenceElement){

		referenceElement.parentNode.insertBefore(newElement, referenceElement);

	}

	this.InsertAfter = function(newElement, referenceElement){

		referenceElement.parentNode.insertBefore(newElement, referenceElement.nextSibling);

	}

	this.extractStats = function(language, profile){
	
		
		var content_right = document.getElementById('content_right');
		
		var player_info = getElementsByClass('menuyellowtext', content_right);
		
		
		
		if(player_info){
			var arms_info = document.getElementById("content_right").getElementsByTagName("li");
		
			profile.profesja = content_right.getElementsByTagName('a')[1].textContent;

			profile.playerName = player_info[0].innerHTML;		

			
			profile.stamina = parseInt(content_right.getElementsByTagName('td')[3].innerHTML.split('<')[0].split(':')[1]);
			profile.respect = parseInt(player_info[2].innerHTML);
			profile.cash = parseInt(player_info[7].innerHTML.substring(1).replace(/,/g, ''));		
	
		
			

			if (document.location.pathname=="/armsdealer.php" && document.location.toString().indexOf('section') == -1){
				GM_setValue(profile.playerName + "minDamage", 0);
				var info = getElementsByClass('nicktext');
				var min_Damage = parseInt(info[0].parentNode.parentNode.getElementsByTagName('td')[2].innerHTML);
				if(!min_Damage)
				min_Damage=0;
				GM_setValue(profile.playerName + "minDamage", min_Damage);
			}

			
			profile.weaponDamage = GM_getValue(profile.playerName + "minDamage");
			profile.armorNumber = GetArmor(arms_info[3].innerHTML.split('>')[1], language);
		
			
			profile.durability = parseInt(arms_info[2].innerHTML.split(':')[1]);
		
			
			profile.intelligence = parseInt(player_info[3].innerHTML);
			profile.charisma = parseInt(player_info[4].innerHTML);
			profile.strength = parseInt(player_info[5].innerHTML);
			profile.tolerance = parseInt(player_info[6].innerHTML);
		
			if(this.debug){
				alert("Player name: " + profile.playerName + 
					"\nStamina: " + profile.stamina + 
			 		"\nRespect:" + profile.respect + 
			  		"\nCash: " + profile.cash +
			   		"\n\nWeapon information" +
			    		"\nWeapon Damage: " + profile.weaponDamage + 
			     		"\nArmor Number: " + profile.armorNumber + 
			      		"\nDurability: " + profile.durability +
			       		"\n\nPlayerPower" +
					"\nIntelligence: " + profile.intelligence +
				 	"\nCharisma: " + profile.charisma +
				  	"\nStrength: " + profile.strength +
				   	"\nTolerance: " + profile.tolerance);
			}
		}
	}



	
	GetArmor = function(armor, language){
		switch(armor.toLowerCase()){
	
			case language['Diaper'].toLowerCase():
				return 1;
	
			case language['Leather Jacket'].toLowerCase():
				return 2;

			case language['Shining body armor'].toLowerCase():
				return 3;

			case language['Body armor'].toLowerCase():
				return 4;

			case language['Nano Fiber Combat Jacket'].toLowerCase():
				return 5;

			case language['Nomex plated armor'].toLowerCase():
				return 6;
		default: return 0;
		}
	}


   	
   	this.insertPowerIntoPage = function(profile) {
		
		var crimsMenuTable=document.getElementById("content_right");
      		
      		var menuTableEntries = crimsMenuTable.getElementsByTagName('table');

      		profile.calculatePower();

      		
		if (! menuTableEntries[4]) return null;
      		var trSolo = menuTableEntries[4].insertRow(-1);

      		var tdSolo = document.importNode(menuTableEntries[4].rows[0].childNodes[1],false);
		tdSolo.setAttribute("style","text-align: left");
		trSolo.appendChild(tdSolo);
      		var divSolo = document.createElement("div");
      		divSolo.textContent = "SoloPower" + ":";
      		tdSolo.appendChild(divSolo);
      		var spanSolo = document.createElement("span");
      		spanSolo.setAttribute("class","menuyellowtext");
      		spanSolo.textContent=profile.normalSoloPower.toFixed(2);
 
   		tdSolo.appendChild(spanSolo);
     
      		trSolo.parentNode.appendChild(tdSolo);
      		

		var tdFight = document.importNode(menuTableEntries[4].rows[0].childNodes[1],false);
		tdFight.setAttribute("style","text-align: left");
		trSolo.appendChild(tdFight);
		var divFight = document.createElement("div");
		divFight.textContent = "FightPower" + ":";
		tdFight.appendChild(divFight);
		var spanFight = document.createElement("span");
		spanFight.setAttribute("class","menuyellowtext");
		spanFight.textContent=profile.FightPower.toFixed(2);
		tdFight.appendChild(spanFight);

		trSolo.parentNode.appendChild(tdFight);

		var tdButton = document.importNode(menuTableEntries[4].rows[0].childNodes[1],false);
		tdButton.setAttribute("style","text-align: left; padding-top: 5px;");
		tdButton.innerHTML = '<a href="http://www.crimsteam.site90.net">My page</a>'; 
		trSolo.parentNode.appendChild(tdButton);
		return true;
		
   	}

	this.ChallengeAnyOne = function() {
		
		var oldButton = document.getElementById('content_middle').getElementsByTagName('table')[10].rows[0];
	 
		var newButton = oldButton.cloneNode(true);

		var id = document.location.toString().split('id=')[1];

		newButton.cells[1].innerHTML = "<a href='fightchat.php?action=challenge&victim_id=" + id +"'><img border='0' src='http://thecrims.cachefly.net/images/icons/warning_16x16.png'/></a>";
		newButton.cells[2].innerHTML = "<a href='fightchat.php?action=challenge&victim_id=" + id +"'>Challenge</a>";
			
		this.InsertBefore(newButton ,oldButton);

	}


   	
	this.colourRobberies = function(profile) {

      		
      		var selectEntries=document.getElementsByTagName('select');

      		
      		var idString="id";

      		for (i=0; i < selectEntries.length; i++) {
        		var optionEntries=selectEntries[i].getElementsByTagName('option');
         		var lastDoableOption = null;  // Maximum doable option given difficulty and stamina
         		var lastDoableOptionDifficulty = 0;
         		var maxCapableOption = null;  // Maximum option capable with current difficulty.
         		var maxCapableOptionDifficulty = 0;
         		var safePower = profile.safeSoloPower;
         		var normalPower = profile.normalSoloPower;
			var riskyPower = profile.riskySoloPower;
			var dangerPower = profile.dangerSoloPower;
	
         		
         		for (j=0; j < optionEntries.length; j++) {
            			if (optionEntries[j].getAttribute("value") != "-") {
               				var optionValue = idString + optionEntries[j].getAttribute("value");
               				var optionNodeString = document.getElementById(optionValue).textContent;

               				
               				var optionDifficulty = parseInt(optionNodeString.split(':')[2].split('<')[0]);

               				
               				var optionStamina = (idString=="idgang")?30:parseInt(optionNodeString.split(':')[1].split('<')[0]);
               				var style="";

               					
               					if (safePower < optionDifficulty) {
                  					if (normalPower >= optionDifficulty)
								style+="color:yellow;";
							else
				                  	if (riskyPower >= optionDifficulty)
                     						style+="color:orange;";
							
							else
							if (dangerPower >= optionDifficulty)
                     						style+="color:#cc6600;";

							else
								style+="color:red;";
               					}
               
					
               				if (! style.match("color:red")) {
                  				
                  				if (profile.stamina < optionStamina) {
                     					style+="font-style: italic;";
                  				} else {
                     					style+="font-weight:bold;";
                     					
                     					if (normalPower >= optionDifficulty && optionDifficulty > lastDoableOptionDifficulty) {
                       						lastDoableOption = optionEntries[j];
                       						lastDoableOptionDifficulty = optionDifficulty;
                     					}
                  				}
               				}

        	       			
	               			if (optionDifficulty > maxCapableOptionDifficulty && normalPower >= optionDifficulty) {
                	 			maxCapableOption = optionEntries[j];
               					maxCapableOptionDifficulty = optionDifficulty;
               				}

	               			optionEntries[j].setAttribute("style",style);
        	    		}
         		}
         		
         		if (idString == "id" && lastDoableOption) {
            			lastDoableOption.selected = true;
				document.getElementById(idString+lastDoableOption.value).style.display = "block";
         		}
         	

		
         	maxCapableOption.textContent = "*" + maxCapableOption.textContent;
         	idString="idgang"





/* =========== Ten fragment kodu odpowiada za półautomatyczne wykonywanie rabunków pojedynczych =========== */ 


		if (profile.stamina>=10 && (document.getElementsByName('singlerobbery')[0].getElementsByTagName('input').length == 5))
       				document.getElementsByTagName('form')[0].submit(); 

		if (profile.stamina>=10 && document.getElementsByName('singlerobbery')[0].getElementsByTagName('input').length == 6){
			function check(){
			var t=setTimeout("document.getElementsByTagName('form')[0].submit()",1000);
			}		
			document.getElementsByName('singlerobbery')[0].getElementsByTagName('table')[0].getElementsByTagName('input')[0].focus();
			document.getElementsByName('code')[0].addEventListener("keypress",check,false)                            
		}



/* =========== Ten fragment kodu odpowiada za półautomatyczne wykonywanie rabunków grupowych =========== */

/*
		tabela = getElementsByClass('black_table');
		input = getElementsByClass('input',tabela[0]);	
		status = getElementsByClass('statusbox_ok');
		acc = document.getElementsByName('performgangcrime').length;	

		if(profile.stamina>=30){
			if(!tabela)
				var t=setTimeout('document.location.pathname="/robbery.php"', 4000);
			else if(tabela){
				forms = tabela[0].getElementsByTagName('form').length;
				if (input && forms==2){
					input[0].focus();
					function check(){
						var t=setTimeout("document.getElementsByTagName('form')[1].submit()",1000);
					}	
					document.getElementsByName('code')[1].addEventListener("keypress",check,false) 
				}	
			
				if (!input && forms==2)
					document.getElementsByTagName('form')[1].submit();

				if(acc == 1)
					document.getElementsByTagName('form')[1].submit();
			
				if(tabela && forms==0 && acc != 1)
					var t=setTimeout('document.location.pathname="/robbery.php"', 4000);
			
			} 
			
		}
	
		if(profile.stamina<30 && acc == 1)
			document.getElementsByTagName('form')[1].submit();
*/



	

		}
	}

	
   	this.insertBuildInfoIntoBuildingPage = function(profile) {

      		
		var blackTable = getElementsByClass('black_table')[1];

		
      		var numBuildings = 0;
      		var myBuildings = blackTable.rows;
      		
		for (i=1; i < myBuildings.length; i++) {
         		
         		var tdInfo = myBuildings[i].cells[1];
         		numBuildings += parseInt(tdInfo.textContent);
      		}

      		
      		var extraBuildings = Math.max(profile.getMaxBuildings() - numBuildings, 0);

      		var outputString1 = "You can support " + extraBuildings + " extra building(s)."
      		var outputString2 = "Need " +
                	profile.getIntTolNecessaryToNextBuilding(numBuildings) +
                	" more intelligence/tolerance to support another building.";

      		
      		var div = document.createElement("div");
      		div.setAttribute("align","center");

      		var span1 = document.createElement("span");
      		span1.setAttribute("class","menuyellowtext");
      		span1.textContent=outputString1;
      		div.appendChild(span1);
	
      		var br1 = document.createElement("br");
      		div.appendChild(br1);

      		var span2 = document.importNode(span1,false);
      		span2.textContent=outputString2;
      		div.appendChild(span2);

      		blackTable.parentNode.insertBefore(div,blackTable.previousSibling.previousSibling);
		return true;
   	}


   	this.insertEarningsIntoBuildingPage = function(profile) {
		var drugPrices = new Array('weed', 'booze', 'hash', 'booze', 'painkillers', 'magic mushrooms', 'weed', 'morphine', 'lsd', 'ecstacy', 'opium', 'ghb', 'special k', 'cocaine', 'amphetamine', 'heroin');
	      	
		var blackTable = getElementsByClass('black_table')[0];

		
      		var myBuildings = blackTable.rows;
		var earningTop = document.createElement('td');
		earningTop.innerHTML = "Earn/day";
		this.InsertBefore(earningTop, myBuildings[0].cells[4]);
      		
		for (i=1; i < myBuildings.length; i++) {

			
			for(var x=0; x < myBuildings[i].cells.length -1; x++){
				myBuildings[i].cells[x].noWrap = false;
			}
         		
         		var unitsDay = parseInt(myBuildings[i].cells[1].textContent);
			var costDay = parseInt(myBuildings[i].cells[3].textContent.substring(1).replace(/\s/g,''));
         		
			var earningDay = (GM_getValue(drugPrices[i-1]) * unitsDay) - costDay;
			
			var newCell = document.createElement('td');
			newCell.innerHTML = '$' + earningDay.toString();

			this.InsertBefore(newCell, myBuildings[i].cells[4]);
      		}
	}
	
	
	
	GetDrug = function(drug, language, translate){
	
		switch(drug.toLowerCase()){
	
			case language['weed'].toLowerCase():
				if(translate)
					return 'weed';
				return 1;
	
			case language['painkillers'].toLowerCase():
				if(translate)
					return 'painkillers';
				return 1;

			case language['booze'].toLowerCase():
				if(translate)
					return 'booze';
				return 2;

			case language['magic mushrooms'].toLowerCase():
				if(translate)
					return 'magic mushrooms';
				return 2;

			case language['hash'].toLowerCase():
				if(translate)
					return 'hash';
				return 3;

			case language['lsd'].toLowerCase():
				if(translate)
					return 'lsd';
				return 3;

			case language['ecstacy'].toLowerCase():
				if(translate)
					return 'ecstacy';
				return 4;

			case language['ghb'].toLowerCase():
				if(translate)
					return 'ghb';
				return 4;

			case language['opium'].toLowerCase():
				if(translate)
					return 'opium';
				return 5;

			case language['amphetamine'].toLowerCase():
				if(translate)
					return 'amphetamine';
				return 5;

			case language['special k'].toLowerCase():
				if(translate)
					return 'special k';
				return 7;

			case language['cocaine'].toLowerCase():
				if(translate)
					return 'cocaine';					
				return 7;

			case language['heroin'].toLowerCase():
				if(translate)
					return 'heroin';
				return 8;

			case language['morphine'].toLowerCase():
				if(translate)
					return 'morphine';
				return 8;
		}
	}
 
	
	this.InsertPanicButton = function (profile){
		var table = document.getElementById('content_middle').getElementsByTagName('table')[0];
		var imageHtmlbeta = '<img src="http://static.beta.thecrims.com/images/sections/raveparty/raveparty.jpg" class="imageborder" border="0">';
		var imageHtml = '<img src="http://thecrims.cachefly.net/images/sections/raveparty/raveparty.jpg" class="imageborder" border="0">';
		if (table.rows[0].cells[0].innerHTML == imageHtmlbeta || imageHtml)
			table.rows[0].cells[0].innerHTML ="<a href='/surgery.php'>"+ table.rows[0].cells[0].innerHTML+"</a>";
	}

	this.CheckIfPanic = function(){
		if(document.referrer.match('/surgery.php')==null && document.referrer.match('/hospital.php')==null){
			document.getElementById('avatar').value="1";
			document.getElementsByTagName('form')[0].submit();
			
		}
			
	}
 
	this.InsertMetadonButton = function (profile){

		var imageHTMLsrc = "http://thecrims.cachefly.net/images/sections/robbery/robbery.jpg";
		tabela1 = getElementsByClass('infotext')[0];
		if (getElementsByClass('content_style')[1].getElementsByTagName('img')[0].getAttribute('src') == imageHTMLsrc)
		tabela1.rows[0].cells[0].innerHTML = "<a href='/hospital.php'>"+tabela1.rows[0].cells[0].innerHTML+
		"</a>"; 

	}

	
	this.CheckIfMetadon = function(){
		if(document.referrer.match('/robbery.php')!=null)
		document.getElementsByTagName('form')[4].submit();
		if (getElementsByClass('statusbox_ok')[0].getElementsByTagName('td')[1].textContent.match('uzależnienie') == "uzależnienie")
                var t=setTimeout('document.location.pathname="/nightlife.php"',100);
               
	}


	this.ByStats = function(profile){
		if (document.location.pathname == '/start.php'){
			buy = document.getElementById('system_menu_left');
			links = document.createElement("a")
			links.setAttribute ("href", "/hospital.php");
			links.textContent = "B";
			buy.appendChild(links);
		}
	}


	this.CheckIfByStats = function(profile){
		if(document.referrer.match('/start.php')!=null && profile.intelligence < profile.maxstats)
		document.getElementsByTagName('form')[0].submit();
		if (getElementsByClass('statusbox_ok')[0].getElementsByTagName('td')[1].textContent.match('Czujesz') == "Czujesz" && profile.intelligence < profile.maxstats)
		document.getElementsByTagName('form')[0].submit();
		if (getElementsByClass('statusbox_ok')[0].getElementsByTagName('td')[1].textContent.match('Czujesz') == "Czujesz" && profile.charisma < profile.maxstats)
		document.getElementsByTagName('form')[1].submit();
	}


	this.Operka = function(profile){	
			operka = document.getElementById('system_menu_left');
			linkss = document.createElement("a")
			linkss.setAttribute ("href", "/surgery.php");
			linkss.setAttribute("style","margin-right: 5px")
			linkss.textContent = "Operka";
			operka.appendChild(linkss);
		
	}


   	this.populateDrugsValuesAtDealer = function (profile, language) {

		var roznica = 0;
			
      		var blackTable = getElementsByClass('black_table')[0];
      		var btRows = blackTable.rows;
      		
      		for (i = 1;i < btRows.length; i++) {
         		
         		var tdInfo = btRows[i].cells;
						
         		var cost = parseInt(tdInfo[1].textContent.substring(1).replace(/\s/g,''));
         		var drugsLeft = parseInt(tdInfo[2].textContent);
         		
			var effort = profile.cash/cost;
			var units;
			if(drugsLeft>effort)
         			units = Math.min(Math.floor( effort ) ,9999999);
			else
				units = Math.min(Math.floor( drugsLeft ) ,9999999);

         		
         		var inputInfo = tdInfo[3].getElementsByTagName("input");
			
         		inputInfo[4].setAttribute("value",units - roznica);

      		}

		trans = parseInt(getElementsByClass('infotext')[0].rows[0].cells[1].textContent.split('dziś')[1]);

/*1    	
		if (trans>0){
			if(parseInt(btRows[1].cells[3].getElementsByTagName('input')[4].value)>1 && parseInt(profile.stamina)>=5){
				document.getElementsByTagName('form')[0].submit();}
				else{document.location.pathname="/drugdealer.php";}
		}
*/		
	
/*2
     		if (trans>0){
			if(parseInt(btRows[2].cells[3].getElementsByTagName('input')[4].value)>1 && parseInt(profile.stamina)>=5){
				document.getElementsByTagName('form')[1].submit();}
				else{document.location.pathname="/drugdealer.php";}
		}	
*/

/*3 
     		if (trans>0){
			if(parseInt(btRows[3].cells[3].getElementsByTagName('input')[4].value)>1 && parseInt(profile.stamina)>=5){
				document.getElementsByTagName('form')[2].submit();}
				else{document.location.pathname="/drugdealer.php";}
		}	
*/

/*4 
     		if (trans>0){
			if(parseInt(btRows[4].cells[3].getElementsByTagName('input')[4].value)>1 && parseInt(profile.stamina)>=5){
				document.getElementsByTagName('form')[3].submit();}
				else{document.location.pathname="/drugdealer.php";}
		}	
*/

/*5 	
     		if (trans>0){
			if(parseInt(btRows[5].cells[3].getElementsByTagName('input')[4].value)>1 && parseInt(profile.stamina)>=5){
				document.getElementsByTagName('form')[4].submit();}
				else{document.location.pathname="/drugdealer.php";}
		}	
*/	

/*6 
     		if (trans>0){
			if(parseInt(btRows[6].cells[3].getElementsByTagName('input')[4].value)>1 && parseInt(profile.stamina)>=5){
				document.getElementsByTagName('form')[5].submit();}
				else{document.location.pathname="/drugdealer.php";}
		}	
*/

/*7 
     		if (trans>0){
			if(parseInt(btRows[7].cells[3].getElementsByTagName('input')[4].value)>1 && parseInt(profile.stamina)>=5){
				document.getElementsByTagName('form')[6].submit();}
				else{document.location.pathname="/drugdealer.php";}
		}	
*/

/*8 
     		if (trans>0){
			if(parseInt(btRows[8].cells[3].getElementsByTagName('input')[4].value)>1 && parseInt(profile.stamina)>=5){
				document.getElementsByTagName('form')[7].submit();}
				else{document.location.pathname="/drugdealer.php";}
		}	
*/

/*9
     		if (trans>0){
			if(parseInt(btRows[9].cells[3].getElementsByTagName('input')[4].value)>1 && parseInt(profile.stamina)>=5){
				document.getElementsByTagName('form')[8].submit();}
				else{document.location.pathname="/drugdealer.php";}
		}	
*/

/*10 
     		if (trans>0){
			if(parseInt(btRows[10].cells[3].getElementsByTagName('input')[4].value)>1 && parseInt(profile.stamina)>=5){
				document.getElementsByTagName('form')[9].submit();}
				else{document.location.pathname="/drugdealer.php";}
		}	
*/

/*11 
     		if (trans>0){
			if(parseInt(btRows[11].cells[3].getElementsByTagName('input')[4].value)>1 && parseInt(profile.stamina)>=5){
				document.getElementsByTagName('form')[10].submit();}
				else{document.location.pathname="/drugdealer.php";}
		}	
*/

/*12 
     		if (trans>0){
			if(parseInt(btRows[12].cells[3].getElementsByTagName('input')[4].value)>1 && parseInt(profile.stamina)>=5){
				document.getElementsByTagName('form')[11].submit();}
				else{document.location.pathname="/drugdealer.php";}
		}	
*/

/*13 
     		if (trans>0){
			if(parseInt(btRows[13].cells[3].getElementsByTagName('input')[4].value)>1 && parseInt(profile.stamina)>=5){
				document.getElementsByTagName('form')[12].submit();}
				else{document.location.pathname="/drugdealer.php";}
		}	
*/

/*14 
     		if (trans>0){
			if(parseInt(btRows[14].cells[3].getElementsByTagName('input')[4].value)>1 && parseInt(profile.stamina)>=5){
				document.getElementsByTagName('form')[13].submit();}
				else{document.location.pathname="/drugdealer.php";}
		}	
*/

   	}


   	this.populateBuyDrugsValues = function (profile, language) {

		var table = getElementsByClass('black_table')[0];
                var imageHTML = 'Ulubione';
		if (table.rows[0].cells[0].innerHTML == imageHTML)
                document.getElementsByTagName('form')[1].submit();

				
      		var blackTable = getElementsByClass('black_table')[0];

                
      		var btRows = blackTable.getElementsByTagName("tr");
      		
      		for (i = 1;i < btRows.length; i++) {
         		
         		var tdInfo = btRows[i].getElementsByTagName("td");
			
			var drug = GetDrug(tdInfo[0].textContent.toLowerCase(), language);
			
         		var cost = parseInt(tdInfo[1].textContent.substring(1).replace(/\s/g,''));
         		
         		var units = Math.min(Math.floor( (100 - profile.stamina)/drug) ,99);

         		
         		var inputInfo = tdInfo[2].getElementsByTagName("input");
         		if (inputInfo.length == 5 && inputInfo[3].getAttribute("type") != "text")
            			return false;
			
         		inputInfo[4].setAttribute("value",units);

			if (profile.stamina<10)
       				document.getElementsByTagName('form')[0].submit();
                        if (profile.stamina>65 && profile.stamina<85){
				if (GetDrug(tdInfo[0].textContent.toLowerCase(), language, true) == 'weed'){
					inputInfo[4].setAttribute("value",60);
				}
				else if (GetDrug(tdInfo[0].textContent.toLowerCase(), language, true) == 'painkillers'){
					inputInfo[4].setAttribute("value",60);
				}
				else if (GetDrug(tdInfo[0].textContent.toLowerCase(), language, true) == 'booze'){
					inputInfo[4].setAttribute("value",30);
				}
				else if (GetDrug(tdInfo[0].textContent.toLowerCase(), language, true) == 'magic mushrooms'){
					inputInfo[4].setAttribute("value",30);
				}
				else if (GetDrug(tdInfo[0].textContent.toLowerCase(), language, true) == 'lsd'){
					inputInfo[4].setAttribute("value",20);
				}
				else if (GetDrug(tdInfo[0].textContent.toLowerCase(), language, true) == 'hash'){
					inputInfo[4].setAttribute("value",20);
				}
				else if (GetDrug(tdInfo[0].textContent.toLowerCase(), language, true) == 'ghb'){
					inputInfo[4].setAttribute("value",15);
				}
				else if (GetDrug(tdInfo[0].textContent.toLowerCase(), language, true) == 'ecstacy'){
					inputInfo[4].setAttribute("value",15);
				}
				else if (GetDrug(tdInfo[0].textContent.toLowerCase(), language, true) == 'opium'){
					inputInfo[4].setAttribute("value",12);
				}
				else if (GetDrug(tdInfo[0].textContent.toLowerCase(), language, true) == 'amphetamine'){
					inputInfo[4].setAttribute("value",12);
				}
				else if (GetDrug(tdInfo[0].textContent.toLowerCase(), language, true) == 'specjal k'){
					inputInfo[4].setAttribute("value",8);
				}
				else if (GetDrug(tdInfo[0].textContent.toLowerCase(), language, true) == 'morphine'){
					inputInfo[4].setAttribute("value",7);
				}
				else if (GetDrug(tdInfo[0].textContent.toLowerCase(), language, true) == 'cocaine'){
					inputInfo[4].setAttribute("value",4);
				}
				else if (GetDrug(tdInfo[0].textContent.toLowerCase(), language, true) == 'heroin'){
				}
					document.getElementsByTagName('form')[0].submit();
			}
			if (profile.stamina>85 && profile.stamina<99)
				document.getElementsByTagName('form')[0].submit();
			if (profile.stamina>=99)
                        	document.location.pathname="/robbery.php";

      		}
      		return true;
	}

		
	
   	this.populateBuyStatValues = function (profile) {

		var pos = new Array();
		pos[0] = profile.intelligence;
		pos[1] = profile.charisma
		pos[2] = profile.tolerance
		pos[3] = profile.strength
		
      				
      		var blackTable = getElementsByClass('black_table')[0];
      		var btRows = blackTable.getElementsByTagName("tr");
      		
      		for (i = 1, j = 0; i < btRows.length; i++) {
         		
         		var tdInfo = btRows[i].getElementsByTagName("td");
         		var cost = parseInt(tdInfo[2].textContent.substring(1).replace(/\s/g,''));
         		
         		var units = Math.min(Math.floor(profile.maxstats - pos[j]),99);
         		
         		var inputInfo = tdInfo[3].getElementsByTagName("input");
         		if (inputInfo.length == 5 && inputInfo[3].getAttribute("type") != "text")
            			return false;
			
			if(i !== 5)
         			inputInfo[4].setAttribute("value",units);
			else
				inputInfo[4].setAttribute("value",1);
			j++
      		}
      		return true;
	}

	
   	this.insertBuildInfoIntoHospitalPage = function(profile) {
      		
      		var tables=document.getElementsByTagName("table");
      		for(i=tables.length-1; i >= 0; i--)
        		if (tables[i].getAttribute("class") == "black_table")
	          	 	break;

      		if (i == -1)
         		return false; // did not find the table.

      		var blackTable = tables[i];

      		
      		var outputString = "Need " +
                    profile.getIntTolNecessaryToNextBuilding(0) +
                      " more intelligence/tolerance to increase building limit.";

      		
      		var div = document.createElement("div");
      		div.setAttribute("align","center");
      		var br = document.createElement("br");
      		var span = document.createElement("span");
      		span.setAttribute("class","menuyellowtext");
      		span.textContent=outputString;
      		div.appendChild(span);
      		blackTable.parentNode.insertBefore(div,blackTable.nextSibling.nextSibling);
      		blackTable.parentNode.insertBefore(br,div);
      		return true;
	}

	
	
	this.insertErrorBox = function (text){
		var table = document.createElement("table");
      		table.setAttribute("class","statusbox_error");
		table.setAttribute("width", "100%");
		
		var tr = table.insertRow(0);
		var tdImg = document.createElement('td');
		tr.appendChild(tdImg);

		tdImg.innerHTML = "<img style='margin: 2px 10px 2px 2px;' src='http://static.beta.thecrims.com/images/icons/forbidden.gif'/>";

		var tdMessage = document.createElement('td');
		tdMessage.textContent = text;
		
		tr.appendChild(tdMessage);


		this.InsertBefore(table, document.getElementsByTagName("form")[0]);
	}
	
	this.CheckDurability = function (profile){
		if(profile.durability < 100)
			this.insertErrorBox("Warning your weapon is broken!");

	}

	this.insertCalculator = function (profile, language){
		this.profile = profile;
			
      		var blackTable = getElementsByClass('black_table')[0];
		
		
		var table = document.createElement("table");
		
		table.setAttribute("class", "black_table");

      		var trTop = table.insertRow(0);
		trTop.setAttribute("class","black_table_top");
			
		var tdArmorTop = document.createElement("td");
		tdArmorTop.textContent ="Armor";

		trTop.appendChild(tdArmorTop);

		var weaponDamageTop = document.createElement("td");
		weaponDamageTop.textContent = "Weapon Damage";		

		trTop.appendChild(weaponDamageTop);



      		var trContent = table.insertRow(1);

		var tdArmor = document.createElement("td");
		trContent.appendChild(tdArmor);		

      		var select = document.createElement("select");
		select.setAttribute("id", "armor");

		select.options[0]=new Option('[Choose...]',				0, false, false);
		select.options[1]=new Option(language['Diaper'], 			1, false, false);
		select.options[2]=new Option(language['Leather Jacket'], 		2, false, false);
		select.options[3]=new Option(language['Shining body armor'], 		3, false, false);
		select.options[4]=new Option(language['Body armor'], 			4, false, false);
		select.options[5]=new Option(language['Nano Fiber Combat Jacket'], 	5, false, false);
		select.options[6]=new Option(language['Nomex plated armor'], 		6, false, false);
		select.options[profile.armorNumber].selected = true;

   		tdArmor.appendChild(select);
     
      		var tdWeapon = document.createElement("td");

		trContent.appendChild(tdWeapon);

		var Weapon = document.createElement("input");
		Weapon.setAttribute("type", "text");
		Weapon.setAttribute("id", "weapon");
		Weapon.setAttribute("value", profile.weaponDamage);

		tdWeapon.appendChild(Weapon);

		var tdCalc = document.createElement("td");
		trContent.appendChild(tdCalc);

		var calcButton = document.createElement("input");

		calcButton.setAttribute("type", "submit");
		calcButton.setAttribute("value", "Calc");
		calcButton.setAttribute("id", "Calc");

		tdCalc.appendChild(calcButton);

		this.InsertBefore(table, blackTable);
		
	}

	this.getDrugPrices = function (language){

      						
      		var blackTable = getElementsByClass('black_table')[0];

      		var btRows = blackTable.getElementsByTagName("tr");
      		
      		for (i = 1;i < btRows.length; i++) {
         		
         		var tdInfo = btRows[i].cells;
			var drugName = tdInfo[0].textContent.toLowerCase();
         		var cost = parseInt(tdInfo[1].textContent.substring(1).replace(/\s/g,''));
			GM_setValue(GetDrug(drugName, language, true) ,cost);
			

      		}
      		return true;
		
	}

	
   	this.insertBribeIntoPrisonPage = function(profile) {
      		
      		var bribeTextbox = document.getElementById('bribe');
      		if (bribeTextbox != null)
         		bribeTextbox.setAttribute("value",profile.getBribe());

      		return;
   	}


	this.SetUnlimitedOffset = function () {
	
		var currentOffset = parseInt(document.location.toString().split('offset=')[1]);
		var temp = 0;
		var count = 0;
		for( i=0; l=document.links[i]; i++ ){

			if( l.href.match( "offset" ) ){
				offsetLink = parseInt(l.href.split('offset=')[1]);
				if(currentOffset == 180)
					this.DeleteElement(l.parentNode.getElementsByTagName('b')[1]);
				if(currentOffset > 160){	
					if(temp > 0){	// currentOffset / (page number - 1)
						newoffsetText = (currentOffset / 20) + count -1;//+ parseInt(l.innerHTML);
						newoffset = newoffsetText * 20;
						l.href = l.href.replace( offsetLink, newoffset );
						if(newoffset == currentOffset)
							l.innerHTML = "<b style='color: #FFFFFF'>" + newoffsetText + "</b>";
						else
							l.innerHTML = newoffsetText;
						count++;
					}
					temp++;
				}
			}
		}
	}

}

function Profile() {	

	this.playerName = null;
	// Accuracy	-	http://forum.thecrims.com/showthread.php?t=667
	// var accuracy = new Array(8, 4, 6, 4, 5, 4, 6, 6, 3, 5, 8, 10, 6, 5, 7, 7, 4, 6);
	//this.weaponNumber = null;
	this.weaponDamage = 0;
	armorTolerance = new Array(0, 8, 32, 120, 400, 1200, 2000);
	this.armorNumber = 0;
	this.durability = null;

	// Stats
	this.respect = 0;
	this.cash = 0;
	this.stamina = 0;
	
	// Power
	this.intelligence = 0;
	this.charisma = 0;
	this.strength = 0;
	this.tolerance = 0;
	
	this.safeSoloPower = -1;
	this.normalSoloPower = -1;
	this.riskySoloPower = -1;
	this.dangerSoloPower = -1;
		
	this.maxstats = 1502;
	
	this.calculatePower = function(newWeaponDamage, newArmor) {

		///// your_points	-	http://guide.thecrims.com/wiki/index.php/Arms_Dealer
		//
		// PlayerPower 		=	(intelligence + strength + tolerance/2)/3 
		// WeaponPower		=	(weapon damage * accuracy/10) +- some random parts + armor 
		//
		// Grades by http://www.thecrims.name/index.php?c=calc
		// Safe 		=	85%
		// Normal		=	90%
		// Risky		=	100%
		// Danger		=	102%
		
		var weaponDamage;
		var armor;
		if(newWeaponDamage)
			weaponDamage = newWeaponDamage;
		else
		weaponDamage = this.weaponDamage;

		if(newArmor)
		armor = newArmor;
		
		else
		armor = this.armorNumber;
		
		if ((this.profesja == 'Złodziej') || (this.profesja == 'Robber') || (this.profesja == 'Rånare') || (this.profesja == 'Ladrón') || (this.profesja == 'Ladrão') || (this.profesja == 'Ropar') || (this.profesja == 'Zloděj') || (this.profesja == 'Räuber') || (this.profesja == 'Spargator') || (this.profesja == 'Plėšikas') || (this.profesja == 'Λωποδύτης') || (this.profesja == 'Tyv') || (this.profesja == 'Rapinatore') || (this.profesja == 'Грабитель') || (this.profesja == 'Ladrão') || (this.profesja == 'Soyguncu') || (this.profesja == 'Perampok') || (this.profesja == 'Hajdut') || (this.profesja == 'Laupītājs') || (this.profesja == 'Dieb') || (this.profesja == 'Zlodej') || (this.profesja == 'Voleur') || (this.profesja == 'Ryöstäjä') || (this.profesja == 'Pljačkaš') || (this.profesja == 'Perompak') || (this.profesja == 'Крадец') || (this.profesja == 'Inbreker')){
		 	var playerPower = ( (this.intelligence + this.strength + this.tolerance) / 3);
      		}
		else{
			var playerPower = ( (this.intelligence + this.strength + this.tolerance/2) / 3)*0.9;
		}
		var weaponPower = ((10 * weaponDamage) / 10 + armorTolerance[armor]);

		if(newWeaponDamage || newArmor)
			return  (playerPower + weaponPower) * 0.9;
   		
		this.safeSoloPower = (playerPower + weaponPower) * 0.85 ;

		this.normalSoloPower = (playerPower + weaponPower) * 1 ;
      	
		this.riskySoloPower = (playerPower + weaponPower) * 1.01 ;

		this.dangerSoloPower = (playerPower + weaponPower) * 1.02;

		this.FightPower = ((this.strength + this.tolerance) / 2) + weaponPower;
		
		//alert("Safe: "+ this.safeSoloPower + "\nnormal: "+ this.normalSoloPower + "\nrisky: " + this.riskySoloPower +"\ndanger: "+ this.dangerSoloPower );
	}


  
   this.getBribe = function() {
      		return (this.respect * 500) +1;
   	}

   	
	this.getMaxBuildings = function() {
		return Math.floor((Math.sqrt(2 * (this.tolerance + this.intelligence) - 1) + 1) / 2);
	}

	
   	this.getIntTolNecessaryToNextBuilding = function(numCurrentBuildings) {
      		var nextBuilding = Math.max(this.getMaxBuildings(), numCurrentBuildings) + 1;
      		return 2 * nextBuilding * ( nextBuilding - 1) + 1 - this.intelligence - this.tolerance;
   	}
	



}
// for the listener
function calcutateNewStats(){
	var weapon = document.getElementById('weapon').value;
	var armor = document.getElementById('armor').value;	
	alert(Profile.calculatePower(weapon, armor));
}

//unsafeWindow.document.onmousedown = null;
//unsafeWindow.window.onmousedown = null;

//unsafeWindow.document.onclick=null;

unsafeWindow.document.oncontextmenu=null;

PageEngine.DeleteElement('topbox');

PageEngine.DeleteElement('banner_bottom');


PageEngine.insertPowerIntoPage(Profile);

if(document.location.pathname != '/')
PageEngine.Operka();


if (document.location.pathname == "/start.php"){
	PageEngine.ByStats(Profile);
}

if (document.location.pathname=="/profile.php"){
	PageEngine.ChallengeAnyOne();
}

if (document.location.pathname=="/assault.php"){	
	PageEngine.CheckDurability(Profile);
}

if (document.location.pathname=="/robbery.php"){	
	PageEngine.colourRobberies(Profile);
	PageEngine.CheckDurability(Profile);
        PageEngine.InsertMetadonButton(Profile);
}

if (document.location.pathname=="/bounty.php"){
}

if (document.location.pathname=="/sabotage.php"){
}

if (document.location.pathname=="/hookers.php"){	
	PageEngine.innersertHookersInfo(Profile, language);
}

if (document.location.pathname=="/armsdealer.php"){
	PageEngine.insertCalculator(Profile, language);
	document.getElementById('Calc').addEventListener("click",calcutateNewStats , false);
}

if (document.location.pathname=="/drugdealer.php"){
	PageEngine.getDrugPrices(language);
	PageEngine.populateDrugsValuesAtDealer(Profile, language);
}

if (document.location.pathname=="/buildings.php"){
	PageEngine.insertBuildInfoIntoBuildingPage(Profile);
	PageEngine.insertEarningsIntoBuildingPage(Profile);
}

if (document.location.pathname=="/nightlife.php"){
	PageEngine.InsertPanicButton(Profile);
	PageEngine.populateBuyDrugsValues(Profile, language);
}

if (document.location.pathname=="/businesses.php"){
}

if (document.location.pathname=="/hospital.php"){
	PageEngine.populateBuyStatValues(Profile);
	PageEngine.insertBuildInfoIntoHospitalPage(Profile);
//	PageEngine.CheckIfByStats(Profile);
	PageEngine.CheckIfMetadon();
}

if (document.location.pathname=="/surgery.php"){
	PageEngine.CheckIfPanic();	
}

if (document.location.pathname=="/rip.php"){	
}

if (document.location.pathname=="/prison.php"){	
	PageEngine.insertBribeIntoPrisonPage(Profile);
}

if (document.location.pathname=="/msgcenter.php"){
}

if (document.location.pathname=="/stats.php"){
	PageEngine.SetUnlimitedOffset();
}



//if(document.location.pathname=="/randomevents.php")
// alert('randomevents');
