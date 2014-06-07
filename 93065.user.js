// ==UserScript==
// @name		CVS(Centralized voting System)
// @version		0.1
// @description	Script that allows to give notificationes whenever new articles are published
// @author		xShuMy(PA)
// @include		http://ww*.erepublik.com/*
// ==/UserScript==
// Script hecho para FAA Argentinas y para Progreso Argentino
var lugar;
var elemVotacion;
/*
lugar = document.getElementById('hinfo');

elemVotacion = document.createElement('div');
lugar.parentNode.insertBefore(elemVotacion,lugar);
elemVotacion.innerHTML = "RECUADRO";
*/
lugar = document.getElementById('hinfo');

elemVotacion = document.createElement('div');
lugar.parentNode.insertBefore(elemVotacion,lugar);



GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://inborg.dyndns.org/eR/Votaciones/lectura.php?o=0',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
        elemVotacion.innerHTML = responseDetails.responseText;
        }
});