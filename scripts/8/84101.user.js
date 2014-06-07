// ==UserScript==
// @name Reply to alliance
// @namespace f.cavanna@gmail.com
// @description Agrega un boton 'Responder a alianza' en el detalle de los mensajes recibidos.
// @version 1.0.13
// @include http://s*.*.ikariam.com/index.php?view=diplomacyAdvisor*
// @include http://s*.*.ikariam.com/index.php?view=sendIKMessage&allyId=*&msgType=51
// @require http://sizzlemctwizzle.com/updater.php?id=84101&days=0
// ==/UserScript==

// Log:
// 2010-08-07 1.0.0 Federico
//   - El script ya inserta los botones en cada mensaje.
// 2010-08-09 1.0.1 Federico
//   - Agregadas funciones de manejo de cookies.
//   - Ahora el boton se crea como link y no como texto.
// 2010-08-13 1.0.2 Federico
//   - Ya obtengo el cuerpo del mensaje y guardo correctamente en las cookies el valor del mensaje del reply.
//   - Minimizadas funciones de manejo de cookies. Quite funcionalidad innecesaria.
// 2010-08-17 1.0.3 Federico
//   - Ya se discierne entre paginas (diplomacyAdvisor y sendIKMessage) y se carga el cuerpo del mensaje en sendIKMessage.
// 2010-08-18 1.0.4 Federico
//   - Ya se carga toda la informacion de mensaje formateada (asunto, fecha y remitente) en el cuerpo del mensaje.
//   - El script ya carga el id de alianza de querystring, lo actualiza y muestra mensajes al usuario para guiarlo durante la configuracion.
//   - Ahora al recibir por querystring el parametro d=1 el script elimina la cookie que guarda el id de alianza.
// 2010-08-18 1.0.5 Federico
//   - Corregi­ un error por el cual se mostraba el boton de Reply en los ofrecimientos de acuerdos culturales.
// 2010-08-19 1.0.6 Federico
//   - Ahora los rows de la tabla de mensajes se iteran de a 3. De esta manera solo evaluo los rows que contienen botones.
//   - Modifique la forma en que se identifica si el mensaje es un acuerdo cultural.
//   - Corregi un error por el cual se mostraba el boton de Reply en los ofrecimientos rechazados de acuerdos culturales.
// 2010-08-19 1.0.7 Federico
//   - Agregue el sistema de actualizacion automatica.
// 2010-08-20 1.0.8 Federico
//   - Modifique la forma en que los mensajes citaban a los anteriores. Ahora agrega '> ' al principio de cada linea.
//   - Agregue soporte para todos los servidores.
// 2010-08-21 1.0.9 Federico
//   - Ahora al cargar el mensaje en sendIKMessage posiciona el cursor en la primer línea.
// 2010-08-25 1.0.10 Federico
//   - Ahora el boton 'Responder a alianza' se muestra nada mas en los mensajes que pertenecen a la alianza, ignorando los mensajes personales.
//   - Removí el manejo de cookies para evitar su borrado por parte de Firefox. En su lugar se utilizan GM_getValue y GM_setValue del API de Greasemonkey.
// 2010-09-09 1.0.11 Federico
//   - Ahora se soportan múltiples alianzas para múltiples servidores, por si el usuario tiene varias cuentas.
// 2010-12-30 1.0.12 Federico
//   - Implementación de lenguaje.
// 2012-04-10 1.0.13 Federico
//   - Corrección para soportar nueva versión.

// Languages:
const langs = {
  es: {
    lang: 'Español',
    welcome: 'Bienvenido a Reply to alliance.\n' +
             'El script aún no pudo obtener los datos necesarios para su correcto funcionamiento. ' +
             'Por favor ingrese a la acción de "Enviar un mensaje a todos" en la Embajada para actualizar la información necesaria.',
    info_1: 'Se han eliminado correctamente los identificadores de alianza.',
    info_2: 'Reply to alliance ha actualizado correctamente el identificador de su alianza para éste servidor.',
    caption_1: '> El %1 escribió %2:\n',
    caption_2: 'Responder a alianza'
  },
  en: {
    lang: 'English',
    welcome: 'Wellcome to Reply to alliance.\n' +
             'The script failed to obtain necessary data for proper operation. ' +
             'Please enter "Circular reply" action in the Embassy to update the information.',
    info_1: 'Alliance identifiers has been deleted.',
    info_2: 'Reply to alliance has successfully updated the alliance identifier to handle this server.',
    caption_1: '> On the %1 %2 wrote:\n',
    caption_2: 'Reply to alliance'
  }
}

var fAllianceId, fLang;

