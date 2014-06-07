// ==UserScript==
// @name           AntiDistractions
// @namespace      http://blog.xkcd.com/2011/02/18/distraction-affliction-correction-extensio/
// @description    Une extension pour corriger la dépendance aux distractions. Ajoute un délai de 30 secondes aux pages web spécifiées.
// @version        0.2
// @date           2011-09-30
// @author         David Huerta (modified by Jonathan Guidry, Jérôme Charaoui)
// @license        MIT
// @include        http*://www.facebook.com/*
// @include        http*://twitter.com/*
// @include        http*://*.lapresse.ca/*
// @grant          none
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
	overlay.style.paddingTop = '30px';
	overlay.style.textAlign = 'center';
	overlay.style.zIndex = '10000'; // OVER 9000

	overlay.addEventListener("click", resetCountDown, true); // THERE IS NO ESCAPE

	document.getElementsByTagName('body')[0].appendChild(overlay);

	window.displayDelay = function()
	{
		if (seconds > -1)
		{
			document.getElementById('eightSixTwoDelay').innerHTML = 'Attends encore ' + seconds + ' secondes.';
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
