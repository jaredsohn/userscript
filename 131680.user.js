// ==UserScript==
// @name          G+ Hangouts Unlimited
// @description   Automatically confirms the 90-minute periodic prompt asking "Are you still there?", so you can talk without worrying about being disconnected.
// @include       https://plus.google.com/hangouts/_/*
// @match         https://plus.google.com/hangouts/_/*
// @version       1.0.9
// @updateURL     https://userscripts.org/scripts/source/131680.meta.js
// ==/UserScript==

(function(){

	function addJQuery(callback)
	{
		var script = document.createElement("script");
		script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js");
		script.addEventListener('load', function()
		{
			var script = document.createElement("script");
			script.textContent = "(" + callback.toString() + ")();";
			document.body.appendChild(script);
		}, false);
		document.body.appendChild(script);
	}

	function checkForPrompt()
	{
		function simulate(target, evtName)
		{
			evt = document.createEvent("MouseEvents");

			evt.initMouseEvent(evtName, true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0, target);
			target.dispatchEvent(evt);
		}

		function simulateClick(target)
		{
			simulate(target, "mouseover");
			simulate(target, "mousedown");
			simulate(target, "mouseup");
			simulate(target, "mouseout");
		}

		$('div[role="button"]').each(function(idx, item) // For each div with attribute role = "button"
		{
			if ($(item).html().indexOf("Yes") >= 0 || $(item).html().indexOf("Oui") >= 0) // Correct button found
			{
				simulateClick(item);
			}
		});

		setTimeout(checkForPrompt, 15000); // Repeat every 15 seconds
	}

	function init()
	{
		addJQuery(checkForPrompt);
	}

	setTimeout(init, 15000); // Start after 15 seconds

})();