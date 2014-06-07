// ==UserScript==
// @name		SVZNachrichtenAlert
// @description	Erstellt ein Alert, wenn man bei SchülerVZ eine neue Nachricht erhält.
// @author		Homer Bond 005 and Seoester
// @include	*.schuelervz.net/*
// @exclude	*.schuelervz.net/Plauderkasten
// @exclude	https://secure.schuelervz.net/Login/*
// @exclude	http://www.schuelervz.net/Messages/tid/*
// ==/UserScript==

var shown = 0;
look_for_messages();

function look_for_messages() {
	var link = document.getElementsByTagName("a")[8];
	if (link.getAttribute("class") !== "Navi-Messages-Link"){
		link = document.getElementsByTagName("a")[9];
	}
	var linktext = link.innerHTML;
	var link_reg = /\d+/;
	var results = linktext.match(link_reg);
	if(results !== null) {
		var new_messages = results[0];
		new_messages = parseInt(new_messages);
		if(new_messages > shown) { 
			var message_form = "Nachrichten";
			if(new_messages == 1)
				message_form = "Nachricht";
			var will_see = confirm ("Du hast " + new_messages + " neue " + message_form + " erhalten!\nMöchtest du die " + message_form + " lesen?");
			if(will_see) {
				location.href = link.href;
			}
			else
				shown = new_messages;
		}
		setTimeout(look_for_messages, 5000);
	}
}
