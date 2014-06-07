// ==UserScript==
// @name       Youtube HD Fixed-Large-Wide
// @namespace  http://use.i.E.your.homepage/
// @version    0.3
// @downloadURL https://userscripts.org/scripts/source/448588.user.js
// @updateURL   https://userscripts.org/scripts/source/448588.meta.js
// @description  blah
// @grant					none
// @include					*youtube.com*
// @copyright  2012+, enka
// ==/UserScript==

(function(source){	
	if ('function' == typeof source) {		
		source = '(' + source + ')();';
	}
    
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = source;
    
	document.body.appendChild(script);
	document.body.removeChild(script);
})



(function(){	
	var w = window,
		d = w.document,
		p = null,
		_onYouTubePlayerReady = w.onYouTubePlayerReady || function(){},
		q = {
		'tiny':0,
		'small':1,
		'medium':2,
		'large':3,
		'hd720':4,
		'hd1080':5,
		'hd1440':6,
		'highres':7
		},
		maximum = 'hd1080',
		watch_wide = true;
		
    	w.YoutubeReadyFixedWide = function(){        
		
		if(w.videoPlayer){
			for(var i in w.videoPlayer){
				if(w.videoPlayer[i] && w.videoPlayer[i].setPlaybackQuality){
					p = w.videoPlayer[i];
					break;
				}
			}
		}
		else{
			p = d.getElementById('movie_player') ||
				d.getElementById('movie_player-flash') ||
				d.getElementById('movie_player-html5') ||
				d.getElementById('movie_player-html5-flash');
		}
            
		if(p){            
		if(watch_wide && d.getElementById('watch7-container')!=null){		
			d.getElementById('watch7-container').className = 'watch-wide';
		}			
			p.addEventListener('onStateChange','PlayerStateChangeFixedWide');		
			p.pauseVideo();
		}		
		_onYouTubePlayerReady();
	};
	
	w.PlayerStateChangeFixedWide = function(z){		
		try{            
            
            if(z===-1 && player.className.indexOf('off-screen')<0 && d.location.href.indexOf('watch?v=')>0){            
			var aq = p.getPlaybackQuality(),
			vq = p.getAvailableQualityLevels()[0] || maximum,
			zq = q[maximum] < q[vq] ? maximum : vq;                
            setTimeout(function(){if(q[aq] < q[zq]){p.setPlaybackQuality(zq);}player.className="watch-large watch-playlist watch-playlist-collapsed"},500);
        }  
            else if(z===2 && player.className.indexOf('large')<0){
                setTimeout(function(){if(q[aq] < q[zq]){p.setPlaybackQuality(zq);}player.className="watch-large watch-playlist watch-playlist-collapsed"},500);
                          }

		}catch(e){
			console.log('Youtube player exception: ' + e);
		}
	};
	
	if(w.ytplayer)
		w.ytplayer.config.args.jsapicallback = 'YoutubeReadyFixedWide';

	w.onYouTubePlayerReady = w.YoutubeReadyFixedWide;
});