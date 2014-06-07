// Ikariam magyc score v2 basé sur le script
// version 1 (lite)
// 2008-07-17
// author - immortalnights
// contributions by - wphilipw and ecamanaut
// modifie par magyc_victor
// homepage - http://www.ikaraimlibrary.com/
// for up to date details and version, please check the home page.
//
// Please do not remove the above details; it is impossible to ensure
// all copys of this script are kept upto date, people need to know
// where they can go to get the most up to date version.
//
// For full version history please see, http://www.ikariamlibrary.com/
//
// ==UserScript==
// @name           Magyc ikariam Score v2
// @namespace      www.magyc.net
// @description    Affiche les bons scores du joueur que ce soit en mode vision ville ou ile.
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

var baseDivCreated = false;
var gameServer = top.location.host;
var gameServerParts = gameServer.split(".");
var domain = gameServerParts[2];

var post = {
    score: "score",
 military: "army_score_main",
     gold: "trader_score_secondary" };
     
var updateCounter =0;
var scoreTypes = {
    0: "score", 
    1: "military", 
    2: "gold" };

getElementsByClass = function(inElement, className) {
  var all = inElement.getElementsByTagName('*');
  var elements = new Array();
  for (var e = 0; e < all.length; e++)
    if (all[e].className == className)
      elements[elements.length] = all[e];
  return elements;
}

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
        'Referer': 'http://' + gameServer + '/index.php'
      },
      onload:onload
    });
}

function fmtNumber(n) {
  n += "";
  for (var i = n.length - 3; i > 0; i -= 3)
    n = n.slice(0, i) +","+ n.slice(i);
  return n;
}

function createBaseDiv() {
    baseDivCreated = true;
    
    var scoreDiv = <>
    <h3 style="margin-left:-5px;margin-right:-2px;" class="header">{lang['inline']}</h3>
    <div id="scoreInformation" class="content">
        <ul class="cityinfo">
            <li style="margin: 2px 10px;" id="total_score" class="name"/>
                <span style="float:left;width:80px;" class="textLabel">{lang['score']}</span>
                <div id="score">Unknown</div>
            <li style="margin: 2px 10px;" id="army_score_main" class="name"/>
                <span style="float:left;width:80px;" class="textLabel">{lang['military']}</span>
                <div id="military">Unknown</div>
            <li style="margin: 2px 10px;" id="trader_score_secondary" class="name">
                <span style="float:left;width:80px;" class="textLabel">{lang['gold']}</span>
                <div id="gold">Unknown</div>
            </li>
        </ul>
    </div>
    </>;
    
    // get container for Island view
    var informationContainer = getElementsByClass(document, 'cityinfo');
    var contDiv = document.createElement("div")
    contDiv.innerHTML = scoreDiv.toXMLString();
    informationContainer[0].appendChild(contDiv);
}

function updateScoreDiv(lang, score, military, gold, lootable) {

    var informationContainer = document.getElementById('score').innerHTML = score;
    var informationContainer = document.getElementById('military').innerHTML = military;
    
    if (lootable != "")
        gold = gold + " (" + lootable + ")"; 
    var informationContainer = document.getElementById('gold').innerHTML = gold;
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

function updateScore(type, score) {
    document.getElementById(type).innerHTML = score;
}

function cityInformation() {
    createBaseDiv();
    updateScore("score", lang['fetch']); updateScore("military", lang['fetch']); updateScore("gold", lang['fetch']); 

    // Get the lanugage
    lang = defineLanguage(domain)

    // Get the players name
    var listParts = getElementsByClass(document,"owner")[0].innerHTML.split(">");
    listParts[2] = listParts[2].split("<")[0];
    var playerName = listParts[2].replace(/^\s+|\s+$/g, ''); // trim up the Player Name// get the players name
            
    // Get the players town level for gold pillage data
    var listParts = getElementsByClass(document,"citylevel")[0].innerHTML.split(">");
    listParts[2] = listParts[2].split("<")[0];
    var townLevel = parseInt(listParts[2].replace(/^\s+|\s+$/g, '')); // trim up the town level
            
    var checkedTime = (new Date().getTime() - (1000*60*10));
    if (playerName != GM_getValue("lastPlayerCheck") || GM_getValue("lastCheckedTimestamp") < checkedTime || 

GM_getValue("lastServerCheck") != gameServer) {

        requestScore(playerName, 'score', function(responseDetails) {
            updateDetails('score', playerName, townLevel, responseDetails.responseText) 
        });
        requestScore(playerName, 'military', function(responseDetails) {
            updateDetails('military', playerName, townLevel, responseDetails.responseText) 
        });
        requestScore(playerName, 'gold', function(responseDetails) {
            updateDetails('gold', playerName, townLevel, responseDetails.responseText) 
        });
        
        GM_setValue("lastCheckedTimestamp", (new Date().getTime()) + "");
        GM_setValue("lastPlayerCheck", playerName);
        GM_setValue("lastServerCheck", gameServer);
    } else {
        for (var interation = 0;interation < 3; interation++) {
            var type = scoreTypes[interation];
            document.getElementById(type).innerHTML = GM_getValue(type);
        }
    }
}

function updateDetails(type, playerName, townLevel, responseText) {
    var hiddenDiv = document.createElement("div");
    hiddenDiv.setAttribute("style", "display: none;");
    document.body.appendChild(hiddenDiv);
    hiddenDiv.innerHTML = responseText;
    var score = getElementsByClass(hiddenDiv, "score");
    var pname = getElementsByClass(hiddenDiv, "name");
    for (var e = 0; e < pname.length; e++)
        if (pname[e].innerHTML == playerName)
            var totalScore = score[e].innerHTML;
    document.body.removeChild(hiddenDiv);

    if (type == "gold") {
        gold = parseInt(totalScore.replace(",", ""));
        lootable = Math.round(townLevel * (townLevel - 1) / 10000 * gold)
        totalScore += " (" + fmtNumber(lootable) + ")";
    }

    GM_setValue(type, totalScore);
    document.getElementById(type).innerHTML = totalScore;
}

init();

function defineLanguage(langTDL) {
    switch (langTDL) {
        case "fr":
            language = { inline:"  Scores Joueurs",
            fetch:"cargando...",
            score:"Points",
            military:"Troupes",
            gold:"Or(pillable)" }
            break;
        case "gr":
            language = { inline:"Inline Score",
            fetch:"ανάκτηση...",
            score:"Βαθμολογία",
            military:"Στρατεύματα",
            gold:"Χρυσός" }
            break;
        case "de":
            language = { inline:"Inline Score",
            fetch:"laden...",
            score:"Totale score",
            military:"Militaire score",
            gold:"Goud score" }
            break;
        case "tr":
            language = { inline:"Inline Score",
            fetch:"Yukleniyor...",
            score:"Toplam Puan",
            military:"Askeri Puan",
            gold:"Altin Puani" }
            break;
        default:
            language = { inline:"Inline Score",
            fetch:"fetching...",
            score:"Total Score",
            military:"Military Score",
            gold:"Gold Score" }
            break;
    }
    return language;
}