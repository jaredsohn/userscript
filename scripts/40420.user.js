// ==UserScript==
// @name           Search Rapidshare
// @namespace      SearchRapidshare
// @include        http://search-rapidshare-files.net/search-rapidshare-files.php*
// ==/UserScript==


function fixRsDownloadLink(node, isComment, idx) {
	var anchor, container, background_left, background_middle, background_right;

	var oldHref= node.href;
	var ohrfReg = /^http[s]?:\/\/search-rapidshare-files\.net\/rapidshare-File\.php\?i=(\d+)&file=(.+)$/i;

	node.href = oldHref.replace(ohrfReg, "http://rapidshare.com/files/$1/$2");
}

var xpath = "//a[starts-with(@href, 'http://search-rapidshare-files.net/rapidshare-file.php')]";
var result = document.evaluate ( xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

for ( var i = 0; i < result.snapshotLength; i++ )
{
	fixRsDownloadLink ( result.snapshotItem ( i ), true, i );
}
