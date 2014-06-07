// ==UserScript==
// @name           Google results: Use ping instead of link rewriting
// @namespace      tag:brainonfire.net,2008-03-09:googleresultsping
// @description    Remove link rewriting in Google search results, replace with ping attribute. This alows you to right-click and copy URLs without Google rewriting it under your mouse. Google still gets to track the links as long as you have ping enabled.
// @include        http://www.google.com/search?*
// @version        0.1
// @changelog      First version, looks for "return rwt(this," at beginning of any link.
// ==/UserScript==


/* From http://wiki.greasespot.net/Code_snippets */
function $xpath(p, context)
{
	if(!context)
		context = document;
	var i;
	var arr = [];
	var xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(i = 0; item = xpr.snapshotItem(i); i++)
		arr.push(item);
	return arr;
}


$xpath("//a[starts-with(@onmousedown, 'return rwt(this,')][@href]").forEach(function(el,i,all)
{
	var origMD = el.getAttribute('onmousedown');
	el.setAttribute('onmousedown', 'var faker = {href:this.href}; (function(){'+origMD+'}).call(faker); this.ping = faker.href; var that = this; setTimeout(function(){that.removeAttribute(\'onmousedown\')}, 0);');
});
