// ==UserScript==
// @name Anti-FBVids-Like
// @namespace Kingdread
// @description This Script removes the Like on fbvids.de
// @version 1.0.0
// @run-at document-end
// @include http://www.fbvids.de/video-*
// ==/UserScript==
function run()
{
	var scripts = document.getElementsByTagName("script");
	for (var i = 0; i < scripts.length; i++)
	{
		var script = scripts[i];
		if (script.text != "" && script.src == "")
		{
			// Here we got the right Script Element: script
			var Reg = /\n\tvar cc = '(.+)';\n/; // Using a regex (i love them) to get the URL
			var Match = Reg.exec(script.text);
			if (Match != null) // Hopefully this block will be executed once everytime
			{
				var ncc = Match[1]; // Yeah, got the Video-Embed-Code
				document.getElementById("realesvideo").innerHTML = ncc;
				document.getElementById("fblikeframe").style.display = "none";
			}
		}
	}
}
// Because of the @run-at metatag, we don't need this:
// window.addEventListener("load", run, false);
// We can directly call the function:
run();
// If there are any problems, just change this back