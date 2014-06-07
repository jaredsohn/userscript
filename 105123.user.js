// ==UserScript==
// @id             ChineseMarketStall@UncleKang
// @name           [wod]小市场（团商利器）Ver 1.2
// @description    面向团商，康叔对Tomy的MarketStall做了修改，使之支持中文。作用是分类整理物品，并形成论坛BBCode
// @namespace      UncleKang
// @include        http://*.world-of-dungeons.*/wod/spiel/hero//csvexport.php*
// @include        http://*.world-of-dungeons.*/wod/spiel/hero/items.php*
// ==/UserScript==

(function() {

//-----------------------------------------------------------------------------
// auxiliary functions
//-----------------------------------------------------------------------------

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}

Array.prototype.contains = function (element) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == element) {
			return true;
		}
	}
	return false;
} 

// Usage: dump(object)
function dump(object, pad){
    var indent = '\t';
    if (!pad) pad = '';
    var out = '';
	if (object == undefined) {
		out += "undefined";
	} else if (object.constructor == Array) {
        out += '[\n';
        for (var i = 0; i < object.length; ++i) {
            out += pad + indent + '[' + i + '] = ' + dump(object[i], pad + indent) + '\n';
        }
        out += pad + ']';
    } else if (object.constructor == Object || typeof object == 'object') {
        out += '{\n';
        for (var i in object) {
			if (typeof object[i] != 'function')
				out += pad + indent + i + ': ' + dump(object[i], pad + indent) + '\n';
        }
        out += pad + '}';
    } else {
		out += object;
    }
    return out;
}

function DebugMsg(Data)
{
	if (DEBUG)
		alert(dump(Data));
}

//-----------------------------------------------------------------------------
// "global" variables
//-----------------------------------------------------------------------------

