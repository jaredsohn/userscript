// ==UserScript==
// @name          Next/Previous Page keys
// @version       1.0.0
// @author        zeel
// @description	  Use arrow keys to move through pages on webcomics (or anything else you can use it for).
// @include       *.legostargalactica.net*
// ==/UserScript==
//
//INSTRUCTIONS:
//
//	Add 'else if' statements after the if on line 22.
//	Use a similar check as I am useing to see if the current page is the one you want.
//	Now add code that finds out what the URLs of the next page, and previous pages are.
//	Define the propper variables and your good to go.
//  Long as you don't forget to @include the new site that is. . .
//

var next = null;																//Define this with the URL of the next page.
var prev = null;																//Difine this with the URL for the previous page.
var scrolliD = null;															//Optional. Difine this with the ID of the element you wish to scroll to when the page loads (so you skip the header)

if (/legostargalactica/.test(window.location.href)) {							//Check if I am viewing the comic: "legostargalactica"
	scrolliD = 'menubar';														//I know that there is a IDed element that I want to scroll to, so I define this varyable with its ID
	var links = document.getElementById('menunav').getElementsByTagName('a');	//I now grab the two links that are for next/prev
	prev = links[0].href;														//And I put the first one in orev
	next = links[1].href;														//And the second one in next
}

document.addEventListener('keydown', keyListener, false);						//Add a listener for the keyboard
if (scrolliD != null) {															//If the scrolliD is no longer null, it must have been redefined by something earlier in the code, like line 23
	window.location.href = '#' + scrolliD;										//Just send the window to it.
}

function keyListener(k) {														//Function that handles the page changeing
	if (k.keyCode == 37) {														//Left arrow?
		window.location = prev;													//Previous page
	}
	else if (k.keyCode == 39) {													//Right arrow?
		window.location = next;													//Next page
	}
}