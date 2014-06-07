scr_meta=<><![CDATA[
// ==UserScript==
// @name           Simulador de ataques para BC
// @description    Una ventana de un simulador de ataques aparecerá bajo el mensajero.
// @namespace      TathtaT
// @include        http://www.bandascallejeras.com/mensajero.php*
// @include        http://bandascallejeras.com/mensajero.php*
// @include        http://www.bandascallejeras.com/competencia.php*
// @include        http://bandascallejeras.com/competencia.php*
// @include        http://www.bandascallejeras.com/megacorp.historial.php*
// @include        http://bandascallejeras.com/megacorp.historial.php*
// @version 1.0
// ==/UserScript==
]]></>.toString();
var divsimulador = document.createElement("div");
divsimulador.id = "div_simulador_ifrme"; 

var despuesde = document.getElementById("cuerpazo");
despuesde.insertBefore(divsimulador, despuesde.lastChild);
var iframe = document.createElement("iframe");
iframe.src = 'http://tathtat.webcindario.com/BC/simulador.htm'
iframe.style.width="100%";
iframe.style.height="100%";
var diviframe = document.createElement("div");
diviframe.style.width="800px";
diviframe.style.height="1090px";
diviframe.style.float="center";
diviframe.appendChild(iframe);
despuesde.insertBefore(diviframe,despuesde.lastChild);
document.getElementById("div_simulador_ifrme").style.fontSize = "25";
document.getElementById("div_simulador_ifrme").style.align = "center";