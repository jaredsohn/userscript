// ==UserScript==
// @name        sipgate sms saver
// @namespace   sipgate
// @description Warning when navigating away from sms page on sipgate
// @include     https://secure.sipgate.*/user/sms/*
// @require  	https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// @version     1.1
// ==/UserScript==

// check if there's a number or a message
function noUnload(){
	var found = false;
	$(".inputborder").each(function() {
		if (($(this).attr("name") == "msg") || ($(this).attr("name") == "empf"))
		{	
			if ($(this).val().length > 0)
			    found = true;
		}
	});
	if (found)
		return true;
	// otherwise no message, leave page freely
}

window.onbeforeunload = noUnload;

function unload()
{
    window.onbeforeunload = false;
}

$(".white").click(unload);
