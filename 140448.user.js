// ==UserScript==
// @name           WubWubWub
// @description    Sustituye el menú personalizado del foro de DamageRO
// @author         Dr. Who
// @include        http://forum.damage-ro.com
// @version        1.0
// ==/UserScript==

/* Se elimina el menu de Isaac desde el elemento "padre" */
var child = document.getElementById("backgroundChooser");
var parent = child.parentNode;

parent.removeChild(child);

/* Añade menú personalizado */
parent.innerHTML += '<!-- INICIO Menú de navegación personalizado --><ul class="ipsList_inline" style="float : left"><li><a style="margin:0;" id="user_link" href="http://cp.damage-ro.com/">C. Panel</a></li><li><a style="margin:0;" id="user_link" href="http://mediafire.com/?psx49ajuox3x6sw" title="Cliente para jugar">Cliente 2.3</a></li><li><a style="margin:0;" id="user_link" href="http://isaac.xtrweb.com/isaac/Bienvenida.html" title="New web">New web</a></li><li><a style="margin:0;" id="user_link" href="http://forum.damage-ro.com" title="Return to Index">Regresar al Index</a></li></ul><!-- FIN Menú de navegación personalizado -->';