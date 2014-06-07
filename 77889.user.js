// ==UserScript==
// @name           FlowPlayer Plug-In
// @namespace      http://www.sumosoft.tk/
// @description    Makes videos cooler.
// @include        http://www.youtube.com/*
// @include        http://www.youtube.com/watch/*
// ==/UserScript==

flowplayer("player", "http://releases.flowplayer.org/swf/flowplayer-3.2.1.swf", {
	plugins: {
		content: {
			
			// the only required property
			url: 'flowplayer.content-3.2.0.swf',
			
			// some display properties
			height: 220,
			padding:30,
			backgroundColor: '#112233',
			opacity: 0.7,
			
			// one styling property 
			backgroundGradient: [0.1, 0.1, 1.0],
			
			/*** content plugin specific properties ***/
			
			// fetch the actual HTML inside a DIV element on the page
			html: document.getElementById("theContent").innerHTML,
			
			// some styling for the content
			style: {p: {fontSize: 40}}			
		},
		
		// change default skin to "tube"
		controls: {
			url: 'flowplayer.controls-tube-3.2.0.swf'
		}		
	} 
});