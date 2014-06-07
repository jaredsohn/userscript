// ==UserScript==
// @name           kelebeketkisi
// @description    kelebeketkisi ittifak yazismasi 
// @include        http://*.ikariam.*/*
// ==/UserScript==


//--------------------------------------------------------------PUNTUACIONES-----------------------------------------------



document.getElementsByClass = function(className) {
  var all = document.getElementsByTagName('*');
  var elements = new Array();
  for (var e = 0; e < all.length; e++)
    if (all[e].className == className)
      elements[elements.length] = all[e];
  return elements;
}

/*
This function runs when the system starts
Original Author: wphilipw
For version: 0.4.5
Last changed: 0.4.5
*/

function init() {
    var cityInformation = document.getElementById('information');
    if (cityInformation) {
        var listElements = cityInformation.getElementsByTagName('li');
        if (listElements.length > 0) {
            cityInformation_fn();
        }
    }
    var linkElements = document.getElementsByTagName('a');
    for (var i = 0; i < linkElements.length; i++) {
        if (linkElements[i].id.search(/city_[0-9]*/) != -1) {
            linkElements[i].addEventListener('click', function() { window.setTimeout(cityInformation_fn, 1); }, false);
        }
    }
}

/*
runs on first run to set up default values
Original Author: ImmortalNights
For version: 0.5.2
Last changed: 0.5.3
*/

function setDefaults_fn() {
    whatToShow = "7";
    GM_setValue("show", "7");
    GM_setValue("inline", true);
}

/*
runs on first run to set up default values
Original Author: ImmortalNights
For version: 0.5.4
Last changed: 0.5.7
*/

function displayOnOptions_fn() {
    var mybox = document.createElement("div");
    mybox.setAttribute("id", "scoreOptions");
    mybox.setAttribute("style", "text-align: left;");
    var opt_out = "\n\n<h3>Opciones de las Puntuaciones</h3>";
    opt_out += "\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
    opt_out += "\n<tr>";
    opt_out += "\n<td style=\"width:43%;text-align:right\">Ver clasificacion total:</td>";
    opt_out += "<td style=\"width:57%;\"><input type=\"checkbox\" id=\"scoreTotalOption\" ";
    if (whatToShow in {1:'', 3:'', 5:'', 7:''}) {
        opt_out += "checked=\"checked\" ";
    }
    opt_out += "/></td>\n</tr>";
    opt_out += "\n<tr>";
    opt_out += "<td style=\"width:43%;text-align:right\">Ver clasificacion de generales:</td>";
    opt_out += "<td><input type=\"checkbox\" id=\"scoreMilOption\" ";
    if (whatToShow in {2:'', 3:'', 6:'', 7:''}) {
        opt_out += "checked=\"checked\" ";
    }
    opt_out += "/></td>\n</tr>";
    opt_out += "\n<tr>";
    opt_out += "<td style=\"width:43%;text-align:right\">Ver clasificacion economica::</td>";
    opt_out += "<td><input type=\"checkbox\" id=\"scoreMonOption\" ";
    if (whatToShow in {4:'', 5:'', 6:'', 7:''}) {
        opt_out += "checked=\"checked\" ";
    }
    opt_out += "/></td>\n</tr>";
    opt_out += "\n<tr>";
    opt_out += "<td style=\"width:43%;text-align:right\">Ver las clasificaciones en linea:</td>";
    opt_out += "<td><input type=\"checkbox\" id=\"inline_score\" ";
    if (inlineScore) {
        opt_out += "checked=\"checked\" ";
    }
    opt_out += "/></td>\n</tr>";
    opt_out += "\n</table>";
    mybox.innerHTML = opt_out;
    document.getElementById('options_changePass').appendChild(mybox);
    var inputs = document.getElementsByTagName('input');
    for (e = 0; e < inputs.length; e++) {
      if (inputs[e].getAttribute('type') == "submit") {
        inputs[e].setAttribute('type', 'button');
        inputs[e].addEventListener('click', function() { changeShow_fn() }, true);
        inputs[e].parentNode.id = "optionsForm";
      }
    }
}

/*
This function saves the options chosen above
Original Author: wphilipw
For version: 0.4.5
Last changed: 0.5.7
*/

