// ==UserScript==
// @name           ex.ua search on main
// @namespace      http://seb.riot.org/gmscripts
// @description    Adds search box on main page ex.ua
// @include        http://ex.ua/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

function parser() {
	document.getElementById("index_box").innerHTML+= '<form name="search" action="/search">

<div id="search_box">
<input type="text" name="s" value="" id="search_line">
<input type="submit" value="поиск" class="button" id="search_button">
<a href="/ad_click/180" target="_blank" id="search_link"></a>
<div id="search_help">
Не можете найти что-то - напишите в<br>
"<a href="/view/7309"><b>Ищем и находим...</b></a>".
</div>
</div>
</form>';


}

$( function() {
  parser();
});