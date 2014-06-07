// ==UserScript==
// @name	Slate.com Single-Page Format v0.2
// @namespace	http://www.elbedesign.com/
// @description	Rewrites links to slate.com to the single page version. Based on the NYTimes v.2 version.
// @include	*
// ==/UserScript==
(function()
{
	var xpath = "//a[contains(@href,'slate.com')]";
	var res = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var i, link;

	for (i = 0; link = res.snapshotItem(i); i++)
	{
		var add;
		if (link.href.search(/\/todayspictures.slate\//) >= 0)
		{
			// do nothing
		}
		else if (link.href.search(/\/nav\//) >= 0)
		{
			//  http://www.slate.com/id/2155440/nav/tap1/
				// http://www.slate.com/id/2155440/pagenum/all
				// '(.*)/nav/(.*) ' --> $1/pagenum/all
			link.href = link.href.replace(/\/nav\/.*$/, '/pagenum/all' );
		}
		else if (link.href.search(/\/\?nav=(.*)$/) >= 0)
		{
			//http://www.slate.com/id/2155446/?nav=tap3
				// http://www.slate.com/id/2155446/pagenum/all
				// '(.*)/?nav=(.*) ' --> $1/pagenum/all?nav=$2
			link.href = link.href.replace(/\/\?nav=(.*)$/, '/pagenum/all?nav=$1' );	 
		}
		else if (link.href.search(/\/([0-9]*)\/$/) >= 0)
		{
			//http://www.slate.com/id/2155291
				// http://www.slate.com/id/2155291/pagenum/all
				// '([0-9])$ ' --> href + '/pagenum/all'
			link.href = link.href.replace(/\/([0-9]*)$/, '$1/pagenum/all' );	 
		}
		else {
			// do nothing
			// e.g. ignore URLs such as:
			//	http://www.slate.com/id/2154876/entry/0/?nav=tap3
			//	http://www.slate.com/id/2155249/entry/2155327/?nav=tap3
			// as they are inherently multi-page
		} // if
	} // for
} // function 
)();