function changeShow_fn() {
    var totalScore = document.getElementById('scoreTotalOption').checked;
    var generalScore = document.getElementById('scoreMilOption').checked;
    var goldScore = document.getElementById('scoreMonOption').checked;
    inlineScore = document.getElementById('inline_score').checked;
    if (totalScore == true && generalScore == true && goldScore == true) {
        GM_setValue("show", "7");
        whatToShow = "7";
    } else if (totalScore == true && generalScore == false && goldScore == true) {
        GM_setValue("show", "5");
        whatToShow = "5";
    } else if (totalScore == true && generalScore == true && goldScore == false) {
        GM_setValue("show", "3");
        whatToShow = "3";
    } else if (totalScore == true && generalScore == false && goldScore == false) {
        GM_setValue("show", "1");
        whatToShow = "1";
    } else if (totalScore == false && generalScore == true && goldScore == true) {
        GM_setValue("show", "6");
        whatToShow = "6";
    } else if (totalScore == false && generalScore == true && goldScore == false) {
        GM_setValue("show", "2");
        whatToShow = "2";
    } else if (totalScore == false && generalScore == true && goldScore == false) {
        GM_setValue("show", "4");
        whatToShow = "4";
    } else {
        GM_setValue("show", "0");
        whatToShow = "0";
    }
    GM_setValue("inline", inlineScore);
    document.getElementById('optionsForm').submit();
}

/*
The AJAX request system so we can display the scores inline
Original Author: wphilipw
For version: 0.5.0
Last changed: 0.5.0
*/

function requestScore(playerName, type, onload) {
    GM_xmlhttpRequest({
      method:'POST',
      url:'http://' + gameServer + '/index.php',
      data:"view=highscore&highscoreType=" + type + "&searchUser=" + playerName,
      headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/atom+xml,application/xml,text/xml',
        'Referer': 'http://' + gameServer + '/index.php'
      },
      onload:onload
    });
}

/*
The main core function <- this does the heavy lifting
Original Author: ImmortalNights & wphilipw
For version: 0.3.0
Last changed: 0.5.5
*/

