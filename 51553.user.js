//
// version 0.5.7
// 2008-11-03
// Copyright (c) 2008, ImmortalNights
// Special Enhancements: wphilipw
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
// select "IkariamScoreLinker", and click Uninstall.
//
// --------------------------------------------------------------------
//
// Version History:
// 0.3.0: Original Public Release
// ==================================================
// 0.4.0: Island View & Bugfixes
// 0.4.1: Description change, Generals Version update
// 0.4.5: Bugfixes, Script combination (versions)
// 0.4.6: Changed the image sizes to 16x16
// 0.4.7: Implemented 'checkAlreadyShown' to prevent the icon displaying multiple times
// ==================================================
// 0.5.0: Inline Score Display Option (AJAX)
// 0.5.2: Defaults of text inline now set. Icons and text have headers. Options link always shown
// 0.5.3: Code clean up, Money Score option & Options dialog
// 0.5.4: Previous score details are saved, so that they are not updated if the same town is viewed.
// 0.5.5: BugFix for multiple scores + timeout for saved scores (10min)
// 0.5.6: BugFix: "undefined" scores (timestamp too long, now stored in string)
// 0.5.7: Options on Options page, no longer inline
// 
// --------------------------------------------------------------------
//
// This script places an icon to the right of a players 
// name after selecting their town on the Island overview, 
// or when viewing their Town. This icon links the user to
// the scoreboard, where you can see the players score.
//
// Feel free to have a go yourself; as long as you leave
// a little credit, and of course publish for the players
// of Ikariam!
//
// This script was originally created by ImmortalNights, 
// and further edited and enhanced by wphilipw.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           IkariamScoreLinker
// @namespace      ikariamScript
// @description    Adds a link to the Scoreboard besides a players name after selecting their town on the Island Overview or when viewing their Town.
// @include        http://*.ikariam.*/*
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
    if (cityInformation) 
    {
      var listElements = cityInformation.getElementsByTagName('li');
      if (listElements.length > 0) 
      {
         cityInformation_fn();
      } else {
        var listElements = document.getElementById('cities');
	if (listElements){
	  islaInformation_fn();
	}
/* El else lo ejecuta cuando pulsamos sobre el boton del mundo	
	else 
	  alert('Mundo') */
      }
    }
    var linkElements = document.getElementsByTagName('a');
    for (var i = 0; i < linkElements.length; i++) {
        if (linkElements[i].id.search(/city_[0-9]*/) != -1) {
            linkElements[i].addEventListener('click', function() { window.setTimeout(cityInformation_fn, 1); }, false);
        }
    }
}

/* Funciones de vgomez*/ 

function CojerValorCookie(indice) {  
    //indice indica el comienzo del valor  
    var galleta = document.cookie  
    //busca el final del valor, dado por ;, a partir de indice  
    var finDeCadena = galleta.indexOf(";", indice)  
    //si no existe el ;, el final del valor lo marca la longitud total de la cookie  
    if (finDeCadena == -1)  
        finDeCadena = galleta.length  
  
    return unescape(galleta.substring(indice, finDeCadena))  
    }  
  
function CojerCookie(nombre) {  
    var galleta = document.cookie  
    //construye la cadena con el nombre del valor  
    var arg = nombre + "="  
    var alen = arg.length           //longitud del nombre del valor  
    var glen = galleta.length       //longitud de la cookie  
  
    var i = 0  
    while (i < glen) {  
        var j = i + alen            //posiciona j al final del nombre del valor  
        if (galleta.substring(i, j) == arg) //si en la cookie estamo ya en nombre del valor       
            return CojerValorCookie(j)  //devuleve el valor, que esta a partir de j  
  
        i = galleta.indexOf(" ", i) + 1     //pasa al siguiente  
        if (i == 0)  
            break               //fin de la cookie  
    }  
    return null                 //no se encuentra el nombre del valor  
}  
//
// guarda una cookie
function GuardarCookie (nombre, valor, caducidad) {
	if(!caducidad)
	  caducidad = Caduca(0)

	//crea la cookie: incluye el nombre, la caducidad y la ruta donde esta guardada
	//cada valor esta separado por ; y un espacio
	document.cookie = nombre + "=" + escape(valor) + "; expires=" + caducidad + "; path=/"
}

