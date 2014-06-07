// ==UserScript==
// @name           MutedList
// @author	   DarkJDL (http://www.kongregate.com/accounts/DarkJDL)
// @namespace      http://www.kongregate.com
// @description    See who you muted on Kongregate. A script by DarkJDL with the help of MrSpontaneous and Ventero
// @include        http://www.kongregate.com/games/*
// ==/UserScript==
// Original Modcaller Script: http://userscripts.org/scripts/show/53712
// you cannot modify or redistribute this script without permission.
// It's mostly all Ventero's and/or MrSpontaneous' Code, I just modified the modcaller 
// script to transform it into a "Muted List" Button.

function init() {

	var inject_code = new Array();
	inject_code.push('mutedList = function() {var myString = ""; for( var myMuted in this.holodeck._chat_window._mutings){ myString += myMuted + "\\n" }; alert(myString); }; ');
	
	var script = document.createElement('script');
	script.innerHTML = inject_code.join();

	document.getElementsByTagName('head')[0].appendChild(script);
}

call = document.createElement("option");
call.setAttribute("class","action");
call.setAttribute("onclick","mutedList();");
call.innerHTML="Muted List";

select = document.getElementsByClassName("chat_actions_container")[0].childNodes[1];
select.appendChild(call);

setTimeout(init, 500);