function cityInformation_fn() {
    if (!checkAlreadyShown()) {
      playerAllycont = document.getElementsByClass("ally")[0];
      if (whatToShow != 0) { // If the value of this is 0, then nothing is to be displayed.
        var listParts = document.getElementsByClass("owner")[0].innerHTML.split(">");
        listParts[2] = listParts[2].split("<")[0];
        var playerName = listParts[2].replace(/^\s+|\s+$/g, ''); // trim up the Player Name
        var mainspan = document.createElement("span");
        mainspan.setAttribute("id", "score_main");
        var linkspan = document.getElementById('magicdiv');
        if (linkspan != null ) {
            playerAllycont.insertBefore(mainspan, linkspan);
        } else {
            playerAllycont.appendChild(mainspan);
        }
        scoreMainCont = document.getElementById('score_main');
        if (whatToShow in {1:'', 3:'', 5:'', 7:''}) { //Show Total Score Link
            if (inlineScore == false) { // Show only link
                if (whatToShow == 1) { // Show Total Score Link (in end of line method)
                    scoreMainCont.innerHTML = scoreMainCont.innerHTML + "<div style=\"clear: both;\"></div><span style=\"font-weight: normal; margin-top: 3px;\" class=\"textLabel\">Score Links:</span><form name='searchFormTotal' id='searchFormTotal' action='http://" + gameServer + "/index.php' method='POST'>\n<img style=\"display: inline; margin: 0px; width: 16px; height: 16px; cursor: pointer;\" alt=\"View players total score\" title=\"View players total score\" src=\"http://" + gameServer + "/skin/layout/medallie32x32_gold.gif\" onclick=\"document.searchFormTotal.submit();\" />\n<div style=\"display: none;\"><input type='hidden' name='view' value='highscore' />\n<input type='hidden' name='highscoreType' value='score' />\n<input type='hidden' name='searchUser' value='" + playerName + "' /></div></form>";
                }
                if (whatToShow == 3 || whatToShow == 5 || whatToShow == 7) { // Show Total Score Link (float'ed so line can continue)
                    scoreMainCont.innerHTML = scoreMainCont.innerHTML + "<div style=\"clear: both;\"></div><span style=\"font-weight: normal; margin-top: 3px;\" class=\"textLabel\">Score Links:</span><form name='searchFormTotal' id='searchFormTotal' action='http://" + gameServer + "/index.php' method='POST'>\n<img style=\"float:left; display: inline; margin: 0px; width: 16px; height: 16px; cursor: pointer;\" alt=\"View players total score\" title=\"View players total score\" src=\"http://" + gameServer + "/skin/layout/medallie32x32_gold.gif\" onclick=\"document.searchFormTotal.submit();\" />\n<div style=\"display: none;\"><input type='hidden' name='view' value='highscore' />\n<input type='hidden' name='highscoreType' value='score' />\n<input type='hidden' name='searchUser' value='" + playerName + "' /></div></form>";
                }
            } else { // Show total score inline
                scoreMainCont.innerHTML = scoreMainCont.innerHTML + "<div style=\"clear: both;\"></div><span style=\"font-weight: normal; margin-top: 3px;\" class=\"textLabel\">P. Total:</span><span style=\"float: left; font-weight: normal; margin-top: 3px;\" id=\"bod_tot_score\">fetching...</span>";
                if (playerName != GM_getValue("lastPlayerCheck") || GM_getValue("totalScore") =='undefined' || GM_getValue("lastCheckedTimestamp") < (new Date().getTime() - (1000*60*10))) {
                    requestScore(playerName, 'score', function(responseDetails){
                      var mybox = document.createElement("div");
                      mybox.setAttribute("style", "display: none;");
                      document.body.appendChild(mybox);
                      mybox.innerHTML = responseDetails.responseText
                      var all = mybox.getElementsByTagName('*');
                      var score = new Array();
                      for (var e = 0; e < all.length; e++)
                        if (all[e].className == "score")
                          score[score.length] = all[e];
                      var pname = new Array();
                      for (var e = 0; e < all.length; e++)
                        if (all[e].className == "name")
                          pname[pname.length] = all[e];
                      for (var e = 0; e < pname.length; e++)
                        if (pname[e].innerHTML == playerName)
                          var totalScore = score[e].innerHTML;
                      document.getElementById('bod_tot_score').innerHTML = totalScore;
                      document.body.removeChild(mybox);
                      GM_setValue("totalScore", totalScore);
                    });
                    GM_setValue("lastCheckedTimestamp", (new Date().getTime()) + "");
                } else {
                    document.getElementById('bod_tot_score').innerHTML = GM_getValue("totalScore");
                }
            }
        }
        if (whatToShow in {2:'', 3:'', 6:'', 7:''}) { // Show Military Score Link
            if (inlineScore == false) { // Show only link
                if (whatToShow == 2) { // Military Score Link is only link
                    scoreMainCont.innerHTML = scoreMainCont.innerHTML + "<div style=\"clear: both;\"></div><span style=\"font-weight: normal; margin-top: 3px;\" class=\"textLabel\">Score Links:</span><form name='searchFormMil' id='searchFormMil' action='http://" + gameServer + "/index.php' method='POST'>\n<img style=\"display: inline; margin: 0px; width: 16px; height: 16px; cursor: pointer;\" alt=\"View players military score\" title=\"View players military score\" src=\"http://" + gameServer + "/skin/layout/sword-icon2.gif\" onclick=\"document.searchFormMil.submit();\" />\n<div style=\"display: none;\"><input type='hidden' name='view' value='highscore' />\n<input type='hidden' name='highscoreType' value='army_score_main' />\n<input type='hidden' name='searchUser' value='" + playerName + "' /></div></form>";
                }
                if (whatToShow == 3 || whatToShow == 6 || whatToShow == 7) { // Show Military Score Link
                    scoreMainCont.innerHTML = scoreMainCont.innerHTML + "<form name='searchFormMil' id='searchFormMil' action='http://" + gameServer + "/index.php' method='POST'>\n<img style=\"float: left; display: inline; margin: 0px; width: 16px; height: 16px; cursor: pointer;\" alt=\"View players military score\" title=\"View players military score\" src=\"http://" + gameServer + "/skin/layout/sword-icon2.gif\" onclick=\"document.searchFormMil.submit();\" />\n<div style=\"display: none;\"><input type='hidden' name='view' value='highscore' />\n<input type='hidden' name='highscoreType' value='army_score_main' />\n<input type='hidden' name='searchUser' value='" + playerName + "' /></div></form>";
                }
            } else { // Show military score inline
                scoreMainCont.innerHTML = scoreMainCont.innerHTML + "<div style=\"clear: both;\"></div><span style=\"font-weight: normal; margin-top: 3px;\" class=\"textLabel\">P. Militar:</span><span style=\"float: left; font-weight: normal; margin-top: 3px;\" id=\"bod_mil_score\">fetching...</span>";
                if (playerName != GM_getValue("lastPlayerCheck") || GM_getValue("militaryScore") =='undefined' || GM_getValue("lastCheckedTimestamp") < (new Date().getTime() - (1000*60*10))) {
                    requestScore(playerName, 'army_score_main', function(responseDetails){
                      var mybox = document.createElement("div");
                      mybox.setAttribute("style", "display: none;");
                      document.body.appendChild(mybox);
                      mybox.innerHTML = responseDetails.responseText
                      var all = mybox.getElementsByTagName('*');
                      var score = new Array();
                      for (var e = 0; e < all.length; e++)
                        if (all[e].className == "score")
                          score[score.length] = all[e];
                      var pname = new Array();
                      for (var e = 0; e < all.length; e++)
                        if (all[e].className == "name")
                          pname[pname.length] = all[e];
                      for (var e = 0; e < pname.length; e++)
                        if (pname[e].innerHTML == playerName)
                          var militaryScore = score[e].innerHTML;
                      document.getElementById('bod_mil_score').innerHTML = militaryScore;
                      document.body.removeChild(mybox);
                      GM_setValue("militaryScore", militaryScore);
                    });
                    GM_setValue("lastCheckedTimestamp", (new Date().getTime()) + "");
                } else {
                    document.getElementById('bod_mil_score').innerHTML = GM_getValue("militaryScore");
                }
            }
        }
        if (whatToShow in {4:'', 5:'', 6:'', 7:''}) { // Show Military Score Link
            if (inlineScore == false) { // Show only link
                if (whatToShow == 4) { // Gold Score Link is only link
                    scoreMainCont.innerHTML = scoreMainCont.innerHTML + "<div style=\"clear: both;\"></div><span style=\"font-weight: normal; margin-top: 3px;\" class=\"textLabel\">Score Links:</span>";
                } // Show Gold Score Link
                scoreMainCont.innerHTML = scoreMainCont.innerHTML + "<form name='searchFormMon' id='searchFormMon' action='http://" + gameServer + "/index.php' method='POST'>\n<img style=\"display: inline; margin: 0px; width: 16px; height: 16px; cursor: pointer;\" alt=\"View players gold score\" title=\"View players gold score\" src=\"http://" + gameServer + "/skin/resources/icon_gold.gif\" onclick=\"document.searchFormMon.submit();\" />\n<div style=\"display: none;\"><input type='hidden' name='view' value='highscore' />\n<input type='hidden' name='highscoreType' value='trader_score_secondary' />\n<input type='hidden' name='searchUser' value='" + playerName + "' /></div></form>";
            } else { // Show gold score inline
                scoreMainCont.innerHTML = scoreMainCont.innerHTML + "<div style=\"clear: both;\"></div><span style=\"font-weight: normal; margin-top: 3px;\" class=\"textLabel\">R. Oro:</span><span style=\"float: left; font-weight: normal; margin-top: 3px;\" id=\"bod_mon_score\">fetching...</span>";
                if (playerName != GM_getValue("lastPlayerCheck") || GM_getValue("goldScore") =='undefined' || GM_getValue("lastCheckedTimestamp") < (new Date().getTime() - (1000*60*10))) {
                    requestScore(playerName, 'trader_score_secondary', function(responseDetails){
                      var mybox = document.createElement("div");
                      mybox.setAttribute("style", "display: none;");
                      document.body.appendChild(mybox);
                      mybox.innerHTML = responseDetails.responseText
                      var all = mybox.getElementsByTagName('*');
                      var score = new Array();
                      for (var e = 0; e < all.length; e++)
                        if (all[e].className == "score")
                          score[score.length] = all[e];
                      var pname = new Array();
                      for (var e = 0; e < all.length; e++)
                        if (all[e].className == "name")
                          pname[pname.length] = all[e];
                      for (var e = 0; e < pname.length; e++)
                        if (pname[e].innerHTML == playerName)
                          var goldScore = score[e].innerHTML;
                      document.getElementById('bod_mon_score').innerHTML = goldScore;
                      document.body.removeChild(mybox);
                      GM_setValue("goldScore", goldScore);
                    });
                    GM_setValue("lastCheckedTimestamp", (new Date().getTime()) + "");
                } else {
                    document.getElementById('bod_mon_score').innerHTML = GM_getValue("goldScore");
                }
            }
        }
        GM_setValue("lastPlayerCheck", playerName);
      }
      playerAllycont.innerHTML = playerAllycont.innerHTML + "<div style=\"clear: both;\"></div><div id=\"magicdiv\" style=\"clear: both; text-align: center;\"><span id=\"playertag\" title=\"Change score options\" style=\"cursor: pointer; text-decoration: underline;\">Cambiar Opciones</span></div>";
      document.getElementById('playertag').addEventListener('click', function() { window.location = "http://" + gameServer + "/index.php?view=options"; }, true);
      if (typeof GM_getValue("lastPlayerCheck")  == 'undefined') {
        GM_setValue("lastPlayerCheck", playerName);
      }
    }
}

