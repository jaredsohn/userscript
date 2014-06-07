// ==UserScript==
// @id			Gimmebackspace
// @name		Gimmebackspace
// @namespace		http://127.0.0.1
// @description		Allows backspace to function normally on google webpages rather than backspace the search box.
// @author		Qb_Master, genericdave
// @version		1.0.2
// @include		http*://www.google.com
// @include		http*://www.google.com/webhp
// @include		http*://www.google.com/webhp*
// @include		http*://www.google.*/#hl=*
// @include		http*://www.google.*/search*
// @include		http*://www.google.*/webhp?hl=*
// @include		https://encrypted.google.com/
// @include		https://encrypted.google.com/#hl=*
// @include		https://encrypted.google.com/search* 
// @include		https://encrypted.google.com/webhp?hl=*
// @include		http://ipv6.google.com/
// @include		http://ipv6.google.com/search*
// ==/UserScript==

/*
 * DESCRIPTION:
 *
 * In Firefox, this script allows backspace to function normally on google webpages.
 * Although backspace usually goes back a webpage most of the time, google's coders
 * thought it was a good idea to make backspace start erasing text in their search
 * box, which is absurdly annoying.
 *
 * This script corrects that behavior, allowing backspace to function normally as it
 * would on any other page.
 *
 * Most of the credit goes to genericdave. This is his chrome script with a few
 * small modifications to make it work in Firefox with Greasemonkey.
 */

var kickFocus = false
var focused = false

function textBoxThingyFocused()
{
	focused = true
	if (kickFocus)
	{
		document.getElementsByName('q').item(0).blur()
		kickFocus = false
	}
}

function textBoxThingyBlurred()
{
	focused = false
}

document.getElementsByName('q').item(0).onfocus = textBoxThingyFocused
document.getElementsByName('q').item(0).onblur = textBoxThingyBlurred

function timesUp()
{
	document.getElementsByName('q').item(0).blur()
}


window.addEventListener ('keydown', function (e) {
        if (e.keyCode == '8')
	{
		if (e.target.name != "q")
		{
			if (e.shiftKey)
			{
				history.forward()
				setTimeout(timesUp, 1)
				setTimeout(timesUp, 10)
				setTimeout(timesUp, 20)
			}
			else
			{
				history.back()
				setTimeout(timesUp, 1)
				setTimeout(timesUp, 10)
				setTimeout(timesUp, 20)
			}	
			e.preventDefault()
			kickFocus = true
		}
	}
	else if (e.keyCode == '27')
	{
		if (focused)
		{
			setTimeout(timesUp, 1)
		}
		else
		{
			document.getElementsByName('q').item(0).focus()
		}
	}
}, true);
