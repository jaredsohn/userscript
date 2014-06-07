// ==UserScript==
// @id             store.steampowered.com-8fbcf22b-06db-4e1d-a4e9-a064b9fd02ce@meh
// @name           Steam Autobuffer Videos Without Autoplay
// @version        1.1
// @namespace      meh
// @author         Yansky
// @description    Steam Autobuffer Videos Without Autoplay
// @include        http://store.steampowered.com/app/*
// @include        https://store.steampowered.com/app/*
// @match        http://store.steampowered.com/app/*
// @match        https://store.steampowered.com/app/*
// @updateURL        https://store.steampowered.com/app/*
// @run-at         document-end
// ==/UserScript==

document.cookie = 'bGameHighlightAutoplayDisabled=false; expires=; path=/';

var hasPLayed = false;

cssString = '@keyframes SteamVideoPlayerInserted {  '+
			'	from {  '+
			'		clip: rect(1px, auto, auto, auto);  '+
			'	}'+
			'	to {  '+
			'		clip: rect(0px, auto, auto, auto);'+
			'	}  '+
			'}'+
			'@-webkit-keyframes SteamVideoPlayerInserted {  '+
			'	from {  '+
			'		clip: rect(1px, auto, auto, auto);  '+
			'	}'+
			'	to {  '+
			'		clip: rect(0px, auto, auto, auto);'+
			'	}  '+
			'}'+			
			'object[id^="movie_"] {'+
			'	animation-duration: 0.001s;'+
			'	-webkit-animation-duration: 0.001s;'+
			'	animation-name: SteamVideoPlayerInserted;'+
			'	-webkit-animation-name: SteamVideoPlayerInserted;'+
			'}';
			

			
var head = document.getElementsByTagName('head')[0]; 
var newCss = document.createElement('style'); 
newCss.type = "text/css"; 
newCss.innerHTML = cssString; 
head.appendChild(newCss); 

			
function domInsListener(event){

	if (event.animationName !== 'SteamVideoPlayerInserted') 
		return;
		
	console.log('SteamVideoPlayerInserted');
	
	setVidUp();
	
}			
			
document.addEventListener('animationstart', domInsListener, false);	
document.addEventListener('webkitAnimationStart', domInsListener, false);


function setVidUp(){

	
	var fileName = document.querySelector('param[name="flashvars"]').value.split('&').filter(function (el, index, arr) {
	
		return (el.indexOf('FILENAME=')>-1)
		
	})[0].split('FILENAME=')[1];

	var video_player = document.querySelector('object[id^="movie_"]');
	var playerContainer = video_player.parentNode;
	
	playerContainer.removeChild(video_player);
	
	var videoThum = playerContainer.querySelector('script').innerHTML.split('poster="')[1].split('"')[0];
	
	var newflow = document.createElement('object');
	newflow.setAttribute("data","http://releases.flowplayer.org/swf/flowplayer-3.2.1.swf");
	newflow.setAttribute("type","application/x-shockwave-flash");
	newflow.setAttribute("width","600");
	newflow.setAttribute("height","338");


	var params1 = document.createElement('param');
	params1.setAttribute("value","http://releases.flowplayer.org/swf/flowplayer-3.2.1.swf");
	params1.setAttribute("name","movie");

	newflow.appendChild(params1);

	var params2 = document.createElement('param');
	params2.setAttribute("value","true");
	params2.setAttribute("name","allowfullscreen");

	newflow.appendChild(params2);
	
	var params3 = document.createElement('param');
	params3.setAttribute("value","config={'playlist':['"+videoThum+"', {'url': '"+fileName+"','autoPlay':false,'autoBuffering':true}]}");
	params3.setAttribute("name","flashvars");

	newflow.appendChild(params3);	
	
	playerContainer.appendChild(newflow);	
		
}