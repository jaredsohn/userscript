//-----------------------------------------------------------------------------
// [WoD] Market Stall
// Version 1.2, 2011-11-08
// Copyright (c) Tomy
// Script aimed at group merchant  players of World Of Dungeons. Creates market stall bbcode.
//
// Adds "market" link right besides built in "export as: export as: bbcode xml csv" entries.
// When clicked new page opens displaying bbcode for market stall.
//-----------------------------------------------------------------------------


//-----------------------------------------------------------------------------
// Changelog
//
// 1.2
// - fixed french "head" item title to "tête" and not "tete"
// - first (of many :() trial on including update notifier script
//
// 1.1
// - item grafting now visible in market stall (depends on new feature of cvs export so might not work until world is updated)
// - added anonymous function around code so not to polute, or interact with, global namespace
// - added 65k length "cut marks"
// - included french translation and allowed all wod sites to use since should not depend on language used.
// - changed internal representation of localized strings to ease maintenance
// - internal reorganization
// - added some other translations 
// - added Finargol to contributor list (thanks for useful input and testing on french server)
//
// 1.0 
// - initial release
//-----------------------------------------------------------------------------


// ==UserScript==
// @name			Market Stall
// @description		Script aimed at group merchant players of World Of Dungeons. Creates market stall bbcode.
// @namespace		tomy
// @include			http://*.world-of-dungeons.*/wod/spiel/hero//csvexport.php*
// @include			http://*.world-of-dungeons.*/wod/spiel/hero/items.php*
// @version			1.2
// @contributor		Finargol
// @author			Tomy
// @copyright		2010+, Tomy
// @require			http://usocheckup.redirectme.net/93164.js?maxage=1
// ==/UserScript==

