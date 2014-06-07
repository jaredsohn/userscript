// ==UserScript==
// @name            IkariamScoreDB
// @namespace       userscripts.org
// @homepage        http://userscripts.org/scripts/show/76465
// @description     Displays a selected players score in the Info section when either their town is selected on the map, or you are viewing their town.
// @include         http://*.ikariam.*/*
// @exclude         http://board.ikariam.*/*
// @require         http://userscripts.org/scripts/source/94724.user.js
// @version     0.3
//
// @history         0.3 Due to PhasmaExMachina hacked scripts updated @require link of Script Updater to a copy maintained by me.
// @history         0.2 fixed own score, added ScriptUpdater
// @history         0.1 Initial release
//
// ==/UserScript==

//**************************************************************************************************************
//GLOBAL VARS
//**************************************************************************************************************
var version = 0.2;
var page = document.getElementsByTagName('body')[0].id;
var lang;
var serDom;
var playerDB;
var baseDivCreated = false;
var scoreTypes = ['army', 'gold', 'offense', 'defense'];
var scoreShown = false;

//**************************************************************************************************************
//Check for Update
//**************************************************************************************************************
ScriptUpdater.check(76465, version);


//**************************************************************************************************************
//COMMON FUNCTIONS
//**************************************************************************************************************
isDefined = function (myvar) {
   if (typeof(myvar) != 'undefined') {
      return true;
   }
   return false;
};

