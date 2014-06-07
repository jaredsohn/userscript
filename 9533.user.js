// Free-C@mpus
// version 0.3.1
// 15-06-2006
// Copyright (c) 2005, David Castellanos <davidcaste@gmail.com>,
//           (c) 2006, Víctor E. Miguel <victor.quicksilver@gmail.com>,
//                     Jesús A. Álvarez <zydeco@namedfork.net>
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// Basado en los ejemplos del libro de Mark Pilgrim "Dive Into Greasemonkey" (http://diveintogreasemonkey.org/)
//
// -------------------------------------------------------------------
// FIREFOX USERS
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Free-C@mpus", and click Uninstall.
//
// -------------------------------------------------------------------
// SAFARI USERS
// This is also a Creammonkey user script.
//
// To install, you need Creammonkey: http://8-p.info/Creammonkey/
// Then restart Safari and revisit this script. You will be prompted
// to install this script. Click Install.
//
// To uninstall, go to Creammonkey preferences dialog,
// select "Free-C@mpus", and click Uninstall.
//
// -------------------------------------------------------------------
//
// Esto pretende ser una solución a corto plazo del problema de marginación que sufrimos los usuarios de Mozilla Firefox
// a la hora de acceder a Red-C@mpus. Simplemente, es imposible acceder con otro navegador distinto de Microsoft
// Internet Explorer, o que se identifique como este (User Agent).
//
// La opción de cambiar el User Agent no es óptima. Es complicado, no siempre funciona (aunque con los navegadores
// Opera y Konqueror funciona bien) y seguimos teniendo el problema del menú desplegable que no es estándar y sólamente
// es renderizado por Internet Explorer.
//
// La solución la brindó el grupo CRySOL de Ciudad Real (http://crysol.inf-cr.uclm.es) con un sistemas de frames creado por Bena
// (¡¡Gracias Bena :-)!!) que en parte solucionaba el problema. Pero con la nueva versión de Red-C@mpus dejó de funcionar,
// además que no se integraba muy bien, y podía resultar confuso a algunos usuarios.
//
// Este script está programado para Greasemonkey, ha sido probado en Firefox 1.0.6 en una Debian Sid y no tiene la intención de
// ser una solución definitiva (que en este caso sería que Red-C@mpus cumpliera los estándares y no se ciñera a un navegador
// específico y además propietario) sino una solución temporal, sencilla y limpia de cara al usuario.
//
// David Castellanos <davidcaste@gmail.com>
// http://www.linuxalbacete.org
//
// -------------------------------------------------------------------- 
//
// ==UserScript==
// @name Free-C@mpus
// @namespace http://www.linuxalbacete.org/
// @description Acceder a RedC@mpus desde Firefox y Safari
// @include https://redcampus.uclm.es/*
// @include http://redcampus.uclm.es/*
// @include http://academica.usal.es/*
// ==/UserScript==

// Comprobar Navegador
var isWebKit = (navigator.userAgent.indexOf('WebKit') > 0);

// Detectar Campus
if (window.location.href.indexOf('uclm.es/') >0)
{
	var campus = 'uclm'
	var basehref = 'https://redcampus.uclm.es/redcampus/';
}
else if (window.location.href.indexOf('usal.es/') >0)
{
	var campus = 'usal';
	var basehref = 'http://academica.usal.es/redcampus/';
}

