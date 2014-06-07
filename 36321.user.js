// Simple translation updates by Whiskers, plus font size change. Whiskers takes NO CREDITS towards this script, this is just a simple comment.
// 
// version 1.4.2 (lite)
// 2008-05-21
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
// @name           Script de Mari0
// @namespace      ikariamScript
// @description    Multiples scripts
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
     gold: "trader_score_secondary" };
     
var updateCounter =0;
var scoreTypes = {
    0: "score", 
    1: "military", 
    2: "gold",
    3: "allyscore"};

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
    
    var scoreDiv = <>
        <li style="margin: 2px 10px;font-size:10px" id="total_score" class="ally">
            <span style="float:left;" class="textLabel">{lang['score']}:</span>
            <div id="score">{lang['unknown']}</div>
        </li>
        <li style="margin: 2px 10px;font-size:10px" id="army_score_main" class="ally">
            <span style="float:left;" class="textLabel">{lang['military']}:</span>
            <div id="military">{lang['unknown']}</div>
        </li>
        <li style="margin: 2px 10px;font-size:10px" id="trader_score_secondary" class="ally">
            <span style="float:left;" class="textLabel">{lang['gold']}:</span>
            <div id="gold">{lang['unknown']}</div>
        </li>
        <li style="margin: 2px 10px;font-size:10px" id="ally_members" class="ally">
            <span style="float:left;" class="textLabel">{lang['allyscore']}:</span>
            <div id="allyscore">{lang['unknown']}</div>
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

    if (type == "gold") {
        if (totalScore) { 
            if (totalScore.indexOf(",") != -1) {
                gold = parseInt(totalScore.replace(/,/g, ""),10);
            } else {
                gold = parseInt(totalScore.replace(/[.]/g, ""),10);
            }
            lootable = Math.round(townLevel * (townLevel - 1) / 10000 * gold);
            totalScore += " (" + fmtNumber(lootable) + ")";
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
    posScore = posScore.split("(")[1];
    posScore = posScore.split(")")[0];
    
    document.body.removeChild(hiddenDiv);
    
    GM_setValue(divId, (posScore + " (" + members + ")"));
    document.getElementById(divId).innerHTML =  (posScore + " (" + members + ")");
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
        case "fr":
            language = { inline:"Inline Score",
            fetch:"cargando...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Points",
            military:"Troupes",
            gold:"Oro" };
            break;
        case "gr":
            language = { inline:"Inline Score",
            fetch:"ανάκτηση...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Βαθμολογία",
            military:"Στρατεύματα",
            gold:"Χρυσός" };
            break;
        case "de":
            language = { inline:"Inline Score",
            fetch:"Laden...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Gesamtpunkte",
            military:"Generäle",
            gold:"Goldbestand" }
            break;
        case "tr":
            language = { inline:"Inline Score",
            fetch:"Yukleniyor...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Toplam Puan",
            military:"Askeri Puan",
            gold:"Altin Puani" };
            break;
        case "cz":
            language = { inline:"Inline Score",
            fetch: "nahrávam...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score: "Celkové skóre",
            military: "Vojenské skóre",
            gold: "Zlatá zásoba" };
            break;
        case "sk":
            language = { inline:"Inline Score",
            fetch:"nahrávam...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Celkové Skóre",
            military:"Vojenské skóre",
            gold:"Zlatá zásoba" };
            break;
        case "tw":
            language = { inline:"分數顯示",
            fetch:"讀取中...喵喵喵",
            unknown:"Unknown",
            allyscore:"聯盟分數",
            score:"總積分",
            military:"戰爭將軍",
            gold:"黃金存量" };
            break;
        case "hu":
            language = { inline:"Inline Score",
            fetch:"Töltés...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Összpontszám",
            military:"Katonai pont",
            gold:"Arany" };
            break;
        case "se":
            language = { inline:"Inline Score",
            fetch:"hämtar...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Totalpoäng",
            military:"Generalspoäng",
            gold:"Guldmängd" }
            break;
        case "pl":
            language = { inline:"Inline Score",
            fetch:"Ładowanie...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Całkowity Wynik",
            military:"Generałowie",
            gold:"Zapas Złota" };
            break;
        case "ro":
            language = { inline:"Inline Score",
            fetch:"Incarc...",
            unknown:"Necunoscut",
            allyscore:"Scor Alianta",
            score:"Scor Total",
            military:"Scor Armata",
            gold:"Scor Aur" };
            break;
        case "il":
            language = { inline:"Inline Score",
            fetch:"טוען...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"ניקוד",
            military:"כח צבאי",
            gold:"זהב" };
            break;
        case "ikariam":
            if (subDomain == "fi") {
                language = { inline:"Inline Score",
                fetch:"haetaan...",
                unknown:"Unknown",
                allyscore:"Ally Score",
                score:"Kokonaispisteet",
                military:"Sotilaspisteet",
                gold:"Kulta" };
            }
            if (subDomain == "ae") {
                language = { inline:"Inline Score",
                fetch:"يجلب...",
                unknown:"Unknown",
                allyscore:"نقاط التحالف",
                score:"المجموع الكلي",
                military:"النقاط العسكريه",
                gold:"الذهب" };
            }
            if (subDomain == "ba") {
                language = { inline:"Inline Score",
                fetch:"dohvati...",
                unknown:"nemoguce",
                allyscore:"Bodovi Saveza",
                score:"Ukupni Rezultat",
                military:"Vojska",
                gold:"Zlato" };
            }
            break;
        default:
            language = { inline:"Inline Score",
            fetch:"Fetching...",
            unknown:"Unknown",
            allyscore:"Puntos Alianza",
            score:"Puntos Totales",
            military:"P.Militares",
            gold:"Oro total" };
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

// ==UserScript==
// @name           	script de mari0
// @namespace      http://hightekcafe.com/ikariam
// @description    	cazaparasitos
// @include       	 http://s*.ikariam.*/*
// @exclude        	http://board.ikariam.*/*
// ==/UserScript==
// Original script built by Leecher Checker v 1.2.3
// New script built by Joshua Pack
	var lversion = "0.1.9";
	var updatesite = "http://img89.imageshack.us/img89/4428/dibujokn0.png";
/**
*	Parses a string of format 123,456 to an int in format 123456
*/
function toInt(string)
{
	var temp,result;
	temp = string.split(',');
	result = '';
	for(var i=0; i < temp.length; i++)
	{
		result += temp[i];
	}
	return parseInt(result);
}
/**
*	Depending on how well a person donates, he gets a color:
*	0-90		Leecher, color is red
*	90-100	Sort of leecher, color is blue
*	100-110	Donates enough, color is orange
*	110 - ??	Good donater, coller is green
*/
function getLeecherStatus(percentage)
{
	if (percentage > 110)
		return '#c7fac6';
	if (percentage >= 100)
		return '#faf4c6';
	if (percentage >= 90)
		return '#c6dafa';
	if (percentage == undefined) //error value
		return 'black';
	return '#fac6c6';
}
/**
*	Parses a string of format 10 into 010
*/
function tothree(percent)
{
	var result2 = percent;
	if (percent < 10) {
	result2 = "<font color='"+getLeecherStatus(percent)+"'>00</font>"+percent;
	} else if(percent < 100) {
	result2 = "<font color='"+getLeecherStatus(percent)+"'>0</font>"+percent;
	} else {
	result2 = percent;
	}
	return result2;
}
/**
*	Check to see if you have updated version!
*/
function check_for_update()
{
GM_xmlhttpRequest({
  method:"GET",
  url:updatesite,
  headers:{
    "User-Agent":"monkeyagent",
    "Accept":"text/monkey,text/xml",
    },
  onload:function(details) {
	var is_it_updated, updatecolor;
	if (details.readyState == 4) {
	var update_version = details.responseText.split('<span id="lversion">')[1];
	update_version = update_version.split('</span>')[0];
	if (update_version != lversion) {
	is_it_updated = "<a href='"+updatesite+"'><b>Out Of Date</b></a>"; 
	updatecolor = "RED";
	} else {
	is_it_updated = "Up To Date"; 
	updatecolor = "GREEN";
	}
	} else {
	is_it_updated = "<a href='"+updatesite+"'>Unknown [Could not find update]</a>"; 
	updatecolor = "GRAY";
	}
	var footer_update = document.getElementById('resourceUsers').childNodes[1];
	footer_update.innerHTML += " (<font color='"+updatecolor+"'>Leecher Checker is "+is_it_updated+"</font>)";
  }
});

}


window.addEventListener('load',  function() 
{ 
try
{
	// The id of the body tag contains which page you are on
	var page = document.getElementsByTagName('body')[0].id;
	
	// Check if you are at a resource deposit
	if ( (page == 'tradegood') || (page == 'resource') )
	{
		var donationList = document.getElementById('resourceUsers').childNodes[3].childNodes[1];//.childNodes[5-offset].childNodes[1];
		var name, playerName, donated, lvl, workers, percentage, param, method, mill_number, milllevel, actionmess;
		sort_all_mills = GM_getValue("sort_all_mills",0);
		// Depending on the type of resource, get the right variables
		if (page == 'resource') 
		{
		mill_number = 23;
			method = GM_getValue("method_building",1);
			param = GM_getValue("param_building",10);
			workplace = new Array();
			// 					    	 Workers / 	     lvl up / 	cumulative
			workplace[1]  = new Array( 30,       0,       0);
			workplace[2]  = new Array( 40,     350,     350);
			workplace[3]  = new Array( 52,     590,     940);

			workplace[4]  = new Array( 66,    1010,    1950);
			workplace[5]  = new Array( 81,    1810,    3760);
			workplace[6]  = new Array( 98,    3010,    6770);
			workplace[7]  = new Array(114,    4810,   11580);
			workplace[8]  = new Array(134,    7060,   18640);
			workplace[9]  = new Array(154,   10060,   28700);
			workplace[10] = new Array(175,   13910,   42610);
			workplace[11] = new Array(196,   18410,   61020);
			workplace[12] = new Array(219,   25010,   86030);
			workplace[13] = new Array(242,   32160,  118190);
			workplace[14] = new Array(265,   41160,  159350);
			workplace[15] = new Array(290,   52560,  211910);
			workplace[16] = new Array(315,   67510,  279420);
			workplace[17] = new Array(341,   85060,  364480);
			workplace[18] = new Array(367,  105210,  469690);
			workplace[19] = new Array(394,  127960,  597650);
			workplace[20] = new Array(422,  155960,  753610);
			workplace[21] = new Array(450,  197960,  951570);
			workplace[22] = new Array(479,  791840, 1743410);
			workplace[23] = new Array( -1, 1583680, 3327090);
		}
		else
		{
		mill_number = 18;
			method = GM_getValue("method_luxury",1);
			param = GM_getValue("param_luxury",10);
			workplace = new Array();
			// 					    	 Workers / 	     lvl up / 	cumulative
			workplace[1]  = new Array( 20,       0,       0);
			workplace[2]  = new Array( 33,     550,     550);
			workplace[3]  = new Array( 49,    1110,    1660);
			workplace[4]  = new Array( 68,    2440,    4100);
			workplace[5]  = new Array( 88,    4540,    8640);
			workplace[6]  = new Array(110,    7620,   16260);
			workplace[7]  = new Array(134,   12660,   28920);
			workplace[8]  = new Array(159,   19660,   48580);
			workplace[9]  = new Array(185,   28760,   77340);
			workplace[10] = new Array(213,   40520,  117860);
			workplace[11] = new Array(242,   54730,  172590);
			workplace[12] = new Array(271,   72420,  245010);
			workplace[13] = new Array(302,   95050,  340060);
			workplace[14] = new Array(334,  122250,	 462310);
			workplace[15] = new Array(367,  157560,  619870);
			workplace[16] = new Array(400,  203760,  823630);
			workplace[17] = new Array(434,  815040, 1638670);
			workplace[18] = new Array(-1,  1630080, 3268750);
		}
		// Find Mills level, only for Strict Breafuios
		if (method == 2) {	milllevel = document.getElementById('resUpgrade').childNodes[3].childNodes[3].innerHTML.split('</span>')[1];}
		if (sort_all_mills==1) {
		// Order mills
		var go_in_order = new Array();
		var go_in_order_sort = new Array();
		var new_var = 0;
		var donated_int2, donated_int;
		for (var jj = 1; jj < donationList.rows.length; jj++)
		{
			name = donationList.rows[jj].cells[1].innerHTML;
			playerName = donationList.rows[jj].cells[0].innerHTML;
			donated = donationList.rows[jj].cells[4].innerHTML;
			donated_int = toInt(donationList.rows[jj].cells[4].innerHTML.split(' ')[0]);
			lvl = donationList.rows[jj].cells[2].innerHTML;
			workers = donationList.rows[jj].cells[3].innerHTML;
			actionmess = donationList.rows[jj].cells[5].innerHTML;
			
			if (isNaN(donated_int)) {donated_int = donated_int2;}
			// 					    	       			Player /		town / 	level/	workers/		donated/		actions/		donated_int
			go_in_order[new_var]  = new Array(playerName,	name,	lvl,	workers,	donated,	actionmess,	donated_int);
			// sorting array
			if (isNaN(donated_int)) {donated_int = donated_int2;}
			go_in_order_sort[new_var]  = donated_int;
			new_var++;
			donated_int2 = donated_int;
		}
		go_in_order_sort = go_in_order_sort.sort(function(a,b){return b - a});
		var new_order = 1;
		var add_town;
		var ordered_towns = new Array();
		for (var jj2 = 0; jj2 < new_var; jj2++)
		{
			for (var jj3 = 0; jj3 < new_var; jj3++)
			{
				playerName = go_in_order[jj3][0];
				name = go_in_order[jj3][1];
				donated = go_in_order[jj3][4];
				donated_int = go_in_order[jj3][6];
				lvl = go_in_order[jj3][2];
				workers = go_in_order[jj3][3];
				actionmess = go_in_order[jj3][5];
				if (go_in_order_sort[jj2]==donated_int) {
				add_town = go_in_order[jj3];
				go_in_order[jj3] = [];
				break;
				}
			}
			ordered_towns[new_order] = add_town;
			new_order++;
		}
		for (var jj4 = 1; jj4 < new_order; jj4++)
		{
		
			donationList.rows[jj4].cells[0].innerHTML=ordered_towns[jj4][0];
			donationList.rows[jj4].cells[1].innerHTML=ordered_towns[jj4][1];
			donationList.rows[jj4].cells[2].innerHTML=ordered_towns[jj4][2];
			donationList.rows[jj4].cells[3].innerHTML=ordered_towns[jj4][3];
			donationList.rows[jj4].cells[4].innerHTML=ordered_towns[jj4][4];
			donationList.rows[jj4].cells[5].innerHTML=ordered_towns[jj4][5];
		
		}
		}
		// Start Rules and Laws
		for (var j = 1; j < donationList.rows.length; j+=cities)
		{
			// Name | Player name | Donated | Level | Number of workers | Actions
			name = donationList.rows[j].cells[1].innerHTML;
			playerName = donationList.rows[j].cells[0].innerHTML;
			donated = toInt(donationList.rows[j].cells[4].innerHTML.split(' ')[0]);
			lvl = donationList.rows[j].cells[2].innerHTML.split(' ')[1];
			workers = donationList.rows[j].cells[3].innerHTML.split(' ')[0];
			
			// Check how many cities this player has
			var j3 = j;
			var cum_city_lvl = 0;
			var cities = 1;
			j3++;
			while ( (j3 < donationList.rows.length) && ("&nbsp;" == donationList.rows[j3].cells[0].innerHTML) )
			{
				workers2 = donationList.rows[j3].cells[3].innerHTML.split(' ')[0];
				workers = workers*1;
				workers2 = workers2*1;
				cities = cities*1;
				cities = (cities+1);
				j3++;
			}
			var needed_wood;
			if (method == 1 || method == 2) //Breafuios and Strict Breafuios
			{
			var strict = "1";
			if (method == 1) {strict = "1.5";}
				var breafuios_new;
				// Check which level is used
				for(workers_lvl = 1; workers_lvl < mill_number; workers_lvl++)
				{
					if (workers <= strict * workplace[workers_lvl][0])
						break;
				}
				if (method == 2) {	if (workers > workplace[milllevel][0]) {workers_lvl = milllevel;}}
				breafuios_new = workplace[workers_lvl][2]*param/100;
			var j2 = j;
			j2++;
				while ( (j2 < donationList.rows.length) && ("&nbsp;" == donationList.rows[j2].cells[0].innerHTML) )
				{
					for(workers_lvl2 = 1; workers_lvl2 < mill_number; workers_lvl2++)
					{
					workers2 = donationList.rows[j2].cells[3].innerHTML.split(' ')[0];
						if (workers2 <= strict * workplace[workers_lvl2][0])
							break;
					
					}
				if (method == 2) {		if (workers2 > workplace[milllevel][0]) {workers_lvl2 = milllevel;}}
				breafuios_new = (breafuios_new+(workplace[workers_lvl2][2]*param/100));
					j2++;
				}
				if ("&nbsp;" != playerName) {
				percentage = ((donated / (breafuios_new))) * 100;
				}
				if (percentage=="Infinity") {percentage = 110.1;}
				if (percentage>999) {percentage = 999;}
				needed_wood = breafuios_new-donated+1;
				needed_wood110 = (breafuios_new*1.10)-donated+1;
			}
			else // ZEN Rule
			{
				// Check which level is used
				for(workers_lvl = 1; workers_lvl < 19; workers_lvl++)
				{
					if (workers <= 1.5 * workplace[workers_lvl][0])
						break;
				}
				if ("&nbsp;" != playerName) {
				percentage = ((donated / (workplace[workers_lvl][2]*param/100))/cities) * 100;
				}
				if (percentage=="Infinity") {percentage = 110.1;}
				if (percentage>999) {percentage = 999;}
				needed_wood = breafuios_new-donated+1;
				needed_wood110 = (breafuios_new*1.10)-donated+1;
			}
			for (j2 = 0; j2 < cities; j2++)
			{
			if (workers < 1 && percentage < 91) {
				donationList.rows[j+j2].style.backgroundColor = getLeecherStatus('90.1');
			}
			else
			{
				donationList.rows[j+j2].style.backgroundColor = getLeecherStatus(percentage);
			}
				if(sort_all_mills==1) {donationList.rows[j+j2].className = "avatar ";}
			}
			if (!percentage) {percentage = 0;}
			newpercent = Math.round(percentage);
			donationList.rows[j].cells[4].innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<name title='Needs "+Math.round(needed_wood)+" Wood to be at 100% and Needs "+Math.round(needed_wood110)+" Wood to be at 110%'>"+tothree(newpercent)+"%</name>";
		}
		check_for_update();

	}
	
	// Add options menu
	if (page == 'options')
	{
		var allElements = document.getElementsByTagName('form');

		for (var i = 0; i < allElements.length; i++)
		{
		    var thisElement = allElements[i];
			if (thisElement.elements[0].value == 'Options')
			{
				var breafious_building, sbreafious_building, ZEN_building, breafious_luxury,sbreafious_luxury, ZEN_luxury,debug_mode_on,debug_mode_off,sort_all_mills_on,sort_all_mills_off;
				var method_building = GM_getValue('method_building','1');
				var param_building 	= GM_getValue('param_building','15');
				var method_luxury 	= GM_getValue('method_luxury','1');
				var param_luxury 	= GM_getValue('param_luxury','15');
				var debug_mode 	= GM_getValue('debug_mode','0');
				var sort_all_mills 	= GM_getValue('sort_all_mills','0');

				if (method_building == 1)
					breafious_building = "checked='checked'";
				if (method_building == 2)
					sbreafious_building =  "checked='checked'";
				if (method_building == 3)
					ZEN_building =  "checked='checked'";
				if (method_luxury == 1)
					breafious_luxury = "checked='checked'";
				if (method_luxury == 2)
					sbreafious_luxury =  "checked='checked'";
				if (method_luxury == 2)
					ZEN_luxury =  "checked='checked'";
				if (debug_mode == 0)
					debug_mode_off =  "checked='checked'";
				if (debug_mode == 1)
					debug_mode_on =  "checked='checked'";
				if (sort_all_mills == 0)
					sort_all_mills_off =  "checked='checked'";
				if (sort_all_mills == 1)
					sort_all_mills_on =  "checked='checked'";
				var div;
				div = document.createElement('div');
				div.innerHTML = 
					"<div id='leecher_checker'>"+
						"<h3>Cazaparasitos de Alex "+lversion+" Opciones</h3>"+
						"<table cellpadding='0' cellspacing='0'>"+
							"<tr>"+ 
								"<td align='center' colspan='2'><i>Material de Construccion</i></td>"+
							"</tr>"+	
							"<tr>"+
					            "<th>Metodo:</th>"+
								"<td>"+
									"<input id='radio_1'  type='radio' class='radio' name='method_building' value='1' "+breafious_building+"/> Articulo<br />"+
									"<input id='radio_2'  type='radio' class='radio' name='method_building' value='2' "+sbreafious_building+" /> La regla estricta<br />"+
									//"<input id='radio_3'  type='radio' class='radio' name='method_building' value='3' "+ZEN_building+" /> ZEN"+
								"</td>"+
					        "</tr>"+
							"<tr>"+
					            "<th>Parametro:</th>"+
					            "<td><input id='text_1' type='textfield' class='textfield' name='param_building' size='10' value="+param_building+" /></td>"+
							"</tr>"+
							"<tr>"+ 
								"<td align='center' colspan='2'><i>Recursos de lujo<i></td>"+
							"</tr>"+
							"<tr>"+
								"<th>Metodo:</th>"+
								"<td>"+
									"<input id='radio_4' type='radio' class='radio' name='method_luxury' value='1' "+breafious_luxury+"/>Metodo regla<br />"+
									"<input id='radio_5' type='radio' class='radio' name='method_luxury' value='2' "+sbreafious_luxury+" /> Estricta regla<br />"+
									//"<input id='radio_6'  type='radio' class='radio' name='method_luxury' value='3' "+ZEN_building+" /> ZEN"+
							"</tr>"+
							"<tr>"+
								"<th>Param:</th>"+
								"<td><input id='text_2' type='textfield' class='textfield' name='param_luxury' size='10' value="+param_luxury+" /></td>"+
							"</tr>"+
							"<tr>"+ 
								"<td align='center' colspan='2'><i>Otras opciones<i></td>"+
							"</tr>"+
							"<tr>"+
								"<th>Modo depurado:</th>"+
								"<td>On<input id='radio_7' type='radio' class='radio' name='debug_mode' value='1' "+debug_mode_on+"/> Off<input id='radio_8' type='radio' class='radio' name='debug_mode' value='0' "+debug_mode_off+"/></td>"+
							"</tr>"+
							"<tr>"+
								"<th>Ordenar por donacion:</th>"+
								"<td>On<input id='radio_9' type='radio' class='radio' name='sort_all_mills' value='1' "+sort_all_mills_on+"/> Off<input id='radio_10' type='radio' class='radio' name='sort_all_mills' value='0' "+sort_all_mills_off+"/></td>"+
							"</tr>"+
				        "</table>"+
				    "</div>";
				
				thisElement.insertBefore(div, document.getElementById('options_debug'));
	            
	            document.getElementById('radio_1').addEventListener('change',function(event){GM_setValue('method_building','1');document.getElementById('text_1').value='15';GM_setValue('param_building','15')},true);
	            document.getElementById('radio_2').addEventListener('change',function(event){GM_setValue('method_building','2');document.getElementById('text_1').value='10';GM_setValue('param_building','10')},true);
				//document.getElementById('radio_3').addEventListener('change',function(event){GM_setValue('method_building','3');document.getElementById('text_1').value='15';GM_setValue('param_building','15')},true);
	            document.getElementById('radio_4').addEventListener('change',function(event){GM_setValue('method_luxury','1');document.getElementById('text_2').value='15';GM_setValue('param_luxury','15')},true);
	            document.getElementById('radio_5').addEventListener('change',function(event){GM_setValue('method_luxury','2');document.getElementById('text_2').value='10';GM_setValue('param_luxury','10')},true);
				//document.getElementById('radio_6').addEventListener('change',function(event){GM_setValue('method_luxury','3');document.getElementById('text_2').value='15';GM_setValue('param_luxury','15')},true);
				document.getElementById('radio_7').addEventListener('change',function(event){GM_setValue('debug_mode','1');},true);
				document.getElementById('radio_8').addEventListener('change',function(event){GM_setValue('debug_mode','0');},true);
				document.getElementById('radio_9').addEventListener('change',function(event){GM_setValue('sort_all_mills','1');},true);
				document.getElementById('radio_10').addEventListener('change',function(event){GM_setValue('sort_all_mills','0');},true);
	            document.getElementById('text_1').addEventListener('change',function(event){GM_setValue('param_building',document.getElementById('text_1').value)},true);
	            document.getElementById('text_2').addEventListener('change',function(event){GM_setValue('param_luxury',document.getElementById('text_2').value)},true);
			}
		}
	}
}
catch(er)
				{
				var debug_mode 	= GM_getValue('debug_mode','0');
				if (debug_mode == 1) {
				alert("Alex"+lversion+"\n si tienes problemas consulta ikariamlibrary" + er)
				}
				}
},
    true);

// ==UserScript==
// @name           IkariamFriendlist Troyanos
// @namespace      Elnaira y draco1989 Edited by: hda
// @description    Es el friendList de Enven2 (muchas gracias) pero editado para que no se abra la friendlist cuando se pasa el ratón por encima del botón, sino cuando se hace doble click.
// @include        http://*ikariam.*/index.php*
// ==/UserScript==



// Function to add styles
if(!window.addGlobalStyle){
	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
}

// The actual styles
addGlobalStyle(
'#flBox { height: 29px; width: 29px; position: absolute; margin:-170px 29px -18px 945px; z-index:31; }' + 
'#flHeader { height: 26px; background-image: url(http://img375.imageshack.us/img375/4042/flheadervv3xu6.jpg); background-repeat: no-repeat; font-weight: bold; font-size: 13px; text-align: center; padding-top: 5px; cursor: pointer; margin-top: 170px;}' + 
'#flHeader2 { height: 26px; width: 26px; background-image: url(http://img529.imageshack.us/img529/4585/flheader2kf8.jpg); background-repeat: no-repeat; background-position: right; font-weight: bold; font-size: 13px; text-align: right; cursor: pointer; margin-top: 170px; }' + 
'#flContent { height: 395px; background-image: url(http://img361.imageshack.us/img361/768/flbackgroundum3as3.jpg); margin-top: -5px; padding: 7px; overflow: auto; display: none; font-family: Arial; font-size: 12px; }' + 
'#flFooter { background-image: url(http://img360.imageshack.us/img360/4628/flfooterwc5fo2.jpg); height: 5px; display: none;  }' +
'#flBox ul { margin-left: 25px; } #flBox li { list-style: disc; } #flBox img{ margin-bottom:-3px; } #flBox ul a, #flBox p a { color: #542c0f; text-decoration: none; } #flBox ul a:hover, #flBox p a:hover{ color: #542c0f; text-decoration: underline; }' + 
'#flBox input[type=text]{ color: #542c0f; background-color: #f3edd3; border: 1px solid #542c0f; font-size: 12px; padding: 1px; width: 100px;}');

// If the list does not exist make it with value 0
if(!GM_getValue("IkariamFriendList")){
	GM_setValue("IkariamFriendList", "0");
}

var IkariamFriendList = GM_getValue("IkariamFriendList");

// Add friend function
unsafeWindow.flAddFriend = function(){
	
	var flNewName = document.getElementById("flNewName");
	var flNewLink = document.getElementById("flNewLink");
	
	if(flNewName.value == "" || flNewName.value == flNewName.defaultValue || flNewLink.value == "" || flNewLink.value == flNewLink.defaultValue){
		return alert("Please fill in all fields.");
	}
	
	var NewFriendListContent = '';
	
	if(IkariamFriendList == "0"){
		NewFriendListContent = flNewName.value + '|' + flNewLink.value + ';';
	}
	else{
		NewFriendListContent = IkariamFriendList + flNewName.value + '|' + flNewLink.value + ';';
	}
	
	window.setTimeout(GM_setValue, 0, "IkariamFriendList", NewFriendListContent);
	
	return window.location.reload();
	
	
};

// Delete friend function
unsafeWindow.flDeleteFriend = function(FriendName, FriendLink){
	
	var flConfirm = confirm("Seguro que quieres borrar a " + FriendName + "?");
	
	if(flConfirm == 1){
	
		var NewFriendListContent = '';
		
		flFiler = FriendName + '|' + FriendLink + ';';
		NewFriendListContent = IkariamFriendList.replace(flFiler, '');
		
		if(NewFriendListContent == ""){
			NewFriendListContent = "0";
		}
		
		window.setTimeout(GM_setValue, 0, "IkariamFriendList", NewFriendListContent);
		
		return window.location.reload();
	
	}

	return;
};

// Function to open/close the frame
unsafeWindow.flToggleFrame = function(nr){
	
	if(nr == 1){
		document.getElementById("flButtonArea").innerHTML = '<div id="flHeader" onClick="flToggleFrame(0);">Lista de Amigos</div>';
		document.getElementById("flContent").style.display = 'block';
		document.getElementById("flFooter").style.display = 'block';
		document.getElementById("flBox").style.height = '442px';
		document.getElementById("flBox").style.width = '165px';
		document.getElementById("flBox").style.margin = '-170px 29px -18px 806px';
	}
	else{
		document.getElementById("flButtonArea").innerHTML = '<div id="flHeader2" oNdblClick="flToggleFrame(1);"></div>';
		document.getElementById("flContent").style.display = 'none';
		document.getElementById("flFooter").style.display = 'none';
		document.getElementById("flBox").style.height = '29px';
		document.getElementById("flBox").style.width = '29px';
		document.getElementById("flBox").style.margin = '-170px 29px -18px 945px';
	}
	
};

// Function to add the current URL to the Link Field
unsafeWindow.flInsertCurrentURL = function(){
	
	var flNewLink = document.getElementById("flNewLink");
	var flCurrentURL = window.document.location;
	
	return flNewLink.value = flCurrentURL;
	
};

// Export function
unsafeWindow.flExport = function(){
	
	if(IkariamFriendList == "0"){
		return alert("No hay amigos en tu lista.");
	}
	
	prompt('Copiar esta linea de texto en la caja de importar.', IkariamFriendList);
	
}

// Import function
unsafeWindow.flImport = function(){
	var flImportValue = prompt('Pega la linea de texto en la caja de abajo. Asegurate que el texto tiene el formato correcto');
	
	if(flImportValue){
		if(IkariamFriendList == "0"){
			NewFriendListContent = flImportValue;
		}
		else{
			NewFriendListContent = IkariamFriendList + flImportValue;
		}
		window.setTimeout(GM_setValue, 0, "IkariamFriendList", NewFriendListContent);
		alert("Hecho");
		return window.location.reload();
	}else{
		return alert("Por favor, importa una linea de texto correcta.");
	}
	
	return false;
}




// remplazar function
unsafeWindow.flRemplaza = function(){
	var flRemplazaValue = prompt('Introduce la nueva lista de amigos. Si deseas borrar la lista actual, escribe 0 (cero)');
	
	if(flRemplazaValue){
		NewFriendListContent = flRemplazaValue;
		window.setTimeout(GM_setValue, 0, "IkariamFriendList", NewFriendListContent);
		alert("Hecho");
		return window.location.reload();
	}else{
		return alert("Por favor, escriba una linea de texto correcta.");
	}
	
	return false;
}




// Time to build the Friendlist in HTML
var flHTML = '';
var CurrentIkariamFriendList = '';

if(IkariamFriendList == "0"){
	
	flHTML += '<center>No hay amigos en la lista.</center>';

}
else{
	
	// Slice the last ; of the list
	CurrentIkariamFriendList = IkariamFriendList.slice(0, -1);
	// Split the long string up
	CurrentIkariamFriendList = CurrentIkariamFriendList.split(';');
	// And sort it alphabetical
	CurrentIkariamFriendList.sort();
	
	var IkariamFriend = '';
	
	flHTML += '<ul id="flList">';
	
	for(i=0;i<=CurrentIkariamFriendList.length-1;i++){
		
		IkariamFriend = CurrentIkariamFriendList[i];
		
		// Split every piece to get the name and link
		IkariamFriend = IkariamFriend.split('|');
		
		flFriendName = IkariamFriend[0];
		flFriendLink = IkariamFriend[1];
		
		flHTML += '<li><a href="' + flFriendLink + '">' + flFriendName + '</a> <a href="javascript:flDeleteFriend(\'' + flFriendName + '\', \'' + flFriendLink + '\');"><img src="http://www.idivimage.com/files/tmwwn5vzgmitwnooili2.gif"></a></li>';
		
	}
	
	flHTML += '</ul>';
}

// Add the HTML for the adding friends part
flHTML += '<div style="text-align:center;"><hr>Agregar Amigo<br><input type="text" name ="flNewName" id="flNewName" value="Nombre" onFocus="javascript:if(this.value == this.defaultValue) this.value = \'\';" onblur="javascript:if(this.value == \'\') this.value = this.defaultValue;" /><p><a onClick="javascript:flInsertCurrentURL();" style="font-size: 9px; cursor: pointer;">Usar URL actual</a></p><input type="text" name ="flNewLink" id="flNewLink" value="URL" onFocus="javascript:if(this.value == this.defaultValue) this.value = \'\';" onblur="javascript:if(this.value == \'\') this.value = this.defaultValue;" /><br /><br /><a href="javascript:flAddFriend();" class="button">&nbsp;&nbsp;&nbsp;Agregar&nbsp;&nbsp;&nbsp;</a><br><p style="padding-top: 8px;"><a href="javascript:flExport();" class="flSmall" style="font-size: 10px;">Exportar</a> | <a href="javascript:flImport();" class="flSmall" style="font-size: 10px;">Importar</a></p> <p><a href="javascript:flRemplaza();" class="flSmall" style="font-size: 10px;">Reemplazar</a></p></div>';

// And now its time to place it in the right position, before the 'mainview' (playfield) div that is
var main, newElement;
main = document.getElementById('mainview');
if (main) {
    newElement = document.createElement('div');
	newElement.setAttribute('id', 'flBox');
    main.parentNode.insertBefore(newElement, main);
}

// And finally put layout + friendlist HTML in it all together, we're done :)
document.getElementById("flBox").innerHTML = '<div id="flButtonArea"><div id="flHeader2" oNdblClick="flToggleFrame(1);"></div></div><div id="flContent">' + flHTML + '</div><div id="flFooter"></div>';

// ==UserScript==
// @name           ALIANZAS COA`S ALPHA
// @namespace      ikatips
// @description    Herraminetas para la alianza 
// @include        http://*ikariam.*/index.php*
// @author         Original por Verx - Modificado por ALEX para ALIANZAS COA -
// @version        20080619 120713 
// ==/UserScript==

var tagsAModificar = new Array("A","SPAN");
var diaLimite     = 2;
var cookieIKO    = 'IKAFONT';
var cookie_SEPARA    = '|';
var css_MenuIKO_String = '#menu {'+
'align:right;'+
'margin-left:680px;'+
'margin-top: -16.5px;'+
'color:white;'+
'width: 50px;'+
'cursor: hand;'+
'}'+
'#menu ul {'+
'list-style: none;'+
'margin: 0;'+
'padding: 0;'+
'width: 13em;'+
'}'+
'#menu a, #menu h2 {'+
'font: bold 11px/16px arial, helvetica, sans-serif;'+
'display: block;'+
'margin: 0;'+
'padding: 2px 3px;'+
'cursor: hand;'+
'}'+
'#menu a {'+
'color: RGB(84,44,15);'+
//Colores menu normal.
'background: RGB(246,235,188);'+
'border: double 3px RGB(84,44,15);'+
'border-left: double 3px RGB(84,44,15);'+
'border-right: double 3px RGB(84,44,15);'+
'text-decoration: none;'+
'}'+
'#menu a:hover {'+
'color: RGB(84,44,15);'+
//Color menu seleccionado.
'background: RGB(222,180,120);'+
'border: double 3px RGB(84,44,15);'+
'}'+
'#menu li {position: relative; }'+
'#menu ul ul {'+
'position: relative;'+
'z-index: 500;'+
'}'+
'#menu ul ul ul {'+
'position: absolute;'+
'top: 0;'+
'left: 100%;'+
'}'+
'div#menu ul ul,'+
'div#menu ul li:hover ul ul,'+
'div#menu ul ul li:hover ul ul'+
'{display: none;}'+
'div#menu ul li:hover ul,'+
'div#menu ul ul li:hover ul,'+
'div#menu ul ul ul li:hover ul'+
'{display: block;}';
//esta característica es casi estándar, utilizado en muchos scripts de Greasemonkey
if(!window.add_Global_Style){
       function add_Global_Style(css) {
               var head, style;
               head = document.getElementsByTagName('head')[0];
               if (!head) { return; }
               style = document.createElement('style');
               style.type = 'text/css';
               style.innerHTML = css;
               head.appendChild(style);
       }
}

function getAlltagsAModificar(){

var arrResult = new Array();
var lastI     = 0;
var xTags     = null;

for (tagX = 0; tagX<tagsAModificar.length; tagX++) {
xTags = document.getElementsByTagName(tagsAModificar[tagX]);
for(i=0;i<xTags.length;i++){arrResult[lastI] = xTags[i];lastI++;}
}

return arrResult;

}

unsafeWindow.setFontIka = function () {
 var FamilyIndex = document.getElementById("Family").selectedIndex;
 var FI = document.getElementById("Family").options[FamilyIndex].text;
 changeAllFamily(FI);
 var SizeIndex = document.getElementById("Size").selectedIndex;
 var SI = document.getElementById("Size").options[SizeIndex].text;
 changeAllSize(SI);
 var ColorIndex = document.getElementById("Color").selectedIndex;
 var CI = document.getElementById("Color").options[ColorIndex].text;
 changeAllColor(CI);
 createCookie(cookieIKO,FI+cookie_SEPARA+SI+cookie_SEPARA+CI,diaLimite);
}
function createCookie(name,value,days) {
       if (days) {
               var date = new Date();
               date.setTime(date.getTime()+(days*24*60*60*1000));
               var expires = "; expires="+date.toGMTString();
       }
       else var expires = "";
       document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(c_name) {
       if (document.cookie.length>0)
 {
 c_start=document.cookie.indexOf(c_name + "=");
 if (c_start!=-1)
   {
   c_start=c_start + c_name.length+1;
   c_end=document.cookie.indexOf(";",c_start);
   if (c_end==-1) c_end=document.cookie.length;
   return unescape(document.cookie.substring(c_start,c_end));
   }
 }
       return "";
}
function initFont(){
var rC     = readCookie(cookieIKO);
if (rC){
var myFont = rC.split(cookie_SEPARA);
changeAllFamily(myFont[0]);
changeAllSize(myFont[1]);
changeAllColor(myFont[2]);
}
}
function eraseCookie(name) {
       createCookie(name,"",-1);
}
function changeAllFamily(valueOfSelect){
var dataToChange = getAlltagsAModificar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.fontFamily = valueOfSelect;
}
}
function changeAllSize(valueOfSelect){
var dataToChange = getAlltagsAModificar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.fontSize = valueOfSelect;
}
}
function changeAllColor(valueOfSelect){
var dataToChange = getAlltagsAModificar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.color = valueOfSelect;
}
}
unsafeWindow.clearFont = function(){
eraseCookie(cookieIKO);
window.location.reload();
}
function addIKOS_ToolsMenu(){

var xTags = document.getElementsByTagName('LI');
var xLi   = null;
var IKOSTools_Link       = document.createElement('LI');
IKOSTools_Link.setAttribute('id', 'IKOSTools');

for(i=0;i<xTags.length;i++){
xLi = xTags[i];
if (xLi.className == 'help') {
xLi.parentNode.appendChild(IKOSTools_Link,xLi);
add_Global_Style(css_MenuIKO_String);
document.getElementById('IKOSTools').innerHTML =
'<div id="menu">'
+ '<ul>'
+ ' <li><h2>TROYANOS</h2>'
+ '   <ul>'
+ '     <li><a target="_blank" href="http://troyanosfan.foroactivo.net/index.htm" title="FORO TROYANOS" align="left">&nbsp;Foro de los troyanos</a></li>'
+ '     <li><a target="_blank" href="http://lacoalicion.foroactivo.com.es/index.htm?sid=b775a7517f4f182ed51d241813b2f8f7" title="Foro de la Hermandad de los troyanos" align="left">&nbsp;FORO HERMANDAD</a></li>'
+ '     <li><a target="_blank" href="http://troyanosfan.foroactivo.net/portal.htm" title=" Portal oficial con multiples modulos de descarga, busqueda,etc...." align="left">&nbsp;PORTAL OFICIAL</a></li>'
+ '     <li><a target="_blank" href="http://userscripts.org/users/61979/scripts" title="Sripts de la alianza" align="left">&nbsp;SCRIPTS DE LA ALIANZA</a></li>'
+ '     <li><a target="_blank" href="http://cuhuutopiascitys.es.tl/" title="WEB ALIANZA" align="left">&nbsp;WEB ALIANZA</a></li>'
+ '     <li><a target="_blank" href="http://s1.ikariam.es/index.php?view=sendAllyMessage&oldView=diplomacyAdvisor&watch=4&id=12&type=50" title=" Mensaje a todos " align="left">&nbsp;Mensaje a todos</a></li>'
+ '	<li><a target="_blank" href="http://s1.ikariam.es/index.php?view=sendMessage&with=6005&oldView=highscore" title="LIDER TROYANOS" align="left">&nbsp;LIDER TROYANOS</a></li>'
+ '	<li><a target="_blank" href="http://s1.ikariam.es/index.php?view=sendMessage&with=79253&oldView=highscore" title="LIDER HERMANDAD DE TROYANOS" align="left">&nbsp;LIDER HERMANDAD DE TROYANOS</a></li>'
+ '     <li><a target="_blank" href="http://s1.ikariam.es/index.php?view=sendMessage&with=13449&oldView=highscore" title="LIDER TROY 2" align="left">&nbsp;LIDER TROY 2</a></li>'
+ '     <li><a target="_blank" href="http://s1.ikariam.es/index.php?view=sendMessage&with=57566&oldView=highscore" title="LIDER TROY3" align="left">&nbsp;LIDER TROY3</a></li>'
+ '     <li><a target="_blank" href="http://s1.ikariam.es/index.php?view=sendMessage&with=5917&oldView=highscore" title="LIDER MEDIT" align="left">&nbsp;LIDER MEDIT</a></li>'
+ '	<li><a target="_blank" href="http://s1.ikariam.es/index.php?view=allyPage&allyId=40" title="Pagina externa de la alianza troyanos" align="left">&nbsp;P.EXTERNA TROYANOS</a></li>'
+ '	<li><a target="_blank" href="http://s1.ikariam.es/index.php?view=allyPage&allyId=8119" title="Pagina externa de la alianza troyanos2" align="left">&nbsp;P.EXTERNA TROYANOS2</a></li>'
+ '     <li><a target="_blank" href="http://s1.ikariam.es/index.php?view=allyPage&allyId=4158" title="Pagina externa de la alianza Hermandad de troyanos" align="left">&nbsp;P.EXTERNA HERMANDAD</a></li>'
+ '     <li><a target="_blank" href="http://s1.ikariam.es/index.php?view=allyPage&allyId=8976" title="Pagina externa de la alianza La Diosa Isis Troy3" align="left">&nbsp;P.EXTERNA TROY3</a></li>'
+ '     <li><a target="_blank" href="http://s1.ikariam.es/index.php?view=allyPage&allyId=8571" title="Pagina externa de la alianza Mediterranea" align="left">&nbsp;P.EXTERNA MEDIT</a></li>'
+ '     <li><a target="_blank" href="http://www.serpini.es/chivakariam/index.php" title=" Xivaikariam " align="left">&nbsp;Xivaikariam</a></li>'
+ '     <li><a target="_blank" href="http://troyanosfan.foroactivo.net/tv-radio-programacion-f4/radio-t17.htm" title=" Radio " align="left">&nbsp;Radio</a></li>'
+ '     <li><a target="_blank" href="http://troyanosfan.foroactivo.net/tv-radio-programacion-f4/television-t16.htm" title=" TELEVISION " align="left">&nbsp;Television</a></li>'
+'</ul>'
+'</DIV>';

break;
}}}

