// ==UserScript==
// @name           	Ashika_Tools
// @namespace     TCStips
// @description    Conjunto personalizado de herramientas para la ministra de TCS
// @include        	http://*.ikariam.*/index.php*
//@autor		Tolke
// ==/UserScript==

//------------------ Puntuaciones -------------------------

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
    var opt_out = "\n\n<h3>Opciones del Script</h3>";
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
    opt_out += "<td style=\"width:43%;text-align:right\">Ver cantidad de oro:</td>";
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
                scoreMainCont.innerHTML = scoreMainCont.innerHTML + "<div style=\"clear: both;\"></div><span style=\"font-weight: normal; margin-top: 3px;\" class=\"textLabel\">P. Total:</span><span style=\"float: left; font-weight: normal; margin-top: 3px;\" id=\"bod_tot_score\">cargando...</span>";
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
                scoreMainCont.innerHTML = scoreMainCont.innerHTML + "<div style=\"clear: both;\"></div><span style=\"font-weight: normal; margin-top: 3px;\" class=\"textLabel\">P. Tropas:</span><span style=\"float: left; font-weight: normal; margin-top: 3px;\" id=\"bod_mil_score\">cargando...</span>";
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
                scoreMainCont.innerHTML = scoreMainCont.innerHTML + "<div style=\"clear: both;\"></div><span style=\"font-weight: normal; margin-top: 3px;\" class=\"textLabel\">R. Oro:</span><span style=\"float: left; font-weight: normal; margin-top: 3px;\" id=\"bod_mon_score\">cargando...</span>";
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
      playerAllycont.innerHTML = playerAllycont.innerHTML + "<div style=\"clear: both;\"></div><div id=\"magicdiv\" style=\"clear: both; text-align: center;\"><span id=\"playertag\" title=\"Change score options\" style=\"cursor: pointer; text-decoration: underline;\"></span></div>";
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

//***********************************************************************


//--------------------- Transporte ---------------------------------

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


//**************************************************************************


//------------------ Menu Enlaces -------------------------

var ASHToolssIds        = new Array("opclos","FontForm","buscaBox","worldBox");
var tagsAModifar        = new Array("A","SPAN");
var diaLimite           = 2;
var cookieIKO           = 'IKAFONT';
var cookie_SEPARA       = '|';
var Css_MenuIKO_String  = 
   '#menu {'+
   'align:right;'+
   'margin-left:80%;'+
   'margin-top: -17px;'+
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
   //Esta funcion es casi estandar en todos los scripts de GM
   if(!window.addGlobalStyle){
      function addGlobalStyle(css) {
         var head, style;
         head = document.getElementsByTagName('head')[0];
         if (!head) { 
            return; 
         }
         style = document.createElement('style');
         style.type = 'text/css';
         style.innerHTML = css;
         head.appendChild(style);
      }
   }


function addAstraToolsMenu() {

   var xTags = document.getElementsByTagName('LI');
   var xLi   = null;
   var astreaToolsLink       = document.createElement('LI');
   astreaToolsLink.setAttribute('id', 'ASHTools');
   for(i=0;i<xTags.length;i++) {
      xLi = xTags[i];
      if (xLi.className == 'help') {
         xLi.parentNode.appendChild(astreaToolsLink,xLi);
         addGlobalStyle(Css_MenuIKO_String);
         document.getElementById('ASHTools').innerHTML =
         '<div id="menu">'
         + '<ul>'
         + ' <li><h2>Ashika Tools</h2>'
         + '   <ul>'
         + '     <li><center><a target="_blank" href="http://maximuscharruas.activoforo.com/forum.htm" Foro de la Alianza MXCS ">Foro MXCS</a></li>'
         + '     <li><center><a target="_blank" href="http://thecharruas.foroslatin.com/" title=" Foro de la Aliansa TCS ">Foro The Charruas</a></li>'
         + '     <li><center><a target="_blank" href="http://s1.ikariam.es/index.php?view=sendAllyMessage&oldView=embassy&id=39137&position=6&type=50" title="Envia mensaje Circular">Mensaje Circular</a></li>'
         + '     <li><center><a target="_blank" href="http://ikcomp.260mb.com/index.php" target="_blank" onClick="window.open(this.href, this.target, \'width=670,height=635\'); return false;" title=" Compactador de batallas para publicarlas en el foro ">Compactador de batallas</a></li>'
         + '     <li><center><a target="_blank" href="http://ikariam.ogame-world.com/es/" title="Buscador.">Buscador</a></li>'
         + '     <li><center><a target="_blank" href="http://www.serpini.es/chivakariam" title="Acuerdos.">Acuerdos Culturales</a></li>'
         + '   </ul>'
         + ' </li>'
         +'</ul>';
         +'</DIV>';
         break;
      }
   }
}

unsafeWindow.showTools = function() {

   var toolID = arguments;
   var elemToShow = null;
   for (var i = 0; i < arguments.length; i++) {
      elemToShow = document.getElementById(ASHToolssIds[toolID[i]]);
      if (elemToShow) {
         if ((toolID[i] == 0) || (toolID[i] == 1)) {
            if (document.getElementById(ASHToolssIds[0]).style.visibility == 'hidden') {
               document.getElementById(ASHToolssIds[0]).style.visibility = 'visible';
               document.getElementById(ASHToolssIds[1]).style.visibility = 'visible';
               if (document.getElementById('c'+ASHToolssIds[0])) document.getElementById('c'+ASHToolssIds[0]).style.visibility='visible';
            } 
            else {
               document.getElementById(ASHToolssIds[0]).style.visibility = 'hidden';
               document.getElementById(ASHToolssIds[1]).style.visibility = 'hidden';
               if (document.getElementById('c'+ASHToolssIds[0])) document.getElementById('c'+ASHToolssIds[0]).style.visibility='hidden';
            }    
         } 
         else {
            if (elemToShow.style.visibility == 'hidden') {
               elemToShow.style.visibility = 'visible';
               if (document.getElementById('c'+ASHToolssIds[toolID[i]])) document.getElementById('c'+ASHToolssIds[toolID[i]]).style.visibility='visible';
            }
            else {
               elemToShow.style.visibility = 'hidden'; 
               if (document.getElementById('c'+ASHToolssIds[toolID[i]])) document.getElementById('c'+ASHToolssIds[toolID[i]]).style.visibility='hidden';
            }
         }
      }
   }
}

unsafeWindow.showHide = function(fID){

   var elemToShow = document.getElementById(fID);
   var elemTrigger = document.getElementById(ASHToolssIds[0]);
   if (elemToShow.style.visibility == 'hidden') {
      elemToShow.style.visibility = 'visible'; elemTrigger.innerHTML='<<';
   }
   else {
      elemToShow.style.visibility = 'hidden'; elemTrigger.innerHTML='>>';
   }
}

addAstraToolsMenu();


//**********************************************************************************

//---------------------- Mejoras Embajada ------------------------

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
  es: {'newAlert': 'Nueva Alerta', 'newTotal': 'Total nuevos miembros', 'aband': 'Abandono', 'totAban': 'Total abandonos', 'confirm': 'Realmente quieres resetear los puntos guardados?'},
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
