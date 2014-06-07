// ==UserScript==
// @name           Fark Link Trimmer
// @namespace      http://jmillikin.selfip.org/greasemonkey/
// @description    Remove go.pl from Fark.com article links, to avoid cluttering up history searches
// @include        http://www.fark.com/
// ==/UserScript==

(function() {

var trim_fark_cruft = function (href)
{
	return unescape (href.substr (href.indexOf ("&l=") + 3));
};

var headlines = document.getElementsByClassName ('headlineRow');
for (var ii = 0; ii < headlines.length; ii++)
{
	var anchors = document.evaluate (".//a[starts-with(@href, 'http://go.fark.com')]",
	                                 headlines[ii], null,
	                                 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var jj = 0; jj < anchors.snapshotLength; jj++)
	{
		var anchor = anchors.snapshotItem (jj);
		anchor.href = trim_fark_cruft (anchor.href);
	}
}

})();