addIKOS_ToolsMenu();

// ==UserScript==
// @name           PARA MINISTROS Y DIPLOMATICOS.
// @namespace      MMXForge
// @description    informa de conexion,inactividad,puntos que ganas cada X,nuevos o abandonos,...
// @author       Alex
// @version		   0.10
// @include		   http://s*.ikariam.*/*
// @exclude		   http://board.ikariam.*/*
// ==/UserScript==
/*
 * This script comes from an idea of N-I-K-O.
 * It merge in a unique script 2 other scripts
 * IkariamMemberLastOnline (http://userscripts.org/scripts/show/34793) from Ektdeheba
 * Ikariam Ally's Memebers Info (http://userscripts.org/scripts/show/34852) from Luca Saba... wich is me :D
*/
/*
 * Changes in v. 0.9
 * - Ikariam 2.8 compatibility
 * - Removed Ally Sorter.... not needed anymore
 */
 
if(document.getElementById('embassy') == null && document.getElementById('alliance') == null) return;

var host = top.location.host.split(".");
var domain = host[host.length -1];
var server = host[0];

var tpl = GM_getValue('template', 0);

var membersTab = document.getElementById('memberList');
if(membersTab == null) return;
var update_record = false;
//var points_cell_idx = membersTab.rows[0].cells.length - 3;
var points_cell_idx = 4;

