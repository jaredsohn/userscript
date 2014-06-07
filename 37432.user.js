// ==UserScript==

// @name           	MXCS_Tools

// @namespace     MXCS

// @description    Conjunto de herraminetas para la alianza MXCS

// @author         	Tolke.

//@include		http://*.ikariam.*/*

//@exclude	http://board.ikariam.*/*

// @version        	20081122 173000  v2.0

// ==/UserScript==

//-------------------------------------------------------------------------

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
'#transportBox { height: 20px; width: 200px; position: relative; margin:-185px 29px -18px 615px; z-index:99; display:block;}');
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



//**************************************************************************


//------------------ Menu Enlaces -------------------------

   var MXCSToolsIds  = new Array("opclos","FontForm","buscaBox","worldBox");
   var tagsAModifar  = new Array("A","SPAN");
   var diaLimite     = 2;
   var cookieIKO     = 'IKAFONT';
   var cookie_SEPARA = '|';
   var Css_MenuIKO_String = 
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
      
//Esta funcion es cuasi estandar en muchos scripts de GS
   if(!window.addGlobalStyle) {
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

function addAstraToolsMenu(){

   var xTags = document.getElementsByTagName('LI');
   var xLi   = null;
   var astreaToolsLink       = document.createElement('LI');
   astreaToolsLink.setAttribute('id', 'TCSTool');
   
   for(i=0;i<xTags.length;i++){
      xLi = xTags[i];
      if (xLi.className == 'help') {
         xLi.parentNode.appendChild(astreaToolsLink,xLi);
         addGlobalStyle(Css_MenuIKO_String);
         document.getElementById('TCSTool').innerHTML =

         '<div id="menu">'
         + '<ul>'
         + ' <li><h2>MXCS Tools</h2>'
         + '   <ul>'
         + '     <li><center><a target="_blank" href="http://maximuscharruas.activoforo.com/forum.htm" Foro de la Alianza MXCS ">Foro MXCS</a></li>'
         //+ '     <li><center><a target="_blank" href="http://thecharruas.foroslatin.com/" title=" Foro de la Aliansa TCS ">Foro The Charruas</a></li>'
         + '     <li><center><a target="_blank" href="http://www.swfupload.com/view/124887.htm" target="_blank" title=" Compactador de batallas avanzado">Compactador de batallas Avanzado</a></li>'
         + '     <li><center><a target="_blank" href="http://www.compactador.com.ar/IK/" target="_blank" title=" Compactador de batallas basico">Compactador de batallas Basico</a></li>'
         + '     <li><center><a target="_blank" href="http://ikariam.ogame-world.com/es/" title=" Buscador informacion y calculadora">Buscador y Calculadora</a></li>'
         + '     <li><center><a target="_blank" href="http://www.serpini.es/chivakariam" title=" Buscador acuerdos comerciales">Acuerdos comerciales</a></li>'
         + '     <li><center><a target="" href="http://s1.ikariam.es/index.php?view=sendAllyMessage&oldView=embassy&id=39137&position=6&type=50" title="Envia mensaje Circular">Mensaje Circular</a></li>'
         + '		<li><center><a target="" href="http://s1.ikariam.es/index.php?view=sendMessage&oldView=embassy&id=9919&position=10&with=11959&receiverName=Lord%20Brujo" title="Contactar con el Lider">Lider</a></li>'
         + '		<li><center><a target="" href="http://s1.ikariam.es/index.php?view=sendMessage&oldView=embassy&id=9919&position=10&with=19690&receiverName=Ashika" title="Contactar con la Ministra">Ministra</a></li>'
         + '		<li><center><a target="" href="http://s1.ikariam.es/index.php?view=sendMessage&oldView=embassy&id=9919&position=10&with=12006&receiverName=junno" title="Contactar con el General">General</a></li>'
         + '		<li><center><a target="" href="http://s1.ikariam.es/index.php?view=sendMessage&oldView=embassy&id=9919&position=10&with=19688&receiverName=Sebastien" title="Contactar con el Diplomatico">Diplomatico</a></li>'
         + '   </ul>'
         + ' </li>'
         +'</ul>';
         +'</DIV>';
         break;
      }
   }
}


unsafeWindow.showTools = function(){

   var toolID = arguments;
   var elemToShow = null;
   for (var i = 0; i < arguments.length; i++) {
      elemToShow = document.getElementById(MXCSToolsIds[toolID[i]]);
      if (elemToShow) {
         if ((toolID[i] == 0) || (toolID[i] == 1)) {
            if (document.getElementById(MXCSToolsIds[0]).style.visibility == 'hidden') {
               document.getElementById(MXCSToolsIds[0]).style.visibility = 'visible';
               document.getElementById(MXCSToolsIds[1]).style.visibility = 'visible';
               if (document.getElementById('c'+MXCSToolsIds[0])) document.getElementById('c'+MXCSToolsIds[0]).style.visibility='visible';
            } 
            else {
               document.getElementById(MXCSToolsIds[0]).style.visibility = 'hidden';
               document.getElementById(MXCSToolsIds[1]).style.visibility = 'hidden';
               if (document.getElementById('c'+MXCSToolsIds[0])) document.getElementById('c'+MXCSToolsIds[0]).style.visibility='hidden';
            } 
         } 
         else {
            if (elemToShow.style.visibility == 'hidden') {
               elemToShow.style.visibility = 'visible'; 
               if (document.getElementById('c'+MXCSToolsIds[toolID[i]])) document.getElementById('c'+MXCSToolsIds[toolID[i]]).style.visibility='visible';
            }
            else {
               elemToShow.style.visibility = 'hidden'; 
               if (document.getElementById('c'+MXCSToolsIds[toolID[i]])) document.getElementById('c'+MXCSToolsIds[toolID[i]]).style.visibility='hidden';
            }
         }
      }
   }
}

unsafeWindow.showHide = function(fID) {

   var elemToShow = document.getElementById(fID);
   var elemTrigger = document.getElementById(MXCSToolsIds[0]);
   if (elemToShow.style.visibility == 'hidden') {
      elemToShow.style.visibility = 'visible'; elemTrigger.innerHTML='<<';
   }

 else {elemToShow.style.visibility = 'hidden'; elemTrigger.innerHTML='>>';}

}

addAstraToolsMenu();

//-------------------------------------------------------------------------

//**********************************************************************************