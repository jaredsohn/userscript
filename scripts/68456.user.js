// ==UserScript==
// @name           Mejorando MiAguilaRoja
// @namespace      a.montero.jobs@gmail.com
// @description    Pequeñas mejoras en la interfaz del juego
// @version        0.0.29
// @require        http://sizzlemctwizzle.com/updater.php?id=68456&days=5
// @include        http://s*.miaguilaroja.com/base.php*
// ==/UserScript==

// ----- COMPATIBILIDAD CON CHROME ------ //
if (!this.GM_getValue) {
  this.GM_getValue=function (key,def) { return localStorage[key] || def; };
  this.GM_setValue=function (key,value) { return localStorage[key]=value; };
}
// ----- FUNCIONES VARIAS ------ //
function trim(stringToTrim) {return stringToTrim.replace(/^\s+|\s+$/g,"");}
function GetParamFromURL(name) {name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");var regexS = "[\\?&]"+name+"=([^&#]*)";var regex = new RegExp( regexS );var results = regex.exec( window.location.href );if( results == null ) return "";else return results[1];}
var $ = function(element) {return document.getElementById(element);}
function addGlobalStyle(css){var head=document.getElementsByTagName("head")[0];if(head){var style=document.createElement("style");style.type="text/css";style.innerHTML=css;head.appendChild(style)}}
function UrlBase() {return location.href.substring(0,location.href.lastIndexOf("/")+1)};
function HoraActualizacion() {today = new Date();return ''+today.getFullYear()+today.getMonth()+today.getDate()+today.getHours()};
function toggleVisibility(controlId) {var control=document.getElementById(controlId);if(control.style.visibility == "visible" || control.style.visibility == "") control.style.visibility = "hidden"; else control.style.visibility = "visible";}
function GM_set_Array(name, array) {for (i=0; i<array.length; i++) {GM_setValue(name+i, array[i]); }};
function GM_count_Array(name) {var dummy; var j=0; while (dummy = GM_getValue(name+j)) {j++;} return j;};
function GM_get_Array(name) {var extracted = []; var n=GM_count_Array(name); for (k=0; k<n; k++) {extracted[k]=GM_getValue(name+k)} return extracted;};

// -------- CONSTANTES --------- //
boton_panel = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABhSURBVCjPY/jPgB8y0FHBkb37/+/6v+X/+v8r/y/ei0XB3v+H4HDWfywKtgAl1oLhof8TsClYA5SAgEP/27EpWIxkQj02BbOQ3FCGTcGEdV3/W4B6K/+X/M9fNzAhSbYCAMiTH3pTNa+FAAAAAElFTkSuQmCC"
var alias_edificios = new Array();
  alias_edificios['academy']='academy'; alias_edificios['academy15']='academy'; alias_edificios['academy30']='academy';
  alias_edificios['guarida']='aguilaRoja'; alias_edificios['guarida15']='aguilaRoja'; alias_edificios['guarida30']='aguilaRoja';
  alias_edificios['headquarters']='barracks'; alias_edificios['headquarters15']='barracks'; alias_edificios['headquarters30']='barracks';
  alias_edificios['oxstables']='port'; alias_edificios['oxstables15']='port'; alias_edificios['oxstables30']='port';
  alias_edificios['shop']='shop'; alias_edificios['shop15']='shop'; alias_edificios['shop30']='shop';
  alias_edificios['spy']='safehouse'; alias_edificios['spy15']='safehouse'; alias_edificios['spy30']='safehouse';
  alias_edificios['tavern']='tavern'; alias_edificios['tavern15']='tavern'; alias_edificios['tavern30']='tavern';
  alias_edificios['townhall']='townHall'; alias_edificios['townhall15']='townHall'; alias_edificios['townhall30']='townHall';
  alias_edificios['availableWall']='wall'; alias_edificios['wallLocation']='wall'; alias_edificios['wall']='wall'; 
  alias_edificios['warehouse']='warehouse'; alias_edificios['warehouse15']='warehouse'; alias_edificios['warehouse30']='warehouse';
  alias_edificios['wizard']='wizard';
  alias_edificios['embassy']='embassy'; alias_edificios['embassy15']='embassy'; alias_edificios['embassy30']='embassy';
  alias_edificios['fountain']='chatbot';
  alias_edificios['milhospital']='militarHospital'; alias_edificios['milhospital15']='militarHospital'; alias_edificios['milhospital30']='militarHospital';
  alias_edificios['bookSeller']='librero'; alias_edificios['bookSeller15']='librero'; alias_edificios['bookSeller30']='librero';
  alias_edificios['dungeon']='mazmorras'; alias_edificios['dungeon15']='mazmorras'; alias_edificios['dungeon30']='mazmorras';

// ---------- ESTILOS ----------- //
addGlobalStyle (".btn_ocultar_info { width:19px; position:absolute; left: 34px; top: 14px; cursor:pointer; z-index:100 }");
addGlobalStyle (".crecimiento_recursos { font-size: 8px }");
addGlobalStyle (".resources, .resources :visited { font-size:8px; color: #542C0F;}");
// ----------------------------- //

function AnhadirLinkEnRecursos () {
  recursos=GM_get_Array("_mar_villa_" + IdVilla + "_recursos");
  if (!(recursos.length==6)) LeerRecursosDeVilla();
  crecimiento_recursos=GM_get_Array("_mar_villa_" + IdVilla + "_crecimiento_recursos");

  if (recursos[0]==1) {
    $("value_wood").innerHTML = "<a href=/base.php?view=resource&valleyid=" + IdValle + "&id=" + (parseInt(IdValle)+1) + "&restype=361>" + CantidadDeMadera + "</a>";
    if (crecimiento_recursos[0]) if (crecimiento_recursos[0]!=-1) {$("value_wood").innerHTML += "<span class='crecimiento_recursos' id='crecimiento_madera'>+" + crecimiento_recursos[0]} + "</span>";}
  if (recursos[1]==1) {
    $("value_stone").innerHTML = "<a href='/base.php?view=resource&valleyid=" + IdValle + "&id=" + (parseInt(IdValle)+2) + "&restype=357'>" + CantidadDePiedra + "</a>";
    if (crecimiento_recursos[1]) if (crecimiento_recursos[1]!=-1) {$("value_stone").innerHTML += "<span class='crecimiento_recursos' id='crecimiento_piedra'>+" + crecimiento_recursos[1]} + "</span>";}
  if (recursos[2]==1) {
    $("value_bronze").innerHTML = "<a href='/base.php?view=resource&valleyid=" + IdValle + "&id=" + (parseInt(IdValle)+3) + "&restype=360'>" + CantidadDeBronce + "</a>";
    if (crecimiento_recursos[2]) if (crecimiento_recursos[2]!=-1) {$("value_bronze").innerHTML += "<span class='crecimiento_recursos' id='crecimiento_bronce'>+" + crecimiento_recursos[2]} + "</span>";}
  if (recursos[3]==1) {
    $("value_cattle").innerHTML = "<a href='/base.php?view=resource&valleyid=" + IdValle + "&id=" + (parseInt(IdValle)+3) + "&restype=359'>" + CantidadDeGanado + "</a>";
    if (crecimiento_recursos[3]) if (crecimiento_recursos[3]!=-1) {$("value_cattle").innerHTML += "<span class='crecimiento_recursos' id='crecimiento_ganado'>+" + crecimiento_recursos[3]} + "</span>";}
  if (recursos[4]==1) {
    $("value_barley").innerHTML = "<a href='/base.php?view=resource&valleyid=" + IdValle + "&id=" + (parseInt(IdValle)+2) + "&restype=358'>" + CantidadDeCereales + "</a>";
    if (crecimiento_recursos[4]) if (crecimiento_recursos[4]!=-1) {$("value_barley").innerHTML += "<span class='crecimiento_recursos' id='crecimiento_cereales'>+" + crecimiento_recursos[4]} + "</span>";}
}

function ListaDeEdificios () {
  var orden = new Array(); var links = new Array(); var class = new Array();
  var div = document.createElement('div'); div.id="Construcciones"; div.className = "auxiliarcontainer_window";
  var t = "<div class='header headerSatur'><h3>Construcciones</h3></div><div class='content'><ul class='auxcontent_villageinfo' style='text-decoration:underline'>";
  lista_edificios = $('locations').getElementsByTagName('a');
  for(i = 0; i < lista_edificios.length; i++){x=lista_edificios[i].title;orden.push(x);links[x]=lista_edificios[i].href;class[x]=lista_edificios[i].parentNode.className;};
  orden.sort();
  for(i = 0; i < orden.length; i++){if (class[orden[i]] != 'available' && class[orden[i]] != 'fountain') {t += "<li> <a href='" + links[orden[i]] + "'>" + orden[i] + " (" + GM_getValue("_mar_edificio_" + IdVilla + "_lvl_"+alias_edificios[class[orden[i]]]) + ")"+"</a></li>"}};
  div.innerHTML = t + "<div class='footer'></div>";
  $("auxWindow_id0").parentNode.insertBefore(div,$("auxWindow_id0"));
}

function MostrarClasificacion () {
    if (GM_getValue("_mar_FechaClasificacion")!=HoraActualizacion()){
      GM_setValue("_mar_FechaClasificacion",HoraActualizacion());
      GM_xmlhttpRequest({url: UrlBase() + "base.php?view=scores",method: "GET",onload: function(response) {
        var newdoc = document.createElement('foo_clasif'); newdoc.innerHTML = response.responseText;
        MyRow=newdoc.getElementsByClassName("myScore");
        GM_setValue("_mar_puntos",MyRow[0].childNodes[5].innerHTML);
        GM_setValue("_mar_clasificacion",MyRow[0].childNodes[0].innerHTML);
      }});
    };
    var li1 = document.createElement('li');
    li1.innerHTML = "<span class='auxcontent_villageinfo_label' id='info_puntuacion'>Puntos:</span>" + GM_getValue("_mar_puntos");
    $("auxWindow_id0").childNodes[3].firstChild.firstChild.appendChild(li1);
    var li2 = document.createElement('li');
    li2.innerHTML = "<span class='auxcontent_villageinfo_label' id='info_clasificacion'>Clasif.:</span>" + GM_getValue("_mar_clasificacion");
    $("auxWindow_id0").childNodes[3].firstChild.firstChild.appendChild(li2);
};

function AnhadirBotonOcultarInfo () {
  var cuadros = document.getElementsByClassName("auxiliarcontainer_window");
  for (i=0;i<cuadros.length;i++) {
    var btn_ocultar_info = document.createElement ("img");
    btn_ocultar_info.className = "btn_ocultar_info";
    btn_ocultar_info.src = boton_panel;
    btn_ocultar_info.addEventListener ("click",function () { var c=this.parentNode.getElementsByClassName("content")[0]; if (c.style.display=="none") {c.style.display="block"} else {c.style.display="none"}; this.parentNode.getElementsByClassName("footer")[0].style.display=c.style.display} ,false);
    cuadros[i].appendChild (btn_ocultar_info);
  }
}

function LeerRecursosDeVilla () {
  var recursos=new Array(-1,-1,-1,-1,-1);
  var t = "<div class='header headerSatur'><h3>Valle</h3></div><div class='content'><ul class='auxcontent_villageinfo' style='text-decoration:underline'>";
      GM_xmlhttpRequest({url: $("villageNav").getElementsByClassName("viewvalley")[0].childNodes[0].href ,
        method: "GET",onload: function(response) {
        var newdoc = document.createElement('foo_valle'); newdoc.innerHTML = response.responseText;
        var elems = newdoc.getElementsByTagName("a");
        for (i=0; i<elems.length; i++) { 
          if (elems[i].text=='Aserradero') recursos[0]='1';
          if (elems[i].text=='Cantera') recursos[1]='1';
          if (elems[i].text=='Mina de bronce') recursos[2]='1';
          if (elems[i].text=='Pastos de ganado') recursos[3]='1';
          if (elems[i].text=='Campos de cereal') recursos[4]='1';
        };
	GM_set_Array("_mar_villa_" + IdVilla + "_recursos", recursos);
      }});
}

function AnhadirAyudaEnEscuela() {
  var investigaciones = document.getElementsByClassName("investigationCard");
  for (i=0; i<investigaciones.length; i++) {
    titulo = investigaciones[i].getElementsByTagName("H3")[0].innerHTML;
    switch (titulo) {
      case "Economía": {investigaciones[i].getElementsByTagName("H3")[0].innerHTML = titulo + "<a style='' class='help' href='?view=help&amp;helpid=60001&amp;rootid=60000' title='Ayuda'></a>"; break }
      case "Milicia": {investigaciones[i].getElementsByTagName("H3")[0].innerHTML = titulo + "<a style='' class='help' href='?view=help&amp;helpid=60002&amp;rootid=60000' title='Ayuda'></a>"; break }
      case "Ciencia": {investigaciones[i].getElementsByTagName("H3")[0].innerHTML = titulo + "<a style='' class='help' href='?view=help&amp;helpid=60003&amp;rootid=60000' title='Ayuda'></a>"; break }
    }
  };
}

function ActualizarProduccionDeRecursos() {
  var crecimiento_recursos=GM_get_Array("_mar_villa_" + IdVilla + "_crecimiento_recursos");
  if (!(crecimiento_recursos[0])) {crecimiento_recursos=new Array(-1,-1,-1,-1,-1)};
  switch (GetParamFromURL('restype')) {
    case "361": {crecimiento_recursos[0]=$('productionValue').innerHTML;break};
    case "357": {crecimiento_recursos[1]=$('productionValue').innerHTML;break};
    case "360": {crecimiento_recursos[2]=$('productionValue').innerHTML;break};
    case "359": {crecimiento_recursos[3]=$('productionValue').innerHTML;break};
    case "358": {crecimiento_recursos[4]=$('productionValue').innerHTML;break};
  }
  GM_set_Array ("_mar_villa_" + IdVilla + "_crecimiento_recursos", crecimiento_recursos);
}

function EditarTablaTienda_sorttable() {
  var tabla = document.getElementsByClassName("shopTable")[0];
  if ( tabla.getElementsByTagName("tr")[0] ) {
    var newcab = document.createElement('thead');
    newcab.appendChild (tabla.getElementsByTagName("tr")[0]);
    tabla.appendChild(newcab);
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://www.kryogenix.org/code/browser/sorttable/sorttable.js';
    document.getElementsByTagName('head')[0].appendChild(script);
    tabla.className = "sortable";
    addGlobalStyle ("table.sortable {width:100%;} table.sortable thead {cursor:n-resize;} table.sortable th {text-align: center;font-size:120%;font-weight:bold;text-decoration:underline;}");
  }
}

function ActualizaTablaNivelEdificios() {
  if (document.getElementsByClassName("buildingLevel")[0]) {
    GM_setValue("_mar_edificio_" + IdVilla + "_lvl_" + GetParamFromURL('view'),"<->");
  }
  else if (document.getElementsByClassName("buildingActualLevel")[0]) {
    GM_setValue("_mar_edificio_" + IdVilla + "_lvl_" + GetParamFromURL('view'),document.getElementsByClassName("buildingActualLevel")[0].innerHTML);
  }
  else {
    GM_setValue("_mar_edificio_" + IdVilla + "_lvl_" + GetParamFromURL('view'),"--");  
  }
}

// ----------------------------- //
// function main () {
// ----------------------------- //
  if ($("villageNav")) {IdValle = parseInt(trim($("villageNav").getElementsByClassName("viewvalley")[0].innerHTML.substring(35,40)));}
  if ($("villageNav")) {IdVilla = parseInt(trim($("villageNav").getElementsByClassName("viewvillage")[0].innerHTML.substring(37,43)));}

  if ($("globalResources")) {CantidadDeOro = $("globalResources").childNodes[1].childNodes[5].childNodes[0].text;}
  if ($("value_wood")) {CantidadDeMadera = $("value_wood").innerHTML;}
  if ($("value_barley")) {CantidadDeCereales = $("value_barley").innerHTML;}
  if ($("value_stone")) {CantidadDePiedra = $("value_stone").innerHTML;}
  if ($("value_bronze")) {CantidadDeBronce = $("value_bronze").innerHTML;}
  if ($("value_cattle")) {CantidadDeGanado = $("value_cattle").innerHTML;}
  if ($("wdBuildingUpgrade")) { ActualizaTablaNivelEdificios(); }

  if (GetParamFromURL('view')=="village" || GetParamFromURL('f')=="36") if (!$("Construcciones")) { ListaDeEdificios(); MostrarClasificacion(); }
  if (GetParamFromURL('view')=="resource") { ActualizarProduccionDeRecursos(); }
  if (GetParamFromURL('view')=="academy") { AnhadirAyudaEnEscuela(); }
  if (GetParamFromURL('view')=="shop") { EditarTablaTienda_sorttable(); }

  if (!$("crecimiento_madera")) { AnhadirLinkEnRecursos(); }
  AnhadirBotonOcultarInfo();

// } // function main ()
// ----------------------------- //