/*
 * Words dictionary
 */
var lang={
  en: {'newAlert': 'New Members', 'newTotal': 'Total new members', 'aband': 'Abandon', 'totAban': 'Total abandon', 'confirm': 'Are you sure you want to reset recorded points ?'},
  it: {'newAlert': 'Nuovi membri', 'newTotal': 'Totale nuovi membri', 'aband': 'Abbandoni', 'totAban': 'Totale abbandoni', 'confirm': 'Sei sicuro di cancellare i punteggi salvati ?'},
  co: {'newAlert': 'חברים חדשים', 'newTotal': 'סך הכל חברים חדשים', 'aband': 'עזבו', 'totAban': 'סך הכל עזבו', 'confirm': 'האם אתה בטוח שבירצונך לאפס?'}, //Thanks to MindTwister
  il: {'newAlert': 'חברים חדשים', 'newTotal': 'סך הכל חברים חדשים', 'aband': 'עזבו', 'totAban': 'סך הכל עזבו', 'confirm': 'האם אתה בטוח שבירצונך לאפס?'}, //Thanks to MindTwister
}

var local = 'en'; //For i18n
//If domain id in the dictionary, use domain's dictionary
if(domain in lang) local = domain;

//Order by points... not needed anymore
//sortAlly();

//Last Recorded values... this method.. I've seen it in an ecmanaut script ;-)
var members = eval(GM_getValue(domain + "." + server + ".members.2.8", {}) || {});
var recorded_points = eval(GM_getValue(domain + "." + server + ".points.2.8", {}) || {});
//Add reset and config images
var confRow = document.createElement('TR');
var confCell = document.createElement('TD');
confCell.setAttribute('colspan', '6');
confCell.innerHTML = "<img style='float: left' src='http://isoleunite.mmxforge.net/images/stories/ikariam/unit_boom_small.gif' alt='Config' title='Config' id='ainfoConfig'>";
confCell.innerHTML += "<img style='float: right' src='http://isoleunite.mmxforge.net/images/stories/ikariam/icon-backx20.gif' alt='Reset' title='Reset' id='ainfoReset'>";
confRow.appendChild(confCell);
membersTab.appendChild(confRow);

