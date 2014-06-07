// ==UserScript==
// @name           EightSixTwo Proper
// @namespace      http://blog.xkcd.com/2011/02/18/distraction-affliction-correction-extensio/
// @description    An extension for distraction affliction correction. Adds a 30 second delay to specified web page you open in your browser. 
// @version        0.5
// @date           2011-02-22
// @author         David Huerta (modified by Jonathan Guidry and Ruben)
// @license        MIT
// @run-at         document-end
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @include       https://*.google.com/reader*
// @include       http://*.google.com/reader*
// @icon          http://imgs.xkcd.com/comics/let_go.png
// ==/UserScript==
	(function(){
		// Note: This doesn't actually stop the page from loading, but hides it, so you know its 
		// there, waiting; The dopamine of internet candy becomes a torture.  Better to clean 
		// your room or open an irb prompt instead.
		
		// You can has cybersauce
		window.showmethemoney = function()
		{
			document.getElementById('eightSixTwoDelay').style.display = 'none';
			clearInterval(kvhkerbtitleflusher);
			document.title = kvhkerbeoldtitle;
		}
		window.nogiveawaymotherfucker = function()
		{
			document.title = "Wait 30 seconds for " + window.location.hostname;
		}
		kvhkerbeoldtitle = document.title;

		var overlay = document.createElement('div');
		overlay.id = 'eightSixTwoDelay';
		overlay.style.backgroundColor = '#000';
		overlay.style.color = '#FFF';
		overlay.style.fontSize = '56px';
		overlay.style.fontFamily = 'Helvetica, Arial, Sans';
		overlay.style.fontWeight = 'bold';
		overlay.style.textDecoration = 'none';
		overlay.style.position = 'fixed'; // wherever you scroll I'll be there, making you work
		overlay.style.top = '0px';
		overlay.style.left = '0px';
		overlay.style.width = '100%';
		// clientHeight changes as content loads, and JS, like the PHX Valley Metro system, does not wait for you to run.
//		if(document.body.clientHeight<600)
			overlay.style.height =  window.outerHeight +"px";
//		else
//			overlay.style.height = document.body.clientHeight + 'px'; //'100%'; 
		overlay.style.paddingTop = '10px';
		overlay.style.paddingLeft = '10px';
		overlay.style.textAlign = 'left';
		overlay.style.zIndex = '10000'; // OVER 9000
		overlay.innerHTML = 'Wait ' +30 + ' seconds.';

		document.getElementsByTagName('body')[0].appendChild(overlay);
		document.getElementsByTagName('body')[0].style.display = "block";

		if (window.top === window.self) {
			setTimeout(window.showmethemoney, 30000);
			kvhkerbtitleflusher = setInterval(window.nogiveawaymotherfucker, 1);
		}
		else showmethemoney();

	})();