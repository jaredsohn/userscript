// ==UserScript==
// @name           Homie button for Formspring
// @description    Changes the "Home" button on formspring.me to "Homie."
//                 Why? Because someone wanted to.
// @author         Eksopl
// @include        http://*formspring.me/*
// @version        1.0
// ==/UserScript==

var homieButton = document.getElementById("main").getElementsByTagName("li")[0].firstChild.firstChild;

if (homieButton.nodeValue == 'Home') {
    homieButton.nodeValue = 'Homie';
}