getElementsByClass = function(inElement, className, findIn) {
   var all = inElement.getElementsByTagName('*');
   var elements = [];
   for (var e = 0; e < all.length; e++)
   {
      if (findIn)
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

function insertAfter(newElement,targetElement) {
   var parent = targetElement.parentNode;

   if(parent.lastchild == targetElement)
   {
      parent.appendChild(newElement);
   } else {
      parent.insertBefore(newElement, targetElement.nextSibling);
   }
}

function fmtNumber(n) {
   n += "";
   for (var i = (n.length - 3); i > 0; i -= 3)
   {
      n = n.slice(0, i) +","+ n.slice(i);
   }
   return n;
}

function numberToDate(n) {
   var d = new Date(parseInt(n, 10));
   var arrayDate = [d.getDate(), d.getMonth(), d.getFullYear(d), d.getHours(), d.getMinutes(), d.getSeconds()];
   var output = '';
   for (var i = 0; i < arrayDate.length; i++) {
      if (arrayDate[i] < 10) {
         output += '0' + arrayDate[i];
      } else {
         output += arrayDate[i];
      }
      if (i < 2) {
         output += '.';
      }
      if (i > 2 && i < 5) {
         output += ':';
      }
      if (i == 2) {
         output += ' ';
      }
   }
   return output;
}

readGM_Value = function (GM_ValueName, id, type) {
   var temp = GM_getValue(GM_ValueName);
   if (isDefined(temp.split(';id=' + id)[1])) {
      temp = temp.split(';id=' + id)[1].split(';')[0];
      if (isDefined(temp.split(type + '=')[1])) {
         temp = temp.split(type + '=')[1].split('&')[0];
         return temp;
      } else {
         return false;
      }
   } else {
      return false;
   }
};

addGM_Value = function (GM_ValueName, value) {
   var temp = GM_getValue(GM_ValueName);
   if (isDefined(temp)) {
      temp = temp + ';' + value;
   } else {
      temp = value;
   }
   GM_setValue(GM_ValueName, temp);
};

updateGM_Value = function (GM_ValueName, id, type, newValue) {
   var temp = GM_getValue(GM_ValueName);
   temp = temp.split(';');
   for (var i = 0; i < temp.length; i++) {
      if (temp[i].search('id=' + id) != -1) {
         var temp2 = temp[i].split(type + '=');
         if (isDefined(temp2[1])) {
            temp[i] = temp2[0] + type + '=' + newValue;
            temp2 = temp2[1];
            if (isDefined(temp2.split('&'))) {
               temp2 = temp2.split('&');
               temp2[0] = '';
               temp2 = temp2.join('&');
            }
         } else {
            temp[i] = temp2[0] + '&' + type + '=' + newValue;
         }
      }
   }
   temp = temp.join(';');
   GM_setValue(GM_ValueName, temp);
};

function deleteGM_Values() {
  var GMValues = GM_listValues();
  alert(GMValues);
  for (var i = 0; i < GMValues.length; i++) {
  GM_deleteValue(GMValues[i]);
  }
}

function getIkaDomain(s) {
   var spl = s.toLowerCase().split(".");
   return (spl[1] != 'ikariam' ? spl[1] : spl[spl.length - 1]);
}

function getIkaServer(s) {
   return s.toLowerCase().split(".")[0];
}



//**************************************************************************************************************
//iniScript
//**************************************************************************************************************
function iniScript (reset) {
   if (!isDefined(GM_getValue(playerDB)) || reset) {
      GM_setValue('IISexpireTime', '12h');
      GM_setValue('playerIIS' +serDom, '');
      for (i = 0; i < scoreTypes.length; i++)
      {
         GM_setValue(scoreTypes[i] + serDom, -1);
         GM_setValue(scoreTypes[i], i + 1);
      }
      alert(lang.firstInstall);
      window.document.location.href = 'http://' + top.location.host + '/index.php?view=options';
   }
}

//**************************************************************************************************************
//requestScore
//**************************************************************************************************************
function requestScore(playerName, type, onload) {
   var ikaType = '';
   switch(type)
   {
      case 'army':
      ikaType = 'army_score_main';
      break;
      case 'gold':
      ikaType = 'trader_score_secondary';
      break;
      default:
      ikaType = type;
      break;
   }
   GM_xmlhttpRequest({
      method: 'POST',
      url: 'http://' + top.location.host + '/index.php',
      data: 'view=highscore&highscoreType=' + ikaType + '&searchUser=' + playerName,
      headers:
      {
         'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
         'Content-type': 'application/x-www-form-urlencoded',
         'Accept': 'application/atom+xml,application/xml,text/xml',
         'Referer': 'http://' + top.location.host + '/index.php',
         'Cookie': document.cookie
      },
      onload: onload
   });
}

//**************************************************************************************************************
//processScore
//**************************************************************************************************************
function processScore(player, type, responseText) {
   var scoreValue = 0;
   var hiddenDiv = document.createElement('div');
   hiddenDiv.setAttribute('style', 'display: hidden;');
   document.body.appendChild(hiddenDiv);
   hiddenDiv.innerHTML = responseText;
   var score = getElementsByClass(hiddenDiv, 'score', false);
   var pname = getElementsByClass(hiddenDiv, 'name', false);
   for (var i = 0; i < pname.length; i++)
   {
      if (pname[i].innerHTML == player.name)
      {
         scoreValue = score[i].innerHTML;
      }
   }
   document.body.removeChild(hiddenDiv);
   document.getElementById(type).innerHTML = scoreValue;
   //store score in cache
   GM_setValue(type + serDom, parseInt(scoreValue.replace(/,/g, ''), 10));
   //boolean readyCache
   var readyCache = true;
   for (i = 0; i < scoreTypes.length; i++)
   {
      if (GM_getValue(scoreTypes[i] + 'Check')) {
         readyCache = readyCache && (GM_getValue(scoreTypes[i] + serDom) > -1);
      }
   }
   if (readyCache)
   {
      for (i = 0; i < scoreTypes.length; i++)
      {
         if (GM_getValue(scoreTypes[i] + 'Check')) {
            updateGM_Value(playerDB, player.id, scoreTypes[i], GM_getValue(scoreTypes[i] + serDom));
            GM_setValue(scoreTypes[i] + serDom, -1);
         }
      }
      updateGM_Value(playerDB, player.id, 'lastCheck', new Date().getTime());
   }
}

//**************************************************************************************************************
//updateScore
//**************************************************************************************************************
function updateScore(type, score) {
   document.getElementById(type).innerHTML = score;
}

function requestAlliance(allyId, onload)
{
    GM_xmlhttpRequest({
        method: 'POST',
        url: 'http://' + top.location.host + '/index.php',
        data: 'view=allyPage&allyId=' + allyId,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/atom+xml,application/xml,text/xml',
            'Referer': 'http://' + top.location.host + '/index.php',
            'Cookie': document.cookie
        },
        onload: onload
    });
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

//**************************************************************************************************************
//createBaseDiv
//**************************************************************************************************************
function createBaseDiv() {
    baseDivCreated = true;
    var scoreElement = document.createElement("div");
    scoreElement.setAttribute("id", "inlinescore");
    scoreElement.innerHTML =
      "<div class = 'footer'></div>" +
      "<h3 class = 'header'>Inline Score</h3>" +
      "<li style = 'margin: 2px 10px; font-size: 11px' class = 'ally'>" +
         "<span style = 'float: left; width: 200px;' class = 'textLabel'><strong>" + lang.allyscore + ": </strong></span>" +
         "<div id = 'ally_score'>" + lang.unknown + "</div>" +
      "</li>" +
      "<hr />" +
      "<li style = 'margin: 2px 10px; font-size: 11px' class = 'player'>" +
         "<span style = 'float: left;' class = 'textLabel'><strong>" + lang.score + ": </strong></span>" +
         "<div id = 'score'>" + lang.unknown + "</div>" +
      "</li>";
   for (var i = 0; i < scoreTypes.length; i++)
   {
      if (GM_getValue(scoreTypes[i] + 'Check')) {
         scoreElement.innerHTML += "<li style = 'margin: 2px 10px; font-size: 11px' class = 'player'>" +
            "<span style = 'float: left;' class = 'textLabel'>" + lang.scoreType[i] + ": </span>" +
            "<div id = '" + scoreTypes[i] + "'>" + lang.unknown + "</div>" +
            "</li>";
      }
   }
   scoreElement.innerHTML += "<li style = 'margin: 2px 10px; font-size: 11px; display: none' class = 'player'>" +
         "<span style = 'float: left;' class = 'textLabel'>" + lang.dataDate + ": </span>" +
         "<div id = 'checkedTime' style = 'color: rgb(67, 74, 147)'>" + lang.unknown + "</div>" +
      "</li>";
   insertAfter(scoreElement, document.getElementById('information'));
   scoreShown = true;
}

//**************************************************************************************************************
//getPlayerInfo
//**************************************************************************************************************
function getPlayerInfo() {
   var player = {
      id: 0,
      name: '',
      allyId: -1,
      score: -1
   };
   if (isDefined(getElementsByClass(document, 'owner', false)[0].innerHTML.split('avatarName=')[1])) {
      player.name = getElementsByClass(document, 'owner', false)[0].innerHTML.split('avatarName=')[1].split('&')[0].replace(/%20/g, ' ');
      player.id = getElementsByClass(document, 'owner', false)[0].innerHTML.split('avatarId=')[1].split('&')[0];
   } else {
      player.name = getElementsByClass(document, 'owner', false)[0].innerHTML.split('</span>')[1].split('<')[0].replace(/ /g, '').replace(/%20/g, ' ');
      player.id = 'mine';
   }
   if (isDefined(getElementsByClass(document, 'ally', false)[0].innerHTML.split('allyId=')[1])) {
      player.allyId = getElementsByClass(document, 'ally', false)[0].innerHTML.split('allyId=')[1].split('&')[0];
   }
   player.score = getElementsByClass(document, 'name', false)[1].innerHTML.split(/>/)[2].replace(/,/g, '');
   if (!readGM_Value(playerDB, player.id, 'name')) {
      var temp = 'id=' + player.id +
                  '&name=' + player.name +
                  '&allyId=' + player.allyId +
                  '&score=' + player.score +
                  '&army=0' + '&gold=0' + '&offense=0' + '&defense=0' + '&lastCheck=0';

      addGM_Value(playerDB, temp);
   } else {
      if (readGM_Value(playerDB, player.id, 'name') != player.name) {
         updateGM_Value(playerDB, player.id, 'name', player.name);
      }
      if (readGM_Value(playerDB, player.id, 'allyId') != player.allyId) {
         updateGM_Value(playerDB, player.id, 'allyId', player.allyId);
      }
      if (readGM_Value(playerDB, player.id, 'score') != player.score) {
         updateGM_Value(playerDB, player.id, 'score', player.score);
      }
   }
   return player;
}

//**************************************************************************************************************
//cityInformation
//**************************************************************************************************************
function cityInformation() {
   try
   {
      if (!document.getElementById("inlinescore"))
      {
         createBaseDiv();
      } else {
         document.getElementById('checkedTime').parentNode.setAttribute('style', 'margin: 2px 10px; font-size: 11px; display: none');
      }
      //Set the language
      lang = defineLanguage();
      //Remove the "points" information (as of 0.2.8)
      getElementsByClass(document.getElementById("infocontainer"), "name", false)[1].style.display = 'none';
      //Get the players name and allyId
      var player = getPlayerInfo();
      updateScore('score', fmtNumber(player.score));
      for (var i = 0; i < scoreTypes.length; i++)
      {
         if (GM_getValue(scoreTypes[i] + 'Check')) {
            updateScore(scoreTypes[i], lang.fetch);
            document.getElementById(scoreTypes[i]).setAttribute('style', 'color: rgb(84, 44, 15)');
         }
      }

      var checkedTime = (new Date().getTime() - (1000*60*60*(GM_getValue('IISexpireTime', '12h').replace('h', ''))));
      if (readGM_Value(playerDB, player.id, 'lastCheck') < checkedTime) {
         //alert('Datos desfasados');
         if (GM_getValue('armyCheck')) {
            requestScore(player.name, 'army', function(responseDetails)
            {
               processScore(player, 'army', responseDetails.responseText);
            });
         }
         if (GM_getValue('goldCheck')) {
            requestScore(player.name, 'gold', function(responseDetails)
            {
               processScore(player, 'gold', responseDetails.responseText);
            });
         }
         if (GM_getValue('offenseCheck')) {
            requestScore(player.name, 'offense', function(responseDetails)
            {
               processScore(player, 'offense', responseDetails.responseText);
            });
         }
         if (GM_getValue('defenseCheck')) {
            requestScore(player.name, 'defense', function(responseDetails)
            {
               processScore(player, 'defense', responseDetails.responseText);
            });
         }
      } else {
         //alert('Datos actuales');
         for (i = 0; i < scoreTypes.length; i++)
         {
            if (GM_getValue(scoreTypes[i] + 'Check')) {
               var temp_score = readGM_Value(playerDB, player.id, scoreTypes[i]);
               updateScore(scoreTypes[i], fmtNumber(temp_score));
               document.getElementById(scoreTypes[i]).setAttribute('style', 'color: rgb(67, 74, 147)');
            }
         }
         //insert data date
         document.getElementById('checkedTime').parentNode.setAttribute('style', 'margin: 2px 10px; font-size: 11px;');
         document.getElementById('checkedTime').innerHTML = numberToDate(readGM_Value(playerDB, player.id, 'lastCheck'));
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

//**************************************************************************************************************
//defineLanguage
//**************************************************************************************************************
defineLanguage = function () {
   var language;
   var domain = getIkaDomain(top.location.host);
   var spanish = ':ar:ve:cl:co:mx:pe:';
   if (spanish.indexOf(':' + domain + ':') != - 1) {
      domain = 'es';
   }

   if (isDefined(GM_getValue('IISLang'))) {
      if (domain != GM_getValue('IISLang')) {
         domain = GM_getValue('IISLang');
      }
   } else {
      GM_setValue('IISLang', domain);
   }

   switch (domain) {
      case "es":
         language = {
         firstInstall: "Gracias por probar IkariamScoreDB. Por favor, visita la p&acute; de opciones para configurar el script",
         newver: "Nueva versi&oacute;n disponible, haz click aqu&iacute; para actualizar",
         language: "Idioma",
         expireTime: "Caducidad datos",
         resetDB: "Borrar base de datos",
         saveconfig: "Guardar",
         fetch: "Cargando...",
         unknown: "Desconocido",
         allyscore: "Puntuaci&oacute;n Alianza",
         score: "Puntuaci&oacute;n",
         scoreType: ["Generales", "Oro", "Ofensiva", "Defensiva"],
         dataDate: "Fecha datos"};
         break;
      case "fr":
         language = {
         newver: "New version available, click to install",
         language: "Language",
         expireTime: "Check time",
         resetDB: "Reset IIS database",
         saveconfig: "Save",
         fetch: "Cargando...",
         unknown: "Unknown",
         allyscore: "Ally Score",
         score: "Points",
         military: "Troupes",
         gold: "Gold",
         offense: "Offensive",
         defense: "Defensive"};
         break;
      case "gr":
         language = {
         newver: "New version available, click to install",
         language: "Language",
         expireTime: "Check time",
         resetDB: "Reset IIS database",
         saveconfig: "Save",
         fetch: "ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â½ÃƒÅ½Ã‚Â¬ÃƒÅ½Ã‚ÂºÃƒÂÃ¢â‚¬Å¾ÃƒÅ½Ã‚Â·ÃƒÂÃ†â€™ÃƒÅ½Ã‚Â·...",
         unknown: "Unknown",
         allyscore: "Ally Score",
         score: "ÃƒÅ½Ã¢â‚¬â„¢ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â¸ÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â¿ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â¿ÃƒÅ½Ã‚Â³ÃƒÅ½Ã‚Â¯ÃƒÅ½Ã‚Â±",
         military: "ÃƒÅ½Ã‚Â£ÃƒÂÃ¢â‚¬Å¾ÃƒÂÃ‚ÂÃƒÅ½Ã‚Â±ÃƒÂÃ¢â‚¬Å¾ÃƒÅ½Ã‚ÂµÃƒÂÃ‚ÂÃƒÅ½Ã‚Â¼ÃƒÅ½Ã‚Â±ÃƒÂÃ¢â‚¬Å¾ÃƒÅ½Ã‚Â±",
         gold: "Gold",
         offense: "Offensive",
         defense: "Defensive"};
         break;
      case "de":
         language = {
         newver: "New version available, click to install",
         language: "Language",
         expireTime: "Check time",
         resetDB: "Reset IIS database",
         saveconfig: "Save",
         fetch: "Laden...",
         unknown: "Unknown",
         allyscore: "Ally Score",
         score: "Gesamtpunkte",
         military: "GenerÃƒÆ’Ã‚Â¤le",
         gold: "Gold",
         offense: "Offensive",
         defense: "Defensive"};
         break;
      case "tr":
         language = {
         newver: "New version available, click to install",
         language: "Language",
         expireTime: "Check time",
         resetDB: "Reset IIS database",
         saveconfig: "Save",
         fetch: "Yukleniyor...",
         unknown: "Unknown",
         allyscore: "Ally Score",
         score: "Toplam Puan",
         military: "Askeri Puan",
         gold: "Gold",
         offense: "Offensive",
         defense: "Defensive"};
         break;
      case "cz":
         language = {
         newver: "New version available, click to install",
         language: "Language",
         expireTime: "Check time",
         resetDB: "Reset IIS database",
         saveconfig: "Save",
         fetch: "nahrÃƒÆ’Ã‚Â¡vam...",
         unknown: "Unknown",
         allyscore: "Ally Score",
         score: "CelkovÃƒÆ’Ã‚Â© skÃƒÆ’Ã‚Â³re",
         military: "VojenskÃƒÆ’Ã‚Â© skÃƒÆ’Ã‚Â³re",
         gold: "Gold",
         offense: "Offensive",
         defense: "Defensive"};
         break;
      case "sk":
         language = {
         newver: "New version available, click to install",
         language: "Language",
         expireTime: "Check time",
         resetDB: "Reset IIS database",
         saveconfig: "Save",
         fetch: "nahrÃƒÆ’Ã‚Â¡vam...",
         unknown: "Unknown",
         allyscore: "Ally Score",
         score: "CelkovÃƒÆ’Ã‚Â© SkÃƒÆ’Ã‚Â³re",
         military: "VojenskÃƒÆ’Ã‚Â© skÃƒÆ’Ã‚Â³re",
         gold: "Gold",
         offense: "Offensive",
         defense: "Defensive"};
         break;
      case "tw":
         language = {
         newver: "New version available, click to install",
         language: "Language",
         expireTime: "Check time",
         resetDB: "Reset IIS database",
         saveconfig: "Save",
         fetch: "ÃƒÂ¨Ã‚Â®Ã¢â€šÂ¬ÃƒÂ¥Ã‚ÂÃ¢â‚¬â€œÃƒÂ¤Ã‚Â¸Ã‚Â­...",
         unknown: "Unknown",
         allyscore: "Ally Score",
         score: "ÃƒÂ§Ã‚Â¸Ã‚Â½ÃƒÂ§Ã‚Â©Ã‚ÂÃƒÂ¥Ã‹â€ Ã¢â‚¬Â ",
         military: "ÃƒÂ¦Ã‹â€ Ã‚Â°ÃƒÂ§Ã‹â€ Ã‚Â­ÃƒÂ¥Ã‚Â°Ã¢â‚¬Â¡ÃƒÂ¨Ã‚Â»Ã‚Â",
         gold: "Gold",
         offense: "Offensive",
         defense: "Defensive"};
         break;
      case "hu":
         language = {
         newver: "New version available, click to install",
         language: "Language",
         expireTime: "Check time",
         resetDB: "Reset IIS database",
         saveconfig: "Save",
         fetch: "TÃƒÆ’Ã‚Â¶ltÃƒÆ’Ã‚Â©s...",
         unknown: "Unknown",
         allyscore: "Ally Score",
         score: "ÃƒÆ’Ã¢â‚¬â€œsszpontszÃƒÆ’Ã‚Â¡m",
         military: "Katonai pont",
         gold: "Gold",
         offense: "Offensive",
         defense: "Defensive"};
         break;
      case "se":
         language = {
         newver: "New version available, click to install",
         language: "Language",
         expireTime: "Check time",
         resetDB: "Reset IIS database",
         saveconfig: "Save",
         fetch: "hÃƒÆ’Ã‚Â¤mtar...",
         unknown: "Unknown",
         allyscore: "Ally Score",
         score: "TotalpoÃƒÆ’Ã‚Â¤ng",
         military: "GeneralspoÃƒÆ’Ã‚Â¤ng",
         gold: "Gold",
         offense: "Offensive",
         defense: "Defensive"};
         break;
      case "pl":
         language = {
         newver: "New version available, click to install",
         language: "Language",
         expireTime: "Check time",
         resetDB: "Reset IIS database",
         saveconfig: "Save",
         fetch: "Ãƒâ€¦Ã‚Âadowanie...",
         unknown: "Unknown",
         allyscore: "Ally Score",
         score: "CaÃƒâ€¦Ã¢â‚¬Å¡kowity Wynik",
         military: "GeneraÃƒâ€¦Ã¢â‚¬Å¡owie",
         gold: "Gold",
         offense: "Offensive",
         defense: "Defensive"};
         break;
      case "ro":
         language = {
         newver: "New version available, click to install",
         language: "Language",
         expireTime: "Check time",
         resetDB: "Reset IIS database",
         saveconfig: "Save",
         fetch: "Incarc...",
         unknown: "Necunoscut",
         allyscore: "Scor Alianta",
         score: "Scor Total",
         military: "Scor Armata",
         gold: "Gold",
         offense: "Offensive",
         defense: "Defensive"};
         break;
      case "il":
         language = {
         newver: "New version available, click to install",
         language: "Language",
         expireTime: "Check time",
         resetDB: "Reset IIS database",
         saveconfig: "Save",
         fetch: "Ãƒâ€”Ã‹Å“Ãƒâ€”Ã¢â‚¬Â¢Ãƒâ€”Ã‚Â¢Ãƒâ€”Ã…Â¸...",
         unknown: "Unknown",
         allyscore: "Ally Score",
         score: "Ãƒâ€”Ã‚Â Ãƒâ€”Ã¢â€žÂ¢Ãƒâ€”Ã‚Â§Ãƒâ€”Ã¢â‚¬Â¢Ãƒâ€”Ã¢â‚¬Å“",
         military: "Ãƒâ€”Ã¢â‚¬ÂºÃƒâ€”Ã¢â‚¬â€ Ãƒâ€”Ã‚Â¦Ãƒâ€”Ã¢â‚¬ËœÃƒâ€”Ã‚ÂÃƒâ€”Ã¢â€žÂ¢",
         gold: "Gold",
         offense: "Offensive",
         defense: "Defensive"};
         break;
      case "vn":
         language = {
         newver: "New version available, click to install",
         language: "Language",
         expireTime: "Check time",
         resetDB: "Reset IIS database",
         saveconfig: "Save",
         fetch: "Ãƒâ€žÃ‚Âang tÃƒÂ¡Ã‚ÂºÃ‚Â£i...",
         unknown: "KhÃƒÆ’Ã‚Â´ng biÃƒÂ¡Ã‚ÂºÃ‚Â¿t",
         allyscore: "LiÃƒÆ’Ã‚Âªn minh",
         score: "TÃƒÂ¡Ã‚Â»Ã¢â‚¬Â¢ng Ãƒâ€žÃ¢â‚¬ËœiÃƒÂ¡Ã‚Â»Ã†â€™m",
         military: "QuÃƒÆ’Ã‚Â¢n sÃƒÂ¡Ã‚Â»Ã‚Â±",
         gold: "Gold",
         offense: "Offensive",
         defense: "Defensive"};
         break;
      case "fi":
         language = {
         newver: "New version available, click to install",
         language: "Language",
         expireTime: "Check time",
         resetDB: "Reset IIS database",
         saveconfig: "Save",
         fetch: "haetaan...",
         unknown: "Unknown",
         allyscore: "Ally Score",
         score: "Kokonaispisteet",
         military: "Sotilaspisteet",
         gold: "Gold",
         offense: "Offensive",
         defense: "Defensive"};
         break;
      case  "ae":
         language = {
         newver: "New version available, click to install",
         language: "Language",
         expireTime: "Check time",
         resetDB: "Reset IIS database",
         saveconfig: "Save",
         fetch: "Ãƒâ„¢Ã…Â ÃƒËœÃ‚Â¬Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¨...",
         unknown: "Unknown",
         allyscore: "Ãƒâ„¢Ã¢â‚¬Â Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â§ÃƒËœÃ‚Â· ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚ÂªÃƒËœÃ‚Â­ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã‚Â",
         score: "ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â¦ÃƒËœÃ‚Â¬Ãƒâ„¢Ã¢â‚¬Â¦Ãƒâ„¢Ã‹â€ ÃƒËœÃ‚Â¹ ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã†â€™Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã…Â ",
         military: "ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾Ãƒâ„¢Ã¢â‚¬Â Ãƒâ„¢Ã¢â‚¬Å¡ÃƒËœÃ‚Â§ÃƒËœÃ‚Â· ÃƒËœÃ‚Â§Ãƒâ„¢Ã¢â‚¬Å¾ÃƒËœÃ‚Â¹ÃƒËœÃ‚Â³Ãƒâ„¢Ã†â€™ÃƒËœÃ‚Â±Ãƒâ„¢Ã…Â Ãƒâ„¢Ã¢â‚¬Â¡",
         gold: "Gold",
         offense: "Offensive",
         defense: "Defensive"};
         break;
      case  "ba":
         language = {
         newver: "New version available, click to install",
         language: "Language",
         expireTime: "Check time",
         resetDB: "Reset IIS database",
         saveconfig: "Save",
         fetch: "dohvati...",
         unknown: "nemoguce",
         allyscore: "Bodovi Saveza",
         score: "Ukupni Rezultat",
         military: "Vojska",
         gold: "Gold",
         offense: "Offensive",
         defense: "Defensive"};
         break;
      default:
         language = {
         newver: "New version available, click to install",
         language: "Language",
         expireTime: "Check time",
         resetDB: "Reset IIS database",
         saveconfig: "Save",
         fetch: "Fetching...",
         unknown: "Unknown",
         allyscore: "Ally Score",
         score: "Total Score",
         scoreType: ["Military Score", "Gold", "Offensive", "Defensive"],
         dataDate: "Fecha datos"};
         break;
    }
    return language;
};

//**************************************************************************************************************
//optionsPage
//**************************************************************************************************************
function optionsPage() {
   var newElement = document.createElement('form');
   newElement.setAttribute('id', 'optionIIS');
   var innerHTMLTemp =
      "<div class='contentBox01h'>" +
         "<h3 class='header'>" +
            "<a href='http://userscripts.org/scripts/show/76465' target='_blank'>Ikariam Score DB v " + version + "</a>" +
            "<span style='font-size:10px;'>  by <a href='http://userscripts.org/users/hachichin/' target='_blank'>hachichin</a></span>" +
         "</h3>" +
         "<div class='content'>" +
            "<table cellpadding='0' cellspacing='0'>" +
               "<tbody>";

   for (var i = 0; i < scoreTypes.length; i++) {
      innerHTMLTemp += "<tr><th id='IISarmy'>" + lang.scoreType[i] + "</th>" +
      "<td><input type='checkbox' id='" + scoreTypes[i] + "Check'></td></tr>";
   }
   innerHTMLTemp += "<tr>" +
                     "<th id='IISexpireTime'>" + lang.expireTime + "</th>" +
                     "<td><select id='IISexpireTimeSelect'></select></td>"+
                  "</tr>" +
                  "<tr>" +
                     "<th id='IISlanguage'>" + lang.language + "</th>" +
                     "<td><select id='IISLanguageSelect'></select></td>"+
                  "</tr>" +
               "</tbody>" +
            "</table>" +
            "<div class='centerButton'>" +
               "<input class='button' id='resetIISDatabase' value='" + lang.resetDB + "'>" +
            "</div>" +
            "<div class='centerButton'>" +
               "<input class='button' id='saveIISOptions' value='" + lang.saveconfig + "'>" +
            "</div>" +
         "</div>" +
         "<div class='footer'></div>" +
      "</div>";
   newElement.innerHTML = innerHTMLTemp;

   document.getElementById('mainview').insertBefore(newElement, document.getElementById('vacationMode'));
   //Add languages
   var langtyp = ['en', 'es', 'fr', 'it'];
   var selOpt = false;
   for (var l = 0; l < langtyp.length; l++)
   {
       if (langtyp[l] == GM_getValue('IISLang')) {
         selOpt = true;
       } else {
         selOpt = false;
       }
       document.getElementById('IISLanguageSelect').options[l] = new Option(langtyp[l], langtyp[l], false, selOpt);
   }
   //Add hour
   var expireTime = ['3h', '6h', '12h', '24h', '36h', '48h'];
   selOpt = false;
   for (l = 0; l < expireTime.length; l++)
   {
       if (expireTime[l] == GM_getValue('IISexpireTime')) {
         selOpt = true;
       } else {
         selOpt = false;
       }
       document.getElementById('IISexpireTimeSelect').options[l] = new Option(expireTime[l], expireTime[l], false, selOpt);
   }
   //Control checkBoxes
   for (i = 0; i < scoreTypes.length; i++) {
      document.getElementById(scoreTypes[i] + 'Check').checked = GM_getValue(scoreTypes[i] + 'Check');
   }

   //Add buttons events
   document.getElementById('resetIISDatabase').addEventListener('click', function ()
   {
      GM_setValue('IISexpireTime', expireTime[2]);
      GM_setValue('playerIIS' +serDom, '');
      for (i = 0; i < scoreTypes.length; i++) {
          GM_setValue(scoreTypes[i] + 'Check', i);
          GM_setValue(scoreTypes[i] + serDom, -1);
      }
      document.getElementById('IISexpireTimeSelect').value = expireTime[2];
      document.getElementById('IISexpireTimeSelect').focus();
   }, false);
   document.getElementById('saveIISOptions').addEventListener('click', function ()
   {
      for (i = 0; i < scoreTypes.length; i++) {
         if (document.getElementById(scoreTypes[i] + 'Check').checked) {
            GM_setValue(scoreTypes[i] + 'Check', i + 1);
         } else {
            GM_setValue(scoreTypes[i] + 'Check', 0);
         }
      }
      GM_setValue('IISexpireTime', document.getElementById('IISexpireTimeSelect').value);
      GM_setValue('IISLang', document.getElementById('IISLanguageSelect').value);
      lang = defineLanguage();
      //change text to option page
      document.getElementById('IISexpireTime').innerHTML = lang.expireTime;
      document.getElementById('IISlanguage').innerHTML = lang.language;
      document.getElementById('resetIISDatabase').value = lang.resetDB;
      document.getElementById('saveIISOptions').value = lang.saveconfig;
      document.getElementById('IISexpireTimeSelect').focus();
   }, false);

}

function getMyID (){
   var myName = document.getElementById('options_userData').innerHTML.split('value="')[1].split('"')[0];
   var myId = document.getElementById('options_debug').innerHTML.split('<td>')[1].split('</td>')[0];
   if (!readGM_Value(playerDB, myId, 'name')) {
      var temp = 'id=mine' + '&idd=' + myId +
                  '&name=' + myName +
                  '&allyId=0' + '&score=0' + '&army=0' + '&gold=0' + '&offense=0' + '&defense=0' + '&lastCheck=0';

      addGM_Value(playerDB, temp);
   }
}

function init() {
   serDom = '.' + getIkaServer(top.location.host) + '.' + getIkaDomain(top.location.host);
   playerDB = 'playerIIS' + serDom;
   lang = defineLanguage();

   if (page == 'city') {
      iniScript(false);
   }
   if (page == 'options') {
      getMyID();
      optionsPage();
   }
   if (page == 'island') {
      var linkElements = document.getElementsByTagName('a');
      for (var i = 0; i < linkElements.length; i++)
      {
         if (linkElements[i].id.search(/city_[0-9]*/) != -1)
         {
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
}

init();