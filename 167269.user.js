// ==UserScript==
// @id             www.imdb.com-3cb764c9-45d3-45d8-ae2f-5021dead94b9@bkmrx
// @name           IMDB - Autobuffer Video With No Autoplay
// @version        1.2
// @namespace      IMDB 
// @author         Yansky
// @description    
// @include        http://www.imdb.com/video/playlist/title*
// @include        https://www.imdb.com/video/playlist/title*
// @run-at         document-end
// ==/UserScript==

var hasPLayed = false;

GM_addStyle('@keyframes IMDBPlayerInserted {  '+
			'	from {  '+
			'		clip: rect(1px, auto, auto, auto);  '+
			'	}'+
			'	to {  '+
			'		clip: rect(0px, auto, auto, auto);'+
			'	}  '+
			'}'+
			'#video-body object {'+
			'	animation-duration: 0.001s;'+
			'	animation-name: IMDBPlayerInserted;'+
			'}'
			);
			
function domInsListener(event){

	if (event.animationName !== 'IMDBPlayerInserted') 
		return;
		
	hasPLayed = false;
	
	unsafeWindow.jwplayer().onPlay(function(){
	
		if(hasPLayed)
			return;
			
		hasPLayed = true;
		
		this.play(false);
		
	});

}			
			
document.addEventListener('animationstart', domInsListener, false);			

