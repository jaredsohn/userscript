// ==UserScript==
// @name           ReiDoCrime
// @namespace      Elisson
// @autor          Elisson Santos
// @description    Basicamente exibe algumas informações de forma amigável e tem o recurso AutoPlay que joga para você. [ Script em desenvolvimento ]
// @include        http://*reidocrime.com/*
// ==/UserScript==

/*

Este script está em desenvolvimento mas já tem algumas coisas legais:

1) Mostra a hora no Brasil que você vai sair do Hospital ou da Cadeia

2) Recursos AutoPlay que joga pra você
- Recarrega stamina automaticamente
- Faz os principais roubos (que dão mais lucro) até chegar no limite do risco
- Quando chega no limite do risco ele faz as principais atividades que diminuem o risco (ajudar as pessoas)
- Se tiver policial, mudar de mapa
- Quando acabar as opções de ação (roubo/ajuda), mudar de mapa

-----------------------------------------------------
TO-DO

- Montar tela de configuração na página do profile
. Intervalo entre as ações
. Editar lista das ações de risco
. Editar lista das ações sem risco
. Editar link do café
. Timezone para converter as horas

*/

var userLife;
var userStamina;
var userRisk;
var userToxic;
var userQuest;

var userAttack;
var userRespect;
var userIntelect;
var userStrength;
var userSexapeal;
var userCash;

// Flag se AutPlay está ativo
var autoPlay;

// Intervalo entre uma jogada e outra (milisegundos)
var autoPlayInterval = 2000;

// Nivel minimo para tomar café
var autoPlayMinStamina = 60;

// Nivel maximo e mínimo do risco para começar a ajudar ou roubar as pessoas
var autoPlayUpRiskLimit = 200;
var autoPlayDownRiskLimit = 50;

// Direção do AutoPlay (upRisk = Roubar / downRisk = Ajudar)
var autoPlayDirection;

// Id do elemento HTML que exibe o log
var autoPlayLogId;

// Link ativo que será disparado
var autoPlayActiveLink;

// Url do café
var autoPlayCoffee = "drink-cafe/5";

// Url do policial
var autoPlayCop = "cop.give";

// Lista de URL para subir o risco (roubar)
var autoPlayUpRiskOrder = new Array();

autoPlayUpRiskOrder[0] = "bully.rob";
autoPlayUpRiskOrder[1] = "newcar.rob";


// Lista de URL para baixar o risco (ajudar)
var autoPlayDownRiskOrder = new Array();

autoPlayDownRiskOrder[0] = "dog.help"; 
autoPlayDownRiskOrder[1] = "soccerboy.play"; 
autoPlayDownRiskOrder[2] = "shaft.move"; 
autoPlayDownRiskOrder[3] = "garbage.clean"; 
autoPlayDownRiskOrder[4] = "mother.help"; 
autoPlayDownRiskOrder[5] = "kid.school"; 
autoPlayDownRiskOrder[6] = "drugdealer.police"; 
autoPlayDownRiskOrder[7] = "drunk.soberize"; 
autoPlayDownRiskOrder[8] = "lazyboy.pillow"; 


// Lista de direção para percorrer os mapas
var autoPlayMapOrderIdx;
var autoPlayMapOrder = new Array();

// Ele vai dar a volta nos mapas adjacentes e voltar para sua rua
autoPlayMapOrder[0] = "west";
autoPlayMapOrder[1] = "north";
autoPlayMapOrder[2] = "east";
autoPlayMapOrder[3] = "east";
autoPlayMapOrder[4] = "south";
autoPlayMapOrder[5] = "south";
autoPlayMapOrder[6] = "west";
autoPlayMapOrder[7] = "west";
autoPlayMapOrder[8] = "north-east";

// ============================================================= [ Cookie ] ===

function getCookie(c_name)
{
  if ( document.cookie.length > 0 )
  {
    c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1)
    {
      c_start = c_start + c_name.length + 1;
      c_end = document.cookie.indexOf(";",c_start);
      if (c_end == -1) c_end = document.cookie.length;
      return unescape(document.cookie.substring(c_start,c_end));
    }
  }
  return "";
}

