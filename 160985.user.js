// ==UserScript==
// @name        Synchtube Antikick
// @version     1.0
// @namespace   http://arantius.com/misc/greasemonkey/
// @description PekaFace
// @include     *synch*
// @include     *sosnych*
// ==/UserScript==


var handle_message_default = window.socket.handle_message;
window.socket.handle_message = function (ap, E)
{
	switch(ap)
	{
		case "kick":
			socket.socket.socket.disconnect();
			var g, e, f, d;
			g = this.socket_address;
			this.socket = io.connect(g, this.socket_config);
			socket.socket.socket.connect();
			return;
	}
	return handle_message_default(ap, E);
}

console.log("antikick.js is loaded");