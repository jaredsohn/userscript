// ==UserScript==
// @name           eRepublik Fix Fight Button
// @namespace      eRepublikFFB
// @version        0.01
// @description    Fix fight button.
// @include        http://www.erepublik.com/en/military/battlefield/*
// @require        http://code.jquery.com/jquery-1.7.min.js
// @copyright      
// @license        
// ==/UserScript==

$(document).ready(function (){
	$('div#pvp').after('<input type="button" id="FixBut" value="FixBut" />');
	$('input#FixBut').click(function(){unsafeWindow.ERPK.enableFightButtons();});
});
