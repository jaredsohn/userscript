// ==UserScript==
// @name        Boss Key
// @namespace   info.avramovic.www
// @description Boss key ;) press "b" to go to predefined address
// @include     *
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

//function to set redirect URL
function BK_setURL(defURL)
{
	//ask for url (and suggest passed defURL)
	var url = prompt("URL to redirect when BOSS key is used?", defURL);
	
	//if cancel is pressed, set url to default URL
	if (url == null)
		url = defURL;
	//otherwise, inform user about success
	else
		alert('Great! Press B while on any (html page) to immediately\n go to ' + url + "!\n\nPress SHIFT+B to change redirect URL.");
	
	//save value
	GM_setValue('redirect_url', url);
	
	//return entered value
	return url;
}

$(document).ready(function() {

	//get redirect url
	var url = GM_getValue('redirect_url', false);
	
	//if not set, ask for url
	if (url == false || url == undefined)
		url = BK_setURL('http://localhost');

	//apply keydown listener to all elements...
	$('*').keydown(function(event) {
		//except to inputs and textareas
		if ($(this).is('input') || $(this).is('textarea'))
			return true;
		
		//respond to key B
		if (event.which == 66)
		{
			//if SHIFT is pressed, ask for URL
			if (event.shiftKey)
				url = BK_setURL(url);
			//if not, redirect;
			else
				location.href = url;
		}
		
		//allow execution of other events binded to keydown
		return true;
	});
});