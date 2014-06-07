// ==UserScript==
// @name           Jump to Echo Hall
// @namespace      tag://kongregate
// @description    Adds a chat action that lets you switch to a predefined room.  NOTE: THIS SCRIPT IS A PROOF OF CONCEPT. PLEASE USE AT YOUR OWN RISK.
// @include        http://www.kongregate.com/games/*
// @author         MrSpontaneous
// @version        0.1
// @date           06/01/2010
// ==/UserScript==

// Written by MrSpontaneous by special request on 06/01/2010
// NOTE: THIS SCRIPT IS A WORK IN PROGRESS, AND SHOULD ONLY BE EDITED BY THOSE WHO KNOW WHAT THEY'RE DOING

function init_changeRoomEchoHall(doom){
	var change = new dom.Element('option', {"class": "action", onclick: 'holodeck.selectRoom({"name":"Echo Hall","id": "35122","type":"chat", "xmpp_name":"35122"})'}).update("Go to Echo Hall");
	dom.$$(".chat_actions_container").each(function(n){n.down("select").appendChild(change)});

}