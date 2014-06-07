//-----------------------------------------------------------------------------
// [WoD] Extra Equipment Stats
// Version 1.6, 2011-05-03
// Copyright (c) Tomy, code started based on Fenghou's "[WoD] Extra Statistics script"
// Script aimed at players of World Of Dungeons (.net version). Displays number of extra stats your armor gives you. 
//
// When you enter your attributes page, a new button will appear at the bottom of page.
// Pressing this button will fetch info about equipment your hero is wearing and display 
// cumulative info (like total attack bonus, total defense bonus, etc...) at the bottom of the page.
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
// Changelog
// 1.7 - replaced cookie use by localstorgae for Opera compatibility
// 1.6 - fixed parsing bug due to design changes	
// 1.5 Fixed multiple percent calculation: fixed percents are now multiplied
// 1.4 Added French version support
//  Fix of HL replace when HL is included in HL_Per. Not fully tested
//  Clan monument analysis not tested in french
// 1.3
// - saving last calculated result and displaying immediately on page load
// - removed "!! " from "reset point required to remove" items
// - changed way items are displayed when multiple items contribute to single stat (no more button to press)
//
// 1.2
// - fix for "+hero level" parsing bug
//
// 1.1
// - button disabled while equipment info is being fetched/calculated to prevent doing it multiple times simultaneously
// - status text moved below button so it doesn't "jump" up/down when status is empty/not empty
// - removed usage count from names of consumable items
// - changed way how items that can be worn multiple times are displayed, if effect is "only when used with" it will be
//   displayed only once, if not it will be displayed once but with x2, x3, x4.... appended to item name (and effect multiplied naturally)
//   I.E. 
//      if 3 song books ballad of evasion are worn it will show only once in bonus for the level of the skill area (with (a) modifier)
//      if 3 skulls are worn it will show only once as "skull x3" having spell defense bonus equal to 3
// - added calculation of current bonus/malus value based on current hero level
// - added clan monument stats into calculations
// - fixed problem with bonus for the effect of the skill caused by additional description being added above effect bonus table
//
// 1.0 
// - initial release
//-----------------------------------------------------------------------------


// ==UserScript==
// @name           Extra Armor Stats
// @namespace      tomy
// @description    Displays number of extra stats your armor gives you.
// @include        http*://*.world-of-dungeons.net/wod/spiel/hero/attributes.php*
// @include        http*://*.world-of-dungeons.fr/wod/spiel/hero/attributes.php*
// ==/UserScript==

var DEBUG = true;
var VER = "1.4";
var LOCAL_VAR_NAME = "WOD ARMOR STATS " + location.host;

var Equipment = false;
var Result = false;
var Attribs = false;
var Level = false;
var Effect = false;
var DamageTaken = false;
var Defense = false;
var Damage = false;
var Attack = false;

var HeroLevel = undefined;

var KeyButton = null;

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

String.prototype.startsWith = function(prefix) {
    return this.indexOf(prefix) == 0;
};

String.prototype.removeRight = function(suffix) {
	if (!this.endsWith(suffix)) return String(this);
	return String(this).substring(0, this.length - suffix.length);
};

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}

