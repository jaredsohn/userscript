// Original script http://userscripts.org/scripts/show/36123
//
// 
// version 1.4.2 (lite) español Perú
// 2008-05-21
// author - immortalnights
// contributions by - wphilipw and ecamanaut
//
// homepage - http://www.ikariamlibrary.com/
// for up to date details and version, please check the home page.
//
// Please do not remove the above details; it is impossible to ensure
// all copys of this script are kept upto date, people need to know
// where they can go to get the most up to date version.
//
// For full version history please see, http://www.ikariamlibrary.com/
//
// ==UserScript==
// @name           Ikariam Inline Score (español)
// @namespace      iKariam
// @description    Te muestra información de un jugador cuando seleccionas su ciudad.
// @version        v0.2.8.007
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
//                 2009/01/17
// ==/UserScript==

var baseDivCreated = false;
var gameServer = top.location.host;
var gameServerParts = gameServer.split(".");
var subDomain = gameServerParts[1];
var domain = gameServerParts[2];

var post = {
    score: "score",
 military: "army_score_main",
     gold: "trader_score_secondary" };
     
var updateCounter =0;
var scoreTypes = {
    0: "score", 
    1: "military", 
    2: "gold",
    3: "allyscore",
    4: "allymembers",
};

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

String.prototype.TrimHTML = function() { return this.replace(/(<[^>]*>)/g, ""); }

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

