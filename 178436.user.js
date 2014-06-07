// ==UserScript==
// @id             reddit.tv-800a7ec1-4533-4fda-b769-5edd469bc629@reddit
// @name           reddit.tv autobuffer with no autoplay
// @version        1.1
// @namespace      reddit
// @author         Yansky
// @updateURL		http://userscripts.org/scripts/source/178436.user.js
// @noframes
// @description    reddit.tv autobuffer with no autoplay
// @include        http://reddit.tv/*
// @include        https://reddit.tv/*
// @run-at         document-end
// ==/UserScript==


//can't use unsafeWindow for flash events, so...
var scr = document.createElement('script');

scr.innerHTML = 'var userScript_4_RedditTV = {};userScript_4_RedditTV.hasPlayed = false;	'+
				'userScript_4_RedditTV.pauseYTPlayer = function (state){ 	'+

				'	if(state === 1 && !userScript_4_RedditTV.hasPlayed){	'+

				'		userScript_4_RedditTV.hasPlayed = true;	'+
				'		document.querySelector("#ytplayer").pauseVideo();	'+

				'	}	'+

				'};	'+
				'function onYouTubePlayerReady(playerId) {'+
				'	youtube.obj = document.getElementById("ytplayer");'+
				'	youtube.obj.addEventListener("onStateChange", "youtube.stateListener", true);'+
				'	youtube.obj.addEventListener("onError", "youtube.errorListener", true);'+
				'	youtube.stateListener(-1);'+
				'	userScript_4_RedditTV.hasPlayed = false;'+
				'	document.querySelector("#ytplayer").addEventListener("onStateChange", "userScript_4_RedditTV.pauseYTPlayer", true);'+
				'}';

document.body.appendChild(scr);

var vimeoIframe = null;

var target = document.querySelector('#video-embed');

var observer = new MutationObserver(function(mutations) {

	mutations.forEach(function(mutation) {

		if(mutation.type === "childList" && mutation.addedNodes.length>0){
			
			//if it's a vimeo video iframe
			if(mutation.addedNodes[0].nodeName === "IFRAME"){

				vimeoIframe = mutation.addedNodes[0];
				window.addEventListener('message', onMessageReceived, false);

			}

		}

	});    

});

observer.observe(target, {childList: true});

function onMessageReceived(e) {

    var data = JSON.parse(e.data);

    if(data.event === 'ready'){

    	post('addEventListener', 'play');

    }
    if(data.event === 'play'){

    	post('pause');
    	window.removeEventListener('message', onMessageReceived, false);

    }

}

function post(action, value) {

    var data = { method: action };
    
    if (value) {

        data.value = value;

    }
    
    vimeoIframe.contentWindow.postMessage(JSON.stringify(data), vimeoIframe.src.split('?')[0]);

}



