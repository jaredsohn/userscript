// ==UserScript==
// @name           Gametrailers.com Remove Age Verification
// @namespace      www.example.com
// @description    Removes age verification from videos.
// @include        http://www.gametrailers.com/video/*
// ==/UserScript==

// Initialize jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() 
{
	if(typeof unsafeWindow.jQuery == 'undefined') 
		window.setTimeout(GM_wait,100);
	else 
	{
		$ = unsafeWindow.jQuery;
		main();
	}
}
GM_wait();

function main()
{
	$("#AgegateLayer").hide();
	// Determine if age verification exists
	if ($("#ageCheckDay").length > 0)
	{
		// Set a random day
		$("#ageCheckDay").val(Math.floor(Math.random()*26) + 1);
		// Calculate year so age is at least 40
		var y = (new Date).getFullYear() - (Math.floor(Math.random()*21) + 50);
		$("#ageCheckYear").val(y).next().click();
	}
}