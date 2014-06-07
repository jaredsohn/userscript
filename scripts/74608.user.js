// ==UserScript==
// @name           4chan.org gif colored borders
// @namespace      Wjb
// @description    Colors borders around gif images
// @include        http://boards.4chan.org/*/*
// @exclude        http://boards.4chan.org/gif/*
// ==/UserScript==

GM_registerMenuCommand('Gif border size', borderSize);
GM_registerMenuCommand('Gif border color', borderColor);

updateCSS();

var imageExpr = document.evaluate('/html/body/form[@name="delform"]//a/img', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = 0; i < imageExpr.snapshotLength; i++)
{
	var image = imageExpr.snapshotItem(i);
	var aHref = image.parentNode.getAttribute('href');
	if(aHref.substr(aHref.length - 4).match(/\.gif$/i))
	{
		image.setAttribute('class', 'gifBorder');
	}
}

function borderSize()
{
	var p = prompt('Border size', GM_getValue('borderSize', '2px'));
	if(p != null)
	{
		if(p.match(/^\d+px$/))
			GM_setValue('borderSize', p);
		else if(p.match(/^\d+$/))
			GM_setValue('borderSize', p + 'px');
		else if(p == '')
			GM_deleteValue('borderSize');	// default
		
		updateCSS();
	}
}

function borderColor()
{
	var p = prompt('Border color (rgb)', GM_getValue('borderColor', '#ff0000'));
	if(p != null)
	{
		if(p.match(/^#[0-9a-f]{6,6}$/i))	// match #123456
			GM_setValue('borderColor', p);
		else if(p.match(/^[0-9a-f]{6,6}$/i))	// match 123456
			GM_setValue('borderColor', '#' + p);
		else if(p == '')
			GM_deleteValue('borderColor');	// default
		
		updateCSS();
	}
}

function updateCSS()
{
	GM_addStyle("img.gifBorder { border-width: " + GM_getValue('borderSize', '2px') + "; border-color: " + GM_getValue('borderColor', '#ff0000') + "; }");
}
