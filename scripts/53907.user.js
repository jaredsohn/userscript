{\rtf1\ansi\ansicpg1252\deff0\deflang1046{\fonttbl{\f0\fswiss\fcharset0 Arial;}}
{\*\generator Msftedit 5.41.15.1515;}\viewkind4\uc1\pard\f0\fs20 // ==UserScript==\par
// @name           ReiDoCrime\par
// @namespace      TheJappa\par
// @autor          The Jappa\par
// @description    Basicamente exibe algumas informa\'e7\'f5es de forma amig\'e1vel e tem o recurso AutoPlay que joga para voc\'ea. [ Script em desenvolvimento ]\par
// @include        http://*reidocrime.com/*\par
// ==/UserScript==\par
\par
/*\par
\par
Este script est\'e1 em desenvolvimento mas j\'e1 tem algumas coisas legais:\par
\par
1) Mostra a hora no Brasil que voc\'ea vai sair do Hospital ou da Cadeia\par
\par
2) Recursos AutoPlay que joga pra voc\'ea\par
- Recarrega stamina automaticamente\par
- Faz os principais roubos (que d\'e3o mais lucro) at\'e9 chegar no limite do risco\par
- Quando chega no limite do risco ele faz as principais atividades que diminuem o risco (ajudar as pessoas)\par
- Se tiver policial, mudar de mapa\par
- Quando acabar as op\'e7\'f5es de a\'e7\'e3o (roubo/ajuda), mudar de mapa\par
\par
-----------------------------------------------------\par
TO-DO\par
\par
- Montar tela de configura\'e7\'e3o na p\'e1gina do profile\par
. Intervalo entre as a\'e7\'f5es\par
. Editar lista das a\'e7\'f5es de risco\par
. Editar lista das a\'e7\'f5es sem risco\par
. Editar link do caf\'e9\par
. Timezone para converter as horas\par
\par
*/\par
\par
var userLife;\par
var userStamina;\par
var userRisk;\par
var userToxic;\par
var userQuest;\par
\par
var userAttack;\par
var userRespect;\par
var userIntelect;\par
var userStrength;\par
var userSexapeal;\par
var userCash;\par
\par
// Flag se AutPlay est\'e1 ativo\par
var autoPlay;\par
\par
// Intervalo entre uma jogada e outra (milisegundos)\par
var autoPlayInterval = 2000;\par
\par
// Nivel minimo para tomar caf\'e9\par
var autoPlayMinStamina = 30;\par
\par
// Nivel maximo e m\'ednimo do risco para come\'e7ar a ajudar ou roubar as pessoas\par
var autoPlayUpRiskLimit = 200;\par
var autoPlayDownRiskLimit = 10;\par
\par
// Dire\'e7\'e3o do AutoPlay (upRisk = Roubar / downRisk = Ajudar)\par
var autoPlayDirection;\par
\par
// Id do elemento HTML que exibe o log\par
var autoPlayLogId;\par
\par
// Link ativo que ser\'e1 disparado\par
var autoPlayActiveLink;\par
\par
// Url do caf\'e9\par
var autoPlayCoffee = "drink-cafe/5";\par
\par
// Url do policial\par
var autoPlayCop = "cop.give";\par
\par
// Lista de URL para subir o risco (roubar)\par
var autoPlayUpRiskOrder = new Array();\par
\par
autoPlayUpRiskOrder[0] = "newcar.rob";\par
\par
// Lista de URL para baixar o risco (ajudar)\par
var autoPlayDownRiskOrder = new Array();\par
\par
autoPlayDownRiskOrder[0] = "mother.help";\par
autoPlayDownRiskOrder[1] = "drunk.soberize";\par
autoPlayDownRiskOrder[2] = "shaft.move";\par
autoPlayDownRiskOrder[3] = "garbage.clean";\par
autoPlayDownRiskOrder[4] = "postman.rob";\par
autoPlayDownRiskOrder[5] = "postman.cheat";\par
autoPlayDownRiskOrder[6] = "postman.help";\par
autoPlayDownRiskOrder[7] = "shaft.move";\par
autoPlayDownRiskOrder[8] = "dog.help";\par
autoPlayDownRiskOrder[9] = "drugdealer.police";\par
autoPlayDownRiskOrder[10] = "soccerboy.play";\par
autoPlayDownRiskOrder[11] = "lazyboy.pillow";\par
autoPlayDownRiskOrder[12] = "drunk.cash";\par
autoPlayDownRiskOrder[13] = "kid.school";\par
\par
// Lista de dire\'e7\'e3o para percorrer os mapas\par
var autoPlayMapOrderIdx;\par
var autoPlayMapOrder = new Array();\par
\par
// Ele vai dar a volta nos mapas adjacentes e voltar para sua rua\par
autoPlayMapOrder[0] = "west";\par
autoPlayMapOrder[1] = "north";\par
autoPlayMapOrder[2] = "east";\par
autoPlayMapOrder[3] = "east";\par
autoPlayMapOrder[4] = "south";\par
autoPlayMapOrder[5] = "south";\par
autoPlayMapOrder[6] = "west";\par
autoPlayMapOrder[7] = "west";\par
autoPlayMapOrder[8] = "north-east";\par
\par
// ============================================================= [ Cookie ] ===\par
\par
function getCookie(c_name)\par
\{\par
  if ( document.cookie.length > 0 )\par
  \{\par
    c_start = document.cookie.indexOf(c_name + "=");\par
    if (c_start != -1)\par
    \{\par
      c_start = c_start + c_name.length + 1;\par
      c_end = document.cookie.indexOf(";",c_start);\par
      if (c_end == -1) c_end = document.cookie.length;\par
      return unescape(document.cookie.substring(c_start,c_end));\par
    \}\par
  \}\par
  return "";\par
\}\par
\par
function setCookie(c_name,value,expiredays)\par
\{\par
  var exdate = new Date();\par
  exdate.setDate(exdate.getDate() + expiredays);\par
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires="+exdate.toGMTString());\par
\}\par
\par
// ============================================================= [ Data Function ] ===\par
\par
function getDate( sDate ) \{\par
\par
    /*\par
    28.05.2009 10:26:08 ???\par
    01234567891111111111222\par
              0123456789012\par
    */\par
\par
    var nDay = parseInt(sDate.substr(0,2));\par
    var nMon = parseInt(sDate.substr(3,2)) - 1; // os meses no javascript come\'e7am no 0\par
    var nYea = parseInt(sDate.substr(6,4));\par
\par
    // A hora do jogo est\'e1 em +2 .. \par
    //     s\'f3 que no Brasil \'e9 -3 .. \par
    //           por isso faz -5 horas ...\par
    var nHou = parseInt(sDate.substr(11,2)) - 5; \par
    var nMin = parseInt(sDate.substr(14,2));\par
    var nSec = parseInt(sDate.substr(17,2));\par
\par
    var dDate = new Date();\par
    dDate.setDate(nDay);\par
    dDate.setMonth(nMon);\par
    dDate.setFullYear(nYea);\par
    dDate.setHours(nHou);\par
    dDate.setMinutes(nMin);\par
    dDate.setSeconds(nSec);\par
    \par
    return dDate;\par
\par
\}\par
\par
// ============================================================= [ Extract User Data ] ===\par
\par
function extractUserProps (sSearch) \{\par
  var oDiv = document.getElementById('props');\par
  var aDiv = oDiv.getElementsByClassName(sSearch);\par
  var oVal = (aDiv.length>0) ? aDiv[0].firstChild : null ;\par
  \par
  return ( oVal ) ? oVal.data : null ;\par
\par
\}\par
\par
function extractUserValue (sSearch) \{\par
  var oDiv = document.getElementById('props');\par
  var aDiv = oDiv.getElementsByClassName(sSearch);\par
\par
  if( aDiv.length > 0 )\par
  \{\par
     var aEm = aDiv[0].getElementsByTagName('em');\par
     return (aEm.length>0) ? aEm[0].innerHTML : null ;\par
  \}\par
\par
  return null;\par
\}\par
\par
// ============================================================= [ Get Action Link ] ===\par
\par
function getActionLink(sSearch) \{\par
\par
  var oDiv = document.getElementById('menus-container');\par
  var aA = oDiv.getElementsByTagName('a');\par
        \par
  for (var i = 0; i < aA.length; i++) \{\par
    if (aA[i].href.match(sSearch) != null) \{\par
      return aA[i].href;\par
    \}\par
  \}\par
  \par
  return "";\par
  \par
\}\par
\par
function getUserMapLink() \{\par
  var oDiv = document.getElementById('usrtools');\par
  var aA = oDiv.getElementsByClassName('street');\par
  return ( aA.length > 0 ) ? aA[0].href : "";\par
\}\par
\par
function getMapDirectionLink() \{\par
  var oDiv = document.getElementById('map');\par
  var aA = oDiv.getElementsByClassName(autoPlayMapOrder[autoPlayMapOrderIdx]);\par
  \par
  if( aA.length > 0 )\par
  \{\par
  \tab // seta a proxima dire\'e7\'e3o\par
  \tab autoPlayMapOrderIdx = (autoPlayMapOrderIdx + 1) % autoPlayMapOrder.length;\par
  \tab setCookie("AutoPlayMapIdx__",autoPlayMapOrderIdx);\par
  \tab return aA[0].href;\par
  \}\par
  \par
  return "";\par
\}\par
\par
// ============================================================= [ Auto Play ON ] ===\par
\par
function activeLink(sUrl)\par
\{\par
   window.location = sUrl;\par
\}\par
\par
function autoPlayOn()\par
\{\par
   if( autoPlay )\par
   \{\par
      // Se tem um link definido, ent\'e3o roda ele ...\par
      if( autoPlayActiveLink ) activeLink( autoPlayActiveLink );\par
      \par
      // ******************************************\par
      //\par
      // Se n\'e3o tem link definido ... ent\'e3o analisa cen\'e1rio para on AutoPlay\par
      //\par
      \par
      var oLog = document.getElementById(autoPlayLogId);\par
      var success = false;\par
      \par
      // verifica se est\'e1 na tela da cidade\par
      \par
      if( !document.getElementById('map') )\par
      \{\par
          oLog.innerHTML = "AutoPlay ON (N\'e3o est\'e1 na cidade!)";\par
          autoPlayActiveLink = getUserMapLink();\par
          autoPlayInterval = 60000; // espera 1 minuto para tentar novamente\par
\par
          setCookie("AutoPlayMapIdx__",0); // zera a dire\'e7\'e3o do mapa\par
      \}\par
      \par
      // verifica se tem policia\par
      \par
      else if( getActionLink(autoPlayCop).length > 0 )\par
      \{\par
          oLog.innerHTML = "AutoPlay ON (Policial!)<br>Mudando para " + autoPlayMapOrder[autoPlayMapOrderIdx];\par
          autoPlayActiveLink = getMapDirectionLink();\par
      \}\par
      \par
      // verifica se precisa de caf\'e9\par
      \par
      else if( userStamina < autoPlayMinStamina )\par
      \{\par
         oLog.innerHTML = "AutoPlay ON (Caf\'e9!)";\par
         autoPlayActiveLink = getActionLink(autoPlayCoffee);\par
      \}\par
      \par
      // verifica se \'e9 para abaixar o risco\par
      \par
      else if( autoPlayDirection == "downRisk" )\par
      \{\par
      \tab  for(var i=0; i<autoPlayDownRiskOrder.length; i++)\par
      \tab  \{\par
      \tab      autoPlayActiveLink = getActionLink(autoPlayDownRiskOrder[i]);\par
      \tab      \par
      \tab      if( autoPlayActiveLink.length > 0 )\par
      \tab      \{\par
      \tab         success = true;  \par
      \tab         break;\par
      \tab      \}\par
      \tab  \}\par
      \tab  \par
      \tab  if( success )\par
      \tab  \{\par
             // Se sucesso, ent\'e3o exibe o link que ser\'e1 clicado\par
             oLog.innerHTML = autoPlayActiveLink;\par
      \tab  \}\par
      \tab  else\par
\tab  \{\tab\par
             // Sen\'e3o, exibe mensagem e muda de mapa     \par
\tab      oLog.innerHTML = "AutoPlay ON (Acabou DownRisk!)<br>Mudando para " + autoPlayMapOrder[autoPlayMapOrderIdx];\par
             autoPlayActiveLink = getMapDirectionLink();\par
      \tab  \}\par
      \}\par
      \par
      // verifica se \'e9 para aumentar o risco\par
      \par
      else if( autoPlayDirection == "upRisk" )\par
      \{\par
      \tab  for(var i=0; i<autoPlayUpRiskOrder.length; i++)\par
      \tab  \{\par
      \tab      autoPlayActiveLink = getActionLink(autoPlayUpRiskOrder[i]);\par
      \tab      \par
      \tab      if( autoPlayActiveLink.length > 0 )\par
      \tab      \{\par
                success = true;  \par
                break;\par
      \tab      \}\par
      \tab  \}\par
      \tab  \par
      \tab  if( success )\par
      \tab  \{\par
      \tab     // Se sucesso, ent\'e3o exibe o link que ser\'e1 clicado\par
      \tab     oLog.innerHTML = autoPlayActiveLink;\par
      \tab  \}\par
      \tab  else\par
      \tab  \{\par
      \tab     // Sen\'e3o, exibe mensagem e muda de mapa\par
            oLog.innerHTML = "AutoPlay ON (Acabou UpRisk!)<br>Mudando para " + autoPlayMapOrder[autoPlayMapOrderIdx];\par
             autoPlayActiveLink = getMapDirectionLink();\par
      \tab  \}\par
      \par
      \}\par
      \par
      // se passou por tudo e chegou at\'e9 aqui, ent\'e3o alguma coisa deu errado\par
      \par
      else\par
      \{\par
          autoPlayStartStop();\par
          oLog.innerHTML += " (Sem tratamento!)";\par
      \}      \par
\par
      // Aguarda o tempo definido para refazer a an\'e1lise\par
      setTimeout( autoPlayOn, autoPlayInterval );      \par
   \}\par
\}\par
\par
// ============================================================= [ Auto Play Start/Stop ] ===\par
\par
function autoPlayStartStop()\par
\{\par
  autoPlay = !autoPlay;\par
  \par
  setCookie("AutoPlay__",((autoPlay)?"1":"0"));\par
  \par
  if( autoPlay ) autoPlayOn();\par
  else document.getElementById(autoPlayLogId).innerHTML = "AutoPlay OFF";\par
\}\par
\par
// ============================================================= [ Get Status ] ===\par
\par
function getStatus() \{\par
\par
  var success = false;\par
  var newText = document.createElement('span');\par
  \par
  var oDivProps = document.getElementById('props');\par
  var aDivStatus = oDivProps.getElementsByClassName('mystatus');\par
  \par
  if( aDivStatus.length == 0 ) return;\par
  \par
  var oDivStatus = aDivStatus[0];\par
  \par
  var aA = oDivStatus.getElementsByTagName('a');\par
  \par
  if( aA.length > 0 )\par
  \{\par
    var href = aA[0].href;\par
    \par
    if( href.match("hospital") )\par
    \{\par
      var tempo = aA[0].getElementsByTagName('span')[0].getAttribute('title');\par
      newText.innerHTML = "No hospital at\'e9 " + getDate(tempo);\par
    \}\par
    else if( href.match("jail") )\par
    \{\par
      var tempo = aA[0].getElementsByTagName('span')[0].getAttribute('title');\par
      newText.innerHTML = "Na cadeia at\'e9 " + getDate(tempo);\par
    \}\par
    else if( href.match("map") )\par
    \{\par
      var text = aA[0].innerHTML;\par
      newText.innerHTML = "Status " + text;\par
    \}\par
    \par
    success = ( newText.innerHTML.length > 0 )\par
  \}\par
  \par
  if( !success ) newText.innerHTML = "Status n\'e3o identificado";\par
      \par
  return newText;\par
\par
\}\par
\par
// ============================================================= [ Get Log Object ] ===\par
\par
function getLogObj() \{\par
\par
  autoPlayLogId = Date();\par
\par
  var newText = document.createElement('span');\par
      newText.id = autoPlayLogId;\par
      newText.innerHTML = (autoPlay)?"AutoPlay ON (Inicializando...)":"AutoPlay OFF";\par
     \par
  return newText;\par
\par
\}\par
\par
// ============================================================= [ Get Start/Stop Button ] ===\par
\par
function getStartStopButton() \{\par
\par
  var newButton = document.createElement('input');\par
      newButton.type = "button";\par
      newButton.value = "AutoPlay";\par
      \par
      if( newButton.addEventListener ) newButton.addEventListener("click",autoPlayStartStop,false);\par
      else newButton.onclick = autoPlayStartStop;\par
     \par
  return newButton;\par
\par
\}\par
\par
// ============================================================= [ Get Next Map Direction ] ===\par
\par
function getNextMapDirection() \{\par
\par
  var newText = document.createElement('span');\par
      newText.innerHTML = "Pr\'f3xima dire\'e7\'e3o do mapa: " + autoPlayMapOrder[autoPlayMapOrderIdx];\par
     \par
  return newText;\par
\}\par
\par
// ============================================================= [ Build Data Div ] ===\par
\par
function builDataDiv() \{\par
\par
  var oDivProps = document.getElementById('props');\par
  \par
  var newDiv = document.createElement('div');\par
      newDiv.style.position = "absolute";\par
      newDiv.style.color = "white";\par
      newDiv.style.left = "0px";\par
      newDiv.style.top = "330px";\par
      newDiv.style.backgroundColor = "black";\par
      newDiv.style.opacity = 0.85;\par
      newDiv.style.filter = "alpha(opacity=85)";\par
      \par
  newDiv.appendChild(getLogObj());\par
  newDiv.appendChild(document.createElement('br'));\par
  newDiv.appendChild(document.createElement('br'));\par
  newDiv.appendChild(getNextMapDirection());\par
  newDiv.appendChild(document.createElement('br'));\par
  newDiv.appendChild(document.createElement('br'));\par
  newDiv.appendChild(getStatus());\par
  newDiv.appendChild(document.createElement('br'));\par
  newDiv.appendChild(document.createElement('br'));\par
  newDiv.appendChild(getStartStopButton());\par
  \par
  oDivProps.appendChild(newDiv);\par
  \par
\}\par
\par
// ============================================================= [ Initialize ] ===\par
\par
function init()\par
\{\par
\tab userLife    = parseInt(extractUserValue("life"));\par
\tab userStamina = parseInt(extractUserValue("stamina"));\par
\tab userRisk    = parseInt(extractUserValue("risk"));\par
\tab userToxic   = extractUserValue("toxic");\par
\tab userQuest   = extractUserValue("quest");\par
\par
\tab userAttack   = extractUserProps("attack1");\par
\tab userRespect  = extractUserProps("respect");\par
\tab userIntelect = extractUserProps("intelect");\par
\tab userStrength = extractUserProps("strength");\par
\tab userSexapeal = extractUserProps("sexapeal");\par
\tab userCash     = extractUserProps("cash");\par
\tab\par
\tab // -------------\par
\tab\par
\tab var tempIdx = getCookie("AutoPlayMapIdx__");\par
\tab autoPlayMapOrderIdx = ( tempIdx && tempIdx.length > 0 ) ? parseInt(tempIdx) : 0;\par
\par
\tab setCookie("AutoPlayMapIdx__",autoPlayMapOrderIdx);\par
\tab\par
\tab // -------------\par
\tab\par
\tab var tempDirection = getCookie("AutoPlayDirection__");\par
        autoPlayDirection = ( tempDirection && tempDirection.length > 0 ) ? tempDirection : "upRisk";\par
        \par
        if( autoPlayDirection == "upRisk" && userRisk > autoPlayUpRiskLimit ) autoPlayDirection = "downRisk";\par
        if( autoPlayDirection == "downRisk" && userRisk < autoPlayDownRiskLimit ) autoPlayDirection = "upRisk";\par
        \par
        setCookie("AutoPlayDirection__",autoPlayDirection);\par
        \par
        // -------------\par
\par
\tab var statusAutoPlay = getCookie("AutoPlay__");\par
\tab\par
\tab if( statusAutoPlay && statusAutoPlay.length > 0 ) \par
\tab\{\par
\tab    // Se foi definido, entao considera o que foi definido\par
\tab    autoPlay = (statusAutoPlay == "1");\par
\tab\}\par
\tab else\par
\tab\{\par
\tab    // Sen\'e3o, considera o AutoPlay desligado (zero)\par
\tab    setCookie("AutoPlay__","0");\par
\tab    autoPlay = false;\par
\tab\}\par
\par
\tab // -------------\par
\par
\tab builDataDiv();\par
\tab if( autoPlay ) autoPlayOn();\par
\}\par
\par
init();\par
}
