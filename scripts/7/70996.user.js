// ==UserScript==
// @name IkarianScoreInBox
// @namespace ikariamScript
// @description Displays all the scores of a player in the Info section when his or her town is selected on the island map. Or when you are viewing their town with your spy.
// @include http://*.ikariam.*/*
// @exclude http://board*.ikariam.*/*
//
// @version 0.5
//
// @history 0.5   Updated to no longer use PhasmaExMachina scripts (bugged)
//
// ==/UserScript==

var baseDivCreated = false;
var gameServer = top.location.host;

var gameServerParts = gameServer.split(".");

if( gameServerParts.length == 3)
{
	var subDomain = gameServerParts[1];
	var domain = gameServerParts[2];
}

if( gameServerParts.length == 4)
{
	var subDomain = gameServerParts[2];
	var domain = gameServerParts[1];
	if( subDomain  == "com")
	{ var subDomain = gameServerParts[3];}
}

var lversion = "0.5";
var urlscript = "http://userscripts.org/scripts/show/70996";

var TotalView = GM_getValue('AllScoresInline_Control_TotalView', true);
var MilitaryView = GM_getValue('AllScoresInline_Control_MilitaryView', true);
var GoldView = GM_getValue('AllScoresInline_Control_GoldView', true);
var BuilderView = GM_getValue('AllScoresInline_Control_BuilderView', true);
var BuildingView = GM_getValue('AllScoresInline_Control_BuildingView', true);
var ResearchView = GM_getValue('AllScoresInline_Control_ResearchView', true);
var ResearcherView = GM_getValue('AllScoresInline_Control_ResearcherView', true);
var OffenseView = GM_getValue('AllScoresInline_Control_OffenseView', true);
var DefenseView = GM_getValue('AllScoresInline_Control_DefenseView', true);
var TradeView = GM_getValue('AllScoresInline_Control_TradeView', true);
var ResourcesView = GM_getValue('AllScoresInline_Control_ResourcesView', true);
var DonationsView = GM_getValue('AllScoresInline_Control_DonationsView', true);
var RankView = GM_getValue('AllScoresInline_Control_RankView', true);

var post = {
    score: "score",
    military: "army_score_main",
    gold: "trader_score_secondary",
    building_main:  "building_score_main",
    building_sec:  "building_score_secondary",
    research_main: "research_score_main",
    research_sec: "research_score_secondary",
    offense: "offense",
    defense: "defense",
    trade: "trade",
	resources: "resources",
	donations: "donations"};
    
var updateCounter =0;

var scoreTypes = {
    0: "score", 
    1: "military",
    2: "allyscore",		
    3: "gold",
    4: "building_main",
    5: "building_sec",
    6: "research_main",
    7: "research_sec",
    8: "offense",
    9: "defense",
   10: "trade",
   11: "resources",
   12: "donations"};

var scoreShown = false;

getElementsByClass = function(inElement, className, findIn) {
  var all = inElement.getElementsByTagName('*');
  var elements = [];
  for (var e = 0; e < all.length; e++) {
    if (findIn == true) {
        if (all[e].className.indexOf(className) > 0) {
            elements[elements.length] = all[e];
        }
    } else {
        if (all[e].className == className) {
            elements[elements.length] = all[e];
        }
    }
  }
  return elements;
};

// called using player name, score type, 
function requestScore(playerName, type, onload) {
    GM_xmlhttpRequest({
        method:'POST',
        url:'http://' + gameServer + '/index.php',
        data:"view=highscore&highscoreType=" + post[type] + "&searchUser=" + playerName,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/atom+xml,application/xml,text/xml',
            'Referer': 'http://' + gameServer + '/index.php', 
            'Cookie': document.cookie
        },
        onload:onload
    });
}

function fmtNumber(n) {
  n += "";
  for (var i = (n.length - 3); i > 0; i -= 3) {
    n = n.slice(0, i) +","+ n.slice(i);
  }
  return n;
}

