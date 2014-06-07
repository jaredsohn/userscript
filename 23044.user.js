// ==UserScript==
// @name           dAmnBroadCaster
// @namespace      Kyogo
// @description    Broadcasts a message or action to all joined chats
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==

/* .:*dAmnBroadCaster*:.
* Author: Kyogo
* Creation date: Tuesday, February 12th 2008 (7:38 AM) [0.1a]
* Purpose: Sends a message or action to all joined chats at once.
* Usage: either click the 'Broadcast Message' link next to the 'chatroom settings' link or in the "Tools -> GreaseMonkey -> User Script Commands -> Broadcast Message" link in the FireFox top Menu.
* NOTES: This script is NOT to be modified for any reason including reasons of malice.
* Credits: Siebenzehn, for the script that makes a link next to the chatroom settings link */
setTimeout(function() {
with(unsafeWindow) {

ready = false;

function bc(e)
{
	if( ready ) {
	type = window.confirm("Would you like the broadcast to be: An Action [/me] (OK) or A normal message (CANCEL)");
	if( !type ) {
	message = window.prompt("Please enter a message to broadcast.");
	if( !message ) { 
		return false;
		ready = false; 
	} else {
	dAmn_objForEach( dAmnChats, function(o,n){ dAmn_Raw( 'send '+n+'\n\nmsg main\n\n'+message ); } );
	ready = false;
	}
	} else {
	message = window.prompt("Please enter a message to broadcast.");
	if( !message ) { 
		return false;
		ready = false; 
	} else {
	dAmn_objForEach( dAmnChats, function(o,n){ dAmn_Raw( 'send '+n+'\n\naction main\n\n'+message ); } );
	ready = false;
	}
	}
}
}

try {
		GM_registerMenuCommand('Broadcast Message', function(e) { ready = true; bc(); });
	} catch(e) {}


var t = document.getElementById('chatroomsettingslink');
var link = document.createElement('a');
link.onclick = function(e) { ready = true; bc(); };
if (link.captureEvents) link.captureEvents(Event.CLICK);
link.style.cursor = 'pointer';
link.innerHTML = 'Broadcast Message';
var spacer = document.createElement('span');
spacer.appendChild(document.createTextNode(' | '));
spacer.setAttribute("id","extendspacer");
t.parentNode.insertBefore(spacer,t);
t.parentNode.insertBefore(link,spacer);

}
},1);