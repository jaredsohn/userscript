// ==UserScript==
// @name           Dark Scorpions -ika-tools-
// @version        v2
// @namespace      http://lebedesign.ru
// @description    Dark Scorpions Alliance - Ika-core tools
// @author         Eureka
// @require	   http://www.ika-core.org/scripts/ika-core.js
// @include        http://s3.ikariam.ru/*
// @exclude        http://board.ikariam.ru/*
// ==/UserScript==


var version=2;
var scriptlocation="http://userscripts.org/scripts/source/41551.user.js";

// Set the highlight colors for every case
// can be red, green, blue etc
// also #123 or #112233 (#rrggbb) for example Alliance = [	'Blue'	,'#000000' ];
// or rgb(100,100,100)  with a max of 255 for example Alliance = [	'rgb(100,255,255)'	,'Blue'	];
// if u still dont understand google for html style color

// Alliance	=	[	'Green'	,'Green' ];
// Allies		=	[	'Cyan'	,'Cyan'];
// NoAlliance	=	[	'Pink'	,'Pink'	];
// Enemies		=	[	'Red'	,'Red'	];

// Settings

switch (location.host) {

	case 's3.ikariam.ru':
		alliancefullnm='DARK SCORPIONS';
		alliancenm='DSS';		
		alliance=[	['NoAlliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['-ffC-'		, Allies	],
					['ASSAR'	, Allies	],
					['DLF'		, Allies	],
					['FFCSV' 	, Allies	],
					['GAJ'		, Allies	],
					['LIGAS' 	, Allies	],
					['MIX'		, Allies	],
					['RSS'		, Alliance	],
					['SoG'		, Allies	],
					['S_S_K' 	, Allies	],
					['TFFC' 	, Allies	],
					['Trio' 	, Allies	],
					['WOH'		, Allies	],
					['аПб�а�аПб�а�аПб�а�'		, Allies	],
					
					[''		, Enemies 	],  ];

// Use the DOT (.) to not include the chat, forum, forumnew in the menu.
	chaturl='.';
	forumurl='http://lebedesign.ru/';
	forumurlnew='http://lebedesign.ru/index.php?action=unread' ;
	break;

}

	main();
	ToolsMenu();
	

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
            fetch:"а�ТБа�а�а�ТЌа�б�а�т��а�ТЗа�б�а�ТЗ...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"а�т��а�ТБа�б�а�б�а�б�а�ТЛа�б�а�б�а�а�а�ТБ",
            military:"а�а�а�т��а�а�а�ТБа�т��а�ТЕа�а�а�б�а�ТБа�т��а�ТБ"};
            break;
        case "de":
            language = {
            fetch:"Laden...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Gesamtpunkte",
            military:"Generа�ТЄle"}
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
            fetch: "nahrа�а�vam...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score: "Celkovа�ТЉ skа�б�re",
            military: "Vojenskа�ТЉ skа�б�re"};
            break;
        case "sk":
            language = {
            fetch:"nahrа�а�vam...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Celkovа�ТЉ Skа�б�re",
            military:"Vojenskа�ТЉ skа�б�re"};
            break;
        case "tw":
            language = {
            fetch:"аИТЎа�аЕа�т��аДб�Т­...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"аЗб�а�аЗТЉа�аЕт�Ќт� ",
            military:"аЖт�ЌТАаЗт�ЌТ­аЕТАт�ЁаИТЛа�"};
            break;
        case "hu":
            language = {
            fetch:"Tа�ТЖltа�ТЉs...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"а�т��sszpontszа�а�m",
            military:"Katonai pont"};
            break;
        case "se":
            language = {
            fetch:"hа�ТЄmtar...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Totalpoа�ТЄng",
            military:"Generalspoа�ТЄng"}
            break;
        case "pl":
            language = {
            fetch:"а�а�adowanie...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Caа�т��kowity Wynik",
            military:"Generaа�т��owie"};
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
            fetch:"аЇТ�аЇт�ЂаЇб�аЇб�...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"аЇТ аЇт�ЂаЇТЇаЇт�ЂаЇт��",
            military:"аЇт�КаЇт�� аЇТІаЇт��аЇб�аЇт�Ђ"};
            break;
        case "vn":
            language = { 
            fetch:"а�б�ang tаБб�а�i...",
            unknown:"Khа�в�ng biаБб�б�t",
            allyscore:"Liа�а�n minh",
            score:"TаБТЛт�Ђng а�т��iаБТЛб�m",
            military:"Quа�б�n sаБТЛТБ" }
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
                    fetch:"аЉа�аЈТЌаЉт��аЈа�...",
                    unknown:"Unknown",
                    allyscore:"аЉт� аЉт��аЈТЇаЈТЗ аЈТЇаЉт��аЈа�аЈТ­аЈТЇаЉт��аЉа�",
                    score:"аЈТЇаЉт��аЉт�ІаЈТЌаЉт�ІаЉт�ЌаЈт�� аЈТЇаЉт��аЉб�аЉт��аЉа�",
                    military:"аЈТЇаЉт��аЉт� аЉт��аЈТЇаЈТЗ аЈТЇаЉт��аЈт��аЈб�аЉб�аЈТБаЉа�аЉт�Ё"};
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

	var lversion = "0.2.11";
	var updatesite = "http://ikariamlibrary.com/?content=Vejidas%20Leecher%20Checker";
