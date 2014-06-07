// ==UserScript==
// @name				Auto-HD ShackVideos
// @version			1.0.2
// @author			DOOManiac
// @namespace		http://doomaniac.shackspace.com/greasemonkey/
// @description	Automatically chooses HD (if available) when watching videos on ShackVideo
// @include			http://*.shackvideo.com/*
// ==/UserScript==

var to = null;

function init()
{
	startTimer();
}

function startTimer()
{
	if (to)
		clearTimeout(to);

	to = setTimeout(switchtoHDButton, 200);
}

function switchtoHDButton()
{
	var div = unsafeWindow.document.getElementById('hdavailable');
	to = null;

	// HD link not available yet. Try again in 150ms
	if (!div)
	{
		startTimer();
		return;
	}

	var children = div.childNodes;
	if (!children)
	{
		startTimer();
		return;
	}

	var childlen = children.length;
	for(var i = 0; i < childlen; i++)
	{
		var node = children[i];
		if (node.className == 'hd' && node.innerHTML == 'HD')
		{
			var href = 'unsafeWindow.' + node.href.replace('javascript:', '');
			eval(href);
		}
	}

	// Why are we going to do this again in 150ms even though we just switched to HD? Because we can load other videos via AJAX
	// One lookup every so often isn't a big hit anyway...
	startTimer();
}

window.addEventListener("load", function(e) { init(); }, false);