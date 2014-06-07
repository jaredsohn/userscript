// ==UserScript==
// @name           SFHotkeys
// @namespace      http://www.shogunsfate.com
// @include        *shogunsfate.com/juego?*
// ==/UserScript==

var charToInt = {'1':1,'2':2,'3':3,'4':4,'5':5}
var seccion = 'recursos';

var limitePorSeccion = {
  'recursos':4,
  'construir':1,
  'comerciar':3,
  'ejercitos':4,
  'ninjutsu':5,
  'politica':3,
  'samurais':3,
  'apuestas':1,
  'mensajes':3,
  'contactos':3,
  'clan':5,
  'perfil':2,
  'mapa':1,
  'rankings':5
};

var leerMensajes = function() {
  unsafeWindow.leerMensajes(0,0);
}
var mensajesEnviados = function() {
  unsafeWindow.mensajesEnviados(0);
}


var funcionesSeccion = {
  'recursos':[unsafeWindow.distribucion, unsafeWindow.gestion, unsafeWindow.jerarquia, unsafeWindow.favoresImp],
  'construir':[unsafeWindow.construir],
  'comerciar':[unsafeWindow.comprar,unsafeWindow.vender,unsafeWindow.enviar],
  'ejercitos':[unsafeWindow.reclutar,unsafeWindow.ejercitos,unsafeWindow.estrategia,unsafeWindow.ejercitosEfectos],
  'ninjutsu':[unsafeWindow.funcEspiar,unsafeWindow.funcAsesinar,unsafeWindow.funcRobar,unsafeWindow.funcEnvenenar,unsafeWindow.ninjutsuEfectos],
  'politica':[unsafeWindow.politicaIniciar,unsafeWindow.politicaEnCurso,unsafeWindow.politicaEfectos],
  'samurais':[unsafeWindow.crear,unsafeWindow.entrenar,unsafeWindow.asignar],
  'apuestas':[unsafeWindow.apuestasRikishi],
  'mensajes':[leerMensajes,unsafeWindow.escribirMensaje,mensajesEnviados],
  'contactos':[unsafeWindow.fAmigos,unsafeWindow.fEnemigos,unsafeWindow.fConfidentes],
  'clan':[unsafeWindow.clanMiembros,unsafeWindow.clanMensajes,unsafeWindow.clanChat,unsafeWindow.clanPerfil,unsafeWindow.clanLider],
  'perfil':[unsafeWindow.pPublico,unsafeWindow.pPrivado],
  'mapa':[unsafeWindow.mapa],
  'rankings':[unsafeWindow.rankingIndividual,unsafeWindow.rankingClan,unsafeWindow.rankingFaccion,
             unsafeWindow.rankingBatalla,unsafeWindow.historiaShogun]
}

function hotKeys (event) {

  // Get details of the event dependent upon browser
  event = (event) ? event : ((window.event) ? event : null);
  
  // We have found the event.
  if (event && !event.ctrlKey && (!event.altKey || (event.altKey && event.shiftKey)) &&
               (
                !event.target.type || (!event.target.type.match(/text/) && !event.target.type.match(/input/) && !event.target.type.match(/select/))
                                   || (event.altKey && event.shiftKey)
                                   || (event.metaKey && event.shiftKey)
                ) 
     ){

    var charCode = (event.charCode) ? event.charCode : ((event.which) ? event.which : event.keyCode);
    var myChar = String.fromCharCode (charCode).toLowerCase();

    if (myChar == '1' || myChar == '2' || myChar == '3' || myChar == '4' || myChar == '5') {
      var entero = charToInt[myChar];
      
      var nombreSeccionActual;
      if (typeof(unsafeWindow.nombreMenuActual) == "undefined") {
        nombreSeccionActual = seccion;
      } else {
        nombreSeccionActual = unsafeWindow.nombreMenuActual;
      }

      if (entero <= limitePorSeccion[nombreSeccionActual]) {
        unsafeWindow.resaltarSubmenu(entero-1, limitePorSeccion[nombreSeccionActual]);
        funcionesSeccion[nombreSeccionActual][entero-1]();
      }
    }


    if (myChar == 'r') {
	seccion = 'recursos';
      unsafeWindow.cargar(seccion);
    }
    if (myChar == 'c') {
	seccion = 'construir';
      unsafeWindow.cargar(seccion);
    }
    if (myChar == 'x') {
	seccion = 'comerciar';
      unsafeWindow.cargar(seccion);
    }
    if (myChar == 'e') {
	seccion = 'ejercitos';
      unsafeWindow.cargar(seccion);
    }
    if (myChar == 'n') {
	seccion = 'ninjutsu';
      unsafeWindow.cargar(seccion);
    }
    if (myChar == 'p') {
	seccion = 'politica';
      unsafeWindow.cargar(seccion);
    }
    if (myChar == 's') {
	seccion = 'samurais';
      unsafeWindow.cargar(seccion);
    }
    if (myChar == 'u') {
	seccion = 'apuestas';
      unsafeWindow.cargar(seccion);
    }
    if (myChar == 'm') {
	seccion = 'mensajes';
      unsafeWindow.cargar(seccion);
    }
    if (myChar == 't') {
	seccion = 'contactos';
      unsafeWindow.cargar(seccion);
    }
    if (myChar == 'l') {
	seccion = 'clan';
      unsafeWindow.cargar(seccion);
    }
    if (myChar == 'f') {
	seccion = 'perfil';
      unsafeWindow.cargar(seccion);
    }
    if (myChar == 'a') {
	seccion = 'mapa';
      unsafeWindow.cargar(seccion);
    }
    if (myChar == 'k') {
	seccion = 'rankings';
      unsafeWindow.cargar(seccion);
    }
  }
}

unsafeWindow.onkeydown = hotKeys ;