//  Generar Menú
function genMenu(tcampus)
  {
    if (tcampus=='uclm')
      {
        /* menu uclm */
        return '<div id="menu" style="background-color: white;border: 2px black solid;padding: 2px;">' +
        '<div id="navegacion" style="display: inline;">' +
        
        /* menu */
        '    <select onchange="parent.parent.frames[\'principal\'].location=value">' +
        '    <option value="' + basehref + 'principal.htm">-Menu-</option>' +
        '    <option value="' + basehref + 'html/ayuda_alumno/index.htm">Ayuda</option>' +
        '    <option value="' + basehref + 'servlet/sformat?1COD_PANTALLA=2711">Datos personales</option>' +
        '    <option value="' + basehref + 'servlet/sformat?1COD_PANTALLA=2430">Becas Erasmus</option>' +
        '    <option value="' + basehref + 'servlet/ApoyoDocencia?INICIO=S&ID_PERFIL=APD_ALU&ID_IDIOMA=CAS">Apoyo a la Docencia</option>' +
        '    <option value="' + basehref + 'conf_navegador/Configuracion_Navegadores.htm">Configuración del navegador</option>' +
        '    <option value="' + basehref + 'servlet/sformat?1COD_PANTALLA=3195">Cita Previa</option>' +
        '    <option value=".">Automatrícula 1er y 2ndo ciclo</option>' +
        '    <option value="http://www.uclm.es/alumnos/buzon/todos/">Buzón del Alumno</option>' +
        '    <option value="https://socrates.uclm.es/pinalumnos/ch_pw.asp">Cambio de contraseña</option>' +
        '    <option value="' + basehref + 'servlet/sformat?1COD_PANTALLA=3191">Libre elección disponible para el alumno</option>' +
        '</select>' +
        
        /* datos de la matrícula */
        '<select onchange="parent.parent.frames[\'principal\'].location=value">' +
        '    <option value="' + basehref + 'principal.htm">-Datos de la Matrícula-</option>' +
        '    <option value="' + basehref + 'servlet/sformat?1COD_PANTALLA=2729">Matrícula</option>' +
        '    <option value="' + basehref + 'servlet/sformat?1COD_PANTALLA=2720">Ocupación de los Grupos de Actividad</option>' +
        '    <option value="' + basehref + 'servlet/sformat?1COD_PANTALLA=2732">Consulta de movimientos y recibos</option>' +
        '    <option value="' + basehref + 'servlet/sformat?1COD_PANTALLA=2818">Becas</option>' +
        '</select>' +
        
        /* biblioteca */
        '<select onchange="parent.parent.frames[\'principal\'].location=value">' +
        '    <option value="' + basehref + 'principal.htm">-Biblioteca-</option>' +
        '    <option value="' + basehref + 'servlet/sformat?1COD_PANTALLA=1802">Mis Prestamos</option>' +
        '    <option value="' + basehref + 'servlet/sformat?1COD_PANTALLA=1803">Mis Reservas</option>' +
        '</select>' +
        
        /* expediente */
        '<select onchange="parent.parent.frames[\'principal\'].location=value">' +
        '    <option value="' + basehref + 'principal.htm">-Expediente-</option>' +
        '    <option value="' + basehref + 'servlet/sformat?1COD_PANTALLA=2695">Consulta de Expediente</option>' +
        '    <option value="' + basehref + 'servlet/sformat?1COD_PANTALLA=2817">Calificaciones</option>' +
        '    <option value="' + basehref + 'servlet/sformat?1COD_PANTALLA=2821">Asignaturas Superadas</option>' +
        '    <option value="' + basehref + 'servlet/sformat?1COD_PANTALLA=2822">Expediente Completo</option>' +
        '</select>' +
        
        /* salir */
        '</div><div id="salir" style="display: inline;position: absolute;padding-top: 3px;right: 20px;"><a target="_top" href="' + basehref + 'servlet/Login?FIN=S">Salir</a></div>' +
        '</div>';
      }
    else if (tcampus=='usal')
      {
        /* menu usal */
        return '<div id="menu" style="background-color: white;border: 2px black solid;padding: 2px;">' +
        '<div id="navegacion" style="display: inline;">' +
    
        /* planes de estudios */
        '<select id="menu1" onchange="top.frames[\'principal\'].location=value;document.getElementById(\'menu2\').selectedIndex=0;document.getElementById(\'menu3\').selectedIndex=0;">' +
        '    <option value="'+ basehref + 'principal.htm">-Planes de Estudios-</option>' +
        '    <option value="'+ basehref + 'servlet/sformat?1COD_PANTALLA=83205">Planes de primer y segundo ciclo</option>' +
        '    <option value="'+ basehref + 'servlet/sformat?1COD_PANTALLA=83211">Planes de tercer ciclo</option>' +
        '    <option value="'+ basehref + 'servlet/sformat?1COD_PANTALLA=83212">Estudios propios</option>' +
        '    <option value="'+ basehref + 'servlet/sformat?1COD_PANTALLA=83163">Datos generales de un plan</option>' +
        '    <option value="'+ basehref + 'servlet/sformat?1COD_PANTALLA=83164">Estructura del plan de estudios</option>' +
        '    <option value="'+ basehref + 'servlet/sformat?1COD_PANTALLA=83166">Asignaturas de un plan</option>' +    
        '</select>' +
        
        /* matrícula */
        '<select id="menu2" onchange="top.frames[\'principal\'].location=value;document.getElementById(\'menu1\').selectedIndex=0;document.getElementById(\'menu3\').selectedIndex=0;">' +
        '    <option value="'+ basehref + 'principal.htm">-Matr&iacute;cula-</option>' +
        '    <option value="'+ basehref + 'servlet/sformat?1COD_PANTALLA=83195">Consulta de Matr&iacute;cula</option>' +
        '    <option value="'+ basehref + 'servlet/sformat?1COD_PANTALLA=83198">Movimientos y Recibos</option>' +
        '    <option value="'+ basehref + 'servlet/sformat?1COD_PANTALLA=83286">Asignaturas LC</option>' +
        '</select>' +
        
        /* expediente */
        '<select id="menu3" onchange="top.frames[\'principal\'].location=value;document.getElementById(\'menu2\').selectedIndex=0;document.getElementById(\'menu1\').selectedIndex=0;">' +
        '    <option value="'+ basehref + 'principal.htm">-Expediente-</option>' +
        '    <option value="'+ basehref + 'servlet/sformat?1COD_PANTALLA=83161">Consulta de Expediente</option>' +
        '    <option value="'+ basehref + 'servlet/sformat?1COD_PANTALLA=83283">Consulta de Calificaciones</option>' +
        '    <option value="'+ basehref + 'servlet/sformat?1COD_PANTALLA=83916">Asignaturas Superadas</option>' +
        '</select>' +
        
        /* salir */
        '</div><div id="salir" style="display: inline;position: absolute;padding-top: 3px;right: 20px;"><a target="_top" href="' + basehref + 'servlet/Login?FIN=S">Salir</a></div>' +
        '</div>';
      }
  }