function createBaseDiv() {
    baseDivCreated = true;
    
    scoreElement = document.createElement("div");
    scoreElement.setAttribute("id", "inlinescore");
    scoreElement.setAttribute("class", "dynamic");  // added by Logvar

	scoreElement.innerHTML += 
	    "<h3 style=\"margin-left:-5px;margin-right:-2px;\" class=\"header\"> ScoreInBox v" + lversion + "</h3>" +
        "<li style=\"margin: 2px 10px;font-size:11px\" id=\"ally_score\" class=\"ally\">" +
            "<span style=\"float:left;\" class=\"textLabel\">" +lang.allyscore + ":</span>" +
            "<div id=\"allyscore\">" + lang.unknown + "</div>" +
        "</li>";
//		"<li style=\"margin: 2px 10px;font-size:11px\" id=\"scores\" class=\"ally\">" + lang.scores + ":" + 
//        "</li>";
	
	if (TotalView == true) {
	scoreElement.innerHTML += 		
		"<li style=\"margin: 2px 10px;font-size:11px\" id=\"total_score\" class=\"ally\">" +
			"<span style=\"float:" + lang.float + ";\" class=\"textLabel\">" + lang.score + ":</span>" +
            "<div id=\"score\">" + lang.unknown + "</div>" +
	    "</li>";
	}
	if (MilitaryView == true) {
	scoreElement.innerHTML += 		
        "<li style=\"margin: 2px 10px;font-size:11px\" id=\"army_score_main\" class=\"ally\">" +
            "<span style=\"float:" + lang.float + ";\" class=\"textLabel\">" + lang.military + ":</span>" +
            "<div id=\"military_score\">" + lang.unknown + "</div>" +
        "</li>";
	}
	if (BuilderView == true) {
	scoreElement.innerHTML += 
        "<li style=\"margin: 2px 10px;font-size:11px\" id=\"building_score_main\" class=\"ally\">" +
            "<span style=\"float:" + lang.float + ";\" class=\"textLabel\">" + lang.building_main + ":</span>" +
            "<div id=\"building_main_score\">" + lang.unknown + "</div>" +
        "</li>";
	}
	if (BuildingView == true) {
	scoreElement.innerHTML += 
        "<li style=\"margin: 2px 10px;font-size:11px\" id=\"building_score_secondary\" class=\"ally\">" +
            "<span style=\"float:" + lang.float + ";\" class=\"textLabel\">" + lang.building_sec + ":</span>" +
            "<div id=\"building_sec_score\">" + lang.unknown + "</div>" +
        "</li>";
	}
	if (ResearcherView == true) {
	scoreElement.innerHTML += 
        "<li style=\"margin: 2px 10px;font-size:11px\" id=\"research_score_main\" class=\"ally\">" +
            "<span style=\"float:" + lang.float + ";\" class=\"textLabel\">" + lang.research_main + ":</span>" +
            "<div id=\"research_main_score\">" + lang.unknown + "</div>" +
        "</li>";
	
	}
	if (ResearchView == true) {
	scoreElement.innerHTML += 
        "<li style=\"margin: 2px 10px;font-size:11px\" id=\"research_score_secondary\" class=\"ally\">" +
            "<span style=\"float:" + lang.float + ";\" class=\"textLabel\">" + lang.research_sec + ":</span>" +
            "<div id=\"research_sec_score\">" + lang.unknown + "</div>" +
        "</li>";
	}
	if (OffenseView == true) {
	scoreElement.innerHTML += 
        "<li style=\"margin: 2px 10px;font-size:11px\" id=\"offense_\" class=\"ally\">" +
            "<span style=\"float:" + lang.float + ";\" class=\"textLabel\">" + lang.offense + ":</span>" +
            "<div id=\"offense_score\">" + lang.unknown + "</div>" +
        "</li>";
	}
	if (DefenseView == true) {
	scoreElement.innerHTML += 
		"<li style=\"margin: 2px 10px;font-size:11px\" id=\"defense_\" class=\"ally\">" +
            "<span style=\"float:" + lang.float + ";\" class=\"textLabel\">" + lang.defense + ":</span>" +
            "<div id=\"defense_score\">" + lang.unknown + "</div>" +
        "</li>";
	}
	if (TradeView == true) {
	scoreElement.innerHTML += 
        "<li style=\"margin: 2px 10px;font-size:11px\" id=\"trade_\" class=\"ally\">" +
            "<span style=\"float:" + lang.float + ";\" class=\"textLabel\">" + lang.trade + ":</span>" +
            "<div id=\"trade_score\">" + lang.unknown + "</div>" +
        "</li>";
	}
	if (ResourcesView == true) {
	scoreElement.innerHTML += 
        "<li style=\"margin: 2px 10px;font-size:11px\" id=\"trade_\" class=\"ally\">" +
            "<span style=\"float:" + lang.float + ";\" class=\"textLabel\">" + lang.resources + ":</span>" +
            "<div id=\"resources_score\">" + lang.unknown + "</div>" +
        "</li>";
	}
	if (DonationsView == true) {
	scoreElement.innerHTML += 
        "<li style=\"margin: 2px 10px;font-size:11px\" id=\"trade_\" class=\"ally\">" +
            "<span style=\"float:" + lang.float + ";\" class=\"textLabel\">" + lang.donations + ":</span>" +
            "<div id=\"donations_score\">" + lang.unknown + "</div>" +
        "</li>";
	}
	if (GoldView == true) {
	scoreElement.innerHTML += 
        "<li style=\"margin: 2px 10px;font-size:11px\" id=\"trader_score_secondary\" class=\"ally\">" +
            "<span style=\"float:" + lang.float + ";\" class=\"textLabel\">" + lang.gold + ":</span>" +
            "<div id=\"gold_score\">" + lang.unknown + "</div>" +
        "</li>";
    }

    /*scoreElement.innerHTML = scoreDiv;*/
    
    // get container for Island view
    var informationContainer = document.getElementById('infocontainer');
    if (!informationContainer) { 
        informationContainer = document.getElementById('information'); 
    }
    
    //var allyClass = getElementsByClass(informationContainer, "ally") //remove by Logvar
    
    //insertAfter(scoreElement, allyClass[0]);  //remove by logvar
	insertAfter(scoreElement, informationContainer);  // added by Logvar
    scoreShown = true;
}