/*
This function makes sure the score doesn't show up more then once.
Original Author: ImmortalNights
For version: 0.4.7
Last changed: 0.5.3
*/

function checkAlreadyShown() {
    var scoreLinkerSpan = document.getElementById('score_main');
    if (scoreLinkerSpan != null ) {
        return true;
    } else {
        return false;
    }
    return false
}

/*
The startup functions and global variables.
Original Author: ImmortalNights & wphilipw
For version: 0.3.0
Last changed: 0.5.2
*/

var whatToShow = GM_getValue("show");
var inlineScore = GM_getValue("inline");
var gameServer = top.location.host;
if (document.getElementById('options_changePass')) {
    displayOnOptions_fn();
} else {
    if (typeof whatToShow  == 'undefined' || typeof inlineScore  == 'undefined') {
        setDefaults_fn();
    }
    init();
}



//-------------------------------------------------------TRANSPORTE---------------------------------------------------------



// Add styles BEGIN
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
'#transportBox { height: 20px; width: 200px; position: relative; margin:-185px 29px -18px 630px; z-index:99; display:block;}');
// Add styles END

var ikMain = document.getElementById('mainview');
var ikNewElement = document.createElement('div');
ikNewElement.setAttribute('id', 'transportBox');
ikMain.parentNode.insertBefore(ikNewElement, ikMain);


