// ==UserScript==
// @name			E-sim background changer/remover
// @version			1.0.1
// @author			anonymous
// @namespace		e-sim_background_changer_remover
// @description		E-sim background changer/remover
// @include		    http://*.e-sim.org/*
// @license			http://creativecommons.org/licenses/by-nc-nd/4.0/
// @downloadURL		http://userscripts.org/scripts/source/486003.user.js
// @updateURL		http://userscripts.org/scripts/source/486003.meta.js
// @grant 			GM_setValue
// @grant 			GM_getValue
// @grant 			GM_deleteValue
// @grant 			GM_addStyle
// @grant 			GM_xmlhttpRequest
// @grant 			unsafeWindow
// ==/UserScript==
	

$(document) .ready(function ()
{
	$('body') .css('background-image', 'url("http://e-sim.home.pl/testura/img/bg6.jpg")');
});