function requestAlliance(allyId, onload) {
    GM_xmlhttpRequest({
        method:'POST',
        url:'http://' + gameServer + '/index.php',
        data:"view=allyPage&allyId=" + allyId, 
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
    scoreElement.setAttribute("class", "dynamic");
    var scoreDiv = <>
    	<h3 style="margin-left:-5px;margin-right:-2px;" class="header">{lang['inline']}</h3>
        <li style="margin: 2px 10px;font-size:12px" id="ally_score" class="ally">
            <span style="float:left;" class="textLabel">{lang['allyscore']}: </span>
            <div id="allyscore">{lang['unknown']}</div>
        </li>
        <li style="margin: 2px 10px;font-size:12px" id="ally_members" class="ally">
            <span style="float:left;" class="textLabel">{lang['allymembers']}: </span>
            <div id="allymembers">{lang['unknown']}</div>
        </li>
        <li style="margin: 2px 10px;font-size:12px" id="total_score" class="ally">
            <span style="float:left;" class="textLabel">{lang['score']}: </span>
            <div id="score">{lang['unknown']}</div>
        </li>
        <li style="margin: 2px 10px;font-size:12px" id="army_score_main" class="ally">
            <span style="float:left;" class="textLabel">{lang['military']}: </span>
            <div id="military">{lang['unknown']}</div>
        </li>
        <li style="margin: 2px 10px;font-size:12px" id="trader_score_secondary" class="ally">
            <span style="float:left;" class="textLabel">{lang['gold']}: </span>
            <div id="gold">{lang['unknown']}</div>
        </li>
    </>;
    
    scoreElement.innerHTML = scoreDiv;
    
    // get container for Island view
    var informationContainer = document.getElementById('infocontainer');
    if (!informationContainer) { 
        informationContainer = document.getElementById('information'); 
    }
    
    //var allyClass = getElementsByClass(informationContainer, "ally") 
    
    //insertAfter(scoreElement, allyClass[0]);
    insertAfter(scoreElement, informationContainer);
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
    var pname = getElementsByClass(hiddenDiv, "name", false);
    for (var e = 0; e < pname.length; e++) {
        if (pname[e].innerHTML == playerName) {
            var totalScore = score[e].innerHTML;
        }
    }
    document.body.removeChild(hiddenDiv);

    if (type == "gold") {
        if (totalScore) { 
            if (totalScore.indexOf(",") != -1) {
                gold = parseInt(totalScore.replace(/,/g, ""),10);
            } else {
                gold = parseInt(totalScore.replace(/[.]/g, ""),10);
            }
            lootable = Math.round(townLevel * (townLevel - 1) / 10000 * gold);
            totalScore += " ("+ fmtNumber(lootable) + " " + lang["loot"] +")";
        } else {
            totalScore = "0";
        }
    }
    GM_setValue(type, totalScore);
    document.getElementById(type).innerHTML = totalScore;
}

function updateAllyDetails(divId, responseText) {
    var hiddenDiv = document.createElement("div");
    hiddenDiv.setAttribute("style", "display: none;");
    document.body.appendChild(hiddenDiv);
    hiddenDiv.innerHTML = responseText;
    var allyTable = getElementsByClass(hiddenDiv, 'content', false);

    var members = parseInt(allyTable[1].childNodes[1].childNodes[1].childNodes[2].childNodes[2].innerHTML, 10);
    var posScore = allyTable[1].childNodes[1].childNodes[1].childNodes[6].childNodes[2].innerHTML;

    if (/([0-9]+)\s\((.+)\)/.exec(posScore)!=null) {
    	allRank = RegExp.$1;
    	posScore = RegExp.$2;
    }
    document.body.removeChild(hiddenDiv);
    
    var strScore = posScore + " (" + allRank + ")";
    document.getElementById("allyscore").innerHTML = strScore;
    GM_setValue("allyscore", strScore);
    document.getElementById("allymembers").innerHTML = members;
    GM_setValue("allymembers", members);
//    GM_setValue(divId, (posScore + " (" + members + ")"));
//    document.getElementById(divId).innerHTML =  (posScore + " (" + members + ")");
}

function cityInformation() {
    if (!document.getElementById("inlinescore")) {
        createBaseDiv();
    }
    else {
    	document.getElementById('ally_score').style.display = "block";
    	document.getElementById('ally_members').style.display = "block";
    }
    // Get the language
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
    //var actions = document.getElementById("actions");
    //if (actions) {
    //    textSpans = getElementsByClass(actions, "disabled", true);
    //    for (var cnt = 0; cnt < textSpans.length;cnt++) {
    //        //textSpans[cnt].style.display = "none";
    //    }
    //}
    
    
    // Removes the report player link, again causes a fliker
    //var reportPlayer = getElementsByClass(document, "reportPlayer");
    //reportPlayer[0].style.display = "none";
    
    updateScore("score", lang.fetch);
    updateScore("military", lang.fetch);
    updateScore("gold", lang.fetch);
    updateScore("allyscore", lang.fetch); 
    updateScore("allymembers", lang.fetch);
	
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
    
    // Get the players alliance id for alliance check
    listParts = getElementsByClass(document,"ally", false)[0].innerHTML;
    if (/allyId=([0-9]+)/.exec(listParts) != null) {
    	var allyId = RegExp.$1;
    } else {
        var allyId = -1;
        GM_setValue("allyscore", "-");
        GM_setValue("allymembers", "-");
    }
    
    var checkedTime = (new Date().getTime() - (1000*60*10));
    if (playerName != GM_getValue("lastPlayerCheck") || GM_getValue("lastCheckedTimestamp") < checkedTime || GM_getValue("lastServerCheck") != gameServer) {

        if (playerScore > -1) {
            updateScore('score', fmtNumber(playerScore));
        } else {
            requestScore(playerName, 'score', function(responseDetails) {
                updateDetails('score', playerName, townLevel, responseDetails.responseText);
            });
        }
        
        requestScore(playerName, 'military', function(responseDetails) {
            updateDetails('military', playerName, townLevel, responseDetails.responseText);
        });
        requestScore(playerName, 'gold', function(responseDetails) {
            updateDetails('gold', playerName, townLevel, responseDetails.responseText);
        });
        
        if (allyId != -1) {
            requestAlliance(allyId, function(responseDetails) {
                updateAllyDetails('allyscore', responseDetails.responseText);
            });
        } else {
            updateScore("allyscore", "-")
            updateScore("allymembers", "-")
            document.getElementById('ally_score').style.display = "none";
            document.getElementById('ally_members').style.display = "none";
        }
        
        
        GM_setValue("lastCheckedTimestamp", new Date().getTime() + "");
        GM_setValue("lastPlayerCheck", playerName);
        GM_setValue("lastServerCheck", gameServer);
    } else {
        for(key in scoreTypes) {
            var type = scoreTypes[key];
            if (type == "allyscore" && GM_getValue(type) == "-") {
                document.getElementById('ally_score').style.display = "none";
            }
            if (type == "allymembers" && GM_getValue(type) == "-") {
            	document.getElementById('ally_members').style.display = "none";
            }
            document.getElementById(type).innerHTML = GM_getValue(type);
        }
    }
}

function defineLanguage(langTDL) {
    switch (langTDL) {
        case "pe":
            language = { inline:"Inline Score",
            fetch:"Recopilando...",
            unknown:"Desconocido",
            allyscore:"Puntaje alianza",
            allymembers:"Nº de miembros",
            score:"Puntaje de jugador",
            military:"Puntaje de tropas",
            gold:"Oro",
            loot:"de botín" };
            break;
        case "es":
            language = { inline:"Inline Score",
            fetch:"Buscando...",
            unknown:"Desconocido",
            allyscore:"Puntos alianza",
            allymembers:"Miembros alianza",
            score:"Puntos",
            military:"Tropas",
            gold:"Oro",
            loot:"botín" };
            break;
        case "fr":
            language = { inline:"Inline Score",
            fetch:"Rapportant...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            allymembers:"Ally Members",
            score:"Points",
            military:"Troupes",
            gold:"Or",
            loot:"butin" };
            break;
        case "gr":
            language = { inline:"Inline Score",
            fetch:"ανάκτηση...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            allymembers:"Ally Members",
            score:"Βαθμολογία",
            military:"Στρατεύματα",
            gold:"Χρυσός",
            loot:"loot" };
            break;
        case "de":
            language = { inline:"Inline Score",
            fetch:"Laden...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            allymembers:"Ally Members",
            score:"Gesamtpunkte",
            military:"Generäle",
            gold:"Goldbestand",
            loot:"loot" };
            break;
        case "tr":
            language = { inline:"Inline Score",
            fetch:"Yukleniyor...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            allymembers:"Ally Members",
            score:"Toplam Puan",
            military:"Askeri Puan",
            gold:"Altin Puani",
            loot:"loot" };
            break;
        case "cz":
            language = { inline:"Inline Score",
            fetch: "nahrávam...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            allymembers:"Ally Members",
            score: "Celkové skóre",
            military: "Vojenské skóre",
            gold: "Zlatá zásoba",
            loot:"loot" };
            break;
        case "sk":
            language = { inline:"Inline Score",
            fetch:"nahrávam...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            allymembers:"Ally Members",
            score:"Celkové Skóre",
            military:"Vojenské skóre",
            gold:"Zlatá zásoba",
            loot:"loot" };
            break;
        case "tw":
            language = { inline:"積分資訊",
            fetch:"讀取中...",
            unknown:"無法得知",
            allyscore:"聯盟分數",
            allymembers:"聯盟成員",
            score:"總積分",
            military:"戰爭將軍",
            gold:"黃金存量",
            loot:"搶" };
            break;
        case "cn": 
            language = { inline:"排名", 
            fetch:"获取中...", 
            unknown:"无法获取", 
            allyscore:"联盟总分", 
            allymembers:"联盟成员", 
            score:"总分", 
            military:"战争元帅", 
            gold:"黄金储备", 
            loot:"抢" }; 
            break;
        case "hu":
            language = { inline:"Inline Score",
            fetch:"Töltés...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            allymembers:"Ally Members",
            score:"Összpontszám",
            military:"Katonai pont",
            gold:"Arany",
            loot:"loot" };
            break;
        case "se":
            language = { inline:"Inline Score",
            fetch:"hämtar...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            allymembers:"Ally Members",
            score:"Totalpoäng",
            military:"Generalspoäng",
            gold:"Guldmängd",
            loot:"loot" };
            break;
        case "pl":
            language = { inline:"Inline Score",
            fetch:"Ładowanie...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            allymembers:"Ally Members",
            score:"Całkowity Wynik",
            military:"Generałowie",
            gold:"Zapas Złota",
            loot:"loot" };
            break;
        case "ro":
            language = { inline:"Inline Score",
            fetch:"Incarc...",
            unknown:"Necunoscut",
            allyscore:"Scor Alianta",
            allymembers:"Ally Members",
            score:"Scor Total",
            military:"Scor Armata",
            gold:"Scor Aur",
            loot:"loot" };
            break;
        case "il":
            language = { inline:"Inline Score",
            fetch:"טוען...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            allymembers:"Ally Members",
            score:"ניקוד",
            military:"כח צבאי",
            gold:"זהב",
            loot:"loot" };
            break;
        case "ikariam":
            if (subDomain == "fi") {
                language = { inline:"Inline Score",
                fetch:"haetaan...",
                unknown:"Unknown",
                allyscore:"Ally Score",
                allymembers:"Ally Members",
                score:"Kokonaispisteet",
                military:"Sotilaspisteet",
                gold:"Kulta",
                loot:"loot" };
            }
            if (subDomain == "ae") {
                language = { inline:"Inline Score",
                fetch:"يجلب...",
                unknown:"Unknown",
                allyscore:"نقاط التحالف",
                allymembers:"Ally Members",
                score:"المجموع الكلي",
                military:"النقاط العسكريه",
                gold:"الذهب",
                loot:"loot" };
            }
            if (subDomain == "ba") {
                language = { inline:"Inline Score",
                fetch:"dohvati...",
                unknown:"nemoguce",
                allyscore:"Bodovi Saveza",
                allymembers:"Ally Members",
                score:"Ukupni Rezultat",
                military:"Vojska",
                gold:"Zlato",
                loot:"loot" };
            }
            break;
        default:
            language = { inline:"Inline Score",
            fetch:"Fetching...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            allymembers:"Ally Members",
            score:"Total Score",
            military:"Military Score",
            gold:"Gold Score",
            loot:"loot" };
            break;
    }
    return language;
}



function init() {
    lang = defineLanguage(domain);
    
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

init();