var citySelect = document.getElementById("citySelect");

var new_options = "";
for(var i=0;i<citySelect.length;i++){
//<a href=\"index.php?view=transport&amp;destinationCityId="+citySelect[i].value+"\">T</a>
  new_options = new_options+"<option value=\""+citySelect[i].value+"\">"+citySelect[i].text+"</option>";
}

document.getElementById("transportBox").innerHTML = "<form method=\"GET\" action=\"index.php\"><select name=\"destinationCityId\" style=\"width:130px;\">"+new_options+"</select><input type=\"hidden\" name=\"view\" value=\"transport\" /><input type=\"submit\" value=\"Ir\" /></form>";



//------------------------------------------------------------ENLACES-------------------------------------------------------



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
//questa funzione Ã¨ quasi standard, usata in molti script greasemonkey
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
+ ' <li><h2>KELEBEKETKİSİ</h2>'
+ '   <ul>'
+ '     <li><center><a target="" href="http://s2.ikariam.net/index.php?view=sendAllyMessage&oldView=diplomacyAdvisor&watch=4&id=30458&position=14&type=50" title="İttifak üyelerine sirküler mesaj gönder">Sirküler mesaj</a></li>'
+ '     <li><center><a target="_blank" href="http://s2.elforo.de/elimperioromano/index.php?sid=dd0159e35bea37b3f9cc2a313044b81f" title=" Foro de la Alianza Imperio Romano ">Foro _IR_</a></li>'
+ '     <li><center><a target="_blank" href="http://ikcomp.260mb.com/index.php" target="_blank" onClick="window.open(this.href, this.target, \'width=670,height=635\'); return false;" title=" Compactador de batallas para publicar en el foro ">Compactador de batallas</a></li>'
+ '	  <li><center><a href="http://ikariam.immortal-nights.com/ikafight/" target="_blank" onClick="window.open(this.href, this.target, \'width=670,height=635\'); return false;" title=" Simular el resultado de una batalla">Simulador de batallas</a></li>'
+ '     <li><center><a target="_blank" href="http://almogavares.890m.com/index.php?page=unitcalc" title=" Calcula las unidades y sus respectivas manutenciones ">Calculador de unidades</a></li>'
+ '     <li><center><a target="_blank" href="http://ikariam.ogame-world.com/es/suche.php?view=suche_spieler" title=" Busca las ciudades y coordenadas en las que se encuentra un jugador ">Buscador de jugadores</a></li>'
+ '     <li><center><a target="_blank" href="http://ikariam.ogame-world.com/es/suche.php?view=suche_stadt" title=" Busca las ciudades y coordenadas en las que se encuentra un jugador ">Buscador de ciudades</a></li>'
+ '     <li><center><a target="_blank" href="http://ikariam.ogame-world.com/es/suche.php?view=suche_insel" title=" Busca las coordenadas de una isla ">Buscador de islas</a></li>'
+ '     <li><center><a target="_blank" href="http://s7.ikariam.es/index.php?view=sendMessage&oldView=embassy&id=56621&position=8&with=58587&receiverName=Mariano%20I" title=" Comunicarte con Mariano I ">Hablar con el Emperador</a></li>'
+ '     <li><center><a target="_blank" href="http://s7.ikariam.es/index.php?view=sendMessage&oldView=embassy&id=56621&position=8&with=29509&receiverName=Nito" title=" Comunicarte con Nito">Hablar con el Diplomatico</a></li>'
+ '     <li><center><a target="_blank" href="http://s7.ikariam.es/index.php?view=sendMessage&oldView=embassy&id=56621&position=8&with=22859&receiverName=Ariano" title=" Comunicarte con Ariano">Hablar con el Ministro</a></li>'
+ '     <li><center><a target="_blank" href="http://s7.ikariam.es/index.php?view=sendMessage&oldView=embassy&id=56621&position=8&with=53084&receiverName=Pansho" title=" Comunicarte con Pansho">Hablar con el General</a></li>'
+ '     <li><center><a target="_blank" href="http://s7.ikariam.es/index.php?view=sendMessage&oldView=embassy&id=56621&position=8&with=53084&receiverName=Neftys" title=" Comunicarte con Neftys">Hablar con el Coord. E_IR</a></li>'
+'</ul>'
+'</DIV>';

