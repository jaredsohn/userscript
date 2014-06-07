// ==UserScript==
// @name          StackOverflow Copycats Redirect
// @namespace     http://www.stackoverflow.com
// @description	  Redirect you to StackOverflow's original thread from any of these copycat sites:
// @include       *answerspice.com/*
// @include       *beenasked.com/*
// @include       *codegod.de/*
// @include       *coderesource.org/*
// @include       *codewiki.us/*
// @include       *comanswer.com/*
// @include       *developerit.com/*
// @include       *efreedom.com/*
// @include       *expert.tc/*
// @include       *globberstack.com/*
// @include       *goexpert.info/*
// @include       *gooduser.info/*
// @include       *htmlcoderhelper.com/*
// @include       *kavoir.com/*
// @include       *openg.info/*
// @include       *pinoytech.org/*
// @include       *programmershere.com/*
// @include       *simpleanswer.us/*
// @include       *softwareobjects.net/*
// @include       *stackoverflow.kidsbema.info/*
// @include       *stackoverflow.stopextraditions.info/*
// @include       *stopextraditions.info/*
// @include       *weask.us/*
// @include       *webdiscussion.info/*
// ==/UserScript==

(function () {
	var links = document.evaluate('//a[contains(@href, "stackoverflow.com/questions/")]', 
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var link = links.snapshotItem(0);
	if (link) {
		//location.href = link.href;
	}
}());
