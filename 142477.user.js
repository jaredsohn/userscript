// ==UserScript==
// @name        BlankPageScript
// @namespace   http://userscripts.org/users/410104
// @include     about:blank
// @exclude     *
// @version     1
// @grant       GM_setValue
// @grant       GM_getValue
// ==/UserScript==

if	(window.self == window.top)
{
	if (!GM_getValue("scriptText") || GM_getValue("scriptText") == "help")
	{
		GM_setValue("scriptText", 'alert("Press ESC to open the script console. Press ENTER while in the console to save the script.");');
	}
	var config = false;
	var scriptText = decodeURIComponent(GM_getValue("scriptText"));
	var script = document.createElement('script');
	script.id = "script";
	script.type = "text/javascript";
	script.innerHTML = scriptText;
	try
	{
		document.body.appendChild(script);
	}
	catch(err)
	{
		document.body.removeChild(script);
		alert("The previous script you entered caused an error. Correct the error and try again.");
	}
	var mainstyle = document.createElement('style');
	mainstyle.type = "text/css";
	mainstyle.innerHTML = "#bright, #config{position: fixed; top: 0; left: 0; width: 100%; height: 100%;}\n#bright{background-color: #FFFFFF; z-index: 2147483646;}\n#config{z-index: 2147483647;}\n#scriptField{resize: none; position: absolute; width: 100%; height: 24em; bottom: 0;}";
	document.head.appendChild(mainstyle);
	var bright = document.createElement('div');
	bright.id = "bright";
	var brightstyle = document.createElement('style');
	brightstyle.type = "text/css";
	brightstyle.innerHTML = "#bright, #config{display: none;}";
	document.head.appendChild(brightstyle);
	document.body.appendChild(bright);
	var configdiv = document.createElement('div');
	configdiv.id = "config";
	var scriptField = document.createElement('textarea');
	scriptField.id = "scriptField";
	scriptField.value = scriptText;
	configdiv.appendChild(scriptField);
	document.body.appendChild(configdiv);
	var handleKeyDown = function(e)
	{
		var target;
		if(e.target)
		{
			target = e.target;
		}
		if (window.event)
		{
			e = window.event;
		}
		if	(e.keyCode == 27)
		{
			config = !config;
			if	(!config)
			{
				brightstyle.innerHTML = "#bright, #config{display: none;}";
			}
			else if (config)
			{
				brightstyle.innerHTML = "#bright{opacity: 0.5;}\n#config{display: block;}";
			}
		}
		if (config && e.keyCode == 13 && target.id == scriptField.id)
		{
			GM_setValue("scriptText", encodeURIComponent(scriptField.value));
		}
	};
	window.addEventListener("keydown", handleKeyDown, false);
}