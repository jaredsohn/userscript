// ==UserScript==
// @name           eRepublik Suscripcion
// @namespace      santirub
// @description    Icono de Suscripción
// @include        http://*.erepublik.com/*
// ==/UserScript==

// eRepublik user: santirub http://www.erepublik.com/en/citizen/profile/1208160. 

var icsub = document.getElementById('maildisplay');

icsub.innerHTML = icsub.innerHTML + '<div class="item" style="padding-top:6px"> <a href="http://www.erepublik.com/*/messages/subscribes/1">Subs<img alt="Subs" src="http://i49.tinypic.com/j134ax.png" height="13" width="16" style="padding-left:3px" padding-bottom:4px padding-top:4px /></a></div>';