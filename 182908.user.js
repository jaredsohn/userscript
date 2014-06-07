// ==UserScript==
// @name           Grey Knights XIII
// @namespace      Alianza-GKXIII
// @description    Añade un botón al foro de la alianza Grey Knights XIII (debes estar registrado), al Galaxytool (debes estar registrado), añade un botón de mensajes al menú izquierdo, además de eliminar Casino y, apagar el botón de Mercader y de tienda
// @version	       2.3
// @include        http://*.ogame.*/*
// ==/UserScript==

function getMetaContent(mn){var m = document.getElementsByTagName('meta');for(var i in m){if(m[i].name == mn){return m[i].content;}} return "";} 
if (getMetaContent("ogame-alliance-tag") != 'GKXIII') return;  // exlusive baby! XD
  
var links = document.getElementsByClassName("menubutton");

//Elimina el botón Casino y poner normal el botón mercader
for(var i = 0, l = links.length; i<l; ++i){
    var link = links[i];
    if(/page=trader/.test(link.getAttribute("href"))){
  		if(link.getAttribute("class") != "menubutton selected"){
          link.setAttribute("class","menubutton");
  		}
    } else if(/page=shop/.test(link.getAttribute("href"))){
  		if(link.getAttribute("class") != "menubutton selected"){
          link.setAttribute("class","menubutton");
  		}
    } else if(/page=premium/.test(link.getAttribute("href"))){
        link.parentNode.style.display = "none";
    }
}

//Coger el enlace de los mensajes que cambia con cada sesión
//Dependiendo de si hay mensajes o no, existirá "message_alert_box" (hay mensajes) o "message_alert_box_default" (no hay mensajes)
var hay = document.getElementById("message_alert_box");

var href = (hay || document.getElementById("message_alert_box_default")).getAttribute("href");

//Ver si estamos dentro del menú de mensajes para poner como seleccionado el botón
var dentro = !!document.getElementById("messageContent");

//Crear el nuevo elemento ("menu_icon") y añadirle los parámetros
var menuItemLi = document.createElement("li");
var menuItemIconSpan = document.createElement("span");
var menuItemTextSpan = document.createElement("span");
var menuItemText = document.createTextNode("Mensajes");
var menuItemA = document.createElement("a");

menuItemIconSpan.setAttribute("class", "menu_icon");

menuItemTextSpan.setAttribute("class", "textlabel");
menuItemTextSpan.appendChild(menuItemText);

menuItemA.setAttribute("target", "_self");
menuItemA.setAttribute("href", href);

if(dentro){
  //Ver si estamos dentro del menú de mensajes para poner como seleccionado el botón
	menuItemA.setAttribute("class", "menubutton selected");
}else{
  menuItemA.setAttribute("class", hay?"menubutton premiumHighligt":"menubutton");
}

menuItemA.appendChild(menuItemTextSpan);
menuItemLi.appendChild(menuItemIconSpan);
menuItemLi.appendChild(menuItemA);

if (getMetaContent("ogame-alliance-tag") == 'GKXIII') {
  menuItemLi.innerHTML = '<span class="menu_icon"><a id="iconeUpdate" href="http://www.yourshoutbox.com/shoutbox/sb.php?key=528097821&expanded=1" target="blank_" ><img class="mouseSwitch" src="http://s30.postimg.org/px6csyyrh/chat.png" rel="http://s30.postimg.org/px6csyyrh/chat.png"></span>' + menuItemLi.innerHTML;
}

//Añadir el botón a "menuTable"
document.getElementById("menuTable").appendChild(menuItemLi);

var full = window.location.host
var parts = full.split('.')

//Crea el botón para el link al foro
menuItemLi       = document.createElement("li");
menuItemIconSpan = document.createElement("span");
menuItemTextSpan = document.createElement("span");
menuItemText     = document.createTextNode("Foro GKXIII");
menuItemA        = document.createElement("a");

menuItemTextSpan.appendChild(menuItemText);

menuItemA.setAttribute("target", "_blank");
menuItemA.setAttribute("href",   "http://greyknights.foroactivo.com.es");
menuItemA.setAttribute("class",  "menubutton");
menuItemA.appendChild(menuItemTextSpan);
menuItemLi.appendChild(menuItemIconSpan);
menuItemLi.appendChild(menuItemA);

if (getMetaContent("ogame-alliance-tag") == 'GKXIII') {
  var str = '<span class="menu_icon"><a id="iconeUpdate" href="';
  
  if(parts[0] == 's117-es' && getMetaContent("ogame-alliance-tag") == 'GKXIII'){
    str += "http://es.galaxytool-hosting.eu/amigosogameros/";
  } else if(parts[0] == 's122-es' && getMetaContent("ogame-alliance-tag") == 'GKXIII'){
    str += "http://es.galaxytool-hosting.eu/ao/";
  } else if(parts[0] == 's106-es' && getMetaContent("ogame-alliance-tag") == 'GKXIII'){
    str += "http://es.galaxytool-hosting.eu/unifornax/";
  } 
  
  str += '" target="blank_" ><img class="mouseSwitch" src="http://s28.postimg.org/pgjrkew6h/Galaxytool.png" rel="http://s28.postimg.org/pgjrkew6h/Galaxytool.png"></span>';

  menuItemLi.innerHTML =  str + menuItemLi.innerHTML;
}

document.getElementById("menuTable").appendChild(menuItemLi);

// chat
if (getMetaContent("ogame-alliance-tag") != 'GKXIII') return;
if(document.location.href.indexOf ("/game/index.php?page=fleet") > 0) { 
  return; 
} else {
  var Shoutbox = document.createElement('div');
  Shoutbox.innerHTML += '<iframe src="http://www.yourshoutbox.com/shoutbox/sb.php?key=528097821" scrolling="no" frameborder="0" width="660px" height="330px" style="border:0; margin:0; padding: 0;"></iframe>';
  document.getElementById("contentWrapper").appendChild(Shoutbox);
}