// ==UserScript==
// @name CompactadorEscomb-Ogame
// @namespace http://www.loon.com.ar/
// @author Tomas Loon R
// @description  Compactador de informes de campos de escombros
// @include     http://ogame.*/game/*messages*
// @include     http://*.ogame.*/game/*messages*
// ==/UserScript==

// msg = "Tus 1 recicladores tienen una capacidad total de carga de 20000. En los escombros flotan 0 metal y 90000 cristal en el espacio. Has recolectado 0 metal y 20000 cristal.";
tag_inic = document.indexOf("</td><td colspan="3" class="b">Tus");
tag_fina = document.indexOf(" cristal. </td>");
msg = tag_inic.substring(tag_inic+34, tag_fina);

function obtener_var(){

metal_inicia = msg.indexOf("En los escombros flotan ");
cristal_inic = msg.indexOf(" metal y ");
metal_flotando = msg.substring(metal_inicia+23, cristal_inic);
cristal_fina = msg.indexOf(" cristal en el espacio.");
cristal_flotan = msg.substring(cristal_inic+9, cristal_fina);

metal_recolect = msg.indexOf("Has recolectado ");
cristal_recole = msg.lastIndexOf(" metal y ");
metal_done = msg.substring(metal_recolect+15, cristal_recole);
cristal_final = msg.indexOf(" cristal.");
// cristal_done = "nose";
cristal_done = msg.substring(cristal_recole+9, cristal_final);

metal_falta = metal_flotando - metal_done;
cristal_falta = cristal_flotan - cristal_done;
reci2 = (metal_falta+cristal_falta)/20000+1;
reciclas = Math.floor(reci2);
}


function escribir(){
obtener_var();
document.write("<font face=verdana size=2 color=silver>Flotaban: "+metal_flotando+" metal y "+cristal_flotan+" cristal.<BR>");
document.write("Recolectado: <font color=lime>"+metal_done+"</font> metal y <font color=lime>"+cristal_done+"</font> cristal.<br>");
document.write("Restan: <font color=red>"+metal_falta+"</font> metal y <font color=red>"+cristal_falta+"</font> cristal.");
document.write("(<font color=white>"+reciclas+"</font> recicladores)");
}

escribir();
}

else{
document.write("No se encontraron informes de escombros.");
}
}