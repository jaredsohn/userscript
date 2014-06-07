// ==UserScript==
// @name           MessageButton
// @include        http://uni*.ogame.*/*
// ==/UserScript==

var href = document.getElementById("message_alert_box").getAttribute("href");
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
menuItemA.setAttribute("class", "menubutton");
menuItemA.appendChild(menuItemTextSpan);

menuItemLi.appendChild(menuItemIconSpan);
menuItemLi.appendChild(menuItemA);

document.getElementById("menuTable").appendChild(menuItemLi);