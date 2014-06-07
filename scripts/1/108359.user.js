// ==UserScript==
// @name          Tar/Por sin Comentarios
// @description	  Taringa / Poringa sin comentarios
// @author        blacksrv
// @include       http://www.poringa.net/posts/*
// @include       http://www.taringa.net/posts/*
// ==/UserScript==

var comentarios = document.getElementById('comments');
if (comentarios) {
    comentarios.parentNode.removeChild(comentarios);
}