function insertAfter(newElement,targetElement) {
    //target is what you want it to go after. Look for this elements parent.
    var parent = targetElement.parentNode;

    //if the parents lastchild is the targetElement...
    if(parent.lastchild == targetElement) {
        //add the newElement after the target element.
        parent.appendChild(newElement);
    } else {
        // else the target has siblings, insert the new element between the target and it's next sibling.
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

function updateScore(type, score) {
    document.getElementById(type).innerHTML = score;
}

function updateDetails(type, playerName, townLevel, responseText) {
    var hiddenDiv = document.createElement("div");
    hiddenDiv.setAttribute("style", "display: hidden;");
    document.body.appendChild(hiddenDiv);
    hiddenDiv.innerHTML = responseText;
    var score = getElementsByClass(hiddenDiv, "score", false);
	var place = getElementsByClass(hiddenDiv, "place", false);
	var pname = getElementsByClass(hiddenDiv, "name", false);
    for (var e = 0; e < pname.length; e++) {
        if (pname[e].innerHTML == playerName) {
            var totalScore = score[e].innerHTML;
            var totalRank = place[e].innerHTML;
			if (RankView == true) {	
				totalScore += " (#"+totalRank+")";
			}
        }
    }
    document.body.removeChild(hiddenDiv);
    GM_setValue(type, totalScore);
    document.getElementById(type).innerHTML = totalScore;
}


function updateAllyDetails(divId, responseText) {
    var hiddenDiv = document.createElement("div");
    hiddenDiv.setAttribute("style", "display: none;");
    document.body.appendChild(hiddenDiv);
    hiddenDiv.innerHTML = responseText;

    var allyTable = getElementsByClass(hiddenDiv, 'content', false);

    var members = parseInt(allyTable[1].childNodes[1].childNodes[1].childNodes[4].childNodes[2].innerHTML, 10);
	//alert("memb"+members);
	//alert("posscore"+allyTable[1].childNodes[1].childNodes[1].childNodes[8].childNodes[1].childNodes[1].innerHTML);
    var posScore = allyTable[1].childNodes[1].childNodes[1].childNodes[8].childNodes[2].innerHTML;

    if (/([0-9]+)\s\((.+)\)/.exec(posScore)!=null) {
    	//allRank = RegExp.$1;
    	//posScore = RegExp.$2;
    }
    document.body.removeChild(hiddenDiv);
    
    var strScore = posScore //+ " (" + allRank + ")";
    document.getElementById("allyscore").innerHTML = strScore+ " (" + members + ")";
    GM_setValue("allyscore", strScore);
//    document.getElementById("allymembers").innerHTML = members;
//    GM_setValue("allymembers", members);
//    GM_setValue(divId, (posScore + " (" + members + ")"));
//    document.getElementById(divId).innerHTML =  (posScore + " (" + members + ")");
}


function cityInformation() {
    if (!document.getElementById("inlinescore")) {
        createBaseDiv();
    }
    // Get the lanugage
    lang = defineLanguage(domain);
    
    var playerScore = -1;
    // Remove the "points" information (as of 0.2.8), and get the value for later
    var infoContainer = document.getElementById("infocontainer");
    if (infoContainer) {
        var pointsLi = getElementsByClass(infoContainer, "name", false);
        if (pointsLi[1]) {
            playerScore = parseInt(pointsLi[1].innerHTML.split(/>/)[2].replace(/,/g, ""),10);
            pointsLi[1].style.display = "none";
        }
    }
    
    // Remove the disabled actions... looks messy when it happens
    var actions = document.getElementById("actions");
    if (actions) {
        textSpans = getElementsByClass(actions, "disabled", true);
        for (var cnt = 0; cnt < textSpans.length;cnt++) {
            //textSpans[cnt].style.display = "none";
        }
    }
    
    // Removes the report player link, again causes a fliker
    var reportPlayer = getElementsByClass(document, "reportPlayer");
    //reportPlayer[0].style.display = "none";

	if (TotalView == true) {
		updateScore("score", lang.fetch);
	}
	if (MilitaryView == true) {
		updateScore("military_score", lang.fetch);
	}
	if (GoldView == true) {
        updateScore("gold_score", lang.fetch);
	}
	if (BuilderView == true) {
        updateScore("building_main_score", lang.fetch);
	}
	if (BuildingView == true) {
        updateScore("building_sec_score", lang.fetch);
	}
	if (ResearcherView == true) {
        updateScore("research_main_score", lang.fetch);
	}
	if (ResearchView == true) {
        updateScore("research_sec_score", lang.fetch);
	}
	if (OffenseView == true) {
        updateScore("offense_score", lang.fetch);
	}
	if (DefenseView == true) {
        updateScore("defense_score", lang.fetch);
	}
	if (TradeView == true) {
        updateScore("trade_score", lang.fetch);
	}
	if (ResourcesView == true) {
        updateScore("resources_score", lang.fetch);
	}
	if (DonationsView == true) {
        updateScore("donations_score", lang.fetch);
	}


    var listParts = "";
    // Get the players name
    listParts = getElementsByClass(document,"owner", false)[0].innerHTML.split(">");
    listParts[2] = listParts[2].split("<")[0];
    var playerName = listParts[2].replace(/^\s+|\s+$/g, ''); // trim up the Player Name// get the players name
    playerName = playerName.replace(/&nbsp;/g, " "); // replace any silly nubspaces!
    
    // Get the players town level for gold pillage data
    listParts = getElementsByClass(document,"citylevel", false)[0].innerHTML.split(">");
    listParts[2] = listParts[2].split("<")[0];
    var townLevel = parseInt(listParts[2].replace(/^\s+|\s+$/g, ''), 10); // trim up the town level

// re-Added by Logvar
	// Get the players alliance id for alliance check
    listParts = getElementsByClass(document,"ally", false)[0].innerHTML.split(">");
    if (/allyId=([0-9]+)/.exec(listParts) != null) {
    	var allyId = RegExp.$1;
    } else {
        var allyId = -1;
        GM_setValue("allyscore", "-");
        //GM_setValue("allymembers", "-");
    }
// END of re-Added by Logvar	

    var checkedTime = (new Date().getTime() - (1000*60*10));
    if (playerName != GM_getValue("lastPlayerCheck") || GM_getValue("lastCheckedTimestamp") < checkedTime || GM_getValue("lastServerCheck") != gameServer) {

		requestScore(playerName, 'score', function(responseDetails) {
            updateDetails('score', playerName, townLevel, responseDetails.responseText);
        });       
        requestScore(playerName, 'military', function(responseDetails) {
            updateDetails('military_score', playerName, townLevel, responseDetails.responseText);
        });
        requestScore(playerName, 'gold', function(responseDetails) {
            updateDetails('gold_score', playerName, townLevel, responseDetails.responseText);
        });
        requestScore(playerName, 'building_main', function(responseDetails) {
            updateDetails('building_main_score', playerName, townLevel, responseDetails.responseText);
        });
        requestScore(playerName, 'building_sec', function(responseDetails) {
            updateDetails('building_sec_score', playerName, townLevel, responseDetails.responseText);
        });
        requestScore(playerName, 'research_main', function(responseDetails) {
            updateDetails('research_main_score', playerName, townLevel, responseDetails.responseText);
        });
        requestScore(playerName, 'research_sec', function(responseDetails) {
            updateDetails('research_sec_score', playerName, townLevel, responseDetails.responseText);
        });
        requestScore(playerName, 'offense', function(responseDetails) {
            updateDetails('offense_score', playerName, townLevel, responseDetails.responseText);
        });
        requestScore(playerName, 'defense', function(responseDetails) {
            updateDetails('defense_score', playerName, townLevel, responseDetails.responseText);
        });
        requestScore(playerName, 'trade', function(responseDetails) {
            updateDetails('trade_score', playerName, townLevel, responseDetails.responseText);
        });
        requestScore(playerName, 'resources', function(responseDetails) {
            updateDetails('resources_score', playerName, townLevel, responseDetails.responseText);
        });
        requestScore(playerName, 'donations', function(responseDetails) {
            updateDetails('donations_score', playerName, townLevel, responseDetails.responseText);
        });
	    
		if (allyId != -1) {
            requestAlliance(allyId, function(responseDetails) {
                updateAllyDetails('allyscore', responseDetails.responseText);
            });
        } else {
            updateScore("allyscore", "-")
            //updateScore("allymembers", "-")
            document.getElementById('ally_score').style.display = "none";
            //document.getElementById('ally_members').style.display = "none";
        }
		
        GM_setValue("lastCheckedTimestamp", new Date().getTime() + "");
        GM_setValue("lastPlayerCheck", playerName);
        GM_setValue("lastServerCheck", gameServer);
    } else {
        for (var interation = 0;interation < 10; interation++) {
            var type = scoreTypes[interation];
            document.getElementById(type).innerHTML = GM_getValue(type);
        }
    }
}

function defineLanguage(langTDL) {
    switch (langTDL) {
        case "ar":
            language = {
            float:"left",
            scores:"Puntuaciones",
            fetch:"Cargando...",
            unknown:"Desconocido",
            allyscore:"Puntos de Alianza",
            score:"Puntos Totales",
            military:"Generales",
            gold:"Reserva de Oro",
            building_main:  "Constructor",
            building_sec:  "Construcción",
            research_main: "Investigadores",
            research_sec: "Investigación",
            offense: "Ofensivos",
            defense: "Defensivos",
            trade: "Comercial",
            resources: "Materias Primas",
            donations: "Donaciones",
            rank: "Mostrar posición"};
            break;
        case "bg":
            language = {
            float:"left",
            scores:"Точки",
            fetch:"Изтегляне...",
            unknown:"Няма информация",
            allyscore:"Съюзни точки",
            score:"Общ резултат",
            military:"Генерали",
            gold:"Злато",
            building_main: "Строители",
            building_sec: "Ниво сгради",
            research_main: "Учени",
            research_sec: "Нива на научните изследвания",
            offense: "Нападение",
            defense: "Защита",
            trade: "Търговия",
            resources: "Resources",
            donations: "Donations",
            rank: "Show rank"};
            break;
        case  "br":
            language = {
            float:"left",
            scores: "Pontuações",
            fetch: "Carregando...",
            unknown: "Desconhecido",
            allyscore: "Pontos da Aliança",
            score: "Pontos Totais",
            military: "Generais",
            gold: "Ouro",
            building_main: "Alvenaria",
            building_sec: "Contrução",
            research_main: "Cientistas",
            research_sec: "Pesquisa",
            offense: "Ofensivos",
            defense: "Defensivos",
            trade: "Comercial",
            resources: "Resources",
            donations: "Donations",
            rank: "Show rank"};
            break;
        case "by":
            language = {
            float:"left",
            scores:"Баллы",
            fetch:"Ищем...",
            unknown:"Неизвестно",
            allyscore:"Баллы альянса",
            score:"Общий счет",
            military:"Генералы",
            gold:"Золото",
            building_main:  "Строители",
            building_sec:  "Уровни зданий",
            research_main: "Ученые",
            research_sec: "Уровень исследований",
            offense: "Баллы атаки",
            defense: "Баллы защиты",
            trade: "Баллы торговли",
            resources: "Resources",
            donations: "Donations",
            rank: "Show rank"};
            break;
        case "cn":
            language = {
            float:"left",
            scores:"分數列表",
            fetch:"讀取中...",
            unknown:"未知",
            allyscore:"聯盟分數",
            score:"總積分",
            military:"戰爭將軍",
            gold:"黃金存量",
            building_main: "建築大師",
            building_sec: "建築等級",
            research_main: "科學巨人",
            research_sec: "研究等級",
            offense: "進攻分數",
            defense: "防禦分數",
            trade: "貿易分數",
            resources: "Resources",
            donations: "Donations",
            rank: "Show rank"};
            break; 
        case "cz":
            language = {
            float:"left",
            scores:"Scores",
            fetch: "nahrávam...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score: "Celkové skóre",
            military: "Vojenské skóre",
            gold:"Gold Score",
            building_main:  "Builder",
            building_sec:  "Building",
            research_main: "Science",
            research_sec: "Research",
            offense: "Offense",
            defense: "Defense",
            trade: "Trading",
            resources: "Resources",
            donations: "Donations",
            rank: "Show rank"};
            break;
        case "de":
            language = {
            float:"left",
            scores:"Punkte",
            fetch:"Laden...",
            unknown:"Unbekannt",
            allyscore:"Ally Punkte",
            score:"Gesamtpunkte",
            military:"Generäle",
            gold:"Goldbestand",
            building_main:  "Baumeister",
            building_sec:  "Gebäudestufen",
            research_main: "Forscher",
            research_sec: "Forschungslvl",
            offense: "Offensivpunkte",
            defense: "Defensivpunkte",
            trade: "Handelsscore",
            resources: "Resources",
            donations: "Donations",
            rank: "Show rank"};
            break;
        case "dk":
            language = {
            float:"left",
            scores:"Scorer",
            fetch:"Henter...",
            unknown:"Ukendt",
            allyscore:"Alliance Score",
            score:"Total Score",
            military:"General",
            gold:"Guldbeholdning",
            building_main:  "Byggemester",
            building_sec:  "Bygningslevel",
            research_main: "Forsker",
            research_sec: "Forskningslevel",
            offense: "Angrebspoint",
            defense: "Forsvarspoint",
            trade: "Handelshighscore",
            resources: "Resources",
            donations: "Donations",
            rank: "Vis rang"};
            break;
         case "ee":
            language = {
            float:"left",
            scores:"Punktid",
            fetch:"Tõmban...",
            unknown:"Teadmata",
            allyscore:"Liidu skoor",
            score:"Koguskoor",
            military:"Kindralid",
            gold:"Kullatagavara",
            building_main:  "Meisterehitajad",
            building_sec:  "Ehitiste tasemed",
            research_main: "Teadlased",
            research_sec: "Uuringud",
            offense: "Rünne",
            defense: "Kaitse",
            trade: "Kauplemine",
            resources: "Resources",
            donations: "Donations",
            rank: "Näita auastet"};
            break;
        case "es":
            language = {
            float:"left",
            scores:"Puntuaciones",
            fetch:"Cargando...",
            unknown:"Desconocido",
            allyscore:"Puntos de Alianza",
            score:"Puntos Totales",
            military:"Generales",
            gold:"Reserva de Oro",
            building_main:  "Constructor",
            building_sec:  "Construcción",
            research_main: "Investigadores",
            research_sec: "Investigación",
            offense: "Ofensivos",
            defense: "Defensivos",
            trade: "Comercial",
            resources: "Materias Primas",
            donations: "Donaciones",
            rank: "Mostrar posición"};
            break;
        case "fr":
            language = {
            float:"left",
            scores:"Points",
            fetch:"Fetching...",
            unknown:"Inconnu",
            allyscore:"Alliance Points",
            score:"Total des points",
            military:"Généraux",
            gold:"Réserves d'or",
            building_main: "Constructeur",
            building_sec: "Bâtiments",
            research_main: "Science",
            research_sec: "Recherche",
            offense: "Attaque",
            defense: "Défense",
            trade: "Commerce",
            resources: "Resources",
            donations: "Donations",
            rank: "Show rank"};
            break;
        case "gr":
            language = {
            float:"left",
            scores:"Βαθμολογία",
            fetch:"ανάκτηση...",
            unknown:"Άγνωστο",
            allyscore:"Συμμαχία",
            score:"Βαθμολογία",
            military:"Στρατεύματα",
            gold:"Χρυσός",
            building_main:  "Οικοδόμοι",
            building_sec:  "Κτίρια",
            research_main: "Επιστήμονες",
            research_sec: "Έρευνες",
            offense: "Επίθεση",
            defense: "Άμυνα",
            trade: "Εμπόριο",
            resources: "Resources",
            donations: "Donations",
            rank: "Show rank"};
            break;
        case "hk":
            language = {
            float:"left",
            scores:"分數列表",
            fetch:"讀取中...",
            unknown:"未知",
            allyscore:"聯盟分數",
            score:"總積分",
            military:"戰爭將軍",
            gold:"黃金存量",
            building_main: "建築大師",
            building_sec: "建築等級",
            research_main: "科學巨人",
            research_sec: "研究等級",
            offense: "進攻分數",
            defense: "防禦分數",
            trade: "貿易分數",
            resources: "資源",
            donations: "捐獻",
            rank: "顯示排名"};
            break; 
        case "hu":
            language = {
            float:"left",
            scores:"Pontok",
            fetch:"Töltés...",
            unknown:"Ismeretlen",
            allyscore:"Szövetség",
            score:"Összpontszám",
            military:"Katonai pont",
            gold:"Arany",
            building_main:  "Építők",
            building_sec:  "Épületek",
            research_main: "Tudósok",
            research_sec: "Fejlesztés",
            offense: "Támadás",
            defense: "Védelem",
            trade: "Kereskedelem",
            resources: "Erőforrás",
            donations: "Adományok",
            rank: "Megjelenítési rank"};
            break;
        case "il":
            language = {
            float:"right",
            scores:"ניקוד",
            fetch:"טוען...",
            unknown:"לא ידוע",
            allyscore:"ניקוד הברית",
            score:"ניקוד כללי",
            military:"גנרלים",
            gold:"מלאי זהב",
            building_main:  "בונים מוסמכים",
            building_sec:  "שלבי בנייה",
            research_main: "מדענים",
            research_sec: "שלבי מחקר",
            offense: "נקודות התקפה",
            defense: "נקודות הגנה",
            trade: "ניקוד מסחר",
            resources: "Resources",
            donations: "Donations",
            rank: "הראה דרגה"};
            break;
        case "it":
            language = {
            float:"left",
            scores:"Punteggi",
            fetch:"Caricamento...",
            unknown:"Sconosciuto",
            allyscore:"Punti Alleanza",
            score:"Punteggio Totale",
            military:"Punteggio Militare",
            gold:"Tesoro",
            building_main: "Costruttori",
            building_sec: "Costruzioni",
            research_main: "Scienziati",
            research_sec: "Ricerche",
            offense: "Offensivo",
            defense: "Difensivo",
            trade: "Commercio",
            resources: "Resources",
            donations: "Donations",
            rank: "Show rank"};
            break;
       case "lv":
            language = {
            float:"left",
            scores:"Punkti",
            fetch:"Ielādē...",
            unknown:"Nezināms",
            allyscore:"Alianses Punkti",
            score:"Kopējie Punkti",
            military:"Ģenerāļi",
            gold:"Zelts",
            building_main:  "Celtnieki",
            building_sec:  "Celtniecība",
            research_main: "Zinātnieki",
            research_sec: "Pētniecība",
            offense: "Uzbrukums",
            defense: "Aizsardzība",
            trade: "Tirdzniecība",
            resources: "Resources",
            donations: "Donations",
            rank: "Parādīt pozīciju"};
            break;
        case "nl":
            language = {
            float:"left",
            scores:"Scores",
            fetch:"Ophalen...",
            unknown:"Onbekend",
            score:"Totale score",
            military:"Militaire Score",
            gold:"Voorraad goud",
            building_main:  "Meesterb.",
            building_sec:  "Gebouwniv.",
            research_main: "Wetenschapp.",
            research_sec: "Onderz.niv.",
            offense: "Aanvalspunten",
            defense: "Defensiepunten",
            trade: "Handelsscore",
            resources: "Grondstoffen",
            donations: "Donaties",
            rank: "Rang zichtbaar"}; 
            break;
        case "net":
            language = {
            float:"left",
            scores:"Puan",
            fetch:"Bekleniyor...",
            unknown:"Bilinmeyen",
            allyscore:"İttifak Puanı",
            score:"Toplam Puan",
            military:"General Puanı",
            gold:"Altın Puanı",
            building_main: "Usta inşaatçılar",
            building_sec: "Bina Seviyeleri",
            research_main: "Bilim Adamları",
            research_sec: "Araştırma Seviyeleri",
            offense: "Saldırı",
            defense: "Savunma",
            trade: "Ticaret",
            resources: "Resources",
            donations: "Donations",
            rank: "Sırlamayı Göster"};
            break;
        case "pe":
            language = {
            scores:"Puntajes",
            fetch:"Buscando...",
            unknown:"Desconocido",
            allyscore:"Puntos de la alianza",
            score:"Puntos totales",
            military:"Puntos de milicia",
            gold:"Reserva de oro",
            building_main:  "Constructor",
            building_sec:  "N. de construcción",
            research_main: "Científicos",
            research_sec: "N. de investigación",
            offense: "Ataque",
            defense: "Defensa",
            trade: "Comercio",
            resources: "Resources",
            donations: "Donations",
            rank: "Mostrar posición"};
            break;
        case "pl":
            language = {
            float:"left",
            scores:"Wyniki",
            fetch:"Pobieranie...",
            unknown:"Nieznany",
            allyscore:"Sojusz",
            score:"Całkowity",
            military:"Generałowie",
            gold:"Złoto",
            building_main:  "Budowa",
            building_sec:  "Budynki",
            research_main: "Naukowcy",
            research_sec: "Badania",
            offense: "Ofensywa",
            defense: "Obrona",
            trade: "Handel",
            resources: "Surowce",
            donations: "Datki",
            rank: "Pokaż ranking"};
            break;
        case  "pt":
            language = {
            float:"left",
            scores: "Pontuações",
            fetch: "Carregando...",
            unknown: "Desconhecido",
            allyscore: "Pontos da Aliança",
            score: "Pontos Totais",
            military: "Generais",
            gold: "Ouro",
            building_main: "Alvenaria",
            building_sec: "Contrução",
            research_main: "Cientistas",
            research_sec: "Pesquisa",
            offense: "Ofensivos",
            defense: "Defensivos",
            trade: "Comercial",
            resources: "Resources",
            donations: "Donations",
            rank: "Show rank"};
            break;
        case "ro":
            language = {
            float:"left",
            scores:"Scoruri",
            fetch:"Incarcare...",
            unknown:"Necunoscut",
            allyscore:"Scor Alianta",
            score:"Scor Total",
            military:"Generali",
            gold:"Stoc Aur",
            building_main:  "Constructori",
            building_sec:  "Cladiri",
            research_main: "Cercetatori",
            research_sec: "Cercetare",
            offense: "Atac",
            defense: "Aparare",
            trade: "Puncte Comert",
            resources: "Resources",
            donations: "Donations",
            rank: "Pozitie"};
            break;
        case "ru":
            language = {
            float:"left",
            scores:"Баллы",
            fetch:"Ищем...",
            unknown:"Неизвестно",
            allyscore:"Баллы альянса",
            score:"Общий счет",
            military:"Генералы",
            gold:"Золото",
            building_main:  "Строители",
            building_sec:  "Уровни зданий",
            research_main: "Ученые",
            research_sec: "Исследования",
            offense: "Баллы атаки",
            defense: "Баллы защиты",
            trade: "Торговля",
            resources: "Ресурсы",
            donations: "Вложения",
            rank: "Место в ТОПе"};
            break;
        case "sk":
            language = {
            float:"left",  
            scores:"Hodnotenie",    
            fetch:"Nahrávam...",    
            unknown:"Neznáme",    
            allyscore:"Skóre aliancie",    
            score:"Celkové Skóre",    
            military:"Generáli",    
            gold:"Zásoba Zlata",    
            building_main:  "Stavitelia",    
            building_sec:  "Úrovne Stavieb",    
            research_main: "Vedci",    
            research_sec: "Úrovne Výskumu",    
            offense: "Body Útoku",    
            defense: "Body Obrany",    
            trade: "Obchodné Skóre",    
            resources: "Suroviny",  
            donations: "Darované",  
            rank: "Pozícia"};    
            break;
        case "rs":
            language = {
            float:"left",
            scores:"Поени",
            fetch:"Учитавам...",
            unknown:"Непознати",
            allyscore:"Савез",
            score:"Укупно",
            military:"Генерали",
            gold:"Злато",
            building_main:  "Градитељ",
            building_sec:  "Зграде",
            research_main: "Научници",
            research_sec: "Истраживања",
            offense: "Нападачки",
            defense: "Одбрамбени",
            trade: "Трговина",
            resources: "Ресурси",
            donations: "Донације",
            rank: "Прикажи позицију"};
            break;
        case "tr":
            language = {
            float:"left",
            scores:"Scores",
            fetch:"Yukleniyor...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Toplam Puan",
            military:"Askeri Puan",
            gold:"Gold Score",
            building_main:  "Builder",
            building_sec:  "Building",
            research_main: "Science",
            research_sec: "Research",
            offense: "Offense",
            defense: "Defense",
            trade: "Trading",
            resources: "Resources",
            donations: "Donations",
            rank: "Show rank"};
            break;
        case "tw":
            language = {
            float:"left",
            scores:"分數列表",
            fetch:"讀取中...",
            unknown:"未知",
            allyscore:"聯盟分數",
            score:"總積分",
            military:"戰爭將軍",
            gold:"黃金存量",
            building_main: "建築大師",
            building_sec: "建築等級",
            research_main: "科學巨人",
            research_sec: "研究等級",
            offense: "進攻分數",
            defense: "防禦分數",
            trade: "貿易分數",
            resources: "資源",
            donations: "捐獻",
            rank: "顯示排名"};
            break; 
         case "ua":
            language = {
            float:"left",
            scores:"Бали",
            fetch:"Пошук...",
            unknown:"Невідомо",
            allyscore:"Бали альянсу",
            score:"Загальний рахунок",
            military:"Генерали",
            gold:"Запас золота",
            building_main:  "Будівельники",
            building_sec:  "Рівні будівель",
            research_main: "Вчені",
            research_sec: "Рівні дослідження",
            offense: "Наступальні бали",
            defense: "Бали захисту",
            trade: "Топ торгівлі",
            resources: "Resources",
            donations: "Donations",
            rank: "Show rank"};
            break; 
        case "vn":
            language = {
            float:"left",
            scores:"Scores", 
            fetch:"Đang tải...",
            unknown:"Không biết",
            allyscore:"Liên minh",
            score:"Tổng điểm",
            military:"Quân sự",
            gold:"Gold Score",
            building_main:  "Builder",
            building_sec:  "Building",
            research_main: "Science",
            research_sec: "Research",
            offense: "Offense",
            defense: "Defense",
            trade: "Trading",
            resources: "Resources",
            donations: "Donations",
            rank: "Show rank"};
            break;
        case "ikariam":
            switch (subDomain) 
            {
                case "ae":
                    language = {
                    float:"right",
                    scores:"النقاط",
                    fetch:"جلب...",
                    unknown:"غير معروف",
                    allyscore:"نقاط الحلف",
                    score:"مجموع النقاط",
                    military:"الجنرالات",
                    gold:"نقاط الذهب",
                    building_main:  "معلم بناء",
                    building_sec:  "مستوى المباني",
                    research_main: "باحث",
                    research_sec: "مستوى الأبحاث",
                    offense: "نقاط الهجوم",
                    defense: "نقاط الدفاع",
                    trade: "ترتيب التجارة",
                    resources: "Resources",
                    donations: "Donations",
                    rank: "Show rank"};
                    break;
                case  "ar":
                    language = {
                    float:"left",
                    scores:"Puntuaciones",
                    fetch:"Cargando...",
                    unknown:"Desconocido",
                    allyscore:"Puntos de Alianza",
                    score:"Puntos Totales",
                    military:"Generales",
                    gold:"Reserva de Oro",
                    building_main:  "Constructor",
                    building_sec:  "Construcción",
                    research_main: "Investigadores",
                    research_sec: "Investigación",
                    offense: "Ofensivos",
                    defense: "Defensivos",
                    trade: "Comercial",
                    resources: "Materias Primas",
                    donations: "Donaciones",
                    rank: "Mostrar posición"};
                    break;
                case  "ba":
                    language = {
                    float:"left",
                    scores:"Bodovi",
                    fetch:"Privlacan...",
                    unknown:"Nepoznat",
                    allyscore:"Savezni Bodovi",
                    score:"Totalni Bodovi",
                    military:"Vojni Bodovi",
                    gold:"Zlatni Bodovi",
                    building_main: "Konstruktor",
                    building_sec: "Izgradnja",
                    research_main: "Nauka",
                    research_sec: "Istrazivanje",
                    offense: "Ofanziva",
                    defense: "Odbrana",
                    trade: "Trgovanje",
                    resources: "Resources",
                    donations: "Donations",
                    rank: "Show rank"};
                    break;
                case  "cl":
                    language = {
                    float:"left",
                    scores:"Puntuaciones",
                    fetch:"Cargando...",
                    unknown:"Desconocido",
                    allyscore:"Puntos de Alianza",
                    score:"Puntos Totales",
                    military:"Generales",
                    gold:"Reserva de Oro",
                    building_main:  "Constructor",
                    building_sec:  "Construcción",
                    research_main: "Investigadores",
                    research_sec: "Investigación",
                    offense: "Ofensivos",
                    defense: "Defensivos",
                    trade: "Comercial",
                    resources: "Materias Primas",
                    donations: "Donaciones",
                    rank: "Mostrar posición"};
                    break;
                case  "co":
                    language = {
                    float:"left",
                    scores:"Puntuaciones",
                    fetch:"Cargando...",
                    unknown:"Desconocido",
                    allyscore:"Puntos de Alianza",
                    score:"Puntos Totales",
                    military:"Generales",
                    gold:"Reserva de Oro",
                    building_main:  "Constructor",
                    building_sec:  "Construcción",
                    research_main: "Investigadores",
                    research_sec: "Investigación",
                    offense: "Ofensivos",
                    defense: "Defensivos",
                    trade: "Comercial",
                    resources: "Materias Primas",
                    donations: "Donaciones",
                    rank: "Mostrar posición"};
                    break;
                case "fi":
                    language = {
                    float:"left",
                    scores:"Scores",
                    fetch:"haetaan...",
                    unknown:"Unknown",
                    allyscore:"Ally Score",
                    score:"Kokonaispisteet",
                    military:"Sotilaspisteet",
                    gold:"Gold Score",
                    building_main:  "Builder",
                    building_sec:  "Building",
                    research_main: "Science",
                    research_sec: "Research",
                    offense: "Offense",
                    defense: "Defense",
                    trade: "Trading",
                    resources: "Resources",
                    donations: "Donations",
                    rank: "Show rank"};
                    break;
                case "id":
                    language = {
                    float:"left",
                    scores:"Skor",
                    fetch:"Memuat...",
                    unknown:"Tidak diketahui",
                    allyscore:"Skor Sekutu",
                    score:"Total Skor",
                    military:"Skor Militer",
                    gold:"Skor Emas",
                    building_main:  "Pekerja",
                    building_sec:  "Membangun",
                    research_main: "Sains",
                    research_sec: "Penelitian",
                    offense: "Menyerang",
                    defense: "Bertahan",
                    trade: "Berdagang",
                    resources: "Resources",
                    donations: "Donations",
                    rank: "Show rank"};
                    break;
                case "ir":
                    language = {
                    float:"right",
                    scores:"امتیاز",
                    fetch:"در حال جستجو",
                    unknown:"نامعلوم",
                    allyscore:"امتیاز اتحاد",
                    score:"امتیاز کلی",
                    military:"امتیاز ژنرال",
                    gold:"طلا",
                    building_main:  "بناء",
                    building_sec:  "ساختمان",
                    research_main: "محقق",
                    research_sec: "تحقیق",
                    offense: "اهجومی",
                    defense: "دفاعی",
                    trade: "تجاری",
                    resources: "Resources",
                    donations: "Donations",
                    rank: "Show rank"};
                    break;
	    }
            break;
        default:
            language = {
            float:"left",
            scores:"Scores",
            fetch:"Fetching...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Total Score",
            military:"Military Score",
            gold:"Gold Score",
            building_main:  "Builder",
            building_sec:  "Building",
            research_main: "Science",
            research_sec: "Research",
            offense: "Offense",
            defense: "Defense",
            trade: "Trading",
            resources: "Resources",
            donations: "Donations",
            rank: "Show rank"};
            break;
    }
    return language;
}

function init() {
    
    var linkElements = document.getElementsByTagName('a');
    for (var i = 0; i < linkElements.length; i++) {
        if (linkElements[i].id.search(/city_[0-9]*/) != -1) {
            linkElements[i].addEventListener('click', function() { window.setTimeout(cityInformation, 1); }, false);
        }
    }
        
    var informationDiv = document.getElementById('information');
    if (informationDiv) {
        var listElements = informationDiv.getElementsByTagName('li');
        if (listElements.length > 0) {
            cityInformation();
        }
    }
}
function setChekbox(idsave,id)	// control state of the checkbox
{
		var savevalue = GM_getValue(idsave,true);
		if (savevalue == false) document.getElementById(id).checked = false;
		else document.getElementById(id).checked = true;
}

function displayOnOptions_fn() {

		var ScoreOptions = document.createElement("div");
		ScoreOptions.setAttribute('id','optionAllScoresInline');
		ScoreOptions.innerHTML = 
			"<div class='contentBox01h'>" +
				"<h3 class='header'>"+
					"<span class='textLabel'>IkariamScoreInBox options v"+ lversion +" <a href='"+ urlscript +"' target='_blank'>(by Woeka and AnneDeGeus, modified by Logvar)</a></span> "+
				"</h3>"+
				"<div class='content'>" +
					"<table cellpadding='0' cellspacing='0'>"+
						"<tbody>"+
							"<tr>" +
								"<th id='AllScoresInline'>" + lang.score +"</th>" +
								"<td><input type='checkbox' id='optionTotal'></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='AllScoresInline'>" + lang.military +"</th>" +
								"<td><input type='checkbox' id='optionMilitary'></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='AllScoresInline'>" + lang.gold +"</th>" +
								"<td><input type='checkbox' id='optionGold'></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='AllScoresInline'>" + lang.building_main +"</th>" +
								"<td><input type='checkbox' id='optionBuilder'></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='AllScoresInline'>" + lang.building_sec +"</th>" +
								"<td><input type='checkbox' id='optionBuilding'></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='AllScoresInline'>" + lang.research_main +"</th>" +
								"<td><input type='checkbox' id='optionResearcher'></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='AllScoresInline'>" + lang.research_sec +"</th>" +
								"<td><input type='checkbox' id='optionResearch'></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='AllScoresInline'>" + lang.offense +"</th>" +
								"<td><input type='checkbox' id='optionOffense'></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='AllScoresInline'>" + lang.defense +"</th>" +
								"<td><input type='checkbox' id='optionDefense'></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='AllScoresInline'>" + lang.trade +"</th>" +
								"<td><input type='checkbox' id='optionTrade'></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='AllScoresInline'>" + lang.resources +"</th>" +
								"<td><input type='checkbox' id='optionResources'></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='AllScoresInline'>" + lang.donations +"</th>" +
								"<td><input type='checkbox' id='optionDonations'></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='AllScoresInline'>" + lang.rank +"</th>" +
								"<td><input type='checkbox' id='optionRank'></td>"+
							"</tr>" +
						"</tbody>"+
					"</table>" +
				"</div>" +
				/*"<div class='centerButton'>"+	
					"<span class='button'id='AllScoresInlineSave'>Save</span>"+	
				"</div>"+*/
                "<div class='footer'></div>" +
            "</div>";			

		document.getElementById("mainview").insertBefore(ScoreOptions, document.getElementById("vacationMode"));	

		document.getElementById('optionTotal').addEventListener('change',function(event){GM_setValue('AllScoresInline_Control_TotalView', document.getElementById('optionTotal').checked);},true);
		document.getElementById('optionMilitary').addEventListener('change',function(event){GM_setValue('AllScoresInline_Control_MilitaryView', document.getElementById('optionMilitary').checked);},true);
		document.getElementById('optionGold').addEventListener('change',function(event){GM_setValue('AllScoresInline_Control_GoldView', document.getElementById('optionGold').checked);},true);
		document.getElementById('optionBuilder').addEventListener('change',function(event){GM_setValue('AllScoresInline_Control_BuilderView', document.getElementById('optionBuilder').checked);},true);
		document.getElementById('optionBuilding').addEventListener('change',function(event){GM_setValue('AllScoresInline_Control_BuildingView', document.getElementById('optionBuilding').checked);},true);
		document.getElementById('optionResearch').addEventListener('change',function(event){GM_setValue('AllScoresInline_Control_ResearchView', document.getElementById('optionResearch').checked);},true);
		document.getElementById('optionResearcher').addEventListener('change',function(event){GM_setValue('AllScoresInline_Control_ResearcherView', document.getElementById('optionResearcher').checked);},true);
		document.getElementById('optionOffense').addEventListener('change',function(event){GM_setValue('AllScoresInline_Control_OffenseView', document.getElementById('optionOffense').checked);},true);
		document.getElementById('optionDefense').addEventListener('change',function(event){GM_setValue('AllScoresInline_Control_DefenseView', document.getElementById('optionDefense').checked);},true);
		document.getElementById('optionTrade').addEventListener('change',function(event){GM_setValue('AllScoresInline_Control_TradeView', document.getElementById('optionTrade').checked);},true);
		document.getElementById('optionResources').addEventListener('change',function(event){GM_setValue('AllScoresInline_Control_ResourcesView', document.getElementById('optionResources').checked);},true);
		document.getElementById('optionDonations').addEventListener('change',function(event){GM_setValue('AllScoresInline_Control_DonationsView', document.getElementById('optionDonations').checked);},true);
		document.getElementById('optionRank').addEventListener('change',function(event){GM_setValue('AllScoresInline_Control_RankView', document.getElementById('optionRank').checked);},true);
		
		// controll state of chekbox
		setChekbox('AllScoresInline_Control_TotalView','optionTotal');
		setChekbox('AllScoresInline_Control_MilitaryView','optionMilitary');
		setChekbox('AllScoresInline_Control_GoldView','optionGold');
		setChekbox('AllScoresInline_Control_BuilderView','optionBuilder');
		setChekbox('AllScoresInline_Control_BuildingView','optionBuilding');
		setChekbox('AllScoresInline_Control_ResearchView','optionResearch');
		setChekbox('AllScoresInline_Control_ResearcherView','optionResearcher');
		setChekbox('AllScoresInline_Control_OffenseView','optionOffense');
		setChekbox('AllScoresInline_Control_DefenseView','optionDefense');
		setChekbox('AllScoresInline_Control_TradeView','optionTrade');
		setChekbox('AllScoresInline_Control_ResourcesView','optionResources');
		setChekbox('AllScoresInline_Control_DonationsView','optionDonations');
		setChekbox('AllScoresInline_Control_RankView','optionRank');
}

//start script
if (document.getElementById('options_changePass')) {
    lang = defineLanguage(domain);
	displayOnOptions_fn();
}
if (document.getElementById('island')) {
    lang = defineLanguage(domain);
	init();
}