(function() {

//-----------------------------------------------------------------------------
// auxiliary functions
//-----------------------------------------------------------------------------

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}

function DebugMsg(Data)
{
	if (DEBUG)
		alert(JSON.stringify(Data, null, 4));
}

//-----------------------------------------------------------------------------
// "global" variables
//-----------------------------------------------------------------------------

var DEBUG = true;
var VER = "1.2";

var globalVars = {
      "en" : {
          titleConsumable: "Consumables"
        , titleTreasury: "Treasury"
        , linkMarket: "market"
		, copyright: "Created with Market Stall"
        , order: [
            "head", "face", "ears", "neck", "torso", "cloak",
            "gloves", "arms", "legs", "feet", "ring",
            "right hand", "left hand", "both hands", "either hand",
            "belt", "pocket", "medal", "unequipable"
        ]
    }
    , "fr" : {
          titleConsumable: "Consommables"
        , titleTreasury: "Trésors"
        , linkMarket: "marché"
		, copyright: "Créé avec Market Stall"                             
        , order: [
            "tête", "visage", "oreilles", "cou", "torse", "cape",
            "gants", "bras", "jambes", "pied", "anneau",
            "main droite", "main gauche", "les deux mains", "d'une main",
            "ceinture", "sac", "décoration", "Non équipable"
        ]
    }
    , "de" : {
          titleConsumable: "Verbrauchsmaterial"
        , titleTreasury: "Treasury"
        , linkMarket: "markt"
		, copyright: "Erstellt mit Market Stall"                          
        , order: [
			"Kopf", "Ohren", "Brille", "Halskette", "Torso", "Gürtel", 
			"Umhang", "Schultern", "Arme", "Handschuhe", "Beide Hände", 
			"Waffenhand", "Schildhand", "Einhändig", "Beine", "Füße", 
			"Orden", "Tasche", "Ring", "Nicht tragbar"
        ]
    }
    , "it" : {
          titleConsumable: "Materiale di consumo"
        , titleTreasury: "Tesoro"
        , linkMarket: "mercato"
		, copyright: "Creato con Market Stall"                            
        , order: [
			"testa", "orecchie", "viso", "collo", "torace", "cinta", "mantello", 
			"braccia", "guanti", "due mani", "mano destra", "mano sinistra", 
			"una mano", "gambe", "piedi", "medaglie", "tasche", "anelli", 
			"non equipaggiabile"
        ]
    }
    , "es" : {
          titleConsumable: "Materiales consumibles"
        , titleTreasury: "Tesoro"
        , linkMarket: "mercado"
		, copyright: "Creado con el Market Stall"                         
        , order: [
			"Cabeza", "Rostro", "Oídos", "Collar", "Torso", "Capa", "Guantes", 
			"Brazos", "Piernas", "Pies", "Companero", "Anillo", "Mano derecha", 
			"Mano izquierda", "Las dos manos", "Izqu. o derecha", "Condecoración", 
			"Cinturón", "Bolso", "No equipable"
        ]
    }
    , "pl" : {
          titleConsumable: "Materialy eksploatacyjne"
        , titleTreasury: "Skarbu"
        , linkMarket: "rynek"
		, copyright: "Stworzony z Market Stall"                           
        , order: [
            "head", "face", "ears", "neck", "torso", "cloak",
            "gloves", "arms", "legs", "feet", "ring",
            "right hand", "left hand", "both hands", "either hand",
            "belt", "pocket", "medal", "unequipable"
        ]
    }
    , "hr" : {
          titleConsumable: "Potrosni materijal"
        , titleTreasury: "Trezor"
        , linkMarket: "pijaca"
		, copyright: "Napravljeno sa Market Stall-om"
        , order: [
			"Glava", "Uši", "Naočale", "Lančić", "Torzo", "Pojas", 
			"Ogrtač", "Ruke", "Rukavice", "Obje ruke", "Ruka za oružje", 
			"Ruka za štit", "Jednoruk", "Noge", "Stopala", "Medalja", "Torba", 
			"Prsten", "Ne može se nositi"
        ]
    }
};

// init local vars
var localVars = globalVars["en"];

//-----------------------------------------------------------------------------
// "initialization" functions
//-----------------------------------------------------------------------------

function Main()
{
	if (/\/wod\/spiel\/hero\/\/csvexport.php?.*&is_tomy=1/.test(document.URL)) {
        var match = new RegExp("&tomy_lang=([^&]+)", "g").exec(document.URL);
        localVars = globalVars[match ? match[1] : "en"];
//        alert(JSON.stringify(localVars));

        var Pre = document.body.removeChild(document.body.firstChild);
		var items = ParseTreasure( Pre.innerHTML );
        
        var newPre = document.createElement("pre");
        newPre.innerHTML = ConvertToBB(items);
        document.body.appendChild(newPre);
	} else if (/\/wod\/spiel\/hero\/items.php/.test(document.URL)) {
        var meta = document.querySelector("meta[http-equiv='Content-Language']");
        var lang = meta ? meta.getAttribute("content") : "en";
		if (!globalVars.hasOwnProperty(lang)) lang = "en";
        localVars = globalVars[lang];
//        alert(JSON.stringify(localVars));

		var allA = document.getElementsByTagName("a");
		for (var i = 0; i < allA.length; ++i) {
            var link = allA[i];
			if (link.textContent.trim() == "csv" && /csvexport.php/.test(link.getAttribute("href"))) {
				var newA = document.createElement("a");
				newA.setAttribute("onclick", link.getAttribute("onclick").replace("&IS_POPUP=1", "&IS_POPUP=1&is_tomy=1&tomy_lang=" + lang));
				newA.setAttribute("href", link.getAttribute("href").replace("&IS_POPUP=1", "&IS_POPUP=1&is_tomy=1&tomy_lang=" + lang));
				newA.setAttribute("target", link.getAttribute("target"));
				newA.innerHTML = localVars.linkMarket;
				link.parentNode.appendChild(newA);
			}
		}
	}
}

//-----------------------------------------------------------------------------
// "functionality" functions
//-----------------------------------------------------------------------------

function ParseTreasure(text) 
{
	var ret = new Object();
	ret.Treasury = new Object();
	ret.Consumables = new Object();
	
	var lines = text.split("\n");
	for (var i = 1; i < lines.length; ++i) {

		var data = lines[i].split(";");

		if (data.length < 8) continue;
		
		for (var j = 0; j < data.length; ++j) {
			data[j] = data[j].substring(1, data[j].length - 1);
		}
		
		var tmpData = {Name:data[0], Count:parseInt(data[1]), Unique:data[6], Grafting:""};
		if (data.length > 9) tmpData.Grafting = data[9];
		
		var ccount = data[2];
		var place = data[4];
		if (ccount.length > 0) {
			// consumables
			if (!ret.Consumables.hasOwnProperty(place)) ret.Consumables[place] = new Array();
			
			var count = ccount.split("/");
			tmpData.MaxCCount = parseInt(count[1]);
			tmpData.CCount = parseInt(count[0]) * tmpData.Count;

			var found = false;
			for (var j = 0; j < ret.Consumables[place].length; ++j) {
				if (tmpData.Name == ret.Consumables[place][j].Name && tmpData.MaxCCount == ret.Consumables[place][j].MaxCCount && tmpData.Grafting == ret.Consumables[place][j].Grafting) {
					ret.Consumables[place][j].Count += tmpData.Count;
					ret.Consumables[place][j].CCount += tmpData.CCount;
					found = true;
					break;
				} 
			}
			
			if (!found) {
				ret.Consumables[place].push(tmpData);
			}
		} else {
			// treasury
			if (!ret.Treasury.hasOwnProperty(place)) ret.Treasury[place] = new Array();

			var hitpoints = data[3].split("/");
			if (hitpoints.length < 2) {
				tmpData.MaxHitpoints = undefined;
				tmpData.Hitpoints = undefined;
			} else {
				tmpData.MaxHitpoints = parseInt(hitpoints[1]);
				tmpData.Hitpoints = parseInt(hitpoints[0]);
			}

			var found = false;
			for (var j = 0; j < ret.Treasury[place].length; ++j) {
				if (tmpData.Name == ret.Treasury[place][j].Name && tmpData.Hitpoints == ret.Treasury[place][j].Hitpoints && tmpData.MaxHitpoints == ret.Treasury[place][j].MaxHitpoints && tmpData.Grafting == ret.Treasury[place][j].Grafting) {
					ret.Treasury[place][j].Count += tmpData.Count;
					found = true;
					break;
				} 
			}
			
			if (!found) {
				ret.Treasury[place].push(tmpData);
			}
		}
	}
	
	return ret;
}

function ConvertToBB(items) 
{
	var lastSize = 0;
	var totalRet = "\r\n[size=20]" + localVars.titleTreasury + "[/size]" + "\r\n[url=http://userscripts.org/scripts/show/93164][size=9]" + localVars.copyright + " v" + VER + "[/size][/url]\r\n";
	
	for (var k = 0; k < localVars.order.length; ++k) {
		var ret = "";
		var i = localVars.order[k];

		if (!items.Treasury.hasOwnProperty(i)) continue;

		var count = 0; 
		for (var j = 0; j < items.Treasury[i].length; ++j)
			count += items.Treasury[i][j].Count;
			
		ret += "\r\n\r\n[size=15][color=darkseagreen][b]" + i + "[/b][/color][/size] -> [i]" + count + "[/i]";

		for (var j = 0; j < items.Treasury[i].length; ++j) {
			ret += 	"\r\n\t" 
				+ 	items.Treasury[i][j].Count +"x "
				+ 	"[item: " + items.Treasury[i][j].Name + "] ";
			
			if (items.Treasury[i][j].Grafting.length > 0) {
				for (var l = 0; l < items.Treasury[i][j].Grafting.length; ++l)
					ret += ":g" + items.Treasury[i][j].Grafting[l] + ":";
				ret += " ";
			}
			
			ret +=  (items.Treasury[i][j].Unique.length > 0 ? "[color=lime]" + items.Treasury[i][j].Unique + "[/color] " : "")
				+ 	(items.Treasury[i][j].MaxHitpoints != items.Treasury[i][j].Hitpoints ? "[color=tomato](" + items.Treasury[i][j].Hitpoints + "/" + items.Treasury[i][j].MaxHitpoints + ")[/color] " : "");
		}
		
		if (lastSize + ret.length > 65000) {
			totalRet += "\r\n\r\n====================================================================================================\r\n" + "\r\n[url=http://userscripts.org/scripts/show/93164][size=9]" + localVars.copyright + " v" + VER + "[/size][/url]";
			totalRet += ret;
			lastSize = ret.length;
		} else {
			totalRet += ret;
			lastSize += ret.length;
		}
	}
	
	totalRet += "\r\n\r\n====================================================================================================\r\n";
	
	var lastSize = 0;
	totalRet += "\r\n\r\n\r\n\r\n[size=20]" + localVars.titleConsumable + "[/size]" + "\r\n[url=http://userscripts.org/scripts/show/93164][size=9]" + localVars.copyright + " v" + VER + "[/size][/url]\r\n";
	
	for (var k = 0; k < localVars.order.length; ++k) {
		var ret = "";
		var i = localVars.order[k];

		if (!items.Consumables.hasOwnProperty(i)) continue;

		var count = 0; 
		for (var j = 0; j < items.Consumables[i].length; ++j)
			count += items.Consumables[i][j].Count;
			
		ret += "\r\n\r\n[size=15][color=darkseagreen][b]" + i + "[/b][/color][/size] -> [i]" + count + "[/i]";

		for (var j = 0; j < items.Consumables[i].length; ++j) {
			ret += 	"\r\n\t" 
				+ 	items.Consumables[i][j].Count +"x "
				+ 	"[item: " + items.Consumables[i][j].Name + "] " 
				
			if (items.Consumables[i][j].Grafting.length > 0) {
				for (var l = 0; l < items.Consumables[i][j].Grafting.length; ++l)
					ret += ":g" + items.Consumables[i][j].Grafting[l] + ":";
				ret += " ";
			}

			ret += "[color=tomato](" + items.Consumables[i][j].CCount + "/" + items.Consumables[i][j].Count * items.Consumables[i][j].MaxCCount + "/~" + Math.floor(items.Consumables[i][j].CCount / items.Consumables[i][j].Count) + ")[/color]";
		}

		if (lastSize + ret.length > 65000) {
			totalRet += "\r\n\r\n====================================================================================================\r\n" + "\r\n[url=http://userscripts.org/scripts/show/93164][size=9]" + localVars.copyright + " v" + VER + "[/size][/url]";
			totalRet += ret;
			lastSize = ret.length;
		} else {
			totalRet += ret;
			lastSize += ret.length;
		}
	}
	
	return totalRet;
}

//-----------------------------------------------------------------------------
// "main"
//-----------------------------------------------------------------------------

try {Main();} catch(e) {alert("Main(): " + e);}
})();
