// ==UserScript==
// @name          Print Link Rewriter
// @namespace     http://www.legroom.net/
// @description   Rewrites article links to point to print versions.
// @include       *
// ==/UserScript==
//
// Rewrites article links to point directly to the print version.
//
// This script based heavily on Anandtech Link Rewriter
// by Chris Feldmann, http://axlotl.net/greasemonkey
//

(function ()
{
	// AnandTech
	if (location.host.indexOf("anandtech.com") != -1) {
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
	}
	
	// SecurityFocus
	if (location.host.indexOf("securityfocus.com") != -1) {
		var a, link, href;
		a = document.evaluate(
			'//a[contains(@href, \'news\'|\'elsewhere\'|\'columnists\'|\'infocus\'|\'opportunities\')]',
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		for (var j = 0; j < a.snapshotLength; j++) {
			link = a.snapshotItem(j);
			href = link.href;
			if (href = href.replace(/news/gi, 'print/news')){
				link.href = href;
			}
			if (href = href.replace(/elsewhere/gi, 'print/elsewhere')){
				link.href = href;
			}
			if (href = href.replace(/columnists/gi, 'print/columnists')){
				link.href = href;
			}
			if (href = href.replace(/infocus/gi, 'print/infocus')){
				link.href = href;
			}
			if (href = href.replace(/jobs\/opportunities\//gi, 'print/jobopp\/')){
				link.href = href;
			}
		}
	}

	if (window.location.href.indexOf('print') != -1){
		infectStyleSheet(
		'.windowbody {'+
		//'max-width: 1000px ! important;'+
		'margin: 10px ! important;'+
		'}');
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

})();

