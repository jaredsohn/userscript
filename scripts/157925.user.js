// ==UserScript==
// @name          Sproxify
// @description   Sproxify intercepts Spotify links and let you choose where to play it.
// @author        Luca Lischetti <sirlisko@gmail.com>
// @namespace     http://github.com/sirLisko/sproxify
// @include       http://open.spotify.com/*
// @include       https://open.spotify.com/*
// @include       https://play.spotify.com/*
// @version       0.1.3
// ==/UserScript==

(function(){
	'use strict';
	var button;

	function handleApp(){
		button.className = 'sproxify sproxify-app';
		button.href = 'spotify' + window.location.pathname.replace(/\//g, ':');
		button.innerHTML = 'Play me in Spotify App!';
		var login = document.getElementById('login-method');
		if(login){
			login.appendChild(button);
		} else {
			document.getElementById('notification-area').appendChild(button);
			setTimeout(function(){
				button.parentNode.removeChild(button);
			}, 5000);
		}
	}

	function handleWeb(){
		button.className = 'sproxify sproxify-web';
		button.href = window.location.href.replace('open', 'play');
		button.innerHTML = 'Play me in Spotify Web!';
		document.getElementById('header').firstElementChild.appendChild(button);
	}

	button = document.createElement('a');

	if(window.location.pathname !== '/'){
		if(window.location.hostname === 'open.spotify.com'){
			handleWeb();
		} else {
			handleApp();
		}
	}

})();

GM_addStyle(' \
	.sproxify, #login-method .sproxify { background-color: #9eca3b; background-image: -moz-linear-gradient(top,#acd341,#88bd32); background-image: -ms-linear-gradient(top,#acd341,#88bd32); background-image: -webkit-gradient(linear,0 0,0 100%,from(#acd341),to(#88bd32)); background-image: -webkit-linear-gradient(top,#acd341,#88bd32); background-image: -o-linear-gradient(top,#acd341,#88bd32); background-image: linear-gradient(top,#acd341,#88bd32); background-repeat: repeat-x; -ms-filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr=#ffacd341, endColorstr=#ff88bd32, GradientType=0 )"; border: 1px solid #7ea613; -webkit-border-radius: 4px; -moz-border-radius: 4px; border-radius: 4px; -webkit-box-shadow: inset 0 1px 1px rgba(255,255,255,0.8); -moz-box-shadow: inset 0 1px 1px rgba(255,255,255,0.8); box-shadow: inset 0 1px 1px rgba(255,255,255,0.8); display: block; color: #FFF; font-family: "HelveticaNeueW02-75Bold","Helvetica Neue",Helvetica,Arial,sans-serif; font-size: 16px; font-weight: normal; padding: 1em 1.5em; position: absolute; text-align: center; text-decoration: none; text-shadow: 0 -1px 0 #72942a; z-index: 1; } \
	.sproxify:hover, #login-method .sproxify:hover { background-color: #a1cf3c; background-image: -moz-linear-gradient(top,#b2db42,#88bd32); background-image: -ms-linear-gradient(top,#b2db42,#88bd32); background-image: -webkit-gradient(linear,0 0,0 100%,from(#b2db42),to(#88bd32)); background-image: -webkit-linear-gradient(top,#b2db42,#88bd32); background-image: -o-linear-gradient(top,#b2db42,#88bd32); background-image: linear-gradient(top,#b2db42,#88bd32); background-repeat: repeat-x; -ms-filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr=#ffb2db42, endColorstr=#ff88bd32, GradientType=0 )"; border: 1px solid #7ea613; -webkit-box-shadow: inset 0 1px 1px rgba(255,255,255,0.8); -moz-box-shadow: inset 0 1px 1px rgba(255,255,255,0.8); box-shadow: inset 0 1px 1px rgba(255,255,255,0.8); text-decoration: none; text-shadow: 0 -1px 0 #72942a; } \
	#login-method .sproxify { display: block; font-weight: bold; margin: 25px; z-index: 999; } \
	.sproxify-web {	margin: -5px 170px; } \
\ ');
