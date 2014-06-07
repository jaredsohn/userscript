// ==UserScript==
// @name         Supercook link replacer
// @namespace    http://burx.com
// @description  Make links into real links on supercook.com
// @include      http://supercook.com/*
// @include      http://www.supercook.com
// ==/UserScript==


//Quickly evaluate an xpath expression
function xpath(pattern)
{
	return document.evaluate(pattern, document, null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function wait(c,f)
{
	if(c())
		f();
	else
		window.setTimeout(function (){wait(c,f)},300,false);
}

function get_links()
{
	return xpath("//a[@class='title']");
}

function replace_links()
{
	var links = get_links()
	for(var i = 1; i < links.snapshotLength; i++)
	{
		links.snapshotItem(i).href = links.snapshotItem(i).parentNode.parentNode.parentNode.id;
		links.snapshotItem(i).removeAttribute("onclick");
	}
}

wait(function(){return(get_links().snapshotLength > 1)}, replace_links);
