// ==UserScript==
// @name            Del.icio.us login -- allow autocomplete
// @namespace       tag:brainonfire.net,2006-10-12:deliciousloginautocomplete
// @description     Removes autocomplete=off for the delicious.com login form, thus allowing password saving in Firefox.
// @include         https://secure.delicious.com/login*
// @version         0.3
// @changelog       Since 0.2: Updated for new domain (delicious.com) and input field identifier (username). Also clears autocomplete from password field.
// ==/UserScript==

/* From http://wiki.greasespot.net/Code_snippets */
function $xpath(p, context)
{
	if(!context)
		context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(i = 0; item = xpr.snapshotItem(i); i++)
		arr.push(item);
	return arr;
}

//main code
$xpath('//input[@type="text"][@id="username"]|//input[@type="password"][@id="password"]').forEach(function(el)
{
	el.removeAttribute('autocomplete');
});