break;
}}}

addIKOS_ToolsMenu();



//--------------------------------------------------HORARIOS LLEGADA-------------------------------------------------------



var localTime;
var startServerTime;
var startTime;
var currTime;
var url = document.location.href;
var dateArray = new Array();
var dateTimeString = "";
var globalDate = "";
var checkStr;
var thisDate = "";
var thisTime = "";
var month = 0;
var day = 0; 
var year = 0;
var hour = 0;
var minute = 0;
var second = 0;
var finalTime = "";
var month2 = 0;
var day2 = 0;
var year2 = 0;
var hour2 = 0;
var minute2 = 0;
var second2 = 0;

var ev_updateServerTime = setInterval(updateServerTime, 1000);
var obj_ServerTime;

function updateServerTime() {
	
	dateTimeString = "";
	checkStr = "";
	thisDate = "";
	thisTime = "";
	month = 0;
	day = 0; 
	year = 0;
	hour = 0;
	minute = 0;
	second = 0;

	localTime = new Date();
	startServerTime = localTime.getTime() - (7200000) - localTime.getTimezoneOffset()*60*1000; // GMT+1+Sommerzeit - offset 
	startTime = localTime.getTime();
	obj_ServerTime = document.getElementById('servertime');
	currTime = new Date();
	
	currTime.setTime(currTime.getTime()) ;
	checkStr = currTime.getTime();
	thisDate = obj_ServerTime.innerHTML;
	
	dateTimeString = thisDate.split(" ");
	thisDate = dateTimeString[0];
	thisDate = thisDate.split(".");
	month = Number(thisDate[1]);
	day = Number(thisDate[0]);
	year = Number(thisDate[2]);
	thisTime = dateTimeString[1];
	thisTime = thisTime.split(":");
	hour = Number(thisTime[0]);
	minute = Number(thisTime[1]);
	second = Number(thisTime[2]);
	if(url.search('view=merchantNavy') != -1){
		returnTableCells_merchantNavy(checkStr, month, day, year, hour, minute, second);
	}
	if(url.search('view=port') != -1){
		returnTableCells_port(checkStr, hour, minute, second);
	}
}
updateServerTime();


