// ==UserScript==
// @name           Botón de mensajes para Ogame
// @namespace      Bullete
// @description    Añade un botón de mensajes al menú izquierdo del Ogame en el Rediseño, además de eliminar Casino y apagar Mercader
// @version	       2.1
// @include        http://uni*.ogame.*/*
// ==/UserScript==

//Eliminar el botón Casino y poner normal el botón mercader
var links = document.getElementsByClassName("menubutton");
for(var i = 0, l = links.length; i<l; ++i){
    var link = links[i];
    if(/page=trader/.test(link.getAttribute("href"))){
		if(link.getAttribute("class") != "menubutton selected"){
        link.setAttribute("class","menubutton");
		}
    }else if(/page=premium/.test(link.getAttribute("href"))){
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

//Añadir el botón a "menuTable"
document.getElementById("menuTable").appendChild(menuItemLi);
