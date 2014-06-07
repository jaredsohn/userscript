// 
// version 1.4.2 ( Ikariam Docs MOD)
// 2010-15-05
// author - Lez

// MOD BY - Ikariam Docs

//
// Please do not remove the above details; it is impossible to ensure
// all copys of this script are kept upto date, people need to know
// where they can go to get the most up to date version.
//
//
// ==UserScript==
// @name           Ikariam Score
// @namespace      ikariamScript
// @description    Puedes ver los puntajes ofensivos, defensivos, generales, puntaje de ally y posicion, tambien el oro y sus demas cordenadas de cualquier player
// @homepage       http://userscripts.org/scripts/show/79191
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
 military: "army_score_main",
     gold: "trader_score_secondary", 
 offensive: "offense",
 defensive: "defense"  
	 };
     
var updateCounter =0;
var scoreTypes = {
    0: "score", 
    1: "military", 
    2: "gold",
    3: "allyscore",
	4: "offensive",
	5: "defensive"};

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
    document.getElementById('island').style.backgroundColor = 'red';
	document.getElementById('container').style.backgroundColor = 'red';
	document.getElementById('container2').style.backgroundColor = 'red';
	
    var scoreDiv = <>
		<h3 class="header">Clasificaciones</h3>
		<li style="margin: 4px 10px;font-size:11px">
            <span style="float:left;" class="textLabel"><strong>Ally score:</strong></span>
			<div id="lie_block" style="height:60px"></div>
			<div id="allyscore">{lang['unknown']}</div>	
        </li>
		<hr />
		<li style="margin: 4px 10px;font-size:11px">
            <span style="float:left;" class="textLabel"><strong>Player score:</strong></span>           
        </li>
		<br />
        <li style="margin: 4px 10px;font-size:11px" id="total_score" class="ally">
            <span style="float:left;" class="textLabel">Puntos:</span>
            <div id="score">{lang['unknown']}</div>
        </li>
        <li style="margin: 4px 10px;font-size:11px" id="army_score_main" class="ally">
            <span style="float:left;" class="textLabel">Generales:</span>
            <div id="military">{lang['unknown']}</div>
        </li>
        <li style="margin: 4px 10px;font-size:11px" id="trader_score_secondary" class="ally">
            <span style="float:left;" class="textLabel">Oro:</span>
            <div id="gold">{lang['unknown']}</div>
        </li>
		<li style="margin: 4px 10px;font-size:11px" id="offense" class="ally">
            <span style="float:left;" class="textLabel">Ofensiva:</span>
            <div id="offensive">{lang['unknown']}</div>
        </li>
		<li style="margin: 4px 10px;font-size:11px" id="defense" class="ally">
            <span style="float:left;" class="textLabel">Defensiva:</span>
            <div id="defensive">{lang['unknown']}</div>
        </li>
    </>;
    
    scoreElement.innerHTML = scoreDiv;
    
    // get container for Island view
    var informationContainer = document.getElementById('infocontainer');
    if (!informationContainer) { 
        informationContainer = document.getElementById('information'); 
    }
    
    var allyClass = getElementsByClass(informationContainer, "ally") 
    
    insertAfter(scoreElement, allyClass[0]);
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
    
    GM_setValue(type, totalScore);
    document.getElementById(type).innerHTML = totalScore;
}

function updateAllyDetails(divId, responseText) {

    var hiddenDiv = document.createElement("div");		
    hiddenDiv.setAttribute("style", "display: none;");
    document.body.appendChild(hiddenDiv);
    hiddenDiv.innerHTML = responseText;
	var tds = document.getElementById('allyinfo');
	var nombreAlianza = tds.childNodes[1].childNodes[0].childNodes[1].innerHTML;	
	var miembros = tds.childNodes[1].childNodes[4].childNodes[2].innerHTML;	
	var topAlianza = tds.childNodes[1].childNodes[8].childNodes[2].innerHTML;
	
    var aAlianza = topAlianza.split(" ");	
	temp = aAlianza[1].split(")");
	temp = temp[0].split("(");
	
	var puntosAlianza = temp[1];	
	var posAlianza = aAlianza[0];
		
    GM_setValue(divId, ("["+ posAlianza + "]" + puntosAlianza + " (" + miembros + ")"));
	document.getElementById('lie_block').remove;	
	document.getElementById(divId).innerHTML =  ("<li style='margin-bottom:4px;'>&nbsp;</li><li style='margin:0;margin-bottom:4px;'><span class='textLabel' style='float: left;width:80px'>Posicion: </span><div>"+ posAlianza + "</div></li><li style='margin:0;margin-bottom:4px;'> <span class='textLabel' style='float: left;width:80px'>Puntos: </span><div>" + puntosAlianza + "</div></li><li style='margin:0;margin-bottom:4px;'><span class='textLabel' style='float: left;width:80px'>Miembros: </span><div>" + miembros + "</div></li>");
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
    
    updateScore("score", lang.fetch); updateScore("military", lang.fetch); updateScore("gold", lang.fetch); updateScore("allyscore", lang.fetch); 

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
    listParts = getElementsByClass(document,"ally", false)[0].innerHTML.split(">");
    if (listParts.length == 5 || listParts.length == 8) {
        listParts = listParts[2].split("&")[1];
        var allyId = parseInt(listParts.split("=")[1].replace(/^\s+|\s+$/g, ''), 10); // trim up the ally id
    } else {
        var allyId = -1;
        GM_setValue("allyscore", "-");
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
            document.getElementById('ally_members').style.display = "none";
        }
        
        
        GM_setValue("lastCheckedTimestamp", new Date().getTime() + "");
        GM_setValue("lastPlayerCheck", playerName);
        GM_setValue("lastServerCheck", gameServer);
    } else {
        for (var interation = 0;interation < 4; interation++) {
            var type = scoreTypes[interation];
            if (type == "allyscore" && GM_getValue(type) == "-") {
                document.getElementById(type).innerHTML = GM_getValue(type);
                document.getElementById('ally_members').style.display = "none";
            } else {
                document.getElementById(type).innerHTML = GM_getValue(type);
            }
        }
    }
}

function defineLanguage(langTDL) {
    switch (langTDL) {
        case "es":
            language = { inline:"Clasificaciones",
            fetch:"Fetching...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Total Score",
            military:"Generales",
            gold:"Oro",
			offense: "Offense",
			defense: "Defense"			
			};
            break;

        default:
            language = { inline:"Inline Score",
            fetch:"Fetching...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Total Score",
            military:"Generales",
            gold:"Oro",
			offensive: "Offense",
			defensive: "Defense"
			};
            break;
    }
    return language;
}



function init() {
    lang = defineLanguage(domain);
    lang = 'es';
	
	
	var gameServer = top.location.host;
	var gameServerParts = gameServer.split(".");
	var subDomain = gameServerParts[1];
	var domain = gameServerParts[2];
	
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