function setCookie(c_name,value,expiredays)
{
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires="+exdate.toGMTString());
}

// ============================================================= [ Data Function ] ===

function getDate( sDate ) {

    /*
    28.05.2009 10:26:08 ???
    01234567891111111111222
              0123456789012
    */

    var nDay = parseInt(sDate.substr(0,2));
    var nMon = parseInt(sDate.substr(3,2)) - 1; // os meses no javascript começam no 0
    var nYea = parseInt(sDate.substr(6,4));

    // A hora do jogo está em +2 .. 
    //     só que no Brasil é -3 .. 
    //           por isso faz -5 horas ...
    var nHou = parseInt(sDate.substr(11,2)) - 5; 
    var nMin = parseInt(sDate.substr(14,2));
    var nSec = parseInt(sDate.substr(17,2));

    var dDate = new Date();
    dDate.setDate(nDay);
    dDate.setMonth(nMon);
    dDate.setFullYear(nYea);
    dDate.setHours(nHou);
    dDate.setMinutes(nMin);
    dDate.setSeconds(nSec);
    
    return dDate;

}

// ============================================================= [ Extract User Data ] ===

function extractUserProps (sSearch) {
  var oDiv = document.getElementById('props');
  var aDiv = oDiv.getElementsByClassName(sSearch);
  var oVal = (aDiv.length>0) ? aDiv[0].firstChild : null ;
  
  return ( oVal ) ? oVal.data : null ;

}

function extractUserValue (sSearch) {
  var oDiv = document.getElementById('props');
  var aDiv = oDiv.getElementsByClassName(sSearch);

  if( aDiv.length > 0 )
  {
     var aEm = aDiv[0].getElementsByTagName('em');
     return (aEm.length>0) ? aEm[0].innerHTML : null ;
  }

  return null;
}

// ============================================================= [ Get Action Link ] ===

function getActionLink(sSearch) {

  var oDiv = document.getElementById('menus-container');
  var aA = oDiv.getElementsByTagName('a');
        
  for (var i = 0; i < aA.length; i++) {
    if (aA[i].href.match(sSearch) != null) {
      return aA[i].href;
    }
  }
  
  return "";
  
}

function getUserMapLink() {
  var oDiv = document.getElementById('usrtools');
  var aA = oDiv.getElementsByClassName('street');
  return ( aA.length > 0 ) ? aA[0].href : "";
}

function getMapDirectionLink() {
  var oDiv = document.getElementById('map');
  var aA = oDiv.getElementsByClassName(autoPlayMapOrder[autoPlayMapOrderIdx]);
  
  if( aA.length > 0 )
  {
  	// seta a proxima direção
  	autoPlayMapOrderIdx = (autoPlayMapOrderIdx + 1) % autoPlayMapOrder.length;
  	setCookie("AutoPlayMapIdx__",autoPlayMapOrderIdx);
  	return aA[0].href;
  }
  
  return "";
}

// ============================================================= [ Auto Play ON ] ===

function activeLink(sUrl)
{
   window.location = sUrl;
}

