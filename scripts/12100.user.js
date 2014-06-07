// ==UserScript==
// @name          TurkHelper for Steve Fossett
// @namespace     http://www.skateatlas.com/GreaseMonkey/turkhelper
// @description	  v1.06 - Please refresh to the latest if you have an older version. While participating in the search efforts I found the Turk steps tedious. This quick script should make the process smoother by scrolling to the image, defaulting the form to 'No' and providing a keyboard shortcut [Ctrl->N] to submit your analysis. Remember to use your mouse if you find something that requires another look. (See script for version info). Added Ctrl-I to scroll to image container.
// @include       http://www.mturk.com/mturk/*
// @exclude       http://www.mturk.com/mturk/preview*
// @version       1.06
// Version History
//		1.06
//		 Added fix for: [BUG] If you find an image that might have a clue and you start typing a description into the "clarifying comments" area, once you type an 'N' or 'n' the HIT submits itself.
//		 - Alt Keys added to keyboard shortcuts to prevent accidental submits
//		 - Alt->N now submits the hit with a 'No' response
//		 - Alt->I now scrolls to the image container.
//		1.05
//		 - Script is now Captcha aware
//		1.04
//		 - Removed the http://www.mturk.com/mturk/accept* exclusion which prevented the script on just accepted hits
//		1.03
//		 - Added exclusion for non-entry forms
//		 - Switched the scrolling logic to use a static value rather than a known element - change due to new form layout
//		1.02
//		 - Added a keyboard shortcut(N|n) to fire the submit button on the form
// 		1.01  
//		 - Fixed the include filter so it would work on /mturk/submit pages
//		 - Added an exit condition if Steve's name isn't found on the page
// ==/UserScript==

var elem = document.getElementById('hit-wrapper');
if(elem == null || elem.innerHTML.indexOf('Steve Fossett') == -1) return;

// Scroll to a comfortable position to review the image
window.scrollTo(0, 118);

// Load input elements into array
var inputs = document.getElementsByTagName('input');

// When the Captcha exists, set focus to it and exit
if(document.documentElement.innerHTML.indexOf('userCaptchaResponse') != -1) 
{
	// Captcha html defintion
	// <input value="" size="60" name="userCaptchaResponse"/>
	// Loop over the elements until captcha is found
	for(var i = 0; i < inputs.length; i++)
	{
		if(inputs[i].name == 'userCaptchaResponse')
		{
			inputs[i].focus();
			return;
		}
	}
}

// Grr, can't select elements by ID        
var firstItem = true;
for(var i = 0; i < inputs.length; i++)
{
    if(src = inputs[i].id == 'Answer_1')
	{
		if(firstItem)
		{
			firstItem = false;
			continue;			
		}
		else
		{
			inputs[i].checked = true;
			break;
		}
	}
}

window.addEventListener('keypress', keyscan, true);
function keyscan(e)
{
	if((e.charCode == 78 || e.charCode == 110) && e.altKey)
	{
		// Ctrl-N  Submit the form
		document.forms[1].submit();
		e.preventBubble();
	} 
	else if((e.charCode == 73 || e.charCode == 105) && e.altKey)	
	{
		// Ctrl-I  Scroll to the Image container
		document.getElementById('hit-wrapper').scrollIntoView();
		e.preventBubble();
	}
}
    
