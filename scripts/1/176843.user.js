// ==UserScript==
// @name        ORF TvThek Reloader
// @namespace   ORFTvThekReloader
// @include     http://tvthek.orf.at/live/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
function reload(){window.location.reload();}
$(document).ready(function() {if ( $(".iscroll").html().indexOf("neu geladen werden muss") > 0) {	window.setTimeout(reload, 6500);}});