function autoPlayOn()
{
   if( autoPlay )
   {
      // Se tem um link definido, então roda ele ...
      if( autoPlayActiveLink ) activeLink( autoPlayActiveLink );
      
      // ******************************************
      //
      // Se não tem link definido ... então analisa cenário para on AutoPlay
      //
      
      var oLog = document.getElementById(autoPlayLogId);
      var success = false;
      
      // verifica se está na tela da cidade
      
      if( !document.getElementById('map') )
      {
          oLog.innerHTML = "AutoPlay ON (Não está na cidade!)";
          autoPlayActiveLink = getUserMapLink();
          autoPlayInterval = 60000; // espera 1 minuto para tentar novamente

          setCookie("AutoPlayMapIdx__",0); // zera a direção do mapa
      }
      
      // verifica se tem policia
      
      else if( getActionLink(autoPlayCop).length > 0 )
      {
          oLog.innerHTML = "AutoPlay ON (Policial!)<br>Mudando para " + autoPlayMapOrder[autoPlayMapOrderIdx];
          autoPlayActiveLink = getMapDirectionLink();
      }
      
      // verifica se precisa de café
      
      else if( userStamina < autoPlayMinStamina )
      {
         oLog.innerHTML = "AutoPlay ON (Café!)";
         autoPlayActiveLink = getActionLink(autoPlayCoffee);
      }
      
      // verifica se é para abaixar o risco
      
      else if( autoPlayDirection == "downRisk" )
      {
      	 for(var i=0; i<autoPlayDownRiskOrder.length; i++)
      	 {
      	     autoPlayActiveLink = getActionLink(autoPlayDownRiskOrder[i]);
      	     
      	     if( autoPlayActiveLink.length > 0 )
      	     {
      	        success = true;  
      	        break;
      	     }
      	 }
      	 
      	 if( success )
      	 {
             // Se sucesso, então exibe o link que será clicado
             oLog.innerHTML = autoPlayActiveLink;
      	 }
      	 else
	 {	
             // Senão, exibe mensagem e muda de mapa     
	     oLog.innerHTML = "AutoPlay ON (Acabou DownRisk!)<br>Mudando para " + autoPlayMapOrder[autoPlayMapOrderIdx];
             autoPlayActiveLink = getMapDirectionLink();
      	 }
      }
      
      // verifica se é para aumentar o risco
      
      else if( autoPlayDirection == "upRisk" )
      {
      	 for(var i=0; i<autoPlayUpRiskOrder.length; i++)
      	 {
      	     autoPlayActiveLink = getActionLink(autoPlayUpRiskOrder[i]);
      	     
      	     if( autoPlayActiveLink.length > 0 )
      	     {
                success = true;  
                break;
      	     }
      	 }
      	 
      	 if( success )
      	 {
      	    // Se sucesso, então exibe o link que será clicado
      	    oLog.innerHTML = autoPlayActiveLink;
      	 }
      	 else
      	 {
      	    // Senão, exibe mensagem e muda de mapa
            oLog.innerHTML = "AutoPlay ON (Acabou UpRisk!)<br>Mudando para " + autoPlayMapOrder[autoPlayMapOrderIdx];
             autoPlayActiveLink = getMapDirectionLink();
      	 }
      
      }
      
      // se passou por tudo e chegou até aqui, então alguma coisa deu errado
      
      else
      {
          autoPlayStartStop();
          oLog.innerHTML += " (Sem tratamento!)";
      }      

      // Aguarda o tempo definido para refazer a análise
      setTimeout( autoPlayOn, autoPlayInterval );      
   }
}

// ============================================================= [ Auto Play Start/Stop ] ===

function autoPlayStartStop()
{
  autoPlay = !autoPlay;
  
  setCookie("AutoPlay__",((autoPlay)?"1":"0"));
  
  if( autoPlay ) autoPlayOn();
  else document.getElementById(autoPlayLogId).innerHTML = "AutoPlay OFF";
}

// ============================================================= [ Get Status ] ===

function getStatus() {

  var success = false;
  var newText = document.createElement('span');
  
  var oDivProps = document.getElementById('props');
  var aDivStatus = oDivProps.getElementsByClassName('mystatus');
  
  if( aDivStatus.length == 0 ) return;
  
  var oDivStatus = aDivStatus[0];
  
  var aA = oDivStatus.getElementsByTagName('a');
  
  if( aA.length > 0 )
  {
    var href = aA[0].href;
    
    if( href.match("hospital") )
    {
      var tempo = aA[0].getElementsByTagName('span')[0].getAttribute('title');
      newText.innerHTML = "No hospital até " + getDate(tempo);
    }
    else if( href.match("jail") )
    {
      var tempo = aA[0].getElementsByTagName('span')[0].getAttribute('title');
      newText.innerHTML = "Na cadeia até " + getDate(tempo);
    }
    else if( href.match("map") )
    {
      var text = aA[0].innerHTML;
      newText.innerHTML = "Status " + text;
    }
    
    success = ( newText.innerHTML.length > 0 )
  }
  
  if( !success ) newText.innerHTML = "Status não identificado";
      
  return newText;

}