//
// Busca una variable dentro de un array y devuelve la posicion
function buscarItem(lista, valor){
var ind, pos;
for(ind=0; ind<lista.length; ind++)
   {
    if (lista[ind] == valor)
      break;
    }
pos = (ind < lista.length)? ind : -1;
return (pos);
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
    opt_out += "\n<td style=\"width:43%;text-align:right\">Show Total Score:</td>";
    opt_out += "<td style=\"width:57%;\"><input type=\"checkbox\" id=\"scoreTotalOption\" ";
    if (whatToShow in {1:'', 3:'', 5:'', 7:''}) {
        opt_out += "checked=\"checked\" ";
    }
    opt_out += "/></td>\n</tr>";
    opt_out += "\n<tr>";
    opt_out += "<td style=\"width:43%;text-align:right\">Show Army Score:</td>";
    opt_out += "<td><input type=\"checkbox\" id=\"scoreMilOption\" ";
    if (whatToShow in {2:'', 3:'', 6:'', 7:''}) {
        opt_out += "checked=\"checked\" ";
    }
    opt_out += "/></td>\n</tr>";
    opt_out += "\n<tr>";
    opt_out += "<td style=\"width:43%;text-align:right\">Show Gold Score:</td>";
    opt_out += "<td><input type=\"checkbox\" id=\"scoreMonOption\" ";
    if (whatToShow in {4:'', 5:'', 6:'', 7:''}) {
        opt_out += "checked=\"checked\" ";
    }
    opt_out += "/></td>\n</tr>";
    opt_out += "\n<tr>";
    opt_out += "<td style=\"width:43%;text-align:right\">Show Score Inline:</td>";
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

/* VGOMEZZZZZZZZZZZZZZZZZZZZ
Sacar todos los datos de los jugadores de la isla
*/
function montaNameCookie(CoordenadaX, CoordenadaY) {
     var nameCookie= "Zeta"
     if (CoordenadaX<10)
	var nameCookie=nameCookie+"0"+CoordenadaX
     else
	var nameCookie=nameCookie+CoordenadaX;
     if (CoordenadaY<10)
	var nameCookie=nameCookie+"0"+CoordenadaY
     else
	var nameCookie=nameCookie+CoordenadaY;

     return nameCookie;
}

function islaInformation_fn() {

/* Coordenadas de la isla */
     var trabajo = document.getElementsByClass("island");
     var Coordenadas= new Array ();
     var CoordenadaX=0;
     var CoordenadaY=0;
     for (var e = 0; e < trabajo.length; e++){
	Coordenadas=trabajo[e].textContent.substring(0,205).replace(/^\s+|\s+$/g, '');
     }
     CoordenadaX=parseInt(Coordenadas.substring(Coordenadas.length-6, Coordenadas.length-4));
     if (isNaN(CoordenadaX)) {
       CoordenadaX=parseInt(Coordenadas.substring(Coordenadas.length-5, Coordenadas.length-3));
     } 
     if (isNaN(CoordenadaX)) {
       CoordenadaX=parseInt(Coordenadas.substring(Coordenadas.length-4, Coordenadas.length-3));
     } 
     CoordenadaY=parseInt(Coordenadas.substring(Coordenadas.length-3, Coordenadas.length-1));
     if (isNaN(CoordenadaY)) {
       CoordenadaY=parseInt(Coordenadas.substring(Coordenadas.length-2, Coordenadas.length));
     } 
     if (isNaN(CoordenadaY)) {
       CoordenadaY=parseInt(Coordenadas.substring(Coordenadas.length-2, Coordenadas.length-1));
     } 

     var nameCookie= montaNameCookie(CoordenadaX, CoordenadaY);


/* jugadores */
     var trabajo = document.getElementsByClass("owner");
     var jugadores= new Array ();
     for (var e = 0; e < trabajo.length; e++)
	jugadores[jugadores.length]=trabajo[e].textContent.substring(9,50).replace(/^\s+|\s+$/g, '');

/* ciudades */
     var trabajo = document.getElementsByClass("name");
     var ciudades= new Array ();
     for (var e = 0; e < trabajo.length; e++)
       if (trabajo[e].textContent.substring(0,6) == "Nombre")
 	 ciudades[ciudades.length]=trabajo[e].textContent.substring(8,50).replace(/^\s+|\s+$/g, '');

/* alianza */
     var trabajo = document.getElementsByClass("ally");
     var alianzas= new Array ();
     for (var e = 0; e < trabajo.length; e++)
       if (trabajo[e].textContent.substring(0,7) == "Alianza")
 	 alianzas[alianzas.length]=trabajo[e].textContent.substring(8,60).replace(/^\s+|\s+$/g, '');

/*     var txt='<table>';
     for (var e = 0; e < ciudades.length; e++)
       var txt = txt +'<tr><td>' + jugadores[e]+'</td><td>'+ciudades[e]+'</td><td>'+alianzas[e]+'</td></tr>';
       var txt1.innerHTML = txt +'</table>';
*/

/* CREAR CONTENEDOR DE JUGADORES  */
//Cabecera
var alia= new Array ("L-D");

  cabh3= document.createElement('h3');
  cabh3.id= 'cabh3';
  cabh3.className='header';
  cabh3.appendChild(document.createTextNode("Ciudadanos de "+Coordenadas));

  tablaGente= document.createElement('table');
  tablaGente.id = 'tablaGente';
  tablaGente.style.fontSize = '10px';
  tablaGente.align = 'center';
  tablaGente.border = '1';
  tablaGente.width = '95%';
  tablaGente.cellPadding='3';
  tablaGente.cellSpacing='2';

    fila=tablaGente.insertRow(0);
    fila.align='center';
    celda0=fila.insertCell(0);
    celda1=fila.insertCell(1);
    celda2=fila.insertCell(2);
    celda0.appendChild(document.createTextNode('JUGADOR'));
    celda1.appendChild(document.createTextNode('CIUDAD'));
    celda2.appendChild(document.createTextNode('ALIANZA'));
    fila.style.fontWeight='bold';

  var am =0;
  var en =0;
  var ob =0;
  for (var e = 0; e < ciudades.length; e++){
    fila=tablaGente.insertRow(e+1);
    celda0=fila.insertCell(0);
    celda1=fila.insertCell(1);
    celda2=fila.insertCell(2);
    celda0.appendChild(document.createTextNode(jugadores[e]));
    celda1.appendChild(document.createTextNode(ciudades[e]));
    celda2.appendChild(document.createTextNode(alianzas[e]));

    var a = alianzas[e];
    if (buscarItem(aliAmiga, alianzas[e])>=0){
        fila.style.background='#BBBBBB';
	am++;
    }
    if (buscarItem(aliEnemi, alianzas[e])>=0){
        fila.style.background='#00ff00';
        fila.style.color='#ff00ff';
	en++;
    }
    if (buscarItem(jugAmigo, jugadores[e])>=0){
        celda0.style.background='#ffffff';
        if (buscarItem(aliAmiga, alianzas[e])<0){
	  am++;
	}
    }
    if (buscarItem(jugObjetivo, jugadores[e])>=0){
        fila.style.background='#999999';
	ob++;
    }
    if (alianzas[e]=="L-D"){
        fila.style.background='#ffffff';
	am++;
    }
  }

  div = document.createElement("div");
  div.id='Gente';
  div.className= 'dynamic';
  div.appendChild(cabh3);

  div.appendChild(tablaGente);
  GuardarCookie(nameCookie, am+"("+en+")"+ob, 1);

  elemento2 = document.getElementById('mainview');
  elemento2.parentNode.insertBefore(div,elemento2);

  /* Montar cuadricula de islas de alrededor */

//
  tablaIslas= document.createElement('table');
  tablaIslas.id = 'tablaIslas';
  tablaIslas.style.fontSize = '10px';
  tablaIslas.align = 'center';
  tablaIslas.border = '1';
  tablaIslas.width = '95%';
  tablaIslas.cellPadding='3';
  tablaIslas.cellSpacing='2';

  for (var e = 1; e <6; e++){
    filaI=tablaIslas.insertRow(e-1);
    for (var ee = 1; ee <6; ee++){
      celdaI=filaI.insertCell(ee-1);
      var nameCookie= CojerCookie(montaNameCookie(CoordenadaX-3+ee, CoordenadaY-3+e));
      if (nameCookie){
        celdaI.appendChild(document.createTextNode(nameCookie));
	if ((nameCookie.substring(2, 1))==0){
          celdaI.style.background='#ff00ff';}

      } else
        celdaI.appendChild(document.createTextNode('?????'))
    }
  }
  cabh5= document.createElement('h3');
  cabh5.id= 'cabh5';
  cabh5.className='header';
  cabh5.appendChild(document.createTextNode("Islas de alrededor"));
  divI = document.createElement("div");
  divI.id='Islas';
  divI.className= 'dynamic';
  divI.appendChild(cabh5);

  divI.appendChild(tablaIslas);
  elemento2 = document.getElementById('mainview');
  elemento2.parentNode.insertBefore(divI,elemento2);

  /* si hay enemigos saco cabecera de enemigos */
  if (en>0){
    cabh4= document.createElement('h3');
    cabh4.id= 'cabh4';
    cabh4.className='header';
    cabh4.appendChild(document.createTextNode("¡¡¡ ALERTA ENEMIGOS EN LA ISLA!!!"));
    div4 = document.createElement("div");
    div4.id='CabEne';
    div4.className= 'dynamic';
    div4.appendChild(cabh4);
    elemento2 = document.getElementById('infocontainer');
    elemento2.parentNode.insertBefore(div4,elemento2);
  }

//
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
	var playerName2 = document.getElementsByClass("owner")[0].textContent.substring(9,40).replace(/^\s+|\s+$/g, '');
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
                scoreMainCont.innerHTML = scoreMainCont.innerHTML + "<div style=\"clear: both;\"></div><span style=\"font-weight: normal; margin-top: 3px;\" class=\"textLabel\">Total Score:</span><span style=\"float: left; font-weight: normal; margin-top: 3px;\" id=\"bod_tot_score\">fetching...</span>";
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
                scoreMainCont.innerHTML = scoreMainCont.innerHTML + "<div style=\"clear: both;\"></div>	<span style=\"font-weight: normal; margin-top: 3px;\" class=\"textLabel\">Sordaos:</span><span style=\"float: left; font-weight: normal; margin-top: 3px;\" id=\"bod_mil_score\">fetching...</span>";


// pruebas vgomez-------------------------------------------------------
                scoreMainCont.innerHTML = scoreMainCont.innerHTML + "<div style=\"clear: both;\"></div><span style=\"font-weight: normal; margin-top: 3px;\" class=\"textLabel\">Diplomacia</span><span style=\"float: left; font-weight: normal; margin-top: 3px;\" id=\"bod_diplomacia\">fetching...</span>";
// fin pruebas vgomez---------------------------------------------------


                if (playerName != GM_getValue("lastPlayerCheck") || GM_getValue("militaryScore") =='undefined' || GM_getValue("lastCheckedTimestamp") < (new Date().getTime() - (1000*60*10))) {
                    requestScore(playerName, 'army_score_main', function(responseDetails){
                      var mybox = document.createElement("div");
                      //mybox.setAttribute("style", "display: none;");
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
// pruebas vgomez-------------------------------------------------------
                      var palian = new Array();
                      for (var e = 0; e < all.length; e++)
                        if (all[e].className == "allyLink")
                          palian[palian.length] = all[e];
// fin pruebas vgomez---------------------------------------------------
                      for (var e = 0; e < pname.length; e++)
                        if (pname[e].innerHTML == playerName){
                          var militaryScore = score[e].innerHTML;
			  var DiplomacScore = palian[e].innerHTML;

			  if ("L-D"== DiplomacScore)
				DiplomacScore = "Delos";
			  if (buscarItem(aliEnemi, DiplomacScore)>=0)
				DiplomacScore = "ENEMIGO";
			  if (buscarItem(aliAmiga, DiplomacScore)>=0)
				DiplomacScore = "Aliado";
			  
			}
                      document.getElementById('bod_mil_score').innerHTML = militaryScore;

// pruebas vgomez-------------------------------------------------------
                      document.getElementById('bod_diplomacia').innerHTML = DiplomacScore;
// fin pruebas vgomez---------------------------------------------------


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
                scoreMainCont.innerHTML = scoreMainCont.innerHTML + "<div style=\"clear: both;\"></div><span style=\"font-weight: normal; margin-top: 3px;\" class=\"textLabel\">Perras:</span><span style=\"float: left; font-weight: normal; margin-top: 3px;\" id=\"bod_mon_score\">fetching...</span>";
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
      playerAllycont.innerHTML = playerAllycont.innerHTML + "<div style=\"clear: both;\"></div><div id=\"magicdiv\" style=\"clear: both; text-align: center;\"><span id=\"playertag\" title=\"Change score options\" style=\"cursor: pointer; text-decoration: underline;\">Score Options</span></div>";
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

    var aliAmiga = new Array("L-D", "Bleed", "BIeed");
    var aliEnemi = new Array("SGK", "PNX");
    var jugAmigo = new Array("VITXO");
    var jugObjetivo = new Array("luisete10");

if (document.getElementById('options_changePass')) {
    displayOnOptions_fn();
} else {
    if (typeof whatToShow  == 'undefined' || typeof inlineScore  == 'undefined') {
        setDefaults_fn();
    }
    init();
}