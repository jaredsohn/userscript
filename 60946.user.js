// ==UserScript==
// @name           Disqus Comments
// @namespace      http://chickerino.com
// @description    Adds disqus comments to any site
// @include        http://news.bbc.co.uk*
// ==/UserScript==

var disqusContainer = document.createElement("div");
disqusContainer.id = "disqus_thread";
disqusContainer.setAttribute("style", "padding : 40px 0;");

//put the disqus container at the right point
var storyBody = document.getElementsByClassName("storybody");
if(storyBody.length == 1)
{
	storyBody[0].appendChild(disqusContainer);

	unsafeWindow.document.write = function(html)
	{
		var htmlEl = document.createElement("span");
		htmlEl.innerHTML = html;
		document.body.appendChild(htmlEl);
	}

	var script = document.createElement("script");
	script.src = "http://disqus.com/forums/chickerino/embed.js";
	document.body.appendChild(script);
}

