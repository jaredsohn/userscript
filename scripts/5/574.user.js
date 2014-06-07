// ==UserScript==
// @name          Anandtech Link Rewriter
// @namespace     http://axlotl.net/greasemonkey
// @description   Rewrites article links to point to print versions.
// @include       http://www.anandtech.com*
// @include       http://anandtech.com*
// ==/UserScript==
//
//     license: GPL: http://www.gnu.org/copyleft/gpl.html
//     copyright (c) 2005, Chris Feldmann
//     complaints: cwf[]axlotl[]net
//
//
//     Rewrites article links on anandtech.com to point directly
//     at the print version. As their printer-"freindly" pages
//     span the entire viewscreen no matter how wide, this script
//     sets a max-width of 1000px and centers the page.

(function ()
{
	var a, link, href;
	a = document.evaluate(
		'//a[contains(@href, \'showdoc\')]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var j = 0; j < a.snapshotLength; j++) {
		link = a.snapshotItem(j);
		href = link.href;
		if (href = href.replace(/\w+\/showdoc/gi, 'printarticle')){
			link.href = href;
		}
	
	}
	
	function infectStyleSheet(css)
	{
		var h,style;
		h = document.getElementsByTagName('head')[0];
		if (!h) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		h.appendChild(style);
	}
	
	if (window.location.href.indexOf('printarticle') != -1){
		infectStyleSheet(
		'.windowbody {'+
		'max-width: 1000px ! important;'+
		'margin: 10px auto ! important;'+
		'}');
	}
})();
