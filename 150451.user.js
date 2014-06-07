// ==UserScript==
// @name           Slingbox Auto Fullscreen
// @description    Automatically puts the Sling Player in Fullscreen Mode upon load. You must have ?fullscreen=y appended to the end of your URL.
// @author         Craig Mouser
// @include        http://newwatch.slingbox.com*
// @version        0.1a
// ==/UserScript==

// Waits until the Fullscreen Button is displayed through Polling
// Once it is displayed, it "clicks" it.
function CheckFullscreenButton()
{
	if(btnFullScreen.style.display == "block")
	{
		btnFullScreen.click();
	} else {
		window.setTimeout(CheckFullscreenButton, 500);
	}
}

function GetVariable(param) {
	//param = param.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	regex_string = "[?&]" + param + "=([^&]*)";
	regex = new RegExp(regex_string);
	paramValue = regex.exec(window.location.href);
	return (paramValue == null) ? "": paramValue[1];
}

var shouldGoFullscreen = GetVariable("fullscreen");
if(shouldGoFullscreen == "y")
{
	var btnFullScreen =document.getElementById("fullscreen");
	window.setTimeout(CheckFullscreenButton, 10000);
}
