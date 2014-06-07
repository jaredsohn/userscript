// ==UserScript==
// @name					Solo 480p para YouTube
// @namespace					CesarChris710
// @version					v1.5
// @include					*youtube.com*
// ==/UserScript==

// Author: lennart-glauer.de
// Modificado por CesarChris710 Solo para 480p YouTube
// Date: 09.09.12
// License: GNU General Public License v3 (GPL)
// Url: http://userscripts.org/scripts/show/127028

var maximum = 'large';

var settings = {
	small:0,
	medium:1,
	large:2
};

if(!!window.opera){
	unsafeWindow = window;
}else if(!!window.navigator.vendor.match(/Google/)){
	var div = document.createElement('div');
	div.setAttribute('onclick','return window;');
	unsafeWindow = div.onclick();
}

(function(w){
	var d = w.document,
		_onYouTubePlayerReady = w.onYouTubePlayerReady || function(){},
			p;

	w.onYouTubePlayerReady = function(){
		if(!!w.videoPlayer){
			for(var i in w.videoPlayer){
				if(!!w.videoPlayer[i] && !!w.videoPlayer[i].setPlaybackQuality){
					p = w.videoPlayer[i];
					break;
				}
			}
		}else{
			p = d.getElementById('movie_player') ||
				d.getElementById('movie_player-flash') ||
					d.getElementById('movie_player-html5');
		}

		if(!!p){
			if(typeof XPCNativeWrapper === 'function'){
				p = XPCNativeWrapper.unwrap(p);
			}

			p.addEventListener('onStateChange','onPlayerStateChange');

			return _onYouTubePlayerReady();
		}
	};

	w.onPlayerStateChange = function(){
		var vq = p.getAvailableQualityLevels();
		p.setPlaybackQuality(settings[maximum] < settings[vq[2]] ? maximum : vq[2]);
	};

	w.onYouTubePlayerReady();

})(unsafeWindow);