// css

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
// Comma
function Comma(number) {
number = '' + number;
if (number.length > 3) {
var mod = number.length % 3;
var output = (mod > 0 ? (number.substring(0,mod)) : '');
for (i=0 ; i < Math.floor(number.length / 3); i++) {
if ((mod == 0) && (i == 0))
output += number.substring(mod+ 3 * i, mod + 3 * i + 3);
else
output+= ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
}
return (output);
}
else return number;
}
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
	footer_update.innerHTML += " (<font color='"+updatecolor+"'>Leecher Checker is "+is_it_updated+"</font>) <a href=\"/index.php?view=options\" title=\"Settings\"><span class=\"textLabel\">Options</span></a>";
  }
});

}



window.addEventListener('load',  function() 
{ 
try
{
	// add all css
	//addGlobalStyle('a:hover {background:#ffffff; text-decoration:none;}');
	addGlobalStyle('a.tooltip span {display:none; padding:2px 3px; margin-left:1px; width:150px;}');
	addGlobalStyle('a.tooltip:hover span{display:inline; position:absolute; background:#ffffff; border:1px solid #cccccc; color:#6c6c6c;}');
	// The id of the body tag contains which page you are on
	var page = document.getElementsByTagName('body')[0].id;

	// Check if you are at a resource deposit
	if ( (page == 'tradegood') || (page == 'resource') )
	{
		var donationList = document.getElementById('resourceUsers').childNodes[3].childNodes[1];//.childNodes[5-offset].childNodes[1];
		var name, playerName, donated, lvl, workers, percentage, param, method, mill_number, milllevel, actionmess;
		sort_all_mills = GM_getValue("sort_all_mills",1);
		var whichversionofikariam = document.getElementById('GF_toolbar').childNodes[3].childNodes[13].innerHTML.split('</span>')[0].split('v.')[1];
		// Depending on the type of resource, get the right variables
		if (whichversionofikariam == "0.2.8") {
		if (page == 'resource') 
		{
		mill_number = 23;
			method = GM_getValue("method_building",2);
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
			method = GM_getValue("method_luxury",2);
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
		} else {
		if (page == 'resource') 
		{
		mill_number = 25;
			method = GM_getValue("method_building",2);
			param = GM_getValue("param_building",10);
			workplace = new Array();
			// 					    	 Workers / 	     lvl up / 	cumulative
			workplace[1]  = new Array( 30,       0,       0);
			workplace[2]  = new Array( 38,     394,     394);
			workplace[3]  = new Array( 50,     992,    1386);
			workplace[4]  = new Array( 64,    1732,    3118);
			workplace[5]  = new Array( 80,    2788,    5906);
			workplace[6]  = new Array( 96,    3783,    9689);
			workplace[7]  = new Array(114,    5632,   15321);
			workplace[8]  = new Array(134,    8139,   23460);
			workplace[9]  = new Array(154,   10452,   33912);
			workplace[10] = new Array(174,   13298,   47210);
			workplace[11] = new Array(196,   18478,   65688);
			workplace[12] = new Array(218,   23213,   88901);
			workplace[13] = new Array(240,   29038,  117939);
			workplace[14] = new Array(264,   39494,  157433);
			workplace[15] = new Array(288,   49107,  206540);
			workplace[16] = new Array(314,   66010,  272550);
			workplace[17] = new Array(340,   81766,  354316);
			workplace[18] = new Array(366,  101146,  455462);
			workplace[19] = new Array(394,  134598,  590060);
			workplace[20] = new Array(420,  154304,  744364);
			workplace[21] = new Array(448,  205012,  949376);
			workplace[22] = new Array(478,  270839, 1220215);
			workplace[23] = new Array(506,  311541, 1531756);
			workplace[24] = new Array(536,  411229, 1942985);
			workplace[25] = new Array(566,  506475, 2449460);
		}
		else
		{
		mill_number = 20;
			method = GM_getValue("method_luxury",2);
			param = GM_getValue("param_luxury",10);
			workplace = new Array();
			// 					    	 Workers / 	     lvl up / 	cumulative
			workplace[1]  = new Array( 20,       0,       0);
			workplace[2]  = new Array( 32,    1303,    1303);
			workplace[3]  = new Array( 48,    2689,    3992);
			workplace[4]  = new Array( 66,    4373,    8365);
			workplace[5]  = new Array( 88,    7421,   15786);
			workplace[6]  = new Array(110,   10037,   25823);
			workplace[7]  = new Array(132,   13333,   39156);
			workplace[8]  = new Array(158,   20665,   59821);
			workplace[9]  = new Array(184,   26849,   86670);
			workplace[10] = new Array(212,   37305,  123975);
			workplace[11] = new Array(240,   47879,  171854);
			workplace[12] = new Array(270,   65572,  237426);
			workplace[13] = new Array(302,   89127,  326553);
			workplace[14] = new Array(332,  106217,	 432770);
			workplace[15] = new Array(366,  152379,  585149);
			workplace[16] = new Array(400,  193512,  778661);
			workplace[17] = new Array(434,  244886, 1023547);
			workplace[18] = new Array(468,  309618, 1333165);
			workplace[19] = new Array(504,  414190, 1747355);
			workplace[20] = new Array(534,  552058, 2299413);
		}
		}
		// Find Mills level, only for Strict Breafuios
		offset = 0;
		if (document.getElementById('resUpgrade').childNodes[3].childNodes[5].innerHTML.split('</span>')[1] > 0){offset = 2;} 
		if (method == 2) {	milllevel = document.getElementById('resUpgrade').childNodes[3].childNodes[3+offset].innerHTML.split('</span>')[1];}
		if (sort_all_mills==1) {
		// See who has more then 1 town on island
		var num_towns = new Array();
		var new_var_towns = 0;
		var towns_int2, towns_int;
		var the_minus = 0;
		for (var jj = 1; jj < donationList.rows.length; jj++)
		{
			name = donationList.rows[jj].cells[1].innerHTML;
			playerName = donationList.rows[jj].cells[0].innerHTML;
			donated = donationList.rows[jj].cells[4].innerHTML;
			donated_int = toInt(donationList.rows[jj].cells[4].innerHTML.split(' ')[0]);
			lvl = donationList.rows[jj].cells[2].innerHTML;
			workers = donationList.rows[jj].cells[3].innerHTML;
			actionmess = donationList.rows[jj].cells[5].innerHTML;
			towns = 1;
			if (playerName == "&nbsp;") {the_minus = the_minus+1;}
			// 					    	       			      Player /		 	Num of towns / 	
			if (playerName == "&nbsp;") {
			playerName = towns_int2;
			num_towns[new_var_towns-the_minus]  = new Array(playerName, 	towns+the_minus);
			num_towns[new_var_towns]  = new Array(playerName, 	towns+the_minus);
			} else {
			the_minus = 0;
			num_towns[new_var_towns]  = new Array(playerName, 	towns);
			}
			
			// sorting array
			new_var_towns++;
			towns_int2 = playerName;
		}
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

			if (isNaN(donated_int)) {donated_int = donated_int2;} else {
			donated_int_town = num_towns[new_var][1];
			donated_int23 = donated_int/donated_int_town;
			}
			// 					    	       			Player /		town / 	level/	workers/		donated/		actions/		donated_int
			go_in_order[new_var]  = new Array(playerName,	name,	lvl,	workers,	donated,	actionmess,	donated_int, donated_int23);
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
		} else if(sort_all_mills==2){
		// See who has more then 1 town on island
		var num_towns = new Array();
		var new_var_towns = 0;
		var towns_int2, towns_int;
		var the_minus = 0;
		for (var jj = 1; jj < donationList.rows.length; jj++)
		{
			name = donationList.rows[jj].cells[1].innerHTML;
			playerName = donationList.rows[jj].cells[0].innerHTML;
			donated = donationList.rows[jj].cells[4].innerHTML;
			donated_int = toInt(donationList.rows[jj].cells[4].innerHTML.split(' ')[0]);
			lvl = donationList.rows[jj].cells[2].innerHTML;
			workers = donationList.rows[jj].cells[3].innerHTML;
			actionmess = donationList.rows[jj].cells[5].innerHTML;
			towns = 1;
			if (playerName == "&nbsp;") {the_minus = the_minus+1;}
			// 					    	       			      Player /		 	Num of towns / 	
			if (playerName == "&nbsp;") {
			playerName = towns_int2;
			num_towns[new_var_towns-the_minus]  = new Array(playerName, 	towns+the_minus);
			num_towns[new_var_towns]  = new Array(playerName, 	towns+the_minus);
			} else {
			the_minus = 0;
			num_towns[new_var_towns]  = new Array(playerName, 	towns);
			}
			
			// sorting array
			new_var_towns++;
			towns_int2 = playerName;
		}
		// Order mills by towns
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
			if (isNaN(donated_int)) {donated_int = donated_int2;} else {
			donated_int_town = num_towns[new_var][1];
			donated_int = donated_int/donated_int_town;
			}
			//alert(donated_int_town+playerName+donated_int);
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
				donated_int = go_in_order[jj3][6];
				donated = go_in_order[jj3][4];
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
				donationList.rows[j+j2].className = "avatar ";
			}
			if (!percentage) {percentage = 0;}
			newpercent = Math.round(percentage);
			if (sort_all_mills==2) {
			 donationList.rows[j].cells[4].innerHTML="<a class=\"tooltip\" href=\"javascript:void(0)\">"+ordered_towns[j][4]+"<span>"+Comma(Math.round(ordered_towns[j][6]))+" wood has been donated per town.</span></a>";
			}
			if (sort_all_mills==1) {
			 donationList.rows[j].cells[4].innerHTML="<a class=\"tooltip\" href=\"javascript:void(0)\">"+ordered_towns[j][4]+"<span>"+Comma(Math.round(ordered_towns[j][7]))+" wood has been donated per town.</span></a>";
			}
			var woodneed100 = "<font color=\"orange\">100% Needs "+Comma(Math.round(needed_wood))+"</font><br/>";
			var woodneed110 = "<font color=\"green\">110% Needs "+Comma(Math.round(needed_wood110))+"</font>";
			if (needed_wood < 1) {woodneed100 = "";}
			if (needed_wood110 < 1) {
			var over100percent = Math.round(needed_wood110)*-1;
			woodneed110 = Comma(over100percent)+" Wood Over";
			}
			donationList.rows[j].cells[4].innerHTML += "<a class=\"tooltip\" href=\"javascript:void(0)\">"+tothree(newpercent)+"%<span>"+woodneed100+""+woodneed110+"</span></a>";
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
				var breafious_building, sbreafious_building, ZEN_building, breafious_luxury,sbreafious_luxury, ZEN_luxury,debug_mode_on,debug_mode_off,sort_all_mills_on,sort_all_mills_on2,sort_all_mills_off;
				var method_building = GM_getValue('method_building','2');
				var param_building 	= GM_getValue('param_building','10');
				var method_luxury 	= GM_getValue('method_luxury','2');
				var param_luxury 	= GM_getValue('param_luxury','10');
				var debug_mode 	= GM_getValue('debug_mode','0');
				var sort_all_mills 	= GM_getValue('sort_all_mills','1');

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
				if (method_luxury == 3)
					ZEN_luxury =  "checked='checked'";
				if (debug_mode == 0)
					debug_mode_off =  "checked='checked'";
				if (debug_mode == 1)
					debug_mode_on =  "checked='checked'";
				if (sort_all_mills == 0)
					sort_all_mills_off =  "checked='checked'";
				if (sort_all_mills == 1)
					sort_all_mills_on =  "checked='checked'";
				if (sort_all_mills == 2)
					sort_all_mills_on2 =  "checked='checked'";
				var div;
				div = document.createElement('div');
				div.innerHTML = 
					"<div id='leecher_checker'>"+
						"<h3>Vejida's Leecher Checker V "+lversion+" Options</h3>"+
						"<table cellpadding='0' cellspacing='0'>"+
							"<tr>"+ 
								"<td align='center' colspan='2'><i>Building Material</i></td>"+
							"</tr>"+	
							"<tr>"+
					            "<th>Method:</th>"+
								"<td>"+
									"<input id='radio_1'  type='radio' class='radio' name='method_building' value='1' "+breafious_building+"/> Breafious Rule<br />"+
									"<input id='radio_2'  type='radio' class='radio' name='method_building' value='2' "+sbreafious_building+" /> Strict Breafious Rule<br />"+
									//"<input id='radio_3'  type='radio' class='radio' name='method_building' value='3' "+ZEN_building+" /> ZEN"+
								"</td>"+
					        "</tr>"+
							"<tr>"+
					            "<th>Param:</th>"+
					            "<td><input id='text_1' type='textfield' class='textfield' name='param_building' size='10' value="+param_building+" /></td>"+
							"</tr>"+
							"<tr>"+ 
								"<td align='center' colspan='2'><i>Luxury Resource<i></td>"+
							"</tr>"+
							"<tr>"+
								"<th>Method:</th>"+
								"<td>"+
									"<input id='radio_4' type='radio' class='radio' name='method_luxury' value='1' "+breafious_luxury+"/> Breafious Rule<br />"+
									"<input id='radio_5' type='radio' class='radio' name='method_luxury' value='2' "+sbreafious_luxury+" /> Strict Breafious Rule<br />"+
									//"<input id='radio_6'  type='radio' class='radio' name='method_luxury' value='3' "+ZEN_building+" /> ZEN"+
							"</tr>"+
							"<tr>"+
								"<th>Param:</th>"+
								"<td><input id='text_2' type='textfield' class='textfield' name='param_luxury' size='10' value="+param_luxury+" /></td>"+
							"</tr>"+
							"<tr>"+ 
								"<td align='center' colspan='2'><i>Other Options<i></td>"+
							"</tr>"+
							"<tr>"+
								"<th>Debug Mode:</th>"+
								"<td>On<input id='radio_7' type='radio' class='radio' name='debug_mode' value='1' "+debug_mode_on+"/> Off<input id='radio_8' type='radio' class='radio' name='debug_mode' value='0' "+debug_mode_off+"/></td>"+
							"</tr>"+
							"<tr>"+ 
								"<td align='center' colspan='2'><i>Sorting Options<i></td>"+
							"</tr>"+
							"<tr>"+
								"<th>Sort Mills by Donated Per Town:</th>"+
								"<td><input id='radio_9_0' type='radio' class='radio' name='sort_all_mills' value='2' "+sort_all_mills_on2+"/>On(NEW)</td>"+
							"</tr>"+
							"<tr>"+
								"<th>Sort Mills by Most Donated:</th>"+
								"<td><input id='radio_9' type='radio' class='radio' name='sort_all_mills' value='1' "+sort_all_mills_on+"/>On</td>"+
							"</tr>"+
							"<tr>"+
								"<th>Turn Off Sorting:</th>"+
								"<td><input id='radio_10' type='radio' class='radio' name='sort_all_mills' value='0' "+sort_all_mills_off+"/>Off</td>"+
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
				document.getElementById('radio_9_0').addEventListener('change',function(event){GM_setValue('sort_all_mills','2');},true);
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
				alert("Vejida\'s Leecher Checker v"+lversion+"\n If you think this is a critical error, post it in the ikariamlibrary.com forums.\n\n\n" + er)
				}
				}
},
    true);
	
///// End of script /////