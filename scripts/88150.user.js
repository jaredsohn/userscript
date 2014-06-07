// ==UserScript==
// @name         WebCT Fix
// @namespace    will.vousden.me.uk
// @include      *
// @author       Will Vousden
// @description  Something boring.
// ==/UserScript==

(function()
{
	function addJQuery(callback)
	{
		var script = document.createElement("script");
		script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
		script.addEventListener("load", function()
		{
			var script = document.createElement("script");
			script.textContent = "(" + callback.toString() + ")();";
			document.body.appendChild(script);
		}, false);
		document.body.appendChild(script);
	};

	addJQuery(function()
	{
		alert("test");
	});
});
