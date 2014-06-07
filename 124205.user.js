// ==UserScript==
// @id             www.hobius.com-1077e0e6-2ea8-47d0-88c7-b10c12f2487c@script
// @name           hobius nick inserter
// @version        1.0
// @history        1.0 Релиз
// @namespace      http://userscripts.org/scripts/show/124205
// @author         
// @description    Скрипт при нажатии на коммент вставляет ник в строку с ответом. Использует jQuery.
// @include        http://www.hobius.com/*
// @require	http://code.jquery.com/jquery-latest.min.js
// @run-at         document-end
// ==/UserScript==

function comm(){$("li",".comments").each(function(){$(this).click(function(i){$(this).parent().next().find("textarea:eq(0)").html("@"+$("a",this).text()+" ").focus();});});$('head').append('<style>.comments li{cursor:pointer;}</style>')}
$(function(){setTimeout(function(){comm()},1000);});