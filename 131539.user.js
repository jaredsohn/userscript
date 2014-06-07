// ==UserScript==
// @name       Gina Script (Desinstalame)
// @namespace  http://cvq.antigaprime.anonymous.org/
// @version    1.0
// @description  ¡¡¡Desinstalame!!!
// @match    *://www.gissellereyes.com/*
// @match      *://www.gissellereyes.com/modal_candidata.php?candidata=24
// @match    *://www.gissellereyes.com/total_encuesta.php?candidata=24&candidata=24
// @copyright  2012+, Antigaprime
// ==/UserScript==

function f()
{
    var r=confirm("La version que acaba de instalar de Gina Script unicamente es de informacion. Si presiona el boton de \"ok\" sera redireccionado a http://userscripts.org/scripts/show/131539 para que pueda entonces instalar las versiones correspondientes. " + '\n' + "" + '\n' + "Si ya tiene las 3 versiones instaladas, presione \"cancelar.\" " + '\n' + " " + '\n' + "Por favor desinstale/elimine esta versión, de lo contrario, no podrá votar.");
    if (r==true)
    {
        window.location = "http://userscripts.org/scripts/show/131539";
    }
    else
    {
    }
}

f();

