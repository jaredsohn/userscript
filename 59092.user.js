// ==UserScript==
// @name           ChirtoFox
// @namespace      http://userscripts.org/scripts/review/59092
// @description    Mejora tu Experiencia en Chirto
// @include        http://*chirto.com.ar/
// @include        http://*chirto.com.ar/#
// @author	   Lord Zorel
// @date           3/10/2009
// @version        1.2
// ==/UserScript==
//
//
//
// ------------- Configuración ------------------------
//
// En esta parte puedes agregar mas direcciones donde pueden estar alojadas las imagenes
Total_Direcciones=2
// No tocar esta Parte
var rutas = new Array(Total_Direcciones)
for(var i=0; i<Total_Direcciones;i++){rutas[i]=new Array()}
// Ahora puedes siguir configurando
// rutas[x][0]= "HTTP://DIRECCION"
// rutas[x][1]= "NOMBRE CON QUE APARECE"
//Chirto
rutas[0][0]="http://66.7.198.44/~chirtoc/img/"
rutas[0][1]="[Chirto]"
// Lord Zorel
rutas[1][0]="http://usuarios.lycos.es/lordzorel/"
rutas[1][1]="[Lord Zorel]"
// OTROS

//------------------------------------------------------
var barra=document.getElementById("divbarrasuperior");
if(barra!=null){
  var comboBox='<form name="ruta" id="ruta">';
  comboBox+='<select name="selec" id="selec" title="Select Language" onChange="rutaimg=selec.value">';
  for(i=0; i<rutas.length; i++){
    comboBox+='<option value="'+rutas[i][0]+'">'+rutas[i][1]+'</option>';
  }
  comboBox+='</select>';
  comboBox+='</form>';
  barra.innerHTML+=comboBox;
}
