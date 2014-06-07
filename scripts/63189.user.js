// ==UserScript==
// homepage - http://www.ikariam.fr/
// version française de la version orignal .
//
// c'est pour tout  les ikarmien FR
// c'est gratuit donc pas besoin de payer 
// version mise a jour disponible dans http://userscripts.org/scripts/show/63189 .
//
// pour la vesrion anglaise orignal   http://www.ikariamlibrary.com/
//
// ==UserScript==
// @name           ikariam score-FR
// @namespace      Jino - GCT (GraphCorpTools)
// @description    pour regardé les point généraux de n'importe quel joueur , juste en clic-on sur ça ville 
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==


// ==/UserScript==
//GM_addStyle('#city #container #reportInboxLeft .content {	background-image: url('+GM_getValue('logo','http://ups.imagup.com/06/1259993423.jpg')+'); background-position: center top; background-repeat: no-repeat; }');
//GM_addStyle('#city #container #reportInboxLeft .content img {	visibility:hidden; }');
if(document.getElementById('city')){if(document.getElementById('reportInboxLeft')){if(document.getElementById('reportInboxLeft').getElementsByTagName('img')[0]){document.getElementById('reportInboxLeft').getElementsByTagName('img')[0].src=GM_getValue('logo','http://ups.imagup.com/06/1259993423.jpg');}}}


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
            fetch:"chargement ...",
            unknown:"?",
            allyscore:" ©Nolee - ",
            score:"Points",
            military:"Troupes"};
            break;
      
        case "ikariam":
            switch (subDomain) 
            {
                
            }
            break;
        default:
            language = {
            Pseudo:"Fetching...",
            Points:"Unknown",
            allyscore:"Ally Score",
            score:"Total Score",
            my:"Military Score" };
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
