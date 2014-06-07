// ==UserScript==
// @name        finya message saver
// @namespace   finya
// @description prevent navigation away from unfinished message
// @include     http://www.finya.de/Messages/thread/*/?view=0
// @include     http://www.finya.de/User/profile/*
// @require  	https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// @version     1.3
// ==/UserScript==

// original change date
// Sep 10, 2012 22:10
// Sep 10, 2012 22:10
// Sep 10, 2012 21:56
// Sep 10, 2012 21:48

// check if there's a number or a message
function noUnload(){

	if ($("#msgContent").length > 0 && $("#msgContent").val().length > 0)
		return true;
	// otherwise no message, leave page freely
}

window.onbeforeunload = noUnload;

function unload()
{
    window.onbeforeunload = false;
}

// reactivate
$("#btnSend").click(unload);