//Listener to reset member's points record
document.addEventListener('click',function(event) {
  //Send Message Button
  if (event.target.id=='ainfoReset') 
  {
    recorded_points = actualValues;
    if(confirm(lang[local]['confirm']))
      saveArray("points", recorded_points);
  }
  if (event.target.id=='ainfoConfig') 
  {
    showToolConfig(event);
  }
  if ( event.target.id=='eToolConfButton')
  {
    if(document.getElementById('eToolCfImages').checked)
      GM_setValue('template', 1);
    else
      GM_setValue('template', 0);
    document.getElementById('eToolConfDiv').style.display = 'none';
  }
}, true);
//addEventListener("keyup", showToolConfig, false);

function showToolConfig(e)
{
  //if(e.keyCode != 51) return;
  var div =  document.getElementById('eToolConfDiv');
  if(div) div.style.display = 'block';
  else
  {
    div = document.createElement('div'); 
    div.setAttribute('id', 'eToolConfDiv');
    div.setAttribute('class', 'dynamic');
    div.setAttribute('style', 'z-index: 10; border: 1px solid #CB9B6B; background-color: #FDF7DD; width: 229px; height: 150px; position: absolute; float: center;top: ' + e.pageY + 'px; left: ' + e.pageX +'px');
    div.innerHTML = '<h3 class="header" style="padding-top: 8px; height: 20px; background-image: url(http://s3.ikariam.it/skin/layout/bg_sidebox_header.jpg)"><b>Config</b></h3>'; 
    div.innerHTML += '<div style="margin-left: 80px; margin-top: 20px; text-align: left">';
    
    if(tpl == 0) div.innerHTML += '<input id="eToolCfText" style="position: absolute;left: 60px;" type="radio" name="garba" value="0" checked >&nbsp;Text<br/>';
    else div.innerHTML += '<input id="eToolCfText" style="position: absolute;left: 60px;" type="radio" name="garba" value="0">&nbsp;Text<br/>';
    
    if(tpl == 1) div.innerHTML += '<input id="eToolCfImages" style="position: absolute;left: 60px;" type="radio" name="garba" value="1" checked >&nbsp;Images</div>';
    else div.innerHTML += '<input id="eToolCfImages" style="position: absolute;left: 60px;" type="radio" name="garba" value="1">&nbsp;Images</div>';
    
    //GM_log(div.innerHTML);
    div.innerHTML += '<input id="eToolConfButton" type="button" class="button" value="Save">';
    document.body.appendChild(div); 
  }
}

var actualValues = getActualData();
//Let's check for new entries
var msg = lang[local]['newAlert'] + "\n";
var sum = 0;
for(var k in members) GM_log(k);
for(var readed_name in actualValues)
{
  //If an actual member name is not in the members list...
  if(typeof(members[readed_name]) == 'undefined')
  {
    sum++;
    msg += readed_name + "\n";
  }
}
if(sum > 0) alert(msg + lang[local]['newTotal'] + ": " + sum);
//And now, let's check for those who left the ally!
var msg = lang[local]['aband'] + "\n";
sum = 0;
for(var member_name in members)
{
  //If a member name is not in the actual member list...
  if(typeof(actualValues[member_name]) == 'undefined')
  {
    sum++;
    msg += member_name + "\n";
    var trOut = document.createElement("TR");
    trOut.style.backgroundColor = "#F00";
    var tdOut = document.createElement("TD");
    tdOut.setAttribute('colspan','7');
    tdOut.style.color = "#FFF";
    tdOut.innerHTML = "<b>" + member_name + "</b> Points: <b>" + members[member_name] + "</b>";
    trOut.appendChild(tdOut);
    membersTab.appendChild(trOut);
  }
}
if(sum > 0) alert(msg + lang[local]['totAban'] + ": " + sum);
saveArray("members", actualValues);

/*
This function helps convert the Ikariam internal date format (day.month.year)
to the javascript Date Object format (year,month,day).
Original Author: Ektdeheba
For version: 0.1.1
Last changed: 0.1.2
*/
function convertIkariamDate( argDate ) {
    var returnDate = new Date(
        argDate.split(".")[2],      // Year Argument
        argDate.split(".")[1] - 1,  // Month Argument (ZERO based), subtract one to offset
        argDate.split(".")[0]);     // Day Argument
    return returnDate;
}

//Returns an Associative Array of the members's points
//While doing that, it sets the online/inactive/offline status
function getActualData()
{
  var res = new Array();
  var pName = '';
  var pPoints = 0;
  for(i=1; i < membersTab.rows.length - 1; i++)
  {
    setOnlineStatus(membersTab.rows[i]);
    pName = membersTab.rows[i].cells[1].innerHTML;
	  pPoints = membersTab.rows[i].cells[points_cell_idx].innerHTML.replace(",", "") * 1; //Force variable type
	  res[pName] = pPoints;
    //If this is the first insert for this member
    if(typeof(recorded_points[pName]) === 'undefined')
	  {
	    membersTab.rows[i].cells[points_cell_idx].innerHTML += " (<font color='#F00'>New Entry</font>)";
	    recorded_points[pName] = pPoints;
	    update_record = true;
    }
	  else
	  {
	    var prev = recorded_points[pName];
	    var act = res[pName];
	    membersTab.rows[i].cells[points_cell_idx].innerHTML += " (<font color='#F00'>" + (act - prev) + "</font>)";
    }
  }
  if(update_record) saveArray("points", recorded_points);
  return res;
}

//Saves an array to GM string
function saveArray(variable, values_array)
{
  var str = '({';
  for(var k in values_array) str += "'" + k + "':" + values_array[k] + ", ";
  str += '})';
  GM_setValue(domain + '.' + server + '.' + variable + ".2.8", str);
}

function setOnlineStatus(tRow)
{



  if(tRow.cells[0].getAttribute('class') == 'online')
  {
    template('online', tRow, null);
  }
  else if(tRow.cells[0].getAttribute('class') == 'offline')
  {
    var nowDateStr = document.getElementById('servertime').innerHTML.split(" ")[0].replace(/^\s+|\s+$/g, '');
    var nowDate = convertIkariamDate( nowDateStr );
    var inactiveDate = new Date();
    inactiveDate.setDate( nowDate.getDate() - 7 );  // accounts generally go inactive after seven days
    
    var lastOnline = tRow.cells[0].title.split(":")[1].replace(/^\s+|\s+$/g, '');
    var lastDate = convertIkariamDate( lastOnline );

    if( lastDate < inactiveDate )
      template('inactive', tRow, lastOnline);
    else
      template('offline', tRow, lastOnline);
  }
}