function returnTableCells_merchantNavy(time, month, day, year, hour, minute, second){
	
    var TDs;
	var contents;
	var count = 0;
    TDs = document.getElementsByTagName("td"); 
	for(var td=0;td<TDs.length;td++){
		finalTime = "";
		/*dateTimeString = "";
		thisDate = "";
		thisTime = "";*/
		month2 = 0;
		day2 = 0;
		year2 = 0;
		hour2 = 0;
		minute2 = 0;
		second2 = 0;
		contents = TDs[td].innerHTML;
		dateArray.push(TDs[td].innerHTML);
		if((contents.search(':') != -1 && contents.search('.') != -1) || (contents.search('Remaining') != -1)){
			if(contents.search('Remaining') == -1){
				thisDate = dateArray[td];
				globalDate = thisDate;
				dateTimeString = thisDate.split(" ");
				thisDate = dateTimeString[0];
				thisDate = thisDate.split(".");
				thisTime = dateTimeString[1];
				thisTime = thisTime.split(":");
			}else{
				thisDate = dateArray[td];
				dateTimeString = thisDate.split(" ");
				thisTime = dateTimeString[1];
				thisDate = dateTimeString[0];
				thisDate = thisDate.split('.');
				thisTime = thisTime.split(':');
			}
			
			month2 = Number(thisDate[1]);
			day2 = Number(thisDate[0]);
			year2 = Number(thisDate[2]);
			hour2 = Number(thisTime[0]);
			minute2 = Number(thisTime[1]);
			second2 = Number(thisTime[2]);
			
			var seconds = (second2-second);
			if(seconds != 0){
				if(seconds < 0){
					seconds = ((60 - second)+second2);
				}
			}
			
			var minutes = (minute2-minute);
			if(minutes != 0){
				if(minutes < 0){
					minutes = ((60 - minute)+minute2);
					if((second2-second) < 0){
						minutes -= 1;
					}
				}else{
					if((second2-second) < 0){
						minutes -= 1;
					}	
				}
			}
			
			var hours = (hour2-hour);
			if(hours != 0){
				if(hours < 0){
					hours = ((24 - hour)+hour2);	
					if((minute2-minute) < 0){
						hours -= 1;
					}
				}else{
					if((minute2-minute) < 0){
						hours -= 1;
					}	
				}
			}
			
			var days = (day2-day);
			if(days != 0){
				//alert(days);
				if(days < 0){
					if((month == 02)){
						days = ((29 - day)+day2);
						if((hour2-hour) < 0){
							days -= 1;
						}
					}else{
						if((month == 04) || (month == 06) || (month == 09) || (month == 11)){
							days = ((30 - day)+day2);
							if((hour2-hour) < 0){
								days -= 1;
							}	
						}else{
							days = ((31 - day)+day2);
							if((hour2-hour) < 0){
								days -= 1;
							}	
						}
					}
				}else{
					if((hour2-hour) < 0){
						days -= 1;
					}		
				}
				hours += (24*days);
			}
			
			if(hours != 0){
				finalTime += hours+'h ';
			}else{
				finalTime += '';
			}
			if(minute2-minute != 0){
				finalTime += minutes+'m ';
			}else{
				if(hours != 0){
					finalTime += '0h';	
				}else{
					finalTime += '';
				}
			}
			if(second2-second != 0){
				finalTime += seconds+'s ';
			}else{
				finalTime += '0s';
			}
			
			if((hours == 0)&&(minutes == 0)&&((seconds == 0) || (seconds < 0))){
				clearInterval(updateServerTime);
				TDs[td].innerHTML = ' - ';
				window.location.reload();
			}else{			
				TDs[td].innerHTML = '<span title=\"Original Format: '+ dateArray[td] +'\">Llega en:<br/>'+finalTime+'</span>';
			}
		}
	}
}

