// ==UserScript==
// @name         Google Docs Equation Editor Fix
// @namespace      http://www.rudescience.com/userscripts/
// @include      https://docs.google.com/document/*
// @include      http://docs.google.com/document/*
// @include      https://dl.dropbox.com/*
// @include      http://dl.dropbox.com/*
// @version      0.2
// @extension_id	ifjmolgbefhbldkmcjkellbopinimbli
// ==/UserScript==

t_DEBUG = false;

//chrome seems to be adding the script more than once.
if(t_DEBUG)
	console.log("here why does this appear 4 times, should only appear twice");

//need to test these in the global part in order to make decisions about how to attach the main script div
var browser = "other";
if(navigator.userAgent.indexOf("Firefox") != -1) {
	browser = "firefox";
} else if(navigator.userAgent.indexOf("Chrome") != -1) {
	browser = "chrome";
}

//going to use these later to enable functionality in firefox
var environment = "other";
if( typeof (chrome.extension) != "undefined" && typeof (chrome.extension.getURL) == "function") {
	environment = "chrome";
} else if( typeof (GM_deleteValue) != "undefined" && typeof (GM_deleteValue) == "function") {
	environment = "gm";
}

/*
 all this stuff is interacting with the dom so I need to insert it to make it available.
 we rely on the use of the @include header to prevent other sites interfering with script functions and values
 */

if(!document.getElementById("equation_editor.user.js")) {

	var script = document.createElement("script");
	script.setAttribute("id", "equation_editor.user.js");

	switch(browser)
	{
		case "chrome":
			script.setAttribute("src", "chrome-extension://ifjmolgbefhbldkmcjkellbopinimbli/script.js");
			break;
		case "firefox":
		default:
			script.setAttribute("src", "https://dl.dropbox.com/u/4171924/ext1/equation_editor.user.js");
	}
	document.body.appendChild(script);

}

//can be dispatched to targets
//need to add this to global scope, probably should look into setting it elsewhere.
var dollar = false;

//catch me a little delete keyEvent
//@todo probably best to update this to work with directly editing the contents of the current div
var globalDelEvent = false;

if(environment != "other") {
	if(t_DEBUG)
		console.log("in the sandbox, stop! no go, nothing to see here for sandbox.");

} else {(function()
	{

		var t;
		var count = 0;

		function initGoFunctionList()
		{

			clearTimeout(t);
			var keyHandler = function(b)
			{
				try {
					if(b.keyCode == 52 && b.shiftKey == true && b.type == "keydown") {
						if( typeof equationSim == "function") {
							return equationSim(b);
						}
					}

					if(b.keyCode == 8 && b.shiftKey == false && b.type == "keydown") {
						if( typeof catchDelKey == "function") {
							return catchDelKey(b);
						}
					}
				} catch(e) {

				}
			};
			try {
				window.frames[0].document.addEventListener("keydown", keyHandler, true);
			} catch(e) {

			}

		}

		function catchDelKey(b)
		{
			//i know that b is a delete dont need anything else
			if(globalDelEvent)
				return;

			//store the delete key event for later use
			globalDelEvent = b;
		}

		equationSim = function(b)
		{
			if(t_DEBUG)
				console.log(window.dollar);

			function clearTimer()
			{
				dollar = false;
				console.log("cleared");
			}

			//b.cancelBubble = true;
			//b.stopPropagation();
			//b.preventDefault();
			if(t_DEBUG)
				console.log("dollar detected");
			//console.dir(b);
			//those cancellations are not working on chrome, need to check that the event is unique
			if(window.dollar && b.timeStamp != window.dollar) {
				//this is a double dollar in 2 seconds.
				simMouse();
				clearTimer();
				b.stopPropagation();
				b.cancelBubble = true;
				b.preventDefault();
			} else {
				window.dollar = b.timeStamp;
				if(t_DEBUG)
					console.log("timer set");
				var t = setTimeout(clearTimer, 1000);
			}
			//this not appears to be working either
			return false;
		}
		sendBackspace = function()
		{
			if(t_DEBUG)
				console.log("sengin backspace");

			if(!globalDelEvent) {
				//sending a message to the user is causing a crash in google docs,
				//alert("need to use the backspace character to generate a suitable KeyboardEvent");
				return;
			}

			window.frames[0].document.dispatchEvent(globalDelEvent);

		}
		simMouse = function()
		{

			sendBackspace();

			var menuItem;
			var c = document.getElementsByClassName("goog-menuitem-content");
			for(var i = 0; i < c.length; i++) {
				if(c[i].textContent.indexOf("Equation...") != -1) {
					menuItem = c[i]
					console.dir(c[i]);
					break;
				}
			}

			var evt = document.createEvent("MouseEvent");
			evt.initMouseEvent("mousedown", true, //bubble
			true, //cancelable
			window, 1, //detail
			151, //screenX
			296, //screenY
			95, //clientX
			203, //clientY
			false, //ctrlKey
			false, //altKey
			false, //event.shiftKey
			false, //event.metaKey,
			0, //button
			null		//relatedTargets
			);

			evt.detail = 1;
			evt.which = 1;
			evt.cancelable = true;

			var canceled = !menuItem.dispatchEvent(evt);

			var evt = document.createEvent("MouseEvent");
			evt.initMouseEvent("mouseup", true, //bubble
			true, //cancelable
			window, 1, //detail
			151, //screenX
			296, //screenY
			95, //clientX
			203, //clientY
			false, //ctrlKey
			false, //altKey
			false, //event.shiftKey
			false, //event.metaKey,
			0, //button
			null		//relatedTargets
			);

			evt.detail = 1;
			evt.which = 1;
			evt.cancelable = true;

			var canceled = !menuItem.dispatchEvent(evt);

		}
		
		//something is calling the script many times, and it doesn't have a global object
		//so it must be greasemonkey, so ignore that run where
		if(((window.$a) && window.$a == "/mail/images/cleardot.gif") || typeof (GM_deleteValue) != 'undefined') {

		} else {
			if(t_DEBUG)
				console.log("so nothing greasemonkey was detected, so assuming that we running under the main dom");
			t = setTimeout(initGoFunctionList, 2000);
		}

	})();
}