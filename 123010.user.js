// ==UserScript==
// @name           watchop.com video
// @namespace      http://www1.watchop.com/
// @include        *watchop.com/watch*
// @version		   1.1
// ==/UserScript==

window.clean = function()
{
	
	var side = document.getElementById("side-a");
	var del = document.getElementById("side-b");
	if(del != null && side != null)
	{
		var parent = del.parentNode;
		parent.removeChild(document.getElementById("side-b"));
		
		side.setAttribute("style", "width: 900px;");
	}
}

window.bigVideo = function()
{
	var embedcode = document.getElementById("embedcode");
	var iframe = null;
	
	if(embedcode != null)
	{
		iframe = embedcode.getElementsByTagName("iframe")[0];
		
		// Iframe maximize
		if(iframe != null)
		{
			iframe.setAttribute("width", "900");
			iframe.setAttribute("height", "600");
			// Flashplayer maximize (videoweed)
			iframe.setAttribute("src", iframe.getAttribute("src").replace("width=670", "width=900").replace("height=400","height=600") );
		}
		else
		{
			if(document.getElementsByTagName("embed")[0] != null)
			{
				var embed = document.getElementsByTagName("embed")[0];
				embed.setAttribute("width", "900");
				embed.setAttribute("height", "600");
			}
		}
	}
}

window.css = function()
{
	var cssString = '#side-a { font-size: 11px ! important; }';
	
	var head = document.getElementsByTagName('head')[0];
		
	var newCss = document.createElement('style');
	newCss.type = "text/css";
	newCss.innerHTML = cssString;
	head.appendChild(newCss);
}

window.init = function()
{
	window.bigVideo();
	window.css();
	window.clean();
}

window.init();
