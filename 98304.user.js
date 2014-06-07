// ==UserScript==
// @name           notify
// @description    Notifies via sound on new chat-entries in Studip
// @namespace      chat PGP3G511
// @description    ping
// @include        https://studip.uni-giessen.de/studip/chat_dispatcher.php*
// @resource       GMwavaudio http://gmflowplayer.googlecode.com/files/receive.wav
// @version        1.00
// @contributor    Julian Bergmann
// ==/UserScript==

var oggB64 = GM_getResourceURL("GMwavaudio");
var ausrc = 'data:audio/wav;base64,'+oggB64.split('data:application/octet-stream;base64,')[1];
var au = document.createElement('audio');
au.setAttribute('src', ausrc);
au.setAttribute('id', 'GMwavaudio');
document.body.appendChild(au);

function pruf(){		
	var letzt;
	setTimeout(pruf, 1000);
	if(GM_getValue('pingpruf')){letzt=GM_getValue('pingpruf');}
	if(document.getElementById('chat_msg').innerHTML!=letzt){
		GM_setValue('pingpruf',document.getElementById('chat_msg').innerHTML);
		au.play()
	}
}

pruf();