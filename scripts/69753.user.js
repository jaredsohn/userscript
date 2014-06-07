// ==UserScript==
// @name          prohardver.hu : all : mark visited links
// @namespace     http://www.prohardver.hu/
// @include       http://www.prohardver.hu/*
// @include       http://prohardver.hu/*
// ==/UserScript==

function addGlobalStyle(css)
{
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head)
		return;

	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

window.addEventListener(
	"load", 
	function() 
	{
		addGlobalStyle("a.visitedlink:visited { text-decoration: line-through !important; }");

		var links = document.evaluate('//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var re = /(www\.)?(prohardver|itcafe|gamepod|mobilarena|logout)\.hu\/(hir|teszt|tema)\//g;
		for (var n = 0; n < links.snapshotLength; n++)
		{
			var link = links.snapshotItem(n);
			if (link.href.match(re))
				link.className += " visitedlink";
		}
	},
	false);