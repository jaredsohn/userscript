// ==UserScript==
// @name        Gronkh.de Minecraft LP Facecam Remover
// @namespace   gronkh.de
// @description Überlagert die Facecam mit einem dekorativen schwarzen Block
// @include     http://gronkh.de/lets-play/minecraft-lp/*
// @version     1
// ==/UserScript==
$('#youtube-big').prepend('<div style="position:absolute;top:450px;left:20px;z-index:200;width:150px;height:110px;background:#000000;">&nbsp;</div>');