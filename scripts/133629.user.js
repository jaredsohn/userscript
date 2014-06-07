// ==UserScript==
// @name           4chan image name expander
// @namespace      ronox
// @description    Removes abbreviated image names.
// @include        http://boards.4chan.org/*
// @include        https://boards.4chan.org/*
// ==/UserScript==

function replaceImageFilenames(e)
{
	var fileHeaders = e.getElementsByClassName("fileText");
	for(var header in fileHeaders)
	{
		header = fileHeaders[header];
		var spans = header.getElementsByTagName("span");
		if(spans.length > 0)
			spans.item(0).innerHTML = spans.item(0).getAttribute("title");
	}
}

function processElement(e)
{
	replaceImageFilenames(e);
	replaceNumbersInElement(e);
}

processElement(document);

document.body.addEventListener('DOMNodeInserted',
	function (e)
	{
		var target = e.target;
		if(target.nodeName == 'TABLE')
			processElement(target);
	},
	true);