String.prototype.space_clear = function() {
	var tmp = this;
	while (tmp.indexOf("  ") !== -1) tmp = tmp.replace("  ", "");
	return tmp;
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

function SetStatus(text, index, max) 
{
	var tmpText = text;
	if (max > 0) text = text + " (" + index + "/" + max + ")";
	Result.innerHTML = "<h3>" + text + "<h3>";
}

function trim( data )
{
  // Use ECMA-262 Edition 3 String and RegExp features
  data = data.replace(/[\t\n\r ]+/g, " ");
  if (data.charAt(0) == " ")
    data = data.substring(1, data.length);
  if (data.charAt(data.length - 1) == " ")
    data = data.substring(0, data.length - 1);
  return data;
}

var Contents = {
	  Button_Name		: ["Calculate additional equipment stats", "", "Calculer les stats"]
	, Title             : ["<h1>Additional equipment statistics</h1>Last calculated on ", "", "<h1>Stats d'équipement supplementaires.</h1>Dernière mise à jour "]
	, Fetch_Hero		: ["Fetching hero info", "", "Recherche du héros"]
	, Fetch_Clan		: ["Fetching clan info", "", "Recherche du clan"]
	, Fetch_Equipment	: ["Fetching equipment list", "", "Recherche de l'équipement"]
	, Fetch_Info		: ["Fetching equipment info", "", "Recherche des infos"]
	, Armor_Bonus       : ["Armor bonus", "", "Bonus d'armure"]
	, Attr_Bonus        : ["Attribute bonus", "", "Bonus sur les particularités"]
	, Level_Bonus       : ["Bonus for the level of the skill", "", "Bonus sur le rang de talents"]
	, Effect_Bonus      : ["Bonus for the effect of the skill", "", "Bonus sur l'effet de talents"]
	, Damage_Taken      : ["Damage taken from damage types", "", "Bonus sur la sensibilité aux dégâts"]
	, Defense_Bonus     : ["Defense bonus", "", "Bonus sur les parades"]
	, Damage_Bonus      : ["Damage bonus", "", "Bonus sur les dégâts"]
	, Damage_BonusR     : ["Damage Bonus (r)", "", "Bonus de dégâts (r)"]
	, Attack_Bonus      : ["Attack bonus", "", "Bonus sur les attaques"]
	, Item				: ["Item", "", "Objet"]
	, Attribute			: ["Attribute", "", "Attribut"]
	, Skill				: ["Skill", "", "Talent"]
	, Modifier			: ["Modifier", "", "Modificateur"]
	, Value				: ["Value", "", "Valeur"]
	, Used_With         : [" (a)", "", " (a)"]
	, Dmg_With          : [" (z)", "", " (z)"]
	, Per				: ["%", "", "%"]
	, HL_Per            : ["% of your hero`s level", "", "% du niveau du héros"]
	, HL                : ["hero level", "", "du niveau du héros"]
	, Mult              : [" x ", "", " x "]
	, Attack_Type       : ["Attack Type", "", "Sorte d'attaque"]
	, Show_All			: ["Show all", "", ""]
	, Dmg_Split         : [" / ", "", " / "]
	, Damage_Type       : ["Damage Type", "", "Sorte de dégâts"]
	, BonusR            : ["Bonus (r)", "", "Bonus (r)"]
	, Owner_Effect      : ["Effect on the owner of this item", "", "Effets sur le propriétaire de l'objet"]
	, Race_Name			: ["race", "", "Peuple"]
	, Level				: ["Level", "", "Niveau"]
	, Adv_Disadv        : ["advantages - disadvantages", "", "Avantages et inconvénients"]
	, Monument          : ["monument", "", "monument"]
	, Clan_Has_Monument : ["The clan owns the monument", "", "Le clan possède le monument"]
	, Link              : ["Link ...", "", "Lien ..."]
	, Item_Skill        : ["the penalty or bonus are active when the item is used with one of the above mentioned skills.", "", "uniquement quand l'objet est utilisé en combination avec l'un des talents indiqués ci-dessus"]
	, Effect_BonusTalent: ["<p>Increase the bonus on the <b>effect</b>, <u>not</u> the <b>level</b> of the skill. The bonuses will be added to the amount of <b>damage</b> (when using that type of attack) or the amount of <b>healing</b> (when healing).</p>", "", "<p>Le bonus sur l'<b>Effet</b> n'augmente pas le <b>Rang</b> du talent. Au lieu de ça, les bonus sont ajoutés aux <b>dommages</b> (pour le type 'Attaques') ou aux <b>soins</b> (pour le type'Guérison').</p>"]
	, Damage_Added      : ["additionally -  when damage of this type is dealt", "", "Supplémentaire - uniquement quand des dégâts de ce genre sont causés"]
	, Damage_Effect     : ["is added upon normal / good / critical hits as an additional <i>effect</i> to the weapon used.", "", "lors de coups normaux / complets / critiques, est ajouté à l'effet de l'arme utilisée."]
	, Damage_NegEffect  : ["by normal / good / critical hits as an additional <i>effect</i> to the weapon used.", "", "lors de coups normaux / complets / critiques, est retranché à l'effet de l'arme utilisée."]
};

var MandatoryProps = {};

try {Main();} catch(e) {alert("Main(): " + e);}


// FUNCTIONS //////////////////////////////////////////////////////////////////

function Main()
{
    // Language selection
    Local = GetLocalContents(Contents);
    if (Local === null) return;

    MandatoryProps[Contents.Attr_Bonus] = [Contents.Attribute, Contents.Modifier];
	MandatoryProps[Contents.Level_Bonus]	= [Contents.Skill, Contents.Modifier];
	MandatoryProps[Contents.Effect_Bonus]	= [Contents.Skill, Contents.Modifier];
	MandatoryProps[Contents.Damage_Taken]	= [Contents.Attack_Type, Contents.BonusR, Contents.Damage_Type];
	MandatoryProps[Contents.Attack_Bonus]	= [Contents.Attack_Type, Contents.Modifier];
	MandatoryProps[Contents.Damage_Bonus]	= [Contents.Attack_Type, Contents.Damage_BonusR, Contents.Damage_Type];
	MandatoryProps[Contents.Defense_Bonus]	= [Contents.Attack_Type, Contents.Modifier];
	MandatoryProps[Contents.Armor_Bonus] = [];

	// Add buttons
	KeyButton = AddButtonBeforeHints(Contents.Button_Name, OnCountStat);

	if (KeyButton == null) return;

	var nHeroId = GetHiddenInfo(document, "session_hero_id", "");
	var tmp = window.localStorage.getItem(LOCAL_VAR_NAME + nHeroId);
	if (tmp != undefined) {
		tmp = eval(tmp);
		if (tmp.version == VER) {
			Result.innerHTML = tmp.text;
		}
	} 
}


// It will only add the first eligible button
// return: the node of the first eligible disabled button, or null if didn't find anyone
function AddButtonBeforeHints(ButtonText, ButtonFunct)
{
	var allInputs = document.getElementsByTagName("div");
	for (var i = 0; i < allInputs.length; ++i)
	{
	if (allInputs[i].className == "hints on" || allInputs[i].className == "hints off")
		{
			var newTable = document.createElement("table");
			var newTR = document.createElement("tr");
			var newTD = document.createElement("td");
			var resTR = document.createElement("tr");
			Result = document.createElement("td");
			var newButton = document.createElement("input");
			newButton.setAttribute("type", "button");
			newButton.setAttribute("class", "button");
			newButton.setAttribute("value", ButtonText);
			newButton.addEventListener("click", ButtonFunct, false);
			newTable.appendChild(newTR);
			newTR.appendChild(newTD);
			newTD.appendChild(newButton);
			newTable.appendChild(resTR);
			resTR.appendChild(Result);
			allInputs[i].parentNode.insertBefore(newTable, allInputs[i]);
			var newP1 = document.createElement("br");
			var newP2 = document.createElement("br");
			allInputs[i].parentNode.insertBefore(newP1, newTable);
			allInputs[i].parentNode.insertBefore(newP2, newTable);
			return newButton;
		}
	}
	return null;
}

// Choose contents of the corresponding language
// Contents: {Name1 : [lang1, lang2, ...], Name2 : [lang1, lang2, ...], ...}
// return: Local contents, or null
// It will edit the input contents directly, so the returned object is not necessary
function GetLocalContents(Contents)
{
	function GetLanguageId()
	{
		var langText = null;
		var allMetas = document.getElementsByTagName("meta");
		for (var i = 0; i < allMetas.length; ++i)
		{
			if (allMetas[i].httpEquiv == "Content-Language")
			{
				langText = allMetas[i].content;
				break;
			}
		}
		if (langText == null)
			return false;

		switch (langText)
		{
			case "en":
				return 0;
			case "cn":
				return 1;
			case "fr":
				return 2;
			default:
				return null;
		}
	}

	var nLangId = GetLanguageId();
	if (nLangId == null)
		return null;

	if (Contents instanceof Object)
	{
		for (var name in Contents)
			Contents[name] = Contents[name][nLangId];
		return Contents;
	}
	else
		return null;
}

function Value(text) 
{
	if (!text) text = "";
	this.abs = 0;
	this.per = 0;
	this.hlper = 0;
	
	var hl = text.replace(Contents.Mult + Contents.HL, "00" + Contents.HL_Per);
	hl = hl.replace("+ " + Contents.HL, "+100" + Contents.HL_Per);
	hl = hl.replace("- " + Contents.HL, "-100" + Contents.HL_Per);
	hl = hl.replace(Contents.HL_Per, "HL");

	var arr = hl.split(" ");
	var txt = "";
	for (var j = 0; j < arr.length; ++j) {
		if (arr[j].endsWith(Contents.Per)) this.per = (arr[j].removeRight(Contents.Per) * 1);
		else if (arr[j].endsWith("HL")) this.hlper = (arr[j].removeRight("HL") * 1);
		else this.abs = arr[j] * 1;
	}
}

Value.prototype.Add = function(RightVal)
{
	var ret = new Value(this.Txt());

	ret.abs += RightVal.abs;
	ret.per = ret.per + RightVal.per + ret.per*RightVal.per/100;
	ret.hlper += RightVal.hlper;
	
	return ret;
};

Value.prototype.Mult = function(rhs)
{
	var ret = new Value(this.Txt());

	ret.abs *= rhs;
	ret.per = Math.pow(ret.per,rhs);
	ret.hlper *= rhs;
	
	return ret;
};

Value.prototype.Txt = function()
{
	var txt = "";

	if (this.abs != 0) {
		txt += (this.abs > 0 ? "+" + this.abs : this.abs) + " ";
	}
	
	if (this.per != 0) {
		txt += (this.per > 0 ? "+" + this.per : this.per) + Contents.Per + " ";
	}

	if (this.hlper != 0) {

		if (Math.abs(this.hlper) == 100) {
			txt += (this.hlper > 0 ? "+" : "-") + Contents.HL + " ";
		} else if (Math.abs(this.hlper) % 100 == 0) {
			txt += (this.hlper > 0 ? "+" : "") + Math.Round(this.hlper / 100) + Contents.Mult + Contents.HL + " ";
		} else {
			txt += (this.hlper > 0 ? "+" : "") + this.hlper + Contents.HL_Per + " ";
		}
	}

	if (txt.length == 0) txt = "0";
	
	return txt.trim();
};

Value.prototype.Html = function(negative) {
    var txt = "";
    if (negative == undefined) negative = false;

    var mult = (negative ? -1 : 1);

    if (this.abs != 0) {
        txt += "<span class=\"gem_" + (this.abs * mult > 0 ? "bonus" : "malus") + "\">" + (this.abs > 0 ? "+" + this.abs : this.abs) + "</span> ";
    }

    if (this.per != 0) {
        txt += "<span class=\"gem_" + (this.per * mult > 0 ? "bonus" : "malus") + "\">" + (this.per > 0 ? "+" + this.per.toFixed(2) : this.per.toFixed(2)) + Contents.Per + "</span> ";
    }

    if (this.hlper != 0) {
        if (Math.abs(this.hlper) == 100) {
            txt += "<span class=\"gem_" + (this.hlper * mult > 0 ? "bonus" : "malus") + "\">" + (this.hlper > 0 ? "+" : "-") + Contents.HL + "</span> ";
        } else if (Math.abs(this.hlper) % 100 == 0) {
            txt += "<span class=\"gem_" + (this.hlper * mult > 0 ? "bonus" : "malus") + "\">" + (this.hlper > 0 ? "+" : "") + Math.Round(this.hlper / 100) + Contents.Mult + Contents.HL + "</span> ";
        } else {
            txt += "<span class=\"gem_" + (this.hlper * mult > 0 ? "bonus" : "malus") + "\">" + (this.hlper > 0 ? "+" : "") + this.hlper + Contents.HL_Per + "</span> ";
        }
    }

    if (txt.length == 0) txt = "0";

    return txt.trim();
};

Value.prototype.Calc = function(hero_level)
{
	var ret = new Value(this.Txt());
	if (hero_level != undefined) {
		ret.abs = Math.round(ret.abs + hero_level * ret.hlper / 100);
		ret.hlper = 0;
	}

	return ret;
};

function Dmg(text) 
{
	if (!text) text = Contents.Dmg_Split + Contents.Dmg_Split;

	var arr = text.split(Contents.Dmg_Split);
	this.dmg = [new Value(arr[0]), new Value(arr[1]), new Value(arr[2])];
}

Dmg.prototype.Add = function(RightVal)
{
	var ret = new Dmg(this.Txt());

	for (var i = 0; i < 3; ++i) {
		ret.dmg[i] = ret.dmg[i].Add(RightVal.dmg[i]);
	}
	
	return ret;
};

Dmg.prototype.Mult = function(rhs)
{
	var ret = new Dmg(this.Txt());

	for (var i = 0; i < 3; ++i) {
		ret.dmg[i] = ret.dmg[i].Mult(rhs);
	}
	
	return ret;
};

Dmg.prototype.Txt = function()
{
	return this.dmg[0].Txt() + Contents.Dmg_Split + this.dmg[1].Txt() + Contents.Dmg_Split + this.dmg[2].Txt();
};

Dmg.prototype.Html = function(negative)
{
	return this.dmg[0].Html(negative) + Contents.Dmg_Split + this.dmg[1].Html(negative) + Contents.Dmg_Split + this.dmg[2].Html(negative);
};

Dmg.prototype.Calc = function(hero_level)
{
	var ret = new Dmg(this.Txt());
	for (var i = 0; i < 3; ++i) {
		ret.dmg[i] = ret.dmg[i].Calc(hero_level);
	}
	
	return ret;
};

function OnCountStat()
{
	try	{
		if (this.className == "button_disabled")
			return;
		else
			this.className = "button_disabled";
		
		Result.innerHTML = "";
		Attribs = new Object();
		Level = new Object();
		Effect = new Object();
		DamageTaken = new Object();
		Defense = new Object();
		Damage = new Object();
		Attack = new Object();
		Equipment = new Array();

		var nHeroId = GetHiddenInfo(document, "session_hero_id", "");
		var nPlayerId = GetHiddenInfo(document, "session_player_id", "");

		GetHeroInfo(nHeroId, nPlayerId);
	} catch (e) {
		alert("OnCountStat(): " + e);
	}
}

function GetHeroInfo(heroID, playerID)
{
	var XmlHttp = new XMLHttpRequest();

	XmlHttp.onreadystatechange = function ()
	{
		try	{
			if (XmlHttp.readyState == 4 && XmlHttp.status == 200)
			{
				var Page = document.createElement("div");
				Page.innerHTML = XmlHttp.responseText;
				ReadHeroInfo(Page);
				GetClanInfo(heroID, playerID);
			}
		}
		catch (e) {alert("XMLHttpRequest.onreadystatechange(): " + e);}
	};

	var URL = location.protocol + "//" + location.host + "/wod/spiel/hero/profile.php?id=" + heroID + "&session_hero_id=" + heroID + "&IS_POPUP=1";
		
	SetStatus(Contents.Fetch_Hero, 0, 0);
	
	XmlHttp.open("GET", URL, true);
	XmlHttp.send(null);
}

function ReadHeroInfo(Document)
{
	var allTD = Document.getElementsByTagName("td");
	var url = "";
	for (var i = 0; i < allTD.length - 1; ++i)
	{
		if(allTD[i].innerHTML == Contents.Race_Name) {
			var tmpName = allTD[i+1].textContent.trim().removeRight("*");
			var allA = allTD[i+1].getElementsByTagName("a");
			if (allA.length == 1) {
				var href = allA[0].getAttribute("href");
				Equipment.push({id:0, name:tmpName, link:href, count:1, okH2:Contents.Adv_Disadv});
			} else {
				alert("ReadHeroInfo failed " + allA.length);
			}
		} else if(allTD[i].innerHTML == Contents.Level) {
		    HeroLevel = allTD[i + 1].textContent.trim();
		    
		}
	}
}

function GetClanInfo(heroID, playerID) {
	var XmlHttp = new XMLHttpRequest();

	XmlHttp.onreadystatechange = function ()
	{
		try	{
			if (XmlHttp.readyState == 4 && XmlHttp.status == 200)
			{
				var Page = document.createElement("div");
				Page.innerHTML = XmlHttp.responseText;
				ReadClanInfo(Page);
				GetEquipment(heroID, playerID);
			}
		}
		catch (e) {alert("XMLHttpRequest.onreadystatechange(): " + e);}
	};

	var URL = location.protocol + "//" + location.host + "/wod/spiel/clan/clan.php?session_hero_id=" + heroID + "&IS_POPUP=1";
		
	SetStatus(Contents.Fetch_Clan, 0, 0);
	
	XmlHttp.open("GET", URL, true);
	XmlHttp.send(null);
}

function ReadClanInfo(Document)
{
	var allH2 = Document.getElementsByTagName("h2");
	for (var j = 0; j < allH2.length; ++j) {
		if (trim(allH2[j].textContent) != Contents.Monument)
			continue;
			
		var firstSibling = allH2[j].nextSibling;
		var nextSibling = firstSibling.nextSibling;
		
		if (firstSibling.nodeName == "#text" && nextSibling.nodeName == "A" && trim(firstSibling.textContent) == Contents.Clan_Has_Monument) {
			Equipment.push({id:0, name:nextSibling.textContent, link:nextSibling.getAttribute("href"), count:1, okH2:undefined});
		}
	}
}

function GetHiddenInfo(Document, InfoName, DefaultValue)
{
	var allInputs = Document.getElementsByTagName("input");
	for (var i = 0; i < allInputs.length; ++i)
	{
		if (allInputs[i].getAttribute("type") == "hidden" &&
			allInputs[i].name == InfoName)
			return allInputs[i].value;
	}
	return DefaultValue;
}

function GetEquipment(heroID, playerID)
{
	var XmlHttp = new XMLHttpRequest();

	XmlHttp.onreadystatechange = function ()
	{
		try	{
			if (XmlHttp.readyState == 4 && XmlHttp.status == 200)
			{
				var Page = document.createElement("div");
				Page.innerHTML = XmlHttp.responseText;
				ReadEquipment(Page, heroID, playerID);
				GetItem(0, heroID, playerID);
			}
		}
		catch (e) {alert("XMLHttpRequest.onreadystatechange(): " + e);}
	};

	var URL = location.protocol + "//" + location.host + "/wod/spiel/hero/items.php" +
		"?view=gear" + 
		"&session_hero_id=" + heroID;
		
	SetStatus(Contents.Fetch_Equipment, 0, 0);
	
	XmlHttp.open("GET", URL, true);
	XmlHttp.send(null);
}

function ReadEquipment(Document, heroID, playerID)
{
	var allForms = Document.getElementsByTagName("form");

	for (var i = 0; i < allForms.length; ++i)
	{
		if (allForms[i].getAttribute("name") == "the_form") {
			var allTDs = allForms[i].getElementsByTagName("td");
			for (var k = 0; k < allTDs.length; ++k) {
				var allOptions = allTDs[k].getElementsByTagName("option");
				var allTable = allTDs[k].getElementsByTagName("table");
				if (allTable.length > 0 || allOptions.length == 0) continue;
				var lastID = undefined;
				var lastName = undefined;
				for (var j = 0; j < allOptions.length; ++j)
				{
					var tmpId = allOptions[j].getAttribute("value") * -1;
					if (tmpId > 0) lastID = tmpId;
					if (tmpId == 0) {
						var tmpName = allOptions[j].innerHTML;
						if (tmpName.charAt(tmpName.length - 1) == "!") tmpName = tmpName.substr(0, tmpName.length - 1);
						lastName = tmpName;
					}
				}
				if (lastID != undefined && lastName != undefined) {
					if (/[^\(]*\([0-9]*\/[0-9]*\)/.test(lastName)) {
						lastName = lastName.replace(/\([0-9]*\/[0-9]*\)/g, "");
					}
					if (lastName.startsWith("!! ")) lastName = lastName.substring(3);

					var found = false;
					for (var z = 0; z < Equipment.length; ++z) {
						if (Equipment[z].name == lastName) {
							Equipment[z].count++;
							found = true;
							break;
						}
					}
					if (!found)
						Equipment.push({id:lastID, name:lastName, link:"/wod/spiel/hero/item.php?key=" + lastID + "&session_hero_id=" + heroID + "&session_player_id=" + playerID + "&is_popup=1", count:1, okH2:Contents.Owner_Effect});
				}
			}
			
		}
	}
}

function GetItem(index, heroID, playerID)
{
	if (index == Equipment.length) {
		DisplayResult(heroID);
		return;
	}
	
	var XmlHttp = new XMLHttpRequest();

	XmlHttp.onreadystatechange = function ()
	{
		try	{
			if (XmlHttp.readyState == 4 && XmlHttp.status == 200)
			{
				var Page = document.createElement("div");
				Page.innerHTML = XmlHttp.responseText;
				ParseItem(index, Page);
				GetItem(index + 1, heroID, playerID);
			}
		}
		catch (e) {alert("XMLHttpRequest.onreadystatechange(): " + e);}
	};

	var URL = location.protocol + "//" + location.host + Equipment[index].link;
		
	SetStatus(Contents.Fetch_Info, index + 1, Equipment.length);
	
	XmlHttp.open("GET", URL, true);
	XmlHttp.send(null);
}

function CheckProperties(name, data, props) {
	var ret = true;
	
	for (var j = 0; j > props.length; ++j) {
		if (!data.hasOwnProperty(props[j])) {
			alert("Missing field + " + name + " - " + props[j]);
			ret = false;
		}
	}
	
	return ret;
}

function PushWithCreateSubarrays(data, names, value) {
	for (var j = 0; j < names.length; ++j) {
		if (!data.hasOwnProperty(names[j])) {
			if (j != names.length - 1) {
				data[names[j]] = new Object();
			}
			else {
				data[names[j]] = new Array();
			}
		}
		data = data[names[j]];
	}
	data.push(value);
}


function ParseItem(index, Document) {
	var allChildren = undefined;
	var okH2 = Equipment[index].okH2;
	if (okH2 != undefined) {
		var allH2 = Document.getElementsByTagName("h2");
		for (var i = 0; i < allH2.length; ++i) {
			if (allH2[i].textContent == okH2) {
				allChildren = allH2[i].parentNode.childNodes;
				break;
			}
		}
	} else {
		allChildren = Document.getElementsByTagName("form")[0].childNodes;
	}

	if (allChildren != undefined) {
		var ok = (okH2 == undefined);
		for (var j = 0; j < allChildren.length - 2; ++j) {
			if (allChildren[j].nodeName == "H2") {
				var tmpH2 = trim(allChildren[j].textContent);
				if (tmpH2.length > 0 && okH2 != undefined) {
					ok = (tmpH2 == okH2);
				}
			} else if (ok && allChildren[j].nodeName == "H3" && (allChildren[j+2].nodeName == "TABLE" || allChildren[j+2].nodeName == "P" && allChildren[j+3].nodeName == "#text" && allChildren[j+4].nodeName == "TABLE")) {
				var name = trim(allChildren[j].textContent);
				var parsed = undefined;
				if (allChildren[j+2].nodeName == "TABLE")
					parsed = ParseTable(allChildren[j+2]);
				else 
					parsed = ParseTable(allChildren[j+4]);

				if (MandatoryProps.hasOwnProperty(name) && CheckProperties(name, parsed[k], MandatoryProps[name])) {
				    for (var k = 0; k < parsed.length; ++k) {
				        if (name == Contents.Armor_Bonus) {
				            // ignored, no hidden bonus here
						} else if (name == Contents.Attr_Bonus) {
							if (parsed[k][Contents.Modifier].endsWith(Contents.Used_With)) {
								PushWithCreateSubarrays(Attribs, 
									[parsed[k][Contents.Attribute]], 
									{	  value		: new Value(parsed[k][Contents.Modifier].removeRight(Contents.Used_With))
										, item		: index
										, used_with	: true
									}
								);
							}
						} else if (name == Contents.Level_Bonus) {
							if (parsed[k][Contents.Modifier].endsWith(Contents.Used_With)) {
								PushWithCreateSubarrays(Level, 
									[parsed[k][Contents.Skill]], 
									{	  value		: new Value(parsed[k][Contents.Modifier].removeRight(Contents.Used_With))
										, item		: index
										, used_with	: true
									}
								);
							}
						} else if (name == Contents.Effect_Bonus) {
							PushWithCreateSubarrays(Effect, 
								[parsed[k][Contents.Skill]], 
								{	  value		: new Value(parsed[k][Contents.Modifier].removeRight(Contents.Used_With))
									, item		: index
									, used_with	: parsed[k][Contents.Modifier].endsWith(Contents.Used_With)
								}
							);
						} else if (name == Contents.Damage_Taken) {
							PushWithCreateSubarrays(DamageTaken, 
								[parsed[k][Contents.Damage_Type], parsed[k][Contents.Attack_Type].removeRight(Contents.Used_With)], 
								{	  value			: new Dmg(parsed[k][Contents.BonusR].removeRight(Contents.Dmg_With))
									, item			: index
									, in_addition	: parsed[k][Contents.BonusR].endsWith(Contents.Dmg_With)
									, used_with		: parsed[k][Contents.Attack_Type].endsWith(Contents.Used_With)
								}
							);
						} else if (name == Contents.Attack_Bonus) {
							PushWithCreateSubarrays(Attack, 
								[parsed[k][Contents.Attack_Type]], 
								{	  value		: new Value(parsed[k][Contents.Modifier].removeRight(Contents.Used_With))
									, item		: index
									, used_with	: parsed[k][Contents.Modifier].endsWith(Contents.Used_With)
								}
							);
						} else if (name == Contents.Damage_Bonus) {
							PushWithCreateSubarrays(Damage, 
								[parsed[k][Contents.Damage_Type], parsed[k][Contents.Attack_Type].removeRight(Contents.Used_With)], 
								{	  value			: new Dmg(parsed[k][Contents.Damage_BonusR].removeRight(Contents.Dmg_With))
									, item			: index
									, in_addition	: parsed[k][Contents.Damage_BonusR].endsWith(Contents.Dmg_With)
									, used_with		: parsed[k][Contents.Attack_Type].endsWith(Contents.Used_With)
								}
							);
						} else if (name == Contents.Defense_Bonus) {
							PushWithCreateSubarrays(Defense, 
								[parsed[k][Contents.Attack_Type]], 
								{	  value		: new Value(parsed[k][Contents.Modifier].removeRight(Contents.Used_With))
									, item		: index
									, used_with	: parsed[k][Contents.Modifier].endsWith(Contents.Used_With)
								}
							);
						} 
					}
				} else {
					if (okH2 != undefined || name != Contents.Link)
						alert("Unknown stat: " + name);
				}
				j+=(allChildren[j+2].nodeName == "TABLE" ? 2 : 4);
			}
		}
	}
}	

function AddTableRow(isHeader, index, data, center) {
	var td = "td"
	if (isHeader) td = "th";
	
	var ret = "";
	if (data.length > 0) {
		ret = "<tr class=\"" + (isHeader ? "header" : "row" + (index % 2))+ "\">";
		for (var j = 0; j < data.length; ++j) {
			var centertxt = "";
			if (center != undefined) {
				if (typeof center == 'object' && center[j] || typeof center == "boolean" && center)  centertxt = " align=\"center\"";
			}
			ret += "<" + td + " class=\"content_table\"" + centertxt + ">" + data[j] + "</" + td + ">";
		}
		ret += "</tr>";
	}
	
	return ret;
}

function GetEquipmentName(index, multiples) {
	return Equipment[index].name.replace("'", "") + (multiples && Equipment[index].count > 1 ? " x" + Equipment[index].count : "");
}

function GetEquipmentHref(index, multiples) {
	return "<a onclick=\"return wo('" + Equipment[index].link + "&amp;IS_POPUP=1');\" target=\"_blank\" class=\"item_usable\" href=\"" + Equipment[index].link + "&amp;IS_POPUP=1\" id=\"___wodToolTip_UniqueId__1\">" + GetEquipmentName(index, multiples) + "</a>";
}

function AddTable(heroID, Where, Data, heading, headers, desc) 
{
	var display = false;
	var txt = "<h3>" + heading + "</h3>"
	if (desc != undefined) txt += desc;
	txt += "<table class=\"content_table\"><tbody>"
	txt += AddTableRow(true, 0, headers);

	var j = 0;
	var havea = false;
	for (var k in Data) {
		var total = new Value();
		var disp = "<table style=\"font-size: 10px;\">";
		var last_disp = "";
		var cnt = 0;
		for (var i = 0; i < Data[k].length; ++i) {
			if (Data[k][i].used_with) continue;
			total = total.Add(Data[k][i].value.Mult(Equipment[Data[k][i].item].count));
			disp += "<tr><td>" + GetEquipmentHref(Data[k][i].item, true) + "</td><td>" + Data[k][i].value.Mult(Equipment[Data[k][i].item].count).Html() + "</td></tr>";
			last_disp = GetEquipmentHref(Data[k][i].item, true);
			cnt++;
		}
		disp += "</table>";
		
		if (cnt > 0) {
			txt += AddTableRow(false, j, 
				[	  k
					, total.Html()
					, total.Calc(HeroLevel).Html()
					, (cnt > 1 ? disp : last_disp)
				],
				[false, true, true, false]
			);
			j++;
		}
		for (var i = 0; i < Data[k].length; ++i) {
			if (!Data[k][i].used_with) continue;
			txt += AddTableRow(false, j, 
				[	  k
					, Data[k][i].value.Html() + "<sup>" + Contents.Used_With + "</sup>"
					, Data[k][i].value.Calc(HeroLevel).Html() + "<sup>" + Contents.Used_With + "</sup>"
					, GetEquipmentHref(Data[k][i].item, false)
				],
				[false, true, true, false]
			);
			j++;
			havea = true;
		}
	}
	txt += "</tbody></table>";
	if (havea) txt += "<font size=\"-1\"><sup>(a)</sup> " + Contents.Item_Skill + "</font>";
	
	if (j > 0) Where.innerHTML += txt;
}

function AddTableEx(heroID, Where, Data, heading, headers, negative) 
{
	if (negative == undefined) negative = false;
	
	var display = false;
	var txt = "<h3>" + heading + "</h3><table class=\"content_table\"><tbody>";
	txt += AddTableRow(true, 0, headers);

	var j = 0;
	var havea = false;
	var havez = false;
	for (var k in Data) {
		for (var l in Data[k]) {
			var total = new Dmg();
			var disp = "<table style=\"font-size: 10px;\">";
			var last_disp = "";
			var cnt = 0;
			for (var i = 0; i < Data[k][l].length; ++i) {
				if (Data[k][l][i].used_with || Data[k][l][i].in_addition) continue;
				total = total.Add(Data[k][l][i].value.Mult(Equipment[Data[k][l][i].item].count));
				disp += "<tr><td>" + GetEquipmentHref(Data[k][l][i].item, true) + "</td><td>" + Data[k][l][i].value.Mult(Equipment[Data[k][l][i].item].count).Html(negative) + "</td></tr>";
				last_disp = GetEquipmentHref(Data[k][l][i].item, true);
				cnt++;
			}
			disp += "</table>";
			if (cnt > 0) {
				txt += AddTableRow(false, j, 
					[	  k
						, l
						, total.Html(negative)
						, total.Calc(HeroLevel).Html(negative)
						, (cnt > 1 ? disp  : last_disp)
					],
					[false, true, true, true, false]
				);
				j++;
			}

			total = new Dmg();
			disp = "<table style=\"font-size: 10px;\">";
			last_disp = "";
			cnt = 0;
			for (var i = 0; i < Data[k][l].length; ++i) {
				if (Data[k][l][i].used_with || !Data[k][l][i].in_addition) continue;
				total = total.Add(Data[k][l][i].value.Mult(Equipment[Data[k][l][i].item].count));
				disp += "<tr><td>" + GetEquipmentHref(Data[k][l][i].item, true) + "</td><td>" + Data[k][l][i].value.Mult(Equipment[Data[k][l][i].item].count).Html(negative) + "</td></tr>";
				last_disp = GetEquipmentHref(Data[k][l][i].item, true);
				cnt++;
			}
			disp += "</table>";
			if (cnt > 0) {
				txt += AddTableRow(false, j, 
					[	  k
						, l
						, total.Html(negative) + "<sup>" +  Contents.Dmg_With + "</sup>"
						, total.Calc(HeroLevel).Html(negative) + "<sup>" +  Contents.Dmg_With + "</sup>"
						, (cnt > 1 ? disp : last_disp)
					],
					[false, true, true, true, false]
				);
				j++;
				havez = true;
			}
			for (var i = 0; i < Data[k][l].length; ++i) {
				if (!Data[k][l][i].used_with) continue;
				txt += AddTableRow(false, j, 
					[	  k
						, l + "<sup>" + Contents.Used_With + "</sup>"
						, Data[k][l][i].value.Html(negative) + (Data[k][l][i].in_addition ? "<sup>" +  Contents.Dmg_With + "</sup>" : "")
						, Data[k][l][i].value.Calc(HeroLevel).Html(negative) + (Data[k][l][i].in_addition ? "<sup>" +  Contents.Dmg_With + "</sup>" : "")
						, GetEquipmentHref(Data[k][l][i].item, false)
					],
					[false, true, true, true, false]
				);
				j++;
				havea = true;
			}
		}
	}
	txt += "</tbody></table>";
	if (!negative) {
		txt += "<font size=\"-1\"><sup>(r)</sup> " + Contents.Damage_Effect + "</font><br>";
		if (havea) txt += "<font size=\"-1\"><sup>(a)</sup> " + Contents.Item_Skill + "</font><br>";
		if (havez) txt += "<font size=\"-1\"><sup>(z)</sup> " + Contents.Damage_Added + "</font>";
	} else {
		txt += "<font size=\"-1\"><sup>(r)</sup> by normal / good / critical hits</font>"
		if (havea) txt += "<font size=\"-1\"><sup>(a)</sup> " + Contents.Item_Skill + "</font><br>";
		if (havez) txt += "<font size=\"-1\"><sup>(z)</sup> " + Contents.Damage_Added + "</font>";
	}

	if (j > 0) Where.innerHTML += txt;
}

function DisplayResult(heroID) {
	Result.innerHTML = Contents.Title + new Date().toLocaleString();

	AddTable(heroID, Result, Attribs, Contents.Attr_Bonus, [Contents.Attribute, Contents.Modifier, Contents.Value, Contents.Item], undefined);
	AddTable(heroID, Result, Level, Contents.Level_Bonus, [Contents.Skill, Contents.Modifier, Contents.Value, Contents.Item], undefined);
	AddTable(heroID, Result, Effect, Contents.Effect_Bonus, [Contents.Skill, Contents.Modifier, Contents.Value, Contents.Item], Contents.Effect_BonusTalent);
	AddTable(heroID, Result, Attack, Contents.Attack_Bonus, [Contents.Attack_Type, Contents.Modifier, Contents.Value, Contents.Item], undefined);
	AddTable(heroID, Result, Defense, Contents.Defense_Bonus, [Contents.Attack_Type, Contents.Modifier, Contents.Value, Contents.Item], undefined);

	AddTableEx(heroID, Result, Damage, Contents.Damage_Bonus, [Contents.Damage_Type, Contents.Attack_Type, Contents.Damage_BonusR, Contents.Value, Contents.Item]);
	AddTableEx(heroID, Result, DamageTaken, Contents.Damage_Taken, [Contents.Damage_Type, Contents.Attack_Type, Contents.BonusR, Contents.Value, Contents.Item], true);

	if (KeyButton.className == "button_disabled")
		KeyButton.className = "button";
		
	window.localStorage.setItem(LOCAL_VAR_NAME + heroID, {text:Result.innerHTML, version:VER}.toSource());
}

function ParseTable(Document) {
	var ret = new Array();
	var names = new Array();
	var allTRs = Document.getElementsByTagName("tr");
	for (var j = 0; j < allTRs.length; ++j) {
		var tr = allTRs[j];
		if (tr.getAttribute("class") == "header") {
			var allTHs = tr.getElementsByTagName("th");
			for (var k = 0; k < allTHs.length; ++k) {
				names.push(allTHs[k].textContent.trim().space_clear());
			}
		} else {
			var allTDs = tr.getElementsByTagName("td");
			var row = new Array();
			for (var k = 0; k < allTDs.length; ++k) {
				row[names[k]]=allTDs[k].textContent.trim().space_clear();
			}
			ret.push(row);
		}
	}
	
	return ret;
}
