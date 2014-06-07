// ==UserScript==
// @name            Remove autocomplete attribute form all Forms
// @description     Removes all autocomplete from all forms, to allow password saving.
// @include         *
// @version         0.1
// ==/UserScript==

function $xpath(p, context)
{
	if(!context)
		context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(i = 0; item = xpr.snapshotItem(i); i++)
		arr.push(item);
	return arr;
}

$xpath('//form').forEach(function(el)
{
	el.removeAttribute('autocomplete');
});