// ============================================================= [ Get Log Object ] ===

function getLogObj() {

  autoPlayLogId = Date();

  var newText = document.createElement('span');
      newText.id = autoPlayLogId;
      newText.innerHTML = (autoPlay)?"AutoPlay ON (Inicializando...)":"AutoPlay OFF";
     
  return newText;

}

// ============================================================= [ Get Start/Stop Button ] ===

function getStartStopButton() {

  var newButton = document.createElement('input');
      newButton.type = "button";
      newButton.value = "AutoPlay";
      
      if( newButton.addEventListener ) newButton.addEventListener("click",autoPlayStartStop,false);
      else newButton.onclick = autoPlayStartStop;
     
  return newButton;

}

// ============================================================= [ Get Next Map Direction ] ===

function getNextMapDirection() {

  var newText = document.createElement('span');
      newText.innerHTML = "Próxima direção do mapa: " + autoPlayMapOrder[autoPlayMapOrderIdx];
     
  return newText;
}

// ============================================================= [ Build Data Div ] ===

function builDataDiv() {

  var oDivProps = document.getElementById('props');
  
  var newDiv = document.createElement('div');
      newDiv.style.position = "absolute";
      newDiv.style.color = "white";
      newDiv.style.left = "0px";
      newDiv.style.top = "330px";
      newDiv.style.backgroundColor = "black";
      newDiv.style.opacity = 0.85;
      newDiv.style.filter = "alpha(opacity=85)";
      
  newDiv.appendChild(getLogObj());
  newDiv.appendChild(document.createElement('br'));
  newDiv.appendChild(document.createElement('br'));
  newDiv.appendChild(getNextMapDirection());
  newDiv.appendChild(document.createElement('br'));
  newDiv.appendChild(document.createElement('br'));
  newDiv.appendChild(getStatus());
  newDiv.appendChild(document.createElement('br'));
  newDiv.appendChild(document.createElement('br'));
  newDiv.appendChild(getStartStopButton());
  
  oDivProps.appendChild(newDiv);
  
}

// ============================================================= [ Initialize ] ===

function init()
{
	userLife    = parseInt(extractUserValue("life"));
	userStamina = parseInt(extractUserValue("stamina"));
	userRisk    = parseInt(extractUserValue("risk"));
	userToxic   = extractUserValue("toxic");
	userQuest   = extractUserValue("quest");

	userAttack   = extractUserProps("attack1");
	userRespect  = extractUserProps("respect");
	userIntelect = extractUserProps("intelect");
	userStrength = extractUserProps("strength");
	userSexapeal = extractUserProps("sexapeal");
	userCash     = extractUserProps("cash");
	
	// -------------
	
	var tempIdx = getCookie("AutoPlayMapIdx__");
	autoPlayMapOrderIdx = ( tempIdx && tempIdx.length > 0 ) ? parseInt(tempIdx) : 0;

	setCookie("AutoPlayMapIdx__",autoPlayMapOrderIdx);
	
	// -------------
	
	var tempDirection = getCookie("AutoPlayDirection__");
        autoPlayDirection = ( tempDirection && tempDirection.length > 0 ) ? tempDirection : "upRisk";
        
        if( autoPlayDirection == "upRisk" && userRisk > autoPlayUpRiskLimit ) autoPlayDirection = "downRisk";
        if( autoPlayDirection == "downRisk" && userRisk < autoPlayDownRiskLimit ) autoPlayDirection = "upRisk";
        
        setCookie("AutoPlayDirection__",autoPlayDirection);
        
        // -------------

	var statusAutoPlay = getCookie("AutoPlay__");
	
	if( statusAutoPlay && statusAutoPlay.length > 0 ) 
	{
	   // Se foi definido, entao considera o que foi definido
	   autoPlay = (statusAutoPlay == "1");
	}
	else
	{
	   // Senão, considera o AutoPlay desligado (zero)
	   setCookie("AutoPlay__","0");
	   autoPlay = false;
	}

	// -------------

	builDataDiv();
	if( autoPlay ) autoPlayOn();
}

init();