var DEBUG = true;
var VER = "1.2";
var TempWeaponType;
var ConsumablesType;
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
	, "cn" : {
          titleConsumable: "消耗品"
        , titleTreasury: "装备"
        , linkMarket: "市场"
		, copyright: "由康叔小卖部工具生成，祝快乐生活每一天！"
        , order: [
            "头", "眼镜", "耳", "颈", "身体", "披风",
            "手", "臂", "腿", "脚", "戒指",
            "右手", "左手", "双手", "单手",
            "腰带", "口袋", "勋章", "不可装备物品"
        ]
    }
    , "fr" : {
          titleConsumable: "Consommables"
        , titleTreasury: "Trésors"
        , linkMarket: "marché"
		, copyright: "Créé avec Market Stall"                             
        , order: [
            "tete", "visage", "oreilles", "cou", "torse", "cape",
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
		
		var tmpData = {Name:data[0], Count:parseInt(data[1]),ClassType:((data[5].split(","))[0]),FullClassType:data[5], Unique:data[6], Grafting:""};
		// var tmpData = {Name:data[0], Count:parseInt(data[1]),ClassType:data[5], Unique:data[6], Grafting:""};
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
	var totalRet = "\r\n[size=20]" + localVars.titleTreasury + "[/size]" + "\r\n[url=http://userscripts.org/scripts/show/105123][size=9]" + localVars.copyright + " v" + VER + "[/size][/url]\r\n";
	
	for (var k = 0; k < localVars.order.length; ++k) {
		var ret = "";
		var i = localVars.order[k];

		if (!items.Treasury.hasOwnProperty(i)) continue;

		var count = 0; 
		for (var j = 0; j < items.Treasury[i].length; ++j)
			count += items.Treasury[i][j].Count;
			
		ret += "\r\n\r\n[size=15][color=orange][b]" + i + "[/b][/color][/size] -> [i]" + count + "[/i]";
		
		//if(i=="右手")
		
		TempWeaponType=new Array();
		for(var j=0;j< items.Treasury[i].length; ++j)
		{
			
			if(!TempWeaponType.contains(items.Treasury[i][j].ClassType))
			{
				TempWeaponType.push(items.Treasury[i][j].ClassType);
			}
		}
		
		for(var lhy=0;lhy< TempWeaponType.length; ++lhy)
		{
			ret +=  "\r\n\t[size=12][color=palegreen][b]"+TempWeaponType[lhy]+"[/b][/color][/size]";
			ret +="\r\n[table border=1]\r\n\t";
			for(var j=0;j<items.Treasury[i].length; ++j)
			{
				
				if(items.Treasury[i][j].ClassType==TempWeaponType[lhy])
				{
					
					ret +="[tr]"
						+ "[td]"
						+ 	items.Treasury[i][j].Count +"x "
						+ 	"[item: " + items.Treasury[i][j].Name + "] ";
					
					if (items.Treasury[i][j].Grafting.length > 0) {
						for (var l = 0; l < items.Treasury[i][j].Grafting.length; ++l)
							ret += ":g" + items.Treasury[i][j].Grafting[l] + ":";
						ret += " ";
					}
					ret +="[/td][td]";
					ret +=  (items.Treasury[i][j].Unique.length > 0 ? "[color=lime]" + items.Treasury[i][j].Unique + "[/color] " : "");
					ret +="[/td][td]";
					// ret	+= 	(items.Treasury[i][j].MaxHitpoints != items.Treasury[i][j].Hitpoints ? "[color=tomato](" + items.Treasury[i][j].Hitpoints + "/" + items.Treasury[i][j].MaxHitpoints + ")[/color] " : "");
					ret +="[color=tomato](" + items.Treasury[i][j].Hitpoints + "/" + items.Treasury[i][j].MaxHitpoints + ")[/color] "
					ret +="[/td][td]";
					ret +="[color=gold]"+items.Treasury[i][j].FullClassType+"[/color]";
					ret +="[/td]";
					ret +="[/tr]";
				}
			}
			ret +="\r\n[/table]";
		}
			
		
		
		
		if (lastSize + ret.length > 65000) {
			totalRet += "\r\n\r\n====================================================================================================\r\n" + "\r\n[url=http://userscripts.org/scripts/show/105123][size=9]" + localVars.copyright + " v" + VER + "[/size][/url]";
			totalRet += ret;
			lastSize = ret.length;
		} else {
			totalRet += ret;
			lastSize += ret.length;
		}
		
	}
	
	totalRet += "\r\n\r\n====================================================================================================\r\n";
	
	var lastSize = 0;
	totalRet += "\r\n\r\n\r\n\r\n[size=20]" + localVars.titleConsumable + "[/size]" + "\r\n[url=http://userscripts.org/scripts/show/105123][size=9]" + localVars.copyright + " v" + VER + "[/size][/url]\r\n";
	
	for (var k = 0; k < localVars.order.length; ++k) {
		var ret = "";
		var i = localVars.order[k];

		if (!items.Consumables.hasOwnProperty(i)) continue;

		var count = 0; 
		for (var j = 0; j < items.Consumables[i].length; ++j)
			count += items.Consumables[i][j].Count;
			
		ret += "\r\n\r\n[size=15][color=orange][b]" + i + "[/b][/color][/size] -> [i]" + count + "[/i]";
		
		
		if(true)
		{
			ConsumablesType=new Array();
			for(var j=0;j< items.Consumables[i].length; ++j)
			{
				
				if(!ConsumablesType.contains(items.Consumables[i][j].FullClassType))
				{
					ConsumablesType.push(items.Consumables[i][j].FullClassType);
				}
			}
			for(var lhy=0;lhy< ConsumablesType.length; ++lhy)
			{
				ret +=  "\r\n\t[size=12][color=palegreen][b]"+ConsumablesType[lhy]+"[/b][/color][/size]";
				ret +="\r\n[table border=1]\r\n\t";
				for(var j=0;j<items.Consumables[i].length; ++j)
				{
					if(items.Consumables[i][j].FullClassType==ConsumablesType[lhy])
					{
						ret +="[tr][td]"
							+	"\r\n\t" 
							+ 	items.Consumables[i][j].Count +"x "
							+ 	"[item: " + items.Consumables[i][j].Name + "] " 
								
							if (items.Consumables[i][j].Grafting.length > 0) {
								for (var l = 0; l < items.Consumables[i][j].Grafting.length; ++l)
									ret += ":g" + items.Consumables[i][j].Grafting[l] + ":";
								ret += " ";
							}
						ret +="[/td][td]";
						ret += "[color=tomato](" + items.Consumables[i][j].CCount + "/" + items.Consumables[i][j].Count * items.Consumables[i][j].MaxCCount + "/~" + Math.floor(items.Consumables[i][j].CCount / items.Consumables[i][j].Count) + ")[/color]";
						ret +="[/td][/tr]"
					}
				}
				ret +="\r\n[/table]";
			}
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
