// ==UserScript==
// @name          Patch ClickToFlash on YouTube
// @namespace     aidilfbk
// @description   Uses CSS to fix styling <video> tags created by ClickToFlash on Youtube (For use with GreaseKit and ClickToFlash on Safari)
// @version       2.2
// @include       http://*.youtube.com/watch*
// ==/UserScript==
(function(){
	// Backup YouTube's seekTo function
	window.yt.www.watch.player['seekTo2'] = window.yt.www.watch.player.seekTo;
	
	// Listen for changes in #watch-player (Primarily when Flash player is replaced with <video> by ClickToFlash)
	document.getElementById('watch-player').addEventListener('DOMSubtreeModified', function(){
		// Confirm Flash has been replaced
		var video = this.querySelector('video');
		if(video !== null){
			// Native <video> seekTo function, compatible with YouTube
			window.yt.www.watch.player.seekTo = (function(video){
				return function(){
					video.currentTime = a;
	                window.scroll(0, 0)
	                video.play()
				}
            })(video);
            
			// Bind click to emulate the Flash player's Pause/Play/Play Again
            video.addEventListener('click', function(){
                if(this.ended) {
                    //this.currenttime = 0;
                    this.loop = true
                    this.play();
                    this.loop = false
                }
				else if(this.paused) this.play()
                else this.pause();
            })
        }
    })
	
	// Add stylesheet with proper CSS to fix styling of <video> tag
	var head = document.getElementsByTagName('head')[0], 
	    style = document.createElement('style'),
		css = '#watch-player video {height:100% !important; width:100% !important; position:relative; background:#000; -webkit-border-radius:7px}';
	if (!head || self.location != top.location) {return}
	style.type = 'text/css';
	try {style.innerHTML = css}
	catch(x) {style.innerText = css}
	head.appendChild(style);
})();