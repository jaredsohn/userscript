// ==UserScript==
// @name        Date de création
// @namespace   Date de création
// @description Détermine le jour de création d'un pseudo.
// @include     http://www.jeuxvideo.com/profil/*
// @include     http://www1.jeuxvideo.com/profil/*
// @version     1
// ==/UserScript==

jours = document.getElementById('profil_tab').getElementsByTagName('tr')[2].getElementsByTagName('td')[0].innerHTML.split(' jour')[0].replace(".", "", 'g');
var ladate = new Date();
ladate.setTime(ladate.getTime() - jours * (24 * 3600 * 1000));

document.getElementById('profil_tab').getElementsByTagName('tr')[2].getElementsByTagName('td')[0].setAttribute("title", ("0" + ladate.getDate()).slice(-2) + "/" + ("0" + (ladate.getMonth() + 1)).slice(-2) + "/" + ladate.getFullYear());