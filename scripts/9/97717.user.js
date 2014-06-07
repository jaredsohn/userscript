// ==UserScript==
// @name           EightSixTwo
// @namespace      http://blog.xkcd.com/2011/02/18/distraction-affliction-correction-extensio/
// @description    An extension for distraction affliction correction. Adds a 30 second delay to the display of any web page you open in your browser. 
// @version        0.1
// @date           2011-02-22
// @author         David Huerta
// @license        MIT
// @include        *
// ==/UserScript==

(function(){
	// Note: This doesn't actually stop the page from loading, but hides it, so you know its 
	// there, waiting; The dopamine of internet candy becomes a torture.  Better to clean 
	// your room or open an irb prompt instead.
	window.seconds = 30;
	
	function resetCountDown()
	{
		seconds = 30;
	}

	// You can has cybersauce
	window.clearDelay = function()
	{
		document.getElementById('eightSixTwoDelay').style.display = 'none';
	}

	var overlay = document.createElement('div');
	overlay.id = 'eightSixTwoDelay';
	overlay.style.backgroundColor = '#000';
	overlay.style.color = '#FFF';
	overlay.style.fontSize = '56px';
	overlay.style.fontFamily = 'Helvetica, Arial, Sans';
	overlay.style.fontWeight = 'bold';
	overlay.style.textDecoration = 'none';
	overlay.style.position = 'absolute';
	overlay.style.top = '0px';
	overlay.style.left = '0px';
	overlay.style.width = '100%';
	// clientHeight changes as content loads, and JS, like the PHX Valley Metro system, does not wait for you to run.
	overlay.style.height = document.body.clientHeight + 'px'; //'100%'; 
	overlay.style.paddingTop = '10px';
	overlay.style.paddingLeft = '10px';
	overlay.style.textAlign = 'left';
	overlay.style.zIndex = '10000'; // OVER 9000

	overlay.addEventListener("click", resetCountDown, true); // THERE IS NO ESCAPE

	document.getElementsByTagName('body')[0].appendChild(overlay);

	window.displayDelay = function()
	{
		if (seconds > -1)
		{
			document.getElementById('eightSixTwoDelay').innerHTML = 'Page ready in ' + seconds + ' seconds.';
			seconds -= 1;
			setTimeout(window.displayDelay, 1000);
		}
		else
		{
			clearDelay();
		}
	}
	
	window.onload = displayDelay();
})();