/* insertar menu */
if (isWebKit) /* Safari y sucedáneos */
  {
      /* Como creammonkey no carga scripts dentro de los marcos, 
       * hay que acceder desde el marco superior
       */
      if (window.location.href.indexOf(basehref + 'servlet/MenuPpal') == 0);
        {
        menuFrame = top.frames["info"].frames["menu"];
          if (menuFrame) insertarMenu(menuFrame.frameElement.document);
        }
  }
else /* firefox, y demás no basados en webkit */
  {
    // Insertar menu si estoy en el marco "problemático"
    if(window.location.href == basehref + "servlet/informacion?1FRAME=M") insertarMenu(document);
  }

/* funcion para insertar el menu
 * toma como argumento el document donde esta el menu
 */
function insertarMenu(baseDoc)
  {
    // pongo el fondo
    baseDoc.body.background = basehref + 'images/fondo_rc.gif';
    
    // elimino el puto script javascript del menú
    var script = baseDoc.getElementsByTagName("SCRIPT");
    if (script[0])
      {
        script[0].parentNode.removeChild(script[0]);
      }
    
    // tabla donde están los enlaces del menú y el enlace a salir
    var tabla = baseDoc.getElementsByTagName("TABLE");

    // inyectar menú en el frame
    var navegador = baseDoc.createElement("div");
    navegador.innerHTML = genMenu(campus);
    if (tabla[0]) tabla[0].parentNode.replaceChild(navegador, tabla[0]);
  }

// CHANGELOG:
// 0.3.1 15-06-2006 - Limpieza de Código, mejorada la versión para Safari
// 0.3 - 14-06-2006 - Compatible con Safari (via Creammonkey)
// 0.2.1 - 14-06-2006 - Compatible con la Universidad de Salamanca
// 0.2 - 29-08-2005 - Liberado

// la magia ha terminado
