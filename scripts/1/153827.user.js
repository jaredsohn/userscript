// ==UserScript==
// @name       xlol.org Like Remover
// @namespace  http://bensoft.de/
// @version    1.0
// @description  Entfernt die Like-Verpflichtung auf xlol.org
// @match      http://*xlol.org/picture/*
// @require		http://code.jquery.com/jquery-1.8.0.min.js
// @copyright  2012+, bensoft.de
// ==/UserScript==
$('#like_content').remove();
$('#ad_top').remove();
$('#real_container').show('deface');