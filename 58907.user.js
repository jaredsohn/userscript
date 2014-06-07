// ==UserScript==
// @name           GLB DDC Cust Sort Drag Drop
// @namespace      GLB - DDCUnderground addition to rockitsauces AI Enhancer Script http://userscripts.org/scripts/show/50619
// @description    GLB AI Enhancer
// @include        http://goallineblitz.com/game/home.pl
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.min.js
// @require        http://www.json.org/json2.js



// ==/UserScript==

$(document).ready(function (){
    $('div:not(.medium_head)', '#players').disableSelection();
    $("#players").sortable({
			items: '> div:not(.medium_head)'
	});
    $('#players > div:not(.medium_head)').attr('style', "border: 2px solid rgb(0,0,0);");



})
