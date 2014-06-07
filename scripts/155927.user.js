// ==UserScript==
// @name           link Przyjaciel
// @namespace      http://www.fotka.pl/profil/suchar
// @include        http://*.fotka.pl/*
// @description    Skrypt dodaje link przyjaciel w menu na gorze
// @version        1.2
// @copyright      2013+, suchar
// ==/UserScript==

const $ = unsafeWindow.$;

var div = document.createElement("div");
div.id = "menu-przyjaciel";
div.className = "header-menu-item";

var a = document.createElement("a");
a.href = "/przyjaciel";	
a.innerHTML = "Przyjaciel";
a.className = "k20" ;
a.style.cssText = "margin-left:0;";
div.appendChild(a);

var div1 = document.createElement("div");
div1.className = "sprites-menu header-menu-separator-big";

$("#pw-counter").before(div);
$("#pw-counter").before(div1);