function template(status, rowElement, lastOnline)
{
  if(status == 'online')
  {
    switch(tpl)
    {
      case 1:
        rowElement.cells[0].innerHTML="<div style='width: 8em'><span style='float: right'><img src='http://s200.photobucket.com/albums/aa94/ExtraKiller/On.png'></span></div>";
        break;
      default:
        rowElement.cells[0].innerHTML="<B><font color='#008800'>ONLINE</FONT></B>";        
        break;
    }
  }
  else if(status == 'inactive')
  {
    switch(tpl)
    {
      case 1:
        rowElement.cells[0].innerHTML = "<div style='width: 8em'><span style='float: left'>("+lastOnline + ")</span><span style='float: right'><img src='http://www.ikariamods.com/gunmetal/cadmium/hardcode/crown.png'></span></div>";
        break;
      default:
        rowElement.cells[0].innerHTML = "<B><font color='#708090' SIZE='1'>("+lastOnline + ")INACTIVE</FONT></B>";        
        break;
    }
  }
  else if(status == 'offline')
  {
    switch(tpl)
    {
      case 1:
        rowElement.cells[0].innerHTML = "<div style='width: 8em'><span style='float: left;'>("+lastOnline+")</span><span style='float: right'><img src='http://s200.photobucket.com/albums/aa94/ExtraKiller/Off.png'></span></div>";
        break;
      default:
        rowElement.cells[0].innerHTML = "<font color='#F00' SIZE='1'>("+lastOnline+")OFFLINE</FONT>";
        break;
    }
  }
  rowElement.cells[0].style.backgroundImage = "none";
}

// Ikariam Transport Countdown
// version 0.4.0
// 07-16-2008
// Copyright (c) 2008, Matthew Hancock
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Ikariam Transport Countdown", and click Uninstall.
//
// --------------------------------------------------------------------
//
// Version History:
// 0.2.0: Original Public Release
// 0.2.1: Update time increased from 5 seconds to 1 second
// 0.2.2: Fixed Bug that caused Hours not to be displayed
// correctly for long transport times
// 0.3.0: Added countdown to Trading Port
// 0.4.0: Overkill perfected countdown logic and NAN bugs
// ==================================================
//
// This script modifies the Time of Arrival and Mission End
// times on the Trade Fleet page and modifies the Time of 
// Arrival on the Trading Port so that they countdown
// instead of showing a static time.  This makes it easier
// to see how much time is remaining until your transports
// arrive at a glance.
//
// This script was originally created by matthewaaron and perfected by Overkill
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Ikariam Transport Countdown PL
// @namespace     http://noobflash.com/gm/
// @description   Convert Ikariam transport times to a countdown instead of static timestamp
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*
// ==/UserScript==


function debug(aMsg) { setTimeout(function() { throw new Error("[debug] " + aMsg); }, 0); }

function itime2Date(ikariamTime){
	var dateTimeString,thisDate,month,day,year,thisTime,hour,minute,second;
	dateTimeString = ikariamTime.split(" ");
	thisDate = dateTimeString[0].split(".");
	year     = parseInt(thisDate[2],10);
	month    = parseInt(thisDate[1],10) - 1;
	day      = parseInt(thisDate[0],10);
	thisTime = dateTimeString[1].split(":");
	hour     = parseInt(thisTime[0],10);
	minute   = parseInt(thisTime[1],10);
	second   = parseInt(thisTime[2],10);
	//debug(ikariamTime + " " + year + " " + month + " " + day);
	return new Date(year,month,day,hour,minute,second);
}

function duration(seconds){
	var x = [Math.floor(seconds/86400) ,	Math.floor(seconds/3600) % 24 ,	Math.floor(seconds/60) % 60 ,	seconds % 60 ];
	var y = ['d'                       , 'h'                            , 'm'                         , 's'];
	var r = [];
	for (var i = 0; i < x.length; ++i){ if (x[i] > 0) { r.push(x[i].toString() + y[i]); } }
	return r.join(' ');
}

function returnTableCells_merchantNavy(serverTime){
	var contents, y;
	var parent = $('mainview').childNodes[3].childNodes[3];
	var TDs = parent.getElementsByTagName("td");
	for (var td=0;td<TDs.length;td++){
		contents = TDs[td].innerHTML;
		if (contents.search(/Pozostalo/) != -1){ contents = TDs[td].firstChild.title; }
		if (contents.search(/\..*\..*:.*:/) != -1){
			y = itime2Date(contents);
			finalTime = y.getTime()-serverTime.getTime();
			//debug("td : " + td + " finalTime : " + finalTime);
			if (finalTime <= 0) {
				clearInterval(ev_updateServerTime);
				TDs[td].innerHTML = ' - ';
				window.location.reload();
				return;
			} else {
				TDs[td].innerHTML = '<span title=\"'+ contents +'\">'+duration(finalTime/1000)+'<br/>Pozostalo</span>';
			}
		}
	}
}

function returnTableCells_port(serverTime){
	var contents, y;
	var parent = $('mainview').childNodes[16].childNodes[3];
	var TDs = parent.getElementsByTagName("td");
	var obj_ServerTime = $('servertime');
	var serverDate     = obj_ServerTime.innerHTML.split(' ')[0];
	for(var td=0;td<TDs.length;td++){
		contents = TDs[td].innerHTML;
		if (contents.search(/Pozostalo/) != -1){ contents = TDs[td].firstChild.title; }
		if (contents.search(':') != -1){
			y = itime2Date(serverDate + " " + contents);
			finalTime = y.getTime()-serverTime.getTime();
			if (finalTime < -1) { finalTime += 86400; }
			if ((finalTime == 0) || (finalTime == -1)) {
				clearInterval(ev_updateServerTime);
				TDs[td].innerHTML = ' - ';
				window.location.reload();
				return;
			}else{
				TDs[td].innerHTML = '<span title="'+ contents +'">'+duration(finalTime/1000)+'<br/>Pozostalo</span>';
			}
		}
	}
}

function $(id) {
  return document.getElementById(id);
}

function $x( xpath, root ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];
  switch (got.resultType) {
    case got.STRING_TYPE:
      return got.stringValue;
    case got.NUMBER_TYPE:
      return got.numberValue;
    case got.BOOLEAN_TYPE:
      return got.booleanValue;
    default:
      while (next = got.iterateNext())
        result.push( next );
      return result;
  }
}

function updateMerchantNavy(){
	var serverTime = itime2Date(obj_ServerTime.innerHTML);
	returnTableCells_merchantNavy(serverTime);
}

function updatePort(){
	var serverTime = itime2Date(obj_ServerTime.innerHTML);
	returnTableCells_port(serverTime);
}

switch(document.body.id) {
	case 'merchantNavy' :
		var obj_ServerTime = $('servertime');
		var ev_updateServerTime = setInterval(updateMerchantNavy, 1000);
		break;
	case 'port' :
		var obj_ServerTime = $('servertime');
		var ev_updateServerTime = setInterval(updatePort, 1000);
		break;
}

// ==UserScript==
// @name          Arrival time of the attacks, blockades, transports and bet troops and fleets in Ikariam.  v0.3
// @namespace     http://
// @description	  Tiempo de llegada de los ataque en Ikariam  
// @include	 http://*.ikariam.*/index.php?view=plunder*
// @include	 http://*.ikariam.*/index.php?view=blockade*
// @include  http://*.ikariam.*/index.php?view=transport*
// @include  http://*.ikariam.*/index.php?view=deployment*
// ==/UserScript==

//Script creado por Elsanto510


//variable global para el texto
var hora_llegada;
var aux1;

//funcion para el idioma
function idioma() {
	if (navigator.userAgent.indexOf("Opera")!=-1) (language=navigator.language)
	else { if (navigator.appName == "Netscape") (language=navigator.language)
	else language=navigator.browserLanguage };

	if (language){
		language=language.substring(0,2)
	}
	else {
		language="en"
	}

	switch (language) {
		//case "en" : hora_llegada="Arrival Time"; break;
		case "en" : hora_llegada="Arrival Time"; break;
		case "es" : hora_llegada="Hora de llegada"; break;
		case "fr" : hora_llegada="Heure d'arrivÃ©e"; break;
		case "it" : hora_llegada="L'orario di arrivo"; break;
		case "pt" : hora_llegada="Hora de chegada"; break;
		case "de" : hora_llegada="Ankunftszeit"; break;
		case "tr" : hora_llegada="Geri DÃ¶nÃ¼s"; break;	
		case "ru" : hora_llegada="Ð’Ñ€ÐµÐ¼Ñ Ð¿Ñ€Ð¸Ð±Ñ‹Ñ‚Ð¸Ñ"; break;
		default : hora_llegada="Arrival Time" 
	} 
}


//aumentamos 1 seg hh:mm:ss
function aumentar(){
	
	var tiempo=aux1;

	var res_h= 0;
	var res_m= 0;
	var res_s= 0;
	
	//sacamos la hora, min y seg	
	str_h=new String(tiempo).substring(0,3);
	if (str_h[0]=="0"){
		str_h=str_h[1];
	}

	str_m=new String(tiempo).substring(3,5);
	if (str_m[0]=="0"){
		str_m=str_m[1];
	}

	str_s=new String(tiempo).substring(6,9);
	if (str_s[0]=="0"){
		str_s=str_s[1];
	}

	res_h= parseInt(str_h);
	res_m= parseInt(str_m);
	res_s= parseInt(str_s)+1; //sumamos a los segundos
	
	//document.getElementById("elsanto510").innerHTML=res_h+"-"+res_m+"-"+res_s;

	if (res_s>=60)
	{
		var res_s2= res_s%60;
		res_m= res_m+((res_s-res_s2)/60);
		res_s = res_s2;
	}

	if (res_m>=60)
	{
		var res_m2= res_m%60;
		res_h= res_h+((res_m-res_m2)/60);
		res_m = res_m2;
	}

	if (res_h>23)
	{
		res_h = res_h%24;
	}

	//los ceros
	if (new String(res_h).length==1)
	{
		res_h="0"+res_h;
	}
	
	if (new String(res_m).length==1)
	{
		res_m="0"+res_m;
	}
	
	if (new String(res_s).length==1)
	{
		res_s="0"+res_s;
	}

	var ret = res_h+":"+res_m+":"+res_s;
	aux1=ret;

	document.getElementById("elsanto510").innerHTML=ret;

	setTimeout(aumentar, 1000); 
}


//funcion que suma el tiempo
function sumar_tiempo(tiempo){

	//sacamos la hora actual
	var localTime = new Date();

	var hora = localTime.getHours();
	var min = localTime.getMinutes();
	var seg = localTime.getSeconds();

	//var ret = hora+"h "+min+"m "+seg+"s";

    //miramos si el tiempo tiene horas, min y segundos.
	var Bhora = false;
	var Ihora = 0;
	var Bmin = false;
	var Imin = 0;
	var Bseg = false;
	var Iseg = 0;

	//sacamos la hora, min y segundos del tiempo
	//el tiempo[47] es > del final del span, maximo de caracteres 11

	var ret = tiempo[47];

	var i = 48;
	var aux_i = 48;
	var finish=false;

    while(!finish){
		if (tiempo[i]=="h")
		{
			Bhora=true;
			var aux="";	
			
			for (var j=aux_i; j<i; j++)
			{
				aux += tiempo[j];
			}
			
			Ihora= parseInt(aux);			

			//para quitar el espacio
			aux_i=i+1; 
			i++; 
		}

		if (tiempo[i]=="m")
		{
			Bmin=true;
			var aux="";	
			
			for (var j=aux_i; j<i; j++)
			{
				aux += tiempo[j];
			}

			Imin= parseInt(aux);

			//para quitar el espacio
			aux_i=i+1; 
			i++; 

		}
			
		if (tiempo[i]=="s")
		{
			Bmin=true;
			var aux="";	
			
			for (var j=aux_i; j<i; j++)
			{
				aux += tiempo[j];
			}
			
			Iseg= parseInt(aux);

			//para quitar el espacio
			aux_i=i+1; 
			i++; 
		}

		if ((i==59) || (tiempo[i]=="<")) //maximo 11 + 48 == 11  or el principio del div
		{
			finish=true;
		}

		i++;

	}

	var res_h= hora + Ihora;
	var res_m= min + Imin;
	var res_s= seg + Iseg;

	if (res_s>=60)
	{
		var res_s2= res_s%60;
		res_m= res_m+((res_s-res_s2)/60);
		res_s = res_s2;
	}

	if (res_m>=60)
	{
		var res_m2= res_m%60;

		res_h= res_h+((res_m-res_m2)/60);
		res_m = res_m2;
	}

	if (res_h>23)
	{
		res_h = res_h%24;
	}

	//los ceros
	if (new String(res_h).length==1)
	{
		res_h="0"+res_h;
	}
	
	if (new String(res_m).length==1)
	{
		res_m="0"+res_m;
	}
	
	if (new String(res_s).length==1)
	{
		res_s="0"+res_s;
	}

	ret = res_h+":"+res_m+":"+res_s;

	return ret;

}

//cuerpo del main
function main(){
	allElements = document.getElementsByTagName('div');

	for (var i = 0; i < allElements.length; i++) {
		thisElement = allElements[i];
	
		if (thisElement.className=='journeyTime')
			{
			thisElement.style.color = "#0000ff";

			var aux = thisElement.innerHTML;

			//var aux1 = sumar_tiempo(aux);
			aux1 = sumar_tiempo(aux);

			var aux2 = "\t <font color=#ff0000><b>"+hora_llegada+": </b></font><span id=\"elsanto510\">"+aux1+"</span>";
	
			thisElement.innerHTML+=aux2
			}
	}

	//setTimeout('aumentar(aux1)',1000);
	setTimeout(aumentar,1000);
}

