// ==UserScript==
// @name          SúpermegaeliminadordeadvertenciasTumblr
// @namespace  http://www.gobiernodechile.cl/
// @description   Eliminar advertencias culiás de Tumblr
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @include        http://www.tumblr.com/*
// ==/UserScript==

//Ocultar la alerta
$("#detection_alert").css('display','none');

//Ocultar la sombra sobre el dash
$("#overlay").css('display','none');

//Mostrar barra de desplazamiento del dashboard
$("#dashboard_index").css('overflow-y', 'scroll');
