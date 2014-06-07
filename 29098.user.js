// ==UserScript==
// @name           BLX Script
// @description    conjunto de scripts adaptrados por AlHaNoS y un chat para dicha alianza.
// @include        http://*ikariam.*/index.php*
// ==/UserScript==

/*
This function lets us access an element by it's class name
Original Author: wphilipw
For version: 0.4.0
Last changed: 0.4.0
*/

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
    var opt_out = "\n\n<h3>Score Display Options</h3>";
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

if(!window.addGlobalStyle)
	{	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
}

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

document.getElementById("transportBox").innerHTML = "<form method=\"GET\" action=\"index.php\"><select name=\"destinationCityId\" style=\"width:130px;\">"+new_options+"</select><input type=\"hidden\" name=\"view\" value=\"transport\" /><input type=\"submit\" value=\"Go\" /></form>";

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
//questa funzione è quasi standard, usata in molti script greasemonkey
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
+ ' <li><h2>BLX</h2>'
+ '   <ul>'
+ '     <li><center><a target="" href="http://s9.ikariam.es/index.php?view=sendAllyMessage&oldView=embassy&id=11276&position=6&type=50" title="Enviar un mensaje a todos los miembros de la alianza">Mensaje Circular</a></li>'
+ '     <li><center><a target="_blank" href="http://blackdragonsiota.mundoforo.com/index.php" title=" Foro de la Alianza Black Legio X ">Foro BLX</a></li>'
+ '     <li><center><a target="_blank" href="http://ikcomp.260mb.com/index.php" target="_blank" onClick="window.open(this.href, this.target, \'width=670,height=635\'); return false;" title=" Compactador de batallas para publicar en el foro ">Compactador de batallas</a></li>'
+ '	  <li><center><a href="http://ikariam.immortal-nights.com/ikafight/" target="_blank" onClick="window.open(this.href, this.target, \'width=670,height=635\'); return false;" title=" Simular el resultado de una batalla">Simulador de batallas</a></li>'
+ '     <li><center><a target="_blank" href="http://almogavares.890m.com/index.php?page=unitcalc" title=" Calcula las unidades y sus respectivas manutenciones ">Calculador de unidades</a></li>'
+ '     <li><center><a target="_blank" href="http://ikariam.ogame-world.com/es/suche.php?view=suche_spieler" title=" Busca las ciudades y coordenadas en las que se encuentra un jugador ">Buscador de jugadores</a></li>'
+ '     <li><center><a target="_blank" href="http://ikariam.ogame-world.com/es/suche.php?view=suche_insel" title=" Busca las coordenadas de una isla ">Buscador de islas</a></li>'
+ '     <li><center><a target="_blank" href="http://s9.ikariam.es/index.php?view=sendMessage&oldView=embassy&id=11276&position=6&with=3920&receiverName=Eien" title=" Comunicarte con Eien ">Hablar con el Lider</a></li>'
+ '     <li><center><a target="_blank" href="http://s9.ikariam.es/index.php?view=sendMessage&oldView=embassy&id=11276&position=6&with=3973&receiverName=Obi%20Wan" title=" Comunicarte con Obi Wan">Hablar con el Diplomatico</a></li>'
+ '     <li><center><a target="_blank" href="http://s9.ikariam.es/index.php?view=sendMessage&oldView=embassy&id=11276&position=6&with=7434&receiverName=longinus" title=" Comunicarte con Longinus">Hablar con el General</a></li>'
+ '     <li><center><a target="_blank" href="" title="Creado por _IR_">Adaptado por AlHaNoS</a></li>'
+'</ul>'
+'</DIV>';

break;
}}}

addIKOS_ToolsMenu();