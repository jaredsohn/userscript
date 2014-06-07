// ==UserScript==
// @name           Hide update row for inactive WordPress plugins
// @description    I have several plugins that are deactivated for the long haul (some need *significant* work before I reactivate them), and I'm not interested in seeing "new version available" for those.
// @include        */wp-admin/plugins.php*
// @version        1.0
// @changelog      First version. Built for WordPress 2.5.
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


$xpath('//tbody[@id="plugins"]/tr[td[@class="plugin-update"]][preceding-sibling::tr[1][td[@class="status"][span[@class="inactive"]]]]').forEach(function(el)
{
	el.parentNode.removeChild(el);
})
