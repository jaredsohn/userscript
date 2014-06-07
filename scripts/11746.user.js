// ==UserScript==
// @name         Runescape Forum Log-In 
// @namespace    mikelid
// @description  Redirects your browser to the page you were viewing before you logged in
// @author       mikelid109
// @include        *runescape.com*

// ==/UserScript==
var cookiehref, id;

if(readCookie('redirect') != null)
{
  //Redirect the window with the id
  cookiehref = readCookie('redirect');
  eraseCookie('redirect');
  window.location = window.location.href.replace('index.html',cookiehref);
}

document.addEventListener('click', function(event) {
    // event.target is the element that was clicked

    // do whatever you want here
    if(event.target.href.match('http://www.runescape.com/loginapplet/*'))
    {
      locationstring = window.location.href.replace('http://forum.runescape.com/','');
      createCookie('redirect',locationstring,1);
    }
    // if you want to prevent the default click action
    // (such as following a link), use these two commands:
}, true);




//Taken from http://www.quirksmode.org/js/cookies.html
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}