
// ==UserScript==
// @name           LoL Tribunal Helper
// @namespace      http://userscripts.org/scripts/show/130600
// @description    Makes it easier to review cases in the League of Legends Tribunal by expanding the chat frame to be the same height as its contents.
// @match          http://*.leagueoflegends.com/tribunal/*
// @run-at         document-end
// @updateURL      http://userscripts.org/scripts/source/130600.user.js
// @downloadURL    http://userscripts.org/scripts/source/130600.user.js
// @version        1.3
// ==/UserScript==

window.onload = function ()
{
	if (!document.getElementById("h_caseid")) return;

	document.getElementById("chat_filter_all").addEventListener("click", resize, false);
	document.getElementById("chat_filter_allied").addEventListener("click", resize, false);
	document.getElementById("chat_filter_enemy").addEventListener("click", resize, false);

	resize();

	function resize(){
		var judgerChatContainer = document.getElementsByClassName("judger_chat_container")[0];
		var judgerChat = document.getElementById("judger_chat");
		var jspContainer = document.getElementsByClassName("jspContainer")[0];
		var jspPane = document.getElementsByClassName("jspPane")[0];

		judgerChatContainer.style.height = jspPane.clientHeight + (judgerChatContainer.clientHeight-judgerChat.clientHeight) + "px";
		judgerChat.style.height = jspPane.clientHeight + "px";
		jspContainer.style.height = jspPane.clientHeight + "px";

		var jspVerticalBar = document.getElementsByClassName("jspVerticalBar")[0];
		jspVerticalBar.hidden = true;
	}
}