idioma();
main();

// ==UserScript==
// @name           Ikariam Notas Troyanos
// @namespace      http://s*.ikariam.*/*
// @description    Para anotar coisas importantes. XD
// @include        http://s*.ikariam.*/*
// ==/UserScript==
// ===========================================================================
// This script was made by EnigmaBrand.

var mynotes = GM_getValue("mynotes", "Clica aqui para come&ccedil;ar a tomar notas!");
var version="1.9";

// Create my div and append it to the body tag
vnotebar = document.createElement("div");
vnotebar.setAttribute("id", "notebar");
var body = document.getElementsByTagName("body");
body[0].appendChild(vnotebar);

// This is the function that saves your notes
unsafeWindow.savenotes = function() {
	window.setTimeout(GM_setValue, 0, "mynotes", document.getElementById("notes").value);
}

// This is the function that clears the window if it has the default value
unsafeWindow.startnotes = function() {
	if(document.getElementById("notes").value == "Clica aqui para come&ccedil;ar a tomar notas!")
	{
		document.getElementById("notes").value = "";
	}
}

unsafeWindow.shownotes = function() {
	if(document.getElementById("notebar").style.left == "-412px")
	{
		document.getElementById("notebar").style.left = "0px;"
	}
}

unsafeWindow.hidenotes = function() {
	document.getElementById("notebar").style.left = "-412px;"
}

// Add the style to the notebar and put the code into it
GM_addStyle("#notebar { width:410px; position:fixed; left:-418px; height:400px; top:9px; z-index: 50; background:url(http://www.picamatic.com/show/2008/08/14/04/813155_410x1.gif); background-repeat:repeat-y; border:1px black solid;}");
GM_addStyle("#nhead { height:30px; width:410px; position:absolute; left:0px; top:0px; background:url(http://www.picamatic.com/show/2008/08/14/04/813156_410x30.gif); line-height:38px; font-weight:bold; font-size:11px;} ");
GM_addStyle("#notebar:hover { left:0px; }");
GM_addStyle("#nfoot { width:410px; height:3px; background:url(http://www.picamatic.com/show/2008/08/14/04/813156_410x30.gif); position:absolute; bottom:0px; left:0px;}");
GM_addStyle("#notes { position: absolute; top:31px; left:29px; right:3px; bottom:3px; background: #FDF7DD; border:none; font-weight: bold; font-size: 11px; padding:3px; } ");
GM_addStyle("#notetab { background:url(http://www.picamatic.com/show/2008/08/14/04/813257_41x154.png); width:41px; height:154px; position:absolute; right:-41px; top:0px; z-index:495; } ");
GM_addStyle("#notetab:hover { cursor: pointer; } ");

var nbHTML = '<div id="notetab" onmouseover="shownotes()" onclick="hidenotes()"></div>';
nbHTML += '<div id="nhead"><a style="border-bottom:1px #542C0F dotted; color: #542C0F;" href="http://userscripts.org/users/62821/scripts">Ikariam Notas</a></div>';
nbHTML += '<textarea id="notes" cols="66" wrap="soft" rows="23" onkeyup="savenotes()" onclick="startnotes()">'+mynotes+'</textarea>';
nbHTML += '<div id="nfoot"></div>';
document.getElementById("notebar").innerHTML = nbHTML;

///// End of script /////

// Ikariam show building's level script
// version 0.1 BETA!
// 2008-10-14
// Copyright (c) 2008, Aleh Krutsikau
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Travian MarketPlace", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name	niveles edificios
// @namespace	http://krolser.wordpress.com/projects/greasemonkey/
// @description	script for Ikariam show view
// @include	http://s*.ikariam.*/*
// ==/UserScript==

var getbody=document.getElementsByTagName('body')[0];

//some standard functions
var XPFirst	 = XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList	 = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
var XPIter	 = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
var XPIterOrder	 = XPathResult.ORDERED_NODE_ITERATOR_TYPE;

function XX(xpath, xpres, startnode, myhtml){
	if (!startnode) {startnode=document;}
	var ret = document.evaluate(xpath, startnode, null, xpres, null);
	if (myhtml) ret.singleNodeValue.innerHTML=myhtml;
		return	xpres == XPFirst ? ret.singleNodeValue : ret;
}

function forall(query,startnode, call){
	var objs=XX(query,XPList,startnode);
	for (var i = 0; i < objs.snapshotLength; i++) 
		call(objs.snapshotItem(i),i);
}

function node(type, id, className, style, content, title ) {
    var n = document.createElement(type||"div"); 
    if (id) n.setAttribute('id',id);
    if (className) n.className = className;
    if (title) n.setAttribute('title',title);
    if (style) n.setAttribute('style',style);
    if (content) n.innerHTML = "string" == typeof content ? content : content.toXMLString();
    return n;
}

switch (getbody.id){
    case "city":
	forall('//ul[@id="locations"]/li[contains(@id,"position")]/a', null, function(obj,i){ 
	    var lvl = obj.title.replace(/[^\d-]+/g, "");
	    if (lvl.length>0) {
		var as=node('a','blevels','blevels','background:#000;top:10px;left:25px;width:12px;height:12px;font-size:9px;margin:0;padding:0px 0px 0px 0px;color:#fff;-moz-outline: black ridge 3px;-moz-outline-radius: 8px 8px 8px 8px;text-align:center;',lvl);
		obj.parentNode.appendChild(as);
	    }
	});
    break;
}

// ==UserScript==
// @name           Informacion de ciudades para Troyanos
// @namespace      IkariamOverview
// @description    te da informacion variada sobre tus colonias.
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/
// ==/UserScript==

/**
ABOUT:
» Ikariam General Overview v1.5
By: A. Maia F. (a.maia.ferreira[at]gmail.com)
Date: 3 June 08
Languages / working on servers:
	» (en) English (UK) (ikariam.org)
	» (us) English (US) (ikariam.com)
	» (pt) Portuguese (ikariam.com.pt)
	» (de) German (ikariam.de) [Thanks to t.b. - http://userscripts.org/users/29222]
	» (pl) Polish (ikariam.pl) [Thanks to sip3k - http://userscripts.org/users/53611]
	» (nl) Dutch (ikariam.nl) [Thanks to bogyi - http://userscripts.org/users/52238]
	» (dk) Danish (ikariam.dk) [Thanks to Trigger - http://userscripts.org/users/53662]
	» (es) Spanish (ikariam.es) [Thanks to Pyronhell - http://userscripts.org/users/52757]
	» (cz) Czech (ikariam.cz) [Thanks to who e-mailed me the language]
	» (it) Italiam (ikariam.it) [Thanks to Boydon]
	» (se) Swedish (ikariam.se) [Thanks to rEacT - http://userscripts.org/users/54856]
	
CHANGELOG:
	21/05/2008
	    * Version 1 released
	    * Minor bugfixes

	22/05/2008
	    * Added colors to full (and almost full) warehouses
	    * Added German language
	    * Added Polish language
	    * Added Dutch language
	    * Added Danish language

	23/05/2008
	    * Added Turkish language
	    * Minor bugfixes
		
	03/06/2008
	    * Bugfix: At Island view, towns were on top of the general overview window (Thanks to Pyronhell that submited the bugfix - http://userscripts.org/users/52757)	
	    * Bugfix: Production of island resources weren't working
	    * Added Spanish language
	    * Added Czech language		
	    * Added Italian language
	    * Added English (US) language		

	05/06/2008
	    * Added Swedish language	
		
WARNING:
	Using this script with the game is forbidden!
	I'm not responsible for banned accounts.
	
	Quoted from Ikariam Rules:
	
	"VII. Scripting

		* Using a program as interface between the player and his game is prohibited. Any other form of automatically generated information generated for a group of players advantage with malicious intentions is forbidden as well.

		This includes but is not limited to:
		* Bots
		* Macros
		* Automated island databases.

		Note: Only exceptions to this are programs that are expressly approved by GameForge."

FEATURES:
	- Multi-language (12 of 21 languages currently available)
	- Overview of all buildings for each town
	- Overview of all resources for each town
	- Resources maximum capacity for each town
	- Resources production for each island
	- Overview of all buildings under construction
	- Shortcuts to island resources on the left-side box
	- When storage is almost full for a resource, it changes it's color to bright red / when completely full, changes to red.
	
	Note: You need to open each city first, to gather the data to complete the table.			

KNOWN BUGS:
		- On servers other than ikariam.org, name shortcuts to some resources are not translated to the correct language (they appear in english).
		- When you open the Overview popup at the Island View, will not be visible.
	
TODO:
	1 - Finishing times for building constructions (or a time bar?)
	2 - Time bar until resource fulls a silo (to put in the table)
	3 - Time bar / clock on upgrading buildings
	
	- Finances table
	- Workshop research table
	- Research table
	- Military table
	?? - Loading everything together?
	
	DONE - Various shortcuts on the script left panel (to resources, to buildings, etc)
	DONE - Tooltips in capacity fields
	DONE - Colors when near the maximum capacity
**/

/** MAIN VARIABLES STARTUP **/
var scriptName = "Ikariam General Overview v1.5"
var allCities = getCities();
var keywords = getLang();
try {
	getBuildings(allCities, currentCity(allCities));
	getResources(allCities, currentCity(allCities));
	shortcuts = buildShortcuts(currentCity(allCities));
} catch(e) {
}

