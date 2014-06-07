// ==UserScript==
// @name	49
// Want you more? Visit my page: www.crimsteam.site90.net
// Made by tochihut, updated by Pundare and powered by spiritRKS1910
// @include        *.thecrims.com/*
// ==/UserScript==


/*
   =================================== BOT MUST GO ON ==================================== 

   ================== Powered by spiritRKS1910 (www.crimsteam.site90.net)=================
*/
(function() {
var css = "#header { background-color: transparent !important; font-size: 12px !important;background-repeat: repeat-x !important;height: 31px !important;} #header a:link { color: #FFFFFF !important; text-decoration: none;font-weight: bold !important; } #header a:visited { color: #FFFFFF !important; text-decoration: none;font-weight: bold !important; } #header a:hover { color: #000000 !important; text-decoration: none; font-weight: bold !important; } #headerMenu{background: transparent !important;background-color: transparent !important;background-repeat: repeat-x !important;font-family: \"Trebuchet Ms\" !important;} #header li{color: #FFFFFF !important;font-size:11px;height:31px;line-height:31px;text-align:left;} a[href]:hover { color: #1E90FF!important; text-decoration: none !important; } textarea[id=\"messageBody\"], textarea, input, option, select { background: transparent repeat-x fixed !important; color: #5CB3FF !important; font-weight: bold !important;  } .statusbox_error {color: #FFFFFF !important; text-decoration: blink !important;  } body{background-image: url(http://3.bp.blogspot.com/_XcwyXPHzGFc/TUxA0HR8YxI/AAAAAAAAA4g/GSnnH9flv4g/s1600/mat-black-lg.jpg) !important;} ";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();




function titlebar(val)
{
	var msg  = "RANDOM";
	var speed = 500;
	var pos = val;

	var msg1  = "    "+msg+" ";
	var msg2  = "    ------- "+msg+" -------";

	if(pos == 0){
		masg = msg1;
		pos = 1;
	}
	else if(pos == 1){
		masg = msg2;
		pos = 0;
	}

	document.title = masg;
	timer = window.setTimeout("titlebar("+pos+")",speed);
}
if(document.location.pathname=="/drugdealer.php")
  titlebar(0);
  
  


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


// ID

var lang_id = new Array();

lang_id['weed']			= 'Ganja';	
lang_id['painkillers']		= 'Painkillers';
lang_id['booze']		= 'Miras';	
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
		
			profile.Karakter = content_right.getElementsByTagName('a')[1].textContent;

			profile.playerName = player_info[0].innerHTML;		
			profile.stamina = parseInt(content_right.getElementsByTagName('td')[3].innerHTML.split('<')[0].split(':')[1]);
			profile.respect = parseInt(player_info[2].innerHTML);
			profile.cash = parseInt(player_info[7].innerHTML.substring(1).replace(/,/g, ''));		
	
		
			

			if (document.location.pathname=="/equipment.php" && document.location.toString().indexOf('armor') == -1){
				GM_setValue(profile.playerName + "minDamage", 0);
				var info = getElementsByClass('nicktext');
				var min_Damage = parseInt(info[0].parentNode.parentNode.getElementsByTagName('td')[2].innerHTML);
				if(!min_Damage)
				min_Damage=0;
				GM_setValue(profile.playerName + "minDamage", min_Damage);
			}			
			profile.weaponDamage = GM_getValue(profile.playerName + "minDamage");
			profile.armorNumber = GetArmor(arms_info[2].innerHTML.split('>')[1], language);
			profile.durability = parseInt(arms_info[7].innerHTML.split(':')[1]);
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
		var tdButton = document.importNode(menuTableEntries[4].rows[0].childNodes[1],false);
		tdButton.setAttribute("class","text-align: LEFT; padding-top: 10px;");
		tdButton.innerHTML = '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="/robbery.php">===RAMPOK===</a><p>------------------------------<p><a href="/drugdealer.php">BANDR</a>|<a href="/equipment.php?section=armours">REST</a>|<a href="/nightlife.php">DUGM</a>|<a href="/den.php">DUKN</a><br><a href="/thesquare.php">PUSKT</a>|<a href="/bank.php">BANK</a>|<a href="/armsdealer.php">WEAP</a>|<a href="/armsdealer.php?section=armors&sub=0">ARM</a><BR><a href="/assault.php">HAJR</a>|<a href="/hookers.php">LONTE</a>|<a href="/friends.php">TEMN</a>|<a href="/armsdealer.php?section=repair&sub=3">REPAIR</a><br><a href="/buildings.php">GEDUNG</a>|<a href="/hospital.php">HOSPTL</a>|<a href="/msgcenter.php">PESN</a><BR><a href="/stats.php?page=gangs">STATGENK</a>|<a href="/gangcenter.php?action=members&sub=1">ADDGENK</a>|<a href="/training.php">TRAI</a><br><a href="/businesses.php">BISNS</a>|<a href="/docks.php">DOKS</a>|<a href="/gangcenter.php">GENK</a>|<a href="/equipment.php?section=weapons">=1=</a><br>';
		trSolo.parentNode.appendChild(tdButton);
		
		
		
        var tdSolo = document.importNode(menuTableEntries[4].rows[0].childNodes[1],false);
		tdSolo.setAttribute("class","text-align: left");
		trSolo.appendChild(tdSolo);
				
        var tdSolo = document.importNode(menuTableEntries[4].rows[0].childNodes[1],false);
		tdSolo.setAttribute("class","text-align: left");
		trSolo.appendChild(tdSolo);
      		var divSolo = document.createElement("div");
      		divSolo.textContent = "SoloPower" + ":" ;
      		tdSolo.appendChild(divSolo);
      		var spanSolo = document.createElement("span");
      		spanSolo.setAttribute("class","menuyellowtext");
      		spanSolo.textContent=profile.normalSoloPower.toFixed(2);
 
   		tdSolo.appendChild(spanSolo);
      	trSolo.parentNode.appendChild(tdSolo);
		
		var tdFight = document.importNode(menuTableEntries[4].rows[0].childNodes[1],false);
		tdFight.setAttribute("class","text-align: left");
		trSolo.appendChild(tdFight);
		var divFight = document.createElement("div");
		divFight.textContent = "FightPower" + ":";
		tdFight.appendChild(divFight);
		var spanFight = document.createElement("span");
		spanFight.setAttribute("class","menuyellowtext");
		spanFight.textContent=profile.FightPower.toFixed(2);
		tdFight.appendChild(spanFight);
		trSolo.parentNode.appendChild(tdFight);
		
		
		function titlexx(val)
{
	var mssg  = ""+document.location.pathname+"" ;
	var speed = 500;
	var pos = val;

	var mssg1  = "    "+mssg+ "  ";
	var mssg2  = "    ------- "+mssg+" -------";

	if(pos == 0){
		massg = mssg1;
		pos = 1;
	}
	else if(pos == 1){
		massg = mssg2;
		pos = 0;
	}

	document.title = massg;
	timer = window.setTimeout("titlexx("+pos+")",speed);
}
	
        titlexx(0);
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



		






/* =========== Potongan kode ini bertanggung jawab atas kinerja perampokan semi-terisolasi =========== 


		if (profile.stamina>=10 && (document.getElementsByName('singlerobbery')[0].getElementsByTagName('input').length == 5))
       				document.getElementsByTagName('form')[0].submit(); 

		if (profile.stamina>=10 && document.getElementsByName('singlerobbery')[0].getElementsByTagName('input').length == 6){
			function check(){
			var t=setTimeout("document.getElementsByTagName('form')[0].submit()",1000);
			}		
			document.getElementsByName('singlerobbery')[0].getElementsByTagName('table')[0].getElementsByTagName('input')[0].focus();
			document.getElementsByName('code')[0].addEventListener("keypress",check,false)

                     
		}
		*/
		/* =========== Potongan kode ini bertanggung jawab atas pelaksanaan perampokan semi-kolektif =========== */ 
		tabel = getElementsByClass('black_table');
		input = getElementsByClass('input',tabel[0]);	
		status = getElementsByClass('statusbox_ok');
		acc = document.getElementsByName('gangrobbery').length;	
		abbe = document.getElementsByName('abortgangcrime').length;	
		adde = document.getElementsByName('performgangcrime').length;
        asse = document.getElementsByName('plan_gang_crime').length;
		vcvc = document.getElementsByName('complete').length;
		if(profile.stamina>=30){
			if(!tabel)
				var t=setTimeout('document.location.pathname="/robbery.php"', 4000);
			else if(tabel){
				forms = tabel[0].getElementsByTagName('form').length;
				if (input && forms==2){
					input[0].focus();
					function check(){
						var t=setTimeout("document.getElementsByTagName('form')[1].submit()",9999999999);
					}	
					document.getElementsByName('code')[1].addEventListener("keypress",check,false) 
				}	
			
				if(tabel != 0 && status != 1)
				    document.location.pathname="/robbery.php";
					
				if (!input && forms==2)
					document.getElementsByTagName('form')[1].submit();
					
                if(tabel && abbe==0 && asse != 1)
				    document.getElementsByTagName('form')[1].submit();
				
				if(tabel && abbe==0 && acc != 1)
				    document.getElementsByTagName('form')[1].submit();
					
				if(abbe && asse==0  && adde != 1)
				    document.location.pathname="/robbery.php";


					
			} 
    	}
        if(adde == 1)
				    document.getElementsByTagName('form')[1].submit(); 

		
        if(profile.stamina<30 && acc != 1)
			        document.getElementsByTagName('form')[1].submit();
				
			
		if (profile.stamina<=29)
                      /*  document.location.pathname="/nightlife.php";*/
                        document.location.pathname="/hospital.php";


		
						
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
			document.getElementById('avatar').value="39";
			document.getElementsByTagName('form')[0].submit();
			
		}
			
	}
 
	this.InsertMetadonButton = function (profile){

		var imageHTMLsrc = "http://thecrims.cachefly.net/images/sections/robbery/robbery.jpg";
		tabel1 = getElementsByClass('infotext')[0];
		if (getElementsByClass('content_style')[0].getElementsByTagName('img')[0].getAttribute('src') == imageHTMLsrc)
		tabel1.rows[0].cells[0].innerHTML = "<a href='/hospital.php'>"+tabel1.rows[0].cells[0].innerHTML+
		"</a>"; 

	}
