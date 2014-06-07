// ==UserScript==
// @name        Re-Google
// @description Insert your previous search term with a singe click
// @version     1.0.0
// @downloadURL https://userscripts.org/scripts/source/177303.user.js
// @updateURL   https://userscripts.org/scripts/source/177303.meta.js
// @include     *://*.google.*/*
// @copyright   2013+, CBRX (cbrx.de)
// @require     http://code.jquery.com/jquery-latest.js
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

$('#gbqfba').after('<button id="regoogle" class="gbqfba"><span>ReGoogle</span></button>');

$(document).ready(function(){
	$('#regoogle').click(function(e){
		console.log(GM_getValue("regoogle_searchterm"));
		$('#gbqfq').val(GM_getValue("regoogle_searchterm"));
		e.preventDefault();
	});

	$('#gbqfq').keyup(function(){
		GM_setValue("regoogle_searchterm", $(this).val());
	});
});