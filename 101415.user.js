// ==UserScript==
// @name           GBAppleboyBlock
// @namespace      http://www.genbeta.com/usuario/pante
// @description    Ponele algo mas de seriedad a Genbeta. v1
// @include        http://www.genbeta.com/
// @include        http://www.genbeta.com/record/*
// @include        http://www.genbeta.com/categoria/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$("div.post p:contains('Miguel López')").parent('div').hide();