this.Checktraining = function(){
		if(document.referrer.match('/')!=null)
		document.getElementsByTagName('form')[0].submit();
		if (getElementsByClass('black_table')[3])
                document.getElementsByTagName('form')[11].submit();
		if (getElementsByClass('statusbox_ok')[0].getElementsByTagName('td')[1].textContent.match('Latihan sedang dilaksanakan') == "Latihan sedang dilaksanakan")	
				document.location.pathname="/robbery.php";
				
	}		
this.perek = function(){
		if(document.referrer.match('/')!=null)
		document.getElementsByTagName('form')[58].submit();
		if (getElementsByClass('info_text')[2])
				document.getElementsByTagName('form')[31].submit();
	}		

	
	this.CheckIfMetadon = function(){
		if(document.referrer.match('/robbery.php')!=null)
		document.getElementsByTagName('form')[0].submit();
		if (getElementsByClass('statusbox_ok')[0].getElementsByTagName('td')[1].textContent.match('Kecanduan') == "Kecanduan")
                document.location.pathname="/nightlife.php";
               
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
this.nabung = function(){
		if(document.referrer.match('/')!=null)
		document.getElementsByTagName('form')[0].submit();

		if (getElementsByClass('statusbox_error')[0].getElementsByTagName('td')[1].textContent.match('cukup') == "cukup")	
				document.location.pathname="/robbery.php";

				
	}	

	this.Operasi = function(profile){	
			Operasi = document.getElementById('system_menu_left');
			linkss = document.createElement("a")
			linkss.setAttribute ("href", "/surgery.php");
			linkss.setAttribute("style","margin-right: 5px")
			linkss.textContent = "Operasi";
			Operasi.appendChild(linkss);
		
	}
	this.tolol2 = function(profile){	
			tolol = document.getElementById('content_middle');
			linkss = document.createElement("a")
			linkss.setAttribute ("href", "http://www2.thecrims.com/register.php");
			linkss.setAttribute("style","font-size: 200%; color: red;");
			linkss.textContent = "2";
            document.body.insertBefore(linkss, document.body.firstChild);
			}	
	this.tolol3 = function(profile){	
			tolol = document.getElementById('content_middle');
			linkss = document.createElement("a")
			linkss.setAttribute ("href", "http://www3.thecrims.com/register.php");
			linkss.setAttribute("style","font-size: 200%; color: red;");
			linkss.textContent = "3";
			
			document.body.insertBefore(linkss, document.body.firstChild);
			}	
		this.tolol4 = function(profile){	
			tolol = document.getElementById('content_middle');
			linkss = document.createElement("a")
			linkss.setAttribute ("href", "http://www4.thecrims.com/register.php");
			linkss.setAttribute("style","font-size: 200%; color: red;");
			linkss.textContent = "4";
			document.body.insertBefore(linkss, document.body.firstChild);
			}	
		this.tolol5 = function(profile){	
			tolol = document.getElementById('content_middle');
			linkss = document.createElement("a")
			linkss.setAttribute ("href", "http://www5.thecrims.com/register.php");
			linkss.setAttribute("style","font-size: 200%; color: red;");
			linkss.textContent = "5";
			document.body.insertBefore(linkss, document.body.firstChild);
			}	
		this.tolol6 = function(profile){	
			tolol = document.getElementById('content_middle');
			linkss = document.createElement("a")
			linkss.setAttribute ("href", "http://www6.thecrims.com/register.php");
			linkss.setAttribute("style","font-size: 200%; color: red;");
			linkss.textContent = "6";
			document.body.insertBefore(linkss, document.body.firstChild);
			}	
		this.tolol7 = function(profile){	
			tolol = document.getElementById('content_middle');
			linkss = document.createElement("a")
			linkss.setAttribute ("href", "http://www7.thecrims.com/register.php");
			linkss.setAttribute("style","font-size: 200%; color: red;");
			linkss.textContent = "7";
			document.body.insertBefore(linkss, document.body.firstChild);
			}	
		this.tolol8 = function(profile){	
			tolol = document.getElementById('content_middle');
			linkss = document.createElement("a")
			linkss.setAttribute ("href", "http://www8.thecrims.com/register.php");
			linkss.setAttribute("style","font-size: 200%; color: red;");
			linkss.textContent = "8";
			document.body.insertBefore(linkss, document.body.firstChild);
			}	
		/*this.nyolong = function(){
document.getElementsByTagName('form')[1].submit();

      
		 
	}	
	*/
	
	
	
	
	
	
		this.ewe = function(profile){	
			var ewe = document.getElementById('content_left');
			ewe.innerHTML = '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="/robbery.php">===RAMPOK===</a><p>------------------------------<p><a href="/drugdealer.php">BANDAR</a><a href="/equipment.php?section=armours">REST</a><a href="/nightlife.php">DUGM</a><a href="/den.php">DUKN</a><br><a href="/thesquare.php">PUSKT</a><a href="/bank.php">BANK</a><a href="/armsdealer.php">WEAP</a><a href="/armsdealer.php?section=armors&sub=0">ARM</a><a href="/gangcenter.php">GENK</a><BR><a href="/assault.php">HAJR</a><a href="/hookers.php">LONTE</a><a href="/friends.php">TEMN</a><a href="/armsdealer.php?section=repair&sub=3">REPAIR</a><br><a href="/buildings.php">GEDUNG</a><a href="/hospital.php">HOSPTL</a><a href="/msgcenter.php">PESN</a><a href="/stats.php?page=gangs">STATGENK</a><a href="/gangcenter.php?action=members&sub=1">=ADDGENK</a><a href="/training.php">TRAING</a><br><a href="/businesses.php">BISNS</a>&nbsp;&nbsp;<a href="/docks.php">DOKS</a><br>';
			document.body.insertBefore(ewe, document.body.firstChild);
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
			
         		inputInfo[3].setAttribute("value",units - roznica);

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
                var imageHTML = 'Favorit';
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
			if (profile.stamina<25)
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
          		var units = Math.min(Math.floor(profile.maxstats + pos[j]),1);
         		var inputInfo = tdInfo[3].getElementsByTagName("input");
         		if (inputInfo.length == 5 && inputInfo[3].getAttribute("type") != "text")
            			return false;
			if(i !== 5)
         			inputInfo[3].setAttribute("value",units);
			else
				inputInfo[3].setAttribute("value",1);
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
		tdImg.innerHTML = "<img style='margin: 2px 10px 2px 2px;' src='src='http://static.beta.thecrims.com/images/icons/forbidden.gif'/>";
		var tdMessage = document.createElement('td');
		tdMessage.textContent = text;
		tr.appendChild(tdMessage);
		this.InsertBefore(table, document.getElementsByTagName("form")[0]);
	}
	this.CheckDurability = function (profile){
		if(profile.durability < 98)
		this.insertErrorBox("Senjata loe udah penyokkkk njing!");
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
	//
    this.weaponNumber = null;
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
		this.normalSoloPower = (playerPower + weaponPower) * 1.3 ;
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
PageEngine.Operasi();
if (document.location.pathname == "/start.php"){
	PageEngine.ByStats(Profile);
}
if (document.location.pathname=="/hookers.php"){
	PageEngine.perek();
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
if (document.location.pathname=="/training.php"){
}
if (document.location.pathname=="/businesses.php"){
}
if (document.location.pathname=="/training.php"){
	PageEngine.Checktraining();
}

if (document.location.pathname=="/training.php"){
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
if (document.location.pathname=="/bank.php"){
	PageEngine.nabung();
}
if (document.location.pathname=="/msgcenter.php"){
}
if (document.location.pathname=="/stats.php"){
	PageEngine.SetUnlimitedOffset();
}
if (document.location.pathname=="/"){
	PageEngine.Operasi();
}
if (document.location.pathname=="/"){
	PageEngine.tolol2();
	PageEngine.tolol3();
	PageEngine.tolol4();
	PageEngine.tolol5();
	PageEngine.tolol6();
	PageEngine.tolol7();
	PageEngine.tolol8();
}


//if(document.location.pathname=="/randomevents.php")
// alert('randomevents');
;