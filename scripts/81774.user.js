// ==UserScript==
// @name           Grepolis Forum Link
// @author         Randalph
// @version        1.0
// @namespace      http://nation-hoplite.xooit.fr
// @include        http://*.grepolis.*
// @description    Insérer un lien vers un forum Externe et personnaliser le lien du forum interne
// ==/UserScript==

document.getElementById("links").getElementsByTagName("a")[4].innerHTML= "Forum d'alliance";

var grepolink = document.createElement("a");
var grepolinkText = document.createTextNode("Forum Ext.");
var a    = document.createElement('a');
grepolink.href = "http://nation-hoplite.xooit.fr/index.php";
grepolink.target = "_blank"
grepolink.appendChild(grepolinkText);
document.getElementById("links").appendChild(grepolink);