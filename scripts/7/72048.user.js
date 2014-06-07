// version 1.5b (lite)
// 2009-01-11
// author - immortalnights
// contributions by - wphilipw and ecamanaut
//
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
// @name           IkariamInlineScore_v1_5b
// @namespace      ikariamScript
// @description    Displays a selected players score in the Info section when either their town is selected on the map, or you are viewing their town.
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

var baseDivCreated = false;
var gameServer = top.location.host;
var gameServerParts = gameServer.split(".");
var subDomain = gameServerParts[1];
var domain = gameServerParts[2];


var post = {
    score: "score",
 military: "army_score_main"};
     
var updateCounter =0;
var scoreTypes = {
    0: "score", 
    1: "military",
    2: "allyscore"};

var scoreShown = false;
var bMilitaryComparisonEnabled = false;

getElementsByClass = function(inElement, className, findIn) 
{
  var all = inElement.getElementsByTagName('*');
  var elements = [];
  for (var e = 0; e < all.length; e++) 
  {
    if (findIn == true) 
    {
        if (all[e].className.indexOf(className) > 0) 
        {
            elements[elements.length] = all[e];
        }
    } else {
        if (all[e].className == className) 
        {
            elements[elements.length] = all[e];
        }
    }
  }
  return elements;
};

// called using player name, score type, 
function requestScore(playerName, type, onload) 
{
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

function requestAlliance(allyId, onload) 
{
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
  for (var i = (n.length - 3); i > 0; i -= 3) 
  {
    n = n.slice(0, i) +","+ n.slice(i);
  }
  return n;
}

function createBaseDiv() 
{
    baseDivCreated = true;
    
    scoreElement = document.createElement("div");
    scoreElement.setAttribute("id", "inlinescore");
    
    var scoreDiv = <>
        <li style="margin: 2px 10px;font-size:11px" id="ally_score" class="ally">
            <span style="float:left;" class="textLabel">{lang['allyscore']}:</span>
            <div id="allyscore">{lang['unknown']}</div>
        </li>
        <li style="margin: 2px 10px;font-size:11px" id="total_score" class="ally">
            <span style="float:left;" class="textLabel">{lang['score']}:</span>
            <div id="score">{lang['unknown']}</div>
        </li>
        <li style="margin: 2px 10px;font-size:11px" id="army_score_main" class="ally">
            <span style="float:left;" class="textLabel">{lang['military']}:</span>
            <div id="military">{lang['unknown']}</div>
        </li>
    </>;
    
    scoreElement.innerHTML = scoreDiv;
    
    // get container for Island view
    var informationContainer = document.getElementById('infocontainer');
    if (!informationContainer) 
    { 
        informationContainer = document.getElementById('information'); 
    }
    
    var allyClass = getElementsByClass(informationContainer, "ally") 
    
    insertAfter(scoreElement, allyClass[0]);
    scoreShown = true;
}

function insertAfter(newElement,targetElement) 
{
    var parent = targetElement.parentNode;

    if(parent.lastchild == targetElement) 
    {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

function updateScore(type, score)
{
    document.getElementById(type).innerHTML = score;
}

function parseDetails(playerName, responseText) 
{
    var scoreValue = 0;
    var hiddenDiv = document.createElement("div");
    hiddenDiv.setAttribute("style", "display: hidden;");
    document.body.appendChild(hiddenDiv);
    hiddenDiv.innerHTML = responseText;
    var score = getElementsByClass(hiddenDiv, "score", false);
    var pname = getElementsByClass(hiddenDiv, "name", false);
    for (var e = 0; e < pname.length; e++) 
    {
        if (pname[e].innerHTML == playerName) 
        {
            scoreValue = score[e].innerHTML;
        }
    }
    document.body.removeChild(hiddenDiv);
    
    return scoreValue;
}

function updateDetails(type, playerName, responseText)
{
    var scoreValue = parseDetails(playerName, responseText);
    
    GM_setValue(type, scoreValue);
    document.getElementById(type).innerHTML = scoreValue;
}

function updateAllyDetails(divId, responseText) 
{
    var hiddenDiv = document.createElement("div");
    hiddenDiv.setAttribute("style", "display: none;");
    document.body.appendChild(hiddenDiv);
    hiddenDiv.innerHTML = responseText;
    var allyTable = getElementsByClass(hiddenDiv, 'content', false);

    var members = parseInt(allyTable[1].childNodes[1].childNodes[1].childNodes[2].childNodes[2].innerHTML, 10);
    var posScore = allyTable[1].childNodes[1].childNodes[1].childNodes[6].childNodes[2].innerHTML;
    posScore = posScore.split("(")[1];
    posScore = posScore.split(")")[0];
    
    document.body.removeChild(hiddenDiv);
    
    GM_setValue(divId, (posScore + " (" + members + ")"));
    document.getElementById(divId).innerHTML =  (posScore + " (" + members + ")");
}

//! gets the players name from the 'owner' DOM node
function getPlayerName(oElement)
{
  listParts = oElement.innerHTML.split(">");
  listParts[2] = listParts[2].split("<")[0];
  var playerName = listParts[2].replace(/^\s+|\s+$/g, ''); // trim up the Player Name// get the players name
  playerName = playerName.replace(/&nbsp;/g, " "); // replace any silly nubspaces!
  
  return playerName;
}

function cityInformation() 
{
    try
    {
        if (!document.getElementById("inlinescore")) 
        {
            createBaseDiv();
        }
        // Get the lanugage
        lang = defineLanguage(domain);
        
        var playerScore = -1;
        // Remove the "points" information (as of 0.2.8), and get the value for later
        var infoContainer = document.getElementById("infocontainer");
        if (infoContainer) 
        {
            var pointsLi = getElementsByClass(infoContainer, "name", false);
            if (pointsLi[1]) 
            {
                playerScore = parseInt(pointsLi[1].innerHTML.split(/>/)[2].replace(/,/g, ""),10);
                pointsLi[1].style.display = "none";
            }
        }
        
        updateScore("score", lang.fetch); updateScore("military", lang.fetch); updateScore("allyscore", lang.fetch); 

        var listParts = "";
        // Get the players name
        playerName = getPlayerName(getElementsByClass(document,"owner", false)[0]);
        
        // Get the players alliance id for alliance check
        listParts = getElementsByClass(document,"ally", false)[0].innerHTML.split(">");
        if (listParts.length == 5 || listParts.length == 8) 
        {
            listParts = listParts[2].split("&")[1];
            var allyId = parseInt(listParts.split("=")[1].replace(/^\s+|\s+$/g, ''), 10); // trim up the ally id
        } else {
            var allyId = -1;
            GM_setValue("allyscore", "-");
        }
        
        var checkedTime = (new Date().getTime() - (1000*60*10));
        if (playerName != GM_getValue("lastPlayerCheck") || 
            GM_getValue("lastCheckedTimestamp") < checkedTime || 
            GM_getValue("lastServerCheck") != gameServer) 
        {
            if (playerScore > -1)
            {
                updateScore('score', fmtNumber(playerScore));
                GM_setValue('score', fmtNumber(playerScore));
            } else {
                requestScore(playerName, 'score', function(responseDetails) 
                {
                    updateDetails('score', playerName, responseDetails.responseText);
                });
            }
            
            requestScore(playerName, 'military', function(responseDetails) 
            {
                updateDetails('military', playerName, responseDetails.responseText);
            });
            
            if (allyId != -1) 
            {
                requestAlliance(allyId, function(responseDetails) 
                {
                    updateAllyDetails('allyscore', responseDetails.responseText);
                });
            } else {
                updateScore("allyscore", "-")
                document.getElementById('ally_score').style.display = "none";
            }
            
            GM_setValue("lastCheckedTimestamp", new Date().getTime() + "");
            GM_setValue("lastPlayerCheck", playerName);
            GM_setValue("lastServerCheck", gameServer);
            
        } else {
            for (var interation = 0;interation < 4; interation++) 
            {
                var type = scoreTypes[interation];
                if (type == "allyscore" && GM_getValue(type) == "-") 
                {
                  document.getElementById(type).innerHTML = GM_getValue(type);
                  document.getElementById('ally_score').style.display = "none";
                } else {
                  document.getElementById(type).innerHTML = GM_getValue(type);
                }
            }
        }
    }
    catch(sError)
    {
      if (typeof sError == "string")
      {
        alert("Ikariam Inline Score has encountered an error while attempting to process scores for the selected player.\nPlease post a message on the Ikariam Library forums quoting the error below and which page it was received on\n" + sError);
      }
    }
}

function defineLanguage(langTDL) {
    switch (langTDL) {
        case "fr":
            language = {
            fetch:"cargando...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Points",
            military:"Troupes"};
            break;
        case "gr":
            language = {
            fetch:"ανάκτηση...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Βαθμολογία",
            military:"Στρατεύματα"};
            break;
        case "de":
            language = {
            fetch:"Laden...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Gesamtpunkte",
            military:"Generäle"}
            break;
        case "tr":
            language = {
            fetch:"Yukleniyor...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Toplam Puan",
            military:"Askeri Puan"};
            break;
        case "cz":
            language = {
            fetch: "nahrávam...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score: "Celkové skóre",
            military: "Vojenské skóre"};
            break;
        case "sk":
            language = {
            fetch:"nahrávam...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Celkové Skóre",
            military:"Vojenské skóre"};
            break;
        case "tw":
            language = {
            fetch:"讀取中...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"總積分",
            military:"戰爭將軍"};
            break;
        case "hu":
            language = {
            fetch:"Töltés...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Összpontszám",
            military:"Katonai pont"};
            break;
        case "se":
            language = {
            fetch:"hämtar...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Totalpoäng",
            military:"Generalspoäng"}
            break;
        case "pl":
            language = {
            fetch:"Ładowanie...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Całkowity Wynik",
            military:"Generałowie"};
            break;
        case "ro":
            language = {
            fetch:"Incarc...",
            unknown:"Necunoscut",
            allyscore:"Scor Alianta",
            score:"Scor Total",
            military:"Scor Armata"};
            break;
        case "il":
            language = {
            fetch:"טוען...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"ניקוד",
            military:"כח צבאי"};
            break;
        case "vn":
            language = { 
            fetch:"Đang tải...",
            unknown:"Không biết",
            allyscore:"Liên minh",
            score:"Tổng điểm",
            military:"Quân sự" }
            break;
        case "ikariam":
            switch (subDomain) 
            {
                case "fi":
                    language = {
                    fetch:"haetaan...",
                    unknown:"Unknown",
                    allyscore:"Ally Score",
                    score:"Kokonaispisteet",
                    military:"Sotilaspisteet"};
                    break;
                case  "ae":
                    language = {
                    fetch:"يجلب...",
                    unknown:"Unknown",
                    allyscore:"نقاط التحالف",
                    score:"المجموع الكلي",
                    military:"النقاط العسكريه"};
                    break;
                case  "ba":
                    language = {
                    fetch:"dohvati...",
                    unknown:"nemoguce",
                    allyscore:"Bodovi Saveza",
                    score:"Ukupni Rezultat",
                    military:"Vojska" };
                    break;
                case  "ar":
                    language = {
                    fetch:"Cargando...",
                    unknown:"Desconocido",
                    allyscore:"Puntaje de Alianza",
                    score:"Puntaje Total",
                    military:"Puntaje Militar" };
                    break;
            }
            break;
        default:
            language = {
            fetch:"Fetching...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Total Score",
            military:"Military Score" };
            break;
    }
    return language;
}

function calculateMilitary(oCityLocationNode)
{
  if (bMilitaryComparisonEnabled)
  {
    if (!getElementsByClass(oCityLocationNode, 'palm', false) ||
        !getElementsByClass(oCityLocationNode, 'inactivity', false))
    {
      var sPlayerName = getPlayerName(getElementsByClass(oCityLocationNode, 'owner', false)[0]);
      requestScore(sPlayerName, 'military', function(responseDetails) 
      {
          storeAndProcessMilitary('military',
                                  sPlayerName, 
                                  parseDetails(playerName, responseDetails.responseText));
      });
    }
  }
}

function storeAndProcessMilitary(scoreType, playerName, responseText)
{
  var iScoreValue = parseDetails(playerName, responseText);
  if (false)
  {
    
  }
}

function init() 
{
    lang = defineLanguage(domain);
    
    var linkElements = document.getElementsByTagName('a');
    for (var i = 0; i < linkElements.length; i++) 
    {
        if (linkElements[i].id.search(/city_[0-9]*/) != -1)
        {
          calculateMilitary(linkElements[i].parentNode);
            
          linkElements[i].addEventListener('click', function() { window.setTimeout(cityInformation, 1); }, false);
        }
    }
        
    var informationDiv = document.getElementById('information');
    if (informationDiv) 
    {
        var listElements = informationDiv.getElementsByTagName('li');
        if (listElements.length > 0) 
        {
            cityInformation();
        }
    }
}

init();
