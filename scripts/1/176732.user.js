// ==UserScript==
// @id             vimeo.com-40b1433b-38d2-4803-9870-273fce5ad097@meh
// @name           Vimeo auto buffer without autoplay
// @version        1.4
// @namespace      meh
// @author         Yansky
// @description    
// @noframes
// @updateURL		http://userscripts.org/scripts/source/176732.user.js
// @include        http://vimeo.com/*
// @include        https://vimeo.com/*
// @run-at         document-end
// ==/UserScript==

function init(){

	//check if it's only a video page
	if(!/^-{0,1}\d*\.{0,1}\d+$/.test(window.location.href.split('/')[3].split('?')[0].split('#')[0]))
		return;

	var iFra,
		url;

	GM_addStyle('@keyframes userScript__VimeoPlayerInserted {  '+
				'	from {  '+
				'		clip: rect(1px, auto, auto, auto);  '+
				'	}'+
				'	to {  '+
				'		clip: rect(0px, auto, auto, auto);'+
				'	}  '+
				'}'+
				'object[id^="player"]{'+
				'	animation-duration: 0.001s;'+
				'	animation-name: userScript__VimeoPlayerInserted;'+
				'}'			
				);	

				
	document.addEventListener("animationstart", function (event){ 

		if (event.animationName !== "userScript__VimeoPlayerInserted")
			return;
			
		var origVid = document.querySelector('object[id^="player"]');
		var vidID = origVid.id.split('player')[1].split('_')[0];
		var parNode = origVid.parentNode;

		parNode.removeChild(origVid);

		iFra = document.createElement('iframe');
		iFra.setAttribute('src',window.location.protocol+'//player.vimeo.com/video/'+vidID+'?api=1&player_id=buffer_vimeoplayer');
		iFra.setAttribute('id','buffer_vimeoplayer');
		iFra.setAttribute('allowfullscreen','true');
		iFra.setAttribute('frameborder','0');
		iFra.setAttribute('width','100%');
		iFra.setAttribute('height','100%');

		parNode.appendChild(iFra);

		url = window.location.protocol+'//player.vimeo.com/video/'+vidID;

		window.addEventListener('message', onMessageReceived, false);
		
	}, false);	

	// Helper function for sending a message to the player
	function post(action, value) {
	    var data = { method: action };
	    
	    if (value) {
	        data.value = value;
	    }
	    
	    iFra.contentWindow.postMessage(JSON.stringify(data), url);
	}

	// Handle messages received from the player
	function onMessageReceived(e) {
	    var data = JSON.parse(e.data);
	    
	    if(data.event === 'ready'){

			post('addEventListener', 'play');
	    	post('play');

	    }
	    if(data.event === 'play'){

			post('pause');
	    	window.removeEventListener('message', onMessageReceived, false);

	    }

	}

}

init();