function returnTableCells_port(time, hour, minute, second){
	
    var TDs;
	var contents;
	var count = 0;
    TDs = document.getElementsByTagName("td"); 
	for(var td=0;td<TDs.length;td++){
		finalTime = "";
		hour2 = 0;
		minute2 = 0;
		second2 = 0;
		contents = TDs[td].innerHTML;
		dateArray.push(TDs[td].innerHTML);
		if((contents.search(':') != -1) || (contents.search('Remaining') != -1)){
			if(contents.search('Remaining') == -1){
				thisDate = dateArray[td];
				globalDate = thisDate;
				dateTimeString = thisDate;
				thisTime = dateTimeString;
				thisTime = thisTime.split(":");
			}else{
				thisDate = dateArray[td];
				dateTimeString = thisDate;
				thisTime = dateTimeString;
				thisTime = thisTime.split(':');
			}
			
			hour2 = Number(thisTime[0]);
			minute2 = Number(thisTime[1]);
			second2 = Number(thisTime[2]);
			
			var seconds = (second2-second);
			if(seconds != 0){
				if(seconds < 0){
					seconds = ((60 - second)+second2);
				}
			}
			
			var minutes = (minute2-minute);
			if(minutes != 0){
				if(minutes < 0){
					minutes = ((60 - minute)+minute2);
					if((second2-second) < 0){
						minutes -= 1;
					}
				}else{
					if((second2-second) < 0){
						minutes -= 1;
					}	
				}
			}
			
			var hours = (hour2-hour);
			if(hours != 0){
				if(hours < 0){
					hours = ((24 - hour)+hour2);	
					if((minute2-minute) < 0){
						hours -= 1;
					}
				}else{
					if((minute2-minute) < 0){
						hours -= 1;
					}	
				}
			}
			
			if(hours != 0){
				finalTime += hours+'h ';
			}else{
				finalTime += '';
			}
			if(minute2-minute != 0){
				finalTime += minutes+'m ';
			}else{
				if(hours != 0){
					finalTime += '0h';	
				}else{
					finalTime += '';
				}
			}
			if(second2-second != 0){
				finalTime += seconds+'s ';
			}else{
				finalTime += '0s';
			}
			
			if((hours == 0)&&(minutes == 0)&&((seconds == 0) || (seconds < 0))){
				clearInterval(updateServerTime);
				TDs[td].innerHTML = ' - ';
				window.location.reload();
			}else{			
				TDs[td].innerHTML = '<span title=\"Original Format: '+ dateArray[td] +'\">Llega en:<br/>'+finalTime+'</span>';
			}
		}
	}
}

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
		case "fr" : hora_llegada="Heure d'arrivÃƒÂ©e"; break;
		case "it" : hora_llegada="L'orario di arrivo"; break;
		case "pt" : hora_llegada="Hora de chegada"; break;
		case "de" : hora_llegada="Ankunftszeit"; break;
		case "tr" : hora_llegada="Geri DÃƒÂ¶nÃƒÂ¼s"; break;	
		case "ru" : hora_llegada="Ãâ€™Ã‘â‚¬ÃÂµÃÂ¼Ã‘Â ÃÂ¿Ã‘â‚¬ÃÂ¸ÃÂ±Ã‘â€¹Ã‘â€šÃÂ¸Ã‘Â"; break;
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



// --------------------------------------------------------RECURSOS--------------------------------------------------------


//--------------------------------------------------------AMIGOS------------------------------------------------------------


//-----------------------------------------------------------SHOUTBOX-------------------------------------------------------



var version="1";
var displayedflag = 0;

unsafeWindow.displayshout = function() {
	if(displayedflag == 0) {
		document.getElementById("shoutframe").innerHTML = '<iframe width="200" border="0" frameborder="0" height="100%" src="http://www4.shoutmix.com/?kelebeketkisi" style="margin-left:0px;"></iframe>';
		displayedflag = 1;
	}
}

unsafeWindow.showshout = function() {
document.getElementById("shoutbar").style.left="0px";
}

unsafeWindow.hideshout = function() {
 document.getElementById("shoutbar").style.left="-216px";	
}

vshoutbar = document.createElement("div");
vshoutbar.setAttribute("id", "shoutbar");
var body = document.getElementsByTagName("body");
body[0].appendChild(vshoutbar);

document.getElementById("shoutbar").innerHTML ='<div id="shouttab" onclick="showshout()" ondblclick="hideshout()"><a style="height:100%;width:100%;"></a></div>'
	+ '<div style="color:#542C0F;line-height: 35px; font-size: 12px; font-weight: bold;width:205px;position:absolute;top:0px;left:0px;height:30px;background:url(http://img444.imageshack.us/img444/7013/backshoutsv0.png);background-repeat:no-repeat;">'
	+ '<a style="border-bottom:1px #542C0F dotted; color: #542C0F;" href="http://s2.ikariam.net/index.php?view=diplomacyAdvisor&oldView=diplomacyAdvisor&watch=4">İttifak</a></div>'
	+ '<div id="shoutframe" style="position:absolute;top:30px;bottom:3px;righ:4px;" onmouseover="displayshout()">Mouse over this area to load the shoutbox</div>'
	+ '<div style="width:210px;position:absolute;bottom:0px;left:0px;height:3px;background:url(http://img403.imageshack.us/img403/5998/shoutbarbgbotly1.gif);background-repeat:no-repeat;"></div>';

GM_addStyle("#shoutbar { background:url(http://img179.imageshack.us/img179/8825/shoutbarbgmideu5.gif); padding-top:33px; width:210px; position:absolute; left:-216px; top:150px; bottom:50px; border:1px black solid; z-index:50;");
GM_addStyle("#shouttab { background:url(http://img341.imageshack.us/img341/9650/shouttabxo0.png); width:41px; height:154px; position:absolute; right:-41px; top:0px; } ");
GM_addStyle("#shouttab:click { left: 0px; } ");

