// ==UserScript==
// @name           4chan XXX and image name expander (updater compatible)
// @namespace      JYC
// @description    Removes the XXX and replaces abbreviated image names with the full file name.  Compatible with updaters like 4chan X Updater
// @include        http://boards.4chan.org/*
// ==/UserScript==

// POST NUMBER EXPANSION COPIED FROM 4chan no XXX BY rossy!: http://userscripts.org/scripts/review/75140

function replaceNumbersInElement(e)
{
	var tags = e.getElementsByClassName("quotejs");
	for(var tag in tags)
		if(tag = tags[tag], tag.getAttribute("href").indexOf("#q") + 1 || tag.getAttribute("href").substring(0, 16) == "javascript:quote")
			if(tag.textContent.substring(tag.textContent.length - 3) == "XXX")
			{
				tag.removeChild(tag.firstChild);
				tag.appendChild(document.createTextNode(tag.parentNode.getAttribute("id").match(/\d\d*/)));
			}
			else
				break;
}

function replaceImageFilenames(e)
{
	var fileHeaders = e.getElementsByClassName("filesize");
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