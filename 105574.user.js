// ==UserScript==
// @name           Grepolis Forum Link
// @author         Randalph
// @version        1.0
// @namespace      http://nation-hoplite.xooit.fr
// @include        http://*.grepolis.*
// @description    Inserer un lien vers un forum Externe et personaliser le lien du forum interne
// ==/UserScript==

document.getElementById("links").getElementsByTagName("a")[4].innerHTML= "Forum Alliance";

var grepolink = document.createElement("a");
var grepolinkText = document.createTextNode("Forum Cronos");
var a    = document.createElement('a');
grepolink.href = "http://nation-hoplite.xooit.fr/index.php";
grepolink.target = "_blank"
grepolink.appendChild(grepolinkText);
document.getElementById("links").appendChild(grepolink);
grepolink.href = "http://forumcronos.forumgratuit.fr";