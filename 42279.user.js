// ==UserScript==
// @name           Destuenti
// @namespace      Tuenti
// @include        http://www.tuenti.com/*
// ==/UserScript==

url = document.getElementById('laFoto').src;
document.getElementById('container_fp_laFoto').innerHTML = '';
col = document.getElementsByClassName('float-left-m-clr')[0];
col.innerHTML += '<span style="width: 145px; padding-bottom: 3px;" class="float-left-m-clr">';
col.innerHTML += '<a href="'+url+'?download" class="blue">Descargar foto</a></span>';