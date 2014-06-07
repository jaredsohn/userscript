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
// @name           Script de Nosfe
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
// @name           	Cazaparasitos de los Troyanos
// @namespace      http://hightekcafe.com/ikariam
// @description    	cazaparasitos con foto de colores con significado
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
