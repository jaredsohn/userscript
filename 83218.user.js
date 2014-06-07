// ==UserScript==
// @name           Flowdock Chat Notifier
// @namespace      blah
// @description    Plays a sound when new messages come in chat.  Based on GMail Sound Notify.
// @version      1.3
// @match          https://*.flowdock.com/*
// @include        https://*.flowdock.com/*
// @resource       GMwavaudio http://gmflowplayer.googlecode.com/files/notify.wav
// ==/UserScript==


window.addEventListener(
  'load',
  function() {
    var savedLastChatNode = null;
    var firstRun = true;
    window.setInterval(
    	function(){
		    var chatContainer = document.getElementById('chat_app_lines');
		    if (chatContainer) {
		       	var lastChatNode = chatContainer.lastChild;
		       	if (lastChatNode != savedLastChatNode) {
				savedLastChatNode = lastChatNode;
				if (!firstRun) {
					// Clean up the old audio if it exists
					var oldAudio = document.getElementById('notifier');
					if(oldAudio) {
						document.body.removeChild(oldAudio);
						oldAudio = null;
					}
					// Embed new audio to play.
					var audio = document.createElement('embed');
					audio.setAttribute('src', 'http://gmflowplayer.googlecode.com/files/notify.wav');
					audio.setAttribute('autostart', 'true');
					audio.setAttribute('hidden', 'true');
					audio.setAttribute('enablejavascript', 'true');
					audio.id = 'notifier';
					document.body.appendChild(audio);
				} else {
					firstRun = false;
				}
				
					
		       	}
	       	}
		
	
	     }, 
	     2000
	);

}, false);