function setupPage() {
  var serverIdQs, allianceIdQs;

  // Obtengo el lenguaje del dominio.
  fLang = getLang();

  // QA:
  if (getURLParam('d') == '1') {
    setVar('AlliancesInfo', '');
    alert(fLang.info_1 /* Se han eliminado correctamente los identificadores de alianza. */);
  }

  serverIdQs = getServerId();
  allianceIdQs = getURLParam('allyid');

  if (getURLParam('view') == 'diplomacyadvisor') {
     // Vista de mensajes.
     fAllianceId = getAllianceId(serverIdQs);
     if (fAllianceId > 0) {
        insertButtons();
     } else {
       alert(fLang.welcome /* Bienvenido. Por favor ingrese a la vista de "Enviar un mensaje a todos" para actualizar... */);
     }
  } else if (getURLParam('view') == 'sendikmessage') {
    // Actualmente estoy en una alianza?
    if (allianceIdQs != null) {
      // Ya tengo una alianza para este servidor? Es diferente que la que tengo guardada? Actualizo el identificador.
      if (getAllianceId(serverIdQs) > 0) {
         if (allianceIdQs != getAllianceId(serverIdQs)) {
            delAllianceInfo(serverIdQs);
            setAllianceInfo(serverIdQs, fAllianceId);
            alert(fLang.info_2 /* Reply to alliance ha actualizado correctamente el identificador de su alianza para éste servidor. */);
         }
      } else {
        // No tengo una alianza para el servidor y hay una en QS. Actualizo el identificador.
        setAllianceInfo(serverIdQs, allianceIdQs);
        alert(fLang.info_2 /* Reply to alliance ha actualizado correctamente el identificador de su alianza para éste servidor. */);
      }
      fAllianceId = getAllianceId(serverIdQs);
    } else {
      // No estoy en una alianza. Debo guardar un valor para q no vuelva a mostrarme el mensaje de configuración.
    }

    // Actualizo la informacion del mensaje
    fillMsgInfo();
  }
}

function getLang() {
  var svDom = getDomain();
  var spanish = ':ar:ve:cl:co:mx:pe:';
  var lang = null;
                    
  if (spanish.indexOf(':' + svDom + ':') != - 1) {
    lang = langs.en; // English
  } else {
    lang = langs.es; // Español
  }

  return lang;
}

function getServerId() {
  var svInfoList;
  var svId = -1;

  svInfoList = window.location.host.split( '.' );
  if (svInfoList != null) {
    svId = svInfoList[0].charAt(1);
  }

  return svId;
}

function getDomain() {
  var svInfoList;
  var svDes = null;

  svInfoList = window.location.host.split( '.' );
  if (svInfoList != null) {
    svDes = svInfoList[1];
  }
  return svDes;
}

function getAllianceId(serverId) {
  var res = null;
  var alliances, allianceCount, allianceInfo, i;

  if (serverId != null) {
    alliances = getVar('AlliancesInfo', '');
    allianceCount = alliances.split(";").length;
    // Itero las alianzas guardadas y encuentro la que corresponda a mi servidor.
    for (i=0; i<allianceCount; i++) {
      allianceInfo = alliances.split(";")[i];
      if ((allianceInfo.split(",")[0]) == serverId) {
        res = allianceInfo.split(",")[1];
        break;
      }
    }
  }
  return res;
}

function setAllianceInfo(serverId, allianceId) {
  var res = false;
  var alliances, allianceInfo;

  if ((serverId != null) && (allianceId != null)) {
    if (!getAllianceId(serverId)) {
       alliances = getVar('AlliancesInfo', '');
       allianceInfo = serverId + ',' + allianceId;
       if (alliances == '') {
          setVar('AlliancesInfo', allianceInfo);
       } else {
          setVar('AlliancesInfo', alliances + ';' + allianceInfo);
       }
       res = true;
    }
  }
  return res;
}

function delAllianceInfo(serverId) {
  var alliances, allianceCount, allianceInfo, i;
  var alliancesTmp = '';

  if (serverId != null) {
    alliances = getVar('AlliancesInfo', '');
    allianceCount = alliances.split(";").length;
    // Itero las alianzas guardadas y encuentro la que corresponda a mi servidor.
    for (i=0; i<allianceCount; i++) {
      allianceInfo = alliances.split(";")[i];
      if ((allianceInfo.split(",")[0]) != serverId) {
         alliancesTmp = alliancesTmp + allianceInfo + ';';
      }
    }
    // Remuevo el último ';'
    alliancesTmp = alliancesTmp.substring(0, alliancesTmp.length-1);
    setVar('AlliancesInfo', alliancesTmp);
  }
}

function fillMsgInfo() {
  var elmSubject, elmText, msgBody, msgSubject;

  // Muestro el asunto:
  elmSubject = document.getElementById('textSubject');
  if (elmSubject != null) {
    msgSubject = getVar('replyAllySubject', '');
    setVar('replyAllySubject', '');
    elmSubject.value = msgSubject;
  }

  // Muestro el mensaje:
  elmText = document.getElementsByTagName('textarea')[0];
  if (elmText != null) {
     msgBody = getBody();
     if (msgBody.length > 0) {
        elmText.value = msgBody;
     }
     // Posiciono el cursor en el primer char
     if(elmText.selectionStart) {
        elmText.focus();
        elmText.setSelectionRange(0, 0);
     }
  }
}

