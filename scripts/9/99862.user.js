// ==UserScript==
// @name           Chat reconnect
// @namespace      arreloco
// @description    Reconnects the chat whenever it lose connection
// @include        http://www.kongregate.com/games/*
// ==/UserScript==

function recon(){
	var dom;

	var dom = (typeof unsafeWindow === "undefined"?window:unsafeWindow);

	var holodeck = dom.holodeck;
	if(!holodeck) return;
	logIn = holodeck._chat_window._logged_in_to_chat;

	if(document.getElementById('fixChat') == null && logIn){
		 document.getElementById('quicklinks').innerHTML += '<li><span id="fixChat"><input type="checkbox" title="Fix Chat" name="fixChat"></span></li>';
	}
	if(document.getElementById('fixChat').lastChild.checked && document.getElementById('chat_disconnected_indicator').style.display != "none"){
		holodeck.reconnect();
	}
}


setInterval(recon,500);