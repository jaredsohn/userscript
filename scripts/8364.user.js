// ==UserScript==
// @name		   Meebo Message Notification
// @description	   Causes a background browser window running Meebo to request attention (blink) in response to a message
// @namespace	   http://toddfast.com
// @include		   http://www*.meebo.com/index*.html
// @include		   http://www*.meebo.com/
// @include		   https://www*.meebo.com/index*.html
// @include		   https://www*.meebo.com/
// ==/UserScript==

// Meebo's title bar changes text when the window is not in the 
// foreground in a 3-second series. We need to use an interval 
// that is not a multiple of 3 so that we will be able to detect
// the title text changing.

var	interval=2600;

/**
 * We use a simple technique of conjugate functions that call each
 * other through function pointers. This gets around a recursion
 * problem in Greasemonkey with a function that calls itself.
 */
function startChecking(checkFunction)
{
	// Create an anonymous function that will be passed as a closure 
	// to the conjugate function
	var fn=function()
	{
		checkFunction(startChecking);
	}

	setTimeout(fn,interval/2);
}

function checkForMessage(callbackFunction)
{
	// Create an anonymous function that will be passed as a closure 
	// to the conjugate function
	var fn=function()
	{
		// If the title doesn't show "meebo.com", ask the browser
		// to confirm. This will block this script execution and
		// force the window to blink if it is not the foreground
		// window.
		if (document.title.indexOf('meebo.com') < 0)
			confirm('Message received\n\n'+document.title.substring(0,25));

		// Pong		
		callbackFunction(checkForMessage);
	}
	
	setTimeout(fn,interval/2);
}

// Meebo loads a number of documents; only listen to the one whose
// title indicates that it is the main document
if (document.title=="meebo.com")
{
	startChecking(checkForMessage);
}