function getBody() {
  var msgBody, msgName, msgSubject, msgDateTime, msgHeader;

  // Obtengo el mensaje
  msgBody = getVar('replyAllyMsg', '');
  setVar('replyAllyMsg', '');

  if (msgBody != '') {
    // Obtengo remitente, asunto y fecha del mensaje y lo armo.
    msgName = getVar('replyAllyName', '');
    setVar('replyAllyName', '');
    msgSubject = getVar('replyAllySubject', '');
    setVar('replyAllySubject', '');
    msgDateTime = getVar('replyAllyDate', '');
    setVar('replyAllyDate', '');

    // Reemplazo los caracteres inválidos y agrego el header:
    msgBody = msgBody.replace(/<br>/gi, '');
    msgBody = msgBody.replace(/&gt;/gi, '>');

    // Reemplazo usuario y fecha
    msgHeader = fLang.caption_1; /* > El %1 escribió %2:\n */
    msgHeader = msgHeader.replace('%1', msgDateTime);
    msgHeader = msgHeader.replace('%2', msgName);

    // Armo el cuerpo del mensaje, header + body
    msgBody = msgHeader +
              msgBody;

    // Agrego los caracteres '> ' al principio de cada línea.
    msgBody = msgBody.replace(/\n/gi, '\n> ');

    msgBody = '\n\n' +
              msgBody;
  }

  return msgBody;
}

function insertButtons() {
  var i, elmTd, elmRow, elmSpan, elmBtn, aFunc, elmTable, elmRows;
  var elmCity, isPrivateMsg;

  elmTable = document.getElementsByTagName("table")[1];
  elmRows = elmTable.rows;

  // Cada mensaje se compone de 3 rows (informacion i-2, mensaje i-1, botones i).
  // Itero por todos los rows que contengan los botones y si corresponde le agrego el boton de ReplyAlly.
  for (i = 3; i < elmRows.length; i+=3) {
    elmRow = elmRows[i];

    // Compruebo que no sea un acuerdo cultural, o un mensaje que no corresponda a la alianza.
    isPrivateMsg = false;
    elmCity = elmRows[i-2].cells[4];
    if (elmCity != null) {
      // No hay otra forma de comprobar esto mas que leyendo el campo que corresponde a la ciudad.
      isPrivateMsg = ((elmCity.innerHTML.indexOf('[') > 0) &&
                      (elmCity.innerHTML.indexOf(']') > 0))

      if (isPrivateMsg) {
         // No agrego el boton!!
         continue;
      } else {
        // Es un mensaje valido. Agrego el boton en el span de botones.
        elmSpan = elmRow.getElementsByTagName('span')[0];
        if (elmSpan != null) {
          elmBtn = document.createElement('a');
          elmBtn.innerHTML = fLang.caption_2 /* 'Responder a alianza' */;
          elmBtn.id = 'btnMsg' + i;
          elmBtn.setAttribute ('class', 'button');
          elmBtn.setAttribute ('href', '#');
          aFunc = function(){var j = i;
                             return function(event){
                                saveMessageBody(j);
                             }
                            };

          elmBtn.addEventListener('click', aFunc(), true);
          elmSpan.appendChild(elmBtn);
        } 
      }
    }
  }
}

function saveMessageBody(elemPos) {
  var elmTd, elmDiv, elmTable, elmRows, elmRow;
  var msgBody, msgName, msgSubject, msgDateTime;
  var svId, svDes, svInfoList;

  // Guardo toda la info necesaria y redirecciono:
  elmTable = document.getElementsByTagName('table')[1];
  elmRows = elmTable.rows;

  // Mensaje
  elmRow = elmRows[elemPos - 1];
  elmDiv = elmRow.getElementsByTagName('div')[0];
  if (elmDiv != null) {
     msgBody = elmDiv.innerHTML;
     setVar('replyAllyMsg', msgBody);
  }

  // Remitente
  elmRow = elmRows[elemPos - 2];
  elmTd = elmRow.cells[2];
  if (elmTd != null) {
    msgName = (elmRow.getElementsByTagName('a')[0]).innerHTML;
    setVar('replyAllyName', msgName);
  }

  // Asunto
  elmTd = elmRow.cells[3];
  if (elmTd != null) {
    msgSubject = elmTd.innerHTML;
    setVar('replyAllySubject', msgSubject);
  }

  // Fecha y hora
  elmTd = elmRow.cells[5];
  if (elmTd != null) {
    msgDateTime = elmTd.innerHTML;
    setVar('replyAllyDate', msgDateTime);
  }

  window.location = 'http://s' + getServerId() + '.' + getDomain() + '.ikariam.com/index.php?view=sendIKMessage&msgType=51&allyId=' + fAllianceId;
}

function getURLParam(strParamName){
  var strReturn = "";
  var strHref = window.location.href;
  if ( strHref.indexOf("?") > -1 ){
    var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
    var aQueryString = strQueryString.split("&");
    for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
      if (aQueryString[iParam].indexOf(strParamName + "=") > -1 ){
        var aParam = aQueryString[iParam].split("=");
        strReturn = aParam[1];
        break;
      }
    }
  }
  return strReturn;
}

function getVar(strName, strDefault) {
  var res = GM_getValue(strName);
  if (res == undefined) {
    return strDefault;
  }
  return res;
}

function setVar(strName, strValue) {
  GM_setValue(strName, strValue);
}

setupPage();