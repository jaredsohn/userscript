// ==UserScript==
// @name           Grepolis Forum Link
// @author         madmin
// @version        1.0
// @namespace      http://outlaw.xooit.fr/index.php
// @include        http://*.grepolis.*
// @description    Insérer un lien vers un forum Externe et personnaliser le lien du forum interne
// ==/UserScript==

document.getElementById("links").getElementsByTagName("a")[4].innerHTML= "Forum d'alliance";

var grepolink = document.createElement("a");
var grepolinkText = document.createTextNode("Forum Ext.");
var a    = document.createElement('a');
grepolink.href = "http://outlaw.xooit.fr/index.php";
grepolink.target = "_blank"
grepolink.appendChild(grepolinkText);
document.getElementById("links").appendChild(grepolink);