/****	FUNCTIONS	****/
function getLang() { /** returns array with language keywords.

			TRANSLATIONS BELOW
			
			ALL WORDS ARE CASE-SENSITIVE!
			ALL BUILDING NAMES MUST MATCH THE SERVER BUILDING NAMES.
			
		keywords[0] Building names
		keywords[1] Resources names
		keywords[2] Various words used in the data tables
		
**/
	var keywords = new Array(2);
	var tHost = window.location.host;
	tHost = tHost.substring(tHost.indexOf('.')+1, tHost.length)
	switch (tHost) {
		case 'ikariam.org':
			keywords[0] = ["Town hall", "Shipyard", "Trading port", "Warehouse", "Trading post", "Barracks", "Palace", "Hideout", "Embassy", "Academy", "Workshop", "Tavern", "Museum", "Town wall", "Governor´s Residence"];	
			keywords[1] = ["Wood","Wine","Marble","Crystal","Sulphur"];
			keywords[2] = ["Level", "Close", "Click to open/close", "Buildings & resources overview", "* To update the data for each city go to the page of the correspondent city","Towns", "Buildings overview", "Resources overview", "Capacity","Under construction", "on", "under construction", "Building to level", "Production of", "City resources", "Maximum warehouse capacity", "for"];
			break;
		case 'ikariam.com.pt':
			keywords[0] = ["Câmara Municipal", "Estaleiro", "Porto Mercantil", "Armazém", "Mercado", "Quartel", "Palácio", "Espionagem", "Embaixada", "Academia", "Oficina", "Taberna", "Museu", "Muralha da cidade", "Residência do Governador"];
			keywords[1] = ["Madeira","Vinho","Mármore","Cristal","Enxofre"];			
			keywords[2] = ["Nível", "Fechar", "Clique para abrir/fechar", "Vista geral de edifícios & recursos", "* Para actualizar os dados de uma cidade, abre a página da cidade correspondente", "Cidades", "Vista geral de edifícios", "Vista geral de recursos", "Capacidade", "Em construção", "em", "em construção", "A construir para o nível", "Produção de", "Recursos da cidade", "Capacidade máxima do armazém", "para"];
			break;		//	0			1				2								3																	4											5					6							7					8					9		10			11					12						13				14							15					16
		case 'ikariam.de':
			keywords[0] = ["Rathaus", "Schiffswerft", "Handelshafen", "Lagerhaus", "Kontor", "Kaserne", "Palast", "Versteck", "Botschaft", "Akademie", "Erfinderwerkstatt", "Taverne", "Museum", "Stadtmauer", "Stadthaltersitz"];	
			keywords[1] = ["Baumaterial","Wein","Marmor","Kristallglas","Schwefel"];
			keywords[2] = ["Stufe", "Schließen", "Hier klicken zum Öffnen/Schließen", "Gebäude- & Resourcenübersicht", "* Um die Daten der Städte zu aktualisieren, müssen die Seiten der jeweiligen Städte geladen werden.", "Städte", "Gebäudeübersicht", "Ressourcenübersicht", "Kapazität", "In Bearbeitung", "in", "in Bearbeitung", "Aufwerten auf Level", "Produktion von", "Stadtressourcen", "Maximale Lagerkapazität", "für"];
			break;
		case 'ikariam.pl':
			keywords[0] = ["Ratusz", "Stocznia", "Port handlowy", "Magazyn", "Bazar", "Koszary", "Pa\u0142ac", "Kryj\u00F3wka", "Ambasada", "Akademia", "Warsztat", "Tawerna", "Muzeum", "Mur miejski", "Rezydencja Gubernatora"];
			keywords[1] = ["Material budowlany","Wino","Marmur","Kryszta\u0142","Siarka"];
			keywords[2] = ["Poziom", "Zamknij", "Kliknij by otworzyc/zamknac", "Podsumowanie budynk\u00F3w i zasob\u00F3w", "* Aby pobrac dane przejdz przez wszystkie miasta", "Miasto", "Podsumowanie budynk\u00F3w", "Podsumowanie surowc\u00F3w", "Pojemnosc", "W trakcie rozbudowy", "w", "W trakcie rozbudowy", "Rozbudowa do levelu", "Wydobycie", "Zasoby miasta", "Pojemnosc magazynu", "dla"];
			break;
		case 'ikariam.nl':
			keywords[0] = ["Stadhuis", "Scheepswerf", "Handelspost", "Opslagplaats", "Handelspost", "Barakken", "Paleis", "Schuilplaats", "Ambassade", "Academie", "Werkplaats", "Taverne", "Museum", "Muur", "Gouveneurswoning"];
			keywords[1] = ["Hout","Wijn","Marmer","Kristal","Zwavel"];
			keywords[2] = ["Level", "Sluiten", "Klik om te opene/sluiten", "Gebouwen en Middelen overzicht", "* Om de data te updaten, ga apart naar elke stad","Steden", "Gebouwen overzicht", "Middelen overzicht", "Capiciteit","In aanbouw", "Aan", "In Aanbouw", "Aan het bouwen naar level", "Productie van", "Stad middelen", "Maximum opslagplaats capiciteit", "Voor"];
			break;
		case 'ikariam.dk':
			keywords[0] = ["Rådhus", "Skibsværft", "Handelshavn", "Lagerbygning", "Handelsstation", "Kaserne", "Palads", "Skjulested", "Ambassade", "Akademi", "Værksted", "Værtshus", "Museum", "Bymur", "Guvernørs Residens"];
			keywords[1] = ["Træ","Vin","Marmor","Krystal","Svovl"];
			keywords[2] = ["Level", "Luk", "Klik for at åbne/lukke", "Bygnings & ressource oversigt", "* For at opdatere data for hver by gå til siden med den relevante by","Byer", "Bygningsoversigt", "Ressourceoversigt", "Kapacitet","Under opførsel", "på", "under opførsel", "Bygnings næste level", "Produktion af", "By ressourcer", "Maximal lager kapacitet", "for"];
			break;
		case 'ikariam.net':
			keywords[0] = ["Belediye Binası", "Donanma Tersanesi", "Ticaret Limani", "Depo", "Ticaret Merkezi", "Kışla", "Saray", "İstihbarat Merkezi", "Büyük Elçilik", "Akademi", "Mucit Atölyesi", "Taverna", "Müze", "Sur", "Vali Konağı"];
			keywords[1] = ["Odun","Şarap","Mermer","Kristal Cam","Sülfür"];
			keywords[2] = ["Seviye", "Kapat", "Click to open/close", "Bina ve Kaynaklara Genel Bakış", "* Bilgiyi güncellemek için şehrin sayfasına gidin.","Şehir", "Bina Seviyeleri", "Kaynak Miktarları", "Kapasite","Yükseltiliyor", "on", "Yükseltiliyor", "Yükseltilen Seviye=", "Üretim=", "Şehir Kaynakları", "Maksimum depo kapasitesi", "için"];
			break;
		case 'ikariam.es':
			keywords[0] = ["Intendencia", "Astillero de guerra", "Puerto comercial", "Depósito", "Comercio", "Cuartel", "Palacio", "Escondite", "Embajada", "Academia", "Taller de invenciones", "Taberna", "Museo", "Muro de la ciudad", "Residencia del gobernador"];
			keywords[1] = ["Madera","Vino","Mármol","Cristal","Azufre"];
			keywords[2] = ["Nivel", "Cerrar", "Click para abrir/cerrar", "Resumen de la ciudad", "* Para actualizar los datos de cada ciudad abre la página de cada ciudad.","Ciudades", "Resumen de construcciones", "Resumen de recursos", "Capacidad","En construcción", "en", "en construcción", "Actualizando al nivel", "Producción de", "Recursos de la ciudad", "Capacidad máxima del depósito", "para"];
			break;
		case 'ikariam.cz':
			keywords[0] = ["Městská radnice", "Loděnice", "Obchodní přístav", "Sklad", "Tržiště", "Kasárna", "Palác", "Úkryt", "Ambasáda", "Akademie", "Dílna", "Hostinec", "Muzeum", "Městská zeď", "Guvernérova Rezidence"];	
			keywords[1] = ["Stavební materiál","Víno","Mramor","Krystalické sklo","Síra"];
			keywords[2] = ["Úroveň", "Zavřít", "Klikni pro otevření/zavření", "Přehled budov & zdrojů", "* Pro aktualizaci dat jednotlivých měst je potřeba tyto města navštívit","Města", "Přehled budov", "Přehled zdrojů", "Kapacita","Staví se", "v", "staví se", "Úroveň budovy", "Produkce ", "Zdroje města", "Kapacita skladu", "pro"];
			break;
		case 'ikariam.it':
			keywords[0] = ["Municipio", "Cantiere Navale", "Porto", "Magazzino", "Mercato", "Caserma", "Palazzo", "Nascondiglio", "Ambasciata", "Accademia", "Officina", "Taverna", "Museo", "Mura della città", "Residenza del Governatore"];	
			keywords[1] = ["Legno","Vino","Marmo","Cristallo","Zolfo"];
			keywords[2] = ["Livello", "Chiudi", "Fare click per aprire/chiudere", "Panoramica Edifici e Risorse", "* Per aggiornare i dati di una città, visitare la pagina rispettiva.","Città", "Panoramica edifici", "Panoramica risorse", "Capacità","In costruzione", "a", "in costruzione", "In espansione al livello", "Produzione di", "Risorse prodotte dalla città", "Capacità massima del magazzino", "a"];
			break;			
		case 'ikariam.com':
			keywords[0] = ["Town hall", "Shipyard", "Trading port", "Warehouse", "Trading post", "Barracks", "Palace", "Hideout", "Embassy", "Academy", "Workshop", "Tavern", "Museum", "Town wall", "Governor´s Residence"];	
			keywords[1] = ["Wood","Wine","Marble","Crystal","Sulphur"];
			keywords[2] = ["Level", "Close", "Click to open/close", "Buildings & resources overview", "* To update the data for each city go to the page of the correspondent city","Towns", "Buildings overview", "Resources overview", "Capacity","Under construction", "on", "under construction", "Building to level", "Production of", "City resources", "Maximum warehouse capacity", "for"];
			break;
		case 'ikariam.se':
			keywords[0] = ["Rådhus", "Skeppsvarv", "Handelshamn", "Lagerlokal", "Handelsstation", "Kasern", "Palats", "Gömställe", "Ambassad", "Akademi", "Verkstad", "Taverna", "Museum", "Stadsmur", "Guvernörsresidens"];
			keywords[1] = ["Trä","Vin","Marmor","Kristall","Svavel"];
			keywords[2] = ["Nivå", "Stäng", "Klicka för att öppna/stänga", "Byggnader & resurser översikt", "* För att uppdatera informationen för varje stad gå till sidan för respektive stad","Städer", "Byggnader översikt", "Resurser översikt", "Kapacitet","Under utbyggnad", "på", "under utbyggnad", "Byggnadens nästa nivå", "Produktion av", "Stadsresurser", "Maximal lagerkapacitet", "för"];
			break;			
	}
	return keywords;
}

function getResourcesProduction(type) { /** returns array with all data related to resources produced on the current island
	tradeGood[0] How much resource is being produced (ie: "+120")
	tradeGood[1] Name of the resource
	tradeGood[2] HREF to resource production spot
**/
	var tradeGood = new Array(2);
	tradeGood[0] = document.getElementsByTagName('script')[document.getElementsByTagName('script').length-2].innerHTML;
	var islandID = document.getElementById('breadcrumbs').childNodes[3].href;
	islandID = islandID.substring(islandID.indexOf("id=")+3, islandID.length);
	switch (type) {
		case 'island':
			tradeGood[0] = tradeGood[0].substring(tradeGood[0].indexOf("startTradegoodDelta")+22, tradeGood[0].length);
				tradeGood[1] = tradeGood[0].substring(tradeGood[0].lastIndexOf("value_")+6, tradeGood[0].length);
			tradeGood[1] = tradeGood[1].substring(0, tradeGood[1].indexOf("'"));
			tradeGood[2] = "?view=tradegood&type=tradegood&id=" + islandID;
			break;
		case 'wood':
			tradeGood[0] = tradeGood[0].substring(tradeGood[0].indexOf("startResourcesDelta")+22, tradeGood[0].length);
			tradeGood[1] = "wood";
			tradeGood[2] = "?view=resource&type=resource&id=" + islandID;
			break;
	}
	tradeGood[0] = tradeGood[0].substring(0, tradeGood[0].indexOf(";"));
	tradeGood[0] = "+" + Math.round(tradeGood[0]*3600);
	return tradeGood;
}

function getCities() { /** returns array with ata related to cities	
	cities[][0] City ID
	cities[][1] City name
	cities[][2] City HREF
	cities[][3] City update time
**/
	var tmp = document.getElementById('citySelect');
	var cities = new Array();
	for (i=0; i < tmp.childNodes.length; i++) {
		if (tmp.childNodes[i].innerHTML != undefined) {
			cities[cities.length] = new Array(3);
			cities[cities.length-1][0] = tmp.childNodes[i].getAttribute('value');
			cities[cities.length-1][1] = tmp.childNodes[i].innerHTML;
			cities[cities.length-1][2] = "?view=city&amp;id=" + tmp.childNodes[i].getAttribute('value');
		}
	}
	
	var name = document.getElementsByTagName('li')[0].innerHTML;
	name = name.substring(name.indexOf("</span>")+7, name.length);
	for (i=0; i < cities.length; i++) {
		if (cities[i][1] == name) {
			cities[i][3] = new Date();
		}
	}
	
	return cities;
}

function currentCity(cities) { /** return the selected city index **/
	var name = document.getElementsByTagName('li')[0].innerHTML;
	name = name.substring(name.indexOf("</span>")+7, name.length);
	for (i=0; i < cities.length; i++) {
		if (cities[i][1] == name) {
			return i;
		}
	}
}

function getResources(cities, currentCity) { /** sets a GM script value with the resources in the current city
	
	resources[0] Wood
	resources[1] Wine
	resources[2] Marble
	resources[3] Crystal
	resources[4] Sulphur
	
	resources[5] How much wood is being produced (ie: "+120")
	resources[6] HREF to island saw mill
	resources[7] How much wine/marble/crystal/sulphur is being produced (ie: "+120")
	resources[8] Name of the specific island resource (possible values: wine/marble/crystal/sulpfur)
	resources[9] Specific island resource depot HREF
	
	resources[10] Wood storage
	resources[11] Wine storage
	resources[12] Marble storage
	resources[13] Crystal storage
	resources[14] Sulphur storage
	
	resources[15] Wood almost full? ----------------------
	resources[16] Wine almost full?                              |
	resources[17] Marble almost full?        (CSS style to use in the <td>)
	resources[18] Crystal almost full?                           |
	resources[19] Sulphur almost full? -------------------
	
**/
	var resources = new Array(19);
	var storage;
	resources[0] = document.getElementById('value_wood').innerHTML;
	resources[1] = document.getElementById('value_wine').innerHTML;
	resources[2] = document.getElementById('value_marble').innerHTML;
	resources[3] = document.getElementById('value_crystal').innerHTML;
	resources[4] = document.getElementById('value_sulfur').innerHTML;
	
	resources[5] = getResourcesProduction('wood')[0];
	resources[6] = getResourcesProduction('wood')[2];
	resources[7] = getResourcesProduction('island')[0];
	resources[8] = getResourcesProduction('island')[1].charAt(0).toUpperCase() + getResourcesProduction('island')[1].substr(1);;
	// var regTest = new RegExp(resources[8].substring(0,3), "i");
	// alert(keywords[1].join('\n'));
	// for (i=0; i < keywords[1].length; i++) {
		// if (regTest.test(keywords[1][i])) {
			// resources[8] = keywords[1][i];
		// }
	// }
	resources[9] = getResourcesProduction('island')[2];
	
	storage = document.getElementById('value_wood').parentNode.childNodes[5].textContent;
	storage = storage.substring(storage.indexOf(':')+2, storage.length);
	resources[10] = storage;
	storage = document.getElementById('value_wine').parentNode.childNodes[5].textContent;
	storage = storage.substring(storage.indexOf(':')+2, storage.length);
	resources[11] = storage;
	storage = document.getElementById('value_marble').parentNode.childNodes[5].textContent;
	storage = storage.substring(storage.indexOf(':')+2, storage.length);	
	resources[12] = storage;
	storage = document.getElementById('value_crystal').parentNode.childNodes[5].textContent;
	storage = storage.substring(storage.indexOf(':')+2, storage.length);		
	resources[13] = storage;
	storage = document.getElementById('value_sulfur').parentNode.childNodes[5].textContent;
	storage = storage.substring(storage.indexOf(':')+2, storage.length);		
	resources[14] = storage;
	for (i=15; i <= 19; i++) {
		var testStorage1 = resources[i-15].replace(/,/,"");
		testStorage1 = testStorage1.replace(/\./,""); //because dot cell dividers
		var testStorage2 = resources[i-5].replace(/,/,"");
		testStorage2 = testStorage2.replace(/\./,""); //because dot cell dividers
		if ((parseFloat(testStorage1) / parseFloat(testStorage2)) == 1) {
			resources[i] = "background-color: red; font-weight: bold;";
		} else if ((parseFloat(testStorage1) / parseFloat(testStorage2)) >= 0.75) {
			resources[i] = "background-color: #FF9B9A; border: 1px solid red;";
		} else {
			resources[i] = "";
		}
	}
	GM_setValue("resources_" + currentCity, resources.toSource());
}

