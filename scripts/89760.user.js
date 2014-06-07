// ==UserScript==
// @name            WestWars Czech Translation/ Taubda
// @author          Taubda
// @description     WestWars Czech Translation/ Taubda
// @version         0.07
// @include         http://apps.facebook.com/westwarsgame/?ref=bookmarks&count=0
// @include         http://apps.facebook.com/westwarsgame/*
// @include         http://fb.westwars.com/game/*
// @require         http://userscripts.org/scripts/source/89760.user.js
// ==/UserScript==

ScriptUpdater.check(90867, '0.7'); 

var strings = {
// translations

"There is a great deal going on right now. If you buy Gold nuggets right now, you will receive double the amount you paid for! Word in town is this “beta-deal” will come to an end soon." : "Je tu jedinečná šance. Pokud si koupíte zlaté nugety,dostanete dvojnásobný počet!",
"Jobs" : "Práce",
"Character" : "Charakter",
"Inventory" : "Inventář",
"Trader" : "Obchodník",
"Duel" : "Duely",
"Gang" : "Gang",
"Gold" : "Nugety",
"Pending invitation" : "Pozvánka",
"Ok" : "Ok",
"Ask For" : "Říci si",
"Add" : "Přidat",
"Add Member" : "Přidat člena",
"Buy gold now" : "Koupit si nugety",
"News" : "Novinky",
"Reports" : "Oznámení",
" attacked you!" : "Zaútočil na tebe!",
"You have lost the duel!" : "Prohrál jsi duel!",
"You have won the duel!" : "Vyhrál jsi duel!",
"Invite a greenhorn" : "Pozvy začátečníka",
"Invite WestWars players to your gang." : "Pozvi tvoje WestWars přátele do tvého gangu.",
"When the greenhorn reaches level 10, you receive " : "Když začátečník dosáhne 10 levelu získáš",
" 5 Gold " : " 5 Nugetů ",
"Energy Packs" : "Balíček Energie",
"Energy" : "Energie",
"Duel Energy" : "Duelová Energie",
"Strength" : "Síla",
"Damage" : "Poškození",
"Dodging" : "Uhýbání",
"Dexterity" : "Obratnost",
"Intelligence" : "Inteligence",
"Critical" : "Krytický zásah",
"Available Skillpoints" : "Body k dispozici",
"Share your Character!" : "Sdílej svůj charakter!",
"Profile" : "Profil",
"Achievements" : "Medajle",
"Profile Text" : "Profilový text",
"Share" : "Sdílet",
"Adventurer" : "Dobrodruh",
"Duelist" : "Duelant",
"Soldier" : "Voják",
"30 seconds faster energy regeneration" : "o 30 sekund rychlejší regenerace energie",
"30 seconds faster duel energy regeneration" : "o 30 sekund rychlejší regenerace duelové energie",
"10% more experience" : "+10% Zkušeností",
"10% dodging chance" : "+10% Šance na úhyb",
"10% critical chance" : "+10% Šance na krytický zásah",
"10% damage" : "+10% poškození",
"Reward" : "Odměna",
"For" : "Pro",
" Edit profile " : "Upravit profil",
" New items for" : "Nové věci pro",
"Non-player character" : " Hráči bez charakteru",
"Level" : "Úroveň",
"Opponents' strength" : "Síla soupeře",
"Gang Members:" : "Členové gangu",

// places
"East Coast" : "Východní pobřeží",

// jobs
"Muck Out Stables" : "Vymístit stáje",
"Scare Crows Away" : "Plašit ptáky",
"Herd Geese" : "Starat se o husy",
"Herd Cattle" : "Hnát krávy",
"Harvest Grain" : "Sklízet obilí",
"Brand Cattle" : "",
"Train Horses" : "Krotit koně", 
"Rope Horses" : "Chytat koně",

"Befriend Indians" : "Spřátelit se s indiány",
"Collect Wood" : "Kácet dřevo",
"Keep Fire Burning" : "Rozdělávat oheň",
"Pick Up Herbs" : "Sbírat bylinky",
"Collect Eagle Feathers" : "Sbírat orlí pera",
"Build Teepees" : "Stavět Tee-pee",
"Meet the Shaman" : "Promluvit si se šamanem",
"Meet the Chief" : "Promluvit si s náčelníkem", 

"Explore" : "Objevovat",
"Dig up the Hatchet" : "Vykopat válečnou sekeru",
"Build Palisade" : "Stavět opevnění",

"Collect Berries" : "Sbírat borůvky",
"Fishing" : "Rybolov",
"Concoct Potion" : "Vařit polévku",
"Celebrate a Feast" : "Slavit svátek",
"Apply Warpaint" : "Použít válečné barvy",
"Make Drums" : "Vyrábět bubny",
"Embellish Trinket" : "Zdobit talismany",
"Eagle Dance" : "Tanec orla",

"Work the Scene" : "Stopovat",
"Interrogate Witnesses" : "Vyslechnout svědky",
"Nail up Wanted Posters" : "Vylepovat plakáty", 


"Soldier Jimmy" : "Žoldák Jimmy",
"Scout Kajika" : "Skaut Kajika",
"Chef Jamie" : "Šéf Jamie",
"Drummer Ryan" : "Bubeník Ryan",
"Medic Frank" : "Záchranář Frank",
"Trooper Bob" : "Velitel Bob", 


};

trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};

var regexps = {};
regexps["Level (\\d*)"] = "Úroveň $1";
regexps["Rank: (\\d*)"] = "Pořadí:$1";


matchRegexps = function(key) {
	if (key===null) {
		return undefined;
	}
//	GM_log("check '"+key+"'");
	for (var reg in regexps) {
		var rrrr = new RegExp(reg);
		var result = key.match(rrrr);
//		GM_log("match "+reg+" -> "+ rrrr+ " : "+result);
		if (key.match(rrrr)!==null) {
//			GM_log("match "+reg+" in "+key);
			return key.replace(rrrr,regexps[reg]);
		}
	}
	return undefined;
};

translate = function(key) {
	if (strings[key]!==undefined) {
	    return strings[key];
	} else {
	    var key2 = trim(key);
	    if (strings[key2]!==undefined) {
		return strings[key2];
	    }
	}
	return undefined;
};

translateWithRegexp = function(key) {
	if (strings[key]!==undefined) {
	    return strings[key];
	} else {
	    var key2 = trim(key);
	    if (strings[key2]!==undefined) {
		return strings[key2];
	    }
	}
	return matchRegexps(key);
};


var allTrans = {
    "span":"" , "a":"", "h2":"","th":"", "td":"", "p":"", "strong":"", "div":""
//  "a":"" 
};


militaryPage = function() {
  var _nodes = document.getElementsByTagName("p");
  var _node;
  for (var _key in _nodes) {
    if (_nodes[_key]!==null) {
      _node = _nodes[_key];
      if (_node.childNodes.length==2 && _node.childNodes[1].tagName=="A") {
        var tr = matchRegexps(_node.childNodes[0].nodeValue);
        if (tr!==undefined) {
          _node.childNodes[0].nodeValue = tr;
        }
      }
    }
  }
};

fixFlash = function() {
  var tags = document.getElementsByTagName("embed");
  for (var key in tags) {
    var node = tags[key];
    if (node.src.indexOf("delicious.swf")!=-1) {
      var flashVars = node.attributes.getNamedItem("flashvars").nodeValue;
      var txtValue = flashVars.replace(/txt=(.*)&&(.*)/,"$1");
      var trValue = translateWithRegexp(txtValue);
      if (trValue!==undefined) {
        /* sajnos nem mukodik ...
        var newVal = flashVars.replace(/txt=(.*)&&(.*)/,"txt="+trValue+"&&$2");
        alert("flashvars = "+flashVars + " -> "+txtValue + " -> "+trValue+ " : "+newVal);
        node.attributes.getNamedItem("flashvars").nodeValue = newVal;*/
        node.parentNode.innerHTML = "<span class='x' style='letter-spacing:0px'>"+trValue+"</span>";
      }
    }
  }
}


translateWholePage = function(e) {
  if (document.location.toString().indexOf("/country/military")!=-1) {
    militaryPage();
  }

  var node = undefined;
  for (var tagName in allTrans) {
    var tags = document.getElementsByTagName(tagName);
    for (var key in tags) {
      node = tags[key];
      if (node.childNodes.length==1) {
        var translation = translateWithRegexp(node.innerHTML);
//		GM_log("node : "+node.innerHTML + " -> "+translation);
        if (translation!==undefined) {
          node.innerHTML = translation;
        }
      } else {
        if (node.childNodes.length<=3) {
          for (var i=0;i<node.childNodes.length;i++) {
            if (node.childNodes[i].nodeName=="#text") {
//GM_log("node "+i+" : "+node.nodeName+" value: "+node.childNodes[i].nodeValue);
              translation = translateWithRegexp(node.childNodes[i].nodeValue);
              if (translation!==undefined) {
                node.childNodes[i].nodeValue = translation;
              }
            }
          }
        }
      }
    }
  }
}



window.addEventListener("load", function(e) { 
  translateWholePage(e); 
  fixFlash();
  setTimeout(500, translateWholePage)
}, false);