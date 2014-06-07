// remerciements à shikiryu et sa fonction getGlobal, SpaceFrog pour son aide dans la correction du code.
//
// ==UserScript==
// @name          smileys persos du chat downparadise
// @namespace     http://rotrevrep.alwaysdata.net
// @description   Adding smileys in http://forum.downparadise.ws/mchat.php
// @include       http://forum.downparadise.ws/mchat.php
// ==/UserScript==

function getGlobal(callback) {
	
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.textContent = "(" + callback.toString() + ")();";
	document.body.appendChild(script);
	
}
var lock=0;
function main() {

	function session(){
$("#mChatSmiles").append("<a href="#" onclick="insert_text('[IMG]http://breizh-team-moto-club.org/images/smilies/smiley007.gif[/IMG]', true); return false;"><img src="http://breizh-team-moto-club.org/images/smilies/smiley007.gif" width="32" height="32" alt=":breizh:" title="breizh" /></a>");
lock=1;
	}
		
	if(lock==0)$(document).ajaxComplete(function(){session();});
	
}

getGlobal(main);