function getBuildings(cities, currentCity) { /** sets a GM script value with the buildings in the current city

		buildings[currentCity][buildID][0] currentCity;
		buildings[currentCity][buildID][1] Name
		buildings[currentCity][buildID][2] HREF
		buildings[currentCity][buildID][3] Under construction? (possible values: 0, 1)
	
**/
	var tmp, buildID;
	var buildings = new Array(cities.length-1);
	for (i=0; i < cities.length; i++) {
		buildings[i] = new Array(14);
	}
	for (i=0; i < 15; i++) {
		tmp = document.getElementById('position' + i).childNodes[3];
		for (j=0; j < cities.length; j++) {
			if (tmp.href.substring(tmp.href.lastIndexOf("id=")+3, tmp.href.lastIndexOf("&")) == cities[j][0]) {
				currentCity = j;
			}
		}
		
		var tempName = tmp.title.substring(0, tmp.title.lastIndexOf(keywords[2][0])-1);
		switch(tempName) {
			case keywords[0][0]: buildID = 0; break;
			case keywords[0][1]: buildID = 1; break;
			case keywords[0][2]: buildID = 2; break;
			case keywords[0][3]: buildID = 3; break;
			case keywords[0][4]: buildID = 4; break;
			case keywords[0][5]: buildID = 5; break;
			case keywords[0][6]: buildID = 6; break;
			case keywords[0][7]: buildID = 7; break;
			case keywords[0][8]: buildID = 8; break;
			case keywords[0][9]: buildID = 9; break;
			case keywords[0][10]: buildID = 10; break;
			case keywords[0][11]: buildID = 11; break;
			case keywords[0][12]: buildID = 12; break;
			case keywords[0][13]: buildID = 13; break;
			case keywords[0][14]: buildID = 6; break; //Governors residence = palace
			default: buildID = "error";
		}
		buildings[currentCity][buildID] = new Array(3);
		buildings[currentCity][buildID][0] = currentCity;

		buildings[currentCity][buildID][1] = tmp.title.substring(tmp.title.lastIndexOf(" ")+1, tmp.title.length);
		buildings[currentCity][buildID][2] = tmp.href;

		buildings[currentCity][buildID][3] = tmp.firstChild.innerHTML.search(keywords[2][9]);
		
		GM_setValue("city_" + currentCity, buildings[currentCity].toSource());
	}
}

function buildShortcuts(currCity) { /** returns an array with important data for box shortcut
	
	shortcuts[0] Wood production
	shortcuts[1] HREF to saw mill
	shortcuts[2] Island resource production
	shortcuts[3] Name of the island resource
	shortcuts[4] HREF to the island resource
	
**/
	var temp_resources = eval(GM_getValue("resources_" + currCity, undefined));
	var shortcuts = new Array(2);
	shortcuts[0] = temp_resources[5];
	shortcuts[1] = temp_resources[6];
	shortcuts[2] = temp_resources[7];
	shortcuts[3] = temp_resources[8];
	shortcuts[4] = temp_resources[9];
	return shortcuts;
}

//Add Javascript to the source code
function addJS(where, js) {
    var head, jscript;
    head = document.getElementsByTagName(where)[0];
    if (!head) { return; }
    jscript = document.createElement('script');
    jscript.type = 'text/javascript';
    jscript.innerHTML = js;
    head.appendChild(jscript);
}

//NEW INFOBOX
var newElement = document.createElement('div');
newElement.className = 'dynamic';
newElement.id = 'IkariamOverview';
newElement.innerHTML = '<h3 class="header">General Overview v1.5</h3>'
						+ '<div class="content">'
							+ '<p>» <a title="' + keywords[2][2] + '" href="#" onclick="showHide();">' + keywords[2][3] + '</a></p>';
							try {
							newElement.innerHTML += '<p><span style="padding-left: 15px"><b>' + keywords[2][14] + ':</b></span><br>'
								+ '<span style="padding-left: 30px">» <a href=' + shortcuts[1] + '>' + keywords[1][0] + '</a> (' + shortcuts[0] + ')</a></span><br>'
								+ '<span style="padding-left: 30px">» <a href=' + shortcuts[4] + '>' + keywords[3] + '</a> (' + shortcuts[0] + ')</a></span></p><br>';
							} catch(e) {
							}
newElement.innerHTML += '</div>'
					 + '<div class="footer"></div>';

infoBox = document.getElementById('mainview');
if (infoBox) {
   infoBox.parentNode.insertBefore(newElement, infoBox);
}

//Create the function to show/hide the CSS popup
addJS('head', 'function showHide() {'
		+ 'var overviewPopup;'
		+ 'overviewPopup = document.getElementById("overviewPopup");'
		+ 'if (overviewPopup.style.display != "block") {'
			+ 'overviewPopup.style.display = "block";'
		+ '} else {'
			+ 'overviewPopup.style.display = "none";'
		+ '}'
	+'}'
)

//BUILDING LEVELS - Create the data table inside the popup
var table_buildsLvl = '<table style="border-style: dotted; font-size: 12px; margin-left: 6px; margin-top: 5px;" border="1" width="940px">';
table_buildsLvl += '<tr><td style="background-color: #DEAB5C; font-weight: bold; text-align: center;" colspan="' + keywords[0].length + '">' + keywords[2][6] + '</td></tr>';
table_buildsLvl += '<tr style="background-color: #DEAB5C; text-align: center;">';
table_buildsLvl += '<td width="110px">' + keywords[2][5] + '</td>';
for (i=0; i < (keywords[0].length-1); i++) {
	table_buildsLvl += '<td>' + keywords[0][i] + '</td>';
}
table_buildsLvl += '</tr>';
for (i=0; i < allCities.length; i++) {
	table_buildsLvl += '<tr style="text-align: center;"><td><a href="' + allCities[i][2] + '">' + allCities[i][1] + '</td>';
	try {
		var temp_builds = eval(GM_getValue("city_" + i, "undefined"));
	} catch (e) {
	}
	for (j=0; j < (keywords[0].length-1); j++) {
		try {
			if (temp_builds[j][1] != "Ground") {
				if (temp_builds[j][3] == -1) {
					table_buildsLvl += '<td title="' + keywords[0][j] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '"><a href="' + temp_builds[j][2] + '">'  + temp_builds[j][1] + '</a></td>';
				} else {
					var elevated = parseInt(temp_builds[j][1])+1;
					table_buildsLvl += '<td title="' + keywords[0][j] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '  ' + keywords[2][11] + '. ' + '(' + keywords[2][12] + ' ' + elevated + ')" style="background-color: #FFFF99;"><a href="' + temp_builds[j][2] + '">'  + temp_builds[j][1] + '</a></td>';
				}
			} else {
				table_buildsLvl += '<td>-</td>';
			}
		} catch (e) {
			table_buildsLvl += '<td> - </td>';
		}
	}
	table_buildsLvl += '</tr>';
}
table_buildsLvl += '</table>';

//RESOURCES - Create the data table inside the popup
var table_resources = '<table style="border-style: dotted; font-size: 13px; margin-left: 6px; margin-top: 5px;" border="1" width="610px">';
table_resources += '<tr><td style="background-color: #DEAB5C; font-weight: bold; text-align: center;" colspan="6">' + keywords[2][7] + '</td></tr>';
table_resources += '<tr style="background-color: #DEAB5C; text-align: center;">';
table_resources += '<td width="110px">' + keywords[2][5] + '</td><td width="100px">' + keywords[1][0] + '</td><td width="100px">' + keywords[1][1] + '</td><td width="100px">' + keywords[1][2] + '</td><td width="100px">' + keywords[1][3] + '</td><td width="100px">' + keywords[1][4] + '</td></tr>';
for (i=0; i < allCities.length; i++) {
	try {
		var temp_resources = eval(GM_getValue("resources_" + i, "-"));
	} catch (e) {
		var temp_resources = new Array(15)
		for (j=0; j < temp_resources.length; j++) {
			temp_resources[j] = "-";
		}
	}
	table_resources += '<tr style="text-align: center;"><td><a href="' + allCities[i][2] + '">' + allCities[i][1] + '</td>';
	switch (temp_resources[8]) {
		case 'Wine':
			table_resources += '<td style="' + temp_resources[15] + '" title="' + keywords[1][0] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[0] + ' (<a title="'+ keywords[2][13] + ' ' + keywords[1][0] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '" href="' + temp_resources[6] + '">' + temp_resources[5] + '</a>)</td><td style="' + temp_resources[16] + '" title="' + keywords[1][1] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[1] +  ' (<a  title="'+ keywords[2][13] + ' ' + keywords[1][1] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '" href="' + temp_resources[9] + '">' + temp_resources[7] + '</a>)</td><td style="' + temp_resources[17] + '" title="' + keywords[1][2] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[2] + '</td><td style="' + temp_resources[18] + '" title="' + keywords[1][3] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[3] + '</td><td style="' + temp_resources[19] + '" title="' + keywords[1][4] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[4] + '</td>';
			break;
		case 'Marble':
			table_resources += '<td style="' + temp_resources[15] + '" title="' + keywords[1][0] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[0] + ' (<a title="'+ keywords[2][13] + ' ' + keywords[1][0] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '" href="' + temp_resources[6] + '">' + temp_resources[5] + '</a>)</td><td style="' + temp_resources[16] + '" title="' + keywords[1][1] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[1] +  '</td><td style="' + temp_resources[17] + '" title="' + keywords[1][2] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[2] + ' (<a title="'+ keywords[2][13] + ' ' + keywords[1][2] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '" href="' + temp_resources[9] + '">' + temp_resources[7] + '</a>)</td><td style="' + temp_resources[18] + '" title="' + keywords[1][3] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[3] + '</td><td style="' + temp_resources[19] + '" title="' + keywords[1][4] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[4] + '</td>';
			break;
		case 'Crystal':
			table_resources += '<td style="' + temp_resources[15] + '" title="' + keywords[1][0] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[0] + ' (<a title="'+ keywords[2][13] + ' ' + keywords[1][0] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '" href="' + temp_resources[6] + '">' + temp_resources[5] + '</a>)</td><td style="' + temp_resources[16] + '" title="' + keywords[1][1] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[1] + '</td><td style="' + temp_resources[17] + '" title="' + keywords[1][2] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[2] + '</td><td style="' + temp_resources[18] + '" title="' + keywords[1][3] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[3] + ' (<a  title="'+ keywords[2][13] + ' ' + keywords[1][3] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '" href="' + temp_resources[9] + '">' + temp_resources[7] + '</a>)</td><td style="' + temp_resources[19] + '" title="' + keywords[1][4] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[4] + '</td>';
			break;
		case 'Sulfur':
			table_resources += '<td style="' + temp_resources[15] + '" title="' + keywords[1][0] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[0] + ' (<a title="'+ keywords[2][13] + ' ' + keywords[1][0] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '" href="' + temp_resources[6] + '">' + temp_resources[5] + '</a>)</td><td style="' + temp_resources[16] + '" title="' + keywords[1][1] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[1] + '</td><td style="' + temp_resources[17] + '" title="' + keywords[1][2] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[2] + '</td><td style="' + temp_resources[18] + '" title="' + keywords[1][3] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[3] + '</td><td style="' + temp_resources[19] + '" title="' + keywords[1][4] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[4] + ' (<a  title="'+ keywords[2][13] + ' ' + keywords[1][4] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '" href="' + temp_resources[9] + '">' + temp_resources[7] + '</a>)</td>';
			break;
		default:
			table_resources += '<td style="' + temp_resources[15] + '" title="' + keywords[1][0] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[0] + ' (<a title="'+ keywords[2][13] + ' ' + keywords[1][0] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '" href="' + temp_resources[6] + '">' + temp_resources[5] + '</a>)</td><td style="' + temp_resources[16] + '" title="' + keywords[1][1] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[1] + '</td><td style="' + temp_resources[17] + '" title="' + keywords[1][2] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[2] + '</td><td style="' + temp_resources[18] + '" title="' + keywords[1][3] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[3] + '</td><td style="' + temp_resources[19] + '" title="' + keywords[1][4] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[4] + '</td>';
	}
	table_resources += '</tr>';
	table_resources += '<tr title="' + keywords[2][15] + ' ' + keywords[2][16] + ' ' + allCities[i][1] + '" style="text-align: center; font-size: 10px;"><td style="text-align: right; padding-right: 3px;">' + keywords[2][8] + '</td><td style="' + temp_resources[15] + '">' + temp_resources[10] + '</td><td style="' + temp_resources[16] + '">' + temp_resources[11] + '</td><td style="' + temp_resources[17] + '">' + temp_resources[12] + '</td><td style="' + temp_resources[18] + '">' + temp_resources[13] + '</td><td style="' + temp_resources[19] + '">' + temp_resources[14] + '</td></tr>';
}
table_resources += '</table>';

//Create the CSS popup window
addJS('body', 'overviewPopup = document.createElement("div");'
+ 'overviewPopup.id = "overviewPopup";'
+ 'overviewPopup.style.display = "none";'
+ 'overviewPopup.style.position = "absolute";'
+ 'overviewPopup.style.left = "-230px";'
+ 'overviewPopup.style.top = "30px";'
+ 'overviewPopup.style.height = "400px";'
+ 'overviewPopup.style.width = "950px";'
+ 'overviewPopup.style.border = "thick double #D2AC77";'
+ 'overviewPopup.style.backgroundColor = "#F6EBBC";'
+ 'overviewPopup.style.zIndex = 9999;'
+ 'overviewPopup.innerHTML = \'<h3 style="border-bottom:thick double #F2E4B5; height:20px; padding-top:2px; font-weight:bold; text-align: center; background-color: #DEAB5C"><table border="0" width="100%"><tr><td>Ikariam General Overview v1.5    (by <a href="mailto:a.maia.ferreira[at]gmail.com">Maia</a>)</td><td><a href="#" onclick="showHide();">' + keywords[2][1] + '</a></td></tr></table></h3>'
							+ table_buildsLvl
							+ table_resources
							+ '<p>' + keywords[2][4] + '</p>'
							+ '\';'												
+ 'textBox = document.getElementById("mainview");'
+ 'textBox.appendChild(overviewPopup);');
