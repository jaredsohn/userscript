// ==UserScript==
// @name       Ikariam birds-killer
// @autor      snet metnee
// @namespace  ikariam
// @version    0.5
// @icon http://us.ikariam.com/favicon.ico
// @description  Remove bird animation
// @downloadURL    https://userscripts.org/scripts/source/151662.user.js
// @updateURL    https://userscripts.org/scripts/source/151662.meta.js
// @include      http://*.*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

var $ = unsafeWindow.jQuery;
document.addEventListener('DOMNodeInserted', function(e){
	if($(e.target).attr('class').match('bird_swarm')=='bird_swarm'){
		$(e.target).remove();
	}
},true);
$('.bird_swarm').remove(); //chrome